import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Text as SvgText, G } from 'react-native-svg';

export default function InclusionExclusionLab({ navigation }) {
  const [setA, setSetA] = useState('');
  const [setB, setSetB] = useState('');
  const [setC, setSetC] = useState('');
  const [ab, setAb] = useState('');
  const [ac, setAc] = useState('');
  const [bc, setBc] = useState('');
  const [abc, setAbc] = useState('');
  const [results, setResults] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT NUMERIC VALIDATION: Only positive whole numbers
  const handleInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setter(cleanText);
  };

  // ✅ EXPANDED PRESET EXAMPLES
  const loadExample = (a, b, c, iAB, iAC, iBC, iABC) => {
    setSetA(a.toString()); setSetB(b.toString()); setSetC(c.toString());
    setAb(iAB.toString()); setAc(iAC.toString()); setBc(iBC.toString());
    setAbc(iABC.toString());
    setResults(null);
  };

  const clearInputs = () => {
    setSetA(''); setSetB(''); setSetC('');
    setAb(''); setAc(''); setBc(''); setAbc('');
    setResults(null);
  };

  const calculatePIE = () => {
    Keyboard.dismiss();
    
    // Parse inputs, defaulting empty fields to 0
    const a = parseInt(setA, 10) || 0;
    const b = parseInt(setB, 10) || 0;
    const c = parseInt(setC, 10) || 0;
    const iAB = parseInt(ab, 10) || 0;
    const iAC = parseInt(ac, 10) || 0;
    const iBC = parseInt(bc, 10) || 0;
    const iABC = parseInt(abc, 10) || 0;

    if (a === 0 && b === 0 && c === 0) {
        Alert.alert("Required Fields", "Please enter values for at least one of the main sets (A, B, or C).");
        return;
    }

    // Formula: |A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|
    const union = (a + b + c) - (iAB + iAC + iBC) + iABC;

    // Calculate exclusive regions for Venn Diagram
    const onlyABC = iABC;
    const onlyAB = iAB - onlyABC;
    const onlyAC = iAC - onlyABC;
    const onlyBC = iBC - onlyABC;
    const onlyA = a - onlyAB - onlyAC - onlyABC;
    const onlyB = b - onlyAB - onlyBC - onlyABC;
    const onlyC = c - onlyAC - onlyBC - onlyABC;

    // Check for impossible data (negative regions)
    const hasError = onlyA < 0 || onlyB < 0 || onlyC < 0 || onlyAB < 0 || onlyAC < 0 || onlyBC < 0 || onlyABC < 0 || union < 0;

    setResults({ 
        a, b, c, iAB, iAC, iBC, iABC, union, 
        regions: { onlyA, onlyB, onlyC, onlyAB, onlyAC, onlyBC, onlyABC },
        hasError 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inclusion-Exclusion</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> Because sets deal with physical counts of objects or people, decimals are strictly prohibited.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Individuals (|A|):</Text> The TOTAL size of the set, including overlaps.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Intersections (∩):</Text> The items that exist in multiple sets simultaneously.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Blank Inputs:</Text> Any field left blank is automatically counted as 0.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the PIE Formula</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>

          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.formulaText}>|A∪B∪C| = |A| + |B| + |C|</Text>
              <Text style={styles.formulaText}> - |A∩B| - |A∩C| - |B∩C|</Text>
              <Text style={styles.formulaText}> + |A∩B∩C|</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold'}}>Why subtract?</Text> Because when we add the totals of A, B, and C, we accidentally count the people who sit in the overlapping intersections twice!</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold'}}>Why add the center back?</Text> Because when we subtracted the 2-way intersections, we accidentally subtracted the dead center (A∩B∩C) three times, deleting it completely. We must add it back once to fix the count.</Text>
            </View>
          )}

          {/* ✅ EXPANDED PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Scenario Library</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(45, 52, 37, 15, 16, 14, 5)}>
                  <Ionicons name="basketball-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Sports Survey (Classic)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(50, 40, 30, 15, 10, 8, 5)}>
                  <Ionicons name="language-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Language Students</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(120, 80, 60, 40, 30, 20, 0)}>
                  <Ionicons name="radio-button-off-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Empty Center</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(100, 100, 100, 100, 100, 100, 100)}>
                  <Ionicons name="infinite-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Perfect Overlap</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(50, 50, 50, 0, 0, 0, 0)}>
                  <Ionicons name="grid-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Completely Disjoint</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(10, 10, 10, 20, 5, 5, 2)}>
                  <Ionicons name="warning-outline" size={16} color="#dc2626" />
                  <Text style={[styles.exampleBtnText, {color: '#dc2626'}]}>Mathematically Impossible</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Set Cardinalities</Text>
            
            <Text style={styles.subHeader}>Individuals (|A|, |B|, |C|)</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}><Text style={styles.label}>|A|</Text><TextInput style={styles.input} value={setA} onChangeText={(t) => handleInput(t, setSetA)} keyboardType="number-pad" placeholder="0" maxLength={5} /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>|B|</Text><TextInput style={styles.input} value={setB} onChangeText={(t) => handleInput(t, setSetB)} keyboardType="number-pad" placeholder="0" maxLength={5} /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>|C|</Text><TextInput style={styles.input} value={setC} onChangeText={(t) => handleInput(t, setSetC)} keyboardType="number-pad" placeholder="0" maxLength={5} /></View>
            </View>

            <Text style={styles.subHeader}>Intersections (Two Sets)</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}><Text style={styles.label}>|A ∩ B|</Text><TextInput style={styles.input} value={ab} onChangeText={(t) => handleInput(t, setAb)} keyboardType="number-pad" placeholder="0" maxLength={5} /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>|A ∩ C|</Text><TextInput style={styles.input} value={ac} onChangeText={(t) => handleInput(t, setAc)} keyboardType="number-pad" placeholder="0" maxLength={5} /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>|B ∩ C|</Text><TextInput style={styles.input} value={bc} onChangeText={(t) => handleInput(t, setBc)} keyboardType="number-pad" placeholder="0" maxLength={5} /></View>
            </View>

            <Text style={styles.subHeader}>Intersection (All Three)</Text>
            <View style={[styles.inputGroup, { width: '31%' }]}>
              <Text style={styles.label}>|A ∩ B ∩ C|</Text>
              <TextInput style={styles.input} value={abc} onChangeText={(t) => handleInput(t, setAbc)} keyboardType="number-pad" placeholder="0" maxLength={5} />
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={clearInputs}>
                  <Text style={styles.secondaryBtnText}>Clear Input</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.primaryBtn} onPress={calculatePIE}>
                <Text style={styles.primaryBtnText}>Solve Union & Venn</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 📝 RESULT CARD */}
          {results && (
            <View style={styles.resultCard}>
              <View style={styles.resultBanner}>
                <Text style={styles.resultLabel}>Total Size |A ∪ B ∪ C|</Text>
                <Text style={styles.resultValue}>{results.union}</Text>
              </View>

              {/* ✅ DYNAMIC ERROR EXPLANATION */}
              {results.hasError && (
                  <View style={styles.errorBox}>
                      <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5}}>
                          <Ionicons name="alert-circle" size={20} color="#dc2626" />
                          <Text style={styles.errorTitle}>Mathematically Impossible</Text>
                      </View>
                      <Text style={styles.errorText}>
                          Notice the negative numbers in the Venn Diagram! This happens when your input data defies logic. For example, the intersection |A ∩ B| cannot physically be larger than Set A itself. Use this to find logical flaws in survey data!
                      </Text>
                  </View>
              )}

              <Text style={styles.subHeader}>Mathematical Breakdown</Text>
              <View style={styles.stepsBox}>
                <Text style={styles.stepText}>= (|A| + |B| + |C|) - (|A∩B| + |A∩C| + |B∩C|) + |A∩B∩C|</Text>
                <Text style={styles.stepText}>= ({results.a} + {results.b} + {results.c}) - ({results.iAB} + {results.iAC} + {results.iBC}) + {results.iABC}</Text>
                <Text style={styles.stepText}>= ({results.a + results.b + results.c}) - ({results.iAB + results.iAC + results.iBC}) + {results.iABC}</Text>
                <Text style={[styles.stepText, {color: '#10b981', fontWeight: 'bold', fontSize: 18, marginTop: 5}]}>= {results.union}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={[styles.subHeader, {textAlign: 'center'}]}>Calculated Venn Diagram</Text>
              <View style={styles.svgWrapper}>
                  <Svg height="250" width="300" viewBox="0 0 300 250">
                    <Circle cx="110" cy="100" r="70" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
                    <Circle cx="190" cy="100" r="70" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
                    <Circle cx="150" cy="160" r="70" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2" />
                    
                    <SvgText x="50" y="40" fontSize="14" fontWeight="bold" fill="#ef4444">A ({results.a})</SvgText>
                    <SvgText x="240" y="40" fontSize="14" fontWeight="bold" fill="#3b82f6">B ({results.b})</SvgText>
                    <SvgText x="150" y="245" fontSize="14" fontWeight="bold" fill="#eab308" textAnchor="middle">C ({results.c})</SvgText>

                    {/* Regions - Dynamic coloring for negatives */}
                    <SvgText x="85" y="90" fontSize="14" fontWeight="bold" fill={results.regions.onlyA < 0 ? "#dc2626" : "#1e293b"} textAnchor="middle">{results.regions.onlyA}</SvgText>
                    <SvgText x="215" y="90" fontSize="14" fontWeight="bold" fill={results.regions.onlyB < 0 ? "#dc2626" : "#1e293b"} textAnchor="middle">{results.regions.onlyB}</SvgText>
                    <SvgText x="150" y="195" fontSize="14" fontWeight="bold" fill={results.regions.onlyC < 0 ? "#dc2626" : "#1e293b"} textAnchor="middle">{results.regions.onlyC}</SvgText>
                    
                    <SvgText x="150" y="70" fontSize="12" fontWeight="bold" fill={results.regions.onlyAB < 0 ? "#dc2626" : "#334155"} textAnchor="middle">{results.regions.onlyAB}</SvgText>
                    <SvgText x="110" y="140" fontSize="12" fontWeight="bold" fill={results.regions.onlyAC < 0 ? "#dc2626" : "#334155"} textAnchor="middle">{results.regions.onlyAC}</SvgText>
                    <SvgText x="190" y="140" fontSize="12" fontWeight="bold" fill={results.regions.onlyBC < 0 ? "#dc2626" : "#334155"} textAnchor="middle">{results.regions.onlyBC}</SvgText>
                    
                    <SvgText x="150" y="115" fontSize="14" fontWeight="900" fill={results.regions.onlyABC < 0 ? "#dc2626" : "#0f172a"} textAnchor="middle">{results.regions.onlyABC}</SvgText>
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
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  guidelinesCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guidelinesTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1' },
  guidelinesText: { fontSize: 13, color: '#0f172a', marginBottom: 4, lineHeight: 18 },

  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 10, textAlign: 'center' },
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#fde68a', gap: 6 },
  exampleBtnText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },

  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 5 },
  formulaText: { fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#104a28', textAlign: 'center', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  descText: { fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: 15 },
  subHeader: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 10, marginTop: 5 },
  
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  inputGroup: { flex: 0.31 },
  label: { fontSize: 12, color: '#64748b', marginBottom: 5, fontWeight: 'bold', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f8fafc', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', color: '#111' },
  
  btnContainer: { flexDirection: 'row', marginTop: 15, gap: 10 },
  secondaryBtn: { flex: 0.35, paddingVertical: 15, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', alignItems: 'center', backgroundColor: '#f8fafc' },
  secondaryBtnText: { fontWeight: 'bold', color: '#475569' },
  primaryBtn: { flex: 0.65, paddingVertical: 15, borderRadius: 8, backgroundColor: '#104a28', alignItems: 'center' },
  primaryBtnText: { fontWeight: 'bold', color: '#ffffff', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#f59e0b' },
  resultBanner: { backgroundColor: '#fef3c7', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#fde047' },
  resultLabel: { color: '#b45309', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  resultValue: { color: '#d97706', fontSize: 32, fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  
  errorBox: { backgroundColor: '#fef2f2', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#fecaca', marginBottom: 15 },
  errorTitle: { fontWeight: 'bold', color: '#b91c1c', fontSize: 14 },
  errorText: { fontSize: 13, color: '#991b1b', lineHeight: 20 },

  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  stepText: { fontSize: 14, color: '#334155', marginVertical: 3, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  
  svgWrapper: { alignItems: 'center', marginVertical: 10, backgroundColor: '#f8fafc', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 10 }
});