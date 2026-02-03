import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MathematicalInduction_7_1() {
  
  // Custom Component for Step Highlights
  const StepCard = ({ number, title, description, color }) => (
    <View style={[styles.stepCard, { borderLeftColor: color }]}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepBadge, { backgroundColor: color }]}>
          <Text style={styles.stepBadgeText}>{number}</Text>
        </View>
        <Text style={[styles.stepTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.stepDesc}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Mathematical induction is a technique for proving results or establishing statements for natural numbers. It provides a systematic way to show a theorem is true for every natural number."}
      </Text>

      {/* SECTION 1: THE TWO MAIN STEPS */}
      <Text style={styles.sectionHeader}>{"The Induction Process"}</Text>
      <Text style={styles.paragraph}>{"The technique involves two essential steps to prove a statement:"}</Text>
      
      <StepCard 
        number={"1"} 
        title={"Base Step"} 
        color={"#0369A1"}
        description={"It proves that a statement is true for the initial value (usually n = 1)."} 
      />

      <StepCard 
        number={"2"} 
        title={"Inductive Step"} 
        color={"#16941c"}
        description={"It proves that if the statement is true for the nth iteration (n = k), then it is also true for the (n+1)th iteration."} 
      />

      {/* SECTION 2: WORKED PROBLEMS */}
      <Text style={styles.sectionHeader}>{"Worked Problems"}</Text>

      {/* Problem 1: Divisibility */}
      <View style={styles.problemBox}>
        <Text style={styles.problemTitle}>{"Problem 1: Divisibility"}</Text>
        <Text style={styles.questionText}>{"Prove 3\u207f - 1 is a multiple of 2 for n = 1, 2, ..."}</Text>
        <View style={styles.solutionHeader}>
          <MaterialCommunityIcons name="check-circle" size={16} color="#166534" />
          <Text style={styles.solutionTitle}>{"Solution Steps"}</Text>
        </View>
        <Text style={styles.mathStep}>{"\u2022 n=1: 3\u00b9 - 1 = 2 (Multiple of 2)"}</Text>
        <Text style={styles.mathStep}>{"\u2022 Assume k: 3\u1d4f - 1 is a multiple of 2"}</Text>
        <Text style={styles.mathStep}>{"\u2022 Check k+1: 3\u1d4f\u207a\u00b9 - 1 = 3 \u00d7 3\u1d4f - 1 = (2 \u00d7 3\u1d4f) + (3\u1d4f - 1)"}</Text>
        <Text style={styles.finalProof}>{"Result: Both parts are multiples of 2. Proved."}</Text>
      </View>

      {/* Problem 2: Summation */}
      <View style={[styles.problemBox, { borderColor: '#BAE6FD' }]}>
        <Text style={[styles.problemTitle, { color: '#0369A1' }]}>{"Problem 2: Summations"}</Text>
        <Text style={styles.questionText}>{"1 + 3 + 5 + ... + (2n - 1) = n\u00b2"}</Text>
        <Text style={styles.mathStep}>{"\u2022 Assume for n=k: 1 + ... + (2k-1) = k\u00b2"}</Text>
        <Text style={styles.mathStep}>{"\u2022 Check k+1: k\u00b2 + (2(k+1) - 1) = k\u00b2 + 2k + 1 = (k+1)\u00b2"}</Text>
        <Text style={[styles.finalProof, { color: '#0369A1' }]}>{"Inductive step satisfied. Proved."}</Text>
      </View>

      {/* SECTION 3: STRONG INDUCTION */}
      <Text style={styles.sectionHeader}>{"Strong Induction"}</Text>
      <Text style={styles.paragraph}>
        {"Strong induction is another form of mathematical induction where we assume the proposition P(n) is true for ALL positive integers up to k."}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>{"Definition of Strong Induction:"}</Text>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Step 1:"}</Text>{" Prove initial proposition P(1) is true."}</Text>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Step 2:"}</Text>{" Prove the conditional: [P(1) \u2227 P(2) \u2227 ... \u2227 P(k)] \u2192 P(k+1) is true."}</Text>
      </View>

      {/* SECTION 4: POWER RULE PROBLEM */}
      <Text style={styles.sectionHeader}>{"Induction and Algebra"}</Text>
      <View style={styles.darkCard}>
        <Text style={styles.darkLabel}>{"Problem 3: Power Rule"}</Text>
        <Text style={styles.darkText}>{"Prove (ab)\u207f = a\u207f b\u207f for every natural number n."}</Text>
        <View style={styles.mathBlock}>
          <Text style={styles.mathLine}>{"Given (ab)\u1d4f = a\u1d4f b\u1d4f"}</Text>
          <Text style={styles.mathLine}>{"(ab)\u1d4f(ab) = (a\u1d4f b\u1d4f)(ab)"}</Text>
          <Text style={styles.mathLine}>{"(ab)\u1d4f\u207a\u00b9 = (a\u1d4f a\u00b9)(b\u1d4f b\u00b9)"}</Text>
          <Text style={styles.mathLine}>{"(ab)\u1d4f\u207a\u00b9 = a\u1d4f\u207a\u00b9 b\u1d4f\u207a\u00b9"}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained mathematical induction as a technique for proving results for natural numbers. We demonstrated how to build proofs through base and inductive steps and touched upon the stronger form of induction used for more complex propositional functions."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  stepCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderLeftWidth: 6, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepBadge: { width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  stepBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  stepTitle: { fontSize: 15, fontWeight: 'bold' },
  stepDesc: { fontSize: 13, color: '#475569', lineHeight: 18 },
  problemBox: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#DCFCE7', marginBottom: 20 },
  problemTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 8 },
  questionText: { fontSize: 13, color: '#0F172A', fontWeight: 'bold', fontStyle: 'italic', marginBottom: 12 },
  solutionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  solutionTitle: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginLeft: 6, textTransform: 'uppercase' },
  mathStep: { fontSize: 13, color: '#475569', marginBottom: 5, fontFamily: 'monospace' },
  finalProof: { fontSize: 14, fontWeight: 'bold', color: '#166534', textAlign: 'right', marginTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 10 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  subHeader: { fontSize: 14, fontWeight: 'bold', color: '#0369A1', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#334155', marginBottom: 6, lineHeight: 18 },
  darkCard: { backgroundColor: '#1E293B', padding: 20, borderRadius: 15, marginBottom: 25 },
  darkLabel: { color: '#BBF7D0', fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  darkText: { color: '#94A3B8', fontSize: 12, marginBottom: 15 },
  mathBlock: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 15, borderRadius: 10 },
  mathLine: { color: '#38BDF8', fontFamily: 'monospace', fontSize: 13, marginBottom: 4 }
});