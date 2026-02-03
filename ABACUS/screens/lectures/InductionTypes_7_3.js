import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InductionTypes_7_3() {
  
  // Custom Component for Induction Comparisons
  const ComparisonCard = ({ title, logic, useCase, color, icon }) => (
    <View style={[styles.compCard, { borderTopColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.cardText}><Text style={styles.bold}>Logic:</Text> {logic}</Text>
      <View style={styles.useCaseBox}>
        <Text style={styles.useCaseText}>{useCase}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"We use induction theory in discrete mathematics to prove statements or conjectures by capturing patterns. There are two types: weak and strong induction, both serving to demonstrate the truth of statements across a broad set of values."}
      </Text>

      {/* SECTION 1: WEAK VS STRONG */}
      <Text style={styles.sectionHeader}>{"Comparing Induction Techniques"}</Text>
      
      <ComparisonCard 
        title={"Weak Induction"}
        icon={"arrow-right-circle-outline"}
        color={"#16941c"}
        logic={"Assume the statement holds for k, then prove it holds for k + 1. This forms a chain reaction of truths."}
        useCase={"Ideal for arithmetic series and cases relying directly on the preceding step."}
      />

      <ComparisonCard 
        title={"Strong Induction"}
        icon={"layers-outline"}
        color={"#0369A1"}
        logic={"Assume the statement holds for ALL values from the base case up to k, then prove it for k + 1."}
        useCase={"Used when new cases depend on multiple prior cases or complex relationships."}
      />

      {/* SECTION 2: STRONG INDUCTION EXAMPLE - FACTORIZATION */}
      <Text style={styles.sectionHeader}>{"Example: Factorization of Primes"}</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>{"Prove: Every integer n \u2265 2 is either prime or a product of primes"}</Text>
        <Text style={styles.mathStep}>{"\u2022 Base (n=2): 2 is prime. True."}</Text>
        <Text style={styles.mathStep}>{"\u2022 Hypothesis: Assume true for all values 2 \u2264 k \u2264 n."}</Text>
        <Text style={styles.mathStep}>{"\u2022 Inductive: If n+1 is composite, n+1 = ab. Since a and b are < n+1, by hypothesis, they are products of primes. Thus, n+1 is also a product of primes."}</Text>
      </View>

      {/* SECTION 3: THE CHOCOLATE BAR PUZZLE */}
      <Text style={styles.sectionHeader}>{"The Chocolate Bar Puzzle"}</Text>
      <View style={styles.puzzleCard}>
        <Text style={styles.puzzleTitle}>{"Problem: Reducing n squares to individual pieces"}</Text>
        <Text style={styles.cardText}>{"Prove that it takes exactly n - 1 breaks to reduce the bar to individual squares."}</Text>
        
        <View style={styles.proofFlow}>
          <View style={styles.flowStep}>
            <Text style={styles.flowLabel}>{"Base (n=2)"}</Text>
            <Text style={styles.flowText}>{"1 break = 2 squares. True."}</Text>
          </View>
          <View style={styles.flowStep}>
            <Text style={styles.flowLabel}>{"Logic (k+1)"}</Text>
            <Text style={styles.flowText}>{"Break into pieces 'a' and 'b'. Total breaks = 1 + (a-1) + (b-1) = n. True."}</Text>
          </View>
        </View>
      </View>

      {/* SUMMARY TABLE */}
      <Text style={styles.sectionHeader}>{"Choosing Your Method"}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Factor"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Weak"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Strong"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{"Hypothesis"}</Text>
          <Text style={styles.tableCell}>{"P(k)"}</Text>
          <Text style={styles.tableCell}>{"P(1) \u2227 ... \u2227 P(k)"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{"Dependency"}</Text>
          <Text style={styles.tableCell}>{"Immediate"}</Text>
          <Text style={styles.tableCell}>{"Historical"}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the weak and strong induction techniques in discrete mathematics. We explored the structure and applications of weak induction through summing natural numbers and moved to strong induction to show how it provides flexibility by assuming the truth of all previous cases."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  compCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  cardText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  useCaseBox: { marginTop: 10, padding: 8, backgroundColor: '#FFF', borderRadius: 8, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1' },
  useCaseText: { fontSize: 12, color: '#64748B', fontStyle: 'italic' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20 },
  mathStep: { fontSize: 13, color: '#166534', marginTop: 8, lineHeight: 18, fontFamily: 'monospace' },
  puzzleCard: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  puzzleTitle: { fontSize: 14, fontWeight: 'bold', color: '#5B21B6', marginBottom: 8 },
  proofFlow: { marginTop: 12, borderTopWidth: 1, borderTopColor: '#DDD6FE', paddingTop: 12 },
  flowStep: { marginBottom: 10 },
  flowLabel: { fontSize: 11, fontWeight: 'bold', color: '#7C3AED', textTransform: 'uppercase' },
  flowText: { fontSize: 13, color: '#475569' },
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeader: { backgroundColor: '#F8FAFC', fontWeight: 'bold', color: '#0F172A' },
  tableCell: { flex: 1, padding: 10, fontSize: 11, color: '#475569', textAlign: 'center' }
});