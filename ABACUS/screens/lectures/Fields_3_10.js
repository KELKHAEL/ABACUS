import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Fields_3_10() {
  
  // Custom Component for the 3 main field requirements
  const RequirementCard = ({ title, description }) => (
    <View style={styles.reqCard}>
      <View style={styles.reqHeader}>
        <MaterialCommunityIcons name="star-circle" size={22} color="#0369A1" />
        <Text style={styles.reqTitle}>{title}</Text>
      </View>
      <Text style={styles.reqDesc}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Groups, rings, and fields are important algebraic structures. In this article, we will explore the concept of fields in a simple way, go through its properties, and also provide some examples for a better understanding.
      </Text>
      <Text style={styles.paragraph}>
        Fields are often discussed in Ring Theory, but here, we will see primarily what fields are, how they work, and what sets them apart from other algebraic structures.
      </Text>

      {/* --- WHAT ARE FIELDS --- */}
      <Text style={styles.sectionHeader}>What are Fields in Group Theory?</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>field</Text> is an algebraic structure that consists of a non-empty set along with two binary operations. These are commonly known as addition and multiplication. For any set to be considered a field, it must satisfy several properties regarding these operations.
      </Text>

      <Text style={styles.subHeader}>The Three Main Requirements:</Text>
      
      <RequirementCard 
        title="Closure" 
        description="If we add or multiply any two elements of the field, we should get another element of the field." 
      />
      <RequirementCard 
        title="Associativity" 
        description="When adding or multiplying, the grouping of elements (brackets) does not matter. e.g., (a + b) + c = a + (b + c)." 
      />
      <RequirementCard 
        title="Commutativity" 
        description="The order of elements does not matter in either addition or multiplication (a + b = b + a)." 
      />

      {/* --- PROPERTIES OF A FIELD --- */}
      <Text style={styles.sectionHeader}>Properties of a Field</Text>
      <Text style={styles.paragraph}>For any set with binary operations to be a field, it must meet the following conditions −</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Additive Identity:</Text> There must be an element denoted as 0. a + 0 = a for all a in the set.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Multiplicative Identity:</Text> There must be an element 1, such that a × 1 = a for all a.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Additive Inverses:</Text> For each element a, there exists an inverse -a, such that a + (−a) = 0.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Multiplicative Inverses:</Text> For every non-zero element a, there exists an element 1/a, such that a × (1/a) = 1.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Distributive Property:</Text> Multiplication must distribute over addition: a × (b + c) = (a × b) + (a × c).</Text>
      </View>

      {/* --- COMMON EXAMPLES --- */}
      <Text style={styles.sectionHeader}>Common Examples of Fields</Text>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>1. Real Numbers (R)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure:</Text> Adding or multiplying any two real numbers results in another real number.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Inverses:</Text> For any non-zero real number, there exists a multiplicative inverse (like 1/a).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Distributive Law:</Text> The property holds: a(b + c) = ab + ac.</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>2. Complex Numbers (C)</Text>
        <Text style={styles.exampleText}>The sum or product of any two complex numbers is still a complex number. They satisfy all conditions, with the additive identity being 0 + 0i and the multiplicative identity being 1 + 0i.</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>3. Rational Numbers (Q)</Text>
        <Text style={styles.exampleText}>Includes all numbers written as fractions p/q (where p, q are integers). They satisfy the same properties as real and complex numbers, having both additive and multiplicative identities and inverses.</Text>
      </View>

      {/* --- NON-FIELD EXAMPLE --- */}
      <Text style={styles.sectionHeader}>A Set That Is Not a Field: Integers (Z)</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={styles.paragraphSmall}>
          The integers satisfy identities and additive inverses, but they <Text style={styles.bold}>fail</Text> on multiplicative inverses.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Reason:</Text> For the integer 2, there is no integer x such that 2 × x = 1. Since not all non-zero integers have multiplicative inverses within the set Z, it is not a field.
        </Text>
      </View>

      {/* --- USE CASES --- */}
      <Text style={styles.sectionHeader}>Use Cases of Fields</Text>
      <View style={styles.useCaseBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>• Cryptography:</Text> RSA encryption relies heavily on field properties and modular arithmetic to ensure secure communication.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Coding Theory:</Text> Fields are used in error-detecting and error-correcting codes to transmit data accurately over unreliable channels.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Linear Algebra:</Text> Field properties are essential for solving systems of linear equations.</Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we elaborated the concept of fields in discrete mathematics. We started by understanding what a field is, the properties that define it, and then looked at some examples like real numbers, complex numbers, and rational numbers.
      </Text>
      <Text style={styles.paragraph}>
        We also provided an example of a set, the integers, that do not form a field. Using the examples, we highlighted how fields behave and why they are significant in various areas of mathematics, from cryptography to coding theory.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 12, marginTop: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 14, color: '#475569', lineHeight: 22 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  reqCard: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 12 },
  reqHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  reqTitle: { fontSize: 16, fontWeight: 'bold', color: '#0369A1', marginLeft: 8 },
  reqDesc: { fontSize: 14, color: '#475569', lineHeight: 20 },
  
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#BBF7D0' },
  infoText: { fontSize: 14, color: '#166534', marginBottom: 10, lineHeight: 22 },
  
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', marginBottom: 15 },
  exampleTitle: { fontSize: 16, fontWeight: 'bold', color: '#16941c', marginBottom: 10 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: 5 },
  
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  divider: { height: 1, backgroundColor: '#FECACA', marginVertical: 12 },
  
  useCaseBox: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#DDD6FE' }
});