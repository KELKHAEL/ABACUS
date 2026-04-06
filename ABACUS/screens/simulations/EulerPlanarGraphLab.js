import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Circle, Text as SvgText, G, Polygon } from 'react-native-svg';

export default function EulerPlanarGraphLab({ navigation }) {
  const [vertices, setVertices] = useState('');
  const [edges, setEdges] = useState('');
  const [results, setResults] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const loadExample = (v, e) => {
      setVertices(v.toString());
      setEdges(e.toString());
      setResults(null);
  };

  const calculateEuler = () => {
    const v = parseInt(vertices);
    const e = parseInt(edges);

    if (isNaN(v) || isNaN(e) || v < 1 || e < 0) {
      return Alert.alert("Invalid Input", "Please enter valid positive numbers for Vertices and Edges.");
    }

    // Euler's Formula: V - E + F = 2  =>  F = 2 - V + E
    const faces = 2 - v + e;

    // Euler's Inequality for connected planar graphs (if V >= 3, then E <= 3V - 6)
    let isPlanarPossible = true;
    let maxEdges = 0;
    if (v >= 3) {
        maxEdges = (3 * v) - 6;
        if (e > maxEdges) isPlanarPossible = false;
    }

    setResults({ v, e, faces, isPlanarPossible, maxEdges });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Euler's Graph Formula</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="scan-circle" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>What is a Planar Graph?</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>

          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                  A <Text style={{fontWeight: 'bold', color: '#104a28'}}>Planar Graph</Text> is a graph that can be drawn on a flat piece of paper without any of its edges (lines) crossing over each other.
              </Text>
              <View style={styles.divider} />
              
              {/* SVG Reference Graph */}
              <View style={styles.svgWrapper}>
                  <Svg height="120" width="160" viewBox="0 0 160 120">
                      <Polygon points="30,90 130,90 80,20" fill="#dcfce7" stroke="#cbd5e1" strokeWidth="2" />
                      <Line x1="80" y1="20" x2="80" y2="65" stroke="#cbd5e1" strokeWidth="2" />
                      <Line x1="30" y1="90" x2="80" y2="65" stroke="#cbd5e1" strokeWidth="2" />
                      <Line x1="130" y1="90" x2="80" y2="65" stroke="#cbd5e1" strokeWidth="2" />
                      
                      <Circle cx="80" cy="20" r="6" fill="#104a28" />
                      <Circle cx="30" cy="90" r="6" fill="#104a28" />
                      <Circle cx="130" cy="90" r="6" fill="#104a28" />
                      <Circle cx="80" cy="65" r="6" fill="#104a28" />

                      <SvgText x="50" y="60" fill="#0f172a" fontSize="12" fontWeight="bold">Face</SvgText>
                      <SvgText x="90" y="60" fill="#0f172a" fontSize="12" fontWeight="bold">Face</SvgText>
                      <SvgText x="80" y="85" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">Face</SvgText>
                  </Svg>
              </View>
              <Text style={styles.noteText}>V=4, E=6, F=4 (3 internal faces + 1 infinite outside face)</Text>
              
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>V (Vertices):</Text> The dots or intersections.</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>E (Edges):</Text> The lines connecting the dots.</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>F (Faces/Regions):</Text> The enclosed areas, PLUS the infinite space outside the graph!</Text>
            </View>
          )}

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate Regions (Faces)</Text>
            
            <View style={styles.exampleBox}>
                <Text style={styles.exampleTitle}>Try Famous Polyhedra:</Text>
                <TouchableOpacity onPress={() => loadExample(4, 6)}>
                    <Text style={styles.exampleText}>• Tetrahedron (V=4, E=6)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadExample(8, 12)}>
                    <Text style={styles.exampleText}>• Cube / Hexahedron (V=8, E=12)</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => loadExample(5, 10)}>
                    <Text style={styles.exampleText}>• K5 Graph <Text style={{color: '#ef4444'}}>(Non-Planar!)</Text></Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vertices (V)</Text>
                <TextInput style={styles.input} value={vertices} onChangeText={setVertices} keyboardType="numeric" placeholder="e.g. 5" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Edges (E)</Text>
                <TextInput style={styles.input} value={edges} onChangeText={setEdges} keyboardType="numeric" placeholder="e.g. 7" />
              </View>
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateEuler}>
              <Text style={styles.calcBtnText}>Solve Formula</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT CARD */}
          {results && (
            <View style={styles.card}>
              
              {!results.isPlanarPossible ? (
                 <View style={styles.errorBox}>
                    <Text style={styles.errorText}>Graph is NON-PLANAR!</Text>
                    <Text style={styles.errorSub}>According to Euler's Inequality, a planar graph with {results.v} vertices can have a maximum of <Text style={{fontWeight:'bold'}}>{results.maxEdges} edges</Text> (Formula: E ≤ 3V - 6). </Text>
                    <Text style={[styles.errorSub, {marginTop: 5}]}>You entered {results.e} edges. This graph MUST have intersecting lines and cannot be drawn flat.</Text>
                 </View>
              ) : (
                <>
                  <Text style={styles.cardTitle}>Formula Breakdown</Text>
                  <View style={styles.resultBanner}>
                    <Text style={styles.resultLabel}>Number of Regions (F) =</Text>
                    <Text style={styles.resultValue}>{results.faces}</Text>
                  </View>

                  <View style={styles.stepsBox}>
                    <Text style={styles.formulaText}>Euler's Equation: V - E + F = 2</Text>
                    <View style={styles.divider} />
                    <Text style={styles.stepText}>{results.v} - {results.e} + F = 2</Text>
                    <Text style={styles.stepText}>F = 2 - {results.v} + {results.e}</Text>
                    <Text style={[styles.stepText, {color: '#10b981', fontWeight: 'bold'}]}>F = {results.faces}</Text>
                  </View>

                  <Text style={styles.finalNote}>
                    This means your graph divides the 2D plane into <Text style={{fontWeight: 'bold'}}>{results.faces}</Text> distinct regions (including the 1 infinite space on the outside).
                  </Text>
                </>
              )}
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
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryText: { fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 12 },
  
  svgWrapper: { alignItems: 'center', marginVertical: 10, backgroundColor: '#f8fafc', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 10 },
  noteText: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  exampleBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, marginBottom: 15, borderLeftWidth: 3, borderLeftColor: '#3b82f6' },
  exampleTitle: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 6 },
  exampleText: { fontSize: 13, color: '#2563eb', fontFamily: 'monospace', marginBottom: 4, paddingVertical: 2, fontWeight: 'bold' },

  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, color: '#64748b', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 15, fontSize: 18, backgroundColor: '#f8fafc', textAlign: 'center', fontFamily: 'monospace' },
  
  calcBtn: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  
  resultBanner: { backgroundColor: '#f0fdf4', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#bbf7d0' },
  resultLabel: { color: '#166534', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
  resultValue: { color: '#15803d', fontSize: 36, fontWeight: '900', fontFamily: 'monospace', marginTop: 5 },
  
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  formulaText: { fontSize: 14, color: '#64748b', fontWeight: 'bold', marginBottom: 5 },
  stepText: { fontSize: 16, color: '#334155', marginVertical: 3, fontFamily: 'monospace' },
  finalNote: { fontSize: 13, color: '#475569', marginTop: 15, fontStyle: 'italic', textAlign: 'center', lineHeight: 20 },
  
  errorBox: { backgroundColor: '#fef2f2', padding: 20, borderRadius: 8, borderLeftWidth: 5, borderLeftColor: '#ef4444' },
  errorText: { color: '#b91c1c', fontWeight: '900', fontSize: 18, marginBottom: 8, textTransform: 'uppercase' },
  errorSub: { color: '#991b1b', fontSize: 14, lineHeight: 22 }
});