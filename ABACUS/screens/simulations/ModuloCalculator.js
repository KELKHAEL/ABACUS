import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModuloCalculator({ navigation }) {
  const [numA, setNumA] = useState('');
  const [numN, setNumN] = useState('');
  const [results, setResults] = useState(null);

  const calculateModulo = () => {
    let a = parseInt(numA);
    let n = parseInt(numN);

    if (isNaN(a) || isNaN(n)) {
      return Alert.alert("Invalid Input", "Please enter valid integers.");
    }
    if (n <= 0) {
      return Alert.alert("Invalid Modulus", "The modulus (N) must be greater than 0.");
    }

    // Mathematical Modulo (Handles negative numbers correctly, unlike standard JS '%')
    let remainder = ((a % n) + n) % n;
    
    // Find the Quotient (A = Q * N + R  =>  Q = (A - R) / N)
    let quotient = (a - remainder) / n;

    setResults({ a, n, quotient, remainder });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modulo Calculator</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate A mod N</Text>
            <Text style={styles.descText}>Find the remainder when A is divided by N. This calculator handles negative numbers properly!</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Integer (A):</Text>
                <TextInput style={styles.input} value={numA} onChangeText={setNumA} keyboardType="numeric" placeholder="e.g. -17" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Modulus (N):</Text>
                <TextInput style={styles.input} value={numN} onChangeText={setNumN} keyboardType="numeric" placeholder="e.g. 5" />
              </View>
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateModulo}>
              <Text style={styles.calcBtnText}>Calculate</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Result</Text>
              
              <View style={styles.resultBanner}>
                <Text style={styles.resultLabel}>{results.a} mod {results.n} ≡</Text>
                <Text style={styles.resultValue}>{results.remainder}</Text>
              </View>

              <Text style={styles.subTitle}>Division Algorithm Breakdown:</Text>
              <View style={styles.stepsBox}>
                <Text style={styles.formulaText}>A = (Quotient × N) + Remainder</Text>
                <Text style={styles.stepText}>{results.a} = ({results.quotient} × {results.n}) + {results.remainder}</Text>
              </View>
              
              {results.a < 0 && (
                  <Text style={styles.hintText}>
                      Notice how the quotient went "deeper" into the negatives to ensure the remainder is always a positive number between 0 and {results.n - 1}.
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
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#104a28', padding: 20, paddingTop: 40 },
  backBtn: { marginRight: 15 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginBottom: 10 },
  descText: { fontSize: 13, color: '#666', marginBottom: 15, lineHeight: 20 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  inputGroup: { flex: 1 },
  label: { fontSize: 13, color: '#555', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9', textAlign: 'center' },
  calcBtn: { backgroundColor: '#eab308', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: '#422006', fontWeight: 'bold', fontSize: 16 },
  resultBanner: { backgroundColor: '#104a28', padding: 20, borderRadius: 8, alignItems: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'center', gap: 15 },
  resultLabel: { color: '#a7f3d0', fontSize: 20, fontWeight: 'bold' },
  resultValue: { color: '#fff', fontSize: 36, fontWeight: '900' },
  subTitle: { fontWeight: 'bold', color: '#333', marginBottom: 8 },
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  formulaText: { fontSize: 12, color: '#9ca3af', marginBottom: 8, fontStyle: 'italic' },
  stepText: { fontSize: 18, color: '#111', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  hintText: { fontSize: 12, color: '#b45309', backgroundColor: '#fef3c7', padding: 10, borderRadius: 6, marginTop: 15, lineHeight: 18 }
});