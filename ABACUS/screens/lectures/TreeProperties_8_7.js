import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TreeProperties_8_7() {
  
  const PropHighlight = ({ title, content, icon }) => (
    <View style={styles.propCard}>
      <View style={styles.cardHeaderRow}>
        <MaterialCommunityIcons name={icon} size={22} color="#0F172A" />
        <Text style={styles.propTitle}>{title}</Text>
      </View>
      <Text style={styles.propContent}>{content}</Text>
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
          <Text style={styles.topicSubtitle}>Module 8.7</Text>
          <Text style={styles.topicTitle}>Properties of Trees</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            Trees are special types of graphs. Unlike other types of graphs, trees have some unique properties. A tree is a connected graph with no cycles. It is a simple yet powerful structure that finds its applications across many fields such as data organization, algorithms, network design, and biology.
          </Text>
          <Text style={styles.paragraph}>
            In this chapter, we will cover some key properties of trees and understand their definitions and propositions with the help of examples.
          </Text>
        </View>

        {/* TREES IN GRAPH THEORY */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Trees in Graph Theory</Text>
          <Text style={styles.paragraph}>
            Trees are a special form of graph in which all vertices are connected, but there are no cycles. It means, any path from one vertex to another will be unique and will not loop back to any previous point. For n number of vertices, it must have n – 1 number of edges to form a connected graph as a tree.
          </Text>
          <Text style={styles.paragraph}>
            Formally, a tree is defined as a connected acyclic graph. If the tree is not connected, it is referred to as a forest. Forest is nothing but a group of unconnected acyclic graphs.
          </Text>
          <Text style={styles.paragraph}>
            Trees provide a clear path between vertices, and make them helpful in cases where a hierarchical structure is required, such as decision-making processes or family trees.
          </Text>

          <GraphImage source={require('../../assets/moduleImages/tre1.jpg')} height={220} />
        </View>

        {/* BASIC PROPERTIES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Basic Properties of Trees</Text>
          <Text style={styles.paragraph}>
            Let us see some of the basic properties of trees that make them special and useful in various applications. Here, we will highlight the properties related to connectivity, uniqueness of paths, and the relationship between vertices and edges.
          </Text>
          
          <Text style={styles.subLabel}>Connectivity and Acyclic Nature</Text>
          <Text style={styles.paragraph}>
            As we know, by definition, a tree is connected, it means there is a path between any pair of vertices. At the same time, it is acyclic, so it contains no loops or cycles. This combination of properties ensures that if there is a path between two vertices, that path will be unique.
          </Text>

          <View style={styles.exampleBox}>
            <Text style={styles.boldLabel}>Example</Text>
            <Text style={styles.paragraph}>
              Imagine we have a family tree where each person has a unique connection to their ancestors and descendants. If we create paths to represent family relations, no loops will form, and only one direct connection from a child to a parent without any chance of repeating the connection.
            </Text>
          </View>

          <Text style={styles.paragraph}>
            Since a tree with n vertices will be connected, then there it can be proved that if we have n-2 vertices all nodes will not be connected. And, if we have n edges, there will be an edge which is parallel or forming a cycle. So, a tree must have n - 1 edges.
          </Text>
          
          <GraphImage source={require('../../assets/moduleImages/tre2.jpg')} height={240} />
          <Text style={styles.caption}>Here, we have 13 nodes and 12 edges.</Text>
        </View>

        {/* KEY PROPOSITIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Key Propositions about Trees</Text>
          <Text style={styles.paragraph}>
            Propositions in graph theory gives the mathematical explanations for why certain properties hold. Let us see some crucial propositions that help define trees and illustrate why they behave differently from other graphs.
          </Text>
          
          <Text style={styles.subLabel}>Unique Path Proposition</Text>
          <Text style={styles.paragraph}>
            The unique path property is special in distinguishing trees from other graphs. Let us see the technique to prove this −
          </Text>
          
          <View style={styles.proofBox}>
            <Text style={styles.proofTitle}>Proof Outline</Text>
            <Text style={styles.paragraph}>
              To prove that a tree has a unique path between any two vertices, we assume that there is more than one path between two points. And this assumption makes it to a contradiction because it would imply the presence of a cycle. This is against the definition of a tree. So, we confirm the uniqueness of the path in a tree.
            </Text>
          </View>

          <Text style={styles.subLabel}>Leaves in Trees</Text>
          <Text style={styles.paragraph}>
            Leaves in a tree are vertices that have only one edge connecting them to another vertex. This means their degree is one. Trees with multiple vertices always have at least two leaves.
          </Text>

          <View style={[styles.proofBox, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
            <Text style={[styles.proofTitle, { color: '#166534' }]}>Proposition</Text>
            <Text style={styles.paragraph}>
              Any tree with at least two vertices has at least two vertices of degree one (leaves). This characteristic is special and used in various algorithms to simplify tree structures. By reducing a tree to smaller sub-trees that maintain the tree's properties.
            </Text>
          </View>

          <GraphImage source={require('../../assets/moduleImages/tre3.jpg')} height={220} />
          <Text style={styles.caption}>Here, the boxes are leaves and round nodes are non-leaves. All boxes are of degree 1.</Text>

          <View style={styles.exampleBox}>
            <Text style={styles.boldLabel}>Example</Text>
            <Text style={styles.paragraph}>
              Consider a tree representing a simple binary hierarchy in an organization. If the CEO is at the top, the entry-level employees are at the leaves, each reporting to only one manager or department head. So this ensures that each leaf, or endpoint, has a degree of one.
            </Text>
          </View>
        </View>

        {/* RELATIONSHIP BETWEEN VERTICES AND EDGES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Relationship between Vertices and Edges</Text>
          <Text style={styles.paragraph}>
            We have already talked about for v number of vertices we have v – 1 number of edges. Let prove this with induction −
          </Text>

          <View style={styles.inductionBox}>
            <Text style={[styles.boldLabel, { color: '#0369A1' }]}>Proof by Induction</Text>
            <Text style={[styles.paragraph, { color: '#0369A1' }]}>
              Consider from a tree with one vertex (no edges) and building up by adding vertices and edges while maintaining the structure of a tree.
            </Text>
            <Text style={styles.stepText}><Text style={styles.bold}>Base Case − </Text>A tree with a single vertex has zero edges.</Text>
            <Text style={styles.stepText}><Text style={styles.bold}>Inductive Step − </Text>For a tree with k vertices, adding another vertex and connecting it with an edge preserves the tree structure, which will make k + 1 vertices and k edges.</Text>
          </View>

          <Text style={styles.paragraph}>
            This property shows for v – 1 edges for v vertices is needed for graph validation. This is especially in spanning trees and minimum spanning trees.
          </Text>
        </View>

        {/* SPANNING TREES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications of Trees in Spanning Graphs</Text>
          <Text style={styles.paragraph}>
            Trees are useful in creating subgraphs called spanning trees. A spanning tree is a subset of a connected graph that gives all vertices but has only enough edges to form a tree. Spanning trees are used in various algorithms like network design and optimization.
          </Text>

          <Text style={styles.subLabel}>Example of Spanning Tree</Text>
          <Text style={styles.paragraph}>
            Consider we need to make an electrical wires in a building. We want to connect all rooms (vertices) with the least amount of wiring (edges) without any redundant loops. A spanning tree provides a solution, and connecting all vertices while minimizing the number of edges.
          </Text>

          <Text style={styles.sectionTitle}>Finding a Spanning Tree</Text>
          <Text style={styles.paragraph}>There are multiple ways to find a spanning tree within a graph. For example −</Text>

          <Text style={styles.subLabel}>Cycle Removal</Text>
          <Text style={styles.paragraph}>
            Start with the graph and remove edges until no cycles remain. It will then be a graph with connected nodes and no cycles.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/tre4.jpg')} height={200} />
          <Text style={styles.caption}>See we are removing the blue edges from the graph to form a spanning tree.</Text>

          <Text style={styles.subLabel}>Edge Addition</Text>
          <Text style={styles.paragraph}>
            Start with an empty graph, adding edges until all vertices are connected without forming cycles.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/tre5.jpg')} height={120} />
          <Text style={styles.caption}>From the graph we are adding edges (in blue) and it is forming a spanning tree.</Text>
        </View>

        {/* REAL-WORLD ANALOGIES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Analogies of Trees</Text>
          <Text style={styles.paragraph}>
            To better understand trees, let us see some real-world examples and analogies −
          </Text>
          <View style={styles.analogyRow}>
            <MaterialCommunityIcons name="family-tree" size={24} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Family Trees − </Text>Family trees are practical examples, where each node represents a family member, and edges represent relationships. The structure gives no cycles since no individual can be their own ancestor or descendant.</Text>
          </View>
          <View style={styles.analogyRow}>
            <MaterialCommunityIcons name="office-building" size={24} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Organizational Hierarchies − </Text>Many companies use a hierarchical, tree-like structure where each department or employee reports to a single manager. This layout avoids cycles, ensuring clear, direct paths of accountability and reporting.</Text>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            Trees are defined as connected, acyclic graphs that has distinct properties like the unique path property and a specific relationship between vertices and edges.
          </Text>
          <Text style={styles.paragraph}>
            In this chapter, we explained the basic properties and the unique characteristics of trees in discrete mathematics. We have also understood the importance of leaves in trees, their application in spanning graphs, and real-world applications.
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
  
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  boldLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  subLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 15, marginBottom: 10, letterSpacing: 0.5 },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },
  caption: { fontSize: 13, color: '#64748B', textAlign: 'center', fontStyle: 'italic', marginTop: 5 },

  exampleBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginVertical: 10 },
  
  propCard: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  propTitle: { fontWeight: '800', color: '#1E293B', fontSize: 15, marginLeft: 10 },
  propContent: { color: '#64748B', fontSize: 13, lineHeight: 20 },
  
  proofBox: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#DDD6FE', marginBottom: 15, marginTop: 10 },
  proofTitle: { fontWeight: '800', color: '#7C3AED', fontSize: 15, marginBottom: 10 },
  
  inductionBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#0EA5E9', marginVertical: 15 },
  stepText: { color: '#0369A1', fontSize: 14, marginBottom: 8, lineHeight: 22 },
  
  analogyRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15, backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD' },
  appText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#0369A1', lineHeight: 22 },
});