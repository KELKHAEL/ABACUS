import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MatrixRelationsLab({ navigation }) {
  const [size, setSize] = useState(3);
  const [matrix, setMatrix] = useState([]);
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ 12 COMPREHENSIVE EXAMPLES (3x3, 4x4, 5x5)
  const examples = [
    // 3x3 SCENARIOS
    { id: 'C3', name: '3x3 Chain', size: 3, data: [[0, 1, 0], [0, 0, 1], [0, 0, 0]] },
    { id: 'L3', name: '3x3 Loop', size: 3, data: [[0, 1, 0], [0, 0, 1], [1, 0, 0]] },
    { id: 'S3', name: '3x3 Symm', size: 3, data: [[0, 1, 0], [1, 0, 0], [0, 0, 0]] },
    
    // 4x4 SCENARIOS
    { id: 'C4', name: '4x4 Chain', size: 4, data: [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0]] },
    { id: 'T4', name: '4x4 Tree', size: 4, data: [[0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 1], [0, 0, 0, 0]] },
    { id: 'H4', name: '4x4 Hub', size: 4, data: [[0, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]] },
    { id: 'D4', name: '4x4 Dual', size: 4, data: [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]] },

    // 5x5 SCENARIOS
    { id: 'C5', name: '5x5 Extended Chain', size: 5, data: [[0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 0]] },
    { id: 'L5', name: '5x5 Grand Cycle', size: 5, data: [[0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 0]] },
    { id: 'S5', name: '5x5 Star Network', size: 5, data: [[0, 1, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]] },
    { id: 'M5', name: '5x5 Complex Mesh', size: 5, data: [[0, 1, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1], [1, 0, 0, 0, 0], [0, 1, 0, 0, 0]] },
    { id: 'B5', name: '5x5 Bridge Test', size: 5, data: [[0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 0, 1], [0, 0, 0, 0, 0]] },
  ];

  useEffect(() => {
    const newMatrix = Array(size).fill(0).map(() => Array(size).fill(0));
    setMatrix(newMatrix);
    setResult(null);
  }, [size]);

  const loadExample = (ex) => {
    setSize(ex.size);
    // Timeout ensures grid re-renders with correct size before data injection
    setTimeout(() => {
        setMatrix(ex.data);
        setResult(null);
    }, 50);
  };

  const toggleCell = (r, c) => {
    const newMatrix = matrix.map((row, ri) => 
      row.map((val, ci) => (ri === r && ci === c ? (val === 0 ? 1 : 0) : val))
    );
    setMatrix(newMatrix);
  };

  const runWarshall = () => {
    Keyboard.dismiss();
    let closure = matrix.map(row => [...row]);
    let steps = [];
    const n = size;

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (closure[i][j] === 0 && (closure[i][k] === 1 && closure[k][j] === 1)) {
            closure[i][j] = 1;
            steps.push(`Bridge Discovered: Node ${i+1} → Node ${j+1} (via Node ${k+1})`);
          }
        }
      }
    }

    if (steps.length === 0) steps.push("The current relation is already transitive.");

    setResult({ closure, steps, totalLinks: closure.flat().filter(v => v === 1).length });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Matrix & Relations Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="information-circle" size={22} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>1. Define the Set Size:</Text> Choose a matrix dimension (3x3 up to 5x5).</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>2. Set Relations:</Text> Tap a cell to set it to <Text style={{color:'#16a34a', fontWeight:'bold'}}>1</Text> (Related) or <Text style={{color:'#94a3b8', fontWeight:'bold'}}>0</Text> (Not Related).</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>3. Observe the Matrix:</Text> Row <Text style={{fontStyle:'italic'}}>i</Text> and Column <Text style={{fontStyle:'italic'}}>j</Text> represents the directed pair (i, j).</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>4. Generate Closure:</Text> Click the button to run Warshall's Algorithm and find all indirect connections.</Text>
          </View>

          {/* THEORY EXPLANATION */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="school" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>How does Warshall's Algorithm work?</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>Finding the <Text style={{fontWeight:'bold'}}>Transitive Closure</Text> means determining if Node A can reach Node C, even if there is no direct link, but there is a path through Node B.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}>The algorithm checks every node <Text style={{fontWeight:'bold'}}>K</Text> to see if it acts as a "bridge" between two other nodes.</Text>
            </View>
          )}

          <Text style={styles.sectionHeader}>Try a Preset Scenario (12 Samples)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
            {examples.map((ex) => (
              <TouchableOpacity key={ex.id} style={styles.exBtn} onPress={() => loadExample(ex)}>
                <Text style={styles.exBtnText}>{ex.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.card}>
            <Text style={styles.label}>Set Matrix Dimension</Text>
            <View style={styles.sizeRow}>
              {[3, 4, 5].map(s => (
                <TouchableOpacity key={s} style={[styles.sizeBtn, size === s && styles.sizeBtnActive]} onPress={() => setSize(s)}>
                  <Text style={[styles.sizeBtnText, size === s && {color: '#fff'}]}>{s}x{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.matrixContainer}>
              {matrix.map((row, ri) => (
                <View key={ri} style={styles.row}>
                  {row.map((val, ci) => (
                    <TouchableOpacity key={ci} style={[styles.cell, val === 1 && styles.cellActive]} onPress={() => toggleCell(ri, ci)}>
                      <Text style={[styles.cellText, val === 1 && {color: '#16a34a', fontWeight:'bold'}]}>{val}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={runWarshall}>
              <Text style={styles.primaryBtnText}>GENERATE TRANSITIVE CLOSURE</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Reachability Matrix Output</Text>
              <View style={styles.matrixContainer}>
                {result.closure.map((row, ri) => (
                  <View key={ri} style={styles.row}>
                    {row.map((val, ci) => (
                      <View key={ci} style={[styles.cell, val === 1 && {backgroundColor: '#f0fdf4'}]}>
                        <Text style={[styles.cellText, val === 1 && {color: '#16a34a', fontWeight: '900'}]}>{val}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.divider} />
              <Text style={styles.stepTitle}>Path Discovery Log:</Text>
              {result.steps.map((step, idx) => (
                <Text key={idx} style={styles.logText}>• {step}</Text>
              ))}

              <View style={styles.statBox}>
                 <Text style={styles.statLabel}>TOTAL PAIRS IN RELATION</Text>
                 <Text style={styles.statVal}>{result.totalLinks}</Text>
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
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exBtn: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#cbd5e1' },
  exBtnText: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 15, textTransform: 'uppercase' },
  sizeRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  sizeBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  sizeBtnActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  sizeBtnText: { fontWeight: 'bold', color: '#64748B' },
  matrixContainer: { alignSelf: 'center', marginVertical: 15 },
  row: { flexDirection: 'row' },
  cell: { width: 42, height: 42, borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  cellActive: { backgroundColor: '#dcfce7', borderColor: '#16a34a' },
  cellText: { fontSize: 15, color: '#94a3b8' },
  primaryBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 20, elevation: 4 },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginBottom: 15 },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 10 },
  logText: { fontSize: 12, color: '#475569', marginBottom: 5, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  statBox: { backgroundColor: '#f1f5f9', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  statLabel: { fontSize: 10, fontWeight: 'bold', color: '#64748B' },
  statVal: { fontSize: 24, fontWeight: '900', color: '#104a28', marginTop: 5 }
});