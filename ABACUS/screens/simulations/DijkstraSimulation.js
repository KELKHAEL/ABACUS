import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Line, Circle, Text as SvgText, G } from 'react-native-svg';

export default function DijkstraSimulation({ navigation }) {
  const [edgesInput, setEdgesInput] = useState('A-B-4, A-C-2, B-C-1, B-D-5, C-D-8');
  const [startNode, setStartNode] = useState('A');
  const [result, setResult] = useState(null);
  const [showTheory, setShowTheory] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const nodeCoords = {
    'A': { x: 50, y: 50 }, 'B': { x: 250, y: 50 },
    'C': { x: 50, y: 200 }, 'D': { x: 250, y: 200 },
    'E': { x: 150, y: 125 }, 'F': { x: 150, y: 275 }
  };

  const runDijkstra = () => {
    try {
        const graph = {};
        const edges = [];
        const pairs = edgesInput.split(',').map(p => p.trim());
        
        pairs.forEach(pair => {
            const [u, v, w] = pair.split('-');
            if (!u || !v || isNaN(w)) throw new Error();
            if (!graph[u]) graph[u] = {};
            if (!graph[v]) graph[v] = {};
            const weight = parseInt(w);
            graph[u][v] = weight;
            graph[v][u] = weight;
            edges.push({ from: u, to: v, weight });
        });

        let distances = {};
        let visited = new Set();
        let steps = [];
        let nodes = Object.keys(graph);
        
        if (!nodes.includes(startNode.toUpperCase())) {
            alert(`Start node ${startNode} not found.`); return;
        }

        nodes.forEach(n => distances[n] = Infinity);
        distances[startNode.toUpperCase()] = 0;

        // Step 0: Initialization Frame
        steps.push({
            title: "Initialization",
            desc: `Start at node ${startNode.toUpperCase()}. Distances to all other nodes are Infinity.`,
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
                let newDist = distances[currNode] + graph[currNode][neighbor];
                if (newDist < distances[neighbor]) {
                    distances[neighbor] = newDist;
                    updates.push(`Updated path to ${neighbor} (Cost: ${newDist})`);
                }
            }

            steps.push({
                title: `Settling Node ${currNode}`,
                desc: updates.length > 0 ? updates.join('\n') : "No shorter paths found.",
                visited: new Set(visited),
                distances: { ...distances },
                settled: currNode
            });
        }

        setResult({ steps, nodes, edges });
        setCurrentStepIdx(0);
    } catch (e) { 
        alert("Format error! Use: A-B-5, B-C-2"); 
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
          
          <TouchableOpacity style={styles.theoryToggle} onPress={() => setShowTheory(!showTheory)}>
            <Ionicons name="git-network" size={20} color="#104a28" />
            <Text style={styles.theoryToggleText}>Learn the Logic</Text>
            <Ionicons name={showTheory ? "chevron-up" : "chevron-down"} size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>

          {showTheory && (
            <View style={styles.theoryCard}>
              <Text style={styles.theoryText}>1. Assign the start node a distance of 0, and all others Infinity.</Text>
              <Text style={styles.theoryText}>2. Pick the unvisited node with the smallest known distance.</Text>
              <Text style={styles.theoryText}>3. Look at its neighbors. If (current distance + edge weight) is smaller than the neighbor's known distance, update it!</Text>
              <Text style={styles.theoryText}>4. Mark the node as "Settled" (visited) and repeat.</Text>
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.label}>Graph Edges (Node-Node-Weight)</Text>
            <TextInput style={styles.input} value={edgesInput} onChangeText={setEdgesInput} multiline />
            
            <View style={{marginTop: 15}}>
                <Text style={styles.label}>Starting Node:</Text>
                <TextInput style={styles.inputSmall} value={startNode} onChangeText={setStartNode} maxLength={1} autoCapitalize="characters" />
            </View>

            <TouchableOpacity style={styles.calcButton} onPress={runDijkstra}>
              <Text style={styles.calcButtonText}>Start Visualizer</Text>
            </TouchableOpacity>
          </View>

          {result && (
            <View style={styles.visualCard}>
              
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

              {/* SVG GRAPH MAP */}
              <View style={styles.svgWrapper}>
                <Svg height="250" width="300" viewBox="0 0 300 250">
                  {/* Render Edges */}
                  {result.edges.map((edge, i) => {
                    const p1 = nodeCoords[edge.from] || {x: 150, y: 125};
                    const p2 = nodeCoords[edge.to] || {x: 150, y: 125};
                    return (
                      <G key={`edge-${i}`}>
                        <Line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#cbd5e1" strokeWidth="2" />
                        <Circle cx={(p1.x + p2.x)/2} cy={(p1.y + p2.y)/2} r="10" fill="#fff" />
                        <SvgText x={(p1.x + p2.x)/2} y={(p1.y + p2.y)/2 + 4} fill="#64748b" fontSize="12" fontWeight="bold" textAnchor="middle">{edge.weight}</SvgText>
                      </G>
                    );
                  })}
                  {/* Render Nodes */}
                  {result.nodes.map(node => {
                    const coord = nodeCoords[node] || {x: 150, y: 125};
                    const frame = result.steps[currentStepIdx];
                    const isSettled = frame.visited.has(node);
                    const isCurrent = frame.settled === node;
                    
                    let fillColor = "#fff";
                    let strokeColor = "#94a3b8";
                    if (isCurrent) { fillColor = "#fef08a"; strokeColor = "#ca8a04"; } // Yellow for active
                    else if (isSettled) { fillColor = "#dcfce7"; strokeColor = "#16a34a"; } // Green for settled

                    return (
                      <G key={`node-${node}`}>
                        <Circle cx={coord.x} cy={coord.y} r="18" fill={fillColor} stroke={strokeColor} strokeWidth="3" />
                        <SvgText x={coord.x} y={coord.y + 5} fill="#1e293b" fontSize="14" fontWeight="bold" textAnchor="middle">{node}</SvgText>
                      </G>
                    );
                  })}
                </Svg>
              </View>

              {/* DISTANCE TABLE */}
              <Text style={styles.tableTitle}>Shortest Distances at this Step:</Text>
              <View style={styles.distRow}>
                  {result.nodes.map(n => {
                      const dist = result.steps[currentStepIdx].distances[n];
                      const isSettled = result.steps[currentStepIdx].visited.has(n);
                      return (
                          <View key={n} style={[styles.distCol, isSettled && {backgroundColor: '#dcfce7', borderColor: '#16a34a'}]}>
                              <Text style={styles.distLabel}>{n}</Text>
                              <Text style={styles.distVal}>{dist === Infinity ? '∞' : dist}</Text>
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
  scrollContent: { padding: 20 },
  
  theoryToggle: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fdf4', padding: 15, borderRadius: 10, marginBottom: 15 },
  theoryToggleText: { color: '#104a28', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
  theoryCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#bbf7d0' },
  theoryText: { fontSize: 13, color: '#374151', lineHeight: 22, marginBottom: 5 },
  
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, marginBottom: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: '#64748b', marginBottom: 8 },
  input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 12, borderRadius: 8, fontFamily: 'monospace' },
  inputSmall: { width: 60, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', padding: 10, borderRadius: 8, textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  calcButton: { backgroundColor: '#104a28', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  calcButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  visualCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, elevation: 2, alignItems: 'center', borderTopWidth: 5, borderTopColor: '#3b82f6' },
  
  vcrControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 15, backgroundColor: '#f1f5f9', padding: 10, borderRadius: 8 },
  btnFrame: { backgroundColor: '#3b82f6', padding: 10, borderRadius: 8 },
  frameText: { fontWeight: 'bold', color: '#334155', fontSize: 16 },

  actionBox: { width: '100%', backgroundColor: '#fffbeb', borderWidth: 1, borderColor: '#fde047', padding: 15, borderRadius: 8, marginBottom: 15 },
  actionTitle: { fontWeight: 'bold', color: '#854d0e', fontSize: 16, marginBottom: 5 },
  actionDesc: { color: '#a16207', fontFamily: 'monospace', fontSize: 13 },

  svgWrapper: { backgroundColor: '#f8fafc', borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 20 },
  
  tableTitle: { fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 10, alignSelf: 'flex-start' },
  distRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, width: '100%', justifyContent: 'center' },
  distCol: { alignItems: 'center', backgroundColor: '#f8fafc', padding: 10, borderRadius: 6, minWidth: 45, borderWidth: 1, borderColor: '#e2e8f0' },
  distLabel: { fontSize: 12, color: '#64748b', fontWeight: 'bold', marginBottom: 2 },
  distVal: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' }
});