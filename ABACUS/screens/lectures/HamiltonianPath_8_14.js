import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HamiltonianPaths_8_14() {
  
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
          <Text style={styles.topicSubtitle}>Module 8.14</Text>
          <Text style={styles.topicTitle}>Hamiltonian Path</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            The Hamiltonian path is a path that visits every vertex in a graph exactly once. This is named after the Irish mathematician Sir William Rowan Hamilton. The concept is quite useful in areas like circuit design, puzzle solving, and optimization in route planning.
          </Text>
          <Text style={styles.paragraph}>
            In this chapter, we will see the important concepts of Hamiltonian paths, including its definition, examples, and insights into finding them in graphs.
          </Text>
        </View>

        {/* HAMILTONIAN PATH */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Hamiltonian Path</Text>
          <Text style={styles.paragraph}>
            Hamiltonian path in a graph is just a path that passes through every vertex exactly once. This is not like Euler paths. These are concerned with traversing each edge.
          </Text>
          <Text style={styles.paragraph}>
            Hamiltonian paths focus on covering all the vertices. If we consider an example of visiting each city in a network map without revisiting any; a Hamiltonian path would represent the exact sequence of stops.
          </Text>

          <GraphImage source={require('../../assets/moduleImages/ham1.jpg')} height={200} />

          <View style={[styles.traceBox, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}>
            <Text style={[styles.traceText, { color: '#0369A1' }]}>The Hamiltonian path could be ADECB. We do not need to traverse all edges.</Text>
          </View>
        </View>

        {/* HAMILTONIAN CYCLE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Hamiltonian Cycle</Text>
          <Text style={styles.paragraph}>
            A Hamiltonian cycle (or Hamiltonian circuit) is similar to a Hamiltonian path but there is one crucial difference: it starts and ends at the same vertex. And it is forming a closed loop. If there is a route that lets we visit each location once and then return to the starting point, we have completed a Hamiltonian cycle.
          </Text>

          <GraphImage source={require('../../assets/moduleImages/ham2.jpg')} height={220} />

          <View style={[styles.traceBox, { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }]}>
            <Text style={[styles.traceText, { color: '#16A34A' }]}>For this, we can follow ABCDEA as the Hamiltonian cycle.</Text>
          </View>
        </View>

        {/* CONDITIONS AND PROPERTIES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conditions and Properties of Hamiltonian Paths and Cycles</Text>
          <Text style={styles.paragraph}>
            In the first impression, the Hamiltonian paths looks very simple. It does not have a simple rule like the degree-based conditions found in Euler paths. Here, the degree of each vertex can determine the existence of a path or circuit.
          </Text>
          <Text style={styles.paragraph}>
            The Hamiltonian paths depend on a variety of factors, like graph size, structure, and symmetry.
          </Text>

          <View style={styles.listContainer}>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Connected Graphs − </Text>For a graph where Hamiltonian path to exist, the graph must be connected; so that all vertices should be accessible.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Cycle-Friendly Structure − </Text>Graphs that are "cycle-friendly" (where cycles can naturally form) are often more likely to have Hamiltonian paths or cycles.
            </Text>
          </View>

          <GraphImage source={require('../../assets/moduleImages/ham3.jpg')} height={200} />
        </View>

        {/* COMPLEXITY */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="alert-decagram-outline" size={26} color="#EF4444" />
            <Text style={[styles.sectionTitle, { color: '#EF4444', marginBottom: 0, marginLeft: 10 }]}>Hamiltonian Graphs and Complexity</Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 15 }]}>
            A graph that has a Hamiltonian cycle is called a Hamiltonian graph. But checking these graphs is not such straightforward process. This is computationally hard. If the size grows this falls into a category known as NP-complete problems.
          </Text>
          <Text style={styles.paragraph}>
            So, as far as we know, there are no quick ways to find a solution. This complexity is why Hamiltonian paths are studied both theoretically and practically.
          </Text>
        </View>

        {/* EXAMPLES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Visual Examples</Text>
          
          <Text style={styles.subLabel}>Example 1: Simple Hamiltonian Path in a Graph</Text>
          <Text style={styles.paragraph}>
            Consider a simple linear graph with four vertices arranged in a line: A, B, C, and D. It is connected sequentially (A-B, B-C, and C-D).
          </Text>
          <GraphImage source={require('../../assets/moduleImages/ham4.jpg')} height={100} />
          <Text style={styles.paragraph}>
            Since the graph is a single line, there is a clear Hamiltonian path that starts at A, visits B, then C, and finally reaches D. This is covering all vertices exactly once. This graph has a Hamiltonian path (A to D) but not a Hamiltonian cycle because there is no way to return from D to A without retracing edges.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.subLabel}>Example 2: A Square Graph with a Hamiltonian Cycle</Text>
          <Text style={styles.paragraph}>
            Let us now take a square with vertices A, B, C, and D connected in a loop. Here, we can start at A, go to B, then C, then D, and finally return to A. This cycle covers each vertex once and ends at the starting point. This is forming a Hamiltonian cycle. This graph is a Hamiltonian graph since it has a Hamiltonian cycle.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/ham5.jpg')} height={160} />

          <View style={styles.divider} />

          <Text style={styles.subLabel}>Example 3: A Graph without a Hamiltonian Path</Text>
          <Text style={styles.paragraph}>
            Not all graphs allow for a Hamiltonian path. Consider a graph shaped like a "star," with a central vertex connected to multiple outer vertices. This structure has no way to visit each vertex exactly once. It is without missing or revisiting vertices, which makes a Hamiltonian path impossible.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/ham6.jpg')} height={180} />
        </View>

        {/* THE COMPLEXITY OF CHECKING PATHS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>The Complexity of Checking Paths</Text>
          <Text style={styles.paragraph}>
            Unlike Euler paths, where rules about vertex degree simplify finding paths. For Hamiltonian path, there is no straightforward test for Hamiltonian paths. As a result, identifying Hamiltonian paths or cycles can be time-consuming. This is like in large graphs. For small graphs, one might be able to manually test each possible route. But this method is impractical for anything substantial.
          </Text>
        </View>

        {/* APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Applications of Hamiltonian Path</Text>
          <Text style={styles.paragraph}>
            Hamiltonian paths has several real-world applications in many problems −
          </Text>
          <View style={styles.appBox}>
            <Text style={styles.bold}>Traveling Salesperson Problem (TSP) −</Text>
            <Text style={styles.paragraph}>In TSP, a salesperson needs to visit a set of cities and return to the starting city. The challenge is to find the shortest possible route that visits each city once. This is a perfect example of finding a Hamiltonian cycle.</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.bold}>DNA Sequencing −</Text>
            <Text style={styles.paragraph}>In bioinformatics, DNA sequencing sometimes involves finding Hamiltonian paths in graphs to reconstruct sequences from fragments.</Text>
          </View>
        </View>

        {/* COMMON MISUNDERSTANDINGS */}
        <View style={[styles.sectionCard, { backgroundColor: '#F8FAFC' }]}>
          <Text style={styles.sectionTitle}>Common Misunderstandings about Hamiltonian Paths</Text>
          
          <View style={styles.misBox}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="#64748B" style={{ marginTop: 2 }} />
            <View style={styles.misTextContent}>
              <Text style={styles.bold}>Confusion between Hamiltonian and Euler Paths −</Text>
              <Text style={styles.misText}>It is easy to confuse Hamiltonian paths with Euler paths. If we rethink, the Hamiltonian paths aim to visit each vertex once. The Euler paths focus on covering each edge once. Both are concerned with unique coverage but differ in their focus on vertices versus edges.</Text>
            </View>
          </View>

          <View style={styles.misBox}>
            <MaterialCommunityIcons name="help-circle-outline" size={24} color="#64748B" style={{ marginTop: 2 }} />
            <View style={styles.misTextContent}>
              <Text style={styles.bold}>Assuming All Connected Graphs Have Hamiltonian Paths −</Text>
              <Text style={styles.misText}>Another confusing thing is when a graph is connected, it does not necessarily need to have a Hamiltonian path. For instance, a star graph is connected but has no Hamiltonian path. So, connectivity alone does not guarantee a Hamiltonian path or cycle.</Text>
            </View>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            In this chapter, we explained the concept of Hamiltonian paths in discrete mathematics. We covered the basics of what defines a Hamiltonian path and a Hamiltonian cycle. We discussed their unique conditions and challenges, and saw examples of when these paths and cycles appear in different graph types.
          </Text>
          <Text style={styles.paragraph}>
            Additionally, we also touched upon some real-world applications like the Traveling Salesperson Problem and DNA sequencing.
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
  
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  subLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 15, marginBottom: 12, letterSpacing: 0.5 },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },

  traceBox: { padding: 16, borderRadius: 12, marginTop: 10, borderWidth: 1, alignItems: 'center' },
  traceText: { fontSize: 14, fontWeight: 'bold', textAlign: 'center', lineHeight: 22 },

  listContainer: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 10 },
  listItem: { fontSize: 14, color: '#475569', marginBottom: 8, lineHeight: 22 },

  appBox: { backgroundColor: '#F0F9FF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#BAE6FD', marginTop: 10 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },
  
  misBox: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15, backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  misTextContent: { flex: 1, marginLeft: 12 },
  misText: { fontSize: 14, color: '#475569', lineHeight: 22, marginTop: 5, textAlign: 'justify' },
});