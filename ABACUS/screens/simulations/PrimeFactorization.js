import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrimeFactorization({ navigation }) {
  const [inputNum, setInputNum] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT NUMERIC VALIDATION: Only positive whole numbers
  const handleInput = (text) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setInputNum(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (num) => {
    setInputNum(num.toString());
    setResult(null); // Clear old results to prompt recalculation
  };

  const calculateFactors = () => {
    Keyboard.dismiss();
    let n = parseInt(inputNum);
    
    if (isNaN(n) || n <= 1) {
      Alert.alert("Invalid Input", "Please enter a positive whole integer greater than 1.");
      return;
    }
    
    if (n > 999999999) {
        Alert.alert("Hardware Limit Reached", "Number is too large. Please enter a number under 1 Billion to prevent the app from crashing.");
        return;
    }

    const originalN = n;
    const steps = [];
    const factorCounts = {};

    // Standard Prime Factorization Algorithm
    let divisor = 2;
    while (n >= 2) {
      if (n % divisor === 0) {
        steps.push({ current: n, divisor: divisor, next: n / divisor });
        factorCounts[divisor] = (factorCounts[divisor] || 0) + 1;
        n = n / divisor;
      } else {
        divisor++;
        // Optimization: If divisor exceeds square root of remaining n, n itself is prime
        if (divisor * divisor > n && n > 1) {
            steps.push({ current: n, divisor: n, next: 1 });
            factorCounts[n] = (factorCounts[n] || 0) + 1;
            break;
        }
      }
    }

    // Format the final exponential string
    const expString = Object.keys(factorCounts).map(prime => {
        const power = factorCounts[prime];
        return power > 1 ? `${prime}^${power}` : `${prime}`;
    }).join(' × ');

    setResult({
        original: originalN,
        steps,
        factors: factorCounts,
        expString,
        isPrime: steps.length === 1 && steps[0].divisor === originalN
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prime Factorization</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> This calculator strictly accepts positive whole numbers.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Constraints:</Text> The number must be greater than 1, and less than 1,000,000,000.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>What is it?</Text> Prime factorization breaks down a composite number into the basic prime numbers that multiply together to make it.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Theory</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryTitle}>Fundamental Theorem of Arithmetic</Text>
              <Text style={styles.theoryText}>
                Every integer greater than 1 is either a prime number itself, or it can be represented as a unique product of prime numbers.
              </Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}>
                <Text style={{fontWeight: 'bold'}}>The Algorithm:</Text>{"\n"}
                1. Start dividing the number by the smallest prime (2).{"\n"}
                2. If it divides evenly, keep dividing by 2 until it doesn't.{"\n"}
                3. Move to the next prime (3, 5, 7...) and repeat.{"\n"}
                4. Stop when your final result is 1.
              </Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(36)}>
                  <Ionicons name="apps-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Basic Composite (36)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(210)}>
                  <Ionicons name="git-merge-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Mixed Primes (210)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(1024)}>
                  <Ionicons name="server-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Power of Two (1024)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(97)}>
                  <Ionicons name="shield-checkmark-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Prime Number (97)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Find Prime Factors</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Integer (N {'>'} 1)</Text>
              <TextInput 
                style={styles.input} 
                keyboardType="number-pad" 
                value={inputNum} 
                onChangeText={handleInput} 
                placeholder="e.g. 360" 
                maxLength={9}
              />
            </View>
            <TouchableOpacity style={styles.calcButton} onPress={calculateFactors}>
              <Text style={styles.calcButtonText}>Factorize</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT CARD */}
          {result && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Final Answer</Text>
              
              {result.isPrime ? (
                  <View style={styles.primeBadge}>
                      <Ionicons name="shield-checkmark" size={24} color="#ca8a04" style={{marginBottom: 5}} />
                      <Text style={styles.primeBadgeText}>{result.original} is a Prime Number!</Text>
                      <Text style={styles.primeSubText}>It can only be divided by 1 and itself.</Text>
                  </View>
              ) : (
                  <Text style={styles.resultHighlight}>{result.original} = {result.expString}</Text>
              )}

              <View style={styles.divider} />
              
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10}}>
                 <Ionicons name="git-branch" size={18} color="#333" />
                 <Text style={styles.stepTitle}>Division Steps (Factor Tree):</Text>
              </View>
              
              <View style={styles.tableWrapper}>
                  <View style={styles.tableHeaderRow}>
                      <Text style={[styles.tableColHeader, { flex: 1.5 }]}>Current</Text>
                      <Text style={[styles.tableColHeader, { flex: 1 }]}>÷ Prime</Text>
                      <Text style={[styles.tableColHeader, { flex: 1.5, borderRightWidth: 0 }]}>Remainder</Text>
                  </View>
                  
                  {result.steps.map((step, idx) => (
                      <View key={idx} style={styles.tableRow}>
                          <Text style={[styles.tableCol, { flex: 1.5 }]}>{step.current}</Text>
                          <Text style={[styles.tableCol, styles.highlightCol, { flex: 1 }]}>÷ {step.divisor}</Text>
                          <Text style={[styles.tableCol, { flex: 1.5, borderRightWidth: 0, fontWeight: step.next === 1 ? 'bold' : 'normal', color: step.next === 1 ? '#10b981' : '#333' }]}>{step.next}</Text>
                      </View>
                  ))}
              </View>
              
              {!result.isPrime && (
                  <View style={styles.explanationBox}>
                      <Ionicons name="bulb-outline" size={20} color="#b45309" style={{marginTop: 2}}/>
                      <Text style={styles.explanationText}>
                          <Text style={{fontWeight: 'bold', color: '#78350f'}}>How this works:</Text> We continuously divided the number by the smallest possible primes (shown in the middle yellow column) until we reached a remainder of 1. Grouping those primes together forms our exponential answer: {result.expString}.
                      </Text>
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
  container: { flex: 1, backgroundColor: '#f8f9fa' },
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
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#6b7280', marginBottom: 5 },
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontSize: 18, textAlign: 'center', color: '#111', fontWeight: 'bold' },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#f59e0b' },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' },
  resultHighlight: { fontSize: 24, fontWeight: '900', color: '#104a28', textAlign: 'center', marginVertical: 10, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  
  primeBadge: { backgroundColor: '#fefce8', borderColor: '#fef08a', borderWidth: 1, padding: 15, borderRadius: 8, marginVertical: 10, alignItems: 'center' },
  primeBadgeText: { color: '#ca8a04', fontWeight: 'bold', fontSize: 16 },
  primeSubText: { color: '#a16207', fontSize: 12, marginTop: 4, fontStyle: 'italic' },
  
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },

  tableWrapper: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, overflow: 'hidden' },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  tableColHeader: { padding: 12, textAlign: 'center', fontWeight: 'bold', color: '#475569', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  tableCol: { padding: 12, textAlign: 'center', borderRightWidth: 1, borderRightColor: '#e2e8f0', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 15 },
  highlightCol: { backgroundColor: '#fffbeb', color: '#b45309', fontWeight: 'bold' },
  
  explanationBox: { flexDirection: 'row', backgroundColor: '#fffbeb', padding: 15, borderRadius: 8, marginTop: 15, gap: 10, borderWidth: 1, borderColor: '#fef08a' },
  explanationText: { flex: 1, fontSize: 13, color: '#92400e', lineHeight: 20 }
});