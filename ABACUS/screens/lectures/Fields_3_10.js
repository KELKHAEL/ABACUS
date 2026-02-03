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
      
      <Text style={styles.paragraph}>
        Groups, rings, and fields are important algebraic structures. Fields are often discussed in Ring Theory, but here we will see primarily what fields are, how they work, and what sets them apart from other algebraic structures.
      </Text>

      <Text style={styles.sectionHeader}>What are Fields in Group Theory?</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>field</Text> is an algebraic structure that consists of a non-empty set along with two binary operations, commonly known as <Text style={styles.bold}>addition (+)</Text> and <Text style={styles.bold}>multiplication (·)</Text>.
      </Text>

      {/* THREE MAIN REQUIREMENTS */}
      <Text style={styles.subHeader}>The Three Main Requirements:</Text>
      
      <RequirementCard 
        title="Closure" 
        description="Adding or multiplying any two elements of the field results in another element of the same field." 
      />
      <RequirementCard 
        title="Associativity" 
        description="The grouping of elements (brackets) does not matter for either operation." 
      />
      <RequirementCard 
        title="Commutativity" 
        description="The order of elements does not matter for either addition or multiplication." 
      />

      {/* PROPERTIES SECTION */}
      <Text style={styles.sectionHeader}>Properties of a Field</Text>
      <Text style={styles.paragraph}>To be a field, a set must meet these specific conditions:</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Additive Identity:</Text> Exists an element 0 such that a + 0 = a.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Multiplicative Identity:</Text> Exists an element 1 such that a × 1 = a.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Additive Inverses:</Text> Every element a has an inverse -a such that a + (-a) = 0.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Multiplicative Inverses:</Text> Every non-zero element a has an inverse 1/a such that a × (1/a) = 1.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Distributive Property:</Text> a × (b + c) = (a × b) + (a × c).</Text>
      </View>

      {/* COMMON EXAMPLES */}
      <Text style={styles.sectionHeader}>Common Examples of Fields</Text>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>1. Real Numbers (R)</Text>
        <Text style={styles.exampleText}>The real numbers satisfy all properties, including the existence of multiplicative inverses (like 1/a) for every non-zero number.</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>2. Complex Numbers (C)</Text>
        <Text style={styles.exampleText}>The sum or product of any two complex numbers is still complex. They satisfy identities and inverses (Additive: 0 + 0i, Multiplicative: 1 + 0i).</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>3. Rational Numbers (Q)</Text>
        <Text style={styles.exampleText}>Numbers that can be written as fractions p/q. Rational numbers have both additive and multiplicative identities and inverses.</Text>
      </View>

      {/* NON-FIELD EXAMPLE */}
      <Text style={styles.sectionHeader}>A Set That Is Not a Field: Integers (Z)</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={styles.paragraphSmall}>
          While integers satisfy some properties, they fail because <Text style={styles.bold}>not every non-zero integer has a multiplicative inverse</Text>.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Reason:</Text> For the integer 2, there is no integer x such that 2 × x = 1. Therefore, Z is not a field.
        </Text>
      </View>

      {/* USE CASES */}
      <Text style={styles.sectionHeader}>Use Cases of Fields</Text>
      <View style={styles.useCaseBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>• Cryptography:</Text> RSA encryption relies heavily on field properties and modular arithmetic.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Coding Theory:</Text> Used in error-detecting and error-correcting codes to transmit data accurately.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Linear Algebra:</Text> Field properties help in solving systems of linear equations.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        We Elaborated the concept of fields in discrete mathematics, identifying the properties that define them and looking at examples like real, complex, and rational numbers. We also understood why integers do not form a field and touched upon significant applications in cryptography and coding theory.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 13, color: '#475569', marginBottom: 5 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  reqCard: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 12 },
  reqHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  reqTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369A1', marginLeft: 8 },
  reqDesc: { fontSize: 13, color: '#475569', lineHeight: 18 },
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#166534', marginBottom: 8, lineHeight: 20 },
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', marginBottom: 15 },
  exampleTitle: { fontSize: 15, fontWeight: 'bold', color: '#16941c', marginBottom: 8 },
  exampleText: { fontSize: 13, color: '#334155', lineHeight: 20 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  divider: { height: 1, backgroundColor: '#FECACA', marginVertical: 10 },
  useCaseBox: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20 }
});