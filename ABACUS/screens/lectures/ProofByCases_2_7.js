import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom Component for Case Analysis
const CaseBox = ({ caseNum, title, content, isCorrect = true }) => (
  <View style={[styles.caseCard, !isCorrect && styles.errorCard]}>
    <View style={styles.caseHeader}>
      <MaterialCommunityIcons 
        name={isCorrect ? "checkbox-marked-circle-outline" : "alert-circle-outline"} 
        size={22} 
        color={isCorrect ? "#16941c" : "#B91C1C"} 
      />
      <Text style={[styles.caseTitle, { color: isCorrect ? "#16941c" : "#B91C1C" }]}>
        Case {caseNum}: {title}
      </Text>
    </View>
    <Text style={styles.caseText}>{content}</Text>
  </View>
);

export default function ProofByCases_2_7() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Proof by Cases</Text> is a common technique used to prove statements that may be True in different scenarios. By covering all possible cases, the proof guarantees the truth of the statement for all possible situations.
      </Text>

      <Text style={styles.sectionHeader}>What is Proof by Cases?</Text>
      <Text style={styles.paragraph}>
        The goal is to prove statement P by dividing the problem into several exhaustive cases: Q₁, Q₂, ..., Qₙ. The structure follows these steps:
      </Text>
      
      <View style={styles.stepBox}>
        <Text style={styles.stepText}>• <Text style={styles.bold}>Identify all cases:</Text> Different conditions under which the problem occurs.</Text>
        <Text style={styles.stepText}>• <Text style={styles.bold}>Prove each case:</Text> Show the statement holds for each individual scenario.</Text>
        <Text style={styles.stepText}>• <Text style={styles.bold}>Conclude:</Text> Since one case must be true, the overall statement is true.</Text>
      </View>

      {/* EXAMPLE 1: n^3 - n is Even */}
      <Text style={styles.sectionHeader}>Example 1: Expression n³ - n is Even</Text>
      <Text style={styles.paragraph}>We divide integers into two cases: even or odd.</Text>
      
      <CaseBox 
        caseNum="1" 
        title="n is Even" 
        content="Let n = 2k. Then n³ - n = (2k)³ - 2k = 8k³ - 2k = 2(4k³ - k). This is divisible by 2, so it is even." 
      />
      
      <CaseBox 
        caseNum="2" 
        title="n is Odd" 
        content="Let n = 2k + 1. After expanding (2k + 1)³ - (2k + 1) and factoring, we get 2(4k³ + 6k² + 2k). This is also divisible by 2." 
      />

      {/* EXAMPLE 2: Sum of Odd Numbers */}
      <Text style={styles.sectionHeader}>Example 2: Logic of Odd Sums</Text>
      <Text style={styles.paragraph}>Statement: "If a + b is odd, then a is odd or b is odd".</Text>
      
      <CaseBox 
        caseNum="1" 
        title="Both a and b are Even" 
        isCorrect={false}
        content="Sum = 2m + 2n = 2(m + n). This is even, which contradicts our assumption that a + b is odd. This case cannot happen." 
      />

      <CaseBox 
        caseNum="2" 
        title="Both a and b are Odd" 
        isCorrect={false}
        content="Sum = (2m+1) + (2n+1) = 2(m + n + 1). This is also even, contradicting the assumption. Therefore, at least one must be odd." 
      />

      {/* EXAMPLE 3: GEOMETRY */}
      <Text style={styles.sectionHeader}>Example 3: Triangle Interior Angles</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>To prove the sum of angles is 180°, we evaluate:</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Acute Triangles:</Text> All angles less than 90°.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Right Triangles:</Text> One angle is exactly 90°.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Obtuse Triangles:</Text> One angle greater than 90°.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained how Proof by Cases works by breaking problems into exhaustive scenarios. Through integer parity and geometric examples, we established it as a powerful tool for tackling conditions that cannot be addressed with a single argument.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  stepBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20 },
  stepText: { fontSize: 14, color: '#475569', marginBottom: 8 },
  caseCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', backgroundColor: '#F0FDF4', marginBottom: 15 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  caseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  caseTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  caseText: { fontSize: 14, color: '#334155', lineHeight: 20 },
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 6 }
});