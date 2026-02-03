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
      
      <Text style={styles.paragraph}>
        We consider different types of <Text style={styles.bold}>groups</Text> while working with algebraic structures inside discrete mathematics. One of the key structures in this context is the <Text style={styles.bold}>monoid</Text> that builds upon the ideas of both algebraic structures and semigroups but includes an additional feature that sets it apart: the <Text style={styles.bold}>identity element</Text>.
      </Text>

      <Text style={styles.sectionHeader}>What is a Monoid?</Text>
      <Text style={styles.paragraph}>
        To understand monoids, we first recap the concept of semigroups. A semigroup is a set of elements that satisfies two main properties: <Text style={styles.bold}>Closure</Text> and <Text style={styles.bold}>Associativity</Text>.
      </Text>

      <View style={styles.highlightBox}>
        <Text style={styles.highlightText}>
          A monoid builds on the concept of a semi-group but adds an extra condition: the <Text style={styles.bold}>identity element</Text>.
        </Text>
      </View>

      {/* IDENTITY ELEMENT DEFINITION */}
      <Text style={styles.subHeader}>The Identity Element (e)</Text>
      <Text style={styles.paragraph}>
        An identity element is a special element in the set that, when combined with any other element using the binary operation, leaves the other element unchanged.
      </Text>

      <View style={styles.formulaBox}>
        <Text style={styles.formulaLabel}>Formal Definition:</Text>
        <Text style={styles.formulaText}>a * e = e * a = a</Text>
      </View>

      <View style={styles.exampleInfo}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Addition:</Text> The identity is <Text style={styles.bold}>0</Text> (a + 0 = a).</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Multiplication:</Text> The identity is <Text style={styles.bold}>1</Text> (a * 1 = a).</Text>
      </View>

      {/* MONOID PROPERTIES */}
      <Text style={styles.sectionHeader}>Monoid Properties</Text>
      <PropertyBadge 
        title="Closure" 
        description="Applying the operation to any two elements results in another element from the set." 
      />
      <PropertyBadge 
        title="Associativity" 
        description="Grouping elements in different ways does not affect the outcome." 
      />
      <PropertyBadge 
        isNew 
        title="Identity Element" 
        description="There must exist an element that leaves others unchanged when combined." 
      />

      {/* EXAMPLES SECTION */}
      <Text style={styles.sectionHeader}>Examples of Monoids</Text>
      
      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>1. Integers under Addition (Z, +)</Text>
        <Text style={styles.exampleText}>• 5 + 3 = 8 (Closure).</Text>
        <Text style={styles.exampleText}>• (5+3)+2 = 5+(3+2) = 10 (Associative).</Text>
        <Text style={styles.exampleText}>• 0 is the identity (5 + 0 = 5).</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>2. Natural Numbers under Multiplication (N, x)</Text>
        <Text style={styles.exampleText}>• 3 * 4 = 12 (Closure).</Text>
        <Text style={styles.exampleText}>• Identity is 1 (5 * 1 = 5).</Text>
      </View>

      {/* NON-MONOIDS SECTION */}
      <Text style={styles.sectionHeader}>Examples of Non-Monoids</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleTitle, {color: '#B91C1C'}]}>Integers under Subtraction</Text>
        <Text style={styles.exampleText}>• (7 - 3) - 2 is not equal to 7 - (3 - 2). Fails <Text style={styles.bold}>Associativity</Text>.</Text>
        <Text style={styles.exampleText}>• No number exists that, when subtracted from any integer, leaves it the same. Fails <Text style={styles.bold}>Identity</Text>.</Text>
      </View>

      {/* MODULAR ARITHMETIC SECTION */}
      <Text style={styles.sectionHeader}>Monoid in Modular Arithmetic</Text>
      <View style={styles.infoBox}>
        <Text style={styles.paragraphSmall}>Consider set Z₅ = {`{0, 1, 2, 3, 4}`} under addition modulo 5:</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure:</Text> (3 + 4) mod 5 = 2 (in the set).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity:</Text> (1+2) mod 5 + 3 mod 5 = 1 + (2+3) mod 5.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity:</Text> 0 is the identity element.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        Monoids build upon the concept of semigroups by introducing an identity element. In this chapter, we explained the three main properties: closure, associativity, and the existence of an identity. Through examples like modular arithmetic and integers, we illustrated how monoids work while distinguishing them from structures like subtraction and division.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 13, color: '#475569', marginBottom: 10 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  highlightBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#BAE6FD', marginVertical: 10 },
  highlightText: { fontSize: 14, color: '#0369A1', lineHeight: 20 },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, alignItems: 'center', marginVertical: 10 },
  formulaLabel: { fontSize: 12, color: '#64748B', fontWeight: 'bold', marginBottom: 5 },
  formulaText: { fontSize: 18, color: '#0F172A', fontFamily: 'monospace', fontWeight: 'bold' },
  exampleInfo: { paddingLeft: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 5 },
  propCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 15 },
  newPropCard: { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' },
  propHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  propTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  propDesc: { fontSize: 13, color: '#475569', lineHeight: 18 },
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FAFAFA', marginBottom: 15 },
  exampleTitle: { fontSize: 15, fontWeight: 'bold', color: '#16941c', marginBottom: 8 },
  exampleText: { fontSize: 13, color: '#334155', marginBottom: 5 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20 }
});