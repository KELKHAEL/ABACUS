import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModuloCalculator({ navigation }) {
  const [a, setA] = useState('');
  const [n, setN] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT INPUT VALIDATION
  const handleInputA = (text) => {
    // Allows numbers and a negative sign ONLY at the start
    let cleanText = text.replace(/[^0-9-]/g, ''); 
    if (cleanText.lastIndexOf('-') > 0) {
      cleanText = cleanText.replace(/-/g, '');
      if (text.startsWith('-')) cleanText = '-' + cleanText;
    }
    setA(cleanText);
  };

  const handleInputN = (text) => {
    // Modulo N must strictly be a positive integer
    const cleanText = text.replace(/[^0-9]/g, ''); 
    setN(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (valA, valN) => {
    setA(valA.toString());
    setN(valN.toString());
    setResult(null);
  };

  const calculateModulo = () => {
    Keyboard.dismiss();
    
    if (a === '' || n === '') {
        Alert.alert("Required Fields", "Please enter values for both A and N.");
        return;
    }

    const numA = parseInt(a, 10);
    const numN = parseInt(n, 10);

    if (isNaN(numA) || isNaN(numN)) {
      Alert.alert("Input Error", "Please enter valid integers.");
      return;
    }
    
    // ✅ TRAP INVALID MODULO
    if (numN === 0) {
      Alert.alert("Math Error", "Modulo by zero is mathematically undefined. Please enter a divisor (N) greater than 0.");
      return;
    }

    if (Math.abs(numA) > 999999999 || numN > 999999999) {
        Alert.alert("Hardware Limit", "Numbers are too large. Please keep values under 1 Billion.");
        return;
    }

    // Mathematical modulo (handles negative numbers correctly in JS)
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
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> Modulo arithmetic strictly uses integers (no decimals).</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Dividend (A):</Text> Can be positive, zero, or negative.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Modulo (N):</Text> Must be strictly greater than 0.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Theory</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                The modulo operation (often called "Clock Math") finds the remainder after division of one number by another.
              </Text>
              <Text style={styles.formulaText}>A ≡ R (mod N)</Text>
              <Text style={styles.theoryText}>
                This is based heavily on the Division Algorithm:
              </Text>
              <Text style={styles.formulaText}>A = (Q × N) + R</Text>
              <Text style={styles.theoryText}>
                Where:{"\n"}
                • <Text style={{fontWeight: 'bold'}}>A</Text> is the Dividend (The number being divided){"\n"}
                • <Text style={{fontWeight: 'bold'}}>N</Text> is the Divisor (The Modulo wrap-around point){"\n"}
                • <Text style={{fontWeight: 'bold'}}>Q</Text> is the Quotient (How many full times it fits){"\n"}
                • <Text style={{fontWeight: 'bold'}}>R</Text> is the Remainder (Your final answer)
              </Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Real-World Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(14, 12)}>
                  <Ionicons name="time-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Clock Time (14 mod 12)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(100, 7)}>
                  <Ionicons name="calendar-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Days of the Week (100 mod 7)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(-22, 5)}>
                  <Ionicons name="trending-down-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Negative Math (-22 mod 5)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate A mod N</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number (A)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numbers-and-punctuation"
                  value={a}
                  onChangeText={handleInputA}
                  placeholder="e.g. 14"
                  placeholderTextColor="#666"
                  maxLength={10}
                />
              </View>
              <Text style={styles.modText}>mod</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Modulo (N)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  value={n}
                  onChangeText={handleInputN}
                  placeholder="e.g. 12"
                  placeholderTextColor="#666"
                  maxLength={10}
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
                <Text style={{fontWeight: 'bold'}}>Step 1:</Text> How many full times does {result.n} fit into {result.a}? (Rounded DOWN)
              </Text>
              <Text style={styles.mathStep}>{result.a} ÷ {result.n} = {result.q} (Quotient)</Text>
              
              <Text style={styles.stepText}>
                <Text style={{fontWeight: 'bold'}}>Step 2:</Text> Multiply the quotient by the divisor.
              </Text>
              <Text style={styles.mathStep}>{result.q} × {result.n} = {result.q * result.n}</Text>

              <Text style={styles.stepText}>
                <Text style={{fontWeight: 'bold'}}>Step 3:</Text> Subtract this from the original number to find the remainder.
              </Text>
              <Text style={styles.mathStep}>{result.a} - ({result.q * result.n}) = {result.r} (Remainder)</Text>
              
              <View style={styles.divider} />
              <Text style={styles.stepText}>
                Following the Division Algorithm <Text style={{fontWeight: 'bold'}}>(A = Q × N + R)</Text>:
              </Text>
              <Text style={styles.mathStep}>{result.a} = ({result.q} × {result.n}) + {result.r}</Text>

              {/* ✅ SPECIAL EXPLANATION FOR NEGATIVE NUMBERS */}
              {result.a < 0 && (
                  <View style={styles.explanationBox}>
                      <Ionicons name="alert-circle-outline" size={20} color="#b45309" style={{marginTop: 2}}/>
                      <Text style={styles.explanationText}>
                          <Text style={{fontWeight: 'bold', color: '#78350f'}}>Why is the quotient negative?</Text> In discrete mathematics, the remainder MUST be positive {'($0 \le R < N$)'}. To achieve this with a negative Dividend ({result.a}), the Quotient is rounded strictly <Text style={{fontWeight:'bold'}}>DOWN</Text> towards negative infinity (to {result.q}), allowing the remainder to correctly "wrap around" to a positive {result.r}.
                      </Text>
                  </View>
              )}
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
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
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 10 },
  formulaText: { fontSize: 18, fontWeight: 'bold', color: '#104a28', textAlign: 'center', marginVertical: 10, backgroundColor: '#f0fdf4', padding: 10, borderRadius: 8, overflow: 'hidden' },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  inputRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#6b7280', marginBottom: 5, textTransform: 'uppercase' },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontSize: 18, textAlign: 'center', color: '#333', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  modText: { fontSize: 16, fontWeight: 'bold', color: '#9ca3af', paddingHorizontal: 15, marginTop: 15 },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#eab308' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' },
  resultHighlight: { fontSize: 26, fontWeight: '900', color: '#104a28', marginTop: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  stepText: { fontSize: 14, color: '#4b5563', marginTop: 10, lineHeight: 20 },
  mathStep: { fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#0369a1', backgroundColor: '#e0f2fe', padding: 12, borderRadius: 6, marginTop: 8, overflow: 'hidden', fontWeight: 'bold' },

  explanationBox: { flexDirection: 'row', backgroundColor: '#fffbeb', padding: 15, borderRadius: 8, marginTop: 20, gap: 10, borderWidth: 1, borderColor: '#fef08a' },
  explanationText: { flex: 1, fontSize: 13, color: '#92400e', lineHeight: 20 }
});