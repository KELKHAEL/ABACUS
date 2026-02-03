import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom Component to visualize the logical flow of a contradiction proof
const ArgumentFlow = ({ steps }) => (
  <View style={styles.flowContainer}>
    {steps.map((step, index) => (
      <View key={index} style={styles.stepRow}>
        <View style={styles.stepIndicator}>
          <View style={styles.stepCircle}><Text style={styles.stepNum}>{index + 1}</Text></View>
          {index < steps.length - 1 && <View style={styles.stepLine} />}
        </View>
        <View style={styles.stepContentBox}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.desc}</Text>
        </View>
      </View>
    ))}
  </View>
);

export default function Contradiction_2_6() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Proof by Contradiction</Text> is one of the most powerful methods used in discrete mathematics, especially when working on statements that are difficult to prove directly. The idea lies in its simplicity: assume the opposite of what you are trying to prove and show it leads to an impossible scenario.
      </Text>

      <Text style={styles.sectionHeader}>What is Proof by Contradiction?</Text>
      <Text style={styles.paragraph}>
        This method operates on a core logical principle: to prove a statement <Text style={styles.bold}>P</Text>, assume that P is false (assume <Text style={styles.bold}>¬P</Text> is true). If this assumption leads to a contradiction, then ¬P must be false, meaning P must be true.
      </Text>

      <ArgumentFlow 
        steps={[
          { title: "Assume the Negation", desc: "Assume the opposite of the statement you want to prove." },
          { title: "Develop the Argument", desc: "Use logical steps and known facts to progress the proof." },
          { title: "Arrive at Contradiction", desc: "Reach a situation where a logical inconsistency arises." },
          { title: "Conclude", desc: "The original statement must be true because the assumption was impossible." }
        ]}
      />

      {/* EXAMPLE 1: IRRATIONALITY */}
      <Text style={styles.sectionHeader}>Example 1: Proving √2 is Irrational</Text>
      <View style={styles.proofCard}>
        <Text style={styles.proofStep}><Text style={styles.bold}>1. Assume Negation:</Text> Assume √2 is rational, meaning √2 = a/b where a and b are integers in simplest form.</Text>
        <Text style={styles.proofStep}><Text style={styles.bold}>2. Square & Rearrange:</Text> 2 = a²/b² → a² = 2b². This means a² is even, so <Text style={styles.bold}>a</Text> must be even.</Text>
        <Text style={styles.proofStep}><Text style={styles.bold}>3. Test b:</Text> Let a = 2k. Then (2k)² = 2b² → 4k² = 2b² → 2k² = b². This means b² is even, so <Text style={styles.bold}>b</Text> must be even.</Text>
        <View style={styles.contradictionBox}>
          <MaterialCommunityIcons name="alert-octagon" size={24} color="#B91C1C" />
          <Text style={styles.contradictionText}>
            <Text style={styles.bold}>Contradiction:</Text> If a and b are both even, the fraction a/b was not in simplest form! Thus, √2 is irrational.
          </Text>
        </View>
      </View>

      {/* EXAMPLE 3: PIGEONHOLE */}
      <Text style={styles.sectionHeader}>Example 2: The Pigeonhole Principle</Text>
      <Text style={styles.paragraph}>
        If more than <Text style={styles.bold}>n</Text> pigeons fly into <Text style={styles.bold}>n</Text> pigeonholes, at least one pigeonhole must contain more than one pigeon.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>Assumption:</Text> Assume no pigeonhole contains more than one pigeon.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Logic:</Text> Then total pigeons ≤ n holes. But we started with more than n pigeons.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Result:</Text> This is a contradiction, so the principle must be true.</Text>
      </View>

      {/* AUTOMATA THEORY NOTE */}
      <Text style={styles.subHeader}>Beyond Basic Logic</Text>
      <Text style={styles.paragraph}>
        In automata theory, we use the <Text style={styles.bold}>pumping lemma</Text> and contradiction to prove that certain expressions do not fall under regular or context-free languages.
      </Text>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the logical framework of Proof by Contradiction. We explored practical examples including the irrationality of √2, integer solution problems, and the pigeonhole principle to illustrate the utility of this proof method.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  proofCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  proofStep: { fontSize: 14, color: '#334155', marginBottom: 10, lineHeight: 20 },
  contradictionBox: { flexDirection: 'row', backgroundColor: '#FEF2F2', padding: 12, borderRadius: 8, marginTop: 5, alignItems: 'center' },
  contradictionText: { flex: 1, marginLeft: 10, fontSize: 13, color: '#B91C1C', lineHeight: 18 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#0369A1', marginBottom: 6 },
  
  // Argument Flow Visuals
  flowContainer: { marginVertical: 20, paddingLeft: 10 },
  stepRow: { flexDirection: 'row', marginBottom: 0 },
  stepIndicator: { alignItems: 'center', width: 30 },
  stepCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#16941c', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  stepNum: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  stepLine: { width: 2, flex: 1, backgroundColor: '#BBF7D0', marginVertical: -2 },
  stepContentBox: { flex: 1, paddingLeft: 15, paddingBottom: 25 },
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  stepDescription: { fontSize: 13, color: '#64748B', lineHeight: 18 }
});