import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RingProperties_3_8() {
  
  // Custom Component for fundamental Ring properties
  const PropertyCard = ({ title, formula, description, color = "#16941c" }) => (
    <View style={[styles.propCard, { borderLeftColor: color }]}>
      <Text style={[styles.propTitle, { color: color }]}>{title}</Text>
      <View style={styles.formulaRow}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
      <Text style={styles.propDesc}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        Groups and Rings are quite similar but they have several different properties. A ring is an algebraic structure that defines operations within a set. However, unlike a group, a ring has <Text style={styles.bold}>two binary operations</Text>, typically addition and multiplication.
      </Text>

      <Text style={styles.sectionHeader}>Rings and Their Properties</Text>
      <Text style={styles.paragraph}>
        Formally, a ring <Text style={styles.bold}>R</Text> must satisfy three major property groups:
      </Text>

      {/* 1. ABELIAN GROUP PROPERTIES */}
      <View style={styles.categoryBox}>
        <Text style={styles.categoryTitle}>I. Addition forms an Abelian Group</Text>
        <Text style={styles.paragraphSmall}>For any elements a, b, and c in the ring R:</Text>
        
        <PropertyCard 
          title="Closure & Commutativity" 
          formula="a + b ∈ R  |  a + b = b + a" 
          description="The sum must belong to the set, and the order of addition does not matter."
        />
        <PropertyCard 
          title="Additive Identity" 
          formula="a + 0 = a = 0 + a" 
          description="The number 0 is the additive identity because adding it does not change the number."
        />
        <PropertyCard 
          title="Additive Inverse" 
          formula="a + (-a) = 0" 
          description="Every element must have an inverse. For example, the inverse of 5 is -5."
        />
      </View>

      {/* 2. SEMIGROUP PROPERTIES */}
      <View style={styles.categoryBox}>
        <Text style={[styles.categoryTitle, {color: '#0369A1'}]}>II. Multiplication forms a Semigroup</Text>
        <PropertyCard 
          title="Multiplicative Closure" 
          formula="a · b ∈ R" 
          color="#0369A1"
          description="The product of any two integers is always another integer."
        />
        <PropertyCard 
          title="Associativity" 
          formula="(a · b) · c = a · (b · c)" 
          color="#0369A1"
          description="The grouping of elements does not affect the final result for both + and ·."
        />
      </View>

      {/* 3. DISTRIBUTIVE PROPERTY */}
      <View style={styles.categoryBox}>
        <Text style={[styles.categoryTitle, {color: '#9333ea'}]}>III. Distributive Property</Text>
        <Text style={styles.paragraphSmall}>Multiplication must distribute over addition:</Text>
        <View style={styles.formulaHighlight}>
          <Text style={styles.highlightText}>a · (b + c) = a · b + a · c</Text>
          <Text style={styles.highlightText}>(b + c) · a = b · a + c · a</Text>
        </View>
      </View>

      {/* ADDITIONAL RING TYPES */}
      <Text style={styles.sectionHeader}>Advanced Ring Classifications</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Integral Domain</Text>
        <Text style={styles.paragraphSmall}>
          A commutative ring with unity that has <Text style={styles.bold}>no zero divisors</Text>. If a · b = 0, then either a = 0 or b = 0.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.subHeader}>Ring with Zero Divisors</Text>
        <Text style={styles.paragraphSmall}>
          A ring where it is possible for the product of two non-zero elements to be zero.
          {"\n"}<Text style={styles.bold}>Example:</Text> In Z₆, 2 · 3 = 0, even though 2 and 3 are non-zero.
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        A ring is an algebraic structure consisting of a set with two operations: addition and multiplication. We explored essential properties including closure, associativity, identity, and distributivity, as well as specific types like commutative rings and integral domains.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  categoryBox: { marginBottom: 20 },
  categoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#166534', marginBottom: 10 },
  propCard: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 10 },
  propTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  propDesc: { fontSize: 12, color: '#475569', lineHeight: 18 },
  formulaRow: { backgroundColor: '#F1F5F9', padding: 6, borderRadius: 4, alignSelf: 'flex-start', marginBottom: 6 },
  formulaText: { fontFamily: 'monospace', fontSize: 13, color: '#0F172A', fontWeight: 'bold' },
  formulaHighlight: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 10, alignItems: 'center' },
  highlightText: { fontFamily: 'monospace', color: '#6D28D9', fontSize: 13, fontWeight: 'bold', marginBottom: 5 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 10 }
});