import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function InferenceRules_2_8() {
  
  // Custom Inference Rule Display Component
  const RuleItem = ({ name, logic, example }) => (
    <View style={styles.ruleCard}>
      <View style={styles.ruleHeader}>
        <Text style={styles.ruleName}>{name}</Text>
        <View style={styles.logicBox}>
          <Text style={styles.logicText}>{logic}</Text>
        </View>
      </View>
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleLabel}>Example:</Text>
        <Text style={styles.exampleContent}>{example}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        To deduce new statements from statements whose truth we already know, <Text style={styles.bold}>Rules of Inference</Text> are used. These rules provide the templates or guidelines for constructing valid arguments from the statements we already have.
      </Text>

      <Text style={styles.sectionHeader}>What are Rules of Inference for?</Text>
      <Text style={styles.paragraph}>
        An argument is a sequence of statements where the last statement is the <Text style={styles.bold}>conclusion</Text> and all preceding statements are called <Text style={styles.bold}>premises</Text>. The symbol <Text style={styles.bold}>∴</Text> (read as "therefore") is placed before the conclusion.
      </Text>

      {/* RULES LISTING */}
      <Text style={styles.sectionHeader}>Common Rules of Inference</Text>

      <RuleItem 
        name="Addition"
        logic={"P\n---\n∴ P ∨ Q"}
        example='"He studies very hard" is True. Therefore, "Either he studies very hard or he is a very bad student".'
      />

      <RuleItem 
        name="Conjunction"
        logic={"P\nQ\n---\n∴ P ∧ Q"}
        example='P: "He studies very hard", Q: "He is the best boy". Therefore: "He studies very hard AND he is the best boy".'
      />

      <RuleItem 
        name="Simplification"
        logic={"P ∧ Q\n---\n∴ P"}
        example='Premise: "He studies hard and is the best boy." Therefore: "He studies very hard".'
      />

      <RuleItem 
        name="Modus Ponens"
        logic={"P → Q\nP\n---\n∴ Q"}
        example='Premises: "If you have a password, you can log in" and "You have a password." Therefore: "You can log in".'
      />

      <RuleItem 
        name="Modus Tollens"
        logic={"P → Q\n¬Q\n---\n∴ ¬P"}
        example='Premises: "If you have a password, you can log in" and "You cannot log in." Therefore: "You do not have a password".'
      />

      <RuleItem 
        name="Disjunctive Syllogism"
        logic={"P ∨ Q\n¬P\n---\n∴ Q"}
        example='Premises: "The ice cream is either vanilla or chocolate" and "It is not vanilla." Therefore: "It is chocolate".'
      />

      <RuleItem 
        name="Hypothetical Syllogism"
        logic={"P → Q\nQ → R\n---\n∴ P → R"}
        example='"If it rains, I shall not go to school" and "If I do not go to school, I won’t do homework." Therefore: "If it rains, I won’t do homework".'
      />

      <RuleItem 
        name="Constructive Dilemma"
        logic={"(P → Q) ∧ (R → S)\nP ∨ R\n---\n∴ Q ∨ S"}
        example='"If it rains I take a leave" and "If it is hot I take a shower." Premises: "Either it rains or it is hot." Conclusion: "I take a leave or a shower".'
      />

      <RuleItem 
        name="Destructive Dilemma"
        logic={"(P → Q) ∧ (R → S)\n¬Q ∨ ¬S\n---\n∴ ¬P ∨ ¬R"}
        example='Premises: "If it rains I take a leave," "If it is hot I take a shower," and "I did not take a leave or a shower." Conclusion: "It is not raining or it is not hot".'
      />

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        Rules of Inference are the templates used to construct valid arguments. By following these rules, we ensure that if our premises are true, our conclusion must also be true, which is the foundation of mathematical logic and computer programming.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  ruleCard: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 20 },
  ruleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  ruleName: { fontSize: 16, fontWeight: 'bold', color: '#16941c', flex: 1 },
  logicBox: { backgroundColor: '#F1F5F9', padding: 8, borderRadius: 6, minWidth: 80, alignItems: 'center' },
  logicText: { fontFamily: 'monospace', fontSize: 13, color: '#1E293B', textAlign: 'center' },
  exampleContainer: { borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 10 },
  exampleLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748B', marginBottom: 4, textTransform: 'uppercase' },
  exampleContent: { fontSize: 14, color: '#334155', lineHeight: 20, fontStyle: 'italic' }
});