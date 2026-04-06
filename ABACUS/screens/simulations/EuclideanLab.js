import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EuclideanLab({ navigation }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const calculateGCD = () => {
    let numA = Math.abs(parseInt(a));
    let numB = Math.abs(parseInt(b));

    if (isNaN(numA) || isNaN(numB)) {
      alert("Please enter valid integers.");
      return;
    }

    // Ensure A >= B for the algorithm to look standard
    if (numB > numA) {
      let temp = numA;
      numA = numB;
      numB = temp;
    }

    let steps = [];
    let currentA = numA;
    let currentB = numB;

    if (currentB === 0) {
       setResult({ gcd: currentA, steps: [{ a: currentA, b: 0, q: 0, r: 0 }] });
       return;
    }

    while (currentB !== 0) {
      let q = Math.floor(currentA / currentB);
      let r = currentA % currentB;
      
      steps.push({ a: currentA, b: currentB, q, r });
      
      currentA = currentB;
      currentB = r;
    }

    setResult({ gcd: currentA, steps });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Euclidean Lab (GCD)</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 📚 THEORY CARD */}
        <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
          <Ionicons name="book" size={20} color="#104a28" />
          <Text style={styles.theoryToggleText}>Learn the Algorithm</Text>
          <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
        </TouchableOpacity>
        
        {showTheory && (
          <View style={styles.theoryCard}>
            <Text style={styles.theoryText}>
              The Euclidean Algorithm is an efficient method for computing the Greatest Common Divisor (GCD) of two integers.
            </Text>
            <Text style={styles.formulaText}>A = (B × Q) + R</Text>
            <Text style={styles.theoryText}>
              <Text style={{fontWeight: 'bold'}}>The Process:</Text>{"\n"}
              1. Divide the larger number (A) by the smaller number (B).{"\n"}
              2. Note the remainder (R).{"\n"}
              3. Replace A with B, and replace B with R.{"\n"}
              4. Repeat until the remainder is 0.{"\n"}
              5. The last non-zero remainder is the GCD!
            </Text>
          </View>
        )}

        {/* ⚙️ CALCULATOR CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Find the GCD</Text>
          <View style={styles.inputRow}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Number (A)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={a} onChangeText={setA} placeholder="e.g. 252" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Second Number (B)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={b} onChangeText={setB} placeholder="e.g. 105" />
            </View>
          </View>
          <TouchableOpacity style={styles.calcButton} onPress={calculateGCD}>
            <Text style={styles.calcButtonText}>Generate Steps</Text>
          </TouchableOpacity>
        </View>

        {/* 📝 STEP-BY-STEP RESULT CARD */}
        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Final Answer</Text>
            <Text style={styles.resultHighlight}>GCD = {result.gcd}</Text>

            <View style={styles.divider} />
            
            <Text style={styles.stepTitle}>Execution Steps:</Text>
            
            {result.steps.length > 0 ? (
                result.steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                        <Text style={styles.stepCounter}>Step {index + 1}</Text>
                        <Text style={styles.mathStep}>
                            {step.a} = ({step.b} × {step.q}) + <Text style={{color: '#d32f2f', fontWeight: 'bold'}}>{step.r}</Text>
                        </Text>
                        <Text style={styles.stepExplanation}>
                            Divide {step.a} by {step.b}. Quotient is {step.q}, Remainder is {step.r}.
                        </Text>
                    </View>
                ))
            ) : (
                <Text style={styles.stepText}>One of the numbers is 0. The GCD is the non-zero number.</Text>
            )}

            {result.steps.length > 0 && (
                <Text style={styles.conclusionText}>
                    The algorithm stops because the next remainder is 0. Therefore, the last non-zero remainder is <Text style={{fontWeight: 'bold', color: '#104a28'}}>{result.gcd}</Text>.
                </Text>
            )}
          </View>
        )}

      </ScrollView>
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
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  formulaText: { fontSize: 18, fontWeight: 'bold', color: '#104a28', textAlign: 'center', marginVertical: 10, backgroundColor: '#f0fdf4', padding: 10, borderRadius: 8 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#6b7280', marginBottom: 5 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16 },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#3b82f6' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' },
  resultHighlight: { fontSize: 24, fontWeight: '900', color: '#104a28', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  
  stepContainer: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#94a3b8' },
  stepCounter: { fontSize: 11, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase' },
  mathStep: { fontSize: 16, fontFamily: 'monospace', color: '#111', marginVertical: 5 },
  stepExplanation: { fontSize: 12, color: '#64748b' },
  conclusionText: { marginTop: 10, fontSize: 14, color: '#333', backgroundColor: '#dcfce7', padding: 12, borderRadius: 8, overflow: 'hidden' }
});