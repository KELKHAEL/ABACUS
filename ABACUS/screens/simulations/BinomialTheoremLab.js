import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BinomialTheoremLab({ navigation }) {
  const [power, setPower] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT NUMERIC VALIDATION: Only positive whole numbers
  const handleInput = (text) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setPower(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (val) => {
    setPower(val.toString());
    setResult(null);
  };

  // Safely generates Pascal's Triangle matrix
  const generatePascal = (numRows) => {
    let triangle = [];
    for (let i = 0; i <= numRows; i++) {
      let row = new Array(i + 1).fill(1);
      for (let j = 1; j < i; j++) {
        row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
      triangle.push(row);
    }
    return triangle;
  };

  const expand = () => {
    Keyboard.dismiss();

    if (power === '') {
        Alert.alert("Required Field", "Please enter a power (n).");
        return;
    }

    const n = parseInt(power, 10);
    if (isNaN(n) || n < 0 || n > 8) {
      Alert.alert("UI Limit Reached", "Please enter a power between 0 and 8. Higher powers cause Pascal's Triangle to overflow and break the mobile screen layout.");
      return;
    }

    const triangle = generatePascal(n);
    const coeffs = triangle[n]; // Get the specific row

    let steps = [];
    let finalTerms = [];

    // Build the algebraic expansion term by term
    for (let k = 0; k <= n; k++) {
      const coeff = coeffs[k];
      const aExp = n - k;
      const bExp = k;

      // Create visual breakdown for the student
      steps.push({
          k,
          coeff,
          aExp,
          bExp,
          formula: `C(${n}, ${k}) · a^${aExp} · b^${bExp}`,
      });

      // Format the final algebra string cleanly (e.g. drop 1s and 0s)
      let termStr = "";
      if (coeff > 1 || (aExp === 0 && bExp === 0)) termStr += coeff;
      
      if (aExp > 0) termStr += `a${aExp > 1 ? `^${aExp}` : ""}`;
      if (bExp > 0) termStr += `b${bExp > 1 ? `^${bExp}` : ""}`;
      
      finalTerms.push(termStr);
    }

    setResult({ n, triangle, coeffs, expansion: finalTerms.join(" + "), steps });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pascal & Binomial</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> The exponent (n) must be a positive integer or zero.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Display Limit:</Text> The maximum power allowed is 8. Anything higher will cause the numbers in Pascal's Triangle to shrink and overlap on a phone screen.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Theorem</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                The <Text style={{fontWeight: 'bold'}}>Binomial Theorem</Text> provides a quick way to expand binomials raised to a power, like <Text style={{fontStyle: 'italic'}}>(a + b)ⁿ</Text>.
              </Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>The Two Rules:</Text>
              <Text style={styles.theoryText}>
                1. <Text style={{fontWeight: 'bold'}}>The Variables:</Text> In each term, the power of 'a' starts at 'n' and decreases to 0. The power of 'b' starts at 0 and increases to 'n'.
              </Text>
              <Text style={styles.theoryText}>
                2. <Text style={{fontWeight: 'bold'}}>The Coefficients:</Text> The numbers multiplying the variables are taken directly from the corresponding row of <Text style={{fontWeight: 'bold'}}>Pascal's Triangle</Text>!
              </Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Expansion</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(0)}>
                  <Ionicons name="ellipse-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>The Base (n=0)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(2)}>
                  <Ionicons name="layers-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Quadratic (n=2)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(3)}>
                  <Ionicons name="cube-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Cubic (n=3)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(7)}>
                  <Ionicons name="cellular-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>High Power (n=7)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Expand (a + b)ⁿ</Text>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Enter Power (n):</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="number-pad" 
                  value={power} 
                  onChangeText={handleInput} 
                  maxLength={1}
                  placeholder="3"
                />
            </View>
            
            <TouchableOpacity style={styles.calcButton} onPress={expand}>
                <Text style={styles.calcButtonText}>Generate Expansion & Triangle</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT CARD */}
          {result && (
            <View style={styles.triangleCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 15}}>
                  <Ionicons name="triangle" size={20} color="#f97316" />
                  <Text style={styles.visualTitle}>Pascal's Triangle (Rows 0 to {result.n})</Text>
              </View>
              
              {/* RENDER THE TRIANGLE */}
              <View style={styles.triangleContainer}>
                {result.triangle.map((row, i) => (
                  <View key={i} style={[styles.row, i === result.n && styles.activeRow]}>
                    <Text style={styles.rowLabel}>n={i}</Text>
                    {row.map((num, j) => (
                      <View key={j} style={[styles.numCircle, i === result.n && styles.activeCircle]}>
                        <Text style={[styles.numText, i === result.n && styles.activeNumText]}>{num}</Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.explanationBox}>
                  <Ionicons name="bulb-outline" size={24} color="#b45309" />
                  <Text style={styles.expText}>
                      To expand <Text style={{fontWeight: 'bold'}}>(a + b)^{result.n}</Text>, we pull the coefficients directly from Row <Text style={{fontWeight: 'bold'}}>{result.n}</Text> of the triangle:{"\n"}
                      <Text style={{fontWeight: '900', color: '#c2410c', fontSize: 16}}>
                        {result.coeffs.join(', ')}
                      </Text>
                  </Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.visualTitle}>Final Expansion</Text>
              <View style={styles.mathBox}>
                  <Text style={styles.expansionText}>{result.expansion}</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.visualTitle}>Term-by-Term Rules</Text>
              <Text style={styles.ruleText}>1. Coefficients (<Text style={{color: '#c2410c', fontWeight: 'bold'}}>orange</Text>) map to Pascal's Triangle.</Text>
              <Text style={styles.ruleText}>2. Power of 'a' (<Text style={{color: '#2563eb', fontWeight: 'bold'}}>blue</Text>) decreases from {result.n} to 0.</Text>
              <Text style={styles.ruleText}>3. Power of 'b' (<Text style={{color: '#16a34a', fontWeight: 'bold'}}>green</Text>) increases from 0 to {result.n}.</Text>

              {/* RENDER THE STEPS */}
              <View style={{marginTop: 15}}>
                  {result.steps.map((item, idx) => (
                      <View key={idx} style={styles.stepBox}>
                          <View style={styles.stepHeader}>
                              <Text style={styles.stepLabel}>Term {idx + 1}</Text>
                              <Text style={styles.kLabel}>(k={item.k})</Text>
                          </View>
                          <Text style={styles.mathText}>
                             <Text style={{color: '#c2410c', fontWeight: 'bold'}}>{item.coeff}</Text> · 
                             a^<Text style={{color: '#2563eb'}}>{item.aExp}</Text> · 
                             b^<Text style={{color: '#16a34a'}}>{item.bExp}</Text>
                          </Text>
                      </View>
                  ))}
              </View>

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
  theoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' },
  label: { fontSize: 15, fontWeight: 'bold', color: '#64748b' },
  input: { width: 70, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#111' },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  triangleCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, borderTopWidth: 5, borderTopColor: '#f97316' },
  visualTitle: { fontSize: 16, fontWeight: 'bold', color: '#475569' },
  
  triangleContainer: { alignItems: 'center', backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', marginTop: 5 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  rowLabel: { position: 'absolute', left: -30, fontSize: 10, color: '#94a3b8', fontWeight: 'bold' },
  activeRow: { backgroundColor: '#fff7ed', borderWidth: 1, borderColor: '#fed7aa' },
  
  numCircle: { width: 28, height: 28, backgroundColor: '#e2e8f0', borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginHorizontal: 3 },
  activeCircle: { backgroundColor: '#f97316' },
  numText: { fontSize: 12, fontWeight: 'bold', color: '#475569' },
  activeNumText: { color: 'white' },

  explanationBox: { marginTop: 15, backgroundColor: '#fefce8', padding: 15, borderRadius: 8, flexDirection: 'row', gap: 10, borderWidth: 1, borderColor: '#fef08a', alignItems: 'center' },
  expText: { flex: 1, fontSize: 13, color: '#92400e', lineHeight: 22 },
  
  mathBox: { backgroundColor: '#fff7ed', padding: 20, borderRadius: 8, borderWidth: 1, borderColor: '#ffedd5', alignItems: 'center', marginTop: 10 },
  expansionText: { fontSize: 18, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#c2410c', fontWeight: 'bold', textAlign: 'center', lineHeight: 28 },

  ruleText: { fontSize: 13, color: '#475569', marginBottom: 4, fontStyle: 'italic', marginTop: 5 },

  stepBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10 },
  stepHeader: { flexDirection: 'column' },
  stepLabel: { fontSize: 13, color: '#334155', fontWeight: 'bold' },
  kLabel: { fontSize: 11, color: '#94a3b8' },
  mathText: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 18, color: '#1e293b' },
});