import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PigeonholeCalculator({ navigation }) {
  const [items, setItems] = useState('');
  const [containers, setContainers] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const calculate = () => {
    const n = parseInt(items); // Pigeons
    const k = parseInt(containers); // Holes

    if (isNaN(n) || isNaN(k) || n < 1 || k < 1) {
      alert("Please enter positive integers.");
      return;
    }

    const minGuaranteed = Math.ceil(n / k);

    setResult({ n, k, minGuaranteed });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pigeonhole Principle</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Principle</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>

          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                If you have <Text style={{fontWeight: 'bold'}}>N</Text> pigeons and <Text style={{fontWeight: 'bold'}}>k</Text> pigeonholes, and N {'>'} k, then at least one hole must contain more than one pigeon.
              </Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>The Ceiling Formula:</Text>
              <Text style={styles.formulaText}>⌈ N / k ⌉</Text>
              <Text style={styles.theoryText}>
                The mathematical "ceiling" ⌈x⌉ means you always round UP to the next whole number. Even if the division is 2.1, you round up to 3!
              </Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate Guarantee</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Items (Pigeons / N)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={items} onChangeText={setItems} placeholder="e.g. 10" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Containers (Holes / k)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={containers} onChangeText={setContainers} placeholder="e.g. 3" />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculate}>
              <Text style={styles.calcButtonText}>Prove It</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>The Proof</Text>
              
              <View style={styles.proofBox}>
                  <Text style={styles.proofText}>
                      If you distribute {result.n} items into {result.k} containers, <Text style={{color: '#c2410c', fontWeight: 'bold'}}>at least one container</Text> is mathematically guaranteed to hold:
                  </Text>
                  <Text style={styles.resultHighlight}>{result.minGuaranteed} items</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Mathematical Breakdown:</Text>
              <Text style={styles.mathStep}>Formula = ⌈ N / k ⌉</Text>
              <Text style={styles.mathStep}>Compute = {result.n} / {result.k} = {(result.n / result.k).toFixed(2)}</Text>
              <Text style={styles.mathStep}>Ceiling ⌈{(result.n / result.k).toFixed(2)}⌉ = <Text style={{color: '#c2410c'}}>{result.minGuaranteed}</Text></Text>

              <View style={styles.divider} />

              <Text style={styles.stepTitle}>Real World Example:</Text>
              <Text style={styles.exampleText}>
                  Imagine you have {result.n} socks, and you are throwing them blindly into {result.k} drawers. 
                  Because {result.n} socks won't fit perfectly evenly into {result.k} drawers, you are absolutely guaranteed that when you open the drawers later, at least one drawer will have <Text style={{fontWeight: 'bold'}}>{result.minGuaranteed}</Text> socks inside it!
              </Text>

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
  theoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#334155', lineHeight: 22 },
  formulaText: { fontSize: 22, fontFamily: 'monospace', color: '#0369a1', textAlign: 'center', marginVertical: 10, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#64748b', marginBottom: 5 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 15, borderRadius: 8, fontSize: 18, textAlign: 'center' },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#f97316' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: 10 },
  
  proofBox: { backgroundColor: '#fff7ed', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#fed7aa' },
  proofText: { fontSize: 15, color: '#431407', lineHeight: 22, textAlign: 'center' },
  resultHighlight: { fontSize: 26, fontWeight: '900', color: '#c2410c', textAlign: 'center', marginTop: 10 },
  
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  mathStep: { fontSize: 15, fontFamily: 'monospace', color: '#334155', backgroundColor: '#f1f5f9', padding: 8, borderRadius: 6, marginVertical: 3 },
  
  exampleText: { fontSize: 14, color: '#4b5563', lineHeight: 22, fontStyle: 'italic' }
});