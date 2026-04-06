import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Get screen width to calculate dynamic centering
const SCREEN_WIDTH = Dimensions.get('window').width;

// Define strict column widths for the spreadsheet
const VAR_COL_WIDTH = 60;
const EXPR_COL_WIDTH = 160;

export default function TruthTableSimulation({ navigation }) {
  const [expression, setExpression] = useState('');
  const [tableData, setTableData] = useState(null);
  const [showTheory, setShowTheory] = useState(false);
  const [variables, setVariables] = useState([]);
  const [subHeaders, setSubHeaders] = useState([]);

  // --- LOGIC EVALUATOR WITH INTERMEDIATE STEP TRACKING ---
  
  const getSymbol = (op) => {
      if (op === 'AND') return '∧';
      if (op === 'OR') return '∨';
      if (op === 'NOT') return '¬';
      if (op === 'XOR') return '⊕';
      if (op === 'IMPLIES') return '→';
      return op;
  };

  const getPrecedence = (op) => {
      if (op === 'NOT') return 4;
      if (op === 'AND') return 3;
      if (op === 'XOR') return 2;
      if (op === 'OR') return 1;
      if (op === 'IMPLIES') return 0;
      return -1;
  };

  const infixToPostfix = (tokens) => {
      const output = [];
      const opStack = [];

      for (let token of tokens) {
          if (/^[a-zA-Z]$/.test(token) || token === 'T' || token === 'F') {
              output.push(token);
          } else if (token === '(') {
              opStack.push(token);
          } else if (token === ')') {
              while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
                  output.push(opStack.pop());
              }
              if (opStack.length === 0) throw new Error("Mismatched parentheses");
              opStack.pop(); 
          } else {
              while (
                  opStack.length > 0 && 
                  opStack[opStack.length - 1] !== '(' &&
                  getPrecedence(opStack[opStack.length - 1]) >= getPrecedence(token)
              ) {
                  output.push(opStack.pop());
              }
              opStack.push(token);
          }
      }

      while (opStack.length > 0) {
          const op = opStack.pop();
          if (op === '(') throw new Error("Mismatched parentheses");
          output.push(op);
      }

      return output;
  };

  const evaluatePostfixWithSteps = (postfix, rowEnv, headerCollector = null) => {
      const stack = [];
      const steps = {};

      for (let token of postfix) {
          if (rowEnv.hasOwnProperty(token)) {
              stack.push({ str: token, val: rowEnv[token] });
          } else if (token === 'T') {
              stack.push({ str: 'T', val: true });
          } else if (token === 'F') {
              stack.push({ str: 'F', val: false });
          } else if (token === 'NOT') {
              if (stack.length < 1) throw new Error();
              const operand = stack.pop();
              
              const isComplex = operand.str.length > 1 && !operand.str.startsWith('¬');
              const exprStr = isComplex ? `¬(${operand.str})` : `¬${operand.str}`;
              const val = !operand.val;
              
              if (headerCollector && !headerCollector.includes(exprStr) && !rowEnv.hasOwnProperty(exprStr)) {
                  headerCollector.push(exprStr);
              }
              steps[exprStr] = val;
              stack.push({ str: exprStr, val });
          } else {
              if (stack.length < 2) throw new Error();
              const right = stack.pop();
              const left = stack.pop();
              let val;
              
              if (token === 'AND') val = left.val && right.val;
              else if (token === 'OR') val = left.val || right.val;
              else if (token === 'XOR') val = left.val !== right.val;
              else if (token === 'IMPLIES') val = !left.val || right.val;

              const exprStr = `(${left.str} ${getSymbol(token)} ${right.str})`;
              
              if (headerCollector && !headerCollector.includes(exprStr) && !rowEnv.hasOwnProperty(exprStr)) {
                  headerCollector.push(exprStr);
              }
              steps[exprStr] = val;
              stack.push({ str: exprStr, val });
          }
      }

      if (stack.length !== 1) throw new Error();
      return { result: stack[0].val, steps, finalStr: stack[0].str };
  };

  const generateTable = () => {
    if (!expression.trim()) {
      alert("Please enter a logical expression.");
      return;
    }

    try {
        let cleanExpr = expression
            .replace(/<->|↔|iff/gi, " XOR NOT ") 
            .replace(/->|implies|→/gi, " IMPLIES ")
            .replace(/\bAND\b|∧|&/gi, " AND ")
            .replace(/\bOR\b|∨|\|/gi, " OR ")
            .replace(/\bNOT\b|¬|~/gi, " NOT ")
            .replace(/\bXOR\b|⊕|\^/gi, " XOR ")
            .replace(/\(/g, " ( ")
            .replace(/\)/g, " ) ");

        const rawTokens = cleanExpr.split(/\s+/).filter(t => t.length > 0);
        
        const validOperators = ['AND', 'OR', 'NOT', 'XOR', 'IMPLIES', '(', ')', 'T', 'F'];
        const tokens = rawTokens.map(t => {
            const upperT = t.toUpperCase();
            if (validOperators.includes(upperT)) return upperT;
            if (/^[a-zA-Z]$/.test(t)) return t.toLowerCase();
            throw new Error(`Invalid token found: '${t}'`);
        });

        const varsFound = [...new Set(tokens.filter(t => /^[a-z]$/.test(t)))].sort();
        
        if (varsFound.length === 0) {
            alert("No variables (like p, q) found in expression.");
            return;
        }
        if (varsFound.length > 4) {
            alert("Please use a maximum of 4 variables to prevent lag.");
            return;
        }

        setVariables(varsFound);
        const postfix = infixToPostfix(tokens);

        const collectedHeaders = [];
        let dummyEnv = {};
        varsFound.forEach(v => dummyEnv[v] = true);
        evaluatePostfixWithSteps(postfix, dummyEnv, collectedHeaders);
        setSubHeaders(collectedHeaders);

        const numRows = Math.pow(2, varsFound.length);
        const rows = [];

        for (let i = numRows - 1; i >= 0; i--) {
            let rowEnv = {};
            for (let v = 0; v < varsFound.length; v++) {
                rowEnv[varsFound[v]] = Boolean((i & (1 << (varsFound.length - 1 - v))));
            }

            const evaluated = evaluatePostfixWithSteps(postfix, rowEnv, null);
            rows.push({ inputs: rowEnv, steps: evaluated.steps, result: evaluated.result });
        }

        setTableData(rows);

    } catch (err) {
        alert(err.message === "Mismatched parentheses" 
            ? "Syntax Error: Mismatched parentheses." 
            : "Syntax Error: Invalid expression format.");
    }
  };

  const insertText = (text) => {
    setExpression(prev => {
        const spacer = prev.endsWith(' ') || prev.length === 0 ? '' : ' ';
        return prev + spacer + text + ' ';
    });
  };

  // ✅ CALCULATE TABLE WIDTH TO DETERMINE CENTERING
  const calculatedTableWidth = (variables.length * VAR_COL_WIDTH) + (subHeaders.length * EXPR_COL_WIDTH);
  // Screen width minus the padding of the cards (approx 80px buffer)
  const isSmallTable = calculatedTableWidth < (SCREEN_WIDTH - 80);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Truth Tables</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn Logic Gates</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>The calculator uses standard mathematical precedence:</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>1. Parentheses</Text> ( )</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>2. NOT</Text> (~, ¬)</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>3. AND</Text> (^, &)</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>4. XOR</Text> (⊕)</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>5. OR</Text> (v, |)</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>6. IMPLIES</Text> (-{'>'})</Text>
            </View>
          )}

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Build Expression</Text>
            
            <View style={styles.exampleBox}>
                <Text style={styles.exampleTitle}>Valid Examples:</Text>
                <Text style={styles.exampleText}>• p AND q OR r</Text>
                <Text style={styles.exampleText}>• p AND ( q OR NOT r )</Text>
                <Text style={styles.exampleText}>• p -{">"} q</Text>
            </View>
            
            <TextInput 
                style={styles.input} 
                value={expression} 
                onChangeText={setExpression} 
                placeholder="p AND q OR r" 
                autoCapitalize="none"
            />

            <View style={styles.quickButtonsContainer}>
                {['AND', 'OR', 'NOT', 'XOR', '->', '(', ')'].map(op => (
                    <TouchableOpacity key={op} style={styles.quickButton} onPress={() => insertText(op)}>
                        <Text style={styles.quickButtonText}>{op}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={generateTable}>
              <Text style={styles.calcButtonText}>Generate Truth Table</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 RESULT TABLE CARD */}
          {tableData && subHeaders.length > 0 && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Step-by-Step Truth Table</Text>
              <Text style={styles.formulaText}>{subHeaders[subHeaders.length - 1]}</Text>

              {/* HORIZONTAL SCROLL VIEW WITH DYNAMIC CENTERING ALIGNMENT */}
              <ScrollView 
                  horizontal={true} 
                  showsHorizontalScrollIndicator={true} 
                  bounces={false}
                  contentContainerStyle={{ 
                      flexGrow: 1, 
                      justifyContent: isSmallTable ? 'center' : 'flex-start', // Centers small tables safely!
                      paddingBottom: 10 
                  }}
              >
                  <View style={styles.strictTableWrapper}>
                      
                      {/* --- Header Row --- */}
                      <View style={styles.strictHeaderRow}>
                          {/* Variable Headers */}
                          {variables.map((v) => (
                              <View key={v} style={styles.strictVarHeaderCell}>
                                  <Text style={styles.strictHeaderText}>{v}</Text>
                              </View>
                          ))}
                          
                          {/* Expression Headers */}
                          {subHeaders.map((expr, idx) => {
                              const isLast = idx === subHeaders.length - 1;
                              return (
                                  <View 
                                      key={idx} 
                                      style={[
                                          styles.strictExprHeaderCell, 
                                          isLast && styles.highlightBg,
                                          isLast && { borderRightWidth: 0 }
                                      ]}
                                  >
                                      <Text 
                                          style={[styles.strictHeaderText, isLast && {color: '#7b61ff'}]}
                                          numberOfLines={2}
                                      >
                                          {expr}
                                      </Text>
                                  </View>
                              );
                          })}
                      </View>

                      {/* --- Data Rows --- */}
                      {tableData.map((row, rIdx) => {
                          const isLastRow = rIdx === tableData.length - 1;
                          const rowBgColor = rIdx % 2 === 0 ? '#ffffff' : '#f8fafc';

                          return (
                              <View key={rIdx} style={[styles.strictDataRow, { backgroundColor: rowBgColor }, isLastRow && { borderBottomWidth: 0 }]}>
                                  
                                  {/* Variable Data */}
                                  {variables.map(v => (
                                      <View key={v} style={styles.strictVarDataCell}>
                                          <Text style={[styles.strictBoolText, row.inputs[v] ? styles.textTrue : styles.textFalse]}>
                                              {row.inputs[v] ? 'T' : 'F'}
                                          </Text>
                                      </View>
                                  ))}
                                  
                                  {/* Expression Data */}
                                  {subHeaders.map((expr, sIdx) => {
                                      const isLastCol = sIdx === subHeaders.length - 1;
                                      const val = row.steps[expr];
                                      return (
                                          <View 
                                              key={sIdx} 
                                              style={[
                                                  styles.strictExprDataCell,
                                                  isLastCol && styles.highlightBg,
                                                  isLastCol && { borderRightWidth: 0 }
                                              ]}
                                          >
                                              <Text style={[styles.strictBoolText, val ? styles.textTrue : styles.textFalse]}>
                                                  {val ? 'T' : 'F'}
                                              </Text>
                                          </View>
                                      );
                                  })}
                              </View>
                          );
                      })}
                  </View>
              </ScrollView>
              
              <Text style={styles.noteText}>
                  Evaluated using standard mathematical precedence. { !isSmallTable && "Swipe table to view all steps." }
              </Text>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 10 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  
  exampleBox: { backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, marginBottom: 15, borderLeftWidth: 3, borderLeftColor: '#3b82f6' },
  exampleTitle: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 4 },
  exampleText: { fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginBottom: 2 },
  
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontSize: 18, fontFamily: 'monospace', textAlign: 'center', marginBottom: 15 },
  
  quickButtonsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 },
  quickButton: { backgroundColor: '#e2e8f0', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  quickButtonText: { fontWeight: 'bold', color: '#475569', fontSize: 12 },

  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#7b61ff', marginTop: 10 },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' },
  formulaText: { fontSize: 20, fontFamily: 'monospace', color: '#7b61ff', textAlign: 'center', marginVertical: 15, fontWeight: 'bold' },

  /* --- ROCK SOLID RESPONSIVE TABLE STYLES --- */
  strictTableWrapper: {
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#cbd5e1',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: 'white',
      alignSelf: 'flex-start' 
  },
  strictHeaderRow: {
      flexDirection: 'row',
      backgroundColor: '#f1f5f9',
      borderBottomWidth: 1,
      borderBottomColor: '#cbd5e1'
  },
  strictDataRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0'
  },
  
  strictVarHeaderCell: {
      width: VAR_COL_WIDTH, // Fixed 60px
      paddingVertical: 12,
      borderRightWidth: 1,
      borderRightColor: '#cbd5e1',
      alignItems: 'center',
      justifyContent: 'center'
  },
  strictExprHeaderCell: {
      width: EXPR_COL_WIDTH, // Fixed 160px
      paddingVertical: 12,
      paddingHorizontal: 5,
      borderRightWidth: 1,
      borderRightColor: '#cbd5e1',
      alignItems: 'center',
      justifyContent: 'center'
  },
  strictVarDataCell: {
      width: VAR_COL_WIDTH,
      height: 45, 
      borderRightWidth: 1,
      borderRightColor: '#e2e8f0',
      alignItems: 'center',
      justifyContent: 'center'
  },
  strictExprDataCell: {
      width: EXPR_COL_WIDTH,
      height: 45,
      borderRightWidth: 1,
      borderRightColor: '#e2e8f0',
      alignItems: 'center',
      justifyContent: 'center'
  },
  
  highlightBg: {
      backgroundColor: '#f3f0ff'
  },
  strictHeaderText: {
      fontWeight: 'bold',
      color: '#334155',
      fontSize: 14,
      textAlign: 'center'
  },
  strictBoolText: {
      fontWeight: 'bold',
      fontSize: 16,
      fontFamily: 'monospace'
  },
  
  textTrue: { color: '#10b981' }, 
  textFalse: { color: '#ef4444' },
  noteText: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: 15 }
});