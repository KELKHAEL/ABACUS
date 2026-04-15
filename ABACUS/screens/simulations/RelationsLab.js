import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Circle, Text as SvgText, G, Path, Polygon } from 'react-native-svg';

export default function RelationsLab({ navigation }) {
  const [elements, setElements] = useState([]); 
  const [pairs, setPairs] = useState([]); 
  const [newElement, setNewElement] = useState('');
  const [pairA, setPairA] = useState('');
  const [pairB, setPairB] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [showTheory, setShowTheory] = useState(false);

  // ✅ STRICT VALIDATION: Alphanumeric only, max 2 chars for clean UI
  const handleNodeInput = (text, setter) => {
      const cleanText = text.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 2);
      setter(cleanText);
  };

  // ✅ EXPANDED PRESET SCENARIOS
  const loadExample = (type) => {
    if (type === 'EQUIVALENCE') {
        setElements(['1', '2', '3']);
        setPairs([{a:'1',b:'1'}, {a:'2',b:'2'}, {a:'3',b:'3'}, {a:'1',b:'2'}, {a:'2',b:'1'}]);
    } else if (type === 'PARTIAL_ORDER') {
        setElements(['A', 'B', 'C']);
        setPairs([{a:'A',b:'A'}, {a:'B',b:'B'}, {a:'C',b:'C'}, {a:'A',b:'B'}, {a:'B',b:'C'}, {a:'A',b:'C'}]);
    } else if (type === 'SYMMETRIC') {
        setElements(['X', 'Y', 'Z']);
        setPairs([{a:'X',b:'Y'}, {a:'Y',b:'X'}]);
    } else if (type === 'TRANSITIVE') {
        setElements(['1', '2', '3']);
        setPairs([{a:'1',b:'2'}, {a:'2',b:'3'}, {a:'1',b:'3'}]);
    }
    setAnalysis(null);
  };

  const clearLab = () => {
    setElements([]); setPairs([]); setAnalysis(null);
  };

  const addElement = () => {
    const val = newElement.trim();
    if (!val) return;
    if (elements.includes(val)) { Alert.alert("Duplicate Node", "This element already exists in your universe set."); return; }
    if (elements.length >= 8) { Alert.alert("Limit Reached", "A maximum of 8 elements is allowed to ensure the graph renders cleanly on mobile."); return; }
    setElements([...elements, val]);
    setNewElement('');
  };

  const addPair = () => {
    const a = pairA.trim(); const b = pairB.trim();
    if (!a || !b) return;
    if (!elements.includes(a) || !elements.includes(b)) { Alert.alert("Invalid Pair", "Both elements must already exist in your Universe Set (Nodes) before you can connect them."); return; }
    if (pairs.some(p => p.a === a && p.b === b)) return;
    setPairs([...pairs, { a, b }]);
    setPairA(''); setPairB('');
  };

  const analyzeRelation = () => {
    Keyboard.dismiss();
    if (elements.length === 0) {
        Alert.alert("Required", "Please add at least one element to the Universe Set."); return;
    }

    let reflexive = { status: true, definition: "Every element maps to itself.", logs: [], failureReason: "" };
    let symmetric = { status: true, definition: "If A→B exists, B→A must exist.", logs: [], failureReason: "" };
    let transitive = { status: true, definition: "If A→B and B→C exist, A→C must exist.", logs: [], failureReason: "" };

    // 1. Reflexive
    let missingReflexive = [];
    elements.forEach(e => {
      const found = pairs.some(p => p.a === e && p.b === e);
      reflexive.logs.push({ check: `(${e},${e})`, result: found ? 'EXISTS' : 'MISSING', passed: found });
      if (!found) { reflexive.status = false; missingReflexive.push(`(${e},${e})`); }
    });
    if (!reflexive.status) reflexive.failureReason = `Missing self-loops: ${missingReflexive.join(', ')}`;

    // 2. Symmetric
    pairs.forEach(p => {
      const found = pairs.some(rev => rev.a === p.b && rev.b === p.a);
      symmetric.logs.push({ check: `(${p.a},${p.b}) ↔ (${p.b},${p.a})`, result: found ? 'SYMMETRIC' : 'ASYMMETRIC', passed: found });
      if (!found) { symmetric.status = false; symmetric.failureReason = `Because (${p.a},${p.b}) exists, (${p.b},${p.a}) MUST also exist, but it is missing.`; }
    });

    // 3. Transitive
    pairs.forEach(p1 => {
      pairs.forEach(p2 => {
        if (p1.b === p2.a) {
          const found = pairs.some(p3 => p3.a === p1.a && p3.b === p2.b);
          transitive.logs.push({ check: `(${p1.a},${p1.b}) & (${p2.a},${p2.b}) → (${p1.a},${p2.b})`, result: found ? 'VALID' : 'INVALID', passed: found });
          if (!found) { transitive.status = false; transitive.failureReason = `Shortcut missing: Because (${p1.a},${p1.b}) and (${p2.a},${p2.b}) exist, (${p1.a},${p2.b}) MUST exist.`; }
        }
      });
    });

    setAnalysis({ reflexive, symmetric, transitive });
  };

  // --- PRECISE GEOMETRY ENGINE ---
  const SVG_WIDTH = 340;
  const SVG_HEIGHT = 300;
  const CENTER_X = SVG_WIDTH / 2;
  const CENTER_Y = SVG_HEIGHT / 2;
  const GRAPH_RADIUS = 95;
  const NODE_RADIUS = 18;

  const getCoordinates = (index, total) => {
      if (total === 1) return { x: CENTER_X, y: CENTER_Y };
      const angle = (Math.PI * 2 * index) / total - Math.PI / 2; 
      return { x: CENTER_X + GRAPH_RADIUS * Math.cos(angle), y: CENTER_Y + GRAPH_RADIUS * Math.sin(angle) };
  };

  const nodePositions = {};
  elements.forEach((el, i) => nodePositions[el] = getCoordinates(i, elements.length));

  const renderArrow = (tipX, tipY, angle, color) => {
      const arrowLength = 12;
      const arrowWidth = Math.PI / 7;
      const p1X = tipX - arrowLength * Math.cos(angle - arrowWidth);
      const p1Y = tipY - arrowLength * Math.sin(angle - arrowWidth);
      const p2X = tipX - arrowLength * Math.cos(angle + arrowWidth);
      const p2Y = tipY - arrowLength * Math.sin(angle + arrowWidth);
      return <Polygon points={`${tipX},${tipY} ${p1X},${p1Y} ${p2X},${p2Y}`} fill={color} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#104a28" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Relations Engine</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Universe Set:</Text> Define the objects in your system (e.g., 1, 2, 3 or A, B). Max 8 items.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Relation Pairs:</Text> Define how they connect. If you type "A" to "B", it creates a directional arrow.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Alphanumeric Only:</Text> Please use simple letters or numbers (no spaces/symbols).</Text>
          </View>
          
          {/* 📚 PROPERTIES EXPLANATION */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="git-branch" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the 3 Core Properties</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold', color: '#104a28'}}>1. Reflexive:</Text> Everyone follows themselves. (Every node has a self-loop).</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold', color: '#104a28'}}>2. Symmetric:</Text> Follows are mutual. If A follows B, B MUST follow A. (Arrows go both ways).</Text>
              <View style={styles.divider} />
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold', color: '#104a28'}}>3. Transitive:</Text> A "friend of a friend" rule. If A follows B, and B follows C, then A MUST follow C. (Shortcuts exist).</Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Relation</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('EQUIVALENCE')}>
                  <Ionicons name="infinite-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Equivalence</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('PARTIAL_ORDER')}>
                  <Ionicons name="cellular-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Partial Order</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('SYMMETRIC')}>
                  <Ionicons name="swap-horizontal-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Symmetric Only</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('TRANSITIVE')}>
                  <Ionicons name="arrow-redo-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>Transitive Only</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.exampleBtn, {backgroundColor: '#fef2f2', borderColor: '#fca5a5'}]} onPress={clearLab}>
                  <Ionicons name="trash-outline" size={16} color="#dc2626" />
                  <Text style={[styles.exampleBtnText, {color: '#dc2626'}]}>Clear All</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>1. UNIVERSE SET (Nodes)</Text>
            <View style={styles.inputRow}>
              <TextInput style={styles.input} placeholder="e.g. A" placeholderTextColor="#666" value={newElement} onChangeText={(t) => handleNodeInput(t, setNewElement)} />
              <TouchableOpacity style={styles.addBtn} onPress={addElement}><Ionicons name="add" size={20} color="#fff" /></TouchableOpacity>
            </View>
            <View style={styles.badgeContainer}>
              {elements.map((e, i) => <View key={i} style={styles.badge}><Text style={styles.badgeText}>{e}</Text></View>)}
              {elements.length === 0 && <Text style={styles.hintText}>No elements added yet.</Text>}
            </View>

            <View style={styles.divider} />

            <Text style={styles.cardLabel}>2. RELATION PAIRS (Edges / Arrows)</Text>
            <View style={styles.inputRow}>
              <TextInput style={[styles.input, {flex:1}]} placeholder="From" placeholderTextColor="#666" value={pairA} onChangeText={(t) => handleNodeInput(t, setPairA)} />
              <TextInput style={[styles.input, {flex:1}]} placeholder="To" placeholderTextColor="#666" value={pairB} onChangeText={(t) => handleNodeInput(t, setPairB)} />
              <TouchableOpacity style={[styles.addBtn, {backgroundColor: '#0369a1'}]} onPress={addPair}><Ionicons name="link" size={18} color="#fff" /></TouchableOpacity>
            </View>
            <View style={styles.badgeContainer}>
              {pairs.map((p, i) => <View key={i} style={styles.pairBadge}><Text style={styles.pairBadgeText}>({p.a}, {p.b})</Text></View>)}
              {pairs.length === 0 && <Text style={styles.hintText}>No pairs added yet.</Text>}
            </View>
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={analyzeRelation}>
            <Text style={styles.primaryBtnText}>EXECUTE ENGINE</Text>
          </TouchableOpacity>

          {/* 📝 RESULT CARDS */}
          {analysis && (
            <View style={{marginTop: 10}}>
              
              {/* 📊 DIRECTED GRAPH (DIGRAPH) */}
              <View style={styles.card}>
                  <Text style={[styles.sectionHeader, {marginBottom: 15}]}>Directed Graph (DiGraph)</Text>
                  
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    <View style={styles.svgWrapper}>
                        <Svg height={SVG_HEIGHT} width={SVG_WIDTH} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
                            
                            {/* 1. RENDER EDGES FIRST (Underneath nodes) */}
                            {pairs.map((p, i) => {
                                const p1 = nodePositions[p.a];
                                const p2 = nodePositions[p.b];
                                if (!p1 || !p2) return null;

                                if (p.a === p.b) {
                                    // PERFECT OUTWARD-FACING SELF-LOOP
                                    const dx = p1.x - CENTER_X;
                                    const dy = p1.y - CENTER_Y;
                                    const len = Math.sqrt(dx*dx + dy*dy) || 1;
                                    const nx = dx / len;
                                    const ny = dy / len;

                                    const angleOut = Math.atan2(ny, nx);
                                    const startAngle = angleOut - Math.PI / 5;
                                    const endAngle = angleOut + Math.PI / 5;

                                    const startX = p1.x + NODE_RADIUS * Math.cos(startAngle);
                                    const startY = p1.y + NODE_RADIUS * Math.sin(startAngle);
                                    const endX = p1.x + NODE_RADIUS * Math.cos(endAngle);
                                    const endY = p1.y + NODE_RADIUS * Math.sin(endAngle);

                                    const cp1X = startX + nx * 60 - ny * 35;
                                    const cp1Y = startY + ny * 60 + nx * 35;
                                    const cp2X = endX + nx * 60 + ny * 35;
                                    const cp2Y = endY + ny * 60 - nx * 35;

                                    const arrowAngle = Math.atan2(endY - cp2Y, endX - cp2X);

                                    return (
                                        <G key={`loop-${i}`}>
                                            <Path d={`M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`} fill="none" stroke="#94a3b8" strokeWidth="2" />
                                            {renderArrow(endX, endY, arrowAngle, "#0ea5e9")}
                                        </G>
                                    );
                                } else {
                                    // EDGES BETWEEN TWO DIFFERENT NODES
                                    const isBidirectional = pairs.some(rev => rev.a === p.b && rev.b === p.a);
                                    const dx = p2.x - p1.x;
                                    const dy = p2.y - p1.y;
                                    const dist = Math.sqrt(dx*dx + dy*dy);

                                    if (isBidirectional) {
                                        // NON-OVERLAPPING CURVED ARROWS
                                        const nx = -dy / dist; 
                                        const ny = dx / dist;
                                        const curveOffset = 25; 
                                        
                                        const cpX = (p1.x + p2.x) / 2 + nx * curveOffset;
                                        const cpY = (p1.y + p2.y) / 2 + ny * curveOffset;

                                        const t = 1 - (NODE_RADIUS + 2) / dist;
                                        const tClamped = Math.max(0.5, t); 

                                        const targetX = Math.pow(1 - tClamped, 2) * p1.x + 2 * (1 - tClamped) * tClamped * cpX + Math.pow(tClamped, 2) * p2.x;
                                        const targetY = Math.pow(1 - tClamped, 2) * p1.y + 2 * (1 - tClamped) * tClamped * cpY + Math.pow(tClamped, 2) * p2.y;

                                        const vx = 2 * (1 - tClamped) * (cpX - p1.x) + 2 * tClamped * (p2.x - cpX);
                                        const vy = 2 * (1 - tClamped) * (cpY - p1.y) + 2 * tClamped * (p2.y - cpY);
                                        const arrowAngle = Math.atan2(vy, vx);

                                        return (
                                            <G key={`curve-${i}`}>
                                                <Path d={`M ${p1.x} ${p1.y} Q ${cpX} ${cpY} ${targetX} ${targetY}`} fill="none" stroke="#cbd5e1" strokeWidth="2" />
                                                {renderArrow(targetX, targetY, arrowAngle, "#0ea5e9")}
                                            </G>
                                        );
                                    } else {
                                        // STRAIGHT ONE-WAY ARROWS
                                        const targetX = p2.x - (NODE_RADIUS + 2) * (dx / dist);
                                        const targetY = p2.y - (NODE_RADIUS + 2) * (dy / dist);
                                        const arrowAngle = Math.atan2(dy, dx);

                                        return (
                                            <G key={`straight-${i}`}>
                                                <Line x1={p1.x} y1={p1.y} x2={targetX} y2={targetY} stroke="#94a3b8" strokeWidth="2" />
                                                {renderArrow(targetX, targetY, arrowAngle, "#0369a1")}
                                            </G>
                                        );
                                    }
                                }
                            })}
                            
                            {/* 2. RENDER NODES (On top of edges) */}
                            {elements.map((el, i) => {
                                const pos = nodePositions[el];
                                return (
                                    <G key={`node-${i}`}>
                                        <Circle cx={pos.x} cy={pos.y} r={NODE_RADIUS} fill="#fff" stroke="#104a28" strokeWidth="2" />
                                        <SvgText x={pos.x} y={pos.y + 4} fontSize="12" fontWeight="bold" fill="#1e293b" textAnchor="middle">{el}</SvgText>
                                    </G>
                                );
                            })}
                        </Svg>
                    </View>
                  </ScrollView>
                  <Text style={styles.noteText}>Curved Lines = Bidirectional. Petal Arcs = Self-Loops.</Text>
              </View>

              {/* 📊 ADJACENCY MATRIX */}
              <View style={styles.matrixCard}>
                <Text style={styles.matrixLabel}>ADJACENCY MATRIX</Text>
                <View style={styles.matrixContainer}>
                  {elements.map((rowEl, rIdx) => (
                    <View key={rIdx} style={styles.matrixRow}>
                      {elements.map((colEl, cIdx) => {
                        const active = pairs.some(p => p.a === rowEl && p.b === colEl);
                        return (
                          <View key={cIdx} style={[styles.matrixCell, active && styles.cellActive]}>
                            <Text style={[styles.cellText, active && styles.cellTextActive]}>{active ? '1' : '0'}</Text>
                          </View>
                        );
                      })}
                    </View>
                  ))}
                </View>
              </View>

              {/* 📊 PROPERTIES LOGIC */}
              <View style={{gap: 15, marginBottom: 50}}>
                  {[
                    { title: "REFLEXIVITY", data: analysis.reflexive },
                    { title: "SYMMETRY", data: analysis.symmetric },
                    { title: "TRANSITIVITY", data: analysis.transitive }
                  ].map((prop, index) => (
                    <View key={index} style={styles.propCard}>
                      <View style={styles.propHeader}>
                        <Text style={styles.propTitle}>{prop.title}</Text>
                        <Text style={[styles.propStatus, { color: prop.data.status ? '#16a34a' : '#dc2626' }]}>
                          {prop.data.status ? 'SATISFIED' : 'FAILED'}
                        </Text>
                      </View>
                      
                      <Text style={styles.propDef}>{prop.data.definition}</Text>
                      
                      {/* ✅ DYNAMIC FAILURE EXPLANATION */}
                      {!prop.data.status && (
                          <View style={styles.failureBox}>
                              <Ionicons name="warning" size={16} color="#b91c1c" />
                              <Text style={styles.failureText}>{prop.data.failureReason}</Text>
                          </View>
                      )}

                      <View style={styles.divider} />
                      <View style={styles.stepContainer}>
                        {prop.data.logs.slice(0, 5).map((log, i) => (
                          <View key={i} style={styles.stepRow}>
                            <Text style={styles.stepCode}>{log.check}</Text>
                            <Text style={[styles.stepStatus, { color: log.passed ? '#10b981' : '#ef4444' }]}>{log.result}</Text>
                          </View>
                        ))}
                        {prop.data.logs.length === 0 && <Text style={styles.stepCode}>No operations to check.</Text>}
                        {prop.data.logs.length > 5 && <Text style={styles.moreText}>+ {prop.data.logs.length - 5} hidden validations</Text>}
                      </View>
                    </View>
                  ))}
              </View>

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
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
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
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#bbf7d0' },
  theoryText: { fontSize: 13, color: '#334155', lineHeight: 20, marginBottom: 4 },
  
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 16, elevation: 2 },
  cardLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748b', marginBottom: 10 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  input: { backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', flex: 2, fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', textAlign: 'center', fontWeight: 'bold', color: "#333" },
  addBtn: { backgroundColor: '#104a28', width: 50, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  
  badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: { backgroundColor: '#dcfce7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#bbf7d0' },
  badgeText: { color: '#16a34a', fontWeight: 'bold', fontSize: 14 },
  pairBadge: { backgroundColor: '#e0f2fe', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#bae6fd' },
  pairBadgeText: { color: '#0284c7', fontWeight: 'bold', fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  hintText: { fontSize: 12, color: '#94a3b8', fontStyle: 'italic', paddingVertical: 5 },
  
  primaryBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', marginVertical: 10 },
  primaryBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  svgWrapper: { alignItems: 'center', backgroundColor: '#f8fafc', borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 10, minWidth: 340 },
  noteText: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: 10 },

  matrixCard: { backgroundColor: '#f8fafc', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  matrixLabel: { color: '#475569', fontSize: 12, fontWeight: 'bold', marginBottom: 15, letterSpacing: 1 },
  matrixContainer: { paddingHorizontal: 10 },
  matrixRow: { flexDirection: 'row' },
  matrixCell: { width: 35, height: 35, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  cellActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  cellText: { fontSize: 16, color: '#94a3b8', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  cellTextActive: { color: '#fff', fontWeight: 'bold' },

  propCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e2e8f0', elevation: 1 },
  propHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  propTitle: { fontWeight: 'bold', fontSize: 14, color: '#334155' },
  propStatus: { fontWeight: '900', fontSize: 12, letterSpacing: 1 },
  propDef: { fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: 10 },
  
  failureBox: { flexDirection: 'row', backgroundColor: '#fef2f2', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#fca5a5', marginTop: 5, gap: 6, alignItems: 'center' },
  failureText: { color: '#991b1b', fontSize: 12, flex: 1, fontWeight: '500' },

  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 12 },
  stepContainer: { gap: 6 },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: 8, borderRadius: 6 },
  stepCode: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 13, color: '#1e293b' },
  stepStatus: { fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12, fontWeight: 'bold' },
  moreText: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', marginTop: 5, textAlign: 'center' }
});