import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PermutationsCombinations_4_10() {
  
  // Custom Component for Formula Display
  const FormulaCard = ({ title, formula, logic, color }) => (
    <View style={[styles.fCard, { borderLeftColor: color }]}>
      <Text style={[styles.fTitle, { color: color }]}>{title}</Text>
      <View style={styles.mathBox}>
        <Text style={styles.mathText}>{formula}</Text>
      </View>
      <Text style={styles.fLogic}>{logic}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In Discrete Mathematics, we frequently use permutations and combinations to solve different types of problems with discrete elements. Permutations and Combinations help us in counting the number of ways in which we can arrange or choose things. They are important in various real-life scenarios such as seating arrangements, selection processes, and organizing objects.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will understand with examples the basics of permutations and combinations. We will focus on explaining the concepts through examples to make the math more relatable.
      </Text>

      {/* --- SECTION 1: PERMUTATIONS --- */}
      <Text style={styles.sectionHeader}>Permutations: Arranging Objects in Order</Text>
      <Text style={styles.paragraph}>
        The term permutation refers the different ways we can arrange a set of objects in a specific order. For example, if we have three letters, say A, B, and C, the possible permutations (or arrangements) are −
      </Text>
      <View style={styles.exampleListCard}>
        <Text style={styles.codeText}>ABC, ACB, BAC, BCA, CAB, CBA</Text>
      </View>
      <Text style={styles.paragraph}>
        So we are looking at the order of objects. Every time the order changes, it counts as a different permutation. One of the key formulas to calculate permutations involves factorials.
      </Text>

      <Text style={styles.subHeader}>Factorial and Permutations</Text>
      <Text style={styles.paragraph}>
        The factorial of a number $n$, written as $n!$. This represents the product of all positive integers from 1 up to $n$. For instance, $4! = 4 \times 3 \times 2 \times 1 = 24$. In terms of permutations, if we are arranging $n$ distinct objects, there are $n!$ ways to do so.
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example 1: How many ways can we arrange the letters A, B, C, D, E, F?</Text>
        <Text style={styles.exampleText}>
          We have six letters, and we need to find how many different ways you can arrange them. Using the factorial formula, we have −
          {"\n"}$6! = 6 \times 5 \times 4 \times 3 \times 2 \times 1 = 720$
          {"\n"}Thus, there are <Text style={styles.bold}>720</Text> different ways to arrange these six letters.
        </Text>
      </View>

      <Text style={styles.subHeader}>Permutations of k Objects Chosen from n Objects</Text>
      <Text style={styles.paragraph}>
        Sometimes, we are not interested in arranging all the objects but only a subset. In such cases, we use the formula for permutations of k objects chosen from n objects −
      </Text>

      <FormulaCard 
        title="Permutation Formula P(n, k)"
        formula="P(n, k) = \frac{n!}{(n - k)!}"
        logic="n is the total objects, and k is the number of objects we want to arrange."
        color="#0369A1"
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example 2: How many ways can we arrange 4 letters from A, B, C, D, E, F?</Text>
        <Text style={styles.exampleText}>
          Using the permutation formula:
          {"\n"}$P(6, 4) = \frac{'6!'}{'(6 - 4)!'} = \frac{'6 \times 5 \times 4 \times 3 \times 2!'}{'2!'} = 360$
          {"\n"}Thus, there are <Text style={styles.bold}>360</Text> different ways to arrange 4 letters from this set of 6.
        </Text>
      </View>

      {/* --- SECTION 2: COMBINATIONS --- */}
      <Text style={styles.sectionHeader}>Combinations: Selecting Objects without Considering Order</Text>
      <Text style={styles.paragraph}>
        After knowing the idea of permutation we must understand the idea of combinations. This is similar but has a certain difference with permutations. Unlike permutations, combinations are about choosing objects without caring about the order.
      </Text>
      <Text style={styles.paragraph}>
        Combinations is a way of selecting things, not arranging them. For example, if we are picking two colors from red, blue, and green, the possible combinations are −
      </Text>
      <View style={styles.exampleListCard}>
        <Text style={styles.codeText}>Red-Blue, Red-Green, Blue-Green</Text>
      </View>
      <Text style={styles.paragraph}>
        Notice how we do not care whether red comes before blue or blue comes before red. It is the same combination either way.
      </Text>

      <FormulaCard 
        title="Combination Formula C(n, k)"
        formula="C(n, k) = \frac{n!}{k!(n - k)!}"
        logic="The extra k! in the denominator removes the arrangements of the selected items."
        color="#16941c"
      />

      <View style={[styles.exampleBox, {borderColor: '#BBF7D0', backgroundColor: '#F0FDF4'}]}>
        <Text style={styles.bold}>Example: How many ways can you choose 3 letters from A, B, C, D, E, F?</Text>
        <Text style={styles.exampleText}>
          Here, the order does not matter. Using the combination formula −
          {"\n"}$C(6, 3) = \frac{'6!'}{'3!(6 - 3)!'} = \frac{120}{'3!'} = 20$
          {"\n"}So, there are <Text style={styles.bold}>20</Text> different ways to choose 3 letters from the set of 6.
        </Text>
      </View>

      {/* --- DIFFERENCE --- */}
      <Text style={styles.sectionHeader}>Difference between Permutations and Combinations</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Permutations</Text> is about the order of objects. For example, ABC and BCA are different permutations.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Combinations</Text> do not care about the order. ABC and BCA are considered the same combination.</Text>
      </View>

      <View style={styles.analogyBox}>
        <MaterialCommunityIcons name="ice-cream" size={24} color="#92400E" />
        <Text style={styles.analogyText}>
          <Text style={styles.bold}>Analogy:</Text> Think about picking flavors for ice cream. We are picking flavors (combinations), but we do not care what order they are scooped into the cone.
        </Text>
      </View>

      {/* --- REAL LIFE APPLICATIONS --- */}
      <Text style={styles.sectionHeader}>Applying Permutation and Combination in Real Life</Text>
      
      <View style={styles.appCard}>
        <Text style={styles.appTitle}>Example 1: Dinner Party Seating Arrangement</Text>
        <Text style={styles.appText}>
          Consider we are hosting a dinner party with 10 guests but we have only 6 chairs.
          {"\n\n"}
          <Text style={styles.bold}>Selection:</Text> Choosing 6 guests from 10. Order doesn't matter.
          {"\n"}$C(10, 6) = \frac{'10!'}{'6!(10 - 6)!'} = 210$ ways.
          {"\n\n"}
          <Text style={styles.bold}>Arrangement:</Text> Assigning specific seats to those 6 guests. Order matters.
          {"\n"}$P(10, 6) = \frac{'10!'}{'(10 - 6)!'} = 151,200$ ways.
        </Text>
      </View>

      <View style={[styles.appCard, { backgroundColor: '#F5F3FF', borderColor: '#DDD6FE' }]}>
        <Text style={[styles.appTitle, { color: '#7C3AED' }]}>Example 2: Creating Passwords</Text>
        <Text style={styles.appText}>
          Suppose we need to create a password using 5 letters from the alphabet with no repetition. The order matters because "ABCDE" is different from "BCDEA".
          {"\n\n"}
          <Text style={styles.bold}>Permutation:</Text> $P(26, 5) = \frac{'26!'}{'(26 - 5)!'} = 7,893,600$ possibilities.
        </Text>
      </View>

      <View style={styles.combinedBox}>
        <Text style={styles.bold}>Example 3: Group Selection and Arrangement</Text>
        <Text style={styles.appText}>
          Forming a team of 4 from a pool of 12 and assigning specific roles.
        </Text>
        <View style={styles.divider} />
        <View style={styles.mathStep}>
          <MaterialCommunityIcons name="numeric-1-circle" size={20} color="#0369A1" />
          <Text style={styles.stepText}>Choose 4 people: C(12, 4) = 495</Text>
        </View>
        <View style={styles.mathStep}>
          <MaterialCommunityIcons name="numeric-2-circle" size={20} color="#0369A1" />
          <Text style={styles.stepText}>Assign roles: P(4, 4) = 24</Text>
        </View>
        <Text style={styles.finalMath}>Total: 495 × 24 = <Text style={styles.resultGreen}>11,880 Ways</Text></Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the fundamental concepts of permutations and combinations in discrete mathematics. With appropriate examples, we demonstrated how to calculate permutations when the order of objects matters and combinations when it does not.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 8, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  fCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 15 },
  fTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' },
  mathBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', marginBottom: 10 },
  mathText: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  fLogic: { fontSize: 12, color: '#64748B', fontStyle: 'italic', textAlign: 'center' },
  
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginTop: 8, lineHeight: 22 },
  exampleListCard: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 15, alignItems: 'center' },
  codeText: { fontFamily: 'monospace', fontSize: 14, color: '#0F172A', fontWeight: 'bold', letterSpacing: 1 },
  
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 10, lineHeight: 20 },
  
  analogyBox: { flexDirection: 'row', backgroundColor: '#FFFBEB', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B', alignItems: 'center', marginBottom: 20 },
  analogyText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#92400E', lineHeight: 22, fontStyle: 'italic' },
  
  appCard: { padding: 15, borderRadius: 12, backgroundColor: '#F0F9FF', marginBottom: 15, borderWidth: 1, borderColor: '#E0F2FE' },
  appTitle: { fontSize: 16, fontWeight: 'bold', color: '#0369A1', marginBottom: 8 },
  appText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  
  combinedBox: { padding: 15, backgroundColor: '#FAFAFA', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'dashed', marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  mathStep: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  stepText: { marginLeft: 10, fontSize: 14, color: '#475569', fontWeight: '500' },
  finalMath: { textAlign: 'right', fontSize: 15, marginTop: 10, color: '#0F172A', fontWeight: 'bold' },
  resultGreen: { color: '#16941c', fontWeight: '900' }
});