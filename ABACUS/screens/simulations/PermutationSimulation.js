import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PermutationSimulation({ navigation }) {
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // Helper for factorials
  const factorial = (num) => {
    if (num < 0) return -1;
    if (num === 0 || num === 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const calculate = () => {
    const numN = parseInt(n);
    const numR = parseInt(r);

    if (isNaN(numN) || isNaN(numR) || numN < 0 || numR < 0) {
      alert("Please enter positive integers.");
      return;
    }
    if (numR > numN) {
      alert("r cannot be greater than n.");
      return;
    }
    // Prevent extremely large calculations crashing the app
    if (numN > 170) {
        alert("N is too large to safely compute factorials on a mobile device.");
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
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

        {/* ⚙️ CALCULATOR CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Calculate nPr & nCr</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Objects (n)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={n} onChangeText={setN} placeholder="e.g. 10" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Selected (r)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={r} onChangeText={setR} placeholder="e.g. 3" />
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
            <Text style={styles.resultTitle}>Permutation (nPr)</Text>
            <Text style={styles.resultHighlight}>{result.nPr.toLocaleString()}</Text>
            <Text style={styles.stepText}>There are {result.nPr.toLocaleString()} ways to ARRANGE {result.r} items out of {result.n}.</Text>
            
            <View style={styles.mathStepContainer}>
                <Text style={styles.mathStepText}>Formula: {result.n}! / ({result.n} - {result.r})!</Text>
                <Text style={styles.mathStepText}>Expanded: {result.n}! / {result.n - result.r}!</Text>
            </View>

            <View style={styles.divider} />

            {/* COMBINATION SECTION */}
            <Text style={styles.resultTitle}>Combination (nCr)</Text>
            <Text style={styles.resultHighlight}>{result.nCr.toLocaleString()}</Text>
            <Text style={styles.stepText}>There are {result.nCr.toLocaleString()} ways to CHOOSE {result.r} items out of {result.n}.</Text>
            
            <View style={styles.mathStepContainer}>
                <Text style={styles.mathStepText}>Formula: {result.n}! / ({result.r}! × ({result.n} - {result.r})!)</Text>
                <Text style={styles.mathStepText}>Expanded: {result.n}! / ({result.r}! × {result.n - result.r}!)</Text>
                <Text style={styles.mathStepText}>Note: We divide by {result.r}! to remove duplicate groupings.</Text>
            </View>

          </View>
        )}

      </ScrollView>
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
  theoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  theoryText: { fontSize: 13, color: '#4b5563', lineHeight: 20 },
  formulaText: { fontSize: 15, fontFamily: 'monospace', color: '#104a28', textAlign: 'center', marginTop: 10, backgroundColor: '#f0fdf4', padding: 8, borderRadius: 6, overflow: 'hidden' },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#6b7280', marginBottom: 5 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16 },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#ec4899' },
  resultTitle: { fontSize: 13, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' },
  resultHighlight: { fontSize: 28, fontWeight: '900', color: '#104a28', marginTop: 2 },
  stepText: { fontSize: 14, color: '#4b5563', marginTop: 5, marginBottom: 10 },
  
  mathStepContainer: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#94a3b8' },
  mathStepText: { fontSize: 13, fontFamily: 'monospace', color: '#334155', marginVertical: 3 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 20 }
});