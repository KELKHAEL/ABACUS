import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, Keyboard, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TreeTraversalLab({ navigation }) {
  const [inputValue, setInputValue] = useState('');
  const [treeData, setTreeData] = useState([]);
  const [traversalResult, setTraversalResult] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const loadExample = () => {
    // Creating a standard BST structure for clear visualization
    const example = [50, 30, 70, 20, 40];
    setTreeData(example);
    setTraversalResult(null);
    Alert.alert("Example Loaded", "Set A = {50, 30, 70, 20, 40} loaded into BST Engine.");
  };

  const clearLab = () => {
    setTreeData([]);
    setTraversalResult(null);
    setInputValue('');
  };

  const addNode = () => {
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      Alert.alert("Input Required", "Please enter a numeric value for the node.");
      return;
    }
    if (treeData.includes(val)) {
      Alert.alert("Duplicate Node", "This value already exists in the tree.");
      return;
    }
    setTreeData([...treeData, val]);
    setInputValue('');
    setTraversalResult(null);
  };

  const buildTree = (arr) => {
    if (!arr.length) return null;
    let root = { val: arr[0], left: null, right: null, level: 0, x: 0 };
    for (let i = 1; i < arr.length; i++) {
      insertBST(root, arr[i], 1);
    }
    return root;
  };

  const insertBST = (node, val) => {
    if (val < node.val) {
      if (!node.left) node.left = { val, left: null, right: null };
      else insertBST(node.left, val);
    } else {
      if (!node.right) node.right = { val, left: null, right: null };
      else insertBST(node.right, val);
    }
  };

  const runTraversal = (type) => {
    if (!treeData.length) {
      Alert.alert("Simulation Error", "The tree is empty. Add nodes to start.");
      return;
    }
    const root = buildTree(treeData);
    let path = [];
    let logs = [];

    const traverse = (node) => {
      if (!node) return;

      // Logic for Pre-order: Root -> Left -> Right
      if (type === 'PRE') {
        path.push(node.val);
        logs.push({ 
          action: `ROOT_VISIT(${node.val})`, 
          desc: `Recording root before moving to children.`,
          state: [...path] 
        });
      }

      if (node.left) logs.push({ action: `MOVE_LEFT`, desc: `Descending from ${node.val} to ${node.left.val}.`, state: [...path] });
      traverse(node.left);

      // Logic for In-order: Left -> Root -> Right
      if (type === 'IN') {
        path.push(node.val);
        logs.push({ 
          action: `NODE_VISIT(${node.val})`, 
          desc: `Left subtree finished. Recording node ${node.val}.`,
          state: [...path] 
        });
      }

      if (node.right) logs.push({ action: `MOVE_RIGHT`, desc: `Moving to right child of ${node.val}.`, state: [...path] });
      traverse(node.right);

      // Logic for Post-order: Left -> Right -> Root
      if (type === 'POST') {
        path.push(node.val);
        logs.push({ 
          action: `SUBTREE_COMPLETE(${node.val})`, 
          desc: `Children of ${node.val} processed. Recording root.`,
          state: [...path] 
        });
      }
    };

    traverse(root);
    setTraversalResult({ type, path, logs });
    Keyboard.dismiss();
  };

  const TreeNode = ({ node }) => {
    if (!node) return null;
    return (
      <View style={styles.treeContainer}>
        <View style={[styles.nodeCircle, traversalResult?.path.includes(node.val) && styles.nodeCircleActive]}>
          <Text style={[styles.nodeText, traversalResult?.path.includes(node.val) && styles.nodeTextActive]}>{node.val}</Text>
        </View>
        <View style={styles.childrenContainer}>
          <View style={styles.branchLeft}>{TreeNode({ node: node.left })}</View>
          <View style={styles.branchRight}>{TreeNode({ node: node.right })}</View>
        </View>
      </View>
    );
  };

  const DiagnosticLog = ({ title, data }) => (
    <View style={styles.diagSection}>
      <View style={styles.diagHeader}>
        <Text style={styles.diagTitle}>{title}_TRAVERSAL</Text>
        <Text style={styles.statusText}>[ EXECUTING_RECURSION ]</Text>
      </View>
      <View style={styles.diagBody}>
        {data.logs.map((log, i) => (
          <View key={i} style={styles.diagRow}>
            <View style={{flex: 1}}>
                <Text style={styles.diagCode}>{`step_${i + 1}: ${log.action}`}</Text>
                <Text style={styles.diagDesc}>{log.desc}</Text>
            </View>
            <Text style={styles.diagResult}>{`SEQ: [ ${log.state.join(',')} ]`}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>TREE VISUALIZER</Text>
        <TouchableOpacity onPress={() => setShowGuide(true)}><Ionicons name="help-circle-outline" size={26} color="#104a28" /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* NEW VISUAL WORKSPACE */}
        <View style={styles.workspaceCard}>
            <Text style={styles.workspaceLabel}>TREE STRUCTURE VIEW</Text>
            <ScrollView horizontal contentContainerStyle={{paddingVertical: 20}}>
                {treeData.length > 0 ? <TreeNode node={buildTree(treeData)} /> : <Text style={styles.emptyText}>Add nodes to visualize the BST...</Text>}
            </ScrollView>
        </View>

        <View style={styles.actionRow}>
            <TouchableOpacity style={styles.utilBtn} onPress={loadExample}><Text style={styles.utilBtnText}>LOAD EXAMPLE</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.utilBtn, {backgroundColor: '#f5f5f5'}]} onPress={clearLab}><Text style={styles.utilBtnText}>RESET</Text></TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>1. ADD NODES</Text>
          <View style={styles.inputRow}>
            <TextInput style={styles.input} placeholder="Value" keyboardType="numeric" value={inputValue} onChangeText={setInputValue} />
            <TouchableOpacity style={styles.addBtn} onPress={addNode}><Ionicons name="add" size={20} color="#fff" /></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionHeader}>2. COMPUTE TRAVERSAL</Text>
        <View style={styles.btnGrid}>
          {['PRE', 'IN', 'POST'].map(t => (
            <TouchableOpacity key={t} style={styles.methodBtn} onPress={() => runTraversal(t)}>
                <Text style={styles.methodBtnText}>{t}-ORDER</Text>
            </TouchableOpacity>
          ))}
        </View>

        {traversalResult && (
          <View>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>OUTPUT SEQUENCE</Text>
              <Text style={styles.resultVal}>{traversalResult.path.join(' → ')}</Text>
            </View>

            <View style={styles.diagSection}>
              <View style={styles.diagHeader}>
                <Text style={styles.diagTitle}>{traversalResult.type}_PROCESS_LOG</Text>
                <Text style={styles.statusText}>[ RECURSION_ACTIVE ]</Text>
              </View>
              <View style={styles.diagBody}>
                {traversalResult.logs.map((log, i) => (
                  <View key={i} style={styles.diagRow}>
                    <View style={{flex: 1}}>
                        <Text style={styles.diagCode}>{`step_${i + 1}: ${log.action}`}</Text>
                        <Text style={styles.diagDesc}>{log.desc}</Text>
                    </View>
                    <Text style={styles.diagResult}>{`[ ${log.state.join(',')} ]`}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      <Modal visible={showGuide} animationType="fade" transparent={true}>
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Lab Operator Guide</Text>
            <Text style={styles.guideStep}>• <Text style={{fontWeight:'bold'}}>Pre-order:</Text> Processes the root first, then explores subtrees.</Text>
            <Text style={styles.guideStep}>• <Text style={{fontWeight:'bold'}}>In-order:</Text> Results in a sorted sequence for Binary Search Trees.</Text>
            <Text style={styles.guideStep}>• <Text style={{fontWeight:'bold'}}>Post-order:</Text> Processes children before the parent node.</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowGuide(false)}><Text style={styles.closeBtnText}>RESUME LAB</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#18181B' },
  content: { padding: 16 },
  
  // Tree Visualization Styles
  workspaceCard: { backgroundColor: '#ECEFF1', borderRadius: 16, padding: 15, marginBottom: 15, alignItems: 'center', minHeight: 250, borderWidth: 1, borderColor: '#CFD8DC' },
  workspaceLabel: { fontSize: 9, fontWeight: '900', color: '#78909C', letterSpacing: 2, marginBottom: 10 },
  treeContainer: { alignItems: 'center' },
  nodeCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#B0BEC5', elevation: 2, zIndex: 2 },
  nodeCircleActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  nodeText: { fontSize: 12, fontWeight: 'bold', color: '#455A64' },
  nodeTextActive: { color: '#fff' },
  childrenContainer: { flexDirection: 'row', marginTop: 20 },
  branchLeft: { paddingRight: 10, borderTopWidth: 1, borderColor: '#B0BEC5', paddingTop: 10, marginRight: 5 },
  branchRight: { paddingLeft: 10, borderTopWidth: 1, borderColor: '#B0BEC5', paddingTop: 10, marginLeft: 5 },
  
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  utilBtn: { flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#104a2833' },
  utilBtnText: { color: '#104a28', fontWeight: '700', fontSize: 11 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 1 },
  cardLabel: { fontSize: 10, fontWeight: '800', color: '#90A4AE', marginBottom: 12, letterSpacing: 1 },
  inputRow: { flexDirection: 'row', gap: 10 },
  input: { backgroundColor: '#F5F7F8', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#E0E4E6', flex: 1, fontSize: 14, fontFamily: 'monospace' },
  addBtn: { backgroundColor: '#104a28', width: 44, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  sectionHeader: { fontSize: 12, fontWeight: '800', color: '#78909C', marginBottom: 12, textTransform: 'uppercase' },
  btnGrid: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  methodBtn: { flex: 1, backgroundColor: '#104a28', padding: 12, borderRadius: 8, alignItems: 'center' },
  methodBtnText: { color: '#fff', fontWeight: '800', fontSize: 10 },
  resultCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#ECEFF1' },
  resultLabel: { color: '#B0BEC5', fontSize: 9, fontWeight: '800', marginBottom: 8 },
  resultVal: { color: '#104a28', fontWeight: '900', fontSize: 18, fontFamily: 'monospace' },
  
  diagSection: { backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#ECEFF1', overflow: 'hidden', marginBottom: 50 },
  diagHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#F8F9FA', borderBottomWidth: 1, borderBottomColor: '#ECEFF1' },
  diagTitle: { fontSize: 10, fontWeight: '800', color: '#546E7A', fontFamily: 'monospace' },
  statusText: { fontSize: 9, fontWeight: '900', color: '#2e7d32', fontFamily: 'monospace' },
  diagBody: { padding: 12 },
  diagRow: { borderBottomWidth: 1, borderBottomColor: '#F5F7F8', paddingVertical: 10, gap: 4 },
  diagCode: { fontFamily: 'monospace', fontSize: 12, color: '#104a28', fontWeight: 'bold' },
  diagDesc: { fontSize: 11, color: '#78909C', fontStyle: 'italic' },
  diagResult: { fontFamily: 'monospace', fontSize: 10, color: '#90A4AE', alignSelf: 'flex-end' },
  emptyText: { color: '#B0BEC5', fontStyle: 'italic', marginTop: 80 },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 25 },
  modalContent: { backgroundColor: '#fff', padding: 30, borderRadius: 25 },
  modalTitle: { fontSize: 20, fontWeight: '900', marginBottom: 20, color: '#104a28', textAlign: 'center' },
  guideStep: { fontSize: 14, color: '#444', marginBottom: 15, lineHeight: 22 },
  closeBtn: { backgroundColor: '#104a28', padding: 16, borderRadius: 15, alignItems: 'center', marginTop: 15 },
  closeBtnText: { color: '#fff', fontWeight: 'bold' }
});