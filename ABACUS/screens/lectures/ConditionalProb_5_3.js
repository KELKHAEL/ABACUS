import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ConditionalProb_5_3() {
  
  // Custom Component for Probability Logic
  const LogicCard = ({ title, formula, logic, color }) => (
    <View style={[styles.lCard, { borderTopColor: color }]}>
      <Text style={[styles.lTitle, { color: color }]}>{title}</Text>
      <View style={styles.mathHighlight}>
        <Text style={styles.mathText}>{formula}</Text>
      </View>
      <Text style={styles.lLogic}>{logic}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Conditional Probability and Independence help us find the likelihood of an event occurring, given that something else has already happened. These concepts shift our focus from the whole sample space to a specific part of it."}
      </Text>

      {/* SECTION 1: CONDITIONAL PROBABILITY */}
      <Text style={styles.sectionHeader}>{"What is Conditional Probability?"}</Text>
      <Text style={styles.paragraph}>
        {"It is the probability of an event that occurs given that another event has already occurred. We read P(E | F) as \"the probability of event E given that event F has occurred\"."}
      </Text>

      <LogicCard 
        title={"The Conditional Formula"}
        formula={"P(E | F) = P(E \u2229 F) / P(F)"}
        logic={"Where P(F) \u2260 0. It is the ratio of the chance that both events happen to the chance that the given condition happens alone."}
        color={"#0369A1"}
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>{"Case Study: College Graduates & Salaries"}</Text>
        <Text style={styles.exampleText}>{"• 25% earn >$50k (H)"}</Text>
        <Text style={styles.exampleText}>{"• 20% are college graduates (C)"}</Text>
        <Text style={styles.exampleText}>{"• 15% are both graduates and earn >$50k (H \u2229 C)"}</Text>
        <View style={styles.divider} />
        <Text style={styles.resultText}>{"P(H | C) = 0.15 / 0.20 = 0.75 (75%)"}</Text>
      </View>

      {/* SECTION 2: THE PRODUCT RULE */}
      <Text style={styles.sectionHeader}>{"The Product Rule"}</Text>
      <Text style={styles.paragraph}>
        {"A rearrangement of the conditional formula used to find the chance that two things happen together."}
      </Text>

      <View style={styles.formulaCard}>
        <Text style={styles.formulaTextSmall}>{"P(E \u2229 F) = P(F) \u00d7 P(E | F)"}</Text>
      </View>

      <View style={styles.problemCard}>
        <Text style={styles.bold}>{"Example: Drawing Cards (No Replacement)"}</Text>
        <Text style={styles.infoText}>{"Probability first is Red (F) and second is Black (E)?"}</Text>
        <Text style={styles.mathStep}>{"1. P(F) = 26/52 = 1/2"}</Text>
        <Text style={styles.mathStep}>{"2. P(E | F) = 26/51 (since 1 red card is gone)"}</Text>
        <Text style={styles.totalResult}>{"Total: 1/2 \u00d7 26/51 = 13/51 (\u2248 25%)"}</Text>
      </View>

      {/* SECTION 3: INDEPENDENCE */}
      <Text style={styles.sectionHeader}>{"Independence in Probability"}</Text>
      <Text style={styles.paragraph}>
        {"Two events are independent if knowing that one event occurred does not change the probability of the other event."}
      </Text>

      <View style={styles.independenceBox}>
        <Text style={styles.indTitle}>{"Independence Criteria:"}</Text>
        <Text style={styles.indText}>{"\u2022 P(E \u2229 F) = P(E) \u00d7 P(F)"}</Text>
        <Text style={styles.indText}>{"\u2022 P(E | F) = P(E)"}</Text>
      </View>

      <View style={styles.analogyBox}>
        <MaterialCommunityIcons name="eye-outline" size={24} color={"#92400E"} />
        <Text style={styles.analogyText}>
          <Text style={styles.bold}>{"Example:"}</Text>{" Being a psychology major and having brown eyes are independent; knowing one doesn't help you predict the other."}
        </Text>
      </View>

      {/* SECTION 4: MULTIPLE EVENTS */}
      <Text style={styles.sectionHeader}>{"Independence of Multiple Events"}</Text>
      <View style={styles.darkCard}>
        <Text style={styles.darkLabel}>{"Problem: Stereo System Defects"}</Text>
        <Text style={styles.darkText}>{"CD Player (98% OK), Amplifier (97% OK), 2 Speakers (93% OK each)."}</Text>
        <Text style={styles.darkMath}>{"P(No Defect) = 0.98 \u00d7 0.97 \u00d7 0.93\u00b2 \u2248 0.82"}</Text>
        <Text style={styles.darkResult}>{"Total System Reliability: 82%"}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained conditional probability and how it updates based on known conditions. We explored the Product Rule and learned to identify independent events where outcomes do not influence each other, providing real-world context from salary analysis to electronic reliability."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  lCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  lTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  mathHighlight: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', marginBottom: 10 },
  mathText: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  lLogic: { fontSize: 12, color: '#64748B', fontStyle: 'italic', textAlign: 'center' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20 },
  exampleText: { fontSize: 13, color: '#166534', marginBottom: 4 },
  divider: { height: 1, backgroundColor: '#BBF7D0', marginVertical: 10 },
  resultText: { fontSize: 15, fontWeight: 'bold', color: '#166534', textAlign: 'right' },
  formulaCard: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  formulaTextSmall: { fontFamily: 'monospace', fontSize: 14, color: '#475569', fontWeight: 'bold' },
  problemCard: { padding: 15, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  infoText: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  mathStep: { fontSize: 13, color: '#0F172A', fontFamily: 'monospace', marginBottom: 4 },
  totalResult: { fontSize: 14, fontWeight: 'bold', color: '#16941c', textAlign: 'right', marginTop: 10 },
  independenceBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 15 },
  indTitle: { fontSize: 14, fontWeight: 'bold', color: '#0369A1', marginBottom: 5 },
  indText: { fontSize: 14, color: '#0369A1', fontFamily: 'monospace' },
  analogyBox: { flexDirection: 'row', backgroundColor: '#FFFBEB', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B', alignItems: 'center', marginBottom: 20 },
  analogyText: { flex: 1, marginLeft: 12, fontSize: 13, color: '#92400E', lineHeight: 20 },
  darkCard: { backgroundColor: '#1E293B', padding: 20, borderRadius: 15, marginBottom: 25 },
  darkLabel: { color: '#BBF7D0', fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  darkText: { color: '#94A3B8', fontSize: 12, marginBottom: 10 },
  darkMath: { color: 'white', fontFamily: 'monospace', fontSize: 14, textAlign: 'center', marginBottom: 10 },
  darkResult: { color: '#38BDF8', textAlign: 'right', fontWeight: 'bold', fontSize: 13 }
});