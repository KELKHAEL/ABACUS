import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PIE_4_5() {
  
  // Custom Component for PIE Formulas
  const FormulaBox = ({ title, formula, sets }) => (
    <View style={styles.formulaCard}>
      <Text style={styles.formulaTitle}>{title} ({sets} Sets)</Text>
      <View style={styles.mathContainer}>
        <Text style={styles.mathText}>{formula}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        The <Text style={styles.bold}>Principle of Inclusion and Exclusion (PIE)</Text> is an important concept in Set Theory that helps in calculating the cardinality of the union of multiple sets, even when those sets overlap. 
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Core Idea:</Text> Include the elements in the union but exclude those that have been counted multiple times with the overlapping sets.
        </Text>
      </View>

      {/* SECTION 1: TWO SETS */}
      <Text style={styles.sectionHeader}>PIE for Two Sets</Text>
      <Text style={styles.paragraph}>
        When two sets overlap, adding their sizes together leads to double-counting the intersection. PIE corrects this by subtracting the intersection once.
      </Text>

      <FormulaBox 
        title="Standard Formula"
        sets="2"
        formula="|A ∪ B| = |A| + |B| - |A ∩ B|"
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: Math & Science Students</Text>
        <Text style={styles.exampleText}>• Set A (Math): 10 students</Text>
        <Text style={styles.exampleText}>• Set B (Science): 8 students</Text>
        <Text style={styles.exampleText}>• Intersection (Both): 6 students</Text>
        <View style={styles.divider} />
        <Text style={styles.resultText}>Total = 10 + 8 - 6 = <Text style={styles.bold}>12 Students</Text></Text>
      </View>

      {/* SECTION 2: THREE SETS */}
      <Text style={styles.sectionHeader}>Extending to Three Sets</Text>
      <Text style={styles.paragraph}>
        The process becomes slightly more complex. We add individual set sizes, subtract pairwise intersections, and add back the triple intersection.
      </Text>

      <FormulaBox 
        title="Expanded Formula"
        sets="3"
        formula="|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|"
      />

      <View style={styles.problemCard}>
        <Text style={styles.problemTitle}>Subject Failure Analysis</Text>
        <Text style={styles.exampleTextSmall}>• Failed Algebra (A): 12 | Failed Biology (B): 5 | Failed Chemistry (C): 8</Text>
        <Text style={styles.exampleTextSmall}>• Failed A&B: 2 | Failed A&C: 6 | Failed B&C: 3 | Failed All: 1</Text>
        <View style={styles.mathStepBox}>
          <Text style={styles.mathStep}>Step: (12+5+8) - (2+6+3) + 1</Text>
          <Text style={styles.mathStep}>Result: 25 - 11 + 1 = <Text style={styles.bold}>15 Students</Text></Text>
        </View>
      </View>

      {/* SECTION 3: GENERAL FORMULA */}
      <Text style={styles.sectionHeader}>General Formula for n Sets</Text>
      <Text style={styles.paragraph}>
        The formula alternates between adding and subtracting as intersections increase in size.
      </Text>
      <View style={styles.darkFormulaBox}>
        <Text style={styles.darkFormulaText}>
          |∪ᵢ₌₁ⁿ Aᵢ| = Σ|Aᵢ| - Σ|Aᵢ ∩ Aⱼ| + Σ|Aᵢ ∩ Aⱼ ∩ Aₖ| - ... + (-1)ⁿ⁻¹ |A₁ ∩ ... ∩ Aₙ|
        </Text>
      </View>

      {/* APPLICATIONS */}
      <Text style={styles.sectionHeader}>Applications of PIE</Text>
      <View style={styles.appGrid}>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="calculator" size={24} color="#16941c" />
          <Text style={styles.appTitle}>Counting</Text>
          <Text style={styles.appDesc}>Elements meeting at least one criterion.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="chart-bell-curve" size={24} color="#0369A1" />
          <Text style={styles.appTitle}>Probability</Text>
          <Text style={styles.appDesc}>Calculating union probability of events.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="xml" size={24} color="#9333ea" />
          <Text style={styles.appTitle}>CS</Text>
          <Text style={styles.appDesc}>Counting specific data structures/sets.</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained PIE in discrete mathematics, moving from basic two-set logic to the general formula for any number of sets. We demonstrated its utility in counting students across various activities and highlighted its broad applications in probability and computer science.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#0369A1', marginBottom: 20 },
  infoText: { fontSize: 14, color: '#0369A1', lineHeight: 20 },
  formulaCard: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 15 },
  formulaTitle: { fontSize: 13, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 8 },
  mathContainer: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center' },
  mathText: { fontFamily: 'monospace', fontSize: 14, color: '#0F172A', fontWeight: 'bold', textAlign: 'center' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#166534', marginBottom: 4 },
  exampleTextSmall: { fontSize: 12, color: '#475569', marginBottom: 4 },
  divider: { height: 1, backgroundColor: '#BBF7D0', marginVertical: 10 },
  resultText: { fontSize: 15, color: '#166534', textAlign: 'right' },
  problemCard: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 20 },
  problemTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 10 },
  mathStepBox: { marginTop: 10, padding: 10, backgroundColor: '#F1F5F9', borderRadius: 8 },
  mathStep: { fontSize: 13, color: '#475569', fontFamily: 'monospace', marginBottom: 2 },
  darkFormulaBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 12, marginBottom: 25 },
  darkFormulaText: { color: '#38BDF8', fontFamily: 'monospace', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  appGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  appItem: { width: '31%', backgroundColor: '#F9FAFB', padding: 10, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  appTitle: { fontSize: 12, fontWeight: 'bold', color: '#1E293B', marginTop: 5 },
  appDesc: { fontSize: 9, color: '#64748B', textAlign: 'center', marginTop: 2 }
});