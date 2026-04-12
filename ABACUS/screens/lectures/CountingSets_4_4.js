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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Sets work on discrete elements and hence they play an important role in counting theory and combinatorics in discrete mathematics. By using sets, we can apply important principles, such as the additive and multiplicative principles, with greater clarity.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will explain how counting works with sets. We will be focusing on important concepts like union, intersection, and Cartesian products.
      </Text>

      {/* --- SECTION 1: THE ADDITIVE PRINCIPLE --- */}
      <Text style={styles.sectionHeader}>The Additive Principle with Sets</Text>
      <Text style={styles.paragraph}>
        This principle tells us how to count when two events or sets are <Text style={styles.bold}>disjoint</Text> (no overlap).
      </Text>

      <SetPrincipleBox 
        title="Union of Disjoint Sets"
        formula="|A ∪ B| = |A| + |B|"
        logic="The total number of elements in the union is the sum of the individual counts."
        icon="set-merge"
        color="#16941c"
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: Shirts and Pants</Text>
        <Text style={styles.exampleText}>
          Imagine we have 9 shirts and 5 pants. On a special day, you will wear <Text style={styles.bold}>either</Text> only a shirt or only pants (not both). {"\n\n"}
          <Text style={styles.bold}>Total choices = 9 + 5 = 14</Text>
        </Text>
      </View>

      <Text style={styles.subHeader}>Extending to More Sets</Text>
      <Text style={styles.paragraph}>
        If we added a third set, like 7 hats, we simply add those to the total as long as they are disjoint: {"\n"}
        <Text style={styles.bold}>Total choices = 9 + 5 + 7 = 21</Text>
      </Text>

      <View style={styles.alertBox}>
        <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#B91C1C" />
        <Text style={styles.alertText}>
          If sets overlap, you must subtract the overlap to avoid counting elements twice.
        </Text>
      </View>

      {/* --- SECTION 2: THE MULTIPLICATIVE PRINCIPLE --- */}
      <Text style={styles.sectionHeader}>The Multiplicative Principle with Sets</Text>
      <Text style={styles.paragraph}>
        This is used when outcomes from one set are paired with outcomes from another set.
      </Text>

      <SetPrincipleBox 
        title="The Cartesian Product"
        formula="|A × B| = |A| · |B|"
        logic="The total number of combinations is the product of the number of elements in each set."
        icon="grid-large"
        color="#0369A1"
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: Complete Outfits</Text>
        <Text style={styles.exampleText}>
          If you wear both a shirt and pants: {"\n"}
          <Text style={styles.bold}>Total outfits = 9 × 5 = 45</Text>
        </Text>
      </View>

      {/* --- CARTESIAN PRODUCT --- */}
      <Text style={styles.subHeader}>Cartesian Product: Pairing Sets</Text>
      <Text style={styles.paragraph}>
        A Cartesian product is a set of ordered pairs $(x, y)$ where $x \in A$ and $y \in B$.
      </Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Example Breakdown:</Text>
        <Text style={styles.codeText}>A = {'{1, 2}'} | B = {'{3, 4, 5}'}</Text>
        <Text style={styles.exampleText}>
          A × B = {'{(1,3), (1,4), (1,5), (2,3), (2,4), (2,5)}'} {"\n"}
          Total = 2 × 3 = <Text style={styles.bold}>6 pairs</Text>.
        </Text>
      </View>

      

      {/* --- SECTION 3: COMBINING PRINCIPLES --- */}
      <Text style={styles.sectionHeader}>Combining Principles</Text>
      <Text style={styles.paragraph}>
        Used when some stages involve disjoint choices and others involve combinations.
      </Text>

      <View style={styles.combinedBox}>
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Scenario:</Text> 9 shirts, 5 pants, 7 hats.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.mathStep}>• To wear all three: 9 × 5 × 7 = <Text style={styles.bold}>315</Text></Text>
        <Text style={styles.mathStep}>• To wear shirt+pant OR shirt+hat:</Text>
        <Text style={styles.mathStep}>  (9 × 5) + (9 × 7) = 45 + 63 = <Text style={styles.bold}>108 choices</Text></Text>
      </View>

      {/* --- SECTION 4: COUNTING FUNCTIONS --- */}
      <Text style={styles.sectionHeader}>Sets and Counting Functions</Text>
      <Text style={styles.paragraph}>
        A function from set A to set B assigns each element of A exactly one element in B.
      </Text>

      <View style={styles.functionCard}>
        <Text style={styles.functionTitle}>Formula for Total Functions:</Text>
        <Text style={styles.functionMath}>kⁿ</Text>
        <Text style={styles.caption}>Where n = |A| (Domain) and k = |B| (Codomain)</Text>
      </View>

      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>
          <Text style={styles.bold}>Example:</Text> From {'{1, 2, 3}'} to {'{a, b, c, d}'}: {"\n"}
          For each of the 3 numbers, there are 4 choices. {"\n"}
          <Text style={styles.bold}>Total = 4³ = 64</Text>
        </Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained how sets provide a framework for counting. We understood how to apply the additive principle for disjoint sets and the multiplicative principle for pairing elements through Cartesian products and functions.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 8, marginTop: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  principleCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderLeftWidth: 6, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  formulaRow: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, alignSelf: 'center', width: '100%', alignItems: 'center', marginBottom: 10, elevation: 1 },
  formulaText: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  logicText: { fontSize: 13, color: '#64748B', fontStyle: 'italic', textAlign: 'center' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#BBF7D0' },
  exampleText: { fontSize: 14, color: '#166534', lineHeight: 22 },
  alertBox: { flexDirection: 'row', padding: 12, backgroundColor: '#FEF2F2', borderRadius: 8, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#FECACA' },
  alertText: { flex: 1, marginLeft: 10, fontSize: 13, color: '#B91C1C', lineHeight: 18 },
  infoBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  codeText: { fontFamily: 'monospace', fontSize: 14, color: '#0369A1', marginVertical: 8, backgroundColor: '#E0F2FE', padding: 10, borderRadius: 6, textAlign: 'center', overflow: 'hidden' },
  functionCard: { backgroundColor: '#104a28', padding: 25, borderRadius: 15, alignItems: 'center', marginBottom: 15 },
  functionTitle: { color: '#BBF7D0', fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  functionMath: { color: 'white', fontSize: 26, fontWeight: '900', fontFamily: 'monospace' },
  caption: { color: '#86EFAC', fontSize: 11, marginTop: 8 },
  combinedBox: { padding: 15, backgroundColor: '#FAFAFA', borderRadius: 12, borderWidth: 1, borderColor: '#CBD5E1', borderStyle: 'dashed', marginBottom: 15 },
  divider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 10 },
  mathStep: { fontSize: 14, color: '#334155', marginBottom: 6, lineHeight: 20 },
});