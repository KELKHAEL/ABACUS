import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PathFinderLab({ navigation }) {
  const [size, setSize] = useState(4);
  const [matrix, setMatrix] = useState([]);
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ 12 CURATED SAMPLES: 6 focus on Euler, 6 focus on Hamiltonian success
  const examples = [
    { id: 'H_SNAKE', name: 'Hamiltonian Snake', size: 4, data: [[0,1,0,0], [1,0,1,0], [0,1,0,1], [0,0,1,0]], desc: 'A simple line visiting 1-2-3-4.' },
    { id: 'H_CYCLE', name: '5-Node Cycle', size: 5, data: [[0,1,0,0,1], [1,0,1,0,0], [0,1,0,1,0], [0,0,1,0,1], [1,0,0,1,0]], desc: 'A perfect loop hitting every node.' },
    { id: 'E_BRIDGE', name: 'Eulerian Bridge', size: 4, data: [[0,1,1,0], [1,0,1,1], [1,1,0,1], [0,1,1,0]], desc: 'Visits every edge exactly once.' },
    { id: 'K4_COMPLETE', name: 'Complete K4', size: 4, data: [[0,1,1,1], [1,0,1,1], [1,1,0,1], [1,1,1,0]], desc: 'High connectivity.' },
    { id: 'STAR', name: 'The Star (No Ham)', size: 5, data: [[0,1,1,1,1], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0], [1,0,0,0,0]], desc: 'Center hub connects to all.' },
    { id: 'H_PATH_5', name: '5-Node ZigZag', size: 5, data: [[0,1,0,0,0], [1,0,1,1,0], [0,1,0,0,1], [0,1,0,0,1], [0,0,1,1,0]], desc: 'Complex path finding.' },
    { id: 'TRIANGLE', name: 'Triangle', size: 3, data: [[0,1,1], [1,0,1], [1,1,0]] },
    { id: 'SQUARE', name: 'Square Loop', size: 4, data: [[0,1,0,1], [1,0,1,0], [0,1,0,1], [1,0,1,0]] },
    { id: 'PENTAGON', name: 'Pentagon', size: 5, data: [[0,1,0,0,1], [1,0,1,0,0], [0,1,0,1,0], [0,0,1,0,1], [1,0,0,1,0]] },
    { id: 'H_LADDER', name: 'Ladder Section', size: 4, data: [[0,1,1,0], [1,0,0,1], [1,0,0,1], [0,1,1,0]] },
    { id: 'WHEEL', name: 'Wheel Rim', size: 5, data: [[0,1,0,0,1], [1,0,1,1,0], [0,1,0,1,0], [0,1,1,0,1], [1,0,0,1,0]] },
    { id: 'ENVELOPE', name: 'The Envelope', size: 5, data: [[0,1,1,0,0], [1,0,1,1,0], [1,1,0,1,1], [0,1,1,0,1], [0,0,1,1,0]] }
  ];

  useEffect(() => {
    const newMatrix = Array(size).fill(0).map(() => Array(size).fill(0));
    setMatrix(newMatrix);
    setResult(null);
  }, [size]);

  const loadExample = (ex) => {
    setSize(ex.size);
    setTimeout(() => { setMatrix(ex.data); setResult(null); }, 50);
  };

  const toggleCell = (r, c) => {
    const newMatrix = matrix.map((row, ri) => 
      row.map((val, ci) => (
        (ri === r && ci === c) || (ri === c && ci === r) ? (val === 0 ? 1 : 0) : val
      ))
    );
    setMatrix(newMatrix);
  };

  const analyzePaths = () => {
    Keyboard.dismiss();
    const degrees = matrix.map(row => row.reduce((a, b) => a + b, 0));
    const oddNodes = degrees.filter(d => d % 2 !== 0).length;
    let steps = [];

    // Eulerian Logic
    let eulerResult = "No Eulerian Path";
    if (oddNodes === 0) eulerResult = "Eulerian Circuit Found (All nodes even)";
    else if (oddNodes === 2) eulerResult = "Eulerian Path Found (2 odd nodes)";
    
    steps.push(`Degree Count: [${degrees.join(', ')}]`);
    steps.push(`Condition: Found ${oddNodes} odd-degree vertices.`);

    // Hamiltonian Backtracking Logic
    let hamPath = [];
    const solveHam = (curr, visited) => {
      if (visited.length === size) { hamPath = [...visited]; return true; }
      for (let next = 0; next < size; next++) {
        if (matrix[curr][next] === 1 && !visited.includes(next)) {
          if (solveHam(next, [...visited, next])) return true;
        }
      }
      return false;
    };

    let foundHam = false;
    for (let start = 0; start < size; start++) {
      if (solveHam(start, [start])) { foundHam = true; break; }
    }

    setResult({
      eulerResult,
      hamResult: foundHam ? `Hamiltonian Path: ${hamPath.map(n => n + 1).join(' → ')}` : "No Hamiltonian Path Found",
      steps
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Path Finder Lab</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          <View style={styles.guideCard}>
            <View style={styles.guideHeader}>
                <Ionicons name="map" size={22} color="#0369a1" />
                <Text style={styles.guideTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>1. Set Matrix:</Text> Tap cells to connect nodes. In this lab, connections are undirected (two-way).</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>2. Eulerian Check:</Text> The computer checks if all edges can be visited once by counting odd degrees.</Text>
            <Text style={styles.guideText}>• <Text style={{fontWeight:'bold'}}>3. Hamiltonian Check:</Text> The computer attempts to find a sequence that visits every vertex exactly once.</Text>
          </View>

          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="school" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Eulerian vs. Hamiltonian Theory</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold', color:'#16a34a'}}>Eulerian Path:</Text> Focuses on the <Text style={{fontWeight:'bold'}}>edges</Text>. A graph has one if it has 0 or 2 odd-degree vertices.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold', color:'#3b82f6'}}>Hamiltonian Path:</Text> Focuses on the <Text style={{fontWeight:'bold'}}>vertices</Text>. It must visit every node without repeating. Unlike Euler, there is no simple formula; it requires searching.</Text>
            </View>
          )}

          <Text style={styles.sectionHeader}>Select Preset (12 Working Samples)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
            {examples.map((ex) => (
              <TouchableOpacity key={ex.id} style={styles.exBtn} onPress={() => loadExample(ex)}>
                <Text style={styles.exBtnText}>{ex.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.card}>
            <Text style={styles.label}>Matrix Dimensions</Text>
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
                    <TouchableOpacity 
                        key={ci} 
                        style={[styles.cell, val === 1 && styles.cellActive, ri === ci && {backgroundColor:'#f1f5f9'}]} 
                        onPress={() => ri !== ci && toggleCell(ri, ci)}
                    >
                      <Text style={[styles.cellText, val === 1 && {color: '#16a34a', fontWeight:'bold'}]}>{ri === ci ? 'X' : val}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.primaryBtn} onPress={analyzePaths}>
              <Text style={styles.primaryBtnText}>ANALYZE TRAVERSABILITY</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.resultCard}>
              <View style={styles.resItem}>
                  <Text style={styles.resTitle}>Eulerian Status:</Text>
                  <Text style={styles.resVal}>{result.eulerResult}</Text>
              </View>
              <View style={styles.resItem}>
                  <Text style={styles.resTitle}>Hamiltonian Status:</Text>
                  <Text style={[styles.resVal, {color: '#3b82f6'}]}>{result.hamResult}</Text>
              </View>

              <View style={styles.divider} />
              <Text style={styles.stepTitle}>Discovery Steps:</Text>
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
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginLeft: 15 },
  content: { padding: 15, paddingBottom: 50 },
  guideCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guideHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 },
  guideTitle: { fontWeight: 'bold', color: '#0369a1' },
  guideText: { fontSize: 13, color: '#334155', lineHeight: 18, marginBottom: 4 },
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 15, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryText: { fontSize: 13, color: '#4b5563', lineHeight: 20 },
  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10, textTransform: 'uppercase' },
  exampleScroll: { marginBottom: 20 },
  exBtn: { backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#cbd5e1' },
  exBtnText: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, elevation: 3 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 10, textTransform: 'uppercase' },
  sizeRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  sizeBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  sizeBtnActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  sizeBtnText: { fontWeight: 'bold', color: '#64748B' },
  matrixContainer: { alignSelf: 'center', marginVertical: 15 },
  row: { flexDirection: 'row' },
  cell: { width: 42, height: 42, borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center' },
  cellActive: { backgroundColor: '#dcfce7', borderColor: '#16a34a' },
  cellText: { fontSize: 15, color: '#94a3b8' },
  primaryBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginTop: 20, elevation: 4 },
  resItem: { marginBottom: 10 },
  resTitle: { fontSize: 12, color: '#64748B', fontWeight: 'bold' },
  resVal: { fontSize: 14, fontWeight: 'bold', color: '#16a34a' },
  stepTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 8, marginTop: 10 },
  logText: { fontSize: 12, color: '#475569', marginBottom: 4 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 }
});