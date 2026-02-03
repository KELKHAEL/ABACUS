import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IntroductionToTrees_8_6() {
  
  const ComplexityRow = ({ label, average, worst }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellLabel}>{label}</Text>
      <Text style={styles.tableCell}>{average}</Text>
      <Text style={styles.tableCell}>{worst}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.6</Text>
          <Text style={styles.topicTitle}>Introduction to Trees</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Tree is a discrete structure that represents hierarchical relationships between individual elements or nodes. A tree in which a parent has no more than two children is called a binary tree."}
          </Text>
          
          <View style={styles.infoHighlight}>
            <Text style={styles.bold}>{"Tree Properties:"}</Text>
            <Text style={styles.highlightText}>{"\u2022 Definition: A Tree is a connected acyclic undirected graph."}</Text>
            <Text style={styles.highlightText}>{"\u2022 Unique Path: Exists between every pair of vertices in G."}</Text>
            <Text style={styles.highlightText}>{"\u2022 Edges: A tree with N vertices contains (N\u22121) edges."}</Text>
            <Text style={styles.highlightText}>{"\u2022 Degree Types: Root (0 degree), Leaf (1 degree), Internal (\u2265 2 degree)."}</Text>
          </View>
        </View>

        {/* CENTERS & BI-CENTERS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Centers and Bi-Centers</Text>
          <Text style={styles.paragraph}>
            {"The center of a tree is a vertex with minimal eccentricity. Eccentricity is the maximum distance between a vertex X and any other vertex. Every tree is either central or bi-central."}
          </Text>

          <View style={styles.algorithmBox}>
            <Text style={styles.algoHeader}>Finding Centers</Text>
            <Text style={styles.algoStep}>{"Step 1: Remove all vertices of degree 1 and their incident edges."}</Text>
            <Text style={styles.algoStep}>{"Step 2: Repeat until a single vertex (Center) or two connected vertices (Bi-center) remain."}</Text>
          </View>
        </View>

        {/* LABELED VS UNLABELED */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Enumeration of Trees</Text>
          
          <View style={styles.detailBox}>
            <Text style={styles.bold}>{"Labeled Trees"}</Text>
            <Text style={styles.paragraph}>{"Vertices are assigned unique numbers from 1 to n."}</Text>
            <Text style={styles.mathText}>{"Formula: n^(n\u22122)"}</Text>
          </View>

          <View style={[styles.detailBox, {marginTop: 15}]}>
            <Text style={styles.bold}>{"Unlabeled Trees"}</Text>
            <Text style={styles.paragraph}>{"Vertices are not assigned numbers."}</Text>
            <Text style={styles.mathText}>{"Formula: (2n)! / ((n+1)!n!) (n\u1d57\u02b0 Catalan Number)"}</Text>
          </View>
        </View>

        {/* ROOTED TREES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rooted Trees</Text>
          <Text style={styles.paragraph}>
            {"A connected acyclic graph where every edge originates from a special node called the root."}
          </Text>
          <View style={styles.typeGrid}>
            <View style={styles.typeBadge}><Text style={styles.badgeText}>{"m-ary: \u2264 m children"}</Text></View>
            <View style={styles.typeBadge}><Text style={styles.badgeText}>{"Full m-ary: = m children"}</Text></View>
            <View style={styles.typeBadge}><Text style={styles.badgeText}>{"Binary: m = 2"}</Text></View>
          </View>
        </View>

        {/* BINARY SEARCH TREE */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="magnify-scan" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginBottom: 0, marginLeft: 10}]}>Binary Search Tree (BST)</Text>
          </View>
          <View style={styles.logicBox}>
            <Text style={styles.logicText}>{"\u2022 Left Sub-tree: Value(X) \u2264 Value(V)"}</Text>
            <Text style={styles.logicText}>{"\u2022 Right Sub-tree: Value(Y) \u2265 Value(V)"}</Text>
          </View>

          <View style={styles.codeBlock}>
            <Text style={styles.codeHeader}>SEARCH ALGORITHM</Text>
            <Text style={styles.codeLine}>{"BST_Search(x, k)"}</Text>
            <Text style={styles.codeLine}>{"if (x = NIL or k = Value[x]) return x;"}</Text>
            <Text style={styles.codeLine}>{"if (k < Value[x]) return BST_Search(left[x], k);"}</Text>
            <Text style={styles.codeLine}>{"else return BST_Search(right[x], k);"}</Text>
          </View>

          <Text style={styles.subLabel}>Complexity Analysis</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.headerCell}>Metric</Text>
              <Text style={styles.headerCell}>Average</Text>
              <Text style={styles.headerCell}>Worst</Text>
            </View>
            <ComplexityRow label="Space" average="O(n)" worst="O(n)" />
            <ComplexityRow label="Search" average="O(log n)" worst="O(n)" />
            <ComplexityRow label="Insertion" average="O(log n)" worst="O(n)" />
            <ComplexityRow label="Deletion" average="O(log n)" worst="O(n)" />
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
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  infoHighlight: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#0EA5E9', marginTop: 10 },
  highlightText: { color: '#0369A1', fontSize: 14, marginBottom: 4 },
  algorithmBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  algoHeader: { fontWeight: '800', color: '#1E293B', fontSize: 14, marginBottom: 10 },
  algoStep: { color: '#64748B', fontSize: 13, marginBottom: 6 },
  detailBox: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#DDD6FE' },
  mathText: { fontFamily: 'monospace', fontWeight: 'bold', color: '#7C3AED', marginTop: 8 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  typeBadge: { backgroundColor: '#F1F5F9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 },
  badgeText: { fontSize: 12, color: '#475569', fontWeight: 'bold' },
  logicBox: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, marginVertical: 10 },
  logicText: { color: '#166534', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  codeBlock: { backgroundColor: '#1E293B', borderRadius: 20, padding: 20, marginVertical: 15 },
  codeHeader: { color: '#38BDF8', fontSize: 12, fontWeight: 'bold', marginBottom: 10 },
  codeLine: { color: '#E2E8F0', fontFamily: 'monospace', fontSize: 13, marginBottom: 4 },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 10, marginBottom: 12, letterSpacing: 1 },
  tableContainer: { borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 12 },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: '800', color: '#475569', fontSize: 12 },
  tableRow: { flexDirection: 'row', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  tableCellLabel: { flex: 1, paddingLeft: 15, fontWeight: '700', color: '#1E293B', fontSize: 13 },
  tableCell: { flex: 1, textAlign: 'center', color: '#64748B', fontSize: 13 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});