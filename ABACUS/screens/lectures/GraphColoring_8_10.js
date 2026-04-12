import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GraphColoring_8_10() {
  
  const ConflictRow = ({ classID, conflicts }) => (
    <View style={styles.conflictRow}>
      <View style={styles.classBadge}><Text style={styles.badgeText}>{classID}</Text></View>
      <MaterialCommunityIcons name="swap-horizontal" size={18} color="#EF4444" />
      <Text style={styles.conflictList}>{conflicts}</Text>
    </View>
  );

  const GraphImage = ({ source, height = 200 }) => (
    <View style={styles.imageContainer}>
      <Image source={source} style={[styles.graphImage, { height }]} resizeMode="contain" />
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
            Graph Coloring is an interesting area in Graph Theory that deals with how to efficiently assign colors to vertices in a graph under certain constraints. In this chapter, we will cover the basic concepts of graph coloring. We will understand through examples how Graph Coloring is applied in various scenarios.
          </Text>
          
          <Text style={styles.sectionTitle}>What is Graph Coloring?</Text>
          <Text style={styles.paragraph}>
            In simple terms, graph coloring is a problem where we assign colors to elements of a graph. The colors can be assigned on vertices or edges. When specific conditions are met, we can color them.
          </Text>
          <Text style={styles.paragraph}>
            Primarily, graph coloring is focused on the problem where no two adjacent vertices in a graph share the same color. So this is called the "proper coloring". The minimum number of colors needed to achieve this proper coloring is known as the chromatic number of the graph.
          </Text>
          
          <Text style={styles.paragraph}>Take a look at the following graph.</Text>
          <GraphImage source={require('../../assets/moduleImages/colo1.jpg')} height={180} />
          <Text style={styles.paragraph}>
            Here, we have 5 vertices and with three colors, we can color the graph. As we need 3 colors as minimum, so the chromatic number for this graph is 3.
          </Text>
          <Text style={styles.paragraph}>
            The concept of graph coloring came from real-world problems, like map coloring. Consider we are trying to color a map where no two adjacent countries share the same color. When we wish to use as few colors as possible. In graph theory terms, this problem can be rephrased into questions about the chromatic number of a graph. The regions of the map represented by vertices and shared borders by edges.
          </Text>
        </View>

        {/* VERTEX COLORING & CHROMATIC NUMBER */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Vertex Coloring and Chromatic Number</Text>
          <Text style={styles.paragraph}>
            In graph theory, a vertex coloring is the most famous way of coloring. If two vertices are connected by an edge, they are adjacent and cannot share the same color in a proper vertex coloring. The aim is to achieve a proper vertex coloring with the fewest possible colors.
          </Text>
          
          <View style={styles.chromaticBox}>
            <Text style={styles.chromaticTitle}>Chromatic Number of a Graph</Text>
            <Text style={styles.chromaticText}>
              The chromatic number of a graph G, is denoted as \u03c7(G). It is the smallest number of colors required to get a proper vertex coloring for the graph. For example, a simple graph with no edges (where no vertices are adjacent) has a chromatic number of 1 because all vertices can be the same color.
            </Text>
          </View>
        </View>

        {/* STRUCTURAL EXAMPLES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Example 1: Chromatic Number of Different Graphs</Text>
          <Text style={styles.paragraph}>Consider three graphs and see their coloring idea</Text>
          
          <Text style={styles.subLabel}>Graph K\u2086</Text>
          <Text style={styles.paragraph}>
            In this complete graph of 6 vertices, each vertex is connected to every other vertex. For that a proper vertex coloring, each vertex must have a unique color. So it will have chromatic number of K\u2086 equal to 6.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/colo2.jpg')} height={220} />
          <View style={styles.divider} />

          <Text style={styles.subLabel}>A Triangle Graph</Text>
          <Text style={styles.paragraph}>
            In a triangle (3 vertices each connected to the other two), three colors are needed because each vertex is adjacent to two others. The chromatic number here is 3.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/colo3.jpg')} height={180} />
          <View style={styles.divider} />

          <Text style={styles.subLabel}>Bipartite Graph K\u2082,\u2083</Text>
          <Text style={styles.paragraph}>
            This graph has two sets of vertices, each vertex in one set connected only to vertices in the other set. Here with only two colors (one for each set), we achieve a proper coloring, so the chromatic number is 2.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/colo4.jpg')} height={160} />
          
          <Text style={[styles.paragraph, {marginTop: 15}]}>
            These examples show that the chromatic number depends on the structure of the graph. So, complete graphs require as many colors as they have vertices, whereas bipartite graphs only need two colors.
          </Text>
        </View>

        {/* FOUR COLOR THEOREM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="map-outline" size={24} color="#16A34A" />
            <Text style={[styles.sectionTitle, {color: '#16A34A', marginLeft: 10, marginBottom: 0}]}>The Four-Color Theorem</Text>
          </View>
          <Text style={[styles.paragraph, {marginTop: 15}]}>
            One of the most famous results in graph theory is the Four Color Theorem. This theorem states that any planar graph (a graph that can be drawn on a plane without crossing edges) has a chromatic number of at most 4. So in practice, any map can be colored using no more than four colors. This is ensuring that no two adjacent regions have the same color.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/colo5.jpg')} height={240} />
          <Text style={styles.paragraph}>
            Here, it has 3 colors but that is less than 4.
          </Text>
        </View>

        {/* REAL WORLD APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Applications of Graph Coloring</Text>
          <Text style={styles.paragraph}>Let us see some practical instances where graph coloring is useful.</Text>

          <Text style={styles.subLabel}>Scheduling Problems</Text>
          <Text style={styles.paragraph}>
            In scheduling problems, we can use the idea of graph coloring. It can help determine time slots for events or classes so that conflicts do not arise. Think of a university setting where certain classes cannot be scheduled simultaneously due to shared resources or faculty. By creating a graph with classes as vertices and conflicts as edges, we can assign "colors" (time slots) to each class. We can ensure that no two conflicting classes share the same time.
          </Text>

          <View style={styles.conflictBox}>
            <Text style={[styles.subLabel, { color: '#B91C1C', marginTop: 0 }]}>Example of Classroom Scheduling</Text>
            <Text style={styles.paragraph}>Consider a list of classes and their conflicts:</Text>
            <ConflictRow classID="A" conflicts="conflicts with Classes D and I." />
            <ConflictRow classID="B" conflicts="conflicts with D, I, and J." />
            <ConflictRow classID="C" conflicts="conflicts with E, F, and I." />
            <Text style={[styles.paragraph, { marginTop: 10, marginBottom: 0 }]}>
              Representing these conflicts as a graph, each class is a vertex, and an edge connects two vertices if their classes conflict. The chromatic number in this graph would represent the minimum number of time slots needed to schedule all classes without any overlapping conflicts.
            </Text>
          </View>

          <Text style={styles.subLabel}>Frequency Assignment for Radio Stations</Text>
          <Text style={styles.paragraph}>
            Radio stations often use graph coloring to avoid frequency interference with nearby stations. Using graph coloring, we can represent each radio station as a vertex and an edge between two vertices if their frequencies would interfere due to proximity. The chromatic number here would represent the fewest frequencies required to ensure that no nearby stations share the same frequency.
          </Text>
        </View>

        {/* LIMITATIONS & ESTIMATION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Planar Graphs and Limitations of Chromatic Numbers</Text>
          <Text style={styles.paragraph}>
            As previously mentioned, the chromatic number of planar graphs is constrained by the Four Color Theorem. But, for graphs that are not planar, the chromatic numbers can be higher. The chromatic number can theoretically be unbounded in non-planar graphs. This is making graph coloring a challenge in complex networks.
          </Text>

          <Text style={styles.subLabel}>Example of Non-Planar Graph and Chromatic Number</Text>
          <Text style={styles.paragraph}>
            A complete graph K\u2085 (5 vertices all connected to each other) has a chromatic number of 5. This graph is not planar, as it cannot be drawn on a plane without crossing edges. Unlike planar graphs, K\u2085 requires five distinct colors.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Techniques for Estimating Chromatic Numbers</Text>
          <Text style={styles.paragraph}>Calculating the exact chromatic number can be challenging. We have certain methods to help to bound:</Text>

          <View style={styles.detailBox}>
            <Text style={styles.bold}>Clique Number \u2212</Text>
            <Text style={styles.paragraph}>A clique in a graph is a subset of vertices that are all adjacent. The largest clique size in a graph, called the clique number. This provides a lower bound for the chromatic number.</Text>
            
            <Text style={styles.bold}>Maximum Degree \u2212</Text>
            <Text style={styles.paragraph}>The maximum degree \u0394(G) of a vertex in a graph gives an upper bound for the chromatic number, with \u03c7(G) \u2264 \u0394(G) + 1.</Text>
          </View>
          
          <Text style={[styles.paragraph, { marginTop: 10 }]}>
            Graphs with chromatic numbers equal to their clique numbers are called <Text style={styles.bold}>perfect graphs</Text>. Identifying such graphs simplifies the process of finding the chromatic number.
          </Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            In this chapter, we explained the concept of graph coloring in discrete mathematics. Starting with the basic definitions, we understood how vertex coloring works and what the chromatic number represents.
          </Text>
          <Text style={styles.paragraph}>
            We looked into specific examples such as complete graphs, triangle graphs, and bipartite graphs to illustrate how chromatic numbers vary with graph structure. We also presented the famous Four Color Theorem and its significance in coloring planar graphs.
          </Text>
          <Text style={styles.paragraph}>
            We highlighted the practical applications of graph coloring in scheduling and frequency assignment. Furthermore, we understood the techniques for estimating chromatic numbers, including clique number and maximum degree.
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
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  subLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 15, marginBottom: 10, letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },

  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },

  chromaticBox: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#7C3AED', marginTop: 10 },
  chromaticTitle: { color: '#7C3AED', fontWeight: '800', fontSize: 16, marginBottom: 8 },
  chromaticText: { color: '#6D28D9', fontSize: 14, lineHeight: 22, textAlign: 'justify' },
  
  conflictBox: { backgroundColor: '#FFF5F5', padding: 16, borderRadius: 16, marginTop: 15, borderWidth: 1, borderColor: '#FEE2E2' },
  conflictRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  classBadge: { backgroundColor: '#B91C1C', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  conflictList: { color: '#7F1D1D', fontSize: 14, marginLeft: 10, flex: 1, lineHeight: 20 },
  
  detailBox: { backgroundColor: '#F1F5F9', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
});