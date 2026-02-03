import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ColoringEdges_8_12() {
  
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
            {"While graph coloring generally focuses on vertices, coloring the edges is equally important in discrete mathematics. It ensures that no two adjacent edges—edges sharing a common vertex—have the same color."}
          </Text>
        </View>

        {/* SECTION 1: BASICS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Fundamentals</Text>
          <Text style={styles.paragraph}>
            {"The goal of edge coloring is to achieve a \"proper edge coloring\" where adjacent edges are assigned unique colors."}
          </Text>
          
          <View style={styles.chromaticBox}>
            <Text style={styles.chromaticTitle}>Chromatic Index (\u03c7')</Text>
            <Text style={styles.chromaticText}>
              {"The minimum number of colors required to achieve a proper edge coloring of a graph G."}
            </Text>
          </View>

          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>{"Visual Logic:"}</Text>
            <Text style={styles.paragraph}>{"Edges e\u2081 and e\u2083 do not share a vertex, so they can use the same color. The same applies to e\u2082 and e\u2084."}</Text>
          </View>
        </View>

        {/* SECTION 2: VIZING'S THEOREM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="shield-check-outline" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginBottom: 0, marginLeft: 10}]}>Vizing's Theorem</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Vizing's theorem provides a guideline for finding the minimum colors required by using the maximum degree (\u0394) of the graph."}
          </Text>

          <VizingClass 
            className="Class 1 Graphs" 
            index="\u0394(G)" 
            description="Bipartite graphs always fall into this category, requiring only \u0394 colors." 
            color="#16A34A" 
          />
          
          <VizingClass 
            className="Class 2 Graphs" 
            index="\u0394(G) + 1" 
            description="Graphs that require one additional color beyond the maximum degree." 
            color="#EA580C" 
          />

          <View style={styles.boundsBox}>
            <Text style={styles.boundsText}>{"Bound: \u0394(G) \u2264 \u03c7'(G) \u2264 \u0394(G) + 1"}</Text>
          </View>
        </View>

        {/* SECTION 3: PRACTICAL APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Real-World Scheduling</Text>
          
          <View style={styles.appCard}>
            <Text style={styles.bold}>{"Chess Tournament Example:"}</Text>
            <Text style={styles.paragraph}>
              {"Consider 6 friends in a tournament (K\u2086). Model players as vertices and games as edges. Since a player can only play one game at a time, no two edges sharing a vertex can be scheduled simultaneously."}
            </Text>
            <View style={styles.resultBadge}>
              <Text style={styles.resultText}>{"K\u2086 Chromatic Index = 5 colors (5 hours total)"}</Text>
            </View>
          </View>

          <View style={[styles.appCard, {marginTop: 15}]}>
            <Text style={styles.bold}>{"Classroom Conflict Scheduling:"}</Text>
            <Text style={styles.paragraph}>
              {"Represent each class as an edge. Two edges share a vertex if the classes conflict (shared professors or rooms). \u03c7'(G) reveals the minimum unique time slots needed."}
            </Text>
          </View>
        </View>

        {/* SECTION 4: RAMSEY THEORY */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="motive-configuration" size={24} color="#7C3AED" />
            <Text style={[styles.sectionTitle, {color: '#7C3AED', marginBottom: 0, marginLeft: 10}]}>Ramsey Theory</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Focused on finding order within chaos, Ramsey Theory asks if certain patterns can be avoided. For example: can we color edges red/blue and avoid monochromatic triangles?"}
          </Text>
          <View style={styles.detailBox}>
            <Text style={styles.bold}>{"Pattern Constraints:"}</Text>
            <Text style={styles.infoText}>{"\u2022 Avoiding monochromatic triangles requires < 17 vertices with 3 colors."}</Text>
            <Text style={styles.infoText}>{"\u2022 Avoiding a monochromatic K\u2084 requires < 18 vertices with 2 colors."}</Text>
          </View>
        </View>

        {/* SECTION 5: COMPLEXITY */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Computational Challenges</Text>
          <Text style={styles.paragraph}>
            {"Finding the exact chromatic index in large graphs is computationally hard (NP-Hard). Determining if a graph is Class 1 or Class 2 is an ongoing area of research in discrete mathematics."}
          </Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"We explained the fundamentals of edge coloring, the importance of the chromatic index, and the classification provided by Vizing's Theorem. We also explored real-world applications in scheduling and the patterns analyzed in Ramsey Theory."}
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
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  chromaticBox: { backgroundColor: '#F5F3FF', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#7C3AED', marginTop: 10 },
  chromaticTitle: { color: '#7C3AED', fontWeight: '800', fontSize: 14, marginBottom: 4 },
  chromaticText: { color: '#6D28D9', fontSize: 14 },
  logicHighlight: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  classCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderLeftWidth: 4, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  classTitle: { fontWeight: '800', fontSize: 14, marginBottom: 4 },
  classDesc: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  monoMath: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', marginVertical: 4 },
  boundsBox: { backgroundColor: '#0F172A', borderRadius: 15, padding: 15, alignItems: 'center', marginTop: 10 },
  boundsText: { color: '#38BDF8', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 14 },
  appCard: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#BAE6FD' },
  resultBadge: { backgroundColor: '#FFF', padding: 10, borderRadius: 10, marginTop: 10, alignItems: 'center' },
  resultText: { color: '#0369A1', fontWeight: 'bold', fontSize: 13 },
  detailBox: { backgroundColor: '#F1F5F9', padding: 16, borderRadius: 16, marginTop: 10 },
  infoText: { fontSize: 13, color: '#475569', marginBottom: 6 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});