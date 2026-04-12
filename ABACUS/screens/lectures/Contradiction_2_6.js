import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Custom Component to visualize the logical flow of a contradiction proof
const ArgumentFlow = ({ steps }) => (
  <View style={styles.flowContainer}>
    {steps.map((step, index) => (
      <View key={index} style={styles.stepRow}>
        <View style={styles.stepIndicator}>
          <View style={styles.stepCircle}><Text style={styles.stepNum}>{index + 1}</Text></View>
          {index < steps.length - 1 && <View style={styles.stepLine} />}
        </View>
        <View style={styles.stepContentBox}>
          <Text style={styles.stepDescription}>{step}</Text>
        </View>
      </View>
    ))}
  </View>
);

// Custom Visualizer for Proof Steps
const ProofStep = ({ step, title, content, isContradiction }) => (
  <View style={styles.stepContainer}>
    <View style={[styles.stepBadge, isContradiction && {backgroundColor: '#DC2626'}]}>
      <Text style={styles.stepNumber}>{step}</Text>
    </View>
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, isContradiction && {color: '#B91C1C'}]}>{title}</Text>
      <Text style={styles.stepText}>{content}</Text>
    </View>
  </View>
);

export default function Contradiction_2_6() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Contradiction means negating a statement or when something false we care about. <Text style={styles.bold}>Proof by Contradiction</Text> is one of the most powerful methods used in discrete mathematics, especially when we are working on statements that are difficult to prove directly. The idea of this method lies in its simplicity; it assumes the opposite of what we are trying to prove, and shows how it leads to a contradiction.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will explain Proof by Contradiction in detail, discussing its basic framework and providing practical examples for a better understanding of this concept.
      </Text>

      {/* --- WHAT IS PROOF BY CONTRADICTION --- */}
      <Text style={styles.sectionHeader}>What is Proof by Contradiction?</Text>
      <Text style={styles.paragraph}>
        Proof by Contradiction operates on the following logical principle: to prove a statement <Text style={styles.bold}>P</Text>, assume that P is false (i.e., assume <Text style={styles.bold}>¬P</Text>, the negation of P is true), and then show that this assumption leads to a contradiction. The contradiction arises when two mutually exclusive facts or statements are derived. Since the assumption ¬P leads to a contradiction, the original statement P must be true.
      </Text>
      
      <Text style={styles.paragraph}>The basic structure of a proof by contradiction follows these steps −</Text>
      <ArgumentFlow 
        steps={[
          "Assume the negation of the statement we are trying to prove.",
          "Develop the argument, using logical steps and known facts.",
          "Arrive at a contradiction, a situation where a logical inconsistency arises.",
          "Conclude that the original statement must be true because the assumption that it was false leads to an impossible scenario."
        ]}
      />

      {/* --- WHY USE IT --- */}
      <Text style={styles.sectionHeader}>Why Use Proof by Contradiction?</Text>
      <Text style={styles.paragraph}>
        This is also an interesting question which seeks the answer that why we need the help of contradiction where we can prove them directly? There are many cases where proving a statement directly can be challenging. However, by assuming the opposite and working towards a contradiction, the steps may become more intuitive or simpler.
      </Text>
      <Text style={styles.paragraph}>
        Proof by Contradiction is useful when we are working with universal statements, the theorems involving inequalities, or proving the existence of something that cannot be easily demonstrated by construction. Let us now understand the concept with the help of a set of examples.
      </Text>

      {/* --- EXAMPLE 1 --- */}
      <Text style={styles.sectionHeader}>Example 1: Proving √2 is Irrational</Text>
      <Text style={styles.paragraph}>
        One of the most famous examples of proof by contradiction is the proof that √2 is irrational. The statement to be proved is −
      </Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', textAlign: 'center', fontSize: 16}]}>"The square root of 2 is irrational."</Text>
      </View>

      <ProofStep 
        step="1" 
        title="Assume the negation" 
        content="Assume the opposite, i.e., that √2 is rational. We know by definition of rationality, this means that √2 = a / b, where a and b are integers, and the fraction is in its simplest form (i.e., a and b have no common divisors other than 1)." 
      />
      <ProofStep 
        step="2" 
        title="Develop the argument" 
        content="By squaring both sides, we get 2 = a² / b², which implies that a² = 2b². This equation tells us that a² is an even number (because it is equal to 2b²). From this, it follows that a itself must also be even (because the square of an odd number is odd, and the square of an even number is even). So, we can write a = 2k for some integer k. Substituting this into the equation a² = 2b² we get (2k)² = 2b² ⇒ 4k² = 2b² ⇒ b² = 2k². Thus, b² is also even, meaning that b is even." 
      />
      <ProofStep 
        step="3" 
        title="Arrive at the contradiction" 
        isContradiction={true}
        content="At this point, we have an idea that both a and b are even. But, this contradicts our original assumption that a/b is in its simplest form (because if both a and b are even, then they share at least 2 as a common divisor). Therefore, our assumption that √2 is rational must be False." 
      />
      <ProofStep 
        step="4" 
        title="Conclude" 
        content="Since the assumption led to a contradiction, we conclude that √2 is irrational." 
      />

      {/* --- EXAMPLE 2 --- */}
      <Text style={styles.sectionHeader}>Example 2: No Integer Solutions for x² = 4y + 2</Text>
      <Text style={styles.paragraph}>Let us consider another example of a quadratic equation,</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', textAlign: 'center', fontSize: 15}]}>"Prove that there are no integers x and y such that x² = 4y + 2"</Text>
      </View>

      <ProofStep 
        step="1" 
        title="Assume the negation" 
        content="Assume that there are integers x and y such that x² = 4y + 2." 
      />
      <ProofStep 
        step="2" 
        title="Develop the argument" 
        content="We can rewrite this equation as x² = 2(2y + 1). This shows that x² is an even number. If x² is even, then x must also be even. This is because the square of an odd number is odd. So, let x = 2k for some integer k. Substituting this into the equation, we get (2k)² = 2(2y + 1) ⇒ 4k² = 2(2y + 1) ⇒ 2k² = 2y + 1." 
      />
      <ProofStep 
        step="3" 
        title="Arrive at the contradiction" 
        isContradiction={true}
        content="The equation 2k² = 2y + 1 implies that the left-hand side is even (since 2k² is divisible by 2), but the right-hand side is odd (since 2y + 1 is an odd number). This is a contradiction because an even number cannot equal an odd number." 
      />
      <ProofStep 
        step="4" 
        title="Conclude" 
        content="Thus, the assumption that there exist integers x and y satisfying x² = 4y + 2 leads to a contradiction. So, no such integers exist." 
      />

      {/* --- EXAMPLE 3 --- */}
      <Text style={styles.sectionHeader}>Example 3: The Pigeonhole Principle</Text>
      <Text style={styles.paragraph}>
        Let us see our third example, which is one of the most famous problems in discrete mathematics. The Problem of Pigeonhole Principle. It states that if more than n objects are placed into n containers, at least one container must hold more than one object. Here is how we can prove it using contradiction:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', textAlign: 'center', fontSize: 15}]}>"If more than n pigeons fly into n pigeonholes, at least one pigeonhole must contain more than one pigeon."</Text>
      </View>

      <ProofStep 
        step="1" 
        title="Assume the negation" 
        content="Assume the opposite, that no pigeonhole contains more than one pigeon. In other words, each pigeonhole contains at most one pigeon." 
      />
      <ProofStep 
        step="2" 
        title="Develop the argument" 
        content="If each pigeonhole contains at most one pigeon, then the total number of pigeons that can fit into the n pigeonholes is at most n (Each pigeonhole holds no more than one pigeon)." 
      />
      <ProofStep 
        step="3" 
        title="Arrive at the contradiction" 
        isContradiction={true}
        content="We have assumed that there are more than n pigeons. This gives a contradiction, because if there are more pigeons than pigeonholes, at least one pigeonhole must contain more than one pigeon." 
      />
      <ProofStep 
        step="4" 
        title="Conclude" 
        content="Thus, the assumption that no pigeonhole contains more than one pigeon leads to a contradiction. Therefore, at least one pigeonhole must contain more than one pigeon." 
      />

      {/* --- AUTOMATA THEORY NOTE --- */}
      <Text style={styles.paragraph}>
        There are some other examples where we use this method of contradiction to prove something. In automata theory, a special branch of discrete math and computation, we use the concept called <Text style={styles.bold}>pumping lemma</Text> for <Text style={styles.bold}>regular languages</Text> and <Text style={styles.bold}>context-free languages</Text>. For them as well, we use the method of contradiction to prove some expression is not falling under regular language or context free language.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        Proof by Contradiction is a widely used method in Discrete Mathematics. We started by explaining the logical framework of this technique. This method assumes the negation of the statement to be proven and showing that this leads to a contradiction.
      </Text>
      <Text style={styles.paragraph}>
        We then explored three practical examples: the proof that √2 is irrational, the problem involving no integer solutions for x² = 4y + 2, and the application of the pigeonhole principle.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  exampleText: { fontSize: 15, color: '#334155', lineHeight: 24 },
  
  // Argument Flow Visuals
  flowContainer: { marginVertical: 15, paddingLeft: 10 },
  stepRow: { flexDirection: 'row', marginBottom: 0 },
  stepIndicator: { alignItems: 'center', width: 30 },
  stepCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#16941c', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  stepNum: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  stepLine: { width: 2, flex: 1, backgroundColor: '#BBF7D0', marginVertical: -2 },
  stepContentBox: { flex: 1, paddingLeft: 15, paddingBottom: 25, justifyContent: 'center' },
  stepDescription: { fontSize: 14, color: '#334155', lineHeight: 22, fontWeight: '500' },
  
  // Proof Step Cards
  stepContainer: { flexDirection: 'row', marginBottom: 20 },
  stepBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#16941c', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  stepNumber: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 6 },
  stepText: { fontSize: 15, color: '#475569', lineHeight: 24, textAlign: 'justify' }
});