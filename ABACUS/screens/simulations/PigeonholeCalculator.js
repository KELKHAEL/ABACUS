import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PigeonholeCalculator({ navigation }) {
  const [items, setItems] = useState('');
  const [containers, setContainers] = useState('');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT NUMERIC VALIDATION: Only positive whole numbers
  const handleInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9]/g, '');
    setter(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (nVal, kVal) => {
    setItems(nVal.toString());
    setContainers(kVal.toString());
    setResult(null); // Clear previous results
  };

  const calculate = () => {
    Keyboard.dismiss();
    
    if (!items || !containers) {
        Alert.alert("Required", "Please enter values for both Pigeons (Items) and Holes (Containers).");
        return;
    }

    const n = parseInt(items, 10); // Pigeons
    const k = parseInt(containers, 10); // Holes

    if (isNaN(n) || isNaN(k) || n < 1 || k < 1) {
      Alert.alert("Input Error", "Please enter valid positive whole numbers.");
      return;
    }

    if (n > 999999999 || k > 999999999) {
        Alert.alert("Hardware Limit", "Numbers are too large. Please keep values under 1 Billion.");
        return;
    }

    const minGuaranteed = Math.ceil(n / k);

    setResult({ n, k, minGuaranteed });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pigeonhole Principle</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> This calculator strictly accepts positive integers (you cannot have half a pigeon or half a hole).</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Items (N):</Text> The total number of objects you are distributing.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Containers (k):</Text> The available slots, boxes, or categories to put the items in.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Principle</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>

          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>
                If you have <Text style={{fontWeight: 'bold'}}>N</Text> pigeons and <Text style={{fontWeight: 'bold'}}>k</Text> pigeonholes, and N {'>'} k, then at least one hole must contain more than one pigeon.
              </Text>
              <View style={styles.divider} />
              <Text style={styles.theoryTitle}>The Generalized Formula:</Text>
              <Text style={styles.formulaText}>⌈ N / k ⌉</Text>
              <Text style={styles.theoryText}>
                The mathematical brackets ⌈x⌉ represent the <Text style={{fontWeight:'bold'}}>Ceiling Function</Text>. This means you always round UP to the next whole number. Even if the division is 2.01, you round up to 3!
              </Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Real-World Scenario</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(10, 9)}>
                  <Ionicons name="bird-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Basic Pigeons (10 into 9)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(367, 365)}>
                  <Ionicons name="calendar-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Birthday Match (367 people)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample(20, 4)}>
                  <Ionicons name="color-palette-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Hair Colors (20 people, 4 colors)</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate Guarantee</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Items (Pigeons / N)</Text>
              <TextInput 
                style={styles.input} 
                keyboardType="number-pad" 
                value={items} 
                onChangeText={(t) => handleInput(t, setItems)} 
                placeholder="e.g. 10" 
                maxLength={9}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Containers (Holes / k)</Text>
              <TextInput 
                style={styles.input} 
                keyboardType="number-pad" 
                value={containers} 
                onChangeText={(t) => handleInput(t, setContainers)} 
                placeholder="e.g. 3" 
                maxLength={9}
              />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={calculate}>
              <Text style={styles.calcButtonText}>Prove It</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT CARD */}
          {result && (
            <View style={styles.resultCard}>
              
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10}}>
                 <Ionicons name="checkmark-circle" size={22} color="#ea580c" />
                 <Text style={styles.resultTitle}>The Proof</Text>
              </View>
              
              <View style={styles.proofBox}>
                  <Text style={styles.proofText}>
                      If you distribute {result.n} items into {result.k} containers, <Text style={{color: '#c2410c', fontWeight: 'bold'}}>at least one container</Text> is mathematically guaranteed to hold:
                  </Text>
                  <Text style={styles.resultHighlight}>{result.minGuaranteed} items</Text>
              </View>

              <View style={styles.divider} />
              
              <Text style={styles.stepTitle}>Mathematical Breakdown:</Text>
              <Text style={styles.mathStep}>Formula = ⌈ N ÷ k ⌉</Text>
              <Text style={styles.mathStep}>Division = {result.n} ÷ {result.k} = {(result.n / result.k).toFixed(4)}</Text>
              
              {/* Ceiling Explanation */}
              <View style={styles.explanationBox}>
                  <Ionicons name="arrow-up-circle-outline" size={20} color="#b45309" style={{marginTop: 2}}/>
                  <Text style={styles.explanationText}>
                      <Text style={{fontWeight: 'bold', color: '#78350f'}}>The Ceiling Effect:</Text> Because the division is {(result.n / result.k).toFixed(4)}, the ceiling function ⌈ ⌉ forces us to round up to the next whole number. Even if the decimal is tiny, it represents an extra item that MUST be placed into an already-occupied container!
                  </Text>
              </View>
              
              <Text style={[styles.mathStep, {backgroundColor: '#ffedd5', color: '#c2410c', fontWeight: 'bold'}]}>
                  Final Ceiling ⌈{(result.n / result.k).toFixed(4)}⌉ = {result.minGuaranteed}
              </Text>

              <View style={styles.divider} />

              <Text style={styles.stepTitle}>Real World Context:</Text>
              <Text style={styles.exampleText}>
                  Imagine you have {result.n} socks, and you are throwing them blindly into {result.k} drawers. 
                  Because {result.n} socks won't fit perfectly evenly into {result.k} drawers, you are absolutely guaranteed that when you open the drawers later, at least one drawer will have <Text style={{fontWeight: 'bold'}}>{result.minGuaranteed}</Text> socks inside it!
              </Text>

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

  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f2fe', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#0369a1', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#bae6fd' },
  theoryTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1', marginBottom: 5 },
  theoryText: { fontSize: 14, color: '#334155', lineHeight: 22 },
  formulaText: { fontSize: 22, fontFamily: 'monospace', color: '#0369a1', textAlign: 'center', marginVertical: 10, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#64748b', marginBottom: 5, textTransform: 'uppercase' },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 15, borderRadius: 8, fontSize: 18, textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontWeight: 'bold', color: '#111' },
  
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#f97316' },
  resultTitle: { fontSize: 16, fontWeight: 'bold', color: '#ea580c', textTransform: 'uppercase' },
  
  proofBox: { backgroundColor: '#fff7ed', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#fed7aa' },
  proofText: { fontSize: 15, color: '#431407', lineHeight: 22, textAlign: 'center' },
  resultHighlight: { fontSize: 32, fontWeight: '900', color: '#c2410c', textAlign: 'center', marginTop: 10 },
  
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  mathStep: { fontSize: 15, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', color: '#334155', backgroundColor: '#f1f5f9', padding: 10, borderRadius: 6, marginVertical: 3 },
  
  explanationBox: { flexDirection: 'row', backgroundColor: '#fefce8', padding: 15, borderRadius: 8, marginVertical: 10, gap: 10, borderWidth: 1, borderColor: '#fef08a' },
  explanationText: { flex: 1, fontSize: 13, color: '#92400e', lineHeight: 20 },

  exampleText: { fontSize: 14, color: '#4b5563', lineHeight: 22, fontStyle: 'italic', backgroundColor: '#f8fafc', padding: 15, borderRadius: 8 }
});