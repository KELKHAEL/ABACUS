import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Contrapositive_2_5() {
  
  // Custom Visualizer for Proof Steps
  const ProofStep = ({ step, title, content }) => (
    <View style={styles.stepContainer}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepNumber}>{step}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepText}>{content}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        Another powerful way of proving logics is using the technique of <Text style={styles.bold}>Proof by Contrapositive</Text>. This method demonstrates the truth of an implication by proving its equivalent contrapositive statement instead.
      </Text>

      <Text style={styles.sectionHeader}>What is Proof by Contrapositive?</Text>
      <Text style={styles.paragraph}>
        Recall that an implication is a statement of the form "if P, then Q" (P → Q). The <Text style={styles.bold}>contrapositive</Text> reverses and negates both parts: <Text style={styles.bold}>¬Q → ¬P</Text>.
      </Text>

      <View style={styles.logicBox}>
        <Text style={styles.logicLabel}>Logical Equivalence:</Text>
        <Text style={styles.formulaText}>(P → Q) ≡ (¬Q → ¬P)</Text>
      </View>

      <Text style={styles.sectionHeader}>Example 1: Even/Odd Numbers</Text>
      <Text style={styles.paragraph}>
        Statement: "For all integers n, if n² is even, then n is even".
      </Text>
      
      <View style={styles.transformBox}>
        <Text style={styles.transformLabel}>Contrapositive Transformation:</Text>
        <Text style={styles.transformText}>"If n is odd, then n² is odd"</Text>
      </View>

      <Text style={styles.subHeader}>The Proof Process:</Text>
      
      <ProofStep 
        step="1" 
        title="Assume Negation of Conclusion" 
        content="Assume n is odd. We can write n = 2k + 1 for some integer k." 
      />
      <ProofStep 
        step="2" 
        title="Square the Assumption" 
        content="Calculate n² = (2k + 1)² = 4k² + 4k + 1." 
      />
      <ProofStep 
        step="3" 
        title="Analyze the Result" 
        content="Factor to get n² = 2(2k² + 2k) + 1. Since it's in the form 'even + 1', n² is odd." 
      />
      <ProofStep 
        step="4" 
        title="Conclusion" 
        content="Since the contrapositive is true, the original statement is confirmed true." 
      />

      {/* IMPORTANCE SECTION */}
      <Text style={styles.sectionHeader}>Why Use Contrapositive Proofs?</Text>
      <View style={styles.infoBox}>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="link-variant" size={20} color="#0369A1" />
          <Text style={styles.infoText}><Text style={styles.bold}>Logical Equivalence:</Text> Proving one is the same as proving the other.</Text>
        </View>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#0369A1" />
          <Text style={styles.infoText}><Text style={styles.bold}>Simplicity:</Text> Working with negations often simplifies the relationships between variables.</Text>
        </View>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="tools" size={20} color="#0369A1" />
          <Text style={styles.infoText}><Text style={styles.bold}>Versatility:</Text> Widely applicable in number theory, logic, and inequalities.</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concept of proof by contrapositive. We demonstrated how to transform statements and used mathematical examples to prove properties of integers and divisibility.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  logicBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  logicLabel: { fontSize: 12, color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase' },
  formulaText: { fontSize: 18, color: '#16941c', fontWeight: 'bold', marginTop: 5 },
  transformBox: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 20 },
  transformLabel: { fontSize: 13, color: '#9A3412', fontWeight: 'bold' },
  transformText: { fontSize: 14, color: '#C2410C', fontStyle: 'italic', marginTop: 4 },
  stepContainer: { flexDirection: 'row', marginBottom: 20 },
  stepBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#16941c', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  stepNumber: { color: 'white', fontWeight: 'bold' },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  stepText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  bulletRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  infoText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#0369A1', lineHeight: 20 }
});