import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar, ScrollView, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ScientificCalculator({ navigation }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isDegree, setIsDegree] = useState(true); // Toggle for Deg/Rad

  // Helper for Factorial (Discrete Math Essential)
  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    return res;
  };

  const handlePress = (val) => {
    if (result && result !== 'Error' && !['+', '-', '×', '÷', '^', '%'].includes(val)) {
      setInput(val);
      setResult('');
    } else if (result && result !== 'Error') {
      setInput(result + val);
      setResult('');
    } else {
      setInput((prev) => prev + val);
    }
  };

  const calculateResult = () => {
    if (!input) return;
    
    try {
      let formattedInput = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/abs\(/g, 'Math.abs(')
        .replace(/\^/g, '**');

      // Adjust Trig for Degrees if active
      const angleMultiplier = isDegree ? '(Math.PI/180)' : '1';
      
      formattedInput = formattedInput
        .replace(/sin\(/g, `Math.sin(${angleMultiplier}*`)
        .replace(/cos\(/g, `Math.cos(${angleMultiplier}*`)
        .replace(/tan\(/g, `Math.tan(${angleMultiplier}*`)
        .replace(/asin\(/g, `(180/Math.PI)*Math.asin(`)
        .replace(/acos\(/g, `(180/Math.PI)*Math.acos(`)
        .replace(/atan\(/g, `(180/Math.PI)*Math.atan(`)
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(');

      // Handle Factorials (Simple regex for integers like 5!)
      formattedInput = formattedInput.replace(/(\d+)!/g, (match, num) => {
        return factorial(parseInt(num));
      });

      const evalResult = new Function('return ' + formattedInput)();
      
      if (!isFinite(evalResult) || isNaN(evalResult)) throw new Error();

      const finalResult = Number.isInteger(evalResult) 
        ? evalResult.toString() 
        : parseFloat(evalResult.toFixed(8)).toString();

      setResult(finalResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const sciButtons = [
    ['sin(', 'cos(', 'tan(', 'deg/rad'],
    ['asin(', 'acos(', 'atan(', 'abs('],
    ['log(', 'ln(', '√(', '^'],
    ['π', 'e', '!', '%']
  ];

  const standardButtons = [
    ['C', '⌫', '(', ')'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['.', '0', '=', '+']
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scientific Calculator</Text>
        <View style={styles.modeBadge}>
            <Text style={styles.modeText}>{isDegree ? 'DEG' : 'RAD'}</Text>
        </View>
      </View>

      <View style={styles.displayContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.inputScroll}>
            <Text style={styles.inputText}>{input || '0'}</Text>
        </ScrollView>
        <Text style={[styles.resultText, result === 'Error' && {color: '#ef4444'}]}>
            {result ? `= ${result}` : ''}
        </Text>
      </View>

      <View style={styles.keypadContainer}>
        {/* Scientific Panel */}
        <View style={styles.sciPanel}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {sciButtons.map((row, rIdx) => (
                    <View key={rIdx} style={styles.sciRow}>
                        {row.map((btn) => (
                            <TouchableOpacity 
                                key={btn} 
                                style={styles.sciButton}
                                onPress={() => btn === 'deg/rad' ? setIsDegree(!isDegree) : handlePress(btn)}
                            >
                                <Text style={styles.sciButtonText}>{btn === 'deg/rad' ? (isDegree ? 'RAD' : 'DEG') : btn}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>

        {/* Standard Panel */}
        {/* ✅ FIX: Added flex: 1 to the standard panel container so it takes up the rest of the screen properly */}
        <View style={styles.standardPanel}>
            {standardButtons.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((btn) => (
                  <TouchableOpacity
                    key={btn}
                    style={[
                        styles.button, 
                        (btn === '=' || ['+', '-', '×', '÷'].includes(btn)) && styles.opButton,
                        (btn === 'C' || btn === '⌫') && styles.delButton
                    ]}
                    onPress={() => {
                      if (btn === 'C') { setInput(''); setResult(''); }
                      else if (btn === '⌫') setInput(prev => prev.slice(0, -1));
                      else if (btn === '=') calculateResult();
                      else handlePress(btn);
                    }}
                  >
                    <Text style={[
                        styles.buttonText, 
                        (btn === '=' || ['+', '-', '×', '÷', 'C', '⌫'].includes(btn)) && {color: '#fff'}
                    ]}>
                      {btn === '⌫' ? <Ionicons name="backspace-outline" size={22} /> : btn}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', 
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  header: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, 
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', justifyContent: 'space-between'
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#104a28' },
  modeBadge: { backgroundColor: '#e0f2fe', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  modeText: { fontSize: 12, fontWeight: '900', color: '#0369a1' },
  
  // ✅ FIX: Replaced fixed height (160) with flex: 0.25 to make it scale dynamically
  displayContainer: { 
      backgroundColor: '#fff', 
      flex: 0.25, 
      padding: 20, 
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      borderBottomWidth: 1,
      borderColor: '#eee'
  },
  inputScroll: { alignItems: 'flex-end', justifyContent: 'flex-end', flexGrow: 1 },
  inputText: { fontSize: 36, color: '#334155', fontWeight: '300' },
  resultText: { fontSize: 28, color: '#10b981', fontWeight: 'bold', marginTop: 5 },
  
  keypadContainer: { flex: 1, padding: 10, backgroundColor: '#fff' },
  
  sciPanel: { marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 10 },
  sciRow: { flexDirection: 'column', marginRight: 10 },
  sciButton: { 
      backgroundColor: '#f1f5f9', 
      paddingHorizontal: 15, 
      paddingVertical: 10, 
      borderRadius: 8, 
      margin: 4, 
      minWidth: 70, 
      alignItems: 'center' 
  },
  sciButtonText: { color: '#475569', fontWeight: 'bold', fontSize: 13 },

  // ✅ FIX: standardPanel added to take up remaining flex space
  standardPanel: { flex: 1 },
  
  // ✅ FIX: Added flex: 1 to rows so they dynamically size themselves to fit any screen
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, flex: 1 },
  
  // ✅ FIX: Removed fixed height (60) so buttons squish or stretch based on the screen size
  button: { 
      flex: 1, 
      marginHorizontal: 5, 
      borderRadius: 16, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f8fafc',
      borderWidth: 1,
      borderColor: '#f1f5f9'
  },
  opButton: { backgroundColor: '#104a28', borderColor: '#104a28' },
  delButton: { backgroundColor: '#ef4444', borderColor: '#ef4444' },
  buttonText: { fontSize: 20, fontWeight: '600', color: '#334155' }
});