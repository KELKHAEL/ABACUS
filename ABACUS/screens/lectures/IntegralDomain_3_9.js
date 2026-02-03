import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IntegralDomain_3_9() {
  
  // Custom Component for Integral Domain requirements
  const RequirementCard = ({ title, formula, description }) => (
    <View style={styles.reqCard}>
      <View style={styles.reqHeader}>
        <MaterialCommunityIcons name="lock-plus" size={20} color="#0369A1" />
        <Text style={styles.reqTitle}>{title}</Text>
      </View>
      <View style={styles.formulaRow}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
      <Text style={styles.reqDesc}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        Rings and groups are fundamental algebraic structures with wide applications in discrete mathematics. Within rings, we have a special type known as the <Text style={styles.bold}>integral domain</Text>. If you are preparing for advanced algebra, it is important to understand how it differs from a general ring.
      </Text>

      <Text style={styles.sectionHeader}>What is an Integral Domain?</Text>
      <Text style={styles.paragraph}>
        An integral domain is a type of ring with additional restrictions. A ring D is considered an integral domain if it satisfies the following:
      </Text>

      {/* THREE CORE REQUIREMENTS */}
      <RequirementCard 
        title="1. Commutativity of Multiplication"
        formula="a · b = b · a"
        description="While not all rings require commutative multiplication, in an integral domain, it is strictly required."
      />

      <RequirementCard 
        title="2. No Zero Divisors"
        formula="a · b = 0 ⇒ a = 0 or b = 0"
        description="In an integral domain, if the product of two elements is zero, at least one of those elements must be zero. You cannot multiply two non-zero numbers to get zero."
      />

      <RequirementCard 
        title="3. Multiplicative Identity (Unity)"
        formula="a · 1 = a"
        description="Like rings with unity, an integral domain must have a multiplicative identity element, often denoted as 1."
      />

      {/* EXAMPLES SECTION */}
      <Text style={styles.sectionHeader}>Examples of Integral Domains</Text>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>Example 1: Integers (Z)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Commutativity:</Text> 3 · 5 = 5 · 3.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>No Zero Divisors:</Text> Multiplying two non-zero integers never results in zero.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Unity:</Text> 1 acts as the multiplicative identity.</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>Example 2: Polynomials (R[x])</Text>
        <Text style={styles.exampleText}>The set of polynomials with real coefficients is an integral domain because multiplying two non-zero polynomials never results in the zero polynomial.</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>Example 3: Zₚ (Modulo a Prime)</Text>
        <Text style={styles.exampleText}>If p is prime, Zₚ is an integral domain because the product of any two non-zero elements modulo p is always non-zero (e.g., in Z₅).</Text>
      </View>

      {/* NON-EXAMPLES SECTION */}
      <Text style={styles.sectionHeader}>Rings That Are NOT Integral Domains</Text>

      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleTitle, {color: '#B91C1C'}]}>Example 1: Z₆ (Integers Modulo 6)</Text>
        <Text style={styles.exampleText}>
          In Z₆, we have <Text style={styles.bold}>zero divisors</Text>. For example, <Text style={styles.bold}>2 · 3 = 0 mod 6</Text>, even though neither 2 nor 3 is zero. Therefore, Z₆ is not an integral domain.
        </Text>
      </View>

      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleTitle, {color: '#B91C1C'}]}>Example 2: Matrices (M₂[R])</Text>
        <Text style={styles.exampleText}>
          Matrices fail two requirements: they are <Text style={styles.bold}>Non-Commutative</Text> (A·B ≠ B·A) and can have zero divisors (two non-zero matrices can multiply to result in a zero matrix).
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        An integral domain is a specific type of ring that satisfies additional properties beyond those of a basic ring, specifically the absence of zero divisors and the existence of unity. We explored integers and prime modular arithmetic as valid structures while identifying how matrix rings and composite modular sets fail these criteria.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  reqCard: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 15 },
  reqHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reqTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369A1', marginLeft: 8 },
  reqDesc: { fontSize: 13, color: '#475569', lineHeight: 18 },
  formulaRow: { backgroundColor: '#E0F2FE', padding: 6, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 6, marginTop: 4 },
  formulaText: { fontFamily: 'monospace', fontSize: 13, color: '#0369A1', fontWeight: 'bold' },
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', marginBottom: 15 },
  exampleTitle: { fontSize: 15, fontWeight: 'bold', color: '#16941c', marginBottom: 8 },
  exampleText: { fontSize: 13, color: '#334155', lineHeight: 20 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' }
});