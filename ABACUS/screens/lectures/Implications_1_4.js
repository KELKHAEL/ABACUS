import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Implications_1_4() {
  
  const TruthRow = ({ p, q, result, isHeader }) => (
    <View style={[styles.tableRow, isHeader && styles.tableHeaderBg]}>
      <Text style={[styles.tableCell, isHeader && styles.bold]}>{p}</Text>
      <Text style={[styles.tableCell, isHeader && styles.bold]}>{q}</Text>
      <Text style={[styles.tableCell, isHeader && styles.bold, { color: isHeader ? '#334155' : '#16941c' }]}>{result}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Implications are useful in Discrete Mathematics to express relationships between statements. We must know these concepts for proving theorems, constructing logical arguments, and understanding conditional reasoning.
      </Text>

      <Text style={styles.sectionHeader}>What is an Implication?</Text>
      <Text style={styles.paragraph}>
        An <Text style={styles.bold}>implication</Text> (or <Text style={styles.bold}>conditional statement</Text>) is a compound statement that takes the form of "If P, then Q" (written as P → Q). Here:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>P</Text> is the <Text style={styles.bold}>hypothesis</Text> (antecedent).</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Q</Text> is the <Text style={styles.bold}>conclusion</Text> (consequent).</Text>
      </View>

      <Text style={styles.sectionHeader}>Truth Conditions of an Implication</Text>
      <Text style={styles.paragraph}>
        The truth of an implication depends on the truth values of its hypothesis and conclusion. The rule is simple:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}>P → Q is <Text style={styles.bold}>false</Text> if P is true and Q is false.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}>In <Text style={styles.bold}>all other cases</Text>, the implication is <Text style={styles.bold}>true</Text>.</Text>
      </View>

      <View style={styles.table}>
        <TruthRow p="P" q="Q" result="P → Q" isHeader />
        <TruthRow p="T" q="T" result="T" />
        <TruthRow p="T" q="F" result="F" />
        <TruthRow p="F" q="T" result="T" />
        <TruthRow p="F" q="F" result="T" />
      </View>

      <Text style={styles.sectionHeader}>Direct Proof of Implications</Text>
      <Text style={styles.paragraph}>
        The strategy for a <Text style={styles.bold}>direct proof</Text> is to assume that P is True and then show that Q must be True as well.
      </Text>
      <Text style={styles.subHeader}>Example: Proving Sum of Two Even Numbers is Even</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Assume a = 2k and b = 2j (multiples of 2).</Text>
        <Text style={styles.exampleText}>Sum: a + b = 2k + 2j = 2(k + j).</Text>
        <Text style={styles.exampleText}>Since k+j is an integer, the sum is a multiple of 2, thus even.</Text>
      </View>

      <Text style={styles.sectionHeader}>If and Only If (Biconditional)</Text>
      <Text style={styles.paragraph}>
        A biconditional statement (P ↔ Q) works in both directions. For this to be true, both P → Q and Q → P must be true.
      </Text>

      <Text style={styles.sectionHeader}>Necessary and Sufficient Conditions</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>P is necessary for Q:</Text> Q cannot be true unless P is true (Q → P).</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>P is sufficient for Q:</Text> If P is true, Q is guaranteed to be true (P → Q).</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we covered how implications are formed, truth conditions, biconditional statements, and the difference between necessary and sufficient conditions.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 30 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  bulletContainer: { flexDirection: 'row', marginBottom: 8, paddingLeft: 5 },
  bullet: { fontSize: 16, color: '#16941c', marginRight: 10 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontFamily: 'monospace', fontSize: 13, color: '#334155', marginBottom: 5 },
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569', fontFamily: 'monospace' }
});