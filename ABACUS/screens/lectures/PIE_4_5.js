import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        The <Text style={styles.bold}>Principle of Inclusion and Exclusion (PIE)</Text> is an important concept in Set Theory that helps in calculating the cardinality of the union of multiple sets, even when those sets overlap. 
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Core Idea:</Text> Include elements in the union but exclude those that have been counted multiple times within overlapping sets.
        </Text>
      </View>

      {/* --- SECTION 1: TWO SETS --- */}
      <Text style={styles.sectionHeader}>Principle of Inclusion and Exclusion</Text>
      <Text style={styles.paragraph}>
        PIE is useful for finding the size of the union of two or more sets. When these sets overlap, adding their sizes together may lead to double-counting. PIE corrects this by subtracting the sizes of the intersections.
      </Text>

      <FormulaBox 
        title="Formula for Two Sets"
        sets="2"
        formula="|A ∪ B| = |A| + |B| - |A ∩ B|"
      />

      {/* 🖼️ IMAGE 1: Two-set Venn Diagram */}
      <Image 
        source={require('../../assets/moduleImages/pie1.jpg')} 
        style={styles.imageBox}
        resizeMode="contain"
      />

      <Text style={styles.subHeader}>Example of Two Sets</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• Set A (Math): 10 students</Text>
        <Text style={styles.exampleText}>• Set B (Science): 8 students</Text>
        <Text style={styles.exampleText}>• A ∩ B (Both): 6 students</Text>
        <View style={styles.divider} />
        <Text style={styles.resultText}>|A ∪ B| = 10 + 8 - 6 = <Text style={styles.bold}>12 Students</Text></Text>
      </View>

      {/* --- SECTION 2: THREE SETS --- */}
      <Text style={styles.sectionHeader}>Extending to Three Sets</Text>
      <Text style={styles.paragraph}>
        The process becomes slightly more complex. This formula adds individual sizes but subtracts pairwise intersections. However, the triple intersection gets subtracted three times, so we add it back in once.
      </Text>

      <FormulaBox 
        title="Formula for Three Sets"
        sets="3"
        formula="|A ∪ B ∪ C| = |A| + |B| + |C| - |A ∩ B| - |A ∩ C| - |B ∩ C| + |A ∩ B ∩ C|"
      />

      {/* 🖼️ IMAGE 2: Three-set Venn Diagram Labels */}
      <Image 
        source={require('../../assets/moduleImages/pie2.jpg')} 
        style={styles.imageBox}
        resizeMode="contain"
      />

      <Text style={styles.subHeader}>Example of Three Sets</Text>
      <View style={styles.problemCard}>
        <Text style={styles.problemTitle}>Student Failure Analysis</Text>
        <Text style={styles.exampleTextSmall}>• Algebra (A): 12 | Biology (B): 5 | Chemistry (C): 8</Text>
        <Text style={styles.exampleTextSmall}>• A∩B: 2 | A∩C: 6 | B∩C: 3 | All Three: 1</Text>
        <View style={styles.mathStepBox}>
          <Text style={styles.mathStep}>|A ∪ B ∪ C| = 12 + 5 + 8 − 2 − 6 − 3 + 1</Text>
          <Text style={[styles.mathStep, styles.bold, {color: '#16941c', marginTop: 5}]}>Result = 15 Students failed at least one.</Text>
        </View>
      </View>

      {/* 🖼️ IMAGE 3: Three-set Venn Diagram with Numbers */}
      <Image 
        source={require('../../assets/moduleImages/pie3.jpg')} 
        style={styles.imageBox}
        resizeMode="contain"
      />

      {/* --- SECTION 3: GENERAL FORMULA --- */}
      <Text style={styles.sectionHeader}>General Formula for n Sets</Text>
      <Text style={styles.paragraph}>
        The principle can be generalized for any number of sets. The formula alternates between adding and subtracting intersections of increasing size.
      </Text>
      <View style={styles.darkFormulaBox}>
        <Text style={styles.darkFormulaText}>
          |A₁ ∪ A₂ ∪ ... ∪ Aₙ| = Σ|Aᵢ| - Σ|Aᵢ ∩ Aⱼ| + Σ|Aᵢ ∩ Aⱼ ∩ Aₖ| - ...
        </Text>
      </View>

      {/* --- FOUR SETS EXAMPLE --- */}
      <Text style={styles.subHeader}>Example with Four Sets</Text>
      <Text style={styles.paragraph}>
        Consider four school activities: Football (30), Badminton (25), Hockey (20), and Cricket (15). Using PIE allows us to find students signed up for at least one activity while avoiding double-counting those who signed up for multiple, such as Football and Badminton (10) or all four (3).
      </Text>

      {/* --- APPLICATIONS --- */}
      <Text style={styles.sectionHeader}>Applications of Inclusion and Exclusion</Text>
      <View style={styles.appGrid}>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="counter" size={24} color="#16941c" />
          <Text style={styles.appTitle}>Counting</Text>
          <Text style={styles.appDesc}>Elements meeting at least one criterion.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="chart-bell-curve" size={24} color="#0369A1" />
          <Text style={styles.appTitle}>Probability</Text>
          <Text style={styles.appDesc}>Correcting for overlapping events.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="file-code-outline" size={24} color="#9333ea" />
          <Text style={styles.appTitle}>CS</Text>
          <Text style={styles.appDesc}>Algorithms for complex data structures.</Text>
        </View>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained PIE in discrete mathematics. We moved from two sets to three, and finally to the general formula. PIE helps us accurately count elements in overlapping sets, proving essential for counting, probability, and computer science.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 10, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#0369A1', marginBottom: 20 },
  infoText: { fontSize: 14, color: '#0369A1', lineHeight: 22 },
  
  formulaCard: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 15 },
  formulaTitle: { fontSize: 13, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 8 },
  mathContainer: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center' },
  mathText: { fontFamily: 'monospace', fontSize: 14, color: '#0F172A', fontWeight: 'bold', textAlign: 'center' },
  
  imageBox: { width: '100%', height: 220, marginVertical: 15, borderRadius: 10, backgroundColor: '#FAFAFA' },
  
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#BBF7D0' },
  exampleText: { fontSize: 14, color: '#166534', marginBottom: 6 },
  exampleTextSmall: { fontSize: 13, color: '#475569', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#BBF7D0', marginVertical: 10 },
  resultText: { fontSize: 15, color: '#166534', textAlign: 'right' },
  
  problemCard: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 20 },
  problemTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 10 },
  mathStepBox: { marginTop: 10, padding: 12, backgroundColor: '#F8FAFC', borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  mathStep: { fontSize: 13, color: '#334155', fontFamily: 'monospace', lineHeight: 20 },
  
  darkFormulaBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 12, marginBottom: 25 },
  darkFormulaText: { color: '#38BDF8', fontFamily: 'monospace', fontSize: 13, lineHeight: 22, textAlign: 'center' },
  
  appGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  appItem: { width: '31%', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  appTitle: { fontSize: 12, fontWeight: 'bold', color: '#1E293B', marginTop: 6 },
  appDesc: { fontSize: 9, color: '#64748B', textAlign: 'center', marginTop: 4, lineHeight: 12 }
});