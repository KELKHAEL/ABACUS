import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Deductions_2_3() {
  
  // Custom Truth Table Component
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

  // Deduction Rule Block
  const RuleBlock = ({ title, premises, conclusion, color = "#16941c" }) => (
    <View style={[styles.ruleBox, { borderColor: color }]}>
      <Text style={[styles.ruleTitle, { color: color }]}>{title}</Text>
      {premises.map((p, i) => (
        <Text key={i} style={styles.premiseText}><Text style={styles.bold}>Premise {i+1}:</Text> {p}</Text>
      ))}
      <View style={styles.ruleDivider} />
      <Text style={styles.conclusionText}><Text style={styles.bold}>Conclusion:</Text> {conclusion}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        In propositional logic, deductions form the backbone of logical reasoning. Deductions are used to derive conclusions from premises based on rules that guarantee the truth of the conclusion if the premises are true.
      </Text>

      <Text style={styles.sectionHeader}>What are Mathematical Deductions?</Text>
      <Text style={styles.paragraph}>
        A deduction is a logical process where, starting from a set of premises (assumptions), we find a conclusion that logically follows.
      </Text>

      {/* MODUS PONENS */}
      <Text style={styles.sectionHeader}>Modus Ponens (If-Then Reasoning)</Text>
      <Text style={styles.paragraph}>
        This is a simple yet powerful rule for reasoning with "if-then" statements. In symbolic terms, it is written as: <Text style={styles.bold}>P → Q, P ⇒ Q</Text>.
      </Text>
      
      <RuleBlock 
        title="Modus Ponens Structure"
        premises={["If P, then Q (P → Q)", "P is true"]}
        conclusion="Therefore, Q is true"
      />

      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Example:</Text> If it rains, the grass will be wet. It is raining. Therefore, the grass will be wet.</Text>
      </View>

      <Text style={styles.subHeader}>Truth Table Validation</Text>
      <TruthTable 
        headers={["P", "Q", "P → Q"]}
        rows={[["T", "T", "T"], ["T", "F", "F"], ["F", "T", "T"], ["F", "F", "T"]]}
      />
      <Text style={styles.caption}>Whenever P is true and P → Q is true, Q must also be true.</Text>

      {/* MODUS TOLLENS */}
      <Text style={styles.sectionHeader}>Modus Tollens (Contrapositive Reasoning)</Text>
      <Text style={styles.paragraph}>
        Modus tollens deals with what happens when the consequence of an implication is false.
      </Text>

      <RuleBlock 
        title="Modus Tollens Structure"
        premises={["If P, then Q (P → Q)", "Q is false"]}
        conclusion="Therefore, P must also be false"
        color="#0369A1"
      />

      <TruthTable 
        headers={["P", "Q", "P → Q", "¬Q", "¬P"]}
        rows={[
          ["T", "T", "T", "F", "F"],
          ["T", "F", "F", "T", "F"],
          ["F", "T", "T", "F", "T"],
          ["F", "F", "T", "T", "T"]
        ]}
      />
      <Text style={styles.caption}>When ¬Q is true (Q is false) and P → Q is true, P must be false.</Text>

      {/* SYLLOGISM */}
      <Text style={styles.sectionHeader}>Deduction with Multiple Premises</Text>
      <Text style={styles.paragraph}>
        Deductions can involve multiple premises where the conclusion is derived by combining them logically. A common example is <Text style={styles.bold}>Syllogism</Text>.
      </Text>

      <RuleBlock 
        title="Syllogism (Logical Transitivity)"
        premises={["All humans are mortal", "Socrates is a human"]}
        conclusion="Socrates is mortal"
        color="#9333ea"
      />

      {/* APPLICATIONS */}
      <Text style={styles.sectionHeader}>Applications of Deduction Rules</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>• Mathematical Proofs:</Text> Allows us to prove theorems by logically deriving conclusions from known premises.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Computer Science:</Text> Used to validate the correctness of algorithms, particularly in decision-making processes.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Artificial Intelligence:</Text> Deduction plays a role in reasoning systems where the goal is to derive new knowledge from existing facts.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained how deductions operate, understanding the importance of Modus Ponens and Modus Tollens. We illustrated how truth tables validate these rules and how conclusions logically follow from premises in various fields.
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
  ruleBox: { padding: 15, borderRadius: 12, borderWidth: 2, backgroundColor: '#F8FAFC', marginVertical: 15 },
  ruleTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  premiseText: { fontSize: 14, color: '#475569', marginBottom: 5 },
  ruleDivider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 10 },
  conclusionText: { fontSize: 15, color: '#1E293B' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#166534', lineHeight: 20 },
  infoBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 8 },
  caption: { fontSize: 12, color: '#64748B', fontStyle: 'italic', marginTop: 5, marginBottom: 15 },
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569', fontSize: 13 }
});