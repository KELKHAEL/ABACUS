import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FrequencyDistributionSimulation({ navigation }) {
  // ✅ 3 DISTINCT REAL-WORLD DATASETS
  const EXAMPLES = {
    scores: "82, 82, 83, 79, 72, 71, 84, 59, 77, 73, 83, 82, 63, 75, 50, 85, 76, 79, 68, 81, 79, 69, 74, 53, 73, 71, 50, 76, 57, 89, 72, 88, 84, 80, 68, 50, 74, 84, 71, 66, 71, 80, 72, 60, 81, 89, 94, 80, 84, 84, 84, 76, 75, 82, 76, 53, 91, 69, 60, 96, 59, 62, 79, 82, 72, 81, 60, 84, 68, 52, 77, 78, 87, 75, 86, 82, 74, 73, 50, 72, 50, 69, 75, 70, 77, 87, 86, 77, 69, 75, 87, 73, 84, 68, 85, 62, 87, 92, 81, 69",
    ages: "18, 19, 20, 22, 19, 18, 21, 23, 20, 19, 18, 19, 24, 21, 20, 19, 18, 19, 22, 21, 18, 19, 20, 23, 19, 18, 20, 21, 19, 22",
    temps: "32, 34, 31, 29, 35, 36, 33, 30, 28, 32, 35, 37, 34, 31, 33, 32, 36, 38, 30, 29, 31, 33, 34, 35, 32, 30, 28, 31, 33, 36"
  };

  const [rawData, setRawData] = useState('');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('FDT'); 

  // ✅ STRICT INPUT FILTERING
  const handleInput = (text) => {
    // Strips all letters and special characters except numbers, spaces, commas, and minus signs
    const cleanText = text.replace(/[^0-9,\s-]/g, '');
    setRawData(cleanText);
  };

  const loadExample = (type) => {
    setRawData(EXAMPLES[type]);
    setResult(null);
  };

  const calculateFDT = () => {
    Keyboard.dismiss();
    const data = rawData.split(/[\s,]+/).map(n => parseInt(n, 10)).filter(n => !isNaN(n));

    if (data.length < 5) {
      Alert.alert("Insufficient Data", "Please enter at least 5 valid numbers to build a meaningful distribution table.");
      return;
    }

    data.sort((a, b) => a - b);
    const N = data.length;
    const HV = data[N - 1];
    const LV = data[0];
    const Range = HV - LV;

    if (Range === 0) {
      Alert.alert("Logic Error", "All numbers in your dataset are exactly the same. A frequency distribution table cannot be built without a range of different values.");
      return;
    }

    // Sturges' Formula for Number of Classes
    const k_exact = 1 + (3.322 * Math.log10(N));
    const k = Math.round(k_exact);
    
    // Class width must strictly round UP to fit all data.
    const c_calc = (HV - LV + 1) / k; 
    const c = Math.ceil(c_calc); 

    let classes = [];
    let currentLower = LV;
    let cumFreqLess = 0;
    let sum_fx = 0;

    for (let i = 0; i < k + 2; i++) { 
      const currentUpper = currentLower + c - 1;
      const classData = data.filter(n => n >= currentLower && n <= currentUpper);
      const f = classData.length;

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

    // Greater Than Cumulative Frequency
    let runningTotal = N;
    classes = classes.map(row => {
      const r = { ...row, cfGreater: runningTotal };
      runningTotal -= row.f;
      return r;
    });

    // --- CENTRAL TENDENCY MATH ---
    const mean = sum_fx / N;

    // Median
    const medianPos = N / 2;
    const medianClass = classes.find(cls => cls.cfLess >= medianPos) || classes[classes.length - 1];
    const mIdx = classes.indexOf(medianClass);
    const Fb = mIdx > 0 ? classes[mIdx - 1].cfLess : 0;
    const median = medianClass.lcb + ((medianPos - Fb) / medianClass.f) * c;

    // Mode
    const maxFreq = Math.max(...classes.map(cls => cls.f));
    const modalClass = classes.find(cls => cls.f === maxFreq) || classes[0];
    const moIdx = classes.indexOf(modalClass);
    const f1 = modalClass.f;
    const f0 = moIdx > 0 ? classes[moIdx - 1].f : 0;
    const f2 = moIdx < classes.length - 1 ? classes[moIdx + 1].f : 0;
    
    const modeDenominator = ((f1 - f0) + (f1 - f2));
    const mode = modeDenominator === 0 ? modalClass.lcb : modalClass.lcb + ((f1 - f0) / modeDenominator) * c;

    // --- DISPERSION MATH ---
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
      stats: { N, HV, LV, Range, k_exact: k_exact.toFixed(2), k_rounded: k, c_calc: c_calc.toFixed(2), c_rounded: c },
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

  const clear = () => { setRawData(''); setResult(null); setActiveTab('FDT'); };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FREQUENCY DISTRIBUTION</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Whole Numbers Only:</Text> To ensure proper integer-based class limits, this calculator strictly accepts whole numbers.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Formatting:</Text> Separate your numbers using spaces or commas.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Minimum Data:</Text> Provide at least 5 different numbers to build a valid distribution table.</Text>
          </View>

          {/* ✅ PRESET SCENARIOS */}
          <Text style={styles.sectionHeader}>Try a Preset Dataset</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('scores')}>
                  <Ionicons name="document-text-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Exam Scores (N=100)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('ages')}>
                  <Ionicons name="people-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Student Ages (N=30)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('temps')}>
                  <Ionicons name="thermometer-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Temperatures (N=30)</Text>
              </TouchableOpacity>
          </ScrollView>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>DATA SET INPUT</Text>
            <TextInput 
                style={styles.textArea} 
                multiline 
                placeholder="e.g. 50, 55, 60..." 
                value={rawData} 
                onChangeText={handleInput} 
                // ✅ FORCES THE PHONE TO USE THE NUMBER/SYMBOL KEYBOARD
                keyboardType="numbers-and-punctuation"
            />
            <View style={styles.btnContainer}>
              <View style={styles.secondaryBtnRow}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={clear}>
                    <Text style={styles.secondaryBtnText}>Clear Input</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.primaryBtn} onPress={calculateFDT}>
                  <Text style={styles.primaryBtnText}>GENERATE TABLES</Text>
              </TouchableOpacity>
            </View>
          </View>

          {result && (
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, activeTab === 'FDT' && styles.activeTab]} onPress={() => setActiveTab('FDT')}>
                    <Text style={[styles.tabText, activeTab === 'FDT' && styles.activeTabText]}>FDT Table</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab === 'MD' && styles.activeTab]} onPress={() => setActiveTab('MD')}>
                    <Text style={[styles.tabText, activeTab === 'MD' && styles.activeTabText]}>Mean Deviation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab === 'Variance' && styles.activeTab]} onPress={() => setActiveTab('Variance')}>
                    <Text style={[styles.tabText, activeTab === 'Variance' && styles.activeTabText]}>Variance & SD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, activeTab === 'HowTo' && styles.activeTab]} onPress={() => setActiveTab('HowTo')}>
                    <Text style={[styles.tabText, activeTab === 'HowTo' && styles.activeTabText]}>How to Solve</Text>
                </TouchableOpacity>
              </ScrollView>

              {activeTab === 'FDT' && (
                <View>
                  <View style={styles.centralTendencyRow}>
                      <View style={[styles.ctBox, {borderBottomColor: '#104a28'}]}><Text style={styles.ctLabel}>MEAN</Text><Text style={styles.ctValue}>{result.ct.mean}</Text></View>
                      <View style={[styles.ctBox, {borderBottomColor: '#2D7FF9'}]}><Text style={styles.ctLabel}>MEDIAN</Text><Text style={styles.ctValue}>{result.ct.median}</Text></View>
                      <View style={[styles.ctBox, {borderBottomColor: '#F25487'}]}><Text style={styles.ctLabel}>MODE</Text><Text style={styles.ctValue}>{result.ct.mode}</Text></View>
                  </View>

                  <View style={styles.stepCard}>
                    <Text style={styles.stepTitle}>FDT Construction Steps (Sturges' Formula):</Text>
                    <Text style={styles.theoryNote}>We use Sturges' rule to mathematically determine the ideal number of classes (rows) so the data isn't too squished or too spread out.</Text>
                    <Text style={styles.stepItem}>1. Range (R) = High ({result.stats.HV}) - Low ({result.stats.LV}) = {result.stats.Range}</Text>
                    <Text style={styles.stepItem}>2. Classes (k) = 1 + 3.322 log({result.stats.N}) ≈ {result.stats.k_rounded}</Text>
                    <Text style={styles.stepItem}>3. Class Width (c) = (Range + 1) / k ≈ {result.stats.c_rounded}</Text>
                  </View>

                  <View style={styles.tableCard}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
                      <View style={{ flex: 1, minWidth: 600 }}>
                          <View style={[styles.row, styles.headerRow]}>
                            <Text style={[styles.cell, styles.headerCell, {flex: 2}]}>Classes</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1}]}>f</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.2}]}>x</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.5}]}>LCB</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.5}]}>UCB</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.2}]}>&lt;CF</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.2}]}>&gt;CF</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.5}]}>rf%</Text>
                          </View>
                          {result.table.map((row, idx) => (
                            <View key={idx} style={[styles.row, idx % 2 !== 0 && styles.oddRow]}>
                              <Text style={[styles.cell, {flex: 2, fontWeight:'bold'}]}>{row.classStr}</Text>
                              <Text style={[styles.cell, {flex: 1, fontWeight:'bold', color:'#2D7FF9'}]}>{row.f}</Text>
                              <Text style={[styles.cell, {flex: 1.2}]}>{row.x}</Text>
                              <Text style={[styles.cell, {flex: 1.5}]}>{row.lcb}</Text>
                              <Text style={[styles.cell, {flex: 1.5}]}>{row.ucb}</Text>
                              <Text style={[styles.cell, {flex: 1.2}]}>{row.cfLess}</Text>
                              <Text style={[styles.cell, {flex: 1.2}]}>{row.cfGreater}</Text>
                              <Text style={[styles.cell, {flex: 1.5}]}>{row.rf}%</Text>
                            </View>
                          ))}
                          <View style={[styles.row, {borderTopWidth: 2, backgroundColor: '#e8f5e9'}]}>
                            <Text style={[styles.cell, {flex: 2, fontWeight:'bold'}]}>Total</Text>
                            <Text style={[styles.cell, {flex: 1, fontWeight:'bold'}]}>{result.stats.N}</Text>
                            <Text style={[styles.cell, {flex: 8.1}]}></Text>
                          </View>
                      </View>
                    </ScrollView>
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
                    <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
                      <View style={{ flex: 1, minWidth: 550 }}>
                          <View style={[styles.row, {backgroundColor: '#F25487'}]}>
                            <Text style={[styles.cell, styles.headerCell, {flex: 2}]}>Classes</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1}]}>f</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.5}]}>x</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.5}]}>fx</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 2}]}>|x - x̄|</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 2.5}]}>f|x - x̄|</Text>
                          </View>
                          {result.table.map((row, idx) => (
                            <View key={idx} style={[styles.row, idx % 2 !== 0 && styles.oddRow]}>
                              <Text style={[styles.cell, {flex: 2, fontWeight:'bold'}]}>{row.classStr}</Text>
                              <Text style={[styles.cell, {flex: 1}]}>{row.f}</Text>
                              <Text style={[styles.cell, {flex: 1.5}]}>{row.x}</Text>
                              <Text style={[styles.cell, {flex: 1.5}]}>{row.fx}</Text>
                              <Text style={[styles.cell, {flex: 2}]}>{row.dev}</Text>
                              <Text style={[styles.cell, {flex: 2.5, fontWeight:'bold', color: '#F25487'}]}>{row.f_dev}</Text>
                            </View>
                          ))}
                          <View style={[styles.row, {borderTopWidth: 2, backgroundColor: '#fce4ec'}]}>
                            <Text style={[styles.cell, {flex: 2, fontWeight:'bold'}]}>Total</Text>
                            <Text style={[styles.cell, {flex: 1, fontWeight:'bold'}]}>{result.stats.N}</Text>
                            <Text style={[styles.cell, {flex: 1.5}]}>-</Text>
                            <Text style={[styles.cell, {flex: 1.5, fontWeight:'bold'}]}>{result.ct.sum_fx}</Text>
                            <Text style={[styles.cell, {flex: 2}]}>-</Text>
                            <Text style={[styles.cell, {flex: 2.5, fontWeight:'bold', color: '#F25487'}]}>{result.disp.sum_f_abs_dev}</Text>
                          </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              )}

              {/* VARIANCE TAB */}
              {activeTab === 'Variance' && (
                <View>
                  <View style={[styles.statCard, {borderLeftColor: '#7B61FF'}]}>
                    <Text style={styles.statTitleCentered}>SAMPLE VARIANCE & STD DEV</Text>
                    <Text style={styles.theoryNote}>*Using (N - 1) for Sample calculations.</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10}}>
                      <View style={{alignItems:'center'}}><Text style={[styles.statResultBig, {color:'#7B61FF', fontSize: 24}]}>s² = {result.disp.variance}</Text><Text style={{fontSize: 10, color:'#888', fontWeight: 'bold'}}>VARIANCE</Text></View>
                      <View style={{alignItems:'center'}}><Text style={[styles.statResultBig, {color:'#7B61FF', fontSize: 24}]}>s = {result.disp.stdDev}</Text><Text style={{fontSize: 10, color:'#888', fontWeight: 'bold'}}>STD. DEV</Text></View>
                    </View>
                    <View style={styles.subStep}>
                      <Text style={styles.stepTextCentered}>Variance = Σ f(x - x̄)² / (N - 1)</Text>
                      <Text style={styles.stepTextCentered}>{result.disp.sum_f_sq_dev} ÷ {result.stats.N - 1} = {result.disp.variance}</Text>
                    </View>
                  </View>
                  <View style={styles.tableCard}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
                      <View style={{ flex: 1, minWidth: 600 }}>
                          <View style={[styles.row, {backgroundColor: '#7B61FF'}]}>
                            <Text style={[styles.cell, styles.headerCell, {flex: 2}]}>Classes</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1}]}>f</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 1.5}]}>x</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 2}]}>x - x̄</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 2}]}> (x - x̄)²</Text>
                            <Text style={[styles.cell, styles.headerCell, {flex: 2.5}]}>f(x - x̄)²</Text>
                          </View>
                          {result.table.map((row, idx) => (
                            <View key={idx} style={[styles.row, idx % 2 !== 0 && styles.oddRow]}>
                              <Text style={[styles.cell, {flex: 2, fontWeight:'bold'}]}>{row.classStr}</Text>
                              <Text style={[styles.cell, {flex: 1}]}>{row.f}</Text>
                              <Text style={[styles.cell, {flex: 1.5}]}>{row.x}</Text>
                              <Text style={[styles.cell, {flex: 2}]}>{(row.x - result.ct.mean).toFixed(2)}</Text>
                              <Text style={[styles.cell, {flex: 2}]}>{row.sq_dev}</Text>
                              <Text style={[styles.cell, {flex: 2.5, fontWeight:'bold', color: '#7B61FF'}]}>{row.f_sq_dev}</Text>
                            </View>
                          ))}
                          <View style={[styles.row, {borderTopWidth: 2, backgroundColor: '#f3e5f5'}]}>
                            <Text style={[styles.cell, {flex: 2, fontWeight:'bold'}]}>Total</Text>
                            <Text style={[styles.cell, {flex: 1, fontWeight:'bold'}]}>{result.stats.N}</Text>
                            <Text style={[styles.cell, {flex: 5.5}]}></Text>
                            <Text style={[styles.cell, {flex: 2.5, fontWeight:'bold', color: '#7B61FF'}]}>{result.disp.sum_f_sq_dev}</Text>
                          </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              )}

              {/* HOW TO SOLVE TAB */}
              {activeTab === 'HowTo' && (
                <View>
                  <Text style={styles.sectionHeader}>Grouped Data Formulas</Text>
                  
                  <View style={styles.solveCard}>
                      <Text style={styles.solveTitle}>1. Finding Classes via Sturges' Formula</Text>
                      <Text style={styles.formulaText}>Formula: k = 1 + 3.322 log(N)</Text>
                      <View style={styles.substitutionBox}>
                          <Text style={styles.subTextMain}>k = 1 + 3.322 * log({result.stats.N})</Text>
                          <Text style={styles.subTextMain}>k = {result.stats.k_exact} ≈ {result.stats.k_rounded}</Text>
                          <Text style={[styles.subTextMain, {marginTop: 5, color: '#104a28'}]}>Class Width (c) = (Range / k)</Text>
                          <Text style={styles.finalAnswerText}>c = {result.stats.c_rounded}</Text>
                      </View>
                  </View>

                  <View style={styles.solveCard}>
                      <Text style={styles.solveTitle}>2. Mean (x̄)</Text>
                      <Text style={styles.formulaText}>Formula: x̄ = Σfx / n</Text>
                      <View style={styles.substitutionBox}>
                          <Text style={styles.subTextMain}>x̄ = {result.ct.sum_fx} / {result.stats.N}</Text>
                          <Text style={styles.finalAnswerText}>x̄ = {result.ct.mean}</Text>
                      </View>
                  </View>

                  <View style={styles.solveCard}>
                      <Text style={styles.solveTitle}>3. Median (x̃)</Text>
                      <Text style={styles.stepDtl}>• n/2 = {result.stats.N/2} | Median Class: {result.ct.medianClass}</Text>
                      <Text style={styles.formulaText}>Formula: x̃ = Lmd + c [ (n/2 - Fb) / fmd ]</Text>
                      <View style={styles.substitutionBox}>
                          <Text style={styles.subTextMain}>x̃ = {result.ct.lmd} + {result.stats.c_rounded} [ ({result.stats.N/2} - {result.ct.fb}) / {result.ct.fmd} ]</Text>
                          <Text style={styles.finalAnswerText}>x̃ = {result.ct.median}</Text>
                      </View>
                  </View>

                  <View style={styles.solveCard}>
                      <Text style={styles.solveTitle}>4. Mode (x̂)</Text>
                      <Text style={styles.stepDtl}>• Modal Class: {result.ct.modalClass} (Highest freq: {result.ct.f1})</Text>
                      <Text style={styles.formulaText}>Formula: x̂ = Lmo + c [ (f1 - f0) / ((f1 - f0) + (f1 - f2)) ]</Text>
                      <View style={styles.substitutionBox}>
                          <Text style={styles.subTextMain}>x̂ = {result.ct.lmo} + {result.stats.c_rounded} [ ({result.ct.f1} - {result.ct.f0}) / (({result.ct.f1} - {result.ct.f0}) + ({result.ct.f1} - {result.ct.f2})) ]</Text>
                          <Text style={styles.finalAnswerText}>x̂ = {result.ct.mode}</Text>
                      </View>
                  </View>
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
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { color: '#104a28', fontSize: 18, fontWeight: '900' },
  content: { padding: 20, paddingBottom: 50 },

  guidelinesCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guidelinesTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1' },
  guidelinesText: { fontSize: 13, color: '#0f172a', marginBottom: 4, lineHeight: 18 },

  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#4b5563', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#fde68a', gap: 6 },
  exampleBtnText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: '#104a28', marginBottom: 10, textTransform: 'uppercase' },
  textArea: { backgroundColor: '#F8F9FD', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', minHeight: 100, textAlignVertical: 'top', fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  btnContainer: { marginTop: 15, gap: 10 },
  secondaryBtnRow: { flexDirection: 'row', gap: 10 },
  secondaryBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#cbd5e1', alignItems: 'center' },
  secondaryBtnText: { fontWeight: 'bold', color: '#475569' },
  primaryBtn: { width: '100%', paddingVertical: 16, borderRadius: 12, backgroundColor: '#104a28', alignItems: 'center' },
  primaryBtnText: { fontWeight: '900', color: '#fff', fontSize: 16 },
  
  tabContainer: { flexDirection: 'row', marginBottom: 20, paddingBottom: 5 },
  tab: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, backgroundColor: '#f1f5f9', marginRight: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  activeTab: { backgroundColor: '#104a28', borderColor: '#104a28' },
  tabText: { fontWeight: 'bold', color: '#64748b', fontSize: 13 },
  activeTabText: { color: '#fff' },
  
  centralTendencyRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, gap: 10 },
  ctBox: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 10, alignItems: 'center', borderBottomWidth: 4, elevation: 1, borderColor: '#e2e8f0' },
  ctLabel: { fontSize: 11, fontWeight: 'bold', color: '#64748b', marginBottom: 5 },
  ctValue: { fontSize: 18, fontWeight: '900', color: '#0f172a' },
  
  stepCard: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#e2e8f0' },
  stepTitle: { fontWeight: 'bold', marginBottom: 5, color: '#334155', fontSize: 14 },
  theoryNote: { fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: 10, lineHeight: 18 },
  stepItem: { fontSize: 13, color: '#475569', marginBottom: 8, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  
  tableCard: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#e2e8f0', elevation: 1 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingVertical: 14, alignItems: 'center' },
  headerRow: { backgroundColor: '#104a28' },
  oddRow: { backgroundColor: '#f8fafc' },
  cell: { textAlign: 'center', fontSize: 13, color: '#334155', paddingHorizontal: 4 },
  headerCell: { fontWeight: 'bold', color: '#fff', fontSize: 14 },
  
  sectionHeader: { fontSize: 16, fontWeight: 'bold', color: '#334155', marginVertical: 15, textTransform: 'uppercase' },
  solveCard: { backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#e2e8f0', elevation: 1 },
  solveTitle: { fontWeight: 'bold', fontSize: 15, color: '#104a28', marginBottom: 8 },
  formulaText: { fontStyle: 'italic', color: '#64748b', marginBottom: 12, fontSize: 13, fontWeight: 'bold' },
  stepDtl: { fontSize: 12, color: '#64748b', marginBottom: 8 },
  substitutionBox: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: '#104a28' },
  subTextMain: { fontSize: 13, color: '#334155', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  finalAnswerText: { fontSize: 18, fontWeight: '900', color: '#104a28', marginTop: 10 },
  
  statCard: { backgroundColor: '#fff', padding: 25, borderRadius: 16, alignItems: 'center', marginBottom: 20, borderLeftWidth: 5, elevation: 1, borderColor: '#e2e8f0' },
  statTitleCentered: { fontSize: 14, fontWeight: 'bold', color: '#64748b', marginBottom: 5 },
  statResultBig: { fontSize: 36, fontWeight: '900', marginVertical: 10 },
  subStep: { marginTop: 15, backgroundColor: '#f8fafc', padding: 15, borderRadius: 12, width: '100%', borderWidth: 1, borderColor: '#e2e8f0' },
  stepTextCentered: { fontSize: 13, color: '#334155', textAlign: 'center', fontWeight: 'bold', marginVertical: 4, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }
});