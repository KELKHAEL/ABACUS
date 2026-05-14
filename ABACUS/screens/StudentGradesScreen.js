import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, FlatList, ActivityIndicator, 
  TouchableOpacity, SafeAreaView, StatusBar, Platform, Modal, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function StudentGradesScreen({ route, navigation }) {
  const { studentId, studentName, studentNo } = route.params;
  
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- PAPER VIEWER STATES ---
  const [paperModalVisible, setPaperModalVisible] = useState(false);
  const [selectedQuizDetails, setSelectedQuizDetails] = useState(null);
  const [selectedResponses, setSelectedResponses] = useState(null);
  const [loadingPaper, setLoadingPaper] = useState(false);

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

  // --- FETCH SPECIFIC QUIZ PAPER ---
  const openPaperViewer = async (quizId, responsesJSON) => {
    setPaperModalVisible(true);
    setLoadingPaper(true);
    setSelectedQuizDetails(null);
    setSelectedResponses(null);

    try {
        const response = await fetch(`${API_URL}/quizzes/${quizId}`);
        const data = await response.json();
        
        setSelectedQuizDetails(data);
        
        // Parse the responses if they exist, otherwise empty object
        let parsedResponses = {};
        if (responsesJSON) {
            try { parsedResponses = typeof responsesJSON === 'string' ? JSON.parse(responsesJSON) : responsesJSON; } 
            catch(e) {}
        }
        setSelectedResponses(parsedResponses);
        
    } catch(e) {
        console.error("Failed to load paper:", e);
    } finally {
        setLoadingPaper(false);
    }
  };

  const renderGradeCard = ({ item }) => {
    const percentage = Math.round((item.grade / item.total_items) * 100);
    const isPassing = percentage >= 75; 
    const statusColor = isPassing ? "#104a28" : "#d32f2f";
    
    const cleanScore = Math.round(item.grade);
    const cleanTotal = Math.round(item.total_items);

    const isMissed = item.subjectTitle && item.subjectTitle.includes('(Missed)');

    return (
      <View style={[styles.card, { borderLeftColor: isMissed ? "#6b7280" : statusColor }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.subjectTitle, isMissed && {color: '#6b7280'}]}>{item.subjectTitle}</Text>
          <Text style={styles.date}>{isMissed ? "Expired" : new Date(item.dateTaken).toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.scoreRow}>
          <View>
              <Text style={styles.scoreLabel}>Score:</Text>
              <View style={styles.scoreBadgeContainer}>
                 <Text style={styles.scoreText}>
                   <Text style={{fontWeight: '900', color: isMissed ? "#6b7280" : statusColor, fontSize: 18}}>{cleanScore}</Text> / {cleanTotal}
                 </Text>
                 <View style={[styles.percentageBadge, { backgroundColor: isMissed ? '#f3f4f6' : statusColor + '15' }]}>
                   <Text style={[styles.percentageText, { color: isMissed ? "#6b7280" : statusColor }]}>{percentage}%</Text>
                 </View>
              </View>
          </View>

          {/* ✅ NEW: VIEW PAPER BUTTON */}
          {!isMissed && (
             <TouchableOpacity 
                style={styles.viewPaperBtn} 
                onPress={() => openPaperViewer(item.quiz_id, item.responses)}
             >
                <Ionicons name="document-text-outline" size={16} color="#104a28" />
                <Text style={styles.viewPaperText}>View Paper</Text>
             </TouchableOpacity>
          )}
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

      {/* ✅ NEW: PAPER VIEWER MODAL */}
      <Modal visible={paperModalVisible} animationType="slide" transparent={true} onRequestClose={() => setPaperModalVisible(false)}>
         <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                
                <View style={styles.modalHeader}>
                    <View style={{flex: 1}}>
                        <Text style={styles.modalTitle} numberOfLines={1}>Test Paper</Text>
                        <Text style={styles.modalSubTitle} numberOfLines={1}>{selectedQuizDetails?.title || "Loading..."}</Text>
                    </View>
                    <TouchableOpacity style={styles.closeModalBtn} onPress={() => setPaperModalVisible(false)}>
                        <Ionicons name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {loadingPaper ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color="#104a28" />
                        <Text style={{color: '#666', marginTop: 10}}>Loading responses...</Text>
                    </View>
                ) : !selectedQuizDetails || !selectedQuizDetails.questions ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                        <Ionicons name="alert-circle-outline" size={50} color="#ccc" />
                        <Text style={{color: '#888', textAlign: 'center', marginTop: 10}}>Quiz questions could not be loaded or were deleted.</Text>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={{padding: 20}}>
                        {selectedQuizDetails.questions.map((q, idx) => {
                            const rawAnswer = selectedResponses ? selectedResponses[q.id] : null;
                            let isCorrect = false;
                            let displayAnswer = "No Answer Provided";
                            let correctKey = "Unknown";

                            if (q.type === 'short') {
                                displayAnswer = rawAnswer || "No Answer Provided";
                                correctKey = q.correct_answer_text || q.correctAnswerText || "";
                                isCorrect = displayAnswer.toLowerCase().trim() === correctKey.toLowerCase().trim();
                            } 
                            else if (q.type === 'multiple-choice') {
                                if (rawAnswer !== null && rawAnswer !== undefined && q.options[rawAnswer]) {
                                    displayAnswer = q.options[rawAnswer];
                                }
                                correctKey = q.options[q.correctIndex || 0] || "Unknown";
                                isCorrect = rawAnswer === q.correctIndex;
                            } 
                            else if (q.type === 'checkbox') {
                                if (Array.isArray(rawAnswer) && rawAnswer.length > 0) {
                                    displayAnswer = rawAnswer.map(i => q.options[i]).join(', ');
                                }
                                
                                const correctIndices = q.correctIndices || (q.correct_answer_text ? q.correct_answer_text.split(',').map(Number) : []);
                                correctKey = correctIndices.map(i => q.options[i]).join(', ');
                                
                                if (Array.isArray(rawAnswer) && rawAnswer.length === correctIndices.length) {
                                    isCorrect = rawAnswer.every(val => correctIndices.includes(val));
                                } else {
                                    isCorrect = false;
                                }
                            }

                            return (
                                <View key={q.id} style={[styles.questionCard, isCorrect ? styles.qCardCorrect : styles.qCardWrong]}>
                                    <View style={styles.qHeader}>
                                        <Text style={styles.qNumber}>Q{idx + 1}</Text>
                                        <Ionicons name={isCorrect ? "checkmark-circle" : "close-circle"} size={20} color={isCorrect ? "#10b981" : "#ef4444"} />
                                    </View>
                                    <Text style={styles.qText}>{q.questionText || q.question_text}</Text>
                                    
                                    <View style={styles.answerBox}>
                                        <Text style={styles.answerLabel}>Student's Answer:</Text>
                                        <Text style={[styles.answerValue, {color: isCorrect ? '#047857' : '#b91c1c'}]}>{displayAnswer}</Text>
                                    </View>
                                    
                                    {!isCorrect && (
                                        <View style={styles.correctBox}>
                                            <Text style={styles.answerLabel}>Correct Answer:</Text>
                                            <Text style={styles.correctValue}>{correctKey}</Text>
                                        </View>
                                    )}
                                </View>
                            )
                        })}
                    </ScrollView>
                )}
            </View>
         </View>
      </Modal>

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
  
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 15, borderLeftWidth: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  subjectTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 10 },
  date: { fontSize: 12, color: '#888', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scoreLabel: { fontSize: 14, color: '#666', fontWeight: '500', marginBottom: 4 },
  scoreBadgeContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scoreText: { fontSize: 15, color: '#555' },
  percentageBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  percentageText: { fontSize: 13, fontWeight: 'bold' },
  
  viewPaperBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#e8f5e9', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#bbf7d0' },
  viewPaperText: { color: '#104a28', fontWeight: 'bold', fontSize: 12 },

  emptyState: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#999', marginTop: 12, fontSize: 16 },

  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#F8F9FD', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee', borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  modalTitle: { fontSize: 20, fontWeight: '900', color: '#111' },
  modalSubTitle: { fontSize: 13, color: '#666', marginTop: 2 },
  closeModalBtn: { padding: 5, backgroundColor: '#f3f4f6', borderRadius: 20 },

  questionCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 15, borderWidth: 1, elevation: 1, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05, shadowRadius: 2 },
  qCardCorrect: { borderColor: '#a7f3d0' },
  qCardWrong: { borderColor: '#fecaca' },
  qHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  qNumber: { fontSize: 12, fontWeight: 'bold', color: '#64748b', letterSpacing: 1 },
  qText: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 15, lineHeight: 22 },
  answerBox: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginBottom: 8 },
  correctBox: { backgroundColor: '#f0fdf4', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#bbf7d0' },
  answerLabel: { fontSize: 11, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: 4 },
  answerValue: { fontSize: 15, fontWeight: '600' },
  correctValue: { fontSize: 15, fontWeight: '600', color: '#047857' }
});