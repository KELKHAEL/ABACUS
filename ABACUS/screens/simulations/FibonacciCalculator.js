import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FibonacciCalculator({ navigation }) {
  const [term, setTerm] = useState('');
  const [sequence, setSequence] = useState([]);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT NUMERIC VALIDATION: Only positive whole numbers
  const handleInput = (text) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setTerm(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (n) => {
    setTerm(n.toString());
    setSequence([]); // Clear previous results to prompt recalculation
  };

  const calculateFibonacci = () => {
    Keyboard.dismiss();
    
    if (term === '') {
        Alert.alert("Required", "Please enter a value for 'n'.");
        return;
    }

    const n = parseInt(term);
    if (isNaN(n) || n < 0 || n > 50) {
      Alert.alert("Limit Reached", "Please enter a whole number between 0 and 50. The sequence grows exponentially, and calculating past 50 will cause memory overflow and crash the app.");
      return;
    }

    let fib = [0];
    if (n > 0) fib.push(1);
    
    for (let i = 2; i <= n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    
    setSequence(fib);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fibonacci Sequence</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> This calculator strictly accepts positive whole integers.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Safety Limit (Max 50):</Text> Because Fibonacci numbers grow exponentially fast, 'n' is capped at 50 to prevent device lag.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="leaf" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Math & Nature</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>

          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.formulaText}>Fₙ = Fₙ₋₁ + Fₙ₋₂</Text>
              <Text style={styles.theoryText}>
                The Fibonacci sequence starts with 0 and 1. Every subsequent number is strictly the sum of the two preceding ones.
              </Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>The Golden Ratio Connection:</Text>
              <Text style={styles.theoryText}>
                As the sequence grows, if you divide a Fibonacci number by the one before it (e.g., 55 ÷ 34), the result gets closer and closer to <Text style={{fontWeight: 'bold', color: '#c2410c'}}>1.61803</Text>, known as the Golden Ratio (Phi)!
              </Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Target</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(7)}>
                  <Ionicons name="flower-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Nature's Spiral (n=7)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(15)}>
                  <Ionicons name="analytics-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Medium Growth (n=15)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(40)}>
                  <Ionicons name="star-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Golden Ratio Peak (n=40)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate up to n-th Term</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter target 'n' (Max 50):</Text>
              <TextInput 
                style={styles.input} 
                value={term} 
                onChangeText={handleInput} 
                keyboardType="number-pad" 
                placeholder="e.g. 10" 
                placeholderTextColor="#666"
                maxLength={2}
              />
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateFibonacci}>
              <Text style={styles.calcBtnText}>Generate Sequence</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT CARDS */}
          {sequence.length > 0 && (
            <View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Sequence Result</Text>
                  
                  <View style={styles.resultBanner}>
                    <Text style={styles.resultLabel}>Term F({term})</Text>
                    <Text style={styles.resultValue}>{sequence[sequence.length - 1].toLocaleString()}</Text>
                  </View>

                  <Text style={styles.subTitle}>Sequence Array:</Text>
                  <View style={styles.sequenceBox}>
                    <Text style={styles.sequenceText}>[ {sequence.join(', ')} ]</Text>
                  </View>
                </View>

                {/* VISUAL ADDITION BREAKDOWN */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Step-by-Step Addition</Text>
                    <Text style={styles.descText}>Scroll horizontally to see how each number is formed.</Text>
                    
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical: 10}}>
                        {sequence.map((num, i) => {
                            if (i === 0) return <View key={i} style={styles.stepBox}><Text style={styles.stepLabel}>F₀</Text><Text style={styles.stepNum}>{num}</Text></View>;
                            if (i === 1) return <View key={i} style={styles.stepBox}><Text style={styles.stepLabel}>F₁</Text><Text style={styles.stepNum}>{num}</Text></View>;
                            
                            return (
                                <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.mathConnector}>
                                        <Text style={styles.mathConnectorText}>+</Text>
                                    </View>
                                    <View style={styles.stepBoxActive}>
                                        <Text style={styles.stepLabelActive}>F{i}</Text>
                                        <Text style={styles.stepMath}>{sequence[i-2]} + {sequence[i-1]}</Text>
                                        <Text style={styles.stepNumActive}>= {num.toLocaleString()}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* GOLDEN RATIO ANALYSIS (Only if n >= 2) */}
                {sequence.length > 2 && (
                    <View style={styles.goldenCard}>
                        <Text style={styles.goldenTitle}>Golden Ratio Analysis</Text>
                        <Text style={styles.goldenDesc}>F({term}) ÷ F({term-1})</Text>
                        
                        <View style={styles.goldenMathBox}>
                            <Text style={styles.goldenMathText}>
                                {sequence[sequence.length - 1].toLocaleString()} ÷ {sequence[sequence.length - 2].toLocaleString()}
                            </Text>
                            <Text style={styles.goldenResult}>
                                = {(sequence[sequence.length - 1] / sequence[sequence.length - 2]).toFixed(6)}
                            </Text>
                        </View>
                        <Text style={styles.goldenNote}>Approaching Phi (1.618033...)</Text>
                    </View>
                )}

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
  theoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 13, color: '#334155', lineHeight: 22 },
  formulaText: { fontSize: 20, fontFamily: 'monospace', color: '#104a28', textAlign: 'center', marginBottom: 10, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  descText: { fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: 15 },
  
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, color: '#64748b', marginBottom: 5, fontWeight: 'bold', textTransform: 'uppercase' },
  input: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 15, fontSize: 18, backgroundColor: '#f8fafc', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', color: "#333" },
  
  calcBtn: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 16 },
  
  resultBanner: { backgroundColor: '#f0fdf4', padding: 20, borderRadius: 8, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#bbf7d0' },
  resultLabel: { color: '#166534', fontSize: 14, fontWeight: 'bold', textTransform: 'uppercase' },
  resultValue: { color: '#15803d', fontSize: 36, fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginTop: 5 },
  
  subTitle: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 8 },
  sequenceBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  sequenceText: { fontSize: 16, color: '#334155', lineHeight: 24, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold' },

  stepBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center', minWidth: 60 },
  stepLabel: { fontSize: 10, color: '#64748b', fontWeight: 'bold', marginBottom: 4 },
  stepNum: { fontSize: 16, color: '#334155', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  
  mathConnector: { paddingHorizontal: 10 },
  mathConnectorText: { fontSize: 20, color: '#cbd5e1', fontWeight: 'bold' },
  
  stepBoxActive: { backgroundColor: '#fffbeb', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#fde047', alignItems: 'center', minWidth: 90 },
  stepLabelActive: { fontSize: 10, color: '#ca8a04', fontWeight: 'bold', marginBottom: 4 },
  stepMath: { fontSize: 12, color: '#a16207', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginBottom: 4 },
  stepNumActive: { fontSize: 18, color: '#854d0e', fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  goldenCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#f59e0b' },
  goldenTitle: { fontSize: 16, fontWeight: 'bold', color: '#b45309', marginBottom: 5 },
  goldenDesc: { fontSize: 12, color: '#64748b', marginBottom: 15, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  goldenMathBox: { backgroundColor: '#fefce8', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#fef08a', alignItems: 'center' },
  goldenMathText: { fontSize: 16, color: '#854d0e', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginBottom: 5, textAlign: 'center' },
  goldenResult: { fontSize: 24, color: '#d97706', fontWeight: '900', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  goldenNote: { fontSize: 12, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: 10 }
});