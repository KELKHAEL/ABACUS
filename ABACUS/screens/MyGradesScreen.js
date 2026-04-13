import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MyGradesScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizStatusMap, setQuizStatusMap] = useState({}); 

  const [viewMode, setViewMode] = useState('active'); 

  const fetchGradesAndStatus = useCallback(async () => {
    try {
      if (!user) return;
      setLoading(true);

      const [gradesResponse, quizzesResponse] = await Promise.all([
          fetch(`${API_URL}/grades`),
          fetch(`${API_URL}/quizzes`)
      ]);

      const allGrades = await gradesResponse.json();
      const allQuizzes = await quizzesResponse.json();

      const myGrades = allGrades.filter(g => g.user_id === user.id);
      
      const statusMap = {};
      allQuizzes.forEach((q) => { statusMap[q.id] = q.status; });
      setQuizStatusMap(statusMap);
      setGrades(myGrades);

    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchGradesAndStatus();
  }, [fetchGradesAndStatus]);

  const renderGradeItem = ({ item }) => {
    const score = parseFloat(item.grade || 0);
    const total = parseFloat(item.total_items || 100);
    const percentage = total > 0 ? (score / total) * 100 : 0;
    const isPassing = percentage >= 75;
    const isDisabled = quizStatusMap[item.quiz_id] === 'deleted';
    
    const isMissed = item.subjectTitle && item.subjectTitle.includes('(Missed)');

    return (
      <View style={[
          styles.gradeCard, 
          isDisabled && styles.disabledCard, 
          viewMode === 'archived' && {borderColor: '#e2e8f0', borderWidth: 1, shadowOpacity: 0}
      ]}>
        <View style={styles.cardLeft}>
          <Text style={[styles.subjectCode, isDisabled && styles.disabledText, isMissed && {color: '#ef4444'}]}>
            QUIZ 
            {isDisabled && " (DISABLED)"} 
            {viewMode === 'archived' && !isDisabled && " (ARCHIVED)"}
            {isMissed && " (EXPIRED)"}
          </Text>
          <Text style={[styles.subjectTitle, isDisabled && styles.disabledText, isMissed && {color: '#991b1b'}]}>
            {item.subjectTitle}
          </Text>
          <Text style={[styles.date, isMissed && {color: '#ef4444', fontStyle: 'italic'}]}>
             {isMissed ? "Deadline Passed" : (item.dateTaken ? new Date(item.dateTaken).toDateString() : "Just now")}
          </Text>
        </View>
        
        <View style={styles.cardRight}>
          <Text style={[
              styles.gradeText, 
              isDisabled ? styles.disabledText : 
              isMissed ? {color: '#ef4444'} :
              (viewMode === 'archived' ? {color: '#475569'} : { color: isPassing ? '#104a28' : '#d32f2f' })
            ]}>
            {score} / {total}
          </Text>
          
          <View style={[
              styles.badge, 
              isDisabled ? { backgroundColor: '#e0e0e0' } : 
              isMissed ? { backgroundColor: '#fee2e2' } :
              (viewMode === 'archived' ? {backgroundColor: '#f1f5f9'} : { backgroundColor: isPassing ? '#e8f5e9' : '#ffebee' })
            ]}>
            <Text style={[
                styles.badgeText, 
                isDisabled ? { color: '#888' } : 
                isMissed ? { color: '#ef4444' } :
                (viewMode === 'archived' ? {color: '#64748b'} : { color: isPassing ? '#104a28' : '#d32f2f' })
              ]}>
              {isDisabled ? "DELETED" : isMissed ? "MISSED" : (isPassing ? "PASSED" : "FAILED")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const displayedGrades = grades.filter(g => viewMode === 'archived' ? g.is_archived === 1 : g.is_archived === 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FD" />
      
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Grades</Text>
        </View>
        
        {/* ✅ NEW: Refresh Button */}
        <TouchableOpacity onPress={fetchGradesAndStatus} style={{padding: 5}}>
          <Ionicons name="refresh" size={24} color="#104a28" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, viewMode === 'active' && styles.activeTab]} onPress={() => setViewMode('active')}>
          <Text style={[styles.tabText, viewMode === 'active' && styles.activeTabText]}>Current</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, viewMode === 'archived' && styles.activeTab]} onPress={() => setViewMode('archived')}>
          <Text style={[styles.tabText, viewMode === 'archived' && styles.activeTabText, {color: viewMode === 'archived' ? '#4b5563' : '#888'}]}>Past Terms</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#104a28" style={{marginTop: 50}} />
        ) : displayedGrades.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name={viewMode === 'active' ? "school-outline" : "archive-outline"} size={60} color="#ccc" />
            <Text style={styles.emptyText}>{viewMode === 'active' ? 'No grades recorded yet.' : 'No archived grades found.'}</Text>
          </View>
        ) : (
          <FlatList
            data={displayedGrades}
            renderItem={renderGradeItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', 
  },
  backBtn: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },

  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05 },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#104a28' },
  tabText: { fontSize: 14, color: '#888', fontWeight: '700' },
  activeTabText: { color: '#104a28' },
  
  content: { flex: 1, padding: 20 },
  
  gradeCard: {
    backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 15,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2
  },
  disabledCard: { backgroundColor: '#f5f5f5', borderColor: '#e0e0e0', borderWidth: 1, shadowOpacity: 0, elevation: 0 },
  disabledText: { color: '#999' },

  cardLeft: { flex: 1, marginRight: 10 },
  subjectCode: { fontSize: 12, fontWeight: 'bold', color: '#888', letterSpacing: 1, marginBottom: 4 },
  subjectTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  date: { fontSize: 12, color: '#999' },

  cardRight: { alignItems: 'flex-end' },
  gradeText: { fontSize: 22, fontWeight: '900', marginBottom: 5 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  
  emptyState: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#999', marginTop: 10 }
});