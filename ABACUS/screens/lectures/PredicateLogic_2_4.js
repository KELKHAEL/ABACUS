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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Predicate Logic</Text> deals with predicates, which are propositions containing variables.
      </Text>

      {/* --- DEFINITION --- */}
      <Text style={styles.sectionHeader}>Predicate Logic Definition</Text>
      <Text style={styles.paragraph}>
        A predicate is an expression of one or more variables defined on some specific domain. A predicate with variables can be made a proposition by either <Text style={styles.bold}>assigning a value</Text> to the variable or by <Text style={styles.bold}>quantifying</Text> the variable.
      </Text>

      <Text style={styles.paragraph}>The following are some examples of predicates −</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• Let E(x, y) denote "x = y"</Text>
        <Text style={styles.exampleText}>• Let X(a, b, c) denote "a + b + c = 0"</Text>
        <Text style={styles.exampleText}>• Let M(x, y) denote "x is married to y"</Text>
      </View>

      {/* --- WELL FORMED FORMULA (WFF) --- */}
      <Text style={styles.sectionHeader}>Well Formed Formula</Text>
      <Text style={styles.paragraph}>
        Well Formed Formula (wff) is a predicate holding any of the following −
      </Text>
      
      <View style={styles.infoBox}>
        <WffItem text="All propositional constants and propositional variables are wffs." />
        <WffItem text="If x is a variable and Y is a wff, ∀xY and ∃xY are also wff." />
        <WffItem text="Truth value and false values are wffs." />
        <WffItem text="Each atomic formula is a wff." />
        <WffItem text="All connectives connecting wffs are wffs." />
      </View>

      {/* --- QUANTIFIERS --- */}
      <Text style={styles.sectionHeader}>Quantifiers</Text>
      <Text style={styles.paragraph}>
        The variable of predicates is quantified by quantifiers. There are two types of quantifier in predicate logic − Universal Quantifier and Existential Quantifier.
      </Text>

      {/* UNIVERSAL QUANTIFIER */}
      <View style={styles.quantifierCard}>
        <Text style={styles.quantifierTitle}>Universal Quantifier</Text>
        <Text style={styles.paragraph}>
          Universal quantifier states that the statements within its scope are true for <Text style={styles.bold}>every</Text> value of the specific variable. It is denoted by the symbol <Text style={styles.bold}>∀</Text>.
        </Text>
        <Text style={styles.logicText}>∀xP(x) is read as for every value of x, P(x) is true.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleTextSmall}>
          <Text style={styles.bold}>Example</Text> − "Man is mortal" can be transformed into the propositional form <Text style={styles.bold}>∀xP(x)</Text> where P(x) is the predicate which denotes x is mortal and the universe of discourse is all men.
        </Text>
      </View>

      {/* EXISTENTIAL QUANTIFIER */}
      <View style={[styles.quantifierCard, { borderColor: '#BAE6FD', backgroundColor: '#F0F9FF' }]}>
        <Text style={[styles.quantifierTitle, {color: '#0369A1'}]}>Existential Quantifier</Text>
        <Text style={styles.paragraph}>
          Existential quantifier states that the statements within its scope are true for <Text style={styles.bold}>some</Text> values of the specific variable. It is denoted by the symbol <Text style={styles.bold}>∃</Text>.
        </Text>
        <Text style={styles.logicText}>∃xP(x) is read as for some values of x, P(x) is true.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleTextSmall}>
          <Text style={styles.bold}>Example</Text> − "Some people are dishonest" can be transformed into the propositional form <Text style={styles.bold}>∃xP(x)</Text> where P(x) is the predicate which denotes x is dishonest and the universe of discourse is some people.
        </Text>
      </View>

      {/* --- NESTED QUANTIFIERS --- */}
      <Text style={styles.sectionHeader}>Nested Quantifiers</Text>
      <Text style={styles.paragraph}>
        If we use a quantifier that appears within the scope of another quantifier, it is called nested quantifier.
      </Text>
      <Text style={styles.subHeader}>Example</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>• ∀a ∃b P(x, y) where P(a, b) denotes a + b = 0</Text>
        <Text style={styles.formulaText}>• ∀a ∀b ∀c P(a, b, c) where P(a, b) denotes a + (b + c) = (a + b) + c</Text>
      </View>
      <Text style={styles.noteText}>
        <Text style={styles.bold}>Note</Text> − ∀a∃bP(x, y) ≠ ∃a∀bP(x, y)
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
  
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 6, fontFamily: 'monospace', lineHeight: 22 },
  exampleTextSmall: { fontSize: 14, color: '#475569', lineHeight: 22, marginTop: 5 },
  divider: { height: 1, backgroundColor: '#CBD5E1', marginVertical: 10 },
  
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#BBF7D0' },
  checkItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  checkText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#166534', lineHeight: 20 },
  
  quantifierCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', marginBottom: 15, backgroundColor: '#F0FDF4' },
  quantifierTitle: { fontSize: 18, fontWeight: 'bold', color: '#16941c', marginBottom: 10 },
  logicText: { fontFamily: 'monospace', fontSize: 14, color: '#1E293B', backgroundColor: '#FFF', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  
  formulaBox: { backgroundColor: '#104a28', padding: 15, borderRadius: 12, marginVertical: 10 },
  formulaText: { color: 'white', fontFamily: 'monospace', fontSize: 13, marginBottom: 8, lineHeight: 20 },
  
  noteText: { fontSize: 14, color: '#B91C1C', marginTop: 5, fontStyle: 'italic', backgroundColor: '#FEF2F2', padding: 10, borderRadius: 8, overflow: 'hidden' }
});