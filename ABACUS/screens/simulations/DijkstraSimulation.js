import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Circle, Rect, Text as SvgText, G } from 'react-native-svg';

export default function DijkstraSimulation({ navigation }) {
  const [edgesInput, setEdgesInput] = useState('A-B-4, A-F-2, B-C-1, B-G-5, C-D-8, F-G-1, G-H-3, C-H-2');
  const [startNode, setStartNode] = useState('A');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  // ✅ VISUAL CUSTOMIZER STATE
  const [nodeShape, setNodeShape] = useState('circle'); // 'circle' or 'square'
  const [edgeStyle, setEdgeStyle] = useState('solid'); // 'solid' or 'dashed'

  // ✅ EXPANDED 4x2 GRID COORDINATES (Requires 550px wide canvas)
  const nodeCoords = {
    'A': { x: 50, y: 50 },  'B': { x: 200, y: 50 },  'C': { x: 350, y: 50 },  'D': { x: 500, y: 50 },
    'E': { x: 50, y: 200 }, 'F': { x: 200, y: 200 }, 'G': { x: 350, y: 200 }, 'H': { x: 500, y: 200 }
  };

  // ✅ STRICT INPUT VALIDATION (Expanded to A-H)
  const handleEdgesInput = (text) => {
    const cleanText = text.toUpperCase().replace(/[^A-H0-9,\-\s]/g, '');
    setEdgesInput(cleanText);
  };

  const handleStartInput = (text) => {
    const cleanText = text.toUpperCase().replace(/[^A-H]/g, '');
    setStartNode(cleanText);
  };

  // ✅ PRESET EXAMPLES
  const loadExample = (edges, start) => {
      setEdgesInput(edges);
      setStartNode(start);
      setResult(null);
  };

  const runDijkstra = () => {
    Keyboard.dismiss();

    if (!edgesInput.trim() || !startNode) {
        Alert.alert("Required Fields", "Please enter both graph edges and a starting node.");
        return;
    }

    try {
        const graph = {};
        const edges = [];
        const pairs = edgesInput.split(',').map(p => p.trim()).filter(p => p.length > 0);
        
        for (let pair of pairs) {
            const parts = pair.split('-');
            if (parts.length !== 3) throw new Error(`Invalid format in pair: '${pair}'. Use format A-B-5.`);
            
            const [u, v, w] = parts;
            if (!nodeCoords[u] || !nodeCoords[v]) throw new Error(`Invalid node in '${pair}'. Only nodes A through H are supported.`);
            
            const weight = parseInt(w, 10);
            if (isNaN(weight) || weight < 0) throw new Error(`Invalid weight in '${pair}'. Dijkstra's algorithm requires positive numbers.`);
            
            if (!graph[u]) graph[u] = {};
            if (!graph[v]) graph[v] = {};
            
            graph[u][v] = weight;
            graph[v][u] = weight;
            edges.push({ from: u, to: v, weight });
        }

        let distances = {};
        let visited = new Set();
        let steps = [];
        let nodes = Object.keys(graph);
        
        if (!nodes.includes(startNode)) {
            Alert.alert("Node Not Found", `Starting node ${startNode} is not connected to any edges in your graph.`);
            return;
        }

        nodes.forEach(n => distances[n] = Infinity);
        distances[startNode] = 0;

        steps.push({
            title: "Initialization",
            desc: `Start at node ${startNode}. Set its distance to 0. Set all other known node distances to Infinity (∞).`,
            visited: new Set(),
            distances: { ...distances },
            settled: null
        });

        while (visited.size < nodes.length) {
            let currNode = null;
            let minDistance = Infinity;

            nodes.forEach(n => {
                if (!visited.has(n) && distances[n] < minDistance) {
                    minDistance = distances[n];
                    currNode = n;
                }
            });

            if (currNode === null) break;

            visited.add(currNode);
            let updates = [];

            for (let neighbor in graph[currNode]) {
                if (!visited.has(neighbor)) {
                    let newDist = distances[currNode] + graph[currNode][neighbor];
                    if (newDist < distances[neighbor]) {
                        distances[neighbor] = newDist;
                        updates.push(`Found faster path to ${neighbor}! Updated cost to ${newDist}.`);
                    } else {
                        updates.push(`Checked ${neighbor}. Current cost (${distances[neighbor]}) is already better or equal.`);
                    }
                }
            }

            steps.push({
                title: `Evaluating Node ${currNode}`,
                desc: updates.length > 0 ? updates.join('\n') : `Node ${currNode} has no unvisited neighbors to check.`,
                visited: new Set(visited),
                distances: { ...distances },
                settled: currNode
            });
        }

        setResult({ steps, nodes, edges });
        setCurrentStepIdx(0);
    } catch (e) { 
        Alert.alert("Format Error", e.message); 
    }
  };

  const nextStep = () => { if (currentStepIdx < result.steps.length - 1) setCurrentStepIdx(prev => prev + 1); };
  const prevStep = () => { if (currentStepIdx > 0) setCurrentStepIdx(prev => prev - 1); };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#104a28" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dijkstra Visualizer</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* ✅ GUIDELINES CARD */}
          <View style={styles.guidelinesCard}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8}}>
                  <Ionicons name="information-circle" size={22} color="#0284c7" />
                  <Text style={styles.guidelinesTitle}>Simulation Guidelines</Text>
              </View>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Format:</Text> Use `Node-Node-Weight` separated by commas (e.g., A-B-5, B-C-2).</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Valid Nodes:</Text> Only letters <Text style={{fontWeight:'bold'}}>A through H</Text> are permitted.</Text>
              <Text style={styles.guidelinesText}>• <Text style={{fontWeight: 'bold'}}>Weights:</Text> Must be positive whole numbers. Dijkstra mathematically fails with negative numbers.</Text>
          </View>

          {/* 📚 THEORY CARD */}
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="git-network" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Logic</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>

          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Step 1:</Text> Assign the start node a distance of 0, and all others Infinity.</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Step 2:</Text> Pick the unvisited node with the smallest known distance to act as the "Current Node".</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Step 3:</Text> Look at its neighbors. If (current distance + edge weight) is smaller than the neighbor's currently saved distance, update it!</Text>
              <Text style={styles.theoryText}><Text style={{fontWeight: 'bold'}}>Step 4:</Text> Mark the Current Node as "Settled" (visited) so we never check it again, and repeat.</Text>
            </View>
          )}

          {/* ✅ PRESET EXAMPLES */}
          <Text style={styles.sectionHeader}>Try a Preset Network</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exampleScroll}>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('A-B-4, A-F-2, B-C-1, B-G-5, C-D-8, F-G-1, G-H-3, C-H-2', 'A')}>
                  <Ionicons name="grid-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>The 8-Node Grid</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('A-C-10, A-F-2, F-G-2, G-C-2', 'A')}>
                  <Ionicons name="shuffle-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>The Detour (Avoids A-C)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exampleBtn} onPress={() => loadExample('E-A-1, E-B-1, E-F-10, F-C-1, F-D-1', 'E')}>
                  <Ionicons name="close-outline" size={16} color="#b45309" />
                  <Text style={styles.exampleBtnText}>The X-Cross</Text>
              </TouchableOpacity>
          </ScrollView>

          {/* ⚙️ CALCULATOR CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Build Graph</Text>
            
            <Text style={styles.label}>Graph Edges (Node-Node-Weight)</Text>
            <TextInput 
              style={styles.inputMultiline} 
              value={edgesInput} 
              onChangeText={handleEdgesInput} 
              multiline 
              placeholder="A-B-4, A-C-2..."
            />
            
            <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Text style={styles.label}>Starting Node (A-H):</Text>
                <TextInput 
                  style={styles.inputSmall} 
                  value={startNode} 
                  onChangeText={handleStartInput} 
                  maxLength={1} 
                  placeholder="A" 
                />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={runDijkstra}>
              <Text style={styles.calcButtonText}>Start Visualizer</Text>
            </TouchableOpacity>
          </View>

          {/* 📝 VISUALIZATION CARD */}
          {result && (
            <View style={styles.visualCard}>
              
              <Text style={styles.cardTitle}>Graph Visualizer</Text>

              {/* ✅ VISUAL CUSTOMIZER */}
              <View style={styles.customizerBox}>
                  <Text style={styles.customizerTitle}>Visual Settings:</Text>
                  <View style={styles.customizerRow}>
                      <TouchableOpacity style={[styles.customToggle, nodeShape === 'circle' && styles.customToggleActive]} onPress={() => setNodeShape('circle')}>
                          <Text style={[styles.customToggleText, nodeShape === 'circle' && {color: 'white'}]}>Circles</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.customToggle, nodeShape === 'square' && styles.customToggleActive]} onPress={() => setNodeShape('square')}>
                          <Text style={[styles.customToggleText, nodeShape === 'square' && {color: 'white'}]}>Squares</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.customizerRow}>
                      <TouchableOpacity style={[styles.customToggle, edgeStyle === 'solid' && styles.customToggleActive]} onPress={() => setEdgeStyle('solid')}>
                          <Text style={[styles.customToggleText, edgeStyle === 'solid' && {color: 'white'}]}>Solid Lines</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.customToggle, edgeStyle === 'dashed' && styles.customToggleActive]} onPress={() => setEdgeStyle('dashed')}>
                          <Text style={[styles.customToggleText, edgeStyle === 'dashed' && {color: 'white'}]}>Dashed Lines</Text>
                      </TouchableOpacity>
                  </View>
              </View>

              {/* VCR CONTROLS */}
              <View style={styles.vcrControls}>
                  <TouchableOpacity onPress={prevStep} style={[styles.btnFrame, currentStepIdx === 0 && {opacity: 0.5}]} disabled={currentStepIdx === 0}>
                      <Ionicons name="play-back" size={20} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.frameText}>Step {currentStepIdx} of {result.steps.length - 1}</Text>
                  <TouchableOpacity onPress={nextStep} style={[styles.btnFrame, currentStepIdx === result.steps.length - 1 && {opacity: 0.5}]} disabled={currentStepIdx === result.steps.length - 1}>
                      <Ionicons name="play-forward" size={20} color="white" />
                  </TouchableOpacity>
              </View>

              {/* ACTION EXPLANATION */}
              <View style={styles.actionBox}>
                  <Text style={styles.actionTitle}>{result.steps[currentStepIdx].title}</Text>
                  <Text style={styles.actionDesc}>{result.steps[currentStepIdx].desc}</Text>
              </View>

              {/* ✅ HORIZONTAL SCROLLABLE SVG GRAPH MAP */}
              <View style={styles.scrollSvgWrapper}>
                  <Text style={styles.swipeHint}><Ionicons name="swap-horizontal" size={14}/> Swipe to view full graph <Ionicons name="swap-horizontal" size={14}/></Text>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} bounces={false}>
                      <View style={{ padding: 10 }}>
                          <Svg height="250" width="550" viewBox="0 0 550 250">
                            {/* Render Edges */}
                            {result.edges.map((edge, i) => {
                              const p1 = nodeCoords[edge.from] || {x: 50, y: 50};
                              const p2 = nodeCoords[edge.to] || {x: 50, y: 50};
                              const strokeDash = edgeStyle === 'dashed' ? "6, 6" : "0";
                              
                              return (
                                <G key={`edge-${i}`}>
                                  <Line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="2" strokeDasharray={strokeDash} />
                                  <Circle cx={(p1.x + p2.x)/2} cy={(p1.y + p2.y)/2} r="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                                  <SvgText x={(p1.x + p2.x)/2} y={(p1.y + p2.y)/2 + 4} fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">{edge.weight}</SvgText>
                                </G>
                              );
                            })}
                            
                            {/* Render Nodes */}
                            {result.nodes.map(node => {
                              const coord = nodeCoords[node] || {x: 50, y: 50};
                              const frame = result.steps[currentStepIdx];
                              const isSettled = frame.visited.has(node);
                              const isCurrent = frame.settled === node;
                              
                              let fillColor = "#ffffff";
                              let strokeColor = "#94a3b8";
                              let fontColor = "#334155";

                              if (isCurrent) { 
                                  fillColor = "#fef08a"; strokeColor = "#ca8a04"; fontColor = "#854d0e";
                              } else if (isSettled) { 
                                  fillColor = "#dcfce7"; strokeColor = "#16a34a"; fontColor = "#166534";
                              }

                              return (
                                <G key={`node-${node}`}>
                                  {nodeShape === 'circle' ? (
                                      <Circle cx={coord.x} cy={coord.y} r="20" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                                  ) : (
                                      <Rect x={coord.x - 20} y={coord.y - 20} width="40" height="40" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                                  )}
                                  <SvgText x={coord.x} y={coord.y + 5} fill={fontColor} fontSize="16" fontWeight="bold" textAnchor="middle">{node}</SvgText>
                                </G>
                              );
                            })}
                          </Svg>
                      </View>
                  </ScrollView>
              </View>

              {/* Visual Legend */}
              <View style={styles.legendRow}>
                  <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#ffffff', borderColor: '#94a3b8'}]} /><Text style={styles.legendText}>Unvisited</Text></View>
                  <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#fef08a', borderColor: '#ca8a04'}]} /><Text style={styles.legendText}>Evaluating</Text></View>
                  <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#dcfce7', borderColor: '#16a34a'}]} /><Text style={styles.legendText}>Settled</Text></View>
              </View>

              <View style={styles.divider} />

              {/* DISTANCE TABLE */}
              <Text style={styles.tableTitle}>Shortest Discovered Distances:</Text>
              <View style={styles.distRow}>
                  {result.nodes.sort().map(n => {
                      const dist = result.steps[currentStepIdx].distances[n];
                      const isSettled = result.steps[currentStepIdx].visited.has(n);
                      return (
                          <View key={n} style={[styles.distCol, isSettled && {backgroundColor: '#dcfce7', borderColor: '#bbf7d0'}]}>
                              <Text style={[styles.distLabel, isSettled && {color: '#166534'}]}>{n}</Text>
                              <Text style={[styles.distVal, isSettled && {color: '#166534'}]}>{dist === Infinity ? '∞' : dist}</Text>
                          </View>
                      );
                  })}
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
  theoryText: { fontSize: 13, color: '#374151', lineHeight: 22, marginBottom: 8 },
  
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#64748b', marginBottom: 8, textTransform: 'uppercase' },
  inputMultiline: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 15, borderRadius: 8, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 16, minHeight: 80, textAlignVertical: 'top', color: '#111', fontWeight: 'bold' },
  inputSmall: { width: 60, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 10, borderRadius: 8, textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#111' },
  
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  visualCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, alignItems: 'center', borderTopWidth: 5, borderTopColor: '#3b82f6' },
  
  customizerBox: { width: '100%', backgroundColor: '#f8fafc', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 15 },
  customizerTitle: { fontSize: 12, fontWeight: 'bold', color: '#64748b', marginBottom: 8, textTransform: 'uppercase' },
  customizerRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  customToggle: { flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 6 },
  customToggleActive: { backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
  customToggleText: { fontSize: 13, fontWeight: 'bold', color: '#475569' },

  vcrControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 15, backgroundColor: '#f1f5f9', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  btnFrame: { backgroundColor: '#3b82f6', padding: 10, borderRadius: 8 },
  frameText: { fontWeight: 'bold', color: '#334155', fontSize: 16 },

  actionBox: { width: '100%', backgroundColor: '#fefce8', borderWidth: 1, borderColor: '#fef08a', padding: 15, borderRadius: 8, marginBottom: 15 },
  actionTitle: { fontWeight: 'bold', color: '#a16207', fontSize: 16, marginBottom: 5 },
  actionDesc: { color: '#854d0e', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 13, lineHeight: 20 },

  scrollSvgWrapper: { width: '100%', backgroundColor: '#f8fafc', borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 15 },
  swipeHint: { textAlign: 'center', fontSize: 11, color: '#94a3b8', fontStyle: 'italic', marginVertical: 8 },
  
  legendRow: { flexDirection: 'row', gap: 15, marginBottom: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legendDot: { width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  legendText: { fontSize: 12, color: '#64748b', fontWeight: 'bold' },
  
  divider: { width: '100%', height: 1, backgroundColor: '#e2e8f0', marginVertical: 15 },

  tableTitle: { fontSize: 15, fontWeight: 'bold', color: '#475569', marginBottom: 10, alignSelf: 'flex-start' },
  distRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, width: '100%', justifyContent: 'flex-start' },
  distCol: { alignItems: 'center', backgroundColor: '#f8fafc', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, minWidth: 50, borderWidth: 1, borderColor: '#e2e8f0' },
  distLabel: { fontSize: 13, color: '#64748b', fontWeight: 'bold', marginBottom: 4 },
  distVal: { fontSize: 18, fontWeight: '900', color: '#0f172a', fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }
});