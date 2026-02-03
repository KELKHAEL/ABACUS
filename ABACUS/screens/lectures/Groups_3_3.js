import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Groups_3_3() {
  
  // Custom Axiom Component for the 4 Group Properties
  const AxiomCard = ({ title, description, formula }) => (
    <View style={styles.axiomCard}>
      <View style={styles.axiomHeader}>
        <MaterialCommunityIcons name="shield-check" size={20} color="#16941c" />
        <Text style={styles.axiomTitle}>{title}</Text>
      </View>
      <Text style={styles.axiomDesc}>{description}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Algebraic structures</Text> are fundamental concepts in abstract algebra used to organize and understand mathematical systems that operate under specific rules. One of the most common structures is <Text style={styles.bold}>groups</Text>.
      </Text>

      <Text style={styles.sectionHeader}>What is an Algebraic Structure?</Text>
      <Text style={styles.paragraph}>
        An algebraic structure is a set of elements combined with one or more operations (like addition or multiplication) that define how elements interact. 
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• Must use a <Text style={styles.bold}>Binary Operation</Text> (performed on two elements at a time).</Text>
        <Text style={styles.infoText}>• Must satisfy the <Text style={styles.bold}>Closure Property</Text> (the result must stay within the same set).</Text>
      </View>

      <Text style={styles.subHeader}>Example: Closure in Natural Numbers</Text>
      <Text style={styles.paragraph}>
        The set of natural numbers {`{1, 2, 3...}`} is "closed" under addition (5 + 10 = 15). However, it is <Text style={styles.bold}>not closed</Text> under subtraction, as 5 - 10 = -5, which is not a natural number.
      </Text>

      {/* SECTION: WHAT IS A GROUP */}
      <Text style={styles.sectionHeader}>What is a Group?</Text>
      <Text style={styles.paragraph}>
        A group is a specific type of algebraic structure that satisfies <Text style={styles.bold}>four key properties</Text>:
      </Text>

      <AxiomCard 
        title="1. Closure"
        description="The result of applying the operation to any two elements from the set must stay in the set."
        formula="a, b ∈ S ⇒ (a * b) ∈ S"
      />

      <AxiomCard 
        title="2. Associativity"
        description="The grouping of elements does not change the final result."
        formula="(a * b) * c = a * (b * c)"
      />

      <AxiomCard 
        title="3. Identity Element"
        description="A special element in the set that, when combined with any other element, does not change it."
        formula="a * e = a  (Example: 0 for addition)"
      />

      <AxiomCard 
        title="4. Inverse Element"
        description="Every element has a partner in the set that, when combined, results in the identity element."
        formula="a * a⁻¹ = e (Example: 5 + (-5) = 0)"
      />

      {/* EXAMPLES SECTION */}
      <Text style={styles.sectionHeader}>Group Examples</Text>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>Integers under Addition (Z, +)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure:</Text> -3 + 5 = 2 (Integer).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity:</Text> 0 is the identity (5 + 0 = 5).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Inverse:</Text> Inverse of 7 is -7 (7 + (-7) = 0).</Text>
      </View>

      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleTitle, {color: '#B91C1C'}]}>Non-Group Example</Text>
        <Text style={styles.exampleText}>Natural numbers under subtraction do not form a group because they lack <Text style={styles.bold}>Closure</Text> and <Text style={styles.bold}>Inverse</Text> elements.</Text>
      </View>

      {/* TYPES OF GROUPS */}
      <Text style={styles.sectionHeader}>Types of Groups</Text>

      <View style={styles.typeBox}>
        <Text style={styles.subHeader}>1. Abelian Groups</Text>
        <Text style={styles.paragraph}>
          A group where the operation is <Text style={styles.bold}>commutative</Text>. The order of the operation does not matter.
          {"\n"}Example: Integers under addition (5 + 3 = 3 + 5).
        </Text>
      </View>

      <View style={[styles.typeBox, {backgroundColor: '#F1F5F9'}]}>
        <Text style={styles.subHeader}>2. Non-Abelian Groups</Text>
        <Text style={styles.paragraph}>
          A group where the order <Text style={styles.bold}>does</Text> matter.
          {"\n"}Example: 2x2 matrices under multiplication.
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained algebraic structures and the criteria for a group. We understood the basic idea of a set with an operation meeting criteria like closure, associativity, identity, and inverse. By looking at integers and real numbers, we saw how these abstract concepts play out in real mathematical situations.
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
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#0369A1', marginBottom: 8 },
  axiomCard: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 15 },
  axiomHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  axiomTitle: { fontSize: 15, fontWeight: 'bold', color: '#16941c', marginLeft: 10 },
  axiomDesc: { fontSize: 13, color: '#475569', marginBottom: 10 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 8, borderRadius: 6 },
  formulaText: { fontFamily: 'monospace', fontSize: 13, color: '#0F172A', textAlign: 'center' },
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', backgroundColor: '#F0FDF4', marginBottom: 15 },
  exampleTitle: { fontSize: 15, fontWeight: 'bold', color: '#166534', marginBottom: 8 },
  exampleText: { fontSize: 13, color: '#166534', marginBottom: 4 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  typeBox: { padding: 15, borderRadius: 12, backgroundColor: '#F0F9FF', marginBottom: 15 }
});