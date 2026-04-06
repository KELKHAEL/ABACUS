import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BinomialTheoremLab({ navigation }) {
  const [power, setPower] = useState('3');
  const [result, setResult] = useState(null);

  // Safely generates Pascal's Triangle matrix
  const generatePascal = (numRows) => {
    let triangle = [];
    for (let i = 0; i <= numRows; i++) {
      let row = new Array(i + 1).fill(1);
      for (let j = 1; j < i; j++) {
        row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
      triangle.push(row);
    }
    return triangle;
  };

  const expand = () => {
    const n = parseInt(power);
    if (isNaN(n) || n < 0 || n > 8) {
      alert("Please enter a power between 0 and 8.");
      return;
    }

    const triangle = generatePascal(n);
    const coeffs = triangle[n]; // Get the specific row

    let steps = [];
    let finalTerms = [];

    // Build the algebraic expansion term by term
    for (let k = 0; k <= n; k++) {
      const coeff = coeffs[k];
      const aExp = n - k;
      const bExp = k;

      // Create visual breakdown for the student
      steps.push({
          k,
          coeff,
          aExp,
          bExp,
          formula: `C(${n}, ${k}) · a^${aExp} · b^${bExp}`,
      });

      // Format the final algebra string cleanly (e.g. drop 1s and 0s)
      let termStr = "";
      if (coeff > 1 || (aExp === 0 && bExp === 0)) termStr += coeff;
      
      if (aExp > 0) termStr += `a${aExp > 1 ? `^${aExp}` : ""}`;
      if (bExp > 0) termStr += `b${bExp > 1 ? `^${bExp}` : ""}`;
      
      finalTerms.push(termStr);
    }

    setResult({ n, triangle, coeffs, expansion: finalTerms.join(" + "), steps });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pascal & Binomial</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Expand (a + b)ⁿ</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 5}}>
                <Text style={styles.label}>Enter Power (n):</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric" 
                  value={power} 
                  onChangeText={setPower} 
                  maxLength={1}
                />
            </View>
            <Text style={styles.hint}>Max power 8 for mobile visualization</Text>
            <TouchableOpacity style={styles.calcButton} onPress={expand}>
                <Text style={styles.calcButtonText}>Generate Expansion & Triangle</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.triangleCard}>
              <Text style={styles.visualTitle}>Pascal's Triangle (Rows 0 to {result.n})</Text>
              
              {/* RENDER THE TRIANGLE */}
              <View style={styles.triangleContainer}>
                {result.triangle.map((row, i) => (
                  <View key={i} style={[styles.row, i === result.n && styles.activeRow]}>
                    <Text style={styles.rowLabel}>n={i}</Text>
                    {row.map((num, j) => (
                      <View key={j} style={[styles.numCircle, i === result.n && styles.activeCircle]}>
                        <Text style={[styles.numText, i === result.n && styles.activeNumText]}>{num}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.explanationBox}>
                  <Ionicons name="bulb" size={24} color="#f59e0b" />
                  <Text style={styles.expText}>
                     We use Row <Text style={{fontWeight: 'bold'}}>{result.n}</Text> to get the coefficients:{"\n"}
                     <Text style={{fontWeight: '900', color: '#c2410c', fontSize: 16}}>
                       {result.coeffs.join(', ')}
                     </Text>
                  </Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.visualTitle}>Final Expansion</Text>
              <View style={styles.mathBox}>
                  <Text style={styles.expansionText}>{result.expansion}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.visualTitle}>Term-by-Term Rules</Text>
              <Text style={styles.ruleText}>1. Coeffs come from Pascal's Triangle.</Text>
              <Text style={styles.ruleText}>2. Power of 'a' decreases from {result.n} to 0.</Text>
              <Text style={styles.ruleText}>3. Power of 'b' increases from 0 to {result.n}.</Text>

              {/* RENDER THE STEPS */}
              <View style={{marginTop: 15}}>
                  {result.steps.map((item, idx) => (
                      <View key={idx} style={styles.stepBox}>
                          <View style={styles.stepHeader}>
                              <Text style={styles.stepLabel}>Term {idx + 1}</Text>
                              <Text style={styles.kLabel}>(k={item.k})</Text>
                          </View>
                          <Text style={styles.mathText}>
                             <Text style={{color: '#c2410c', fontWeight: 'bold'}}>{item.coeff}</Text> · 
                             a^<Text style={{color: '#2563eb'}}>{item.aExp}</Text> · 
                             b^<Text style={{color: '#16a34a'}}>{item.bExp}</Text>
                          </Text>
                      </View>
                  ))}
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
  
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  label: { fontSize: 15, fontWeight: 'bold', color: '#64748b' },
  input: { width: 60, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#d1d5db', padding: 10, borderRadius: 8, fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
  hint: { fontSize: 12, color: '#94a3b8', fontStyle: 'italic', marginTop: 10 },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  triangleCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, borderTopWidth: 5, borderTopColor: '#f97316' },
  visualTitle: { fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 15 },
  
  triangleContainer: { alignItems: 'center', backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  rowLabel: { position: 'absolute', left: -30, fontSize: 10, color: '#94a3b8', fontWeight: 'bold' },
  activeRow: { backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#fed7aa' },
  
  numCircle: { width: 28, height: 28, backgroundColor: '#e2e8f0', borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginHorizontal: 3 },
  activeCircle: { backgroundColor: '#f97316' },
  numText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  activeNumText: { color: 'white' },

  explanationBox: { marginTop: 15, backgroundColor: '#fefce8', padding: 15, borderRadius: 8, flexDirection: 'row', gap: 10, borderWidth: 1, borderColor: '#fef08a' },
  expText: { flex: 1, fontSize: 13, color: '#854d0e', lineHeight: 20 },
  
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 20 },
  
  mathBox: { backgroundColor: '#fff7ed', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ffedd5', alignItems: 'center' },
  expansionText: { fontSize: 18, fontFamily: 'monospace', color: '#c2410c', fontWeight: 'bold', textAlign: 'center' },

  ruleText: { fontSize: 13, color: '#475569', marginBottom: 4, fontStyle: 'italic' },

  stepBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10 },
  stepHeader: { flexDirection: 'column' },
  stepLabel: { fontSize: 13, color: '#334155', fontWeight: 'bold' },
  kLabel: { fontSize: 11, color: '#94a3b8' },
  mathText: { fontFamily: 'monospace', fontSize: 18, color: '#1e293b' },
});