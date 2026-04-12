import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EulerPaths_8_13() {
  
  const ConditionBadge = ({ type, condition, result, color }) => (
    <View style={[styles.conditionCard, { borderLeftColor: color }]}>
      <Text style={[styles.conditionType, { color: color }]}>{type}</Text>
      <Text style={styles.conditionText}><Text style={styles.bold}>Requirement: </Text>{condition}</Text>
      <View style={[styles.resultTag, { backgroundColor: color + '20' }]}>
        <Text style={[styles.resultTagText, { color: color }]}>{result}</Text>
      </View>
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
          <Text style={styles.topicSubtitle}>Module 8.13</Text>
          <Text style={styles.topicTitle}>Euler Paths & Circuits</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            Euler paths and circuits are the most fundamental concepts in Graph Theory. With these concepts, we can solve real-world problems like network traversal, delivering mail along a specific route, planning circuits, etc. We study Euler paths and circuits to understand how we can traverse each edge in a graph, visiting each path once.
          </Text>
          <Text style={styles.paragraph}>
            Read this chapter to learn the basics of Euler paths and circuits and understand the core properties of graphs that allow for these paths and circuits.
          </Text>
        </View>

        {/* WHAT IS AN EULER PATH */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is an Euler Path?</Text>
          <Text style={styles.paragraph}>
            An Euler path is nothing but a graph that is a sequence where every edge is visited exactly once. In simple terms, if we have a map with roads represented as edges and intersections as vertices, the Euler path gives provision to travel along every road without backtracking. But here, we do not need to return to the starting point in an Euler path.
          </Text>
          
          <Text style={styles.paragraph}>
            If we follow the path ABCEDCADB, it will form this graph without repeating same edges twice.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/eul1.jpg')} height={180} />
        </View>

        {/* WHAT IS AN EULER CIRCUIT */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is an Euler Circuit?</Text>
          <Text style={styles.paragraph}>
            An Euler circuit is a special type of Euler path. It starts and ends at the same vertex. Like the Euler path, it traverses each edge only once. This closed-loop feature of the Euler circuit makes it unique from an Euler path. We can think of it like a postal route that starts at the post office, covers every street once, and returns to the starting point.
          </Text>
          
          <Text style={styles.paragraph}>
            If we follow ACBDA, we will form the graph and also reach A again.
          </Text>
          <GraphImage source={require('../../assets/moduleImages/eul2.jpg')} height={180} />
        </View>

        {/* CONDITIONS SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conditions for Euler Paths and Circuits</Text>
          <Text style={styles.paragraph}>
            Whether a graph has an Euler path or circuit it is depending on specific properties. They are related to vertex degree (the number of edges connected to a vertex).
          </Text>
          
          <ConditionBadge 
            type="Euler Path" 
            color="#EA580C" 
            condition="A graph will have an Euler path if it has exactly two vertices with an odd degree." 
            result="Start at one of these vertices and end at the other." 
          />
          
          <ConditionBadge 
            type="Euler Circuit" 
            color="#16A34A" 
            condition="A graph will have an Euler circuit if every vertex in the graph has an even degree." 
            result="Start at any vertex and return to it after covering every edge once." 
          />

          <Text style={[styles.paragraph, { marginTop: 10 }]}>
            These conditions give a quick way to check if a graph has an Euler path or circuit without needing to test every possible route manually.
          </Text>
        </View>

        {/* THE KÖNIGSBERG PROBLEM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="bridge" size={26} color="#0F172A" />
            <Text style={[styles.sectionTitle, { marginBottom: 0, marginLeft: 10 }]}>The Bridges of Knigsberg Problem</Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 15 }]}>
            The Bridges of Knigsberg problem is one of the most frequently used examples in graph theory. The problem kept the citizens of Knigsberg (now Kaliningrad, Russia) puzzled for years. The city had seven bridges connecting different lands. The people wanted to know if it was possible to walk through the city crossing each bridge exactly once.
          </Text>

          <GraphImage source={require('../../assets/moduleImages/eul3.jpg')} height={220} />

          <Text style={styles.paragraph}>
            Representing this problem as a graph, it turns out the graph had more than two vertices with an odd degree, so no Euler path or circuit exists. This insight, discovered by mathematician Leonhard Euler, marked the birth of graph theory.
          </Text>
        </View>

        {/* SIMPLE EXAMPLES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Simple Euler Path</Text>
          <Text style={styles.paragraph}>
            Consider a graph with four vertices arranged in a straight line (A, B, C, and D) like below −
          </Text>
          
          <GraphImage source={require('../../assets/moduleImages/eul4.jpg')} height={100} />

          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Vertices A and D have a degree of 1 (odd).</Text>
            <Text style={styles.bulletItem}>• Vertices B and C have a degree of 2 (even).</Text>
          </View>

          <Text style={styles.paragraph}>
            So there are exactly two vertices (A and D) with an odd degree, and we have an Euler path here. The path can start at A, traverse each edge, and end at D. We can also start from D to end at A covering every edge without repetition.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Simple Euler Circuit</Text>
          <Text style={styles.paragraph}>
            Consider a triangle graph where each vertex is connected to the other two (forming a cycle). Here each of the three vertices here has a degree of 2 (even), fulfilling the condition for an Euler circuit. So starting from any vertex, we can travel through each edge once and return to the starting vertex.
          </Text>
          
          <GraphImage source={require('../../assets/moduleImages/eul5.jpg')} height={160} />
        </View>

        {/* VISUALIZING & IDENTIFYING */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Visualizing Degrees and Paths</Text>
          
          <Text style={styles.subLabel}>Dead Ends and Odd Degrees</Text>
          <Text style={styles.paragraph}>
            In a graph, a vertex with a degree of 1 can become a dead end. And this will prevents an Euler circuit. For example, if there is a spike extending from one vertex in a closed network, the graph will have at least one vertex with an odd degree. This will break the condition for an Euler circuit.
          </Text>
          
          <GraphImage source={require('../../assets/moduleImages/eul6.jpg')} height={180} />

          <Text style={styles.subLabel}>Balancing Inbound and Outbound Edges</Text>
          <Text style={styles.paragraph}>
            For an Euler circuit to exist, every time we arrive at a vertex, we should have a way to leave it. It explains why all vertices need an even degree. A vertex with an odd degree will leave us stranded because there will be an unpaired edge we cannot use without repeating an edge.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Identifying Euler Paths and Circuits</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Counting Odd Degrees − </Text>To determine whether a graph has an Euler path or circuit, we need to list the degree (number of edges) for each vertex. Then, count how many vertices have an odd degree.
          </Text>

          <View style={styles.logicHighlight}>
            <Text style={styles.highlightText}>• If exactly two vertices have an odd degree, there is an Euler path.</Text>
            <Text style={styles.highlightText}>• If all vertices have an even degree, there is an Euler circuit.</Text>
            <Text style={styles.highlightText}>• If more than two vertices have an odd degree, neither an Euler path nor circuit exists.</Text>
          </View>
        </View>

        {/* APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications of Euler Paths and Circuits</Text>
          <Text style={styles.paragraph}>
            Euler paths and circuits have practical applications in areas like logistics, network design, and even DNA sequencing.
          </Text>

          <Text style={styles.subLabel}>Postal and Garbage Collection Routes</Text>
          <Text style={styles.paragraph}>
            Consider a postal worker who wants to cover every street in a neighborhood without retracing steps. By organizing the neighborhood as a graph, an Euler circuit gives the path the worker can complete the route efficiently if every street connection (vertex degree) is even.
          </Text>
          <Text style={styles.paragraph}>
            Similarly, garbage collection routes and road maintenance planning too rely on this logic for efficient traversal.
          </Text>

          <Text style={styles.subLabel}>DNA Sequencing</Text>
          <Text style={styles.paragraph}>
            In computational biology, Euler paths help assemble DNA sequences by treating fragments of DNA. This is as edges and overlaps as vertices. An Euler path through this graph reconstructs the original DNA sequence.
          </Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            In this chapter, we explained the basics of Euler paths and circuits in graph theory. We understood the differences of an Euler path from an Euler circuit. We discussed the conditions that allow for their existence.
          </Text>
          <Text style={styles.paragraph}>
            In addition, we presented the practical applications of Euler paths and circuits, from postal routes to DNA sequencing, showing the value of these mathematical concepts in real-world situations.
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
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },

  conditionCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderLeftWidth: 5, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  conditionType: { fontWeight: '900', fontSize: 15, marginBottom: 6, textTransform: 'uppercase' },
  conditionText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  resultTag: { alignSelf: 'flex-start', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginTop: 12 },
  resultTagText: { fontSize: 12, fontWeight: 'bold' },
  
  logicHighlight: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 10, borderWidth: 1, borderColor: '#BAE6FD' },
  highlightText: { color: '#0369A1', fontSize: 14, lineHeight: 22, marginBottom: 6 },
  
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },
  
  bulletList: { paddingLeft: 10, marginBottom: 15 },
  bulletItem: { fontSize: 15, color: '#475569', marginBottom: 6, lineHeight: 22 },
});