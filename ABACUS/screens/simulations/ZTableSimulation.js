import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ZTableSimulation({ navigation }) {
  const [mode, setMode] = useState('left'); // 'left', 'right', 'between'
  const [z1, setZ1] = useState('');
  const [z2, setZ2] = useState(''); // Only for 'between' mode
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);

  // --- MATHEMATICAL LOGIC ---
  // We use the Error Function approximation to calculate the Cumulative Distribution Function (CDF)
  // This replaces looking up a manual table array.
  const calculateCDF = (x) => {
    let z = x / Math.sqrt(2);
    let t = 1 / (1 + 0.3275911 * Math.abs(z));
    let a1 = 0.254829592;
    let a2 = -0.284496736;
    let a3 = 1.421413741;
    let a4 = -1.453152027;
    let a5 = 1.061405429;
    let erf = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z);
    let sign = z < 0 ? -1 : 1;
    return 0.5 * (1 + sign * erf);
  };

  const handleCalculate = () => {
    const val1 = parseFloat(z1);
    const val2 = parseFloat(z2);

    if (isNaN(val1)) {
      Alert.alert("Input Error", "Please enter a valid Z-score.");
      return;
    }

    let area = 0;
    let stepLog = [];

    if (mode === 'left') {
      // 1. AREA TO THE LEFT
      area = calculateCDF(val1);
      stepLog.push(`Step 1: Identify Z-Score: ${val1}`);
      stepLog.push(`Step 2: Look up Z=${val1} in the Standard Normal Table.`);
      stepLog.push(`Step 3: The area to the left is simply the table value.`);
      stepLog.push(`Result: P(Z < ${val1}) = ${area.toFixed(4)}`);
    
    } else if (mode === 'right') {
      // 2. AREA TO THE RIGHT
      const leftArea = calculateCDF(val1);
      area = 1 - leftArea;
      stepLog.push(`Step 1: Identify Z-Score: ${val1}`);
      stepLog.push(`Step 2: Find area to the left: ${leftArea.toFixed(4)}`);
      stepLog.push(`Step 3: Subtract from 1 (Total Area).`);
      stepLog.push(`Calculation: 1 - ${leftArea.toFixed(4)} = ${area.toFixed(4)}`);
      stepLog.push(`Result: P(Z > ${val1}) = ${area.toFixed(4)}`);

    } else if (mode === 'between') {
      // 3. AREA BETWEEN
      if (isNaN(val2)) {
        Alert.alert("Input Error", "Please enter the second Z-score.");
        return;
      }
      // Ensure val1 is the smaller number for logical display
      const lower = Math.min(val1, val2);
      const higher = Math.max(val1, val2);
      
      const areaHigh = calculateCDF(higher);
      const areaLow = calculateCDF(lower);
      area = areaHigh - areaLow;

      stepLog.push(`Step 1: Identify Z-Scores: ${lower} and ${higher}`);
      stepLog.push(`Step 2: Find area to the left of ${higher}: ${areaHigh.toFixed(4)}`);
      stepLog.push(`Step 3: Find area to the left of ${lower}: ${areaLow.toFixed(4)}`);
      stepLog.push(`Step 4: Subtract the smaller area from the larger area.`);
      stepLog.push(`Calculation: ${areaHigh.toFixed(4)} - ${areaLow.toFixed(4)} = ${area.toFixed(4)}`);
      stepLog.push(`Result: P(${lower} < Z < ${higher}) = ${area.toFixed(4)}`);
    }

    setResult(area.toFixed(4));
    setSteps(stepLog);
  };

  // --- RENDER VISUALIZATION ---
  // A simplified visual representation using Views
  const renderVisualization = () => {
    if (result === null) return null;
    
    return (
        <View style={styles.vizContainer}>
            <Text style={styles.vizLabel}>Standard Normal Curve</Text>
            <View style={styles.bellCurveBase}>
                <View style={styles.bellCurvePeak} />
                
                {/* Visual Marker for Z-Score (Approximate positioning) */}
                <View style={[
                    styles.zMarker, 
                    { 
                        left: `${50 + (parseFloat(z1) * 10)}%`, // Rough mapping of Z to % position 
                        backgroundColor: mode === 'right' ? '#d32f2f' : '#104a28'
                    }
                ]} />
                
                {mode === 'between' && (
                    <View style={[
                        styles.zMarker, 
                        { left: `${50 + (parseFloat(z2) * 10)}%`, backgroundColor: '#104a28' }
                    ]} />
                )}
            </View>
            <Text style={styles.vizSubText}>
                (Visual approximation: The shaded region represents {result})
            </Text>
        </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Z-Table Calculator</Text>
            <View style={{width:24}} />
        </View>

        {/* INPUT SECTION */}
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>1. Select Operation</Text>
            <View style={styles.modeRow}>
                <TouchableOpacity 
                    style={[styles.modeBtn, mode === 'left' && styles.modeActive]} 
                    onPress={() => {setMode('left'); setResult(null);}}
                >
                    <Text style={[styles.modeText, mode === 'left' && styles.textActive]}>Left</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.modeBtn, mode === 'right' && styles.modeActive]} 
                    onPress={() => {setMode('right'); setResult(null);}}
                >
                    <Text style={[styles.modeText, mode === 'right' && styles.textActive]}>Right</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.modeBtn, mode === 'between' && styles.modeActive]} 
                    onPress={() => {setMode('between'); setResult(null);}}
                >
                    <Text style={[styles.modeText, mode === 'between' && styles.textActive]}>Between</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>2. Enter Z-Score</Text>
            <View style={styles.inputRow}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>{mode === 'between' ? 'Z1' : 'Z'}</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="-1.35" 
                        keyboardType="numeric"
                        value={z1}
                        onChangeText={setZ1}
                    />
                </View>
                
                {mode === 'between' && (
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Z2</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder="2.0" 
                            keyboardType="numeric"
                            value={z2}
                            onChangeText={setZ2}
                        />
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.calcBtn} onPress={handleCalculate}>
                <Text style={styles.calcBtnText}>Calculate Area</Text>
            </TouchableOpacity>
        </View>

        {/* OUTPUT SECTION */}
        {result !== null && (
            <View style={styles.resultContainer}>
                
                {renderVisualization()}

                <View style={styles.resultBox}>
                    <Text style={styles.resultLabel}>Calculated Area (Probability)</Text>
                    <Text style={styles.resultValue}>{result}</Text>
                </View>

                <View style={styles.stepsBox}>
                    <Text style={styles.stepTitle}>Solution Steps:</Text>
                    {steps.map((step, index) => (
                        <Text key={index} style={styles.stepText}>{step}</Text>
                    ))}
                </View>
            </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  content: { padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  
  card: { backgroundColor: '#fff', borderRadius: 15, padding: 20, marginBottom: 20, elevation: 3 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#555', marginBottom: 10, textTransform: 'uppercase' },
  
  modeRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  modeBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, backgroundColor: '#f0f0f0', alignItems: 'center' },
  modeActive: { backgroundColor: '#104a28' },
  modeText: { fontWeight: '600', color: '#555' },
  textActive: { color: '#fff' },

  inputRow: { flexDirection: 'row', gap: 15, marginBottom: 20 },
  inputWrapper: { flex: 1 },
  inputLabel: { fontSize: 12, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#F8F9FD', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },

  calcBtn: { backgroundColor: '#104a28', padding: 15, borderRadius: 10, alignItems: 'center' },
  calcBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  resultContainer: { gap: 15 },
  
  vizContainer: { alignItems: 'center', marginVertical: 10 },
  vizLabel: { fontWeight: 'bold', color: '#555', marginBottom: 5 },
  bellCurveBase: { width: '100%', height: 100, borderBottomWidth: 2, borderColor: '#333', position: 'relative', alignItems: 'center', justifyContent: 'flex-end' },
  bellCurvePeak: { width: '60%', height: '80%', borderTopLeftRadius: 100, borderTopRightRadius: 100, borderLeftWidth: 2, borderRightWidth: 2, borderTopWidth: 2, borderColor: '#888' },
  zMarker: { position: 'absolute', bottom: 0, width: 2, height: '60%', backgroundColor: 'red' },
  vizSubText: { fontSize: 12, color: '#888', fontStyle: 'italic', marginTop: 5 },

  resultBox: { backgroundColor: '#e8f5e9', padding: 20, borderRadius: 12, alignItems: 'center', borderLeftWidth: 5, borderLeftColor: '#104a28' },
  resultLabel: { fontSize: 14, color: '#104a28', fontWeight: 'bold' },
  resultValue: { fontSize: 32, fontWeight: '900', color: '#104a28', marginTop: 5 },

  stepsBox: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 2 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  stepText: { fontSize: 14, color: '#444', marginBottom: 6, lineHeight: 22 },
});