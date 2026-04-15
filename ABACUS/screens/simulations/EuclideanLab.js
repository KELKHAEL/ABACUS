import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EuclideanLab({ navigation }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT NUMERIC VALIDATION: Only positive whole numbers
  const handleInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setter(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (valA, valB) => {
    setA(valA.toString());
    setB(valB.toString());
    setResult(null);
  };

  const calculateGCD = () => {
    Keyboard.dismiss();

    if (!a || !b) {
        Alert.alert("Required Fields", "Please enter values for both Number A and Number B.");
        return;
    }

    let numA = parseInt(a, 10);
    let numB = parseInt(b, 10);

    if (isNaN(numA) || isNaN(numB)) {
      Alert.alert("Input Error", "Please enter valid integers.");
      return;
    }

    if (numA === 0 && numB === 0) {
      Alert.alert("Math Error", "GCD(0, 0) is undefined.");
      return;
    }

    if (numA > 99999999999 || numB > 99999999999) {
      Alert.alert("Hardware Limit", "Numbers are too large. Please keep values under 100 Billion.");
      return;
    }

    // Ensure A >= B for the algorithm to look standard and educational
    let swapped = false;
    if (numB > numA) {
      let temp = numA;
      numA = numB;
      numB = temp;
      swapped = true;
    }

    let steps = [];
    let currentA = numA;
    let currentB = numB;

    if (currentB === 0) {
       setResult({ gcd: currentA, steps: [{ a: currentA, b: 0, q: 0, r: 0 }], swapped });
       return;
    }

    while (currentB !== 0) {
      let q = Math.floor(currentA / currentB);
      let r = currentA % currentB;
      
      steps.push({ a: currentA, b: currentB, q, r });
      
      currentA = currentB;
      currentB = r;
    }

    setResult({ gcd: currentA, steps, swapped });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Euclidean Lab (GCD)</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> This algorithm calculates using strictly positive integers.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Auto-Sorting:</Text> The calculator will automatically place the larger number first (as A) to follow standard mathematical convention.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>What is GCD?</Text> The Greatest Common Divisor is the largest number that divides both A and B without leaving a remainder.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Algorithm</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                The Euclidean Algorithm is an ancient and hyper-efficient method for computing the Greatest Common Divisor (GCD) of two integers.
              </Text>
              <Text style={styles.formulaText}>A = (B × Q) + R</Text>
              <Text style={styles.theoryText}>
                <Text style={{fontWeight: 'bold'}}>The Process:</Text>{"\n"}
                1. Divide the larger number (A) by the smaller number (B).{"\n"}
                2. Note the remainder (R).{"\n"}
                3. <Text style={{fontWeight:'bold', color:'#c2410c'}}>The Cascade:</Text> Replace A with B, and replace B with R.{"\n"}
                4. Repeat until the remainder is 0.{"\n"}
                5. The last non-zero remainder is the GCD!
              </Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(252, 105)}>
                  <Ionicons name="calculator-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Standard (252 & 105)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(21, 22)}>
                  <Ionicons name="link-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Relatively Prime (21 & 22)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(100, 25)}>
                  <Ionicons name="arrow-down-circle-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Direct Multiple (100 & 25)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(12345, 67890)}>
                  <Ionicons name="rocket-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Large Numbers</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Find the GCD</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number (A)</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="number-pad" 
                  value={a} 
                  onChangeText={(t) => handleInput(t, setA)} 
                  placeholder="e.g. 252" 
                  placeholderTextColor="#666"
                  maxLength={11}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number (B)</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="number-pad" 
                  value={b} 
                  onChangeText={(t) => handleInput(t, setB)} 
                  placeholder="e.g. 105" 
                  placeholderTextColor="#666"
                  maxLength={11}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.calcButton} onPress={calculateGCD}>
              <Text style={styles.calcButtonText}>Generate Steps</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 STEP-BY-STEP RESULT CARD */}
          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Final Answer</Text>
              
              {result.swapped && (
                  <Text style={styles.swappedNote}>* Note: Auto-swapped A and B so the larger number is first.</Text>
              )}
              
              <Text style={styles.resultHighlight}>GCD = {result.gcd}</Text>
              
              {result.gcd === 1 && (
                  <View style={styles.primeBadge}>
                      <Text style={styles.primeBadgeText}>These numbers are Relatively Prime!</Text>
                  </View>
              )}

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Execution Steps:</Text>
              
              {result.steps.length > 0 ? (
                  <View>
                      <View style={styles.tableHeaderRow}>
                          <Text style={[styles.tableColHeader, { flex: 1.5 }]}>Dividend</Text>
                          <Text style={[styles.tableColHeader, { flex: 1 }]}>=</Text>
                          <Text style={[styles.tableColHeader, { flex: 1.5 }]}>Divisor</Text>
                          <Text style={[styles.tableColHeader, { flex: 1 }]}>×</Text>
                          <Text style={[styles.tableColHeader, { flex: 1 }]}>Q</Text>
                          <Text style={[styles.tableColHeader, { flex: 1 }]}>+</Text>
                          <Text style={[styles.tableColHeader, { flex: 1.5, borderRightWidth: 0 }]}>Rem</Text>
                      </View>

                      {result.steps.map((step, index) => {
                          const isLast = index === result.steps.length - 1;
                          const isGcdRow = index === result.steps.length - 2; // The row where the GCD is the remainder
                          return (
                              <View key={index} style={styles.stepContainer}>
                                  <View style={styles.stepRowFlex}>
                                      {/* A */}
                                      <Text style={[styles.mathCell, {flex: 1.5, color: '#334155'}]}>{step.a}</Text>
                                      <Text style={[styles.mathCell, {flex: 1, color: '#94a3b8'}]}>=</Text>
                                      {/* B (Becomes A in next step) */}
                                      <Text style={[styles.mathCell, {flex: 1.5, color: '#2563eb', fontWeight: 'bold'}]}>{step.b}</Text>
                                      <Text style={[styles.mathCell, {flex: 1, color: '#94a3b8'}]}>×</Text>
                                      {/* Q */}
                                      <Text style={[styles.mathCell, {flex: 1, color: '#64748b'}]}>{step.q}</Text>
                                      <Text style={[styles.mathCell, {flex: 1, color: '#94a3b8'}]}>+</Text>
                                      {/* R (Becomes B in next step) */}
                                      <Text style={[
                                          styles.mathCell, 
                                          {flex: 1.5, borderRightWidth: 0, fontWeight: 'bold'},
                                          isLast ? {color: '#ef4444'} : (isGcdRow ? {color: '#10b981', fontSize: 18} : {color: '#ea580c'})
                                      ]}>
                                          {step.r}
                                      </Text>
                                  </View>
                              </View>
                          );
                      })}
                      
                      <View style={styles.explanationBox}>
                          <Ionicons name="bulb-outline" size={20} color="#0369a1" style={{marginTop: 2}}/>
                          <Text style={styles.explanationText}>
                              <Text style={{fontWeight: 'bold', color: '#075985'}}>The Cascade:</Text> Notice how the <Text style={{color: '#2563eb', fontWeight: 'bold'}}>Blue Divisor</Text> shifts left to become the new Dividend, and the <Text style={{color: '#ea580c', fontWeight: 'bold'}}>Orange Remainder</Text> shifts left to become the new Divisor in the next step!
                          </Text>
                      </View>
                  </View>
              ) : (
                  <Text style={styles.stepText}>One of the numbers is 0. The GCD is the non-zero number.</Text>
              )}

              {result.steps.length > 0 && (
                  <Text style={styles.conclusionText}>
                      The algorithm halts when the remainder hits <Text style={{color: '#ef4444', fontWeight: 'bold'}}>0</Text>. The last non-zero remainder (<Text style={{color: '#10b981', fontWeight: 'bold'}}>{result.gcd}</Text>) is your Greatest Common Divisor!
                  </Text>
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
  formulaText: { fontSize: 20, fontFamily: 'monospace', color: '#104a28', textAlign: 'center', marginVertical: 10, backgroundColor: '#f0fdf4', padding: 10, borderRadius: 8, fontWeight: 'bold' },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#6b7280', marginBottom: 5, textTransform: 'uppercase' },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', textAlign: 'center', fontWeight: 'bold', color: '#333' },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#3b82f6' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' },
  swappedNote: { fontSize: 11, color: '#ea580c', fontStyle: 'italic', marginTop: 4 },
  resultHighlight: { fontSize: 32, fontWeight: '900', color: '#104a28', marginTop: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  
  primeBadge: { backgroundColor: '#fefce8', borderColor: '#fef08a', borderWidth: 1, padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  primeBadgeText: { color: '#ca8a04', fontWeight: 'bold', fontSize: 13 },

  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 20 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#f8fafc', borderBottomWidth: 2, borderBottomColor: '#cbd5e1', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  tableColHeader: { paddingVertical: 10, textAlign: 'center', fontWeight: 'bold', color: '#475569', fontSize: 11, textTransform: 'uppercase' },
  
  stepContainer: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  stepRowFlex: { flexDirection: 'row', alignItems: 'center' },
  mathCell: { paddingVertical: 12, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 15 },

  explanationBox: { flexDirection: 'row', backgroundColor: '#e0f2fe', padding: 15, borderRadius: 8, marginTop: 15, gap: 10, borderWidth: 1, borderColor: '#bae6fd' },
  explanationText: { flex: 1, fontSize: 13, color: '#0369a1', lineHeight: 20 },

  conclusionText: { marginTop: 15, fontSize: 14, color: '#064e3b', backgroundColor: '#dcfce7', padding: 15, borderRadius: 8, overflow: 'hidden', lineHeight: 22, borderWidth: 1, borderColor: '#bbf7d0' }
});