import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ColoringEdges_8_12() {
  
  const GraphImage = ({ source, height = 200 }) => (
    <View style={styles.imageContainer}>
      <Image source={source} style={[styles.graphImage, { height }]} resizeMode="contain" />
    </View>
  );

  const VizingClass = ({ className, index, description, color }) => (
    <View style={[styles.classCard, { borderLeftColor: color }]}>
      <Text style={[styles.classTitle, { color: color }]}>{className}</Text>
      <View style={styles.formulaRow}>
        <Text style={styles.monoMath}>{"\u03c7'(G) = " + index}</Text>
      </View>
      <Text style={styles.classDesc}>{description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.12</Text>
          <Text style={styles.topicTitle}>Coloring Edges</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            When we talk about graph coloring, generally we focus on vertex coloring. Coloring the edges is equally important in discrete mathematics.
          </Text>
          <Text style={styles.paragraph}>
            In this chapter, we will explain the fundamentals of edge coloring concept. We will see how edge coloring can be used in various applications and why it is useful and challenging to determine the minimum number of colors required.
          </Text>
        </View>

        {/* SECTION 1: BASICS OF EDGE COLORING */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Basics of Edge Coloring</Text>
          <Text style={styles.paragraph}>
            Edge coloring is used to assign colors to the edges of a graph. The goal is to make sure that no two edges that share a vertex (adjacent edges) are given the same color. This is called the proper edge coloring.
          </Text>
          <Text style={styles.paragraph}>
            There is another concept called the chromatic index. It is denoted as \u03c7'(G). The chromatic index gives the minimum number of colors required to achieve a proper edge coloring of a graph G. This index is somewhat equivalent of the chromatic number for vertex coloring.
          </Text>

          <GraphImage source={require('../../assets/moduleImages/ed1.jpg')} height={180} />

          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>Visual Logic:</Text>
            <Text style={[styles.paragraph, { marginBottom: 0, marginTop: 5 }]}>
              Here, the edges e\u2081 and e\u2083 are not sharing common vertex so they are in same color. The same logic applies to the edges e\u2082 and e\u2084.
            </Text>
          </View>
        </View>

        {/* SECTION 2: IMPORTANCE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Importance of Edge Coloring</Text>
          <Text style={styles.paragraph}>
            Edge coloring is important in several situations where each edge represents a task or an event that needs unique timing or resource allocation. It is especially important when these tasks share common points or resources. It helps answer questions like, "How can we schedule tasks to avoid conflicts?" or "How many resources are necessary to prevent overlap?"
          </Text>
        </View>

        {/* SECTION 3: PRACTICAL EXAMPLES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Practical Examples of Edge Coloring</Text>
          <Text style={styles.paragraph}>
            Let us see some examples of edge coloring in real life.
          </Text>

          <View style={styles.appCard}>
            <Text style={styles.bold}>Example of Chess Tournament Scheduling</Text>
            <Text style={[styles.paragraph, { marginTop: 8 }]}>
              Consider a case where there are six friends who want to hold a chess tournament where each person plays against every other player. Now with limited chess sets, only one game can be played at a time by each person. Now the task is to determine the minimum number of time slots required for the tournament.
            </Text>
            <Text style={styles.paragraph}>
              In graph terms, we can model each player as a vertex and each game as an edge. So for two players, who are scheduled to play each other, they are connected by an edge. We can understand that this will make a complete graph K\u2086 with six vertices. Since each player can play only one game per time slot, we need to understand that no two games are taking the same player are scheduled simultaneously.
            </Text>

            <GraphImage source={require('../../assets/moduleImages/ed2.jpg')} height={200} />

            <Text style={styles.paragraph}>
              To solve this, we will see the chromatic index of K\u2086. This will make out that five colors (or time slots) are enough to schedule all the games without overlap. It means the friends will need five hours to complete their tournament.
            </Text>
            <View style={styles.resultBadge}>
              <Text style={styles.resultText}>K\u2086 Chromatic Index = 5 colors (5 hours total)</Text>
            </View>
          </View>

          <View style={[styles.appCard, { marginTop: 15, backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' }]}>
            <Text style={styles.bold}>Example of Classroom Conflict Scheduling</Text>
            <Text style={[styles.paragraph, { marginTop: 8 }]}>
              Let us see the classroom example. Where we schedule classes. The scheduling has been done in such a way that certain classes cannot be held at the same time due to conflicts. These conflicts could be based on shared professors, rooms, or students enrolled in multiple classes. We can represent each class as an edge in a graph, where two edges share a vertex if their corresponding classes conflict.
            </Text>
            <Text style={[styles.paragraph, { marginBottom: 0 }]}>
              Using the chromatic index of this conflict graph, we can find the minimum number of unique time slots needed to avoid overlap.
            </Text>
          </View>
        </View>

        {/* SECTION 4: VIZING'S THEOREM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="shield-check-outline" size={26} color="#0284C7" />
            <Text style={[styles.sectionTitle, { color: '#0284C7', marginBottom: 0, marginLeft: 10 }]}>Chromatic Index and Vizings Theorem</Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 15 }]}>
            There is an interesting theorem called the Vizing's Theorem. The Vizing's states to determine the chromatic index by offering a general rule. In this theorem for any graph G, the chromatic index \u03c7'(G) is either equal to the maximum degree of the graph \u0394(G) or \u0394(G) + 1.
          </Text>
          <Text style={styles.paragraph}>
            According to this theorem it is giving us a guideline for finding the minimum number of colors required in edge coloring. The theorem classifies graphs into two types:
          </Text>

          <VizingClass 
            className="Class 1 Graphs" 
            index="\u0394(G)" 
            description="These graphs have a chromatic index of \u0394(G)." 
            color="#16A34A" 
          />
          
          <VizingClass 
            className="Class 2 Graphs" 
            index="\u0394(G) + 1" 
            description="These graphs have a chromatic index of \u0394(G) + 1." 
            color="#EA580C" 
          />

          <Text style={styles.paragraph}>
            While Vizing's Theorem gives this helpful range. It helps in determining whether a graph falls into Class 1 or Class 2. The process is not always straightforward. For instance, for bipartite graphs they belong to Class 1. It means they require only \u0394(G) colors for edge coloring.
          </Text>
        </View>

        {/* SECTION 5: BOUNDS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Upper and Lower Bounds for Chromatic Index</Text>
          <Text style={styles.paragraph}>
            Like the chromatic number bounds, chromatic index also have upper and lower bounds. These bounds help to estimate the minimum number of colors for proper edge coloring. It is particularly in large or complex graphs.
          </Text>
          
          <View style={styles.boundsList}>
            <View style={styles.boundItem}>
              <Text style={styles.bold}>Lower Bound \u2212</Text>
              <Text style={[styles.paragraph, { marginTop: 5, marginBottom: 0 }]}>
                The chromatic index is always at least as large as the maximum degree of the graph, \u0394(G). This is because, at minimum, each vertex's adjacent edges must be assigned unique colors.
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.boundItem}>
              <Text style={styles.bold}>Upper Bound \u2212</Text>
              <Text style={[styles.paragraph, { marginTop: 5, marginBottom: 0 }]}>
                Vizing's Theorem also shows the upper bound. \u03c7'(G) is at most \u0394(G) + 1. So, the chromatic index will always fall within the range \u0394(G) \u2264 \u03c7'(G) \u2264 \u0394(G) + 1.
              </Text>
            </View>
          </View>

          <Text style={[styles.paragraph, { marginTop: 15 }]}>
            These bounds can simplify the edge-coloring problems. It will narrow down the potential range for the chromatic index before detailed coloring is applied.
          </Text>
        </View>

        {/* SECTION 6: RAMSEY THEORY */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="motive-configuration" size={26} color="#7C3AED" />
            <Text style={[styles.sectionTitle, { color: '#7C3AED', marginBottom: 0, marginLeft: 10 }]}>Ramsey Theory and Edge Coloring</Text>
          </View>
          <Text style={[styles.paragraph, { marginTop: 15 }]}>
            Another interesting theory for edge coloring is Ramsey Theory. This is a branch of mathematics focused on finding order within chaos. In edge coloring, the Ramsey theory addresses questions about coloring edges in such a way that certain patterns are either created or avoided. For example, if every edge in a graph is colored either red or blue, can we avoid having any monochromatic triangles? These are the triangles where all edges are the same color.
          </Text>
          <Text style={styles.paragraph}>
            Such questions are central to Ramsey Theory and become increasingly complex as we consider larger graphs or more colors. For example, research shows that avoiding a monochromatic triangle requires at least 17 vertices if three colors are used. The 18 vertices to avoid a monochromatic copy of K\u2084 using two colors.
          </Text>
        </View>

        {/* SECTION 7: COMPLEXITY */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Complexity of Finding Chromatic Index in Large Graphs</Text>
          <Text style={styles.paragraph}>
            At the end if we talk about the complexity of the chromatic index finding we will face certain challenges. Finding the exact chromatic index in larger or more complex graphs can be computationally hard. Unlike some simpler graph problems, determining the chromatic index requires us to consider all potential colorings, especially in graphs that may fall close to the boundary of Vizings classification (between Class 1 and Class 2).
          </Text>
          <Text style={styles.paragraph}>
            For practical applications, algorithms are used to approximate the chromatic index. However, these approximations are not always efficient or accurate. They are especially as the graph size increases. This complexity makes edge coloring an ongoing area of research.
          </Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            In this chapter, we explained the concept of edge coloring in discrete mathematics. Starting with the basics, we covered the concept of chromatic index and understood its importance in assigning colors to graph edges. We presented some practical applications of edge coloring such as scheduling chess tournaments and resolving classroom conflicts etc.
          </Text>
          <Text style={styles.paragraph}>
            We also discussed Vizings Theorem, which provides a helpful range for the chromatic index, and how it helps classify graphs as Class 1 or Class 2. Finally, we highlighted the Ramsey Theory, which explores edge coloring in the context of finding or avoiding specific patterns.
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
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },

  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },

  logicHighlight: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  
  classCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderLeftWidth: 5, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  classTitle: { fontWeight: '900', fontSize: 15, marginBottom: 4 },
  classDesc: { fontSize: 14, color: '#64748B', lineHeight: 22 },
  formulaRow: { marginVertical: 6 },
  monoMath: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  
  appCard: { backgroundColor: '#F0F9FF', padding: 18, borderRadius: 16, borderWidth: 1, borderColor: '#BAE6FD' },
  resultBadge: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, marginTop: 15, alignItems: 'center', borderWidth: 1, borderColor: '#E0F2FE' },
  resultText: { color: '#0369A1', fontWeight: 'bold', fontSize: 14 },
  
  boundsList: { backgroundColor: '#F1F5F9', padding: 18, borderRadius: 16, marginTop: 10 },
  boundItem: { marginBottom: 5 },
});