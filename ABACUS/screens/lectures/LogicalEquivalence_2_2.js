import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function LogicalEquivalence_2_2() {
  
  // Reusable Truth Table Component with Color Coding
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

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Logical equivalence is a fundamental concept in propositional logic. It is used in analyzing and transforming logical statements into more manageable forms.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will explain the meaning of logical equivalence and understand how truth tables help us verify equivalence. We will also demonstrate how recognizing logical equivalence can simplify complex expressions.
      </Text>

      {/* --- WHAT IS LOGICAL EQUIVALENCE --- */}
      <Text style={styles.sectionHeader}>What is Logical Equivalence?</Text>
      <Text style={styles.paragraph}>
        Logical equivalence is the relationship between two statements that have the same truth value in every possible scenario. In simpler terms, we can say two statements are logically equivalent if they are both either True or False. It is like saying two people always agreeing on every topic.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>
          Mathematically, we can express this relationship between two statements P and Q by writing <Text style={[styles.bold, {color: '#16941c', fontSize: 16}]}>P ≡ Q</Text>, which means P and Q are logically equivalent.
        </Text>
      </View>

      {/* --- TRUTH TABLES --- */}
      <Text style={styles.sectionHeader}>Understanding Logical Equivalence Using Truth Tables</Text>
      <Text style={styles.paragraph}>
        Like logics, a truth table is a tool to determine whether two statements are logically equivalent. We list out all possible truth values for each statement and then compare the results. If the truth values match in every case, the statements are logically equivalent.
      </Text>

      <Text style={styles.subHeader}>Example of Logical Equivalence of P → Q and ¬P ∨ Q</Text>
      <Text style={styles.paragraph}>
        Let us see an example of logical equivalence between two statements, <Text style={styles.bold}>P → Q</Text> (if P then Q) and <Text style={styles.bold}>¬P ∨ Q</Text> (not P or Q). To prove these two statements are logically equivalent, we construct the truth table −
      </Text>
      
      <TruthTable 
        headers={["P", "Q", "P → Q", "¬P ∨ Q"]}
        rows={[
          ["T", "T", "T", "T"],
          ["T", "F", "F", "F"],
          ["F", "T", "T", "T"],
          ["F", "F", "T", "T"]
        ]}
      />
      <Text style={styles.paragraph}>
        As we can see, the final columns of both statements are the same, meaning <Text style={styles.bold}>P → Q</Text> and <Text style={styles.bold}>¬P ∨ Q</Text> are <Text style={styles.bold}>logically equivalent</Text>.
      </Text>

      {/* --- DE MORGAN'S LAWS --- */}
      <Text style={styles.sectionHeader}>De Morgan's Laws</Text>
      <Text style={styles.paragraph}>
        We have learnt the concept of De Morgan’s Laws in Set Theory and Boolean algebra. They are a set of logical equivalences in discrete mathematics. These laws show us a way to distribute negations across conjunctions (ANDs) and disjunctions (ORs). They are useful in simplifying complex logical expressions.
      </Text>
      <Text style={styles.paragraph}>De Morgan's Laws are −</Text>
      <View style={styles.lawBox}>
        <Text style={styles.lawText}>¬(P ∧ Q) ≡ ¬P ∨ ¬Q</Text>
        <Text style={styles.lawText}>¬(P ∨ Q) ≡ ¬P ∧ ¬Q</Text>
      </View>

      <Text style={styles.subHeader}>Example of Logical Equivalence Using De Morgan's Law</Text>
      <Text style={styles.paragraph}>
        Let us see how to apply De Morgan's law to check if the statements <Text style={styles.bold}>¬(P ∨ Q)</Text> and <Text style={styles.bold}>¬P ∧ ¬Q</Text> are logically equivalent.
      </Text>

      <TruthTable 
        headers={["P", "Q", "¬(P ∨ Q)", "¬P ∧ ¬Q"]}
        rows={[
          ["T", "T", "F", "F"],
          ["T", "F", "F", "F"],
          ["F", "T", "F", "F"],
          ["F", "F", "T", "T"]
        ]}
      />
      <Text style={styles.paragraph}>
        As the truth values are the same, De Morgan's law holds, confirming that <Text style={[styles.bold, {color: '#16941c'}]}>¬(P ∨ Q) ≡ ¬P ∧ ¬Q</Text>
      </Text>

      {/* --- NEGATION OF IMPLICATIONS --- */}
      <Text style={styles.sectionHeader}>Negation of Implications</Text>
      <Text style={styles.paragraph}>
        Another useful but trickier thing is negation of implications. The negation of an implication <Text style={styles.bold}>P → Q</Text> is not another implication. It is a conjunction of the hypothesis being true and the conclusion being false. In other words:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.bold, {fontSize: 16, color: '#16941c', textAlign: 'center'}]}>¬(P → Q) ≡ P ∧ ¬Q</Text>
      </View>

      <Text style={styles.subHeader}>Example of Negating an Implication</Text>
      <Text style={styles.paragraph}>
        Let us see the prove that ¬(P → Q) ≡ P ∧ ¬Q without using a truth table by breaking it down step-by-step −
      </Text>
      <View style={styles.proofBox}>
        <Text style={styles.proofStep}>1. Start with <Text style={styles.bold}>¬(P → Q)</Text>.</Text>
        <Text style={styles.proofStep}>2. Recall that P → Q is equivalent to ¬P ∨ Q (We also proved this in the first example).</Text>
        <Text style={styles.proofStep}>3. Now apply negation: <Text style={styles.bold}>¬(¬P ∨ Q)</Text></Text>
        <Text style={styles.proofStep}>4. Using De Morgan’s Law, we get <Text style={styles.bold}>¬¬P ∧ ¬Q</Text></Text>
        <Text style={styles.proofStep}>5. Finally, simplify the double negation to <Text style={[styles.bold, {color: '#16941c'}]}>P ∧ ¬Q</Text></Text>
      </View>
      <Text style={styles.paragraph}>
        By using logical transformations instead of truth tables, we showed that <Text style={styles.bold}>¬(P → Q) ≡ P ∧ ¬Q</Text>
      </Text>

      {/* --- COMPLEX EXAMPLES --- */}
      <Text style={styles.sectionHeader}>More Complex Examples of Logical Equivalence</Text>
      <Text style={styles.paragraph}>
        We have understood the basics examples. Let us see some of the complex examples where we have much things to do. Let us determine whether it is logically equivalent to another statement using a truth table.
      </Text>

      <Text style={styles.subHeader}>Example: Are (P ∨ Q) → R and (P → R) ∨ (Q → R) Logically Equivalent?</Text>
      <Text style={styles.paragraph}>Constructing the truth table −</Text>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{minWidth: 500}}>
          <TruthTable 
            headers={["P", "Q", "R", "(P ∨ Q) → R", "(P → R) ∨ (Q → R)"]} 
            rows={[
              ["T", "T", "T", "T", "T"],
              ["T", "T", "F", "F", "F"],
              ["T", "F", "T", "T", "T"],
              ["T", "F", "F", "F", "T"],
              ["F", "T", "T", "T", "T"],
              ["F", "T", "F", "F", "T"],
              ["F", "F", "T", "T", "T"],
              ["F", "F", "F", "T", "T"]
            ]} 
          />
        </View>
      </ScrollView>

      {/* 🖼️ TINY VENN DIAGRAM IMAGE */}
      <Image 
        source={require('../../assets/moduleImages/logequiv1.jpg')} 
        style={styles.smallImage}
        resizeMode="contain"
      />
      <Text style={styles.imageCaption}>Figure: Venn diagram representation</Text>

      <Text style={styles.paragraph}>
        In the fourth and sixth rows, the truth values differ, meaning that the two statements are <Text style={styles.bold}>not</Text> logically equivalent. However, in certain scenarios, (P ∨ Q) → R implies (P → R) ∨ (Q → R), but not the reverse.
      </Text>

      {/* --- APPLICATIONS --- */}
      <Text style={styles.sectionHeader}>Applications of Logical Equivalence</Text>
      <Text style={styles.paragraph}>
        Let us see where we can use logical equivalence to solve complex problems −
      </Text>

      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.bold}>Simplifying Proofs</Text> − When tackling a complex proof, recognizing equivalent statements can simplify the process. This allows us to rephrase parts of the proof into simpler forms.
        </Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.bold}>Boolean Algebra</Text> − Logical equivalence plays a key role in Boolean algebra, which is used in circuit design and computer programming. By using logical equivalences, complex Boolean expressions can be simplified for easier implementation.
        </Text>
      </View>
      <View style={styles.bulletItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.bold}>Algorithm Optimization</Text> − In computer science, algorithms that involve decision-making processes can be optimized by identifying and using logically equivalent expressions that are faster to compute.
        </Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we provided an overview of logical equivalence in discrete mathematics, covering its definition and how truth tables help verify whether two statements are logically equivalent.
      </Text>
      <Text style={styles.paragraph}>
        We explored De Morgan's Laws and applied them to practical examples, discussed the negation of implications, and showed how to handle more complex logical expressions. We also highlighted the importance of logical equivalence in simplifying proofs, Boolean algebra, and computer science applications.
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
  
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 15, color: '#334155', lineHeight: 24 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  
  lawBox: { backgroundColor: '#F1F5F9', padding: 20, borderRadius: 12, marginBottom: 20, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  lawText: { fontFamily: 'monospace', fontSize: 16, color: '#16941c', fontWeight: 'bold', marginVertical: 4 },
  
  proofBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 20 },
  proofStep: { fontSize: 14, color: '#166534', marginBottom: 6, fontFamily: 'monospace' },
  
  bulletItem: { flexDirection: 'row', marginBottom: 10, paddingLeft: 5 },
  bullet: { fontSize: 18, fontWeight: 'bold', color: '#16941c', marginRight: 10 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 24 },
  
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569', fontSize: 14, fontFamily: 'monospace' },
  
  // Tiny Image Styles
  smallImage: { width: 180, height: 150, alignSelf: 'center', marginTop: 15, marginBottom: 5, backgroundColor: '#f1f5f9', borderRadius: 8 },
  imageCaption: { fontSize: 13, color: '#64748b', textAlign: 'center', fontStyle: 'italic', marginBottom: 20 }
});