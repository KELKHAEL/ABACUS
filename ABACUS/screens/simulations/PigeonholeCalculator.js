import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PigeonholeCalculator({ navigation }) {
  const [items, setItems] = useState('');
  const [containers, setContainers] = useState('');
  const [results, setResults] = useState(null);

  const calculatePigeonhole = () => {
    let n = parseInt(items);
    let k = parseInt(containers);

    if (isNaN(n) || isNaN(k) || n < 0 || k <= 0) {
      return Alert.alert("Invalid Input", "Items must be 0 or more. Containers must be at least 1.");
    }

    // Ceiling of N / K
    let minGuaranteed = Math.ceil(n / k);

    setResults({ n, k, minGuaranteed });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pigeonhole Principle</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Guaranteed Minimums</Text>
            <Text style={styles.descText}>If you distribute N items into K containers, what is the guaranteed minimum number of items inside at least one container?</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number of Items (N):</Text>
              <TextInput style={styles.input} value={items} onChangeText={setItems} keyboardType="numeric" placeholder="e.g. 10" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number of Containers (K):</Text>
              <TextInput style={styles.input} value={containers} onChangeText={setContainers} keyboardType="numeric" placeholder="e.g. 3" />
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculatePigeonhole}>
              <Text style={styles.calcBtnText}>Calculate</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Conclusion</Text>
              
              <View style={styles.resultBanner}>
                <Text style={styles.resultValue}>{results.minGuaranteed}</Text>
                <Text style={styles.resultLabel}>Items</Text>
              </View>

              <View style={styles.stepsBox}>
                <Text style={styles.formulaText}>Formula: ⌈ N / K ⌉</Text>
                <Text style={styles.stepText}>⌈ {results.n} / {results.k} ⌉ = {results.minGuaranteed}</Text>
              </View>
              
              <Text style={styles.hintText}>
                If you place {results.n} items into {results.k} containers, we can mathematically guarantee that at least one container will hold {results.minGuaranteed} or more items.
              </Text>
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
  resultBanner: { backgroundColor: '#10b981', padding: 20, borderRadius: 8, alignItems: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'center', gap: 10 },
  resultLabel: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  resultValue: { color: '#fff', fontSize: 36, fontWeight: '900' },
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  formulaText: { fontSize: 12, color: '#9ca3af', marginBottom: 8, fontStyle: 'italic' },
  stepText: { fontSize: 18, color: '#111', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  hintText: { fontSize: 14, color: '#374151', backgroundColor: '#f1f5f9', padding: 15, borderRadius: 8, marginTop: 15, lineHeight: 22, textAlign: 'center' }
});