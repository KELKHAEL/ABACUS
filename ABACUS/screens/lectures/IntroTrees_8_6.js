import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IntroductionToTrees_8_6() {
  
  const ComplexityRow = ({ label, average, worst }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellLabel}>{label}</Text>
      <Text style={styles.tableCell}>{average}</Text>
      <Text style={styles.tableCell}>{worst}</Text>
    </View>
  );

  const GraphImage = ({ source, height = 180 }) => (
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
          <Text style={styles.topicSubtitle}>Module 8.6</Text>
          <Text style={styles.topicTitle}>Tree and its Properties</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            Tree is a discrete structure that represents hierarchical relationships between individual elements or nodes. A tree in which a parent has no more than two children is called a binary tree.
          </Text>

          <Text style={styles.subLabel}>Definition</Text>
          <Text style={styles.paragraph}>
            A Tree is a connected acyclic undirected graph. There is a unique path between every pair of vertices in G. A tree with N number of vertices contains (N−1) number of edges. The vertex which is of 0 degree is called root of the tree. The vertex which is of 1 degree is called leaf node of the tree and the degree of an internal node is at least 2.
          </Text>
          
          <Text style={styles.subLabel}>Example − The following is an example of a tree −</Text>
          <GraphImage source={require('../../assets/moduleImages/tr1.jpg')} />
        </View>

        {/* CENTERS & BI-CENTERS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Centers and Bi-Centers of a Tree</Text>
          <Text style={styles.paragraph}>
            The center of a tree is a vertex with minimal eccentricity. The eccentricity of a vertex X in a tree G is the maximum distance between the vertex X and any other vertex of the tree. The maximum eccentricity is the tree diameter. If a tree has only one center, it is called Central Tree and if a tree has only more than one centers, it is called Bi-central Tree. Every tree is either central or bi-central.
          </Text>

          <View style={styles.algorithmBox}>
            <Text style={styles.algoHeader}>Algorithm to find centers and bi-centers of a tree</Text>
            <Text style={styles.algoStep}><Text style={styles.bold}>Step 1 − </Text>Remove all the vertices of degree 1 from the given tree and also remove their incident edges.</Text>
            <Text style={styles.algoStep}><Text style={styles.bold}>Step 2 − </Text>Repeat step 1 until either a single vertex or two vertices joined by an edge is left. If a single vertex is left then it is the center of the tree and if two vertices joined by an edge is left then it is the bi-center of the tree.</Text>
          </View>
          
          <View style={styles.divider} />

          {/* PROBLEM 1 */}
          <Text style={styles.boldLabel}>Problem 1</Text>
          <Text style={styles.paragraph}>Find out the center/bi-center of the following tree −</Text>
          <GraphImage source={require('../../assets/moduleImages/tr2.jpg')} />
          
          <Text style={styles.boldLabel}>Solution</Text>
          <Text style={styles.paragraph}>At first, we will remove all vertices of degree 1 and also remove their incident edges and get the following tree −</Text>
          <GraphImage source={require('../../assets/moduleImages/tr3.jpg')} height={100} />
          
          <Text style={styles.paragraph}>Again, we will remove all vertices of degree 1 and also remove their incident edges and get the following tree −</Text>
          <GraphImage source={require('../../assets/moduleImages/tr4.jpg')} height={100} />
          
          <Text style={styles.paragraph}>Finally we got a single vertex c and we stop the algorithm. As there is single vertex, this tree has one center c and the tree is a central tree.</Text>

          <View style={styles.divider} />

          {/* PROBLEM 2 */}
          <Text style={styles.boldLabel}>Problem 2</Text>
          <Text style={styles.paragraph}>Find out the center/bi-center of the following tree −</Text>
          <GraphImage source={require('../../assets/moduleImages/tr5.jpg')} />

          <Text style={styles.boldLabel}>Solution</Text>
          <Text style={styles.paragraph}>At first, we will remove all vertices of degree 1 and also remove their incident edges and get the following tree −</Text>
          <GraphImage source={require('../../assets/moduleImages/tr6.jpg')} height={100} />

          <Text style={styles.paragraph}>Again, we will remove all vertices of degree 1 and also remove their incident edges and get the following tree −</Text>
          <GraphImage source={require('../../assets/moduleImages/tr7.jpg')} height={100} />

          <Text style={styles.paragraph}>Finally, we got two vertices c and d left, hence we stop the algorithm. As two vertices joined by an edge is left, this tree has bi-center cd and the tree is bi-central.</Text>
        </View>

        {/* LABELED VS UNLABELED */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Labeled Trees</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Definition − </Text>A labeled tree is a tree the vertices of which are assigned unique numbers from 1 to n. We can count such trees for small values of n by hand so as to conjecture a general formula. The number of labeled trees of n number of vertices is nⁿ⁻². Two labeled trees are isomorphic if their graphs are isomorphic and the corresponding points of the two trees have the same labels.
          </Text>
          <Text style={styles.subLabel}>Example</Text>
          <GraphImage source={require('../../assets/moduleImages/tr8.jpg')} height={120} />
          <GraphImage source={require('../../assets/moduleImages/tr9.jpg')} height={120} />

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Unlabeled Trees</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Definition − </Text>An unlabeled tree is a tree the vertices of which are not assigned any numbers. The number of labeled trees of n number of vertices is (2n)! / ((n+1)!n!) (nᵗʰ Catalan number).
          </Text>
          <Text style={styles.subLabel}>Example</Text>
          <GraphImage source={require('../../assets/moduleImages/tr10.jpg')} height={280} />
        </View>

        {/* ROOTED TREES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rooted Tree</Text>
          <Text style={styles.paragraph}>
            A rooted tree G is a connected acyclic graph with a special node that is called the root of the tree and every edge directly or indirectly originates from the root. An ordered rooted tree is a rooted tree where the children of each internal vertex are ordered. If every internal vertex of a rooted tree has not more than m children, it is called an m-ary tree. If every internal vertex of a rooted tree has exactly m children, it is called a full m-ary tree. If m=2, the rooted tree is called a binary tree.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/tr11.jpg')} height={240} />
        </View>

        {/* BINARY SEARCH TREE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Binary Search Tree</Text>
          <Text style={styles.paragraph}>
            Binary Search tree is a binary tree which satisfies the following property −
          </Text>
          <View style={styles.logicBox}>
            <Text style={styles.logicText}>• X in left sub-tree of vertex V, Value(X) ≤ Value(V)</Text>
            <Text style={styles.logicText}>• Y in right sub-tree of vertex V, Value(Y) ≥ Value(V)</Text>
          </View>
          <Text style={styles.paragraph}>
            So, the value of all the vertices of the left sub-tree of an internal node V are less than or equal to V and the value of all the vertices of the right sub-tree of the internal node V are greater than or equal to V. The number of links from the root node to the deepest node is the height of the Binary Search Tree.
          </Text>
          
          <Text style={styles.subLabel}>Example</Text>
          <GraphImage source={require('../../assets/moduleImages/tr12.jpg')} height={220} />

          <View style={styles.codeBlock}>
            <Text style={styles.codeHeader}>Algorithm to search for a key in BST</Text>
            <Text style={styles.codeLine}>{"BST_Search(x, k)"}</Text>
            <Text style={styles.codeLine}>{"if ( x = NIL or k = Value[x] )"}</Text>
            <Text style={styles.codeLine}>{"   return x;"}</Text>
            <Text style={styles.codeLine}>{"if ( k < Value[x])"}</Text>
            <Text style={styles.codeLine}>{"   return BST_Search (left[x], k);"}</Text>
            <Text style={styles.codeLine}>{"else"}</Text>
            <Text style={styles.codeLine}>{"   return BST_Search (right[x], k)"}</Text>
          </View>

          <Text style={styles.subLabel}>Complexity of Binary search tree</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.headerCell}>Metric</Text>
              <Text style={styles.headerCell}>Average Case</Text>
              <Text style={styles.headerCell}>Worst Case</Text>
            </View>
            <ComplexityRow label="Space Complexity" average="O(n)" worst="O(n)" />
            <ComplexityRow label="Search Complexity" average="O(log n)" worst="O(n)" />
            <ComplexityRow label="Insertion Complexity" average="O(log n)" worst="O(n)" />
            <ComplexityRow label="Deletion Complexity" average="O(log n)" worst="O(n)" />
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
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  boldLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 10, marginBottom: 8 },
  subLabel: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginTop: 15, marginBottom: 10, letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },

  algorithmBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  algoHeader: { fontWeight: '800', color: '#0F172A', fontSize: 14, marginBottom: 10 },
  algoStep: { color: '#475569', fontSize: 14, marginBottom: 8, lineHeight: 22 },
  
  logicBox: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, marginVertical: 10, borderWidth: 1, borderColor: '#BBF7D0' },
  logicText: { color: '#166534', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  
  codeBlock: { backgroundColor: '#1E293B', borderRadius: 16, padding: 20, marginVertical: 15 },
  codeHeader: { color: '#38BDF8', fontSize: 13, fontWeight: 'bold', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  codeLine: { color: '#E2E8F0', fontFamily: 'monospace', fontSize: 13, marginBottom: 4 },
  
  tableContainer: { borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginTop: 10 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: '800', color: '#0F172A', fontSize: 13 },
  tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', backgroundColor: '#FFF' },
  tableCellLabel: { flex: 1, paddingLeft: 15, fontWeight: '700', color: '#334155', fontSize: 13 },
  tableCell: { flex: 1, textAlign: 'center', color: '#64748B', fontSize: 13, fontFamily: 'monospace' },
});