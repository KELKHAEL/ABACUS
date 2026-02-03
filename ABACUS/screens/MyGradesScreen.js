import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'; 
import { auth, db } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function MyGradesScreen({ navigation }) {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("Student");
  const [quizStatusMap, setQuizStatusMap] = useState({}); // Stores quiz statuses

  useEffect(() => {
    fetchGradesAndStatus();
  }, []);

  const fetchGradesAndStatus = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // 1. Fetch User Grades
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setStudentName(userData.fullName || "Student");
        const history = userData.gradesList || [];
        history.reverse(); 
        setGrades(history);
      }

      // 2. Fetch Quiz Statuses (to check for disabled/deleted ones)
      const quizzesSnap = await getDocs(collection(db, "quizzes"));
      const statusMap = {};
      quizzesSnap.forEach((doc) => {
          statusMap[doc.id] = doc.data().status; // 'active' or 'deleted'
      });
      setQuizStatusMap(statusMap);

    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderGradeItem = ({ item }) => {
    const score = parseFloat(item.grade);
    const isPassing = score >= 75;
    
    // Check if the quiz is deleted in the map
    // item.quizId comes from when you saved the grade
    const isDisabled = quizStatusMap[item.quizId] === 'deleted';

    return (
      <View style={[styles.gradeCard, isDisabled && styles.disabledCard]}>
        <View style={styles.cardLeft}>
          <Text style={[styles.subjectCode, isDisabled && styles.disabledText]}>
            {item.subjectCode || "QUIZ"} 
            {isDisabled && " (DISABLED)"}
          </Text>
          <Text style={[styles.subjectTitle, isDisabled && styles.disabledText]}>
            {item.subjectTitle}
          </Text>
          <Text style={styles.date}>{new Date(item.dateAdded).toDateString()}</Text>
        </View>
        
        <View style={styles.cardRight}>
          <Text style={[
              styles.gradeText, 
              isDisabled ? styles.disabledText : { color: isPassing ? '#104a28' : '#d32f2f' }
            ]}>
            {item.grade}%
          </Text>
          
          {/* Badge */}
          <View style={[
              styles.badge, 
              isDisabled 
                ? { backgroundColor: '#e0e0e0' } 
                : { backgroundColor: isPassing ? '#e8f5e9' : '#ffebee' }
            ]}>
            <Text style={[
                styles.badgeText, 
                isDisabled 
                  ? { color: '#888' } 
                  : { color: isPassing ? '#104a28' : '#d32f2f' }
              ]}>
              {isDisabled ? "ARCHIVED" : (isPassing ? "PASSED" : "FAILED")}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FD" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Grades</Text>
        <View style={{width: 24}} /> 
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#104a28" style={{marginTop: 50}} />
        ) : grades.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No grades recorded yet.</Text>
            <Text style={styles.subEmptyText}>Take a quiz to see your progress!</Text>
          </View>
        ) : (
          <FlatList
            data={grades}
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
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', 
    elevation: 2, shadowColor: "#000", shadowOpacity: 0.05 
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  
  content: { flex: 1, padding: 20 },
  
  gradeCard: {
    backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 15,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2
  },
  // New Styles for Disabled State
  disabledCard: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    shadowOpacity: 0,
    elevation: 0
  },
  disabledText: {
    color: '#999'
  },

  cardLeft: { flex: 1, marginRight: 10 },
  subjectCode: { fontSize: 12, fontWeight: 'bold', color: '#888', letterSpacing: 1, marginBottom: 4 },
  subjectTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  date: { fontSize: 12, color: '#999' },

  cardRight: { alignItems: 'flex-end' },
  gradeText: { fontSize: 22, fontWeight: '900', marginBottom: 5 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },

  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#555', marginTop: 20 },
  subEmptyText: { fontSize: 14, color: '#999', marginTop: 5 }
});