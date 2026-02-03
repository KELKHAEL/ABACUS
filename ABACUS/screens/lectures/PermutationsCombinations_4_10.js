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
      
      <Text style={styles.paragraph}>
        {"In Discrete Mathematics, we frequently use permutations and combinations to solve different types of problems with discrete elements. These help us count ways to arrange or choose things in real-life scenarios like seating arrangements and organization processes."}
      </Text>

      {/* SECTION 1: PERMUTATIONS */}
      <Text style={styles.sectionHeader}>{"Permutations: Arrangements in Order"}</Text>
      <Text style={styles.paragraph}>
        {"A permutation is an arrangement where "}<Text style={styles.bold}>{"order matters"}</Text>{". If the order changes, it counts as a different permutation."}
      </Text>

      <FormulaCard 
        title={"Permutation Formula P(n, k)"}
        formula={"P(n, k) = n! / (n - k)!"}
        logic={"Where n is the total objects and k is the number to arrange."}
        color={"#0369A1"}
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>{"Example: Arrange 4 letters from {A, B, C, D, E, F}"}</Text>
        <Text style={styles.exampleText}>{"P(6, 4) = 6! / (6 - 4)! = 720 / 2 = "}<Text style={styles.bold}>{"360 ways"}</Text>{"."}</Text>
      </View>

      {/* SECTION 2: COMBINATIONS */}
      <Text style={styles.sectionHeader}>{"Combinations: Selection without Order"}</Text>
      <Text style={styles.paragraph}>
        {"Unlike permutations, combinations are about "}<Text style={styles.bold}>{"selecting"}</Text>{" things without caring about the sequence."}
      </Text>

      <FormulaCard 
        title={"Combination Formula C(n, k)"}
        formula={"C(n, k) = n! / [k!(n - k)!]"}
        logic={"Notice the extra k! in the denominator to remove ordered duplicates."}
        color={"#16941c"}
      />

      <View style={styles.analogyBox}>
        <MaterialCommunityIcons name="ice-cream" size={24} color="#92400E" />
        <Text style={styles.analogyText}>
          <Text style={styles.bold}>{"Analogy:"}</Text>{" Choosing 3 flavors for an ice cream cone is a combination; we don't care which flavor is scooped first."}
        </Text>
      </View>

      {/* SECTION 3: REAL WORLD SCENARIOS */}
      <Text style={styles.sectionHeader}>{"Real-World Applications"}</Text>
      
      <View style={styles.appCard}>
        <Text style={styles.appTitle}>{"1. Dinner Party Seating"}</Text>
        <Text style={styles.appText}>{"• Choosing 6 guests from 10 (Selection): C(10, 6) = 210"}</Text>
        <Text style={styles.appText}>{"• Assigning specific seats (Arrangement): P(10, 6) = 151,200"}</Text>
      </View>

      <View style={[styles.appCard, { backgroundColor: '#F5F3FF' }]}>
        <Text style={[styles.appTitle, { color: '#7C3AED' }]}>{"2. Creating Passwords"}</Text>
        <Text style={styles.appText}>{"Order matters because \"ABCDE\" is different from \"BCDEA\". Creating a 5-letter password from 26 letters: P(26, 5) = 7,893,600."}</Text>
      </View>

      {/* SECTION 4: COMBINED PROBLEMS */}
      <Text style={styles.sectionHeader}>{"Advanced Multi-Stage Selection"}</Text>
      <Text style={styles.paragraph}>{"Sometimes you must combine both to solve a single problem."}</Text>
      
      <View style={styles.combinedBox}>
        <Text style={styles.bold}>{"Problem: Form a team of 4 from 12 and assign roles"}</Text>
        <View style={styles.mathStep}>
          <MaterialCommunityIcons name="numeric-1-circle" size={20} color="#0369A1" />
          <Text style={styles.stepText}>{"Select 4 people: C(12, 4) = 495"}</Text>
        </View>
        <View style={styles.mathStep}>
          <MaterialCommunityIcons name="numeric-2-circle" size={20} color="#0369A1" />
          <Text style={styles.stepText}>{"Assign roles to 4 people: P(4, 4) = 24"}</Text>
        </View>
        <Text style={styles.finalMath}>{"Total: 495 × 24 = "}<Text style={styles.resultGreen}>{"11,880 Ways"}</Text></Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the fundamental concepts of permutations and combinations. We demonstrated how to calculate permutations when order matters and combinations when it does not, providing relavant examples from seating charts to team formation."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  fCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 15 },
  fTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  mathBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', marginBottom: 10 },
  mathText: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  fLogic: { fontSize: 12, color: '#64748B', fontStyle: 'italic', textAlign: 'center' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#166534', marginTop: 5 },
  analogyBox: { flexDirection: 'row', backgroundColor: '#FFFBEB', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B', alignItems: 'center', marginBottom: 15 },
  analogyText: { flex: 1, marginLeft: 12, fontSize: 13, color: '#92400E', lineHeight: 20 },
  appCard: { padding: 15, borderRadius: 12, backgroundColor: '#F0F9FF', marginBottom: 12, borderWidth: 1, borderColor: '#E0F2FE' },
  appTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369A1', marginBottom: 5 },
  appText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  combinedBox: { padding: 15, backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'dashed' },
  mathStep: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  stepText: { marginLeft: 10, fontSize: 13, color: '#475569' },
  finalMath: { textAlign: 'right', fontSize: 14, marginTop: 5, color: '#0F172A' },
  resultGreen: { fontWeight: '900', color: '#16941c' }
});