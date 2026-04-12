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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In discrete mathematics and combinatorics, we work with counting problems a lot and we aim to calculate the number of ways certain outcomes can be produced. Additive and multiplicative principles are useful in calculating the total number of possible outcomes in a variety of problems.
      </Text>

      {/* --- SECTION 1: THE ADDITIVE PRINCIPLE --- */}
      <Text style={styles.sectionHeader}>The Additive Principle</Text>
      <Text style={styles.paragraph}>
        The concept of additive principle is applied when there are two or more <Text style={styles.bold}>mutually exclusive</Text> events. These events cannot happen simultaneously.
      </Text>

      <PrincipleCard 
        title="Additive Rule"
        color="#16941c"
        logic="If event A occurs in m ways and event B occurs in n ways, and they are disjoint..."
        formula="Total Outcomes = m + n"
      />

      <StepExample 
        title="Example 1: Menu Choices"
        scenario="Choosing one dish from 8 appetizers or 14 entrees."
        math="8 + 14"
        result="22 Options"
      />

      <View style={styles.noteBox}>
        <Text style={styles.noteTitle}>Warning: The Overlap Problem</Text>
        <Text style={styles.noteText}>
          If you select a card that is either Red (26) or a Face card (12), you must subtract the 6 cards that are BOTH red and face cards to avoid double-counting.
          {"\n"}<Text style={styles.bold}>Calculation: 26 + 12 - 6 = 32.</Text>
        </Text>
      </View>

      <StepExample 
        title="Example 3: Letter Pairs"
        scenario="Two-letter words starting with 'A' (26 possible) or 'B' (26 possible)."
        math="26 + 26"
        result="52 Words"
      />

      {/* --- SECTION 2: THE MULTIPLICATIVE PRINCIPLE --- */}
      <Text style={styles.sectionHeader}>The Multiplicative Principle</Text>
      <Text style={styles.paragraph}>
        This is used when each event can happen <Text style={styles.bold}>independently</Text> of the others, often in a sequence.
      </Text>

      <PrincipleCard 
        title="Multiplicative Rule"
        color="#0369A1"
        logic="If event A occurs in m ways, and then event B occurs in n ways..."
        formula="Total Outcomes = m × n"
      />

      <StepExample 
        title="Example 1: License Plates"
        scenario="3 letters (26 choices each) followed by 3 numbers (10 choices each)."
        math="26³ × 10³"
        result="17,576,000"
      />

      <StepExample 
        title="Example 3: Counting Functions"
        scenario="Functions from set {1,2,3,4,5} to {a,b,c,d}. Each of 5 inputs has 4 choices."
        math="4 × 4 × 4 × 4 × 4"
        result="1,024 Functions"
      />

      {/* --- SECTION 3: COMBINING BOTH --- */}
      <Text style={styles.sectionHeader}>Combining Both Principles</Text>
      <Text style={styles.paragraph}>
        This happens when there are different stages of decision-making. Some involve exclusive choices, others involve independent ones.
      </Text>

      <View style={styles.combinedCard}>
        <Text style={styles.bold}>Example: Clothing (9 shirts, 5 pants)</Text>
        <View style={styles.stageRow}>
          <View style={styles.stage}>
            <Text style={styles.stageLabel}>Regular Day (Both)</Text>
            <Text style={styles.stageMath}>9 × 5 = 45 Outfits</Text>
            <Text style={styles.tinyDesc}>(Multiplicative)</Text>
          </View>
          <View style={styles.stage}>
            <Text style={styles.stageLabel}>Special Day (Either)</Text>
            <Text style={styles.stageMath}>9 + 5 = 14 Choices</Text>
            <Text style={styles.tinyDesc}>(Additive)</Text>
          </View>
        </View>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        We explained how the additive principle helps calculate ways between mutually exclusive options and how the multiplicative principle finds outcomes for independent choices. These form the core of combinatorial analysis in discrete mathematics.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  pCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 4, marginBottom: 15 },
  pTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  pLogic: { fontSize: 13, color: '#475569', marginBottom: 10, fontStyle: 'italic' },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontWeight: 'bold', color: '#0F172A', fontSize: 14 },
  
  exCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  exTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  exScenario: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  mathRow: { flexDirection: 'row', alignItems: 'center' },
  mathText: { fontSize: 14, color: '#0369A1', fontWeight: 'bold', fontFamily: 'monospace', marginRight: 10 },
  resultText: { fontSize: 14, color: '#16941c', fontWeight: '900', marginLeft: 10 },
  
  noteBox: { backgroundColor: '#FEF2F2', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#EF4444', marginVertical: 10 },
  noteTitle: { fontSize: 13, fontWeight: 'bold', color: '#991B1B', marginBottom: 4 },
  noteText: { fontSize: 12, color: '#B91C1C', lineHeight: 18 },
  
  combinedCard: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD', marginVertical: 10 },
  stageRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  stage: { width: '48%', alignItems: 'center' },
  stageLabel: { fontSize: 10, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 5 },
  stageMath: { fontSize: 14, color: '#0369A1', fontWeight: 'bold' },
  tinyDesc: { fontSize: 10, color: '#94A3B8', fontStyle: 'italic', marginTop: 2 },
});