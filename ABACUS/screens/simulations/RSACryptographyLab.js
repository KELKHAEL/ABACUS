import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RSACryptographyLab({ navigation }) {
  const [p, setP] = useState('');
  const [q, setQ] = useState('');
  const [msg, setMsg] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT NUMERIC VALIDATION
  const handleInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setter(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (valP, valQ, valM) => {
    setP(valP.toString());
    setQ(valQ.toString());
    setMsg(valM.toString());
    setResult(null);
  };

  // ✅ PRIME CHECKER ALGORITHM
  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

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
    Keyboard.dismiss();

    if (!p || !q || !msg) {
        Alert.alert("Required Fields", "Please enter values for p, q, and the Message.");
        return;
    }

    const numP = parseInt(p, 10);
    const numQ = parseInt(q, 10);
    const m = parseInt(msg, 10);

    if (isNaN(numP) || isNaN(numQ) || isNaN(m)) {
      Alert.alert("Input Error", "Please enter valid positive integers."); 
      return;
    }

    // ✅ RSA SPECIFIC VALIDATIONS
    if (!isPrime(numP)) {
        Alert.alert("Math Error", `Your value for p (${numP}) is NOT a prime number. RSA strictly requires p and q to be prime.`);
        return;
    }
    if (!isPrime(numQ)) {
        Alert.alert("Math Error", `Your value for q (${numQ}) is NOT a prime number. RSA strictly requires p and q to be prime.`);
        return;
    }
    if (numP === numQ) {
        Alert.alert("Security Error", "p and q cannot be the same prime number. This ruins the security of the modulus.");
        return;
    }

    const n = numP * numQ;

    if (m >= n) {
        Alert.alert("Overflow Error", `The Message (${m}) MUST be strictly less than the Modulus n (${n}). Otherwise, the math wraps around and decryption will fail!`);
        return;
    }

    const phi = (numP - 1) * (numQ - 1);
    
    // Choose e (Public Exponent)
    let e = 3;
    while (e < phi) {
      if (gcd(e, phi) === 1) break;
      e += 2;
    }

    const d = modInverse(e, phi);
    
    // Encrypt and Decrypt using Modular Exponentiation
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
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Primes Only:</Text> <Text style={{fontStyle:'italic'}}>p</Text> and <Text style={{fontStyle:'italic'}}>q</Text> must be distinct prime numbers (e.g., 11, 13, 17).</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Message Size:</Text> The numeric message must be smaller than <Text style={{fontStyle:'italic'}}>p × q</Text>.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Hardware Limit:</Text> Please keep primes under 4 digits to prevent mobile buffer overflow.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="lock-closed" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>How RSA Works</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>1. Pick two primes <Text style={{fontWeight:'bold'}}>p & q</Text>.</Text>
              <Text style={styles.theoryText}>2. Calculate <Text style={{fontWeight:'bold'}}>n = p × q</Text>. This is the public modulus.</Text>
              <Text style={styles.theoryText}>3. Find Totient <Text style={{fontWeight:'bold'}}>ϕ(n) = (p-1)(q-1)</Text>. This represents the numbers coprime to n.</Text>
              <Text style={styles.theoryText}>4. Choose <Text style={{fontWeight:'bold'}}>e</Text> (Public Key) that is coprime to ϕ(n).</Text>
              <Text style={styles.theoryText}>5. Find <Text style={{fontWeight:'bold'}}>d</Text> (Private Key) using the Extended Euclidean Algorithm such that (e × d) mod ϕ(n) = 1.</Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Cryptographic Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(11, 13, 85)}>
                  <Ionicons name="school-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Textbook (p=11, q=13)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(61, 53, 1000)}>
                  <Ionicons name="shield-checkmark-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Medium Keys (p=61, q=53)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(17, 19, 400)}>
                  <Ionicons name="warning-outline" size={16} color="#dc2626" />
                  <Text style={[styles.exampleBtnText, {color: '#dc2626'}]}>Message Overflow (Fails)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Step 1: Key Generation</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Prime p</Text>
                  <TextInput style={styles.input} keyboardType="number-pad" value={p} onChangeText={(t) => handleInput(t, setP)} placeholder="11" maxLength={4} />
              </View>
              <View style={styles.inputGroup}>
                  <Text style={styles.label}>Prime q</Text>
                  <TextInput style={styles.input} keyboardType="number-pad" value={q} onChangeText={(t) => handleInput(t, setQ)} placeholder="13" maxLength={4} />
              </View>
            </View>

            <Text style={styles.cardTitle}>Step 2: Intercept</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numeric Message (M)</Text>
              <TextInput style={styles.input} keyboardType="number-pad" value={msg} onChangeText={(t) => handleInput(t, setMsg)} placeholder="e.g. 85" maxLength={6} />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculateRSA}>
              <Text style={styles.calcButtonText}>Generate & Encrypt</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT CARD */}
          {result && (
            <View style={styles.resultCard}>
              
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 15}}>
                  <Ionicons name="key-outline" size={24} color="#104a28" />
                  <Text style={[styles.cardTitle, {marginBottom: 0}]}>RSA Architecture</Text>
              </View>

              {/* MATHEMATICAL FOUNDATION */}
              <Text style={styles.stepTitle}>1. Core Variables</Text>
              <View style={styles.mathStepContainer}>
                  <Text style={styles.mathStep}>Modulus (n) = {result.p} × {result.q} = <Text style={{fontWeight: 'bold', color: '#111'}}>{result.n}</Text></Text>
                  <Text style={styles.mathStep}>Totient ϕ(n) = ({result.p}-1) × ({result.q}-1) = <Text style={{fontWeight: 'bold', color: '#111'}}>{result.phi}</Text></Text>
              </View>

              {/* THE KEYS */}
              <Text style={[styles.stepTitle, {marginTop: 15}]}>2. Generated Keys</Text>
              <View style={styles.keyContainer}>
                  <View style={[styles.keyBox, {borderColor: '#93c5fd', backgroundColor: '#eff6ff'}]}>
                      <Text style={[styles.keyLabel, {color: '#1d4ed8'}]}>PUBLIC KEY (e, n)</Text>
                      <Text style={[styles.keyText, {color: '#1e3a8a'}]}>({result.e}, {result.n})</Text>
                  </View>
                  <View style={[styles.keyBox, {borderColor: '#d8b4fe', backgroundColor: '#fdf4ff'}]}>
                      <Text style={[styles.keyLabel, {color: '#7e22ce'}]}>PRIVATE KEY (d, n)</Text>
                      <Text style={[styles.keyText, {color: '#581c87'}]}>({result.d}, {result.n})</Text>
                  </View>
              </View>

              <View style={styles.divider} />
              
              {/* ENCRYPTION */}
              <Text style={styles.stepTitle}>3. Encryption (Sender)</Text>
              <Text style={styles.descText}>The sender locks the message ({result.m}) using the Public Key (e={result.e}).</Text>
              <View style={styles.mathStepContainer}>
                  <Text style={styles.mathStep}>C ≡ M^e (mod n)</Text>
                  <Text style={styles.mathStep}>C ≡ {result.m}^{result.e} (mod {result.n})</Text>
                  <Text style={[styles.mathStep, {color: '#be185d', fontWeight: 'bold', fontSize: 18, marginTop: 4}]}>Ciphertext = {result.encrypted}</Text>
              </View>

              {/* DECRYPTION */}
              <Text style={[styles.stepTitle, {marginTop: 20}]}>4. Decryption (Receiver)</Text>
              <Text style={styles.descText}>The receiver unlocks the Ciphertext ({result.encrypted}) using their secret Private Key (d={result.d}).</Text>
              <View style={styles.mathStepContainer}>
                  <Text style={styles.mathStep}>M' ≡ C^d (mod n)</Text>
                  <Text style={styles.mathStep}>M' ≡ {result.encrypted}^{result.d} (mod {result.n})</Text>
                  
                  <View style={styles.successBox}>
                      <Ionicons name="checkmark-done-circle" size={24} color="#16a34a" />
                      <Text style={styles.successText}>Decrypted = {result.decrypted}</Text>
                  </View>
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
  theoryText: { fontSize: 14, color: '#334155', marginBottom: 8, lineHeight: 22 },
  
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1f2937', marginBottom: 15 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  inputGroup: { flex: 1 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#64748b', marginBottom: 5, textTransform: 'uppercase' },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 15, borderRadius: 8, fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', textAlign: 'center', color: '#111' },
  
  calcButton: { backgroundColor: '#104a28', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#104a28', elevation: 3 },
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 10 },
  descText: { fontSize: 13, color: '#64748b', fontStyle: 'italic', marginBottom: 10, lineHeight: 18 },
  
  keyContainer: { flexDirection: 'row', gap: 10 },
  keyBox: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  keyLabel: { fontSize: 10, fontWeight: 'bold', marginBottom: 5 },
  keyText: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 16, fontWeight: 'bold' },

  mathStepContainer: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  mathStep: { fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginVertical: 4, color: '#334155' },
  
  successBox: { flexDirection: 'row', backgroundColor: '#dcfce7', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: '#bbf7d0' },
  successText: { color: '#166534', fontWeight: '900', fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 20 }
});