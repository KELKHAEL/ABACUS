import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ColoringTheory_8_11() {
  
  const ConstraintItem = ({ label, description }) => (
    <View style={styles.constraintRow}>
      <Text style={styles.bold}>{label} {"\u2212"}</Text>
      <Text style={styles.constraintText}>{description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.11</Text>
          <Text style={styles.topicTitle}>Coloring Theory</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"The graph coloring problem is useful in graph theory and discrete mathematics. It ensures that no two adjacent vertices will have the same color. This technique has applications across diverse fields, from scheduling problems to frequency assignment."}
          </Text>
        </View>

        {/* SECTION 1: CORE DEFINITIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is Graph Coloring?</Text>
          <Text style={styles.paragraph}>
            {"Graph coloring usually means assigning colors to vertices so that no two adjacent vertices share the same color. Key terms include:"}
          </Text>
          
          <View style={styles.definitionBox}>
            <ConstraintItem label="Vertex Coloring" description="Assigning colors to each vertex. For coloring to be 'proper', no two connected vertices should share a color." />
            <ConstraintItem label="Chromatic Number" description="Represented as \u03c7(G). The smallest number of colors needed to properly color a graph." />
            <ConstraintItem label="Planar Graphs" description="Graphs drawn on a plane without edges crossing. This characteristic often affects the chromatic number." />
          </View>
        </View>

        {/* SECTION 2: THE FOUR-COLOR THEOREM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="map-check-outline" size={24} color="#16A34A" />
            <Text style={[styles.sectionTitle, {color: '#16A34A', marginBottom: 0, marginLeft: 10}]}>The Four-Color Theorem</Text>
          </View>
          <Text style={styles.paragraph}>
            {"This theorem states that any planar graph can be properly colored using no more than four colors."}
          </Text>
          
          <View style={styles.theoremBox}>
            <Text style={styles.theoremText}>{"\u03c7(Planar Graph) \u2264 4"}</Text>
            <Text style={styles.italicText}>{"Proof achieved via computer verification; implications extend far beyond cartography."}</Text>
          </View>
        </View>

        {/* SECTION 3: REAL-WORLD APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Applications</Text>
          
          <Text style={styles.subLabel}>1. Classroom & Exam Scheduling</Text>
          <Text style={styles.paragraph}>
            {"Represent each class as a vertex and each conflict as an edge. The chromatic number gives the least number of time slots required to avoid overlaps."}
          </Text>
          <View style={styles.exampleLogic}>
            <Text style={styles.bold}>{"Conflict Example:"}</Text>
            <Text style={styles.bulletItem}>{"\u2022 Class A conflicts with D and I"}</Text>
            <Text style={styles.bulletItem}>{"\u2022 Class B conflicts with D, I, and J"}</Text>
            <Text style={styles.bulletItem}>{"\u2022 Class C conflicts with E, F, and I"}</Text>
          </View>

          <Text style={styles.subLabel}>2. Radio Frequency Assignment</Text>
          <Text style={styles.paragraph}>
            {"Nearby stations treat frequencies as 'colors' to avoid interference. Proper coloring determines the minimum frequencies needed for a region."}
          </Text>

          <Text style={styles.subLabel}>3. Chemical Storage Safety</Text>
          <Text style={styles.paragraph}>
            {"If two chemicals react dangerously together, they are adjacent vertices. Coloring determines the minimum rooms needed for safe storage."}
          </Text>
        </View>

        {/* SECTION 4: BOUNDS & SPECIAL GRAPHS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Estimation & Bounds</Text>
          <View style={styles.detailBox}>
            <Text style={styles.bold}>{"Lower Bound (Clique Number): "}</Text>
            <Text style={styles.paragraph}>{"The largest set of vertices all connected to each other. \u03c7(G) must be at least this large."}</Text>
            
            <Text style={styles.bold}>{"Upper Bound (Maximum Degree \u0394): "}</Text>
            <Text style={styles.paragraph}>{"For any graph G, \u03c7(G) \u2264 \u0394(G) + 1."}</Text>
          </View>

          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>{"Perfect Graphs: "}</Text>
            <Text style={styles.highlightText}>{"Graphs where the chromatic number equals the clique number for every subgraph."}</Text>
          </View>

          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>{"Bipartite Graphs: "}</Text>
            <Text style={styles.highlightText}>{"Vertices can be divided into two sets; edges only exist between sets. \u03c7(G) = 2."}</Text>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"We explained vertex coloring and chromatic numbers, explored the Four-Color Theorem, and reviewed applications in scheduling, radio frequencies, and storage. Lastly, we identified bounds and special graph types that simplify coloring calculations."}
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
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  definitionBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  constraintRow: { marginBottom: 12 },
  constraintText: { color: '#64748B', fontSize: 14, lineHeight: 20, marginTop: 2 },
  theoremBox: { backgroundColor: '#0F172A', borderRadius: 20, padding: 25, alignItems: 'center', marginVertical: 15 },
  theoremText: { color: '#38BDF8', fontSize: 24, fontWeight: 'bold', fontFamily: 'monospace' },
  italicText: { fontStyle: 'italic', color: '#94A3B8', fontSize: 12, marginTop: 10, textAlign: 'center' },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#7C3AED', textTransform: 'uppercase', marginTop: 15, marginBottom: 8, letterSpacing: 1 },
  exampleLogic: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 5 },
  bulletItem: { color: '#0369A1', fontSize: 14, marginBottom: 4 },
  detailBox: { backgroundColor: '#F1F5F9', padding: 16, borderRadius: 16, marginBottom: 15 },
  logicHighlight: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#16A34A', marginBottom: 10 },
  highlightText: { color: '#166534', fontSize: 14, fontWeight: '600' },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});