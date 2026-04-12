import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SpanningTrees_8_9() {
  
  const EdgeRow = ({ no, pair, weight, isAlt = false }) => (
    <View style={[styles.tableRow, isAlt && styles.rowAlt]}>
      <Text style={styles.tableCell}>{no}</Text>
      <Text style={styles.tableCell}>{pair}</Text>
      <Text style={[styles.tableCell, styles.bold]}>{weight}</Text>
    </View>
  );

  const GraphImage = ({ source, height = 200 }) => (
    <View style={styles.imageContainer}>
      <Image source={source} style={[styles.graphImage, { height }]} resizeMode="contain" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.9</Text>
          <Text style={styles.topicTitle}>Spanning Trees</Text>
          <View style={styles.underline} />
        </View>

        {/* DEFINITIONS & EXAMPLE */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"A spanning tree of a connected undirected graph G is a tree that minimally includes all of the vertices of G. A graph may have many spanning trees."}
          </Text>
          
          <Text style={styles.subLabel}>Example</Text>
          <GraphImage source={require('../../assets/moduleImages/spa1.jpg')} height={220} />
        </View>

        {/* MINIMUM SPANNING TREE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Minimum Spanning Tree</Text>
          <Text style={styles.paragraph}>
            {"A spanning tree with assigned weight less than or equal to the weight of every possible spanning tree of a weighted, connected and undirected graph G, it is called minimum spanning tree (MST). The weight of a spanning tree is the sum of all the weights assigned to each edge of the spanning tree."}
          </Text>
          
          <Text style={styles.subLabel}>Example</Text>
          <GraphImage source={require('../../assets/moduleImages/spa2.jpg')} height={220} />
        </View>

        {/* KRUSKAL'S ALGORITHM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="sort-ascending" size={24} color="#7C3AED" />
            <Text style={[styles.sectionTitle, {color: '#7C3AED', marginLeft: 10, marginBottom: 0}]}>Kruskal's Algorithm</Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 15 }]}>
            {"Kruskal's algorithm is a greedy algorithm that finds a minimum spanning tree for a connected weighted graph. It finds a tree of that graph which includes every vertex and the total weight of all the edges in the tree is less than or equal to every possible spanning tree."}
          </Text>

          <View style={styles.algorithmBox}>
            <Text style={styles.algoHeader}>Algorithm</Text>
            <Text style={styles.algoStep}><Text style={styles.bold}>Step 1 − </Text>Arrange all the edges of the given graph G(V, E) in ascending order as per their edge weight.</Text>
            <Text style={styles.algoStep}><Text style={styles.bold}>Step 2 − </Text>Choose the smallest weighted edge from the graph and check if it forms a cycle with the spanning tree formed so far.</Text>
            <Text style={styles.algoStep}><Text style={styles.bold}>Step 3 − </Text>If there is no cycle, include this edge to the spanning tree else discard it.</Text>
            <Text style={styles.algoStep}><Text style={styles.bold}>Step 4 − </Text>Repeat Step 2 and Step 3 until (V − 1) number of edges are left in the spanning tree.</Text>
          </View>

          <Text style={styles.subLabel}>Problem</Text>
          <Text style={styles.paragraph}>{"Suppose we want to find minimum spanning tree for the following graph G using Kruskals algorithm."}</Text>
          <GraphImage source={require('../../assets/moduleImages/spa3.jpg')} height={280} />

          <Text style={styles.subLabel}>Solution</Text>
          <Text style={styles.paragraph}>{"From the above graph we construct the following table −"}</Text>
          
          {/* Table 1: Unsorted */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.headerCell}>Edge No.</Text>
              <Text style={styles.headerCell}>Vertex Pair</Text>
              <Text style={styles.headerCell}>Edge Weight</Text>
            </View>
            <EdgeRow no="E1" pair="(a, b)" weight="20" isAlt={false} />
            <EdgeRow no="E2" pair="(a, c)" weight="9" isAlt={true} />
            <EdgeRow no="E3" pair="(a, d)" weight="13" isAlt={false} />
            <EdgeRow no="E4" pair="(b, c)" weight="1" isAlt={true} />
            <EdgeRow no="E5" pair="(b, e)" weight="4" isAlt={false} />
            <EdgeRow no="E6" pair="(b, f)" weight="5" isAlt={true} />
            <EdgeRow no="E7" pair="(c, d)" weight="2" isAlt={false} />
            <EdgeRow no="E8" pair="(d, e)" weight="3" isAlt={true} />
            <EdgeRow no="E9" pair="(d, f)" weight="14" isAlt={false} />
          </View>

          <Text style={[styles.paragraph, { marginTop: 15 }]}>{"Now we will rearrange the table in ascending order with respect to Edge weight −"}</Text>

          {/* Table 2: Sorted */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.headerCell}>Edge No.</Text>
              <Text style={styles.headerCell}>Vertex Pair</Text>
              <Text style={styles.headerCell}>Edge Weight</Text>
            </View>
            <EdgeRow no="E4" pair="(b, c)" weight="1" isAlt={false} />
            <EdgeRow no="E7" pair="(c, d)" weight="2" isAlt={true} />
            <EdgeRow no="E8" pair="(d, e)" weight="3" isAlt={false} />
            <EdgeRow no="E5" pair="(b, e)" weight="4" isAlt={true} />
            <EdgeRow no="E6" pair="(b, f)" weight="5" isAlt={false} />
            <EdgeRow no="E2" pair="(a, c)" weight="9" isAlt={true} />
            <EdgeRow no="E3" pair="(a, d)" weight="13" isAlt={false} />
            <EdgeRow no="E9" pair="(d, f)" weight="14" isAlt={true} />
            <EdgeRow no="E1" pair="(a, b)" weight="20" isAlt={false} />
          </View>

          <GraphImage source={require('../../assets/moduleImages/spa4.jpg')} height={450} />

          <Text style={styles.paragraph}>
            {"Since we got all the 5 edges in the last figure, we stop the algorithm and this is the minimal spanning tree and its total weight is (1 + 2 + 3 + 5 + 9) = 20."}
          </Text>
        </View>

        {/* PRIM'S ALGORITHM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="source-branch" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginLeft: 10, marginBottom: 0}]}>Prim's Algorithm</Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 15 }]}>
            {"Prim's algorithm, discovered in 1930 by mathematicians, Vojtech Jarnik and Robert C. Prim, is a greedy algorithm that finds a minimum spanning tree for a connected weighted graph. It finds a tree of that graph which includes every vertex and the total weight of all the edges in the tree is less than or equal to every possible spanning tree. Prims algorithm is faster on dense graphs."}
          </Text>

          <View style={[styles.algorithmBox, {backgroundColor: '#F0F9FF', borderColor: '#BAE6FD'}]}>
            <Text style={[styles.algoHeader, {color: '#0369A1'}]}>Algorithm</Text>
            <Text style={styles.algoStep}>{"\u2022 Initialize the minimal spanning tree with a single vertex, randomly chosen from the graph."}</Text>
            <Text style={styles.algoStep}>{"\u2022 Repeat steps 3 and 4 until all the vertices are included in the tree."}</Text>
            <Text style={styles.algoStep}>{"\u2022 Select an edge that connects the tree with a vertex not yet in the tree, so that the weight of the edge is minimal and inclusion of the edge does not form a cycle."}</Text>
            <Text style={styles.algoStep}>{"\u2022 Add the selected edge and the vertex that it connects to the tree."}</Text>
          </View>

          <Text style={styles.subLabel}>Problem</Text>
          <Text style={styles.paragraph}>{"Suppose we want to find minimum spanning tree for the following graph G using Prims algorithm."}</Text>
          <GraphImage source={require('../../assets/moduleImages/spa5.jpg')} height={280} />

          <Text style={styles.subLabel}>Solution</Text>
          <Text style={styles.paragraph}>{"Here we start with the vertex a and proceed."}</Text>
          
          <GraphImage source={require('../../assets/moduleImages/spa6.jpg')} height={450} />
          <GraphImage source={require('../../assets/moduleImages/spa7.jpg')} height={350} />

          <View style={styles.solutionBox}>
            <Text style={styles.resultText}>{"This is the minimal spanning tree and its total weight is "}<Text style={styles.bold}>{"(1 + 2 + 3 + 5 + 9) = 20"}</Text>{"."}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 20 },
  titleSection: { marginBottom: 25 },
  topicSubtitle: { fontSize: 13, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1.5 },
  topicTitle: { fontSize: 32, fontWeight: '900', color: '#0F172A', marginTop: 4 },
  underline: { height: 4, width: 40, backgroundColor: '#7C3AED', marginTop: 8, borderRadius: 2 },
  
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  subLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', marginTop: 15, marginBottom: 10, letterSpacing: 0.5 },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },

  algorithmBox: { backgroundColor: '#F5F3FF', padding: 18, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#DDD6FE', marginVertical: 15 },
  algoHeader: { fontWeight: '800', color: '#5B21B6', fontSize: 15, marginBottom: 12 },
  algoStep: { color: '#475569', fontSize: 14, marginBottom: 8, lineHeight: 22 },
  
  tableContainer: { borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginVertical: 10 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 12 },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: '800', color: '#0F172A', fontSize: 13 },
  tableRow: { flexDirection: 'row', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9', backgroundColor: '#FFF' },
  rowAlt: { backgroundColor: '#F8FAFC' },
  tableCell: { flex: 1, textAlign: 'center', color: '#64748B', fontSize: 14 },
  
  solutionBox: { backgroundColor: '#F0FDF4', borderRadius: 16, padding: 20, alignItems: 'center', marginVertical: 15, borderWidth: 1, borderColor: '#BBF7D0' },
  resultText: { color: '#166534', fontSize: 15, textAlign: 'center', lineHeight: 24 },
});