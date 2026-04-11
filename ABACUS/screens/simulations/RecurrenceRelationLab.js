import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RecurrenceRelationLab({ navigation }) {
  const [a0, setA0] = useState(''); 
  const [multiplier, setMultiplier] = useState(''); 
  const [constant, setConstant] = useState(''); 
  const [targetN, setTargetN] = useState('');
  const [result, setResult] = useState(null);

  // ✅ PRESET EXAMPLES LIBRARY
  const examples = [
    { name: 'Arithmetic (Step 5)', a0: '0', m: '1', c: '5', n: '10', icon: 'trending-up' },
    { name: 'Geometric (Double)', a0: '1', m: '2', c: '0', n: '8', icon: 'analytics' },
    { name: 'Hanoi Puzzle Rule', a0: '1', m: '2', c: '1', n: '7', icon: 'layers' },
    { name: 'Tripling + Constant', a0: '2', m: '3', c: '4', n: '5', icon: 'cube' },
    { name: 'Alternating Signs', a0: '1', m: '-2', c: '3', n: '6', icon: 'git-compare' },
    { name: 'Growth Decay', a0: '100', m: '0.5', c: '10', n: '8', icon: 'water' },
  ];

  const loadExample = (ex) => {
    setA0(ex.a0);
    setMultiplier(ex.m);
    setConstant(ex.c);
    setTargetN(ex.n);
    setResult(null);
  };

  const handleMathInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9.\-]/g, '');
    setter(cleanText);
  };

  const handleIntegerInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setter(cleanText);
  };

  const calculateRecurrence = () => {
    Keyboard.dismiss();
    
    if (a0 === '' || multiplier === '' || constant === '' || targetN === '') {
        Alert.alert("Required Fields", "Please ensure all input fields are filled.");
        return;
    }

    const start = parseFloat(a0);
    const m = parseFloat(multiplier);
    const c = parseFloat(constant);
    const n = parseInt(targetN, 10);

    if (isNaN(start) || isNaN(m) || isNaN(c) || isNaN(n)) {
      Alert.alert("Input Error", "Please enter valid numbers.");
      return;
    }

    if (n > 50) {
        Alert.alert("Value too high", "To prevent performance lag, please enter an 'n' of 50 or less.");
        return;
    }

    let sequence = [{ n: 0, val: start, work: `Initial Base Case (a₀)` }];
    let currentVal = start;
    let steps = ["Start with a₀ = " + start];

    for (let i = 1; i <= n; i++) {
      let prevVal = currentVal;
      currentVal = m * currentVal + c;
      sequence.push({
        n: i,
        val: parseFloat(currentVal.toFixed(4)),
        work: `a${i} = ${m}(${prevVal}) + ${c}`
      });
    }

    let formula = "";
    if (m === 1) {
      formula = `aₙ = ${start} + ${c}n`;
      steps.push("Pattern identified as Arithmetic Progression.");
    } else {
      formula = `aₙ = ${start}(${m}ⁿ) + ${c}((${m}ⁿ - 1)/(${m} - 1))`;
      steps.push("Applying First-Order Non-Homogeneous formula.");
    }

    setResult({ sequence, formula, steps, n });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recurrence Solver</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES */}
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="information-circle" size={20} color="#0369A1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• Define a sequence using the rule: <Text style={{fontWeight:'bold'}}>aₙ = (m × aₙ₋₁) + c</Text></Text>
            <Text style={styles.guideText}>• Select a preset below to see common mathematical patterns in action.</Text>
          </View>

          {/* ✅ HORIZONTAL EXAMPLE SELECTOR */}
          <Text style={styles.sectionHeader}>Try an Example Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
            {examples.map((ex, idx) => (
              <TouchableOpacity key={idx} style={styles.exampleBtn} onPress={() => loadExample(ex)}>
                <Ionicons name={ex.icon} size={18} color="#b45309" />
                <Text style={styles.exampleBtnText}>{ex.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ✅ INPUT CARD */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>1. Set Parameters</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Base Case (a₀)</Text>
                <TextInput 
                    style={styles.input} 
                    keyboardType="numeric" 
                    value={a0} 
                    onChangeText={(t) => handleMathInput(t, setA0)}
                    placeholder="0"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Multiplier (m)</Text>
                <TextInput 
                    style={styles.input} 
                    keyboardType="numeric" 
                    value={multiplier} 
                    onChangeText={(t) => handleMathInput(t, setMultiplier)}
                    placeholder="1"
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Constant (c)</Text>
                <TextInput 
                    style={styles.input} 
                    keyboardType="numeric" 
                    value={constant} 
                    onChangeText={(t) => handleMathInput(t, setConstant)}
                    placeholder="0"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Target Term (n)</Text>
                <TextInput 
                    style={styles.input} 
                    keyboardType="number-pad" 
                    value={targetN} 
                    onChangeText={(t) => handleIntegerInput(t, setTargetN)}
                    placeholder="1"
                    maxLength={2}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={calculateRecurrence}>
              <Text style={styles.primaryBtnText}>GENERATE SEQUENCE & FORMULA</Text>
            </TouchableOpacity>
          </View>

          {/* ✅ RESULTS */}
          {result && (
            <View style={styles.resultContainer}>
              <View style={styles.formulaCard}>
                <Text style={styles.formulaLabel}>Closed-Form Formula:</Text>
                <Text style={styles.formulaText}>{result.formula}</Text>
              </View>

              <Text style={styles.sectionTitle}>Calculated Steps</Text>
              {result.sequence.map((item, idx) => (
                <View key={idx} style={styles.stepCard}>
                  <View style={styles.stepHeaderRow}>
                      <Text style={styles.stepN}>n = {item.n}</Text>
                      <Text style={styles.stepVal}>{item.val}</Text>
                  </View>
                  <Text style={styles.stepWork}>{item.work}</Text>
                </View>
              ))}
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28' },
  content: { padding: 15, paddingBottom: 40 },
  
  guideCard: { backgroundColor: '#E0F2FE', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#BAE6FD' },
  guideHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5 },
  guideTitle: { fontWeight: 'bold', color: '#0369A1' },
  guideText: { fontSize: 13, color: '#334155', lineHeight: 18, marginBottom: 4 },

  sectionHeader: { fontSize: 13, fontWeight: 'bold', color: '#64748B', marginBottom: 10, marginLeft: 5, textTransform: 'uppercase' },
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 25, marginRight: 10, borderWidth: 1, borderColor: '#fde68a', gap: 6 },
  exampleBtnText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },
  
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity:0.1 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#64748B', marginBottom: 15, textTransform: 'uppercase' },
  
  inputRow: { flexDirection: 'row', gap: 12, marginBottom: 15 },
  inputGroup: { flex: 1 },
  label: { fontSize: 11, fontWeight: 'bold', color: '#94A3B8', marginBottom: 5, textTransform: 'uppercase' },
  input: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 16, fontWeight: 'bold', color: '#1E293B', borderWidth: 1, borderColor: '#E2E8F0' },
  
  primaryBtn: { backgroundColor: '#104a28', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  
  formulaCard: { backgroundColor: '#104a28', padding: 20, borderRadius: 16, marginBottom: 20 },
  formulaLabel: { color: '#DCFCE7', fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase' },
  formulaText: { color: '#fff', fontSize: 17, fontWeight: 'bold', marginTop: 8, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  
  stepCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#3b82f6', elevation: 2 },
  stepHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepN: { fontSize: 11, fontWeight: 'bold', color: '#64748B' },
  stepVal: { fontSize: 18, fontWeight: 'bold', color: '#1E293B' },
  stepWork: { fontSize: 13, color: '#475569', marginTop: 4, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' }
});