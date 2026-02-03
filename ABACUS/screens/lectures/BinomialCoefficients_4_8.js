import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BinomialCoefficients_4_8() {
  
  // Custom Component for Formula Cards
  const FormulaCard = ({ title, formula, subtext, color = "#0369A1" }) => (
    <View style={[styles.formulaCard, { borderTopColor: color }]}>
      <Text style={[styles.formulaTitle, { color: color }]}>{title}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
      {subtext && <Text style={styles.formulaSub}>{subtext}</Text>}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Binomial coefficients are used in combinatorics, probability, and algebra. They are expressions of the form "}<Text style={styles.bold}>{"(x + y)^n"}</Text>{" and help figure out the size of terms in an expansion."}
      </Text>

      {/* SECTION 1: WHAT ARE THEY */}
      <Text style={styles.sectionHeader}>{"What are Binomial Coefficients?"}</Text>
      <Text style={styles.paragraph}>
        {"Notation: "}<Text style={styles.bold}>{"C(n, k)"}</Text>{" or "}<Text style={styles.bold}>{"(n k)"}</Text>{"."}
        {"\n\nThis is read as "}<Text style={styles.bold}>{"\"n choose k\""}</Text>{" and represents the number of ways to choose k elements from a set of n elements without caring about order."}
      </Text>

      <FormulaCard 
        title={"General Formula"}
        formula={"C(n, k) = n! / [k!(n - k)!]"}
        subtext={"n! means n factorial (product of all positive integers from 1 to n)."}
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>{"Example Calculation:"}</Text>
        <Text style={styles.exampleText}>{"C(5, 3) = 5! / [3!(5-3)!] = 120 / (6*2) = "}<Text style={styles.bold}>{"10 ways"}</Text>{"."}</Text>
      </View>

      {/* SECTION 2: BINOMIAL EXPANSIONS */}
      <Text style={styles.sectionHeader}>{"Binomial Expansions"}</Text>
      <Text style={styles.paragraph}>
        {"Binomial coefficients tell us the coefficients of the terms in the expanded version of an expression like (x + y)^n."}
      </Text>

      <View style={styles.expansionCard}>
        <Text style={styles.expansionTitle}>{"Expanding (x + y)^3"}</Text>
        <Text style={styles.expansionMath}>{"x^3 + 3x^2y + 3xy^2 + y^3"}</Text>
        <Text style={styles.caption}>{"The coefficients are 1, 3, 3, and 1."}</Text>
      </View>

      <View style={[styles.expansionCard, { backgroundColor: '#F0F9FF' }]}>
        <Text style={[styles.expansionTitle, { color: '#0369A1' }]}>{"Expanding (x + y)^5"}</Text>
        <Text style={[styles.expansionMath, { color: '#0369A1' }]}>{"x^5 + 5x^4y + 10x^3y^2 + 10x^2y^3 + 5xy^4 + y^5"}</Text>
      </View>

      {/* SECTION 3: COUNTING PROBLEMS */}
      <Text style={styles.sectionHeader}>{"Counting Problems"}</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>{"1. Choosing a Subset:"}</Text>{" Selecting 3 elements from {1, 2, 3, 4, 5} is C(5, 3) = 10."}</Text>
        <View style={styles.divider} />
        <Text style={styles.infoText}><Text style={styles.bold}>{"2. Forming Committees:"}</Text>{" Picking 2 members from a group of 6 is C(6, 2) = 15."}</Text>
      </View>

      {/* SECTION 4: RECURRENCE RELATION */}
      <Text style={styles.sectionHeader}>{"Recurrence Relation"}</Text>
      <Text style={styles.paragraph}>
        {"We can calculate any binomial coefficient based on smaller ones."}
      </Text>

      <FormulaCard 
        title={"The Relation"}
        color={"#16941c"}
        formula={"C(n, k) = C(n-1, k-1) + C(n-1, k)"}
        subtext={"This allows building larger coefficients step-by-step."}
      />

      {/* SECTION 5: PASCAL'S TRIANGLE */}
      <Text style={styles.sectionHeader}>{"Pascal's Triangle"}</Text>
      <Text style={styles.paragraph}>
        {"A triangular arrangement where each number is the sum of the two numbers directly above it."}
      </Text>

      <View style={styles.triangleBox}>
        <View style={styles.triangleRow}><Text style={styles.triText}>{"1"}</Text></View>
        <View style={styles.triangleRow}><Text style={styles.triText}>{"1   1"}</Text></View>
        <View style={styles.triangleRow}><Text style={styles.triText}>{"1   2   1"}</Text></View>
        <View style={styles.triangleRow}><Text style={styles.triText}>{"1   3   3   1"}</Text></View>
        <View style={styles.triangleRow}><Text style={styles.triText}>{"1   4   6   4   1"}</Text></View>
        <View style={styles.triangleRow}><Text style={styles.triText}>{"1   5  10  10   5   1"}</Text></View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explored how binomial coefficients are used to expand binomials and solve counting problems. We understood their calculation using factorials, recurrence relations, and Pascal's Triangle."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  formulaCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  formulaTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  formulaSub: { fontSize: 11, color: '#64748B', marginTop: 8, fontStyle: 'italic', textAlign: 'center' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#166534', marginTop: 5 },
  expansionCard: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 15 },
  expansionTitle: { fontSize: 14, fontWeight: 'bold', color: '#9A3412', marginBottom: 5 },
  expansionMath: { fontFamily: 'monospace', fontSize: 13, color: '#C2410C', fontWeight: 'bold' },
  caption: { fontSize: 11, color: '#94A3B8', marginTop: 5 },
  infoBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, marginBottom: 20 },
  infoText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  divider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 10 },
  triangleBox: { backgroundColor: '#104a28', paddingVertical: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  triangleRow: { marginBottom: 5 },
  triText: { color: 'white', fontFamily: 'monospace', fontSize: 14, letterSpacing: 6 }
});