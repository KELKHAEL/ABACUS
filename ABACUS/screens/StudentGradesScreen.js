import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, ActivityIndicator, 
  TouchableOpacity, SafeAreaView, StatusBar, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function StudentGradesScreen({ route, navigation }) {
  const { studentId, studentName, studentNo } = route.params;
  
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentGrades();
  }, []);

  const fetchStudentGrades = async () => {
    try {
      const [gradesRes, quizzesRes] = await Promise.all([
        fetch(`${API_URL}/grades`),
        fetch(`${API_URL}/quizzes`)
      ]);
      
      const gradesData = await gradesRes.json();
      const quizzesData = await quizzesRes.json();
      
      const validQuizIds = new Set(
        quizzesData.filter(q => q.status !== 'deleted').map(q => q.id)
      );

      // ✅ FIX: Added g.is_archived === 0 to hide past semester grades
      const specificGrades = gradesData.filter(g => 
        g.user_id === studentId && 
        validQuizIds.has(g.quiz_id) && 
        g.is_archived === 0 
      );
      
      setGrades(specificGrades);
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderGradeCard = ({ item }) => {
    const percentage = Math.round((item.grade / item.total_items) * 100);
    const isPassing = percentage >= 75; 
    const statusColor = isPassing ? "#104a28" : "#d32f2f";
    
    const cleanScore = Math.round(item.grade);
    const cleanTotal = Math.round(item.total_items);

    return (
      <View style={[styles.card, { borderLeftColor: statusColor }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.subjectTitle}>{item.subjectTitle}</Text>
          <Text style={styles.date}>{new Date(item.dateTaken).toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Score:</Text>
          <View style={styles.scoreBadgeContainer}>
             <Text style={styles.scoreText}>
               <Text style={{fontWeight: '900', color: statusColor, fontSize: 18}}>{cleanScore}</Text> / {cleanTotal}
             </Text>
             <View style={[styles.percentageBadge, { backgroundColor: statusColor + '15' }]}>
               <Text style={[styles.percentageText, { color: statusColor }]}>{percentage}%</Text>
             </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>{studentName}</Text>
          <Text style={styles.subText}>{studentNo}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Academic Records</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#104a28" style={{ marginTop: 40 }} />
        ) : grades.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No valid quizzes taken yet.</Text>
          </View>
        ) : (
          <FlatList
            data={grades}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderGradeCard}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  backButton: { padding: 8, marginRight: 10, backgroundColor: '#f3f4f6', borderRadius: 8 },
  headerTextContainer: { flex: 1 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 13, color: '#666', marginTop: 2, fontFamily: 'monospace' },
  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  subjectTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 10 },
  date: { fontSize: 12, color: '#888', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreLabel: { fontSize: 14, color: '#666', fontWeight: '500' },
  scoreBadgeContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scoreText: { fontSize: 15, color: '#555' },
  percentageBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  percentageText: { fontSize: 13, fontWeight: 'bold' },
  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#999', marginTop: 12, fontSize: 16 }
});