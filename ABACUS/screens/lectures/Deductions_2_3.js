import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Deductions_2_3() {
  
  // Custom Truth Table Component with Color Coding
  const TruthTable = ({ headers, rows }) => (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableHeaderBg]}>
        {headers.map((h, i) => <Text key={i} style={[styles.tableCell, styles.bold]}>{h}</Text>)}
      </View>
      {rows.map((row, i) => (
        <View key={i} style={styles.tableRow}>
          {row.map((cell, j) => (
            <Text 
              key={j} 
              style={[
                styles.tableCell, 
                { color: cell === 'T' || cell === 'True' ? '#16941c' : (cell === 'F' || cell === 'False' ? '#dc2626' : '#475569'), fontWeight: cell === 'T' || cell === 'F' ? 'bold' : 'normal' }
              ]}
            >
              {cell}
            </Text>
          ))}
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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In propositional logics, sometimes we deduct one logical expression from another; we call them <Text style={styles.bold}>deductions</Text>. Deductions form the backbone of logical reasoning. Deductions are used to derive conclusions from premises. They follow rules that guarantee the truth of the conclusion if the premises are True. This concept is important in mathematical proofs in computer algorithms, and reasoning systems.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will see what deductions are, understand some common deduction rules, and explore various examples to see how deductions operate in logic. We will also discuss valid deduction rules like <Text style={styles.bold}>modus ponens</Text> and show how truth tables can be used to validate them.
      </Text>

      {/* --- WHAT ARE DEDUCTIONS --- */}
      <Text style={styles.sectionHeader}>What are Mathematical Deductions?</Text>
      <Text style={styles.paragraph}>
        A deduction is a logical process where, starting from a set of premises (assumptions), we find a conclusion that logically follows. For example, if we know that:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• If Edith eats her vegetables, she gets a cookie.</Text>
        <Text style={styles.exampleText}>• Edith ate her vegetables.</Text>
        <View style={styles.divider} />
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c'}]}>Here, we can deduce that "Edith gets a cookie".</Text>
      </View>
      <Text style={styles.paragraph}>
        This simple example shows a rule called <Text style={styles.bold}>modus ponens</Text>, one of the most common deduction rules. In symbolic terms, modus ponens can be written as −
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>P → Q, P ⟹ Q</Text>
      </View>
      <Text style={styles.paragraph}>
        This notation means: if P is true, and we also know that P → Q, then Q must be true.
      </Text>

      {/* --- MODUS PONENS --- */}
      <Text style={styles.sectionHeader}>Modus Ponens (If-Then Reasoning)</Text>
      <Text style={styles.paragraph}>
        Let us start with the classic modus ponens. It is like a simple yet powerful rule for reasoning with "if-then" statements. The structure looks like this −
      </Text>
      
      <RuleBlock 
        title="Modus Ponens Structure"
        premises={["If P, then Q (P → Q)", "P is true."]}
        conclusion="Therefore, Q is true."
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>For example, consider −</Text>
        <Text style={styles.exampleText}>Premise 1 − If it rains, the grass will be wet.</Text>
        <Text style={styles.exampleText}>Premise 2 − It is raining.</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c'}]}>Conclusion − The grass will be wet.</Text>
      </View>

      <Text style={styles.subHeader}>Truth Table Validation</Text>
      <Text style={styles.paragraph}>
        To prove that modus ponens is a valid rule, we can use a truth table. Let us construct one for P → Q and see how it works −
      </Text>
      <TruthTable 
        headers={["P", "Q", "P → Q"]}
        rows={[
          ["T", "T", "T"], 
          ["T", "F", "F"], 
          ["F", "T", "T"], 
          ["F", "F", "T"]
        ]}
      />
      <Text style={styles.paragraph}>
        From the table, we can see that whenever P is true and P → Q is true, Q must also be true. This confirms that modus ponens is a valid form of deduction.
      </Text>

      {/* --- MODUS TOLLENS --- */}
      <Text style={styles.sectionHeader}>Modus Tollens (Contrapositive Reasoning)</Text>
      <Text style={styles.paragraph}>
        Another important rule is modus tollens, this is a bit different but equally useful. It is the reverse of modus ponens and deals with what happens when the consequence is false. It can be written as −
      </Text>

      <RuleBlock 
        title="Modus Tollens Structure"
        premises={["If P, then Q (P → Q)", "Q is false."]}
        conclusion="Therefore, P must also be false."
        color="#0369A1"
      />

      <View style={[styles.exampleBox, {backgroundColor: '#F0F9FF', borderColor: '#BAE6FD'}]}>
        <Text style={styles.bold}>Here is an example −</Text>
        <Text style={styles.exampleText}>Premise 1: If a number is divisible by 4, it is even.</Text>
        <Text style={styles.exampleText}>Premise 2: The number is not even.</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#0369A1'}]}>Conclusion: The number is not divisible by 4.</Text>
      </View>

      <Text style={styles.subHeader}>Truth Table</Text>
      <Text style={styles.paragraph}>Like modus ponens, modus tollens can be verified using a truth table −</Text>
      <TruthTable 
        headers={["P", "Q", "P → Q", "¬Q", "¬P"]}
        rows={[
          ["T", "T", "T", "F", "F"],
          ["T", "F", "F", "T", "F"],
          ["F", "T", "T", "F", "T"],
          ["F", "F", "T", "T", "T"]
        ]}
      />
      <Text style={styles.paragraph}>
        Whenever ¬Q is true (Q is false) and P → Q is true, P must also be false. This proves that modus tollens is a valid deduction rule.
      </Text>

      {/* --- SYLLOGISM --- */}
      <Text style={styles.sectionHeader}>Deduction with Multiple Premises</Text>
      <Text style={styles.paragraph}>
        Deductions can involve multiple premises, where the conclusion is derived by combining these premises logically. A common example of this is <Text style={styles.bold}>syllogism</Text>. Syllogism works with using two premises to arrive at a conclusion −
      </Text>

      <RuleBlock 
        title="Syllogism (Logical Transitivity)"
        premises={["All humans are mortal.", "Socrates is a human."]}
        conclusion="Socrates is mortal."
        color="#9333ea"
      />
      <Text style={styles.paragraph}>
        Syllogism uses logical transitivity: if P → Q and Q → R, then P → R. This kind of reasoning is widely used in both philosophy and mathematics to construct proofs.
      </Text>

      {/* --- TRUTH TABLES AND DEDUCTION VALIDATION --- */}
      <Text style={styles.sectionHeader}>Truth Tables and Deduction Validation</Text>
      <Text style={styles.paragraph}>
        Truth tables are useful but not only for checking logical equivalence but also for validating deduction rules. By listing all possible truth values for premises and conclusions, we can verify whether a deduction is valid.
      </Text>

      <Text style={styles.subHeader}>Example: Validating P → R and Q → R Implies P ∨ Q → R</Text>
      <Text style={styles.paragraph}>To check whether P → R and Q → R together imply P ∨ Q → R, we build a truth table −</Text>
      
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{minWidth: 500}}>
          <TruthTable 
            headers={["P", "Q", "R", "P → R", "Q → R", "P ∨ Q → R"]}
            rows={[
              ["T", "T", "T", "T", "T", "T"],
              ["T", "T", "F", "F", "F", "F"],
              ["T", "F", "T", "T", "T", "T"],
              ["T", "F", "F", "F", "T", "F"],
              ["F", "T", "T", "T", "T", "T"],
              ["F", "T", "F", "T", "F", "F"],
              ["F", "F", "T", "T", "T", "T"],
              ["F", "F", "F", "T", "T", "T"]
            ]}
          />
        </View>
      </ScrollView>
      <Text style={styles.paragraph}>
        By examining the table, we can confirm that whenever both P → R and Q → R are true, P ∨ Q → R must also be true.
      </Text>

      {/* --- APPLICATIONS --- */}
      <Text style={styles.sectionHeader}>Applications of Deduction Rules</Text>
      <Text style={styles.paragraph}>We have understood the idea of deductions with examples. Let us see their applications in real life where deductions used the most.</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>• Mathematical Proofs</Text> − Deduction allows us to prove theorems by logically deriving conclusions from known premises.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Computer Science</Text> − In programming, deduction is used to validate the correctness of algorithms, particularly in decision-making processes and conditional statements.</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>• Artificial Intelligence</Text> − Deduction plays a role in reasoning systems where the goal is to derive new knowledge from existing facts.</Text>
      </View>

      {/* --- DEDUCTION IN ACTION --- */}
      <Text style={styles.sectionHeader}>Example of a Deduction in Action</Text>
      <Text style={styles.paragraph}>Let us go through a real-world example of deduction −</Text>
      <RuleBlock 
        title="Real-World Example"
        premises={["If it rains, the game will be cancelled.", "It is raining."]}
        conclusion="The game is cancelled."
        color="#e11d48"
      />
      <Text style={styles.paragraph}>
        This example follows the form of modus ponens, and we can immediately deduce that the game will indeed be cancelled. This type of reasoning is foundational to both formal logic and everyday problem-solving.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained how deductions operate in discrete mathematics. We understood the importance of modus ponens and modus tollens, two of the most commonly used deduction rules. We also understood how truth tables help validate these deductions and also how the conclusions logically follow from premises.
      </Text>
      <Text style={styles.paragraph}>
        Finally, we looked at how deductions are applied in various fields, from mathematical proofs to computer science and artificial intelligence.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  ruleBox: { padding: 15, borderRadius: 12, borderWidth: 2, backgroundColor: '#FAFAFA', marginVertical: 15 },
  ruleTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  premiseText: { fontSize: 14, color: '#475569', marginBottom: 5, lineHeight: 22 },
  ruleDivider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 10 },
  conclusionText: { fontSize: 15, color: '#1E293B', lineHeight: 22 },
  
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22, marginBottom: 4 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  
  formulaBox: { backgroundColor: '#104a28', padding: 15, borderRadius: 10, marginVertical: 10, alignItems: 'center' },
  formulaText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 15, letterSpacing: 1 },
  
  infoBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 10, lineHeight: 22 },
  
  caption: { fontSize: 12, color: '#64748B', fontStyle: 'italic', marginTop: 5, marginBottom: 15 },
  
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569', fontSize: 13, fontFamily: 'monospace' }
});