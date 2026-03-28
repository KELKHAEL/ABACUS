import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BinomialTheoremLab({ navigation }) {
  const [power, setPower] = useState('4');
  const [results, setResults] = useState(null);

  const factorial = (num) => {
    if (num < 0) return -1;
    if (num === 0 || num === 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const getCombination = (n, k) => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  const calculateExpansion = () => {
    const n = parseInt(power);
    if (isNaN(n) || n < 0) {
      return Alert.alert("Invalid Input", "Please enter a positive integer.");
    }
    if (n > 15) {
      return Alert.alert("Power Too High", "Please enter a power of 15 or less to prevent screen overflow.");
    }

    let expansionArr = [];
    let coefficientsList = [];

    for (let k = 0; k <= n; k++) {
        const coeff = getCombination(n, k);
        const xPow = n - k;
        const yPow = k;
        
        coefficientsList.push(`C(${n},${k}) = ${coeff}`);

        let term = '';
        if (coeff !== 1) term += coeff;
        
        if (xPow > 0) {
            term += 'x';
            if (xPow > 1) term += `^${xPow}`;
        }
        
        if (yPow > 0) {
            term += 'y';
            if (yPow > 1) term += `^${yPow}`;
        }
        
        if (term === '') term = '1'; // Edge case for n=0

        expansionArr.push(term);
    }

    setResults({ n, equation: expansionArr.join(' + '), coefficients: coefficientsList });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Binomial Expansion</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Expand (x + y)ⁿ</Text>
            <Text style={styles.descText}>Use Combinatorics to quickly expand binomial expressions.</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter Power (n):</Text>
              <TextInput style={styles.input} value={power} onChangeText={setPower} keyboardType="numeric" placeholder="e.g. 4" />
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateExpansion}>
              <Text style={styles.calcBtnText}>Expand Polynomial</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Final Expansion</Text>
              
              <View style={styles.resultBanner}>
                <Text style={styles.resultLabel}>(x + y)^{results.n} =</Text>
                <Text style={styles.resultValue}>{results.equation}</Text>
              </View>

              <Text style={styles.subTitle}>Coefficients breakdown C(n, k):</Text>
              <View style={styles.stepsBox}>
                {results.coefficients.map((coeff, idx) => (
                  <Text key={idx} style={styles.stepText}>{coeff}</Text>
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
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#104a28', padding: 20, paddingTop: 40 },
  backBtn: { marginRight: 15 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  descText: { fontSize: 13, color: '#666', marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, color: '#555', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9', textAlign: 'center' },
  calcBtn: { backgroundColor: '#eab308', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: '#422006', fontWeight: 'bold', fontSize: 16 },
  resultBanner: { backgroundColor: '#1e293b', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#334155' },
  resultLabel: { color: '#94a3b8', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  resultValue: { color: '#eab308', fontSize: 16, fontWeight: 'bold', lineHeight: 24, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  subTitle: { fontWeight: 'bold', color: '#333', marginBottom: 8 },
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  stepText: { fontSize: 14, color: '#0369a1', fontWeight: 'bold', backgroundColor: '#e0f2fe', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }
});