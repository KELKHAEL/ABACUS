import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
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
          
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/planar1.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>
          
          <Text style={styles.paragraph}>
            {"Here we have 4 vertices and they have no intersecting edges so it is a planer graph."}
          </Text>
        </View>

        {/* SECTION 2: DRAWING PLANAR GRAPHS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Drawing Planar Graphs</Text>
          <Text style={styles.paragraph}>
            {"For a graph to be planar, we must draw it in a way that it prevents edges from crossing each other. So, sometimes a graph may look non-planar initially, but with careful redrawing, it can be made planar."}
          </Text>
          <Text style={styles.paragraph}>
            {"Let us understand this concept with a simple example. Take a look at the following graph."}
          </Text>

          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/planar2.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>
          
          <Text style={styles.paragraph}>
            {"It is a graph with 5 vertices and 6 edges. It is not a planar graph because it has two edges AD and BC which are intersecting each other."}
          </Text>
          <Text style={styles.paragraph}>
            {"Let's now draw the same graph in a different way; like the one shown below \u2212"}
          </Text>

          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/planar3.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>

          <Text style={styles.paragraph}>
            {"Observe that it is the same graph but its vertex D is now placed outside and it has now transformed into a planer graph."}
          </Text>

          <Text style={styles.paragraph}>
            {"Let us now take a look at a non-planar graph \u2212"}
          </Text>

          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/planar4.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>

          <Text style={styles.paragraph}>
            {"Wherever we might try to place the vertex E, it will never become a planar graph."}
          </Text>
        </View>

        {/* SECTION 3: FACES IN PLANAR GRAPHS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Faces in Planar Graphs</Text>
          <Text style={styles.paragraph}>
            {"A planar graph can be successfully drawn without any crossing edges. The edges and vertices naturally split the plane into regions, or faces. As we know, one of these regions will always be the \"outside\" of the graph, forming a boundary that encircles everything else."}
          </Text>
          
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/planar5.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>
        </View>

        {/* SECTION 4: EULERS FORMULA */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="calculator-variant-outline" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginBottom: 0}]}>Eulers Formula: A Key Concept in Planar Graphs</Text>
          </View>
          <Text style={styles.paragraph}>
            {"When we are talking about planar graphs, we must follow the Eulers formula. This is much useful to relate the vertices, edges, and faces of any connected planar graph."}
          </Text>
          
          <Text style={styles.paragraph}>{"For any planar graph, the Eulers formula states \u2212"}</Text>
          
          <View style={styles.formulaHighlight}>
            <Text style={styles.mainFormula}>{"v \u2212 e + f = 2"}</Text>
            <View style={styles.formulaLegend}>
              <Text style={styles.legendItem}>{"\u2022 v is the number of vertices,"}</Text>
              <Text style={styles.legendItem}>{"\u2022 e is the number of edges,"}</Text>
              <Text style={styles.legendItem}>{"\u2022 f is the number of faces."}</Text>
            </View>
          </View>

          <Text style={styles.subLabel}>Applying Eulers Formula</Text>
          <Text style={styles.paragraph}>
            {"Consider the previous example with faces. We have 5 vertices, 6 edges and 3 faces. If we plug them into the formula, it will become \u2212"}
          </Text>
          
          <View style={styles.calculationBox}>
            <Text style={styles.monoMath}>{"5 \u2212 6 + 3 = 2"}</Text>
          </View>

          <Text style={styles.paragraph}>
            {"This verifies that Eulers formula holds. For any connected planar graph, whether simple or complex, the values of vertices, edges, and faces will satisfy this equation."}
          </Text>
          <Text style={styles.paragraph}>
            {"The Eulers formula is true regardless of the arrangement of vertices or edges for a connected planar graph. Even if we add extra vertices and edges, as long as the graph can be redrawn without any edge intersections, it will continue to satisfy the Eulers formula."}
          </Text>
        </View>

        {/* SECTION 5: NON-PLANAR GRAPHS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="close-circle-outline" size={24} color="#EF4444" />
            <Text style={[styles.sectionTitle, {color: '#EF4444', marginBottom: 0}]}>What are Non-Planar Graphs?</Text>
          </View>
          <Text style={styles.paragraph}>
            {"If a graph cannot be drawn on a plane, it belongs to the category of non-planar graphs. When there are too many edges for the number of vertices, it becomes impossible to draw the graph without intersecting edges."}
          </Text>
          <Text style={styles.paragraph}>
            {"A complex example like complete graphs K\u2085 (with 5 vertices) and the complete bipartite graph K\u2083,\u2083 are classic examples of non-planar graphs."}
          </Text>

          <Text style={styles.subLabel}>Example of Non-Planar Graphs</Text>
          <Text style={styles.paragraph}>
            {"The graph K\u2085 has 5 vertices connected to every other vertex. It has 10 edges. Euler's formula and additional conditions for planarity show that K\u2085 cannot be drawn without edges crossing. Similarly, the bipartite graph K\u2083,\u2083 consists of two sets of three vertices."}
          </Text>
          <Text style={styles.paragraph}>
            {"Every vertex from one set is connected to every vertex in the other. This setup is mathematically impossible to achieve on a plane without intersections."}
          </Text>

          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/planar6.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>
        </View>

        {/* SECTION 6: APPLICATIONS & POLYHEDRA */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications of Planar Graphs: Polyhedra and Beyond</Text>
          <Text style={styles.paragraph}>
            {"Planar graphs have a large variety of applications, particularly in geometry. For instance, they can be used to represent polyhedral. This is a three-dimensional solids with flat faces and straight edges."}
          </Text>
          <Text style={styles.paragraph}>
            {"When a polyhedron like a cube is projected onto a plane, it forms a planar graph. Here the vertices and edges of a cube satisfy Eulers formula. It has eight vertices, twelve edges, and six faces. We will see Polyhedra in detail in the next chapter."}
          </Text>

          <Text style={styles.subLabel}>Regular Polyhedra: The Five Platonic Solids</Text>
          <Text style={styles.paragraph}>
            {"The concept of polyhedra using planar graphs can be extended to the five regular polyhedral. They are also known as the Platonic solids. These solids are special because each face is an identical polygon. Every vertex connects the same number of edges."}
          </Text>
          <Text style={styles.paragraph}>
            {"The five regular polyhedra are \u2212"}
          </Text>

          <View style={styles.solidGrid}>
            <PlatonicSolid name="Tetrahedron" />
            <PlatonicSolid name="Cube" />
            <PlatonicSolid name="Octahedron" />
            <PlatonicSolid name="Dodecahedron" />
            <PlatonicSolid name="Icosahedron" />
          </View>
        </View>

        {/* SECTION 7: THEOREMS AND PROOFS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Theorems and Proofs in Planar Graph Theory</Text>
          <Text style={styles.paragraph}>
            {"Let us see some special proofs based on planar graphs."}
          </Text>

          <Text style={styles.subLabel}>Proving Non-Planarity: A Look at K\u2085 and K\u2083,\u2083</Text>
          <Text style={styles.paragraph}>
            {"Proofs for the non-planarity of graphs like K\u2085 and K\u2083,\u2083 often rely on logical contradiction. We may think of that the graph is planar, we can apply Euler’s formula, and find that certain required conditions cannot be met."}
          </Text>
          <Text style={styles.paragraph}>
            {"For instance, with K\u2085, if we assume planarity, we find that the number of edges surrounding the faces creates an impossible situation. This is proving that no planar representation exists."}
          </Text>
          
          <View style={styles.divider} />

          <Text style={styles.subLabel}>Girth and Boundaries in Planar Graphs</Text>
          <Text style={styles.paragraph}>
            {"In more complex cases, the concept of girth (the length of the shortest cycle in a graph) helps determine whether a graph is planar. By analyzing the boundaries surrounding the faces, one can establish whether a planar arrangement is impossible. If specific girth and boundary conditions are not met, the graph cannot be planar."}
          </Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we explained the concept of planar graphs. Starting with the basic definition and moving through fundamental concepts such as faces, we covered the Euler's formula and its applications in geometry. We also touched upon non-planar graphs to provide a clear understanding of why certain graphs cannot avoid edge intersections."}
          </Text>
          <Text style={styles.paragraph}>
            {"We covered how planar graphs relate to polyhedra and discovered how the properties of regular polyhedra like the Platonic solids reflect the principles of planar graph theory."}
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
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 14, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  subLabel: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginTop: 15, marginBottom: 12, letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 15 },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  imageBox: { width: '100%', height: 220 },

  formulaHighlight: { backgroundColor: '#0F172A', borderRadius: 20, padding: 25, alignItems: 'center', marginVertical: 15 },
  mainFormula: { color: '#38BDF8', fontSize: 26, fontWeight: 'bold', fontFamily: 'monospace' },
  formulaLegend: { marginTop: 15, alignSelf: 'flex-start' },
  legendItem: { color: '#94A3B8', fontSize: 14, marginBottom: 6, fontFamily: 'monospace' },
  
  calculationBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 10, marginBottom: 15, borderWidth: 1, borderColor: '#BAE6FD' },
  monoMath: { fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold', color: '#0369A1', textAlign: 'center', marginVertical: 8 },
  
  solidGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5 },
  solidBadge: { backgroundColor: '#F5F3FF', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD6FE' },
  solidText: { fontSize: 13, color: '#7C3AED', fontWeight: 'bold', marginLeft: 8 },
});