import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BitwiseSimulation({ navigation }) {
  const [valA, setValA] = useState('');
  const [valB, setValB] = useState('');
  const [results, setResults] = useState(null);

  const formatBinary = (str) => {
    const clean = str.replace(/\s/g, '');
    return clean.replace(/(.{4})/g, '$1 ').trim();
  };

  // --- LOGIC ENGINE ---
  const calculateBitwise = () => {
    const cleanA = valA.replace(/[^01]/g, ''); 
    const cleanB = valB.replace(/[^01]/g, '');

    if (!cleanA || !cleanB) {
      Alert.alert("Input Error", "Please enter binary values (0 and 1) in both fields.");
      return;
    }

    const maxLength = Math.max(cleanA.length, cleanB.length);
    const binA = cleanA.padStart(maxLength, '0');
    const binB = cleanB.padStart(maxLength, '0');

    let resOR = '';
    let resAND = '';
    let resXOR = '';

    for (let i = 0; i < maxLength; i++) {
      const bitA = binA[i] === '1' ? 1 : 0;
      const bitB = binB[i] === '1' ? 1 : 0;

      resOR += (bitA | bitB);
      resAND += (bitA & bitB);
      resXOR += (bitA ^ bitB); 
    }

    setResults({
      rawA: binA, 
      rawB: binB,
      inputA: formatBinary(binA),
      inputB: formatBinary(binB),
      or: formatBinary(resOR),
      and: formatBinary(resAND),
      xor: formatBinary(resXOR)
    });
  };

  // --- EXPLANATION SYSTEM ---
  const explainOp = (type) => {
    if (!results) return;

    // Get the first bit as a simple example
    const firstBitA = results.rawA[0];
    const firstBitB = results.rawB[0];
    let exampleResult, ruleText, title;

    if (type === 'OR') {
      title = "Bitwise OR (|)";
      ruleText = "The result is 1 if AT LEAST ONE bit is 1.\nIt is only 0 if BOTH bits are 0.";
      exampleResult = (parseInt(firstBitA) | parseInt(firstBitB));
    } else if (type === 'AND') {
      title = "Bitwise AND (&)";
      ruleText = "The result is 1 ONLY IF both bits are 1.\nOtherwise, it is 0.";
      exampleResult = (parseInt(firstBitA) & parseInt(firstBitB));
    } else if (type === 'XOR') {
      title = "Bitwise XOR (^)";
      ruleText = "The result is 1 if the bits are DIFFERENT.\nIf they are the same (both 0 or both 1), the result is 0.";
      exampleResult = (parseInt(firstBitA) ^ parseInt(firstBitB));
    }

    Alert.alert(
      title,
      `${ruleText}\n\nExample (First Column):\nInput A: ${firstBitA}\nInput B: ${firstBitB}\nResult: ${exampleResult}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BITWISE CALCULATOR</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>INPUT BINARY STRINGS</Text>
        <Text style={styles.subHint}>Enter 0s and 1s only.</Text>

        {/* INPUT A */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Binary String A</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 1010" 
            placeholderTextColor="#ccc"
            value={valA}
            onChangeText={(text) => setValA(text.replace(/[^01\s]/g, ''))} 
            keyboardType="number-pad"
            maxLength={16} 
          />
        </View>

        {/* INPUT B */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Binary String B</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 0011" 
            placeholderTextColor="#ccc"
            value={valB}
            onChangeText={(text) => setValB(text.replace(/[^01\s]/g, ''))}
            keyboardType="number-pad"
            maxLength={16}
          />
        </View>

        {/* CALCULATE BUTTON */}
        <TouchableOpacity style={styles.calcBtn} onPress={calculateBitwise}>
          <Text style={styles.btnText}>COMPUTE LOGIC</Text>
        </TouchableOpacity>

        {/* RESULTS CARD */}
        {results && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>CALCULATION RESULTS</Text>
            <Text style={styles.tapHint}>(Tap any row for explanation)</Text>
            
            <View style={styles.codeBlock}>
              
              {/* Inputs aligned */}
              <View style={styles.row}>
                <Text style={styles.monoText}>{results.inputA}</Text>
                <Text style={styles.annotation}>  (Input A)</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.monoText}>{results.inputB}</Text>
                <Text style={styles.annotation}>  (Input B)</Text>
              </View>
              
              <View style={styles.divider} />

              {/* Clickable Result Rows */}
              <TouchableOpacity style={styles.rowBtn} onPress={() => explainOp('OR')}>
                <Text style={[styles.monoText, {color: '#2D7FF9'}]}>{results.or}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.annotation}>  bitwise OR  </Text>
                  <Ionicons name="information-circle-outline" size={16} color="#2D7FF9" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.rowBtn} onPress={() => explainOp('AND')}>
                <Text style={[styles.monoText, {color: '#7B61FF'}]}>{results.and}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.annotation}>  bitwise AND  </Text>
                  <Ionicons name="information-circle-outline" size={16} color="#7B61FF" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.rowBtn} onPress={() => explainOp('XOR')}>
                <Text style={[styles.monoText, {color: '#F25487'}]}>{results.xor}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.annotation}>  bitwise XOR  </Text>
                  <Ionicons name="information-circle-outline" size={16} color="#F25487" />
                </View>
              </TouchableOpacity>

            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#333' },
  
  content: { padding: 20 },
  heading: { fontSize: 22, fontWeight: '900', color: '#000', marginBottom: 5 },
  subHint: { fontSize: 14, color: '#666', marginBottom: 25 },

  inputGroup: { marginBottom: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#888', marginBottom: 8, textTransform: 'uppercase' },
  input: { 
    backgroundColor: '#fff', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', 
    fontSize: 20, color: '#333', fontWeight: 'bold', letterSpacing: 2,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 
  },

  calcBtn: { backgroundColor: '#000', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 30, marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },

  resultCard: { backgroundColor: '#fff', padding: 25, borderRadius: 16, borderWidth: 1, borderColor: '#eee', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  resultTitle: { fontSize: 16, fontWeight: '900', color: '#333', textAlign: 'center' },
  tapHint: { fontSize: 12, color: '#888', textAlign: 'center', marginBottom: 20, fontStyle: 'italic' },
  
  codeBlock: { alignSelf: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rowBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingVertical: 4 }, // Added padding for easier tapping

  monoText: { 
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
    letterSpacing: 1
  },
  annotation: { fontSize: 12, color: '#888', fontWeight: '600', fontStyle: 'italic' },
  
  divider: { height: 2, backgroundColor: '#333', marginVertical: 10, width: '100%' },
});