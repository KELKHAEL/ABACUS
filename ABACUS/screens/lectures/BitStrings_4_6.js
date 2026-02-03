import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BitStrings_4_6() {
  
  // Custom Component for Bit String Properties
  const PropertyCard = ({ title, definition, example, icon, color }) => (
    <View style={[styles.propCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.propDef}>{definition}</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Ex: </Text>{example}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>bit string</Text> is a sequence made up of binary digits, commonly referred to as <Text style={styles.bold}>bits</Text>. These bits take values of 0 or 1, making them the fundamental building blocks of computational and theoretical concepts in discrete mathematics.
      </Text>

      {/* SECTION 1: LENGTH AND WEIGHT */}
      <Text style={styles.sectionHeader}>Length and Weight of Bit Strings</Text>
      
      <PropertyCard 
        title="Length"
        icon="arrow-left-right"
        color="#0369A1"
        definition="The total number of binary digits (bits) a string contains."
        example='"101010" has a length of 6.'
      />

      <PropertyCard 
        title="Weight"
        icon="weight"
        color="#16941c"
        definition="The total number of 1s present in the bit string."
        example='For "1111", the weight is 4 because all digits are 1s.'
      />

      {/* SECTION 2: SET NOTATION */}
      <Text style={styles.sectionHeader}>Sets of Bit Strings</Text>
      <Text style={styles.paragraph}>We use specific notations to describe sets based on these properties:</Text>
      
      <View style={styles.notationBox}>
        <Text style={styles.notationText}><Text style={styles.bold}>Bⁿ:</Text> Set of all bit strings of length n.</Text>
        <Text style={styles.notationText}><Text style={styles.bold}>Bⁿₖ:</Text> Set of strings of length n with a weight of k.</Text>
      </View>

      <View style={styles.listCard}>
        <Text style={styles.listTitle}>Example Set B³</Text>
        <Text style={styles.codeText}>000, 001, 010, 011, 100, 101, 110, 111</Text>
        <View style={styles.divider} />
        <Text style={styles.listTitleSmall}>Subset B³₂ (Length 3, Weight 2):</Text>
        <Text style={styles.codeText}>011, 101, 110</Text>
      </View>

      {/* SECTION 3: COUNTING MECHANISMS */}
      <Text style={styles.sectionHeader}>Counting Bit Strings</Text>
      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaLabel}>Total Strings of Length n:</Text>
        <Text style={styles.formulaText}>2ⁿ</Text>
        <Text style={styles.caption}>Example: Length 5 = 2⁵ = 32 strings.</Text>
      </View>

      {/* SECTION 4: BIT STRINGS AND SUBSETS */}
      <Text style={styles.sectionHeader}>Bit Strings and Subsets</Text>
      <Text style={styles.paragraph}>
        Bit strings are directly related to subsets. If set A = {'{1, 2, 3, 4, 5}'}, each element's presence can be mapped to 1 (in subset) or 0 (not in subset).
      </Text>
      <View style={styles.mappingBox}>
        <Text style={styles.mappingText}>• <Text style={styles.bold}>"11001"</Text> represents subset {'{1, 2, 5}'}.</Text>
        <Text style={styles.mappingText}>• <Text style={styles.bold}>"00101"</Text> represents subset {'{3, 5}'}.</Text>
      </View>

      {/* SECTION 5: RECURRENCE RELATIONS */}
      <Text style={styles.sectionHeader}>Recurrence Relations and Counting</Text>
      <Text style={styles.paragraph}>
        Complex counting can be broken into cases. For length 5 with weight 3:
      </Text>
      <View style={styles.caseBox}>
        <Text style={styles.caseText}>1. <Text style={styles.bold}>Starts with 0:</Text> Choose three 1s from remaining four positions (|B⁴₃|).</Text>
        <Text style={styles.caseText}>2. <Text style={styles.bold}>Starts with 1:</Text> Choose two 1s from remaining four positions (|B⁴₂|).</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.recurrenceFormula}>|B⁵₃| = |B⁴₂| + |B⁴₃|</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained what bit strings are and how they are used in discrete mathematics. We covered length, weight, and set mapping, illustrating how similar counting problems arise in different contexts through recurrence relations.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  propCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 8 },
  propDef: { fontSize: 13, color: '#475569', lineHeight: 18 },
  exampleBox: { marginTop: 10, padding: 8, backgroundColor: '#FFF', borderRadius: 6, borderWidth: 1, borderColor: '#F1F5F9' },
  exampleText: { fontSize: 12, color: '#64748B', fontStyle: 'italic' },
  notationBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, marginBottom: 15 },
  notationText: { fontSize: 14, color: '#0369A1', marginBottom: 5 },
  listCard: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, marginBottom: 20 },
  listTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginBottom: 5 },
  listTitleSmall: { fontSize: 13, fontWeight: 'bold', color: '#475569', marginBottom: 5 },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#0F172A', letterSpacing: 1 },
  divider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 12 },
  formulaHighlight: { backgroundColor: '#104a28', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  formulaLabel: { color: '#BBF7D0', fontSize: 13, marginBottom: 5 },
  formulaText: { color: 'white', fontSize: 24, fontWeight: '900', fontFamily: 'monospace' },
  caption: { color: '#86EFAC', fontSize: 11, marginTop: 8, textAlign: 'center' },
  mappingBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 20 },
  mappingText: { fontSize: 13, color: '#166534', marginBottom: 5 },
  caseBox: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 20 },
  caseText: { fontSize: 13, color: '#9A3412', marginBottom: 8, lineHeight: 18 },
  dividerLight: { height: 1, backgroundColor: '#FFEDD5', marginVertical: 10 },
  recurrenceFormula: { textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#C2410C', fontFamily: 'monospace' }
});