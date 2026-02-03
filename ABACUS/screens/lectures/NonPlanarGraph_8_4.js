import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NonPlanarGraphs_8_4() {
  
  const AppCard = ({ title, content, icon }) => (
    <View style={styles.appCard}>
      <View style={styles.cardHeaderRow}>
        <MaterialCommunityIcons name={icon} size={22} color="#0F172A" />
        <Text style={styles.appTitle}>{title}</Text>
      </View>
      <Text style={styles.appContent}>{content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.4</Text>
          <Text style={styles.topicTitle}>Non-Planar Graphs</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Non-planar graphs in graph theory are special type of graphs that cannot be drawn on a paper without intersecting the edges. Planar graphs can be drawn on a plane while non-planar graphs are the exact opposite of them."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will cover the basics of non-planar graphs, check some famous examples, and understand the proofs and reasoning behind non-planarity."}
          </Text>
        </View>

        {/* SECTION 1: DEFINITION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is a Non-Planar Graph?</Text>
          <Text style={styles.paragraph}>
            {"A non-planar graph is a graph that cannot be drawn on a plane without at least some of its edges crossing. In a planar graph, we can always find a way to redraw it. In a non-planar graph, this is simply impossible."}
          </Text>
          
          <Text style={styles.subLabel}>Recognizing Non-Planarity</Text>
          <View style={styles.infoHighlight}>
            <Text style={styles.bold}>{"1. Redrawing Attempts: "}</Text>
            <Text style={styles.highlightText}>{"Trying to arrange the graph to avoid crossings. If exhaustive searching fails, the graph is likely non-planar."}</Text>
          </View>
          <View style={styles.infoHighlight}>
            <Text style={styles.bold}>{"2. Applying Theorems: "}</Text>
            <Text style={styles.highlightText}>{"Using theorems like Kuratowski's theorem to determine non-planarity without redrawing."}</Text>
          </View>
        </View>

        {/* SECTION 2: THE COMPLETE GRAPH K5 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>The Complete Graph K\u2085</Text>
          <Text style={styles.paragraph}>
            {"K\u2085 includes 5 vertices, each connected to every other vertex, resulting in 10 edges. It contains all possible edges between vertices, making it non-planar."}
          </Text>

          <View style={styles.proofBox}>
            <Text style={styles.proofTitle}>Proof of Non-Planarity in K\u2085</Text>
            <Text style={styles.stepText}>{"\u2022 Assume Planarity: If K\u2085 were planar, satisfy Euler's: v \u2212 e + f = 2."}</Text>
            <Text style={styles.stepText}>{"\u2022 Plug values (v=5, e=10): 5 \u2212 10 + f = 2 \u21d2 f = 7 faces."}</Text>
            <Text style={styles.stepText}>{"\u2022 Boundary Condition: Each face needs \u2265 3 edges (B \u2265 3f). Total boundaries B = 2e."}</Text>
            <View style={styles.calculationRow}>
              <Text style={styles.monoMath}>{"20 \u2265 3 \u00d7 7 = 21"}</Text>
            </View>
            <Text style={styles.resultText}>{"Inequality fails. K\u2085 cannot be planar."}</Text>
          </View>
        </View>

        {/* SECTION 3: COMPLETE BIPARTITE GRAPH K3,3 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Complete Bipartite K\u2083,\u2083</Text>
          <Text style={styles.paragraph}>
            {"Visualized as the \"three houses and three utilities problem.\" It consists of two sets of three vertices where every vertex in one set connects to the other."}
          </Text>

          <View style={[styles.proofBox, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}>
            <Text style={[styles.proofTitle, { color: '#0369A1' }]}>Proof of Non-Planarity in K\u2083,\u2083</Text>
            <Text style={styles.stepText}>{"\u2022 Use values (v=6, e=9): 6 \u2212 9 + f = 2 \u21d2 f = 5 faces."}</Text>
            <Text style={styles.stepText}>{"\u2022 Condition: Since bipartite, no 3-edge cycles exist. Each face needs \u2265 4 edges (B \u2265 4f)."}</Text>
            <View style={styles.calculationRow}>
              <Text style={[styles.monoMath, { color: '#0369A1' }]}>{"18 \u2265 4 \u00d7 5 = 20"}</Text>
            </View>
            <Text style={[styles.resultText, { color: '#0369A1' }]}>{"Inequality fails. K\u2083,\u2083 cannot be planar."}</Text>
          </View>
        </View>

        {/* SECTION 4: APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications</Text>
          <AppCard 
            icon="chip" 
            title="Circuit Design" 
            content="Designing circuits on a chip aims to place wires without intersections to avoid interference and design errors." 
          />
          <AppCard 
            icon="transit-connection-variant" 
            title="Network Routing" 
            content="Complex networks like transportation grids or communication systems avoid crossing paths to reduce congestion." 
          />
          <AppCard 
            icon="cube-outline" 
            title="3D Modeling" 
            content="Non-planar concepts apply to 3D polyhedra and spatial structures to understand projections." 
          />
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"We covered the basics of non-planar graphs, including classic examples K\u2085 and K\u2083,\u2083. We understood why certain graphs fail to be planar through Euler's formula and boundary conditions."}
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
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12 },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 10, marginBottom: 12, letterSpacing: 1 },
  bold: { fontWeight: '800', color: '#0F172A' },
  infoHighlight: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#CBD5E1', marginBottom: 10 },
  highlightText: { color: '#475569', fontSize: 14, lineHeight: 20 },
  proofBox: { backgroundColor: '#FFF5F5', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#EF4444', marginVertical: 15, borderWidth: 1, borderColor: '#FEE2E2' },
  proofTitle: { fontWeight: '800', color: '#B91C1C', fontSize: 14, marginBottom: 10 },
  stepText: { color: '#475569', fontSize: 13, lineHeight: 20, marginBottom: 6 },
  calculationRow: { alignItems: 'center', marginVertical: 10 },
  monoMath: { fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold', color: '#B91C1C' },
  resultText: { fontWeight: 'bold', color: '#B91C1C', fontSize: 14, textAlign: 'right', marginTop: 5 },
  appCard: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  appTitle: { fontWeight: '800', color: '#1E293B', fontSize: 15, marginLeft: 10 },
  appContent: { color: '#64748B', fontSize: 13, lineHeight: 20 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});