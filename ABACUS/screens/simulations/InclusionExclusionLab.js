import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InclusionExclusionLab({ navigation }) {
  const [setA, setSetA] = useState('');
  const [setB, setSetB] = useState('');
  const [setC, setSetC] = useState('');
  const [ab, setAb] = useState('');
  const [ac, setAc] = useState('');
  const [bc, setBc] = useState('');
  const [abc, setAbc] = useState('');
  const [results, setResults] = useState(null);

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

    if (union < 0) {
      return Alert.alert("Logic Error", "The union cannot be negative. Check your intersection values!");
    }

    setResults({ a, b, c, iAB, iAC, iBC, iABC, union });
  };

  // --- NEW: Load Example and Clear Functions ---
  const loadExample = () => {
    setSetA('50');  // e.g., 50 students like Math
    setSetB('40');  // 40 like Physics
    setSetC('30');  // 30 like Chemistry
    setAb('15');    // 15 like Math & Physics
    setAc('10');    // 10 like Math & Chemistry
    setBc('8');     // 8 like Physics & Chemistry
    setAbc('5');    // 5 like all three
    setResults(null);
  };

  const clearInputs = () => {
    setSetA('');
    setSetB('');
    setSetC('');
    setAb('');
    setAc('');
    setBc('');
    setAbc('');
    setResults(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inclusion-Exclusion</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate |A ∪ B ∪ C|</Text>
            <Text style={styles.descText}>Enter the size (cardinality) of each set and their intersections. Leave blank if 0.</Text>
            
            <Text style={styles.sectionHeader}>Individual Sets</Text>
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

            {/* NEW: Button Container matching FDT UX */}
            <View style={styles.btnContainer}>
              <View style={styles.secondaryBtnRow}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={clearInputs}>
                    <Text style={styles.secondaryBtnText}>Clear Input</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.secondaryBtn, styles.loadBtn]} onPress={loadExample}>
                    <Text style={[styles.secondaryBtnText, styles.loadBtnText]}>Load Example</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.primaryBtn} onPress={calculatePIE}>
                  <Text style={styles.primaryBtnText}>Solve Union</Text>
              </TouchableOpacity>
            </View>
          </View>

          {results && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>PIE Breakdown</Text>
              
              <View style={styles.resultBanner}>
                <Text style={styles.resultLabel}>Total Size |A ∪ B ∪ C|</Text>
                <Text style={styles.resultValue}>{results.union}</Text>
              </View>

              <View style={styles.stepsBox}>
                <Text style={styles.formulaText}>|A∪B∪C| = (|A|+|B|+|C|) - (|A∩B|+|A∩C|+|B∩C|) + |A∩B∩C|</Text>
                <View style={styles.divider} />
                <Text style={styles.stepText}>= ({results.a} + {results.b} + {results.c}) - ({results.iAB} + {results.iAC} + {results.iBC}) + {results.iABC}</Text>
                <Text style={styles.stepText}>= ({results.a + results.b + results.c}) - ({results.iAB + results.iAC + results.iBC}) + {results.iABC}</Text>
                <Text style={[styles.stepText, {color: '#10b981', fontWeight: 'bold'}]}>= {results.union}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#104a28', padding: 20, paddingTop: 40 },
  backBtn: { marginRight: 15 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  descText: { fontSize: 12, color: '#666', marginBottom: 15 },
  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#333', marginTop: 5, marginBottom: 5 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  inputGroup: { flex: 0.31 },
  label: { fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 'bold', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16, backgroundColor: '#f9f9f9', textAlign: 'center' },
  
  // NEW STYLES FOR BUTTONS
  btnContainer: { marginTop: 20, gap: 10 },
  secondaryBtnRow: { flexDirection: 'row', gap: 10 },
  secondaryBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  secondaryBtnText: { fontWeight: 'bold', color: '#666' },
  loadBtn: { backgroundColor: '#E3F2FD', borderColor: '#2D7FF9' },
  loadBtnText: { color: '#2D7FF9' },
  primaryBtn: { width: '100%', paddingVertical: 16, borderRadius: 10, backgroundColor: '#eab308', alignItems: 'center' },
  primaryBtnText: { fontWeight: '900', color: '#422006', fontSize: 16 },

  resultBanner: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  resultLabel: { color: '#a7f3d0', fontSize: 14, fontWeight: 'bold' },
  resultValue: { color: '#fff', fontSize: 32, fontWeight: '900' },
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  formulaText: { fontSize: 12, color: '#9ca3af', fontWeight: 'bold' },
  stepText: { fontSize: 15, color: '#334155', marginTop: 5, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  divider: { height: 1, backgroundColor: '#cbd5e1', marginVertical: 10 }
});