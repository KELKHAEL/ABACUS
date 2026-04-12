import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom Component for Case Analysis
const CaseBox = ({ caseNum, title, children, isCorrect = true }) => (
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
    <View style={styles.caseContent}>
      {children}
    </View>
  </View>
);

export default function ProofByCases_2_7() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Proof by Cases</Text> is a common technique used in Discrete Mathematics to prove statements that may be True in different scenarios. This method helps in breaking down the problem into separate cases and showing that the statement holds true in each one or not. By covering all possible cases, the proof guarantees the truth of the statement for all possible situations. This technique is useful when a statement can be approached in multiple ways, depending on the given conditions.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will explain the concept of proof by cases, its structure, and go through examples for a better understanding.
      </Text>

      {/* --- WHAT IS PROOF BY CASES --- */}
      <Text style={styles.sectionHeader}>What is Proof by Cases?</Text>
      <Text style={styles.paragraph}>
        Proof by cases is simpler than other methods. The goal is to prove a statement P, but instead of proving P directly, we divide the problem into several cases, Q₁, Q₂,..., Qₙ. For each case, we proved that the statement P holds. Since one of the cases must always be true. So proofing the statement for all cases guarantees that P is universally true.
      </Text>
      
      <Text style={styles.paragraph}>The structure of a Proof by Cases is as follows −</Text>
      <View style={styles.stepBox}>
        <Text style={styles.stepText}>• <Text style={styles.bold}>Identify all the cases</Text> − These are the different conditions or scenarios under which the problem can occur.</Text>
        <Text style={styles.stepText}>• <Text style={styles.bold}>Prove each case</Text> − For each individual case, show that the statement holds.</Text>
        <Text style={styles.stepText}>• <Text style={styles.bold}>Conclude</Text> − Since one of the cases must be true, the overall statement is true.</Text>
      </View>
      <Text style={styles.paragraph}>
        This method is interesting and quite useful when the problem involves logical "or" conditions, or when a value can take different forms, such as being even or odd, positive or negative.
      </Text>

      {/* --- WHY USE IT --- */}
      <Text style={styles.sectionHeader}>Why Use Proof by Cases?</Text>
      <Text style={styles.paragraph}>
        Proof by Cases is helpful when the problem is complex and cannot be easily addressed with a single argument. Sometimes, different conditions lead to different approaches. For example, in number theory, a number can be even or odd, and proving the same statement for both conditions may require separate reasoning.
      </Text>
      <Text style={styles.paragraph}>
        After breaking down the problem, Proof by Cases provides clarity and ensures that every possible situation is covered. This method is exhaustive, and it ensures there are no gaps in the proof.
      </Text>

      {/* --- EXAMPLE 1 --- */}
      <Text style={styles.sectionHeader}>Example 1: Proving n³ − n is Even for Any Integer n</Text>
      <Text style={styles.paragraph}>
        Let us consider an example, for any integer n, the expression <Text style={styles.bold}>n³ − n</Text> is always even.
      </Text>
      
      <Text style={styles.subHeader}>Step 1: Identify the cases</Text>
      <Text style={styles.paragraph}>
        The key observation here is that every integer n is either even or odd. So that, we can divide the problem into two cases −
      </Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Case 1</Text> − n is even</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Case 2</Text> − n is odd</Text>
      </View>

      <Text style={styles.subHeader}>Step 2: Prove Each Case</Text>
      <CaseBox caseNum="1" title="n is even">
        <Text style={styles.caseText}>If n is even, we can write it like <Text style={styles.bold}>n = 2k</Text> for some integer k. Then substituting n = 2k into the expression n³ − n, we get −</Text>
        <Text style={styles.mathText}>n³ − n = (2k)³ − 2k = 8k³ − 2k = 2(4k³ − k)</Text>
        <Text style={styles.caseText}>Since 4k³ − k is an integer, the expression is divisible by 2, which means that n³ − n is even when n is even.</Text>
      </CaseBox>
      
      <CaseBox caseNum="2" title="n is odd">
        <Text style={styles.caseText}>If n is odd, we can write <Text style={styles.bold}>n = 2k + 1</Text> for some integer k. Substituting n = 2k + 1 into n³ − n, we get:</Text>
        <Text style={styles.mathText}>n³ − n = (2k+1)³ − (2k+1)</Text>
        <Text style={styles.caseText}>Expanding the cubic term, we get −</Text>
        <Text style={styles.mathText}>(2k+1)³ = 8k³ + 12k² + 6k + 1</Text>
        <Text style={styles.caseText}>Thus,</Text>
        <Text style={styles.mathText}>n³ − n = (8k³ + 12k² + 6k + 1) − (2k + 1)</Text>
        <Text style={styles.mathText}>n³ − n = 8k³ + 12k² + 4k</Text>
        <Text style={styles.caseText}>Factoring out 2,</Text>
        <Text style={styles.mathText}>n³ − n = 2(4k³ + 6k² + 2k)</Text>
        <Text style={styles.caseText}>Again, the expression is divisible by 2, which means that n³ – n is even when n is odd.</Text>
      </CaseBox>

      <Text style={styles.subHeader}>Step 3: Conclude</Text>
      <Text style={styles.paragraph}>
        Since n³ – n is even in both cases (here n is even or odd), we conclude that for any integer n, the expression n³ – n is always even.
      </Text>

      {/* --- EXAMPLE 2 --- */}
      <Text style={styles.sectionHeader}>Example 2: Sum of Odd Numbers</Text>
      <Text style={styles.paragraph}>
        Let us see another example. This one is another interesting problem. Prove the statement −
      </Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', textAlign: 'center', fontSize: 16}]}>"If a + b is odd, then a is odd or b is odd."</Text>
      </View>
      
      <Text style={styles.subHeader}>Step 1: Identify the cases</Text>
      <Text style={styles.paragraph}>We can handle this by considering the two possible scenarios for a and b:</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Case 1</Text> − Both a and b are even.</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Case 2</Text> − Both a and b are odd.</Text>
      </View>

      <Text style={styles.subHeader}>Step 2: Prove Each Case</Text>
      <CaseBox caseNum="1" title="Both a and b are even" isCorrect={false}>
        <Text style={styles.caseText}>If both a and b are even, then we can write <Text style={styles.bold}>a = 2m</Text> and <Text style={styles.bold}>b = 2n</Text> for some integers m and n. Adding them together −</Text>
        <Text style={[styles.mathText, {color: '#B91C1C'}]}>a + b = 2m + 2n = 2(m + n)</Text>
        <Text style={styles.caseText}>Since a + b is divisible by 2, the sum is even, contradicting the assumption that a + b is odd. Therefore, this case does not hold.</Text>
      </CaseBox>

      <CaseBox caseNum="2" title="Both a and b are odd" isCorrect={false}>
        <Text style={styles.caseText}>If both a and b are odd, we can write <Text style={styles.bold}>a = 2m + 1</Text> and <Text style={styles.bold}>b = 2n + 1</Text> for some integers m and n. Adding them together −</Text>
        <Text style={[styles.mathText, {color: '#B91C1C'}]}>a + b = (2m + 1) + (2n + 1) = 2(m + n + 1)</Text>
        <Text style={styles.caseText}>This sum is again even, which contradicts the assumption that a + b is odd. Therefore, this case also does not hold.</Text>
      </CaseBox>

      <Text style={styles.subHeader}>Step 3: Conclude</Text>
      <Text style={styles.paragraph}>
        We have shown that if a + b is odd, then at least one of a or b must be odd, as the statement requires.
      </Text>

      {/* --- EXAMPLE 3 --- */}
      <Text style={styles.sectionHeader}>Example 3: Proof by Cases in Geometry</Text>
      <Text style={styles.paragraph}>Let us see the third example in geometry. Consider the following statement −</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', textAlign: 'center', fontSize: 16}]}>"For any triangle, the sum of the interior angles is 180 degrees."</Text>
      </View>

      <Text style={styles.subHeader}>Step 1: Identify the cases</Text>
      <Text style={styles.paragraph}>We can consider different types of triangles:</Text>
      <View style={styles.listContainer}>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Case 1</Text> − The triangle is acute (all angles are less than 90 degrees).</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Case 2</Text> − The triangle is right (one angle is 90 degrees).</Text>
        <Text style={styles.listItem}>• <Text style={styles.bold}>Case 3</Text> − The triangle is obtuse (one angle is greater than 90 degrees).</Text>
      </View>

      <Text style={styles.subHeader}>Step 2: Prove each case</Text>
      <CaseBox caseNum="1" title="Acute Triangle">
        <Text style={styles.caseText}>In an acute triangle, all angles are less than 90 degrees. Regardless of the specific angle measures, the geometric properties of triangles ensure that the sum of the angles always equal to 180 degrees.</Text>
      </CaseBox>
      <CaseBox caseNum="2" title="Right Triangle">
        <Text style={styles.caseText}>In a right triangle, one angle is exactly 90 degrees. The other two angles must sum to 90 degrees, ensuring that the total sum of the interior angles is 180 degrees.</Text>
      </CaseBox>
      <CaseBox caseNum="3" title="Obtuse Triangle">
        <Text style={styles.caseText}>In an obtuse triangle, one angle is greater than 90 degrees, and the other two angles must be the sum to less than 90 degrees. Again, the total sum of the angles in the triangle will always be 180 degrees.</Text>
      </CaseBox>

      <Text style={styles.subHeader}>Step 3: Conclude</Text>
      <Text style={styles.paragraph}>
        Since the interior angles of a triangle sum to 180 degrees in all possible cases, the statement is universally true for all triangles.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concept of Proof by Cases in Discrete Mathematics. We understood how this method works by breaking a problem into separate scenarios and proving the statement in each one. Through examples, we established how Proof by Cases is a powerful tool for tackling problems involving different conditions.
      </Text>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  stepBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  stepText: { fontSize: 15, color: '#475569', marginBottom: 10, lineHeight: 24 },
  
  listContainer: { marginBottom: 15, paddingLeft: 10 },
  listItem: { fontSize: 15, color: '#475569', marginBottom: 6 },

  caseCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', backgroundColor: '#F0FDF4', marginBottom: 15 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  caseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  caseTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  caseContent: { paddingLeft: 5 },
  caseText: { fontSize: 15, color: '#334155', lineHeight: 24, textAlign: 'justify' },
  mathText: { fontSize: 15, color: '#16941c', fontFamily: 'monospace', fontWeight: 'bold', marginVertical: 8, textAlign: 'center' },
  
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 15, color: '#334155', lineHeight: 24 },
});