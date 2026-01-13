import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PermutationSimulation({ navigation }) {
  const [valN, setValN] = useState('');
  const [valR, setValR] = useState('');
  const [results, setResults] = useState(null);

  // --- MATH ENGINE ---
  const factorial = (num) => {
    if (num < 0) return -1;
    if (num === 0) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  const getFactorialString = (num) => {
    if (num === 0) return "1";
    let parts = [];
    for (let i = num; i >= 1; i--) parts.push(i);
    return parts.join(' × ');
  };

  const calculate = () => {
    Keyboard.dismiss();
    const n = parseInt(valN);
    const r = parseInt(valR);

    // Validation
    if (isNaN(n) || isNaN(r)) {
      Alert.alert("Input Error", "Please enter valid numbers.");
      return;
    }
    if (n < 0 || r < 0) {
      Alert.alert("Math Error", "n and r must be non-negative.");
      return;
    }
    if (r > n) {
      Alert.alert("Logic Error", "r cannot be greater than n.\n(You can't choose more items than you have!)");
      return;
    }
    if (n > 15) {
       Alert.alert("Overflow Warning", "Please use n <= 15 for readable steps.");
       return;
    }

    // Calculations
    const factN = factorial(n);
    const factR = factorial(r);
    const factN_R = factorial(n - r);

    const permResult = factN / factN_R;
    const combResult = factN / (factR * factN_R);

    // Step-by-Step
    let pSteps = [];
    for (let i = 0; i < r; i++) pSteps.push(n - i);
    const pStepStr = pSteps.length > 0 ? pSteps.join(' × ') : "1";

    setResults({
      n, r,
      diff: n - r,
      perm: permResult.toLocaleString(),
      comb: combResult.toLocaleString(),
      
      // Expanded Strings for Teaching
      nExpand: getFactorialString(n),       
      nrExpand: getFactorialString(n - r),  
      rExpand: getFactorialString(r),
      rFact: factR.toLocaleString(),
      
      pFinalStep: pStepStr,                 
    });
  };

  const clear = () => {
    setValN('');
    setValR('');
    setResults(null);
  };

  // --- COMPONENT: FRACTION DISPLAY ---
  const Fraction = ({ num, den }) => (
    <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
      <Text style={styles.fractionText}>{num}</Text>
      <View style={styles.fractionLine} />
      <Text style={styles.fractionText}>{den}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PERMUTATIONS & COMBINATIONS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.conceptBox}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <Ionicons name="school-outline" size={20} color="#2D7FF9" style={{marginRight: 8}}/>
            <Text style={styles.conceptTitle}>What is that "!" symbol?</Text>
          </View>
          <Text style={styles.conceptText}>
            The symbol <Text style={{fontWeight: 'bold'}}>!</Text> is called a <Text style={{fontWeight: 'bold', color: '#2D7FF9'}}>Factorial</Text>.
            It means you multiply the number by every integer below it down to 1.
          </Text>
          <Text style={styles.conceptExample}>
            Example: 4! = 4 × 3 × 2 × 1 = 24
          </Text>
        </View>

        {/* INPUT SECTION */}
        <View style={styles.card}>
          <Text style={styles.inputTitle}>INPUT VALUES</Text>
          
          <View style={styles.inputRow}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Total Items (n)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. 5" 
                keyboardType="number-pad"
                value={valN}
                onChangeText={setValN}
              />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Chosen Items (r)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. 3" 
                keyboardType="number-pad"
                value={valR}
                onChangeText={setValR}
              />
            </View>
          </View>

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.clearBtn} onPress={clear}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.calcBtn} onPress={calculate}>
              <Text style={styles.calcText}>Calculate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* RESULTS SECTION */}
        {results && (
          <View style={{gap: 20}}>
            
            {/* PERMUTATION CARD */}
            <View style={[styles.resultCard, {borderLeftColor: '#2D7FF9'}]}>
              <Text style={styles.resTitle}>Permutations (Order Matters)</Text>
              <Text style={styles.resSubtitle}>Arranging {results.r} items from {results.n}</Text>
              
              <View style={styles.formulaBox}>
                <Text style={styles.varText}>nPr = </Text>
                <Fraction num={`${results.n}!`} den={`(${results.n} - ${results.r})!`} />
                <Text style={styles.equalsText}> = </Text>
                <Text style={[styles.mathText, {color:'#2D7FF9'}]}>{results.perm}</Text>
              </View>

              <Text style={styles.stepLabel}>Detailed Explanation:</Text>
              
              <Text style={styles.stepText}>
                1. Expand the Factorials: {"\n"}
                Top: <Text style={{color: '#2D7FF9'}}>{results.nExpand}</Text> {"\n"}
                Bottom: <Text style={{color: '#d32f2f'}}>{results.nrExpand}</Text>
              </Text>

              <Text style={styles.stepText}>
                2. Cancel out the numbers that appear on both top and bottom.
              </Text>

              <Text style={styles.stepText}>
                3. Final Calculation: {"\n"}
                <Text style={{fontWeight: 'bold', fontSize: 16}}>= {results.pFinalStep}</Text>
              </Text>
              
              <Text style={[styles.stepText, {marginTop: 5, fontWeight: 'bold', color: '#2D7FF9'}]}>
                 = {results.perm}
              </Text>
            </View>

            {/* COMBINATION CARD */}
            <View style={[styles.resultCard, {borderLeftColor: '#F25487'}]}>
              <Text style={styles.resTitle}>Combinations (Order Doesn't Matter)</Text>
              <Text style={styles.resSubtitle}>Selecting {results.r} items from {results.n}</Text>
              
              <View style={styles.formulaBox}>
                <Text style={styles.varText}>nCr = </Text>
                <Fraction num={`${results.n}!`} den={`${results.r}! × (${results.n} - ${results.r})!`} />
                <Text style={styles.equalsText}> = </Text>
                <Text style={[styles.mathText, {color:'#F25487'}]}>{results.comb}</Text>
              </View>

              <Text style={styles.stepLabel}>Detailed Explanation:</Text>
              
              <Text style={styles.stepText}>
                1. Start with the Permutation result ({results.perm}). 
                In combinations, "ABC" is the same as "CBA", so we have duplicates.
              </Text>

              <Text style={styles.stepText}>
                2. To remove duplicates, we divide by <Text style={{fontWeight:'bold'}}>r! ({results.r}!)</Text>.
              </Text>

              {/* Visual Math Breakdown */}
              <View style={{marginTop: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8}}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#555', marginBottom: 5}}>Math Breakdown:</Text>
                
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>=</Text>
                  
                  {/* The visual division: Permutations / r! */}
                  <View style={{alignItems: 'center', marginHorizontal: 10}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#2D7FF9'}}>{results.perm} (nPr)</Text>
                    <View style={{height: 2, backgroundColor: '#333', width: '100%', marginVertical: 4}} />
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{results.rExpand}</Text>
                  </View>
                </View>

                <View style={{alignItems: 'center', marginTop: 10}}>
                   <Text style={{fontSize: 14, color: '#666', fontStyle: 'italic'}}>
                     = {results.perm} ÷ {results.rFact}
                   </Text>
                   <Text style={{fontSize: 20, fontWeight: '900', color: '#F25487', marginTop: 5}}>
                     = {results.comb}
                   </Text>
                </View>
              </View>

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
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#333' },
  
  content: { padding: 20, paddingBottom: 50 },

  // Concept Box
  conceptBox: { backgroundColor: '#E3F2FD', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#BBDEFB' },
  conceptTitle: { fontWeight: 'bold', color: '#1565C0', fontSize: 14 },
  conceptText: { fontSize: 13, color: '#333', lineHeight: 20 },
  conceptExample: { marginTop: 8, fontSize: 13, fontWeight: 'bold', color: '#333', fontStyle: 'italic', backgroundColor: 'rgba(255,255,255,0.5)', padding: 8, borderRadius: 6 },

  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  inputTitle: { fontSize: 14, fontWeight: 'bold', color: '#888', marginBottom: 15, textTransform: 'uppercase' },
  
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 8 },
  input: { backgroundColor: '#F8F9FD', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#eee', fontSize: 18, fontWeight: 'bold', color: '#333' },

  btnRow: { flexDirection: 'row', gap: 10 },
  clearBtn: { flex: 1, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  clearText: { fontWeight: 'bold', color: '#666' },
  calcBtn: { flex: 2, padding: 15, borderRadius: 8, backgroundColor: '#104a28', alignItems: 'center' },
  calcText: { fontWeight: 'bold', color: '#fff' },

  // Result Styling
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, borderLeftWidth: 5, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  resTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  resSubtitle: { fontSize: 12, color: '#888', fontStyle: 'italic', marginBottom: 15 },
  
  formulaBox: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8, marginBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' },
  
  mathText: { fontSize: 24, fontWeight: '900', letterSpacing: 1 },
  varText: { fontSize: 16, fontWeight: 'bold', color: '#555' },
  equalsText: { fontSize: 20, fontWeight: 'bold', color: '#333' },

  // Fraction Styles
  fractionText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  fractionLine: { height: 2, backgroundColor: '#333', width: '100%', marginVertical: 4 },
  
  stepLabel: { fontSize: 13, fontWeight: 'bold', color: '#000', marginBottom: 8, textDecorationLine: 'underline' },
  stepText: { fontSize: 14, color: '#444', lineHeight: 22, marginBottom: 8 }
});