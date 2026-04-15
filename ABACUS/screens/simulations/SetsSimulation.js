import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

export default function SetsSimulation({ navigation }) {
  const [setA, setSetA] = useState('');
  const [setB, setSetB] = useState('');
  const [setC, setSetC] = useState('');
  const [results, setResults] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ 1. STRICT NUMERIC VALIDATION: Only allows numbers, commas, and spaces
  const handleInput = (text, setter) => {
    const filteredText = text.replace(/[^0-9,\s]/g, '');
    setter(filteredText);
  };

  // ✅ 2. PRESET EXAMPLES
  const loadExample = (exampleType) => {
    if (exampleType === 'overlapping') {
        setSetA("1, 2, 3, 4");
        setSetB("3, 4, 5, 6");
        setSetC("4, 6, 7, 8");
    } else if (exampleType === 'disjoint') {
        setSetA("1, 2");
        setSetB("3, 4");
        setSetC("5, 6");
    } else if (exampleType === 'subsets') {
        setSetA("1, 2, 3, 4, 5");
        setSetB("2, 3, 4");
        setSetC("3");
    }
    setResults(null); // Clear previous results to prompt recalculation
  };

  const calculateSets = () => {
    // Parse inputs: split by comma, trim spaces, remove empty strings
    const parseSet = (str) => new Set(str.split(',').map(s => s.trim()).filter(s => s !== ''));

    const A = parseSet(setA);
    const B = parseSet(setB);
    const C = parseSet(setC);

    if (A.size === 0 && B.size === 0 && C.size === 0) {
      Alert.alert("Empty Sets", "Please enter numeric elements in at least one set to simulate.");
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

  // ✅ 3. ADDED EXPLANATIONS TO RESULTS
  const renderResultBlock = (title, dataArr, symbol, explanation) => (
    <View style={styles.operationBlock}>
      <Text style={styles.opHeader}>{title}</Text>
      {explanation && <Text style={styles.opExplanation}>{explanation}</Text>}
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
          
          {/* ✅ 4. GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Numbers Only:</Text> This simulation strictly accepts numeric values.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Formatting:</Text> Separate each number using a comma (e.g., 1, 2, 3).</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Duplicates:</Text> Sets ignore duplicates. Typing "1, 1, 2" will evaluate as "1, 2".</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn Set Theory Concepts</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryTitle}>Cardinality (#)</Text>
              <Text style={styles.theoryText}>The number of unique elements inside a set.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>Union (∪)</Text>
              <Text style={styles.theoryText}>Combines all elements from the specified sets. Duplicates are written only once.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>Intersection (∩)</Text>
              <Text style={styles.theoryText}>Finds elements that exist in BOTH sets simultaneously.</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>Universal Set (U)</Text>
              <Text style={styles.theoryText}>The absolute parent set containing ALL elements from A, B, and C combined.</Text>
            </View>
          )}

          {/* ✅ 5. PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Combination</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('overlapping')}>
                  <Ionicons name="git-merge-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Overlapping</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('disjoint')}>
                  <Ionicons name="apps-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Disjoint (No Matches)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('subsets')}>
                  <Ionicons name="disc-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Subsets (Inside each other)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Define Your Sets</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Set A</Text>
              <TextInput style={styles.input} value={setA} onChangeText={(t) => handleInput(t, setSetA)} placeholder="e.g., 1, 2, 3" placeholderTextColor="#666" keyboardType="numbers-and-punctuation" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Set B</Text>
              <TextInput style={styles.input} value={setB} onChangeText={(t) => handleInput(t, setSetB)} placeholder="e.g., 3, 4, 5" placeholderTextColor="#666" keyboardType="numbers-and-punctuation" />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Set C</Text>
              <TextInput style={styles.input} value={setC} onChangeText={(t) => handleInput(t, setSetC)} placeholder="e.g., 5, 6, 7" placeholderTextColor="#666" keyboardType="numbers-and-punctuation" />
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
                  <Circle cx="110" cy="100" r="70" fill="rgba(255, 99, 132, 0.4)" stroke="#ef4444" strokeWidth="2" />
                  <Circle cx="190" cy="100" r="70" fill="rgba(54, 162, 235, 0.4)" stroke="#3b82f6" strokeWidth="2" />
                  <Circle cx="150" cy="160" r="70" fill="rgba(255, 206, 86, 0.4)" stroke="#eab308" strokeWidth="2" />
                  
                  <SvgText x="50" y="40" fontSize="16" fontWeight="bold" fill="#ef4444">A</SvgText>
                  <SvgText x="240" y="40" fontSize="16" fontWeight="bold" fill="#3b82f6">B</SvgText>
                  <SvgText x="150" y="245" fontSize="16" fontWeight="bold" fill="#eab308" textAnchor="middle">C</SvgText>

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

          {/* 📝 FULL DATA BREAKDOWN WITH EXPLANATIONS */}
          {results && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Set Analysis & Cardinalities</Text>

              {renderResultBlock("Base Set A", results.A, "[A]", "The unique numeric elements you provided for Set A.")}
              {renderResultBlock("Base Set B", results.B, "[B]", "The unique numeric elements you provided for Set B.")}
              {renderResultBlock("Base Set C", results.C, "[C]", "The unique numeric elements you provided for Set C.")}
              
              <View style={styles.divider} />
              
              {renderResultBlock("Union: A ∪ B", results.AuB, "[A ∪ B]", "Combines all unique elements found in Set A and Set B.")}
              {renderResultBlock("Union: A ∪ C", results.AuC, "[A ∪ C]", "Combines all unique elements found in Set A and Set C.")}
              {renderResultBlock("Union: B ∪ C", results.BuC, "[B ∪ C]", "Combines all unique elements found in Set B and Set C.")}
              {renderResultBlock("Universal Set (A ∪ B ∪ C)", results.universal, "[Universal]", "The absolute combination of all elements present in the simulation without any duplicates.")}
              
              <View style={styles.divider} />
              
              {renderResultBlock("Intersection: A ∩ B", results.AnB, "[A ∩ B]", "Only the exact elements that exist inside BOTH Set A and Set B.")}
              {renderResultBlock("Intersection: A ∩ C", results.AnC, "[A ∩ C]", "Only the exact elements that exist inside BOTH Set A and Set C.")}
              {renderResultBlock("Intersection: B ∩ C", results.BnC, "[B ∩ C]", "Only the exact elements that exist inside BOTH Set B and Set C.")}
              {renderResultBlock("Core Intersection: A ∩ B ∩ C", results.AnBnC, "[A ∩ B ∩ C]", "The rare elements that exist inside all three sets simultaneously (The very center of the Venn Diagram).")}
              
              <View style={styles.divider} />
              
              {renderResultBlock("Difference: Universal - A", results.U_minus_A, "[Universal - A]", "Elements that exist in the simulation, but are NOT inside Set A.")}
              {renderResultBlock("Difference: Universal - B", results.U_minus_B, "[Universal - B]", "Elements that exist in the simulation, but are NOT inside Set B.")}
              {renderResultBlock("Difference: Universal - C", results.U_minus_C, "[Universal - C]", "Elements that exist in the simulation, but are NOT inside Set C.")}

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
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
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
  theoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#374151', marginBottom: 5 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16, color: '#333' },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  vennCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20, alignItems: 'center' },
  svgContainer: { marginTop: 10, alignItems: 'center', justifyContent: 'center' },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#3b82f6' },
  resultTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', textTransform: 'uppercase', marginBottom: 15 },
  
  operationBlock: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, marginBottom: 15, borderLeftWidth: 3, borderLeftColor: '#94a3b8' },
  opHeader: { fontSize: 15, fontWeight: 'bold', color: '#1f2937', marginBottom: 4 },
  opExplanation: { fontSize: 13, color: '#64748b', marginBottom: 8, fontStyle: 'italic', lineHeight: 18 },
  mathStep: { fontSize: 16, fontFamily: 'monospace', color: '#2563eb', marginVertical: 5 },
  cardinalText: { fontSize: 13, color: '#059669', fontWeight: 'bold', marginTop: 5 }
});