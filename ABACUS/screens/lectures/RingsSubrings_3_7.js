import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RingsSubrings_3_7() {
  
  const PropertyItem = ({ title, description, icon = "check-circle-outline" }) => (
    <View style={styles.propRow}>
      <MaterialCommunityIcons name={icon} size={18} color="#16941c" />
      <View style={styles.propTextContainer}>
        <Text style={styles.propTitle}>{title}</Text>
        <Text style={styles.propDesc}>{description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In Discrete Mathematics, <Text style={styles.bold}>groups, rings, and fields</Text> are important concepts related to Algebraic Structures that extend the concept of groups. But what exactly is a ring, and how does it differ from groups or other algebraic structures like semigroups?
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will cover the concept of rings and subrings in detail. We will also discuss their properties and present several examples to for a better understanding.
      </Text>

      {/* --- WHAT ARE RINGS --- */}
      <Text style={styles.sectionHeader}>What are Rings in Group Theory?</Text>
      <Text style={styles.paragraph}>
        A ring is nothing but an algebraic structure made up with set of elements combined with <Text style={styles.bold}>two binary operations</Text>. They are usually referred to as <Text style={styles.bold}>addition (+)</Text> and <Text style={styles.bold}>multiplication (·)</Text>. Unlike groups, where we have only one binary operation; rings are characterized by having two operations that must satisfy certain properties.
      </Text>

      {/* --- RING PROPERTIES --- */}
      <Text style={styles.sectionHeader}>Ring Properties</Text>
      <Text style={styles.paragraph}>For a set R to be considered a ring, it must satisfy the following properties −</Text>

      <View style={styles.structureBox}>
        <Text style={styles.subHeader}>1. Addition forms an Abelian group</Text>
        <PropertyItem title="Closure" description="Adding any two elements produces another element in the set (a + b ∈ R)." />
        <PropertyItem title="Associativity" description="(a + b) + c = a + (b + c) for all a, b, c ∈ R." />
        <PropertyItem title="Identity Element" description="There must exist an element 0 such that a + 0 = a." />
        <PropertyItem title="Inverse Element" description="Every element has an additive inverse (-a) such that a + (-a) = 0." />
        <PropertyItem title="Commutativity" description="The addition operation is commutative (a + b = b + a)." />
      </View>

      <View style={styles.structureBox}>
        <Text style={styles.subHeader}>2. Multiplication forms a Semigroup</Text>
        <PropertyItem title="Closure" description="If a, b ∈ R, then a · b ∈ R." />
        <PropertyItem title="Associativity" description="(a · b) · c = a · (b · c)." />
      </View>

      <View style={styles.structureBox}>
        <Text style={styles.subHeader}>3. Distributive Property</Text>
        <PropertyItem title="Left Distributivity" description="a · (b + c) = a · b + a · c" />
        <PropertyItem title="Right Distributivity" description="(a + b) · c = a · c + b · c" />
      </View>

      {/* --- DETAILED EXAMPLE --- */}
      <Text style={styles.sectionHeader}>Example: Integers (Z)</Text>
      <Text style={styles.paragraph}>
        The set of integers (Z) with addition and multiplication forms a ring:
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Addition:</Text> Forms an Abelian group (Identity is 0, Inverse of 5 is -5).</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Multiplication:</Text> Forms a semigroup (Closure and Associativity apply).</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Distributive:</Text> 2 · (3 + 4) = 2·3 + 2·4 = 6 + 8 = 14.</Text>
      </View>

      {/* --- TYPES OF RINGS --- */}
      <Text style={styles.sectionHeader}>Types of Rings</Text>
      
      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Commutative Ring</Text>
        <Text style={styles.typeDesc}>Multiplication is commutative (a · b = b · a). Example: Integers (Z).</Text>
      </View>

      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Ring with Unity (Unital Ring)</Text>
        <Text style={styles.typeDesc}>Has a multiplicative identity (1) where a · 1 = a.</Text>
      </View>

      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Finite and Infinite Rings</Text>
        <Text style={styles.typeDesc}>Finite contains limited elements (Z₆). Infinite contains unlimited elements (Z).</Text>
      </View>

      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Ring with Zero Divisors</Text>
        <Text style={styles.typeDesc}>Non-zero elements multiply to zero. Example: In Z₆, 2 · 3 = 0.</Text>
      </View>

      <View style={[styles.typeCard, {borderLeftColor: '#0369A1'}]}>
        <Text style={[styles.typeTitle, {color: '#0369A1'}]}>Integral Domain</Text>
        <Text style={styles.typeDesc}>A ring without zero divisors. If a · b = 0, then a = 0 or b = 0. Example: Integers (Z).</Text>
      </View>

      {/* --- SUBRINGS --- */}
      <Text style={styles.sectionHeader}>What is a Subring?</Text>
      <Text style={styles.paragraph}>
        A subring is a subset of a ring that is itself a ring under the same operations. It must be closed under addition/multiplication, contain 0, and contain additive inverses.
      </Text>

      <View style={styles.exampleBox}>
        <Text style={[styles.bold, {color: '#16941c'}]}>Example: 2Z (Even Integers) is a subring of Z</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Sum:</Text> 2 + 4 = 6 (Even, stays in 2Z).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Product:</Text> 2 · 4 = 8 (Even, stays in 2Z).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity:</Text> 0 is an even integer (stays in 2Z).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Inverse:</Text> Inverse of 4 is -4 (Even, stays in 2Z).</Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        To conclude, a ring is an algebraic structure with two binary operations: addition and multiplication. A ring satisfies specific properties like being an Abelian group under addition and a semigroup under multiplication. Rings also respect the distributive property.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we covered various types of rings, including commutative rings, rings with unity, finite and infinite rings, and rings with or without zero divisors. Finally, we explained the concept of a subring, which is a subset of a ring that retains the ring's properties.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  subHeader: { fontSize: 16, fontWeight: 'bold', color: '#16941c', marginBottom: 12 },
  structureBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  propRow: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  propTextContainer: { flex: 1, marginLeft: 10 },
  propTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
  propDesc: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  typeCard: { padding: 15, borderRadius: 10, backgroundColor: '#F0FDF4', borderLeftWidth: 5, borderLeftColor: '#16941c', marginBottom: 12 },
  typeTitle: { fontSize: 15, fontWeight: 'bold', color: '#166534', marginBottom: 4 },
  typeDesc: { fontSize: 14, color: '#334155', lineHeight: 20 },
  infoBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 8, lineHeight: 22 },
  exampleBox: { padding: 15, backgroundColor: '#FAFAFA', borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1', borderStyle: 'dashed', marginBottom: 20 },
  exampleText: { fontSize: 14, color: '#475569', marginTop: 8, lineHeight: 20 }
});