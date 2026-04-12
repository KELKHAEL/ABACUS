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
      
      {/* --- INTRODUCTION & RECAP --- */}
      <Text style={styles.paragraph}>
        We know that <Text style={styles.bold}>rings</Text> and <Text style={styles.bold}>groups</Text> are fundamental algebraic structures that have a wide range of applications in discrete mathematics. Within rings, we have a special type known as the <Text style={styles.bold}>integral domain</Text> and they are quite useful.
      </Text>

      <Text style={styles.sectionHeader}>What is a Ring? (Recap)</Text>
      <Text style={styles.paragraph}>
        For a basic recap, a ring is an algebraic structure consisting of a set R with two binary operations: addition (+) and multiplication (·). 
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Addition:</Text> Forms an Abelian group (Closure, Associativity, Identity 0, Inverses, and Commutativity).</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Multiplication:</Text> Forms a semi-group and distributes over addition: a · (b + c) = a · b + a · c.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Unity:</Text> A ring with unity has a multiplicative identity element (1) such that a · 1 = a = 1 · a.</Text>
      </View>

      {/* --- WHAT IS AN INTEGRAL DOMAIN --- */}
      <Text style={styles.sectionHeader}>What is an Integral Domain?</Text>
      <Text style={styles.paragraph}>
        An integral domain is a type of ring with additional restrictions. A ring D is considered an integral domain if it satisfies the following:
      </Text>

      <RequirementCard 
        title="1. Commutativity of Multiplication"
        formula="a · b = b · a"
        description="In an integral domain, the multiplication operation must be commutative for any two elements in D."
      />

      <RequirementCard 
        title="2. No Zero Divisors"
        formula="a · b = 0 ⇒ a = 0 or b = 0"
        description="A ring has zero divisors when the product of two non-zero elements equals zero. In an integral domain, this cannot happen. If the product is zero, at least one element must be zero."
      />

      <RequirementCard 
        title="3. Multiplicative Identity (Unity)"
        formula="a · 1 = a"
        description="Like rings with unity, an integral domain must have a multiplicative identity element, often denoted as 1."
      />

      <View style={styles.highlightBox}>
        <Text style={styles.highlightText}>
          In summary: An <Text style={styles.bold}>integral domain</Text> is a commutative ring with unity that has no zero divisors.
        </Text>
      </View>

      {/* --- EXAMPLES --- */}
      <Text style={styles.sectionHeader}>Examples of Integral Domains</Text>

      <Text style={styles.subHeader}>Example 1: Integers (Z)</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Commutativity:</Text> 3 · 5 = 5 · 3.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>No Zero Divisors:</Text> There is no way to multiply two non-zero integers and get zero.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Unity:</Text> The integer 1 serves as the multiplicative identity.</Text>
      </View>

      <Text style={styles.subHeader}>Example 2: Polynomials (R[x])</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>Multiplying polynomials is commutative, e.g., (x + 1)(x + 2) = (x + 2)(x + 1). The product of two non-zero polynomials is never zero, and 1 is the multiplicative identity.</Text>
      </View>

      <Text style={styles.subHeader}>Example 3: Integers Modulo Prime (Zp)</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>In Zp, if p is prime, the product of two non-zero elements modulo p is never zero. For instance, in Z₅, the product of non-zero elements is always non-zero.</Text>
      </View>

      {/* --- NON-EXAMPLES --- */}
      <Text style={styles.sectionHeader}>Rings That Are Not Integral Domains</Text>

      <Text style={styles.subHeader}>Example 1: Z₆ (Integers Modulo 6)</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Zero Divisors:</Text> In Z₆, 2 · 3 = 0 mod 6, even though neither 2 nor 3 is zero. This existence of zero divisors means Z₆ is not an integral domain.
        </Text>
      </View>

      <Text style={styles.subHeader}>Example 2: Matrices (M₂(R))</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Non-Commutativity:</Text> In general, A · B ≠ B · A.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Zero Divisors:</Text> It is possible for two non-zero matrices to multiply and result in the zero matrix.</Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        An integral domain is a specific type of ring that satisfies additional properties beyond those of a basic ring. These properties include the absence of zero divisors, commutative multiplication, and the existence of a multiplicative identity.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we presented examples of integers (Z) and polynomials with real coefficients (R[x]) to understand what makes an integral domain distinct. We also saw examples of rings that do not qualify as integral domains, such as Z₆ and matrix rings, due to the presence of zero divisors or non-commutative multiplication.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 8, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  infoText: { fontSize: 14, color: '#334155', marginBottom: 8, lineHeight: 20 },
  
  reqCard: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 15 },
  reqHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reqTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369A1', marginLeft: 8 },
  reqDesc: { fontSize: 14, color: '#475569', lineHeight: 20 },
  
  formulaRow: { backgroundColor: '#E0F2FE', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 10, marginTop: 4, borderWidth: 1, borderColor: '#BAE6FD' },
  formulaText: { fontFamily: 'monospace', fontSize: 14, color: '#0369A1', fontWeight: 'bold' },
  
  highlightBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', marginVertical: 15 },
  highlightText: { fontSize: 15, color: '#166534', lineHeight: 24 },
  
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', marginBottom: 15 },
  exampleTitle: { fontSize: 16, fontWeight: 'bold', color: '#16941c', marginBottom: 10 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22 },
  
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
});