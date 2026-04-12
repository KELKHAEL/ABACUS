import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BitStrings_4_6() {
  
  // Custom Component for Bit String Properties
  const PropertyCard = ({ title, definition, examples, icon, color }) => (
    <View style={[styles.propCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.propDef}>{definition}</Text>
      <View style={styles.exampleBox}>
        {examples.map((ex, i) => (
           <Text key={i} style={styles.exampleText}><Text style={styles.bold}>• </Text>{ex}</Text>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>bit string</Text> is a sequence made up of binary digits. They are commonly referred to as <Text style={styles.bold}>bits</Text>. These bits take values of 0 or 1, which makes them the fundamental building blocks of many computational and theoretical concepts.
      </Text>

      {/* --- SECTION 1: LENGTH AND WEIGHT --- */}
      <Text style={styles.sectionHeader}>Length and Weight of Bit Strings</Text>
      <Text style={styles.paragraph}>
        Beyond just being a sequence, bit strings have two primary properties used in discrete mathematics:
      </Text>
      
      <PropertyCard 
        title="Length"
        icon="arrow-left-right"
        color="#0369A1"
        definition="The total number of binary digits (bits) the string contains."
        examples={['"0" has a length of 1.', '"1001" has a length of 4.', '"101010" has a length of 6.']}
      />

      <PropertyCard 
        title="Weight"
        icon="weight"
        color="#16941c"
        definition="The total number of 1s present in the bit string."
        examples={['"0" weight = 0 (no 1s).', '"1001" weight = 2 (two 1s).', '"1111" weight = 4 (all 1s).']}
      />

      {/* --- SECTION 2: SET NOTATION --- */}
      <Text style={styles.sectionHeader}>Sets of Bit Strings</Text>
      <Text style={styles.paragraph}>We use specific mathematical notations to describe these sets:</Text>
      
      <View style={styles.notationBox}>
        <Text style={styles.notationText}><Text style={styles.bold}>Bⁿ:</Text> The set of all bit strings of length n.</Text>
        <Text style={styles.notationText}><Text style={styles.bold}>Bⁿₖ:</Text> The set of all bit strings of length n that have a weight of k (exactly k 1s).</Text>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.listTitle}>Visualizing B³ (Length 3)</Text>
        <Text style={styles.codeText}>000, 001, 010, 011, 100, 101, 110, 111</Text>
        <View style={styles.divider} />
        <Text style={styles.listTitleSmall}>Subset B³₂ (Length 3, Weight 2):</Text>
        <Text style={styles.codeText}>011, 101, 110</Text>
      </View>

      {/* --- SECTION 3: COUNTING MECHANISMS --- */}
      <Text style={styles.sectionHeader}>Counting Bit Strings</Text>
      <Text style={styles.paragraph}>
        Since each position in a string of length $n$ has two choices (0 or 1), we apply the multiplicative principle:
      </Text>
      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaLabel}>Total Strings of Length n:</Text>
        <Text style={styles.formulaText}>2ⁿ</Text>
        <Text style={styles.caption}>A string of length 5 has 2 × 2 × 2 × 2 × 2 = 32 possibilities.</Text>
      </View>

      {/* --- SECTION 4: BIT STRINGS AND SUBSETS --- */}
      <Text style={styles.sectionHeader}>Bit Strings and Subsets</Text>
      <Text style={styles.paragraph}>
        Bit strings are a way to represent subsets of a set. If set A = {'{1, 2, 3, 4, 5}'}, deciding whether an element is in the subset is like picking a 0 or 1.
      </Text>
      <View style={styles.mappingBox}>
        <Text style={styles.mappingText}>• <Text style={styles.bold}>"11001"</Text> represents subset {'{1, 2, 5}'}.</Text>
        <Text style={styles.mappingText}>• <Text style={styles.bold}>"00101"</Text> represents subset {'{3, 5}'}.</Text>
        <Text style={[styles.mappingText, {marginTop: 5, fontStyle: 'italic'}]}>Finding 5-bit strings with weight 3 is identical to counting subsets of size 3.</Text>
      </View>

      {/* --- SECTION 5: RECURRENCE RELATIONS --- */}
      <Text style={styles.sectionHeader}>Recurrence Relations</Text>
      <Text style={styles.paragraph}>
        To count strings of length 5 and weight 3 ($|B⁵₃|$), we can break it into two cases based on how the string starts:
      </Text>
      <View style={styles.caseBox}>
        <Text style={styles.caseText}><Text style={styles.bold}>Case 1: Starts with 0.</Text> We need to find three 1s in the remaining 4 spots. This is $|B⁴₃|$.</Text>
        <Text style={styles.caseText}><Text style={styles.bold}>Case 2: Starts with 1.</Text> We need to find two 1s in the remaining 4 spots. This is $|B⁴₂|$.</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.recurrenceFormula}>|B⁵₃| = |B⁴₂| + |B⁴₃|</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explored bit strings, their length, and their weight. We understood how to define sets of bit strings and count them using the multiplicative principle and recurrence relations, highlighting their deep connection to set theory and subsets.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  propCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  propDef: { fontSize: 14, color: '#475569', lineHeight: 20 },
  exampleBox: { marginTop: 10, padding: 10, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  exampleText: { fontSize: 13, color: '#64748B', marginBottom: 4 },
  notationBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#BAE6FD' },
  notationText: { fontSize: 14, color: '#0369A1', marginBottom: 8, lineHeight: 20 },
  listCard: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  listTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  listTitleSmall: { fontSize: 14, fontWeight: 'bold', color: '#475569', marginBottom: 5 },
  codeText: { fontFamily: 'monospace', fontSize: 14, color: '#0F172A', letterSpacing: 1, lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 12 },
  formulaHighlight: { backgroundColor: '#104a28', padding: 25, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  formulaLabel: { color: '#BBF7D0', fontSize: 14, marginBottom: 5, fontWeight: '600' },
  formulaText: { color: 'white', fontSize: 28, fontWeight: '900', fontFamily: 'monospace' },
  caption: { color: '#86EFAC', fontSize: 12, marginTop: 10, textAlign: 'center', lineHeight: 18 },
  mappingBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 20 },
  mappingText: { fontSize: 14, color: '#166534', marginBottom: 6, lineHeight: 20 },
  caseBox: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 20 },
  caseText: { fontSize: 14, color: '#9A3412', marginBottom: 10, lineHeight: 22 },
  dividerLight: { height: 1, backgroundColor: '#FFEDD5', marginVertical: 12 },
  recurrenceFormula: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#C2410C', fontFamily: 'monospace' }
});