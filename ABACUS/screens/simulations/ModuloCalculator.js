import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModuloCalculator({ navigation }) {
  const [a, setA] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const calculateModulo = () => {
    const numA = parseInt(a);
    const numN = parseInt(n);

    if (isNaN(numA) || isNaN(numN)) {
      alert("Please enter valid integers.");
      return;
    }
    if (numN === 0) {
      alert("Modulo by zero is undefined.");
      return;
    }

    // Mathematical modulo (handles negative numbers correctly)
    const remainder = ((numA % numN) + numN) % numN;
    const quotient = Math.floor(numA / numN);

    setResult({
      a: numA,
      n: numN,
      q: quotient,
      r: remainder
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modulo Calculator</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Theory</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                The modulo operation (abbreviated as "mod") finds the remainder after division of one number by another.
              </Text>
              <Text style={styles.formulaText}>A ≡ R (mod N)</Text>
              <Text style={styles.theoryText}>
                This is based on the Division Algorithm:
              </Text>
              <Text style={styles.formulaText}>A = (Q × N) + R</Text>
              <Text style={styles.theoryText}>
                Where:{"\n"}
                • <Text style={{fontWeight: 'bold'}}>A</Text> is the Dividend{"\n"}
                • <Text style={{fontWeight: 'bold'}}>N</Text> is the Divisor (the Modulo){"\n"}
                • <Text style={{fontWeight: 'bold'}}>Q</Text> is the Quotient{"\n"}
                • <Text style={{fontWeight: 'bold'}}>R</Text> is the Remainder (your answer)
              </Text>
            </View>
          )}

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate A mod N</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number (A)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={a}
                  onChangeText={setA}
                  placeholder="e.g. 17"
                />
              </View>
              <Text style={styles.modText}>mod</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Modulo (N)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={n}
                  onChangeText={setN}
                  placeholder="e.g. 5"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculateModulo}>
              <Text style={styles.calcButtonText}>Calculate & Explain</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 STEP-BY-STEP RESULT CARD */}
          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Final Answer</Text>
              <Text style={styles.resultHighlight}>
                {result.a} mod {result.n} = {result.r}
              </Text>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Step-by-Step Breakdown:</Text>
              
              <Text style={styles.stepText}>
                <Text style={{fontWeight: 'bold'}}>Step 1:</Text> How many times does {result.n} fit entirely into {result.a}?
              </Text>
              <Text style={styles.mathStep}>{result.a} ÷ {result.n} = {result.q} (Quotient)</Text>
              
              <Text style={styles.stepText}>
                <Text style={{fontWeight: 'bold'}}>Step 2:</Text> Multiply the quotient by the divisor.
              </Text>
              <Text style={styles.mathStep}>{result.q} × {result.n} = {result.q * result.n}</Text>

              <Text style={styles.stepText}>
                <Text style={{fontWeight: 'bold'}}>Step 3:</Text> Subtract this from the original number to find the remainder.
              </Text>
              <Text style={styles.mathStep}>{result.a} - {result.q * result.n} = {result.r} (Remainder)</Text>
              
              <View style={styles.divider} />
              <Text style={styles.stepText}>
                Following the Division Algorithm <Text style={{fontWeight: 'bold'}}>(A = Q × N + R)</Text>:
              </Text>
              <Text style={styles.mathStep}>{result.a} = ({result.q} × {result.n}) + {result.r}</Text>
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
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 10 },
  formulaText: { fontSize: 18, fontWeight: 'bold', color: '#104a28', textAlign: 'center', marginVertical: 10, backgroundColor: '#f0fdf4', padding: 10, borderRadius: 8 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#6b7280', marginBottom: 5 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16, textAlign: 'center' },
  modText: { fontSize: 16, fontWeight: 'bold', color: '#9ca3af', paddingHorizontal: 15, marginTop: 15 },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#eab308' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' },
  resultHighlight: { fontSize: 24, fontWeight: '900', color: '#104a28', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  stepText: { fontSize: 14, color: '#4b5563', marginTop: 10 },
  mathStep: { fontSize: 15, fontFamily: 'monospace', color: '#0369a1', backgroundColor: '#e0f2fe', padding: 10, borderRadius: 6, marginTop: 5, overflow: 'hidden' }
});