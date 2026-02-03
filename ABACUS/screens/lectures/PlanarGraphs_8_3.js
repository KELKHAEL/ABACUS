import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PlanarGraphs_8_3() {
  
  const PlatonicSolid = ({ name }) => (
    <View style={styles.solidBadge}>
      <MaterialCommunityIcons name="shape-outline" size={16} color="#7C3AED" />
      <Text style={styles.solidText}>{name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.3</Text>
          <Text style={styles.topicTitle}>Planar Graphs</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Graph theory is a part of discrete mathematics, where we see different types of graphs in action. Planar graphs are a special type of graph. They are special because they can be drawn in a two dimensional plane without any edges crossing."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will see the basics of planar graphs with easy-to-understand examples along with the explanations of core concepts like Eulers formula and non-planar graphs."}
          </Text>
        </View>

        {/* SECTION 1: WHAT IS A PLANAR GRAPH */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is a Planar Graph?</Text>
          <Text style={styles.paragraph}>
            {"A planar graph is a special type of graph that can be drawn on a flat plane. No two edges intersect except at their endpoints (vertices). When a graph is drawn this way, it divides the plane into distinct regions known as faces."}
          </Text>
          <View style={styles.exampleBox}>
            <Text style={styles.exampleText}>{"Example: 4 vertices with no intersecting edges is a planar graph."}</Text>
          </View>
        </View>

        {/* SECTION 2: DRAWING PLANAR GRAPHS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Drawing Planar Graphs</Text>
          <Text style={styles.paragraph}>
            {"For a graph to be planar, we must draw it in a way that it prevents edges from crossing each other. So, sometimes a graph may look non-planar initially, but with careful redrawing, it can be made planar."}
          </Text>
          
          <View style={styles.infoHighlight}>
            <Text style={styles.bold}>{"Redrawing Logic: "}</Text>
            <Text style={styles.paragraph}>
              {"A graph with 5 vertices and 6 edges initially showing intersecting edges AD and BC can be redrawn by placing vertex D outside, transforming it into a planar graph."}
            </Text>
          </View>
          
          <Text style={styles.subLabel}>Faces in Planar Graphs</Text>
          <Text style={styles.paragraph}>
            {"The edges and vertices naturally split the plane into regions, or faces. One of these regions will always be the \"outside\" of the graph, forming a boundary that encircles everything else."}
          </Text>
        </View>

        {/* SECTION 3: EULERS FORMULA */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="calculator-variant-outline" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginBottom: 0}]}>Euler's Formula</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Euler's formula is useful to relate the vertices, edges, and faces of any connected planar graph."}
          </Text>
          
          <View style={styles.formulaHighlight}>
            <Text style={styles.mainFormula}>{"v \u2212 e + f = 2"}</Text>
            <View style={styles.formulaLegend}>
              <Text style={styles.legendItem}>{"\u2022 v = vertices"}</Text>
              <Text style={styles.legendItem}>{"\u2022 e = edges"}</Text>
              <Text style={styles.legendItem}>{"\u2022 f = faces"}</Text>
            </View>
          </View>

          <View style={styles.calculationBox}>
            <Text style={styles.bold}>{"Applying the Formula: "}</Text>
            <Text style={styles.paragraph}>{"For 5 vertices, 6 edges, and 3 faces:"}</Text>
            <Text style={styles.monoMath}>{"5 \u2212 6 + 3 = 2"}</Text>
            <Text style={styles.italicText}>{"This verifies that Euler's formula holds regardless of arrangement."}</Text>
          </View>
        </View>

        {/* SECTION 4: NON-PLANAR GRAPHS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="close-circle-outline" size={24} color="#EF4444" />
            <Text style={[styles.sectionTitle, {color: '#EF4444', marginBottom: 0}]}>Non-Planar Graphs</Text>
          </View>
          <Text style={styles.paragraph}>
            {"If a graph cannot be drawn on a plane, it belongs to the category of non-planar graphs. When there are too many edges for the number of vertices, it becomes impossible to draw the graph without intersecting edges."}
          </Text>

          <View style={styles.nonPlanarGrid}>
            <View style={styles.nonPlanarItem}>
              <Text style={styles.bold}>{"Complete K\u2085"}</Text>
              <Text style={styles.smallText}>{"5 vertices connected to every other vertex; 10 edges total."}</Text>
            </View>
            <View style={styles.nonPlanarItem}>
              <Text style={styles.bold}>{"Bipartite K\u2083,\u2083"}</Text>
              <Text style={styles.smallText}>{"Two sets of 3 vertices where every vertex in one set connects to the other."}</Text>
            </View>
          </View>
          
          <Text style={styles.paragraph}>{"Note: K5 and K3,3 are mathematically impossible to achieve on a plane without intersections."}</Text>
        </View>

        {/* SECTION 5: APPLICATIONS & POLYHEDRA */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Polyhedra and Beyond</Text>
          <Text style={styles.paragraph}>
            {"Planar graphs can be used to represent polyhedra—three-dimensional solids with flat faces and straight edges."}
          </Text>
          <View style={styles.infoHighlight}>
            <Text style={styles.bold}>{"Cube Projection: "}</Text>
            <Text style={styles.paragraph}>{"A cube projected onto a plane has 8 vertices, 12 edges, and 6 faces, satisfying Euler's formula."}</Text>
          </View>

          <Text style={styles.subLabel}>The Five Platonic Solids</Text>
          <View style={styles.solidGrid}>
            <PlatonicSolid name="Tetrahedron" />
            <PlatonicSolid name="Cube" />
            <PlatonicSolid name="Octahedron" />
            <PlatonicSolid name="Dodecahedron" />
            <PlatonicSolid name="Icosahedron" />
          </View>
        </View>

        {/* SECTION 6: THEOREMS AND PROOFS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Theorems and Proofs</Text>
          <Text style={styles.bold}>{"Proving Non-Planarity"}</Text>
          <Text style={styles.paragraph}>
            {"Proofs for non-planarity often rely on logical contradiction. By assuming planarity and applying Euler's formula, we find that certain required conditions cannot be met, proving no planar representation exists."}
          </Text>
          
          <View style={styles.divider} />

          <Text style={styles.bold}>{"Girth and Boundaries"}</Text>
          <Text style={styles.paragraph}>
            {"The concept of girth (the length of the shortest cycle) helps determine planarity. If specific girth and boundary conditions are not met, the graph cannot be planar."}
          </Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"We explained planar graphs starting with the basic definition and faces, covered Euler's formula, and touched upon non-planar graphs. We discovered how the properties of regular polyhedra reflect the principles of planar graph theory."}
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
  italicText: { fontStyle: 'italic', color: '#64748B', marginTop: 5, fontSize: 14 },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 15, marginBottom: 12, letterSpacing: 1 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 15 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1' },
  exampleText: { color: '#64748B', fontSize: 14, fontWeight: '600' },
  infoHighlight: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#7C3AED', marginVertical: 10 },
  formulaHighlight: { backgroundColor: '#0F172A', borderRadius: 20, padding: 25, alignItems: 'center', marginVertical: 15 },
  mainFormula: { color: '#38BDF8', fontSize: 26, fontWeight: 'bold', fontFamily: 'monospace' },
  formulaLegend: { marginTop: 15, alignSelf: 'flex-start' },
  legendItem: { color: '#94A3B8', fontSize: 13, marginBottom: 4, fontFamily: 'monospace' },
  calculationBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 10 },
  monoMath: { fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold', color: '#0369A1', textAlign: 'center', marginVertical: 8 },
  nonPlanarGrid: { flexDirection: 'row', gap: 12, marginVertical: 10 },
  nonPlanarItem: { flex: 1, backgroundColor: '#FEF2F2', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#FEE2E2' },
  smallText: { fontSize: 12, color: '#7F1D1D', marginTop: 4 },
  solidGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  solidBadge: { backgroundColor: '#F5F3FF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD6FE' },
  solidText: { fontSize: 12, color: '#7C3AED', fontWeight: 'bold', marginLeft: 6 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});