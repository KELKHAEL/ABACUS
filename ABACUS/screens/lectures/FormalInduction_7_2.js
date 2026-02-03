import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FormalInduction_7_2() {
  
  // Custom Component for the Structural Steps
  const StructureCard = ({ title, content, icon, color }) => (
    <View style={[styles.sCard, { borderTopColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={18} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.cardText}>{content}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Mathematical induction is one of the fundamental methods for proving statements or conjectures about natural numbers and sequences. It is often used to prove statements that apply to all natural numbers beyond a certain threshold."}
      </Text>

      {/* SECTION 1: FORMAL STRUCTURE */}
      <Text style={styles.sectionHeader}>{"Structure of an Inductive Proof"}</Text>
      <Text style={styles.paragraph}>{"A formal proof is built using these sequential parts:"}</Text>
      
      <StructureCard 
        title={"State the Proposition"}
        icon={"format-quote-open"}
        color={"#0369A1"}
        content={"Define the proposition P(n) that you want to prove."}
      />
      <StructureCard 
        title={"Base Case"}
        icon={"numeric-1-box-outline"}
        color={"#0369A1"}
        content={"Show that P(n) is true for the initial case, typically n = 1."}
      />
      <StructureCard 
        title={"Inductive Hypothesis"}
        icon={"hypothesis"}
        color={"#16941c"}
        content={"Assume P(k) holds true for some arbitrary integer k \u2265 1."}
      />
      <StructureCard 
        title={"Prove P(k + 1)"}
        icon={"arrow-right-bold-circle-outline"}
        color={"#16941c"}
        content={"Use the assumption P(k) to demonstrate that P(k + 1) must also be true."}
      />
      <StructureCard 
        title={"Conclusion"}
        icon={"check-decagram"}
        color={"#7C3AED"}
        content={"Conclude that by the principle of induction, the statement holds for all n \u2265 starting point."}
      />

      {/* SECTION 2: EXAMPLE 1 - SUMMATION */}
      <Text style={styles.sectionHeader}>{"Example 1: Sum of First n Natural Numbers"}</Text>
      <View style={styles.proofBox}>
        <Text style={styles.bold}>{"Prove: 1 + 2 + 3 + ... + n = n(n + 1) / 2"}</Text>
        <Text style={styles.mathStep}>{"\u2022 Base Case (n=1): 1 = 1(1+1)/2 = 1. True."}</Text>
        <Text style={styles.mathStep}>{"\u2022 Hypothesis: Assume true for n=k."}</Text>
        <Text style={styles.mathStep}>{"\u2022 Inductive Step: Add (k+1) to both sides: [k(k+1)/2] + (k+1) = (k+1)(k+2)/2."}</Text>
        <Text style={styles.finalLabel}>{"Valid for all n \u2265 1."}</Text>
      </View>

      {/* SECTION 3: EXAMPLE 2 - DIVISIBILITY */}
      <Text style={styles.sectionHeader}>{"Example 2: Divisibility in Powers"}</Text>
      <View style={[styles.proofBox, { backgroundColor: '#F0F9FF' }]}>
        <Text style={styles.bold}>{"Prove: 6\u207f - 1 is a multiple of 5 for all natural n"}</Text>
        <Text style={styles.mathStep}>{"\u2022 Base (n=1): 6\u00b9 - 1 = 5. Multiple of 5."}</Text>
        <Text style={styles.mathStep}>{"\u2022 Hypothesis: Assume 6\u1d4f - 1 = 5m for integer m."}</Text>
        <Text style={styles.mathStep}>{"\u2022 Inductive: 6\u1d4f\u207a\u00b9 - 1 = 6(6\u1d4f) - 1 = (5+1)6\u1d4f - 1 = 5(6\u1d4f) + (6\u1d4f - 1)."}</Text>
        <Text style={[styles.finalLabel, { color: '#0369A1' }]}>{"Result is 5(6\u1d4f + m), a multiple of 5."}</Text>
      </View>

      {/* SECTION 4: EXAMPLE 3 - INEQUALITIES */}
      <Text style={styles.sectionHeader}>{"Example 3: Proving Inequalities"}</Text>
      <View style={[styles.proofBox, { backgroundColor: '#FEF2F2' }]}>
        <Text style={styles.bold}>{"Prove: n\u00b2 < 2\u207f for all integers n \u2265 5"}</Text>
        <Text style={styles.mathStep}>{"\u2022 Base (n=5): 5\u00b2 = 25; 2\u2075 = 32. 25 < 32. True."}</Text>
        <Text style={styles.mathStep}>{"\u2022 Inductive Step: (k+1)\u00b2 = k\u00b2 + 2k + 1. Since k\u00b2 < 2\u1d4f and 2k+1 < 2\u1d4f for k \u2265 5."}</Text>
        <Text style={[styles.finalLabel, { color: '#B91C1C' }]}>{"(k+1)\u00b2 < 2 \u00d7 2\u1d4f = 2\u1d4f\u207a\u00b9. Proved."}</Text>
      </View>

      {/* WHY USE INDUCTION */}
      <Text style={styles.sectionHeader}>{"Why Use Mathematical Induction?"}</Text>
      <View style={styles.noteBox}>
        <Text style={styles.noteText}>
          {"Induction simplifies proof structures by establishing that a pattern continues indefinitely without checking each number individually. This is known as the "}<Text style={styles.bold}>{"\"domino effect\""}</Text>{"."}
        </Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we touched upon formal induction starting with basic principles of base and inductive steps. Through proofs on sums, multiples, and inequalities, we demonstrated how induction offers a structured way to confirm patterns across an infinite set of cases."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  sCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 4, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', marginLeft: 8 },
  cardText: { fontSize: 12, color: '#475569', lineHeight: 18 },
  proofBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#DCFCE7' },
  mathStep: { fontSize: 13, color: '#334155', marginBottom: 8, lineHeight: 18, fontFamily: 'monospace' },
  finalLabel: { fontSize: 13, fontWeight: 'bold', color: '#166534', textAlign: 'right', marginTop: 5 },
  noteBox: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  noteText: { fontSize: 13, color: '#5B21B6', lineHeight: 20, fontStyle: 'italic' }
});