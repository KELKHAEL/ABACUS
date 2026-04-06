import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LinearDiophantineLab({ navigation }) {
  const [valA, setValA] = useState('');
  const [valB, setValB] = useState('');
  const [valC, setValC] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // Auto-fill example function
  const loadExample = (a, b, c) => {
      setValA(a.toString());
      setValB(b.toString());
      setValC(c.toString());
      setResult(null); // Clear previous results
  };

  // Extended Euclidean Algorithm
  const extendedGCD = (a, b) => {
    let s = 0, old_s = 1;
    let t = 1, old_t = 0;
    let r = b, old_r = a;
    const steps = [];

    while (r !== 0) {
      let quotient = Math.floor(old_r / r);
      steps.push({ q: quotient, r: old_r, r2: r, s: old_s, t: old_t });
      
      let temp_r = r;
      r = old_r - quotient * r;
      old_r = temp_r;

      let temp_s = s;
      s = old_s - quotient * s;
      old_s = temp_s;

      let temp_t = t;
      t = old_t - quotient * t;
      old_t = temp_t;
    }
    
    steps.push({ q: '-', r: old_r, r2: r, s: old_s, t: old_t }); 
    return { gcd: old_r, x: old_s, y: old_t, steps };
  };

  const calculateLDE = () => {
    const a = parseInt(valA);
    const b = parseInt(valB);
    const c = parseInt(valC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      alert("Please enter valid integers for A, B, and C.");
      return;
    }
    if (a === 0 && b === 0) {
      alert("A and B cannot both be zero.");
      return;
    }

    const { gcd, x: bezoutX, y: bezoutY, steps } = extendedGCD(Math.abs(a), Math.abs(b));
    
    if (c % gcd !== 0) {
        setResult({ a, b, c, gcd, hasSolution: false });
        return;
    }

    const multiplier = c / gcd;
    let x0 = bezoutX * multiplier;
    let y0 = bezoutY * multiplier;

    if (a < 0) x0 = -x0;
    if (b < 0) y0 = -y0;

    setResult({
        a, b, c, gcd,
        bezoutX, bezoutY,
        multiplier, x0, y0,
        hasSolution: true,
        steps
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Linear Diophantine</Text>
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
              <Text style={styles.formulaText}>Ax + By = C</Text>
              <Text style={styles.theoryText}>
                A Linear Diophantine Equation looks for integer solutions for <Text style={{fontWeight: 'bold'}}>x</Text> and <Text style={{fontWeight: 'bold'}}>y</Text>.
              </Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>Bezout's Identity / Existence:</Text>
              <Text style={styles.theoryText}>
                A solution ONLY exists if the Greatest Common Divisor (GCD) of A and B evenly divides C. 
                {"\n\n"}We use the <Text style={{fontWeight: 'bold'}}>Extended Euclidean Algorithm</Text> to find the base coefficients, then multiply them to reach C.
              </Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Solve Equation</Text>
            
            {/* ✅ NEW: Clickable Examples */}
            <View style={styles.exampleBox}>
                <Text style={styles.exampleTitle}>Tap to Try an Example:</Text>
                <TouchableOpacity onPress={() => loadExample(15, 35, 100)}>
                    <Text style={styles.exampleText}>• 15x + 35y = 100 <Text style={{color: '#10b981'}}>(Has Solution)</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadExample(21, 14, 5)}>
                    <Text style={styles.exampleText}>• 21x + 14y = 5 <Text style={{color: '#ef4444'}}>(No Solution)</Text></Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.equationDisplay}>
                <TextInput style={[styles.inputSm, {flex: 1}]} keyboardType="numeric" value={valA} onChangeText={setValA} placeholder="A" />
                <Text style={styles.eqText}> x  + </Text>
                <TextInput style={[styles.inputSm, {flex: 1}]} keyboardType="numeric" value={valB} onChangeText={setValB} placeholder="B" />
                <Text style={styles.eqText}> y  = </Text>
                <TextInput style={[styles.inputSm, {flex: 1}]} keyboardType="numeric" value={valC} onChangeText={setValC} placeholder="C" />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculateLDE}>
              <Text style={styles.calcButtonText}>Solve & Explain</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={[styles.resultCard, !result.hasSolution && {borderLeftColor: '#ef4444'}]}>
              <Text style={styles.resultTitle}>GCD Check</Text>
              <Text style={styles.stepExplanation}>
                  GCD({result.a}, {result.b}) = <Text style={{fontWeight: 'bold', color: '#111'}}>{result.gcd}</Text>
              </Text>
              
              {!result.hasSolution ? (
                  <View style={styles.noSolutionBox}>
                      <Text style={styles.noSolutionText}>
                          NO SOLUTION.{"\n"}
                          {result.c} is NOT divisible by the GCD ({result.gcd}).
                      </Text>
                  </View>
              ) : (
                  <>
                      <Text style={styles.stepExplanation}>
                          Since {result.gcd} divides {result.c} evenly (multiplier = {result.multiplier}), a solution exists!
                      </Text>
                      
                      <View style={styles.divider} />
                      <Text style={styles.stepTitle}>1. Extended Euclidean Steps</Text>
                      <Text style={{fontSize: 12, color: '#64748b', marginBottom: 10}}>Finding Bezout coefficients for A(x) + B(y) = GCD</Text>
                      
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} bounces={false}>
                          <View style={styles.strictTableWrapper}>
                              <View style={styles.strictHeaderRow}>
                                  <Text style={styles.th}>Q</Text>
                                  <Text style={styles.th}>R1</Text>
                                  <Text style={styles.th}>R2</Text>
                                  <Text style={styles.th}>X</Text>
                                  <Text style={styles.th}>Y</Text>
                              </View>
                              {result.steps.map((s, idx) => (
                                  <View key={idx} style={styles.strictDataRow}>
                                      <Text style={styles.td}>{s.q}</Text>
                                      <Text style={styles.td}>{s.r}</Text>
                                      <Text style={styles.td}>{s.r2}</Text>
                                      <Text style={styles.td}>{s.s}</Text>
                                      <Text style={styles.td}>{s.t}</Text>
                                  </View>
                              ))}
                          </View>
                      </ScrollView>

                      <View style={styles.mathStepContainer}>
                          <Text style={styles.mathStepText}>Base X = {result.bezoutX}</Text>
                          <Text style={styles.mathStepText}>Base Y = {result.bezoutY}</Text>
                      </View>

                      <View style={styles.divider} />
                      <Text style={styles.stepTitle}>2. Multiply to reach C</Text>
                      <Text style={styles.stepExplanation}>We must multiply the base coefficients by (C / GCD) = {result.multiplier}.</Text>

                      <View style={styles.finalBox}>
                          <Text style={styles.finalTitle}>Particular Solution:</Text>
                          <Text style={styles.finalText}>x = {result.bezoutX} × {result.multiplier} = <Text style={{color: '#104a28'}}>{result.x0}</Text></Text>
                          <Text style={styles.finalText}>y = {result.bezoutY} × {result.multiplier} = <Text style={{color: '#104a28'}}>{result.y0}</Text></Text>
                      </View>

                      <View style={styles.divider} />
                      <Text style={styles.stepTitle}>3. General Solution</Text>
                      <Text style={styles.generalText}>x = {result.x0} + ({result.b / result.gcd})t</Text>
                      <Text style={styles.generalText}>y = {result.y0} - ({result.a / result.gcd})t</Text>
                      <Text style={{fontSize: 11, color: '#94a3b8', fontStyle: 'italic', marginTop: 5}}>Where 't' is any integer.</Text>
                  </>
              )}
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
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  formulaText: { fontSize: 18, fontFamily: 'monospace', color: '#104a28', textAlign: 'center', marginBottom: 10, backgroundColor: '#f0fdf4', padding: 10, borderRadius: 8 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  exampleBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, marginBottom: 20, borderLeftWidth: 3, borderLeftColor: '#3b82f6' },
  exampleTitle: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 6 },
  exampleText: { fontSize: 14, color: '#1e293b', fontFamily: 'monospace', marginBottom: 4, paddingVertical: 4 },

  equationDisplay: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  inputSm: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16, textAlign: 'center' },
  eqText: { fontSize: 18, fontWeight: 'bold', color: '#475569' },
  
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#3b82f6' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', marginBottom: 5 },
  stepExplanation: { fontSize: 14, color: '#4b5563' },
  
  noSolutionBox: { backgroundColor: '#fef2f2', borderColor: '#fca5a5', borderWidth: 1, padding: 15, borderRadius: 8, marginTop: 15 },
  noSolutionText: { color: '#dc2626', fontWeight: 'bold', textAlign: 'center', lineHeight: 22 },
  
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  
  strictTableWrapper: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, overflow: 'hidden', alignSelf: 'flex-start', marginBottom: 15 },
  strictHeaderRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  strictDataRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  th: { width: 60, paddingVertical: 8, textAlign: 'center', fontWeight: 'bold', color: '#475569', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  td: { width: 60, paddingVertical: 10, textAlign: 'center', fontFamily: 'monospace', borderRightWidth: 1, borderRightColor: '#e2e8f0' },

  mathStepContainer: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#94a3b8' },
  mathStepText: { fontSize: 14, fontFamily: 'monospace', color: '#334155', marginVertical: 2 },
  
  finalBox: { backgroundColor: '#f0fdf4', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#bbf7d0', marginTop: 10 },
  finalTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 5 },
  finalText: { fontSize: 18, fontFamily: 'monospace', fontWeight: 'bold', color: '#333' },
  
  generalText: { fontSize: 16, fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: 10, borderRadius: 6, marginVertical: 3, overflow: 'hidden' }
});