import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Professional Visualization Component for Venn Diagrams
const VennDiagramBox = ({ type, color = "#16941c" }) => {
  return (
    <View style={styles.vennOuter}>
      <View style={styles.universalContainer}>
        <Text style={styles.uLabel}>U</Text>
        
        <View style={styles.circleContainer}>
          {/* Circle A */}
          <View style={[
            styles.vennCircle, 
            styles.posA,
            { borderColor: color },
            (type === 'union' || type === 'intersection' || type === 'difference' || type === 'symmetric') && { backgroundColor: color + '20' },
            (type === 'intersection' || type === 'difference' || type === 'symmetric') && { backgroundColor: 'transparent' }
          ]}>
             {/* Shading for A specific operations */}
             {type === 'difference' && <View style={[styles.shadingFill, { backgroundColor: color + '60', borderRadius: 50 }]} />}
             {type === 'symmetric' && <View style={[styles.shadingFill, { backgroundColor: color + '60', borderRadius: 50 }]} />}
             <Text style={styles.circleLabel}>A</Text>
          </View>

          {/* Circle B */}
          <View style={[
            styles.vennCircle, 
            styles.posB,
            { borderColor: color },
            (type === 'union' || type === 'intersection' || type === 'symmetric') && { backgroundColor: color + '20' },
            (type === 'intersection' || type === 'symmetric') && { backgroundColor: 'transparent' }
          ]}>
             {type === 'symmetric' && <View style={[styles.shadingFill, { backgroundColor: color + '60', borderRadius: 50 }]} />}
             <Text style={styles.circleLabel}>B</Text>
          </View>

          {/* Accurate Intersection Shading */}
          {(type === 'intersection' || type === 'union') && (
            <View style={styles.intersectionArea}>
               <View style={[styles.shadingFill, { backgroundColor: color + '80' }]} />
            </View>
          )}
        </View>

        {/* Outer Shading for Complement */}
        {type === 'complement' && (
          <View style={[styles.universalOverlay, { backgroundColor: color + '30' }]} />
        )}
      </View>
      <Text style={styles.captionText}>
        {type === 'union' && "Union (A ∪ B): All shaded"}
        {type === 'intersection' && "Intersection (A ∩ B): Overlap shaded"}
        {type === 'difference' && "Difference (A - B): Only A shaded"}
        {type === 'complement' && "Complement (A'): Outside shaded"}
        {type === 'symmetric' && "Symmetric Diff: Non-overlap shaded"}
      </Text>
    </View>
  );
};

export default function VennDiagrams_1_10() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        To visualize sets, one of the most useful methods is <Text style={styles.bold}>Venn diagrams</Text>. Invented in 1880 by John Venn, these represent sets as circles within a rectangle representing the <Text style={styles.bold}>universal set (U)</Text>.
      </Text>

      <Text style={styles.sectionHeader}>Visualizing Set Operations</Text>
      
      <Text style={styles.subHeader}>1. Union of Sets (A ∪ B)</Text>
      <VennDiagramBox type="union" />
      <Text style={styles.paragraph}>
        The union is represented by shading the entire area covered by both circles. 
        Example: If A = {"{1, 2, 3}"} and B = {"{2, 3, 4}"}, A ∪ B = {"{1, 2, 3, 4}"}.
      </Text>

      <Text style={styles.subHeader}>2. Intersection of Sets (A ∩ B)</Text>
      <VennDiagramBox type="intersection" />
      <Text style={styles.paragraph}>
        The intersection is shown by shading <Text style={styles.bold}>only</Text> the overlapping region where circles A and B meet.
      </Text>

      <Text style={styles.subHeader}>3. Set Difference (A - B)</Text>
      <VennDiagramBox type="difference" />
      <Text style={styles.paragraph}>
        The difference is represented by shading only the part of A that does <Text style={styles.bold}>not</Text> overlap with B.
      </Text>

      <Text style={styles.subHeader}>4. Complement of a Set (A')</Text>
      <VennDiagramBox type="complement" />
      <Text style={styles.paragraph}>
        Represented by shading the entire area <Text style={styles.bold}>outside</Text> the circle of set A within the universal set U.
      </Text>

      <Text style={styles.subHeader}>5. Symmetric Difference</Text>
      <VennDiagramBox type="symmetric" color="#0ea5e9" />
      <Text style={styles.paragraph}>
        The symmetric difference (A Δ B) shades the parts of A and B that do <Text style={styles.bold}>not</Text> overlap.
      </Text>

      {/* THREE SETS SECTION */}
      <Text style={styles.sectionHeader}>Working with Three Sets</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.paragraph}>
          Venn diagrams can include three circles (A, B, and C) to represent more complex relationships. 
        </Text>
        <Text style={styles.bold}>Example Case:</Text>
        <Text style={styles.exampleText}>• A = {"{1, 2}"}, B = {"{2, 3}"}, C = {"{3, 4}"}</Text>
        <Text style={styles.exampleText}>• A ∩ B ∩ C = ∅ (Empty intersection)</Text>
      </View>

      <Text style={styles.sectionHeader}>Solving Problems with Venn Diagrams</Text>
      <Text style={styles.paragraph}>
        Venn diagrams offer an intuitive way to solve word problems involving cardinality.
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>|A ∪ B| = (10 - 5) + (15 - 5) + 5 = 20</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained how Venn diagrams represent sets and their operations. We illustrated visual representations for union, intersection, difference, and complex operations like symmetric difference and working with three sets.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 5 },
  formulaBox: { backgroundColor: '#104a28', padding: 20, borderRadius: 12, marginVertical: 15, alignItems: 'center' },
  formulaText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 15 },
  
  // VENN DIAGRAM VISUALS
  vennOuter: { alignItems: 'center', marginVertical: 10 },
  universalContainer: { width: 260, height: 160, borderWidth: 2, borderColor: '#CBD5E1', backgroundColor: '#FDFDFD', position: 'relative', overflow: 'hidden', justifyContent: 'center' },
  uLabel: { position: 'absolute', top: 5, right: 10, fontWeight: 'bold', color: '#94A3B8' },
  circleContainer: { width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  vennCircle: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  posA: { left: 45 },
  posB: { right: 45 },
  circleLabel: { fontSize: 16, fontWeight: 'bold', color: '#16941c80' },
  shadingFill: { width: '100%', height: '100%', position: 'absolute' },
  intersectionArea: { position: 'absolute', width: 40, height: 70, overflow: 'hidden', zIndex: 3, left: 110, justifyContent: 'center' },
  universalOverlay: { position: 'absolute', width: '100%', height: '100%', zIndex: 1 },
  captionText: { fontSize: 11, color: '#94A3B8', marginTop: 8, fontStyle: 'italic' }
});