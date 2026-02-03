import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AtomicMolecular_1_3() {
  
  // Internal component for Truth Table Rows to keep code clean
  const TruthRow = ({ p, q, result, isHeader }) => (
    <View style={[styles.tableRow, isHeader && styles.tableHeaderBg]}>
      <Text style={[styles.tableCell, isHeader && styles.bold]}>{p}</Text>
      {q !== undefined && <Text style={[styles.tableCell, isHeader && styles.bold]}>{q}</Text>}
      <Text style={[styles.tableCell, isHeader && styles.bold, { color: isHeader ? '#334155' : '#16941c' }]}>{result}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        One of the key concepts in discrete mathematics is mathematical statements. They are used to express ideas that can be either True or False. Mathematical statements come in two forms: <Text style={styles.bold}>atomic</Text> and <Text style={styles.bold}>molecular</Text>.
      </Text>

      <Text style={styles.sectionHeader}>Mathematical Statements</Text>
      <Text style={styles.paragraph}>
        A statement is a declarative sentence that can either be True or False. It cannot be both True and False simultaneously.
      </Text>

      <Text style={styles.subHeader}>Atomic Statements</Text>
      <Text style={styles.paragraph}>
        An atomic statement is a simple, indivisible statement. It cannot be broken down into smaller components that are also statements. Examples include:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• "Telephone numbers in the USA have 10 digits."</Text>
        <Text style={styles.exampleText}>• "42 is a perfect square."</Text>
        <Text style={styles.exampleText}>• "3 + 7 = 12" (This is False)</Text>
      </View>

      <Text style={styles.subHeader}>Non-Statements</Text>
      <Text style={styles.paragraph}>Not every sentence qualifies as a statement:</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>"Would you like some cake?" (Question)</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>"Go to your room!" (Command)</Text>
      </View>

      <Text style={styles.sectionHeader}>Molecular Statements and Logical Connectives</Text>
      <Text style={styles.paragraph}>
        These are formed by combining two or more atomic statements using <Text style={styles.bold}>logical connectives</Text>. There are five primary connectives:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>1. Conjunction (∧): "and"</Text>
        <Text style={styles.exampleText}>2. Disjunction (∨): "or"</Text>
        <Text style={styles.exampleText}>3. Implication (→): "if...then..."</Text>
        <Text style={styles.exampleText}>4. Biconditional (↔): "if and only if"</Text>
        <Text style={styles.exampleText}>5. Negation (¬): "not"</Text>
      </View>

      <Text style={styles.sectionHeader}>Truth Tables for Logical Connectives</Text>
      
      {/* CONJUNCTION TABLE */}
      <Text style={styles.subHeader}>Conjunction (∧)</Text>
      <Text style={styles.paragraph}>True if and only if both P and Q are True.</Text>
      <View style={styles.table}>
        <TruthRow p="P" q="Q" result="P ∧ Q" isHeader />
        <TruthRow p="T" q="T" result="T" />
        <TruthRow p="T" q="F" result="F" />
        <TruthRow p="F" q="T" result="F" />
        <TruthRow p="F" q="F" result="F" />
      </View>

      {/* IMPLICATION TABLE */}
      <Text style={styles.subHeader}>Implication (→)</Text>
      <Text style={styles.paragraph}>True unless P is True and Q is False.</Text>
      <View style={styles.table}>
        <TruthRow p="P" q="Q" result="P → Q" isHeader />
        <TruthRow p="T" q="T" result="T" />
        <TruthRow p="T" q="F" result="F" />
        <TruthRow p="F" q="T" result="T" />
        <TruthRow p="F" q="F" result="T" />
      </View>

      {/* NEGATION TABLE */}
      <Text style={styles.subHeader}>Negation (¬)</Text>
      <Text style={styles.paragraph}>Simply inverts the truth value of P.</Text>
      <View style={[styles.table, {width: '60%', alignSelf: 'center'}]}>
        <TruthRow p="P" result="¬P" isHeader />
        <TruthRow p="T" result="F" />
        <TruthRow p="F" result="T" />
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concept of atomic and molecular statements. We defined mathematical statements and understood the differences between simple and composite logical structures.
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
  exampleText: { fontFamily: 'monospace', fontSize: 14, color: '#334155', marginBottom: 5 },
  // Table Styles
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569', fontFamily: 'monospace' }
});