import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Custom Truth Table Component for the Overview
const RuleTable = ({ headers, rows }) => (
  <View style={styles.table}>
    <View style={[styles.tableRow, styles.tableHeaderBg]}>
      {headers.map((h, i) => <Text key={i} style={[styles.tableCell, styles.bold]}>{h}</Text>)}
    </View>
    {rows.map((row, i) => (
      <View key={i} style={styles.tableRow}>
        {row.map((cell, j) => (
          <Text key={j} style={[styles.tableCell, j === 0 && styles.logicTextTable]}>
            {cell}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

// Custom Inference Rule Display Component
const RuleItem = ({ name, logic, premiseText, example }) => (
  <View style={styles.ruleCard}>
    <View style={styles.ruleHeader}>
      <Text style={styles.ruleName}>{name}</Text>
      <View style={styles.logicBox}>
        <Text style={styles.logicText}>{logic}</Text>
      </View>
    </View>
    <Text style={styles.premiseText}>{premiseText}</Text>
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleLabel}>Example:</Text>
      <Text style={styles.exampleContent}>{example}</Text>
    </View>
  </View>
);

export default function InferenceRules_2_8() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        To deduce new statements from the statements whose truth that we already know, <Text style={styles.bold}>Rules of Inference</Text> are used.
      </Text>

      <Text style={styles.sectionHeader}>What are Rules of Inference for?</Text>
      <Text style={styles.paragraph}>
        Mathematical logic is often used for logical proofs. Proofs are valid arguments that determine the truth values of mathematical statements.
      </Text>
      <Text style={styles.paragraph}>
        An argument is a sequence of statements. The last statement is the conclusion and all its preceding statements are called premises (or hypothesis). The symbol <Text style={styles.bold}>∴</Text> (read therefore) is placed before the conclusion. A valid argument is one where the conclusion follows from the truth values of the premises.
      </Text>
      <Text style={styles.paragraph}>
        Rules of Inference provide the templates or guidelines for constructing valid arguments from the statements that we already have.
      </Text>

      {/* --- TABLE OF RULES --- */}
      <Text style={styles.sectionHeader}>Table of Rules of Inference</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{minWidth: 350}}>
          <RuleTable 
            headers={["Rule of Inference", "Name"]}
            rows={[
              ["P\n---\n∴ P ∨ Q", "Addition"],
              ["P ∨ Q\n¬P\n---\n∴ Q", "Disjunctive Syllogism"],
              ["P\nQ\n---\n∴ P ∧ Q", "Conjunction"],
              ["P → Q\nQ → R\n---\n∴ P → R", "Hypothetical Syllogism"],
              ["P ∧ Q\n---\n∴ P", "Simplification"],
              ["(P → Q) ∧ (R → S)\nP ∨ R\n---\n∴ Q ∨ S", "Constructive Dilemma"],
              ["P → Q\nP\n---\n∴ Q", "Modus Ponens"],
              ["(P → Q) ∧ (R → S)\n¬Q ∨ ¬S\n---\n∴ ¬P ∨ ¬R", "Destructive Dilemma"],
              ["P → Q\n¬Q\n---\n∴ ¬P", "Modus Tollens"]
            ]}
          />
        </View>
      </ScrollView>

      {/* --- INDIVIDUAL RULES DETAILED --- */}
      <Text style={styles.sectionHeader}>Detailed Rules & Examples</Text>

      <RuleItem 
        name="Addition"
        logic={"P\n---\n∴ P ∨ Q"}
        premiseText="If P is a premise, we can use Addition rule to derive P ∨ Q."
        example="Let P be the proposition, 'He studies very hard' is true.\nTherefore − 'Either he studies very hard Or he is a very bad student.' Here Q is the proposition 'he is a very bad student'."
      />

      <RuleItem 
        name="Conjunction"
        logic={"P\nQ\n---\n∴ P ∧ Q"}
        premiseText="If P and Q are two premises, we can use Conjunction rule to derive P ∧ Q."
        example="Let P − 'He studies very hard'\nLet Q − 'He is the best boy in the class'\nTherefore − 'He studies very hard and he is the best boy in the class'"
      />

      <RuleItem 
        name="Simplification"
        logic={"P ∧ Q\n---\n∴ P"}
        premiseText="If P ∧ Q is a premise, we can use Simplification rule to derive P."
        example="'He studies very hard and he is the best boy in the class', P ∧ Q\nTherefore − 'He studies very hard'"
      />

      <RuleItem 
        name="Modus Ponens"
        logic={"P → Q\nP\n---\n∴ Q"}
        premiseText="If P and P → Q are two premises, we can use Modus Ponens to derive Q."
        example="'If you have a password, then you can log on to facebook', P → Q\n'You have a password', P\nTherefore − 'You can log on to facebook'"
      />

      <RuleItem 
        name="Modus Tollens"
        logic={"P → Q\n¬Q\n---\n∴ ¬P"}
        premiseText="If P → Q and ¬Q are two premises, we can use Modus Tollens to derive ¬P."
        example="'If you have a password, then you can log on to facebook', P → Q\n'You cannot log on to facebook', ¬Q\nTherefore − 'You do not have a password'"
      />

      <RuleItem 
        name="Disjunctive Syllogism"
        logic={"¬P\nP ∨ Q\n---\n∴ Q"}
        premiseText="If ¬P and P ∨ Q are two premises, we can use Disjunctive Syllogism to derive Q."
        example="'The ice cream is not vanilla flavored', ¬P\n'The ice cream is either vanilla flavored or chocolate flavored', P ∨ Q\nTherefore − 'The ice cream is chocolate flavored'"
      />

      <RuleItem 
        name="Hypothetical Syllogism"
        logic={"P → Q\nQ → R\n---\n∴ P → R"}
        premiseText="If P → Q and Q → R are two premises, we can use Hypothetical Syllogism to derive P → R."
        example="'If it rains, I shall not go to school', P → Q\n'If I don't go to school, I won't need to do homework', Q → R\nTherefore − 'If it rains, I won't need to do homework'"
      />

      <RuleItem 
        name="Constructive Dilemma"
        logic={"(P → Q) ∧ (R → S)\nP ∨ R\n---\n∴ Q ∨ S"}
        premiseText="If (P → Q) ∧ (R → S) and P ∨ R are two premises, we can use constructive dilemma to derive Q ∨ S."
        example="If it rains, I will take a leave, (P → Q)\nIf it is hot outside, I will go for a shower, (R → S)\nEither it will rain or it is hot outside, P ∨ R\nTherefore − 'I will take a leave or I will go for a shower'"
      />

      <RuleItem 
        name="Destructive Dilemma"
        logic={"(P → Q) ∧ (R → S)\n¬Q ∨ ¬S\n---\n∴ ¬P ∨ ¬R"}
        premiseText="If (P → Q) ∧ (R → S) and ¬Q ∨ ¬S are two premises, we can use destructive dilemma to derive ¬P ∨ ¬R."
        example="If it rains, I will take a leave, (P → Q)\nIf it is hot outside, I will go for a shower, (R → S)\nEither I will not take a leave or I will not go for a shower, ¬Q ∨ ¬S\nTherefore − 'Either it does not rain or it is not hot outside'"
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  // Table Styles
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', alignItems: 'center' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 12, textAlign: 'center', color: '#475569', fontSize: 14 },
  logicTextTable: { fontFamily: 'monospace', fontWeight: 'bold', color: '#16941c' },

  // Card Styles
  ruleCard: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 20 },
  ruleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  ruleName: { fontSize: 18, fontWeight: 'bold', color: '#16941c', flex: 1 },
  logicBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 6, minWidth: 100, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  logicText: { fontFamily: 'monospace', fontSize: 14, color: '#1E293B', textAlign: 'center', fontWeight: 'bold', lineHeight: 20 },
  premiseText: { fontSize: 14, color: '#475569', marginBottom: 12, lineHeight: 22 },
  exampleContainer: { borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12 },
  exampleLabel: { fontSize: 13, fontWeight: 'bold', color: '#64748B', marginBottom: 6, textTransform: 'uppercase' },
  exampleContent: { fontSize: 15, color: '#334155', lineHeight: 24, fontStyle: 'italic', fontWeight: '500' }
});