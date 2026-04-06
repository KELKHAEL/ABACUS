import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RSACryptographyLab({ navigation }) {
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  
  const modInverse = (a, m) => {
    let m0 = m, y = 0, x = 1;
    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m; a = t;
      t = y; y = x - q * y; x = t;
    }
    return x < 0 ? x + m0 : x;
  };

  const modPow = (base, exp, mod) => {
    let res = 1n;
    base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp);
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % BigInt(mod);
      base = (base * base) % BigInt(mod);
      exp = exp / 2n;
    }
    return Number(res);
  };

  const calculateRSA = () => {
    const numP = parseInt(p);
    const numQ = parseInt(q);
    const m = parseInt(msg);

    if (isNaN(numP) || isNaN(numQ) || isNaN(m)) {
      alert("Please enter valid numbers."); return;
    }

    const n = numP * numQ;
    const phi = (numP - 1) * (numQ - 1);
    
    // Choose e (standard small prime, commonly 65537, but here we pick one coprime to phi)
    let e = 3;
    while (e < phi) {
      if (gcd(e, phi) === 1) break;
      e += 2;
    }

    const d = modInverse(e, phi);
    const encrypted = modPow(m, e, n);
    const decrypted = modPow(encrypted, d, n);

    setResult({ p: numP, q: numQ, n, phi, e, d, m, encrypted, decrypted });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RSA Cryptography</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="lock-closed" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>How RSA Works</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>1. Pick two primes <Text style={{fontWeight:'bold'}}>p & q</Text>.</Text>
              <Text style={styles.theoryText}>2. Calculate <Text style={{fontWeight:'bold'}}>n = p × q</Text>. This is the modulus.</Text>
              <Text style={styles.theoryText}>3. Find <Text style={{fontWeight:'bold'}}>φ(n) = (p-1)(q-1)</Text>.</Text>
              <Text style={styles.theoryText}>4. Choose <Text style={{fontWeight:'bold'}}>e</Text> (Public Key) coprime to φ(n).</Text>
              <Text style={styles.theoryText}>5. Find <Text style={{fontWeight:'bold'}}>d</Text> (Private Key) such that (e × d) mod φ(n) = 1.</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Step 1: Key Generation</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}><Text style={styles.label}>Prime p</Text><TextInput style={styles.input} keyboardType="numeric" value={p} onChangeText={setP} placeholder="11" /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>Prime q</Text><TextInput style={styles.input} keyboardType="numeric" value={q} onChangeText={setQ} placeholder="13" /></View>
            </View>

            <Text style={styles.cardTitle}>Step 2: Message</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numeric Message (must be less than n)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={msg} onChangeText={setMsg} placeholder="e.g. 85" />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculateRSA}>
              <Text style={styles.calcButtonText}>Generate & Encrypt</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.stepTitle}>Keys Computed:</Text>
              <View style={styles.keyBox}>
                  <Text style={styles.keyText}>Public Key (e, n): ({result.e}, {result.n})</Text>
                  <Text style={styles.keyText}>Private Key (d, n): ({result.d}, {result.n})</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Step-by-Step Encryption:</Text>
              <Text style={styles.mathStep}>Message: {result.m}</Text>
              <Text style={styles.mathStep}>Ciphertext = {result.m}^{result.e} mod {result.n} = <Text style={{color: '#be185d', fontWeight: 'bold'}}>{result.encrypted}</Text></Text>

              <Text style={[styles.stepTitle, {marginTop: 15}]}>Step-by-Step Decryption:</Text>
              <Text style={styles.mathStep}>Original = {result.encrypted}^{result.d} mod {result.n} = <Text style={{color: '#104a28', fontWeight: 'bold'}}>{result.decrypted}</Text></Text>
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
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f2fe', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#0369a1', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#bae6fd' },
  theoryText: { fontSize: 14, color: '#334155', marginBottom: 8 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 15 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, color: '#64748b', marginBottom: 5 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 12, borderRadius: 8 },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcButtonText: { color: 'white', fontWeight: 'bold' },
  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#104a28', elevation: 3 },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 10 },
  keyBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8 },
  keyText: { fontFamily: 'monospace', fontSize: 13, color: '#1e293b' },
  mathStep: { fontSize: 15, fontFamily: 'monospace', marginVertical: 4 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 15 }
});