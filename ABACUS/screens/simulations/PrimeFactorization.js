import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrimeFactorization({ navigation }) {
  const [inputNum, setInputNum] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const calculateFactors = () => {
    let n = parseInt(inputNum);
    if (isNaN(n) || n <= 1) {
      alert("Please enter an integer greater than 1.");
      return;
    }
    
    if (n > 999999999) {
        alert("Number too large. Please enter a number under 1 Billion to prevent app lag.");
        return;
    }

    const originalN = n;
    const steps = [];
    const factorCounts = {};

    // Standard Prime Factorization Algorithm
    let divisor = 2;
    while (n >= 2) {
      if (n % divisor === 0) {
        steps.push({ current: n, divisor: divisor, next: n / divisor });
        factorCounts[divisor] = (factorCounts[divisor] || 0) + 1;
        n = n / divisor;
      } else {
        divisor++;
        // Optimization: If divisor exceeds square root of remaining n, n itself is prime
        if (divisor * divisor > n && n > 1) {
            steps.push({ current: n, divisor: n, next: 1 });
            factorCounts[n] = (factorCounts[n] || 0) + 1;
            break;
        }
      }
    }

    // Format the final exponential string
    const expString = Object.keys(factorCounts).map(prime => {
        const power = factorCounts[prime];
        return power > 1 ? `${prime}^${power}` : `${prime}`;
    }).join(' × ');

    setResult({
        original: originalN,
        steps,
        factors: factorCounts,
        expString,
        isPrime: steps.length === 1
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prime Factorization</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Theory</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryTitle}>Fundamental Theorem of Arithmetic</Text>
              <Text style={styles.theoryText}>
                Every integer greater than 1 is either a prime number itself, or it can be represented as a unique product of prime numbers.
              </Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}>
                <Text style={{fontWeight: 'bold'}}>The Algorithm:</Text>{"\n"}
                1. Start dividing the number by the smallest prime (2).{"\n"}
                2. If it divides evenly, keep dividing by 2 until it doesn't.{"\n"}
                3. Move to the next prime (3, 5, 7...) and repeat.{"\n"}
                4. Stop when your final result is 1.
              </Text>
            </View>
          )}

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Find Prime Factors</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Integer (N {'>'} 1)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={inputNum} onChangeText={setInputNum} placeholder="e.g. 360" />
            </View>
            <TouchableOpacity style={styles.calcButton} onPress={calculateFactors}>
              <Text style={styles.calcButtonText}>Factorize</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT CARD */}
          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Final Answer</Text>
              
              {result.isPrime ? (
                  <View style={styles.primeBadge}>
                      <Text style={styles.primeBadgeText}>{result.original} is a Prime Number!</Text>
                  </View>
              ) : (
                  <Text style={styles.resultHighlight}>{result.original} = {result.expString}</Text>
              )}

              <View style={styles.divider} />
              <Text style={styles.stepTitle}>Division Steps (Factor Tree):</Text>
              
              <View style={styles.tableWrapper}>
                  <View style={styles.tableHeaderRow}>
                      <Text style={[styles.tableColHeader, { flex: 1.5 }]}>Current</Text>
                      <Text style={[styles.tableColHeader, { flex: 1 }]}>÷ Prime</Text>
                      <Text style={[styles.tableColHeader, { flex: 1.5, borderRightWidth: 0 }]}>Remainder</Text>
                  </View>
                  
                  {result.steps.map((step, idx) => (
                      <View key={idx} style={styles.tableRow}>
                          <Text style={[styles.tableCol, { flex: 1.5 }]}>{step.current}</Text>
                          <Text style={[styles.tableCol, styles.highlightCol, { flex: 1 }]}>÷ {step.divisor}</Text>
                          <Text style={[styles.tableCol, { flex: 1.5, borderRightWidth: 0 }]}>{step.next}</Text>
                      </View>
                  ))}
              </View>
              
              {!result.isPrime && (
                  <Text style={styles.noteText}>
                      We extract the prime factors from the middle column to construct the exponential form: {result.expString}
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
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#6b7280', marginBottom: 5 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontSize: 18, textAlign: 'center' },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#f59e0b' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' },
  resultHighlight: { fontSize: 24, fontWeight: '900', color: '#104a28', textAlign: 'center', marginVertical: 10, fontFamily: 'monospace' },
  
  primeBadge: { backgroundColor: '#fefce8', borderColor: '#fef08a', borderWidth: 1, padding: 15, borderRadius: 8, marginVertical: 10, alignItems: 'center' },
  primeBadgeText: { color: '#ca8a04', fontWeight: 'bold', fontSize: 16 },
  
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },

  tableWrapper: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, overflow: 'hidden' },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  tableColHeader: { padding: 12, textAlign: 'center', fontWeight: 'bold', color: '#475569', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  tableCol: { padding: 12, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#e2e8f0', fontFamily: 'monospace', fontSize: 15 },
  highlightCol: { backgroundColor: '#fffbeb', color: '#b45309', fontWeight: 'bold' },
  
  noteText: { fontSize: 13, color: '#64748b', fontStyle: 'italic', textAlign: 'center', marginTop: 15 }
});