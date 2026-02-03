import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Semigroup_3_5() {
  
  // Custom Component for Semigroup Property Verification
  const PropertyCard = ({ title, description, formula, color = "#16941c" }) => (
    <View style={[styles.propCard, { borderLeftColor: color }]}>
      <Text style={[styles.propTitle, { color: color }]}>{title}</Text>
      <Text style={styles.propDesc}>{description}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        Algebraic structures play an important role in Group Theory and Discrete Mathematics. Among these structures, one of the most useful is the <Text style={styles.bold}>semigroup</Text>. A semigroup is a set paired with an operation that satisfies specific properties.
      </Text>

      <Text style={styles.sectionHeader}>What is a Semigroup?</Text>
      <Text style={styles.paragraph}>
        An algebraic structure is a collection of a set and an operation (like addition or multiplication). For it to be considered a semigroup, it must satisfy two specific properties:
      </Text>

      {/* PROPERTIES SECTION */}
      <PropertyCard 
        title="1. Closure Property"
        description="If you apply the operation to any two elements of the set, the result must also be an element of that same set."
        formula="a, b ∈ S ⇒ (a * b) ∈ S"
      />

      <PropertyCard 
        title="2. Associative Property"
        description="The way in which elements are grouped during the operation does not affect the final result."
        formula="(A * B) * C = A * (B * C)"
      />

      <View style={styles.analogyBox}>
        <View style={styles.analogyHeader}>
          <MaterialCommunityIcons name="chef-hat" size={24} color="#92400E" />
          <Text style={styles.analogyTitle}>Real-World Analogy: The Chef</Text>
        </View>
        <Text style={styles.analogyText}>
          Imagine a chef preparing a meal. Whether the chef prepares the appetizer, then the main course, and then the dessert, or prepares the dessert first, the final meal is still complete. Associativity is like the flexibility of a chef's cooking sequence.
        </Text>
      </View>

      {/* EXAMPLES SECTION */}
      <Text style={styles.sectionHeader}>Examples of Semigroups</Text>
      
      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>Natural Numbers under Addition (N, +)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure:</Text> 2 + 5 = 7 (Still a natural number).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity:</Text> (1+2)+3 = 1+(2+3) = 6.</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>Integers under Multiplication (Z, x)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure:</Text> 5 * (-3) = -15 (Still an integer).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity:</Text> (2*3)*4 is same as 2*(3*4) = 24.</Text>
      </View>

      {/* NON-EXAMPLES SECTION */}
      <Text style={styles.sectionHeader}>Non-Examples of Semigroups</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleTitle, {color: '#B91C1C'}]}>Integers under Division (Z, ÷)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Fails Closure:</Text> 5 ÷ 2 = 2.5 (Not an integer).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Fails Associativity:</Text> (8÷4)÷2 is 1, but 8÷(4÷2) is 4.</Text>
      </View>

      {/* MODULAR ARITHMETIC SPECIAL CASE */}
      <Text style={styles.sectionHeader}>Special Case: Modular Arithmetic</Text>
      <View style={styles.infoBox}>
        <Text style={styles.paragraphSmall}>
          Consider the set of integers under <Text style={styles.bold}>addition modulo 5</Text>:
        </Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure:</Text> Adding two numbers mod 5 always results in a number between 0 and 4. (3+4) mod 5 = 2.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity:</Text> Addition mod 5 is associative. (1+2) mod 5 + 3 mod 5 = 1 mod 5 + (2+3) mod 5.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        A semigroup is an algebraic structure where the set is closed under a binary operation and that operation is associative. In this chapter, we explored how these properties apply to integers, natural numbers, and modular arithmetic while identifying where structures like division fail.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 14, color: '#475569', marginBottom: 8 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  propCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 15 },
  propTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  propDesc: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 10 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontSize: 14, color: '#0F172A', fontWeight: 'bold' },
  analogyBox: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B', marginVertical: 15 },
  analogyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  analogyTitle: { fontSize: 15, fontWeight: 'bold', color: '#92400E', marginLeft: 8 },
  analogyText: { fontSize: 13, color: '#92400E', fontStyle: 'italic', lineHeight: 20 },
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', marginBottom: 15 },
  exampleTitle: { fontSize: 15, fontWeight: 'bold', color: '#16941c', marginBottom: 8 },
  exampleText: { fontSize: 13, color: '#334155', marginBottom: 5 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20 }
});