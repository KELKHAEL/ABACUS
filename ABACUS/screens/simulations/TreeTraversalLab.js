import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Circle, Text as SvgText, G } from 'react-native-svg';

// Get screen width to calculate dynamic centering
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function TreeTraversalLab({ navigation }) {
  const [treeInput, setTreeInput] = useState('A(B,C) B(D,E) C(-,F)');
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

  const buildAndTraverse = () => {
      try {
          const parsedNodes = {};
          const childrenSet = new Set();
          let firstNode = null;

          const regex = /([a-zA-Z0-9_]+)\s*\(\s*([a-zA-Z0-9_\-]+)\s*,\s*([a-zA-Z0-9_\-]+)\s*\)/g;
          let match;
          let foundNodes = 0;

          while ((match = regex.exec(treeInput)) !== null) {
              const parent = match[1];
              const left = match[2];
              const right = match[3];

              if (!firstNode) firstNode = parent;
              parsedNodes[parent] = {
                  left: left !== '-' ? left : null,
                  right: right !== '-' ? right : null
              };
              if (left !== '-') childrenSet.add(left);
              if (right !== '-') childrenSet.add(right);
              foundNodes++;
          }

          if (foundNodes === 0) {
              throw new Error("No valid nodes found.");
          }

          // 2. Find the Root (A node that is never a child)
          let root = Object.keys(parsedNodes).find(n => !childrenSet.has(n)) || firstNode;
          if (!root) throw new Error("Could not determine the root of the tree.");

          // 3. Dynamically Calculate X, Y Coordinates for SVG
          const layout = {};
          let maxDepth = 0;
          
          // Calculate the width of the tree based on the user's screen size
          // Subtract 80 to account for padding/margins on the sides
          const treeWidth = Math.max(340, SCREEN_WIDTH - 80);

          const calcLayout = (node, depth, minX, maxX) => {
              if (!node) return;
              maxDepth = Math.max(maxDepth, depth);
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

          setResult({ layout, path, maxDepth, treeWidth });

      } catch (e) {
          Alert.alert(
              "Format Error", 
              "Please use the correct format: Parent(Left,Right)\n\nExample: A(B,C) B(D,E)"
          );
      }
  };

  React.useEffect(() => {
      buildAndTraverse();
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
            
            {/* 📚 THEORY CARD */}
            <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
              <Ionicons name="git-network" size={20} color="#104a28" />
              <Text style={styles.theoryToggleText}>Learn Tree Rules</Text>
              <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
            </TouchableOpacity>
            
            {showTheory && (
              <View style={styles.theoryCard}>
                <Text style={styles.theoryText}>Tree traversal is the process of visiting exactly every node in a tree data structure exactly once.</Text>
                <View style={styles.divider} />
                <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Root:</Text> The topmost node.</Text>
                <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Leaf:</Text> Nodes with no children.</Text>
                <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Format:</Text> Use `Node(Left,Right)` to build branches. Use `-` if a side is empty.</Text>
              </View>
            )}

            {/* ⚙️ CALCULATOR CARD */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Build Your Tree</Text>
              
              <View style={styles.exampleBox}>
                  <Text style={styles.exampleTitle}>Tap to Try an Example:</Text>
                  <TouchableOpacity onPress={() => { setTreeInput('A(B,C) B(D,E) C(-,F)'); setResult(null); }}>
                      <Text style={styles.exampleText}>• Standard Tree: A(B,C) B(D,E) C(-,F)</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setTreeInput('5(3,8) 3(1,4) 8(7,9)'); setResult(null); }}>
                      <Text style={styles.exampleText}>• Number Tree: 5(3,8) 3(1,4) 8(7,9)</Text>
                  </TouchableOpacity>
              </View>
              
              <TextInput 
                  style={styles.input} 
                  value={treeInput} 
                  onChangeText={setTreeInput} 
                  placeholder="e.g. A(B,C) B(D,E)" 
                  autoCapitalize="characters"
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
                  <Text style={styles.resultTitle}>{traversalType} TRAVERSAL</Text>
                  <Text style={styles.ruleText}>Rule: <Text style={{color: '#c2410c', fontWeight: 'bold'}}>{explanations[traversalType].rule}</Text></Text>
                  <Text style={styles.descText}>{explanations[traversalType].desc}</Text>
                  
                  <View style={styles.divider} />

                  {/* SVG TREE RENDERING (Now perfectly centered dynamically) */}
                  <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={true} 
                      bounces={false}
                      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
                  >
                      <View style={styles.svgWrapper}>
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
                                          
                                          {/* Orange Numbered Step Badge */}
                                          {stepIndex > 0 && (
                                            <G>
                                                <Circle cx={n.x + 15} cy={n.y - 15} r="10" fill="#f97316" />
                                                <SvgText x={n.x + 15} y={n.y - 11} fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">{stepIndex}</SvgText>
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
                  
                  <Text style={styles.noteText}>The orange numbered badges indicate the exact order the computer visits each node.</Text>
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
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f2fe', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#0369a1', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#bae6fd' },
  theoryText: { fontSize: 14, color: '#334155', marginBottom: 6 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 15 },

  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  
  exampleBox: { backgroundColor: '#f1f5f9', padding: 10, borderRadius: 8, marginBottom: 15, borderLeftWidth: 3, borderLeftColor: '#3b82f6' },
  exampleTitle: { fontSize: 12, fontWeight: 'bold', color: '#475569', marginBottom: 4 },
  exampleText: { fontSize: 12, color: '#64748b', fontFamily: 'monospace', marginBottom: 4 },

  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#d1d5db', padding: 15, borderRadius: 8, fontFamily: 'monospace', fontSize: 16, marginBottom: 15 },
  
  btnRow: { flexDirection: 'row', gap: 10, justifyContent: 'space-between', marginBottom: 15 },
  typeBtn: { flex: 1, paddingVertical: 10, backgroundColor: '#f1f5f9', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  typeBtnActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  typeBtnText: { fontSize: 11, fontWeight: 'bold', color: '#64748b' },
  typeBtnTextActive: { color: 'white' },

  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  resultCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, borderLeftWidth: 5, borderLeftColor: '#3b82f6' },
  resultTitle: { fontSize: 16, fontWeight: '900', color: '#1e293b', textAlign: 'center', marginBottom: 5 },
  ruleText: { fontSize: 14, color: '#475569', textAlign: 'center', marginBottom: 5 },
  descText: { fontSize: 13, color: '#64748b', fontStyle: 'italic', textAlign: 'center' },
  
  svgWrapper: { alignItems: 'center', marginVertical: 10, backgroundColor: '#f8fafc', borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', paddingVertical: 10, alignSelf: 'center' },
  
  pathBox: { backgroundColor: '#fff7ed', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#fed7aa', marginTop: 10 },
  pathLabel: { fontSize: 12, color: '#c2410c', fontWeight: 'bold', marginBottom: 5 },
  pathArray: { fontSize: 16, fontWeight: 'bold', color: '#9a3412', fontFamily: 'monospace', textAlign: 'center' },
  
  noteText: { fontSize: 11, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: 15 }
});