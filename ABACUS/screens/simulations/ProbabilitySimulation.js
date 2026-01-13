import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProbabilitySimulation({ navigation }) {
  const [activeTab, setActiveTab] = useState('Single');
  
  // --- STATE VARIABLES ---
  const [singleTotal, setSingleTotal] = useState('');
  const [singleFav, setSingleFav] = useState('');
  
  const [probA, setProbA] = useState('');
  const [probB, setProbB] = useState('');
  
  const [multiProb, setMultiProb] = useState('');
  const [multiN, setMultiN] = useState('');

  const [resultData, setResultData] = useState(null);

  const formatNum = (num) => {
    if (num === 0) return "0";
    if (num === 1) return "1";
    // If it's very small but not zero, use exponential
    if (num < 0.0001) return num.toExponential(4);
    return num.toFixed(5);
  };

  const calcSingle = () => {
    Keyboard.dismiss();
    const total = parseFloat(singleTotal);
    const fav = parseFloat(singleFav);

    if (isNaN(total) || isNaN(fav)) { Alert.alert("Error", "Enter valid numbers."); return; }
    if (fav > total) { Alert.alert("Logic Error", "Favorable outcomes cannot exceed Total."); return; }
    if (total === 0) { Alert.alert("Math Error", "Total outcomes cannot be zero."); return; }

    const p = fav / total;
    const pNot = 1 - p;

    setResultData({
      type: 'Single',
      p: formatNum(p),
      pNot: formatNum(pNot),
      percent: (p * 100).toFixed(2) + '%',
      explanation: `Formula: P(A) = Favorable / Total\n\nCalculation: ${fav} ÷ ${total} = ${p.toFixed(4)}\n\nThis means there is a ${(p*100).toFixed(1)}% chance of this event happening.`
    });
  };

  const calcTwo = () => {
    Keyboard.dismiss();
    const pa = parseFloat(probA);
    const pb = parseFloat(probB);

    if (isNaN(pa) || isNaN(pb)) { Alert.alert("Error", "Enter valid probabilities (0-1)."); return; }
    if (pa < 0 || pa > 1 || pb < 0 || pb > 1) { Alert.alert("Error", "Probability must be between 0 and 1."); return; }

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
      explanation: `Assuming Independent Events:\n\n1. Both Occur (Intersection):\n   P(A) × P(B) = ${pa} × ${pb} = ${intersection.toFixed(4)}\n\n2. Either Occurs (Union):\n   P(A) + P(B) - P(Both)\n   ${pa} + ${pb} - ${intersection.toFixed(4)} = ${union.toFixed(4)}`
    });
  };

  const calcMulti = () => {
    Keyboard.dismiss();
    const p = parseFloat(multiProb);
    const n = parseInt(multiN);

    if (isNaN(p) || isNaN(n)) { Alert.alert("Error", "Enter valid inputs."); return; }
    if (p < 0 || p > 1) { Alert.alert("Error", "Probability must be 0-1."); return; }
    
    // --- Increased to 1000 ---
    if (n < 1 || n > 1000) { 
      Alert.alert("Limit Reached", "Please keep trials between 1 and 1000 to prevent crashes."); 
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
      explanation: `For ${n} independent trials:\n\n1. Occurs EVERY Time:\n   P(A)^n\n   ${p}^${n} = ${formatNum(allOccur)}\n\n2. NEVER Occurs:\n   (1 - P(A))^n\n   ${(1-p).toFixed(2)}^${n} = ${formatNum(noneOccur)}`
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
          <View style={styles.card}>
            <Text style={styles.inputHeader}>SINGLE EVENT INPUTS</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total Possible Outcomes (N)</Text>
              <TextInput style={styles.input} placeholder="e.g. 52" keyboardType="numeric" value={singleTotal} onChangeText={setSingleTotal} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Favorable Outcomes (n)</Text>
              <TextInput style={styles.input} placeholder="e.g. 4" keyboardType="numeric" value={singleFav} onChangeText={setSingleFav} />
            </View>
            <TouchableOpacity style={styles.calcBtn} onPress={calcSingle}><Text style={styles.btnText}>Calculate Probability</Text></TouchableOpacity>
          </View>
        );
      case 'Two':
        return (
          <View style={styles.card}>
            <Text style={styles.inputHeader}>INDEPENDENT EVENTS INPUTS</Text>
            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Prob. Event A</Text>
                <TextInput style={styles.input} placeholder="0.5" keyboardType="numeric" value={probA} onChangeText={setProbA} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Prob. Event B</Text>
                <TextInput style={styles.input} placeholder="0.4" keyboardType="numeric" value={probB} onChangeText={setProbB} />
              </View>
            </View>
            <TouchableOpacity style={styles.calcBtn} onPress={calcTwo}><Text style={styles.btnText}>Calculate Interactions</Text></TouchableOpacity>
          </View>
        );
      case 'Multiple':
        return (
          <View style={styles.card}>
            <Text style={styles.inputHeader}>SERIES / TRIALS INPUTS</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Probability of Success (0-1)</Text>
              <TextInput style={styles.input} placeholder="0.5" keyboardType="numeric" value={multiProb} onChangeText={setMultiProb} />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Number of Trials (n)</Text>
              <TextInput style={styles.input} placeholder="e.g. 100" keyboardType="numeric" value={multiN} onChangeText={setMultiN} />
            </View>
            <TouchableOpacity style={styles.calcBtn} onPress={calcMulti}><Text style={styles.btnText}>Calculate Series</Text></TouchableOpacity>
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

      <ScrollView contentContainerStyle={styles.content}>
        {renderContent()}

        {resultData && (
          <View style={styles.resultContainer}>
            
            <View style={styles.explainBox}>
              <View style={{flexDirection:'row', marginBottom: 5, alignItems:'center'}}>
                <Ionicons name="school" size={18} color="#2D7FF9" />
                <Text style={styles.explainTitle}> How it works:</Text>
              </View>
              <Text style={styles.explainText}>{resultData.explanation}</Text>
            </View>

            {activeTab === 'Single' && (
              <View style={styles.table}>
                <ResultRow label="P(A) - Probability of Event" value={resultData.p} sub={resultData.percent} />
                <ResultRow label="P(A') - Probability of NOT happening" value={resultData.pNot} />
              </View>
            )}

            {activeTab === 'Two' && (
              <View style={styles.table}>
                <ResultRow label="Both Occur (Intersection)" sub="P(A ∩ B)" value={resultData.inter} />
                <ResultRow label="Either Occurs (Union)" sub="P(A ∪ B)" value={resultData.union} />
                <ResultRow label="Only A Occurs" sub="A happens, B fails" value={resultData.onlyA} />
                <ResultRow label="Neither Occurs" sub="P(A') * P(B')" value={resultData.neither} />
              </View>
            )}

            {activeTab === 'Multiple' && (
              <View style={styles.table}>
                <ResultRow label="Occurs EVERY time" sub="All trials successful" value={resultData.all} />
                <ResultRow label="Occurs AT LEAST once" sub="1 - (Never)" value={resultData.atLeast} />
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
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#333' },
  
  tabBar: { flexDirection: 'row', padding: 15, justifyContent: 'center', gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#eee' },
  activeTab: { backgroundColor: '#2D7FF9' },
  tabText: { fontWeight: 'bold', color: '#666', fontSize: 13 },
  activeTabText: { color: 'white' },

  content: { padding: 20, paddingBottom: 50 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  inputHeader: { fontSize: 12, fontWeight: 'bold', color: '#888', marginBottom: 15, textTransform: 'uppercase' },

  inputGroup: { marginBottom: 15 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 5 },
  input: { backgroundColor: '#F8F9FD', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#eee', fontSize: 16, color: '#333' },

  calcBtn: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultContainer: { marginTop: 25 },
  explainBox: { backgroundColor: '#E3F2FD', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#BBDEFB' },
  explainTitle: { fontWeight: 'bold', color: '#1565C0', fontSize: 14 },
  explainText: { fontSize: 13, color: '#333', lineHeight: 20, fontFamily: 'monospace' },

  table: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
  
  resRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0',
    minHeight: 50 
  },
  resLabelContainer: { flex: 1, paddingRight: 10 },
  resLabel: { fontSize: 14, fontWeight: '600', color: '#333', flexWrap: 'wrap' },
  resHint: { fontSize: 11, color: '#888', fontStyle: 'italic', marginTop: 2 },
  resValue: { fontSize: 16, fontWeight: 'bold', color: '#2D7FF9' }
});