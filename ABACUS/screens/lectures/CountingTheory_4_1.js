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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In daily lives, many a times one needs to find out the number of all possible outcomes for a series of events. For solving these problems, the mathematical theory of <Text style={styles.bold}>counting</Text> is used. Counting mainly encompasses the fundamental counting rule, the permutation rule, and the combination rule.
      </Text>

      {/* --- SECTION 1: SUM AND PRODUCT RULES --- */}
      <Text style={styles.sectionHeader}>The Rules of Sum and Product</Text>
      <Text style={styles.paragraph}>These rules are used to decompose difficult counting problems into simple ones.</Text>

      <RuleCard 
        title="The Rule of Sum"
        description="If a sequence of tasks T₁, T₂...Tₘ can be done in w₁, w₂...wₘ ways and no tasks can be performed simultaneously, the total ways is the sum."
        formula="|A ∪ B| = |A| + |B| (Disjoint)"
      />

      <RuleCard 
        title="The Rule of Product"
        description="If every task arrives after the occurrence of the previous task, then there are w₁ × w₂ × ... × wₘ ways to perform the tasks."
        formula="|A × B| = |A| × |B|"
        color="#0369A1"
      />

      <ProblemBox 
        question="A boy wants to go from home X to school Z. From X to Y he has 3 bus/2 train routes. From Y to Z he has 4 bus/5 train routes. How many total ways?"
        solution="X to Y: 3 + 2 = 5 (Sum). Y to Z: 4 + 5 = 9 (Sum). Total X to Z: 5 × 9 = 45 ways (Product)."
      />

      {/* --- SECTION 2: PERMUTATIONS --- */}
      <Text style={styles.sectionHeader}>Permutations (Order Matters)</Text>
      <Text style={styles.paragraph}>
        A permutation is an arrangement of elements in which <Text style={styles.bold}>order matters</Text>. It is an ordered Combination of elements.
      </Text>
      
      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaTitle}>Fundamental Formula:</Text>
        <Text style={styles.mainFormula}>nPᵣ = n! / (n - r)!</Text>
        <Text style={styles.caption}>where n! = 1 · 2 · 3 · ... · n</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Important Formulas:</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Objects Alike:</Text> n! / [a₁! a₂! ... aᵣ!]</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>All Elements:</Text> nPₙ = n!</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Specific Places:</Text> ⁿ⁻ˣPᵣ₋ₓ (where x things occupy definite places)</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Together:</Text> r!(n-r+1)! (where r specified things are together)</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Circular:</Text> ⁿPₓ / x  or  (n-1)! for all things</Text>
      </View>

      <ProblemBox 
        question="Arrange the letters of 'READER'."
        solution="6 letters (2 E, 1 A, 1 D, 2 R). Permutation = 6! / (2! · 1! · 1! · 2!) = 180."
      />

      <ProblemBox 
        question="Arrange 'ORANGE' so consonants occupy only even positions."
        solution="3 consonants in 3 even slots = 3! ways. 3 vowels in remaining slots = 3! ways. Total = 6 × 6 = 36."
      />

      {/* --- SECTION 3: COMBINATIONS --- */}
      <Text style={styles.sectionHeader}>Combinations (Order Doesn't Matter)</Text>
      <Text style={styles.paragraph}>A combination is a selection of elements in which order <Text style={styles.bold}>does not</Text> matter.</Text>

      <View style={[styles.formulaHighlight, {backgroundColor: '#F0F9FF', borderLeftColor: '#0369A1'}]}>
        <Text style={[styles.formulaTitle, {color: '#0369A1'}]}>Selection Formula:</Text>
        <Text style={[styles.mainFormula, {color: '#0369A1'}]}>ⁿCᵣ = n! / [r! (n - r)!]</Text>
      </View>

      <ProblemBox 
        question="Choose 3 men from 6 and 2 women from 5."
        solution="⁶C₃ × ⁵C₂ = 20 × 10 = 200 ways."
      />

      <ProblemBox 
        question="Choose 3 distinct groups of 3 students from 9 students."
        solution="⁹C₃ × ⁶C₃ × ³C₃ = 84 × 20 × 1 = 1680."
      />

      {/* --- SECTION 4: PRINCIPLES --- */}
      <Text style={styles.sectionHeader}>Advanced Counting Principles</Text>

      <View style={styles.principleCard}>
        <Text style={styles.principleTitle}>Pascal's Identity</Text>
        <Text style={styles.paragraphSmall}>Ways to choose k elements from n:</Text>
        <Text style={styles.principleText}>ⁿCₖ = ⁿ⁻¹Cₖ₋₁ + ⁿ⁻¹Cₖ</Text>
      </View>

      <View style={styles.principleCard}>
        <Text style={styles.principleTitle}>Pigeonhole Principle</Text>
        <Text style={styles.paragraphSmall}>If n pigeons are put into m pigeonholes (n {'>'} m), at least one hole has more than one pigeon.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Example:</Text> In a class of 30, at least two people must have names starting with the same alphabet.</Text>
      </View>

      <View style={styles.principleCard}>
        <Text style={styles.principleTitle}>Inclusion-Exclusion Principle</Text>
        <Text style={styles.paragraphSmall}>Computes union of multiple non-disjoint sets:</Text>
        <Text style={styles.principleText}>|A ∪ B| = |A| + |B| - |A ∩ B|</Text>
        <Text style={styles.paragraphSmall}>For three sets:</Text>
        <Text style={styles.principleText}>|A∪B∪C| = |A|+|B|+|C| - |A∩B|-|A∩C|-|B∩C| + |A∩B∩C|</Text>
      </View>

      <ProblemBox 
        question="Integers from 1 to 50 multiples of 2 or 3?"
        solution="|A|=25, |B|=16, |A∩B|=8. Total = 25+16-8 = 33."
      />

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        Counting Theory provides the foundation for probability and algorithm analysis. By decomposing problems using Sum and Product rules, and selecting appropriate Permutation or Combination models, we can quantify outcomes in complex systems.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 15, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  ruleCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 15 },
  ruleTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  ruleDesc: { fontSize: 14, color: '#475569', lineHeight: 18, marginBottom: 10 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontSize: 14, color: '#0F172A', fontWeight: 'bold' },
  formulaHighlight: { backgroundColor: '#F0FDF4', padding: 20, borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#16941c', marginVertical: 15, alignItems: 'center' },
  formulaTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 5 },
  mainFormula: { fontSize: 19, color: '#166534', fontWeight: 'bold', fontFamily: 'monospace' },
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
  principleText: { fontSize: 15, color: '#C2410C', fontWeight: 'bold', textAlign: 'center', marginVertical: 8, fontFamily: 'monospace' }
});