import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CountingTheory_4_1() {
  
  // Custom Component for Counting Rules
  const RuleCard = ({ title, description, formula, color = "#16941c" }) => (
    <View style={[styles.ruleCard, { borderLeftColor: color }]}>
      <Text style={[styles.ruleTitle, { color: color }]}>{title}</Text>
      <Text style={styles.ruleDesc}>{description}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
    </View>
  );

  // Custom Component for Practice Problems
  const ProblemBox = ({ question, solution }) => (
    <View style={styles.problemContainer}>
      <View style={styles.problemHeader}>
        <MaterialCommunityIcons name="pencil-box-outline" size={20} color="#0369A1" />
        <Text style={styles.problemTitle}>Practice Problem</Text>
      </View>
      <Text style={styles.questionText}><Text style={styles.bold}>Q:</Text> {question}</Text>
      <View style={styles.solutionBox}>
        <Text style={styles.solutionText}><Text style={styles.bold}>Solution:</Text> {solution}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        In daily lives, many times one needs to find out the number of all possible outcomes for a series of events. For instance, choosing a panel of judges or generating identification numbers. To solve these, the mathematical theory of counting is used, encompassing fundamental rules, permutations, and combinations.
      </Text>

      {/* SECTION 1: SUM AND PRODUCT RULES */}
      <Text style={styles.sectionHeader}>The Rules of Sum and Product</Text>
      <Text style={styles.paragraph}>These rules are used to decompose difficult counting problems into simple ones.</Text>

      <RuleCard 
        title="The Rule of Sum"
        description="If tasks T₁, T₂...Tₘ can be done in w₁, w₂...wₘ ways and no tasks can be performed simultaneously, the total ways is the sum."
        formula="|A ∪ B| = |A| + |B| (when disjoint)"
      />

      <RuleCard 
        title="The Rule of Product"
        description="If a sequence of tasks occurs where task B follows task A, the total ways to perform the sequence is the product of their individual ways."
        formula="|A × B| = |A| × |B|"
        color="#0369A1"
      />

      <ProblemBox 
        question="A boy wants to go from home X to school Z. He must reach Y first (3 bus/2 train routes), then from Y to Z (4 bus/5 train routes). How many ways total?"
        solution="From X to Y: 3 + 2 = 5 ways. From Y to Z: 4 + 5 = 9 ways. Total: 5 × 9 = 45 ways."
      />

      {/* SECTION 2: PERMUTATIONS */}
      <Text style={styles.sectionHeader}>Permutations (Order Matters)</Text>
      <Text style={styles.paragraph}>
        A permutation is an arrangement of some elements in which <Text style={styles.bold}>order matters</Text>. It is an ordered combination of elements.
      </Text>
      
      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaTitle}>Number of Permutations:</Text>
        <Text style={styles.mainFormula}>nPᵣ = n! / (n - r)!</Text>
        <Text style={styles.caption}>Where n! = 1 · 2 · 3 ... (n-1) · n</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Key Permutation Variations:</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Objects Alike:</Text> n! / (a₁! a₂! ... aᵣ!)</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Circular:</Text> ⁿPₓ / x or ⁿPₙ / n</Text>
      </View>

      <ProblemBox 
        question="In how many ways can the letters of the word 'READER' be arranged?"
        solution="There are 6 letters (2 E, 1 A, 1 D, 2 R). Permutation = 6! / (2! 1! 1! 2!) = 180 ways."
      />

      {/* SECTION 3: COMBINATIONS */}
      <Text style={styles.sectionHeader}>Combinations (Order Doesn't Matter)</Text>
      <Text style={styles.paragraph}>A combination is a selection of elements in which order <Text style={styles.bold}>does not</Text> matter.</Text>

      <View style={[styles.formulaHighlight, {backgroundColor: '#F0F9FF', borderLeftColor: '#0369A1'}]}>
        <Text style={[styles.formulaTitle, {color: '#0369A1'}]}>Number of Combinations:</Text>
        <Text style={[styles.mainFormula, {color: '#0369A1'}]}>ⁿCᵣ = n! / [r! (n - r)!]</Text>
      </View>

      <ProblemBox 
        question="How many ways can we choose 3 men from 6 and 2 women from 5?"
        solution="Ways = ⁶C₃ × ⁵C₂ = 20 × 10 = 200 ways."
      />

      {/* SECTION 4: PRINCIPLES */}
      <Text style={styles.sectionHeader}>Advanced Counting Principles</Text>

      <View style={styles.principleCard}>
        <Text style={styles.principleTitle}>Pascal's Identity</Text>
        <Text style={styles.principleText}>ⁿCₖ = ⁿ⁻¹Cₖ₋₁ + ⁿ⁻¹Cₖ</Text>
        <Text style={styles.paragraphSmall}>First derived by Blaise Pascal in the 17th century.</Text>
      </View>

      <View style={styles.principleCard}>
        <Text style={styles.principleTitle}>Pigeonhole Principle</Text>
        <Text style={styles.paragraphSmall}>If more than n objects are placed into n containers, at least one container must hold more than one object.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Example:</Text> In a class of 30, at least two people must have names starting with the same alphabet.</Text>
      </View>

      <View style={styles.principleCard}>
        <Text style={styles.principleTitle}>Inclusion-Exclusion Principle</Text>
        <Text style={styles.paragraphSmall}>Computes the cardinal number of the union of multiple non-disjoint sets.</Text>
        <Text style={styles.bold}>|A ∪ B| = |A| + |B| - |A ∩ B|</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        Counting Theory provides the tools to solve complex combinatorial problems. By understanding when order matters (Permutations) versus when it doesn't (Combinations), and applying principles like Inclusion-Exclusion, we can precisely determine total outcomes for any given event.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  ruleCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 15 },
  ruleTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  ruleDesc: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 10 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontSize: 14, color: '#0F172A', fontWeight: 'bold' },
  formulaHighlight: { backgroundColor: '#F0FDF4', padding: 20, borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#16941c', marginVertical: 15, alignItems: 'center' },
  formulaTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 5 },
  mainFormula: { fontSize: 20, color: '#166534', fontWeight: 'bold', fontFamily: 'monospace' },
  caption: { fontSize: 11, color: '#94A3B8', marginTop: 5 },
  problemContainer: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20, overflow: 'hidden' },
  problemHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F9FF', padding: 10, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  problemTitle: { fontSize: 14, fontWeight: 'bold', color: '#0369A1', marginLeft: 8 },
  questionText: { padding: 15, fontSize: 14, color: '#334155', fontStyle: 'italic' },
  solutionBox: { backgroundColor: '#F8FAFC', padding: 15, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  solutionText: { fontSize: 14, color: '#16941c', lineHeight: 20 },
  infoBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 6 },
  principleCard: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 15 },
  principleTitle: { fontSize: 15, fontWeight: 'bold', color: '#9A3412', marginBottom: 5 },
  principleText: { fontSize: 16, color: '#C2410C', fontWeight: 'bold', textAlign: 'center', marginVertical: 8, fontFamily: 'monospace' }
});