import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 

// ❗ REPLACE THIS WITH YOUR PC'S IP ADDRESS
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function QuizScreen({ route, navigation }) {
  const { quizId, quizTitle } = route.params; 
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [saving, setSaving] = useState(false);

  // Inputs
  const [textAnswer, setTextAnswer] = useState(""); 
  const [selectedChecks, setSelectedChecks] = useState([]); 

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
  }, [quizId]);

  if (loading || !quizData) {
      return <View style={styles.centerContainer}><ActivityIndicator size="large" color="#104a28"/></View>;
  }

  const currentQ = quizData.questions[currentQuestionIndex];

  // --- HANDLER: MULTIPLE CHOICE ---
  const handleMultipleChoice = (selectedIndex) => {
    // Note: Database stores correct_index, backend maps it to correctIndex
    let isCorrect = selectedIndex === currentQ.correctIndex;
    processAnswer(isCorrect);
  };

  // --- HANDLER: SHORT ANSWER ---
  const handleTextSubmit = () => {
    if (!textAnswer.trim()) return Alert.alert("Required", "Please type an answer.");
    let isCorrect = textAnswer.trim().toLowerCase() === currentQ.correctAnswerText?.trim().toLowerCase();
    processAnswer(isCorrect);
    setTextAnswer(""); 
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
    if (selectedChecks.length === 0) return Alert.alert("Required", "Select at least one option.");
    // Simplified logic: Check if selected matches correct index (Single correct for now)
    let isCorrect = selectedChecks.includes(currentQ.correctIndex) && selectedChecks.length === 1;
    processAnswer(isCorrect);
    setSelectedChecks([]); 
  };

  // --- CORE LOGIC ---
  const processAnswer = (isCorrect) => {
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz(newScore);
    }
  };

  // --- SAVE RESULTS ---
  const finishQuiz = async (finalScore) => {
    setQuizFinished(true);
    setSaving(true);
    
    const percentage = (finalScore / quizData.questions.length) * 100;
    const finalGrade = percentage.toFixed(2);

    try {
      // ✅ SAVE TO MYSQL
      await fetch(`${API_URL}/grades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: user.id,
            quizId: quizId,
            score: finalGrade,
            subjectTitle: quizTitle
        })
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

  // --- RENDER INPUT ---
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

    // Multiple Choice
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
        
        <Text style={styles.header}>{quizTitle}</Text>
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
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FD' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: '#104a28' },
  counter: { color: '#666', marginBottom: 20, fontSize: 14 },
  questionCard: { backgroundColor: 'white', padding: 25, borderRadius: 15, marginBottom: 30, elevation: 4, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:5 },
  questionText: { fontSize: 18, lineHeight: 28, color: '#333', fontWeight: '600' },
  optionsContainer: { gap: 15 },
  optionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E0E0E0', elevation: 1 },
  optionSelected: { borderColor: '#104a28', backgroundColor: '#e8f5e9' },
  optionText: { fontSize: 16, color: '#444', marginLeft: 15 },
  circle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc' },
  textInput: { backgroundColor: 'white', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#ccc', fontSize: 16, marginBottom: 20 },
  submitBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  submitBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  doneText: { fontSize: 22, fontWeight: 'bold', color: '#104a28' }
});