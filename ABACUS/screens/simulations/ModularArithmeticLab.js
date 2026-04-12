import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModularArithmeticLab({ navigation }) {
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('1');
  const [modulus, setModulus] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ 12 EDUCATIONAL SAMPLES
  const examples = [
    { name: 'Caesar Shift', b: '10', e: '1', m: '26', desc: 'Alphabet rotation logic.' },
    { name: 'Basic Modulo', b: '17', e: '1', m: '5', desc: '17 divided by 5 leaves 2.' },
    { name: 'Clock Math', b: '25', e: '1', m: '12', desc: '25 hours is 1 o\'clock.' },
    { name: 'Even/Odd', b: '42', e: '1', m: '2', desc: 'Checking parity.' },
    { name: 'Small Power', b: '2', e: '3', m: '5', desc: '2³ mod 5 = 8 mod 5.' },
    { name: 'RSA Sample', b: '7', e: '2', m: '10', desc: 'Encryption core.' },
    { name: 'Large Mod', b: '100', e: '1', m: '37', desc: 'Reducing large numbers.' },
    { name: 'Binary Power', b: '3', e: '4', m: '7', desc: 'Square and multiply logic.' },
    { name: 'Prime Mod', b: '14', e: '1', m: '13', desc: 'Fermat\'s Little Theorem start.' },
    { name: 'Days of Week', b: '10', e: '1', m: '7', desc: 'Date calculation math.' },
    { name: 'Vigenere Key', b: '15', e: '1', m: '26', desc: 'Cipher offset math.' },
    { name: 'Negative Mod', b: '-5', e: '1', m: '26', desc: 'Handling negative offsets.' }
  ];

  // ✅ STRICT NUMERIC FILTERING
  const handleNumericInput = (text, setter, allowNegative = false) => {
    let cleaned;
    if (allowNegative) {
      // Allows digits and a single leading negative sign
      cleaned = text.replace(/[^0-9-]/g, '');
      if (cleaned.indexOf('-', 1) !== -1) cleaned = cleaned.substring(0, cleaned.indexOf('-', 1));
    } else {
      // Allows only digits
      cleaned = text.replace(/[^0-9]/g, '');
    }
    setter(cleaned);
  };

  const loadExample = (ex) => {
    setBase(ex.b);
    setExponent(ex.e);
    setModulus(ex.m);
    setResult(null);
  };

  const calculateMod = () => {
    Keyboard.dismiss();
    const b = parseInt(base, 10);
    const e = parseInt(exponent, 10);
    const m = parseInt(modulus, 10);

    if (isNaN(b) || isNaN(e) || isNaN(m) || m <= 0) {
      Alert.alert("Input Error", "Please ensure all fields contain valid numbers. Modulus must be greater than 0.");
      return;
    }

    let steps = [];
    let currentRes = 1;
    let baseStep = b % m;

    if (baseStep < 0) baseStep += m;

    steps.push(`Setup: Calculating (${b}^${e}) mod ${m}`);
    steps.push(`Reduction: ${b} mod ${m} = ${baseStep}`);

    let tempExp = e;
    let runningBase = baseStep;

    while (tempExp > 0) {
      if (tempExp % 2 === 1) {
        let prev = currentRes;
        currentRes = (currentRes * runningBase) % m;
        steps.push(`Odd Exponent: (${prev} × ${runningBase}) mod ${m} = ${currentRes}`);
      }
      tempExp = Math.floor(tempExp / 2);
      if (tempExp > 0) {
        let prevBase = runningBase;
        runningBase = (runningBase * runningBase) % m;
        steps.push(`Squaring: (${prevBase}²) mod ${m} = ${runningBase}`);
      }
    }

    setResult({ final: currentRes, steps });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Modular Arithmetic Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="timer-outline" size={22} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• Input only numeric values for all parameters.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Base:</Text> Your starting integer (supports negative values).</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Exponent:</Text> The power to raise the base to.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>Modulus:</Text> The "clock" size (must be positive).</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book-outline" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn Congruence & Modulo</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>Modular arithmetic is "clock math"—a system where numbers wrap around after reaching the modulus value.</Text>
              
              <View style={styles.divider} />
              <Text style={styles.theoryText}>Essential for <Text style={{fontWeight:'bold'}}>RSA Cryptography</Text> and cyclic algorithm patterns.</Text>
            </View>
          )}

          <Text style={styles.sectionHeader}>Select Scenario (12 Samples)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
            {examples.map((ex, idx) => (
              <TouchableOpacity key={idx} style={styles.exBtn} onPress={() => loadExample(ex)}>
                <Text style={styles.exBtnText}>{ex.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Base Number (a)</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric" 
                  value={base} 
                  onChangeText={(t) => handleNumericInput(t, setBase, true)} 
                  placeholder="e.g. 17" 
                />
            </View>
            <View style={styles.inputRow}>
                <View style={[styles.inputGroup, {flex:1}]}>
                    <Text style={styles.label}>Exponent (e)</Text>
                    <TextInput 
                      style={styles.input} 
                      keyboardType="number-pad" 
                      value={exponent} 
                      onChangeText={(t) => handleNumericInput(t, setExponent)} 
                      placeholder="1" 
                    />
                </View>
                <View style={[styles.inputGroup, {flex:1, marginLeft: 10}]}>
                    <Text style={styles.label}>Modulus (m)</Text>
                    <TextInput 
                      style={styles.input} 
                      keyboardType="number-pad" 
                      value={modulus} 
                      onChangeText={(t) => handleNumericInput(t, setModulus)} 
                      placeholder="26" 
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.primaryBtn} onPress={calculateMod}>
              <Text style={styles.primaryBtnText}>COMPUTE MODULO</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <View style={styles.ansBox}>
                <Text style={styles.ansLabel}>RESULT REMAINDER:</Text>
                <Text style={styles.ansVal}>{result.final}</Text>
                <Text style={styles.congruenceText}>{base}^{exponent} ≡ {result.final} (mod {modulus})</Text>
              </View>

              <View style={styles.divider} />
              <Text style={styles.stepTitle}>Step-by-Step Logic:</Text>
              {result.steps.map((step, idx) => (
                <Text key={idx} style={styles.logText}>• {step}</Text>
              ))}
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
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginLeft: 15 },
  content: { padding: 15, paddingBottom: 50 },
  guideCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guideHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 },
  guideTitle: { fontWeight: 'bold', color: '#0369a1' },
  guideText: { fontSize: 13, color: '#334155', lineHeight: 18 },
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 15, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryText: { fontSize: 13, color: '#4b5563', lineHeight: 20 },
  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10, textTransform: 'uppercase' },
  exampleScroll: { marginBottom: 20 },
  exBtn: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#cbd5e1' },
  exBtnText: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3 },
  inputRow: { flexDirection: 'row' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 8 },
  input: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 16, fontWeight: 'bold', color: '#111' },
  primaryBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 20, elevation: 4 },
  ansBox: { alignItems: 'center', padding: 10 },
  ansLabel: { fontSize: 11, fontWeight: 'bold', color: '#64748B' },
  ansVal: { fontSize: 48, fontWeight: '900', color: '#104a28', marginVertical: 5 },
  congruenceText: { fontSize: 14, fontWeight: 'bold', color: '#475569', fontStyle: 'italic' },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 10 },
  logText: { fontSize: 13, color: '#475569', marginBottom: 6, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 }
});