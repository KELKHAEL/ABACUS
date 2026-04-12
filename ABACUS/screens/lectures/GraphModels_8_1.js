import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DiscreteMathModule_8_1() {
  
  // Custom component for Theorem/Lemma highlights
  const InfoHighlight = ({ title, children, type = 'lemma' }) => (
    <View style={[styles.infoHighlight, type === 'theorem' ? styles.theoremBorder : styles.lemmaBorder]}>
      <View style={styles.highlightHeader}>
        <MaterialCommunityIcons 
          name={type === 'theorem' ? "seal-variant" : "lightbulb-on-outline"} 
          size={20} 
          color={type === 'theorem' ? "#166534" : "#0369A1"} 
        />
        <Text style={[styles.highlightTitle, { color: type === 'theorem' ? "#166534" : "#0369A1" }]}>{title}</Text>
      </View>
      <Text style={styles.highlightText}>{children}</Text>
    </View>
  );

  // Custom component for standardizing Graph images
  const GraphImage = ({ source }) => (
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.graphImage} resizeMode="contain" />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- INTRODUCTION --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"The previous part brought forth the different tools for reasoning, proofing and problem solving. In this part, we will study the discrete structures that form the basis of formulating many a real-life problem."}
          </Text>
          <Text style={styles.paragraph}>
            {"The two discrete structures that we will cover are graphs and trees. A graph is a set of points, called nodes or vertices, which are interconnected by a set of lines called edges. The study of graphs, or graph theory is an important part of a number of disciplines in the fields of mathematics, engineering and computer science."}
          </Text>
        </View>

        {/* --- WHAT IS A GRAPH --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is a Graph?</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Definition − </Text> 
            {"A graph (denoted as G = (V, E)) consists of a non-empty set of vertices or nodes V and a set of edges E."}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Example − </Text> 
            {"Let us consider, a Graph is G = (V, E) where V = {a, b, c, d} and E = {{a, b}, {a, c}, {b, c}, {c, d}}"}
          </Text>
          
          <GraphImage source={require('../../assets/moduleImages/graph1.jpg')} />
          
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Degree of a Vertex − </Text> 
            {"The degree of a vertex V of a graph G (denoted by deg (V)) is the number of edges incident with the vertex V."}
          </Text>

          {/* Vertex Degree Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableRowHeader}>
              <Text style={styles.tableHeaderText}>Vertex</Text>
              <Text style={styles.tableHeaderText}>Degree</Text>
              <Text style={styles.tableHeaderText}>Even / Odd</Text>
            </View>
            {[["a", "2", "even"], ["b", "2", "even"], ["c", "3", "odd"], ["d", "1", "odd"]].map((row, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.rowAlt]}>
                <Text style={styles.tableCell}>{row[0]}</Text>
                <Text style={styles.tableCell}>{row[1]}</Text>
                <Text style={styles.tableCell}>{row[2]}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Even and Odd Vertex − </Text> 
            {"If the degree of a vertex is even, the vertex is called an even vertex and if the degree of a vertex is odd, the vertex is called an odd vertex."}
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Degree of a Graph − </Text> 
            {"The degree of a graph is the largest vertex degree of that graph. For the above graph the degree of the graph is 3."}
          </Text>

          <InfoHighlight title="The Handshaking Lemma">
            {"In a graph, the sum of all the degrees of all the vertices is equal to twice the number of edges."}
          </InfoHighlight>
        </View>

        {/* --- TYPES OF GRAPHS --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Types of Graphs</Text>
          <Text style={styles.paragraph}>
            {"There are different types of graphs, which we will learn in the following section."}
          </Text>
          
          <Text style={styles.subHeader}>Null Graph</Text>
          <Text style={styles.paragraph}>{"A null graph has no edges. The null graph of n vertices is denoted by N\u2099"}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph2.jpg')} />

          <Text style={styles.subHeader}>Simple Graph</Text>
          <Text style={styles.paragraph}>{"A graph is called simple graph/strict graph if the graph is undirected and does not contain any loops or multiple edges."}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph3.jpg')} />

          <Text style={styles.subHeader}>Multi-Graph</Text>
          <Text style={styles.paragraph}>{"If in a graph multiple edges between the same set of vertices are allowed, it is called Multigraph. In other words, it is a graph having at least one loop or multiple edges."}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph4.jpg')} />

          <Text style={styles.subHeader}>Directed and Undirected Graph</Text>
          <Text style={styles.paragraph}>{"A graph G = (V, E) is called a directed graph if the edge set is made of ordered vertex pair and a graph is called undirected if the edge set is made of unordered vertex pair."}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph5.jpg')} />
          <GraphImage source={require('../../assets/moduleImages/graph6.jpg')} />

          <Text style={styles.subHeader}>Connected and Disconnected Graph</Text>
          <Text style={styles.paragraph}>{"A graph is connected if any two vertices of the graph are connected by a path; while a graph is disconnected if at least two vertices of the graph are not connected by a path. If a graph G is disconnected, then every maximal connected subgraph of G is called a connected component of the graph G."}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph7.jpg')} />
          <GraphImage source={require('../../assets/moduleImages/graph8.jpg')} />

          <Text style={styles.subHeader}>Regular Graph</Text>
          <Text style={styles.paragraph}>{"A graph is regular if all the vertices of the graph have the same degree. In a regular graph G of degree r, the degree of each vertex of G is r."}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph9.jpg')} />

          <Text style={styles.subHeader}>Complete Graph</Text>
          <Text style={styles.paragraph}>{"A graph is called complete graph if every two vertices pair are joined by exactly one edge. The complete graph with n vertices is denoted by K\u2099"}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph10.jpg')} />

          <Text style={styles.subHeader}>Cycle Graph</Text>
          <Text style={styles.paragraph}>{"If a graph consists of a single cycle, it is called cycle graph. The cycle graph with n vertices is denoted by C\u2099"}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph11.jpg')} />

          <Text style={styles.subHeader}>Bipartite Graph</Text>
          <Text style={styles.paragraph}>{"If the vertex-set of a graph G can be split into two disjoint sets, V\u2081 and V\u2082, in such a way that each edge in the graph joins a vertex in V\u2081 to a vertex in V\u2082, and there are no edges in G that connect two vertices in V\u2081 or two vertices in V\u2082, then the graph G is called a bipartite graph."}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph12.jpg')} />

          <Text style={styles.subHeader}>Complete Bipartite Graph</Text>
          <Text style={styles.paragraph}>{"A complete bipartite graph is a bipartite graph in which each vertex in the first set is joined to every single vertex in the second set. The complete bipartite graph is denoted by K\u2093,\u209b where the graph G contains x vertices in the first set and y vertices in the second set."}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph13.jpg')} />
        </View>

        {/* --- REPRESENTATION OF GRAPHS --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Representation of Graphs</Text>
          <Text style={styles.paragraph}>{"There are mainly two ways to represent a graph −"}</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>{"• Adjacency Matrix"}</Text>
            <Text style={styles.bulletItem}>{"• Adjacency List"}</Text>
          </View>

          <Text style={styles.subHeader}>Adjacency Matrix</Text>
          <Text style={styles.paragraph}>{"An Adjacency Matrix A[V][V] is a 2D array of size V \u00d7 V where V is the number of vertices in a undirected graph. If there is an edge between V\u2093 to V\u209b then the value of A[V\u2093][V\u209b] = 1 and A[V\u209b][V\u2093] = 1, otherwise the value will be zero. And for a directed graph, if there is an edge between V\u2093 to V\u209b, then the value of A[V\u2093][V\u209b] = 1, otherwise the value will be zero."}</Text>

          <Text style={styles.boldTitle}>Adjacency Matrix of an Undirected Graph</Text>
          <Text style={styles.paragraph}>{"Let us consider the following undirected graph and construct the adjacency matrix −"}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph14.jpg')} />
          <Text style={styles.paragraph}>{"Adjacency matrix of the above undirected graph will be −"}</Text>
          
          <View style={styles.matrixBox}>
            <Text style={styles.matrixRow}>    a  b  c  d</Text>
            <Text style={styles.matrixRow}>a   0  1  1  0</Text>
            <Text style={styles.matrixRow}>b   1  0  1  0</Text>
            <Text style={styles.matrixRow}>c   1  1  0  1</Text>
            <Text style={styles.matrixRow}>d   0  0  1  0</Text>
          </View>

          <Text style={styles.boldTitle}>Adjacency Matrix of a Directed Graph</Text>
          <Text style={styles.paragraph}>{"Let us consider the following directed graph and construct its adjacency matrix −"}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph15.jpg')} />
          <Text style={styles.paragraph}>{"Adjacency matrix of the above directed graph will be −"}</Text>
          
          <View style={styles.matrixBox}>
            <Text style={styles.matrixRow}>    a  b  c  d</Text>
            <Text style={styles.matrixRow}>a   0  1  1  0</Text>
            <Text style={styles.matrixRow}>b   0  0  1  0</Text>
            <Text style={styles.matrixRow}>c   0  0  0  1</Text>
            <Text style={styles.matrixRow}>d   0  0  0  0</Text>
          </View>

          <Text style={styles.subHeader}>Adjacency List</Text>
          <Text style={styles.paragraph}>{"In adjacency list, an array (A[V]) of linked lists is used to represent the graph G with V number of vertices. An entry A[V\u2093] represents the linked list of vertices adjacent to the Vx-th vertex. The adjacency list of the undirected graph is as shown in the figure below −"}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph16.jpg')} />
        </View>

        {/* --- PLANAR VS NON-PLANAR --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Planar vs. Non-planar graph</Text>
          
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Planar graph − </Text>
            {"A graph G is called a planar graph if it can be drawn in a plane without any edges crossed. If we draw graph in the plane without edge crossing, it is called embedding the graph in the plane."}
          </Text>
          <GraphImage source={require('../../assets/moduleImages/graph17.jpg')} />

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Non-planar graph − </Text>
            {"A graph is non-planar if it cannot be drawn in a plane without graph edges crossing."}
          </Text>
          <GraphImage source={require('../../assets/moduleImages/graph18.jpg')} />
        </View>

        {/* --- ISOMORPHISM & HOMOMORPHISM --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Isomorphism</Text>
          <Text style={styles.paragraph}>
            {"If two graphs G and H contain the same number of vertices connected in the same way, they are called isomorphic graphs (denoted by G \u2245 H)."}
          </Text>
          <Text style={styles.paragraph}>
            {"It is easier to check non-isomorphism than isomorphism. If any of these following conditions occurs, then two graphs are non-isomorphic −"}
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>{"• The number of connected components are different"}</Text>
            <Text style={styles.bulletItem}>{"• Vertex-set cardinalities are different"}</Text>
            <Text style={styles.bulletItem}>{"• Edge-set cardinalities are different"}</Text>
            <Text style={styles.bulletItem}>{"• Degree sequences are different"}</Text>
          </View>
          <Text style={styles.subHeader}>Example</Text>
          <Text style={styles.paragraph}>{"The following graphs are isomorphic −"}</Text>
          <GraphImage source={require('../../assets/moduleImages/graph19.jpg')} />

          <Text style={[styles.sectionTitle, {marginTop: 20}]}>Homomorphism</Text>
          <Text style={styles.paragraph}>
            {"A homomorphism from a graph G to a graph H is a mapping (May not be a bijective mapping) h: G \u2192 H such that − (x, y) \u2208 E(G) \u2192 (h(x), h(y)) \u2208 E(H). It maps adjacent vertices of graph G to the adjacent vertices of the graph H."}
          </Text>
          <Text style={styles.subHeader}>Properties of Homomorphisms</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>{"• A homomorphism is an isomorphism if it is a bijective mapping."}</Text>
            <Text style={styles.bulletItem}>{"• Homomorphism always preserves edges and connectedness of a graph."}</Text>
            <Text style={styles.bulletItem}>{"• The compositions of homomorphisms are also homomorphisms."}</Text>
            <Text style={styles.bulletItem}>{"• To find out if there exists any homomorphic graph of another graph is a NPcomplete problem."}</Text>
          </View>
        </View>

        {/* --- EULER GRAPHS --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Euler Graphs</Text>
          <Text style={styles.paragraph}>
            {"A connected graph G is called an Euler graph, if there is a closed trail which includes every edge of the graph G. An Euler path is a path that uses every edge of a graph exactly once. An Euler path starts and ends at different vertices."}
          </Text>
          <Text style={styles.paragraph}>
            {"An Euler circuit is a circuit that uses every edge of a graph exactly once. An Euler circuit always starts and ends at the same vertex. A connected graph G is an Euler graph if and only if all vertices of G are of even degree, and a connected graph G is Eulerian if and only if its edge set can be decomposed into cycles."}
          </Text>
          <GraphImage source={require('../../assets/moduleImages/graph20.jpg')} />
          <GraphImage source={require('../../assets/moduleImages/graph21.jpg')} />
          <Text style={styles.paragraph}>
            {"The above graph is an Euler graph as a1b2c3d4e5c6f7g covers all the edges of the graph."}
          </Text>
        </View>

        {/* --- HAMILTONIAN GRAPHS --- */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Hamiltonian Graphs</Text>
          <Text style={styles.paragraph}>
            {"A connected graph G is called Hamiltonian graph if there is a cycle which includes every vertex of G and the cycle is called Hamiltonian cycle. Hamiltonian walk in graph G is a walk that passes through each vertex exactly once."}
          </Text>
          
          <InfoHighlight title="Dirac's Theorem" type="theorem">
            {"If G is a simple graph with n vertices, where n \u2265 3. If deg(v) \u2265 n/2 for each vertex v, then the graph G is Hamiltonian graph."}
          </InfoHighlight>

          <InfoHighlight title="Ore's theorem" type="theorem">
            {"If G is a simple graph with n vertices, where n \u2265 2. If deg(x) + deg(y) \u2265 n for each pair of non-adjacent vertices x and y, then the graph G is Hamiltonian graph."}
          </InfoHighlight>

          <GraphImage source={require('../../assets/moduleImages/graph22.jpg')} />
          <GraphImage source={require('../../assets/moduleImages/graph23.jpg')} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginTop: 15, marginBottom: 8 },
  boldTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginTop: 15, marginBottom: 8 },
  
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10, textAlign: 'justify' },
  bold: { fontWeight: '700', color: '#0F172A' },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%' },
  graphImage: { width: '100%', height: 180, borderRadius: 8 },
  
  bulletList: { paddingLeft: 10, marginBottom: 15 },
  bulletItem: { fontSize: 14, color: '#475569', marginBottom: 6, lineHeight: 22 },

  matrixBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginVertical: 10, alignItems: 'center' },
  matrixRow: { fontFamily: 'monospace', fontSize: 16, color: '#1E293B', letterSpacing: 4, marginBottom: 4 },

  tableContainer: { borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginVertical: 15 },
  tableRowHeader: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 12 },
  tableHeaderText: { flex: 1, fontWeight: 'bold', color: '#475569', textAlign: 'center', fontSize: 13 },
  tableRow: { flexDirection: 'row', paddingVertical: 12, backgroundColor: '#FFF' },
  rowAlt: { backgroundColor: '#F9FAFB' },
  tableCell: { flex: 1, textAlign: 'center', color: '#64748B', fontSize: 14 },

  infoHighlight: { padding: 16, borderRadius: 12, marginTop: 15, marginBottom: 15, borderLeftWidth: 4 },
  lemmaBorder: { backgroundColor: '#F0F9FF', borderLeftColor: '#0EA5E9' },
  theoremBorder: { backgroundColor: '#F0FDF4', borderLeftColor: '#22C55E' },
  highlightHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  highlightTitle: { fontWeight: '800', fontSize: 14, marginLeft: 8, textTransform: 'uppercase' },
  highlightText: { color: '#334155', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
});