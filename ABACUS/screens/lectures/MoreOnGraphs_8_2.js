import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MoreOnGraphs_8_2() {
  
  const AlgoStep = ({ number, text, color = '#1E293B' }) => (
    <View style={styles.algoStepRow}>
      <View style={[styles.stepCircle, { backgroundColor: color }]}>
        <Text style={styles.stepNumber}>{number}</Text>
      </View>
      <Text style={styles.algoStepText}>{text}</Text>
    </View>
  );

  const GraphImage = ({ source }) => (
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.graphImage} resizeMode="contain" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* TOPIC TITLE AREA */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 8.2</Text>
          <Text style={styles.topicTitle}>More on Graphs</Text>
          <View style={styles.underline} />
        </View>

        {/* --- SECTION: GRAPH COLORING --- */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="palette-outline" size={24} color="#7C3AED" />
            <Text style={[styles.sectionTitle, {color: '#7C3AED'}]}>Graph Coloring</Text>
          </View>
          
          <Text style={styles.paragraph}>
            Graph coloring is the procedure of assignment of colors to each vertex of a graph G such that no adjacent vertices get same color. The objective is to minimize the number of colors while coloring a graph. The smallest number of colors required to color a graph G is called its chromatic number of that graph. Graph coloring problem is a NP Complete problem.
          </Text>

          <Text style={styles.subLabel}>Method to Color a Graph</Text>
          <Text style={styles.paragraph}>The steps required to color a graph G with n number of vertices are as follows −</Text>
          <AlgoStep number="1" text="Arrange the vertices of the graph in some order." />
          <AlgoStep number="2" text="Choose the first vertex and color it with the first color." />
          <AlgoStep number="3" text="Choose the next vertex and color it with the lowest numbered color that has not been colored on any vertices adjacent to it. If all the adjacent vertices are colored with this color, assign a new color to it. Repeat this step until all the vertices are colored." />

          <Text style={styles.subLabel}>Example</Text>
          <GraphImage source={require('../../assets/moduleImages/more1.jpg')} />

          <Text style={styles.paragraph}>
            In the above figure, at first vertex a is colored red. As the adjacent vertices of vertex a are again adjacent, vertex b and vertex d are colored with different color, green and blue respectively. Then vertex c is colored as red as no adjacent vertex of c is colored red. Hence, we could color the graph by 3 colors. Hence, the chromatic number of the graph is 3.
          </Text>

          <Text style={styles.subLabel}>Applications of Graph Coloring</Text>
          <Text style={styles.paragraph}>Some applications of graph coloring include −</Text>
          <View style={styles.appGrid}>
            <View style={styles.appBadge}><Text style={styles.appText}>Register Allocation</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Map Coloring</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Bipartite Graph Checking</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Mobile Radio Frequency Assignment</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Making time table, etc.</Text></View>
          </View>
        </View>

        {/* --- SECTION: GRAPH TRAVERSAL INTRO --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Graph Traversal</Text>
          <Text style={styles.paragraph}>
            Graph traversal is the problem of visiting all the vertices of a graph in some systematic order. There are mainly two ways to traverse a graph.
          </Text>
          <View style={styles.appGrid}>
            <View style={[styles.appBadge, {borderColor: '#0284C7', backgroundColor: '#F0F9FF'}]}><Text style={[styles.appText, {color: '#0284C7'}]}>Breadth First Search</Text></View>
            <View style={[styles.appBadge, {borderColor: '#059669', backgroundColor: '#ECFDF5'}]}><Text style={[styles.appText, {color: '#059669'}]}>Depth First Search</Text></View>
          </View>
        </View>

        {/* --- SECTION: BFS --- */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="format-list-bulleted-type" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7'}]}>Breadth First Search</Text>
          </View>
          
          <Text style={styles.paragraph}>
            Breadth First Search (BFS) starts at starting level-0 vertex X of the graph G. Then we visit all the vertices that are the neighbors of X. After visiting, we mark the vertices as "visited," and place them into level-1. Then we start from the level-1 vertices and apply the same method on every level-1 vertex and so on. The BFS traversal terminates when every vertex of the graph has been visited.
          </Text>

          <View style={styles.algorithmContainer}>
            <View style={styles.algoHeader}>
              <MaterialCommunityIcons name="tray-full" size={18} color="#0369A1" />
              <Text style={styles.algoHeaderText}>BFS ALGORITHM</Text>
            </View>
            <Text style={styles.codeText}>The concept is to visit all the neighbor vertices before visiting other neighbor vertices of neighbor vertices.</Text>
            <View style={styles.divider} />
            <Text style={styles.codeText}>1. Initialize status of all nodes as Ready.</Text>
            <Text style={styles.codeText}>2. Put source vertex in a queue and change its status to Waiting.</Text>
            <Text style={styles.codeText}>3. Repeat the following two steps until queue is empty −</Text>
            <Text style={[styles.codeText, {marginLeft: 15}]}>• Remove the first vertex from the queue and mark it as Visited.</Text>
            <Text style={[styles.codeText, {marginLeft: 15}]}>• Add to the rear of queue all neighbors of the removed vertex whose status is Ready. Mark their status as Waiting.</Text>
          </View>

          <Text style={styles.subLabel}>Problem</Text>
          <Text style={styles.paragraph}>Let us take a graph (Source vertex is a) and apply the BFS algorithm to find out the traversal order.</Text>
          <GraphImage source={require('../../assets/moduleImages/more2.jpg')} />

          <Text style={styles.subLabel}>Solution</Text>
          <AlgoStep color="#0284C7" number="1" text="Initialize status of all vertices to Ready." />
          <AlgoStep color="#0284C7" number="2" text="Put a in queue and change its status to Waiting." />
          <AlgoStep color="#0284C7" number="3" text="Remove a from queue, mark it as Visited." />
          <AlgoStep color="#0284C7" number="4" text="Add as neighbors in Ready state b, d and e to end of queue and mark them as Waiting." />
          <AlgoStep color="#0284C7" number="5" text="Remove b from queue, mark it as Visited, put its Ready neighbor c at end of queue and mark c as Waiting." />
          <AlgoStep color="#0284C7" number="6" text="Remove d from queue and mark it as Visited. It has no neighbor in Ready state." />
          <AlgoStep color="#0284C7" number="7" text="Remove e from queue and mark it as Visited. It has no neighbor in Ready state." />
          <AlgoStep color="#0284C7" number="8" text="Remove c from queue and mark it as Visited. It has no neighbor in Ready state." />
          <AlgoStep color="#0284C7" number="9" text="Queue is empty so stop." />

          <View style={styles.traversalOrderBox}>
            <Text style={styles.orderLabel}>So the traversal order is −</Text>
            <Text style={styles.orderValue}>a → b → d → e → c</Text>
            <View style={styles.divider} />
            <Text style={styles.orderLabel}>The alternate orders of traversal are −</Text>
            <Text style={styles.altOrderValue}>a → b → e → d → c</Text>
            <Text style={styles.altOrderValue}>Or, a → d → b → e → c</Text>
            <Text style={styles.altOrderValue}>Or, a → e → b → d → c</Text>
            <Text style={styles.altOrderValue}>Or, a → b → e → d → c</Text>
            <Text style={styles.altOrderValue}>Or, a → d → e → b → c</Text>
          </View>

          <Text style={styles.subLabel}>Application of BFS</Text>
          <View style={styles.appGrid}>
            <View style={styles.appBadge}><Text style={styles.appText}>Finding the shortest path</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Minimum spanning tree for un-weighted graph</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>GPS navigation system</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Detecting cycles in an undirected graph</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Finding all nodes within one connected component</Text></View>
          </View>

          <Text style={styles.subLabel}>Complexity Analysis</Text>
          <Text style={styles.paragraph}>
            Let G(V, E) be a graph with |V| number of vertices and |E| number of edges. If breadth first search algorithm visits every vertex in the graph and checks every edge, then its time complexity would be − O(|V| + |E|).O(|E|). It may vary between O(1) and O(|V²|).
          </Text>
        </View>

        {/* --- SECTION: DFS --- */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="layers-triple-outline" size={24} color="#059669" />
            <Text style={[styles.sectionTitle, {color: '#059669'}]}>Depth First Search</Text>
          </View>
          
          <Text style={styles.paragraph}>
            Depth First Search (DFS) algorithm starts from a vertex v, then it traverses to its adjacent vertex (say x) that has not been visited before and mark as "visited" and goes on with the adjacent vertex of x and so on.
          </Text>
          <Text style={styles.paragraph}>
            If at any vertex, it encounters that all the adjacent vertices are visited, then it backtracks until it finds the first vertex having an adjacent vertex that has not been traversed before. Then, it traverses that vertex, continues with its adjacent vertices until it traverses all visited vertices and has to backtrack again. In this way, it will traverse all the vertices reachable from the initial vertex v.
          </Text>

          <View style={[styles.algorithmContainer, {backgroundColor: '#ECFDF5', borderColor: '#A7F3D0'}]}>
            <View style={styles.algoHeader}>
              <MaterialCommunityIcons name="stack-overflow" size={18} color="#065F46" />
              <Text style={[styles.algoHeaderText, {color: '#065F46'}]}>DFS ALGORITHM</Text>
            </View>
            <Text style={[styles.codeText, {color: '#065F46'}]}>The concept is to visit all the neighbor vertices of a neighbor vertex before visiting the other neighbor vertices.</Text>
            <View style={[styles.divider, {backgroundColor: '#A7F3D0'}]} />
            <Text style={[styles.codeText, {color: '#065F46'}]}>1. Initialize status of all nodes as Ready.</Text>
            <Text style={[styles.codeText, {color: '#065F46'}]}>2. Put source vertex in a stack and change its status to Waiting.</Text>
            <Text style={[styles.codeText, {color: '#065F46'}]}>3. Repeat the following two steps until stack is empty −</Text>
            <Text style={[styles.codeText, {color: '#065F46', marginLeft: 15}]}>• Pop the top vertex from the stack and mark it as Visited.</Text>
            <Text style={[styles.codeText, {color: '#065F46', marginLeft: 15}]}>• Push onto the top of the stack all neighbors of the removed vertex whose status is Ready. Mark their status as Waiting.</Text>
          </View>

          <Text style={styles.subLabel}>Problem</Text>
          <Text style={styles.paragraph}>Let us take a graph (Source vertex is a) and apply the DFS algorithm to find out the traversal order.</Text>
          <GraphImage source={require('../../assets/moduleImages/more3.jpg')} />

          <Text style={styles.subLabel}>Solution</Text>
          <AlgoStep color="#059669" number="1" text="Initialize status of all vertices to Ready." />
          <AlgoStep color="#059669" number="2" text="Push a in stack and change its status to Waiting." />
          <AlgoStep color="#059669" number="3" text="Pop a and mark it as Visited." />
          <AlgoStep color="#059669" number="4" text="Push as neighbors in Ready state e, d and b to top of stack and mark them as Waiting." />
          <AlgoStep color="#059669" number="5" text="Pop b from stack, mark it as Visited, push its Ready neighbor c onto stack." />
          <AlgoStep color="#059669" number="6" text="Pop c from stack and mark it as Visited. It has no Ready neighbor." />
          <AlgoStep color="#059669" number="7" text="Pop d from stack and mark it as Visited. It has no Ready neighbor." />
          <AlgoStep color="#059669" number="8" text="Pop e from stack and mark it as Visited. It has no Ready neighbor." />
          <AlgoStep color="#059669" number="9" text="Stack is empty. So stop." />

          <View style={[styles.traversalOrderBox, {backgroundColor: '#F0FDF4', borderColor: '#BBF7D0'}]}>
            <Text style={[styles.orderLabel, {color: '#166534'}]}>So the traversal order is −</Text>
            <Text style={[styles.orderValue, {color: '#166534'}]}>a → b → c → d → e</Text>
            <View style={[styles.divider, {backgroundColor: '#BBF7D0'}]} />
            <Text style={[styles.orderLabel, {color: '#166534'}]}>The alternate orders of traversal are −</Text>
            <Text style={[styles.altOrderValue, {color: '#166534'}]}>a → e → b → c → d</Text>
            <Text style={[styles.altOrderValue, {color: '#166534'}]}>Or, a → b → e → c → d</Text>
            <Text style={[styles.altOrderValue, {color: '#166534'}]}>Or, a → d → e → b → c</Text>
            <Text style={[styles.altOrderValue, {color: '#166534'}]}>Or, a → d → c → e → b</Text>
            <Text style={[styles.altOrderValue, {color: '#166534'}]}>Or, a → d → c → b → e</Text>
          </View>

          <Text style={styles.subLabel}>Complexity Analysis</Text>
          <Text style={styles.paragraph}>
            Let G(V, E) be a graph with |V| number of vertices and |E| number of edges. If DFS algorithm visits every vertex in the graph and checks every edge, then the time complexity is − ⊝(|V| + |E|).
          </Text>

          <Text style={styles.subLabel}>Applications</Text>
          <View style={styles.appGrid}>
            <View style={styles.appBadge}><Text style={styles.appText}>Detecting cycle in a graph</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>To find topological sorting</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>To test if a graph is bipartite</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Finding connected components</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Finding the bridges of a graph</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Finding bi-connectivity in graphs</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Solving the Knights Tour problem</Text></View>
            <View style={styles.appBadge}><Text style={styles.appText}>Solving puzzles with only one solution</Text></View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 20 },
  titleSection: { marginBottom: 25, marginTop: 10 },
  topicSubtitle: { fontSize: 13, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1.5 },
  topicTitle: { fontSize: 32, fontWeight: '900', color: '#0F172A', marginTop: 4 },
  underline: { height: 4, width: 40, backgroundColor: '#7C3AED', marginTop: 8, borderRadius: 2 },
  
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, elevation: 4, borderWidth: 1, borderColor: '#F1F5F9' },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  sectionTitle: { fontSize: 20, fontWeight: '800', marginLeft: 10 },
  
  paragraph: { fontSize: 16, color: '#475569', lineHeight: 26, marginBottom: 12 },
  subLabel: { fontSize: 14, fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', marginTop: 15, marginBottom: 12, letterSpacing: 1 },
  divider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 12 },

  algoStepRow: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-start' },
  stepCircle: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 14, marginTop: 2 },
  stepNumber: { color: 'white', fontSize: 12, fontWeight: '900' },
  algoStepText: { flex: 1, fontSize: 15, color: '#334155', lineHeight: 24 },

  algorithmContainer: { backgroundColor: '#F0F9FF', borderRadius: 16, padding: 20, marginVertical: 10, borderWidth: 1, borderColor: '#BAE6FD' },
  algoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  algoHeaderText: { marginLeft: 8, fontSize: 13, fontWeight: '900', color: '#0369A1', letterSpacing: 0.5 },
  codeText: { fontSize: 14, color: '#334155', lineHeight: 24, fontWeight: '500', marginBottom: 4 },

  traversalOrderBox: { padding: 20, borderRadius: 16, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', marginVertical: 15 },
  orderLabel: { fontSize: 13, fontWeight: '800', color: '#64748B', marginBottom: 8 },
  orderValue: { fontSize: 18, color: '#0F172A', fontFamily: 'monospace', fontWeight: 'bold' },
  altOrderValue: { fontSize: 14, color: '#475569', fontFamily: 'monospace', marginBottom: 4 },

  appGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 5 },
  appBadge: { backgroundColor: '#F1F5F9', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  appText: { fontSize: 13, color: '#475569', fontWeight: '700' },

  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%' },
  graphImage: { width: '100%', height: 200, borderRadius: 12, backgroundColor: '#F8FAFC' }
});