import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GroupTheory_3_1() {
  
  // Custom Law Block Component
  const LawBlock = ({ title, formula, example, isTrue = true }) => (
    <View style={styles.lawCard}>
      <Text style={styles.lawTitle}>{title}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
      <Text style={styles.exampleText}>
        <Text style={styles.bold}>Example: </Text>{example}
      </Text>
      {!isTrue && (
        <View style={styles.alertBox}>
          <MaterialCommunityIcons name="alert-circle" size={16} color="#B91C1C" />
          <Text style={styles.alertText}>This law does not hold for all operators (e.g., subtraction).</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Group Theory</Text> is a branch of mathematics and abstract algebra that defines an algebraic structure named as a <Text style={styles.bold}>group</Text>. Generally, a group comprises a set of elements and an operation over any two elements on that set to form a third element also in that set.
      </Text>

      <Text style={styles.sectionHeader}>Historical Context</Text>
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          "A set of symbols all of them different, and such that the product of any two of them belongs to the set, is said to be a group."
        </Text>
        <Text style={styles.quoteAuthor}>— Arthur Cayley (1854)</Text>
      </View>

      <Text style={styles.sectionHeader}>Binary Operators & Postulates</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>binary operator</Text> (⊗) defined on a set of elements is a rule that assigns to each pair of elements a unique element from that set. The <Text style={styles.bold}>postulates</Text> of a mathematical system form the basic assumptions from which rules can be deduced.
      </Text>

      {/* POSTULATES SECTION */}
      <LawBlock 
        title="1. Closure"
        formula="a * b ∈ A, for any a, b ∈ A"
        example="Set A = {0, 1, 2...} is closed under multiplication because the product is always in A."
      />

      <LawBlock 
        title="2. Associative Law"
        formula="(x ⊗ y) ⊗ z = x ⊗ (y ⊗ z)"
        example="Addition (+) is associative, but subtraction (-) is not."
        isTrue={false}
      />

      <LawBlock 
        title="3. Commutative Law"
        formula="x ⊗ y = y ⊗ x"
        example="Addition (+) is commutative (x+y = y+x), but subtraction (-) is not."
        isTrue={false}
      />

      <LawBlock 
        title="4. Distributive Law"
        formula="x ⊗ (y ⊕ z) = (x ⊗ y) ⊕ (x ⊗ z)"
        example="Multiplication (*) is distributive over addition (+)."
      />

      <Text style={styles.sectionHeader}>Identity and Inverse</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Identity Element (e)</Text>
        <Text style={styles.paragraph}>
          An element <Text style={styles.bold}>e ∈ A</Text> is an identity if <Text style={styles.bold}>e ⊗ x = x ⊗ e = x</Text>.
          Example: For addition, 0 is the identity. For multiplication, 1 is the identity.
        </Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.subHeader}>Inverse Element</Text>
        <Text style={styles.paragraph}>
          If a set has an identity <Text style={styles.bold}>e</Text>, it has an inverse if for every <Text style={styles.bold}>x ∈ A</Text>, there exists <Text style={styles.bold}>y ∈ A</Text> such that <Text style={styles.bold}>x ⊗ y = e</Text>.
          Example: In addition, the inverse of <Text style={styles.bold}>x</Text> is <Text style={styles.bold}>-x</Text>.
        </Text>
      </View>

      <Text style={styles.sectionHeader}>De Morgan's Laws</Text>
      <Text style={styles.paragraph}>
        Provides a pair of transformations between union and intersection of sets in terms of their complements:
      </Text>
      <View style={styles.lawCard}>
        <Text style={styles.formulaText}>• (A ∪ B)' = A' ∩ B'</Text>
        <Text style={styles.formulaText}>• (A ∩ B)' = A' ∪ B'</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the operators and postulates that form the basics of set theory and group theory. We explored closure, identity, and inverse elements, providing a framework for simplifying and understanding complex algebraic structures.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  quoteBox: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#F59E0B', marginVertical: 15 },
  quoteText: { fontStyle: 'italic', color: '#92400E', fontSize: 14, lineHeight: 20 },
  quoteAuthor: { textAlign: 'right', marginTop: 8, fontWeight: 'bold', fontSize: 12, color: '#B45309' },
  lawCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  lawTitle: { fontSize: 16, fontWeight: 'bold', color: '#16941c', marginBottom: 8 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', color: '#0F172A', fontWeight: 'bold' },
  exampleText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  alertBox: { flexDirection: 'row', alignItems: 'center', marginTop: 10, backgroundColor: '#FEF2F2', padding: 8, borderRadius: 6 },
  alertText: { marginLeft: 8, fontSize: 11, color: '#B91C1C' },
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#BBF7D0', marginVertical: 15 }
});