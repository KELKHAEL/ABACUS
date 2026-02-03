import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Sequences_6_1() {
  
  // Custom Component for Sequence Types
  const SequenceTypeCard = ({ title, description, formula, example, color }) => (
    <View style={[styles.typeCard, { borderLeftColor: color }]}>
      <Text style={[styles.typeTitle, { color: color }]}>{title}</Text>
      <Text style={styles.typeDesc}>{description}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
      <Text style={styles.exampleText}><Text style={styles.bold}>{"Example: "}</Text>{example}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Sequences are building blocks for patterns and series. They are often used to solve real-world problems across different fields like computer science, physics, and economics."}
      </Text>

      {/* SECTION 1: WHAT IS A SEQUENCE */}
      <Text style={styles.sectionHeader}>{"What is a Sequence?"}</Text>
      <Text style={styles.paragraph}>
        {"In simple terms, a "}<Text style={styles.bold}>{"sequence"}</Text>{" is an ordered list of numbers or terms. Each element in a sequence is known as a \"term\". Sequences can be:"}
      </Text>

      <View style={styles.row}>
        <View style={[styles.statusCard, { backgroundColor: '#F0F9FF' }]}>
          <Text style={[styles.statusLabel, { color: '#0369A1' }]}>{"Finite"}</Text>
          <Text style={styles.statusText}>{"Ends after a specific number of terms."}</Text>
        </View>
        <View style={[styles.statusCard, { backgroundColor: '#F5F3FF' }]}>
          <Text style={[styles.statusLabel, { color: '#7C3AED' }]}>{"Infinite"}</Text>
          <Text style={styles.statusText}>{"Continues indefinitely."}</Text>
        </View>
      </View>

      {/* SECTION 2: DEFINING SEQUENCES */}
      <Text style={styles.sectionHeader}>{"Defining a Sequence"}</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>{"1. Closed Formula"}</Text>
        <Text style={styles.infoText}>{"Allows direct calculation of a term based on its position (n) without knowing previous terms."}</Text>
        <Text style={styles.codeText}>{"an = 2n \u2192 a0=0, a1=2, a2=4"}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.subHeader}>{"2. Recursive Definition"}</Text>
        <Text style={styles.infoText}>{"Defines each term by relating it to its previous terms (predecessors)."}</Text>
        <Text style={styles.codeText}>{"Fn = Fn-1 + Fn-2"}</Text>
      </View>

      {/* SECTION 3: TYPES OF SEQUENCES */}
      <Text style={styles.sectionHeader}>{"Common Sequence Types"}</Text>

      <SequenceTypeCard 
        title={"Arithmetic Sequence"}
        color={"#16941c"}
        description={"Each term is obtained by adding a fixed \"common difference\" (d)."}
        formula={"an = a0 + n \u00d7 d"}
        example={"3, 6, 9, 12... (d = 3)"}
      />

      <SequenceTypeCard 
        title={"Geometric Sequence"}
        color={"#0369A1"}
        description={"Each term is obtained by multiplying the previous term by a fixed ratio (r)."}
        formula={"an = a0 \u00b7 r^n"}
        example={"2, 4, 8, 16... (r = 2)"}
      />

      {/* SECTION 4: SPECIAL SEQUENCES */}
      <Text style={styles.sectionHeader}>{"Special Sequences"}</Text>
      
      <View style={styles.specialCard}>
        <Text style={styles.bold}>{"Square Numbers"}</Text>
        <Text style={styles.infoText}>{"Sequence: 1, 4, 9, 16... defined by "}<Text style={styles.bold}>{"an = n\u00b2"}</Text>{"."}</Text>
      </View>

      <View style={styles.specialCard}>
        <Text style={styles.bold}>{"Triangular Numbers"}</Text>
        <Text style={styles.infoText}>{"Represents the sum of natural numbers up to n (1, 3, 6, 10...)."}</Text>
        <View style={styles.darkMath}>
          <Text style={styles.darkMathText}>{"Tn = n(n + 1) / 2"}</Text>
        </View>
      </View>

      <View style={styles.specialCard}>
        <Text style={styles.bold}>{"Fibonacci Sequence"}</Text>
        <Text style={styles.infoText}>{"Starts with 0 and 1; each subsequent term is the sum of the previous two."}</Text>
        <Text style={styles.italic}>{"Appears frequently in nature (flowers, pineapples, branching trees)."}</Text>
      </View>

      {/* SECTION 5: PRACTICAL EXAMPLES */}
      <Text style={styles.sectionHeader}>{"Step-by-Step Examples"}</Text>
      <View style={styles.problemBox}>
        <Text style={styles.bold}>{"Recursive Calculation"}</Text>
        <Text style={styles.infoText}>{"Formula: an = 2an-1 + 3 where a0 = 1"}</Text>
        <Text style={styles.stepText}>{"\u2022 a1 = 2(1) + 3 = 5"}</Text>
        <Text style={styles.stepText}>{"\u2022 a2 = 2(5) + 3 = 13"}</Text>
        <Text style={styles.stepText}>{"\u2022 a3 = 2(13) + 3 = 29"}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the concept of sequences in discrete mathematics as ordered lists following specific rules. We understood the difference between closed and recursive formulas, explored arithmetic and geometric progressions, and looked at special sequences like triangular and Fibonacci numbers."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  italic: { fontStyle: 'italic', fontSize: 12, color: '#64748B', marginTop: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statusCard: { width: '48%', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  statusLabel: { fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
  statusText: { fontSize: 11, color: '#475569', lineHeight: 15 },
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  subHeader: { fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginBottom: 5 },
  infoText: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 8 },
  codeText: { fontFamily: 'monospace', fontSize: 12, color: '#0369A1', backgroundColor: '#FFF', padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#CBD5E1' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 15 },
  typeCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 15 },
  typeTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 5 },
  typeDesc: { fontSize: 12, color: '#64748B', marginBottom: 10 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  formulaText: { fontFamily: 'monospace', fontWeight: 'bold', color: '#0F172A' },
  exampleText: { fontSize: 13, color: '#475569' },
  specialCard: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#DCFCE7' },
  darkMath: { backgroundColor: '#1E293B', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  darkMathText: { color: '#38BDF8', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 13 },
  problemBox: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'dashed', marginBottom: 20 },
  stepText: { fontSize: 13, color: '#475569', marginLeft: 10, marginTop: 4 }
});