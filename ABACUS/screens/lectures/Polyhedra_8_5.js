import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Polyhedra_8_5() {
  
  const SolidDetail = ({ name, faces, icon = "rhombus-outline" }) => (
    <View style={styles.solidCard}>
      <MaterialCommunityIcons name={icon} size={22} color="#7C3AED" />
      <View style={styles.solidInfo}>
        <Text style={styles.solidName}>{name}</Text>
        <Text style={styles.solidFaces}>{faces}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.5</Text>
          <Text style={styles.topicTitle}>Polyhedra</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Polyhedra are three-dimensional solids used in both geometry and discrete mathematics. These shapes consist of flat polygonal faces with straight edges and sharp vertices. They offer a way to explore space, structure, and symmetry."}
          </Text>
        </View>

        {/* SECTION 1: WHAT IS A POLYHEDRON */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is a Polyhedron?</Text>
          <Text style={styles.paragraph}>
            {"A polyhedron is a 3D shape with flat faces, each being a polygon. Faces meet along edges, and edges connect at vertices. In discrete mathematics, we focus on convex and regular polyhedra."}
          </Text>

          <View style={styles.detailBox}>
            <Text style={styles.bold}>{"Convex Polyhedra: "}</Text>
            <Text style={styles.paragraph}>{"A polyhedron is convex if any line segment drawn between two points within it stays entirely inside. It does not \"bend inwards\"."}</Text>
            
            <Text style={styles.bold}>{"Regular Polyhedra: "}</Text>
            <Text style={styles.paragraph}>{"When each face is identical and every vertex connects the same number of edges. These are known as Platonic solids."}</Text>
          </View>
        </View>

        {/* SECTION 2: THE FIVE PLATONIC SOLIDS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>The Five Platonic Solids</Text>
          <Text style={styles.paragraph}>
            {"These are special because they are the only convex polyhedra where each face is the same polygon and each vertex joins the same number of faces."}
          </Text>

          <View style={styles.solidGrid}>
            <SolidDetail name="Tetrahedron" faces="4 triangular faces" />
            <SolidDetail name="Cube (Hexahedron)" faces="6 square faces" icon="cube-outline" />
            <SolidDetail name="Octahedron" faces="8 triangular faces" />
            <SolidDetail name="Dodecahedron" faces="12 pentagonal faces" />
            <SolidDetail name="Icosahedron" faces="20 triangular faces" />
          </View>
        </View>

        {/* SECTION 3: EULER'S FORMULA */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="variable" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginBottom: 0, marginLeft: 10}]}>Euler's Formula</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Euler's formula connects the number of vertices, edges, and faces of any convex polyhedron."}
          </Text>

          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>{"v \u2212 e + f = 2"}</Text>
            <Text style={styles.formulaSub}>{"v: vertices | e: edges | f: faces"}</Text>
          </View>

          <View style={styles.verificationBox}>
            <Text style={styles.bold}>{"Verification (Cube):"}</Text>
            <Text style={styles.paragraph}>{"8 vertices, 12 edges, 6 faces:"}</Text>
            <Text style={styles.mathResult}>{"8 \u2212 12 + 6 = 2"}</Text>
            <Text style={styles.italicText}>{"The formula holds even if projected onto a 2D plane."}</Text>
          </View>
        </View>

        {/* SECTION 4: IMPOSSIBLE STRUCTURES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Possible vs. Impossible</Text>
          <View style={styles.impossibleBox}>
            <Text style={styles.bold}>{"Example: 3 Triangles & 6 Pentagons?"}</Text>
            <Text style={styles.stepText}>{"\u2022 Triangles: 3 \u00d7 3 = 9 edges"}</Text>
            <Text style={styles.stepText}>{"\u2022 Pentagons: 6 \u00d7 5 = 30 edges"}</Text>
            <Text style={styles.stepText}>{"\u2022 Total: (9 + 30) / 2 = 19.5 edges"}</Text>
            <Text style={styles.errorText}>{"Fractional results are physically impossible; no such solid exists."}</Text>
          </View>
        </View>

        {/* SECTION 5: GRAPH THEORY RELATIONSHIP */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Polyhedra and Graph Theory</Text>
          <Text style={styles.paragraph}>
            {"A polyhedron can be represented as a graph where vertices correspond to nodes, edges to connections, and faces to regions. Each polyhedron projected onto a plane forms a planar graph."}
          </Text>
        </View>

        {/* SECTION 6: APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications</Text>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="molecule" size={20} color="#475569" />
            <Text style={styles.appText}>{"Molecular Structure: atoms grouping in regular patterns."}</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="symmetry" size={20} color="#475569" />
            <Text style={styles.appText}>{"Crystallography: revealing natural symmetry."}</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="crane" size={20} color="#475569" />
            <Text style={styles.appText}>{"Architecture: stable frameworks using tetrahedrons."}</Text>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"We explained the concepts of convex and regular polyhedra, analyzed the five Platonic solids using Euler's formula, and explored the relationship between 3D projections and planar graphs."}
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
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center' },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  detailBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  solidGrid: { marginTop: 10 },
  solidCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F3FF', padding: 12, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#DDD6FE' },
  solidInfo: { marginLeft: 12 },
  solidName: { fontWeight: '800', color: '#5B21B6', fontSize: 14 },
  solidFaces: { fontSize: 12, color: '#7C3AED' },
  formulaBox: { backgroundColor: '#0F172A', borderRadius: 20, padding: 25, alignItems: 'center', marginVertical: 15 },
  formulaText: { color: '#38BDF8', fontSize: 26, fontWeight: 'bold', fontFamily: 'monospace' },
  formulaSub: { color: '#94A3B8', fontSize: 12, marginTop: 10, fontFamily: 'monospace' },
  verificationBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 10 },
  mathResult: { fontSize: 18, fontWeight: 'bold', color: '#0369A1', textAlign: 'center', marginVertical: 8, fontFamily: 'monospace' },
  italicText: { fontStyle: 'italic', color: '#64748B', fontSize: 13 },
  impossibleBox: { backgroundColor: '#FFF5F5', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#FEE2E2' },
  stepText: { color: '#7F1D1D', fontSize: 13, marginBottom: 4, fontFamily: 'monospace' },
  errorText: { color: '#B91C1C', fontWeight: 'bold', fontSize: 14, marginTop: 8 },
  appRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  appText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#475569', lineHeight: 20 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});