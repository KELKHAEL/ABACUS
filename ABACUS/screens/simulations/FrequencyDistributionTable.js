import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FrequencyDistributionSimulation({ navigation }) {
  const EXAMPLE_DATA = "82, 82, 83, 79, 72, 71, 84, 59, 77, 73, 83, 82, 63, 75, 50, 85, 76, 79, 68, 81, 79, 69, 74, 53, 73, 71, 50, 76, 57, 89, 72, 88, 84, 80, 68, 50, 74, 84, 71, 66, 71, 80, 72, 60, 81, 89, 94, 80, 84, 84, 84, 76, 75, 82, 76, 53, 91, 69, 60, 96, 59, 62, 79, 82, 72, 81, 60, 84, 68, 52, 77, 78, 87, 75, 86, 82, 74, 73, 50, 72, 50, 69, 75, 70, 77, 87, 86, 77, 69, 75, 87, 73, 84, 68, 85, 62, 87, 92, 81, 69";

  const [rawData, setRawData] = useState('');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('FDT'); 

  const calculateFDT = () => {
    Keyboard.dismiss();
    const data = rawData.split(/[\s,]+/).map(n => parseFloat(n)).filter(n => !isNaN(n));

    if (data.length < 5) {
      Alert.alert("Insufficient Data", "Please enter at least 5 numbers.");
      return;
    }

    data.sort((a, b) => a - b);
    const N = data.length;
    const HV = data[N - 1];
    const LV = data[0];
    const Range = HV - LV;

    const k_exact = 1 + (3.322 * Math.log10(N));
    const k = Math.round(k_exact);
    const c_calc = Range / k_exact; 
    const c = Math.round(c_calc); 

    let classes = [];
    let currentLower = LV;
    let cumFreqLess = 0;
    let sum_fx = 0;

    for (let i = 0; i < 30; i++) {
      const currentUpper = currentLower + c - 1;
      const classData = data.filter(n => n >= currentLower && n <= currentUpper);
      const f = classData.length;

      if (currentLower > HV && f === 0) break;

      const x = (currentLower + currentUpper) / 2;
      const LCB = currentLower - 0.5; 
      const UCB = currentUpper + 0.5; 
      const rf = (f / N) * 100;
      const fx = f * x;
      
      cumFreqLess += f;
      sum_fx += fx;

      classes.push({
        classStr: `${currentLower} – ${currentUpper}`,
        lower: currentLower,
        upper: currentUpper,
        f, x, lcb: LCB, ucb: UCB,
        rf: rf.toFixed(2),
        cfLess: cumFreqLess,
        fx
      });

      currentLower = currentUpper + 1;
      if (cumFreqLess >= N) break;
    }

    let runningTotal = N;
    classes = classes.map(row => {
      const r = { ...row, cfGreater: runningTotal };
      runningTotal -= row.f;
      return r;
    });

    const mean = sum_fx / N;

    // Median/Mode Logic
    const medianPos = N / 2;
    const medianClass = classes.find(cls => cls.cfLess >= medianPos);
    const mIdx = classes.indexOf(medianClass);
    const Fb = mIdx > 0 ? classes[mIdx - 1].cfLess : 0;
    const median = medianClass.lcb + ((medianPos - Fb) / medianClass.f) * c;

    const maxFreq = Math.max(...classes.map(cls => cls.f));
    const modalClass = classes.find(cls => cls.f === maxFreq);
    const moIdx = classes.indexOf(modalClass);
    const f1 = modalClass.f;
    const f0 = moIdx > 0 ? classes[moIdx - 1].f : 0;
    const f2 = moIdx < classes.length - 1 ? classes[moIdx + 1].f : 0;
    const mode = modalClass.lcb + ((f1 - f0) / ((f1 - f0) + (f1 - f2))) * c;

    let sum_f_abs_dev = 0; 
    let sum_f_sq_dev = 0;

    const finalClasses = classes.map(row => {
      const dev = Math.abs(row.x - mean); 
      const f_dev = row.f * dev;          
      const sq_dev = Math.pow(row.x - mean, 2); 
      const f_sq_dev = row.f * sq_dev;    
      sum_f_abs_dev += f_dev;
      sum_f_sq_dev += f_sq_dev;

      return {
        ...row,
        dev: dev.toFixed(2),
        f_dev: f_dev.toFixed(2),
        sq_dev: sq_dev.toFixed(2),
        f_sq_dev: f_sq_dev.toFixed(2)
      };
    });

    setResult({
      stats: { N, HV, LV, Range, k_rounded: k, c_rounded: c },
      table: finalClasses,
      ct: { 
        sum_fx: sum_fx.toFixed(2), 
        mean: mean.toFixed(2), 
        median: median.toFixed(2), 
        mode: mode.toFixed(2),
        medianClass: medianClass.classStr,
        modalClass: modalClass.classStr,
        lmd: medianClass.lcb, fmd: medianClass.f, fb: Fb,
        lmo: modalClass.lcb, f0, f1, f2
      },
      disp: {
        meanDeviation: (sum_f_abs_dev / N).toFixed(2),
        variance: (sum_f_sq_dev / (N - 1)).toFixed(2),
        stdDev: Math.sqrt(sum_f_sq_dev / (N - 1)).toFixed(2),
        sum_f_abs_dev: sum_f_abs_dev.toFixed(2),
        sum_f_sq_dev: sum_f_sq_dev.toFixed(2)
      }
    });
  };

  const loadExample = () => setRawData(EXAMPLE_DATA);
  const clear = () => { setRawData(''); setResult(null); setActiveTab('FDT'); };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FREQUENCY DISTRIBUTION</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>DATA SET INPUT</Text>
          <TextInput style={styles.textArea} multiline placeholder="e.g. 50, 55, 60..." value={rawData} onChangeText={setRawData} />
          <View style={styles.btnContainer}>
            <View style={styles.secondaryBtnRow}>
              <TouchableOpacity style={styles.secondaryBtn} onPress={clear}><Text style={styles.secondaryBtnText}>Clear Input</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.secondaryBtn, styles.loadBtn]} onPress={loadExample}><Text style={[styles.secondaryBtnText, styles.loadBtnText]}>Load Example</Text></TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.primaryBtn} onPress={calculateFDT}><Text style={styles.primaryBtnText}>GENERATE TABLES</Text></TouchableOpacity>
          </View>
        </View>

        {result && (
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
              <TouchableOpacity style={[styles.tab, activeTab === 'FDT' && styles.activeTab]} onPress={() => setActiveTab('FDT')}><Text style={[styles.tabText, activeTab === 'FDT' && styles.activeTabText]}>FDT Table</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.tab, activeTab === 'MD' && styles.activeTab]} onPress={() => setActiveTab('MD')}><Text style={[styles.tabText, activeTab === 'MD' && styles.activeTabText]}>Mean Deviation</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.tab, activeTab === 'Variance' && styles.activeTab]} onPress={() => setActiveTab('Variance')}><Text style={[styles.tabText, activeTab === 'Variance' && styles.activeTabText]}>Variance & SD</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.tab, activeTab === 'HowTo' && styles.activeTab]} onPress={() => setActiveTab('HowTo')}><Text style={[styles.tabText, activeTab === 'HowTo' && styles.activeTabText]}>How to Solve</Text></TouchableOpacity>
            </ScrollView>

            {activeTab === 'FDT' && (
              <View>
                <View style={styles.centralTendencyRow}>
                    <View style={[styles.ctBox, {borderBottomColor: '#104a28'}]}><Text style={styles.ctLabel}>MEAN</Text><Text style={styles.ctValue}>{result.ct.mean}</Text></View>
                    <View style={[styles.ctBox, {borderBottomColor: '#2D7FF9'}]}><Text style={styles.ctLabel}>MEDIAN</Text><Text style={styles.ctValue}>{result.ct.median}</Text></View>
                    <View style={[styles.ctBox, {borderBottomColor: '#F25487'}]}><Text style={styles.ctLabel}>MODE</Text><Text style={styles.ctValue}>{result.ct.mode}</Text></View>
                </View>
                <View style={styles.stepCard}>
                  <Text style={styles.stepTitle}>FDT Construction Steps:</Text>
                  <Text style={styles.stepItem}>1. Range (R) = HV - LV = {result.stats.Range}</Text>
                  <Text style={styles.stepItem}>2. Classes (k) ≈ {result.stats.k_rounded}</Text>
                  <Text style={styles.stepItem}>3. Class Size (c) ≈ {result.stats.c_rounded}</Text>
                </View>
                <View style={styles.tableCard}>
                  <ScrollView horizontal><View>
                      <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell, {width: 80}]}>Classes</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 40}]}>f</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 50}]}>x</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 60}]}>LCB</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 60}]}>UCB</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 50}]}>&lt;CF</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 50}]}>&gt;CF</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 60}]}>rf%</Text>
                      </View>
                      {result.table.map((row, idx) => (
                        <View key={idx} style={[styles.row, idx % 2 !== 0 && styles.oddRow]}>
                          <Text style={[styles.cell, {width: 80, fontWeight:'bold'}]}>{row.classStr}</Text>
                          <Text style={[styles.cell, {width: 40, fontWeight:'bold', color:'#2D7FF9'}]}>{row.f}</Text>
                          <Text style={[styles.cell, {width: 50}]}>{row.x}</Text>
                          <Text style={[styles.cell, {width: 60}]}>{row.lcb}</Text>
                          <Text style={[styles.cell, {width: 60}]}>{row.ucb}</Text>
                          <Text style={[styles.cell, {width: 50}]}>{row.cfLess}</Text>
                          <Text style={[styles.cell, {width: 50}]}>{row.cfGreater}</Text>
                          <Text style={[styles.cell, {width: 60}]}>{row.rf}%</Text>
                        </View>
                      ))}
                      <View style={[styles.row, {borderTopWidth: 2, backgroundColor: '#e8f5e9'}]}>
                        <Text style={[styles.cell, {width: 80, fontWeight:'bold'}]}>Total</Text>
                        <Text style={[styles.cell, {width: 40, fontWeight:'bold'}]}>{result.stats.N}</Text>
                        <Text style={[styles.cell, {flex: 1}]}></Text>
                      </View>
                  </View></ScrollView>
                </View>
              </View>
            )}

            {/* MEAN DEVIATION TAB */}
            {activeTab === 'MD' && (
              <View>
                <View style={[styles.statCard, {borderLeftColor: '#F25487'}]}>
                  <Text style={styles.statTitleCentered}>MEAN DEVIATION (MD)</Text>
                  <Text style={[styles.statResultBig, {color:'#F25487'}]}>{result.disp.meanDeviation}</Text>
                  <View style={styles.subStep}>
                    <Text style={styles.stepTextCentered}>Formula: Σ f|x - x̄| / N</Text>
                    <Text style={styles.stepTextCentered}>{result.disp.sum_f_abs_dev} ÷ {result.stats.N} = {result.disp.meanDeviation}</Text>
                  </View>
                </View>
                <View style={styles.tableCard}>
                  <ScrollView horizontal><View>
                      <View style={[styles.row, {backgroundColor: '#F25487'}]}>
                        <Text style={[styles.cell, styles.headerCell, {width: 80}]}>Classes</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 40}]}>f</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 50}]}>x</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 60}]}>fx</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 70}]}>|x - x̄|</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 80}]}>f|x - x̄|</Text>
                      </View>
                      {result.table.map((row, idx) => (
                        <View key={idx} style={[styles.row, idx % 2 !== 0 && styles.oddRow]}>
                          <Text style={[styles.cell, {width: 80, fontWeight:'bold'}]}>{row.classStr}</Text>
                          <Text style={[styles.cell, {width: 40}]}>{row.f}</Text>
                          <Text style={[styles.cell, {width: 50}]}>{row.x}</Text>
                          <Text style={[styles.cell, {width: 60}]}>{row.fx}</Text>
                          <Text style={[styles.cell, {width: 70}]}>{row.dev}</Text>
                          <Text style={[styles.cell, {width: 80, fontWeight:'bold', color: '#F25487'}]}>{row.f_dev}</Text>
                        </View>
                      ))}
                      <View style={[styles.row, {borderTopWidth: 2, backgroundColor: '#fce4ec'}]}>
                        <Text style={[styles.cell, {width: 80, fontWeight:'bold'}]}>Total</Text>
                        <Text style={[styles.cell, {width: 40, fontWeight:'bold'}]}>{result.stats.N}</Text>
                        <Text style={[styles.cell, {width: 50}]}>-</Text>
                        <Text style={[styles.cell, {width: 60, fontWeight:'bold'}]}>{result.ct.sum_fx}</Text>
                        <Text style={[styles.cell, {width: 70}]}>-</Text>
                        <Text style={[styles.cell, {width: 80, fontWeight:'bold', color: '#F25487'}]}>{result.disp.sum_f_abs_dev}</Text>
                      </View>
                  </View></ScrollView>
                </View>
              </View>
            )}

            {/* VARIANCE TAB */}
            {activeTab === 'Variance' && (
              <View>
                <View style={[styles.statCard, {borderLeftColor: '#7B61FF'}]}>
                  <Text style={styles.statTitleCentered}>VARIANCE & STD DEV</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                    <View style={{alignItems:'center'}}><Text style={[styles.statResultBig, {color:'#7B61FF', fontSize: 24}]}>s² = {result.disp.variance}</Text><Text style={{fontSize: 10, color:'#888'}}>VARIANCE</Text></View>
                    <View style={{alignItems:'center'}}><Text style={[styles.statResultBig, {color:'#7B61FF', fontSize: 24}]}>s = {result.disp.stdDev}</Text><Text style={{fontSize: 10, color:'#888'}}>STD. DEV</Text></View>
                  </View>
                  <View style={styles.subStep}>
                    <Text style={styles.stepTextCentered}>Variance = Σ f(x - x̄)² / (n - 1)</Text>
                    <Text style={styles.stepTextCentered}>{result.disp.sum_f_sq_dev} ÷ {result.stats.N - 1} = {result.disp.variance}</Text>
                  </View>
                </View>
                <View style={styles.tableCard}>
                  <ScrollView horizontal><View>
                      <View style={[styles.row, {backgroundColor: '#7B61FF'}]}>
                        <Text style={[styles.cell, styles.headerCell, {width: 80}]}>Classes</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 40}]}>f</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 50}]}>x</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 70}]}>x - x̄</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 80}]}> (x - x̄)²</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 90}]}>f(x - x̄)²</Text>
                      </View>
                      {result.table.map((row, idx) => (
                        <View key={idx} style={[styles.row, idx % 2 !== 0 && styles.oddRow]}>
                          <Text style={[styles.cell, {width: 80, fontWeight:'bold'}]}>{row.classStr}</Text>
                          <Text style={[styles.cell, {width: 40}]}>{row.f}</Text>
                          <Text style={[styles.cell, {width: 50}]}>{row.x}</Text>
                          <Text style={[styles.cell, {width: 70}]}>{(row.x - result.ct.mean).toFixed(2)}</Text>
                          <Text style={[styles.cell, {width: 80}]}>{row.sq_dev}</Text>
                          <Text style={[styles.cell, {width: 90, fontWeight:'bold', color: '#7B61FF'}]}>{row.f_sq_dev}</Text>
                        </View>
                      ))}
                      <View style={[styles.row, {borderTopWidth: 2, backgroundColor: '#f3e5f5'}]}>
                        <Text style={[styles.cell, {width: 80, fontWeight:'bold'}]}>Total</Text>
                        <Text style={[styles.cell, {width: 40, fontWeight:'bold'}]}>{result.stats.N}</Text>
                        <Text style={[styles.cell, {flex: 3}]}></Text>
                        <Text style={[styles.cell, {width: 90, fontWeight:'bold', color: '#7B61FF'}]}>{result.disp.sum_f_sq_dev}</Text>
                      </View>
                  </View></ScrollView>
                </View>
              </View>
            )}

            {/* HOW TO SOLVE TAB */}
            {activeTab === 'HowTo' && (
              <View>
              <Text style={styles.sectionHeader}>Central Tendency</Text>
              
              <View style={styles.solveCard}>
                  <Text style={styles.solveTitle}>1. Mean (x̄)</Text>
                  <Text style={styles.formulaText}>Formula: x̄ = Σfx / n</Text>
                  <View style={styles.substitutionBox}>
                      <Text style={styles.subTextMain}>x̄ = {result.ct.sum_fx} / {result.stats.N}</Text>
                      <Text style={styles.finalAnswerText}>x̄ = {result.ct.mean}</Text>
                  </View>
              </View>

              <View style={styles.solveCard}>
                  <Text style={styles.solveTitle}>2. Median (x̃)</Text>
                  <Text style={styles.stepDtl}>• n/2 = {result.stats.N/2} | Class: {result.ct.medianClass}</Text>
                  <Text style={styles.formulaText}>Formula: x̃ = Lmd + c [ (n/2 - Fb) / fmd ]</Text>
                  <View style={styles.substitutionBox}>
                      <Text style={styles.subTextMain}>x̃ = {result.ct.lmd} + {result.stats.c_rounded} [ ({result.stats.N/2} - {result.ct.fb}) / {result.ct.fmd} ]</Text>
                      <Text style={styles.finalAnswerText}>x̃ = {result.ct.median}</Text>
                  </View>
              </View>

              <View style={styles.solveCard}>
                  <Text style={styles.solveTitle}>3. Mode (x̂)</Text>
                  <Text style={styles.formulaText}>Formula: x̂ = Lmo + c [ (f1 - f0) / ((f1 - f0) + (f1 - f2)) ]</Text>
                  <View style={styles.substitutionBox}>
                      <Text style={styles.subTextMain}>x̂ = {result.ct.lmo} + {result.stats.c_rounded} [ ({result.ct.f1} - {result.ct.f0}) / (({result.ct.f1} - {result.ct.f0}) + ({result.ct.f1} - {result.ct.f2})) ]</Text>
                      <Text style={styles.finalAnswerText}>x̂ = {result.ct.mode}</Text>
                  </View>
              </View>

              <Text style={styles.sectionHeader}>Measures of Dispersion</Text>

              <View style={styles.solveCard}>
                  <Text style={styles.solveTitle}>4. Mean Deviation (MD)</Text>
                  <Text style={styles.formulaText}>Formula: MD = Σf|x - x̄| / n</Text>
                  <View style={styles.substitutionBox}>
                      <Text style={styles.subTextMain}>MD = {result.disp.sum_f_abs_dev} / {result.stats.N}</Text>
                      <Text style={styles.finalAnswerText}>MD = {result.disp.meanDeviation}</Text>
                  </View>
              </View>

              <View style={styles.solveCard}>
                  <Text style={styles.solveTitle}>5. Variance (s²)</Text>
                  <Text style={styles.formulaText}>Formula: s² = Σf(x - x̄)² / (n - 1)</Text>
                  <View style={styles.substitutionBox}>
                      <Text style={styles.subTextMain}>s² = {result.disp.sum_f_sq_dev} / ({result.stats.N} - 1)</Text>
                      <Text style={styles.finalAnswerText}>s² = {result.disp.variance}</Text>
                  </View>
              </View>

              <View style={styles.solveCard}>
                  <Text style={styles.solveTitle}>6. Standard Deviation (s)</Text>
                  <Text style={styles.formulaText}>Formula: s = √s²</Text>
                  <View style={styles.substitutionBox}>
                      <Text style={styles.subTextMain}>s = √{result.disp.variance}</Text>
                      <Text style={styles.finalAnswerText}>s = {result.disp.stdDev}</Text>
                  </View>
              </View>
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
  content: { padding: 20, paddingBottom: 50 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 2 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  textArea: { backgroundColor: '#F8F9FD', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#eee', minHeight: 80, textAlignVertical: 'top' },
  btnContainer: { marginTop: 15, gap: 10 },
  secondaryBtnRow: { flexDirection: 'row', gap: 10 },
  secondaryBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  secondaryBtnText: { fontWeight: 'bold', color: '#666' },
  loadBtn: { backgroundColor: '#E3F2FD', borderColor: '#2D7FF9' },
  loadBtnText: { color: '#2D7FF9' },
  primaryBtn: { width: '100%', paddingVertical: 16, borderRadius: 12, backgroundColor: '#104a28', alignItems: 'center' },
  primaryBtnText: { fontWeight: '900', color: '#fff' },
  tabContainer: { flexDirection: 'row', marginBottom: 20 },
  tab: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#eee', marginRight: 8 },
  activeTab: { backgroundColor: '#104a28' },
  tabText: { fontWeight: 'bold', color: '#666', fontSize: 12 },
  activeTabText: { color: '#fff' },
  centralTendencyRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, gap: 8 },
  ctBox: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 10, alignItems: 'center', borderBottomWidth: 3, elevation: 1 },
  ctLabel: { fontSize: 10, fontWeight: 'bold', color: '#888' },
  ctValue: { fontSize: 18, fontWeight: '900', color: '#333' },
  stepCard: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  stepTitle: { fontWeight: 'bold', marginBottom: 10, color: '#333', textDecorationLine: 'underline' },
  stepItem: { fontSize: 13, color: '#555', marginBottom: 8 },
  tableCard: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 12 },
  headerRow: { backgroundColor: '#104a28' },
  oddRow: { backgroundColor: '#f9f9f9' },
  cell: { textAlign: 'center', fontSize: 11, color: '#333' },
  headerCell: { fontWeight: 'bold', color: '#fff' },
  solveCard: { backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#eee' },
  solveTitle: { fontWeight: 'bold', fontSize: 15, color: '#104a28', marginBottom: 8 },
  formulaText: { fontStyle: 'italic', color: '#555', marginBottom: 10, fontSize: 12 },
  stepDtl: { fontSize: 11, color: '#777', marginBottom: 4 },
  substitutionBox: { backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#104a28' },
  subTextMain: { fontSize: 13, color: '#333' },
  finalAnswerText: { fontSize: 17, fontWeight: 'bold', color: '#104a28', marginTop: 8 },
  statCard: { backgroundColor: '#fff', padding: 25, borderRadius: 16, alignItems: 'center', marginBottom: 20, borderLeftWidth: 5 },
  statTitleCentered: { fontSize: 14, fontWeight: 'bold', color: '#888' },
  statResultBig: { fontSize: 42, fontWeight: '900', marginVertical: 10 },
  subStep: { marginTop: 10, backgroundColor: '#f9f9f9', padding: 15, borderRadius: 12, width: '100%' },
  stepTextCentered: { fontSize: 16, color: '#333', textAlign: 'center', fontWeight: 'bold' }
});