import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Dimensions, Alert } from 'react-native';
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

  // ✅ PRESET EXAMPLES
  const loadExample = (expr) => {
      setExpression(expr);
      setTableData(null); // Clear table to force recalculation
  };

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
              if (opStack.length === 0) throw new Error("Mismatched parentheses. Make sure every '(' has a closing ')'.");
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
          if (op === '(') throw new Error("Mismatched parentheses. Make sure every '(' has a closing ')'.");
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
              if (stack.length < 1) throw new Error("The 'NOT' operator must precede a variable or a group (e.g., 'NOT p').");
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
              if (stack.length < 2) throw new Error(`Missing variable near the '${token}' operator. Use format 'p ${token} q'.`);
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

      if (stack.length !== 1) throw new Error("Invalid format. Make sure you don't have variables without operators between them (e.g., 'p q').");
      return { result: stack[0].val, steps, finalStr: stack[0].str };
  };

  const generateTable = () => {
    if (!expression.trim()) {
      Alert.alert("Required", "Please enter a logical expression.");
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
            throw new Error(`Invalid text or symbol found: '${t}'. Use only standard variables (p, q) and valid operators.`);
        });

        const varsFound = [...new Set(tokens.filter(t => /^[a-z]$/.test(t)))].sort();
        
        if (varsFound.length === 0) {
            throw new Error("No variables (like p, q) found in expression.");
        }
        if (varsFound.length > 4) {
            throw new Error("Please use a maximum of 4 variables to prevent the app from lagging.");
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
        // ✅ STRICT VALIDATION SUGGESTIONS
        Alert.alert(
            "Expression Error",
            `${err.message}\n\nHint: Check your structure. Try a combination like:\n• p AND q\n• NOT (p OR q)\n• p -> (q XOR r)`,
            [{ text: "Fix Expression" }]
        );
        setTableData(null);
    }
  };

  const insertText = (text) => {
    setExpression(prev => {
        const spacer = prev.endsWith(' ') || prev.length === 0 ? '' : ' ';
        return prev + spacer + text + ' ';
    });
  };

  const calculatedTableWidth = (variables.length * VAR_COL_WIDTH) + (subHeaders.length * EXPR_COL_WIDTH);
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
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Variables:</Text> Type a single letter like p, q, or r to represent an unknown boolean value (Max: 4).</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Operators:</Text> Connect variables using standard logic words (AND, OR, NOT, XOR, -{'>'}).</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Grouping:</Text> Use parentheses ( ) to group operations that should be calculated first.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="book" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn Logic Precedence</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>The calculator evaluates operators in this strict order of precedence:</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>1. Parentheses</Text> ( )</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>2. NOT</Text> (~, ¬)</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>3. AND</Text> (^, &)</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>4. XOR</Text> (⊕)</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>5. OR</Text> (v, |)</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>6. IMPLIES</Text> (-{'>'})</Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Combination</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('p AND q')}>
                  <Ionicons name="flash-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Basic Conjunction</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('NOT ( p OR q )')}>
                  <Ionicons name="refresh-circle-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>De Morgan's Law</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('p -> ( q XOR r )')}>
                  <Ionicons name="arrow-forward-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Implication</Text>
              </TouchableOpacity>
               <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('( p AND q ) <-> r')}>
                  <Ionicons name="swap-horizontal-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Equivalence</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Build Expression</Text>
            
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
                      justifyContent: isSmallTable ? 'center' : 'flex-start',
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
              
              {/* ✅ EXPLANATION OF RESULTS */}
              <View style={styles.explanationBox}>
                  <Ionicons name="bulb-outline" size={20} color="#7b61ff" style={{marginTop: 2}}/>
                  <Text style={styles.explanationText}>
                      <Text style={{fontWeight: 'bold', color: '#1f2937'}}>How this works:</Text> The table begins by testing every possible True/False combination for your variables ({variables.join(', ')}). It evaluates the smallest pieces of the expression first (moving left to right), resolving parentheses and NOTs before concluding with the final purple column.
                  </Text>
              </View>

              <Text style={styles.noteText}>
                  { !isSmallTable && "Swipe table horizontally to view all steps." }
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
  
  guidelinesCard: { backgroundColor: '#e0f2fe', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bae6fd' },
  guidelinesTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369a1' },
  guidelinesText: { fontSize: 13, color: '#0f172a', marginBottom: 4, lineHeight: 18 },

  sectionHeader: { fontSize: 14, fontWeight: 'bold', color: '#4b5563', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  exampleScroll: { marginBottom: 20, flexGrow: 0 },
  exampleBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#fde68a', gap: 6 },
  exampleBtnText: { color: '#92400e', fontWeight: 'bold', fontSize: 13 },

  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#c8e6c9' },
  theoryText: { fontSize: 14, color: '#4b5563', lineHeight: 22, marginBottom: 5 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontSize: 18, fontFamily: 'monospace', textAlign: 'center', marginBottom: 15, color: '#111' },
  
  quickButtonsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 },
  quickButton: { backgroundColor: '#e2e8f0', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  quickButtonText: { fontWeight: 'bold', color: '#475569', fontSize: 12 },

  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#7b61ff', marginTop: 10 },
  resultTitle: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase', textAlign: 'center' },
  formulaText: { fontSize: 20, fontFamily: 'monospace', color: '#7b61ff', textAlign: 'center', marginVertical: 15, fontWeight: 'bold' },

  explanationBox: { flexDirection: 'row', backgroundColor: '#f3f0ff', padding: 15, borderRadius: 8, marginTop: 20, gap: 10 },
  explanationText: { flex: 1, fontSize: 13, color: '#4b5563', lineHeight: 20 },

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
      width: VAR_COL_WIDTH,
      paddingVertical: 12,
      borderRightWidth: 1,
      borderRightColor: '#cbd5e1',
      alignItems: 'center',
      justifyContent: 'center'
  },
  strictExprHeaderCell: {
      width: EXPR_COL_WIDTH,
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