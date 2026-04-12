import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LinearDiophantineLab({ navigation }) {
  const [valA, setValA] = useState('');
  const [valB, setValB] = useState('');
  const [valC, setValC] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT VALIDATION: Allows numbers and a starting negative sign only
  const handleInput = (text, setter) => {
    let cleanText = text.replace(/[^0-9-]/g, '');
    if (cleanText.lastIndexOf('-') > 0) {
      cleanText = cleanText.replace(/-/g, '');
      if (text.startsWith('-')) cleanText = '-' + cleanText;
    }
    setter(cleanText);
  };

  // ✅ EXPANDED PRESET EXAMPLES
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
    Keyboard.dismiss();
    
    if (!valA || !valB || !valC) {
        Alert.alert("Required Fields", "Please enter values for A, B, and C.");
        return;
    }

    const a = parseInt(valA, 10);
    const b = parseInt(valB, 10);
    const c = parseInt(valC, 10);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      Alert.alert("Input Error", "Please enter valid integers for A, B, and C.");
      return;
    }
    if (a === 0 && b === 0) {
      Alert.alert("Math Error", "A and B cannot both be zero simultaneously.");
      return;
    }
    if (Math.abs(a) > 999999999 || Math.abs(b) > 999999999 || Math.abs(c) > 999999999) {
      Alert.alert("Hardware Limit", "Values are too large. Please keep values under 1 Billion.");
      return;
    }

    const { gcd, x: bezoutX, y: bezoutY, steps } = extendedGCD(Math.abs(a), Math.abs(b));
    
    // Bezout's Check
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
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> This equation only accepts integer coefficients (A, B, C). Decimals are strictly prohibited.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Negatives:</Text> You may use negative integers for A, B, or C.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>The Goal:</Text> We are trying to find integer values for <Text style={{fontStyle:'italic'}}>x</Text> and <Text style={{fontStyle:'italic'}}>y</Text> that make the equation perfectly equal C.</Text>
          </View>

          {/* 📚 THEORY CARD */}
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

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(15, 35, 100)}>
                  <Ionicons name="checkmark-circle-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Standard (Has Solution)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(21, 14, 5)}>
                  <Ionicons name="close-circle-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Impossible (No Solution)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(-12, 18, 30)}>
                  <Ionicons name="remove-circle-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Negative Coefficients</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Solve Equation</Text>
            
            <View style={styles.equationDisplay}>
                <TextInput style={[styles.inputSm, {flex: 1}]} keyboardType="numbers-and-punctuation" value={valA} onChangeText={(t) => handleInput(t, setValA)} placeholder="A" maxLength={7} />
                <Text style={styles.eqText}> x  + </Text>
                <TextInput style={[styles.inputSm, {flex: 1}]} keyboardType="numbers-and-punctuation" value={valB} onChangeText={(t) => handleInput(t, setValB)} placeholder="B" maxLength={7} />
                <Text style={styles.eqText}> y  = </Text>
                <TextInput style={[styles.inputSm, {flex: 1}]} keyboardType="numbers-and-punctuation" value={valC} onChangeText={(t) => handleInput(t, setValC)} placeholder="C" maxLength={7} />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculateLDE}>
              <Text style={styles.calcButtonText}>Solve & Explain</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 STEP-BY-STEP RESULT CARD */}
          {result && (
            <View style={[styles.resultCard, !result.hasSolution && {borderLeftColor: '#ef4444'}]}>
              <Text style={styles.resultTitle}>1. Bezout's Check (Existence)</Text>
              <Text style={styles.stepExplanation}>
                  First, we find the Greatest Common Divisor of A and B.
                  {"\n"}GCD({result.a}, {result.b}) = <Text style={{fontWeight: 'bold', color: '#111'}}>{result.gcd}</Text>
              </Text>
              
              {!result.hasSolution ? (
                  <View style={styles.noSolutionBox}>
                      <Ionicons name="warning-outline" size={24} color="#dc2626" style={{marginBottom: 5}}/>
                      <Text style={styles.noSolutionText}>
                          NO INTEGER SOLUTION EXISTS.{"\n\n"}
                          According to Bezout's Identity, a solution only exists if the GCD ({result.gcd}) perfectly divides C ({result.c}). Since {result.c} ÷ {result.gcd} leaves a remainder, it is impossible!
                      </Text>
                  </View>
              ) : (
                  <>
                      <View style={styles.solutionBox}>
                          <Ionicons name="checkmark-circle" size={20} color="#166534" style={{marginRight: 6}} />
                          <Text style={styles.solutionBoxText}>
                              Since {result.gcd} divides {result.c} evenly, solutions exist!
                          </Text>
                      </View>
                      
                      <View style={styles.divider} />
                      <Text style={styles.stepTitle}>2. Extended Euclidean Steps</Text>
                      <Text style={{fontSize: 13, color: '#64748b', marginBottom: 10}}>We run the algorithm in reverse to find the base coefficients (X and Y) that equal the GCD.</Text>
                      
                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} bounces={false}>
                          <View style={styles.strictTableWrapper}>
                              <View style={styles.strictHeaderRow}>
                                  <Text style={styles.th}>Q</Text>
                                  <Text style={styles.th}>R1</Text>
                                  <Text style={styles.th}>R2</Text>
                                  <Text style={styles.th}>Base X</Text>
                                  <Text style={styles.th}>Base Y</Text>
                              </View>
                              {result.steps.map((s, idx) => (
                                  <View key={idx} style={styles.strictDataRow}>
                                      <Text style={styles.td}>{s.q}</Text>
                                      <Text style={styles.td}>{s.r}</Text>
                                      <Text style={styles.td}>{s.r2}</Text>
                                      <Text style={[styles.td, idx === result.steps.length - 1 && {color: '#2563eb', fontWeight: 'bold'}]}>{s.s}</Text>
                                      <Text style={[styles.td, idx === result.steps.length - 1 && {color: '#ea580c', fontWeight: 'bold'}]}>{s.t}</Text>
                                  </View>
                              ))}
                          </View>
                      </ScrollView>

                      <View style={styles.mathStepContainer}>
                          <Text style={styles.mathStepText}>Base X = {result.bezoutX}</Text>
                          <Text style={styles.mathStepText}>Base Y = {result.bezoutY}</Text>
                      </View>

                      <View style={styles.divider} />
                      <Text style={styles.stepTitle}>3. Multiply to reach C</Text>
                      <Text style={styles.stepExplanation}>The base coefficients only equal the GCD ({result.gcd}). To reach C ({result.c}), we must multiply them by (C ÷ GCD) = <Text style={{fontWeight: 'bold'}}>{result.multiplier}</Text>.</Text>

                      <View style={styles.finalBox}>
                          <Text style={styles.finalTitle}>Particular Solution (One Answer):</Text>
                          <Text style={styles.finalText}>x = {result.bezoutX} × {result.multiplier} = <Text style={{color: '#104a28'}}>{result.x0}</Text></Text>
                          <Text style={styles.finalText}>y = {result.bezoutY} × {result.multiplier} = <Text style={{color: '#104a28'}}>{result.y0}</Text></Text>
                      </View>

                      <View style={styles.divider} />
                      <Text style={styles.stepTitle}>4. General Solution</Text>
                      
                      <View style={styles.explanationBox}>
                          <Ionicons name="infinite-outline" size={20} color="#b45309" style={{marginTop: 2}}/>
                          <Text style={styles.explanationText}>
                              <Text style={{fontWeight: 'bold', color: '#78350f'}}>Infinite Answers:</Text> Because this is a line, there are infinite points along it. By adding/subtracting ratios of A and B using the variable <Text style={{fontWeight: 'bold'}}>'t'</Text>, you can find all other integer solutions!
                          </Text>
                      </View>

                      <Text style={styles.generalText}>x = {result.x0} + ({result.b / result.gcd})t</Text>
                      <Text style={styles.generalText}>y = {result.y0} - ({result.a / result.gcd})t</Text>
                      <Text style={{fontSize: 12, color: '#94a3b8', fontStyle: 'italic', marginTop: 5, textAlign: 'center'}}>Where 't' is any whole integer (..., -1, 0, 1, 2, ...)</Text>
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
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  guidelinesCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guidelinesTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1' },
  guidelinesText: { fontSize: 13, color: '#0f172a', marginBottom: 4, lineHeight: 18 },

  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#4b5563', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#fde68a', gap: 6 },
  exampleBtnText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },

  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  formulaText: { fontSize: 20, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#104a28', textAlign: 'center', marginBottom: 10, backgroundColor: '#f0fdf4', padding: 10, borderRadius: 8, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  
  equationDisplay: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  inputSm: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', padding: 15, borderRadius: 8, fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#111' },
  eqText: { fontSize: 18, fontWeight: 'bold', color: '#475569' },
  
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#10b981' },
  resultTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', textTransform: 'uppercase', marginBottom: 5 },
  stepExplanation: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  
  noSolutionBox: { backgroundColor: '#fef2f2', borderColor: '#fca5a5', borderWidth: 1, padding: 15, borderRadius: 8, marginTop: 15, alignItems: 'center' },
  noSolutionText: { color: '#dc2626', fontWeight: 'bold', textAlign: 'center', lineHeight: 22 },
  
  solutionBox: { flexDirection: 'row', backgroundColor: '#f0fdf4', padding: 12, borderRadius: 8, marginTop: 15, borderWidth: 1, borderColor: '#bbf7d0', alignItems: 'center' },
  solutionBoxText: { color: '#166534', fontWeight: 'bold', fontSize: 13, flex: 1 },

  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  
  strictTableWrapper: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, overflow: 'hidden', alignSelf: 'flex-start', marginBottom: 15 },
  strictHeaderRow: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  strictDataRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  th: { width: 65, paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: '#475569', borderRightWidth: 1, borderRightColor: '#e2e8f0', fontSize: 13 },
  td: { width: 65, paddingVertical: 12, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', borderRightWidth: 1, borderRightColor: '#e2e8f0', fontSize: 14 },

  mathStepContainer: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#94a3b8' },
  mathStepText: { fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#334155', marginVertical: 3, fontWeight: 'bold' },
  
  finalBox: { backgroundColor: '#f0fdf4', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#bbf7d0', marginTop: 10 },
  finalTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 5 },
  finalText: { fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', color: '#333', marginVertical: 3 },
  
  explanationBox: { flexDirection: 'row', backgroundColor: '#fffbeb', padding: 15, borderRadius: 8, marginVertical: 15, gap: 10, borderWidth: 1, borderColor: '#fef08a' },
  explanationText: { flex: 1, fontSize: 13, color: '#92400e', lineHeight: 20 },

  generalText: { fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', backgroundColor: '#f1f5f9', padding: 12, borderRadius: 6, marginVertical: 4, overflow: 'hidden', fontWeight: 'bold', textAlign: 'center' }
});