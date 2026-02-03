import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Custom Visual Mapping Component for Injection, Surjection, and Bijection
const MappingVisual = ({ type }) => {
  const isSurjective = type === 'surjective' || type === 'bijective';
  const isInjective = type === 'injective' || type === 'bijective';

  return (
    <View style={styles.mappingOuter}>
      <View style={styles.mappingContainer}>
        {/* Domain Set A */}
        <View style={styles.setEllipse}>
          <Text style={styles.setLabel}>A</Text>
          <View style={styles.point} /><View style={styles.point} /><View style={styles.point} />
          {type === 'surjective' && <View style={styles.point} />}
        </View>

        {/* Dynamic Mapping Arrows */}
        <View style={styles.arrowSpace}>
          <View style={styles.arrow} />
          <View style={styles.arrow} />
          <View style={styles.arrow} />
        </View>

        {/* Codomain Set B */}
        <View style={styles.setEllipse}>
          <Text style={styles.setLabel}>B</Text>
          <View style={[styles.point, {backgroundColor: isInjective ? '#16941c' : '#94A3B8'}]} />
          <View style={[styles.point, {backgroundColor: isSurjective ? '#16941c' : '#94A3B8'}]} />
          <View style={styles.point} />
        </View>
      </View>
      <Text style={styles.caption}>
        {type === 'surjective' && "Surjection: Every element in B is covered."}
        {type === 'injective' && "Injection: No two elements map to the same image."}
        {type === 'bijective' && "Bijection: Both one-to-one and onto."}
      </Text>
    </View>
  );
};

export default function FunctionProperties_1_12() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        To fully understand functions, we need to understand three key concepts: <Text style={styles.bold}>surjection, injection, and bijection</Text>. These properties define how elements of the domain relate to the codomain.
      </Text>

      {/* SECTION: SURJECTION */}
      <Text style={styles.sectionHeader}>Surjection Functions ("Onto")</Text>
      <MappingVisual type="surjective" />
      <Text style={styles.paragraph}>
        A surjective function is one where <Text style={styles.bold}>every element in the codomain</Text> is the image of at least one element in the domain. In simpler words, there are no unused elements in the codomain.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example: f: {"{1, 2, 3} → {a, b}"}</Text>
        <Text style={styles.exampleText}>f(1)=a, f(2)=a, f(3)=b. (Surjective because both a and b are "hit").</Text>
      </View>

      {/* SECTION: INJECTION */}
      <Text style={styles.sectionHeader}>Injection Functions ("One-to-One")</Text>
      <MappingVisual type="injective" />
      <Text style={styles.paragraph}>
        An injective function shows that no two different elements in the domain map to the same element in the codomain. There are no "repeated" images.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example: f: Z → Z, f(n) = 3n.</Text>
        <Text style={styles.exampleText}>Every input produces a unique result; it is injective.</Text>
      </View>

      {/* SECTION: BIJECTION */}
      <Text style={styles.sectionHeader}>Bijection: The Perfect Function</Text>
      <MappingVisual type="bijective" />
      <Text style={styles.paragraph}>
        A function is bijective if it is <Text style={styles.bold}>both injective and surjective</Text>. It pairs every element in the domain with exactly one element in the codomain with no repeats and no leftovers.
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>f(x) = 2x + 3 is Bijective on R.</Text>
      </View>

      {/* COMPARISON SUMMARY */}
      <Text style={styles.sectionHeader}>Combining Concepts</Text>
      <View style={styles.comparisonBox}>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>A function can be injective but miss elements in the codomain (Not surjective).</Text>
        </View>
        <View style={styles.bulletItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>A function can be surjective but reuse elements (Not injective).</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained surjection, injection, and bijection. We learned that surjection covers the codomain, injection avoids reuse, and bijection does both. We also noted that <Text style={styles.bold}>inverse functions</Text> only exist for bijections.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 5 },
  formulaBox: { backgroundColor: '#104a28', padding: 15, borderRadius: 12, alignItems: 'center' },
  formulaText: { color: 'white', fontWeight: 'bold', fontFamily: 'monospace' },
  comparisonBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10 },
  bulletItem: { flexDirection: 'row', marginBottom: 8 },
  bullet: { color: '#166534', marginRight: 10, fontSize: 18 },
  bulletText: { flex: 1, fontSize: 14, color: '#166534' },
  
  // Mapping Visualization
  mappingOuter: { alignItems: 'center', marginVertical: 20 },
  mappingContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '90%' },
  setEllipse: { width: 70, height: 120, borderRadius: 35, borderWidth: 2, borderColor: '#16941c', alignItems: 'center', justifyContent: 'space-evenly' },
  setLabel: { position: 'absolute', top: -25, fontWeight: 'bold', color: '#64748B' },
  point: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#16941c' },
  arrowSpace: { width: 60, alignItems: 'center', justifyContent: 'space-evenly', height: 80 },
  arrow: { width: '100%', height: 2, backgroundColor: '#CBD5E1' },
  caption: { fontSize: 11, color: '#94A3B8', marginTop: 15, fontStyle: 'italic', textAlign: 'center' }
});