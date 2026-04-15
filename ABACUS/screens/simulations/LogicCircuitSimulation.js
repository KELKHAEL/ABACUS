import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Dimensions, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Circle, Text as SvgText, Line, G, Rect } from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;

// --- ADVANCED PARSER WITH ERROR TRAPPING ---
const parseFormula = (formula) => {
  let clean = formula.replace(/\s+/g, '').replace(/v|V|\+|\|\||or|OR/g, '|').replace(/\^|\*|&|&&|and|AND/g, '&').replace(/!|~|not|NOT/g, '!');
  
  if (!clean) throw new Error("Expression is empty.");

  let tokens = clean.split(/([&|!()])/).filter(t => t);
  let pos = 0;
  
  const consume = () => tokens[pos++];
  const peek = () => tokens[pos];

  const parsePrimary = () => {
    const token = consume();
    if (!token) throw new Error("Missing variable or expression.");

    if (token === '(') {
      const expr = parseExpression();
      const nextToken = consume(); 
      if (nextToken !== ')') throw new Error("Mismatched parentheses. Missing ')'.");
      return expr;
    } else if (token === '!') {
      return { type: 'NOT', children: [parsePrimary()] };
    } else if (/^[A-Za-z]+$/.test(token)) {
      return { type: 'VAR', value: token.toUpperCase() };
    } else {
      throw new Error(`Invalid symbol or misplaced operator: '${token}'`);
    }
  };

  const parseAnd = () => {
    let left = parsePrimary();
    while (peek() === '&') {
      consume();
      const right = parsePrimary();
      left = { type: 'AND', children: [left, right] };
    }
    return left;
  };

  const parseExpression = () => {
    let left = parseAnd();
    while (peek() === '|') {
      consume();
      const right = parseAnd();
      left = { type: 'OR', children: [left, right] };
    }
    return left;
  };

  const result = parseExpression();
  if (pos < tokens.length) {
    throw new Error(`Unexpected trailing characters: '${tokens.slice(pos).join('')}'`);
  }
  return result;
};

// --- LAYOUT ENGINE ---
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

