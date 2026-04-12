import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RootedUnrootedTrees_8_8() {
  
  const ComparisonRow = ({ feature, rooted, unrooted, isAlt }) => (
    <View style={[styles.tableRow, isAlt && styles.tableRowAlt]}>
      <Text style={styles.tableCellLabel}>{feature}</Text>
      <Text style={styles.tableCell}>{rooted}</Text>
      <Text style={styles.tableCell}>{unrooted}</Text>
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
          <Text style={styles.topicSubtitle}>Module 8.8</Text>
          <Text style={styles.topicTitle}>Rooted and Unrooted Trees</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Trees are special structures in graph theory and discrete mathematics. Trees are used for representing hierarchies and connections without cycles. The rooted and unrooted trees gives us two different ways to structure and interpret such data."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will see rooted and unrooted trees. Their characteristics, examples, and applications. We will see the key differences and use examples to highlight each types properties for a better understanding."}
          </Text>
        </View>

        {/* TREES IN GRAPH THEORY */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Trees in Graph Theory</Text>
          <Text style={styles.paragraph}>
            {"In graph theory, a tree is a type of connected graph that has no cycles. Each node in the tree represents an entity, and each edge represents a connection between entities."}
          </Text>
          <Text style={styles.paragraph}>
            {"Trees can be structured in various ways. We can categorize them as either rooted or unrooted depending on their structure and use."}
          </Text>

          <View style={styles.definitionBox}>
            <Text style={styles.infoText}><Text style={styles.bold}>Unrooted Trees \u2212</Text> These are trees with no designated root or starting point. All vertices in unrooted trees are equally important without any hierarchy.</Text>
            <View style={styles.divider} />
            <Text style={styles.infoText}><Text style={styles.bold}>Rooted Trees \u2212</Text> In contrast, a rooted tree designates one vertex as the “root”. This vertex serves as a reference point for organizing all other vertices hierarchically.</Text>
          </View>

          <GraphImage source={require('../../assets/moduleImages/rot1.jpg')} height={220} />
        </View>

        {/* UNROOTED TREES SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Unrooted Trees</Text>
          <Text style={styles.paragraph}>
            {"Unrooted trees are such structures with no clear hierarchy or direction. This type of tree is common in data representations and does not require a central or “starting” point."}
          </Text>
          
          <Text style={styles.subLabel}>Properties of Unrooted Trees</Text>
          <Text style={styles.paragraph}>
            {"Let us see some of the properties of unrooted trees. There is node without any specific node serving as a reference. In unrooted trees, each edge represents a connection with no particular order."}
          </Text>

          <View style={styles.exampleBox}>
            <Text style={styles.bold}>{"Example"}</Text>
            <Text style={[styles.paragraph, { marginTop: 8, marginBottom: 0 }]}>
              {"Consider a network of cities connected by roads where the only requirement is to connect all cities without any cycles (circular routes). In this case, an unrooted tree could be used to represent the network. Here, each city is connected to at least one other. This ensuring a unique path exists between each pair without loops."}
            </Text>
          </View>

          <Text style={styles.subLabel}>Applications of Unrooted Trees</Text>
          <Text style={styles.paragraph}>{"The unrooted trees are used in scenarios where the structure does not need a hierarchical organization, like \u2212"}</Text>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="dna" size={20} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Phylogenetic Trees \u2212</Text> In biology, unrooted phylogenetic trees represent evolutionary relationships between species without assuming a common ancestor.</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="transit-connection-variant" size={20} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Network Design \u2212</Text> Designing computer networks where devices connect without a central hub is another example. In this setup, unrooted trees ensure redundancy and connectivity without a hierarchical structure.</Text>
          </View>
        </View>

        {/* ROOTED TREES SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Rooted Trees</Text>
          <Text style={styles.paragraph}>
            {"We have another type of trees. The rooted trees. It has a clear hierarchy by selecting one vertex as the root. This root acts as an anchor, giving a structured way to organize the vertices."}
          </Text>

          <Text style={styles.subLabel}>Structure of Rooted Trees</Text>
          <Text style={styles.paragraph}>
            {"In a rooted tree, the relationships are organized based on proximity to the root. Each node can have child nodes, and each node except the root has exactly one parent. So there is a parent-child relationship. Like a family tree or an organizational chart."}
          </Text>

          <View style={styles.hierarchyBox}>
            <Text style={styles.logicText}><Text style={styles.bold}>Parent-Child Relationship \u2212</Text> In a rooted tree, if two vertices are connected by an edge, one is designated as the parent and the other as the child. The child node is "downward" from the parent.</Text>
            <Text style={styles.logicText}><Text style={styles.bold}>Siblings \u2212</Text> Vertices that share the same parent are siblings.</Text>
            <Text style={styles.logicText}><Text style={styles.bold}>Ancestors and Descendants \u2212</Text> In this tree structure, nodes can have ancestors (nodes closer to the root) and descendants (nodes further from the root).</Text>
          </View>

          <GraphImage source={require('../../assets/moduleImages/rot2.jpg')} height={240} />

          <View style={styles.exampleBox}>
            <Text style={styles.bold}>{"Example"}</Text>
            <Text style={[styles.paragraph, { marginTop: 8, marginBottom: 0 }]}>
              {"Consider a corporate hierarchy where the CEO is at the top. And each department head reports to the CEO, and each department head has employees reporting to them. So the CEO serves as the root. There are department heads as children, and employees under each department head as grandchildren of the root."}
            </Text>
          </View>

          <Text style={styles.subLabel}>Properties of Levels and Depths</Text>
          <Text style={styles.paragraph}>{"Vertices are grouped into levels based on their distance from the root, with the root being at level 0. Each level represents a step down in hierarchy, and the number of levels can determine the trees depth."}</Text>
          
          <View style={styles.exampleBox}>
            <Text style={styles.bold}>{"Example"}</Text>
            <Text style={[styles.paragraph, { marginTop: 8, marginBottom: 0 }]}>
              {"Consider a binary tree with three levels. The root is at level 0, its children are at level 1, and so on. This structure is there to give the vertices are systematically organized. They are making it easy to trace paths up or down the hierarchy."}
            </Text>
          </View>

          <GraphImage source={require('../../assets/moduleImages/rot3.jpg')} height={200} />

          <Text style={styles.subLabel}>Algorithms and Traversal in Rooted Trees</Text>
          <Text style={styles.paragraph}>{"One of the primary reasons the rooted trees are useful is their ease of traversal. Traversal means visiting each vertex in a specific order."}</Text>

          <View style={styles.algorithmHighlight}>
            <Text style={styles.highlightText}><Text style={styles.bold}>Breadth-First Search (BFS) \u2212</Text> The basic traversal is BFS. It starts at the root and visits all vertices level by level. This is like reading a book chapter by chapter, where each chapter (or level) is read fully before moving to the next.</Text>
            <Text style={styles.highlightText}><Text style={styles.bold}>Depth-First Search (DFS) \u2212</Text> Another one is It goes as far down one path as possible before backtracking. This method is like exploring a family tree by tracing one lineage from great-grandparents down to current generations before looking at other branches.</Text>
          </View>
        </View>

        {/* COMPARISON TABLE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Difference between Rooted and Unrooted Trees</Text>
          <Text style={styles.paragraph}>{"Rooted and unrooted trees have several differences because of their structures. Let us see them in the following table \u2212"}</Text>

          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.headerCell}>Feature</Text>
              <Text style={styles.headerCell}>Rooted Tree</Text>
              <Text style={styles.headerCell}>Unrooted Tree</Text>
            </View>
            <ComparisonRow feature="Root Node" rooted="Has a designated root node" unrooted="No root node" isAlt={false} />
            <ComparisonRow feature="Hierarchy" rooted="Hierarchical structure" unrooted="Non-hierarchical" isAlt={true} />
            <ComparisonRow feature="Traversals" rooted="BFS, DFS (based on the root)" unrooted="No specific traversal order" isAlt={false} />
            <ComparisonRow feature="Applications" rooted="File systems, corporate structures" unrooted="Phylogenetic trees, non-hierarchical networks" isAlt={true} />
          </View>
        </View>

        {/* REAL-WORLD APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Applications</Text>
          <Text style={styles.paragraph}>{"Rooted and unrooted trees have many such applications in computer science, biology, and network theory."}</Text>

          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Rooted Trees in Web Design \u2212 </Text>In web design, rooted trees organize web pages by hierarchy. For example, a website might start with the homepage as the root, with main sections branching off, and each section containing more specific subpages.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Unrooted Trees in Biology \u2212 </Text>Unrooted trees often represent relationships in biology, such as between species that share similar characteristics but do not necessarily have a single common ancestor. This helps biologists understand similarities without assuming a direct lineage.
          </Text>

          <Text style={styles.subLabel}>Data Organization</Text>
          <Text style={styles.paragraph}>{"When organizing data, rooted and unrooted trees each have distinct advantages \u2212"}</Text>

          <View style={styles.appRow}>
            <MaterialCommunityIcons name="file-tree" size={20} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Rooted Trees for Data Hierarchies \u2212</Text> When data requires a clear organization from top to bottom, such as in XML files. The root provides a starting point. This is making it easy to navigate through structured layers.</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="google-circles-extended" size={20} color="#0369A1" />
            <Text style={styles.appText}><Text style={styles.bold}>Unrooted Trees for Relational Data \u2212</Text> If the data does not require hierarchy, the unrooted trees offer flexibility by showing relationships without emphasizing a central point.</Text>
          </View>
          <Text style={styles.paragraph}>
            {"For example, a computer file system uses rooted trees to allow users to follow a single path from the main directory to each file. On the other hand, a social network might use an unrooted tree to make mutual friendships without implying a hierarchy."}
          </Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we explained the features of rooted and unrooted trees, based on their structures and applications. Rooted trees provide a hierarchical model that is ideal for situations where organization and levels matter."}
          </Text>
          <Text style={styles.paragraph}>
            {"We also understood how unrooted trees are effective in scenarios without a central point, like phylogenetic trees. In addition, we touched upon some basic traversal techniques in rooted trees such as BFS and DFS."}
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
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 10 },
  graphImage: { width: '100%' },

  definitionBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginVertical: 10 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  infoText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  
  exampleBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginVertical: 10, borderWidth: 1, borderColor: '#BAE6FD' },
  
  hierarchyBox: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, marginVertical: 10, borderWidth: 1, borderColor: '#BBF7D0' },
  logicText: { color: '#166534', fontSize: 14, lineHeight: 22, marginBottom: 8 },
  
  subLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', textTransform: 'uppercase', marginTop: 15, marginBottom: 10, letterSpacing: 0.5 },
  
  algorithmHighlight: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#7C3AED', marginVertical: 10 },
  highlightText: { color: '#5B21B6', fontSize: 14, marginBottom: 8, lineHeight: 22 },
  
  tableContainer: { borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginVertical: 10 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 14 },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: '800', color: '#0F172A', fontSize: 13 },
  tableRow: { flexDirection: 'row', paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#F1F5F9', backgroundColor: '#FFF' },
  tableRowAlt: { backgroundColor: '#F8FAFC' },
  tableCellLabel: { flex: 1, paddingLeft: 15, fontWeight: '800', color: '#334155', fontSize: 13 },
  tableCell: { flex: 1, paddingHorizontal: 10, color: '#475569', fontSize: 13, lineHeight: 20 },
  
  appRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD' },
  appText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#0369A1', lineHeight: 22 },
});