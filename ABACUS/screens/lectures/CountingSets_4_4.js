import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CountingSets_4_4() {
  
  // Custom Component for Set Principles
  const SetPrincipleBox = ({ title, formula, logic, icon, color }) => (
    <View style={[styles.principleCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <View style={styles.formulaRow}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
      <Text style={styles.logicText}>{logic}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        Sets work on discrete elements and play an important role in counting theory and combinatorics. By using sets, we can apply principles like addition and multiplication with much greater clarity.
      </Text>

      {/* SECTION 1: ADDITIVE PRINCIPLE WITH SETS */}
      <Text style={styles.sectionHeader}>The Additive Principle with Sets</Text>
      <Text style={styles.paragraph}>
        This principle applies when sets are <Text style={styles.bold}>disjoint</Text> (meaning there is no overlap between them).
      </Text>

      <SetPrincipleBox 
        title="Union of Disjoint Sets"
        formula="|A ∪ B| = |A| + |B|"
        logic="The total number of elements is simply the sum of individual sets."
        icon="set-merge"
        color="#16941c"
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: Exclusive Choice</Text>
        <Text style={styles.exampleText}>
          If you have 9 shirts and 5 pants and you will wear <Text style={styles.bold}>either</Text> a shirt or only pants (not both): {"\n"}
          Total choices = 9 + 5 = <Text style={styles.bold}>14</Text>.
        </Text>
      </View>

      <View style={styles.alertBox}>
        <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#B91C1C" />
        <Text style={styles.alertText}>
          If sets overlap, you must subtract the overlap ($|A \cap B|$) to avoid double-counting elements.
        </Text>
      </View>

      {/* SECTION 2: MULTIPLICATIVE PRINCIPLE WITH SETS */}
      <Text style={styles.sectionHeader}>The Multiplicative Principle with Sets</Text>
      <Text style={styles.paragraph}>
        This tells us how to count when outcomes from one set are paired with outcomes from another.
      </Text>

      <SetPrincipleBox 
        title="The Cartesian Product"
        formula="|A × B| = |A| · |B|"
        logic="Every element in A is paired with every element in B."
        icon="grid-large"
        color="#0369A1"
      />

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Formal Cartesian Definition:</Text>
        <Text style={styles.codeText}>A × B = {'{(x, y) | x ∈ A, y ∈ B}'}</Text>
        <Text style={styles.exampleText}>
          If A = {'{1, 2}'} and B = {'{3, 4, 5}'}, then: {"\n"}
          A × B = {'{(1,3), (1,4), (1,5), (2,3), (2,4), (2,5)}'} {"\n"}
          Total = 2 × 3 = <Text style={styles.bold}>6 pairs</Text>.
        </Text>
      </View>

      {/* SECTION 3: COUNTING FUNCTIONS */}
      <Text style={styles.sectionHeader}>Sets and Counting Functions</Text>
      <Text style={styles.paragraph}>
        A function from set A to set B assigns each element of A exactly one element in B.
      </Text>

      <View style={styles.functionCard}>
        <Text style={styles.functionTitle}>Total Possible Functions:</Text>
        <Text style={styles.functionMath}>Total = kⁿ</Text>
        <Text style={styles.caption}>Where n = |Domain| and k = |Codomain|</Text>
      </View>

      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Example:</Text> How many functions from {'{1, 2, 3}'} to {'{a, b, c, d}'}? {"\n"}
          Total = 4³ = <Text style={styles.bold}>64 functions</Text>.
        </Text>
      </View>

      {/* SECTION 4: COMBINING EVERYTHING */}
      <Text style={styles.sectionHeader}>Combining Principles</Text>
      <View style={styles.combinedBox}>
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Scenario:</Text> Dress casually with a shirt and pant, OR a shirt and hat (9 shirts, 5 pants, 7 hats).
        </Text>
        <View style={styles.divider} />
        <Text style={styles.mathStep}>1. Shirt + Pant = 9 × 5 = 45</Text>
        <Text style={styles.mathStep}>2. Shirt + Hat = 9 × 7 = 63</Text>
        <Text style={styles.resultRow}>Total Choices = 45 + 63 = <Text style={styles.bold}>108</Text></Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        Sets provide the framework for understanding addition of disjoint groups and multiplication of paired elements through Cartesian products. By mastering these set-based relationships, we can count everything from simple outfits to complex mathematical functions.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  principleCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderLeftWidth: 6, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  formulaRow: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, alignSelf: 'center', width: '100%', alignItems: 'center', marginBottom: 10, elevation: 1 },
  formulaText: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  logicText: { fontSize: 13, color: '#64748B', fontStyle: 'italic', textAlign: 'center' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#166534', lineHeight: 20 },
  alertBox: { flexDirection: 'row', padding: 12, backgroundColor: '#FEF2F2', borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  alertText: { flex: 1, marginLeft: 10, fontSize: 12, color: '#B91C1C', lineHeight: 18 },
  infoBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, marginBottom: 20 },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#0369A1', marginVertical: 8, backgroundColor: '#E0F2FE', padding: 8, borderRadius: 6, textAlign: 'center' },
  functionCard: { backgroundColor: '#104a28', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 15 },
  functionTitle: { color: '#BBF7D0', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  functionMath: { color: 'white', fontSize: 24, fontWeight: '900', fontFamily: 'monospace' },
  caption: { color: '#86EFAC', fontSize: 11, marginTop: 5 },
  combinedBox: { padding: 15, backgroundColor: '#FAFAFA', borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', borderStyle: 'dashed' },
  divider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 10 },
  mathStep: { fontSize: 14, color: '#475569', marginBottom: 5 },
  resultRow: { fontSize: 15, color: '#0F172A', marginTop: 10, textAlign: 'right' }
});