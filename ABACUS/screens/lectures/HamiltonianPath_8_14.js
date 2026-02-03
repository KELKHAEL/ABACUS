import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HamiltonianPaths_8_14() {
  
  const ConceptCard = ({ title, definition, trace, icon, color }) => (
    <View style={[styles.conceptCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeaderRow}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.conceptTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.paragraph}>{definition}</Text>
      <View style={[styles.traceBox, { backgroundColor: color + '15' }]}>
        <Text style={[styles.traceText, { color: color }]}>{trace}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.14</Text>
          <Text style={styles.topicTitle}>Hamiltonian Path</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"The Hamiltonian path visits every vertex in a graph exactly once. Named after Sir William Rowan Hamilton, this concept is vital in circuit design, puzzle solving, and route optimization."}
          </Text>
        </View>

        {/* DEFINITIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Core Concepts</Text>
          
          <ConceptCard 
            title="Hamiltonian Path"
            icon="vector-point"
            color="#0284C7"
            definition="A path that passes through every vertex exactly once. Unlike Euler paths, it is not concerned with traversing every edge."
            trace="Example Trace: A \u2192 D \u2192 E \u2192 C \u2192 B"
          />

          <ConceptCard 
            title="Hamiltonian Cycle"
            icon="sync"
            color="#16A34A"
            definition="A path that visits each vertex once and returns to the starting vertex, forming a closed loop (also called a Hamiltonian circuit)."
            trace="Example Trace: A \u2192 B \u2192 C \u2192 D \u2192 E \u2192 A"
          />
        </View>

        {/* COMPLEXITY SECTION */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="alert-decagram-outline" size={24} color="#EF4444" />
            <Text style={[styles.sectionTitle, {color: '#EF4444', marginBottom: 0, marginLeft: 10}]}>The Complexity Challenge</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Unlike Euler paths, which have simple degree-based rules, Hamiltonian paths are computationally hard. Checking for their existence is an "}
            <Text style={styles.bold}>{"NP-complete problem"}</Text>
            {". There are no known quick ways to find a solution as graph size grows."}
          </Text>
        </View>

        {/* EXAMPLES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Visual Examples</Text>
          
          <View style={styles.exampleItem}>
            <Text style={styles.bold}>{"1. Simple Linear Graph (A-B-C-D):"}</Text>
            <Text style={styles.paragraph}>{"Has a path (A to D) but no cycle because there is no way to return to A without retracing."}</Text>
          </View>

          <View style={styles.exampleItem}>
            <Text style={styles.bold}>{"2. Square Graph Loop:"}</Text>
            <Text style={styles.paragraph}>{"Forms a Hamiltonian cycle (A-B-C-D-A). This is a Hamiltonian graph."}</Text>
          </View>

          <View style={styles.exampleItem}>
            <Text style={styles.bold}>{"3. Star Graph (Impossible):"}</Text>
            <Text style={styles.paragraph}>{"A central vertex connected to multiple outer vertices cannot visit every node once without missing or revisiting the center."}</Text>
          </View>
        </View>

        {/* APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Applications</Text>
          <View style={styles.appBox}>
            <Text style={styles.bold}>{"Traveling Salesperson Problem (TSP):"}</Text>
            <Text style={styles.paragraph}>{"Finding the shortest possible Hamiltonian cycle to visit every city exactly once and return home."}</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.bold}>{"DNA Sequencing:"}</Text>
            <Text style={styles.paragraph}>{"Reconstructing genetic sequences from fragments by finding a path through overlapping data."}</Text>
          </View>
        </View>

        {/* COMMON MISUNDERSTANDINGS */}
        <View style={[styles.sectionCard, { backgroundColor: '#F8FAFC' }]}>
          <Text style={styles.subLabel}>Common Misunderstandings</Text>
          <View style={styles.misBox}>
            <MaterialCommunityIcons name="help-circle-outline" size={20} color="#64748B" />
            <Text style={styles.misText}>{"Confusion with Euler Paths: Hamiltonian = visit Vertex once; Euler = cover Edge once."}</Text>
          </View>
          <View style={styles.misBox}>
            <MaterialCommunityIcons name="help-circle-outline" size={20} color="#64748B" />
            <Text style={styles.misText}>{"Connectivity Assumption: Being connected does NOT guarantee a Hamiltonian path (e.g., star graphs)."}</Text>
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
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  conceptCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderLeftWidth: 5, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  conceptTitle: { fontWeight: '900', fontSize: 14, marginBottom: 6, textTransform: 'uppercase' },
  traceBox: { padding: 10, borderRadius: 8, marginTop: 10 },
  traceText: { fontFamily: 'monospace', fontSize: 12, fontWeight: 'bold' },
  exampleItem: { marginBottom: 15, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: '#E2E8F0' },
  appBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16 },
  divider: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 12 },
  subLabel: { fontSize: 12, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 1 },
  misBox: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  misText: { flex: 1, marginLeft: 10, fontSize: 13, color: '#64748B', fontStyle: 'italic' },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});