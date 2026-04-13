import React, { useState, useEffect, useContext, useRef } from 'react';
import { 
  View, Text, TouchableOpacity, Alert, StyleSheet, 
  SafeAreaView, ScrollView, TextInput, ActivityIndicator, 
  AppState, BackHandler, Platform, StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 
import * as ScreenCapture from 'expo-screen-capture'; 

// ❗ REPLACE THIS WITH YOUR PC'S IP ADDRESS OR NGROK URL
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function QuizScreen({ route, navigation }) {
  const { quizId, quizTitle } = route.params; 
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);
  
  // View States
  const [hasStarted, setHasStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quiz Logic States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // Inputs
  const [textAnswer, setTextAnswer] = useState(""); 
  const [selectedChecks, setSelectedChecks] = useState([]); 

  // Security Refs
  const appState = useRef(AppState.currentState);
  const isCheating = useRef(false);

  // --- FETCH QUIZ DETAILS ---
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/quizzes/${quizId}`);
        const data = await response.json();
        if (data.questions && data.questions.length > 0) {
            setQuizData(data);
        } else {
            Alert.alert("Error", "This quiz has no questions yet.");
            navigation.goBack();
        }
      } catch (error) {
        Alert.alert("Error", "Failed to load quiz.");
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchQuizDetails();
  }, [quizId, navigation]);

  // ==========================================
  // 🛡️ ANTI-CHEAT SECURITY MODULE 🛡️
  // ==========================================
  useEffect(() => {
    // Only activate security if the quiz is actively being taken
    if (loading || !hasStarted || showResult) return;

    // 1. Block Android Screenshots
    ScreenCapture.preventScreenCaptureAsync();

    // 2. Listen for iOS Screenshots
    const screenshotSubscription = ScreenCapture.addScreenshotListener(() => {
      handleCheatDetection("Screenshot or Screen Recording detected!");
    });

    // 3. Listen for App Backgrounding
    const appStateSubscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        handleCheatDetection("App moved to background. You cannot leave the quiz to search for answers.");
      }
      appState.current = nextAppState;
    });

    // 4. Intercept Android Hardware Back Button
    const onBackPress = () => {
      promptLeaveWarning();
      return true; 
    };
    const backSubscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // 5. Intercept UI Back Button
    const navUnsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (showResult || isCheating.current) return; 
      e.preventDefault();
      promptLeaveWarning();
    });

    return () => {
      ScreenCapture.allowScreenCaptureAsync();
      if (screenshotSubscription) screenshotSubscription.remove();
      if (appStateSubscription) appStateSubscription.remove();
      if (backSubscription) backSubscription.remove(); 
      if (navUnsubscribe) navUnsubscribe();
    };
  }, [loading, hasStarted, showResult, navigation]);

  const promptLeaveWarning = () => {
    Alert.alert(
      "⚠️ Warning!",
      "You cannot leave an active quiz. Leaving now will submit your quiz with a score of 0.",
      [
        { text: "Stay & Continue", style: "cancel" },
        { text: "Leave & Fail", style: "destructive", onPress: () => handleCheatDetection("Exited the quiz early.") }
      ]
    );
  };

  const handleCheatDetection = (reason) => {
    if (isCheating.current || showResult) return;
    isCheating.current = true;
    finishQuiz(0, reason); // Auto-submit with 0
  };
  // ==========================================

  const handleMultipleChoice = (selectedIndex) => {
    const currentQ = quizData.questions[currentQuestionIndex];
    let isCorrect = selectedIndex === currentQ.correctIndex;
    processAnswer(isCorrect);
  };

  const handleTextSubmit = () => {
    if (!textAnswer.trim()) return Alert.alert("Required", "Please type an answer.");
    const currentQ = quizData.questions[currentQuestionIndex];
    let isCorrect = textAnswer.trim().toLowerCase() === currentQ.correctAnswerText?.trim().toLowerCase();
    processAnswer(isCorrect);
  };

  const toggleCheckbox = (index) => {
    if (selectedChecks.includes(index)) {
      setSelectedChecks(selectedChecks.filter(i => i !== index));
    } else {
      setSelectedChecks([...selectedChecks, index]);
    }
  };

  const submitCheckbox = () => {
    if (selectedChecks.length === 0) return Alert.alert("Required", "Select at least one option.");
    const currentQ = quizData.questions[currentQuestionIndex];
    let isCorrect = selectedChecks.includes(currentQ.correctIndex) && selectedChecks.length === 1;
    processAnswer(isCorrect);
  };

  const processAnswer = (isCorrect) => {
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    setTextAnswer(""); 
    setSelectedChecks([]); 

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newScore);
    }
  };

  // --- SAVE RESULTS ---
  const finishQuiz = async (finalScore, cheatReason = null) => {
    setIsSubmitting(true);
    setShowResult(true); 
    setScore(finalScore);
    
    const totalItems = quizData ? quizData.questions.length : 100;

    try {
      await fetch(`${API_URL}/grades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: user.id,
            quizId: quizId,
            score: finalScore,
            totalItems: totalItems,
            subjectTitle: quizTitle
        })
      });

      setIsSubmitting(false);
      
      if (cheatReason) {
         Alert.alert("🚨 Quiz Terminated", `Violation: ${cheatReason}\n\nYour score has been recorded as 0.`, [
          { text: "Understood", onPress: () => navigation.goBack() } // ✅ Safely goes back without looping
         ]);
      }

    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
      Alert.alert("Error", "Could not save grade. Returning to menu.", [
         { text: "OK", onPress: () => navigation.goBack() }
      ]);
    }
  };

  // --- RENDER STATES ---

  if (loading || !quizData) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#104a28" />
        <Text style={{marginTop: 10, color: '#666'}}>Loading Quiz...</Text>
      </SafeAreaView>
    );
  }

  // 1. START SCREEN
  if (!hasStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>Quiz Info</Text>
          <View style={{width: 24}} />
        </View>

        <View style={styles.startContent}>
          <Ionicons name="document-text-outline" size={80} color="#104a28" style={{marginBottom: 20}} />
          <Text style={styles.quizTitleLg}>{quizTitle}</Text>
          <Text style={styles.quizDesc}>{quizData?.description || "No description provided."}</Text>
          
          <View style={styles.infoBox}>
              <View style={styles.infoRow}>
                  <Ionicons name="help-circle-outline" size={20} color="#666" />
                  <Text style={styles.infoText}>{quizData.questions.length} Questions</Text>
              </View>
              <View style={styles.infoRow}>
                  <Ionicons name="warning-outline" size={20} color="#d97706" />
                  <Text style={styles.infoText}>Do not leave the app while taking the quiz. You will receive an automatic zero.</Text>
              </View>
          </View>

          <TouchableOpacity style={styles.startBtn} onPress={() => setHasStarted(true)}>
            <Text style={styles.startBtnText}>START QUIZ</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // 2. RESULTS SCREEN
  if (showResult) {
    const totalItems = quizData.questions.length;
    const percentage = totalItems > 0 ? (score / totalItems) * 100 : 0;
    const passed = percentage >= 75;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle} numberOfLines={1}>Results</Text>
        </View>

        {isSubmitting ? (
          <View style={styles.centerContainer}>
             <ActivityIndicator size="large" color="#104a28" />
             <Text style={{marginTop: 10, color: '#666'}}>Saving your score...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.resultContent}>
            <Ionicons 
                name={passed ? "checkmark-circle" : "close-circle"} 
                size={100} 
                color={passed ? "#10b981" : "#ef4444"} 
            />
            <Text style={styles.resultTitle}>{passed ? "Congratulations!" : "Keep Trying!"}</Text>
            <Text style={styles.resultSubtitle}>You scored</Text>
            
            <View style={styles.scoreCircle}>
                <Text style={styles.scoreText}>{score} / {totalItems}</Text>
            </View>
            
            <Text style={styles.percentageText}>{percentage.toFixed(0)}%</Text>

            <View style={styles.resultActions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.goBack()}>
                  <Ionicons name="list" size={20} color="#104a28" />
                  <Text style={styles.actionBtnText}>Back to Quizzes</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }

  // 3. ACTIVE QUIZ SCREEN
  const currentQ = quizData.questions[currentQuestionIndex];

  const renderInputArea = () => {
    if (currentQ.type === 'short') {
      return (
        <View>
          <TextInput 
            style={styles.textInput} 
            placeholder="Type your answer here..." 
            value={textAnswer}
            onChangeText={setTextAnswer}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={handleTextSubmit}>
            <Text style={styles.submitBtnText}>Submit Answer</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (currentQ.type === 'checkbox') {
      return (
        <View>
          {currentQ.options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.optionButton, selectedChecks.includes(index) && styles.optionSelected]} 
              onPress={() => toggleCheckbox(index)}
            >
              <Ionicons 
                name={selectedChecks.includes(index) ? "checkbox" : "square-outline"} 
                size={24} 
                color={selectedChecks.includes(index) ? "#104a28" : "#666"} 
              />
              <Text style={[styles.optionText, selectedChecks.includes(index) && {fontWeight:'bold', color:'#104a28'}]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.submitBtn} onPress={submitCheckbox}>
            <Text style={styles.submitBtnText}>Confirm Selection</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Default: Multiple Choice / True False
    return (
      <View style={styles.optionsContainer}>
        {currentQ.options.map((option, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.optionButton} 
            onPress={() => handleMultipleChoice(index)}
          >
            <View style={styles.circle} />
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={promptLeaveWarning} style={styles.backBtn}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{quizTitle}</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView contentContainerStyle={styles.quizScroll}>
        <Text style={styles.counter}>Question {currentQuestionIndex + 1} of {quizData.questions.length}</Text>
        
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQ.questionText}</Text>
        </View>

        {renderInputArea()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FD' },
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1, textAlign: 'center', marginHorizontal: 10 },

  startContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  quizTitleLg: { fontSize: 24, fontWeight: '900', color: '#111', textAlign: 'center', marginBottom: 10 },
  quizDesc: { fontSize: 15, color: '#666', textAlign: 'center', marginBottom: 30, lineHeight: 22 },
  infoBox: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#eee', gap: 15, marginBottom: 30 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { fontSize: 14, color: '#444', fontWeight: '500', flexShrink: 1 },
  startBtn: { backgroundColor: '#104a28', width: '100%', padding: 18, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  startBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },

  quizScroll: { padding: 20, paddingBottom: 50 },
  counter: { color: '#666', marginBottom: 15, fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  questionCard: { backgroundColor: 'white', padding: 25, borderRadius: 15, marginBottom: 25, elevation: 2, shadowColor:'#000', shadowOpacity:0.05, shadowRadius:5, borderWidth: 1, borderColor: '#eee' },
  questionText: { fontSize: 18, lineHeight: 28, color: '#333', fontWeight: '600' },
  
  optionsContainer: { gap: 12 },
  optionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb', elevation: 1 },
  optionSelected: { borderColor: '#104a28', backgroundColor: '#e8f5e9' },
  optionText: { fontSize: 16, color: '#444', marginLeft: 15, flex: 1 },
  circle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#cbd5e1' },
  textInput: { backgroundColor: 'white', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', fontSize: 16, marginBottom: 20 },
  submitBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 30 },
  resultTitle: { fontSize: 28, fontWeight: '900', color: '#111', marginTop: 20, marginBottom: 5 },
  resultSubtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  scoreCircle: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#fff', borderWidth: 8, borderColor: '#104a28', justifyContent: 'center', alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  scoreText: { fontSize: 32, fontWeight: '900', color: '#104a28' },
  percentageText: { fontSize: 20, fontWeight: 'bold', color: '#555', marginBottom: 40 },
  
  resultActions: { width: '100%', gap: 15 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8f5e9', padding: 16, borderRadius: 12, gap: 8, borderWidth: 1, borderColor: '#bbf7d0' },
  actionBtnText: { fontSize: 15, fontWeight: 'bold', color: '#104a28' }
});