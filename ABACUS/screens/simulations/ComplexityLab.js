import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Line, Circle, Text as SvgText } from 'react-native-svg';

export default function ComplexityLab({ navigation }) {
  const [nValue, setNValue] = useState('');
  const [selectedAlgo, setSelectedAlgo] = useState('LINEAR');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ FULL EXAMPLES LIBRARY RESTORED & FORMULA FIXED
  const examples = [
    { id: 'CONSTANT', name: 'Array Access', bigO: 'O(1)', color: '#6366f1', desc: 'Finding an item if you already know the exact position.', formula: (n) => 1 },
    { id: 'LOG', name: 'Binary Search', bigO: 'O(log n)', color: '#10b981', desc: 'Searching a sorted list by cutting it in half repeatedly.', formula: (n) => Math.max(0.1, Math.log2(n || 1)) },
    { id: 'LINEAR', name: 'Linear Search', bigO: 'O(n)', color: '#3b82f6', desc: 'Checking every single item in a list one by one.', formula: (n) => n },
    { id: 'LOGLINEAR', name: 'Merge Sort', bigO: 'O(n log n)', color: '#8b5cf6', desc: 'The gold standard for efficient sorting algorithms.', formula: (n) => n * Math.max(0.1, Math.log2(n || 1)) },
    { id: 'QUADRATIC', name: 'Bubble Sort', bigO: 'O(n²)', color: '#f59e0b', desc: 'Comparing every item against every other item (Nested Loops).', formula: (n) => n * n },
    { id: 'EXPONENTIAL', name: 'Recursive Fib', bigO: 'O(2ⁿ)', color: '#ef4444', desc: 'Every new item doubles the total work needed.', formula: (n) => Math.pow(2, n) },
  ];

  const handleInput = (text) => {
    // Strictly allow only digits
    const cleanText = text.replace(/[^0-9]/g, '');
    setNValue(cleanText);
  };

  const loadExample = (algoId) => {
    setSelectedAlgo(algoId);
    setNValue('10');
    setResult(null);
  };

  // ✅ UNIVERSAL SAFE FORMATTER (The "I" Character Crash Fix)
  const formatOpsValue = (val) => {
    if (val === null || val === undefined || isNaN(val)) return "0";
    if (!isFinite(val)) return "Infinity (Too massive)";
    
    // If value is larger than 1 Million, use scientific notation to avoid formatting errors
    if (val >= 1000000) {
      return val.toExponential(2).replace('e+', ' × 10^');
    }
    
    // Standard safe locale string for smaller numbers
    return Math.floor(val).toLocaleString();
  };

  // ✅ CRASH-PROOF DYNAMIC SCALING ENGINE
  const getGraphData = () => {
    const algo = examples.find(a => a.id === selectedAlgo);
    const nInput = result ? result.n : 30;
    const nLimit = Math.max(nInput, 30); 
    const maxYValue = algo.formula(nLimit);
    
    let points = "";
    const xScale = 230 / nLimit;
    // Calculate yScale safely; if maxY is Infinity, we use a tiny multiplier to keep the line visible
    const yScale = (isFinite(maxYValue) && maxYValue !== 0) ? 130 / maxYValue : 0.0000000001; 

    for (let i = 0; i <= nLimit; i++) {
      const val = algo.formula(i);
      const x = 35 + (i * xScale);
      const y = isFinite(val) ? 140 - (val * yScale) : 10;
      const clampedY = Math.max(10, y);
      points += `${i === 0 ? 'M' : 'L'} ${x} ${clampedY} `;
    }
    return { path: points, yScale, xScale };
  };

  const runAnalysis = () => {
    Keyboard.dismiss();
    const n = parseInt(nValue, 10);

    if (isNaN(n) || n < 1) {
      Alert.alert("Input Required", "Please enter a data size (n) to start simulation.");
      return;
    }

    let logSteps = [];
    let realWorld = "";
    const algo = examples.find(a => a.id === selectedAlgo);
    const ops = algo.formula(n);

    // ✅ RE-IMPLEMENTED STEP-BY-STEP LOGIC
    switch(selectedAlgo) {
      case 'CONSTANT':
        logSteps = ["Access direct memory address.", "Step count: Constant (1)."];
        realWorld = "Fastest possible. Accessing a website via a direct link.";
        break;
      case 'LOG':
        logSteps = [`Divide dataset of ${n} into halves.`, `Binary search path: ~${Math.ceil(ops)} levels.`];
        realWorld = "High efficiency. Searching a phonebook with 1 million names in 20 steps.";
        break;
      case 'LINEAR':
        logSteps = [`Initialize counter at 0.`, `Check every item from 1 to ${n}.` ];
        realWorld = "Predictable. Searching through a playlist for a specific song.";
        break;
      case 'LOGLINEAR':
        logSteps = ["Divide list into sub-parts.", "Merge parts back in sorted order."];
        realWorld = "Modern Standard. This is how your phone sorts your contact list.";
        break;
      case 'QUADRATIC':
        logSteps = [`Outer Loop: ${n} turns.`, `Inner Loop: ${n} checks per turn.`, `Result: ${n}² iterations.`];
        realWorld = "Inefficient. Comparing every student in a class to every other student.";
        break;
      case 'EXPONENTIAL':
        logSteps = ["Algorithm branches into two at every step.", `Recursive growth: 2^${n}.` ];
        realWorld = "Computational Collapse. This is why cracking a 20-character password is nearly impossible.";
        break;
    }

    setResult({ 
      n, 
      ops: formatOpsValue(ops), 
      logSteps, 
      realWorld, 
      color: algo.color, 
      rawOps: ops 
    });
  };

  const currentGraph = getGraphData();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Complexity Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* ✅ RESTORED GUIDELINES */}
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="information-circle" size={20} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• Select an algorithm pattern from the scrollable list below.</Text>
            <Text style={styles.guideText}>• Input a data size <Text style={{fontWeight:'bold'}}>(N)</Text> to see the computational cost.</Text>
            <Text style={styles.guideText}>• The graph and result will update dynamically based on your input.</Text>
          </View>

          {/* ✅ RESTORED THEORY */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="school" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Understanding Big-O</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>Big-O notation tells us how the "work" of an algorithm grows as we add more data. It helps engineers choose the most efficient code.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}>• <Text style={{fontWeight:'bold', color:'#10b981'}}>Scalable:</Text> O(1) and O(log n) are best for big data.</Text>
              <Text style={styles.theoryText}>• <Text style={{fontWeight:'bold', color:'#ef4444'}}>Poor:</Text> O(n²) and O(2ⁿ) will crash systems as data grows.</Text>
            </View>
          )}

          <Text style={styles.sectionHeader}>Select Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
            {examples.map((algo) => (
              <TouchableOpacity 
                key={algo.id} 
                style={[styles.algoCard, selectedAlgo === algo.id && {backgroundColor: algo.color, borderColor: algo.color}]}
                onPress={() => loadExample(algo.id)}
              >
                <Text style={[styles.algoName, selectedAlgo === algo.id && {color: '#fff'}]}>{algo.name}</Text>
                <Text style={[styles.algoO, selectedAlgo === algo.id && {color: '#fff', opacity: 0.8}]}>{algo.bigO}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.card}>
            <Text style={styles.label}>Input Data Size (N):</Text>
            <TextInput 
                style={styles.input}
                keyboardType="number-pad"
                value={nValue}
                onChangeText={handleInput}
                placeholder="e.g. 50"
                maxLength={3}
            />
            <Text style={styles.algoDesc}>{examples.find(a => a.id === selectedAlgo).desc}</Text>
            <TouchableOpacity style={styles.primaryBtn} onPress={runAnalysis}>
              <Text style={styles.primaryBtnText}>RUN ANALYSIS</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <View style={styles.chartArea}>
                  <Svg height="160" width="280">
                      <Line x1="35" y1="10" x2="35" y2="140" stroke="#94a3b8" strokeWidth="2" />
                      <Line x1="35" y1="140" x2="270" y2="140" stroke="#94a3b8" strokeWidth="2" />
                      <SvgText x="250" y="155" fontSize="10" fill="#94a3b8">N</SvgText>
                      <SvgText x="5" y="20" fontSize="10" fill="#94a3b8" rotation="-90" origin="5, 20">WORK</SvgText>
                      
                      <Path d={currentGraph.path} fill="none" stroke={result.color} strokeWidth="3" />
                      
                      <Circle 
                        cx={35 + (Math.min(result.n, 300) * currentGraph.xScale)} 
                        cy={isFinite(result.rawOps) ? 140 - (result.rawOps * currentGraph.yScale) : 10} 
                        r="6" fill={result.color} stroke="white" strokeWidth="2"
                      />
                  </Svg>
                  <Text style={styles.chartNote}>Y-Axis rescaled for {result.ops} operations.</Text>
              </View>

              <View style={styles.statRow}>
                  <View style={styles.statBox}><Text style={styles.statLabel}>DATA SIZE</Text><Text style={styles.statValue}>{result.n}</Text></View>
                  <View style={styles.statBox}><Text style={styles.statLabel}>WORKLOAD</Text><Text style={[styles.statValue, {color: result.color}]}>{result.ops}</Text></View>
              </View>

              <View style={styles.realWorldBox}>
                  <Ionicons name="earth" size={18} color="#0369a1" />
                  <Text style={styles.realWorldText}>{result.realWorld}</Text>
              </View>

              <View style={styles.divider} />
              {/* ✅ RESTORED LOG EXPLANATIONS */}
              <Text style={styles.stepTitle}>Execution Logic Steps:</Text>
              {result.logSteps.map((step, idx) => (
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
  container: { flex: 1, backgroundColor: '#F8F9FD' },
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
  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10, textTransform: 'uppercase' },
  exampleScroll: { marginBottom: 20 },
  algoCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginRight: 10, borderWidth: 1, borderColor: '#E2E8F0', width: 130 },
  algoName: { fontSize: 13, fontWeight: 'bold', color: '#1E293B' },
  algoO: { fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 8 },
  input: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#111' },
  algoDesc: { fontSize: 12, color: '#64748B', fontStyle: 'italic', marginVertical: 12, textAlign: 'center' },
  primaryBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 20, elevation: 4 },
  chartArea: { alignItems: 'center', backgroundColor: '#F8FAF9', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#eee' },
  chartNote: { fontSize: 10, color: '#94a3b8', marginTop: 10 },
  statRow: { flexDirection: 'row', marginVertical: 15 },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { fontSize: 10, color: '#94a3b8', fontWeight: 'bold' },
  statValue: { fontSize: 24, fontWeight: '900', color: '#1e293b' },
  realWorldBox: { backgroundColor: '#f0f9ff', padding: 12, borderRadius: 10, flexDirection: 'row', gap: 8, alignItems: 'center' },
  realWorldText: { flex: 1, fontSize: 12, color: '#0369a1' },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 8 },
  logText: { fontSize: 13, color: '#475569', marginBottom: 4, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 }
});