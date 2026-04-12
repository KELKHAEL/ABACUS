import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { G, Circle, Line, Text as SvgText, Rect } from 'react-native-svg';

export default function BayesianProbabilityLab({ navigation }) {
  const [baseRate, setBaseRate] = useState('1'); // P(H) - 1%
  const [sensitivity, setSensitivity] = useState('99'); // P(E|H)
  const [specificity, setSpecificity] = useState('95'); // P(~E|~H)
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const handleInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9.]/g, '');
    setter(cleanText);
  };

  // Preset scenarios to help students understand
  const loadExample = (br, sen, spec) => {
    setBaseRate(br.toString());
    setSensitivity(sen.toString());
    setSpecificity(spec.toString());
    setResult(null);
  };

  const calculateBayes = () => {
    Keyboard.dismiss();
    const pH = parseFloat(baseRate) / 100;
    const pEH = parseFloat(sensitivity) / 100;
    const pNotENotH = parseFloat(specificity) / 100;

    if (isNaN(pH) || isNaN(pEH) || isNaN(pNotENotH)) {
      Alert.alert("Input Error", "Please enter valid percentages (0-100).");
      return;
    }

    const pNotH = 1 - pH;
    const pENotH = 1 - pNotENotH; // False Positive Rate
    const pE = (pEH * pH) + (pENotH * pNotH); // Total Evidence (Total Positives)
    const pHE = (pEH * pH) / pE; // The Answer

    const logSteps = [
      `1. Population Analysis: ${baseRate}% have the condition, ${(100 - baseRate).toFixed(1)}% do not.`,
      `2. Test Evidence: The test caught ${sensitivity}% of actual cases (True Positives).`,
      `3. Noise: The test wrongly flagged ${(100 - specificity).toFixed(1)}% of healthy people (False Positives).`,
      `4. Comparison: There are ${(pEH * pH * 10000).toFixed(0)} True Positives vs. ${(pENotH * pNotH * 10000).toFixed(0)} False Positives out of 10,000 people.`
    ];

    setResult({
      probability: (pHE * 100).toFixed(2),
      logSteps,
      pH, pEH, pE,
      verdict: pHE > 0.8 ? "High Confidence" : "Low Confidence - Base Rate Bias likely."
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Bayesian Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="flask" size={20} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• This lab calculates the probability of an event happening based on prior knowledge of conditions.</Text>
            <Text style={styles.guideText}>• Input percentages for the Base Rate (rarity) and Test Accuracy.</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="school" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>What is Bayes' Theorem?</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>It is used to update our belief in a hypothesis (H) after seeing new evidence (E). The most famous trap is "Base Rate Neglect," where people forget to account for how rare a condition is.</Text>
              <View style={styles.formulaBox}><Text style={styles.formulaText}>P(H|E) = [ P(E|H) × P(H) ] / P(E)</Text></View>
            </View>
          )}

          <Text style={styles.sectionHeader}>Try a Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
            <TouchableOpacity style={styles.exBtn} onPress={() => loadExample(1, 99, 95)}><Text style={styles.exText}>Rare Disease (1%)</Text></TouchableOpacity>
            <TouchableOpacity style={styles.exBtn} onPress={() => loadExample(20, 90, 90)}><Text style={styles.exText}>Common Flu (20%)</Text></TouchableOpacity>
            <TouchableOpacity style={styles.exBtn} onPress={() => loadExample(0.1, 99.9, 99.9)}><Text style={styles.exText}>High Security Alert</Text></TouchableOpacity>
          </ScrollView>

          <View style={styles.card}>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Prior Probability / Base Rate (%)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={baseRate} onChangeText={(t) => handleInput(t, setBaseRate)} />
            </View>
            <View style={styles.inputRow}>
                <View style={[styles.inputGroup, {flex:1}]}>
                    <Text style={styles.label}>Sensitivity (%)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={sensitivity} onChangeText={(t) => handleInput(t, setSensitivity)} />
                </View>
                <View style={[styles.inputGroup, {flex:1, marginLeft: 10}]}>
                    <Text style={styles.label}>Specificity (%)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={specificity} onChangeText={(t) => handleInput(t, setSpecificity)} />
                </View>
            </View>
            <TouchableOpacity style={styles.primaryBtn} onPress={calculateBayes}>
              <Text style={styles.primaryBtnText}>CALCULATE POSTERIOR</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <View style={styles.ansBox}>
                <Text style={styles.ansLabel}>CHANCE YOU ACTUALLY HAVE IT:</Text>
                <Text style={[styles.ansVal, {color: result.probability > 70 ? '#ef4444' : '#10b981'}]}>{result.probability}%</Text>
                <Text style={styles.verdictText}>{result.verdict}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Step-by-Step Logic:</Text>
              {result.logSteps.map((step, idx) => (
                <Text key={idx} style={styles.logText}>• {step}</Text>
              ))}

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Probability Tree Visualization</Text>
              <View style={styles.svgArea}>
                  <Svg height="180" width="300">
                      <Line x1="150" y1="20" x2="80" y2="80" stroke="#94a3b8" strokeWidth="2" />
                      <Line x1="150" y1="20" x2="220" y2="80" stroke="#94a3b8" strokeWidth="2" />
                      
                      <Circle cx="150" cy="20" r="15" fill="#104a28" />
                      <SvgText x="150" y="24" fontSize="10" fill="white" textAnchor="middle">All</SvgText>

                      <Rect x="50" y="80" width="60" height="30" rx="5" fill="#dcfce7" />
                      <SvgText x="80" y="100" fontSize="10" fill="#166534" textAnchor="middle">Have It</SvgText>

                      <Rect x="190" y="80" width="60" height="30" rx="5" fill="#fee2e2" />
                      <SvgText x="220" y="100" fontSize="10" fill="#991b1b" textAnchor="middle">Healthy</SvgText>

                      <Line x1="80" y1="110" x2="80" y2="150" stroke="#10b981" strokeDasharray="4" />
                      <SvgText x="80" y="170" fontSize="9" fill="#16a34a" textAnchor="middle">Test (+)</SvgText>
                      
                      <Line x1="220" y1="110" x2="220" y2="150" stroke="#ef4444" strokeDasharray="4" />
                      <SvgText x="220" y="170" fontSize="9" fill="#dc2626" textAnchor="middle">False (+)</SvgText>
                  </Svg>
              </View>
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
  backgroundColor: '#F8F9FD',
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginLeft: 15 },
  content: { padding: 15, paddingBottom: 50 },
  guideCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guideHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 },
  guideTitle: { fontWeight: 'bold', color: '#0369a1' },
  guideText: { fontSize: 13, color: '#334155', marginBottom: 4 },
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  formulaBox: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  formulaText: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', color: '#1e293b' },
  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10, textTransform: 'uppercase' },
  exampleScroll: { marginBottom: 20 },
  exBtn: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#cbd5e1' },
  exText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3 },
  inputRow: { flexDirection: 'row', marginTop: 10 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 8 },
  input: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, fontSize: 16, fontWeight: 'bold', color: '#111' },
  primaryBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 20, elevation: 4 },
  ansBox: { alignItems: 'center', padding: 10 },
  ansLabel: { fontSize: 11, fontWeight: 'bold', color: '#64748B' },
  ansVal: { fontSize: 42, fontWeight: '900', marginVertical: 5 },
  verdictText: { fontSize: 13, fontWeight: 'bold', fontStyle: 'italic' },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 10 },
  logText: { fontSize: 13, color: '#475569', marginBottom: 6, lineHeight: 18 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  svgArea: { alignItems: 'center', backgroundColor: '#f8fafc', padding: 10, borderRadius: 12 }
});