import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Relations_1_8() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* INTRO SECTION */}
      <Text style={styles.paragraph}>
        Whenever sets are being discussed, the relationship between the elements of the sets is the next thing that comes up. <Text style={styles.bold}>Relations</Text> may exist between objects of the same set or between objects of two or more sets.
      </Text>

      {/* DEFINITION & PROPERTIES */}
      <Text style={styles.sectionHeader}>Definition and Properties</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>binary relation R</Text> from set x to y (written as xRy or R(x,y)) is a subset of the Cartesian product x × y. If the ordered pair of G is reversed, the relation also changes.
      </Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.bulletText}>• Generally, an n-ary relation R between sets A₁, ..., Aₙ is a subset of the n-ary product A₁ × ... × Aₙ.</Text>
        <Text style={styles.bulletText}>• The minimum cardinality of a relation R is Zero and maximum is n² in this case.</Text>
        <Text style={styles.bulletText}>• For two distinct sets A and B with cardinalities m and n, the maximum cardinality of a relation R from A to B is <Text style={styles.bold}>mn</Text>.</Text>
      </View>

      {/* DOMAIN AND RANGE */}
      <Text style={styles.sectionHeader}>Domain and Range</Text>
      <Text style={styles.paragraph}>
        If there are two sets A and B, and relation R has ordered pair (x, y), then:
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

      {/* EXAMPLES CASE STUDY */}
      <Text style={styles.subHeader}>Example: A = {"{1, 2, 9}"} and B = {"{1, 3, 7}"}</Text>
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

      {/* GRAPH REPRESENTATION */}
      <Text style={styles.sectionHeader}>Representation of Relations using Graph</Text>
      <Text style={styles.paragraph}>
        A relation can be represented using a <Text style={styles.bold}>directed graph</Text>.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.bulletText}>• The number of vertices equals the number of elements in the set.</Text>
        <Text style={styles.bulletText}>• For each pair (x, y) in R, there is a directed edge from vertex x to vertex y.</Text>
        <Text style={styles.bulletText}>• For an ordered pair (x, x), there will be a <Text style={styles.bold}>self-loop</Text> on vertex x.</Text>
      </View>

      {/* TYPES OF RELATIONS */}
      <Text style={styles.sectionHeader}>Types of Relations</Text>
      
      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>1. Empty & Full Relation</Text>
        <Text style={styles.typeDesc}>Empty relation is the empty set ∅. Full relation is the set X × Y.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>2. Identity Relation</Text>
        <Text style={styles.typeDesc}>On set X is the set {"{(x,x) | x ∈ X}"}.</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>3. Reflexive Relation</Text>
        <Text style={styles.typeDesc}>A relation R on A is <Text style={styles.bold}>Reflexive</Text> if ∀a ∈ A is related to a (aRa holds).</Text>
        <Text style={styles.exampleTextSmall}>Example: R = {"{(a,a), (b,b)}"} on X = {"{a,b}"}</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>4. Symmetric Relation</Text>
        <Text style={styles.typeDesc}>If xRy implies yRx, ∀x ∈ A and ∀y ∈ A.</Text>
        <Text style={styles.exampleTextSmall}>Example: R = {"{(1,2), (2,1), (3,2), (2,3)}"} on A = {"{1,2,3}"}</Text>
      </View>

      <View style={styles.typeItem}>
        <Text style={styles.typeTitle}>5. Transitive Relation</Text>
        <Text style={styles.typeDesc}>If xRy and yRz implies xRz, ∀x, y, z ∈ A.</Text>
        <Text style={styles.exampleTextSmall}>Example: R = {"{(1,2), (2,3), (1,3)}"} on A = {"{1,2,3}"}</Text>
      </View>

      <View style={[styles.typeItem, styles.highlightType]}>
        <Text style={styles.typeTitle}>6. Equivalence Relation</Text>
        <Text style={styles.typeDesc}>A relation is an <Text style={styles.bold}>Equivalence Relation</Text> if it is reflexive, symmetric, and transitive.</Text>
      </View>

      <View style={{height: 40}} />
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
  exampleTextSmall: { fontSize: 12, color: '#16941c', fontStyle: 'italic', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  caseContainer: { paddingLeft: 15, borderLeftWidth: 2, borderLeftColor: '#CBD5E1', marginBottom: 20 },
  caseTitle: { fontSize: 14, fontWeight: 'bold', color: '#334155', marginBottom: 4 },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#16941c', fontWeight: 'bold' },
  caseDetail: { fontSize: 13, color: '#64748B', marginTop: 2 },
  typeItem: { marginBottom: 20, padding: 12, borderRadius: 8, backgroundColor: '#FAFAFA' },
  typeTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  typeDesc: { fontSize: 14, color: '#475569', lineHeight: 20 },
  highlightType: { backgroundColor: '#F0FDF4', borderWidth: 1, borderColor: '#BBF7D0' }
});