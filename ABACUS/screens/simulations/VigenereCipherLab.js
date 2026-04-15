import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VigenereCipherLab({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // Strict Alphabetical Filtering
  const handleAlphaInput = (text, setter) => {
    const filteredText = text.replace(/[^a-zA-Z]/g, '');
    setter(filteredText);
  };

  const processVigenere = () => {
    Keyboard.dismiss();
    if (!inputText || !keyword) {
      Alert.alert("Input Required", "Please provide both a message and a keyword.");
      return;
    }

    let output = "";
    let logs = [];
    const key = keyword.toUpperCase();
    const msg = inputText.toUpperCase();
    let keyIndex = 0;

    for (let i = 0; i < msg.length; i++) {
      const msgChar = msg[i];
      const keyCode = key.charCodeAt(keyIndex % key.length) - 65;
      const msgCode = msgChar.charCodeAt(0) - 65;

      let resultIndex;
      if (isEncrypt) {
        resultIndex = (msgCode + keyCode) % 26;
      } else {
        resultIndex = (msgCode - keyCode + 26) % 26;
      }

      const resChar = String.fromCharCode(resultIndex + 65);
      output += resChar;

      // Log first 6 steps for visualization
      if (i < 6) {
        logs.push(`${msgChar}(${msgCode}) ${isEncrypt ? '+' : '-'} ${key[keyIndex % key.length]}(${keyCode}) = ${resChar}(${resultIndex})`);
      }
      keyIndex++;
    }

    setResult({ output, logs, alignedKey: msg.split('').map((_, i) => key[i % key.length]).join('') });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Vigenere Cipher Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="keypad-outline" size={22} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Message:</Text> Enter letters only (No numbers or spaces).</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Keyword:</Text> Each letter of the key acts as a shift value for a specific letter in the message.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Logic:</Text> This is a sequence of different Caesar shifts.</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book-outline" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>The "Indecipherable" Cipher</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>The Vigenere cipher was known as "le chiffre indéchiffrable" (the indecipherable cipher) for centuries. It resists frequency analysis because one letter (like 'E') can be encrypted as many different letters depending on its position.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold'}}>Process:</Text> We use a Vigenere Square (Tabula Recta) where the row is determined by the Key and the column by the Plaintext.</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.label}>Message (Letters Only)</Text>
            <TextInput 
              style={styles.input} 
              value={inputText} 
              onChangeText={(t) => handleAlphaInput(t, setInputText)} 
              placeholder="e.g. ABACUS"
              placeholderTextColor="#666"
              autoCapitalize="characters"
            />

            <Text style={[styles.label, {marginTop: 15}]}>Keyword</Text>
            <TextInput 
              style={styles.input} 
              value={keyword} 
              onChangeText={(t) => handleAlphaInput(t, setKeyword)} 
              placeholder="e.g. MATH"
              placeholderTextColor="#666"
              autoCapitalize="characters"
            />

            <View style={styles.modeRow}>
              <TouchableOpacity style={[styles.modeBtn, isEncrypt && styles.activeMode]} onPress={() => setIsEncrypt(true)}>
                <Text style={[styles.modeText, isEncrypt && styles.activeModeText]}>ENCRYPT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modeBtn, !isEncrypt && styles.activeMode]} onPress={() => setIsEncrypt(false)}>
                <Text style={[styles.modeText, !isEncrypt && styles.activeModeText]}>DECRYPT</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={processVigenere}>
              <Text style={styles.primaryBtnText}>GENERATE VIGENERE</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resLabel}>Output Result:</Text>
              <View style={styles.outputBox}>
                <Text style={styles.outputText}>{result.output}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Key Alignment Visualization:</Text>
              <View style={styles.alignmentBox}>
                  <Text style={styles.alignText}><Text style={{fontWeight:'bold', color: '#64748B'}}>MSG: </Text>{inputText.toUpperCase()}</Text>
                  <Text style={styles.alignText}><Text style={{fontWeight:'bold', color: '#104a28'}}>KEY: </Text>{result.alignedKey}</Text>
                  <View style={{height: 1, backgroundColor: '#eee', marginVertical: 5}} />
                  <Text style={styles.alignText}><Text style={{fontWeight:'bold', color: '#0369a1'}}>RES: </Text>{result.output}</Text>
              </View>

              <Text style={[styles.stepTitle, {marginTop: 15}]}>Modular Steps (P ± K mod 26):</Text>
              {result.logs.map((log, idx) => (
                <Text key={idx} style={styles.logText}>• {log}</Text>
              ))}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginLeft: 15 },
  content: { padding: 15, paddingBottom: 60 },
  guideCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guideHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 },
  guideTitle: { fontWeight: 'bold', color: '#0369a1' },
  guideText: { fontSize: 13, color: '#334155', lineHeight: 18 },
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 15, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryText: { fontSize: 13, color: '#4b5563', lineHeight: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 16, color: '#111', fontWeight: 'bold', color: "#333" },
  modeRow: { flexDirection: 'row', marginTop: 20, gap: 10 },
  modeBtn: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#F1F5F9', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  activeMode: { backgroundColor: '#104a28', borderColor: '#104a28' },
  modeText: { fontWeight: 'bold', color: '#64748B', fontSize: 12 },
  activeModeText: { color: '#fff' },
  primaryBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 20, elevation: 4 },
  resLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10 },
  outputBox: { backgroundColor: '#F8FAF9', padding: 15, borderRadius: 10, borderLeftWidth: 5, borderLeftColor: '#104a28' },
  outputText: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', letterSpacing: 2 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  alignmentBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8 },
  alignText: { fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', fontSize: 15, marginBottom: 2 },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 10 },
  logText: { fontSize: 13, color: '#475569', marginBottom: 4, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
});