import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
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
            {"Euler paths and circuits are fundamental concepts in Graph Theory. They allow us to solve real-world problems like network traversal, delivering mail, and planning circuits by visiting each edge in a graph exactly once."}
          </Text>
        </View>

        {/* DEFINITIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Definitions</Text>
          
          <Text style={styles.subLabel}>1. Euler Path</Text>
          <Text style={styles.paragraph}>
            {"A sequence where every edge is visited exactly once. If roads are edges and intersections are vertices, an Euler path travels every road without backtracking. It does not need to return to the starting point."}
          </Text>
          <View style={styles.exampleTrace}>
            <Text style={styles.traceText}>{"Path: A \u2192 B \u2192 C \u2192 E \u2192 D \u2192 C \u2192 A \u2192 D \u2192 B"}</Text>
          </View>

          <Text style={styles.subLabel}>2. Euler Circuit</Text>
          <Text style={styles.paragraph}>
            {"A special Euler path that starts and ends at the same vertex. Think of a postal route starting at the office, covering every street once, and returning to the start."}
          </Text>
          <View style={[styles.exampleTrace, { backgroundColor: '#F0F9FF' }]}>
            <Text style={[styles.traceText, { color: '#0369A1' }]}>{"Circuit: A \u2192 C \u2192 B \u2192 D \u2192 A"}</Text>
          </View>
        </View>

        {/* THE KÖNIGSBERG PROBLEM */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="bridge" size={24} color="#0F172A" />
            <Text style={styles.sectionTitle}>The Bridges of Königsberg</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Citizens wondered if they could walk through the city crossing each of the seven bridges exactly once. Leonhard Euler proved it impossible because the graph had more than two vertices with an odd degree. This marked the birth of Graph Theory."}
          </Text>
          
        </View>

        {/* CONDITIONS SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Existence Conditions</Text>
          <Text style={styles.paragraph}>{"The existence of a path or circuit depends entirely on vertex degrees (number of incident edges):"}</Text>
          
          <ConditionBadge 
            type="Euler Path" 
            color="#EA580C" 
            condition="Exactly two vertices have an ODD degree." 
            result="Start at one odd node, end at the other." 
          />
          
          <ConditionBadge 
            type="Euler Circuit" 
            color="#16A34A" 
            condition="Every vertex has an EVEN degree." 
            result="Start and end at any vertex." 
          />

          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>{"Why Even Degrees? "}</Text>
            <Text style={styles.highlightText}>
              {"To leave a vertex you just entered, you need an unpaired edge. Odd degrees create 'dead ends' where you get stranded after covering all edges."}
            </Text>
          </View>
        </View>

        {/* EXAMPLES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Visualizing Degrees</Text>
          <Text style={styles.bold}>{"Simple Euler Path (Straight Line A-B-C-D):"}</Text>
          <Text style={styles.paragraph}>{"\u2022 A & D (Degree 1 \u2212 Odd) | B & C (Degree 2 \u2212 Even)"}</Text>
          <Text style={styles.paragraph}>{"Since exactly two are odd, a path exists from A to D."}</Text>
          
          <View style={styles.divider} />

          <Text style={styles.bold}>{"Simple Euler Circuit (Triangle):"}</Text>
          <Text style={styles.paragraph}>{"\u2022 All three vertices (Degree 2 \u2212 Even)"}</Text>
          <Text style={styles.paragraph}>{"Fulfills conditions for a circuit starting at any vertex."}</Text>
          
        </View>

        {/* APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Practical Applications</Text>
          <View style={styles.appGrid}>
            <View style={styles.appItem}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} color="#0369A1" />
              <Text style={styles.appText}>{"Postal & Garbage Routes"}</Text>
            </View>
            <View style={styles.appItem}>
              <MaterialCommunityIcons name="dna" size={20} color="#0369A1" />
              <Text style={styles.appText}>{"DNA Sequencing"}</Text>
            </View>
            <View style={styles.appItem}>
              <MaterialCommunityIcons name="road-variant" size={20} color="#0369A1" />
              <Text style={styles.appText}>{"Road Maintenance Planning"}</Text>
            </View>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"We explained Euler paths and circuits, identifying the core requirement of vertex parity. By counting odd degrees, we can efficiently plan traversals for logistics and biological research without manual testing."}
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
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#64748B', textTransform: 'uppercase', marginTop: 15, marginBottom: 8, letterSpacing: 1 },
  exampleTrace: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#CBD5E1', marginVertical: 10 },
  traceText: { fontFamily: 'monospace', fontSize: 13, color: '#475569', fontWeight: 'bold' },
  conditionCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderLeftWidth: 5, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  conditionType: { fontWeight: '900', fontSize: 14, marginBottom: 6, textTransform: 'uppercase' },
  conditionText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  resultTag: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 8, marginTop: 10 },
  resultTagText: { fontSize: 11, fontWeight: 'bold' },
  logicHighlight: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, marginTop: 10 },
  highlightText: { color: '#166534', fontSize: 14, lineHeight: 22, fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 15 },
  appGrid: { gap: 10 },
  appItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', padding: 12, borderRadius: 12 },
  appText: { marginLeft: 12, fontSize: 13, color: '#1E293B', fontWeight: '700' },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});