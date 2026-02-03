import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RelationsLab({ navigation }) {
  const [elements, setElements] = useState([]); 
  const [pairs, setPairs] = useState([]); 
  const [newElement, setNewElement] = useState('');
  const [pairA, setPairA] = useState('');
  const [pairB, setPairB] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const loadExample = () => {
    setElements(['1', '2', '3']);
    setPairs([
      { a: '1', b: '1' }, { a: '1', b: '2' },
      { a: '2', b: '1' }, { a: '2', b: '2' },
      { a: '3', b: '3' }
    ]);
    setAnalysis(null);
  };

  const clearLab = () => {
    setElements([]);
    setPairs([]);
    setAnalysis(null);
  };

  const addElement = () => {
    const val = newElement.trim().toUpperCase();
    if (!val) { Alert.alert("Required", "Enter a value."); return; }
    if (elements.includes(val)) { Alert.alert("Error", "Duplicate element."); return; }
    setElements([...elements, val]);
    setNewElement('');
  };

  const addPair = () => {
    const a = pairA.trim().toUpperCase();
    const b = pairB.trim().toUpperCase();
    if (!a || !b) { Alert.alert("Required", "Enter both a and b."); return; }
    if (!elements.includes(a) || !elements.includes(b)) {
      Alert.alert("Error", "Element not found in Universe Set.");
      return;
    }
    if (pairs.some(p => p.a === a && p.b === b)) return;
    setPairs([...pairs, { a, b }]);
    setPairA(''); setPairB('');
  };

  const analyzeRelation = () => {
    if (elements.length === 0 || pairs.length === 0) {
        Alert.alert("Registry Error", "Ensure your Set and Relations are defined.");
        return;
    }

    let reflexive = { status: true, definition: "∀a ∈ A, (a,a) ∈ R", logs: [] };
    let symmetric = { status: true, definition: "∀a,b ∈ A, (a,b) ∈ R ⇒ (b,a) ∈ R", logs: [] };
    let transitive = { status: true, definition: "∀a,b,c ∈ A, ((a,b) ∈ R ∧ (b,c) ∈ R) ⇒ (a,c) ∈ R", logs: [] };

    // 1. Reflexive Computation
    elements.forEach(e => {
      const found = pairs.some(p => p.a === e && p.b === e);
      reflexive.logs.push({ check: `(${e},${e})`, result: found ? 'EXISTS' : 'MISSING', passed: found });
      if (!found) reflexive.status = false;
    });

    // 2. Symmetric Computation
    pairs.forEach(p => {
      const found = pairs.some(rev => rev.a === p.b && rev.b === p.a);
      symmetric.logs.push({ check: `(${p.a},${p.b}) ↔ (${p.b},${p.a})`, result: found ? 'SYMMETRIC' : 'ASYMMETRIC', passed: found });
      if (!found) symmetric.status = false;
    });

    // 3. Transitive Computation
    pairs.forEach(p1 => {
      pairs.forEach(p2 => {
        if (p1.b === p2.a) {
          const found = pairs.some(p3 => p3.a === p1.a && p3.b === p2.b);
          transitive.logs.push({ check: `(${p1.a},${p1.b})&(${p2.a},${p2.b}) → (${p1.a},${p2.b})`, result: found ? 'VALID' : 'INVALID', passed: found });
          if (!found) transitive.status = false;
        }
      });
    });

    setAnalysis({ reflexive, symmetric, transitive });
    Keyboard.dismiss();
  };

  const PropertySection = ({ title, data }) => (
    <View style={styles.propCard}>
      <View style={styles.propHeader}>
        <Text style={styles.propTitle}>{title}</Text>
        <Text style={[styles.propStatus, { color: data.status ? '#2e7d32' : '#c62828' }]}>
          {data.status ? 'SATISFIED' : 'NOT SATISFIED'}
        </Text>
      </View>
      <Text style={styles.propDef}>Logic: {data.definition}</Text>
      <View style={styles.divider} />
      <View style={styles.stepContainer}>
        {data.logs.slice(0, 5).map((log, i) => (
          <View key={i} style={styles.stepRow}>
            <Text style={styles.stepCode}>{log.check}</Text>
            <Text style={[styles.stepStatus, { color: log.passed ? '#4caf50' : '#f44336' }]}>:: {log.result}</Text>
          </View>
        ))}
        {data.logs.length > 5 && <Text style={styles.moreText}>+ {data.logs.length - 5} hidden validations</Text>}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>RELATIONS ENGINE</Text>
        <TouchableOpacity onPress={() => setShowGuide(true)}><Ionicons name="help-circle-outline" size={26} color="#104a28" /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.actionRow}>
            <TouchableOpacity style={styles.utilBtn} onPress={loadExample}><Text style={styles.utilBtnText}>LOAD EXAMPLE</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.utilBtn, {backgroundColor: '#f5f5f5'}]} onPress={clearLab}><Text style={styles.utilBtnText}>RESET</Text></TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>1. UNIVERSE SET</Text>
          <View style={styles.inputRow}>
            <TextInput style={styles.input} placeholder="Value" value={newElement} onChangeText={setNewElement} />
            <TouchableOpacity style={styles.addBtn} onPress={addElement}><Ionicons name="add" size={20} color="#fff" /></TouchableOpacity>
          </View>
          <View style={styles.badgeContainer}>
            {elements.map((e, i) => <View key={i} style={styles.badge}><Text style={styles.badgeText}>{e}</Text></View>)}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>2. RELATION PAIRS</Text>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, {flex:1}]} placeholder="a" value={pairA} onChangeText={setPairA} />
            <TextInput style={[styles.input, {flex:1}]} placeholder="b" value={pairB} onChangeText={setPairB} />
            <TouchableOpacity style={[styles.addBtn, {backgroundColor: '#546e7a'}]} onPress={addPair}><Ionicons name="link" size={18} color="#fff" /></TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={analyzeRelation}>
          <Text style={styles.primaryBtnText}>EXECUTE COMPUTATION</Text>
        </TouchableOpacity>

        {analysis && (
          <View>
            <Text style={styles.sectionHeader}>Engine Analysis Output</Text>
            
            <View style={styles.matrixCard}>
              <Text style={styles.matrixLabel}>ADJACENCY MATRIX [MR]</Text>
              <View style={styles.matrixContainer}>
                {elements.map((rowEl, rIdx) => (
                  <View key={rIdx} style={styles.matrixRow}>
                    {elements.map((colEl, cIdx) => {
                      const active = pairs.some(p => p.a === rowEl && p.b === colEl);
                      return (
                        <View key={cIdx} style={[styles.matrixCell, active && styles.cellActive]}>
                          <Text style={[styles.cellText, active && styles.cellTextActive]}>{active ? '1' : '0'}</Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>

            <View style={{gap: 15, marginBottom: 50}}>
                <PropertySection title="REFLEXIVITY" data={analysis.reflexive} />
                <PropertySection title="SYMMETRY" data={analysis.symmetric} />
                <PropertySection title="TRANSITIVITY" data={analysis.transitive} />
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={showGuide} animationType="fade" transparent={true}>
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lab Operator Guide</Text>
            <Text style={styles.guideStep}>• Set A defines your domain nodes.</Text>
            <Text style={styles.guideStep}>• Relation R defines paths between those nodes.</Text>
            <Text style={styles.guideStep}>• Computation checks for Equivalence properties.</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowGuide(false)}><Text style={styles.closeBtnText}>RESUME</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#18181B' },
  content: { padding: 16 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  utilBtn: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#104a2833' },
  utilBtnText: { color: '#104a28', fontWeight: '700', fontSize: 11 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 1 },
  cardLabel: { fontSize: 10, fontWeight: '800', color: '#90A4AE', marginBottom: 12, letterSpacing: 1 },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: { backgroundColor: '#F5F7F8', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E0E4E6', flex: 2, fontSize: 14, fontFamily: 'monospace' },
  addBtn: { backgroundColor: '#104a28', width: 44, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  badge: { backgroundColor: '#E8F5E9', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#C8E6C9' },
  badgeText: { color: '#2E7D32', fontWeight: '800', fontSize: 12 },
  primaryBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginVertical: 10 },
  primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 1 },
  sectionHeader: { fontSize: 12, fontWeight: '800', color: '#78909C', marginBottom: 16, textTransform: 'uppercase' },
  
  matrixCard: { backgroundColor: '#ECEFF1', padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#CFD8DC' },
  matrixLabel: { color: '#78909C', fontSize: 9, fontWeight: '800', marginBottom: 20, letterSpacing: 2 },
  matrixContainer: { paddingHorizontal: 10 },
  matrixRow: { flexDirection: 'row' },
  matrixCell: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  cellActive: { backgroundColor: '#FFFFFF', borderRadius: 6, elevation: 1 },
  cellText: { fontSize: 16, color: '#B0BEC5', fontFamily: 'monospace' },
  cellTextActive: { color: '#104a28', fontWeight: '900' },

  // Property Cards for Step-by-Step Logic
  propCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#ECEFF1' },
  propHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  propTitle: { fontWeight: '900', fontSize: 12, color: '#546E7A' },
  propStatus: { fontWeight: 'bold', fontSize: 10 },
  propDef: { fontSize: 11, color: '#90A4AE', fontStyle: 'italic', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#F5F7F8', marginBottom: 12 },
  stepContainer: { gap: 6 },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stepCode: { fontFamily: 'monospace', fontSize: 12, color: '#455A64' },
  stepStatus: { fontFamily: 'monospace', fontSize: 11, fontWeight: 'bold' },
  moreText: { fontSize: 10, color: '#B0BEC5', fontStyle: 'italic', marginTop: 5 },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 25 },
  modalContent: { backgroundColor: '#fff', padding: 30, borderRadius: 25 },
  modalTitle: { fontSize: 20, fontWeight: '900', marginBottom: 20, color: '#104a28', textAlign: 'center' },
  guideStep: { fontSize: 14, color: '#444', marginBottom: 15, lineHeight: 22 },
  closeBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 15, alignItems: 'center', marginTop: 15 },
  closeBtnText: { color: '#fff', fontWeight: 'bold' }
});