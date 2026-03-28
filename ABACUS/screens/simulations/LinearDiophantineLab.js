import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LinearDiophantineLab({ navigation }) {
  const [valA, setValA] = useState('');
  const [valB, setValB] = useState('');
  const [valC, setValC] = useState('');
  const [results, setResults] = useState(null);

  // Extended Euclidean Algorithm
  const extendedGCD = (a, b) => {
    if (b === 0) return [1, 0, a];
    const [x1, y1, gcd] = extendedGCD(b, a % b);
    const x = y1;
    const y = x1 - Math.floor(a / b) * y1;
    return [x, y, gcd];
  };

  const calculateEquation = () => {
    const a = parseInt(valA);
    const b = parseInt(valB);
    const c = parseInt(valC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0 || b === 0) {
      return Alert.alert("Invalid Input", "Please enter valid non-zero integers for a and b.");
    }

    const [x0_base, y0_base, gcd] = extendedGCD(Math.abs(a), Math.abs(b));
    
    // Check if solution exists (c must be divisible by gcd(a,b))
    if (c % gcd !== 0) {
      setResults({ a, b, c, gcd, hasSolution: false });
      return;
    }

    // Adjust signs
    const x_sign = a < 0 ? -x0_base : x0_base;
    const y_sign = b < 0 ? -y0_base : y0_base;

    // Multiply by factor to get particular solution for 'c'
    const factor = c / gcd;
    const x_particular = x_sign * factor;
    const y_particular = y_sign * factor;

    // Values for general solution formula: x = x0 + (b/gcd)t
    const x_gen_step = b / gcd;
    const y_gen_step = -(a / gcd);

    setResults({
      a, b, c, gcd,
      hasSolution: true,
      x_part: x_particular,
      y_part: y_particular,
      x_gen: x_gen_step,
      y_gen: y_gen_step
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diophantine Solver</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Solve: ax + by = c</Text>
            <Text style={styles.descText}>Find the integer solutions for x and y using the Extended Euclidean Algorithm.</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Value (a)</Text>
                <TextInput style={styles.input} value={valA} onChangeText={setValA} keyboardType="numeric" placeholder="e.g. 12" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Value (b)</Text>
                <TextInput style={styles.input} value={valB} onChangeText={setValB} keyboardType="numeric" placeholder="e.g. 15" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Value (c)</Text>
                <TextInput style={styles.input} value={valC} onChangeText={setValC} keyboardType="numeric" placeholder="e.g. 9" />
              </View>
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateEquation}>
              <Text style={styles.calcBtnText}>Find Solutions</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Solution Breakdown</Text>
              
              <View style={styles.stepsBox}>
                <Text style={styles.stepTitle}>1. GCD Check</Text>
                <Text style={styles.stepText}>gcd({results.a}, {results.b}) = <Text style={{fontWeight: 'bold', color: '#10b981'}}>{results.gcd}</Text></Text>
                
                {!results.hasSolution ? (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>No Integer Solution!</Text>
                    <Text style={styles.errorSub}>Because {results.gcd} does not divide exactly into {results.c}.</Text>
                  </View>
                ) : (
                  <>
                    <Text style={[styles.stepText, {color: '#10b981', marginTop: 5}]}>Since {results.gcd} divides {results.c}, solutions exist!</Text>

                    <View style={styles.divider} />
                    
                    <Text style={styles.stepTitle}>2. Particular Solution</Text>
                    <Text style={styles.stepText}>x₀ = {results.x_part}</Text>
                    <Text style={styles.stepText}>y₀ = {results.y_part}</Text>
                    <Text style={styles.formulaHint}>Verify: ({results.a})({results.x_part}) + ({results.b})({results.y_part}) = {results.c}</Text>

                    <View style={styles.divider} />

                    <Text style={styles.stepTitle}>3. General Solution (for any integer 't')</Text>
                    <View style={styles.generalBox}>
                      <Text style={styles.genText}>x = {results.x_part} {results.x_gen >= 0 ? '+' : ''} {results.x_gen}t</Text>
                      <Text style={styles.genText}>y = {results.y_part} {results.y_gen >= 0 ? '+' : ''} {results.y_gen}t</Text>
                    </View>
                  </>
                )}
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
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginBottom: 10 },
  descText: { fontSize: 13, color: '#666', marginBottom: 15 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  inputGroup: { flex: 0.31 },
  label: { fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9', textAlign: 'center' },
  calcBtn: { backgroundColor: '#eab308', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: '#422006', fontWeight: 'bold', fontSize: 16 },
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  stepTitle: { fontWeight: 'bold', color: '#333', marginBottom: 5, fontSize: 15 },
  stepText: { fontSize: 15, color: '#4b5563', marginBottom: 3, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  errorBox: { backgroundColor: '#fee2e2', padding: 10, borderRadius: 6, marginTop: 10, borderLeftWidth: 4, borderLeftColor: '#ef4444' },
  errorText: { color: '#b91c1c', fontWeight: 'bold', fontSize: 15 },
  errorSub: { color: '#991b1b', fontSize: 12, marginTop: 3 },
  divider: { height: 1, backgroundColor: '#cbd5e1', marginVertical: 15 },
  formulaHint: { fontSize: 12, color: '#9ca3af', fontStyle: 'italic', marginTop: 5 },
  generalBox: { backgroundColor: '#1e293b', padding: 15, borderRadius: 8, marginTop: 5 },
  genText: { color: '#eab308', fontWeight: 'bold', fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginBottom: 5 }
});