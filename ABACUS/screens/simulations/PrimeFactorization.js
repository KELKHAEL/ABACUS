import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrimeFactorization({ navigation }) {
  const [numberInput, setNumberInput] = useState('');
  const [results, setResults] = useState(null);

  const calculateFactors = () => {
    let n = parseInt(numberInput);
    if (isNaN(n) || n <= 1) {
      return Alert.alert("Invalid Input", "Please enter an integer greater than 1.");
    }
    if (n > 999999999) {
        return Alert.alert("Number too large", "Please enter a smaller number to prevent app freezing.");
    }

    const originalNumber = n;
    let factors = {};
    
    // Divide by 2
    while (n % 2 === 0) {
      factors[2] = (factors[2] || 0) + 1;
      n = n / 2;
    }
    
    // Divide by odd numbers
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      while (n % i === 0) {
        factors[i] = (factors[i] || 0) + 1;
        n = n / i;
      }
    }
    
    // If n is a prime number greater than 2
    if (n > 2) {
      factors[n] = (factors[n] || 0) + 1;
    }

    const isPrime = Object.keys(factors).length === 1 && factors[originalNumber] === 1;

    // Format the output string: 2^3 x 5^2
    const superscriptMap = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    const toSuperscript = (num) => num.toString().split('').map(d => superscriptMap[d]).join('');

    let equationArr = [];
    for (let prime in factors) {
        let power = factors[prime];
        if (power === 1) {
            equationArr.push(`${prime}`);
        } else {
            equationArr.push(`${prime}${toSuperscript(power)}`);
        }
    }

    setResults({
        original: originalNumber,
        equation: equationArr.join(' × '),
        isPrime: isPrime
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prime Factorization</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Find Prime Factors</Text>
            <Text style={styles.descText}>Break down any integer into the product of its prime building blocks.</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter an integer (N &gt; 1):</Text>
              <TextInput style={styles.input} value={numberInput} onChangeText={setNumberInput} keyboardType="numeric" placeholder="e.g. 120" />
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateFactors}>
              <Text style={styles.calcBtnText}>Factorize</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              <View style={[styles.statusBanner, results.isPrime ? styles.primeBanner : styles.compositeBanner]}>
                  <Ionicons name={results.isPrime ? "star" : "construct"} size={24} color="white" />
                  <Text style={styles.statusText}>
                      {results.isPrime ? "It is a Prime Number!" : "It is a Composite Number"}
                  </Text>
              </View>

              <Text style={styles.cardTitle}>Factorization Equation</Text>
              
              <View style={styles.resultBanner}>
                <Text style={styles.resultValue}>{results.original} = {results.equation}</Text>
              </View>

              {!results.isPrime && (
                  <Text style={styles.hintText}>
                      This means if you multiply {results.equation.replace(/×/g, 'and')} together, you will get exactly {results.original}.
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
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, color: '#555', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  calcBtn: { backgroundColor: '#eab308', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: '#422006', fontWeight: 'bold', fontSize: 16 },
  statusBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 8, marginBottom: 20, gap: 10 },
  primeBanner: { backgroundColor: '#10b981' },
  compositeBanner: { backgroundColor: '#6366f1' },
  statusText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  resultBanner: { backgroundColor: '#f8fafc', padding: 20, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', marginVertical: 10 },
  resultValue: { color: '#111', fontSize: 24, fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  hintText: { fontSize: 12, color: '#6b7280', textAlign: 'center', fontStyle: 'italic', marginTop: 10 }
});