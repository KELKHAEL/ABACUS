import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ColoringTheory_8_11() {
  
  const GraphImage = ({ source, height = 220 }) => (
    <View style={styles.imageContainer}>
      <Image source={source} style={[styles.graphImage, { height }]} resizeMode="contain" />
    </View>
  );

  const ConflictItem = ({ title, description }) => (
    <View style={styles.conflictRow}>
      <MaterialCommunityIcons name="circle-medium" size={16} color="#B91C1C" style={{ marginTop: 2 }} />
      <Text style={styles.conflictText}>
        <Text style={styles.bold}>{title} </Text>
        {description}
      </Text>
    </View>
  );

  const DefinitionItem = ({ title, description }) => (
    <View style={styles.definitionRow}>
      <MaterialCommunityIcons name="check-circle" size={20} color="#0369A1" style={{ marginTop: 2 }} />
      <Text style={styles.definitionText}>
        <Text style={[styles.bold, { color: '#0369A1' }]}>{title} {"\u2212"} </Text>
        {description}
      </Text>
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
            {"The graph coloring problem is useful in graph theory and discrete mathematics. Graph coloring ensures that no two adjacent vertices will have the same color. This technique has applications across diverse fields, from scheduling problems to frequency assignment for radio stations."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will explain the general principles of coloring theory in discrete mathematics."}
          </Text>
        </View>

        {/* SECTION 1: WHAT IS GRAPH COLORING */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is Graph Coloring?</Text>
          <Text style={styles.paragraph}>
            {"Graph coloring usually means assigning colors to the vertices of a graph so that no two adjacent vertices share the same color. There are a few key terms we must understand \u2212"}
          </Text>
          
          <View style={styles.definitionBox}>
            <DefinitionItem title="Vertex Coloring" description="This gives assigning colors to each vertex in the graph. For a coloring to be proper. no two connected or adjacent vertices should have the same color." />
            <DefinitionItem title="Chromatic Number" description="The chromatic number, represented as \u03c7(G). It is the smallest number of colors needed to properly color a graph G. So, if a graph can be colored with three colors but not with two, its chromatic number is three." />
            <DefinitionItem title="Planar Graphs" description="Planar graphs are graphs that can be drawn on a plane. It does not have any of their edges crossing. This characteristic often affects the chromatic number of a graph." />
          </View>
        </View>

        {/* SECTION 2: FOUR-COLOR THEOREM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="map-check-outline" size={26} color="#16A34A" />
            <Text style={[styles.sectionTitle, { color: '#16A34A', marginBottom: 0, marginLeft: 10 }]}>The Four-Color Theorem</Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 15 }]}>
            {"The Four-Color theorem states that any planar graph can be properly colored using no more than four colors. This means that if we have a map of countries, states, or regions, we can color it with four colors so that no two adjacent regions share the same color."}
          </Text>
          
          <GraphImage source={require('../../assets/moduleImages/color1.jpg')} height={240} />

          <Text style={styles.paragraph}>
            {"This theorem has an interesting history. It is simple to state, but the proof is complex and was only achieved with the help of computer verification. While the theorem might seem limited to cartography. It has much broader implications in graph theory. For planar graphs."}
          </Text>
        </View>

        {/* SECTION 3: REAL-WORLD APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Applications of Graph Coloring</Text>
          <Text style={styles.paragraph}>
            {"Graph coloring has a large variety of applications in real-life. For instance, when we are going to scheduling classes, assigning frequencies, or arranging roommates, the graph coloring gives a structured way to handle these problems. Let us see a few real-world examples where graph coloring theory is required."}
          </Text>

          <Text style={styles.subLabel}>Classroom and Exam Scheduling</Text>
          <Text style={styles.paragraph}>
            {"In a school or university setting, certain classes cannot be scheduled at the same time due to shared resources. The shared resources are like classrooms or instructors. By representing each class as a vertex and each conflict as an edge, we can make a graph where the goal is to assign time slots (or colors) to each class so that no two conflicting classes are scheduled at the same time."}
          </Text>

          <View style={styles.exampleBox}>
            <Text style={[styles.subLabel, { color: '#B91C1C', marginTop: 0 }]}>Example of Class Scheduling Problem</Text>
            <Text style={styles.paragraph}>{"Let us see the above problem through an example \u2212"}</Text>
            <ConflictItem title="Class A" description="conflicts with Classes D and I." />
            <ConflictItem title="Class B" description="conflicts with Classes D, I, and J." />
            <ConflictItem title="Class C" description="conflicts with Classes E, F, and I." />
            
            <Text style={[styles.paragraph, { marginTop: 15 }]}>
              {"Each class can be thought of as a vertex. And an edge between any two classes that cannot run at the same time. This is minimum number of colors in this graph (the chromatic number) would give us the least number of time slots required to schedule all classes without any overlaps."}
            </Text>
            <GraphImage source={require('../../assets/moduleImages/color2.jpg')} height={220} />
          </View>

          <Text style={styles.subLabel}>Frequency Assignment for Radio Stations</Text>
          <Text style={styles.paragraph}>
            {"Consider the scenario of radio broadcasting. The nearby stations need to avoid interference by using different frequencies. Graph coloring helps with this problem by treating each radio station as a vertex and drawing edges between any stations that are close enough to interfere with each other. Here the chromatic number tells us the minimum number of frequencies required to prevent interference."}
          </Text>

          <View style={[styles.exampleBox, { borderColor: '#BAE6FD', backgroundColor: '#F0F9FF' }]}>
            <Text style={[styles.subLabel, { color: '#0369A1', marginTop: 0 }]}>Example of Frequency Assignment Problem</Text>
            <Text style={styles.paragraph}>{"Let us see this with setting up radio stations in a new region. Some stations are close enough to interfere, so they need different frequencies \u2212"}</Text>
            <ConflictItem title="Station A" description="is close enough to interfere with Stations B, D, and E." />
            <ConflictItem title="Station B" description="interferes with Stations C and F." />
            <ConflictItem title="Station C" description="interferes with Station D." />
            
            <Text style={[styles.paragraph, { marginTop: 15 }]}>
              {"We can represent each station as a vertex, with edges between any two stations that interfere with each other. So, a proper coloring of this graph gives us the minimum number of frequencies needed to avoid interference."}
            </Text>
            <GraphImage source={require('../../assets/moduleImages/color3.jpg')} height={220} />
          </View>

          <Text style={styles.subLabel}>Chemical Storage Safety</Text>
          <Text style={styles.paragraph}>
            {"Another interesting example could be the chemical storage. Here the chemicals need to be stored safely, graph coloring can help prevent hazardous reactions. If two chemicals should not be stored together, they are considered adjacent vertices in a graph."}
          </Text>
          <Text style={styles.paragraph}>
            {"By coloring the graph, we can determine the fewest number of rooms required to store all chemicals without any dangerous pairs ending up in the same room."}
          </Text>
        </View>

        {/* SECTION 4: BOUNDS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Bounds for Chromatic Numbers</Text>
          <Text style={styles.paragraph}>
            {"Calculating the exact chromatic number of a graph can be challenging. But we have ways to estimate the bounds for the chromatic number."}
          </Text>
          
          <View style={styles.boundsBox}>
            <Text style={styles.boundsTitle}>{"Lower Bound (Clique Number) \u2212"}</Text>
            <Text style={styles.boundsText}>
              {"The clique number of a graph states the largest complete subgraph. This is a set of vertices all connected to each other. A graph's chromatic number must be at least as large as its clique number."}
            </Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.boundsTitle}>{"Upper Bound (Maximum Degree) \u2212"}</Text>
            <Text style={styles.boundsText}>
              {"The maximum degree of a vertex in a graph provides an upper bound for the chromatic number. For any graph G, the chromatic number is at most \u0394(G) + 1, where \u0394(G) is the maximum degree of any vertex in the graph."}
            </Text>
          </View>
        </View>

        {/* SECTION 5: SPECIAL TYPES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Special Types of Graphs in Coloring Theory</Text>
          <Text style={styles.paragraph}>
            {"Let us see some special types of graphs based on their chromatic numbers."}
          </Text>

          <Text style={styles.subLabel}>Perfect Graphs</Text>
          <Text style={styles.paragraph}>
            {"Perfect graphs are graphs in which the chromatic number of each subgraph is equal to its clique number. This property simplifies the task of finding the chromatic number for perfect graphs."}
          </Text>
          <GraphImage source={require('../../assets/moduleImages/color4.jpg')} height={200} />

          <Text style={styles.subLabel}>Bipartite Graphs</Text>
          <Text style={styles.paragraph}>
            {"Bipartite graphs are such graphs whose vertices can be divided into two sets. And with edges only between vertices from different sets. These graphs have a chromatic number of 2. Because only two colors are needed to ensure that adjacent vertices have different colors."}
          </Text>
          <GraphImage source={require('../../assets/moduleImages/color5.jpg')} height={160} />
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we covered the basics of coloring theory in discrete mathematics. Starting with an overview of vertex coloring, we understood how the chromatic number determines the minimum colors needed to achieve a proper coloring."}
          </Text>
          <Text style={styles.paragraph}>
            {"We looked at the Four-Color Theorem too and explored how graph coloring is applied in real-world problems like class scheduling, frequency assignment, and chemical storage."}
          </Text>
          <Text style={styles.paragraph}>
            {"Finally, we explained the methods of estimating chromatic numbers and identified some special types of graphs where these calculations become simpler."}
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
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  subLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 15, marginBottom: 10, letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },

  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },

  definitionBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#BAE6FD', marginTop: 10 },
  definitionRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  definitionText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#0369A1', lineHeight: 22 },
  
  exampleBox: { backgroundColor: '#FFF5F5', padding: 16, borderRadius: 16, marginTop: 15, borderWidth: 1, borderColor: '#FEE2E2' },
  conflictRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8, paddingLeft: 5 },
  conflictText: { flex: 1, marginLeft: 8, fontSize: 14, color: '#7F1D1D', lineHeight: 22 },
  
  boundsBox: { backgroundColor: '#F8FAFC', padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 10 },
  boundsTitle: { fontWeight: '800', color: '#1E293B', fontSize: 15, marginBottom: 6 },
  boundsText: { color: '#475569', fontSize: 14, lineHeight: 22, textAlign: 'justify' },
});