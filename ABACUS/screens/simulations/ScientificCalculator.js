import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ScientificCalculator({ navigation }) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (val) => {
    if (result && result !== 'Error' && !['+', '-', '×', '÷', '^'].includes(val)) {
      setInput(val);
      setResult('');
    } else if (result && result !== 'Error') {
      setInput(result + val);
      setResult('');
    } else {
      setInput((prev) => prev + val);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
    setResult('');
  };

  const calculateResult = () => {
    if (!input) return;
    
    try {
      let formattedInput = input
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**'); 

      const evalResult = new Function('return ' + formattedInput)();
      
      if (!isFinite(evalResult) || isNaN(evalResult)) {
        throw new Error('Math Error');
      }

      const finalResult = Number.isInteger(evalResult) 
        ? evalResult.toString() 
        : parseFloat(evalResult.toFixed(6)).toString();

      setResult(finalResult);
    } catch (error) {
      setResult('Error');
    }
  };

  const buttons = [
    ['sin(', 'cos(', 'tan(', 'π'],
    ['log(', 'ln(', '√(', '^'],
    ['C', '⌫', '(', ')'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['.', '0', '=', '+']
  ];

  const getButtonColor = (btn) => {
    if (['C', '⌫'].includes(btn)) return '#ef4444'; 
    if (['=', '+', '-', '×', '÷'].includes(btn)) return '#eab308'; 
    if (['sin(', 'cos(', 'tan(', 'π', 'log(', 'ln(', '√(', '^', '(', ')'].includes(btn)) return '#e2e8f0'; 
    return '#f8fafc'; 
  };

  const getTextColor = (btn) => {
    if (['C', '⌫', '=', '+', '-', '×', '÷'].includes(btn)) return '#ffffff';
    if (['sin(', 'cos(', 'tan(', 'π', 'log(', 'ln(', '√(', '^', '(', ')'].includes(btn)) return '#334155';
    return '#0f172a';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Standard App Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scientific Calculator</Text>
      </View>

      {/* Main Content Area */}
      <View style={styles.content}>
        <View style={styles.calculatorCard}>
            
          {/* Display Screen */}
          <View style={styles.displayContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.inputScroll}>
                <Text style={styles.inputText}>{input || '0'}</Text>
            </ScrollView>
            <Text style={[styles.resultText, result === 'Error' && {color: '#ef4444'}]}>
                {result ? `= ${result}` : ''}
            </Text>
          </View>

          {/* Keypad */}
          <View style={styles.keypadContainer}>
            {buttons.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((btn) => (
                  <TouchableOpacity
                    key={btn}
                    style={[styles.button, { backgroundColor: getButtonColor(btn) }]}
                    onPress={() => {
                      if (btn === 'C') handleClear();
                      else if (btn === '⌫') handleDelete();
                      else if (btn === '=') calculateResult();
                      else handlePress(btn);
                    }}
                  >
                    <Text style={[styles.buttonText, { color: getTextColor(btn) }]}>
                      {btn === '⌫' ? <Ionicons name="backspace-outline" size={22} /> : btn}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Matches the rest of your app
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, 
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
    elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05
  },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  
  // Center the calculator on the screen
  content: {
    flex: 1,
    padding: 15,
    justifyContent: 'center'
  },
  
  // The Calculator Body
  calculatorCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },

  // Display Screen Styling
  displayContainer: { 
      backgroundColor: '#f8fafc', 
      borderRadius: 16, 
      padding: 20, 
      height: 120, // Fixed height so it doesn't expand
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#cbd5e1'
  },
  inputScroll: { alignItems: 'flex-end', justifyContent: 'flex-end', flexGrow: 1 },
  inputText: { fontSize: 32, color: '#334155', fontWeight: '400', letterSpacing: 1 },
  resultText: { fontSize: 24, color: '#10b981', fontWeight: 'bold', marginTop: 5 },
  
  // Keypad Styling
  keypadContainer: { },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  button: { 
      flex: 1, 
      height: 55, // Fixed height instead of aspect ratio
      marginHorizontal: 4, 
      borderRadius: 12, 
      justifyContent: 'center', 
      alignItems: 'center',
      shadowColor: '#000', 
      shadowOffset: {width: 0, height: 1}, 
      shadowOpacity: 0.05, 
      shadowRadius: 2, 
      elevation: 1
  },
  buttonText: { fontSize: 18, fontWeight: '700' }
});