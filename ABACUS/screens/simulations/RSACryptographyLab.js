import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RSACryptographyLab({ navigation }) {
  const [p, setP] = useState('11');
  const [q, setQ] = useState('13');
  const [message, setMessage] = useState('7');
  const [results, setResults] = useState(null);

  // Helper: GCD
  const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));

  // Helper: Modular Exponentiation for BigInt
  const modPow = (base, exp, mod) => {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      exp = exp / 2n;
      base = (base * base) % mod;
    }
    return res;
  };

  // Helper: Extended Euclidean Algorithm for Modular Inverse
  const modInverse = (e, phi) => {
    let m0 = phi, y = 0n, x = 1n;
    if (phi === 1n) return 0n;
    while (e > 1n) {
      let q = e / phi;
      let t = phi;
      phi = e % phi;
      e = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0n) x += m0;
    return x;
  };

  const isPrime = (num) => {
    for (let i = 2n, s = Math.sqrt(Number(num)); i <= s; i++) {
        if (num % i === 0n) return false;
    }
    return num > 1n;
  };

  const simulateRSA = () => {
    try {
      const pInt = BigInt(p);
      const qInt = BigInt(q);
      const mInt = BigInt(message);

      if (!isPrime(pInt) || !isPrime(qInt)) {
        return Alert.alert("Invalid Input", "Both p and q must be prime numbers.");
      }
      if (pInt === qInt) {
        return Alert.alert("Invalid Input", "p and q must be distinct primes.");
      }

      // Step 1: Compute n and Totient (phi)
      const n = pInt * qInt;
      const phi = (pInt - 1n) * (qInt - 1n);

      if (mInt >= n) {
        return Alert.alert("Invalid Input", `Message must be strictly less than n (${n}).`);
      }

      // Step 2: Choose public key 'e'
      let e = 2n;
      while (e < phi) {
        if (gcd(e, phi) === 1n) break;
        e++;
      }

      // Step 3: Compute private key 'd'
      const d = modInverse(e, phi);

      // Step 4: Encrypt and Decrypt
      const encrypted = modPow(mInt, e, n);
      const decrypted = modPow(encrypted, d, n);

      setResults({
        n: n.toString(),
        phi: phi.toString(),
        e: e.toString(),
        d: d.toString(),
        encrypted: encrypted.toString(),
        decrypted: decrypted.toString()
      });
    } catch (err) {
      Alert.alert("Error", "Please enter valid integer numbers.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RSA Cryptography</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>1. Key Generation</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Prime (p)</Text>
                <TextInput style={styles.input} value={p} onChangeText={setP} keyboardType="numeric" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Prime (q)</Text>
                <TextInput style={styles.input} value={q} onChangeText={setQ} keyboardType="numeric" />
              </View>
            </View>

            <Text style={styles.cardTitle}>2. Message</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Integer Message (M)</Text>
              <TextInput style={styles.input} value={message} onChangeText={setMessage} keyboardType="numeric" />
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={simulateRSA}>
              <Text style={styles.calcBtnText}>Simulate RSA Algorithm</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Simulation Results</Text>
              
              <View style={styles.resultBox}>
                <Text style={styles.stepTitle}>Step 1: Modulus & Totient</Text>
                <Text style={styles.resultText}>n = p × q = {results.n}</Text>
                <Text style={styles.resultText}>φ(n) = (p-1)(q-1) = {results.phi}</Text>
              </View>

              <View style={styles.resultBox}>
                <Text style={styles.stepTitle}>Step 2: Public & Private Keys</Text>
                <Text style={styles.resultText}>Public Key (e) = {results.e}  <Text style={styles.hint}>(gcd(e, φ(n)) = 1)</Text></Text>
                <Text style={styles.resultText}>Private Key (d) = {results.d}  <Text style={styles.hint}>(d ≡ e⁻¹ mod φ(n))</Text></Text>
              </View>

              <View style={[styles.resultBox, { borderLeftColor: '#ef4444' }]}>
                <Text style={styles.stepTitle}>Step 3: Encryption (C = Mᵉ mod n)</Text>
                <Text style={styles.cipherText}>Ciphertext = {results.encrypted}</Text>
              </View>

              <View style={[styles.resultBox, { borderLeftColor: '#10b981' }]}>
                <Text style={styles.stepTitle}>Step 4: Decryption (M = Cᵈ mod n)</Text>
                <Text style={styles.successText}>Decrypted Message = {results.decrypted}</Text>
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
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#104a28', marginBottom: 10, marginTop: 10 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  inputGroup: { flex: 0.48, marginBottom: 10 },
  label: { fontSize: 12, color: '#555', marginBottom: 5, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9', textAlign: 'center' },
  calcBtn: { backgroundColor: '#eab308', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcBtnText: { color: '#422006', fontWeight: 'bold', fontSize: 16 },
  resultBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#3b82f6' },
  stepTitle: { fontWeight: 'bold', color: '#111', marginBottom: 5 },
  resultText: { color: '#374151', fontSize: 14, marginVertical: 2, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  hint: { color: '#9ca3af', fontSize: 11 },
  cipherText: { fontSize: 16, fontWeight: 'bold', color: '#ef4444' },
  successText: { fontSize: 16, fontWeight: 'bold', color: '#10b981' }
});