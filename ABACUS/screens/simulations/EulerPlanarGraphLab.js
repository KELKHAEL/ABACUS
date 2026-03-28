import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EulerPlanarGraphLab({ navigation }) {
  const [vertices, setVertices] = useState('5');
  const [edges, setEdges] = useState('7');
  const [results, setResults] = useState(null);

  const calculateEuler = () => {
    const v = parseInt(vertices);
    const e = parseInt(edges);

    if (isNaN(v) || isNaN(e) || v < 1 || e < 0) {
      return Alert.alert("Invalid Input", "Please enter valid positive numbers for Vertices and Edges.");
    }

    // Euler's Formula: V - E + F = 2  =>  F = 2 - V + E
    const faces = 2 - v + e;

    // Euler's Inequality for connected planar graphs (if V >= 3, then E <= 3V - 6)
    let isPlanarPossible = true;
    let maxEdges = 0;
    if (v >= 3) {
        maxEdges = (3 * v) - 6;
        if (e > maxEdges) isPlanarPossible = false;
    }

    setResults({ v, e, faces, isPlanarPossible, maxEdges });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Euler's Graph Formula</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calculate Regions (Faces)</Text>
            <Text style={styles.descText}>For any connected planar graph, Euler proved that Vertices - Edges + Faces = 2.</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vertices (V)</Text>
                <TextInput style={styles.input} value={vertices} onChangeText={setVertices} keyboardType="numeric" placeholder="e.g. 5" />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Edges (E)</Text>
                <TextInput style={styles.input} value={edges} onChangeText={setEdges} keyboardType="numeric" placeholder="e.g. 7" />
              </View>
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={calculateEuler}>
              <Text style={styles.calcBtnText}>Solve Formula</Text>
            </TouchableOpacity>
          </View>

          {results && (
            <View style={styles.card}>
              
              {!results.isPlanarPossible ? (
                 <View style={styles.errorBox}>
                    <Text style={styles.errorText}>Impossible Planar Graph!</Text>
                    <Text style={styles.errorSub}>According to Euler's Inequality, a planar graph with {results.v} vertices can have a maximum of {results.maxEdges} edges (E ≤ 3V - 6). You entered {results.e} edges.</Text>
                 </View>
              ) : (
                <>
                  <Text style={styles.cardTitle}>Formula Breakdown</Text>
                  <View style={styles.resultBanner}>
                    <Text style={styles.resultLabel}>Number of Regions (F) =</Text>
                    <Text style={styles.resultValue}>{results.faces}</Text>
                  </View>

                  <View style={styles.stepsBox}>
                    <Text style={styles.formulaText}>V - E + F = 2</Text>
                    <Text style={styles.stepText}>{results.v} - {results.e} + F = 2</Text>
                    <Text style={styles.stepText}>F = 2 - {results.v} + {results.e}</Text>
                    <Text style={[styles.stepText, {color: '#10b981', fontWeight: 'bold'}]}>F = {results.faces}</Text>
                  </View>
                </>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#104a28', padding: 20, paddingTop: 40 },
  backBtn: { marginRight: 15 },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28', marginBottom: 5 },
  descText: { fontSize: 12, color: '#666', marginBottom: 15 },
  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
  inputGroup: { flex: 1 },
  label: { fontSize: 13, color: '#555', marginBottom: 5, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9', textAlign: 'center' },
  calcBtn: { backgroundColor: '#eab308', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: '#422006', fontWeight: 'bold', fontSize: 16 },
  resultBanner: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15, flexDirection: 'row', justifyContent: 'center', gap: 10 },
  resultLabel: { color: '#a7f3d0', fontSize: 16, fontWeight: 'bold' },
  resultValue: { color: '#fff', fontSize: 28, fontWeight: '900' },
  stepsBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' },
  formulaText: { fontSize: 14, color: '#9ca3af', fontWeight: 'bold', marginBottom: 8 },
  stepText: { fontSize: 16, color: '#334155', marginVertical: 3, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  errorBox: { backgroundColor: '#fee2e2', padding: 15, borderRadius: 8, borderLeftWidth: 5, borderLeftColor: '#ef4444' },
  errorText: { color: '#b91c1c', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  errorSub: { color: '#991b1b', fontSize: 13, lineHeight: 20 }
});