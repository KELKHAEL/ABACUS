import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert, Modal, KeyboardAvoidingView, Platform, StatusBar, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';

export default function ZTableSimulation({ navigation }) {
  const [mode, setMode] = useState('left'); 
  const [z1, setZ1] = useState('');
  const [z2, setZ2] = useState(''); 
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [showTheory, setShowTheory] = useState(false);
  
  // Table View State
  const [showTable, setShowTable] = useState(false);
  const [tableType, setTableType] = useState('POSITIVE'); 
  
  const [highlights, setHighlights] = useState([]);

  // ✅ STRICT DECIMAL & NEGATIVE SIGN VALIDATION
  const handleInput = (text, setter) => {
    let cleanText = text.replace(/[^0-9.-]/g, ''); 
    
    // Ensure negative sign is only at the beginning
    if (cleanText.lastIndexOf('-') > 0) {
      cleanText = cleanText.replace(/-/g, '');
      if (text.startsWith('-')) cleanText = '-' + cleanText;
    }

    // Prevent multiple decimals
    const parts = cleanText.split('.');
    if (parts.length > 2) {
      cleanText = parts[0] + '.' + parts.slice(1).join('');
    }

    // Auto-pad with 0 if starting with a decimal point
    if (cleanText.startsWith('.')) cleanText = '0' + cleanText;
    if (cleanText.startsWith('-.')) cleanText = '-0.' + cleanText.substring(2);
    
    setter(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (exMode, val1, val2 = '') => {
      setMode(exMode);
      setZ1(val1);
      setZ2(val2);
      setResult(null);
  };

  // --- MATHEMATICAL LOGIC (CDF) ---
  const calculateCDF = (x) => {
    let z = x / Math.sqrt(2);
    let t = 1 / (1 + 0.3275911 * Math.abs(z));
    let a1 = 0.254829592; let a2 = -0.284496736; let a3 = 1.421413741;
    let a4 = -1.453152027; let a5 = 1.061405429;
    let erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
    let sign = z < 0 ? -1 : 1;
    return 0.5 * (1 + sign * erf);
  };

  const handleCalculate = () => {
    Keyboard.dismiss();
    const val1 = parseFloat(z1);
    const val2 = parseFloat(z2);

    if (isNaN(val1) || val1 < -3.49 || val1 > 3.49) {
      Alert.alert("Input Error", "Please enter a valid Z-score between -3.49 and 3.49.");
      return;
    }

    let area = 0;
    let stepLog = [];
    let newHighlights = [];

    // Helper to safely generate table highlighting coordinates
    const processHighlight = (zValue) => {
        const absVal = Math.abs(zValue);
        let r = (Math.floor(absVal * 10) / 10).toFixed(1);
        if (zValue < 0 && r !== "0.0") r = "-" + r;
        if (zValue >= 0 && r === "-0.0") r = "0.0";
        const c = Math.round((absVal * 100) % 10);
        newHighlights.push({ rowStr: r, colIdx: c, type: zValue < 0 ? 'NEGATIVE' : 'POSITIVE' });
    };

    processHighlight(val1);

    if (mode === 'left') {
      area = calculateCDF(val1);
      stepLog.push(`1. Look up Z = ${val1} in the Z-Table.`);
      stepLog.push(`2. Find row ${newHighlights[0].rowStr} and column .0${newHighlights[0].colIdx}.`);
      stepLog.push(`3. The table gives the exact area to the LEFT.`);
      stepLog.push(`Result: P(Z < ${val1}) = ${area.toFixed(4)}`);
    } else if (mode === 'right') {
      const leftArea = calculateCDF(val1);
      area = 1 - leftArea;
      stepLog.push(`1. Look up Z = ${val1} in the Z-Table.`);
      stepLog.push(`2. The table gives the area to the left: ${leftArea.toFixed(4)}.`);
      stepLog.push(`3. Since the TOTAL area under a curve is exactly 1.0, we subtract the left area from 1 to find the remaining right area.`);
      stepLog.push(`Calculation: 1.0000 - ${leftArea.toFixed(4)} = ${area.toFixed(4)}`);
    } else if (mode === 'between') {
      if (isNaN(val2) || val2 < -3.49 || val2 > 3.49) { 
          Alert.alert("Input Error", "Please enter a valid second Z-score between -3.49 and 3.49."); 
          return; 
      }
      
      processHighlight(val2);

      const lower = Math.min(val1, val2);
      const higher = Math.max(val1, val2);
      const areaHigh = calculateCDF(higher);
      const areaLow = calculateCDF(lower);
      area = areaHigh - areaLow;

      stepLog.push(`1. Identify bounds: Lower Z = ${lower}, Upper Z = ${higher}.`);
      stepLog.push(`2. Look up the upper bound (${higher}) in the Z-Table: ${areaHigh.toFixed(4)}.`);
      stepLog.push(`3. Look up the lower bound (${lower}) in the Z-Table: ${areaLow.toFixed(4)}.`);
      stepLog.push(`4. Subtract the smaller "tail" area from the larger area to isolate the chunk in the middle.`);
      stepLog.push(`Calculation: ${areaHigh.toFixed(4)} - ${areaLow.toFixed(4)} = ${area.toFixed(4)}`);
    }

    setHighlights(newHighlights);
    setTableType(val1 < 0 ? 'NEGATIVE' : 'POSITIVE');
    setResult({ val1, val2: mode === 'between' ? val2 : null, area: area.toFixed(4) });
    setSteps(stepLog);
  };

  // --- MEMOIZED Z-TABLE GENERATOR ---
  const zTableData = useMemo(() => {
    const generate = (isPositive) => {
        let rows = [];
        let start = isPositive ? 0.0 : -3.4;
        let end = isPositive ? 3.4 : -0.0;
        
        for (let i = start; i <= end + 0.05; i += 0.1) {
            let zBaseStr = Math.abs(i) < 0.05 ? (isPositive ? "0.0" : "-0.0") : i.toFixed(1);
            let rowVals = [];
            for (let c = 0; c <= 9; c++) {
                let zVal = isPositive ? (i + (c / 100)) : (i - (c / 100));
                rowVals.push(calculateCDF(zVal).toFixed(4));
            }
            rows.push({ zBase: zBaseStr, cols: rowVals });
        }
        return isPositive ? rows : rows.reverse();
    };
    return { POSITIVE: generate(true), NEGATIVE: generate(false) };
  }, []);

  // --- SVG BELL CURVE GENERATOR ---
  const renderVisualCurve = () => {
    if (!result) return null;
    
    let curvePath = `M 0 150`;
    for (let i = 0; i <= 300; i += 5) {
        let x = (i - 150) / 40; 
        let y = Math.exp(-0.5 * x * x);
        let pixelY = 150 - (y * 120);
        curvePath += ` L ${i} ${pixelY}`;
    }
    curvePath += ` L 300 150 Z`;

    const getXPosition = (z) => {
        let clampedZ = Math.max(-3.75, Math.min(3.75, parseFloat(z)));
        return 150 + (clampedZ * 40);
    };

    let shadePath = '';
    if (mode === 'left') {
        let xLim = getXPosition(result.val1);
        shadePath = `M 0 150`;
        for (let i = 0; i <= xLim; i += 5) {
            let x = (i - 150) / 40;
            shadePath += ` L ${i} ${150 - (Math.exp(-0.5 * x * x) * 120)}`;
        }
        shadePath += ` L ${xLim} 150 Z`;
    } else if (mode === 'right') {
        let xLim = getXPosition(result.val1);
        shadePath = `M ${xLim} 150`;
        for (let i = xLim; i <= 300; i += 5) {
            let x = (i - 150) / 40;
            shadePath += ` L ${i} ${150 - (Math.exp(-0.5 * x * x) * 120)}`;
        }
        shadePath += ` L 300 150 Z`;
    } else if (mode === 'between') {
        const lower = Math.min(result.val1, result.val2);
        const upper = Math.max(result.val1, result.val2);
        let xLow = getXPosition(lower);
        let xHigh = getXPosition(upper);
        shadePath = `M ${xLow} 150`;
        for (let i = xLow; i <= xHigh; i += 5) {
            let x = (i - 150) / 40;
            shadePath += ` L ${i} ${150 - (Math.exp(-0.5 * x * x) * 120)}`;
        }
        shadePath += ` L ${xHigh} 150 Z`;
    }

    return (
        <View style={styles.svgWrapper}>
            <Text style={styles.vizLabel}>Standard Normal Curve</Text>
            <Svg height="170" width="300" viewBox="0 0 300 170">
                <Path d={curvePath} fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                <Path d={shadePath} fill="rgba(16, 185, 129, 0.4)" stroke="#10b981" strokeWidth="2" />
                <Line x1="150" y1="30" x2="150" y2="150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4,4" />
                <SvgText x="150" y="165" fill="#64748b" fontSize="10" textAnchor="middle">μ=0</SvgText>
            </Svg>
            <Text style={styles.vizSubText}>Shaded region area = {result.area}</Text>
        </View>
    );
  };

  const currentTableHighlights = highlights.filter(h => h.type === tableType);
  const activeCols = currentTableHighlights.map(h => h.colIdx);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#104a28" />
            </TouchableOpacity>
            <Text style={styles.title}>Z-Table Calculator</Text>
            <View style={{width:24}} />
        </View>

        {/* ✅ GUIDELINES CARD */}
        <View style={styles.guidelinesCard}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                <Ionicons name="information-circle" size={22} color="#0284c7" />
                <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
            </View>
            <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Z-Score Limit:</Text> Values must be between -3.49 and +3.49.</Text>
            <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Decimals:</Text> Use a period (.) for decimals. Maximum 2 decimal places are used for table lookups.</Text>
            <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>What is it?</Text> A Z-score tells you exactly how many standard deviations a value is away from the mean.</Text>
        </View>

        {/* 📚 THEORY CARD */}
        <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
          <Ionicons name="book" size={20} color="#104a28" />
          <Text style={styles.theoryToggleText}>How to use the Z-Table</Text>
          <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
        </TouchableOpacity>
        
        {showTheory && (
          <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>The standard Z-table ONLY shows the cumulative probability (the shaded area to the <Text style={{fontWeight:'bold'}}>LEFT</Text>) of a given Z-score.</Text>
              <Text style={styles.theoryText}>To find the area to the <Text style={{fontWeight:'bold'}}>RIGHT</Text>, you must subtract the table's value from 1.0.</Text>
              <TouchableOpacity style={styles.viewTableBtn} onPress={() => setShowTable(true)}>
                  <Ionicons name="grid" size={18} color="#fff" />
                  <Text style={styles.viewTableBtnText}>View Interactive Z-Table</Text>
              </TouchableOpacity>
          </View>
        )}

        {/* ✅ PRESET EXAMPLES */}
        <Text style={styles.sectionHeader}>Try a Real-World Scenario</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
            <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('right', '1.33')}>
                <Ionicons name="body-outline" size={16} color="#b45309" />
                <Text style={styles.exampleBtnText}>High IQ Score (Z = 1.33, Right)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('left', '-0.85')}>
                <Ionicons name="trending-down-outline" size={16} color="#b45309" />
                <Text style={styles.exampleBtnText}>Below Average Height (Z = -0.85, Left)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('between', '-1.00', '1.00')}>
                <Ionicons name="swap-horizontal-outline" size={16} color="#b45309" />
                <Text style={styles.exampleBtnText}>Average Majority (Between ±1.0)</Text>
            </TouchableOpacity>
        </ScrollView>

        {/* INPUT SECTION */}
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>1. Select Shade Region</Text>
            <View style={styles.modeRow}>
                <TouchableOpacity style={[styles.modeBtn, mode === 'left' && styles.modeActive]} onPress={() => {setMode('left'); setResult(null);}}>
                    <Text style={[styles.modeText, mode === 'left' && styles.textActive]}>Left Area</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modeBtn, mode === 'right' && styles.modeActive]} onPress={() => {setMode('right'); setResult(null);}}>
                    <Text style={[styles.modeText, mode === 'right' && styles.textActive]}>Right Area</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modeBtn, mode === 'between' && styles.modeActive]} onPress={() => {setMode('between'); setResult(null);}}>
                    <Text style={[styles.modeText, mode === 'between' && styles.textActive]}>Between</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>2. Enter Z-Score</Text>
            <View style={styles.inputRow}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>{mode === 'between' ? 'Lower Z1' : 'Z Score'}</Text>
                    <TextInput style={styles.input} placeholder="e.g. 1.96" keyboardType="numeric" value={z1} onChangeText={(t) => handleInput(t, setZ1)} />
                </View>
                
                {mode === 'between' && (
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Upper Z2</Text>
                        <TextInput style={styles.input} placeholder="e.g. 2.58" keyboardType="numeric" value={z2} onChangeText={(t) => handleInput(t, setZ2)} />
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate}>
                <Text style={styles.calcBtnText}>Calculate Probability</Text>
            </TouchableOpacity>
        </View>

        {/* OUTPUT SECTION */}
        {result !== null && (
            <View style={styles.resultContainer}>
                
                {renderVisualCurve()}

                <View style={styles.resultBox}>
                    <Text style={styles.resultLabel}>Calculated Area (Probability)</Text>
                    <Text style={styles.resultValue}>{result.area}</Text>
                    <TouchableOpacity style={styles.viewHighlightBtn} onPress={() => setShowTable(true)}>
                        <Text style={styles.viewHighlightText}>See how to find this in the Table →</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.stepsBox}>
                    <View style={{flexDirection:'row', marginBottom: 10, alignItems:'center', gap: 6}}>
                       <Ionicons name="school" size={18} color="#2D7FF9" />
                       <Text style={styles.stepTitle}>Solution Logic:</Text>
                    </View>
                    {steps.map((step, index) => (
                        <Text key={index} style={styles.stepText}>{step}</Text>
                    ))}
                </View>
            </View>
        )}
      </ScrollView>

      {/* 📊 INTERACTIVE Z-TABLE MODAL */}
      <Modal visible={showTable} animationType="slide" presentationStyle="formSheet">
          <SafeAreaView style={{flex: 1, backgroundColor: '#f8fafc'}}>
              <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Standard Normal Z-Table</Text>
                  <TouchableOpacity onPress={() => setShowTable(false)} style={styles.closeBtn}>
                      <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
              </View>
              
              <View style={styles.tableToggleRow}>
                  <TouchableOpacity style={[styles.tableToggleBtn, tableType === 'NEGATIVE' && styles.tableToggleActive]} onPress={() => setTableType('NEGATIVE')}>
                      <Text style={[styles.tableToggleText, tableType === 'NEGATIVE' && styles.textActive]}>Negative Z (-)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.tableToggleBtn, tableType === 'POSITIVE' && styles.tableToggleActive]} onPress={() => setTableType('POSITIVE')}>
                      <Text style={[styles.tableToggleText, tableType === 'POSITIVE' && styles.textActive]}>Positive Z (+)</Text>
                  </TouchableOpacity>
              </View>
              
              <Text style={styles.tableInstruction}>
                  Values inside table represent Area to the LEFT of Z.
              </Text>
              
              {highlights.length === 2 && highlights[0].type !== highlights[1].type && (
                  <Text style={styles.splitNote}>
                      Note: Your Z-Scores span both Negative and Positive values. Toggle the view to see both lookups!
                  </Text>
              )}

              <ScrollView horizontal showsHorizontalScrollIndicator={true} bounces={false}>
                  <ScrollView style={{flex: 1}} bounces={false}>
                      <View style={styles.tableWrapper}>
                          <View style={styles.tableRowHeader}>
                              <View style={[styles.cellHeader, {width: 50}]}><Text style={styles.cellHeaderText}>Z</Text></View>
                              {[0,1,2,3,4,5,6,7,8,9].map(c => (
                                  <View key={c} style={[styles.cellHeader, activeCols.includes(c) && styles.cellHighlightTop]}>
                                      <Text style={styles.cellHeaderText}>.0{c}</Text>
                                  </View>
                              ))}
                          </View>
                          
                          {zTableData[tableType].map((row, rIdx) => {
                              const rowHighlights = currentTableHighlights.filter(h => h.rowStr === row.zBase);
                              const isRowActive = rowHighlights.length > 0;

                              return (
                                  <View key={rIdx} style={[styles.tableRow, isRowActive && styles.rowHighlight]}>
                                      <View style={[styles.cellZBase, isRowActive && styles.cellZBaseActive]}>
                                          <Text style={[styles.cellZBaseText, isRowActive && {color: 'white'}]}>{row.zBase}</Text>
                                      </View>
                                      
                                      {row.cols.map((val, cIdx) => {
                                          const isCellActive = rowHighlights.some(h => h.colIdx === cIdx);
                                          return (
                                              <View key={cIdx} style={[styles.cellValue, isCellActive && styles.cellValueActive]}>
                                                  <Text style={[styles.cellValueText, isCellActive && {color: 'white', fontWeight: 'bold'}]}>
                                                      {val.replace('0.', '.')}
                                                  </Text>
                                              </View>
                                          );
                                      })}
                                  </View>
                              );
                          })}
                      </View>
                  </ScrollView>
              </ScrollView>
          </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  content: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#104a28'},
  
  guidelinesCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guidelinesTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1' },
  guidelinesText: { fontSize: 13, color: '#0f172a', marginBottom: 4, lineHeight: 18 },

  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#4b5563', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#fde68a', gap: 6 },
  exampleBtnText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },

  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: '#f0fdf4', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#bbf7d0' },
  theoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#166534', marginBottom: 8 },
  theoryText: { fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: 15 },
  viewTableBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#104a28', paddingVertical: 12, borderRadius: 8 },
  viewTableBtnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, elevation: 2 },
  sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#64748b', marginBottom: 10, textTransform: 'uppercase' },
  
  modeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  modeBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#f1f5f9', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  modeActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  modeText: { fontWeight: 'bold', color: '#64748b', fontSize: 13 },
  textActive: { color: 'white' },

  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  inputWrapper: { flex: 1 },
  inputLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 5, color: '#64748b' },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, padding: 15, fontSize: 18, fontFamily: 'monospace', textAlign: 'center' },

  calcBtn: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultContainer: { gap: 15, paddingBottom: 30 },
  
  svgWrapper: { backgroundColor: 'white', borderRadius: 12, padding: 20, elevation: 2, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  vizLabel: { fontWeight: 'bold', color: '#334155', marginBottom: 10, fontSize: 15 },
  vizSubText: { fontSize: 12, color: '#94a3b8', fontStyle: 'italic', marginTop: 10 },

  resultBox: { backgroundColor: '#ecfdf5', padding: 20, borderRadius: 12, alignItems: 'center', borderLeftWidth: 5, borderLeftColor: '#10b981', borderWidth: 1, borderColor: '#d1fae5' },
  resultLabel: { fontSize: 13, color: '#047857', fontWeight: 'bold', textTransform: 'uppercase' },
  resultValue: { fontSize: 36, fontWeight: '900', color: '#064e3b', marginVertical: 5, fontFamily: 'monospace' },
  viewHighlightBtn: { marginTop: 10 },
  viewHighlightText: { color: '#059669', fontWeight: 'bold', fontSize: 13, textDecorationLine: 'underline' },

  stepsBox: { backgroundColor: '#f8fafc', padding: 20, borderRadius: 12, elevation: 2, borderWidth: 1, borderColor: '#e2e8f0', borderLeftWidth: 4, borderLeftColor: '#2D7FF9' },
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#1565C0' },
  stepText: { fontSize: 14, color: '#475569', marginBottom: 6, lineHeight: 22, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },

  // --- MODAL Z-TABLE STYLES ---
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },
  closeBtn: { padding: 5 },
  
  tableToggleRow: { flexDirection: 'row', padding: 15, backgroundColor: '#f8fafc' },
  tableToggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: '#cbd5e1', backgroundColor: 'white' },
  tableToggleActive: { backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
  tableToggleText: { fontWeight: 'bold', color: '#475569' },
  
  tableInstruction: { textAlign: 'center', color: '#64748b', fontStyle: 'italic', fontSize: 12, marginBottom: 10 },
  splitNote: { textAlign: 'center', color: '#0369a1', fontWeight: 'bold', fontSize: 12, marginHorizontal: 20, marginBottom: 10 },
  
  tableWrapper: { backgroundColor: 'white', margin: 15, borderWidth: 1, borderColor: '#cbd5e1', alignSelf: 'flex-start' },
  tableRowHeader: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderBottomWidth: 2, borderBottomColor: '#cbd5e1' },
  cellHeader: { width: 55, paddingVertical: 10, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#cbd5e1' },
  cellHeaderText: { fontWeight: 'bold', color: '#334155' },
  cellHighlightTop: { backgroundColor: '#bfdbfe' },
  
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  rowHighlight: { backgroundColor: '#eff6ff' },
  
  cellZBase: { width: 50, paddingVertical: 8, alignItems: 'center', backgroundColor: '#f1f5f9', borderRightWidth: 2, borderRightColor: '#cbd5e1' },
  cellZBaseActive: { backgroundColor: '#3b82f6' },
  cellZBaseText: { fontWeight: 'bold', color: '#334155' },
  
  cellValue: { width: 55, paddingVertical: 8, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#e2e8f0' },
  cellValueText: { fontFamily: 'monospace', color: '#475569', fontSize: 13 },
  cellValueActive: { backgroundColor: '#2563eb' }
});