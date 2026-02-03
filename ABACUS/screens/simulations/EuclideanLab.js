import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EuclideanLab({ navigation }) {
  const [numA, setNumA] = useState('');
  const [numB, setNumB] = useState('');
  const [result, setResult] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const loadExample = () => {
    setNumA('252');
    setNumB('105');
    setResult(null);
  };

  const clearLab = () => {
    setNumA('');
    setNumB('');
    setResult(null);
  };

  const runEuclidean = () => {
    const a = parseInt(numA);
    const b = parseInt(numB);

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      Alert.alert("Input Error", "Please enter two positive integers.");
      return;
    }

    let steps = [];
    let tempA = Math.max(a, b);
    let tempB = Math.min(a, b);
    const originalA = tempA;
    const originalB = tempB;

    while (tempB !== 0) {
      let q = Math.floor(tempA / tempB);
      let r = tempA % tempB;
      steps.push({ a: tempA, b: tempB, q, r });
      tempA = tempB;
      tempB = r;
    }

    setResult({
      gcd: tempA,
      steps,
      originalA,
      originalB
    });
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>EUCLIDEAN ENGINE</Text>
        <TouchableOpacity onPress={() => setShowGuide(true)}><Ionicons name="help-circle-outline" size={26} color="#104a28" /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.actionRow}>
            <TouchableOpacity style={styles.utilBtn} onPress={loadExample}><Text style={styles.utilBtnText}>LOAD EXAMPLE</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.utilBtn, {backgroundColor: '#f5f5f5'}]} onPress={clearLab}><Text style={styles.utilBtnText}>RESET</Text></TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>1. INPUT POSITIVE INTEGERS</Text>
          <View style={styles.inputRow}>
            <TextInput style={styles.input} placeholder="Integer A" keyboardType="numeric" value={numA} onChangeText={setNumA} />
            <TextInput style={styles.input} placeholder="Integer B" keyboardType="numeric" value={numB} onChangeText={setNumB} />
          </View>
        </View>

        <TouchableOpacity style={styles.primaryBtn} onPress={runEuclidean}>
          <Text style={styles.primaryBtnText}>COMPUTE GCD</Text>
        </TouchableOpacity>

        {result && (
          <View>
            <Text style={styles.sectionHeader}>Engine Analysis Output</Text>
            
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>GREATEST COMMON DIVISOR</Text>
              <Text style={styles.resultVal}>GCD({result.originalA}, {result.originalB}) = {result.gcd}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.solveTitle}>Step-by-Step Division Log:</Text>
              <Text style={styles.propDef}>Logic: a = b(q) + r</Text>
              <View style={styles.divider} />
              <View style={styles.logContainer}>
                {result.steps.map((step, i) => (
                  <View key={i} style={styles.logRow}>
                    <Text style={styles.logCode}>
                        {step.a} = {step.b}({step.q}) + {step.r}
                    </Text>
                    <Text style={[styles.logStatus, { color: step.r === 0 ? '#2e7d32' : '#90A4AE' }]}>
                      {step.r === 0 ? '[ FINAL ]' : '[ NEXT ]'}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.infoCard}>
                <Ionicons name="information-circle-outline" size={18} color="#104a28" />
                <Text style={styles.infoText}>
                    The process stops when the remainder is 0. The last non-zero remainder (or the current divisor) is the GCD.
                </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={showGuide} animationType="fade" transparent={true}>
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Euclidean Lab Guide</Text>
            <Text style={styles.guideStep}>• Enter two positive integers to find their common divisor.</Text>
            <Text style={styles.guideStep}>• The engine uses the Quotient-Remainder theorem recursively.</Text>
            <Text style={styles.guideStep}>• Each step reduces the larger number until the remainder reaches zero.</Text>
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
  inputRow: { flexDirection: 'row', gap: 10 },
  input: { backgroundColor: '#F5F7F8', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E0E4E6', flex: 1, fontSize: 14, fontFamily: 'monospace' },
  primaryBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginVertical: 10, elevation: 2 },
  primaryBtnText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 1 },
  sectionHeader: { fontSize: 12, fontWeight: '800', color: '#78909C', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 },
  resultCard: { backgroundColor: '#ECEFF1', padding: 24, borderRadius: 16, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#CFD8DC' },
  resultLabel: { color: '#78909C', fontSize: 9, fontWeight: '800', marginBottom: 10, letterSpacing: 2 },
  resultVal: { color: '#104a28', fontWeight: '900', fontSize: 20, fontFamily: 'monospace' },
  solveTitle: { fontWeight: '900', fontSize: 12, color: '#546E7A', marginBottom: 5 },
  propDef: { fontSize: 11, color: '#90A4AE', fontStyle: 'italic', marginBottom: 10 },
  divider: { height: 1, backgroundColor: '#F5F7F8', marginBottom: 12 },
  logContainer: { gap: 8 },
  logRow: { flexDirection: 'row', justifyContent: 'space-between' },
  logCode: { fontFamily: 'monospace', fontSize: 14, color: '#455A64' },
  logStatus: { fontFamily: 'monospace', fontSize: 10, fontWeight: 'bold' },
  infoCard: { flexDirection: 'row', backgroundColor: '#E8F5E9', padding: 15, borderRadius: 10, gap: 10, marginBottom: 50 },
  infoText: { flex: 1, fontSize: 11, color: '#2E7D32', lineHeight: 16 },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 25 },
  modalContent: { backgroundColor: '#fff', padding: 30, borderRadius: 25 },
  modalTitle: { fontSize: 20, fontWeight: '900', marginBottom: 20, color: '#104a28', textAlign: 'center' },
  guideStep: { fontSize: 14, color: '#444', marginBottom: 15, lineHeight: 22 },
  closeBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 15, alignItems: 'center', marginTop: 15 },
  closeBtnText: { color: '#fff', fontWeight: 'bold' }
});