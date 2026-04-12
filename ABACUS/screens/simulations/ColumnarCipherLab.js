import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ColumnarCipherLab({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const handleAlphaInput = (text, setter) => {
    const filteredText = text.replace(/[^a-zA-Z]/g, '');
    setter(filteredText);
  };

  const getSortOrder = (key) => {
    const keyArr = key.toUpperCase().split('');
    const sorted = [...keyArr].sort();
    const used = {};
    return keyArr.map(char => {
      const index = sorted.indexOf(char);
      // Handle duplicate letters in the keyword
      const count = (used[char] || 0);
      used[char] = count + 1;
      return index + count;
    });
  };

  const processColumnar = () => {
    Keyboard.dismiss();
    if (!inputText || !keyword) {
      Alert.alert("Input Error", "Please provide both a message and a keyword.");
      return;
    }

    const keyLen = keyword.length;
    const order = getSortOrder(keyword);
    let output = "";
    let grid = [];

    if (isEncrypt) {
      // 1. Fill Grid
      let tempMsg = inputText.toUpperCase();
      while (tempMsg.length % keyLen !== 0) tempMsg += "X"; // Padding
      
      for (let i = 0; i < tempMsg.length; i += keyLen) {
        grid.push(tempMsg.substring(i, i + keyLen).split(''));
      }

      // 2. Read by Column Order
      const sortedCols = [];
      for (let i = 0; i < keyLen; i++) {
        const colIndex = order.indexOf(i);
        let colStr = "";
        for (let row = 0; row < grid.length; row++) {
          colStr += grid[row][colIndex];
        }
        sortedCols.push(colStr);
      }
      output = sortedCols.join('');
    } else {
      // Decryption Logic
      const numRows = Math.ceil(inputText.length / keyLen);
      grid = Array.from({ length: numRows }, () => Array(keyLen).fill(''));
      
      let charIdx = 0;
      for (let i = 0; i < keyLen; i++) {
        const colIndex = order.indexOf(i);
        for (let r = 0; r < numRows; r++) {
          if (charIdx < inputText.length) {
            grid[r][colIndex] = inputText[charIdx++];
          }
        }
      }
      output = grid.map(row => row.join('')).join('');
    }

    setResult({ output, grid, order: order.map(v => v + 1) });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Columnar Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="apps-outline" size={22} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Keyword:</Text> Determines the number of columns and the order they are read.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Padding:</Text> 'X' is added if the message doesn't fill the grid.</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book-outline" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Understanding Columnar Transposition</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>This is a fractionating cipher. It breaks the message into a grid and performs a permutation on the columns based on a secret word.</Text>
              
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold'}}>Key Ranking:</Text> If the key is "CAT", the order is A(1), C(2), T(3). We read the column under A first, then C, then T.</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.label}>Message (Letters Only)</Text>
            <TextInput 
              style={styles.input} 
              value={inputText} 
              onChangeText={(t) => handleAlphaInput(t, setInputText)} 
              placeholder="e.g. SECRETABACUS"
              autoCapitalize="characters"
            />

            <Text style={[styles.label, {marginTop: 15}]}>Keyword</Text>
            <TextInput 
              style={styles.input} 
              value={keyword} 
              onChangeText={(t) => handleAlphaInput(t, setKeyword)} 
              placeholder="e.g. BOND"
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

            <TouchableOpacity style={styles.primaryBtn} onPress={processColumnar}>
              <Text style={styles.primaryBtnText}>GENERATE GRID</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resLabel}>Final Result:</Text>
              <View style={styles.outputBox}>
                <Text style={styles.outputText}>{result.output}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Transposition Matrix Visualization:</Text>
              <ScrollView horizontal>
                <View style={styles.gridContainer}>
                  {/* Keyword Header */}
                  <View style={styles.gridRow}>
                    {keyword.toUpperCase().split('').map((char, i) => (
                      <View key={i} style={[styles.gridCell, {backgroundColor: '#e0f2fe'}]}>
                        <Text style={styles.keyChar}>{char}</Text>
                        <Text style={styles.keyRank}>{result.order[i]}</Text>
                      </View>
                    ))}
                  </View>
                  {/* Data Rows */}
                  {result.grid.map((row, rIdx) => (
                    <View key={rIdx} style={styles.gridRow}>
                      {row.map((char, cIdx) => (
                        <View key={cIdx} style={styles.gridCell}>
                          <Text style={styles.cellText}>{char}</Text>
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
              <Text style={styles.caption}>Letters are read column-by-column in the order of the numbers above.</Text>
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
  gridContainer: { marginVertical: 10, borderWidth: 1, borderColor: '#eee' },
  gridRow: { flexDirection: 'row' },
  gridCell: { width: 45, height: 55, borderWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  keyChar: { fontSize: 14, fontWeight: 'bold', color: '#0369a1' },
  keyRank: { fontSize: 10, color: '#64748B' },
  cellText: { fontSize: 14, color: '#1e293b' },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 10 },
  caption: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', marginTop: 5 }
});