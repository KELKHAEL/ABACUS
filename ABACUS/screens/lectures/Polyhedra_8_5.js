import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Polyhedra_8_5() {
  
  // Custom Component for Platonic Solids with Large Images
  const SolidDetail = ({ name, faces, imageSource }) => (
    <View style={styles.largeSolidCard}>
      <Text style={styles.largeSolidName}>{name}</Text>
      <Text style={styles.largeSolidFaces}>{faces}</Text>
      <View style={styles.largeSolidImageContainer}>
        <Image source={imageSource} style={styles.largeSolidImage} resizeMode="contain" />
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
            {"Polyhedra are three-dimensional solids that are used in both geometry and discrete mathematics. These shapes are flat polygonal faces with straight edges and sharp vertices. Polyhedra are special shapes and they offer a way to explore the properties of space, structure, and symmetry."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will see the basics of polyhedra and understand some of its most well-known types."}
          </Text>
        </View>

        {/* SECTION 1: WHAT IS A POLYHEDRON */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is a Polyhedron?</Text>
          <Text style={styles.paragraph}>
            {"A polyhedron is a three-dimensional shape with flat faces. Each one being a polygon. Every face meets other faces along edges, and these edges connect at vertices. We can see polyhedra all around us, from dice to crystals. They provide practical examples of geometrical and mathematical concepts."}
          </Text>
          <Text style={styles.paragraph}>
            {"In discrete mathematics, we focus on the structure and properties of polyhedral. Our major focus is on convex and regular polyhedra."}
          </Text>

          <View style={styles.detailBox}>
            <Text style={styles.boldLabel}>{"Convex Polyhedra"}</Text>
            <Text style={styles.paragraph}>
              {"A polyhedron is convex if any line segment drawn between two points within it stays entirely inside the polyhedron. Like cube or a pyramid. Any line we draw from one point inside to another point inside will not leave the shape."}
            </Text>
            <Text style={styles.paragraph}>
              {"A convex polyhedron is simpler to analyze because it does not \"bend inwards\". They are useful in making calculations and theoretical explorations more straightforward."}
            </Text>
            
            <View style={styles.divider} />

            <Text style={styles.boldLabel}>{"Regular Polyhedra"}</Text>
            <Text style={styles.paragraph}>
              {"When each face of a polyhedron is identical and every vertex connects the same number of edges, we call it a regular polyhedron."}
            </Text>
            <Text style={styles.paragraph}>
              {"In fact, there are only five polyhedra that fit this exact definition. These are the Platonic solids."}
            </Text>
            <Text style={styles.paragraph}>
              {"Each Platonic solid has faces that are regular polygons (like triangles or squares), and each vertex joins the same number of faces. Let us see these five unique shapes."}
            </Text>
          </View>
        </View>

        {/* SECTION 2: THE FIVE PLATONIC SOLIDS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>The Five Platonic Solids</Text>
          <Text style={styles.paragraph}>{"The five Platonic solids are \u2212"}</Text>

          <View style={styles.solidList}>
            <SolidDetail name="Tetrahedron" faces="4 triangular faces" imageSource={require('../../assets/moduleImages/pol1.jpg')} />
            <SolidDetail name="Cube (or Hexahedron)" faces="6 square faces" imageSource={require('../../assets/moduleImages/pol2.jpg')} />
            <SolidDetail name="Octahedron" faces="8 triangular faces" imageSource={require('../../assets/moduleImages/pol3.jpg')} />
            <SolidDetail name="Dodecahedron" faces="12 pentagonal faces" imageSource={require('../../assets/moduleImages/pol4.jpg')} />
            <SolidDetail name="Icosahedron" faces="20 triangular faces" imageSource={require('../../assets/moduleImages/pol5.jpg')} />
          </View>

          <Text style={styles.paragraph}>
            {"These shapes are special because they are the only convex polyhedra where each face is the same polygon and each vertex joins the same number of faces. The symmetry and regularity of Platonic solids make them important in both math and nature. It may think of how molecules form or how crystals grow."}
          </Text>
        </View>

        {/* SECTION 3: EULER'S FORMULA */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Eulers Formula for Polyhedra</Text>
          <Text style={styles.paragraph}>
            {"The Eulers formula is a simple yet powerful equation that connects the number of vertices, edges, and faces of a polyhedron."}
          </Text>
          <Text style={styles.paragraph}>{"For any convex polyhedron, Eulers formula states \u2212"}</Text>

          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>{"v \u2212 e + f = 2"}</Text>
            <View style={styles.formulaLegend}>
              <Text style={styles.legendItem}>{"\u2022 v is the number of vertices"}</Text>
              <Text style={styles.legendItem}>{"\u2022 e is the number of edges"}</Text>
              <Text style={styles.legendItem}>{"\u2022 f is the number of faces"}</Text>
            </View>
          </View>

          <Text style={styles.subLabel}>Applying Euler's Formula</Text>
          <Text style={styles.paragraph}>{"To see how Euler's formula works, let us see it to a familiar shape: the cube."}</Text>
          <Text style={styles.paragraph}>{"A cube has 8 vertices, 12 edges, and 6 faces."}</Text>
          <Text style={styles.paragraph}>{"Plugging these values into Euler's formula \u2212"}</Text>
          
          <View style={styles.calculationBox}>
            <Text style={styles.monoMath}>{"8 \u2212 12 + 6 = 2"}</Text>
          </View>

          <Text style={styles.paragraph}>
            {"Eulers formula is holding. This formula provides a reliable way to check the structure of any convex polyhedron and applies to each of the five Platonic solids."}
          </Text>

          <Text style={styles.subLabel}>How Does Eulers Formula Work?</Text>
          <Text style={styles.paragraph}>
            {"The Eulers formula reflects the topological nature of convex polyhedra. Even if we project a polyhedron onto a two-dimensional plane, the formula holds."}
          </Text>
          <Text style={styles.paragraph}>
            {"Consider wrapping a polyhedron in a sphere, then stretching it out flat. The Eulers formula still applies because it captures the relationships among vertices, edges, and faces."}
          </Text>
        </View>

        {/* SECTION 4: EXAMPLES AND EXPLORATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Examples and Explorations with Polyhedra</Text>
          <Text style={styles.paragraph}>
            {"Let us see some examples to see how Eulers formula and other properties apply to different types of polyhedra."}
          </Text>

          {/* Example 1 */}
          <View style={styles.exampleBlock}>
            <Text style={styles.boldLabel}>Example 1: The Octahedron</Text>
            <Text style={styles.paragraph}>{"Take a look at the following polyhedron \u2212"}</Text>
            
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/moduleImages/pol6.jpg')} style={styles.polyImage} resizeMode="contain" />
            </View>

            <Text style={styles.paragraph}>{"The octahedron has:\nVertices (v): 6,\nEdges (e): 12,\nFaces (f): 8."}</Text>
            <Text style={styles.paragraph}>{"Using Euler's formula, we confirm \u2212"}</Text>
            <Text style={styles.mathCenter}>{"6 \u2212 12 + 8 = 2"}</Text>
            <Text style={styles.paragraph}>
              {"So the octahedron has triangular faces, and each vertex connects four edges. It is forming a highly symmetrical shape. In fact, an octahedron has the same number of edges as a cube. The difference is in how these edges and faces are arranged. It is showing the diverse forms polyhedra which can take even when they share the same edge count."}
            </Text>
          </View>

          {/* Example 2 */}
          <View style={styles.exampleBlock}>
            <Text style={styles.boldLabel}>Example 2: Is There a Polyhedron with Three Triangles and Six Pentagons?</Text>
            <Text style={styles.paragraph}>
              {"Imagine we want to know if we can make a polyhedron made of three triangles and six pentagons. To figure this out, we can use edge calculations."}
            </Text>
            <Text style={styles.paragraph}>
              {"The triangles will give a total of 9 edges, and the pentagons would contribute 30 edges."}
            </Text>
            <Text style={styles.paragraph}>
              {"Each edge, however, would be counted twice (since each edge borders two faces). This gives a total of (9 + 30) / 2 = 19.5 edges."}
            </Text>
            <Text style={[styles.paragraph, styles.errorText]}>
              {"This fractional result makes no sense in a physical object, so no such polyhedron could exist."}
            </Text>
          </View>

          {/* Example 3 */}
          <View style={styles.exampleBlock}>
            <Text style={styles.boldLabel}>Example 3: Another Hypothetical Polyhedron with Additional Faces</Text>
            <Text style={styles.paragraph}>
              {"Consider we try adding five heptagonal faces (7-sided polygons) to the structure in Example 2."}
            </Text>
            <Text style={styles.paragraph}>
              {"We have three triangles, six pentagons, and five heptagons. The triangles contribute 9 edges, the pentagons 30, and the heptagons 35 edges."}
            </Text>
            <Text style={styles.paragraph}>
              {"Dividing by 2 again, we find the total number of edges would be (9 + 30 + 35) / 2 = 37, which can theoretically work."}
            </Text>
            <Text style={[styles.paragraph, styles.errorText]}>
              {"However, when we apply Euler's formula, we discover that, while the edge count fits, other vertex requirements cannot be met due to the degree constraints at each vertex. So such a polyhedron is impossible to construct."}
            </Text>
          </View>
        </View>

        {/* SECTION 5: GRAPH THEORY & PROJECTIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Polyhedra and Graph Theory</Text>
          <Text style={styles.paragraph}>
            {"In graph theory, a polyhedron can be represented as a graph. Here vertices, edges, and faces correspond to graph nodes, connections, and regions respectively. This relationship allows mathematicians to study polyhedra using planar graphs."}
          </Text>

          <Text style={styles.subLabel}>Projecting Polyhedra onto a Plane</Text>
          <Text style={styles.paragraph}>
            {"Each polyhedron can be projected onto a plane, and it is a planar graph. This projection gives a graph representation that maintains the relationships among vertices, edges, and faces."}
          </Text>
          <Text style={styles.paragraph}>
            {"For example, a cube can be drawn as a network of vertices and edges on a plane, showing how polyhedra relate to planar graph structures."}
          </Text>
        </View>

        {/* SECTION 6: APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications of Polyhedra</Text>
          <Text style={styles.paragraph}>
            {"Polyhedra is showing up in various areas of science. From biology to architecture. There are a few applications where polyhedra play a role \u2212"}
          </Text>

          <View style={styles.appRow}>
            <MaterialCommunityIcons name="molecule" size={22} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Molecular Structure \u2212</Text> Polyhedral shapes appear in molecular formations, where atoms group in regular patterns, like in carbon molecules.</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="diamond-stone" size={22} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Crystallography \u2212</Text> Many crystals form polyhedral structures, revealing natural symmetry.</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="office-building-outline" size={22} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Architecture \u2212</Text> In construction, polyhedral shapes, especially tetrahedrons and octahedrons, are used to create strong, stable frameworks.</Text>
          </View>
          
          <Text style={styles.paragraph}>
            {"Polyhedra is used to understand and apply geometric principles in real-world contexts."}
          </Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we explained the basic concepts of polyhedra and considered its key types such as convex and regular polyhedra."}
          </Text>
          <Text style={styles.paragraph}>
            {"The five Platonic solids are unique due to their regularity and symmetry. We applied Eulers formula to analyze their properties and used graph theory concepts to project polyhedra onto a plane. Additionally, we demonstrated why only five Platonic solids exist. Through examples, we explored both possible and impossible polyhedral structures."}
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
  
  detailBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 10 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  
  solidList: { marginTop: 10, marginBottom: 15 },
  largeSolidCard: { backgroundColor: '#F5F3FF', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#DDD6FE', alignItems: 'center' },
  largeSolidName: { fontSize: 18, fontWeight: '900', color: '#5B21B6', marginBottom: 4, textAlign: 'center', letterSpacing: 0.5 },
  largeSolidFaces: { fontSize: 14, color: '#7C3AED', marginBottom: 15, textAlign: 'center', fontStyle: 'italic' },
  largeSolidImageContainer: { width: '100%', height: 160, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  largeSolidImage: { width: '100%', height: '100%' },
  
  formulaBox: { backgroundColor: '#0F172A', borderRadius: 20, padding: 25, alignItems: 'center', marginVertical: 15 },
  formulaText: { color: '#38BDF8', fontSize: 26, fontWeight: 'bold', fontFamily: 'monospace' },
  formulaLegend: { marginTop: 15, alignSelf: 'flex-start' },
  legendItem: { color: '#94A3B8', fontSize: 14, marginBottom: 6, fontFamily: 'monospace' },
  
  calculationBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginVertical: 10, borderWidth: 1, borderColor: '#BAE6FD', alignItems: 'center' },
  monoMath: { fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold', color: '#0369A1' },
  
  exampleBlock: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  polyImage: { width: '100%', height: 180 },
  mathCenter: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#16941c', textAlign: 'center', marginVertical: 10 },
  errorText: { color: '#B91C1C', fontWeight: 'bold', fontStyle: 'italic' },
  
  appRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15, backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD' },
  appText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#0369A1', lineHeight: 22 },
});