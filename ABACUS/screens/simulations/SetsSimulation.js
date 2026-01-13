import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VennDiagram from './VennDiagram'; 

// --- Set Operation Functions ---
const parseSet = (str) => new Set(str.split(',').map(s => s.trim()).filter(s => s !== '' && !isNaN(s)).map(Number));
const union = (a, b) => new Set([...a, ...b]);
const intersection = (a, b) => new Set([...a].filter(x => b.has(x)));
const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));
const setToString = (s) => s.size === 0 ? "∅" : `{ ${[...s].join(', ')} }`;

export default function SetsSimulation({ navigation }) {
  const [textA, setTextA] = useState('1, 3, 6');
  const [textB, setTextB] = useState('2, 5, 8');
  const [textC, setTextC] = useState('7, 4');
  
  const [setA, setSetA] = useState(new Set());
  const [setB, setSetB] = useState(new Set());
  const [setC, setSetC] = useState(new Set());
  
  const [results, setResults] = useState([]);
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = () => {
    const a = parseSet(textA);
    const b = parseSet(textB);
    const c = parseSet(textC);

    setSetA(a); setSetB(b); setSetC(c);

    // Calculations
    const univ = union(union(a, b), c); 
    const abUnion = union(a, b);
    const abcUnion = union(abUnion, c);
    const abInter = intersection(a, b);
    const abcInter = intersection(intersection(a, b), c);

    const newResults = [
      // Section 1: Cardinalities
      { label: "Cardinality #|A|", value: a.size, explanation: "Count of elements in Set A." },
      { label: "Cardinality #|B|", value: b.size, explanation: "Count of elements in Set B." },
      { label: "Cardinality #|C|", value: c.size, explanation: "Count of elements in Set C." },
      
      // Section 2: Unions
      { label: "A ∪ B", value: setToString(abUnion), explanation: "Elements in A OR B." },
      { label: "A ∪ B ∪ C", value: setToString(abcUnion), explanation: "Elements in A, B, OR C." },
      
      // Section 3: Intersections
      { label: "A ∩ B", value: setToString(abInter), explanation: "Elements common to A AND B." },
      { label: "A ∩ B ∩ C", value: setToString(abcInter), explanation: "Elements common to ALL three sets." },
      
      // Section 4: Differences
      { label: "A - B", value: setToString(difference(a, b)), explanation: "Elements in A but NOT in B." },
      { label: "Universal Set (U)", value: setToString(univ), explanation: "Union of all provided sets." },
    ];
    
    setResults(newResults);
    setHasCalculated(true);
  };

  const showGuide = (item) => {
    Alert.alert(item.label, `${item.explanation}\n\nResult: ${item.value}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Set Theory Simulation</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* INPUTS SECTION */}
        <View style={styles.sectionBlock}>
          <Text style={styles.inputLabel}>INPUT SET A</Text>
          <TextInput style={styles.input} placeholder="e.g. 1, 2, 3" value={textA} onChangeText={setTextA} keyboardType="numeric" />
          
          <Text style={styles.inputLabel}>INPUT SET B</Text>
          <TextInput style={styles.input} placeholder="e.g. 3, 4, 5" value={textB} onChangeText={setTextB} keyboardType="numeric" />

          <Text style={styles.inputLabel}>INPUT SET C</Text>
          <TextInput style={styles.input} placeholder="e.g. 5, 6, 7" value={textC} onChangeText={setTextC} keyboardType="numeric" />

          <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate}>
            <Text style={styles.btnText}>CALCULATE RESULTS</Text>
          </TouchableOpacity>
        </View>

        {hasCalculated && (
          <View style={styles.resultsWrapper}>
            
            {/* CALCULATION LIST */}
            <Text style={styles.sectionHeader}>Calculated Results</Text>
            <Text style={styles.subHint}>Tap any box for details</Text>
            
            <View style={styles.gridContainer}>
              {results.map((item, index) => (
                <TouchableOpacity key={index} style={styles.resultCard} onPress={() => showGuide(item)}>
                  <Text style={styles.resultLabel}>{item.label}</Text>
                  <Text style={styles.resultValue}>{item.value}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* VENN DIAGRAM (Below the List) */}
            <View style={styles.vennContainer}>
              <Text style={styles.sectionHeader}>Venn Diagram Visualization</Text>
              <VennDiagram setA={setA} setB={setB} setC={setC} />
            </View>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  
  content: { padding: 20, paddingBottom: 50 },

  // Input Section
  sectionBlock: { marginBottom: 30 },
  inputLabel: { fontSize: 14, fontWeight: '900', color: '#333', marginBottom: 8, marginTop: 15, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', fontSize: 16, color: '#333' },
  
  calcBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 25, shadowColor: '#104a28', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },

  // Results Section
  resultsWrapper: { marginTop: 10 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginTop: 20, marginBottom: 5 },
  subHint: { fontSize: 12, color: '#888', fontStyle: 'italic', marginBottom: 15 },

  // Grid Layout for Results
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  resultCard: { 
    width: '48%',
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 12,
    borderLeftWidth: 4, 
    borderLeftColor: '#2D7FF9',
    shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2
  },
  resultLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 4 },
  resultValue: { fontSize: 15, fontWeight: 'bold', color: '#333' },

  // Venn Diagram Container
  vennContainer: { marginTop: 20, alignItems: 'center', backgroundColor: 'white', padding: 10, borderRadius: 16, borderWidth: 1, borderColor: '#eee' }
});