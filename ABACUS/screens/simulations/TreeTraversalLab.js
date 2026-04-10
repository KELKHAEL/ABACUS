import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Dimensions, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Circle, Text as SvgText, G } from 'react-native-svg';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function TreeTraversalLab({ navigation }) {
  const [treeInput, setTreeInput] = useState('');
  const [traversalType, setTraversalType] = useState('INORDER');
  const [showTheory, setShowTheory] = useState(false);
  const [result, setResult] = useState(null);

  const explanations = {
      'INORDER': {
          rule: 'Left → Root → Right',
          desc: 'Visits the left branch, then the current node, then the right branch. (Used to read Binary Search Trees in sorted order).'
      },
      'PREORDER': {
          rule: 'Root → Left → Right',
          desc: 'Visits the current node first, then the left branch, then the right branch. (Used to copy or clone a tree).'
      },
      'POSTORDER': {
          rule: 'Left → Right → Root',
          desc: 'Visits the left branch, then the right branch, and finally the current node. (Used to safely delete a tree from the bottom up).'
      }
  };

  // ✅ EXPANDED PRESET EXAMPLES
  const loadExample = (input) => {
    setTreeInput(input);
    setResult(null); // Clear previous results
  };

  const buildAndTraverse = () => {
      Keyboard.dismiss();

      if (!treeInput.trim()) {
          Alert.alert("Required Field", "Please enter a tree format string.");
          return;
      }

      try {
          const parsedNodes = {};
          const childrenSet = new Set();
          let firstNode = null;

          // ✅ UNIVERSAL REGEX PARSING: Allows math symbols, letters, and numbers
          const regex = /([^\s(),]+)\s*\(\s*([^\s(),]+)\s*,\s*([^\s(),]+)\s*\)/g;
          let match;
          let foundNodes = 0;

          while ((match = regex.exec(treeInput)) !== null) {
              const parent = match[1];
              const left = match[2];
              const right = match[3];

              if (!firstNode) firstNode = parent;
              parsedNodes[parent] = {
                  left: left !== '_' ? left : null,
                  right: right !== '_' ? right : null
              };
              if (left !== '_') childrenSet.add(left);
              if (right !== '_') childrenSet.add(right);
              foundNodes++;
          }

          if (foundNodes === 0) {
              throw new Error("No valid nodes found. Please ensure you are using the correct format: Parent(Left,Right).");
          }

          // Find the Root (A node that is never a child)
          let root = Object.keys(parsedNodes).find(n => !childrenSet.has(n)) || firstNode;
          if (!root) throw new Error("Could not determine the mathematical root of the tree.");

          // ✅ 1. PRE-CALCULATE MAXIMUM DEPTH
          let absoluteMaxDepth = 0;
          const findDepth = (node, depth) => {
              if (!node) return;
              absoluteMaxDepth = Math.max(absoluteMaxDepth, depth);
              findDepth(parsedNodes[node]?.left, depth + 1);
              findDepth(parsedNodes[node]?.right, depth + 1);
          };
          findDepth(root, 0);

          // ✅ 2. SAFE DYNAMIC CANVAS SIZING (Prevents memory crashes!)
          // We cap the effective depth for the width calculation to 6 to prevent 
          // degenerate trees (like 10 nodes deep) from creating a 30,000px wide SVG and crashing the app.
          const effectiveDepth = Math.min(absoluteMaxDepth, 6); 
          const maxLeaves = Math.pow(2, effectiveDepth);
          const requiredWidth = maxLeaves * 55; 
          const treeWidth = Math.max(340, SCREEN_WIDTH - 60, requiredWidth);

          // ✅ 3. ASSIGN X, Y COORDINATES
          const layout = {};
          const calcLayout = (node, depth, minX, maxX) => {
              if (!node) return;
              const x = (minX + maxX) / 2;
              const y = 30 + depth * 60; // 60px vertical spacing per level
              
              const left = parsedNodes[node]?.left || null;
              const right = parsedNodes[node]?.right || null;

              layout[node] = { x, y, left, right };
              
              calcLayout(left, depth + 1, minX, x);
              calcLayout(right, depth + 1, x, maxX);
          };

          calcLayout(root, 0, 0, treeWidth); 

          // 4. Perform the Traversal
          let path = [];
          const traverse = (node) => {
              if (!node || !layout[node]) return;
              if (traversalType === 'PREORDER') path.push(node);
              traverse(layout[node].left);
              if (traversalType === 'INORDER') path.push(node);
              traverse(layout[node].right);
              if (traversalType === 'POSTORDER') path.push(node);
          };
          traverse(root);

          setResult({ layout, path, maxDepth: absoluteMaxDepth, treeWidth });

      } catch (e) {
          Alert.alert("Format Error", e.message);
      }
  };

  React.useEffect(() => {
      if (treeInput && result) {
          buildAndTraverse();
      }
  }, [traversalType]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tree Traversals</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            
            {/* ✅ GUIDELINES CARD */}
            <View style={styles.guidelinesCard}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                    <Ionicons name="information-circle" size={22} color="#0284c7" />
                    <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
                </View>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Format:</Text> Build your tree by typing <Text style={{fontFamily:'monospace', backgroundColor:'#e0f2fe', paddingHorizontal:4}}>Parent(LeftChild,RightChild)</Text>.</Text>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Null Children:</Text> If a node only has one child (or no children), use an underscore <Text style={{fontFamily:'monospace', backgroundColor:'#e0f2fe', paddingHorizontal:4}}>_</Text> for the empty side.</Text>
                <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Zooming:</Text> Very deep trees will automatically widen. Swipe left and right to view them!</Text>
            </View>

            {/* 📚 THEORY CARD */}
            <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
              <Ionicons name="git-network" size={20} color="#104a28" />
              <Text style={styles.theoryToggleText}>Learn Tree Rules</Text>
              <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
            </TouchableOpacity>
            
            {showTheory && (
              <View style={styles.theoryCard}>
                <Text style={styles.theoryText}>Tree traversal is the process of visiting every node in a tree data structure exactly once.</Text>
                <View style={styles.divider} />
                <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Root:</Text> The topmost node (has no parent).</Text>
                <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Leaf:</Text> Nodes at the very bottom (have no children).</Text>
              </View>
            )}

            {/* ✅ MASSIVELY EXPANDED PRESET EXAMPLES */}
            <Text style={styles.sectionHeader}>Try a Preset Tree Structure</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('A(B,C) B(D,E) C(_,F)')}>
                    <Ionicons name="git-merge-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Standard (7 Nodes)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('A(B,C) B(D,E) C(F,G) D(H,I) E(J,K) F(L,M) G(N,O) H(P,Q) I(R,S) J(T,U) K(V,W) L(X,Y) M(Z,1) N(2,3) O(4,5)')}>
                    <Ionicons name="expand-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Full Binary (31 Nodes)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('M(G,T) G(C,J) T(Q,W) C(A,E) J(H,L) Q(O,S) W(U,Y) A(_,B) E(D,F) H(_,I) L(K,_) O(N,P) S(R,_) U(_,V) Y(X,Z)')}>
                    <Ionicons name="text-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Alphabet BST (26 Nodes)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('10(9,_) 9(8,_) 8(7,_) 7(6,_) 6(5,_) 5(4,_) 4(3,_) 3(2,_) 2(1,_)')}>
                    <Ionicons name="arrow-undo-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Degenerate Left (10 Nodes)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('+(5,*) *(3,2)')}>
                    <Ionicons name="calculator-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Math AST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('1(2,3) 2(4,5) 3(_,6) 5(7,8) 6(9,_) 8(_,10)')}>
                    <Ionicons name="shuffle-outline" size={16} color="#b45309" />
                    <Text style={styles.exampleBtnText}>Complex Unbalanced</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* ⚙️ CALCULATOR CARD */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Build Your Tree</Text>
              
              <TextInput 
                  style={styles.inputMultiline} 
                  value={treeInput} 
                  onChangeText={setTreeInput} 
                  placeholder="e.g. A(B,C) B(D,E)" 
                  autoCapitalize="characters"
                  multiline
              />

              <View style={styles.btnRow}>
                  {['PREORDER', 'INORDER', 'POSTORDER'].map(type => (
                      <TouchableOpacity 
                          key={type} 
                          style={[styles.typeBtn, traversalType === type && styles.typeBtnActive]}
                          onPress={() => { setTraversalType(type); }}
                      >
                          <Text style={[styles.typeBtnText, traversalType === type && styles.typeBtnTextActive]}>
                              {type}
                          </Text>
                      </TouchableOpacity>
                  ))}
              </View>

              <TouchableOpacity style={styles.calcButton} onPress={buildAndTraverse}>
                <Text style={styles.calcButtonText}>Draw & Traverse Tree</Text>
              </TouchableOpacity>
            </View>

            {/* 📝 RESULT CARD */}
            {result && (
              <View style={styles.resultCard}>
                  <View style={styles.resultBanner}>
                      <Text style={styles.resultTitle}>{traversalType} TRAVERSAL</Text>
                      <Text style={styles.ruleText}>Rule: <Text style={{color: '#c2410c', fontWeight: 'bold'}}>{explanations[traversalType].rule}</Text></Text>
                  </View>
                  
                  <Text style={styles.descText}>{explanations[traversalType].desc}</Text>
                  
                  <View style={styles.divider} />

                  {/* SVG TREE RENDERING */}
                  <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={true} 
                      bounces={false}
                      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
                  >
                      <View style={styles.svgWrapper}>
                          <Text style={styles.swipeHint}><Ionicons name="swap-horizontal" size={14}/> Swipe to view full tree <Ionicons name="swap-horizontal" size={14}/></Text>
                          <Svg height={Math.max(150, 60 + result.maxDepth * 60)} width={result.treeWidth} viewBox={`0 0 ${result.treeWidth} ${Math.max(150, 60 + result.maxDepth * 60)}`}>
                              
                              {/* Draw Edges First */}
                              {Object.keys(result.layout).map(node => {
                                  const n = result.layout[node];
                                  let lines = [];
                                  if (n.left && result.layout[n.left]) {
                                      const l = result.layout[n.left];
                                      lines.push(<Line key={`${node}-L`} x1={n.x} y1={n.y} x2={l.x} y2={l.y} stroke="#cbd5e1" strokeWidth="2" />);
                                  }
                                  if (n.right && result.layout[n.right]) {
                                      const r = result.layout[n.right];
                                      lines.push(<Line key={`${node}-R`} x1={n.x} y1={n.y} x2={r.x} y2={r.y} stroke="#cbd5e1" strokeWidth="2" />);
                                  }
                                  return lines;
                              })}
                              
                              {/* Draw Nodes on Top */}
                              {Object.keys(result.layout).map(node => {
                                  const n = result.layout[node];
                                  const stepIndex = result.path.indexOf(node) + 1; // Order in the traversal
                                  
                                  return (
                                      <G key={node}>
                                          <Circle cx={n.x} cy={n.y} r="18" fill="#f8fafc" stroke="#3b82f6" strokeWidth="3" />
                                          <SvgText x={n.x} y={n.y + 5} fill="#1e293b" fontSize="14" fontWeight="bold" textAnchor="middle">{node}</SvgText>
                                          
                                          {/* ✅ Orange Numbered Step Badge */}
                                          {stepIndex > 0 && (
                                            <G>
                                                <Circle cx={n.x + 15} cy={n.y - 15} r="11" fill="#f97316" stroke="#fff" strokeWidth="2"/>
                                                <SvgText x={n.x + 15} y={n.y - 11} fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">{stepIndex}</SvgText>
                                            </G>
                                          )}
                                      </G>
                                  );
                              })}
                          </Svg>
                      </View>
                  </ScrollView>

                  <View style={styles.pathBox}>
                      <Text style={styles.pathLabel}>Final Path Array:</Text>
                      <Text style={styles.pathArray}>[ {result.path.join(' → ')} ]</Text>
                  </View>
                  
                  <Text style={styles.noteText}>The orange badges indicate the exact order the computer visits each node.</Text>
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
  theoryText: { fontSize: 13, color: '#374151', lineHeight: 22, marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  inputMultiline: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 16, marginBottom: 15, minHeight: 80, textAlignVertical: 'top', color: '#111', fontWeight: 'bold' },
  
  btnRow: { flexDirection: 'row', gap: 10, justifyContent: 'space-between', marginBottom: 15 },
  typeBtn: { flex: 1, paddingVertical: 12, backgroundColor: '#f1f5f9', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#cbd5e1' },
  typeBtnActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  typeBtnText: { fontSize: 11, fontWeight: 'bold', color: '#475569' },
  typeBtnTextActive: { color: 'white' },

  calcButton: { backgroundColor: '#104a28', padding: 16, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#3b82f6' },
  resultBanner: { backgroundColor: '#fefce8', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#fef08a' },
  resultTitle: { fontSize: 16, fontWeight: '900', color: '#854d0e', textAlign: 'center', marginBottom: 5 },
  ruleText: { fontSize: 14, color: '#92400e', textAlign: 'center' },
  descText: { fontSize: 13, color: '#475569', fontStyle: 'italic', textAlign: 'center', lineHeight: 20 },
  
  svgWrapper: { alignItems: 'center', marginVertical: 10, backgroundColor: '#f8fafc', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 15, alignSelf: 'center' },
  swipeHint: { textAlign: 'center', fontSize: 11, color: '#94a3b8', fontStyle: 'italic', marginVertical: 5 },
  
  pathBox: { backgroundColor: '#eff6ff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#bfdbfe', marginTop: 15 },
  pathLabel: { fontSize: 13, color: '#1d4ed8', fontWeight: 'bold', marginBottom: 6 },
  pathArray: { fontSize: 18, fontWeight: 'bold', color: '#1e40af', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', textAlign: 'center', lineHeight: 28 },
  
  noteText: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: 15 }
});