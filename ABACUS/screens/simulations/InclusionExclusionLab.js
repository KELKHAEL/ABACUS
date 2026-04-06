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

  const calculatePIE = () => {
    Keyboard.dismiss();
    const a = parseInt(setA) || 0;
    const b = parseInt(setB) || 0;
    const c = parseInt(setC) || 0;
    const iAB = parseInt(ab) || 0;
    const iAC = parseInt(ac) || 0;
    const iBC = parseInt(bc) || 0;
    const iABC = parseInt(abc) || 0;

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

    // We allow negative unions/regions strictly for educational purposes so students see their logic flaws.
    setResults({ a, b, c, iAB, iAC, iBC, iABC, union, regions: { onlyA, onlyB, onlyC, onlyAB, onlyAC, onlyBC, onlyABC } });
  };

  const loadExample = () => {
    setSetA('50'); setSetB('40'); setSetC('30');
    setAb('15'); setAc('10'); setBc('8');
    setAbc('5'); setResults(null);
  };

  const clearInputs = () => {
    setSetA(''); setSetB(''); setSetC('');
    setAb(''); setAc(''); setBc(''); setAbc('');
    setResults(null);
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
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold'}}>Why subtract?</Text> Because when we add A, B, and C, we accidentally count the people who like BOTH twice!</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight:'bold'}}>Why add the center back?</Text> Because we subtracted the center (A∩B∩C) three times during the previous step, deleting it completely.</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Set Cardinalities</Text>
            <Text style={styles.descText}>Enter the size of each set and their intersections. Blank = 0.</Text>
            
            <Text style={styles.sectionHeader}>Individuals (|A|, |B|, |C|)</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}><Text style={styles.label}>|A|</Text><TextInput style={styles.input} value={setA} onChangeText={setSetA} keyboardType="numeric" placeholder="0" /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>|B|</Text><TextInput style={styles.input} value={setB} onChangeText={setSetB} keyboardType="numeric" placeholder="0" /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>|C|</Text><TextInput style={styles.input} value={setC} onChangeText={setSetC} keyboardType="numeric" placeholder="0" /></View>
            </View>

            <Text style={styles.sectionHeader}>Intersections (Two Sets)</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}><Text style={styles.label}>|A ∩ B|</Text><TextInput style={styles.input} value={ab} onChangeText={setAb} keyboardType="numeric" placeholder="0" /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>|A ∩ C|</Text><TextInput style={styles.input} value={ac} onChangeText={setAc} keyboardType="numeric" placeholder="0" /></View>
              <View style={styles.inputGroup}><Text style={styles.label}>|B ∩ C|</Text><TextInput style={styles.input} value={bc} onChangeText={setBc} keyboardType="numeric" placeholder="0" /></View>
            </View>

            <Text style={styles.sectionHeader}>Intersection (All Three)</Text>
            <View style={[styles.inputGroup, { width: '31%' }]}>
              <Text style={styles.label}>|A ∩ B ∩ C|</Text>
              <TextInput style={styles.input} value={abc} onChangeText={setAbc} keyboardType="numeric" placeholder="0" />
            </View>

            <View style={styles.btnContainer}>
              <View style={styles.secondaryBtnRow}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={clearInputs}><Text style={styles.secondaryBtnText}>Clear Input</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.secondaryBtn, styles.loadBtn]} onPress={loadExample}><Text style={[styles.secondaryBtnText, styles.loadBtnText]}>Load Example</Text></TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.primaryBtn} onPress={calculatePIE}>
                <Text style={styles.primaryBtnText}>Solve Union & Venn</Text>
              </TouchableOpacity>
            </View>
          </View>

          {results && (
            <View style={styles.resultCard}>
              <View style={styles.resultBanner}>
                <Text style={styles.resultLabel}>Total Size |A ∪ B ∪ C|</Text>
                <Text style={styles.resultValue}>{results.union}</Text>
              </View>

              <Text style={styles.sectionHeader}>Mathematical Breakdown</Text>
              <View style={styles.stepsBox}>
                <Text style={styles.stepText}>= ({results.a} + {results.b} + {results.c}) - ({results.iAB} + {results.iAC} + {results.iBC}) + {results.iABC}</Text>
                <Text style={styles.stepText}>= ({results.a + results.b + results.c}) - ({results.iAB + results.iAC + results.iBC}) + {results.iABC}</Text>
                <Text style={[styles.stepText, {color: '#10b981', fontWeight: 'bold'}]}>= {results.union}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.sectionHeader}>Calculated Venn Diagram</Text>
              <View style={styles.svgWrapper}>
                  <Svg height="250" width="300" viewBox="0 0 300 250">
                    <Circle cx="110" cy="100" r="70" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2" />
                    <Circle cx="190" cy="100" r="70" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />
                    <Circle cx="150" cy="160" r="70" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="2" />
                    
                    <SvgText x="50" y="40" fontSize="14" fontWeight="bold" fill="#ef4444">A ({results.a})</SvgText>
                    <SvgText x="240" y="40" fontSize="14" fontWeight="bold" fill="#3b82f6">B ({results.b})</SvgText>
                    <SvgText x="150" y="245" fontSize="14" fontWeight="bold" fill="#eab308" textAnchor="middle">C ({results.c})</SvgText>

                    <SvgText x="85" y="90" fontSize="14" fontWeight="bold" fill="#1e293b" textAnchor="middle">{results.regions.onlyA}</SvgText>
                    <SvgText x="215" y="90" fontSize="14" fontWeight="bold" fill="#1e293b" textAnchor="middle">{results.regions.onlyB}</SvgText>
                    <SvgText x="150" y="195" fontSize="14" fontWeight="bold" fill="#1e293b" textAnchor="middle">{results.regions.onlyC}</SvgText>
                    
                    <SvgText x="150" y="70" fontSize="12" fontWeight="bold" fill="#334155" textAnchor="middle">{results.regions.onlyAB}</SvgText>
                    <SvgText x="110" y="140" fontSize="12" fontWeight="bold" fill="#334155" textAnchor="middle">{results.regions.onlyAC}</SvgText>
                    <SvgText x="190" y="140" fontSize="12" fontWeight="bold" fill="#334155" textAnchor="middle">{results.regions.onlyBC}</SvgText>
                    
                    <SvgText x="150" y="115" fontSize="14" fontWeight="900" fill="#0f172a" textAnchor="middle">{results.regions.onlyABC}</SvgText>
                  </Svg>
              </View>
              {results.union < 0 && (
                  <Text style={styles.errorText}>Warning: Union is negative. Your intersection values are mathematically impossible for the given set sizes!</Text>
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
  theoryText: { fontSize: 13, color: '#4b5563', lineHeight: 20, marginBottom: 5 },
  formulaText: { fontSize: 15, fontFamily: 'monospace', color: '#104a28', textAlign: 'center', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  descText: { fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: 15 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 10, textAlign: 'center' },
  
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  inputGroup: { flex: 0.31 },
  label: { fontSize: 12, color: '#64748b', marginBottom: 5, fontWeight: 'bold', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f8fafc', textAlign: 'center', fontFamily: 'monospace' },
  
  btnContainer: { marginTop: 10, gap: 10 },
  secondaryBtnRow: { flexDirection: 'row', gap: 10 },
  secondaryBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', alignItems: 'center', backgroundColor: '#f8fafc' },
  secondaryBtnText: { fontWeight: 'bold', color: '#475569' },
  loadBtn: { backgroundColor: '#f0f9ff', borderColor: '#bae6fd' },
  loadBtnText: { color: '#0284c7' },
  primaryBtn: { width: '100%', paddingVertical: 15, borderRadius: 8, backgroundColor: '#104a28', alignItems: 'center' },
  primaryBtnText: { fontWeight: 'bold', color: '#ffffff', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#f59e0b' },
  resultBanner: { backgroundColor: '#fef3c7', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#fde047' },
  resultLabel: { color: '#b45309', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  resultValue: { color: '#d97706', fontSize: 32, fontWeight: '900', fontFamily: 'monospace' },
  
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  stepText: { fontSize: 15, color: '#334155', marginVertical: 3, fontFamily: 'monospace' },
  
  svgWrapper: { alignItems: 'center', marginVertical: 10, backgroundColor: '#f8fafc', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 10 },
  errorText: { color: '#ef4444', fontSize: 12, textAlign: 'center', marginTop: 15, fontWeight: 'bold' }
});