import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GraphColoring_8_10() {
  
  const ConflictRow = ({ classID, conflicts }) => (
    <View style={styles.conflictRow}>
      <View style={styles.classBadge}><Text style={styles.badgeText}>{classID}</Text></View>
      <MaterialCommunityIcons name="swap-horizontal" size={18} color="#EF4444" />
      <Text style={styles.conflictList}>{conflicts}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.10</Text>
          <Text style={styles.topicTitle}>Graph Coloring</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Graph Coloring deals with efficiently assigning colors to vertices in a graph under specific constraints. Primarily, it focuses on the \"proper coloring\" problem where no two adjacent vertices share the same color."}
          </Text>
          
          <View style={styles.chromaticBox}>
            <Text style={styles.chromaticTitle}>Chromatic Number (\u03c7)</Text>
            <Text style={styles.chromaticText}>
              {"The smallest number of colors required to achieve a proper vertex coloring for a graph G."}
            </Text>
          </View>
        </View>

        {/* STRUCTURAL EXAMPLES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Impact of Graph Structure</Text>
          <Text style={styles.paragraph}>{"The structure of a graph directly determines its chromatic number:"}</Text>
          
          <View style={styles.exampleGrid}>
            <View style={styles.exItem}>
              <Text style={styles.bold}>{"Complete Graph (K\u2086)"}</Text>
              <Text style={styles.exText}>{"Requires 6 colors; each vertex connects to every other vertex."}</Text>
            </View>
            <View style={styles.exItem}>
              <Text style={styles.bold}>{"Triangle Graph"}</Text>
              <Text style={styles.exText}>{"Requires 3 colors as each vertex is adjacent to two others."}</Text>
            </View>
            <View style={[styles.exItem, {width: '100%'}]}>
              <Text style={styles.bold}>{"Bipartite Graph (K\u2082,\u2083)"}</Text>
              <Text style={styles.exText}>{"Requires only 2 colors (one for each set) to achieve proper coloring."}</Text>
            </View>
          </View>
        </View>

        {/* FOUR COLOR THEOREM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="map-outline" size={24} color="#16A34A" />
            <Text style={[styles.sectionTitle, {color: '#16A34A', marginLeft: 10, marginBottom: 0}]}>Four-Color Theorem</Text>
          </View>
          <Text style={styles.paragraph}>
            {"One of the most famous results in graph theory: any planar graph (drawn without crossing edges) has a chromatic number of at most 4."}
          </Text>
          <View style={styles.theoremBadge}>
            <Text style={styles.theoremText}>{"\u03c7(Planar Graph) \u2264 4"}</Text>
          </View>
        </View>

        {/* REAL WORLD APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Scheduling</Text>
          <Text style={styles.paragraph}>
            {"We can ensure no two conflicting classes share the same time by assigning time slots as \"colors\"."}
          </Text>

          <View style={styles.conflictBox}>
            <Text style={styles.subLabel}>Classroom Conflicts</Text>
            <ConflictRow classID="A" conflicts="Classes D and I" />
            <ConflictRow classID="B" conflicts="D, I, and J" />
            <ConflictRow classID="C" conflicts="E, F, and I" />
            <Text style={styles.caption}>{"The chromatic number represents the minimum time slots needed."}</Text>
          </View>
        </View>

        {/* LIMITATIONS & ESTIMATION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Estimating \u03c7(G)</Text>
          <Text style={styles.paragraph}>{"For non-planar graphs, the chromatic number can be theoretically unbounded (e.g., K\u2085 requires 5 colors). Use these bounds:"}</Text>

          <View style={styles.detailBox}>
            <Text style={styles.bold}>{"Clique Number: "}</Text>
            <Text style={styles.paragraph}>{"The largest subset of vertices where all are adjacent. Provides a lower bound."}</Text>
            
            <Text style={styles.bold}>{"Maximum Degree (\u0394): "}</Text>
            <Text style={styles.paragraph}>{"Provides an upper bound: \u03c7(G) \u2264 \u0394(G) + 1."}</Text>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"We explained vertex coloring and chromatic numbers, presented the Four-Color Theorem for planar graphs, and reviewed practical techniques for estimating bounds in complex networks like scheduling and frequency assignment."}
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
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  chromaticBox: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#7C3AED', marginTop: 10 },
  chromaticTitle: { color: '#7C3AED', fontWeight: '800', fontSize: 14, marginBottom: 4 },
  chromaticText: { color: '#6D28D9', fontSize: 14 },
  exampleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  exItem: { width: '48%', backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  exText: { fontSize: 12, color: '#64748B', marginTop: 4 },
  theoremBadge: { backgroundColor: '#F0FDF4', padding: 20, borderRadius: 20, alignItems: 'center', marginVertical: 10 },
  theoremText: { color: '#16A34A', fontSize: 20, fontWeight: 'bold', fontFamily: 'monospace' },
  conflictBox: { backgroundColor: '#FFF5F5', padding: 16, borderRadius: 16, marginTop: 15 },
  subLabel: { fontSize: 12, fontWeight: '800', color: '#B91C1C', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  conflictRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  classBadge: { backgroundColor: '#B91C1C', width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  conflictList: { color: '#7F1D1D', fontSize: 13, marginLeft: 10, flex: 1 },
  caption: { fontSize: 11, fontStyle: 'italic', color: '#94A3B8', marginTop: 10 },
  detailBox: { backgroundColor: '#F1F5F9', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});