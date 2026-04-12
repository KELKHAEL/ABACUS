import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProbabilitySimulation({ navigation }) {
  const [activeTab, setActiveTab] = useState('Single');
  const [showTheory, setShowTheory] = useState(false);
  
  // --- STATE VARIABLES ---
  const [singleTotal, setSingleTotal] = useState('');
  const [singleFav, setSingleFav] = useState('');
  
  const [probA, setProbA] = useState('');
  const [probB, setProbB] = useState('');
  
  const [multiProb, setMultiProb] = useState('');
  const [multiN, setMultiN] = useState('');

  const [resultData, setResultData] = useState(null);

  // ✅ STRICT INPUT FORMATTING: Allows decimals, strips letters, auto-prepends '0' if starting with '.'
  const handleDecimalInput = (text, setter) => {
    let cleanText = text.replace(/[^0-9.]/g, ''); // Keep numbers and decimals only
    
    // Prevent multiple decimals
    const parts = cleanText.split('.');
    if (parts.length > 2) {
      cleanText = parts[0] + '.' + parts.slice(1).join('');
    }

    // Auto-pad with 0 if starting with a decimal point
    if (cleanText.startsWith('.')) {
        cleanText = '0' + cleanText;
    }
    
    setter(cleanText);
  };

  const handleIntInput = (text, setter) => {
    const cleanText = text.replace(/[^0-9]/g, ''); // Whole numbers only
    setter(cleanText);
  };

  // ✅ PRESET SCENARIOS
  const loadExample = (type, params) => {
      setResultData(null);
      if (type === 'Single') {
          setSingleFav(params.fav);
          setSingleTotal(params.total);
      } else if (type === 'Two') {
          setProbA(params.pa);
          setProbB(params.pb);
      } else if (type === 'Multiple') {
          setMultiProb(params.p);
          setMultiN(params.n);
      }
  };

  const formatNum = (num) => {
    if (num === 0) return "0";
    if (num === 1) return "1";
    // If it's very small but not zero, use exponential
    if (num < 0.0001) return num.toExponential(4);
    return num.toFixed(4);
  };

  const calcSingle = () => {
    Keyboard.dismiss();
    const total = parseFloat(singleTotal);
    const fav = parseFloat(singleFav);

    if (isNaN(total) || isNaN(fav)) { Alert.alert("Required", "Please enter valid numeric values for both fields."); return; }
    if (fav > total) { Alert.alert("Logic Error", "Favorable outcomes (n) cannot be greater than the Total possible outcomes (N)."); return; }
    if (total === 0) { Alert.alert("Math Error", "Total possible outcomes cannot be zero."); return; }

    const p = fav / total;
    const pNot = 1 - p;

    setResultData({
      type: 'Single',
      p: formatNum(p),
      pNot: formatNum(pNot),
      percent: (p * 100).toFixed(1) + '%',
      explanation: `Formula: P(A) = Favorable / Total\n\nCalculation: ${fav} ÷ ${total} = ${p.toFixed(4)}\n\nConclusion: There is a ${(p*100).toFixed(1)}% chance of this specific event happening, and a ${(pNot*100).toFixed(1)}% chance that it DOES NOT happen.`
    });
  };

  const calcTwo = () => {
    Keyboard.dismiss();
    
    // Auto-format naked decimals if they sneak through
    let paClean = probA;
    let pbClean = probB;
    if (paClean === '.') paClean = '0.';
    if (pbClean === '.') pbClean = '0.';

    const pa = parseFloat(paClean);
    const pb = parseFloat(pbClean);

    if (isNaN(pa) || isNaN(pb)) { Alert.alert("Required", "Please enter valid probabilities for both events."); return; }
    if (pa < 0 || pa > 1 || pb < 0 || pb > 1) { Alert.alert("Logic Error", "A probability must always be between 0 (impossible) and 1 (certain)."); return; }

    const intersection = pa * pb; 
    const union = pa + pb - intersection; 
    const onlyA = pa * (1 - pb); 
    const onlyB = pb * (1 - pa); 
    const neither = (1 - pa) * (1 - pb); 

    setResultData({
      type: 'Two',
      inter: formatNum(intersection),
      union: formatNum(union),
      onlyA: formatNum(onlyA),
      onlyB: formatNum(onlyB),
      neither: formatNum(neither),
      explanation: `Assuming these events are INDEPENDENT (one does not affect the other):\n\n• BOTH Occur (Intersection):\n  P(A) × P(B) = ${pa} × ${pb} = ${intersection.toFixed(4)}\n\n• EITHER Occurs (Union):\n  Since they can overlap, we add them and subtract the intersection so we don't double-count:\n  ${pa} + ${pb} - ${intersection.toFixed(4)} = ${union.toFixed(4)}`
    });
  };

  const calcMulti = () => {
    Keyboard.dismiss();
    
    let pClean = multiProb;
    if (pClean === '.') pClean = '0.';
    
    const p = parseFloat(pClean);
    const n = parseInt(multiN);

    if (isNaN(p) || isNaN(n)) { Alert.alert("Required", "Please enter valid numbers for both fields."); return; }
    if (p < 0 || p > 1) { Alert.alert("Logic Error", "Probability must be between 0 and 1."); return; }
    
    if (n < 1 || n > 1000) { 
      Alert.alert("Hardware Limit Reached", "Please keep the number of trials between 1 and 1000 to prevent the app from crashing."); 
      return; 
    }

    const allOccur = Math.pow(p, n);
    const noneOccur = Math.pow(1 - p, n);
    const atLeastOnce = 1 - noneOccur;

    setResultData({
      type: 'Multiple',
      all: formatNum(allOccur),
      none: formatNum(noneOccur),
      atLeast: formatNum(atLeastOnce),
      explanation: `Calculating for ${n} consecutive, independent trials:\n\n• Occurs EVERY Time:\n  Multiply the probability by itself ${n} times.\n  P(A)^n = ${p}^${n} = ${formatNum(allOccur)}\n\n• NEVER Occurs:\n  The probability of failing (${(1-p).toFixed(2)}) happening ${n} times in a row.\n  (1 - P(A))^n = ${(1-p).toFixed(2)}^${n} = ${formatNum(noneOccur)}`
    });
  };

  const ResultRow = ({ label, value, sub }) => (
    <View style={styles.resRow}>
      <View style={styles.resLabelContainer}>
        <Text style={styles.resLabel}>{label}</Text>
        {sub && <Text style={styles.resHint}>{sub}</Text>}
      </View>
      <Text style={styles.resValue}>{value}</Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Single':
        return (
          <View>
            <View style={styles.guidelinesCard}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                    <Ionicons name="information-circle" size={22} color="#0284c7" />
                    <Text style={styles.guidelinesTitle}>Single Event Guidelines</Text>
                </View>
                <Text style={styles.guidelinesText}>• Use <Text style={{fontWeight: 'bold'}}>Whole Numbers</Text> only.</Text>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Total (N):</Text> Every possible outcome that could happen.</Text>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Favorable (n):</Text> The specific outcomes you want to measure.</Text>
            </View>

            <Text style={styles.sectionHeader}>Try a Preset Scenario</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('Single', {total: '6', fav: '1'})}>
                    <Ionicons name="cube-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Rolling a '4' on a Die</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('Single', {total: '52', fav: '13'})}>
                    <Ionicons name="layers-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Drawing a Heart</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.card}>
              <Text style={styles.inputHeader}>SINGLE EVENT INPUTS</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Total Possible Outcomes (N)</Text>
                <TextInput style={styles.input} placeholder="e.g. 52" keyboardType="number-pad" value={singleTotal} onChangeText={(t) => handleIntInput(t, setSingleTotal)} maxLength={5} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Favorable Outcomes (n)</Text>
                <TextInput style={styles.input} placeholder="e.g. 4" keyboardType="number-pad" value={singleFav} onChangeText={(t) => handleIntInput(t, setSingleFav)} maxLength={5} />
              </View>
              <TouchableOpacity style={styles.calcBtn} onPress={calcSingle}><Text style={styles.btnText}>Calculate Probability</Text></TouchableOpacity>
            </View>
          </View>
        );
      case 'Two':
        return (
          <View>
            <View style={styles.guidelinesCard}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                    <Ionicons name="information-circle" size={22} color="#0284c7" />
                    <Text style={styles.guidelinesTitle}>Two Events Guidelines</Text>
                </View>
                <Text style={styles.guidelinesText}>• Use <Text style={{fontWeight: 'bold'}}>Decimals</Text> (e.g. 0.5 for 50%). Typing .5 will automatically format to 0.5.</Text>
                <Text style={styles.guidelinesText}>• Values must be between <Text style={{fontWeight: 'bold'}}>0.0 and 1.0</Text>.</Text>
                <Text style={styles.guidelinesText}>• This calculates independent events (Event A does not affect Event B).</Text>
            </View>

            <Text style={styles.sectionHeader}>Try a Preset Scenario</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('Two', {pa: '0.5', pb: '0.5'})}>
                    <Ionicons name="cash-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Flipping Two Coins</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('Two', {pa: '0.8', pb: '0.3'})}>
                    <Ionicons name="cloudy-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Weather (80% Rain, 30% Wind)</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.card}>
              <Text style={styles.inputHeader}>INDEPENDENT EVENTS INPUTS</Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{flex: 1}}>
                  <Text style={styles.label}>Prob. Event A</Text>
                  <TextInput style={styles.input} placeholder="0.5" keyboardType="numeric" value={probA} onChangeText={(t) => handleDecimalInput(t, setProbA)} maxLength={6} />
                </View>
                <View style={{flex: 1}}>
                  <Text style={styles.label}>Prob. Event B</Text>
                  <TextInput style={styles.input} placeholder="0.4" keyboardType="numeric" value={probB} onChangeText={(t) => handleDecimalInput(t, setProbB)} maxLength={6} />
                </View>
              </View>
              <TouchableOpacity style={styles.calcBtn} onPress={calcTwo}><Text style={styles.btnText}>Calculate Interactions</Text></TouchableOpacity>
            </View>
          </View>
        );
      case 'Multiple':
        return (
          <View>
            <View style={styles.guidelinesCard}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                    <Ionicons name="information-circle" size={22} color="#0284c7" />
                    <Text style={styles.guidelinesTitle}>Series Trials Guidelines</Text>
                </View>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Probability:</Text> Must be a decimal between 0.0 and 1.0.</Text>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Trials (n):</Text> Must be a whole number. Max limit is 1,000.</Text>
            </View>

            <Text style={styles.sectionHeader}>Try a Preset Scenario</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('Multiple', {p: '0.1666', n: '5'})}>
                    <Ionicons name="cube-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Roll '6' Five Times</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('Multiple', {p: '0.99', n: '100'})}>
                    <Ionicons name="construct-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>99% Quality over 100 parts</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.card}>
              <Text style={styles.inputHeader}>SERIES / TRIALS INPUTS</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Probability of Success (0-1)</Text>
                <TextInput style={styles.input} placeholder="e.g. 0.5" keyboardType="numeric" value={multiProb} onChangeText={(t) => handleDecimalInput(t, setMultiProb)} maxLength={6} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Number of Trials (n)</Text>
                <TextInput style={styles.input} placeholder="e.g. 10" keyboardType="number-pad" value={multiN} onChangeText={(t) => handleIntInput(t, setMultiN)} maxLength={4} />
              </View>
              <TouchableOpacity style={styles.calcBtn} onPress={calcMulti}><Text style={styles.btnText}>Calculate Series</Text></TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROBABILITY SIMULATION</Text>
      </View>

      <View style={styles.tabBar}>
        {['Single', 'Two', 'Multiple'].map(t => (
          <TouchableOpacity 
            key={t} 
            style={[styles.tab, activeTab === t && styles.activeTab]} 
            onPress={() => {setActiveTab(t); setResultData(null);}}
          >
            <Text style={[styles.tabText, activeTab === t && styles.activeTabText]}>{t} Event</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {renderContent()}

        {resultData && (
          <View style={styles.resultContainer}>
            
            <View style={styles.explainBox}>
              <View style={{flexDirection:'row', marginBottom: 5, alignItems:'center'}}>
                <Ionicons name="school" size={18} color="#2D7FF9" />
                <Text style={styles.explainTitle}> Step-by-Step Logic:</Text>
              </View>
              <Text style={styles.explainText}>{resultData.explanation}</Text>
            </View>

            {activeTab === 'Single' && (
              <View style={styles.table}>
                <ResultRow label="P(A) - Probability of Event" value={resultData.p} sub={`Percentage chance: ${resultData.percent}`} />
                <ResultRow label="P(A') - Probability of NOT happening" value={resultData.pNot} sub="1.000 - P(A)" />
              </View>
            )}

            {activeTab === 'Two' && (
              <View style={styles.table}>
                <ResultRow label="Both Occur (Intersection)" sub="P(A ∩ B)" value={resultData.inter} />
                <ResultRow label="Either Occurs (Union)" sub="P(A ∪ B)" value={resultData.union} />
                <ResultRow label="Only A Occurs" sub="A happens, B fails" value={resultData.onlyA} />
                <ResultRow label="Neither Occurs" sub="P(A') × P(B')" value={resultData.neither} />
              </View>
            )}

            {activeTab === 'Multiple' && (
              <View style={styles.table}>
                <ResultRow label="Occurs EVERY time" sub="All trials successful" value={resultData.all} />
                <ResultRow label="Occurs AT LEAST once" sub="1 - P(Never)" value={resultData.atLeast} />
                <ResultRow label="NEVER occurs" sub="All trials fail" value={resultData.none} />
              </View>
            )}

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
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#333' },
  
  tabBar: { flexDirection: 'row', padding: 15, justifyContent: 'center', gap: 8, backgroundColor: 'white', elevation: 1 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#f1f5f9' },
  activeTab: { backgroundColor: '#104a28' },
  tabText: { fontWeight: 'bold', color: '#64748b', fontSize: 13 },
  activeTabText: { color: 'white' },

  content: { padding: 20, paddingBottom: 50 },
  
  guidelinesCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guidelinesTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1' },
  guidelinesText: { fontSize: 13, color: '#0f172a', marginBottom: 4, lineHeight: 18 },

  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#4b5563', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#fde68a', gap: 6 },
  exampleBtnText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },

  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  inputHeader: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 15, textTransform: 'uppercase' },

  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 5 },
  input: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#cbd5e1', fontSize: 16, color: '#111', fontWeight: 'bold' },

  calcBtn: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultContainer: { marginTop: 25 },
  explainBox: { backgroundColor: '#f0fdf4', padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bbf7d0' },
  explainTitle: { fontWeight: 'bold', color: '#166534', fontSize: 14 },
  explainText: { fontSize: 13, color: '#166534', lineHeight: 22, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', marginTop: 5 },

  table: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#e2e8f0', elevation: 2 },
  
  resRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f1f5f9',
    minHeight: 50 
  },
  resLabelContainer: { flex: 1, paddingRight: 10 },
  resLabel: { fontSize: 14, fontWeight: '600', color: '#334155', flexWrap: 'wrap' },
  resHint: { fontSize: 12, color: '#94a3b8', fontStyle: 'italic', marginTop: 4 },
  resValue: { fontSize: 18, fontWeight: '900', color: '#2D7FF9' }
});