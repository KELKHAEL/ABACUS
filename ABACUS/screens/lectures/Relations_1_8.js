import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function Relations_1_8() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRO SECTION --- */}
      <Text style={styles.paragraph}>
        Whenever sets are being discussed, the relationship between the elements of the sets is the next thing that comes up. <Text style={styles.bold}>Relations</Text> may exist between objects of the same set or between objects of two or more sets.
      </Text>

      {/* --- DEFINITION & PROPERTIES --- */}
      <Text style={styles.sectionHeader}>Definition and Properties</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>binary relation R</Text> from set x to y (written as xRy or R(x,y)) is a subset of the Cartesian product x × y. If the ordered pair of G is reversed, the relation also changes.
      </Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.bulletText}>• Generally an n-ary relation R between sets A₁, ..., and Aₙ is a subset of the n-ary product A₁ × ... × Aₙ.</Text>
        <Text style={styles.bulletText}>• The minimum cardinality of a relation R is Zero and maximum is n² in this case.</Text>
        <Text style={styles.bulletText}>• A binary relation R on a single set A is a subset of A × A.</Text>
        <Text style={styles.bulletText}>• For two distinct sets A and B having cardinalities m and n respectively, the maximum cardinality of a relation R from A to B is <Text style={styles.bold}>mn</Text>.</Text>
      </View>

      {/* --- DOMAIN AND RANGE --- */}
      <Text style={styles.sectionHeader}>Domain and Range</Text>
      <Text style={styles.paragraph}>
        If there are two sets A and B, and relation R have order pair (x, y), then:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Domain:</Text> The domain of R, Dom(R), is the set {"{x | (x,y) ∈ R for some y in B}"}.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Range:</Text> The range of R, Ran(R), is the set {"{y | (x,y) ∈ R for some x in A}"}.
        </Text>
      </View>

      {/* --- EXAMPLES CASE STUDY --- */}
      <Text style={styles.subHeader}>Examples: Let A = {"{1, 2, 9}"} and B = {"{1, 3, 7}"}</Text>
      <View style={styles.caseContainer}>
        <Text style={styles.caseTitle}>Case 1 – If relation R is 'equal to'</Text>
        <Text style={styles.codeText}>R = {"{(1,1), (3,3)}"}</Text>
        <Text style={styles.caseDetail}>Dom(R) = {"{1, 3}"}, Ran(R) = {"{1, 3}"}</Text>
      </View>
      
      <View style={styles.caseContainer}>
        <Text style={styles.caseTitle}>Case 2 – If relation R is 'less than'</Text>
        <Text style={styles.codeText}>R = {"{(1,3), (1,7), (2,3), (2,7)}"}</Text>
        <Text style={styles.caseDetail}>Dom(R) = {"{1, 2}"}, Ran(R) = {"{3, 7}"}</Text>
      </View>

      <View style={styles.caseContainer}>
        <Text style={styles.caseTitle}>Case 3 – If relation R is 'greater than'</Text>
        <Text style={styles.codeText}>R = {"{(2,1), (9,1), (9,3), (9,7)}"}</Text>
        <Text style={styles.caseDetail}>Dom(R) = {"{2, 9}"}, Ran(R) = {"{1, 3, 7}"}</Text>
      </View>

      {/* --- GRAPH REPRESENTATION --- */}
      <Text style={styles.sectionHeader}>Representation of Relations using Graph</Text>
      <Text style={styles.paragraph}>
        A relation can be represented using a <Text style={styles.bold}>directed graph</Text>.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.bulletText}>• The number of vertices in the graph is equal to the number of elements in the set from which the relation has been defined.</Text>
        <Text style={styles.bulletText}>• For each ordered pair (x, y) in the relation R, there will be a directed edge from vertex x to vertex y.</Text>
        <Text style={styles.bulletText}>• If there is an ordered pair (x, x), there will be a <Text style={styles.bold}>self-loop</Text> on vertex x.</Text>
      </View>

      <Text style={styles.paragraph}>
        Suppose, there is a relation R = {"{(1,1), (1,2), (3,2)}"} on set S = {"{1, 2, 3}"}, it can be represented by the following graph:
      </Text>

      {/* 🖼️ GRAPH IMAGE */}
      <Image 
        source={require('../../assets/moduleImages/Relations1.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.imageCaption}>Figure: Graph Representation of Relation R</Text>

      {/* --- TYPES OF RELATIONS --- */}
      <Text style={styles.sectionHeader}>Types of Relations</Text>
      
      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>1. Empty Relation</Text>
        <Text style={styles.typeDesc}>The Empty Relation between sets X and Y, or on E, is the empty set ∅.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>2. Full Relation</Text>
        <Text style={styles.typeDesc}>The Full Relation between sets X and Y is the set X × Y.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>3. Identity Relation</Text>
        <Text style={styles.typeDesc}>The Identity Relation on set X is the set {"{(x,x) | x ∈ X}"}.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>4. Inverse Relation</Text>
        <Text style={styles.typeDesc}>The Inverse Relation R' of a relation R is defined as: R' = {"{(b,a) | (a,b) ∈ R}"}.</Text>
        <Text style={styles.exampleTextSmall}>Example: If R = {"{(1,2), (2,3)}"} then R' will be {"{(2,1), (3,2)}"}</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>5. Reflexive Relation</Text>
        <Text style={styles.typeDesc}>A relation R on set A is called Reflexive if ∀a ∈ A is related to a (aRa holds).</Text>
        <Text style={styles.exampleTextSmall}>Example: The relation R = {"{(a,a), (b,b)}"} on set X = {"{a,b}"} is reflexive.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>6. Irreflexive Relation</Text>
        <Text style={styles.typeDesc}>A relation R on set A is called Irreflexive if no a ∈ A is related to a (aRa does not hold).</Text>
        <Text style={styles.exampleTextSmall}>Example: The relation R = {"{(a,b), (b,a)}"} on set X = {"{a,b}"} is irreflexive.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>7. Symmetric Relation</Text>
        <Text style={styles.typeDesc}>A relation R on set A is called Symmetric if xRy implies yRx, ∀x ∈ A and ∀y ∈ A.</Text>
        <Text style={styles.exampleTextSmall}>Example: The relation R = {"{(1,2), (2,1), (3,2), (2,3)}"} on set A = {"{1,2,3}"} is symmetric.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>8. Anti-Symmetric Relation</Text>
        <Text style={styles.typeDesc}>A relation R on set A is called Anti-Symmetric if xRy and yRx implies x = y, ∀x ∈ A and ∀y ∈ A.</Text>
        <Text style={styles.exampleTextSmall}>Example: The relation R = {"{(x,y) → N | x ≤ y}"} is anti-symmetric since x ≤ y and y ≤ x implies x = y.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>9. Transitive Relation</Text>
        <Text style={styles.typeDesc}>A relation R on set A is called Transitive if xRy and yRz implies xRz, ∀x, y, z ∈ A.</Text>
        <Text style={styles.exampleTextSmall}>Example: The relation R = {"{(1,2), (2,3), (1,3)}"} on set A = {"{1,2,3}"} is transitive.</Text>
      </View>

      <View style={[styles.typeItem, styles.highlightType]}>
        <Text style={[styles.typeTitle, {color: '#166534'}]}>10. Equivalence Relation</Text>
        <Text style={styles.typeDesc}>A relation is an Equivalence Relation if it is reflexive, symmetric, and transitive.</Text>
        <Text style={[styles.exampleTextSmall, {color: '#15803d'}]}>Example: The relation R = {"{(1,1), (2,2), (3,3), (1,2), (2,1), (2,3), (3,2), (1,3), (3,1)}"} on set A = {"{1,2,3}"} is an equivalence relation since it is reflexive, symmetric, and transitive.</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 15 },
  bulletText: { fontSize: 14, color: '#0369A1', marginBottom: 8, lineHeight: 20 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22 },
  exampleTextSmall: { fontSize: 13, color: '#16941c', fontStyle: 'italic', marginTop: 8, lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  caseContainer: { paddingLeft: 15, borderLeftWidth: 2, borderLeftColor: '#CBD5E1', marginBottom: 20 },
  caseTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 4 },
  codeText: { fontFamily: 'monospace', fontSize: 14, color: '#16941c', fontWeight: 'bold' },
  caseDetail: { fontSize: 13, color: '#64748B', marginTop: 4 },
  typeItem: { marginBottom: 20, padding: 15, borderRadius: 8, backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#F1F5F9' },
  typeTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 6 },
  typeDesc: { fontSize: 14, color: '#475569', lineHeight: 22 },
  highlightType: { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' },
  
  // Image Styles
  image: { width: '100%', height: 220, borderRadius: 12, marginTop: 15, marginBottom: 5, backgroundColor: '#f1f5f9' },
  imageCaption: { fontSize: 13, color: '#64748b', textAlign: 'center', fontStyle: 'italic', marginBottom: 20 }
});