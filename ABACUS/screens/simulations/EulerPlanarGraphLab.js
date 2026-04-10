import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Circle, Text as SvgText, G, Polygon } from 'react-native-svg';

export default function EulerPlanarGraphLab({ navigation }) {
  const [vertices, setVertices] = useState('');
  const [edges, setEdges] = useState('');
  const [results, setResults] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT NUMERIC VALIDATION: Only positive whole numbers
  const handleInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setter(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (v, e) => {
      setVertices(v.toString());
      setEdges(e.toString());
      setResults(null); // Clear previous results
  };

  const calculateEuler = () => {
    Keyboard.dismiss();

    if (!vertices || !edges) {
        Alert.alert("Required Fields", "Please enter values for both Vertices and Edges.");
        return;
    }

    const v = parseInt(vertices, 10);
    const e = parseInt(edges, 10);

    if (isNaN(v) || isNaN(e) || v < 1 || e < 0) {
      Alert.alert("Input Error", "Please enter valid positive whole numbers for Vertices and Edges.");
      return;
    }

    if (v > 99999 || e > 99999) {
      Alert.alert("Hardware Limit", "Values are too large. Please keep numbers under 100,000.");
      return;
    }

    // Euler's Formula: V - E + F = 2  =>  F = 2 - V + E
    const faces = 2 - v + e;

    // Euler's Inequality for simple connected planar graphs (if V >= 3, then E <= 3V - 6)
    let isPlanarPossible = true;
    let maxEdges = 0;
    if (v >= 3) {
        maxEdges = (3 * v) - 6;
        if (e > maxEdges) isPlanarPossible = false;
    } else if (v === 1 || v === 2) {
        // A simple graph with 1 or 2 vertices can only have 0 or 1 edge respectively.
        maxEdges = v === 1 ? 0 : 1;
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
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> Graphs are built with physical dots and lines. Decimals are strictly prohibited.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Vertices (V):</Text> The total number of dots (nodes) in your graph.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Edges (E):</Text> The total number of lines connecting those dots.</Text>
          </View>

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

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try Famous Polyhedra & Graphs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(4, 6)}>
                  <Ionicons name="triangle-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Tetrahedron (V=4, E=6)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(8, 12)}>
                  <Ionicons name="cube-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Cube (V=8, E=12)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(12, 30)}>
                  <Ionicons name="diamond-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Icosahedron (V=12, E=30)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(5, 10)}>
                  <Ionicons name="warning-outline" size={16} color="#dc2626" />
                  <Text style={[styles.exampleBtnText, {color: '#dc2626'}]}>K5 Graph (Non-Planar!)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate Regions (Faces)</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vertices (V)</Text>
                <TextInput 
                  style={styles.input} 
                  value={vertices} 
                  onChangeText={(t) => handleInput(t, setVertices)} 
                  keyboardType="number-pad" 
                  placeholder="e.g. 5" 
                  maxLength={5}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Edges (E)</Text>
                <TextInput 
                  style={styles.input} 
                  value={edges} 
                  onChangeText={(t) => handleInput(t, setEdges)} 
                  keyboardType="number-pad" 
                  placeholder="e.g. 7" 
                  maxLength={5}
                />
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
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5}}>
                        <Ionicons name="alert-circle" size={24} color="#b91c1c" />
                        <Text style={styles.errorText}>Graph is NON-PLANAR!</Text>
                    </View>
                    <Text style={styles.errorSub}>According to <Text style={{fontWeight: 'bold'}}>Euler's Inequality</Text>, a simple planar graph with {results.v} vertices can mathematically only have a maximum of <Text style={{fontWeight:'bold'}}>{results.maxEdges} edges</Text>.</Text>
                    
                    <View style={styles.mathStepContainer}>
                        <Text style={styles.mathStepText}>Formula: E ≤ 3V - 6</Text>
                        <Text style={styles.mathStepText}>Max Edges = 3({results.v}) - 6</Text>
                        <Text style={styles.mathStepText}>Max Edges = {results.maxEdges}</Text>
                    </View>
                    
                    <Text style={[styles.errorSub, {marginTop: 10, fontWeight: 'bold'}]}>You entered {results.e} edges. Because {results.e} {'>'} {results.maxEdges}, this graph MUST have intersecting lines and cannot be drawn flat on a piece of paper!</Text>
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
                    <Text style={[styles.stepText, {color: '#10b981', fontWeight: 'bold', fontSize: 18, marginTop: 5}]}>F = {results.faces}</Text>
                  </View>

                  <View style={styles.explanationBox}>
                      <Ionicons name="bulb-outline" size={20} color="#0369a1" style={{marginTop: 2}}/>
                      <Text style={styles.explanationText}>
                          <Text style={{fontWeight: 'bold', color: '#075985'}}>What does this mean?</Text> If you draw this graph on a piece of paper without any lines crossing, it will divide the paper into exactly <Text style={{fontWeight: 'bold'}}>{results.faces}</Text> distinct regions (including the 1 infinite space on the outside).
                      </Text>
                  </View>
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
  theoryText: { fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 12 },
  
  svgWrapper: { alignItems: 'center', marginVertical: 10, backgroundColor: '#f8fafc', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 10 },
  noteText: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  inputGroup: { flex: 1 },
  label: { fontSize: 12, color: '#64748b', marginBottom: 5, fontWeight: 'bold', textTransform: 'uppercase' },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 15, fontSize: 18, backgroundColor: '#f8fafc', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', color: '#111' },
  
  calcBtn: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  
  resultBanner: { backgroundColor: '#f0fdf4', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#bbf7d0' },
  resultLabel: { color: '#166534', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
  resultValue: { color: '#15803d', fontSize: 36, fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginTop: 5 },
  
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  formulaText: { fontSize: 14, color: '#64748b', fontWeight: 'bold', marginBottom: 5 },
  stepText: { fontSize: 16, color: '#334155', marginVertical: 3, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  
  explanationBox: { flexDirection: 'row', backgroundColor: '#e0f2fe', padding: 15, borderRadius: 8, marginTop: 15, gap: 10, borderWidth: 1, borderColor: '#bae6fd' },
  explanationText: { flex: 1, fontSize: 13, color: '#0369a1', lineHeight: 20 },
  
  errorBox: { backgroundColor: '#fef2f2', padding: 20, borderRadius: 8, borderLeftWidth: 5, borderLeftColor: '#ef4444' },
  errorText: { color: '#b91c1c', fontWeight: '900', fontSize: 16, textTransform: 'uppercase' },
  errorSub: { color: '#991b1b', fontSize: 14, lineHeight: 22, marginTop: 10 },
  mathStepContainer: { backgroundColor: '#fee2e2', padding: 12, borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#ef4444', marginTop: 10 },
  mathStepText: { fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#991b1b', marginVertical: 2, fontWeight: 'bold' }
});