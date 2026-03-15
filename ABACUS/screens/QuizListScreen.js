import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 

const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function QuizListScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('available'); // 'available' or 'completed'
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [quizRes, gradeRes] = await Promise.all([
        fetch(`${API_URL}/quizzes`),
        fetch(`${API_URL}/grades`)
      ]);

      const allQuizzes = await quizRes.json();
      const allGrades = await gradeRes.json();
      
      // Get grades for THIS student
      const userGrades = allGrades.filter(g => g.user_id === user.id);
      const takenQuizIds = userGrades.map(g => g.quiz_id);

      // Filter Available (Active, Match Section, NOT taken)
      const available = allQuizzes.filter(q => {
        const isActive = q.status === 'active';
        const notTaken = !takenQuizIds.includes(q.id);
        const matchYear = !q.target_year || q.target_year == user.yearLevel;
        const matchSection = !q.target_section || q.target_section == user.section;
        return isActive && notTaken && matchYear && matchSection;
      });

      // Filter Completed (Attach the grade to the quiz object for display)
      const completed = allQuizzes.filter(q => takenQuizIds.includes(q.id))
        .map(q => {
          const gradeEntry = userGrades.find(g => g.quiz_id === q.id);
          return { ...q, score: gradeEntry ? gradeEntry.grade : 0 };
        });

      setAvailableQuizzes(available);
      setCompletedQuizzes(completed);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const renderQuizItem = ({ item }) => {
    const isCompleted = viewMode === 'completed';

    return (
      <TouchableOpacity 
        style={[styles.card, isCompleted && styles.completedCard]} 
        onPress={() => !isCompleted && navigation.navigate('QuizScreen', { quizId: item.id, quizTitle: item.title })}
        disabled={isCompleted}
      >
        <View style={[styles.iconContainer, isCompleted && {backgroundColor: '#e8f5e9'}]}>
          <Ionicons 
            name={isCompleted ? "checkmark-circle" : "clipboard-outline"} 
            size={24} 
            color={isCompleted ? "#104a28" : "#2D7FF9"} 
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>
            {isCompleted ? `Grade: ${item.score}%` : "Tap to start assessment"}
          </Text>
        </View>
        {!isCompleted && <Ionicons name="chevron-forward" size={20} color="#ccc" />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Quizzes</Text>
      </View>

      {/* Toggle Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, viewMode === 'available' && styles.activeTab]} 
          onPress={() => setViewMode('available')}
        >
          <Text style={[styles.tabText, viewMode === 'available' && styles.activeTabText]}>
            Available ({availableQuizzes.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, viewMode === 'completed' && styles.activeTab]} 
          onPress={() => setViewMode('completed')}
        >
          <Text style={[styles.tabText, viewMode === 'completed' && styles.activeTabText]}>
            Completed ({completedQuizzes.length})
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#104a28" style={{marginTop: 50}} />
      ) : (
        <FlatList 
          data={viewMode === 'available' ? availableQuizzes : completedQuizzes} 
          renderItem={renderQuizItem} 
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} color="#104a28" />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={60} color="#ccc" />
              <Text style={styles.emptyText}>
                {viewMode === 'available' ? "No pending quizzes for you!" : "You haven't finished any quizzes yet."}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  headerRow: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, 
    backgroundColor: '#fff' 
  },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#104a28' },
  tabText: { fontSize: 14, color: '#888', fontWeight: '600' },
  activeTabText: { color: '#104a28' },
  card: { 
    backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 15, 
    flexDirection: 'row', alignItems: 'center', elevation: 2,
    shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05, shadowRadius: 3
  },
  completedCard: { opacity: 0.8, backgroundColor: '#fcfcfc' },
  iconContainer: {
    backgroundColor: '#E3F2FD', width: 45, height: 45, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  subtitle: { fontSize: 13, color: '#888', marginTop: 2 },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#999', marginTop: 15, textAlign: 'center', width: '80%' }
});