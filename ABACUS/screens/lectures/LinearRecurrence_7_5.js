import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LinearRecurrence_7_5() {
  
  // Custom Component for Solving Methods
  const MethodCard = ({ title, description, example, color, icon }) => (
    <View style={[styles.mCard, { borderTopColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.cardDesc}>{description}</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{example}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Linear recurrence relations are a major concept in discrete mathematics that provide a mathematical way to define sequences based on prior terms. We often use these relations when we need to predict subsequent future values using the previous terms."}
      </Text>

      {/* SECTION 1: DEFINITIONS */}
      <Text style={styles.sectionHeader}>{"What are Linear Recurrence Relations?"}</Text>
      <Text style={styles.paragraph}>
        {"A recurrence relation is a rule that defines each term in a sequence as a function of its preceding terms. "}<Text style={styles.bold}>{"Linear homogeneous"}</Text>{" relations must meet two criteria:"}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Linear:"}</Text>{" Does not involve powers or non-linear transformations of terms."}</Text>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Homogeneous:"}</Text>{" Lacks a constant term or extra function on the right-hand side."}</Text>
      </View>

      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaLabel}>{"First-Order General Form:"}</Text>
        <Text style={styles.mainFormula}>{"an = c\u2081an-1"}</Text>
        <Text style={styles.caption}>{"Every term is a constant multiple of the one before it."}</Text>
      </View>

      {/* SECTION 2: SOLVING METHODS */}
      <Text style={styles.sectionHeader}>{"Solving Techniques"}</Text>
      
      <MethodCard 
        title={"Iteration Method"}
        icon={"repeat"}
        color={"#16941c"}
        description={"Generating terms repeatedly to observe a pattern that can be generalized into a closed-form solution."}
        example={"an = 2an-1 \u2192 a\u2081=4, a\u2082=8, a\u2083=16... Pattern: an = 2\u207f\u207a\u00b9."}
      />

      <MethodCard 
        title={"Back Substitution"}
        icon={"keyboard-backspace"}
        color={"#0369A1"}
        description={"Substituting terms into the relation to rewrite an in terms of the initial term a\u2080."}
        example={"an = 3an-1 \u2192 an = 3(3an-2) \u2192 an = 3\u207f a\u2080."}
      />

      {/* SECTION 3: EXPLICIT FORMULAS */}
      <Text style={styles.sectionHeader}>{"Applying Explicit Formulas"}</Text>
      <Text style={styles.paragraph}>{"If the common ratio 'r' and initial term are known, use this formula for instant calculation:"}</Text>
      
      <View style={styles.explicitBox}>
        <Text style={styles.explicitMath}>{"an = a\u2080 \u00b7 r\u207f"}</Text>
      </View>

      <View style={styles.problemCard}>
        <Text style={styles.bold}>{"Example: Different Starting Point"}</Text>
        <Text style={styles.exText}>{"Sequence: an = 4an-1 with a\u2081 = 7"}</Text>
        <Text style={styles.mathStep}>{"1. Rewrite using a\u2081: an = a\u2081 \u00b7 r\u207f\u207b\u00b9"}</Text>
        <Text style={styles.mathStep}>{"2. Substitute: an = 7 \u00b7 4\u207f\u207b\u00b9"}</Text>
        <Text style={styles.resultText}>{"a\u2083 = 7 \u00b7 4\u00b2 = 112"}</Text>
      </View>

      {/* SECTION 4: COMPOUND INTEREST */}
      <Text style={styles.sectionHeader}>{"Real-World: Compound Interest"}</Text>
      <View style={styles.financeCard}>
        <View style={styles.financeHeader}>
          <MaterialCommunityIcons name="bank-outline" size={24} color="white" />
          <Text style={styles.financeTitle}>{"Financial Growth"}</Text>
        </View>
        <Text style={styles.financeText}>{"For initial deposit P and annual rate r, the balance after n years is a recurrence:"}</Text>
        <Text style={styles.financeMath}>{"An = (1 + r)An-1"}</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.financeResult}>{"For Rs 1000 at 5%: An = 1000 \u00b7 (1.05)\u207f"}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we covered the basics of first-order linear homogeneous recurrence relations and understood their structure. We demonstrated how to solve them through iteration and back substitution, applying these methods to sequences and financial growth models like compound interest."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  infoText: { fontSize: 13, color: '#475569', marginBottom: 8, lineHeight: 18 },
  formulaHighlight: { backgroundColor: '#F0FDF4', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  formulaLabel: { fontSize: 12, color: '#166534', fontWeight: 'bold', marginBottom: 8 },
  mainFormula: { fontSize: 22, color: '#166534', fontWeight: 'bold', fontFamily: 'monospace' },
  caption: { fontSize: 11, color: '#94A3B8', marginTop: 8, textAlign: 'center' },
  mCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 4, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 8 },
  cardDesc: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 10 },
  exampleBox: { padding: 10, backgroundColor: '#F1F5F9', borderRadius: 8 },
  exampleText: { fontSize: 12, color: '#334155', fontFamily: 'monospace' },
  explicitBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  explicitMath: { color: '#38BDF8', fontSize: 20, fontWeight: 'bold', fontFamily: 'monospace' },
  problemCard: { padding: 15, borderRadius: 12, backgroundColor: '#F0F9FF', marginBottom: 20, borderWidth: 1, borderColor: '#BAE6FD' },
  exText: { fontSize: 13, color: '#0369A1', marginBottom: 8 },
  mathStep: { fontSize: 12, color: '#475569', marginBottom: 4, fontFamily: 'monospace' },
  resultText: { fontSize: 14, fontWeight: 'bold', color: '#0369A1', textAlign: 'right', marginTop: 5 },
  financeCard: { backgroundColor: '#0369A1', padding: 20, borderRadius: 15, marginBottom: 25 },
  financeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  financeTitle: { color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  financeText: { color: '#E0F2FE', fontSize: 13, lineHeight: 18, marginBottom: 15 },
  financeMath: { color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'monospace' },
  dividerLight: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginVertical: 15 },
  financeResult: { color: '#BAE6FD', fontSize: 13, textAlign: 'center', fontWeight: '500' }
});