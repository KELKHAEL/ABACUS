import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function RingProperties_3_8() {
  
  // Custom Component for fundamental Ring properties
  const PropertyCard = ({ title, formula, description, color = "#16941c" }) => (
    <View style={[styles.propCard, { borderLeftColor: color }]}>
      <Text style={[styles.propTitle, { color: color }]}>{title}</Text>
      {formula && (
        <View style={styles.formulaRow}>
          <Text style={styles.formulaText}>{formula}</Text>
        </View>
      )}
      <Text style={styles.propDesc}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Groups and Rings are quite similar but they have several different properties. A ring is an algebraic structure that defines operations within a set. However, unlike a group, a ring has <Text style={styles.bold}>two binary operations</Text>, typically addition and multiplication. These operations must satisfy several important properties for the structure to be classified as a ring.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will explain the various properties of rings, using examples for a better understanding.
      </Text>

      {/* --- RINGS AND THEIR PROPERTIES --- */}
      <Text style={styles.sectionHeader}>Rings and Their Properties</Text>
      <Text style={styles.paragraph}>
        For a basic recap, a ring is nothing but an algebraic structure defined by a set R together with two binary operations, called addition (+) and multiplication (·). The set and these operations must follow a set of specific rules or properties to qualify as a ring.
      </Text>

      <Text style={styles.paragraph}>Formally, a ring R must satisfy the following properties −</Text>

      <View style={styles.categoryBox}>
        <Text style={styles.categoryTitle}>I. Addition forms an Abelian group</Text>
        <Text style={styles.paragraphSmall}>The set R, under the operation of addition (+), must form a group where the addition is commutative:</Text>
        <PropertyCard 
          title="Closure & Commutativity" 
          formula="a + b ∈ R  |  a + b = b + a" 
          description="Adding any two elements produces another element in the set, and the order does not matter."
        />
        <PropertyCard 
          title="Associativity" 
          formula="(a + b) + c = a + (b + c)" 
          description="The grouping of elements during addition does not affect the result."
        />
        <PropertyCard 
          title="Additive Identity" 
          formula="a + 0 = a = 0 + a" 
          description="The number 0 is the identity because adding it to any number leaves it unchanged."
        />
        <PropertyCard 
          title="Additive Inverse" 
          formula="a + (-a) = 0" 
          description="Every element must have an inverse. For example, the additive inverse of 5 is -5."
        />
      </View>

      <View style={styles.categoryBox}>
        <Text style={[styles.categoryTitle, {color: '#0369A1'}]}>II. Multiplication forms a semigroup</Text>
        <Text style={styles.paragraphSmall}>The set R, under multiplication, must at least satisfy closure and associativity:</Text>
        <PropertyCard 
          title="Multiplicative Closure" 
          formula="a · b ∈ R" 
          color="#0369A1"
          description="Multiplying any two elements results in another element belonging to the set R."
        />
        <PropertyCard 
          title="Multiplicative Associativity" 
          formula="(a · b) · c = a · (b · c)" 
          color="#0369A1"
          description="The grouping of elements during multiplication does not affect the final result."
        />
        <Text style={styles.noteText}>Note: Multiplication need not have an identity or inverses, and it need not be commutative.</Text>
      </View>

      <View style={styles.categoryBox}>
        <Text style={[styles.categoryTitle, {color: '#9333ea'}]}>III. Distributive Property</Text>
        <Text style={styles.paragraphSmall}>Multiplication in a ring must distribute over addition. For all a, b, and c in R:</Text>
        <View style={styles.formulaHighlight}>
          <Text style={styles.highlightText}>a · (b + c) = a · b + a · c (Left Distributive)</Text>
          <Text style={styles.highlightText}>(a + b) · c = a · c + b · c (Right Distributive)</Text>
        </View>
        <Text style={[styles.paragraphSmall, {marginTop: 10}]}>
          Example: 2 · (3 + 4) = 2 · 3 + 2 · 4 = 6 + 8 = 14.
        </Text>
      </View>

      {/* --- ADDITIONAL RING TYPES --- */}
      <Text style={styles.sectionHeader}>Additional Ring Types</Text>
      <Text style={styles.paragraph}>Rings can be classified based on additional properties −</Text>

      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Commutative Rings</Text>
        <Text style={styles.typeDesc}>
          A ring where multiplication is commutative: <Text style={styles.bold}>a · b = b · a</Text>. The set of integers (Z) is a commutative ring.
        </Text>
      </View>

      <View style={styles.typeCard}>
        <Text style={styles.typeTitle}>Ring with Unity (Unital Ring)</Text>
        <Text style={styles.typeDesc}>
          Contains a multiplicative identity denoted as 1, where <Text style={styles.bold}>a · 1 = a = 1 · a</Text>.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Integral Domain</Text>
        <Text style={styles.paragraphSmall}>
          A commutative ring with unity that has <Text style={styles.bold}>no zero divisors</Text>. No two non-zero integers multiply to zero.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.subHeader}>Ring with Zero Divisors</Text>
        <Text style={styles.paragraphSmall}>
          A ring where non-zero elements can multiply to zero.
          {"\n"}<Text style={styles.bold}>Example:</Text> In Z₆, <Text style={styles.bold}>2 · 3 = 0</Text> even though 2 and 3 are non-zero.
        </Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        A ring is an algebraic structure consisting of a set with two operations: addition and multiplication. In this chapter, we presented several essential properties of rings, including closure, associativity, the existence of an additive identity, and the distributive property.
      </Text>
      <Text style={styles.paragraph}>
        We also looked at different types of rings such as commutative rings, rings with unity, and rings with zero divisors.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 14, color: '#475569', marginBottom: 8, lineHeight: 22 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  categoryBox: { marginBottom: 20 },
  categoryTitle: { fontSize: 17, fontWeight: 'bold', color: '#166534', marginBottom: 10 },
  
  propCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 12 },
  propTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  propDesc: { fontSize: 14, color: '#475569', lineHeight: 20 },
  
  formulaRow: { backgroundColor: '#F1F5F9', padding: 8, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  formulaText: { fontFamily: 'monospace', fontSize: 14, color: '#0F172A', fontWeight: 'bold' },
  
  formulaHighlight: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#DDD6FE' },
  highlightText: { fontFamily: 'monospace', color: '#6D28D9', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  
  typeCard: { padding: 15, borderRadius: 10, backgroundColor: '#F0FDF4', borderLeftWidth: 5, borderLeftColor: '#16941c', marginBottom: 15 },
  typeTitle: { fontSize: 16, fontWeight: 'bold', color: '#166534', marginBottom: 5 },
  typeDesc: { fontSize: 14, color: '#334155', lineHeight: 22 },
  
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#BAE6FD' },
  noteText: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 12 }
});