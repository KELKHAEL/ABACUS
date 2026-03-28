import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FibonacciCalculator({ navigation }) {
  const [term, setTerm] = useState('10');
  const [sequence, setSequence] = useState([]);

  const calculateFibonacci = () => {
    const n = parseInt(term);
    if (isNaN(n) || n < 0 || n > 100) {
      return Alert.alert("Invalid Input", "Please enter a positive number up to 100.");
    }

    let fib = [0];
    if (n > 0) fib.push(1);
    
    for (let i = 2; i <= n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    
    setSequence(fib);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fibonacci Sequence</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate the n-th Term</Text>
            <Text style={styles.descText}>
              The Fibonacci sequence starts with 0 and 1. Every subsequent number is the sum of the two preceding ones: F(n) = F(n-1) + F(n-2).
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter 'n' (Number of terms):</Text>
              <TextInput style={styles.input} value={term} onChangeText={setTerm} keyboardType="numeric" placeholder="e.g. 10" />
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateFibonacci}>
              <Text style={styles.calcBtnText}>Generate Sequence</Text>
            </TouchableOpacity>
          </View>

          {sequence.length > 0 && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Result</Text>
              
              <View style={styles.resultBanner}>
                <Text style={styles.resultLabel}>F({term}) =</Text>
                <Text style={styles.resultValue}>{sequence[sequence.length - 1]}</Text>
              </View>

              <Text style={styles.subTitle}>Sequence up to F({term}):</Text>
              <View style={styles.sequenceBox}>
                <Text style={styles.sequenceText}>{sequence.join(', ')}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// (Reusing your standard styles)
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
  resultBanner: { backgroundColor: '#104a28', padding: 20, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  resultLabel: { color: '#a7f3d0', fontSize: 16, fontWeight: 'bold' },
  resultValue: { color: '#fff', fontSize: 32, fontWeight: '900' },
  subTitle: { fontWeight: 'bold', color: '#333', marginBottom: 8 },
  sequenceBox: { backgroundColor: '#f0fdf4', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#bbf7d0' },
  sequenceText: { fontSize: 16, color: '#166534', lineHeight: 24 }
});