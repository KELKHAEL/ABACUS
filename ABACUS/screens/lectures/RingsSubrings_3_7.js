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
      
      <Text style={styles.paragraph}>
        In Discrete Mathematics, <Text style={styles.bold}>groups, rings, and fields</Text> are important concepts related to Algebraic Structures that extend the concept of groups. A ring differs from groups or structures like semigroups by having two operations that must satisfy certain properties.
      </Text>

      {/* SECTION: WHAT ARE RINGS */}
      <Text style={styles.sectionHeader}>What are Rings in Group Theory?</Text>
      <Text style={styles.paragraph}>
        A ring is an algebraic structure made up of a set of elements combined with <Text style={styles.bold}>two binary operations</Text>, usually referred to as <Text style={styles.bold}>addition (+)</Text> and <Text style={styles.bold}>multiplication (·)</Text>.
      </Text>

      {/* SECTION: RING PROPERTIES */}
      <Text style={styles.sectionHeader}>Ring Properties</Text>
      <Text style={styles.paragraph}>For a set R to be considered a ring, it must satisfy the following:</Text>

      <View style={styles.structureBox}>
        <Text style={styles.subHeader}>1. Addition forms an Abelian group</Text>
        <PropertyItem title="Closure" description="a + b ∈ R" />
        <PropertyItem title="Associativity" description="(a + b) + c = a + (b + c)" />
        <PropertyItem title="Identity Element" description="There exists an element 0 such that a + 0 = a" />
        <PropertyItem title="Inverse Element" description="Every element has an additive inverse (-a) such that a + (-a) = 0" />
        <PropertyItem title="Commutativity" description="a + b = b + a" />
      </View>

      <View style={styles.structureBox}>
        <Text style={styles.subHeader}>2. Multiplication forms a Semigroup</Text>
        <PropertyItem title="Closure" description="a · b ∈ R" />
        <PropertyItem title="Associativity" description="(a · b) · c = a · (b · c)" />
      </View>

      <View style={styles.structureBox}>
        <Text style={styles.subHeader}>3. Distributive Property</Text>
        <PropertyItem title="Left Distributivity" description="a · (b + c) = a · b + a · c" />
        <PropertyItem title="Right Distributivity" description="(a + b) · c = a · c + b · c" />
      </View>

      {/* SECTION: TYPES OF RINGS */}
      <Text style={styles.sectionHeader}>Types of Rings</Text>
      
      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Commutative Ring</Text>
        <Text style={styles.typeDesc}>A ring where multiplication is also commutative (a · b = b · a). Example: Integers (Z).</Text>
      </View>

      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Ring with Unity (Unital Ring)</Text>
        <Text style={styles.typeDesc}>A ring that has a multiplicative identity element, usually denoted by 1 (a · 1 = a = 1 · a).</Text>
      </View>

      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Finite and Infinite Rings</Text>
        <Text style={styles.typeDesc}>A ring is finite if it contains a finite number of elements. Example: Z₆ {"{0, 1, 2, 3, 4, 5}"}. Integers (Z) are infinite.</Text>
      </View>

      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Ring with Zero Divisors</Text>
        <Text style={styles.typeDesc}>There exist non-zero elements a and b such that a · b = 0. Example: In Z₆, 2 · 3 = 0.</Text>
      </View>

      <View style={[styles.typeCard, {borderLeftColor: '#0369A1'}]}>
        <Text style={[styles.typeTitle, {color: '#0369A1'}]}>Integral Domain</Text>
        <Text style={styles.typeDesc}>A ring without zero divisors. If a · b = 0, then either a = 0 or b = 0. Example: The set of integers (Z).</Text>
      </View>

      {/* SECTION: SUBRINGS */}
      <Text style={styles.sectionHeader}>What is a Subring?</Text>
      <Text style={styles.paragraph}>
        A subring is a subset of a ring that is itself a ring under the same operations. It must satisfy:
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• Closed under both addition and multiplication.</Text>
        <Text style={styles.infoText}>• Contains the additive identity (usually 0).</Text>
        <Text style={styles.infoText}>• Includes additive inverses for all its elements.</Text>
      </View>

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: 2Z is a subring of Z</Text>
        <Text style={styles.exampleText}>The set of even integers {`{..., -2, 0, 2, ...}`} is closed under addition (2+4=6) and multiplication (2*4=8), contains 0, and has inverses (2 and -2).</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        To conclude, a ring is an algebraic structure with two binary operations: addition and multiplication. A ring satisfies specific properties like being an Abelian group under addition and a semigroup under multiplication. Finally, we explored subrings, which are subsets that retain all the ring's properties.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  subHeader: { fontSize: 15, fontWeight: 'bold', color: '#16941c', marginBottom: 10 },
  structureBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  propRow: { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  propTextContainer: { flex: 1, marginLeft: 10 },
  propTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
  propDesc: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  typeCard: { padding: 15, borderRadius: 10, backgroundColor: '#F0FDF4', borderLeftWidth: 5, borderLeftColor: '#16941c', marginBottom: 12 },
  typeTitle: { fontSize: 15, fontWeight: 'bold', color: '#166534', marginBottom: 4 },
  typeDesc: { fontSize: 13, color: '#334155', lineHeight: 18 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, marginBottom: 15 },
  infoText: { fontSize: 14, color: '#0369A1', marginBottom: 6 },
  exampleBox: { padding: 15, backgroundColor: '#FAFAFA', borderRadius: 10, borderWidth: 1, borderColor: '#CBD5E1', borderStyle: 'dashed' },
  exampleText: { fontSize: 13, color: '#475569', marginTop: 5, lineHeight: 18 }
});