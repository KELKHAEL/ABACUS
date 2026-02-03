import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function MathStatements_1_2() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        In discrete mathematics, mathematical statements and operations form the building blocks for logical reasoning, problem-solving, and algorithm development in computer science.
      </Text>

      {/* SECTION: TYPES OF STATEMENTS */}
      <Text style={styles.sectionHeader}>Types of Mathematical Statements</Text>
      
      <Text style={styles.subHeader}>Propositions</Text>
      <Text style={styles.paragraph}>
        A proposition is a declarative sentence that is either true or false, but not both. Examples include:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}>"The sky is blue." (True or False depending on conditions)</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}>"2 + 2 = 4" (Always True)</Text>
      </View>

      <Text style={styles.subHeader}>Predicates</Text>
      <Text style={styles.paragraph}>
        A statement that contains one or more variables and becomes a proposition when specific values are assigned. For example:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>P(x): "x is greater than 5"</Text>
        <Text style={styles.exampleText}>P(7) is true | P(3) is false</Text>
      </View>

      <Text style={styles.subHeader}>Quantified Statements</Text>
      <Text style={styles.paragraph}>
        These use quantifiers to make claims about elements of a set:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Universal (∀):</Text> "for all"</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Existential (∃):</Text> "there exists"</Text>
      </View>

      {/* SECTION: LOGICAL OPERATIONS */}
      <Text style={styles.sectionHeader}>Logical Operations</Text>
      
      <Text style={styles.subHeader}>Negation (NOT)</Text>
      <Text style={styles.paragraph}>Reverses the truth value (¬ or ~).</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>p: "It is raining" → ¬p: "It is not raining"</Text></View>

      <Text style={styles.subHeader}>Conjunction (AND)</Text>
      <Text style={styles.paragraph}>True only if both are true (∧).</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>p ∧ q: "It is cold and windy"</Text></View>

      <Text style={styles.subHeader}>Implication (IF-THEN)</Text>
      <Text style={styles.paragraph}>One proposition implies another (→).</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>p → q: "If it is raining, then the ground is wet"</Text></View>

      {/* TRUTH TABLE SECTION */}
      <Text style={styles.sectionHeader}>Truth Tables</Text>
      <Text style={styles.paragraph}>Used to display all possible combinations of truth values for compound propositions.</Text>
      
      <View style={styles.table}>
        <View style={[styles.tableRow, {backgroundColor: '#F1F5F9'}]}>
          <Text style={styles.tableHeader}>p</Text>
          <Text style={styles.tableHeader}>q</Text>
          <Text style={styles.tableHeader}>p → q</Text>
        </View>
        <View style={styles.tableRow}><Text style={styles.tableCell}>T</Text><Text style={styles.tableCell}>T</Text><Text style={styles.tableCell}>T</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCell}>T</Text><Text style={styles.tableCell}>F</Text><Text style={styles.tableCell}>F</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCell}>F</Text><Text style={styles.tableCell}>T</Text><Text style={styles.tableCell}>T</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCell}>F</Text><Text style={styles.tableCell}>F</Text><Text style={styles.tableCell}>T</Text></View>
      </View>

      {/* SECTION: SET OPERATIONS */}
      <Text style={styles.sectionHeader}>Set Operations</Text>
      <Text style={styles.subHeader}>Union (∪)</Text>
      <Text style={styles.paragraph}>Elements in A, in B, or both.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>A = {'{1,2,3}'}, B = {'{3,4,5}'} → A ∪ B = {'{1,2,3,4,5}'}</Text></View>

      <Text style={styles.subHeader}>Intersection (∩)</Text>
      <Text style={styles.paragraph}>Elements in both A and B.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>A ∩ B = {'{3}'}</Text></View>

      <Text style={styles.subHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        We touched upon fundamental concepts including propositions, predicates, logical operations, truth tables, and set operations, which form the basis of logical reasoning in discrete mathematics and computer science.
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
  exampleText: { fontFamily: 'monospace', fontSize: 14, color: '#334155' },
  codeBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 10 },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#0F172A' },
  // Table Styles
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeader: { flex: 1, padding: 10, fontWeight: 'bold', textAlign: 'center', color: '#334155' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569' }
});