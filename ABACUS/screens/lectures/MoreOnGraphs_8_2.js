import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MoreOnGraphs_8_2() {
  
  const AlgoStep = ({ number, text }) => (
    <View style={styles.algoStepRow}>
      <View style={styles.stepCircle}><Text style={styles.stepNumber}>{number}</Text></View>
      <Text style={styles.algoStepText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* TOPIC TITLE AREA */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.2</Text>
          <Text style={styles.topicTitle}>More on Graphs</Text>
          <View style={styles.underline} />
        </View>

        {/* SECTION: GRAPH COLORING */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="palette-outline" size={24} color="#7C3AED" />
            <Text style={[styles.sectionTitle, {color: '#7C3AED'}]}>Graph Coloring</Text>
          </View>
          
          <Text style={styles.paragraph}>
            {"Graph coloring is the procedure of assignment of colors to each vertex of a graph G such that no adjacent vertices get the same color."}
          </Text>

          <View style={styles.chromaticBox}>
            <Text style={styles.chromaticTitle}>Chromatic Number (\u03c7)</Text>
            <Text style={styles.chromaticText}>
              {"The smallest number of colors required to color a graph G. This is an NP-Complete problem."}
            </Text>
          </View>

          <Text style={styles.subLabel}>Coloring Algorithm</Text>
          <AlgoStep number="1" text="Arrange the vertices of the graph in some order." />
          <AlgoStep number="2" text="Choose the first vertex and color it with the first color." />
          <AlgoStep number="3" text="Color the next vertex with the lowest numbered color not used by any adjacent neighbors." />

          <View style={[styles.infoHighlight, styles.purpleHighlight]}>
            <Text style={styles.bold}>{"Example Breakdown: "}</Text>
            <Text style={styles.highlightText}>
              {"Vertex a (Red) \u2192 adjacent b & d (Green & Blue) \u2192 vertex c (Red, no adjacent Red)."}
            </Text>
          </View>
        </View>

        {/* SECTION: BFS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="format-list-bulleted-type" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7'}]}>Breadth First Search (BFS)</Text>
          </View>
          
          <Text style={styles.paragraph}>
            {"BFS explores a graph level-by-level, marking vertices as 'visited' before moving deeper."}
          </Text>

          <View style={styles.algorithmContainer}>
            <View style={styles.algoHeader}>
              <MaterialCommunityIcons name="tray-full" size={18} color="#0369A1" />
              <Text style={styles.algoHeaderText}>QUEUE-BASED LOGIC</Text>
            </View>
            <Text style={styles.codeText}>{"1. Set all nodes as Ready."}</Text>
            <Text style={styles.codeText}>{"2. Move source to Queue & mark Waiting."}</Text>
            <Text style={styles.codeText}>{"3. Repeat: Remove from Queue \u2192 Visited."}</Text>
            <Text style={styles.codeText}>{"4. Add neighbors to Rear of Queue."}</Text>
          </View>

          <View style={styles.traversalOrderBox}>
            <Text style={styles.orderLabel}>TRAVERSAL ORDER (Source a)</Text>
            <Text style={styles.orderValue}>{"a \u2192 b \u2192 d \u2192 e \u2192 c"}</Text>
          </View>

          <View style={styles.complexityRow}>
            <Text style={styles.complexityText}>Complexity: <Text style={styles.mono}>O(|V| + |E|)</Text></Text>
          </View>
        </View>

        {/* SECTION: DFS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="layers-triple-outline" size={24} color="#059669" />
            <Text style={[styles.sectionTitle, {color: '#059669'}]}>Depth First Search (DFS)</Text>
          </View>
          
          <Text style={styles.paragraph}>
            {"DFS traverses deep into a branch, marking vertices 'visited', and backtracks when no new neighbors are found."}
          </Text>

          <View style={[styles.algorithmContainer, {backgroundColor: '#ECFDF5', borderColor: '#A7F3D0'}]}>
            <View style={styles.algoHeader}>
              <MaterialCommunityIcons name="stack-overflow" size={18} color="#065F46" />
              <Text style={[styles.algoHeaderText, {color: '#065F46'}]}>STACK-BASED LOGIC</Text>
            </View>
            <Text style={[styles.codeText, {color: '#065F46'}]}>{"1. Set all nodes as Ready."}</Text>
            <Text style={[styles.codeText, {color: '#065F46'}]}>{"2. Push source to Stack & mark Waiting."}</Text>
            <Text style={[styles.codeText, {color: '#065F46'}]}>{"3. Repeat: Pop from Stack \u2192 Visited."}</Text>
            <Text style={[styles.codeText, {color: '#065F46'}]}>{"4. Push neighbors onto Top of Stack."}</Text>
          </View>

          <View style={[styles.traversalOrderBox, {backgroundColor: '#F0FDF4'}]}>
            <Text style={[styles.orderLabel, {color: '#166534'}]}>TRAVERSAL ORDER (Source a)</Text>
            <Text style={[styles.orderValue, {color: '#166534'}]}>{"a \u2192 b \u2192 c \u2192 d \u2192 e"}</Text>
          </View>

          <View style={[styles.complexityRow, {backgroundColor: '#D1FAE5'}]}>
            <Text style={[styles.complexityText, {color: '#065F46'}]}>Complexity: <Text style={styles.mono}>\u0398(|V| + |E|)</Text></Text>
          </View>
        </View>

        {/* APPLICATIONS SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Algorithm Applications</Text>
          <View style={styles.appGrid}>
            <View style={styles.appBadge}><Text style={styles.appText}>Shortest Path</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>GPS Navigation</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Cycle Detection</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Knights Tour</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Topological Sort</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Connected Components</Text></View>
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
  
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 4, borderWidth: 1, borderColor: '#F1F5F9' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginLeft: 10 },
  
  paragraph: { fontSize: 16, color: '#475569', lineHeight: 26, marginBottom: 12 },
  bold: { fontWeight: '800', color: '#0F172A' },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 15, marginBottom: 12, letterSpacing: 1 },
  
  chromaticBox: { backgroundColor: '#F5F3FF', borderRadius: 16, padding: 16, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#7C3AED' },
  chromaticTitle: { fontWeight: '800', color: '#5B21B6', fontSize: 14, marginBottom: 4 },
  chromaticText: { color: '#6D28D9', fontSize: 14, lineHeight: 22 },

  infoHighlight: { padding: 16, borderRadius: 16, marginVertical: 10 },
  purpleHighlight: { backgroundColor: '#FAF5FF', borderStyle: 'dashed', borderWidth: 1, borderColor: '#D8B4FE' },
  highlightText: { color: '#5B21B6', fontSize: 15, lineHeight: 24 },

  algoStepRow: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-start' },
  stepCircle: { backgroundColor: '#1E293B', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 },
  stepNumber: { color: 'white', fontSize: 12, fontWeight: '900' },
  algoStepText: { flex: 1, fontSize: 15, color: '#334155', lineHeight: 22 },

  algorithmContainer: { backgroundColor: '#F0F9FF', borderRadius: 16, padding: 20, marginVertical: 10, borderWidth: 1, borderColor: '#BAE6FD' },
  algoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  algoHeaderText: { marginLeft: 8, fontSize: 12, fontWeight: '900', color: '#0369A1', letterSpacing: 0.5 },
  codeText: { fontSize: 14, color: '#334155', lineHeight: 24, fontWeight: '500', marginBottom: 4 },

  traversalOrderBox: { padding: 20, borderRadius: 16, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', marginTop: 10, alignItems: 'center' },
  orderLabel: { fontSize: 11, fontWeight: '800', color: '#94A3B8', marginBottom: 8 },
  orderValue: { fontSize: 18, color: '#0F172A', fontFamily: 'monospace', fontWeight: 'bold' },

  complexityRow: { backgroundColor: '#E0F2FE', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 30, alignSelf: 'flex-start', marginTop: 15 },
  complexityText: { color: '#0369A1', fontWeight: '800', fontSize: 13 },
  mono: { fontFamily: 'monospace', fontSize: 15 },

  appGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  appBadge: { backgroundColor: '#F1F5F9', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  appText: { fontSize: 13, color: '#475569', fontWeight: '700' }
});