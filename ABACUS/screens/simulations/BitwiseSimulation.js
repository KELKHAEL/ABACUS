import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BitwiseSimulation({ navigation }) {
  const [valA, setValA] = useState('');
  const [valB, setValB] = useState('');
  const [results, setResults] = useState(null);
  const [showTheory, setShowTheory] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState(null);

  // ✅ STRICT BINARY VALIDATION
  const handleInput = (text, setter) => {
    const filteredText = text.replace(/[^01]/g, ''); // Strictly only 0s and 1s
    setter(filteredText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (a, b) => {
    setValA(a);
    setValB(b);
    setResults(null);
    setActiveExplanation(null);
  };

  // Automatically pads string to multiple of 4 (nibbles) for standard CS formatting
  const formatBinary = (str) => {
    let clean = str.replace(/\s/g, '');
    if (!clean) return '';
    while (clean.length % 4 !== 0) {
      clean = '0' + clean;
    }
    return clean.match(/.{1,4}/g)?.join(' ') || '';
  };

  // --- LOGIC ENGINE ---
  const calculateBitwise = () => {
    if (!valA || !valB) {
      Alert.alert("Required", "Please enter binary values (0 and 1) in both fields.");
      return;
    }

    const maxLength = Math.max(valA.length, valB.length);
    
    // Pad to equal length, then pad to nearest multiple of 4 for formatting
    let padLength = maxLength;
    while (padLength % 4 !== 0) padLength++;

    const binA = valA.padStart(padLength, '0');
    const binB = valB.padStart(padLength, '0');

    let resOR = '';
    let resAND = '';
    let resXOR = '';

    for (let i = 0; i < padLength; i++) {
      const bitA = binA[i] === '1' ? 1 : 0;
      const bitB = binB[i] === '1' ? 1 : 0;

      resOR += (bitA | bitB);
      resAND += (bitA & bitB);
      resXOR += (bitA ^ bitB); 
    }

    setResults({
      rawA: binA, 
      rawB: binB,
      inputA: formatBinary(binA),
      inputB: formatBinary(binB),
      or: formatBinary(resOR),
      and: formatBinary(resAND),
      xor: formatBinary(resXOR)
    });
    
    // Default to explaining the OR operation first
    setActiveExplanation('OR');
  };

  // --- DYNAMIC EXPLANATION GENERATOR ---
  const renderExplanation = () => {
    if (!activeExplanation || !results) return null;

    let title, ruleText, iconColor;

    if (activeExplanation === 'OR') {
      title = "Bitwise OR (|)";
      ruleText = "Looks at each column. If AT LEAST ONE bit is a 1, the result drops down a 1. It only drops a 0 if BOTH top and bottom are 0.";
      iconColor = "#2D7FF9";
    } else if (activeExplanation === 'AND') {
      title = "Bitwise AND (&)";
      ruleText = "Looks at each column. The result drops a 1 ONLY IF both the top AND bottom bits are 1. Otherwise, it drops a 0. (Used for Masking).";
      iconColor = "#7B61FF";
    } else if (activeExplanation === 'XOR') {
      title = "Bitwise XOR (^)";
      ruleText = "Looks at each column. If the bits are DIFFERENT (a 1 and a 0), it drops a 1. If they are the same (both 0s or both 1s), it drops a 0. (Used for Toggling).";
      iconColor = "#F25487";
    }

    return (
      <View style={[styles.explanationBox, { borderLeftColor: iconColor }]}>
         <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 5}}>
            <Ionicons name="information-circle" size={18} color={iconColor} />
            <Text style={[styles.explanationTitle, {color: iconColor}]}>{title} Rules</Text>
         </View>
         <Text style={styles.explanationText}>{ruleText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bitwise Calculator</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        
        {/* ✅ GUIDELINES CARD */}
        <View style={styles.guidelinesCard}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                <Ionicons name="information-circle" size={22} color="#0284c7" />
                <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Binary Only:</Text> This calculator strictly accepts 0s and 1s.</Text>
            <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Padding:</Text> If one string is shorter than the other, the system automatically pads the left side with zeroes to align them.</Text>
        </View>

        {/* 📚 THEORY CARD */}
        <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
          <Ionicons name="book" size={20} color="#104a28" />
          <Text style={styles.theoryToggleText}>Learn Bitwise Logic</Text>
          <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
        </TouchableOpacity>
        
        {showTheory && (
          <View style={styles.theoryCard}>
            <Text style={styles.theoryText}>Bitwise operations compare binary numbers <Text style={{fontWeight: 'bold'}}>column by column</Text>, moving from left to right.</Text>
            <View style={styles.divider} />
            <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>AND (&):</Text> 1 & 1 = 1. All other combinations = 0.</Text>
            <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>OR (|):</Text> 0 | 0 = 0. All other combinations = 1.</Text>
            <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>XOR (^):</Text> 1 ^ 0 = 1. 0 ^ 1 = 1. Matching pairs = 0.</Text>
          </View>
        )}

        {/* ✅ PRESET EXAMPLES */}
        <Text style={styles.sectionHeader}>Try a Preset Combination</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
            <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('1010', '1100')}>
                <Ionicons name="git-compare-outline" size={16} color="#b45309" />
                <Text style={styles.exampleBtnText}>Basic Logic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('11110000', '10101010')}>
                <Ionicons name="funnel-outline" size={16} color="#b45309" />
                <Text style={styles.exampleBtnText}>Subnet Masking</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('10101010', '11111111')}>
                <Ionicons name="swap-vertical-outline" size={16} color="#b45309" />
                <Text style={styles.exampleBtnText}>Bit Toggling (XOR)</Text>
            </TouchableOpacity>
        </ScrollView>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Input Binary Strings</Text>
          
          {/* INPUT A */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Binary String A</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. 1010" 
              placeholderTextColor="#ccc"
              value={valA}
              onChangeText={(text) => handleInput(text, setValA)} 
              keyboardType="number-pad"
              maxLength={16} 
            />
          </View>

          {/* INPUT B */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Binary String B</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. 0011" 
              placeholderTextColor="#ccc"
              value={valB}
              onChangeText={(text) => handleInput(text, setValB)}
              keyboardType="number-pad"
              maxLength={16}
            />
          </View>

          {/* CALCULATE BUTTON */}
          <TouchableOpacity style={styles.calcBtn} onPress={calculateBitwise}>
            <Text style={styles.btnText}>COMPUTE LOGIC</Text>
          </TouchableOpacity>
        </View>

        {/* RESULTS CARD */}
        {results && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>CALCULATION RESULTS</Text>
            <Text style={styles.tapHint}>(Tap any highlighted row for an explanation)</Text>
            
            <View style={styles.codeBlock}>
              
              {/* Inputs aligned */}
              <View style={styles.row}>
                <Text style={styles.monoText}>{results.inputA}</Text>
                <Text style={styles.annotation}>  (Input A)</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.monoText}>{results.inputB}</Text>
                <Text style={styles.annotation}>  (Input B)</Text>
              </View>
              
              <View style={styles.thickDivider} />

              {/* Clickable Result Rows */}
              <TouchableOpacity style={[styles.rowBtn, activeExplanation === 'OR' && styles.activeRow]} onPress={() => setActiveExplanation('OR')}>
                <Text style={[styles.monoText, {color: '#2D7FF9'}]}>{results.or}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.annotation}>  bitwise OR  </Text>
                  <Ionicons name="information-circle" size={16} color="#2D7FF9" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.rowBtn, activeExplanation === 'AND' && styles.activeRow]} onPress={() => setActiveExplanation('AND')}>
                <Text style={[styles.monoText, {color: '#7B61FF'}]}>{results.and}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.annotation}>  bitwise AND  </Text>
                  <Ionicons name="information-circle" size={16} color="#7B61FF" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.rowBtn, activeExplanation === 'XOR' && styles.activeRow]} onPress={() => setActiveExplanation('XOR')}>
                <Text style={[styles.monoText, {color: '#F25487'}]}>{results.xor}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.annotation}>  bitwise XOR  </Text>
                  <Ionicons name="information-circle" size={16} color="#F25487" />
                </View>
              </TouchableOpacity>

            </View>

            {/* ✅ DYNAMIC EXPLANATION BOX */}
            {renderExplanation()}

          </View>
        )}

      </ScrollView>
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
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  content: { padding: 20, paddingBottom: 50 },

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
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 10 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },

  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#4b5563', marginBottom: 6, textTransform: 'uppercase' },
  input: { 
    backgroundColor: '#f9fafb', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#d1d5db', 
    fontSize: 20, color: '#111', fontWeight: 'bold', letterSpacing: 3, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace'
  },

  calcBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },

  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#eee', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  resultTitle: { fontSize: 16, fontWeight: '900', color: '#333', textAlign: 'center' },
  tapHint: { fontSize: 12, color: '#64748b', textAlign: 'center', marginBottom: 20, fontStyle: 'italic' },
  
  codeBlock: { alignSelf: 'center', width: '100%', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, width: '100%', justifyContent: 'center' },
  rowBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, width: '100%', justifyContent: 'center' }, 
  activeRow: { backgroundColor: '#f1f5f9' },

  monoText: { 
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#111',
    letterSpacing: 2
  },
  annotation: { fontSize: 13, color: '#64748b', fontWeight: '600', fontStyle: 'italic' },
  
  thickDivider: { height: 2, backgroundColor: '#333', marginVertical: 15, width: '90%' },

  explanationBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, marginTop: 15, borderLeftWidth: 4 },
  explanationTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  explanationText: { fontSize: 13, color: '#4b5563', lineHeight: 20 }
});