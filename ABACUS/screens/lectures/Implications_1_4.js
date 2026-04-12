import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Implications_1_4() {
  
  // Internal component for Truth Table Rows to keep code clean
  const TruthRow = ({ p, q, result, isHeader }) => (
    <View style={[styles.tableRow, isHeader && styles.tableHeaderBg]}>
      <Text style={[styles.tableCell, isHeader && styles.bold]}>{p}</Text>
      <Text style={[styles.tableCell, isHeader && styles.bold]}>{q}</Text>
      <Text style={[
        styles.tableCell, 
        isHeader && styles.bold, 
        { color: isHeader ? '#334155' : (result === 'T' ? '#16941c' : '#dc2626'), fontWeight: isHeader ? 'bold' : '800' }
      ]}>{result}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Implications are useful in Discrete Mathematics to express relationships between statements. We must know these concepts for proving theorems, constructing logical arguments, and understanding conditional reasoning.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will see what implications are, how they function, and provide examples that illustrate their role in logic and mathematics. We will also cover the truth conditions for implications, discuss how to prove them, and understand the related concepts like contrapositive and converse statements.
      </Text>

      {/* --- WHAT IS AN IMPLICATION --- */}
      <Text style={styles.sectionHeader}>What is an Implication?</Text>
      <Text style={styles.paragraph}>
        An <Text style={styles.bold}>implication</Text> (or <Text style={styles.bold}>conditional statement</Text>) is a compound statement that takes the form of "If P, then Q" (written as P → Q). Here,
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>P</Text> is the <Text style={styles.bold}>hypothesis</Text> (also called the antecedent).</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Q</Text> is the <Text style={styles.bold}>conclusion</Text> (also called the consequent).</Text>
      </View>

      {/* --- TRUTH CONDITIONS --- */}
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
      <Text style={styles.paragraph}>
        This might seem complex and unintuitive at first. For example, consider the statement, "If 1 = 1, then most horses have four legs." The statement is looking quite awkward. But the statement is <Text style={styles.bold}>true</Text> because both parts of the statement are true.
      </Text>

      {/* --- TRUTH TABLE --- */}
      <Text style={styles.subHeader}>Truth Table for Implications</Text>
      <Text style={styles.paragraph}>Let us see the truth table for implications −</Text>
      <View style={[styles.table, { width: '80%', alignSelf: 'center' }]}>
        <TruthRow p="P" q="Q" result="P → Q" isHeader />
        <TruthRow p="T" q="T" result="T" />
        <TruthRow p="T" q="F" result="F" />
        <TruthRow p="F" q="T" result="T" />
        <TruthRow p="F" q="F" result="T" />
      </View>

      {/* --- EXAMPLES --- */}
      <Text style={styles.sectionHeader}>Examples of Implications</Text>
      
      <Text style={styles.subHeader}>Example 1 − If Bob gets a 90 on the final, then Bob will pass the class</Text>
      <Text style={styles.paragraph}>We have seen this example before but here we will analyze it in more detail.</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>P − Bob gets a 90 on the final.</Text>
        <Text style={styles.exampleText}>Q − Bob will pass the class.</Text>
      </View>
      <Text style={styles.paragraph}>
        If Bob does indeed score 90 and passes the class, then the implication is <Text style={styles.bold}>true</Text>. However, if Bob gets a 90 but fails the class, the implication is <Text style={styles.bold}>false</Text>, and the statement is misleading.
      </Text>
      <Text style={styles.paragraph}>
        On the other hand, if Bob does <Text style={styles.bold}>not</Text> get a 90, we do not care about whether he passes or fails – the implication holds true regardless because P is false.
      </Text>
      <Text style={styles.paragraph}>This is an example of how implications work even when the hypothesis is False:</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>True case</Text> − Bob gets 90 and passes (P and Q are both True).</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>False case</Text> − Bob gets 90 but does not pass (P is True, but Q is False).</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Indifferent Cases</Text> − Bob does not get 90 (no matter what happens next, P → Q is still true because P is False).</Text>
      </View>

      <Text style={styles.subHeader}>Example 2 − If 1 = 1, then most horses have four legs</Text>
      <Text style={styles.paragraph}>
        This is a strange but valid implication. Since both 1 = 1 and the fact that most horses have four legs are true, the implication is also true. There is no need for the two parts to be related. All we care about is whether the hypothesis and conclusion fit the truth conditions.
      </Text>

      <Text style={styles.subHeader}>Example 3 − If 8 is a prime number, then the 7624th digit of π is 8</Text>
      <Text style={styles.paragraph}>
        Since 8 is not a prime number, the hypothesis is false. It does not matter what the conclusion says (even though we have no idea what the 7624th digit of π is), the implication is automatically <Text style={styles.bold}>True</Text> because P is False.
      </Text>

      {/* --- DIRECT PROOF --- */}
      <Text style={styles.sectionHeader}>Direct Proof of Implications</Text>
      <Text style={styles.paragraph}>
        Let us now understand the concept of <Text style={styles.bold}>direct proof</Text>. It is the simplest and most straightforward way to prove an implication P → Q. The strategy is to assume that P is True and then show that Q must be True as well.
      </Text>

      <Text style={styles.subHeader}>Example: Proving that the Sum of Two Even Numbers is Even</Text>
      <Text style={styles.paragraph}>Let us understand this with an example: "If a and b are even, then their sum a + b is even."</Text>
      <Text style={styles.paragraph}>To do this, we assume that a and b are both even. By definition, even numbers can be expressed as multiples of 2 −</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>a = 2k for some integer k.</Text>
        <Text style={styles.exampleText}>b = 2j for some integer j.</Text>
        <Text style={[styles.exampleText, {marginTop: 10}]}>Then their sum is −</Text>
        <Text style={[styles.exampleText, {fontWeight: 'bold', color: '#16941c', marginTop: 5}]}>a + b = 2k + 2j = 2(k + j)</Text>
      </View>
      <Text style={styles.paragraph}>
        Since k + j is an integer, it follows that a + b is also a multiple of 2, which means a + b is even. Thus, we have proved that if a and b are even, their sum must also be even.
      </Text>

      {/* --- BICONDITIONAL --- */}
      <Text style={styles.sectionHeader}>If and Only If (Biconditional Statements)</Text>
      <Text style={styles.paragraph}>
        After the implications, more strict form is a biconditional statement. This is an implication that works in both directions. It combines the original implication and its converse −
      </Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, {fontWeight: 'bold'}]}>P ↔ Q means "P if and only if Q."</Text>
      </View>
      <Text style={styles.paragraph}>
        For this statement to be true, both P → Q and Q → P must be true. In other words, both directions of the implication need to hold.
      </Text>
      
      <Text style={styles.subHeader}>Example: Even and Square Numbers</Text>
      <Text style={styles.paragraph}>Consider the following statement −</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, {fontStyle: 'italic'}]}>"An integer n is even if and only if n² is even."</Text>
      </View>
      <Text style={styles.paragraph}>This is True because −</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>If n is even, then n² is even.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>If n² is even, then n must also be even.</Text>
      </View>
      <Text style={styles.paragraph}>Thus, the biconditional statement holds.</Text>

      {/* --- NECESSARY AND SUFFICIENT --- */}
      <Text style={styles.sectionHeader}>Necessary and Sufficient Conditions</Text>
      <Text style={styles.paragraph}>
        Another important idea is necessary and sufficient conditions. These helps clarify when certain conditions are required or enough to guarantee a conclusion.
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>P is necessary for Q</Text> − Q cannot be true unless P is true. This is expressed as Q → P.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>P is sufficient for Q</Text> − If P is true, then Q is guaranteed to be true. This is expressed as P → Q.</Text>
      </View>

      <Text style={styles.subHeader}>Example: Differentiability and Continuity</Text>
      <Text style={styles.paragraph}>From calculus, we know −</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, {fontStyle: 'italic'}]}>"If a function is differentiable at a point, then it is continuous at that point."</Text>
      </View>
      <Text style={styles.paragraph}>
        Here, the differentiability is a <Text style={styles.bold}>sufficient</Text> condition for continuity, but it is not <Text style={styles.bold}>necessary</Text>. A function can be continuous without being differentiable, as is the case with the absolute value function at x = 0.
      </Text>

      {/* --- MISUNDERSTANDINGS --- */}
      <Text style={styles.sectionHeader}>Common Misunderstandings about Implications</Text>
      <Text style={styles.paragraph}>
        Sometimes we misunderstand the complex nature of implications and all. It is important to remember that an implication does not assert a <Text style={styles.bold}>causal</Text> relationship between its components.
      </Text>
      <Text style={styles.paragraph}>
        The statement "If P, then Q" is purely about logical structure, not causality. This is why seemingly unrelated statements, like "If 1 = 1, then most horses have four legs," can be True.
      </Text>
      <Text style={styles.paragraph}>
        Also, remember that an implication is still true if the hypothesis is false, even if the conclusion seems unrelated.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we covered the concept of implications in discrete mathematics. We explained how implications are formed, including the truth conditions that are used. We also discussed related ideas of biconditional statements, and explored the difference between necessary and sufficient conditions.
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