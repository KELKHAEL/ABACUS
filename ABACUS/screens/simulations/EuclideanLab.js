import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function GCDCalculator({ navigation }) {
  const [numA, setNumA] = useState('');
  const [numB, setNumB] = useState('');
  const [results, setResults] = useState(null);

  const calculateGCD = () => {
    let a = parseInt(numA);
    let b = parseInt(numB);

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      return Alert.alert("Invalid Input", "Please enter positive integers greater than 0.");
    }

    const originalA = a;
    const originalB = b;
    let steps = [];

    // Euclidean Algorithm
    while (b !== 0) {
      let quotient = Math.floor(a / b);
      let remainder = a % b;
      steps.push(`${a} = ${b} × ${quotient} + ${remainder}`);
      a = b;
      b = remainder;
    }

    const gcd = a;
    const lcm = (originalA * originalB) / gcd;

    setResults({ gcd, lcm, steps });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>GCD & LCM Calculator</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Euclidean Algorithm</Text>
            <Text style={styles.descText}>Find the Greatest Common Divisor (GCD) and Least Common Multiple (LCM) of two numbers.</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number A:</Text>
                <TextInput style={styles.input} value={numA} onChangeText={setNumA} keyboardType="numeric" placeholder="e.g. 48" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number B:</Text>
                <TextInput style={styles.input} value={numB} onChangeText={setNumB} keyboardType="numeric" placeholder="e.g. 18" />
              </View>
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateGCD}>
              <Text style={styles.calcBtnText}>Solve</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Final Answer</Text>
              
              <View style={styles.resultBannerRow}>
                <View style={styles.resultBannerHalf}>
                  <Text style={styles.resultLabel}>GCD</Text>
                  <Text style={styles.resultValue}>{results.gcd}</Text>
                </View>
                <View style={styles.resultBannerHalfAlt}>
                  <Text style={styles.resultLabelAlt}>LCM</Text>
                  <Text style={styles.resultValueAlt}>{results.lcm}</Text>
                </View>
              </View>

              <Text style={styles.subTitle}>Step-by-Step (A = B × Q + R):</Text>
              <View style={styles.stepsBox}>
                {results.steps.map((step, idx) => (
                  <Text key={idx} style={styles.stepText}>Step {idx + 1}:  {step}</Text>
                ))}
                <Text style={styles.conclusionText}>The last non-zero remainder is the GCD ({results.gcd}).</Text>
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
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginBottom: 10 },
  descText: { fontSize: 13, color: '#666', marginBottom: 15, lineHeight: 20 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  inputGroup: { flex: 1 },
  label: { fontSize: 13, color: '#555', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  calcBtn: { backgroundColor: '#eab308', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: '#422006', fontWeight: 'bold', fontSize: 16 },
  resultBannerRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  resultBannerHalf: { flex: 1, backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  resultLabel: { color: '#a7f3d0', fontSize: 14, fontWeight: 'bold' },
  resultValue: { color: '#fff', fontSize: 28, fontWeight: '900' },
  resultBannerHalfAlt: { flex: 1, backgroundColor: '#fef3c7', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#fde68a' },
  resultLabelAlt: { color: '#b45309', fontSize: 14, fontWeight: 'bold' },
  resultValueAlt: { color: '#78350f', fontSize: 28, fontWeight: '900' },
  subTitle: { fontWeight: 'bold', color: '#333', marginBottom: 8 },
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  stepText: { fontSize: 15, color: '#334155', marginBottom: 6, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  conclusionText: { fontSize: 13, color: '#10b981', fontWeight: 'bold', marginTop: 10 }
});