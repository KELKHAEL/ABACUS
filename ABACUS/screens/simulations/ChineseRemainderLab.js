import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChineseRemainderLab({ navigation }) {
  const [a1, setA1] = useState(''); const [m1, setM1] = useState('');
  const [a2, setA2] = useState(''); const [m2, setM2] = useState('');
  const [a3, setA3] = useState(''); const [m3, setM3] = useState('');
  
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT VALIDATION: Allows numbers and a starting negative sign ONLY
  const handleInputA = (text, setter) => {
    let cleanText = text.replace(/[^0-9-]/g, '');
    if (cleanText.lastIndexOf('-') > 0) {
      cleanText = cleanText.replace(/-/g, '');
      if (text.startsWith('-')) cleanText = '-' + cleanText;
    }
    setter(cleanText);
  };

  // ✅ STRICT VALIDATION: Modulos must be positive whole numbers
  const handleInputM = (text, setter) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setter(cleanText);
  };

  // Auto-fill example function
  const loadExample = (arrA, arrM) => {
      setA1(arrA[0].toString()); setM1(arrM[0].toString());
      setA2(arrA[1].toString()); setM2(arrM[1].toString());
      setA3(arrA[2].toString()); setM3(arrM[2].toString());
      setResult(null);
  };

  // Helper: GCD to check if modulos are pairwise coprime
  const gcd = (a, b) => {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Extended Euclidean Algorithm for Modular Inverse
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
    Keyboard.dismiss();
    
    if (!a1 || !m1 || !a2 || !m2 || !a3 || !m3) {
      Alert.alert("Required Fields", "Please enter values for all three equations.");
      return;
    }

    const eqs = [
        { a: parseInt(a1, 10), m: parseInt(m1, 10) },
        { a: parseInt(a2, 10), m: parseInt(m2, 10) },
        { a: parseInt(a3, 10), m: parseInt(m3, 10) }
    ];

    for (let eq of eqs) {
        if (isNaN(eq.a) || isNaN(eq.m) || eq.m <= 1) {
            Alert.alert("Input Error", "Please enter valid integers. Modulos (m) must be strictly greater than 1.");
            return;
        }
        if (Math.abs(eq.a) > 99999 || eq.m > 99999) {
            Alert.alert("Hardware Limit", "Values are too large. Please keep numbers under 100,000.");
            return;
        }
    }

    // ✅ NEW: Pairwise Coprime Validation Check
    if (gcd(eqs[0].m, eqs[1].m) !== 1 || gcd(eqs[0].m, eqs[2].m) !== 1 || gcd(eqs[1].m, eqs[2].m) !== 1) {
        Alert.alert(
            "Theorem Violation", 
            "The Chinese Remainder Theorem requires all modulos (m1, m2, m3) to be pairwise coprime (they cannot share any common factors other than 1).\n\nPlease choose different modulos."
        );
        return;
    }

    const M = eqs[0].m * eqs[1].m * eqs[2].m;
    
    let totalSum = 0;
    const steps = eqs.map((eq, i) => {
        const Mi = M / eq.m;
        const yi = modInverse(Mi % eq.m, eq.m);
        
        // Ensure 'a' acts like a positive remainder mathematically if negative
        let positiveA = ((eq.a % eq.m) + eq.m) % eq.m; 
        
        const partialSum = positiveA * Mi * yi;
        totalSum += partialSum;
        
        return {
            i: i + 1,
            a: positiveA, 
            m: eq.m,
            Mi: Mi,
            yi: yi,
            partialSum: partialSum
        };
    });

    const finalX = totalSum % M;

    setResult({ M, totalSum, finalX, steps, rawEqs: eqs });
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
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Target:</Text> We are trying to find a single unknown number <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>x</Text>.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Remainders (a):</Text> What is left over when <Text style={{fontStyle: 'italic'}}>x</Text> is divided. Can be negative.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Modulos (m):</Text> The divisors. They MUST be positive whole numbers ${'> 1'}.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>The Rule:</Text> All modulos must be "Pairwise Coprime" (they cannot share any common factors).</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Theorem</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                The Chinese Remainder Theorem (CRT) proves that if you know the remainders of a number divided by several coprime divisors, you can uniquely determine what that original number was!
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
            
            <View style={styles.exampleBox}>
                <Text style={styles.exampleTitle}>Tap to Try an Example:</Text>
                <TouchableOpacity onPress={() => loadExample([2, 3, 2], [3, 5, 7])}>
                    <Text style={styles.exampleText}>• Sun Tzu's Puzzle (m = 3, 5, 7)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtnMargin} onPress={() => loadExample([3, 4, 1], [4, 5, 7])}>
                    <Text style={styles.exampleText}>• Standard System (m = 4, 5, 7)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtnMargin} onPress={() => loadExample([1, 2, 3], [5, 7, 11])}>
                    <Text style={styles.exampleText}>• Larger Primes (m = 5, 7, 11)</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.instructionText}>Enter values for: x ≡ a (mod m)</Text>
            
            <View style={styles.inputRow}>
              <Text style={styles.eqText}>x ≡ </Text>
              <TextInput style={styles.inputSm} keyboardType="numbers-and-punctuation" value={a1} onChangeText={(t) => handleInputA(t, setA1)} placeholder="a₁" maxLength={6} />
              <Text style={styles.eqText}> mod </Text>
              <TextInput style={styles.inputSm} keyboardType="number-pad" value={m1} onChangeText={(t) => handleInputM(t, setM1)} placeholder="m₁" maxLength={6} />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.eqText}>x ≡ </Text>
              <TextInput style={styles.inputSm} keyboardType="numbers-and-punctuation" value={a2} onChangeText={(t) => handleInputA(t, setA2)} placeholder="a₂" maxLength={6} />
              <Text style={styles.eqText}> mod </Text>
              <TextInput style={styles.inputSm} keyboardType="number-pad" value={m2} onChangeText={(t) => handleInputM(t, setM2)} placeholder="m₂" maxLength={6} />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.eqText}>x ≡ </Text>
              <TextInput style={styles.inputSm} keyboardType="numbers-and-punctuation" value={a3} onChangeText={(t) => handleInputA(t, setA3)} placeholder="a₃" maxLength={6} />
              <Text style={styles.eqText}> mod </Text>
              <TextInput style={styles.inputSm} keyboardType="number-pad" value={m3} onChangeText={(t) => handleInputM(t, setM3)} placeholder="m₃" maxLength={6} />
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

              {/* ✅ NEW: VERIFICATION BOX */}
              <View style={styles.verificationBox}>
                  <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8}}>
                      <Ionicons name="checkmark-done-circle" size={20} color="#166534" />
                      <Text style={styles.verificationTitle}>Proof / Verification:</Text>
                  </View>
                  <Text style={styles.verificationText}>Does {result.finalX} satisfy the original equations?</Text>
                  
                  {result.rawEqs.map((eq, i) => {
                      // Mathematical modulo handling for the proof
                      const expectedRem = ((eq.a % eq.m) + eq.m) % eq.m;
                      return (
                          <Text key={i} style={styles.verificationMath}>
                              {result.finalX} mod {eq.m} = <Text style={{color: '#16a34a', fontWeight: 'bold'}}>{result.finalX % eq.m}</Text> 
                              <Text style={{color: '#64748b'}}>  (Target was {expectedRem})</Text>
                          </Text>
                      )
                  })}
              </View>

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
  
  guidelinesCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guidelinesTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1' },
  guidelinesText: { fontSize: 13, color: '#0f172a', marginBottom: 4, lineHeight: 18 },

  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  exampleBox: { backgroundColor: '#f1f5f9', padding: 15, borderRadius: 8, marginBottom: 20, borderLeftWidth: 3, borderLeftColor: '#8b5cf6' },
  exampleTitle: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 8 },
  exampleText: { fontSize: 14, color: '#6366f1', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold' },
  exampleBtnMargin: { marginTop: 8 },

  instructionText: { fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginBottom: 15, textAlign: 'center' },
  
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  inputSm: { flex: 1, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', color: '#111' },
  eqText: { fontSize: 16, fontWeight: 'bold', color: '#475569', width: 50, textAlign: 'center' },
  
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#8b5cf6' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' },
  resultHighlight: { fontSize: 28, fontWeight: '900', color: '#104a28', textAlign: 'center', marginVertical: 5, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  mathStepText: { fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#4b5563', backgroundColor: '#f8fafc', padding: 10, borderRadius: 6, marginVertical: 3, overflow: 'hidden' },

  strictTableWrapper: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, overflow: 'hidden', alignSelf: 'flex-start', marginBottom: 5 },
  strictHeaderRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  strictDataRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  
  thSm: { width: 40, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: '#475569', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  tdSm: { width: 40, paddingVertical: 12, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  
  th: { width: 70, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: '#475569', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  td: { width: 70, paddingVertical: 12, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  
  thLg: { width: 130, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: '#475569' },
  tdLg: { width: 130, paddingVertical: 12, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#2563eb', fontWeight: 'bold' },

  verificationBox: { backgroundColor: '#f0fdf4', padding: 15, borderRadius: 8, marginTop: 20, borderWidth: 1, borderColor: '#bbf7d0' },
  verificationTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534' },
  verificationText: { fontSize: 13, color: '#15803d', fontStyle: 'italic', marginBottom: 8 },
  verificationMath: { fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#166534', marginVertical: 3 }
});