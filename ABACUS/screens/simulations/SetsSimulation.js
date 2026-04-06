import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Text as SvgText, G } from 'react-native-svg';

export default function SetsSimulation({ navigation }) {
  const [setA, setSetA] = useState('');
  const [setB, setSetB] = useState('');
  const [setC, setSetC] = useState('');
  const [results, setResults] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  const calculateSets = () => {
    // Parse inputs: split by comma, trim spaces, remove empty strings
    const parseSet = (str) => new Set(str.split(',').map(s => s.trim()).filter(s => s !== ''));

    const A = parseSet(setA);
    const B = parseSet(setB);
    const C = parseSet(setC);

    if (A.size === 0 && B.size === 0 && C.size === 0) {
      alert("Please enter elements in at least one set.");
      return;
    }

    // Helper functions for set operations
    const union = (s1, s2) => new Set([...s1, ...s2]);
    const intersection = (s1, s2) => new Set([...s1].filter(x => s2.has(x)));
    const difference = (s1, s2) => new Set([...s1].filter(x => !s2.has(x)));

    // Calculate all required sets
    const AuB = union(A, B);
    const AuC = union(A, C);
    const BuC = union(B, C);
    const universal = union(AuB, C); // A U B U C

    const AnB = intersection(A, B);
    const AnC = intersection(A, C);
    const BnC = intersection(B, C);
    const AnBnC = intersection(AnB, C);

    const U_minus_A = difference(universal, A);
    const U_minus_B = difference(universal, B);
    const U_minus_C = difference(universal, C);

    // Venn Diagram specific segments (exclusive regions)
    const onlyA = difference(difference(A, B), C);
    const onlyB = difference(difference(B, A), C);
    const onlyC = difference(difference(C, A), B);
    
    const onlyAB = difference(AnB, C);
    const onlyAC = difference(AnC, B);
    const onlyBC = difference(BnC, A);

    setResults({
      A: Array.from(A), B: Array.from(B), C: Array.from(C),
      AuB: Array.from(AuB), AuC: Array.from(AuC), BuC: Array.from(BuC),
      universal: Array.from(universal),
      AnB: Array.from(AnB), AnC: Array.from(AnC), BnC: Array.from(BnC),
      AnBnC: Array.from(AnBnC),
      U_minus_A: Array.from(U_minus_A), U_minus_B: Array.from(U_minus_B), U_minus_C: Array.from(U_minus_C),
      // Venn Data
      venn: {
        onlyA: Array.from(onlyA).join(','),
        onlyB: Array.from(onlyB).join(','),
        onlyC: Array.from(onlyC).join(','),
        onlyAB: Array.from(onlyAB).join(','),
        onlyAC: Array.from(onlyAC).join(','),
        onlyBC: Array.from(onlyBC).join(','),
        AnBnC: Array.from(AnBnC).join(',')
      }
    });
  };

  const renderResultBlock = (title, dataArr, symbol) => (
    <View style={styles.operationBlock}>
      <Text style={styles.opHeader}>{title}</Text>
      <Text style={styles.mathStep}>
         {dataArr.length > 0 ? `[ ${dataArr.join(', ')} ]` : '[ ]'}
      </Text>
      <Text style={styles.cardinalText}>Cardinality: #{symbol} = {dataArr.length}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sets Builder</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn Set Theory</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryTitle}>Cardinality (#)</Text>
              <Text style={styles.theoryText}>The number of unique elements inside a set.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>Union (∪)</Text>
              <Text style={styles.theoryText}>Combines all elements. Duplicates are written only once.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>Intersection (∩)</Text>
              <Text style={styles.theoryText}>Elements that exist in BOTH sets simultaneously.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>Universal Set (U)</Text>
              <Text style={styles.theoryText}>The set containing ALL elements from A, B, and C combined.</Text>
            </View>
          )}

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Define Your Sets</Text>
            <Text style={styles.instructionText}>Enter items separated by commas (e.g., 1, 2, 3)</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Set A</Text>
              <TextInput style={styles.input} value={setA} onChangeText={setSetA} placeholder="1, 2, 3, 4" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Set B</Text>
              <TextInput style={styles.input} value={setB} onChangeText={setSetB} placeholder="4, 5, 6" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Set C</Text>
              <TextInput style={styles.input} value={setC} onChangeText={setSetC} placeholder="7, 8, 9" />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculateSets}>
              <Text style={styles.calcButtonText}>Generate Sets & Venn Diagram</Text>
            </TouchableOpacity>
          </View>

          {/* 📊 VENN DIAGRAM */}
          {results && (
            <View style={styles.vennCard}>
              <Text style={styles.resultTitle}>Venn Diagram Visualization</Text>
              <View style={styles.svgContainer}>
                <Svg height="250" width="300" viewBox="0 0 300 250">
                  {/* Circles */}
                  <Circle cx="110" cy="100" r="70" fill="rgba(255, 99, 132, 0.4)" stroke="#ef4444" strokeWidth="2" />
                  <Circle cx="190" cy="100" r="70" fill="rgba(54, 162, 235, 0.4)" stroke="#3b82f6" strokeWidth="2" />
                  <Circle cx="150" cy="160" r="70" fill="rgba(255, 206, 86, 0.4)" stroke="#eab308" strokeWidth="2" />
                  
                  {/* Labels */}
                  <SvgText x="50" y="40" fontSize="16" fontWeight="bold" fill="#ef4444">A</SvgText>
                  <SvgText x="240" y="40" fontSize="16" fontWeight="bold" fill="#3b82f6">B</SvgText>
                  <SvgText x="150" y="245" fontSize="16" fontWeight="bold" fill="#eab308" textAnchor="middle">C</SvgText>

                  {/* Data Points */}
                  <SvgText x="85" y="90" fontSize="12" fill="#000" textAnchor="middle">{results.venn.onlyA}</SvgText>
                  <SvgText x="215" y="90" fontSize="12" fill="#000" textAnchor="middle">{results.venn.onlyB}</SvgText>
                  <SvgText x="150" y="195" fontSize="12" fill="#000" textAnchor="middle">{results.venn.onlyC}</SvgText>
                  
                  <SvgText x="150" y="70" fontSize="12" fill="#000" textAnchor="middle">{results.venn.onlyAB}</SvgText>
                  <SvgText x="110" y="140" fontSize="12" fill="#000" textAnchor="middle">{results.venn.onlyAC}</SvgText>
                  <SvgText x="190" y="140" fontSize="12" fill="#000" textAnchor="middle">{results.venn.onlyBC}</SvgText>
                  
                  <SvgText x="150" y="115" fontSize="12" fontWeight="bold" fill="#000" textAnchor="middle">{results.venn.AnBnC}</SvgText>
                </Svg>
              </View>
            </View>
          )}

          {/* 📝 FULL DATA BREAKDOWN */}
          {results && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Set Analysis & Cardinalities</Text>

              {renderResultBlock("Set A", results.A, "[A]")}
              {renderResultBlock("Set B", results.B, "[B]")}
              {renderResultBlock("Set C", results.C, "[C]")}
              
              <View style={styles.divider} />
              
              {renderResultBlock("Set A ∪ B", results.AuB, "[A ∪ B]")}
              {renderResultBlock("Set A ∪ C", results.AuC, "[A ∪ C]")}
              {renderResultBlock("Set B ∪ C", results.BuC, "[B ∪ C]")}
              {renderResultBlock("Set A ∪ B ∪ C (Universal)", results.universal, "[Universal]")}
              
              <View style={styles.divider} />
              
              {renderResultBlock("Intersection A ∩ B", results.AnB, "[A ∩ B]")}
              {renderResultBlock("Intersection A ∩ C", results.AnC, "[A ∩ C]")}
              {renderResultBlock("Intersection B ∩ C", results.BnC, "[B ∩ C]")}
              {renderResultBlock("Intersection A ∩ B ∩ C", results.AnBnC, "[A ∩ B ∩ C]")}
              
              <View style={styles.divider} />
              
              {renderResultBlock("Universal - A", results.U_minus_A, "[Universal - A]")}
              {renderResultBlock("Universal - B", results.U_minus_B, "[Universal - B]")}
              {renderResultBlock("Universal - C", results.U_minus_C, "[Universal - C]")}

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
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  instructionText: { fontSize: 12, color: '#6b7280', marginBottom: 20, fontStyle: 'italic' },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#374151', marginBottom: 5 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16 },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  vennCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20, alignItems: 'center' },
  svgContainer: { marginTop: 10, alignItems: 'center', justifyContent: 'center' },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#3b82f6' },
  resultTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', textTransform: 'uppercase', marginBottom: 15 },
  
  operationBlock: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#94a3b8' },
  opHeader: { fontSize: 14, fontWeight: 'bold', color: '#1f2937', marginBottom: 5 },
  mathStep: { fontSize: 16, fontFamily: 'monospace', color: '#2563eb', marginVertical: 5 },
  cardinalText: { fontSize: 13, color: '#059669', fontWeight: 'bold', marginTop: 5 }
});