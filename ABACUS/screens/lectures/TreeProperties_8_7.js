import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
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
            {"Trees are special types of graphs with unique properties. A tree is a connected graph with no cycles. It finds applications in data organization, algorithms, network design, and biology."}
          </Text>
          
          <View style={styles.definitionBox}>
            <Text style={styles.bold}>{"Trees in Graph Theory:"}</Text>
            <Text style={styles.infoText}>{"\u2022 All vertices are connected with no cycles."}</Text>
            <Text style={styles.infoText}>{"\u2022 Formal Definition: A connected acyclic graph."}</Text>
            <Text style={styles.infoText}>{"\u2022 Forest: A group of unconnected acyclic graphs."}</Text>
          </View>
        </View>

        {/* BASIC PROPERTIES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Basic Properties</Text>
          <PropHighlight 
            icon="vector-line" 
            title="Connectivity" 
            content="By definition, a tree is connected, meaning there is a path between any pair of vertices." 
          />
          <PropHighlight 
            icon="source-commit-start-next-node" 
            title="Acyclic Nature" 
            content="Contains no loops or cycles, ensuring that any path between two vertices is unique." 
          />

          <View style={styles.formulaBox}>
            <Text style={styles.bold}>{"Vertex-Edge Ratio:"}</Text>
            <Text style={styles.mathResult}>{"Edges = n \u2212 1"}</Text>
            <Text style={styles.formulaSub}>{"For a tree with n vertices."}</Text>
          </View>
        </View>

        {/* KEY PROPOSITIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Key Propositions</Text>
          
          <View style={styles.proofBox}>
            <Text style={styles.proofTitle}>Unique Path Proposition</Text>
            <Text style={styles.paragraph}>{"To prove uniqueness, we assume more than one path exists between two points. This assumption implies the presence of a cycle, which contradicts the definition of a tree."}</Text>
          </View>

          <View style={[styles.proofBox, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
            <Text style={[styles.proofTitle, { color: '#166534' }]}>Leaves Proposition</Text>
            <Text style={styles.paragraph}>{"Any tree with at least two vertices has at least two vertices of degree one (leaves)."}</Text>
            <Text style={styles.italicText}>{"Hierarchy Example: Entry-level employees in an organization report to only one manager, ensuring a degree of one."}</Text>
          </View>
        </View>

        {/* INDUCTION PROOF */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Proof by Induction</Text>
          <Text style={styles.paragraph}>{"Proving that for v vertices, we have v \u2212 1 edges:"}</Text>
          <View style={styles.inductionBox}>
            <Text style={styles.stepText}><Text style={styles.bold}>{"Base Case: "}</Text>{"A tree with one vertex has zero edges."}</Text>
            <Text style={styles.stepText}><Text style={styles.bold}>{"Inductive Step: "}</Text>{"Adding a vertex and connecting it with an edge preserves structure, making k + 1 vertices and k edges."}</Text>
          </View>
        </View>

        {/* SPANNING TREES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Spanning Trees</Text>
          <Text style={styles.paragraph}>
            {"A subset of a connected graph that covers all vertices but only uses enough edges to form a tree."}
          </Text>

          <View style={styles.algorithmGrid}>
            <View style={styles.algoItem}>
              <Text style={styles.bold}>Cycle Removal</Text>
              <Text style={styles.smallText}>{"Start with the graph and remove edges until no cycles remain."}</Text>
            </View>
            <View style={styles.algoItem}>
              <Text style={styles.bold}>Edge Addition</Text>
              <Text style={styles.smallText}>{"Start with an empty graph, adding edges until all vertices connect without cycles."}</Text>
            </View>
          </View>
        </View>

        {/* ANALOGIES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Analogies</Text>
          <View style={styles.analogyRow}>
            <MaterialCommunityIcons name="family-tree" size={20} color="#475569" />
            <Text style={styles.appText}>{"Family Trees: relationships give no cycles as no one is their own ancestor."}</Text>
          </View>
          <View style={styles.analogyRow}>
            <MaterialCommunityIcons name="office-building" size={20} color="#475569" />
            <Text style={styles.appText}>{"Organizational Hierarchies: clear paths of accountability to a single manager."}</Text>
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
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12 },
  bold: { fontWeight: '800', color: '#0F172A' },
  definitionBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 6 },
  propCard: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  propTitle: { fontWeight: '800', color: '#1E293B', fontSize: 15, marginLeft: 10 },
  propContent: { color: '#64748B', fontSize: 13, lineHeight: 20 },
  formulaBox: { backgroundColor: '#0F172A', borderRadius: 20, padding: 20, alignItems: 'center', marginVertical: 10 },
  mathResult: { fontSize: 22, fontWeight: 'bold', color: '#38BDF8', fontFamily: 'monospace', marginVertical: 4 },
  formulaSub: { color: '#94A3B8', fontSize: 12 },
  proofBox: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#DDD6FE', marginBottom: 15 },
  proofTitle: { fontWeight: '800', color: '#7C3AED', fontSize: 14, marginBottom: 10, textTransform: 'uppercase' },
  italicText: { fontStyle: 'italic', color: '#64748B', fontSize: 13, marginTop: 5 },
  inductionBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#0EA5E9' },
  stepText: { color: '#0369A1', fontSize: 13, marginBottom: 8, lineHeight: 20 },
  algorithmGrid: { flexDirection: 'row', gap: 12, marginTop: 5 },
  algoItem: { flex: 1, backgroundColor: '#F1F5F9', padding: 12, borderRadius: 12 },
  smallText: { fontSize: 12, color: '#64748B', marginTop: 4, lineHeight: 18 },
  analogyRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  appText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#475569', lineHeight: 20 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});