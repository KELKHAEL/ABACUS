import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Probability_5_1() {
  
  // Custom Component for Probability Definitions
  const ConceptBox = ({ title, definition, icon, color }) => (
    <View style={[styles.conceptCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.conceptText}>{definition}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Probability is conceptualized as finding the chance of occurrence of an event. Mathematically, it is the study of random processes and their outcomes. Its laws have wide applicability in genetics, weather forecasting, stock markets, and more."}
      </Text>

      {/* SECTION 1: BASIC CONCEPTS */}
      <Text style={styles.sectionHeader}>{"Basic Concepts"}</Text>
      
      <ConceptBox 
        title={"Random Experiment"}
        icon={"flask-outline"}
        color={"#0369A1"}
        definition={"An experiment where all possible outcomes are known but the exact output cannot be predicted in advance (e.g., tossing a fair coin)."}
      />

      <ConceptBox 
        title={"Sample Space (S)"}
        icon={"set-center"}
        color={"#16941c"}
        definition={"The set of all possible outcomes of an experiment. For a coin toss, S = {H, T}."}
      />

      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaLabel}>{"Fundamental Probability Formula:"}</Text>
        <Text style={styles.mainFormula}>{"P(E) = n(favorable) / n(total)"}</Text>
        <Text style={styles.caption}>{"The probability varies between 0 (0%) and 1 (100%)."}</Text>
      </View>

      {/* SECTION 2: CLASSIC EXAMPLES */}
      <Text style={styles.sectionHeader}>{"Classic Examples"}</Text>
      
      <View style={styles.exampleGrid}>
        <View style={styles.exampleItem}>
          <Text style={styles.bold}>{"Tossing a Coin"}</Text>
          <Text style={styles.exampleText}>{"Outcomes: 2 (H, T)\nP(Head) = 1/2"}</Text>
        </View>
        <View style={styles.exampleItem}>
          <Text style={styles.bold}>{"Throwing a Die"}</Text>
          <Text style={styles.exampleText}>{"Outcomes: 6 (1-6)\nP(Even) = 3/6 = 1/2"}</Text>
        </View>
      </View>

      {/* SECTION 3: PROBABILITY AXIOMS */}
      <Text style={styles.sectionHeader}>{"Probability Axioms"}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{"1. 0 \u2264 P(x) \u2264 1."}</Text>
        <Text style={styles.infoText}>{"2. Impossible event = 0; Certain event = 1."}</Text>
        <Text style={styles.infoText}>{"3. Mutually Exclusive: P(A \u222A B) = P(A) + P(B)."}</Text>
      </View>

      {/* SECTION 4: CONDITIONAL PROBABILITY */}
      <Text style={styles.sectionHeader}>{"Conditional Probability"}</Text>
      <Text style={styles.paragraph}>
        {"The probability that an event B will occur given that an event A has already occurred."}
      </Text>

      <View style={styles.darkFormulaBox}>
        <Text style={styles.darkFormulaText}>{"P(B|A) = P(A \u2229 B) / P(A)"}</Text>
      </View>

      <View style={styles.problemBox}>
        <Text style={styles.problemTitle}>{"Example: Cycle & Bike Owners"}</Text>
        <Text style={styles.problemText}>{"In a country, 50% own a cycle (A) and 30% own both (A\u2229B). Probability a teenager owns a bike given they own a cycle?"}</Text>
        <Text style={styles.solutionText}>{"P(B|A) = 0.3 / 0.5 = 0.6 (60%)"}</Text>
      </View>

      {/* SECTION 5: BAYES' THEOREM */}
      <Text style={styles.sectionHeader}>{"Bayes' Theorem"}</Text>
      <Text style={styles.paragraph}>
        {"Used to calculate the probability of an event based on prior knowledge of conditions related to the event."}
      </Text>

      <View style={styles.bayesCard}>
        <Text style={styles.bayesTitle}>{"General Formula:"}</Text>
        <Text style={styles.bayesMath}>{"P(A|B) = [P(B|A)P(A)] / \u03A3 P(B|Ai)P(Ai)"}</Text>
      </View>

      <View style={styles.appBox}>
        <Text style={styles.bold}>{"Applications:"}</Text>
        <Text style={styles.appText}>{"• Situations where events are mutually exclusive."}</Text>
        <Text style={styles.appText}>{"• When conditional probabilities and prior probabilities are known."}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we elaborated on probability, from basic dice throws to complex Bayesian analysis. We understood steps to find probability, established axioms, and learned how conditional knowledge updates our understanding of events."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  conceptCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  conceptText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  formulaHighlight: { backgroundColor: '#F0FDF4', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  formulaLabel: { fontSize: 12, color: '#166534', fontWeight: 'bold', marginBottom: 5 },
  mainFormula: { fontSize: 18, color: '#166534', fontWeight: 'bold', fontFamily: 'monospace' },
  caption: { fontSize: 11, color: '#94A3B8', marginTop: 8 },
  exampleGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  exampleItem: { width: '48%', backgroundColor: '#F1F5F9', padding: 12, borderRadius: 10 },
  exampleText: { fontSize: 12, color: '#475569', marginTop: 4 },
  infoBox: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B' },
  infoText: { fontSize: 13, color: '#92400E', marginBottom: 5, fontWeight: '500' },
  darkFormulaBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 12, alignItems: 'center', marginVertical: 15 },
  darkFormulaText: { color: '#38BDF8', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 14 },
  problemBox: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 20 },
  problemTitle: { fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginBottom: 5 },
  problemText: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginBottom: 10 },
  solutionText: { fontSize: 14, color: '#16941c', fontWeight: 'bold', textAlign: 'right' },
  bayesCard: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#DDD6FE', marginBottom: 15 },
  bayesTitle: { fontSize: 13, fontWeight: 'bold', color: '#7C3AED', marginBottom: 8 },
  bayesMath: { fontSize: 13, fontFamily: 'monospace', color: '#5B21B6', textAlign: 'center' },
  appBox: { padding: 10, marginBottom: 15 },
  appText: { fontSize: 12, color: '#64748B', marginTop: 4 }
});