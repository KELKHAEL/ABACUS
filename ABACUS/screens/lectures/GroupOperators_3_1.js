import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom Law Block Component
const LawBlock = ({ title, formula, children, isTrue = true, alertText }) => (
  <View style={styles.lawCard}>
    <Text style={styles.lawTitle}>{title}</Text>
    {formula && (
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
    )}
    <View style={styles.exampleContent}>
      {children}
    </View>
    {!isTrue && alertText && (
      <View style={styles.alertBox}>
        <MaterialCommunityIcons name="alert-circle" size={16} color="#B91C1C" />
        <Text style={styles.alertText}>{alertText}</Text>
      </View>
    )}
  </View>
);

export default function GroupTheory_3_1() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Group Theory</Text> is a branch of mathematics and abstract algebra that defines an algebraic structure named as a <Text style={styles.bold}>group</Text>. Generally, a group comprises of a set of elements and an operation over any two elements on that set to form a third element also in that set.
      </Text>

      <Text style={styles.paragraph}>
        In 1854, Arthur Cayley, the British Mathematician, gave the modern definition of group for the first time −
      </Text>
      <View style={styles.quoteBox}>
        <Text style={styles.quoteText}>
          "A set of symbols all of them different, and such that the product of any two of them (no matter in what order), or the product of any one of them into itself, belongs to the set, is said to be a group. These symbols are not in general convertible [commutative], but are associative."
        </Text>
      </View>

      <Text style={styles.paragraph}>
        In this chapter, we will know about operators and postulates that form the basics of set theory, group theory and Boolean algebra.
      </Text>

      {/* --- BINARY OPERATORS --- */}
      <Text style={styles.sectionHeader}>Binary Operators</Text>
      <Text style={styles.paragraph}>
        Any set of elements in a mathematical system may be defined with a set of operators and a number of postulates.
      </Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>binary operator</Text> defined on a set of elements is a rule that assigns to each pair of elements a unique element from that set.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Example:</Text> Given the set A = {"{1, 2, 3, 4, 5}"}, we can say <Text style={styles.bold}>⊗</Text> is a binary operator for the operation <Text style={styles.bold}>c = a ⊗ b</Text>, if it specifies a rule for finding c for the pair of (a, b), such that a, b, c ∈ A.
        </Text>
      </View>

      {/* --- POSTULATES --- */}
      <Text style={styles.sectionHeader}>The Postulates</Text>
      <Text style={styles.paragraph}>
        The postulates of a mathematical system form the basic assumptions from which rules can be deduced. The postulates are −
      </Text>

      <LawBlock title="1. Closure">
        <Text style={styles.paragraph}>A set is closed with respect to a binary operator if for every pair of elements in the set, the operator finds a unique element from that set.</Text>
        <Text style={styles.bold}>Example:</Text>
        <Text style={styles.exampleText}>Let A = {"{0, 1, 2, 3, 4, 5, …}"}</Text>
        <Text style={styles.exampleText}>This set is closed under binary operator into (*), because for the operation c = a * b, for any a, b ∈ A, the product c ∈ A.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>The set is <Text style={styles.bold}>not</Text> closed under binary operator divide (÷), because, for the operation c = a ÷ b, for any a, b ∈ A, the product c may not be in the set A. If a = 7, b = 2, then c = 3.5. Here a, b ∈ A but <Text style={{color: '#B91C1C', fontWeight: 'bold'}}>c ∉ A</Text>.</Text>
      </LawBlock>

      <LawBlock 
        title="2. Associative Laws"
        formula="(x ⊗ y) ⊗ z = x ⊗ (y ⊗ z), where x, y, z ∈ A"
        isTrue={false}
        alertText="The operator minus (−) is not associative since (x − y) − z ≠ x − (y − z)."
      >
        <Text style={styles.paragraph}>A binary operator ⊗ on a set A is associative when it holds the above property.</Text>
        <Text style={styles.bold}>Example:</Text>
        <Text style={styles.exampleText}>Let A = {"{1, 2, 3, 4}"}</Text>
        <Text style={styles.exampleText}>The operator plus (+) is associative because for any three elements, x, y, z ∈ A, the property (x + y) + z = x + (y + z) holds.</Text>
      </LawBlock>

      <LawBlock 
        title="3. Commutative Laws"
        formula="x ⊗ y = y ⊗ x, where x, y ∈ A"
        isTrue={false}
        alertText="The operator minus (−) is not commutative since x − y ≠ y − x."
      >
        <Text style={styles.paragraph}>A binary operator ⊗ on a set A is commutative when it holds the above property.</Text>
        <Text style={styles.bold}>Example:</Text>
        <Text style={styles.exampleText}>Let A = {"{1, 2, 3, 4}"}</Text>
        <Text style={styles.exampleText}>The operator plus (+) is commutative because for any two elements, x, y ∈ A, the property x + y = y + x holds.</Text>
      </LawBlock>

      <LawBlock 
        title="4. Distributive Laws"
        formula="x ⊗ (y ⊛ z) = (x ⊗ y) ⊛ (x ⊗ z), where x, y, z ∈ A"
        isTrue={false}
        alertText="These operators are not distributive over * since x + (y * z) ≠ (x + y) * (x + z)."
      >
        <Text style={styles.paragraph}>Two binary operators ⊗ and ⊛ on a set A, are distributive over operator ⊛ when the above property holds.</Text>
        <Text style={styles.bold}>Example:</Text>
        <Text style={styles.exampleText}>Let A = {"{1, 2, 3, 4}"}</Text>
        <Text style={styles.exampleText}>The operators into (*) and plus (+) are distributive over operator + because for any three elements, x, y, z ∈ A, the property x * (y + z) = (x * y) + (x * z) holds.</Text>
      </LawBlock>

      <LawBlock 
        title="5. Identity Element"
        formula="e ⊗ x = x ⊗ e, where x ∈ A"
      >
        <Text style={styles.paragraph}>A set A has an identity element with respect to a binary operation ⊗ on A, if there exists an element e ∈ A, such that the above property holds.</Text>
        <Text style={styles.bold}>Example:</Text>
        <Text style={styles.exampleText}>Let Z = {"{0, 1, 2, 3, 4, 5, …}"}</Text>
        <Text style={styles.exampleText}>The element 1 is an identity element with respect to operation * since for any element x ∈ Z, 1 * x = x * 1.</Text>
        <Text style={[styles.exampleText, {marginTop: 5, color: '#B91C1C'}]}>On the other hand, there is no identity element for the operation minus (−).</Text>
      </LawBlock>

      <LawBlock 
        title="6. Inverse"
        formula="x ⊗ y = e"
      >
        <Text style={styles.paragraph}>If a set A has an identity element e with respect to a binary operator ⊗, it is said to have an inverse whenever for every element x ∈ A, there exists another element y ∈ A, such that the above property holds.</Text>
        <Text style={styles.bold}>Example:</Text>
        <Text style={styles.exampleText}>Let A = {"{… -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, …}"}</Text>
        <Text style={styles.exampleText}>Given the operation plus (+) and e = 0, the inverse of any element x is (−x) since x + (−x) = 0.</Text>
      </LawBlock>

      {/* --- DE MORGAN'S LAWS --- */}
      <Text style={styles.sectionHeader}>De Morgan's Law</Text>
      <Text style={styles.paragraph}>
        De Morgan's Laws gives a pair of transformations between union and intersection of two (or more) sets in terms of their complements. The laws are −
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>(A ∪ B)′ = A′ ∩ B′</Text>
        <Text style={styles.formulaText}>(A ∩ B)′ = A′ ∪ B′</Text>
      </View>

      <Text style={styles.subHeader}>Example of De Morgan's Laws</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Let A = {"{1, 2, 3, 4}"}, B = {"{1, 3, 5, 7}"}, and Universal set U = {"{1, 2, 3, …, 9, 10}"}</Text>
        <View style={styles.divider} />
        
        <Text style={styles.codeText}>A′ = {"{5, 6, 7, 8, 9, 10}"}</Text>
        <Text style={styles.codeText}>B′ = {"{2, 4, 6, 8, 9, 10}"}</Text>
        <Text style={styles.codeText}>A ∪ B = {"{1, 2, 3, 4, 5, 7}"}</Text>
        <Text style={styles.codeText}>A ∩ B = {"{1, 3}"}</Text>
        
        <View style={styles.divider} />
        <Text style={styles.codeText}>(A ∪ B)′ = {"{6, 8, 9, 10}"}</Text>
        <Text style={styles.codeText}>A′ ∩ B′ = {"{6, 8, 9, 10}"}</Text>
        <Text style={[styles.codeText, {color: '#16941c', fontWeight: 'bold'}]}>Thus, we see that (A ∪ B)′ = A′ ∩ B′</Text>

        <View style={styles.divider} />
        <Text style={styles.codeText}>(A ∩ B)′ = {"{2, 4, 5, 6, 7, 8, 9, 10}"}</Text>
        <Text style={styles.codeText}>A′ ∪ B′ = {"{2, 4, 5, 6, 7, 8, 9, 10}"}</Text>
        <Text style={[styles.codeText, {color: '#16941c', fontWeight: 'bold'}]}>Thus, we see that (A ∩ B)′ = A′ ∪ B′</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 10, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  quoteBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#94A3B8', marginVertical: 15 },
  quoteText: { fontStyle: 'italic', color: '#475569', fontSize: 15, lineHeight: 22 },
  
  lawCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  lawTitle: { fontSize: 17, fontWeight: 'bold', color: '#16941c', marginBottom: 10 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  formulaText: { fontFamily: 'monospace', color: '#0F172A', fontWeight: 'bold', fontSize: 15, lineHeight: 24 },
  exampleContent: { marginTop: 5 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: 4 },
  codeText: { fontFamily: 'monospace', fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: 4 },
  
  alertBox: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: '#FEF2F2', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#FECACA' },
  alertText: { flex: 1, marginLeft: 8, fontSize: 13, color: '#B91C1C', lineHeight: 18 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 }
});