import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RootedUnrootedTrees_8_9() {
  
  const ComparisonRow = ({ feature, rooted, unrooted }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellLabel}>{feature}</Text>
      <Text style={styles.tableCell}>{rooted}</Text>
      <Text style={styles.tableCell}>{unrooted}</Text>
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
            {"Trees are special structures used for representing hierarchies and connections without cycles. Rooted and unrooted trees offer two different ways to structure and interpret data."}
          </Text>
          
          <View style={styles.definitionBox}>
            <Text style={styles.bold}>{"Classifications:"}</Text>
            <Text style={styles.infoText}>{"\u2022 Unrooted Trees: No designated root or starting point. All vertices are equally important."}</Text>
            <Text style={styles.infoText}>{"\u2022 Rooted Trees: Designates one vertex as the \"root,\" serving as a reference for hierarchical organization."}</Text>
          </View>
        </View>

        {/* UNROOTED TREES SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Unrooted Trees</Text>
          <Text style={styles.paragraph}>
            {"Structures with no clear hierarchy. These are common in data representations that do not require a central starting point."}
          </Text>
          
          <View style={styles.exampleBox}>
            <Text style={styles.bold}>{"City Network Example:"}</Text>
            <Text style={styles.paragraph}>{"A network of cities connected by roads without cycles. Every city is connected to at least one other, ensuring a unique path exists between each pair."}</Text>
          </View>

          <View style={styles.appBadgeRow}>
            <View style={styles.appBadge}><Text style={styles.badgeText}>{"Phylogenetic Trees"}</Text></View>
            <View style={styles.appBadge}><Text style={styles.badgeText}>{"Network Design"}</Text></View>
          </View>
        </View>

        {/* ROOTED TREES SECTION */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="family-tree" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginBottom: 0, marginLeft: 10}]}>Rooted Trees</Text>
          </View>
          <Text style={styles.paragraph}>
            {"A structured way to organize vertices by selecting one as the root, which acts as an anchor."}
          </Text>

          <View style={styles.hierarchyBox}>
            <Text style={styles.bold}>{"Rooted Structure:"}</Text>
            <Text style={styles.logicText}>{"\u2022 Parent-Child: The child node is \"downward\" from the parent."}</Text>
            <Text style={styles.logicText}>{"\u2022 Siblings: Vertices sharing the same parent."}</Text>
            <Text style={styles.logicText}>{"\u2022 Ancestors/Descendants: Nodes closer to or further from the root."}</Text>
          </View>

          <Text style={styles.subLabel}>Levels and Depths</Text>
          <Text style={styles.paragraph}>{"Vertices are grouped into levels (Step 0, 1, 2...) based on distance from the root. The number of levels determines the tree's depth."}</Text>
          
          <View style={styles.algorithmHighlight}>
            <Text style={styles.bold}>{"Rooted Traversal:"}</Text>
            <Text style={styles.highlightText}>{"\u2022 BFS: Level-by-level, similar to reading a book chapter-by-chapter."}</Text>
            <Text style={styles.highlightText}>{"\u2022 DFS: Goes as far down a path as possible before backtracking."}</Text>
          </View>
        </View>

        {/* COMPARISON TABLE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Key Differences</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.headerCell}>Feature</Text>
              <Text style={styles.headerCell}>Rooted</Text>
              <Text style={styles.headerCell}>Unrooted</Text>
            </View>
            <ComparisonRow feature="Root Node" rooted="Designated" unrooted="None" />
            <ComparisonRow feature="Structure" rooted="Hierarchical" unrooted="Non-hierarchical" />
            <ComparisonRow feature="Traversal" rooted="BFS/DFS" unrooted="No specific order" />
            <ComparisonRow feature="Examples" rooted="File systems" unrooted="Relational data" />
          </View>
          <Text style={styles.caption}>{""}</Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"Rooted trees provide an ideal hierarchical model for situations where levels and organization matter. Unrooted trees are effective in scenarios without a central point, such as phylogenetic lineage."}
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
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  definitionBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 6 },
  exampleBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 10 },
  appBadgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 15 },
  appBadge: { backgroundColor: '#F1F5F9', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  badgeText: { fontSize: 12, color: '#475569', fontWeight: 'bold' },
  hierarchyBox: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, marginVertical: 10 },
  logicText: { color: '#166534', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 15, marginBottom: 12, letterSpacing: 1 },
  algorithmHighlight: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#7C3AED', marginTop: 10 },
  highlightText: { color: '#7C3AED', fontSize: 14, marginBottom: 4, fontStyle: 'italic' },
  tableContainer: { borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginTop: 10 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#F8FAFC', paddingVertical: 12 },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: '800', color: '#475569', fontSize: 12 },
  tableRow: { flexDirection: 'row', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  tableCellLabel: { flex: 1, paddingLeft: 15, fontWeight: '700', color: '#1E293B', fontSize: 13 },
  tableCell: { flex: 1, textAlign: 'center', color: '#64748B', fontSize: 12 },
  caption: { fontSize: 10, color: '#94A3B8', marginTop: 8, textAlign: 'right' },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});