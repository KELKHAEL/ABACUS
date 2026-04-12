import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
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
            {"Non-planar graphs in graph theory are special type of graphs that cannot be drawn on a paper without intersecting the edges. Planar graphs can be drawn on a plane while non-planar graphs are the exact opposite of them. These graphs offer an insight into the practical and theoretical aspects of graph theory."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will cover the basics of non-planar graphs, check some famous examples, and understand the proofs and reasoning behind non-planarity."}
          </Text>
        </View>

        {/* SECTION 1: DEFINITION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is a Non-Planar Graph?</Text>
          <Text style={styles.paragraph}>
            {"A non-planar graph is a graph that cannot be drawn on a plane without at least some of its edges crossing. In a planar graph, we can always find a way to redraw it. It may be complex but there is a way. But in a non-planar graph, this is simply impossible."}
          </Text>
          <Text style={styles.paragraph}>{"Take a look at the following example \u2212"}</Text>
          
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/non1.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>
        </View>

        {/* SECTION 2: RECOGNIZING NON-PLANAR GRAPHS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Recognizing Non-Planar Graphs</Text>
          <Text style={styles.paragraph}>
            {"To recognize a non-planar graph, we usually apply two key approaches \u2212"}
          </Text>

          <View style={styles.infoHighlight}>
            <Text style={styles.bold}>{"Redrawing Attempts \u2212 "}</Text>
            <Text style={styles.highlightText}>{"By trying to arrange the graph in various ways and seeing if we can avoid edge crossings. If we fail, the graph is likely non-planar. But this method is taking exhaustive searching. So the next theorem based method comes."}</Text>
          </View>
          <View style={styles.infoHighlight}>
            <Text style={styles.bold}>{"Applying Theorems \u2212 "}</Text>
            <Text style={styles.highlightText}>{"There are some theorems, like Kuratowski’s theorem. It provides conditions that let us determine non-planarity without redrawing."}</Text>
          </View>
          
          <Text style={styles.paragraph}>
            {"Non-planar graphs are not only a theoretical concept. They appear in real-world problems like designing circuits, where pathways cannot overlap, or in networks where certain connections must remain separate. Understanding non-planar graphs helps to understand these problems and avoid potential \"crossing conflicts.\""}
          </Text>
        </View>

        {/* SECTION 3: CLASSIC EXAMPLES & K5 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Classic Examples of Non-Planar Graphs</Text>
          <Text style={styles.paragraph}>{"There are two famous examples of non-planar graphs \u2212"}</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>{"\u2022 The complete graph K\u2085"}</Text>
            <Text style={styles.bulletItem}>{"\u2022 The complete bipartite graph K\u2083,\u2083"}</Text>
          </View>
          <Text style={styles.paragraph}>
            {"These graphs not only illustrate the concept of non-planarity but also show the mathematical methods used to prove non-planarity."}
          </Text>

          <Text style={styles.subLabel}>The Complete Graph K\u2085</Text>
          <Text style={styles.paragraph}>
            {"The complete graph K\u2085 includes five vertices. Here each connected to every other vertex. They are resulting in ten edges. They can be called as \"complete\" because it contains all possible edges between the vertices. It makes K\u2085 non-planar \u2212"}
          </Text>
          
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/non2.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>

          <Text style={styles.paragraph}>
            {"If we try drawing K\u2085 on paper, we will notice that some edges have to cross. No matter how we arrange the vertices or redraw the edges, at least one edge will always overlap another. But this claim can also be proven formally."}
          </Text>

          <View style={styles.proofBox}>
            <Text style={styles.proofTitle}>Proof of Non-Planarity in K\u2085</Text>
            <Text style={styles.stepText}>{"To prove K\u2085 is non-planar, we assume for a moment that it could be planar. If K\u2085 were planar, it would satisfy Euler\u2019s formula for planar graphs, which states \u2212"}</Text>
            <Text style={styles.monoMathCenter}>{"v \u2212 e + f = 2"}</Text>
            <Text style={styles.stepText}>{"where \u2212\n\u2022 v is the number of vertices,\n\u2022 e is the number of edges,\n\u2022 f is the number of faces."}</Text>
            <Text style={styles.stepText}>{"For K\u2085, we have: v = 5 and e = 10."}</Text>
            <Text style={styles.stepText}>{"Plugging these into Euler's formula, we get \u2212"}</Text>
            <Text style={styles.monoMathCenter}>{"5 \u2212 10 + f = 2 \u21d2 f = 7"}</Text>
            <Text style={styles.stepText}>{"This means that if K\u2085 were planar, it would have seven faces. But, another condition of planar graphs states that the total number of edges around all faces (if that is B), then it must meet certain requirements \u2212"}</Text>
            <Text style={styles.stepText}>{"\u2022 Each face needs at least three edges around it, so B \u2265 3f"}</Text>
            <Text style={styles.stepText}>{"\u2022 Since each edge borders two faces, B = 2e."}</Text>
            <Text style={styles.stepText}>{"Given that e = 10, we find B = 2 \u00d7 10 = 20."}</Text>
            <Text style={styles.stepText}>{"To satisfy B \u2265 3f, we need \u2212"}</Text>
            <Text style={styles.monoMathCenter}>{"20 \u2265 3 \u00d7 7 = 21"}</Text>
            <Text style={styles.resultText}>{"This inequality doesn't hold. So it proves that K\u2085 cannot be planar."}</Text>
          </View>
        </View>

        {/* SECTION 4: COMPLETE BIPARTITE GRAPH K3,3 */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>The Complete Bipartite Graph K\u2083,\u2083</Text>
          <Text style={styles.paragraph}>
            {"Another classic example of a non-planar graph is the complete bipartite graph K\u2083,\u2083. This graph has two sets of vertices, each with three vertices. Every vertex in one set connects to every vertex in the other set, forming a bipartite structure."}
          </Text>
          <Text style={styles.paragraph}>
            {"In real life, K\u2083,\u2083 can be visualized as the \"three houses and three utilities problem,\" where three houses need connections to three utilities without any lines crossing. It may look simple in words, but we cannot get it done because it is impossible to solve without crossings!"}
          </Text>

          <View style={styles.imageContainer}>
            <Image source={require('../../assets/moduleImages/non3.jpg')} style={styles.imageBox} resizeMode="contain" />
          </View>

          <View style={[styles.proofBox, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderLeftColor: '#0369A1' }]}>
            <Text style={[styles.proofTitle, { color: '#0369A1' }]}>Proof of Non-Planarity in K\u2083,\u2083</Text>
            <Text style={styles.stepText}>{"The proof for K\u2083,\u2083 is similar to that of K\u2085. We are using again on Euler\u2019s formula and boundary conditions:"}</Text>
            <Text style={styles.stepText}>{"\u2022 Assume Planarity \u2212 Suppose K\u2083,\u2083 could be drawn without any edges crossing."}</Text>
            <Text style={styles.stepText}>{"\u2022 Apply Euler's Formula \u2212 For K\u2083,\u2083, we have \u2212 v = 6, e = 9."}</Text>
            <Text style={styles.stepText}>{"Using Euler's formula, we calculate \u2212"}</Text>
            <Text style={[styles.monoMathCenter, { color: '#0369A1' }]}>{"6 \u2212 9 + f = 2 \u21d2 f = 5"}</Text>
            <Text style={styles.stepText}>{"So, if K\u2083,\u2083 were planar, it would have five faces."}</Text>
            <Text style={styles.stepText}>{"Boundaries Around Faces: Each face in K\u2083,\u2083 needs at least four edges (as there are no three-edge cycles in bipartite graphs), we set up the condition \u2212"}</Text>
            <Text style={styles.stepText}>{"\u2022 B \u2265 4f"}</Text>
            <Text style={styles.stepText}>{"\u2022 B = 2e"}</Text>
            <Text style={styles.stepText}>{"With e = 9, B = 2 \u00d7 9 = 18. For B \u2265 4f, we get \u2212"}</Text>
            <Text style={[styles.monoMathCenter, { color: '#0369A1' }]}>{"18 \u2265 4 \u00d7 5 = 20"}</Text>
            <Text style={[styles.resultText, { color: '#0369A1' }]}>{"This inequality fails, and it proves that K\u2083,\u2083 cannot be planar."}</Text>
          </View>
          
          <Text style={styles.subLabel}>Comparing K\u2085 and K\u2083,\u2083</Text>
          <Text style={styles.paragraph}>
            {"While both K\u2085 and K\u2083,\u2083 are non-planar, their structures are different. K\u2085 is a complete graph where every vertex connects to every other vertex, creating dense connections."}
          </Text>
          <Text style={styles.paragraph}>
            {"In contrast, K\u2083,\u2083 is a complete bipartite graph, dividing vertices into two groups where each vertex in one group connects to each vertex in the other group. These differences makes the various types of complexity which lead to non-planarity."}
          </Text>
        </View>

        {/* SECTION 5: APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications of Non-Planar Graphs</Text>
          <Text style={styles.paragraph}>
            {"Non-planar graphs have several practical applications in fields where we need to draw elaborate layouts, some of which are listed below \u2212"}
          </Text>
          <AppCard 
            icon="chip" 
            title="Circuit Design" 
            content="In designing circuits on a chip, we aim to place wires without intersections to avoid interference. So recognizing non-planar layouts helps to prevent design errors and makes circuits more efficient." 
          />
          <AppCard 
            icon="transit-connection-variant" 
            title="Network Routing" 
            content="Non-planar graphs can also be used to model complex networks like transportation grids or communication systems, where certain routes should avoid crossing paths to maintain efficiency and reduce congestion." 
          />
          <AppCard 
            icon="cube-outline" 
            title="3D Modeling and Geometry" 
            content="For 3D modelling non-planar concepts apply to three-dimensional polyhedra and spatial structures. These are used in understanding of polyhedral properties and projections." 
          />
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we covered the basics of non-planar graphs. We checked the classic examples like K\u2085 and K\u2083,\u2083, and understood the proofs showing their non-planarity."}
          </Text>
          <Text style={styles.paragraph}>
            {"We saw that non-planar graphs cannot be drawn on a plane without crossing edges. With Euler's formula and boundary conditions, we understood why certain graphs fail to be planar."}
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
  subLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 15, marginBottom: 10, letterSpacing: 0.5 },
  bold: { fontWeight: '800', color: '#0F172A' },
  infoHighlight: { backgroundColor: '#F8FAFC', padding: 14, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#94A3B8', marginBottom: 12 },
  highlightText: { color: '#475569', fontSize: 14, lineHeight: 22, marginTop: 4 },
  bulletList: { paddingLeft: 10, marginBottom: 15 },
  bulletItem: { fontSize: 15, color: '#475569', marginBottom: 6, lineHeight: 22 },
  proofBox: { backgroundColor: '#FFF5F5', padding: 20, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#EF4444', marginVertical: 15, borderWidth: 1, borderColor: '#FEE2E2' },
  proofTitle: { fontWeight: '800', color: '#B91C1C', fontSize: 15, marginBottom: 12 },
  stepText: { color: '#475569', fontSize: 14, lineHeight: 22, marginBottom: 8 },
  monoMathCenter: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#B91C1C', textAlign: 'center', marginVertical: 10 },
  resultText: { fontWeight: 'bold', color: '#B91C1C', fontSize: 14, textAlign: 'center', marginTop: 10 },
  appCard: { backgroundColor: '#F8FAFC', padding: 18, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  appTitle: { fontWeight: '800', color: '#1E293B', fontSize: 15, marginLeft: 10 },
  appContent: { color: '#64748B', fontSize: 14, lineHeight: 22, textAlign: 'justify' },
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  imageBox: { width: '100%', height: 220 }
});