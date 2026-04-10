import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PermutationSimulation({ navigation }) {
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ 1. STRICT NUMERIC VALIDATION: Only allows whole positive numbers
  const handleInput = (text, setter) => {
    const filteredText = text.replace(/[^0-9]/g, ''); 
    setter(filteredText);
  };

  // ✅ 2. PRESET EXAMPLES
  const loadExample = (nVal, rVal) => {
    setN(nVal.toString());
    setR(rVal.toString());
    setResult(null); // Clear previous results to prompt recalculation
  };

  // Helper for factorials
  const factorial = (num) => {
    if (num < 0) return -1;
    if (num === 0 || num === 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const calculate = () => {
    if (!n || !r) {
      Alert.alert("Missing Fields", "Please enter values for both n (Total) and r (Selected).");
      return;
    }

    const numN = parseInt(n);
    const numR = parseInt(r);

    // ✅ 3. SPECIFIC ERROR TRAPPING & GUIDANCE
    if (numR > numN) {
      Alert.alert(
        "Logic Error: Impossible Selection", 
        `You cannot select (r = ${numR}) items from a pool of only (n = ${numN}) items.\n\nRule: 'n' must always be greater than or equal to 'r'.\n\nExample: You can select 3 winners from 10 racers (n=10, r=3).`,
        [{ text: "Understood" }]
      );
      return;
    }
    
    // Prevent extremely large calculations crashing the app
    if (numN > 170) {
        Alert.alert("Hardware Limit Reached", "The value of 'n' is too large to safely compute factorials on a mobile device. Please keep 'n' under 170.");
        return;
    }

    const nFact = factorial(numN);
    const nMinusRFact = factorial(numN - numR);
    const rFact = factorial(numR);

    const nPr = nFact / nMinusRFact;
    const nCr = nFact / (rFact * nMinusRFact);

    setResult({
      n: numN,
      r: numR,
      nPr,
      nCr,
      nFact,
      rFact,
      nMinusRFact
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Permutations & Combos</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ 4. GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> This simulation strictly accepts positive whole integers. Decimals and letters are blocked.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Total Pool (n):</Text> This is the maximum number of items available to choose from.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Selected (r):</Text> This is how many items you are pulling from the pool. It CANNOT be larger than 'n'.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Formulas</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryTitle}>Permutations (Order Matters)</Text>
              <Text style={styles.theoryText}>Used when arranging objects where the sequence is important (e.g. passwords, race standings).</Text>
              <Text style={styles.formulaText}>P(n, r) = n! / (n - r)!</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.theoryTitle}>Combinations (Order Does NOT Matter)</Text>
              <Text style={styles.theoryText}>Used when selecting groups where sequence doesn't matter (e.g. picking a team, drawing cards).</Text>
              <Text style={styles.formulaText}>C(n, r) = n! / [r! × (n - r)!]</Text>
            </View>
          )}

          {/* ✅ 5. PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Real-World Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(8, 3)}>
                  <Ionicons name="medal-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Race Medals (n=8, r=3)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(52, 5)}>
                  <Ionicons name="layers-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Poker Hand (n=52, r=5)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(10, 4)}>
                  <Ionicons name="keypad-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>PIN Code (n=10, r=4)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate nPr & nCr</Text>
            <View style={styles.inputRow}>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Total Objects (n)</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="number-pad" 
                  value={n} 
                  onChangeText={(t) => handleInput(t, setN)} 
                  placeholder="e.g. 10" 
                  maxLength={3}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Selected (r)</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="number-pad" 
                  value={r} 
                  onChangeText={(t) => handleInput(t, setR)} 
                  placeholder="e.g. 3" 
                  maxLength={3}
                />
              </View>

            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculate}>
              <Text style={styles.calcButtonText}>Calculate & Explain</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT CARD */}
          {result && (
            <View style={styles.resultCard}>
              
              {/* PERMUTATION SECTION */}
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                 <Ionicons name="filter" size={20} color="#ec4899" />
                 <Text style={styles.resultTitle}>Permutation (nPr)</Text>
              </View>
              <Text style={styles.resultHighlight}>{result.nPr.toLocaleString()}</Text>
              <Text style={styles.stepText}>There are <Text style={{fontWeight: 'bold'}}>{result.nPr.toLocaleString()}</Text> unique ways to ARRANGE <Text style={{fontWeight: 'bold'}}>{result.r}</Text> items out of <Text style={{fontWeight: 'bold'}}>{result.n}</Text> when order matters.</Text>
              
              <View style={styles.mathStepContainer}>
                  <Text style={styles.mathStepText}>Formula: {result.n}! / ({result.n} - {result.r})!</Text>
                  <Text style={styles.mathStepText}>Expanded: {result.n}! / {result.n - result.r}!</Text>
              </View>

              <View style={styles.divider} />

              {/* COMBINATION SECTION */}
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                 <Ionicons name="people" size={20} color="#ec4899" />
                 <Text style={styles.resultTitle}>Combination (nCr)</Text>
              </View>
              <Text style={styles.resultHighlight}>{result.nCr.toLocaleString()}</Text>
              <Text style={styles.stepText}>There are <Text style={{fontWeight: 'bold'}}>{result.nCr.toLocaleString()}</Text> unique ways to CHOOSE <Text style={{fontWeight: 'bold'}}>{result.r}</Text> items out of <Text style={{fontWeight: 'bold'}}>{result.n}</Text> when order does NOT matter.</Text>
              
              <View style={styles.mathStepContainer}>
                  <Text style={styles.mathStepText}>Formula: {result.n}! / ({result.r}! × ({result.n} - {result.r})!)</Text>
                  <Text style={styles.mathStepText}>Expanded: {result.n}! / ({result.r}! × {result.n - result.r}!)</Text>
              </View>
              
              {/* ✅ ENHANCED EXPLANATION */}
              <View style={styles.explanationBox}>
                  <Ionicons name="bulb-outline" size={20} color="#ec4899" style={{marginTop: 2}}/>
                  <Text style={styles.explanationText}>
                      <Text style={{fontWeight: 'bold', color: '#831843'}}>Why is Combination smaller?</Text> Since combinations don't care about order (e.g., picking Alice then Bob is the same as picking Bob then Alice), we divide the Permutation result by <Text style={{fontWeight: 'bold'}}>{result.r}!</Text> to completely remove those duplicate groupings!
                  </Text>
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

  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#4b5563', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#fde68a', gap: 6 },
  exampleBtnText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  theoryText: { fontSize: 13, color: '#4b5563', lineHeight: 20 },
  formulaText: { fontSize: 15, fontFamily: 'monospace', color: '#104a28', textAlign: 'center', marginTop: 10, backgroundColor: '#f0fdf4', padding: 8, borderRadius: 6, overflow: 'hidden' },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#6b7280', marginBottom: 5 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 18, textAlign: 'center', color: '#111', fontWeight: 'bold' },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#ec4899' },
  resultTitle: { fontSize: 15, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' },
  resultHighlight: { fontSize: 28, fontWeight: '900', color: '#104a28', marginTop: 5 },
  stepText: { fontSize: 14, color: '#4b5563', marginTop: 5, marginBottom: 15, lineHeight: 22 },
  
  mathStepContainer: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#94a3b8' },
  mathStepText: { fontSize: 14, fontFamily: 'monospace', color: '#334155', marginVertical: 4, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 20 },

  explanationBox: { flexDirection: 'row', backgroundColor: '#fdf2f8', padding: 15, borderRadius: 8, marginTop: 20, gap: 10, borderWidth: 1, borderColor: '#fbcfe8' },
  explanationText: { flex: 1, fontSize: 13, color: '#831843', lineHeight: 20 }
});