import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Principles_4_3() {
  
  // Custom Component for Principle Definitions
  const PrincipleCard = ({ title, logic, formula, color }) => (
    <View style={[styles.pCard, { borderTopColor: color }]}>
      <Text style={[styles.pTitle, { color: color }]}>{title}</Text>
      <Text style={styles.pLogic}>{logic}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
    </View>
  );

  // Custom Component for Step-by-Step Examples
  const StepExample = ({ title, scenario, math, result }) => (
    <View style={styles.exCard}>
      <Text style={styles.exTitle}>{title}</Text>
      <Text style={styles.exScenario}>{scenario}</Text>
      <View style={styles.mathRow}>
        <Text style={styles.mathText}>{math}</Text>
        <MaterialCommunityIcons name="arrow-right" size={16} color="#64748B" />
        <Text style={styles.resultText}>{result}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        In discrete mathematics and combinatorics, we work with counting problems to calculate the number of ways certain outcomes can be produced. These principles are useful in everything from simple menu choices at a restaurant to complex functions and sets.
      </Text>

      {/* SECTION 1: THE TWO PRINCIPLES */}
      <Text style={styles.sectionHeader}>Core Counting Principles</Text>
      
      <PrincipleCard 
        title="The Additive Principle"
        color="#16941c"
        logic="Applied when events are mutually exclusive (cannot happen at the same time)."
        formula="Total Outcomes = m + n"
      />

      <PrincipleCard 
        title="The Multiplicative Principle"
        color="#0369A1"
        logic="Used when events happen independently or sequentially."
        formula="Total Outcomes = m × n"
      />

      {/* SECTION 2: ADDITIVE EXAMPLES */}
      <Text style={styles.sectionHeader}>Additive Principle in Practice</Text>
      
      <StepExample 
        title="Example 1: Menu Selection"
        scenario="A restaurant offers 8 appetizers and 14 entrees. You choose only ONE dish."
        math="8 + 14"
        result="22 Options"
      />

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>The Overlap Problem (Inclusion-Exclusion)</Text>
        <Text style={styles.noteText}>
          If you have 26 red cards and 12 face cards, but 6 cards are BOTH red and face cards, you must subtract the overlap to avoid double-counting: 26 + 12 - 6 = 32.
        </Text>
      </View>

      {/* SECTION 3: MULTIPLICATIVE EXAMPLES */}
      <Text style={styles.sectionHeader}>Multiplicative Principle in Practice</Text>
      
      <StepExample 
        title="Example 1: License Plates"
        scenario="Creating a plate with 3 letters followed by 3 numbers. Each choice is independent."
        math="26³ × 10³"
        result="17,576,000"
      />

      <StepExample 
        title="Example 2: Yogurt Toppings"
        scenario="Choosing from 6 yogurt flavors and 4 different toppings."
        math="6 × 4"
        result="24 Combos"
      />

      {/* SECTION 4: COMBINING BOTH */}
      <Text style={styles.sectionHeader}>Combining Both Principles</Text>
      <Text style={styles.paragraph}>
        Sometimes, decision-making involves multiple stages where some choices are exclusive and others are sequential.
      </Text>

      <View style={styles.combinedCard}>
        <Text style={styles.bold}>Example: Choosing an Outfit (9 shirts, 5 pants)</Text>
        <View style={styles.stageRow}>
          <View style={styles.stage}>
            <Text style={styles.stageLabel}>Sequential (Both)</Text>
            <Text style={styles.stageMath}>9 × 5 = 45</Text>
          </View>
          <View style={styles.stage}>
            <Text style={styles.stageLabel}>Exclusive (Either)</Text>
            <Text style={styles.stageMath}>9 + 5 = 14</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained how the additive principle helps when choosing between mutually exclusive options and how the multiplicative principle finds total outcomes for independent choices. We explored these through everyday examples like license plates, restaurant menus, and clothing.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  pCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 4, marginBottom: 15 },
  pTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  pLogic: { fontSize: 13, color: '#475569', marginBottom: 10, fontStyle: 'italic' },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 8, borderRadius: 6, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontWeight: 'bold', color: '#0F172A' },
  exCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  exTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  exScenario: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  mathRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mathText: { fontSize: 14, color: '#0369A1', fontWeight: 'bold', fontFamily: 'monospace' },
  resultText: { fontSize: 14, color: '#16941c', fontWeight: '900' },
  noteBox: { backgroundColor: '#FEF2F2', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#EF4444', marginVertical: 10 },
  noteTitle: { fontSize: 13, fontWeight: 'bold', color: '#991B1B', marginBottom: 4 },
  noteText: { fontSize: 12, color: '#B91C1C', lineHeight: 18 },
  combinedCard: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD' },
  stageRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  stage: { width: '48%', alignItems: 'center' },
  stageLabel: { fontSize: 11, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase' },
  stageMath: { fontSize: 15, color: '#0369A1', fontWeight: 'bold', marginTop: 5 }
});