// --- EXPLANATION SYSTEM ---
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
  const [formula, setFormula] = useState('');
  const [circuitTree, setCircuitTree] = useState(null);
  const [inputs, setInputs] = useState({});
  const [explanation, setExplanation] = useState([]);
  const [showTheory, setShowTheory] = useState(false);

  const loadExample = (expr) => {
      setFormula(expr);
      setCircuitTree(null); 
  };

  const insertText = (text) => {
      setFormula(prev => {
          const spacer = prev.endsWith(' ') || prev.length === 0 ? '' : ' ';
          return prev + spacer + text + ' ';
      });
  };

  const generateCircuit = () => {
    try {
      const tree = parseFormula(formula);
      if (!tree) throw new Error("Expression parsing failed.");
      
      const vars = {};
      const findVars = (n) => { if (n.type === 'VAR') vars[n.value] = 0; n.children?.forEach(findVars); };
      findVars(tree);
      
      if (Object.keys(vars).length > 5) {
          throw new Error("Too many variables! Please limit your circuit to 5 inputs (e.g. A, B, C, D, E).");
      }

      setInputs(vars);
      
      // ✅ FIX: Track the absolute lowest point of the tree to prevent clipping
      let heightTracker = { val: 0 };
      const layoutTree = calculateLayout(tree, heightTracker); 
      
      setCircuitTree({ ...layoutTree, maxTreeY: heightTracker.val }); 
      setExplanation([]);
    } catch (e) { 
        Alert.alert(
            "Syntax Error", 
            `${e.message}\n\nHint: A valid circuit needs variables connected by operators.\n\nExamples:\n• A AND B\n• NOT (A OR B)\n• (A AND B) OR C`,
            [{ text: "Fix Expression" }]
        ); 
    }
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

  // --- SVG RENDERERS ---
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
            
            <View style={styles.guidelinesCard}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                    <Ionicons name="information-circle" size={22} color="#0284c7" />
                    <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
                </View>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Variables:</Text> Type letters (A, B, S) to represent your input lines.</Text>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Gates:</Text> Connect inputs using AND, OR, and NOT.</Text>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Grouping:</Text> Use parentheses ( ) to ensure gates connect in the correct order.</Text>
            </View>

            <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
              <Ionicons name="book" size={20} color="#104a28" />
              <Text style={styles.theoryToggleText}>Learn Digital Logic Gates</Text>
              <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
            </TouchableOpacity>
            
            {showTheory && (
              <View style={styles.theoryCard}>
                <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>AND Gate (D-Shape):</Text> Outputs 1 ONLY if all inputs attached to it are 1.</Text>
                <View style={styles.divider} />
                <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>OR Gate (Shield Shape):</Text> Outputs 1 if AT LEAST ONE input attached to it is 1.</Text>
                <View style={styles.divider} />
                <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>NOT Gate (Triangle w/ Circle):</Text> Inverts the input. A 1 becomes a 0, and a 0 becomes a 1.</Text>
              </View>
            )}

            <Text style={styles.sectionHeader}>Try a Preset Circuit Library</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
                {/* Level 1: Basic Gates */}
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('A AND B')}><Ionicons name="flash-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>Basic AND</Text></TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('A OR B')}><Ionicons name="git-merge-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>Basic OR</Text></TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('NOT (A AND B)')}><Ionicons name="close-circle-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>NAND Gate</Text></TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('NOT (A OR B)')}><Ionicons name="ban-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>NOR Gate</Text></TouchableOpacity>
                
                {/* Level 2: Equivalent Constructions */}
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('(A AND NOT B) OR (NOT A AND B)')}><Ionicons name="swap-horizontal-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>XOR Equivalent</Text></TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('NOT A OR NOT B')}><Ionicons name="copy-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>De Morgan's OR</Text></TouchableOpacity>

                {/* Level 3: Computer Engineering Fundamentals */}
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('(A AND NOT S) OR (B AND S)')}><Ionicons name="git-network-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>2-to-1 Multiplexer</Text></TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('(A AND B) OR (B AND C) OR (A AND C)')}><Ionicons name="people-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>Majority Gate</Text></TouchableOpacity>

                {/* Level 4: Broad & Complex Expansions */}
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('(A AND B) AND C')}><Ionicons name="git-commit-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>3-Input AND</Text></TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('(A AND B) OR (C AND D)')}><Ionicons name="grid-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>4-Var SOP</Text></TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('(A OR B) AND (C OR D)')}><Ionicons name="layers-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>4-Var POS</Text></TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('(((A OR B) AND C) OR D) AND E')}><Ionicons name="analytics-outline" size={16} color="#b45309" /><Text style={styles.exampleBtnText}>5-Var Cascade</Text></TouchableOpacity>
            </ScrollView>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Build Circuit Expression</Text>
                
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. (A AND B) OR NOT C" 
                  placeholderTextColor="#666"
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

            {circuitTree && Object.keys(inputs).length > 0 && (
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
                    {/* ✅ FIX: SVG Canvas uses the maxTreeY property to dynamically stretch downwards perfectly! */}
                    <Svg height={Math.max(350, circuitTree.maxTreeY + 100)} width={Math.max(SCREEN_WIDTH - 40, circuitTree.outputX + 80)}>
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
  container: { flex: 1, backgroundColor: '#F8F9FD', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  content: { padding: 20, paddingBottom: 50 },
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
  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 10 },
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
  explanationCard: { marginTop: 20, backgroundColor: 'white', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', borderLeftWidth: 5, borderLeftColor: '#3b82f6', elevation: 2 },
  expTitle: { fontSize: 14, fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', marginBottom: 15 },
  stepRow: { flexDirection: 'row', marginBottom: 8 },
  stepNum: { fontWeight: 'bold', color: '#94a3b8', marginRight: 8, width: 20 },
  stepText: { fontSize: 14, color: '#334155', flex: 1, lineHeight: 20 },
  finalRow: { flexDirection: 'row', marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#e2e8f0', alignItems: 'center' },
  finalText: { fontSize: 15, fontWeight: 'bold', color: '#475569' },
  finalVal: { fontSize: 18, fontWeight: '900', fontFamily: 'monospace' }
});