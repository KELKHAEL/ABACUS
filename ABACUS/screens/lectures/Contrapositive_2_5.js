import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Contrapositive_2_5() {
  
  // Custom Visualizer for Proof Steps
  const ProofStep = ({ step, title, content }) => (
    <View style={styles.stepContainer}>
      <View style={styles.stepBadge}>
        <Text style={styles.stepNumber}>{step}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepText}>{content}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In Discrete mathematics, we use logics to deduct and prove in several ways. Another way of proving logics is using the techniques with the <Text style={styles.bold}>proof by contrapositive</Text>. This method demonstrates the truth of an implication by proving the equivalent contrapositive statement instead. It is a useful and often simpler way to verify a claim when direct proof methods might be cumbersome or unclear.
      </Text>

      {/* --- WHAT IS PROOF BY CONTRAPOSITIVE --- */}
      <Text style={styles.sectionHeader}>What is Proof by Contrapositive?</Text>
      <Text style={styles.paragraph}>
        To understand the concept of proof by contrapositive, we must cover the basics of <Text style={styles.bold}>implications</Text>. Let us first recall what an implication is. In logical terms, an implication is a statement of the form "if P, then Q", which we write as −
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>P → Q</Text>
      </View>
      <Text style={styles.paragraph}>Here, P is called the hypothesis (or premise), and Q is the conclusion.</Text>
      <Text style={styles.paragraph}>
        The contrapositive of an implication reverses and negates both the hypothesis and the conclusion. So, the <Text style={styles.bold}>contrapositive</Text> of the statement P → Q is −
      </Text>
      <View style={styles.logicBox}>
        <Text style={styles.logicLabel}>Logical Equivalence:</Text>
        <Text style={styles.logicFormula}>(P → Q) ≡ (¬Q → ¬P)</Text>
      </View>
      <Text style={styles.paragraph}>
        This means that instead of proving "if P, then Q", we prove "if not Q, then not P". An important fact is that the contrapositive is logically equivalent to the original statement. In other words, if the contrapositive is true, the original implication must also be true.
      </Text>

      {/* --- WHY USE CONTRAPOSITIVE --- */}
      <Text style={styles.sectionHeader}>Why Use Contrapositive Proofs?</Text>
      <Text style={styles.paragraph}>
        Sometimes, it is difficult to prove a statement directly. The relationship between P and Q might be too complex or unclear when handling this. However, the contrapositive may offer a simpler or more intuitive way out. Giving the contrapositive can sometimes break down the problem into smaller, more manageable parts.
      </Text>
      <Text style={styles.paragraph}>
        To get the idea clear on how a proof by contrapositive works, let us look at an example from the idea of even and odd numbers.
      </Text>

      {/* --- EXAMPLE 1 --- */}
      <Text style={styles.sectionHeader}>Example 1: Proving the Statement with Contrapositive</Text>
      <Text style={styles.paragraph}>
        Consider the statement: <Text style={styles.bold}>"For all integers n, if n² is even, then n is even"</Text>.
      </Text>
      <Text style={styles.paragraph}>
        We want to prove this implication. Proving it directly would mean starting with the assumption that n² is even and trying to show that n itself is even. While possible, this approach might not feel straightforward. Instead, let us prove its contrapositive:
      </Text>
      
      <View style={styles.transformBox}>
        <Text style={styles.transformLabel}>The contrapositive of the given statement is −</Text>
        <Text style={styles.transformText}>"If n is odd, then n² is odd"</Text>
      </View>

      <Text style={styles.paragraph}>
        Proving this contrapositive will be enough to confirm the truth of the original implication. So, we start by assuming that n is odd and show that n² must also be odd.
      </Text>
      
      <ProofStep 
        step="1" 
        title="Assume the negation of the conclusion" 
        content="We start with assuming that n is odd. If n is odd, we can write n in the form: n = 2k + 1 where k is an integer. This is the standard way to represent odd numbers because they differ from the nearest even number by 1." 
      />
      <ProofStep 
        step="2" 
        title="Square the assumption" 
        content="Next, we need to find n², the square of an odd number. Using the expression for n, we calculate: n² = (2k + 1)². Expanding the square gives: n² = 4k² + 4k + 1." 
      />
      <ProofStep 
        step="3" 
        title="Analyze the result" 
        content="We can factor this expression: n² = 2(2k² + 2k) + 1. Notice that the expression 2(2k² + 2k) is clearly an even number since it is divisible by 2. Therefore, n² is of the form 'even number + 1', which means that n² is odd." 
      />
      <ProofStep 
        step="4" 
        title="Conclusion" 
        content="Thus, we have shown that if n is odd, then n² must also be odd. Since we have successfully proven the contrapositive, we can now conclude that the original statement is true: 'For all integers n, if n² is even, then n is even.'" 
      />

      {/* --- EXAMPLE 2 --- */}
      <Text style={styles.sectionHeader}>Example 2: Divisibility and Contrapositive</Text>
      <Text style={styles.paragraph}>
        Let us prove the following statement −
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>"For all integers a and b, if a × b is odd, then both a and b are odd."</Text>
      </View>
      <Text style={styles.paragraph}>
        Again, a direct proof could be tricky, but the contrapositive offers a simpler approach. The contrapositive of this statement is −
      </Text>
      <View style={styles.transformBox}>
        <Text style={styles.transformText}>"If either a or b is even, then a × b is even."</Text>
      </View>
      <Text style={styles.paragraph}>
        This is much easier to prove. We assume that one of the numbers, say <Text style={styles.bold}>a</Text>, is even. If <Text style={styles.bold}>a</Text> is even, then we can write <Text style={styles.bold}>a = 2k</Text> for some integer <Text style={styles.bold}>k</Text>. 
      </Text>
      <Text style={styles.paragraph}>
        Now, <Text style={styles.bold}>a × b = (2k) × b = 2(k × b)</Text>, which is clearly an even number because it is divisible by 2. Hence, we can conclude this is contrapositive, and by extension, the original statement is True.
      </Text>

      {/* --- IMPORTANCE SECTION --- */}
      <Text style={styles.sectionHeader}>Importance of Proving by Contrapositive</Text>
      <Text style={styles.paragraph}>
        The following points highlight why it is sometimes becoming important to use Proof by Contrapositive −
      </Text>
      <View style={styles.infoBox}>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="swap-horizontal" size={20} color="#0369A1" />
          <Text style={styles.infoText}><Text style={styles.bold}>Logical Equivalence</Text> − Proof by contrapositive helps in that the original statement and its contrapositive are logically equivalent. Proving one is the same as proving the other.</Text>
        </View>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#0369A1" />
          <Text style={styles.infoText}><Text style={styles.bold}>Simplicity</Text> − Sometimes, it is easier to prove the contrapositive because it allows us to work with negations, which can simplify the relationships between the variables.</Text>
        </View>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="toolbox-outline" size={20} color="#0369A1" />
          <Text style={styles.infoText}><Text style={styles.bold}>Versatility</Text> − Proof by contrapositive is very much useful when we are working with statements with properties like even and odd numbers, divisibility, and inequalities. It is widely applicable in number theory, logic, and discrete mathematics.</Text>
        </View>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concept of proof by contrapositive, the fundamental technique in discrete mathematics.
      </Text>
      <Text style={styles.paragraph}>
        We have started by explaining the basic idea of how the contrapositive of a statement is logically equivalent to the original statement. Then, we gave a detailed example proving that if n² is even, then n is even, using the contrapositive approach. We also looked at another example involving divisibility to further illustrate the utility of this proof method.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  formulaBox: { backgroundColor: '#104a28', padding: 15, borderRadius: 10, marginVertical: 10, alignItems: 'center' },
  formulaText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  
  logicBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  logicLabel: { fontSize: 13, color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 5 },
  logicFormula: { fontSize: 18, color: '#16941c', fontWeight: 'bold', fontFamily: 'monospace' },
  
  transformBox: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 20 },
  transformLabel: { fontSize: 14, color: '#9A3412', fontWeight: 'bold', marginBottom: 4 },
  transformText: { fontSize: 15, color: '#C2410C', fontStyle: 'italic', fontWeight: 'bold' },
  
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 15, color: '#1E293B', fontStyle: 'italic', fontWeight: '600' },
  
  stepContainer: { flexDirection: 'row', marginBottom: 20 },
  stepBadge: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#16941c', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  stepNumber: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 6 },
  stepText: { fontSize: 15, color: '#475569', lineHeight: 24, textAlign: 'justify' },
  
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#BAE6FD' },
  bulletRow: { flexDirection: 'row', marginBottom: 15, alignItems: 'flex-start' },
  infoText: { flex: 1, marginLeft: 12, fontSize: 15, color: '#0369A1', lineHeight: 24, textAlign: 'justify' }
});