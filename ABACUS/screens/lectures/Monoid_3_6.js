import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Monoid_3_6() {
  
  // Custom Component for Monoid Property Verification
  const PropertyBadge = ({ title, description, isNew = false }) => (
    <View style={[styles.propCard, isNew && styles.newPropCard]}>
      <View style={styles.propHeader}>
        <MaterialCommunityIcons 
          name={isNew ? "plus-circle" : "check-circle"} 
          size={22} 
          color={isNew ? "#0369A1" : "#16941c"} 
        />
        <Text style={[styles.propTitle, { color: isNew ? "#0369A1" : "#166534" }]}>
          {title} {isNew && "(New Requirement)"}
        </Text>
      </View>
      <Text style={styles.propDesc}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        We consider different types of <Text style={styles.bold}>groups</Text> while working with groups in algebraic structures inside discrete mathematics. One of the key structures in this context is the <Text style={styles.bold}>monoid</Text> that builds upon the ideas of both algebraic structures and semigroups but includes an additional feature that sets it apart: the <Text style={styles.bold}>identity element</Text>.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will see what a monoid is, look at the properties it must satisfy, and go through several examples to understand it properly.
      </Text>

      {/* --- WHAT IS A MONOID --- */}
      <Text style={styles.sectionHeader}>What is a Monoid?</Text>
      <Text style={styles.paragraph}>
        To understand monoids, let us first recap the concept of semigroups. A semigroup is nothing but a set of elements that satisfies two main properties:
      </Text>
      <View style={styles.recapBox}>
        <Text style={styles.recapText}>• <Text style={styles.bold}>Closure</Text> − If we apply a binary operation (such as addition or multiplication) on any two elements of the set, the result must still belong to the set.</Text>
        <Text style={[styles.recapText, {marginTop: 8}]}>• <Text style={styles.bold}>Associativity</Text> − The way in which we group the elements when applying the operation does not matter. For example, (a * b) * c should give the same result as a * (b * c).</Text>
      </View>

      <View style={styles.highlightBox}>
        <Text style={styles.highlightText}>
          A monoid builds on the concept of a semi-group but adds an extra condition: the <Text style={styles.bold}>identity element</Text>.
        </Text>
      </View>

      {/* --- IDENTITY ELEMENT --- */}
      <Text style={styles.subHeader}>Identity Element</Text>
      <Text style={styles.paragraph}>
        An <Text style={styles.bold}>identity element</Text> is a special element in the set that, when combined with any other element of the set using the binary operation, leaves the other element unchanged.
      </Text>
      <View style={styles.exampleInfo}>
        <Text style={styles.infoText}>• If the operation is <Text style={styles.bold}>addition</Text>, the identity element is <Text style={styles.bold}>0</Text> because adding 0 to any number leaves it the same.</Text>
        <Text style={styles.infoText}>• For <Text style={styles.bold}>multiplication</Text>, the identity element is <Text style={styles.bold}>1</Text> because multiplying any number by 1 results in the same number.</Text>
      </View>
      <Text style={styles.paragraph}>
        Formally we can say, for a set S with a binary operation (*), if there exists an element e ∈ S such that for all a ∈ S,
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>a * e = e * a = a</Text>
      </View>
      <Text style={styles.paragraph}>
        Then e is the identity element, and S is a monoid.
      </Text>

      {/* --- MONOID PROPERTIES --- */}
      <Text style={styles.sectionHeader}>Monoid Properties</Text>
      <Text style={styles.paragraph}>A Monoid must satisfy the following three properties −</Text>
      <PropertyBadge 
        title="Closure" 
        description="The set must be closed under the operation. This means applying the operation to any two elements of the set results in another element from the set." 
      />
      <PropertyBadge 
        title="Associativity" 
        description="The operation must be associative, meaning grouping the elements in different ways does not affect the outcome of the operation." 
      />
      <PropertyBadge 
        isNew 
        title="Identity Element" 
        description="There must exist an identity element that, when combined with any other element using the operation, leaves that element unchanged." 
      />
      <Text style={styles.paragraph}>If a set and operation satisfy all three of these properties, then we have a monoid.</Text>

      {/* --- EXAMPLES OF MONOIDS --- */}
      <Text style={styles.sectionHeader}>Examples of Monoids</Text>
      <Text style={styles.paragraph}>Go through the following examples understand how monoids work in practice −</Text>
      
      <Text style={styles.subHeader}>Example 1: Integers under Addition</Text>
      <Text style={styles.paragraph}>Let us consider with the set of integers Z and the operation of addition.</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure</Text> − If we add any two integers, the result is always another integer. For example, 5 + 3 = 8.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity</Text> − Addition is associative. That is, (5 + 3) + 2 is the same as 5 + (3 + 2), and both give 10.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity Element</Text> − The identity element for addition is 0, because adding 0 to any number leaves the number unchanged. For example, 5 + 0 = 5.</Text>
      </View>
      <Text style={styles.paragraph}>Since integers under addition satisfy closure, associativity, and have an identity element (0), they form a monoid.</Text>

      <Text style={styles.subHeader}>Example 2: Natural Numbers under Multiplication</Text>
      <Text style={styles.paragraph}>Now consider the set of natural numbers N = {"{1, 2, 3, 4, …}"} under multiplication.</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure</Text> − Multiplying any two natural numbers results in another natural number. For example, 3 * 4 = 12.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity</Text> − Multiplication is associative, meaning (2 * 3) * 4 = 2 * (3 * 4) = 24.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity Element</Text> − The identity element for multiplication is 1, because multiplying any number by 1 leaves the number unchanged. For example, 5 * 1 = 5.</Text>
      </View>
      <Text style={styles.paragraph}>Thus, the natural numbers under multiplication form a monoid with the identity element is being 1.</Text>

      <Text style={styles.subHeader}>Example 3: Real Numbers under Multiplication</Text>
      <Text style={styles.paragraph}>Consider the set of real numbers R under multiplication. However, in this case, we exclude 0 because multiplying by 0 does not preserve the elements.</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure</Text> − Multiplying any two real numbers results in another real number. For example, 5 * 3 = 7.5.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity</Text> − Multiplication is associative, so (2 * 3) * 4 = 2 * (3 * 4).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity Element</Text> − The identity element for multiplication is 1, because multiplying any real number by 1 leaves the number unchanged.</Text>
      </View>
      <Text style={styles.paragraph}>So that, the set of non-zero real numbers under multiplication forms a monoid.</Text>

      {/* --- EXAMPLES OF NON-MONOIDS --- */}
      <Text style={styles.sectionHeader}>Examples of Non-Monoids</Text>
      <Text style={styles.paragraph}>Let us see some examples where the groups are not monoids.</Text>

      <Text style={styles.subHeader}>Example 1: Integers under Subtraction</Text>
      <Text style={styles.paragraph}>If we take the set of integers under the operation of subtraction, does it form a monoid?</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Closure</Text> − Subtracting two integers gives another integer, so it satisfies the closure property.</Text>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Associativity</Text> − Subtraction is not associative. For example, (7 - 3) - 2 ≠ 7 - (3 - 2).</Text>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Identity Element</Text> − Subtraction also does not have an identity element that leaves all other elements unchanged. There is no number that, when subtracted from any integer, leaves the integer the same.</Text>
      </View>
      <Text style={styles.paragraph}>So that, the set of integers under subtraction does not form a monoid.</Text>

      <Text style={styles.subHeader}>Example 2: Natural Numbers under Division</Text>
      <Text style={styles.paragraph}>Consider the set of natural numbers under the division.</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Closure</Text> − Division of natural numbers does not always result in another natural number. For example, 4 ÷ 2 = 2, but 5 ÷ 2 = 2.5, which is not a natural number.</Text>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Associativity</Text> − Division is also not associative. For example, (8 ÷ 4) ÷ 2 = 1, but 8 ÷ (4 ÷ 2) = 4.</Text>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Identity Element</Text> − There is no identity element for division in natural numbers, as dividing by 1 does not leave all elements unchanged.</Text>
      </View>
      <Text style={styles.paragraph}>Therefore, natural numbers under division do <Text style={styles.bold}>not</Text> form a monoid.</Text>

      {/* --- MODULAR ARITHMETIC SECTION --- */}
      <Text style={styles.sectionHeader}>Monoid in Modular Arithmetic</Text>
      <Text style={styles.paragraph}>
        Another great application of monoids is found in modular arithmetic. They are especially in computer science we use such techniques.
      </Text>
      <Text style={styles.paragraph}>
        Consider a set Z₅ = {"{0, 1, 2, 3, 4}"} under addition modulo 5.
      </Text>
      <View style={[styles.exampleCard, {backgroundColor: '#F0FDF4', borderColor: '#BBF7D0'}]}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure</Text> − Adding any two elements and taking the result modulo 5 results in another element in the set. For example, (3 + 4) mod 5 = 2.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity</Text> − Addition modulo 5 is associative. So, (1 + 2) mod 5 + 3 mod 5 gives the same result as 1 mod 5 + (2 + 3) mod 5.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity Element</Text> − The identity element here is 0, as (n + 0) mod 5 = n.</Text>
      </View>
      <Text style={styles.paragraph}>Thus, the set Z₅ under addition modulo 5 is a monoid.</Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        Monoids build upon the concept of semigroups by introducing an identity element. In this chapter, we explained the three main properties of a Monoid: closure, associativity, and the existence of an identity element.
      </Text>
      <Text style={styles.paragraph}>
        We presented several examples, including integers under addition, natural numbers under multiplication, and modular arithmetic, to illustrate how Monoids work in practice. Additionally, we understood the cases like integers under subtraction and natural numbers under division that are not monoids because they fail to satisfy one or more of these properties.
      </Text>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  recapBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  recapText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  
  highlightBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#BAE6FD', marginVertical: 10 },
  highlightText: { fontSize: 15, color: '#0369A1', lineHeight: 24, fontStyle: 'italic', fontWeight: '500' },
  
  formulaBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, alignItems: 'center', marginVertical: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  formulaText: { fontSize: 16, color: '#0F172A', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: 1 },
  
  exampleInfo: { paddingLeft: 10, marginBottom: 15 },
  infoText: { fontSize: 15, color: '#475569', marginBottom: 8, lineHeight: 24 },
  
  propCard: { backgroundColor: '#FAFAFA', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 15 },
  newPropCard: { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', borderLeftWidth: 5, borderLeftColor: '#0369A1' },
  propHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  propTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  propDesc: { fontSize: 14, color: '#475569', lineHeight: 22 },
  
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 8, lineHeight: 22 },
  
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
});