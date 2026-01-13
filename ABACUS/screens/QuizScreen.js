import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { doc, updateDoc, arrayUnion, addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; 
import { Ionicons } from '@expo/vector-icons';

export default function QuizScreen({ route, navigation }) {
  const { quiz } = route.params; 

  useEffect(() => {
  // Check immediately when screen loads
  if (auth.currentUser) {
    console.log("✅ QuizScreen: User is logged in as", auth.currentUser.email);
  } else {
    console.log("❌ QuizScreen: No user found! Persistence is broken.");
    Alert.alert("Warning", "You are currently logged out. Please go back to Login.");
  }
  }, []);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [saving, setSaving] = useState(false);

  // State for different input types
  const [textAnswer, setTextAnswer] = useState(""); // For Short Answer
  const [selectedChecks, setSelectedChecks] = useState([]); // For Checkboxes

  const currentQ = quiz.questions[currentQuestionIndex];

  // --- HANDLER: MULTIPLE CHOICE ---
  const handleMultipleChoice = (selectedIndex) => {
    let isCorrect = selectedIndex === currentQ.correctIndex;
    processAnswer(isCorrect);
  };

  // --- HANDLER: SHORT ANSWER ---
  const handleTextSubmit = () => {
    if (!textAnswer.trim()) {
      Alert.alert("Required", "Please type an answer.");
      return;
    }
    // Case-insensitive comparison
    let isCorrect = textAnswer.trim().toLowerCase() === currentQ.correctAnswerText?.trim().toLowerCase();
    processAnswer(isCorrect);
    setTextAnswer(""); // Reset
  };

  // --- HANDLER: CHECKBOXES ---
  const toggleCheckbox = (index) => {
    if (selectedChecks.includes(index)) {
      setSelectedChecks(selectedChecks.filter(i => i !== index));
    } else {
      setSelectedChecks([...selectedChecks, index]);
    }
  };

  const submitCheckbox = () => {
    if (selectedChecks.length === 0) {
      Alert.alert("Required", "Select at least one option.");
      return;
    }
    // Simple logic: In this basic version, we just check if they selected the ONE correct index marked in admin.
    // (For advanced checkbox logic, you'd need multiple correct indices in the Admin panel).
    let isCorrect = selectedChecks.includes(currentQ.correctIndex) && selectedChecks.length === 1;
    processAnswer(isCorrect);
    setSelectedChecks([]); // Reset
  };

  // --- CORE LOGIC: PROCESS ANSWER & MOVE NEXT ---
  const processAnswer = (isCorrect) => {
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newScore);
    }
  };

  // --- SAVE RESULTS ---
  const finishQuiz = async (finalScore) => {
    setQuizFinished(true);
    setSaving(true);
    
    // Safety Check: Is user logged in?
    const user = auth.currentUser;
    if (!user) {
      setSaving(false);
      Alert.alert("Error", "You are not logged in. Result cannot be saved.", [
        { text: "Go to Login", onPress: () => navigation.navigate("LoginScreen") }
      ]);
      return;
    }

    const percentage = (finalScore / quiz.questions.length) * 100;
    const finalGrade = percentage.toFixed(2);

    try {
      // 1. Save to Grades List (For Instructor Gradebook)
      const studentRef = doc(db, "users", user.uid);
      
      const newGradeEntry = {
        subjectCode: 'QUIZ', 
        subjectTitle: quiz.title,
        grade: finalGrade, 
        semester: '1st Sem', 
        dateAdded: new Date().toISOString()
      };

      await updateDoc(studentRef, {
        gradesList: arrayUnion(newGradeEntry)
      });

      setSaving(false);
      Alert.alert("Quiz Complete!", `You scored ${finalGrade}%`, [
        { text: "Back to Home", onPress: () => navigation.navigate("StudentHome") }
      ]);

    } catch (error) {
      setSaving(false);
      console.error(error);
      Alert.alert("Error", "Could not save grade. Check internet connection.");
    }
  };

  if (quizFinished) {
    return (
      <View style={styles.centerContainer}>
        {saving ? <ActivityIndicator size="large" color="#104a28" /> : <Text style={styles.doneText}>Done!</Text>}
        <Text style={{marginTop:10, color:'#666'}}>{saving ? "Saving results..." : ""}</Text>
      </View>
    );
  }

  // --- RENDER INPUT BASED ON TYPE ---
  const renderInputArea = () => {
    // 1. SHORT ANSWER
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

    // 2. CHECKBOXES
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

    // 3. MULTIPLE CHOICE (Default)
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
      <ScrollView contentContainerStyle={{padding: 20}}>
        
        {/* Header */}
        <Text style={styles.header}>{quiz.title}</Text>
        <Text style={styles.counter}>Question {currentQuestionIndex + 1} of {quiz.questions.length}</Text>
        
        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQ.questionText}</Text>
        </View>

        {/* Dynamic Inputs */}
        {renderInputArea()}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FD' },
  
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#104a28' },
  counter: { color: '#666', marginBottom: 20, fontSize: 14 },
  
  questionCard: { backgroundColor: 'white', padding: 25, borderRadius: 15, marginBottom: 30, elevation: 4, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:5 },
  questionText: { fontSize: 18, lineHeight: 28, color: '#333', fontWeight: '600' },
  
  // Options
  optionsContainer: { gap: 15 },
  optionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E0E0E0', elevation: 1 },
  optionSelected: { borderColor: '#104a28', backgroundColor: '#e8f5e9' },
  
  optionText: { fontSize: 16, color: '#444', marginLeft: 15 },
  circle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc' },

  // Text Input
  textInput: { backgroundColor: 'white', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', fontSize: 16, marginBottom: 20 },
  
  // Submit Button (for Text/Checkbox)
  submitBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  doneText: { fontSize: 22, fontWeight: 'bold', color: '#104a28' }
});