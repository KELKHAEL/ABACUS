import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SpanningTrees_8_8() {
  
  const EdgeRow = ({ no, pair, weight, highlight = false }) => (
    <View style={[styles.tableRow, highlight && styles.rowAlt]}>
      <Text style={styles.tableCell}>{no}</Text>
      <Text style={styles.tableCell}>{pair}</Text>
      <Text style={[styles.tableCell, styles.bold]}>{weight}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.8</Text>
          <Text style={styles.topicTitle}>Spanning Trees</Text>
          <View style={styles.underline} />
        </View>

        {/* DEFINITIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"A spanning tree of a connected undirected graph G is a tree that minimally includes all of the vertices of G. A graph may have many spanning trees."}
          </Text>
          
          <View style={styles.infoHighlight}>
            <Text style={styles.bold}>{"Minimum Spanning Tree (MST):"}</Text>
            <Text style={styles.highlightText}>
              {"A spanning tree with assigned weight less than or equal to the weight of every possible spanning tree of a weighted, connected and undirected graph G."}
            </Text>
            <Text style={[styles.highlightText, {marginTop: 5}]}>
              {"The weight of a spanning tree is the sum of all the weights assigned to each edge of the spanning tree."}
            </Text>
          </View>
        </View>

        {/* KRUSKAL'S ALGORITHM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="sort-ascending" size={24} color="#7C3AED" />
            <Text style={[styles.sectionTitle, {color: '#7C3AED', marginLeft: 10}]}>Kruskal's Algorithm</Text>
          </View>
          <Text style={styles.paragraph}>
            {"A greedy algorithm that finds an MST for a connected weighted graph. It finds a tree where the total weight is minimized."}
          </Text>

          <View style={styles.algorithmBox}>
            <Text style={styles.algoHeader}>ALGORITHM STEPS</Text>
            <Text style={styles.algoStep}>{"1. Arrange all edges in ascending order as per weight."}</Text>
            <Text style={styles.algoStep}>{"2. Choose the smallest weighted edge from the graph."}</Text>
            <Text style={styles.algoStep}>{"3. If no cycle is formed, include it; otherwise discard it."}</Text>
            <Text style={styles.algoStep}>{"4. Repeat until (V \u2212 1) edges are in the tree."}</Text>
          </View>

          <Text style={styles.subLabel}>Edge Weight Sorting</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.headerCell}>No.</Text>
              <Text style={styles.headerCell}>Vertex Pair</Text>
              <Text style={styles.headerCell}>Weight</Text>
            </View>
            <EdgeRow no="E4" pair="(b, c)" weight="1" />
            <EdgeRow no="E7" pair="(c, d)" weight="2" />
            <EdgeRow no="E8" pair="(d, e)" weight="3" />
            <EdgeRow no="E5" pair="(b, e)" weight="4" highlight={true} />
            <EdgeRow no="E6" pair="(b, f)" weight="5" />
            <EdgeRow no="E2" pair="(a, c)" weight="9" />
          </View>
          <Text style={styles.caption}>{"*E5 is discarded as it forms a cycle."}</Text>
        </View>

        {/* PRIM'S ALGORITHM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="source-branch" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginLeft: 10}]}>Prim's Algorithm</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Discovered in 1930, this is a greedy algorithm faster on dense graphs. It builds the tree vertex-by-vertex."}
          </Text>

          <View style={[styles.algorithmBox, {backgroundColor: '#F0F9FF', borderColor: '#BAE6FD'}]}>
            <Text style={[styles.algoHeader, {color: '#0369A1'}]}>ALGORITHM STEPS</Text>
            <Text style={styles.algoStep}>{"1. Start with a single random vertex."}</Text>
            <Text style={styles.algoStep}>{"2. Select the minimum weight edge connecting the tree to a vertex not yet in the tree."}</Text>
            <Text style={styles.algoStep}>{"3. Ensure no cycle is formed."}</Text>
            <Text style={styles.algoStep}>{"4. Repeat until all vertices are included."}</Text>
          </View>
        </View>

        {/* PROBLEM SOLUTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Problem Solution</Text>
          <Text style={styles.paragraph}>{"Using either algorithm for the provided graph:"}</Text>
          
          <View style={styles.solutionBox}>
            <Text style={styles.bold}>{"Final MST Total Weight:"}</Text>
            <Text style={styles.monoMath}>{"1 + 2 + 3 + 5 + 9 = 20"}</Text>
            <Text style={styles.resultText}>{"The algorithms stop once V \u2212 1 edges are reached."}</Text>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"Spanning trees provide minimally connected subgraphs. Greedy algorithms like Kruskal's (edge-focused) and Prim's (vertex-focused) ensure we reach an optimal total weight without forming cycles."}
          </Text>
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
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  infoHighlight: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#7C3AED', marginVertical: 10 },
  highlightText: { color: '#6D28D9', fontSize: 14, lineHeight: 20 },
  algorithmBox: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#DDD6FE', marginTop: 10 },
  algoHeader: { fontWeight: '800', color: '#5B21B6', fontSize: 12, marginBottom: 10, letterSpacing: 1 },
  algoStep: { color: '#475569', fontSize: 13, marginBottom: 6, lineHeight: 18 },
  subLabel: { fontSize: 12, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 15, marginBottom: 12, letterSpacing: 1 },
  tableContainer: { borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 12 },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: '800', color: '#475569', fontSize: 12 },
  tableRow: { flexDirection: 'row', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  rowAlt: { backgroundColor: '#FEF2F2' },
  tableCell: { flex: 1, textAlign: 'center', color: '#64748B', fontSize: 13 },
  caption: { fontSize: 11, fontStyle: 'italic', color: '#EF4444', marginTop: 8 },
  solutionBox: { backgroundColor: '#0F172A', borderRadius: 20, padding: 25, alignItems: 'center', marginVertical: 15 },
  monoMath: { color: '#38BDF8', fontSize: 22, fontWeight: 'bold', fontFamily: 'monospace', marginVertical: 10 },
  resultText: { color: '#94A3B8', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});