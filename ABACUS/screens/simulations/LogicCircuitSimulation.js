import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Text as SvgText, Line, G, Rect } from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;

// --- PARSER ---
const parseFormula = (formula) => {
  let clean = formula.replace(/\s+/g, '').replace(/v|V|\+|\|\||or|OR/g, '|').replace(/\^|\*|&|&&|and|AND/g, '&').replace(/!|~|not|NOT/g, '!');
  let tokens = clean.split(/([&|!()])/).filter(t => t);
  let pos = 0;
  const consume = () => tokens[pos++];
  const peek = () => tokens[pos];

  const parsePrimary = () => {
    const token = consume();
    if (token === '(') {
      const expr = parseExpression();
      consume(); 
      return expr;
    } else if (token === '!') {
      return { type: 'NOT', children: [parsePrimary()] };
    } else {
      return { type: 'VAR', value: token };
    }
  };

  const parseAnd = () => {
    let left = parsePrimary();
    while (peek() === '&') {
      consume();
      left = { type: 'AND', children: [left, parsePrimary()] };
    }
    return left;
  };

  const parseExpression = () => {
    let left = parseAnd();
    while (peek() === '|') {
      consume();
      left = { type: 'OR', children: [left, parseAnd()] };
    }
    return left;
  };

  try { return parseExpression(); } catch (e) { return null; }
};

// --- LAYOUT ---
const calculateLayout = (node, yOffset = { val: 0 }) => {
  if (!node) return null;
  const LEVEL_WIDTH = 90;
  
  if (node.type === 'VAR') {
    const y = yOffset.val;
    yOffset.val += 70; 
    return { ...node, x: 50, y: y + 40, outputX: 50, outputY: y + 40 };
  }

  const children = node.children.map(c => calculateLayout(c, yOffset));
  const childYs = children.map(c => c.outputY);
  const avgY = childYs.reduce((a, b) => a + b, 0) / childYs.length;
  const maxX = Math.max(...children.map(c => c.outputX));
  const myX = maxX + LEVEL_WIDTH;

  return { ...node, children, x: myX, y: avgY, outputX: myX + 60, outputY: avgY };
};

// --- EVALUATOR ---
const evaluateTree = (node, inputs) => {
  if (node.type === 'VAR') return inputs[node.value] === 1;
  if (node.type === 'NOT') return !evaluateTree(node.children[0], inputs);
  if (node.type === 'AND') return evaluateTree(node.children[0], inputs) && evaluateTree(node.children[1], inputs);
  if (node.type === 'OR') return evaluateTree(node.children[0], inputs) || evaluateTree(node.children[1], inputs);
  return false;
};

// --- EXPLANATION ---
const generateExplanation = (node, inputs) => {
  if (!node) return [];
  if (node.type === 'VAR') return []; 

  let steps = [];
  node.children.forEach(child => {
    steps = [...steps, ...generateExplanation(child, inputs)];
  });

  const val = evaluateTree(node, inputs);
  const inputsVals = node.children.map(c => evaluateTree(c, inputs));
  
  let msg = "";
  if (node.type === 'NOT') {
    msg = `NOT Gate: Input is ${inputsVals[0] ? '1' : '0'}, so it flips to ${val ? '1' : '0'}.`;
  } else if (node.type === 'AND') {
    msg = `AND Gate: Inputs are ${inputsVals[0] ? '1' : '0'} & ${inputsVals[1] ? '1' : '0'}. Result is ${val ? '1' : '0'}.`;
  } else if (node.type === 'OR') {
    msg = `OR Gate: Inputs are ${inputsVals[0] ? '1' : '0'} | ${inputsVals[1] ? '1' : '0'}. Result is ${val ? '1' : '0'}.`;
  }

  steps.push(msg);
  return steps;
};

