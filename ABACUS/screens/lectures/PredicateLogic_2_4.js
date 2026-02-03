import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PredicateLogic_2_4() {
  
  // Custom Checklist Item for Well Formed Formulas
  const WffItem = ({ text }) => (
    <View style={styles.checkItem}>
      <MaterialCommunityIcons name="check-circle" size={20} color="#16941c" />
      <Text style={styles.checkText}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Predicate Logic</Text> deals with predicates, which are propositions containing variables. It provides a more powerful way to express relationships than simple propositional logic.
      </Text>

      <Text style={styles.sectionHeader}>Predicate Logic Definition</Text>
      <Text style={styles.paragraph}>
        A predicate is an expression of one or more variables defined on some specific domain. A predicate with variables can be made a proposition by either <Text style={styles.bold}>assigning a value</Text> to the variable or by <Text style={styles.bold}>quantifying</Text> the variable.
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.exampleTitle}>Examples of Predicates:</Text>
        <Text style={styles.exampleText}>• Let E(x, y) denote "x = y"</Text>
        <Text style={styles.exampleText}>• Let X(a, b, c) denote "a + b + c = 0"</Text>
        <Text style={styles.exampleText}>• Let M(x, y) denote "x is married to y"</Text>
      </View>

      {/* WELL FORMED FORMULA SECTION */}
      <Text style={styles.sectionHeader}>Well Formed Formula (wff)</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>wff</Text> is a predicate holding any of the following conditions:
      </Text>
      
      <View style={styles.infoBox}>
        <WffItem text="All propositional constants and variables are wffs." />
        <WffItem text="If x is a variable and Y is a wff, ∀xY and ∃xY are also wff." />
        <WffItem text="Truth value and false values are wffs." />
        <WffItem text="Each atomic formula is a wff." />
        <WffItem text="All connectives connecting wffs are wffs." />
      </View>

      {/* QUANTIFIERS SECTION */}
      <Text style={styles.sectionHeader}>Quantifiers</Text>
      <Text style={styles.paragraph}>
        The variable of predicates is quantified by quantifiers. There are two primary types:
      </Text>

      <View style={styles.quantifierCard}>
        <Text style={styles.quantifierTitle}>1. Universal Quantifier (∀)</Text>
        <Text style={styles.paragraph}>
          States that the statements within its scope are true for <Text style={styles.bold}>every</Text> value of the specific variable.
        </Text>
        <Text style={styles.logicText}>∀xP(x) is read as: "for every value of x, P(x) is true".</Text>
        <Text style={styles.exampleTextSmall}>Example: "Man is mortal" → ∀xP(x) where P(x) denotes x is mortal and universe is all men.</Text>
      </View>

      <View style={styles.quantifierCard}>
        <Text style={[styles.quantifierTitle, {color: '#0369A1'}]}>2. Existential Quantifier (∃)</Text>
        <Text style={styles.paragraph}>
          States that statements are true for <Text style={styles.bold}>some</Text> values of the specific variable.
        </Text>
        <Text style={styles.logicText}>∃xP(x) is read as: "for some values of x, P(x) is true".</Text>
        <Text style={styles.exampleTextSmall}>Example: "Some people are dishonest" → ∃xP(x) where universe is some people.</Text>
      </View>

      {/* NESTED QUANTIFIERS */}
      <Text style={styles.sectionHeader}>Nested Quantifiers</Text>
      <Text style={styles.paragraph}>
        If we use a quantifier that appears within the scope of another quantifier, it is called a <Text style={styles.bold}>nested quantifier</Text>.
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>Example 1: ∀a ∃b P(a, b) where P(a, b) denotes a + b = 0</Text>
        <Text style={styles.formulaText}>Example 2: ∀a ∀b ∀c P(a, b, c) where P denotes a + (b + c) = (a + b) + c</Text>
      </View>
      <Text style={styles.noteText}>
        <Text style={styles.bold}>Note:</Text> The order matters! ∀a ∃b P(a, b) ≠ ∃a ∀b P(a, b).
      </Text>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained Predicate Logic, defined Well Formed Formulas, and explored Universal, Existential, and Nested quantifiers. These concepts allow for precise mathematical modeling of complex statements.
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
  exampleTitle: { fontWeight: 'bold', marginBottom: 8, color: '#1E293B' },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 4, fontFamily: 'monospace' },
  exampleTextSmall: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginTop: 5 },
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 20 },
  checkItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#166534', lineHeight: 20 },
  quantifierCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15, backgroundColor: '#FAFAFA' },
  quantifierTitle: { fontSize: 16, fontWeight: 'bold', color: '#16941c', marginBottom: 8 },
  logicText: { fontFamily: 'monospace', fontSize: 14, color: '#1E293B', backgroundColor: '#E2E8F0', padding: 8, borderRadius: 6 },
  formulaBox: { backgroundColor: '#104a28', padding: 15, borderRadius: 12, marginVertical: 10 },
  formulaText: { color: 'white', fontFamily: 'monospace', fontSize: 13, marginBottom: 5 },
  noteText: { fontSize: 13, color: '#B91C1C', marginTop: 5, fontStyle: 'italic' }
});