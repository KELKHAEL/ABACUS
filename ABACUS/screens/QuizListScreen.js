import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, StatusBar, RefreshControl, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 

const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function QuizListScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [uncompletedQuizzes, setUncompletedQuizzes] = useState([]); 
  const [archivedQuizzes, setArchivedQuizzes] = useState([]); // ✅ NEW
  
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('available'); // 'available', 'uncompleted', 'completed', 'archived'
  const [refreshing, setRefreshing] = useState(false);

  const formatDueDate = (dateString) => {
    if (!dateString) return "No deadline";
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const fetchData = async () => {
    try {
      const [quizRes, gradeRes] = await Promise.all([
        fetch(`${API_URL}/quizzes`),
        fetch(`${API_URL}/grades`)
      ]);

      const allQuizzes = await quizRes.json();
      const allGrades = await gradeRes.json();
      
      const userGrades = allGrades.filter(g => g.user_id === user.id);
      const takenQuizIds = userGrades.map(g => g.quiz_id);
      const now = new Date();

      // 1. Separate Active vs Archived
      const activeRelevant = allQuizzes.filter(q => {
        return q.status === 'active' && !q.is_archived && 
               (!q.target_year || q.target_year == user.yearLevel) && 
               (!q.target_section || q.target_section == user.section);
      });

      // 2. Active Arrays
      const available = activeRelevant.filter(q => !takenQuizIds.includes(q.id) && (!q.due_date || new Date(q.due_date) > now));
      const uncompleted = activeRelevant.filter(q => !takenQuizIds.includes(q.id) && (q.due_date && new Date(q.due_date) <= now));
      
      const completed = activeRelevant.filter(q => takenQuizIds.includes(q.id)).map(q => {
          const gradeEntry = userGrades.find(g => g.quiz_id === q.id);
          return { ...q, score: gradeEntry ? gradeEntry.grade : 0, total_items: gradeEntry ? gradeEntry.total_items : 100 };
      });

      // 3. Archived Arrays (Only show past quizzes the student actually completed)
      const archived = allQuizzes.filter(q => q.is_archived && takenQuizIds.includes(q.id)).map(q => {
          const gradeEntry = userGrades.find(g => g.quiz_id === q.id);
          return { ...q, score: gradeEntry ? gradeEntry.grade : 0, total_items: gradeEntry ? gradeEntry.total_items : 100 };
      });

      setAvailableQuizzes(available);
      setUncompletedQuizzes(uncompleted);
      setCompletedQuizzes(completed);
      setArchivedQuizzes(archived); // ✅ Set Archives
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { if (user) fetchData(); }, [user]);

  const onRefresh = useCallback(() => { setRefreshing(true); fetchData(); }, []);

  const renderQuizItem = ({ item }) => {
    const isDeleted = item.status === 'deleted'; 
    const isCompleted = viewMode === 'completed';
    const isArchived = viewMode === 'archived';
    const isMissed = viewMode === 'uncompleted';
    const isAvailable = viewMode === 'available';

    return (
      <TouchableOpacity 
        style={[
            styles.card, 
            isCompleted && styles.completedCard,
            isMissed && styles.missedCard,
            (isDeleted || isArchived) && { opacity: 0.7, backgroundColor: '#f8fafc' }
        ]} 
        onPress={() => isAvailable && !isDeleted && navigation.navigate('QuizScreen', { quizId: item.id, quizTitle: item.title })}
        disabled={isCompleted || isMissed || isDeleted || isArchived} 
      >
        <View style={[
            styles.iconContainer, 
            isCompleted && {backgroundColor: '#e8f5e9'},
            isMissed && {backgroundColor: '#ffe4e6'},
            (isDeleted || isArchived) && {backgroundColor: '#e2e8f0'}
        ]}>
          <Ionicons 
            name={isDeleted ? "trash-bin-outline" : isArchived ? "archive" : isCompleted ? "checkmark-circle" : isMissed ? "close-circle" : "clipboard-outline"} 
            size={24} 
            color={isDeleted ? "#6b7280" : isArchived ? "#475569" : isCompleted ? "#104a28" : isMissed ? "#e11d48" : "#2D7FF9"} 
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={[styles.title, isMissed && {color: '#881337'}, (isDeleted || isArchived) && {color: '#334155'}]}>
            {item.title} {isDeleted && " (Deleted)"}
          </Text>
          
          {isAvailable && (
             <Text style={styles.subtitleActive}><Ionicons name="time-outline" size={12} /> Due: {formatDueDate(item.due_date)}</Text>
          )}
          {(isCompleted || isArchived) && (
             <Text style={styles.subtitle}>Score: {Number(item.score)} / {Number(item.total_items || 100)}</Text>
          )}
          {isMissed && <Text style={styles.subtitleMissed}>Expired: {formatDueDate(item.due_date)}</Text>}
          
        </View>
        {isAvailable && !isDeleted && <Ionicons name="chevron-forward" size={20} color="#ccc" />}
      </TouchableOpacity>
    );
  };

  let currentData = availableQuizzes;
  let emptyMessage = "No pending quizzes for you!";
  if (viewMode === 'completed') {
      currentData = completedQuizzes;
      emptyMessage = "You haven't finished any quizzes yet.";
  } else if (viewMode === 'uncompleted') {
      currentData = uncompletedQuizzes;
      emptyMessage = "Great job! You haven't missed any quizzes.";
  } else if (viewMode === 'archived') {
      currentData = archivedQuizzes;
      emptyMessage = "No archived quizzes from past terms.";
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Quizzes</Text>
      </View>

      {/* ✅ 4 TABS SCROLLABLE */}
      <View style={{backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabBar}>
            <TouchableOpacity style={[styles.tab, viewMode === 'available' && styles.activeTab]} onPress={() => setViewMode('available')}>
                <Text style={[styles.tabText, viewMode === 'available' && styles.activeTabText]}>Active ({availableQuizzes.length})</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tab, viewMode === 'uncompleted' && styles.activeTab]} onPress={() => setViewMode('uncompleted')}>
                <Text style={[styles.tabText, viewMode === 'uncompleted' && styles.activeTabText, {color: viewMode === 'uncompleted' ? '#e11d48' : '#888'}]}>Missed ({uncompletedQuizzes.length})</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tab, viewMode === 'completed' && styles.activeTab]} onPress={() => setViewMode('completed')}>
                <Text style={[styles.tabText, viewMode === 'completed' && styles.activeTabText]}>Done ({completedQuizzes.length})</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tab, viewMode === 'archived' && styles.activeTab]} onPress={() => setViewMode('archived')}>
                <Text style={[styles.tabText, viewMode === 'archived' && styles.activeTabText, {color: viewMode === 'archived' ? '#475569' : '#888'}]}>Past Terms ({archivedQuizzes.length})</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#104a28" style={{marginTop: 50}} />
      ) : (
        <FlatList 
          data={currentData} 
          renderItem={renderQuizItem} 
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} color="#104a28" />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name={viewMode === 'uncompleted' ? "star-outline" : (viewMode === 'archived' ? 'archive-outline' : 'document-text-outline')} size={60} color="#ccc" />
              <Text style={styles.emptyText}>{emptyMessage}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff' },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 10 },
  tab: { paddingVertical: 15, paddingHorizontal: 15, alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#104a28' },
  tabText: { fontSize: 13, color: '#888', fontWeight: '700' },
  activeTabText: { color: '#104a28' },
  
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 15, flexDirection: 'row', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05, shadowRadius: 3 },
  completedCard: { opacity: 0.9, backgroundColor: '#fcfcfc' },
  missedCard: { opacity: 0.9, backgroundColor: '#fff1f2', borderColor: '#fecdd3', borderWidth: 1 },
  
  iconContainer: { backgroundColor: '#E3F2FD', width: 45, height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  title: { fontSize: 16, fontWeight: '600', color: '#333' },
  subtitle: { fontSize: 13, color: '#888', marginTop: 4, fontWeight: '500' },
  subtitleActive: { fontSize: 13, color: '#eab308', marginTop: 4, fontWeight: '700' },
  subtitleMissed: { fontSize: 13, color: '#e11d48', marginTop: 4, fontWeight: '600' },
  
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#999', marginTop: 15, textAlign: 'center', width: '80%', fontSize: 15 }
});