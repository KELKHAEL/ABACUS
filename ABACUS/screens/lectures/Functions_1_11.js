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
          <Text style={styles.fLabel}>{type === 'composition' ? 'g ∘ f' : 'f: X → Y'}</Text>
          <View style={styles.arrowLine} />
          <View style={styles.arrowLine} />
        </View>
        {/* Codomain Set Y */}
        <View style={styles.setCircle}>
          <Text style={styles.setLabel}>{type === 'composition' ? 'Z' : 'Y'}</Text>
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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>Function</Text> assigns to each element of a set, exactly one element of a related set. Functions find their application in various fields like representation of the computational complexity of algorithms, counting objects, study of sequences and strings, to name a few.
      </Text>
      <Text style={styles.paragraph}>
        The third and final chapter of this part highlights the important aspects of functions.
      </Text>

      {/* --- DEFINITION --- */}
      <Text style={styles.sectionHeader}>Function - Definition</Text>
      <FunctionMapping type="def" />
      <Text style={styles.paragraph}>
        A function or mapping (Defined as <Text style={styles.bold}>f: X → Y</Text>) is a relationship from elements of one set X to elements of another set Y (X and Y are non-empty sets). 
      </Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.bulletText}>• <Text style={styles.bold}>Domain & Codomain:</Text> X is called Domain and Y is called Codomain of function f.</Text>
        <Text style={styles.bulletText}>• <Text style={styles.bold}>Pre-image & Image:</Text> Function f is a relation on X and Y such that for each x ∈ X, there exists a unique y ∈ Y such that (x, y) ∈ R. x is called pre-image and y is called image of function f.</Text>
      </View>
      <Text style={styles.paragraph}>
        A function can be one-to-one or many-to-one but <Text style={styles.bold}>not</Text> one-to-many.
      </Text>

      {/* --- TYPES OF FUNCTIONS --- */}
      <Text style={styles.sectionHeader}>Types of Functions</Text>

      <Text style={styles.subHeader}>1. Injective / One-to-one function</Text>
      <Text style={styles.paragraph}>
        A function f: A → B is injective or one-to-one function if for every b ∈ B, there exists at most one a ∈ A such that f(a) = b.
      </Text>
      <Text style={styles.paragraph}>
        This means a function f is injective if a₁ ≠ a₂ implies f(a₁) ≠ f(a₂).
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Examples:</Text>
        <Text style={styles.exampleText}>• f: N → N, f(x) = 5x is <Text style={{color: '#16941c', fontWeight: 'bold'}}>injective</Text>.</Text>
        <Text style={styles.exampleText}>• f: N → N, f(x) = x² is <Text style={{color: '#16941c', fontWeight: 'bold'}}>injective</Text>.</Text>
        <Text style={styles.exampleText}>• f: R → R, f(x) = x² is <Text style={{color: '#dc2626', fontWeight: 'bold'}}>not injective</Text> as (-x)² = x².</Text>
      </View>

      <Text style={styles.subHeader}>2. Surjective / Onto function</Text>
      <Text style={styles.paragraph}>
        A function f: A → B is surjective (onto) if the image of f equals its range. Equivalently, for every b ∈ B, there exists some a ∈ A such that f(a) = b. This means that for any y in B, there exists some x in A such that y = f(x).
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Examples:</Text>
        <Text style={styles.exampleText}>• f: N → N, f(x) = x + 2 is <Text style={{color: '#16941c', fontWeight: 'bold'}}>surjective</Text>.</Text>
        <Text style={styles.exampleText}>• f: R → R, f(x) = x² is <Text style={{color: '#dc2626', fontWeight: 'bold'}}>not surjective</Text> since we cannot find a real number whose square is negative.</Text>
      </View>

      <Text style={styles.subHeader}>3. Bijective / One-to-one Correspondent</Text>
      <Text style={styles.paragraph}>
        A function f: A → B is bijective or one-to-one correspondent if and only if f is <Text style={styles.bold}>both</Text> injective and surjective.
      </Text>

      {/* --- PROBLEM & PROOF --- */}
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>Problem: Prove that a function f: R → R defined by f(x) = 2x - 3 is a bijective function.</Text>
      </View>
      <Text style={styles.paragraph}><Text style={styles.bold}>Explanation −</Text> We have to prove this function is both injective and surjective.</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>1. Injective Proof:</Text></Text>
        <Text style={styles.exampleText}>If f(x₁) = f(x₂), then 2x₁ - 3 = 2x₂ - 3 and it implies that x₁ = x₂.</Text>
        <Text style={[styles.exampleText, {color: '#16941c', fontWeight: 'bold', marginBottom: 10}]}>Hence, f is injective.</Text>
        
        <Text style={styles.exampleText}><Text style={styles.bold}>2. Surjective Proof:</Text></Text>
        <Text style={styles.exampleText}>Here, 2x - 3 = y</Text>
        <Text style={styles.exampleText}>So, x = (y + 3) / 2 which belongs to R and f(x) = y.</Text>
        <Text style={[styles.exampleText, {color: '#16941c', fontWeight: 'bold'}]}>Hence, f is surjective.</Text>
      </View>
      <Text style={styles.paragraph}>
        Since f is both surjective and injective, we can say <Text style={styles.bold}>f is bijective</Text>.
      </Text>

      {/* --- INVERSE FUNCTIONS --- */}
      <Text style={styles.sectionHeader}>Inverse of a Function</Text>
      <Text style={styles.paragraph}>
        The <Text style={styles.bold}>inverse</Text> of a one-to-one corresponding function f: A → B, is the function g: B → A, holding the following property:
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>f(x) = y ⇔ g(y) = x</Text>
      </View>
      <Text style={styles.paragraph}>
        The function f is called <Text style={styles.bold}>invertible</Text>, if its inverse function g exists.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Examples:</Text>
        <Text style={styles.exampleText}>• A Function f: Z → Z, f(x) = x + 5, is invertible since it has the inverse function g: Z → Z, g(x) = x - 5.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>• A Function f: Z → Z, f(x) = x² is not invertible since this is not one-to-one as (-x)² = x².</Text>
      </View>

      {/* --- COMPOSITION --- */}
      <Text style={styles.sectionHeader}>Composition of Functions</Text>
      <FunctionMapping type="composition" />
      <Text style={styles.paragraph}>
        Two functions f: A → B and g: B → C can be composed to give a composition <Text style={styles.bold}>g ∘ f</Text>. This is a function from A to C defined by:
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>(g ∘ f)(x) = g(f(x))</Text>
      </View>

      <Text style={styles.subHeader}>Example</Text>
      <Text style={styles.paragraph}>Let f(x) = x + 2 and g(x) = 2x + 1, find (f ∘ g)(x) and (g ∘ f)(x).</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Solution:</Text>
        <Text style={styles.exampleText}>(f ∘ g)(x) = f(g(x)) = f(2x + 1) = (2x + 1) + 2 = <Text style={styles.bold}>2x + 3</Text></Text>
        <Text style={styles.exampleText}>(g ∘ f)(x) = g(f(x)) = g(x + 2) = 2(x + 2) + 1 = <Text style={styles.bold}>2x + 5</Text></Text>
        <Text style={[styles.exampleText, {marginTop: 10, color: '#dc2626', fontWeight: 'bold'}]}>Hence, (f ∘ g)(x) ≠ (g ∘ f)(x)</Text>
      </View>

      {/* --- FACTS --- */}
      <Text style={styles.sectionHeader}>Some Facts about Composition</Text>
      <View style={styles.lawBox}>
        <Text style={styles.lawText}>• If f and g are one-to-one then the function (g ∘ f) is also one-to-one.</Text>
        <Text style={styles.lawText}>• If f and g are onto then the function (g ∘ f) is also onto.</Text>
        <Text style={styles.lawText}>• Composition always holds associative property but does not hold commutative property.</Text>
      </View>

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
  exampleText: { fontSize: 14, color: '#334155', marginTop: 5, lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  formulaBox: { backgroundColor: '#104a28', padding: 15, borderRadius: 12, marginVertical: 10, alignItems: 'center' },
  formulaText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  lawBox: { backgroundColor: '#FDF2F8', padding: 15, borderRadius: 12, marginVertical: 15 },
  lawText: { fontSize: 14, color: '#9D174D', marginBottom: 8, lineHeight: 22 },
  
  // Mapping Visualization Styles
  mappingOuter: { alignItems: 'center', marginVertical: 20 },
  setContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%' },
  setCircle: { width: 60, height: 100, borderRadius: 30, borderWidth: 2, borderColor: '#16941c', alignItems: 'center', justifyContent: 'space-evenly' },
  setLabel: { position: 'absolute', top: -25, fontWeight: 'bold', color: '#334155' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#16941c' },
  arrowContainer: { alignItems: 'center', flex: 1 },
  fLabel: { fontSize: 13, fontWeight: 'bold', marginBottom: 10, color: '#64748B' },
  arrowLine: { width: '80%', height: 2, backgroundColor: '#CBD5E1', marginVertical: 5 },
  captionText: { fontSize: 11, color: '#94A3B8', marginTop: 15, fontStyle: 'italic', textAlign: 'center' }
});