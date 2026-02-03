import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PredicatesQuantifiers_1_5() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Predicates and Quantifiers are used to build logical expressions involving variables. Predicates help in making statements about objects, while quantifiers specify the scope of these statements. Together, they allow mathematicians to express ideas about groups of objects rather than just individual elements.
      </Text>

      {/* SECTION: PREDICATES */}
      <Text style={styles.sectionHeader}>Predicates in Discrete Mathematics</Text>
      <Text style={styles.paragraph}>
        A predicate is a logical expression that contains variables and becomes a statement when specific values are substituted for those variables. Predicates describe properties or conditions that elements of a set can satisfy.
      </Text>

      <Text style={styles.subHeader}>Example of a Predicate</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Predicate P(x): "x is a prime number"</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>• P(2) becomes "2 is a prime number" (True)</Text>
        <Text style={styles.exampleText}>• P(4) becomes "4 is a prime number" (False)</Text>
      </View>

      <Text style={styles.subHeader}>Predicate vs. Statement</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Predicate:</Text> "n is a prime number." (Variable n makes it incomplete)</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Statement:</Text> "7 is a prime number." (Has a definite truth value)</Text>
      </View>

      {/* SECTION: QUANTIFIERS */}
      <Text style={styles.sectionHeader}>Quantifiers in Discrete Mathematics</Text>
      <Text style={styles.paragraph}>
        Quantifiers define the extent to which a predicate is true for a set of elements. There are two main types:
      </Text>

      <Text style={styles.subHeader}>Universal Quantifier (∀)</Text>
      <Text style={styles.paragraph}>
        Read as "for all" or "for every." It declares that a predicate is true for every possible value of a variable.
      </Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>∀x (x ≥ 0)</Text>
        <Text style={styles.codeSubText}>"For all values of x, x is greater than or equal to zero."</Text>
      </View>

      <Text style={styles.subHeader}>Existential Quantifier (∃)</Text>
      <Text style={styles.paragraph}>
        Read as "there exists" or "there is." It says there is at least one value for which a predicate is true.
      </Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>{"∃x (x < 0)"}</Text>
        <Text style={styles.codeSubText}>"There exists an x such that x is less than zero."</Text>
      </View>

      {/* SECTION: COMBINING AND NESTING */}
      <Text style={styles.sectionHeader}>Combining and Nesting Quantifiers</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>{"∀x ∃y (y < x)"}</Text>
        <Text style={styles.exampleText}>"For every x, there exists a y such that y is less than x."</Text>
        <View style={styles.divider} />
        <Text style={styles.bold}>∃x ∀y (y ≥ x)</Text>
        <Text style={styles.exampleText}>"There exists an x such that for all y, y is greater than or equal to x."</Text>
      </View>

      {/* SECTION: NEGATION */}
      <Text style={styles.sectionHeader}>Negation of Quantifiers</Text>
      <Text style={styles.paragraph}>When negating quantified statements, the type of quantifier changes:</Text>
      
      <View style={styles.ruleBox}>
        <Text style={styles.ruleText}>¬∀xP(x) ≡ ∃x¬P(x)</Text>
        <Text style={styles.ruleDesc}>"It is not true that for all x, P(x) is true" is the same as "There exists an x such that P(x) is false."</Text>
      </View>
      
      <View style={styles.ruleBox}>
        <Text style={styles.ruleText}>¬∃xP(x) ≡ ∀x¬P(x)</Text>
        <Text style={styles.ruleDesc}>"There does not exist an x such that P(x) is true" is the same as "For all x, P(x) is false."</Text>
      </View>

      {/* SECTION: IMPLICIT QUANTIFIERS */}
      <Text style={styles.sectionHeader}>Implicit Quantifiers</Text>
      <Text style={styles.paragraph}>
        Often, quantifiers are implied. For example: "If a shape is a square, then it is a rectangle" implicitly means "For all shapes, if the shape is a square, then it is a rectangle".
      </Text>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the importance of predicates and quantifiers. Predicates describe properties of objects, while quantifiers help define the scope of these descriptions.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 30 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  bulletContainer: { flexDirection: 'row', marginBottom: 10, paddingLeft: 5 },
  bullet: { fontSize: 16, color: '#16941c', marginRight: 10 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 22 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  codeBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 15, alignItems: 'center' },
  codeText: { fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold', color: '#16941c' },
  codeSubText: { fontSize: 13, color: '#64748B', marginTop: 5, fontStyle: 'italic', textAlign: 'center' },
  ruleBox: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#FEF3C7', marginBottom: 12 },
  ruleText: { fontFamily: 'monospace', fontSize: 15, fontWeight: 'bold', color: '#92400E', marginBottom: 5 },
  ruleDesc: { fontSize: 13, color: '#78350F', lineHeight: 18 }
});