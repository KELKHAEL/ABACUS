import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Custom Function Mapping Visualization
const FunctionMapping = ({ type }) => {
  return (
    <View style={styles.mappingOuter}>
      <View style={styles.setContainer}>
        {/* Domain Set X */}
        <View style={styles.setCircle}>
          <Text style={styles.setLabel}>X</Text>
          <View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} />
        </View>
        {/* Mapping Arrows Placeholder */}
        <View style={styles.arrowContainer}>
          <Text style={styles.fLabel}>f: X → Y</Text>
          <View style={styles.arrowLine} />
          <View style={styles.arrowLine} />
        </View>
        {/* Codomain Set Y */}
        <View style={styles.setCircle}>
          <Text style={styles.setLabel}>Y</Text>
          <View style={styles.dot} /><View style={styles.dot} /><View style={styles.dot} />
        </View>
      </View>
      <Text style={styles.captionText}>
        {type === 'def' && "Function mapping: Each element in X has exactly one image in Y."}
        {type === 'composition' && "Composition: mapping (g ∘ f)(x) = g(f(x))."}
      </Text>
    </View>
  );
};

export default function Functions_1_11() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>Function</Text> assigns to each element of a set, exactly one element of a related set. Functions find application in fields like computational complexity, counting objects, and the study of sequences and strings.
      </Text>

      <Text style={styles.sectionHeader}>Function - Definition</Text>
      <FunctionMapping type="def" />
      <Text style={styles.paragraph}>
        A function or mapping (Defined as <Text style={styles.bold}>f: X → Y</Text>) is a relationship from elements of one non-empty set X to elements of another non-empty set Y. 
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.bulletText}>• <Text style={styles.bold}>Domain:</Text> Set X is called the Domain.</Text>
        <Text style={styles.bulletText}>• <Text style={styles.bold}>Codomain:</Text> Set Y is called the Codomain.</Text>
        <Text style={styles.bulletText}>• For each x ∈ X, there exists a unique y ∈ Y. x is the <Text style={styles.bold}>pre-image</Text> and y is the <Text style={styles.bold}>image</Text>.</Text>
      </View>

      {/* TYPES OF FUNCTIONS */}
      <Text style={styles.sectionHeader}>Types of Functions</Text>

      <Text style={styles.subHeader}>1. Injective / One-to-one Function</Text>
      <Text style={styles.paragraph}>
        A function is injective if for every b ∈ B, there exists at most one a ∈ A such that f(a) = b. This means a₁ ≠ a₂ implies f(a₁) ≠ f(a₂).
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• f: N → N, f(x) = 5x is injective.</Text>
        <Text style={styles.exampleText}>• f: R → R, f(x) = x² is NOT injective (e.g., (-2)² = 2²).</Text>
      </View>

      <Text style={styles.subHeader}>2. Surjective / Onto Function</Text>
      <Text style={styles.paragraph}>
        A function is surjective if the image of f equals its range. Equivalently, for every b ∈ B, there exists some a ∈ A such that f(a) = b.
      </Text>

      <Text style={styles.subHeader}>3. Bijective / One-to-one Correspondent</Text>
      <Text style={styles.paragraph}>
        A function is bijective if and only if f is <Text style={styles.bold}>both</Text> injective and surjective.
      </Text>

      {/* INVERSE FUNCTIONS */}
      <Text style={styles.sectionHeader}>Inverse of a Function</Text>
      <Text style={styles.paragraph}>
        The <Text style={styles.bold}>inverse</Text> of a one-to-one corresponding function f: A → B, is the function g: B → A. It holds the property: <Text style={styles.bold}>f(x) = y ⇔ g(y) = x</Text>.
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>f: Z → Z, f(x) = x + 5</Text>
        <Text style={styles.formulaText}>g: Z → Z, g(x) = x - 5 (Invertible)</Text>
      </View>

      {/* COMPOSITION */}
      <Text style={styles.sectionHeader}>Composition of Functions</Text>
      <FunctionMapping type="composition" />
      <Text style={styles.paragraph}>
        Two functions f: A → B and g: B → C can be composed to give a composition <Text style={styles.bold}>g ∘ f</Text>. This is defined by (g ∘ f)(x) = g(f(x)).
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example Case:</Text>
        <Text style={styles.exampleText}>Let f(x) = x + 2 and g(x) = 2x + 1</Text>
        <Text style={styles.exampleText}>(g ∘ f)(x) = g(x + 2) = 2(x + 2) + 1 = 2x + 5</Text>
      </View>

      <View style={styles.lawBox}>
        <Text style={styles.lawTitle}>Facts about Composition</Text>
        <Text style={styles.lawText}>• If f and g are one-to-one, (g ∘ f) is one-to-one.</Text>
        <Text style={styles.lawText}>• If f and g are onto, (g ∘ f) is onto.</Text>
        <Text style={styles.lawText}>• Holds Associative property, but NOT Commutative.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concept of functions, their types including injective, surjective, and bijective, and explored operations like inverse and composition.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 15 },
  bulletText: { fontSize: 14, color: '#0369A1', marginBottom: 8, lineHeight: 20 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 5 },
  formulaBox: { backgroundColor: '#104a28', padding: 15, borderRadius: 12, marginVertical: 10, alignItems: 'center' },
  formulaText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 13 },
  lawBox: { backgroundColor: '#FDF2F8', padding: 15, borderRadius: 12, marginVertical: 15 },
  lawTitle: { fontSize: 15, fontWeight: 'bold', color: '#BE185D', marginBottom: 8 },
  lawText: { fontSize: 13, color: '#9D174D', marginBottom: 5 },
  
  // Mapping Visualization Styles
  mappingOuter: { alignItems: 'center', marginVertical: 20 },
  setContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%' },
  setCircle: { width: 60, height: 100, borderRadius: 30, borderWidth: 2, borderColor: '#16941c', alignItems: 'center', justifyContent: 'space-evenly' },
  setLabel: { position: 'absolute', top: -25, fontWeight: 'bold', color: '#334155' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#16941c' },
  arrowContainer: { alignItems: 'center', flex: 1 },
  fLabel: { fontSize: 12, fontStyle: 'italic', marginBottom: 10, color: '#64748B' },
  arrowLine: { width: '80%', height: 2, backgroundColor: '#CBD5E1', marginVertical: 5 },
  captionText: { fontSize: 11, color: '#94A3B8', marginTop: 15, fontStyle: 'italic', textAlign: 'center' }
});