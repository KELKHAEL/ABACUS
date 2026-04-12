import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CaesarCipherLab({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState('3');
  const [isEncrypt, setIsEncrypt] = useState(true);
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleTextInput = (text) => {
    // Allows only A-Z, a-z, and spaces
    const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
    setInputText(filteredText);
  };

  const processCaesar = () => {
    Keyboard.dismiss();
    const s = parseInt(shift);
    if (isNaN(s)) {
      Alert.alert("Input Error", "Please enter a valid numeric shift value.");
      return;
    }

    let output = "";
    let logs = [];
    const effectiveShift = isEncrypt ? s % 26 : (26 - (s % 26)) % 26;

    for (let i = 0; i < inputText.length; i++) {
      let char = inputText[i];
      if (char.match(/[a-z]/i)) {
        const code = inputText.charCodeAt(i);
        let base = (code >= 65 && code <= 90) ? 65 : 97;
        let originalPos = code - base;
        let newPos = (originalPos + effectiveShift) % 26;
        let newChar = String.fromCharCode(newPos + base);
        output += newChar;

        if (i < 5) {
           logs.push(`${char} (Pos: ${originalPos}) → ${newChar} (Pos: ${newPos})`);
        }
      } else {
        output += char; // Only spaces will fall here now
      }
    }

    setResult({ output, logs, s });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Caesar Cipher Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="key-outline" size={22} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Input:</Text> Only alphabetical letters and spaces are allowed.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Shift:</Text> Determines how many steps each letter moves down the alphabet.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Logic:</Text> This is a modular substitution ($X + N \pmod{26}$).</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book-outline" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>What is a Caesar Cipher?</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>Named after Julius Caesar, this cipher shifts each letter a fixed number of positions. It is the most basic form of cryptography based on modular arithmetic.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold'}}>Process:</Text> To encrypt, we add the shift. To decrypt, we subtract it. All calculations wrap around using Modulo 26.</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.label}>Alphabetical Message</Text>
            <TextInput 
              style={[styles.input, {height: 80}]} 
              multiline 
              value={inputText} 
              onChangeText={handleTextInput} 
              placeholder="Enter letters only..."
            />

            <View style={styles.row}>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Shift Value</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric" 
                  value={shift} 
                  onChangeText={(t) => setShift(t.replace(/[^0-9]/g, ''))} 
                />
              </View>
              <TouchableOpacity 
                style={[styles.modeBtn, {backgroundColor: isEncrypt ? '#104a28' : '#0369a1'}]} 
                onPress={() => setIsEncrypt(!isEncrypt)}
              >
                <Text style={styles.modeBtnText}>{isEncrypt ? "ENCRYPT" : "DECRYPT"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={processCaesar}>
              <Text style={styles.primaryBtnText}>RUN CAESAR SIMULATION</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resLabel}>{isEncrypt ? "Ciphertext" : "Plaintext"}:</Text>
              <View style={styles.outputBox}>
                <Text style={styles.outputText}>{result.output}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Visualization (Alphabet Map):</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 15}}>
                <View style={styles.alphabetMap}>
                    <View style={styles.alphaRow}>
                        {alphabet.map(l => <View key={l} style={styles.alphaCell}><Text style={styles.alphaText}>{l}</Text></View>)}
                    </View>
                    <View style={styles.alphaRow}>
                        {alphabet.map((l, idx) => {
                            const currentShift = parseInt(shift) || 0;
                            const shiftedIdx = (idx + (isEncrypt ? currentShift : (26 - (currentShift % 26))) ) % 26;
                            return <View key={idx} style={[styles.alphaCell, {backgroundColor: '#dcfce7'}]}><Text style={[styles.alphaText, {color: '#16a34a'}]}>{alphabet[shiftedIdx]}</Text></View>
                        })}
                    </View>
                </View>
              </ScrollView>

              <Text style={styles.stepTitle}>Step Log:</Text>
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
  content: { padding: 15, paddingBottom: 50 },
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
  input: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 16, color: '#111', textAlignVertical: 'top' },
  row: { flexDirection: 'row', marginTop: 15, gap: 10, alignItems: 'flex-end' },
  modeBtn: { padding: 14, borderRadius: 8, minWidth: 100, alignItems: 'center' },
  modeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  primaryBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 20, elevation: 4 },
  resLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10 },
  outputBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  outputText: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', letterSpacing: 1 },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 10, marginTop: 10 },
  logText: { fontSize: 13, color: '#475569', marginBottom: 4, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  alphabetMap: { borderWidth: 1, borderColor: '#eee' },
  alphaRow: { flexDirection: 'row' },
  alphaCell: { width: 30, height: 30, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#eee', justifyContent: 'center', alignItems: 'center' },
  alphaText: { fontSize: 12, fontWeight: 'bold', color: '#64748B' }
});