export default function LogicCircuitSimulation({ navigation }) {
  const [formula, setFormula] = useState('(A AND B) OR NOT C');
  const [circuitTree, setCircuitTree] = useState(null);
  const [inputs, setInputs] = useState({});
  const [explanation, setExplanation] = useState([]);

  const insertText = (text) => {
      setFormula(prev => {
          const spacer = prev.endsWith(' ') || prev.length === 0 ? '' : ' ';
          return prev + spacer + text + ' ';
      });
  };

  const generateCircuit = () => {
    try {
      const tree = parseFormula(formula);
      if (!tree) throw new Error("Invalid");
      
      const vars = {};
      const findVars = (n) => { if (n.type === 'VAR') vars[n.value] = 0; n.children?.forEach(findVars); };
      findVars(tree);
      setInputs(vars);
      setCircuitTree(calculateLayout(tree, { val: 0 })); 
      setExplanation([]);
    } catch (e) { Alert.alert("Error", "Check logic syntax."); }
  };

  const toggleInput = (key) => {
    const newInputs = { ...inputs, [key]: inputs[key] === 0 ? 1 : 0 };
    setInputs(newInputs);
  };

  React.useEffect(() => {
    if (circuitTree) {
      setExplanation(generateExplanation(circuitTree, inputs));
    }
  }, [inputs, circuitTree]);

  const renderWires = (node) => {
    if (node.type === 'VAR') return null;
    return node.children.map((child, i) => {
      const isHigh = evaluateTree(child, inputs);
      const color = isHigh ? "#4CAF50" : "#ccc";
      const midX = (child.outputX + node.x) / 2;
      let targetY = node.children.length === 2 ? (i === 0 ? node.y - 10 : node.y + 10) : node.y;

      return (
        <G key={`${node.x}-${i}-${Math.random()}`}>
          {renderWires(child)}
          <Path d={`M ${child.outputX} ${child.outputY} H ${midX} V ${targetY} H ${node.x}`} stroke={color} strokeWidth={isHigh ? 3 : 2} fill="none" />
          <Circle cx={node.x} cy={targetY} r="3" fill={color} />
          <Rect x={midX - 8} y={(child.outputY + targetY)/2 - 8} width="16" height="16" rx="4" fill={isHigh ? "#4CAF50" : "#999"} />
          <SvgText x={midX} y={(child.outputY + targetY)/2 + 4} fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
            {isHigh ? '1' : '0'}
          </SvgText>
        </G>
      );
    });
  };

  const renderGate = (node) => {
    if (node.type === 'VAR') return null;
    const isHigh = evaluateTree(node, inputs);
    const color = isHigh ? "#4CAF50" : "#333";
    const { x, y } = node;
    let shape;

    if (node.type === 'AND') shape = <Path d={`M ${x} ${y-20} H ${x+25} A 20 20 0 0 1 ${x+25} ${y+20} H ${x} Z`} stroke={color} strokeWidth="2" fill="white" />;
    else if (node.type === 'OR') shape = <Path d={`M ${x} ${y-20} Q ${x+15} ${y-20} ${x+30} ${y} Q ${x+15} ${y+20} ${x} ${y+20} Q ${x+10} ${y} ${x} ${y-20}`} stroke={color} strokeWidth="2" fill="white" />;
    else if (node.type === 'NOT') shape = <G><Path d={`M ${x} ${y-15} L ${x+30} ${y} L ${x} ${y+15} Z`} stroke={color} strokeWidth="2" fill="white" /><Circle cx={x+36} cy={y} r="4" stroke={color} strokeWidth="2" fill="white" /></G>;

    return (
      <G key={`${x}-${y}`}>
        {node.children.map(renderGate)}
        {shape}
        <Line x1={node.type === 'NOT' ? x+40 : x+30} y1={y} x2={node.outputX} y2={y} stroke={color} strokeWidth="2" />
        <SvgText x={x + 10} y={y - 25} fontSize="10" fill="#666" fontWeight="bold">{node.type}</SvgText>
      </G>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Logic Circuits</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Build Circuit Expression</Text>
                
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. (A AND B) OR NOT C" 
                  placeholderTextColor="#ccc" 
                  value={formula} 
                  onChangeText={setFormula} 
                  autoCapitalize="characters"
                />

                <View style={styles.quickButtonsContainer}>
                    {['AND', 'OR', 'NOT', '(', ')'].map(op => (
                        <TouchableOpacity key={op} style={styles.quickButton} onPress={() => insertText(op)}>
                            <Text style={styles.quickButtonText}>{op}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.calcButton} onPress={generateCircuit}>
                    <Text style={styles.calcButtonText}>Draw Circuit Map</Text>
                </TouchableOpacity>
            </View>

            {Object.keys(inputs).length > 0 && (
              <View style={styles.controlsBox}>
                <Text style={styles.controlLabel}>TAP TO TOGGLE INPUTS (0 / 1):</Text>
                <View style={styles.toggles}>
                  {Object.keys(inputs).sort().map(key => (
                    <TouchableOpacity key={key} style={[styles.toggleBtn, inputs[key] === 1 ? styles.toggleOn : styles.toggleOff]} onPress={() => toggleInput(key)}>
                      <Text style={[styles.toggleText, inputs[key] === 1 ? {color:'white'} : {color:'#333'}]}>{key} = {inputs[key]}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {circuitTree && (
              <View>
                <ScrollView horizontal contentContainerStyle={{flexGrow: 1}} bounces={false}>
                  <View style={styles.canvas}>
                    <Svg height={Math.max(350, circuitTree.y + 100)} width={Math.max(SCREEN_WIDTH - 40, circuitTree.outputX + 80)}>
                      {renderWires(circuitTree)}
                      {renderGate(circuitTree)}
                      {(function drawLabels(node) {
                        if (!node) return null;
                        if (node.type === 'VAR') {
                          const isHigh = inputs[node.value] === 1;
                          return (
                            <G key={`lbl-${node.y}`}>
                               <Circle cx={node.outputX} cy={node.outputY} r="18" fill={isHigh ? "#2D7FF9" : "#f1f5f9"} stroke={isHigh ? "#2D7FF9" : "#cbd5e1"} strokeWidth="2" />
                               <SvgText x={node.outputX} y={node.outputY + 5} fontSize="16" fontWeight="bold" fill={isHigh ? "white" : "#475569"} textAnchor="middle">{node.value}</SvgText>
                            </G>
                          );
                        }
                        return node.children.map(drawLabels);
                      })(circuitTree)}
                      <G>
                       <Rect x={circuitTree.outputX + 10} y={circuitTree.outputY - 15} width="50" height="30" rx="5" fill={evaluateTree(circuitTree, inputs) ? "#4CAF50" : "#64748b"} />
                       <SvgText x={circuitTree.outputX + 35} y={circuitTree.outputY + 5} fontSize="14" fill="white" fontWeight="bold" textAnchor="middle">{evaluateTree(circuitTree, inputs) ? "1" : "0"}</SvgText>
                      </G>
                    </Svg>
                  </View>
                </ScrollView>

                <View style={styles.explanationCard}>
                  <Text style={styles.expTitle}>Live Logic Evaluation:</Text>
                  {explanation.map((step, idx) => (
                    <View key={idx} style={styles.stepRow}>
                      <Text style={styles.stepNum}>{idx + 1}.</Text>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                  <View style={styles.finalRow}>
                    <Text style={styles.finalText}>Final Output: </Text>
                    <Text style={[styles.finalVal, evaluateTree(circuitTree, inputs) ? {color:'#10b981'} : {color:'#ef4444'}]}>
                      {evaluateTree(circuitTree, inputs) ? 'TRUE (1)' : 'FALSE (0)'}
                    </Text>
                  </View>
                </View>
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
  content: { padding: 20, paddingBottom: 50 },
  
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  input: { backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontSize: 18, fontFamily: 'monospace', textAlign: 'center', marginBottom: 15 },
  
  quickButtonsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 15 },
  quickButton: { backgroundColor: '#e2e8f0', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  quickButtonText: { fontWeight: 'bold', color: '#475569', fontSize: 12 },

  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  controlsBox: { backgroundColor: '#fffbeb', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#fde047', marginBottom: 20 },
  controlLabel: { fontSize: 12, fontWeight: 'bold', color: '#854d0e', marginBottom: 10, textAlign: 'center' },
  toggles: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  toggleBtn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, borderWidth: 1, elevation: 1 },
  toggleOn: { backgroundColor: '#2D7FF9', borderColor: '#2D7FF9' },
  toggleOff: { backgroundColor: '#fff', borderColor: '#cbd5e1' },
  toggleText: { fontWeight: 'bold' },

  canvas: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', padding: 10, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', minWidth: '100%' },
  
  explanationCard: { marginTop: 20, backgroundColor: '#white', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', borderLeftWidth: 5, borderLeftColor: '#3b82f6', elevation: 2 },
  expTitle: { fontSize: 14, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: 15 },
  stepRow: { flexDirection: 'row', marginBottom: 8 },
  stepNum: { fontWeight: 'bold', color: '#94a3b8', marginRight: 8, width: 20 },
  stepText: { fontSize: 14, color: '#334155', flex: 1, lineHeight: 20 },
  finalRow: { flexDirection: 'row', marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#e2e8f0', alignItems: 'center' },
  finalText: { fontSize: 15, fontWeight: 'bold', color: '#475569' },
  finalVal: { fontSize: 18, fontWeight: '900', fontFamily: 'monospace' }
});