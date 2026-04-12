import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function AtomicMolecular_1_3() {
  
  // Internal component for Truth Table Rows to keep code clean
  const TruthRow = ({ p, q, result, isHeader }) => (
    <View style={[styles.tableRow, isHeader && styles.tableHeaderBg]}>
      <Text style={[styles.tableCell, isHeader && styles.bold]}>{p}</Text>
      {q !== undefined && <Text style={[styles.tableCell, isHeader && styles.bold]}>{q}</Text>}
      <Text style={[
        styles.tableCell, 
        isHeader && styles.bold, 
        { color: isHeader ? '#334155' : (result === 'T' ? '#16941c' : '#dc2626'), fontWeight: isHeader ? 'bold' : '800' }
      ]}>
        {result}
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        One of the key concepts in discrete mathematics is mathematical statements. They are used to express ideas that can be either True or False. Mathematical statements come in two forms: <Text style={styles.bold}>atomic</Text> and <Text style={styles.bold}>molecular</Text>.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will highlight the difference between atomic and molecular statements. In addition, we will discuss how logical connectives work and demonstrate these concepts using various examples.
      </Text>

      <Text style={styles.sectionHeader}>Mathematical Statements</Text>
      <Text style={styles.paragraph}>
        A statement is a declarative sentence that can either be True or False. It cannot be both True and False, simultaneously. Statements are the building blocks of mathematical reasoning and form the basis for developing complex logical expressions.
      </Text>

      {/* --- ATOMIC STATEMENTS --- */}
      <Text style={styles.subHeader}>Atomic Statements</Text>
      <Text style={styles.paragraph}>
        An atomic statement is a simple, indivisible statement. It cannot be broken down into smaller components that are also statements. In other words, atomic statements stand alone as fundamental truths or falsehoods.
      </Text>
      <Text style={styles.paragraph}>Some of the examples of atomic statements include −</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• "Telephone numbers in the USA have 10 digits."</Text>
        <Text style={styles.exampleText}>• "The moon is made of cheese."</Text>
        <Text style={styles.exampleText}>• "42 is a perfect square."</Text>
        <Text style={styles.exampleText}>• "3 + 7 = 12" (This is false.)</Text>
      </View>
      <Text style={styles.paragraph}>
        Each of these sentences is either definitively True or False. There are no additional conditions or smaller statements hidden inside them.
      </Text>

      {/* --- NON-STATEMENTS --- */}
      <Text style={styles.subHeader}>Non-Statements</Text>
      <Text style={styles.paragraph}>Not every sentence qualifies as a statement. We can understand them through examples:</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>"Would you like some cake?"</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>"Go to your room!"</Text>
      </View>
      <Text style={styles.paragraph}>
        These are not statements because they do not hold a truth value. They are commands or questions and cannot be classified as true or false.
      </Text>

      <Text style={[styles.paragraph, {fontWeight: 'bold', marginTop: 10}]}>Another example of a Variable Expression:</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, {fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginBottom: 10}]}>3 + x = 12</Text>
        <Text style={styles.exampleText}>
          This expression is not a statement either, because the truth depends on the value of "x". For instance, if x = 9, the equation is <Text style={{color: '#16941c', fontWeight: 'bold'}}>True</Text>. If x = 5, the equation is <Text style={{color: '#dc2626', fontWeight: 'bold'}}>False</Text>.
        </Text>
      </View>
      <Text style={styles.paragraph}>
        Therefore, unless we assign a specific value to x, we cannot determine whether the sentence is True or False.
      </Text>

      {/* --- MOLECULAR STATEMENTS --- */}
      <Text style={styles.sectionHeader}>Molecular Statements and Logical Connectives</Text>
      <Text style={styles.paragraph}>
        We understood the atomic statement. Another type is the molecular statement. These are formed by combining two or more atomic statements using logical connectives. These connectives allow us to build more complex logical expressions.
      </Text>

      <Text style={styles.subHeader}>Common Logical Connectives</Text>
      <Text style={styles.paragraph}>There are five primary logical connectives used to create molecular statements −</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>1.</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Conjunction (∧):</Text> "and"</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>2.</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Disjunction (∨):</Text> "or"</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>3.</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Implication (→):</Text> "if...then..."</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>4.</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Biconditional (↔):</Text> "if and only if"</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>5.</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Negation (¬):</Text> "not"</Text>
      </View>

      <Text style={[styles.paragraph, {fontWeight: 'bold', marginTop: 10}]}>Example of a Molecular Statement −</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, {fontStyle: 'italic', marginBottom: 10}]}>"Telephone numbers in India have 10 digits and 42 is a perfect square."</Text>
        <Text style={styles.exampleText}>
          This molecular statement connects two atomic statements with the <Text style={styles.bold}>Conjunction AND</Text>. For the entire molecular statement to be True, both components must be True.
        </Text>
      </View>

      {/* --- TRUTH TABLES --- */}
      <Text style={styles.sectionHeader}>Truth Tables for Logical Connectives</Text>
      <Text style={styles.paragraph}>
        In logics, we use truth tables a lot. As we know the truth tables are useful to analyze the truth values of molecular statements based on the truth of their atomic components. Below are the truth conditions for each connective.
      </Text>
      
      {/* CONJUNCTION TABLE */}
      <Text style={styles.subHeader}>Conjunction (∧)</Text>
      <Text style={styles.paragraph}>A conjunction, P ∧ Q, is True if and only if both P and Q are True.</Text>
      <View style={styles.table}>
        <TruthRow p="P" q="Q" result="P ∧ Q" isHeader />
        <TruthRow p="T" q="T" result="T" />
        <TruthRow p="T" q="F" result="F" />
        <TruthRow p="F" q="T" result="F" />
        <TruthRow p="F" q="F" result="F" />
      </View>

      {/* DISJUNCTION TABLE */}
      <Text style={styles.subHeader}>Disjunction (∨)</Text>
      <Text style={styles.paragraph}>A disjunction, P ∨ Q, is True if at least one of P or Q is true. This is called Inclusive OR.</Text>
      <View style={styles.table}>
        <TruthRow p="P" q="Q" result="P ∨ Q" isHeader />
        <TruthRow p="T" q="T" result="T" />
        <TruthRow p="T" q="F" result="T" />
        <TruthRow p="F" q="T" result="T" />
        <TruthRow p="F" q="F" result="F" />
      </View>

      {/* IMPLICATION TABLE */}
      <Text style={styles.subHeader}>Implication (→)</Text>
      <Text style={styles.paragraph}>An implication, P → Q, is True unless P is true and Q is False.</Text>
      <View style={styles.table}>
        <TruthRow p="P" q="Q" result="P → Q" isHeader />
        <TruthRow p="T" q="T" result="T" />
        <TruthRow p="T" q="F" result="F" />
        <TruthRow p="F" q="T" result="T" />
        <TruthRow p="F" q="F" result="T" />
      </View>

      {/* BICONDITIONAL TABLE */}
      <Text style={styles.subHeader}>Biconditional (↔)</Text>
      <Text style={styles.paragraph}>A biconditional, P ↔ Q, is True when both P and Q have the same truth value.</Text>
      <View style={styles.table}>
        <TruthRow p="P" q="Q" result="P ↔ Q" isHeader />
        <TruthRow p="T" q="T" result="T" />
        <TruthRow p="T" q="F" result="F" />
        <TruthRow p="F" q="T" result="F" />
        <TruthRow p="F" q="F" result="T" />
      </View>

      {/* NEGATION TABLE */}
      <Text style={styles.subHeader}>Negation (¬)</Text>
      <Text style={styles.paragraph}>A negation, ¬P, simply inverts the truth value of P.</Text>
      <View style={[styles.table, {width: '60%', alignSelf: 'center'}]}>
        <TruthRow p="P" result="¬P" isHeader />
        <TruthRow p="T" result="F" />
        <TruthRow p="F" result="T" />
      </View>

      {/* --- EXAMPLES --- */}
      <Text style={styles.sectionHeader}>Example 1: Molecular Statements</Text>
      <Text style={styles.paragraph}>Consider the statement: "If Bob gets a 90 on the final, then Bob will pass the class."</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>P:</Text> "Bob gets a 90 on the final."</Text>
        <Text style={styles.exampleText}><Text style={styles.bold}>Q:</Text> "Bob will pass the class."</Text>
        <Text style={[styles.exampleText, {marginTop: 10}]}>
          This is an implication, <Text style={styles.bold}>P → Q</Text>. According to the truth table for implication, this statement will be false only if Bob gets a 90 on the final (P is True) and does not pass the class (Q is False). In all other cases, the implication is True.
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Example 2: Molecular Statements</Text>
      <Text style={styles.paragraph}>Consider the statement: "If 1 = 1, then most horses have 4 legs."</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>
          This statement is an implication as well. Even though the conclusion about horses might seem unrelated, the statement remains true because the hypothesis (1 = 1) is <Text style={styles.bold}>True</Text>, and the conclusion (most horses have 4 legs) is also <Text style={styles.bold}>True</Text>. Therefore, the whole implication is True.
        </Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concept of atomic and molecular statements in discrete mathematics. We started by defining what a mathematical statement is and understood the difference between atomic and molecular statements.
      </Text>
      <Text style={styles.paragraph}>
        We then explained the logical connectives and their associated truth tables, which help determine the truth value of molecular statements. Thereafter, we presented an overview of conjunctions, disjunctions, implications, and other logical structures.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, backgroundColor: '#ffffff' },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  bulletContainer: { flexDirection: 'row', marginBottom: 8, paddingLeft: 5 },
  bullet: { fontSize: 16, color: '#16941c', marginRight: 10, lineHeight: 22 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 24 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontFamily: 'monospace', fontSize: 14, color: '#334155', marginBottom: 5, lineHeight: 22 },
  
  // Table Styles
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569', fontFamily: 'monospace', fontSize: 15 }
});