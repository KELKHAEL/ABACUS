import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChineseRemainderLab({ navigation }) {
  const [a1, setA1] = useState('');
  const [m1, setM1] = useState('');
  const [a2, setA2] = useState('');
  const [m2, setM2] = useState('');
  const [results, setResults] = useState(null);

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

  const modInverse = (a, m) => {
    let m0 = m, y = 0, x = 1;
    if (m === 1) return 0;
    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0) x += m0;
    return x;
  };

  const calculateCRT = () => {
    const vA1 = parseInt(a1);
    const vM1 = parseInt(m1);
    const vA2 = parseInt(a2);
    const vM2 = parseInt(m2);

    if (isNaN(vA1) || isNaN(vM1) || isNaN(vA2) || isNaN(vM2) || vM1 <= 1 || vM2 <= 1) {
      return Alert.alert("Invalid Input", "Moduli (m1, m2) must be greater than 1.");
    }

    // CRT requires moduli to be coprime
    if (gcd(vM1, vM2) !== 1) {
      return Alert.alert("Invalid Moduli", "m₁ and m₂ must be coprime (GCD = 1) for standard CRT.");
    }

    const M = vM1 * vM2;
    const M1 = M / vM1; // which is vM2
    const M2 = M / vM2; // which is vM1

    const y1 = modInverse(M1, vM1);
    const y2 = modInverse(M2, vM2);

    // Calculate X
    let x = (vA1 * M1 * y1) + (vA2 * M2 * y2);
    x = ((x % M) + M) % M; // Handle JS negative modulo bug

    setResults({ M, M1, M2, y1, y2, x });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CRT Solver</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Chinese Remainder Theorem</Text>
            <Text style={styles.descText}>Solve for 'x' in a system of two congruences.</Text>
            
            <View style={styles.equationBox}>
                <Text style={styles.eqText}>x ≡ a₁ (mod m₁)</Text>
                <Text style={styles.eqText}>x ≡ a₂ (mod m₂)</Text>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Remainder (a₁)</Text>
                <TextInput style={styles.input} value={a1} onChangeText={setA1} keyboardType="numeric" placeholder="e.g. 2" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Modulus (m₁)</Text>
                <TextInput style={styles.input} value={m1} onChangeText={setM1} keyboardType="numeric" placeholder="e.g. 3" />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Remainder (a₂)</Text>
                <TextInput style={styles.input} value={a2} onChangeText={setA2} keyboardType="numeric" placeholder="e.g. 3" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Modulus (m₂)</Text>
                <TextInput style={styles.input} value={m2} onChangeText={setM2} keyboardType="numeric" placeholder="e.g. 5" />
              </View>
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateCRT}>
              <Text style={styles.calcBtnText}>Solve for x</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Solution Steps</Text>
              
              <View style={styles.resultBanner}>
                <Text style={styles.resultLabel}>Smallest positive solution:</Text>
                <Text style={styles.resultValue}>x = {results.x}</Text>
                <Text style={styles.resultLabel}>(Or any x ≡ {results.x} mod {results.M})</Text>
              </View>

              <View style={styles.stepsBox}>
                <Text style={styles.stepText}>1. Total Modulus (M) = {m1} × {m2} = {results.M}</Text>
                <Text style={styles.stepText}>2. M₁ = M / m₁ = {results.M1}</Text>
                <Text style={styles.stepText}>3. M₂ = M / m₂ = {results.M2}</Text>
                
                <View style={styles.divider} />
                
                <Text style={styles.stepText}>4. Inverse (y₁) of M₁ mod m₁ = {results.y1}</Text>
                <Text style={styles.stepText}>5. Inverse (y₂) of M₂ mod m₂ = {results.y2}</Text>
                
                <View style={styles.divider} />

                <Text style={styles.stepText}>x = (a₁M₁y₁ + a₂M₂y₂) mod M</Text>
                <Text style={styles.stepText}>x = ({a1}×{results.M1}×{results.y1} + {a2}×{results.M2}×{results.y2}) mod {results.M}</Text>
                <Text style={[styles.stepText, {color: '#10b981', fontWeight: 'bold', marginTop: 5}]}>x = {results.x}</Text>
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
  descText: { fontSize: 13, color: '#666', marginBottom: 15 },
  equationBox: { backgroundColor: '#fef3c7', padding: 15, borderRadius: 8, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#fde68a' },
  eqText: { fontSize: 16, fontWeight: 'bold', color: '#92400e', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  inputGroup: { flex: 0.48 },
  label: { fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9', textAlign: 'center' },
  calcBtn: { backgroundColor: '#eab308', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcBtnText: { color: '#422006', fontWeight: 'bold', fontSize: 16 },
  resultBanner: { backgroundColor: '#104a28', padding: 20, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  resultLabel: { color: '#a7f3d0', fontSize: 14 },
  resultValue: { color: '#fff', fontSize: 36, fontWeight: '900', marginVertical: 5 },
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  stepText: { fontSize: 14, color: '#334155', marginBottom: 5, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  divider: { height: 1, backgroundColor: '#cbd5e1', marginVertical: 10 }
});