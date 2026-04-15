import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AtbashCipherLab({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const reversed = [...alphabet].reverse();

  const handleTextInput = (text) => {
    // Allows only A-Z, a-z, and spaces
    const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
    setInputText(filteredText);
  };

  const processAtbash = () => {
    Keyboard.dismiss();
    let output = "";
    let logs = [];

    for (let i = 0; i < inputText.length; i++) {
      let char = inputText[i];
      if (char.match(/[a-z]/i)) {
        const code = inputText.charCodeAt(i);
        const isUpper = code >= 65 && code <= 90;
        let base = isUpper ? 65 : 97;
        
        let originalPos = code - base;
        let mirroredPos = 25 - originalPos;
        let newChar = String.fromCharCode(mirroredPos + base);
        
        output += newChar;

        if (i < 6) {
          logs.push(`${char} (Index: ${originalPos}) reflects to ${newChar} (Index: ${mirroredPos})`);
        }
      } else {
        output += char; // Spaces preserved
      }
    }

    setResult({ output, logs });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Atbash Cipher Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="swap-horizontal" size={22} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Input:</Text> Numbers and special characters are disabled for this lab.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Logic:</Text> Each letter is mirrored (A becomes Z, B becomes Y).</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Property:</Text> This cipher is its own inverse (Encrypt/Decrypt are the same).</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book-outline" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>The Legend of Atbash</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>The Atbash cipher is a monoalphabetic substitution cipher created by reversing the alphabet. It is a constant mapping logic.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}>It maps the first letter (1st) to the last letter (26th). In math terms: $f(x) = (25 - x)$.</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.label}>Letters to Process</Text>
            <TextInput 
              style={[styles.input, {height: 100}]} 
              multiline 
              value={inputText} 
              onChangeText={handleTextInput} 
              placeholder="Type letters only..."
              placeholderTextColor="#666"
            />

            <View style={styles.modeRow}>
                <TouchableOpacity 
                    style={[styles.modeTab, isEncrypt && styles.activeTab]} 
                    onPress={() => setIsEncrypt(true)}
                >
                    <Text style={[styles.modeTabText, isEncrypt && styles.activeTabText]}>ENCRYPT</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.modeTab, !isEncrypt && styles.activeTab]} 
                    onPress={() => setIsEncrypt(false)}
                >
                    <Text style={[styles.modeTabText, !isEncrypt && styles.activeTabText]}>DECRYPT</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={processAtbash}>
              <Text style={styles.primaryBtnText}>GENERATE MIRROR</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resLabel}>Result Output:</Text>
              <View style={styles.outputBox}>
                <Text style={styles.outputText}>{result.output}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Alphabet Mirror Mapping:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.visualMap}>
                    <View style={styles.mapRow}>
                        {alphabet.map(l => <View key={l} style={styles.mapCell}><Text style={styles.cellLabel}>{l}</Text></View>)}
                    </View>
                    <View style={styles.mapRow}>
                        {reversed.map((l, i) => <View key={i} style={[styles.mapCell, {backgroundColor: '#f0fdf4'}]}><Text style={[styles.cellLabel, {color: '#16a34a'}]}>{l}</Text></View>)}
                    </View>
                </View>
              </ScrollView>

              <Text style={[styles.stepTitle, {marginTop: 20}]}>Mirror Log:</Text>
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
  guideCard: { backgroundColor: '#E0F2FE', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#BAE6FD' },
  guideHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 },
  guideTitle: { fontWeight: 'bold', color: '#0369A1' },
  guideText: { fontSize: 13, color: '#334155', lineHeight: 18 },
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#065F46', fontWeight: 'bold', fontSize: 15, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#D1FAE5' },
  theoryText: { fontSize: 13, color: '#065F46', lineHeight: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10, textTransform: 'uppercase' },
  input: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, fontSize: 16, color: '#333', textAlignVertical: 'top' },
  modeRow: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 10, padding: 4, marginTop: 15 },
  modeTab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#fff', elevation: 2 },
  modeTabText: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8' },
  activeTabText: { color: '#104a28' },
  primaryBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 20, elevation: 4 },
  resLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10 },
  outputBox: { backgroundColor: '#F8FAF9', padding: 15, borderRadius: 10, borderLeftWidth: 5, borderLeftColor: '#104a28' },
  outputText: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', letterSpacing: 2 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 20 },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 12 },
  logText: { fontSize: 13, color: '#475569', marginBottom: 6, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  visualMap: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 4 },
  mapRow: { flexDirection: 'row' },
  mapCell: { width: 35, height: 35, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  cellLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748B' }
});