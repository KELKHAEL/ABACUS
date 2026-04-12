import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MathStatements_1_2() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In discrete mathematics, mathematical statements and operations form the building blocks for logical reasoning, problem-solving, and algorithm development in computer science.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will explain the various types of mathematical statements, logical operations, and their applications in discrete mathematics and computer science. We will break down complex ideas into simpler terms for a better understanding.
      </Text>

      {/* --- TYPES OF STATEMENTS --- */}
      <Text style={styles.sectionHeader}>Types of Mathematical Statements</Text>
      <Text style={styles.paragraph}>
        Mathematical statements are used in logical reasoning in discrete mathematics. Let us see the main types of statements:
      </Text>
      
      <Text style={styles.subHeader}>Propositions</Text>
      <Text style={styles.paragraph}>
        A proposition is a declarative sentence that is either true or false, but not both. Let us see some examples:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>"The sky is blue." (This can be true or false depending on the time of day and weather conditions.)</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>"2 + 2 = 4" (This is always true.)</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>"All prime numbers are odd." (This is false, as 2 is an even prime number.)</Text>
      </View>

      <Text style={styles.subHeader}>Predicates</Text>
      <Text style={styles.paragraph}>
        A predicate is a statement that contains one or more variables and becomes a proposition when specific values are assigned to the variables. For example:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>P(x): "x is greater than 5"</Text>
        <Text style={[styles.exampleText, {marginTop: 10, fontStyle: 'italic'}]}>This becomes a proposition when we assign a value to x:</Text>
        <Text style={[styles.exampleText, {fontWeight: 'bold', color: '#16941c'}]}>P(7) is true</Text>
        <Text style={[styles.exampleText, {fontWeight: 'bold', color: '#dc2626'}]}>P(3) is false</Text>
      </View>

      <Text style={styles.subHeader}>Quantified Statements</Text>
      <Text style={styles.paragraph}>
        Quantified statements use quantifiers which claims about the elements of a set. There are two types of quantifiers:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Universal Quantifier (∀):</Text> "for all"</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Existential Quantifier (∃):</Text> "there exists"</Text>
      </View>
      
      <Text style={[styles.paragraph, {marginTop: 10}]}>For example:</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>∀x (x {'>'} 0 → x² {'>'} 0): "For all x, if x is positive, then x² is positive."</Text>
        <Text style={[styles.exampleText, {marginTop: 10}]}>∃x (x² = 4): "There exists an x such that x² equals 4."</Text>
      </View>

      {/* --- LOGICAL OPERATIONS --- */}
      <Text style={styles.sectionHeader}>Logical Operations</Text>
      <Text style={styles.paragraph}>
        Logical operations allow us to combine and manipulate propositions. Some of the fundamental logical operations are:
      </Text>
      
      <Text style={styles.subHeader}>Negation (NOT)</Text>
      <Text style={styles.paragraph}>Negation reverses the truth value of a proposition. It is expressed as ¬ or ~. For example:</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>p: "It is raining" → ¬p: "It is not raining"</Text></View>

      <Text style={styles.subHeader}>Conjunction (AND)</Text>
      <Text style={styles.paragraph}>Conjunction combines two propositions and is true only if both propositions are true. Denoted as ∧. For example:</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>p: "It is cold", q: "It is windy" → p ∧ q: "It is cold and windy"</Text></View>

      <Text style={styles.subHeader}>Disjunction (OR)</Text>
      <Text style={styles.paragraph}>Disjunction combines two propositions and is true if at least one of the propositions is true. Denoted as ∨. For example:</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>p: "I will study math", q: "I will study physics" → p ∨ q: "I will study math or physics (or both)"</Text></View>

      <Text style={styles.subHeader}>Implication (IF-THEN)</Text>
      <Text style={styles.paragraph}>Implication represents a conditional statement, where one proposition implies another. Denoted as →. For example:</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>p: "It is raining", q: "The ground is wet" → p → q: "If it is raining, then the ground is wet"</Text></View>

      <Text style={styles.subHeader}>Biconditional (IF AND ONLY IF)</Text>
      <Text style={styles.paragraph}>Biconditional represents a two-way implication, where two propositions imply each other. It's denoted as ↔. For example:</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>p: "A triangle has three sides"</Text>
        <Text style={styles.codeText}>q: "A triangle has three angles"</Text>
        <Text style={[styles.codeText, {marginTop: 5, color: '#16941c', fontWeight: 'bold'}]}>p ↔ q: "A shape is a triangle if and only if it has three sides and three angles"</Text>
      </View>

      {/* --- TRUTH TABLES --- */}
      <Text style={styles.sectionHeader}>Truth Tables</Text>
      <Text style={styles.paragraph}>
        Another important thing in discrete maths are truth tables. These are used to display all possible combinations of truth values for compound propositions. They are used for understanding and analyzing logical expressions.
      </Text>
      <Text style={styles.paragraph}>Consider an example of a Truth table for p → q:</Text>
      
      <View style={styles.table}>
        <View style={[styles.tableRow, {backgroundColor: '#F1F5F9'}]}>
          <Text style={styles.tableHeader}>p</Text>
          <Text style={styles.tableHeader}>q</Text>
          <Text style={styles.tableHeader}>p → q</Text>
        </View>
        <View style={styles.tableRow}><Text style={styles.tableCell}>T</Text><Text style={styles.tableCell}>T</Text><Text style={[styles.tableCell, {fontWeight: 'bold', color: '#16941c'}]}>T</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCell}>T</Text><Text style={styles.tableCell}>F</Text><Text style={[styles.tableCell, {fontWeight: 'bold', color: '#dc2626'}]}>F</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCell}>F</Text><Text style={styles.tableCell}>T</Text><Text style={[styles.tableCell, {fontWeight: 'bold', color: '#16941c'}]}>T</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCell}>F</Text><Text style={styles.tableCell}>F</Text><Text style={[styles.tableCell, {fontWeight: 'bold', color: '#16941c'}]}>T</Text></View>
      </View>

      {/* --- LOGICAL EQUIVALENCES --- */}
      <Text style={styles.sectionHeader}>Logical Equivalences</Text>
      <Text style={styles.paragraph}>
        Logical equivalences are pairs of compound propositions that always have the same truth value. Some important logical equivalences include:
      </Text>

      <Text style={styles.subHeader}>Commutative Laws</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>p ∧ q ≡ q ∧ p</Text>
        <Text style={styles.codeText}>p ∨ q ≡ q ∨ p</Text>
      </View>

      <Text style={styles.subHeader}>Associative Laws</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>(p ∧ q) ∧ r ≡ p ∧ (q ∧ r)</Text>
        <Text style={styles.codeText}>(p ∨ q) ∨ r ≡ p ∨ (q ∨ r)</Text>
      </View>

      <Text style={styles.subHeader}>Distributive Laws</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)</Text>
        <Text style={styles.codeText}>p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)</Text>
      </View>

      <Text style={styles.subHeader}>De Morgan's Laws</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>¬(p ∧ q) ≡ ¬p ∨ ¬q</Text>
        <Text style={styles.codeText}>¬(p ∨ q) ≡ ¬p ∧ ¬q</Text>
      </View>

      {/* --- SET OPERATIONS --- */}
      <Text style={styles.sectionHeader}>Set Operations</Text>
      <Text style={styles.paragraph}>In set theory, there are some basic sets of operations:</Text>

      <Text style={styles.subHeader}>Union (∪)</Text>
      <Text style={styles.paragraph}>The union of two sets A and B is the set of elements that are in A, in B, or in both A and B.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>A = {'{1, 2, 3}'}, B = {'{3, 4, 5}'} → A ∪ B = {'{1, 2, 3, 4, 5}'}</Text></View>

      <Text style={styles.subHeader}>Intersection (∩)</Text>
      <Text style={styles.paragraph}>The intersection of two sets A and B is the set of elements that are in both A and B.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>A = {'{1, 2, 3}'}, B = {'{3, 4, 5}'} → A ∩ B = {'{3}'}</Text></View>

      <Text style={styles.subHeader}>Complement (A' or Ac)</Text>
      <Text style={styles.paragraph}>The complement of a set A is the set of elements that are not in A.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Universal set U = {'{1, 2, 3, 4, 5}'}, A = {'{1, 2, 3}'} → A' = {'{4, 5}'}</Text></View>

      <Text style={styles.subHeader}>Set Difference (−)</Text>
      <Text style={styles.paragraph}>The set difference A - B is the set of elements that are in A but not in B.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>A = {'{1, 2, 3, 4}'}, B = {'{3, 4, 5}'} → A - B = {'{1, 2}'}</Text></View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we touched upon the fundamental concepts of mathematical statements and operations in discrete mathematics. We explained the various types of statements, including propositions, predicates, and quantified statements.
      </Text>
      <Text style={styles.paragraph}>
        We also understood logical operations, truth tables, and logical equivalences, which form the basis of logical reasoning in discrete mathematics. In addition, we highlighted the set operations and their importance in discrete mathematics and computer science.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, backgroundColor: '#ffffff' },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  bulletContainer: { flexDirection: 'row', marginBottom: 8, paddingLeft: 5 },
  bullet: { fontSize: 16, color: '#16941c', marginRight: 10 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontFamily: 'monospace', fontSize: 14, color: '#334155' },
  codeBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#0F172A' },
  
  // Table Styles
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeader: { flex: 1, padding: 10, fontWeight: 'bold', textAlign: 'center', color: '#334155' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569' }
});