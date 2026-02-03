import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PropositionalLogic_2_1() {
  
  // Custom Truth Table Component for consistency with screenshots
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
        The rules of mathematical logic specify methods of reasoning mathematical statements. Aristotle was the pioneer of logical reasoning, which provides the theoretical base for artificial intelligence and data structures.
      </Text>

      <Text style={styles.sectionHeader}>Prepositional Logic Definition</Text>
      <Text style={styles.paragraph}>
        A proposition is a collection of declarative statements that has either a truth value "true" or a truth value "false". We denote propositional variables by capital letters (A, B, etc.).
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• "Man is Mortal" → TRUE</Text>
        <Text style={styles.exampleText}>• "12 + 9 = 32" → FALSE</Text>
        <View style={styles.divider} />
        <Text style={styles.bold}>Not a Proposition:</Text>
        <Text style={styles.exampleText}>• "A is less than 2" (Depends on value of A)</Text>
      </View>

      <Text style={styles.sectionHeader}>Connectives and Truth Tables</Text>
      <Text style={styles.paragraph}>Generally, we use five connectives:</Text>

      {/* OR */}
      <Text style={styles.subHeader}>OR (∨)</Text>
      <Text style={styles.paragraph}>True if at least any of the propositional variables A or B is true.</Text>
      <TruthTable 
        headers={["A", "B", "A ∨ B"]} 
        rows={[["True", "True", "True"], ["True", "False", "True"], ["False", "True", "True"], ["False", "False", "False"]]} 
      />

      {/* AND */}
      <Text style={styles.subHeader}>AND (∧)</Text>
      <Text style={styles.paragraph}>True if both the propositional variable A and B is true.</Text>
      <TruthTable 
        headers={["A", "B", "A ∧ B"]} 
        rows={[["True", "True", "True"], ["True", "False", "False"], ["False", "True", "False"], ["False", "False", "False"]]} 
      />

      {/* NEGATION */}
      <Text style={styles.subHeader}>Negation (¬)</Text>
      <Text style={styles.paragraph}>False when A is true and true when A is false.</Text>
      <TruthTable headers={["A", "¬A"]} rows={[["True", "False"], ["False", "True"]]} />

      {/* IMPLICATION */}
      <Text style={styles.subHeader}>Implication / if-then (→)</Text>
      <Text style={styles.paragraph}>False if A is true and B is false. The rest cases are true.</Text>
      <TruthTable 
        headers={["A", "B", "A → B"]} 
        rows={[["True", "True", "True"], ["True", "False", "False"], ["False", "True", "True"], ["False", "False", "True"]]} 
      />

      {/* BICONDITIONAL */}
      <Text style={styles.subHeader}>If and only if (⇔)</Text>
      <Text style={styles.paragraph}>True when p and q are same, i.e. both are false or both are true.</Text>
      <TruthTable 
        headers={["A", "B", "A ⇔ B"]} 
        rows={[["True", "True", "True"], ["True", "False", "False"], ["False", "True", "False"], ["False", "False", "True"]]} 
      />

      <Text style={styles.sectionHeader}>Tautologies, Contradictions & Contingency</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>Tautology:</Text> A formula which is always true for every value.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Contradiction:</Text> A formula which is always false for every value.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Contingency:</Text> A formula which has both some true and some false values.</Text>
      </View>

      <Text style={styles.sectionHeader}>Propositional Equivalences</Text>
      <Text style={styles.paragraph}>Two statements X and Y are logically equivalent if:</Text>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>1.</Text>
        <Text style={styles.bulletText}>The truth tables of each statement have the same truth values.</Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>2.</Text>
        <Text style={styles.bulletText}>The bi-conditional statement X ⇔ Y is a tautology.</Text>
      </View>

      <Text style={styles.sectionHeader}>Inverse, Converse, and Contra-positive</Text>
      <View style={styles.logicBox}>
        <Text style={styles.paragraph}>For a conditional statement p → q:</Text>
        <Text style={styles.logicText}><Text style={styles.bold}>Inverse:</Text> Negation of both hypothesis and conclusion (¬p → ¬q).</Text>
        <Text style={styles.logicText}><Text style={styles.bold}>Converse:</Text> Interchanging the hypothesis and conclusion (q → p).</Text>
        <Text style={styles.logicText}><Text style={styles.bold}>Contra-positive:</Text> Interchanging hypothesis and conclusion of the inverse statement (¬q → ¬p).</Text>
      </View>

      <Text style={styles.sectionHeader}>Duality Principle</Text>
      <Text style={styles.paragraph}>
        States that for any true statement, the dual statement obtained by interchanging unions into intersections (and vice versa) and interchanging Universal set into Null set (and vice versa) is also true.
      </Text>

      <Text style={styles.sectionHeader}>Normal Forms</Text>
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Conjunctive Normal Form (CNF)</Text>
        <Text style={styles.paragraph}>Obtained by operating AND among variables connected with ORs.</Text>
        <Text style={styles.codeText}>Example: (A ∨ B) ∧ (A ∨ C) ∧ (B ∨ C ∨ D)</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Disjunctive Normal Form (DNF)</Text>
        <Text style={styles.paragraph}>Obtained by operating OR among variables connected with ANDs.</Text>
        <Text style={styles.codeText}>Example: (A ∧ B) ∨ (A ∧ C) ∨ (B ∧ C ∧ D)</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained Propositional Logic, logical connectives, truth tables, and equivalences. We also explored tautologies, normal forms, and the duality principle which form the core of logical reasoning.
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
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#166534', marginBottom: 8 },
  logicBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20 },
  logicText: { fontSize: 14, color: '#475569', marginBottom: 10, lineHeight: 20 },
  bulletItem: { flexDirection: 'row', marginBottom: 8, paddingLeft: 5 },
  bullet: { fontWeight: 'bold', color: '#16941c', marginRight: 10 },
  bulletText: { flex: 1, fontSize: 14, color: '#475569' },
  formCard: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 15 },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#9A3412', marginBottom: 5 },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#16941c', fontWeight: 'bold' },
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569' }
});