import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DiscreteMathModule_8_1() {
  
  // Custom component for Theorem/Lemma highlights
  const InfoHighlight = ({ title, children, type = 'lemma' }) => (
    <View style={[styles.infoHighlight, type === 'theorem' ? styles.theoremBorder : styles.lemmaBorder]}>
      <View style={styles.highlightHeader}>
        <MaterialCommunityIcons 
          name={type === 'theorem' ? "seal-variant" : "lightbulb-on-outline"} 
          size={20} 
          color={type === 'theorem' ? "#166534" : "#0369A1"} 
        />
        <Text style={[styles.highlightTitle, { color: type === 'theorem' ? "#166534" : "#0369A1" }]}>{title}</Text>
      </View>
      <Text style={styles.highlightText}>{children}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"The previous part brought forth different tools for reasoning, proofing and problem solving. In this part, we will study the discrete structures that form the basis of formulating many a real-life problem."}
          </Text>
          <Text style={styles.paragraph}>
            {"The two discrete structures that we will cover are graphs and trees. A graph is a set of points, called nodes or vertices, interconnected by lines called edges. Graph theory is essential in disciplines like mathematics, engineering, and computer science."}
          </Text>
        </View>

        {/* DEFINITIONS & DEGREES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Foundations</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Definition: </Text> 
            {"A graph G = (V, E) consists of a non-empty set of vertices V and a set of edges E."}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Example: </Text> 
            {"Let us consider, a Graph is G = (V, E) where V = {a, b, c, d} and E = {{a, b}, {a, c}, {b, c}, {c, d}}."}
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.subLabel}>Vertex Degree</Text>
          <Text style={styles.paragraph}>
            {"The degree of a vertex V, denoted by deg(V), is the number of edges incident with the vertex V."}
          </Text>

          {/* REFINED TABLE */}
          <View style={styles.tableContainer}>
            <View style={styles.tableRowHeader}>
              <Text style={styles.tableHeaderText}>Vertex</Text>
              <Text style={styles.tableHeaderText}>Degree</Text>
              <Text style={styles.tableHeaderText}>Parity</Text>
            </View>
            {[["a", "2", "even"], ["b", "2", "even"], ["c", "3", "odd"], ["d", "1", "odd"]].map((row, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.rowAlt]}>
                <Text style={styles.tableCell}>{row[0]}</Text>
                <Text style={styles.tableCell}>{row[1]}</Text>
                <Text style={styles.tableCell}>{row[2]}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Degree of a Graph: </Text> 
            {"The largest vertex degree of that graph. For the above graph, the degree is 3."}
          </Text>

          <InfoHighlight title="Handshaking Lemma">
            {"The sum of all vertex degrees in a graph is equal to exactly twice the number of edges."}
          </InfoHighlight>
        </View>

        {/* TAXONOMY OF GRAPHS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Graph Taxonomy</Text>
          
          <View style={styles.typeGrid}>
            <View style={styles.typeItem}>
              <Text style={styles.bold}>{"Null Graph (N\u2099)"}</Text>
              <Text style={styles.typeText}>{"Contains no edges."}</Text>
            </View>
            <View style={styles.typeItem}>
              <Text style={styles.bold}>{"Simple Graph"}</Text>
              <Text style={styles.typeText}>{"Undirected, no loops or multiple edges."}</Text>
            </View>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.bold}>{"Connected vs Disconnected"}</Text>
            <Text style={styles.paragraph}>
              {"A graph is connected if any two vertices are joined by a path; otherwise, it is disconnected."}
            </Text>
            <Text style={styles.bold}>{"Bipartite Graph"}</Text>
            <Text style={styles.paragraph}>
              {"Vertices split into disjoint sets V\u2081 and V\u2082; edges only connect V\u2081 to V\u2082."}
            </Text>
          </View>
        </View>

        {/* COMPUTATIONAL REPRESENTATION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Representation</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeHeader}>Adjacency Matrix</Text>
            <Text style={styles.codeText}>{"A 2D array A[V][V]. 1 if an edge exists between vertices, 0 otherwise."}</Text>
          </View>
          <View style={[styles.codeBlock, { marginTop: 10 }]}>
            <Text style={styles.codeHeader}>Adjacency List</Text>
            <Text style={styles.codeText}>{"An array of linked lists where A[Vx] represents vertices adjacent to Vx."}</Text>
          </View>
        </View>

        {/* ADVANCED TOPICS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Structural Logic</Text>
          <Text style={styles.bold}>{"Isomorphism (G \u2245 H)"}</Text>
          <Text style={styles.paragraph}>
            {"Graphs with the same number of vertices connected in the same way."}
          </Text>
          
          <Text style={styles.bold}>{"Homomorphism"}</Text>
          <Text style={styles.paragraph}>
            {"A mapping h: G \u2192 H that preserves adjacency between vertices."}
          </Text>

          <InfoHighlight title="Dirac's Theorem" type="theorem">
            {"If G is simple with n \u2265 3 and deg(v) \u2265 n/2 for each vertex, then G is Hamiltonian."}
          </InfoHighlight>

          <InfoHighlight title="Ore's Theorem" type="theorem">
            {"If deg(x) + deg(y) \u2265 n for all non-adjacent pairs x, y, then G is Hamiltonian."}
          </InfoHighlight>
        </View>

        {/* EULERIAN & HAMILTONIAN */}
        <View style={[styles.sectionCard, styles.traversalCard]}>
          <Text style={styles.traversalTitle}>Traversal Paths</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Euler Path: </Text> 
            {"Uses every edge exactly once."}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Hamiltonian Cycle: </Text> 
            {"A cycle which includes every vertex exactly once."}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 25, backgroundColor: '#0F172A', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { color: '#F1F5F9', fontSize: 24, fontWeight: '900', letterSpacing: 1, textAlign: 'center' },
  headerBadge: { backgroundColor: '#334155', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, marginTop: 10, alignSelf: 'center' },
  headerBadgeText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold' },
  
  scrollContent: { padding: 16 },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16, elevation: 3 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '700', color: '#0F172A' },
  subLabel: { fontSize: 14, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 8 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 15 },

  tableContainer: { borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginVertical: 15 },
  tableRowHeader: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 12 },
  tableHeaderText: { flex: 1, fontWeight: 'bold', color: '#475569', textAlign: 'center', fontSize: 13 },
  tableRow: { flexDirection: 'row', paddingVertical: 12, backgroundColor: '#FFF' },
  rowAlt: { backgroundColor: '#F9FAFB' },
  tableCell: { flex: 1, textAlign: 'center', color: '#64748B', fontSize: 14 },

  infoHighlight: { padding: 16, borderRadius: 12, marginTop: 15, borderLeftWidth: 4 },
  lemmaBorder: { backgroundColor: '#F0F9FF', borderLeftColor: '#0EA5E9' },
  theoremBorder: { backgroundColor: '#F0FDF4', borderLeftColor: '#22C55E' },
  highlightHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  highlightTitle: { fontWeight: '800', fontSize: 14, marginLeft: 8, textTransform: 'uppercase' },
  highlightText: { color: '#334155', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },

  typeGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  typeItem: { width: '48%', backgroundColor: '#F1F5F9', padding: 12, borderRadius: 10 },
  typeText: { fontSize: 12, color: '#475569', marginTop: 4 },
  detailBox: { marginTop: 15, padding: 12, backgroundColor: '#F8FAFC', borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1' },

  codeBlock: { backgroundColor: '#1E293B', borderRadius: 10, padding: 15 },
  codeHeader: { color: '#38BDF8', fontWeight: 'bold', fontSize: 13, marginBottom: 5 },
  codeText: { color: '#94A3B8', fontSize: 13, lineHeight: 20 },

  traversalCard: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' },
  traversalTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 10 },

  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});