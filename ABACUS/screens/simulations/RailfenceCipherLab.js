import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RailFenceCipherLab({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [rails, setRails] = useState('3');
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const handleAlphaInput = (text) => {
    const filteredText = text.replace(/[^a-zA-Z]/g, '');
    setInputText(filteredText);
  };

  const processRailFence = () => {
    Keyboard.dismiss();
    const numRails = parseInt(rails);
    if (!inputText || isNaN(numRails) || numRails < 2) {
      Alert.alert("Input Error", "Please provide a message and at least 2 rails.");
      return;
    }

    let output = "";
    let fence = Array.from({ length: numRails }, () => Array(inputText.length).fill(null));
    let rail = 0;
    let direction = 1; // 1 for down, -1 for up

    if (isEncrypt) {
      // Encryption Logic
      for (let i = 0; i < inputText.length; i++) {
        fence[rail][i] = inputText[i];
        if (rail === 0) direction = 1;
        else if (rail === numRails - 1) direction = -1;
        rail += direction;
      }
      output = fence.flat().filter(char => char !== null).join("");
    } else {
      // Decryption Logic: First mark the zigzag pattern
      let pattern = Array.from({ length: numRails }, () => Array(inputText.length).fill(false));
      let pRail = 0;
      let pDir = 1;
      for (let i = 0; i < inputText.length; i++) {
        pattern[pRail][i] = true;
        if (pRail === 0) pDir = 1;
        else if (pRail === numRails - 1) pDir = -1;
        pRail += pDir;
      }

      // Fill characters into the marked spots row by row
      let charIdx = 0;
      for (let r = 0; r < numRails; r++) {
        for (let c = 0; c < inputText.length; c++) {
          if (pattern[r][c] && charIdx < inputText.length) {
            fence[r][c] = inputText[charIdx++];
          }
        }
      }

      // Read following the zigzag path
      let dRail = 0;
      let dDir = 1;
      for (let i = 0; i < inputText.length; i++) {
        output += fence[dRail][i];
        if (dRail === 0) dDir = 1;
        else if (dRail === numRails - 1) dDir = -1;
        dRail += dDir;
      }
    }

    setResult({ output, fence });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Rail Fence Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="git-merge-outline" size={22} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Rails:</Text> Sets the depth of the zigzag. Higher numbers mean more complexity.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>The Pattern:</Text> Letters are written diagonally and then read horizontally.</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book-outline" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>How it works: Transposition</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>The Rail Fence cipher doesn't replace letters; it changes their order. It is called a "Transposition Cipher" because it transposes the positions of characters.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold'}}>Discrete Math Link:</Text> This is a permutation of the set of indices in the original message string.</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.label}>Message (Letters Only)</Text>
            <TextInput 
              style={styles.input} 
              value={inputText} 
              onChangeText={handleAlphaInput} 
              placeholder="e.g. HELLOABACUS"
              autoCapitalize="characters"
            />

            <Text style={[styles.label, {marginTop: 15}]}>Number of Rails</Text>
            <TextInput 
              style={styles.input} 
              keyboardType="number-pad"
              value={rails} 
              onChangeText={(t) => setRails(t.replace(/[^0-9]/g, ''))} 
              placeholder="Min: 2"
            />

            <View style={styles.modeRow}>
              <TouchableOpacity style={[styles.modeBtn, isEncrypt && styles.activeMode]} onPress={() => setIsEncrypt(true)}>
                <Text style={[styles.modeText, isEncrypt && styles.activeModeText]}>ENCRYPT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modeBtn, !isEncrypt && styles.activeMode]} onPress={() => setIsEncrypt(false)}>
                <Text style={[styles.modeText, !isEncrypt && styles.activeModeText]}>DECRYPT</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={processRailFence}>
              <Text style={styles.primaryBtnText}>GENERATE ZIGZAG</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resLabel}>{isEncrypt ? "Transposed Ciphertext" : "Original Plaintext"}:</Text>
              <View style={styles.outputBox}>
                <Text style={styles.outputText}>{result.output}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Fence Visualization:</Text>
              <ScrollView horizontal>
                <View style={styles.fenceContainer}>
                  {result.fence.map((row, rIdx) => (
                    <View key={rIdx} style={styles.fenceRow}>
                      {row.map((char, cIdx) => (
                        <View key={cIdx} style={[styles.fenceCell, char && {backgroundColor: '#dcfce7', borderColor: '#16a34a'}]}>
                          <Text style={styles.fenceText}>{char || ""}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
              <Text style={styles.caption}>The grid above shows how the letters occupy the {rails} rails.</Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
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
  input: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 16, color: '#111', fontWeight: 'bold' },
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
  fenceContainer: { marginVertical: 10 },
  fenceRow: { flexDirection: 'row', marginBottom: 5 },
  fenceCell: { width: 35, height: 35, borderWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center', marginHorizontal: 1 },
  fenceText: { fontSize: 14, fontWeight: 'bold', color: '#1e293b' },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 10 },
  caption: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', marginTop: 5 }
});