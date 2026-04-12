import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function GroupTheory_3_2() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- SEMIGROUP --- */}
      <Text style={styles.sectionHeader}>Semigroup</Text>
      <Text style={styles.paragraph}>
        A finite or infinite set S with a binary operation ο (Composition) is called semigroup if it holds following two conditions simultaneously −
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Closure</Text> − For every pair (a, b) ∈ S, (a ο b) has to be present in the set S.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Associative</Text> − For every element a, b, c ∈ S, (a ο b) ο c = a ο (b ο c) must hold.</Text>
      </View>

      <Text style={styles.subHeader}>Example</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>The set of positive integers (excluding zero) with addition operation is a semigroup. For example, S = {"{1, 2, 3, …}"}</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Here closure property holds as for every pair (a, b) ∈ S, (a + b) is present in the set S. [For example, 1 + 2 = 3 ∈ S]</Text>
        <Text style={[styles.exampleText, {marginTop: 5}]}>Associative property also holds for every element a, b, c ∈ S, (a + b) + c = a + (b + c). For example, (1 + 2) + 3 = 1 + (2 + 3) = 5.</Text>
      </View>

      {/* --- MONOID --- */}
      <Text style={styles.sectionHeader}>Monoid</Text>
      <Text style={styles.paragraph}>
        A monoid is a semigroup with an identity element. The identity element (denoted by e or E) of a set S is an element such that (a ο e) = a, for every element a ∈ S. An identity element is also called a <Text style={styles.bold}>unit element</Text>. So, a monoid holds three properties simultaneously − Closure, Associative, Identity element.
      </Text>

      <Text style={styles.subHeader}>Example</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>The set of positive integers (excluding zero) with multiplication operation is a monoid. S = {"{1, 2, 3, …}"}</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Here closure property holds as for every pair (a, b) ∈ S, (a × b) is present in the set S. [For example, 1 × 2 = 2 ∈ S and so on]</Text>
        <Text style={[styles.exampleText, {marginTop: 5}]}>Associative property also holds for every element a, b, c ∈ S, (a × b) × c = a × (b × c). [For example, (1 × 2) × 3 = 1 × (2 × 3) = 6 and so on]</Text>
        <Text style={[styles.exampleText, {marginTop: 5}]}>Identity property also holds for every element a ∈ S, (a × e) = a. [For example, (2 × 1) = 2, (3 × 1) = 3 and so on]. Here identity element is 1.</Text>
      </View>

      {/* --- GROUP --- */}
      <Text style={styles.sectionHeader}>Group</Text>
      <Text style={styles.paragraph}>
        A group is a monoid with an inverse element. The inverse element (denoted by I) of a set S is an element such that (a ο I) = (I ο a) = a, for each element a ∈ S. So, a group holds four properties simultaneously - i) Closure, ii) Associative, iii) Identity element, iv) Inverse element. 
      </Text>
      <Text style={styles.paragraph}>
        The order of a group G is the number of elements in G and the order of an element in a group is the least positive integer n such that aⁿ is the identity element of that group G.
      </Text>

      <Text style={styles.subHeader}>Examples</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>The set of N × N non-singular matrices form a group under matrix multiplication operation.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>• The product of two N × N non-singular matrices is also an N × N non-singular matrix which holds closure property.</Text>
        <Text style={styles.exampleText}>• Matrix multiplication itself is associative. Hence, associative property holds.</Text>
        <Text style={styles.exampleText}>• The set of N × N non-singular matrices contains the identity matrix holding the identity element property.</Text>
        <Text style={styles.exampleText}>• As all the matrices are non-singular they all have inverse elements which are also nonsingular matrices. Hence, inverse property also holds.</Text>
      </View>

      {/* --- ABELIAN GROUP --- */}
      <Text style={styles.sectionHeader}>Abelian Group</Text>
      <Text style={styles.paragraph}>
        An abelian group G is a group for which the element pair (a, b) ∈ G always holds commutative law. So, a group holds five properties simultaneously - i) Closure, ii) Associative, iii) Identity element, iv) Inverse element, v) Commutative.
      </Text>

      <Text style={styles.subHeader}>Example</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>The set of positive integers (including zero) with addition operation is an abelian group. G = {"{0, 1, 2, 3, …}"}</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>• Here closure property holds as for every pair (a, b) ∈ S, (a + b) is present in the set S. [For example, 1 + 2 = 3 ∈ S and so on]</Text>
        <Text style={styles.exampleText}>• Associative property also holds for every element a, b, c ∈ S, (a + b) + c = a + (b + c). [For example, (1 + 2) + 3 = 1 + (2 + 3) = 6 and so on]</Text>
        <Text style={styles.exampleText}>• Identity property also holds for every element a ∈ S, (a + e) = a. [For example, (2 + 0) = 2, (3 + 0) = 3 and so on]. Here, identity element is 0.</Text>
        <Text style={styles.exampleText}>• Commutative property also holds for every element a, b ∈ S, (a + b) = (b + a). [For example, (2 + 3) = (3 + 2) = 5 and so on]</Text>
      </View>

      {/* --- CYCLIC GROUP AND SUBGROUP --- */}
      <Text style={styles.sectionHeader}>Cyclic Group and Subgroup</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>cyclic group</Text> is a group that can be generated by a single element. Every element of a cyclic group is a power of some specific element which is called a generator. A cyclic group can be generated by a generator g, such that every other element of the group can be written as a power of the generator g.
      </Text>

      <Text style={styles.subHeader}>Example</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>The set of complex numbers {"{1, -1, i, -i}"} under multiplication operation is a cyclic group.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>There are two generators − i and -i as i¹ = i, i² = -1, i³ = -i, i⁴ = 1 and also (-i)¹ = -i, (-i)² = -1, (-i)³ = i, (-i)⁴ = 1 which covers all the elements of the group. Hence, it is a cyclic group.</Text>
      </View>
      <Text style={styles.noteText}>
        <Text style={styles.bold}>Note</Text> − A cyclic group is always an abelian group but not every abelian group is a cyclic group. The rational numbers under addition is not cyclic but is abelian.
      </Text>

      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>subgroup</Text> H is a subset of a group G (denoted by H ≤ G) if it satisfies the four properties simultaneously − Closure, Associative, Identity element, and Inverse.
      </Text>
      <Text style={styles.paragraph}>
        A subgroup H of a group G that does not include the whole group G is called a proper subgroup (Denoted by H {"<"} G). A subgroup of a cyclic group is cyclic and a abelian subgroup is also abelian.
      </Text>

      <Text style={styles.subHeader}>Example</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Let a group G = {"{1, i, -1, -i}"}</Text>
        <Text style={styles.exampleText}>Then some subgroups are H₁ = {"{1}"}, H₂ = {"{1, -1}"}.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>This is not a subgroup − H₃ = {"{1, i}"} because the inverse of i, which is (i)⁻¹ = -i, is not in H₃.</Text>
      </View>

      {/* --- POSET --- */}
      <Text style={styles.sectionHeader}>Partially Ordered Set (POSET)</Text>
      <Text style={styles.paragraph}>
        A partially ordered set consists of a set with a binary relation which is reflexive, antisymmetric and transitive. "Partially ordered set" is abbreviated as POSET.
      </Text>

      <Text style={styles.subHeader}>Examples</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>1. The set of real numbers under binary operation less than or equal to (≤) is a poset.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>2. Let the set S = {"{1, 2, 3}"} and the operation is ≤</Text>
        <Text style={styles.exampleText}>The relations will be {"{(1,1), (2,2), (3,3), (1,2), (1,3), (2,3)}"}</Text>
        <Text style={styles.exampleText}>• This relation R is reflexive as {"{(1,1), (2,2), (3,3)}"} ∈ R</Text>
        <Text style={styles.exampleText}>• This relation R is anti-symmetric, as {"{(1,2), (1,3), (2,3)}"} ∈ R and {"{(2,1), (3,1), (3,2)}"} ∉ R</Text>
        <Text style={styles.exampleText}>• This relation R is also transitive as {"{(1,2), (2,3), (1,3)}"} ∈ R.</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', marginTop: 5}]}>Hence, it is a poset.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>3. The vertex set of a directed acyclic graph under the operation reachability is a poset.</Text>
      </View>

      {/* --- HASSE DIAGRAM --- */}
      <Text style={styles.sectionHeader}>Hasse Diagram</Text>
      <Text style={styles.paragraph}>
        The Hasse diagram of a poset is the directed graph whose vertices are the element of that poset and the arcs covers the pairs (x, y) in the poset. If in the poset x {"<"} y, then the point x appears lower than the point y in the Hasse diagram. If x {"<"} y {"<"} z in the poset, then the arrow is not shown between x and z as it is implicit.
      </Text>

      <Text style={styles.subHeader}>Example</Text>
      <Text style={styles.paragraph}>
        The poset of subsets of {"{1, 2, 3}"} = {"{∅, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}"} is shown by the following Hasse diagram −
      </Text>

      {/* 🖼️ IMAGE 1: HASSE DIAGRAM */}
      <Image 
        source={require('../../assets/moduleImages/gro1.jpg')} 
        style={styles.imageLarge}
        resizeMode="contain"
      />

      {/* --- LINEARLY ORDERED SET --- */}
      <Text style={styles.sectionHeader}>Linearly Ordered Set</Text>
      <Text style={styles.paragraph}>
        A Linearly ordered set or Total ordered set is a partial order set in which every pair of element is comparable. The elements a, b ∈ S are said to be comparable if either a ≤ b or b ≤ a holds. Trichotomy law defines this total ordered set. A totally ordered set can be defined as a distributive lattice having the property {"{a ∨ b, a ∧ b} = {a, b}"} for all values of a and b in set S.
      </Text>

      <Text style={styles.subHeader}>Example</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>The powerset of {"{a, b}"} ordered by ⊆ is a totally ordered set as all the elements of the power set P = {"{∅, {a}, {b}, {a, b}}"} are comparable.</Text>
      </View>

      <Text style={styles.subHeader}>Example of non-total order set</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>A set S = {"{1, 2, 3, 4, 5, 6}"} under operation x divides y is not a total ordered set.</Text>
        <Text style={[styles.exampleText, {marginTop: 5}]}>Here, for all (x, y) ∈ S, x | y have to hold but it is not true that 2 | 3, as 2 does not divide 3 or 3 does not divide 2. Hence, it is not a total ordered set.</Text>
      </View>

      {/* --- LATTICE --- */}
      <Text style={styles.sectionHeader}>Lattice</Text>
      <Text style={styles.paragraph}>
        A lattice is a poset (L, ≤) for which every pair {"{a, b} ∈ L"} has a least upper bound (denoted by a ∨ b) and a greatest lower bound (denoted by a ∧ b). LUB ({"{a, b}"}) is called the join of a and b. GLB ({"{a, b}"}) is called the meet of a and b.
      </Text>

      {/* 🖼️ IMAGE 2: LATTICE DEFINITION (Diamond) */}
      <Image 
        source={require('../../assets/moduleImages/gro2.jpg')} 
        style={styles.imageSmall}
        resizeMode="contain"
      />

      <Text style={styles.subHeader}>Example</Text>
      
      {/* 🖼️ IMAGE 3: LATTICE EXAMPLE (Hexagon) */}
      <Image 
        source={require('../../assets/moduleImages/gro3.jpg')} 
        style={styles.imageMedium}
        resizeMode="contain"
      />
      <Text style={styles.paragraph}>This above figure is a lattice because for every pair {"{a, b} ∈ L"}, a GLB and a LUB exists.</Text>

      {/* 🖼️ IMAGE 4: NON-LATTICE EXAMPLE (Tree) */}
      <Image 
        source={require('../../assets/moduleImages/gro4.jpg')} 
        style={styles.imageMedium}
        resizeMode="contain"
      />
      <Text style={styles.paragraph}>This above figure is not a lattice because GLB(a, b) and LUB(e, f) does not exist.</Text>

      {/* --- OTHER LATTICES --- */}
      <Text style={styles.sectionHeader}>Some other lattices are discussed below −</Text>

      <View style={styles.lawCard}>
        <Text style={styles.lawTitle}>Bounded Lattice</Text>
        <Text style={styles.paragraph}>A lattice L becomes a bounded lattice if it has a greatest element 1 and a least element 0.</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.lawTitle}>Complemented Lattice</Text>
        <Text style={styles.paragraph}>A lattice L becomes a complemented lattice if it is a bounded lattice and if every element in the lattice has a complement. An element x has a complement x' if ∃x(x ∧ x' = 0 and x ∨ x' = 1).</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.lawTitle}>Distributive Lattice</Text>
        <Text style={styles.paragraph}>If a lattice satisfies the following two distribute properties, it is called a distributive lattice:</Text>
        <Text style={styles.lawRow}>• a ∨ (b ∧ c) = (a ∨ b) ∧ (a ∨ c)</Text>
        <Text style={styles.lawRow}>• a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c)</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.lawTitle}>Modular Lattice</Text>
        <Text style={styles.paragraph}>If a lattice satisfies the following property, it is called modular lattice:</Text>
        <Text style={styles.lawRow}>• a ∧ (b ∨ (a ∧ d)) = (a ∧ b) ∨ (a ∧ d)</Text>
      </View>

      {/* --- PROPERTIES OF LATTICES --- */}
      <Text style={styles.sectionHeader}>Properties of Lattices</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.lawTitle}>Idempotent Properties</Text>
        <Text style={styles.formulaText}>a ∨ a = a</Text>
        <Text style={styles.formulaText}>a ∧ a = a</Text>

        <Text style={[styles.lawTitle, {marginTop: 10}]}>Absorption Properties</Text>
        <Text style={styles.formulaText}>a ∨ (a ∧ b) = a</Text>
        <Text style={styles.formulaText}>a ∧ (a ∨ b) = a</Text>

        <Text style={[styles.lawTitle, {marginTop: 10}]}>Commutative Properties</Text>
        <Text style={styles.formulaText}>a ∨ b = b ∨ a</Text>
        <Text style={styles.formulaText}>a ∧ b = b ∧ a</Text>

        <Text style={[styles.lawTitle, {marginTop: 10}]}>Associative Properties</Text>
        <Text style={styles.formulaText}>a ∨ (b ∨ c) = (a ∨ b) ∨ c</Text>
        <Text style={styles.formulaText}>a ∧ (b ∧ c) = (a ∧ b) ∧ c</Text>
      </View>

      {/* --- DUAL OF A LATTICE --- */}
      <Text style={styles.sectionHeader}>Dual of a Lattice</Text>
      <Text style={styles.paragraph}>
        The dual of a lattice is obtained by interchanging the '∨' and '∧' operations.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Example:</Text> The dual of [a ∨ (b ∧ c)] is [a ∧ (b ∨ c)]</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  bulletContainer: { flexDirection: 'row', marginBottom: 10, paddingLeft: 5 },
  bullet: { fontSize: 18, color: '#16941c', marginRight: 10, lineHeight: 22 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 24 },
  
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22 },
  
  noteText: { fontSize: 14, color: '#B91C1C', marginTop: 5, marginBottom: 15, fontStyle: 'italic', backgroundColor: '#FEF2F2', padding: 10, borderRadius: 8, overflow: 'hidden' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  
  lawCard: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#FFEDD5' },
  lawTitle: { fontSize: 16, fontWeight: 'bold', color: '#9A3412', marginBottom: 8 },
  lawRow: { fontSize: 14, color: '#9A3412', marginBottom: 5, fontFamily: 'monospace', fontWeight: 'bold' },
  
  formulaBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginVertical: 10, borderWidth: 1, borderColor: '#BBF7D0' },
  formulaText: { color: '#166534', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 15, marginBottom: 5 },
  
  // Image Styles
  imageLarge: { width: '100%', height: 300, borderRadius: 12, marginTop: 15, marginBottom: 20, backgroundColor: '#f1f5f9' },
  imageMedium: { width: '100%', height: 250, borderRadius: 12, marginTop: 15, marginBottom: 15, backgroundColor: '#f1f5f9' },
  imageSmall: { width: 200, height: 200, alignSelf: 'center', borderRadius: 12, marginTop: 15, marginBottom: 15, backgroundColor: '#f1f5f9' },
});