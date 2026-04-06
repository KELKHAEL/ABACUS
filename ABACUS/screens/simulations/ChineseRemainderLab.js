import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChineseRemainderLab({ navigation }) {
  const [a1, setA1] = useState(''); const [m1, setM1] = useState('');
  const [a2, setA2] = useState(''); const [m2, setM2] = useState('');
  const [a3, setA3] = useState(''); const [m3, setM3] = useState('');
  
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // Auto-fill example function
  const loadExample = (arrA, arrM) => {
      setA1(arrA[0].toString()); setM1(arrM[0].toString());
      setA2(arrA[1].toString()); setM2(arrM[1].toString());
      setA3(arrA[2].toString()); setM3(arrM[2].toString());
      setResult(null);
  };

  const modInverse = (a, m) => {
    let m0 = m, y = 0, x = 1;
    if (m === 1) return 0;
    while (a > 1) {
        let q = Math.floor(a / m);
        let t = m;
        m = a % m;
        a = t;
        t = y;
        y = x - q * y;
        x = t;
    }
    if (x < 0) x += m0;
    return x;
  };

  const calculateCRT = () => {
    const eqs = [
        { a: parseInt(a1), m: parseInt(m1) },
        { a: parseInt(a2), m: parseInt(m2) },
        { a: parseInt(a3), m: parseInt(m3) }
    ];

    for (let eq of eqs) {
        if (isNaN(eq.a) || isNaN(eq.m) || eq.m <= 1) {
            alert("Please enter valid remainders and modulos (m > 1) for all 3 fields.");
            return;
        }
    }

    const M = eqs[0].m * eqs[1].m * eqs[2].m;
    
    let totalSum = 0;
    const steps = eqs.map((eq, i) => {
        const Mi = M / eq.m;
        const yi = modInverse(Mi % eq.m, eq.m);
        const partialSum = eq.a * Mi * yi;
        totalSum += partialSum;
        
        return {
            i: i + 1,
            a: eq.a,
            m: eq.m,
            Mi: Mi,
            yi: yi,
            partialSum: partialSum
        };
    });

    const finalX = totalSum % M;

    setResult({ M, totalSum, finalX, steps });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chinese Remainder</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Theorem</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                The Chinese Remainder Theorem (CRT) finds a single number <Text style={{fontWeight: 'bold'}}>x</Text> that leaves specific remainders when divided by mutually coprime numbers.
              </Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>The Formula Steps:</Text>
              <Text style={styles.theoryText}>1. Find <Text style={{fontWeight: 'bold'}}>M</Text> = m₁ × m₂ × m₃</Text>
              <Text style={styles.theoryText}>2. For each equation, find <Text style={{fontWeight: 'bold'}}>M_i</Text> = M / m_i</Text>
              <Text style={styles.theoryText}>3. Find <Text style={{fontWeight: 'bold'}}>y_i</Text> (the modular inverse of M_i mod m_i)</Text>
              <Text style={styles.theoryText}>4. Sum them up: <Text style={{fontWeight: 'bold'}}>x = Σ (a_i × M_i × y_i)</Text></Text>
              <Text style={styles.theoryText}>5. Final Answer = Sum mod M</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>System of Congruences</Text>
            
            {/* ✅ NEW: Clickable Examples */}
            <View style={styles.exampleBox}>
                <Text style={styles.exampleTitle}>Tap to Try an Example:</Text>
                <TouchableOpacity onPress={() => loadExample([2, 3, 2], [3, 5, 7])}>
                    <Text style={styles.exampleText}>• Sun Tzu's Puzzle (m = 3, 5, 7)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadExample([3, 4, 1], [4, 5, 7])}>
                    <Text style={styles.exampleText}>• Standard System (m = 4, 5, 7)</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.instructionText}>Enter values for: x ≡ a (mod m)</Text>
            
            <View style={styles.inputRow}>
              <Text style={styles.eqText}>x ≡ </Text>
              <TextInput style={styles.inputSm} keyboardType="numeric" value={a1} onChangeText={setA1} placeholder="a₁" />
              <Text style={styles.eqText}> mod </Text>
              <TextInput style={styles.inputSm} keyboardType="numeric" value={m1} onChangeText={setM1} placeholder="m₁" />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.eqText}>x ≡ </Text>
              <TextInput style={styles.inputSm} keyboardType="numeric" value={a2} onChangeText={setA2} placeholder="a₂" />
              <Text style={styles.eqText}> mod </Text>
              <TextInput style={styles.inputSm} keyboardType="numeric" value={m2} onChangeText={setM2} placeholder="m₂" />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.eqText}>x ≡ </Text>
              <TextInput style={styles.inputSm} keyboardType="numeric" value={a3} onChangeText={setA3} placeholder="a₃" />
              <Text style={styles.eqText}> mod </Text>
              <TextInput style={styles.inputSm} keyboardType="numeric" value={m3} onChangeText={setM3} placeholder="m₃" />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculateCRT}>
              <Text style={styles.calcButtonText}>Solve System</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Final Answer</Text>
              <Text style={styles.resultHighlight}>x = {result.finalX}</Text>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Step 1: Total Modulo (M)</Text>
              <Text style={styles.mathStepText}>M = {m1} × {m2} × {m3} = <Text style={{fontWeight: 'bold', color: '#111'}}>{result.M}</Text></Text>
              
              <View style={styles.divider} />
              <Text style={styles.stepTitle}>Step 2: Calculate Components</Text>

              <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} bounces={false}>
                  <View style={styles.strictTableWrapper}>
                      <View style={styles.strictHeaderRow}>
                          <Text style={styles.thSm}>Eq</Text>
                          <Text style={styles.th}>a_i</Text>
                          <Text style={styles.th}>M_i</Text>
                          <Text style={styles.th}>y_i (inv)</Text>
                          <Text style={styles.thLg}>a × M_i × y_i</Text>
                      </View>
                      {result.steps.map((s) => (
                          <View key={s.i} style={styles.strictDataRow}>
                              <Text style={styles.tdSm}>{s.i}</Text>
                              <Text style={styles.td}>{s.a}</Text>
                              <Text style={styles.td}>{s.Mi}</Text>
                              <Text style={styles.td}>{s.yi}</Text>
                              <Text style={styles.tdLg}>{s.partialSum}</Text>
                          </View>
                      ))}
                  </View>
              </ScrollView>

              <View style={styles.divider} />
              <Text style={styles.stepTitle}>Step 3: Summation & Final Modulo</Text>
              <Text style={styles.mathStepText}>Total Sum = {result.totalSum}</Text>
              <Text style={styles.mathStepText}>Final x = {result.totalSum} mod {result.M}</Text>
              <Text style={[styles.mathStepText, {color: '#104a28', fontWeight: 'bold'}]}>x = {result.finalX}</Text>

            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  exampleBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, marginBottom: 20, borderLeftWidth: 3, borderLeftColor: '#8b5cf6' },
  exampleTitle: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 6 },
  exampleText: { fontSize: 14, color: '#6366f1', fontFamily: 'monospace', marginBottom: 4, paddingVertical: 4, fontWeight: 'bold' },

  instructionText: { fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginBottom: 15, textAlign: 'center' },
  
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  inputSm: { flex: 1, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16, textAlign: 'center' },
  eqText: { fontSize: 16, fontWeight: 'bold', color: '#475569', width: 50, textAlign: 'center' },
  
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#8b5cf6' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' },
  resultHighlight: { fontSize: 28, fontWeight: '900', color: '#104a28', textAlign: 'center', marginVertical: 5, fontFamily: 'monospace' },
  
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  mathStepText: { fontSize: 15, fontFamily: 'monospace', color: '#4b5563', backgroundColor: '#f8fafc', padding: 8, borderRadius: 6, marginVertical: 3, overflow: 'hidden' },

  strictTableWrapper: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, overflow: 'hidden', alignSelf: 'flex-start', marginBottom: 5 },
  strictHeaderRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  strictDataRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  
  thSm: { width: 40, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: '#475569', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  tdSm: { width: 40, paddingVertical: 12, textAlign: 'center', fontFamily: 'monospace', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  
  th: { width: 70, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: '#475569', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  td: { width: 70, paddingVertical: 12, textAlign: 'center', fontFamily: 'monospace', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  
  thLg: { width: 120, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: '#475569' },
  tdLg: { width: 120, paddingVertical: 12, textAlign: 'center', fontFamily: 'monospace', color: '#2563eb', fontWeight: 'bold' },
});