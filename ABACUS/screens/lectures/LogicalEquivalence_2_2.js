import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function LogicalEquivalence_2_2() {
  
  // Reusable Truth Table Component for consistency
  const TruthTable = ({ headers, rows }) => (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableHeaderBg]}>
        {headers.map((h, i) => <Text key={i} style={[styles.tableCell, styles.bold]}>{h}</Text>)}
      </View>
      {rows.map((row, i) => (
        <View key={i} style={styles.tableRow}>
          {row.map((cell, j) => <Text key={j} style={styles.tableCell}>{cell}</Text>)}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        Logical equivalence is a fundamental concept in propositional logic. It is used in analyzing and transforming logical statements into more manageable forms.
      </Text>

      <Text style={styles.sectionHeader}>What is Logical Equivalence?</Text>
      <Text style={styles.paragraph}>
        Logical equivalence is the relationship between two statements that have the same truth value in every possible scenario. Mathematically, we can express this relationship between two statements P and Q by writing <Text style={styles.bold}>P ≡ Q</Text>.
      </Text>

      {/* TRUTH TABLE VERIFICATION */}
      <Text style={styles.sectionHeader}>Understanding Equivalence Using Truth Tables</Text>
      <Text style={styles.paragraph}>
        To determine whether two statements are logically equivalent, we list out all possible truth values and compare the results.
      </Text>
      <Text style={styles.subHeader}>Example: Are P → Q and ¬P ∨ Q equivalent?</Text>
      <TruthTable 
        headers={["P", "Q", "P → Q", "¬P ∨ Q"]}
        rows={[
          ["T", "T", "T", "T"],
          ["T", "F", "F", "F"],
          ["F", "T", "T", "T"],
          ["F", "F", "T", "T"]
        ]}
      />
      <Text style={styles.caption}>As seen above, the final columns match exactly, meaning the statements are logically equivalent.</Text>

      {/* DE MORGAN'S LAWS */}
      <Text style={styles.sectionHeader}>De Morgan's Laws</Text>
      <Text style={styles.paragraph}>
        These laws show a way to distribute negations across conjunctions (ANDs) and disjunctions (ORs).
      </Text>
      <View style={styles.lawBox}>
        <Text style={styles.lawText}><Text style={styles.bold}>1.</Text> ¬(P ∧ Q) ≡ ¬P ∨ ¬Q</Text>
        <Text style={styles.lawText}><Text style={styles.bold}>2.</Text> ¬(P ∨ Q) ≡ ¬P ∧ ¬Q</Text>
      </View>

      {/* NEGATION OF IMPLICATIONS */}
      <Text style={styles.sectionHeader}>Negation of Implications</Text>
      <Text style={styles.paragraph}>
        The negation of an implication P → Q is not another implication. It is a conjunction of the hypothesis being true and the conclusion being false.
      </Text>
      <View style={styles.proofBox}>
        <Text style={styles.proofTitle}>Step-by-Step Transformation:</Text>
        <Text style={styles.proofStep}>1. Start with: ¬(P → Q)</Text>
        <Text style={styles.proofStep}>2. Recall P → Q ≡ ¬P ∨ Q</Text>
        <Text style={styles.proofStep}>3. Apply negation: ¬(¬P ∨ Q)</Text>
        <Text style={styles.proofStep}>4. Using De Morgan's Law: ¬(¬P) ∧ ¬Q</Text>
        <Text style={[styles.proofStep, styles.bold, {color: '#16941c'}]}>5. Simplify: P ∧ ¬Q</Text>
      </View>

      {/* COMPLEX EXAMPLES */}
      <Text style={styles.sectionHeader}>More Complex Examples</Text>
      <Text style={styles.paragraph}>
        Consider: Are <Text style={styles.bold}>(P ∨ Q) → R</Text> and <Text style={styles.bold}>(P → R) ∨ (Q → R)</Text> equivalent?
      </Text>
      <TruthTable 
        headers={["P", "Q", "R", "(P ∨ Q) → R", "(P → R) ∨ (Q → R)"]}
        rows={[
          ["T", "F", "F", "F", "F"],
          ["F", "T", "F", "F", "T"],
        ]}
      />
      <Text style={styles.caption}>In rows like the one above, truth values differ, meaning these are NOT logically equivalent.</Text>

      {/* APPLICATIONS */}
      <Text style={styles.sectionHeader}>Applications</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>• Simplifying Proofs:</Text> Recognizing equivalent statements can simplify complex logical arguments.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Boolean Algebra:</Text> Crucial for circuit design and computer programming optimization.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Algorithm Optimization:</Text> identifying faster-to-compute logically equivalent expressions.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we provided an overview of logical equivalence, verified statements using truth tables, and explored De Morgan's Laws and the negation of implications. Understanding these forms allows for precision in mathematical reasoning and computer science applications.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  caption: { fontSize: 12, color: '#64748B', fontStyle: 'italic', marginBottom: 15 },
  lawBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20 },
  lawText: { fontSize: 14, color: '#1E293B', marginBottom: 5, fontFamily: 'monospace' },
  proofBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 20 },
  proofTitle: { fontSize: 15, fontWeight: 'bold', color: '#166534', marginBottom: 8 },
  proofStep: { fontSize: 14, color: '#166534', marginBottom: 4, fontFamily: 'monospace' },
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 10, lineHeight: 20 },
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 8, textAlign: 'center', color: '#475569', fontSize: 12 }
});