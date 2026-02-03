import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Accurate Venn Diagram Component for Topic 1.9
const SetVennDiagram = ({ type, color = "#16941c" }) => {
  return (
    <View style={styles.vennWrapper}>
      <View style={styles.vennContainer}>
        {/* Circle A */}
        <View style={[
          styles.circle, 
          styles.circleA,
          { borderColor: color },
          (type === 'union' || type === 'difference' || type === 'intersection') && { backgroundColor: color + '30' },
          type === 'complement' && { backgroundColor: 'transparent', borderColor: color }
        ]}>
          <Text style={styles.vennLabelInner}>A</Text>
        </View>
        
        {/* Circle B (Not shown for Complement) */}
        {type !== 'complement' && (
          <View style={[
            styles.circle, 
            styles.circleB,
            { borderColor: color },
            (type === 'union' || type === 'intersection') && { backgroundColor: color + '30' }
          ]}>
            <Text style={styles.vennLabelInner}>B</Text>
          </View>
        )}

        {/* Universal Box for Complement */}
        {type === 'complement' && (
          <View style={styles.universalBox}>
            <View style={[styles.complementFill, { backgroundColor: color + '30' }]} />
            <Text style={styles.uLabel}>U</Text>
          </View>
        )}
      </View>
      <Text style={styles.vennCaption}>
        {type === 'union' && "A ∪ B (All elements in A or B)"}
        {type === 'intersection' && "A ∩ B (Common elements only)"}
        {type === 'difference' && "A - B (Elements in A but not in B)"}
        {type === 'complement' && "A' (Everything in U except A)"}
      </Text>
    </View>
  );
};

export default function SetOperations_1_9() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        In set theory, there are some basic set of operations that form the basis of logical reasoning in discrete mathematics and computer science.
      </Text>

      {/* BASIC OPERATIONS */}
      <Text style={styles.sectionHeader}>Set Operations</Text>

      <Text style={styles.subHeader}>Union (∪)</Text>
      <SetVennDiagram type="union" />
      <Text style={styles.paragraph}>
        The union of two sets A and B is the set of elements that are in A, in B, or in both A and B.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"A = {1, 2, 3}, B = {3, 4, 5}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c'}]}>{"A ∪ B = {1, 2, 3, 4, 5}"}</Text>
      </View>

      <Text style={styles.subHeader}>Intersection (∩)</Text>
      <SetVennDiagram type="intersection" />
      <Text style={styles.paragraph}>
        The intersection of two sets A and B is the set of elements that are in both A and B.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"A = {1, 2, 3}, B = {3, 4, 5}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c'}]}>{"A ∩ B = {3}"}</Text>
      </View>

      <Text style={styles.subHeader}>Complement (A' or Aᶜ)</Text>
      <SetVennDiagram type="complement" />
      <Text style={styles.paragraph}>
        The complement of a set A is the set of elements that are not in A, relative to a universal set U.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"If U = {1, 2, 3, 4, 5} and A = {1, 2, 3}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c'}]}>{"Then A' = {4, 5}"}</Text>
      </View>

      <Text style={styles.subHeader}>Set Difference ( - )</Text>
      <SetVennDiagram type="difference" />
      <Text style={styles.paragraph}>
        The set difference A - B is the set of elements that are in A but not in B.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"A = {1, 2, 3, 4}, B = {3, 4, 5}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c'}]}>{"A - B = {1, 2}"}</Text>
      </View>

      {/* LOGICAL EQUIVALENCES */}
      <Text style={styles.sectionHeader}>Logical Equivalences</Text>
      <Text style={styles.paragraph}>
        These pairs of compound propositions always have the same truth value.
      </Text>

      <View style={styles.lawBox}>
        <Text style={styles.lawTitle}>Commutative Laws</Text>
        <Text style={styles.lawText}>{"• p ∧ q ≡ q ∧ p"}</Text>
        <Text style={styles.lawText}>{"• p ∨ q ≡ q ∨ p"}</Text>
        
        <Text style={styles.lawTitle}>Associative Laws</Text>
        <Text style={styles.lawText}>{"• (p ∧ q) ∧ r ≡ p ∧ (q ∧ r)"}</Text>
        <Text style={styles.lawText}>{"• (p ∨ q) ∨ r ≡ p ∨ (q ∨ r)"}</Text>

        <Text style={styles.lawTitle}>Distributive Laws</Text>
        <Text style={styles.lawText}>{"• p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)"}</Text>
        <Text style={styles.lawText}>{"• p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)"}</Text>

        <Text style={styles.lawTitle}>De Morgan's Laws</Text>
        <Text style={styles.lawText}>{"• ¬(p ∧ q) ≡ ¬p ∨ ¬q"}</Text>
        <Text style={styles.lawText}>{"• ¬(p ∨ q) ≡ ¬p ∧ ¬q"}</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we touched upon mathematical statements and operations, logical equivalences, and set operations which form the basis of reasoning in computer science.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontFamily: 'monospace', fontSize: 13, color: '#334155' },
  lawBox: { backgroundColor: '#F1F5F9', padding: 20, borderRadius: 12, marginBottom: 20 },
  lawTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginTop: 10, marginBottom: 5 },
  lawText: { fontFamily: 'monospace', fontSize: 13, color: '#475569', marginLeft: 10 },
  
  // VENN DIAGRAM STYLES
  vennWrapper: { alignItems: 'center', marginVertical: 20 },
  vennContainer: { width: 220, height: 140, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  circle: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, position: 'absolute' },
  circleA: { left: 40, zIndex: 2 },
  circleB: { right: 40, zIndex: 1 },
  vennLabelInner: { fontWeight: 'bold', color: '#16941c40', fontSize: 18, position: 'absolute', top: '35%', left: '40%' },
  vennCaption: { fontSize: 11, color: '#94A3B8', marginTop: 10, fontStyle: 'italic', textAlign: 'center' },
  
  // Complement Visuals
  universalBox: { width: 180, height: 120, borderWidth: 2, borderColor: '#334155', position: 'absolute', zIndex: 0 },
  complementFill: { position: 'absolute', width: '100%', height: '100%' },
  uLabel: { position: 'absolute', top: 5, right: 8, fontSize: 12, fontWeight: 'bold', color: '#334155' }
});