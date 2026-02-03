import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DijkstraSimulation({ navigation }) {
  const [nodes, setNodes] = useState([]); 
  const [edges, setEdges] = useState([]); 
  const [startNode, setStartNode] = useState('');
  const [targetNode, setTargetNode] = useState('');
  
  const [newNodeName, setNewNodeName] = useState('');
  const [edgeFrom, setEdgeFrom] = useState('');
  const [edgeTo, setEdgeTo] = useState('');
  const [edgeWeight, setEdgeWeight] = useState('');

  const [steps, setSteps] = useState([]); 
  const [finalPath, setFinalPath] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  // --- ACTIONS ---
  
  const loadExample = () => {
    setNodes(['A', 'B', 'C', 'D']);
    setEdges([
      { from: 'A', to: 'B', weight: 5 },
      { from: 'A', to: 'C', weight: 2 },
      { from: 'C', to: 'B', weight: 1 },
      { from: 'B', to: 'D', weight: 3 },
      { from: 'C', to: 'D', weight: 7 },
    ]);
    setStartNode('A');
    setTargetNode('D');
    Alert.alert("Example Loaded", "A sample network has been built. Tap 'GENERATE' to see the flow!");
  };

  const clearBoard = () => {
    setNodes([]);
    setEdges([]);
    setSteps([]);
    setFinalPath(null);
    setStartNode('');
    setTargetNode('');
  };

  const addNode = () => {
    const name = newNodeName.trim().toUpperCase();
    if (!name) return;
    if (nodes.includes(name)) {
      Alert.alert("Duplicate Node", "This node already exists.");
      return;
    }
    setNodes([...nodes, name]);
    setNewNodeName('');
  };

  const addEdge = () => {
    const w = parseFloat(edgeWeight);
    const from = edgeFrom.toUpperCase();
    const to = edgeTo.toUpperCase();

    if (!from || !to || isNaN(w)) {
      Alert.alert("Missing Info", "Provide From, To, and Weight.");
      return;
    }
    if (!nodes.includes(from) || !nodes.includes(to)) {
      Alert.alert("Node Error", "Ensure both nodes exist in the list.");
      return;
    }
    setEdges([...edges, { from, to, weight: w }]);
    setEdgeWeight('');
    setEdgeFrom('');
    setEdgeTo('');
  };

  const runDijkstra = () => {
    if (!nodes.includes(startNode)) {
      Alert.alert("Start Node Error", "Enter a valid start node.");
      return;
    }

    let distances = {};
    let prev = {};
    let unvisited = new Set(nodes);
    let logs = [];

    nodes.forEach(node => {
      distances[node] = Infinity;
      prev[node] = null;
    });
    distances[startNode] = 0;

    while (unvisited.size > 0) {
      let curr = null;
      for (let node of unvisited) {
        if (curr === null || distances[node] < distances[curr]) {
          curr = node;
        }
      }

      if (distances[curr] === Infinity) break;
      unvisited.delete(curr);

      const neighbors = edges.filter(e => e.from === curr || e.to === curr);
      neighbors.forEach(edge => {
        const neighbor = edge.from === curr ? edge.to : edge.from;
        if (unvisited.has(neighbor)) {
          const alt = distances[curr] + edge.weight;
          if (alt < distances[neighbor]) {
            distances[neighbor] = alt;
            prev[neighbor] = curr;
          }
        }
      });

      logs.push({
        stepNode: curr,
        tableState: JSON.parse(JSON.stringify(distances)),
      });
    }

    setSteps(logs);
    
    if (targetNode && distances[targetNode] !== Infinity) {
      let path = [];
      let u = targetNode;
      while (u !== null) {
        path.unshift(u);
        u = prev[u];
      }
      setFinalPath({ path, distance: distances[targetNode] });
    } else {
      setFinalPath(null);
      if(targetNode) Alert.alert("Unreachable", "Target cannot be reached from the start.");
    }
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>DIJKSTRA'S LAB</Text>
        <TouchableOpacity onPress={() => setShowGuide(true)}><Ionicons name="help-circle-outline" size={28} color="#104a28" /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* TOP BUTTONS */}
        <View style={styles.actionRow}>
            <TouchableOpacity style={styles.guideBtn} onPress={loadExample}>
                <Text style={styles.guideBtnText}>LOAD EXAMPLE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.guideBtn, {backgroundColor:'#ffcdd2'}]} onPress={clearBoard}>
                <Text style={[styles.guideBtnText, {color:'#c62828'}]}>CLEAR ALL</Text>
            </TouchableOpacity>
        </View>

        {/* INPUT: NODES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>1. ADD NODES (Vertices)</Text>
          <View style={styles.inputRow}>
            <TextInput style={styles.input} placeholder="Node Name" value={newNodeName} onChangeText={setNewNodeName} />
            <TouchableOpacity style={styles.addBtn} onPress={addNode}><Text style={styles.btnText}>Add</Text></TouchableOpacity>
          </View>
          <View style={styles.nodeDisplay}>
            {nodes.length > 0 ? (
                nodes.map((n, i) => <View key={i} style={styles.nodeBadge}><Text style={styles.badgeText}>{n}</Text></View>)
            ) : <Text style={styles.emptyText}>No nodes added.</Text>}
          </View>
        </View>

        {/* INPUT: EDGES */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>2. CONNECT NODES (Edges)</Text>
          <View style={styles.inputRow}>
            <TextInput style={[styles.input, {flex:1}]} placeholder="From" value={edgeFrom} onChangeText={setEdgeFrom} />
            <TextInput style={[styles.input, {flex:1}]} placeholder="To" value={edgeTo} onChangeText={setEdgeTo} />
            <TextInput style={[styles.input, {flex:1}]} placeholder="Wt" keyboardType="numeric" value={edgeWeight} onChangeText={setEdgeWeight} />
            <TouchableOpacity style={styles.addBtn} onPress={addEdge}><Text style={styles.btnText}>Connect</Text></TouchableOpacity>
          </View>
        </View>

        {/* INPUT: RUN */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. SET START & TARGET</Text>
          <View style={styles.inputRow}>
            <TextInput style={styles.input} placeholder="Start" value={startNode} onChangeText={setStartNode} />
            <TextInput style={styles.input} placeholder="Target" value={targetNode} onChangeText={setTargetNode} />
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={runDijkstra}>
            <Text style={styles.primaryBtnText}>GENERATE COMPUTATION</Text>
          </TouchableOpacity>
        </View>

        {/* --- DYNAMIC VISUAL RESULTS --- */}
        {steps.length > 0 && (
          <View>
            <Text style={styles.sectionHeader}>Computational Simulation Result</Text>
            
            {/* 🏁 VISUAL PATH FLOW (New Feature) */}
            {finalPath && (
              <View style={styles.visualFlowCard}>
                <Text style={styles.labTitle}>OPTIMAL PATH FLOW</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flowContainer}>
                  {finalPath.path.map((node, index) => (
                    <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={[styles.nodeCircle, {backgroundColor: '#104a28'}]}>
                        <Text style={styles.nodeCircleText}>{node}</Text>
                        {index === 0 && <Text style={styles.labelSub}>START</Text>}
                        {index === finalPath.path.length - 1 && <Text style={[styles.labelSub, {color:'#2D7FF9'}]}>GOAL</Text>}
                      </View>
                      {index < finalPath.path.length - 1 && (
                        <View style={styles.connector}>
                            <View style={styles.line} />
                            <Ionicons name="chevron-forward" size={16} color="#104a28" />
                            <Text style={styles.weightText}>
                                {edges.find(e => (e.from === node && e.to === finalPath.path[index+1]) || (e.to === node && e.from === finalPath.path[index+1]))?.weight}
                            </Text>
                        </View>
                      )}
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.pathSummary}>
                    <Ionicons name="speedometer-outline" size={18} color="#fff" />
                    <Text style={styles.pathSummaryText}>Total Computational Cost: {finalPath.distance}</Text>
                </View>
              </View>
            )}

            {/* LOGIC FEED */}
            <View style={styles.card}>
                <Text style={styles.solveTitle}>Step-by-Step Logic:</Text>
                {steps.map((step, i) => (
                    <View key={i} style={styles.logicStep}>
                        <View style={styles.stepCircle}><Text style={styles.stepCircleText}>{i + 1}</Text></View>
                        <View style={{flex: 1}}>
                            <Text style={styles.logicText}>
                                Evaluating Node <Text style={{fontWeight: 'bold', color: '#104a28'}}>{step.stepNode}</Text>.
                            </Text>
                            <Text style={styles.logicSubText}>
                                {i === 0 ? "Initial Node selected. Distance to self is 0." : "Scanning connected neighbors to update shortest routes."}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* COLOR-CODED RELAXATION TABLE */}
            <View style={styles.tableCard}>
                <Text style={styles.tableInfo}>Detailed Relaxation Table (State Matrix):</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.table}>
                    <View style={[styles.row, styles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell, {width: 45}]}>#</Text>
                        <Text style={[styles.cell, styles.headerCell, {width: 55}]}>Node</Text>
                        {nodes.map(n => <Text key={n} style={[styles.cell, styles.headerCell, {width: 65}]}>{n}</Text>)}
                    </View>
                    {steps.map((step, i) => (
                        <View key={i} style={[styles.row, i % 2 !== 0 && styles.oddRow]}>
                            <Text style={[styles.cell, {width: 45}]}>{i + 1}</Text>
                            <Text style={[styles.cell, {width: 55, fontWeight:'bold', color: '#104a28'}]}>{step.stepNode}</Text>
                            {nodes.map(n => {
                                const isCurrentCol = step.stepNode === n;
                                return (
                                    <Text key={n} style={[styles.cell, {width: 65, color: isCurrentCol ? '#104a28' : '#444', fontWeight: isCurrentCol ? '900' : '400'}]}>
                                        {step.tableState[n] === Infinity ? '∞' : step.tableState[n]}
                                    </Text>
                                );
                            })}
                        </View>
                    ))}
                </View>
                </ScrollView>
            </View>
          </View>
        )}
      </ScrollView>

      {/* MODAL GUIDE */}
      <Modal visible={showGuide} animationType="fade" transparent={true}>
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lab Operator Guide</Text>
            <Text style={styles.guideStep}>1. <Text style={{fontWeight:'bold'}}>Vertices:</Text> Add the nodes (points) of your network.</Text>
            <Text style={styles.guideStep}>2. <Text style={{fontWeight:'bold'}}>Edges:</Text> Connect nodes and assign weights (distances).</Text>
            <Text style={styles.guideStep}>3. <Text style={{fontWeight:'bold'}}>Simulate:</Text> Enter start/end points to trigger the algorithm.</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowGuide(false)}>
              <Text style={styles.closeBtnText}>BACK TO LAB</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', elevation: 3 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#333' },
  content: { padding: 15 },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  guideBtn: { flex: 1, backgroundColor: '#E1F5FE', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#B3E5FC' },
  guideBtnText: { color: '#0277BD', fontWeight: 'bold', fontSize: 11 },
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 15, marginBottom: 15, elevation: 1 },
  cardTitle: { fontSize: 13, fontWeight: 'bold', color: '#104a28', marginBottom: 10 },
  inputRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  input: { backgroundColor: '#F8F9FD', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#eee', flex: 2, fontSize: 14 },
  addBtn: { backgroundColor: '#104a28', paddingHorizontal: 18, borderRadius: 10, justifyContent: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  nodeDisplay: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  nodeBadge: { backgroundColor: '#104a28', width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  emptyText: { fontSize: 12, color: '#bbb', fontStyle: 'italic' },
  primaryBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, elevation: 2 },
  primaryBtnText: { color: '#fff', fontWeight: '900', letterSpacing: 1 },
  sectionHeader: { fontSize: 16, fontWeight: 'bold', marginVertical: 15, color: '#333' },
  
  // Visual Lab Elements
  visualFlowCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, marginBottom: 20, alignItems: 'center', elevation: 3, borderTopWidth: 5, borderTopColor: '#104a28' },
  labTitle: { fontSize: 10, fontWeight: 'bold', color: '#888', letterSpacing: 1, marginBottom: 10 },
  flowContainer: { paddingVertical: 20, alignItems: 'center' },
  nodeCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  nodeCircleText: { color: '#fff', fontWeight: 'bold', fontSize: 20 },
  labelSub: { position: 'absolute', bottom: -18, fontSize: 8, fontWeight: 'bold', color: '#104a28' },
  connector: { paddingHorizontal: 12, alignItems: 'center' },
  line: { width: 35, height: 3, backgroundColor: '#104a28', borderRadius: 2 },
  weightText: { fontSize: 10, fontWeight: 'bold', color: '#104a28', marginTop: 2 },
  pathSummary: { flexDirection: 'row', backgroundColor: '#104a28', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, alignItems: 'center', marginTop: 20 },
  pathSummaryText: { color: '#fff', fontSize: 13, marginLeft: 10, fontWeight: 'bold' },

  logicStep: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  stepCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#104a28', justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 2 },
  stepCircleText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  logicText: { fontSize: 14, color: '#333' },
  logicSubText: { fontSize: 12, color: '#777', marginTop: 4 },
  solveTitle: { fontSize: 14, fontWeight: 'bold', color: '#104a28', marginBottom: 15 },
  tableCard: { backgroundColor: '#fff', borderRadius: 15, padding: 15, elevation: 1, marginBottom: 50 },
  tableInfo: { fontSize: 11, color: '#888', marginBottom: 12, fontStyle: 'italic' },
  table: { borderTopWidth: 1, borderColor: '#eee' },
  row: { flexDirection: 'row', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  headerRow: { backgroundColor: '#fafafa' },
  oddRow: { backgroundColor: '#fcfcfc' },
  cell: { textAlign: 'center', fontSize: 13, color: '#444' },
  headerCell: { fontWeight: 'bold', color: '#104a28' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 25 },
  modalContent: { backgroundColor: '#fff', padding: 30, borderRadius: 25 },
  modalTitle: { fontSize: 20, fontWeight: '900', marginBottom: 20, color: '#104a28', textAlign: 'center' },
  guideStep: { fontSize: 14, color: '#444', marginBottom: 15, lineHeight: 22 },
  closeBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  closeBtnText: { color: '#fff', fontWeight: 'bold' }
});