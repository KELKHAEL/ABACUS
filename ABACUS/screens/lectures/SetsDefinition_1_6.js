import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Custom Accurate Venn Diagram Component
const VennVisual = ({ type, color = "#16941c" }) => {
  return (
    <View style={styles.vennWrapper}>
      <View style={styles.vennContainer}>
        {/* Circle A */}
        <View style={[
          styles.circle, 
          styles.circleA,
          { borderColor: color },
          (type === 'union' || type === 'intersection' || type === 'difference') && { backgroundColor: color + '30' }
        ]}>
           <Text style={styles.vennLabelInner}>A</Text>
        </View>
        
        {/* Circle B */}
        <View style={[
          styles.circle, 
          styles.circleB,
          { borderColor: color },
          (type === 'union' || type === 'intersection') && { backgroundColor: color + '30' }
        ]}>
           <Text style={styles.vennLabelInner}>B</Text>
        </View>

        {/* Labels positioned outside for clarity */}
        <Text style={[styles.vennLabelPos, {left: 40}]}>A</Text>
        <Text style={[styles.vennLabelPos, {right: 40}]}>B</Text>
      </View>
      <Text style={styles.vennCaption}>
        {type === 'union' && "A ∪ B (All elements in A or B)"}
        {type === 'intersection' && "A ∩ B (Common elements only)"}
        {type === 'difference' && "A - B (Elements strictly in A)"}
      </Text>
    </View>
  );
};

export default function SetsDefinition_1_6() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 60}} showsVerticalScrollIndicator={false}>
      
      {/* 1. DEFINITION & HISTORY */}
      <Text style={styles.paragraph}>
        German mathematician <Text style={styles.bold}>G. Cantor</Text> introduced the concept of sets. He defined a set as a collection of definite and distinguishable objects selected by the means of certain rules or description.
      </Text>

      <Text style={styles.sectionHeader}>Set - Definition</Text>
      <Text style={styles.paragraph}>
        A set is an unordered collection of different elements. A set can be written explicitly by listing its elements using set brackets. repetition or changing the order does not change the set.
      </Text>

      <Text style={styles.subHeader}>Representation of a Set</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Roster Form:</Text> Listing all elements separated by commas.</Text>
      </View>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"A = {a, e, i, o, u}"} (Vowels)</Text>
        <Text style={styles.exampleText}>{"B = {1, 3, 5, 7, 9}"} (Odd Numbers)</Text>
      </View>

      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Set Builder Notation:</Text> Defined by a property common to all elements, e.g., {"A = {x : p(x)}"}.</Text>
      </View>

      {/* 2. CARDINALITY & TYPES */}
      <Text style={styles.sectionHeader}>Types of Sets</Text>
      <Text style={styles.paragraph}>
        Cardinality |S| is the number of elements in set S.
      </Text>

      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Finite/Infinite:</Text> Finite sets have a countable number of members; infinite sets do not.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>{"Subset (X ⊆ Y):"}</Text> Every element of X is also in Y.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>{"Proper Subset (X ⊂ Y):"}</Text> X is a subset of Y but not equal to Y.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>{"Empty Set (Ø):"}</Text> A set with no elements. |Ø| = 0.</Text>
      </View>

      {/* 3. SET OPERATIONS */}
      <Text style={styles.sectionHeader}>Set Operations & Venn Diagrams</Text>
      <Text style={styles.paragraph}>
        Venn diagrams show logical relations between sets.
      </Text>

      <Text style={styles.subHeader}>Set Union (∪)</Text>
      <VennVisual type="union" />
      <Text style={styles.paragraph}>Union contains elements in A, in B, or in both.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>{"A ∪ B = {x | x ∈ A OR x ∈ B}"}</Text></View>

      <Text style={styles.subHeader}>Set Intersection (∩)</Text>
      <VennVisual type="intersection" />
      <Text style={styles.paragraph}>Intersection contains elements in both A and B.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>{"A ∩ B = {x | x ∈ A AND x ∈ B}"}</Text></View>

      <Text style={styles.subHeader}>Set Difference (-)</Text>
      <VennVisual type="difference" />
      <Text style={styles.paragraph}>Elements in A but NOT in B.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>{"A – B = {x | x ∈ A AND x ∉ B}"}</Text></View>

      {/* 4. ADVANCED TOPICS */}
      <Text style={styles.sectionHeader}>Advanced Concepts</Text>
      
      <Text style={styles.subHeader}>Cartesian Product (A × B)</Text>
      <Text style={styles.paragraph}>All possible ordered pairs (x, y).</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"A={a,b}, B={1,2}"}</Text>
        <Text style={styles.exampleText}>{"A×B = {(a,1), (a,2), (b,1), (b,2)}"}</Text>
      </View>

      <Text style={styles.subHeader}>Power Set P(S)</Text>
      <Text style={styles.paragraph}>The set of all subsets of S. Cardinality is 2^n.</Text>

      <Text style={styles.subHeader}>Partitioning & Bell Numbers</Text>
      <Text style={styles.paragraph}>
        Partitioning divides a set into disjoint subsets. Bell numbers (Bn) count the possible ways to partition a set.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"For |S|=3, the partitions result in B3 = 5"}.</Text>
        <Text style={styles.exampleText}>{"1. Ø, {1, 2, 3}"}</Text>
        <Text style={styles.exampleText}>{"2. {1}, {2, 3}"}</Text>
        <Text style={styles.exampleText}>{"3. {1, 2}, {3}"}</Text>
        <Text style={styles.exampleText}>{"4. {1, 3}, {2}"}</Text>
        <Text style={styles.exampleText}>{"5. {1}, {2}, {3}"}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  bulletContainer: { flexDirection: 'row', marginBottom: 10, paddingLeft: 5 },
  bullet: { fontSize: 16, color: '#16941c', marginRight: 10 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 22 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontFamily: 'monospace', fontSize: 13, color: '#334155', lineHeight: 20 },
  codeBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 10 },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#0F172A', textAlign: 'center' },
  // Accurate Venn Styles
  vennWrapper: { alignItems: 'center', marginVertical: 15 },
  vennContainer: { width: 220, height: 130, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  circle: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  circleA: { left: 30 },
  circleB: { right: 30 },
  vennLabelInner: { fontWeight: 'bold', color: '#16941c40', fontSize: 20 }, // Faded inner label
  vennLabelPos: { position: 'absolute', top: -10, fontSize: 14, fontWeight: 'bold', color: '#334155' },
  vennCaption: { fontSize: 11, color: '#94A3B8', marginTop: 10, fontStyle: 'italic', textAlign: 'center' }
});