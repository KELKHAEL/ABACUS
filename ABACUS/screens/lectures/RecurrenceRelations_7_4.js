import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RecurrenceRelations_7_4() {
  
  // Custom Component for Case-based solving
  const CaseCard = ({ title, logic, formula, color }) => (
    <View style={[styles.caseCard, { borderLeftColor: color }]}>
      <Text style={[styles.caseTitle, { color: color }]}>{title}</Text>
      <Text style={styles.caseLogic}>{logic}</Text>
      <View style={styles.mathHighlight}>
        <Text style={styles.mathText}>{formula}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Recursive techniques allow us to derive sequences and solve complex counting problems. A recurrence relation is an equation that recursively defines a sequence where the next term is a function of previous terms."}
      </Text>

      {/* SECTION 1: LINEAR RECURRENCE RELATIONS */}
      <Text style={styles.sectionHeader}>{"Linear Recurrence Relations"}</Text>
      <Text style={styles.paragraph}>
        {"A linear recurrence equation of degree k follows a specific format using constant coefficients."}
      </Text>

      <View style={styles.exampleGrid}>
        <View style={styles.exItem}>
          <Text style={styles.exLabel}>{"Fibonacci"}</Text>
          <Text style={styles.exFormula}>{"Fn = Fn-1 + Fn-2"}</Text>
        </View>
        <View style={styles.exItem}>
          <Text style={styles.exLabel}>{"Tower of Hanoi"}</Text>
          <Text style={styles.exFormula}>{"Fn = 2Fn-1 + 1"}</Text>
        </View>
      </View>

      {/* SECTION 2: THREE CASES FOR ROOTS */}
      <Text style={styles.sectionHeader}>{"Solving with Characteristic Equations"}</Text>
      <Text style={styles.paragraph}>{"When finding roots of the characteristic equation x\u00b2 - Ax - B = 0, three scenarios occur:"}</Text>

      <CaseCard 
        title={"Case 1: Distinct Real Roots"}
        color={"#0369A1"}
        logic={"Produced when there are two unique real roots x\u2081 and x\u2082."}
        formula={"Fn = ax\u2081\u207f + bx\u2082\u207f"}
      />

      <CaseCard 
        title={"Case 2: Single Real Root"}
        color={"#16941c"}
        logic={"Produced when roots are identical (x - x\u2081)\u00b2 = 0."}
        formula={"Fn = ax\u2081\u207f + bnx\u2081\u207f"}
      />

      <CaseCard 
        title={"Case 3: Complex Roots"}
        color={"#7C3AED"}
        logic={"Produced when roots are imaginary, expressed in polar form."}
        formula={"Fn = r\u207f(acos(n\u03b8) + bsin(n\u03b8))"}
      />

      {/* SECTION 3: NON-HOMOGENEOUS SOLUTIONS */}
      <Text style={styles.sectionHeader}>{"Non-Homogeneous Relations"}</Text>
      <Text style={styles.paragraph}>
        {"If the relation includes a function f(n) \u2260 0, it has two parts: the associated homogeneous solution and a particular solution."}
      </Text>

      <View style={styles.darkMathBox}>
        <Text style={styles.darkLabel}>{"General Solution Format:"}</Text>
        <Text style={styles.darkText}>{"an = ah + at"}</Text>
      </View>

      <View style={styles.trialTable}>
        <Text style={styles.tableTitle}>{"Trial Solutions for f(n)"}</Text>
        <View style={styles.tableRow}><Text style={styles.cell}>{"Constant (4)"}</Text><Text style={styles.cell}>{"A"}</Text></View>
        <View style={styles.tableRow}><Text style={styles.cell}>{"Exponential (8.5\u207f)"}</Text><Text style={styles.cell}>{"An5\u207f"}</Text></View>
        <View style={styles.tableRow}><Text style={styles.cell}>{"Polynomial (2n\u00b2+3n+1)"}</Text><Text style={styles.cell}>{"An\u00b2+Bn+C"}</Text></View>
      </View>

      {/* SECTION 4: GENERATING FUNCTIONS */}
      <Text style={styles.sectionHeader}>{"Generating Functions"}</Text>
      <Text style={styles.paragraph}>
        {"Generating functions represent sequences where each term is expressed as a coefficient of a variable x in a formal power series."}
      </Text>

      <View style={styles.logicBox}>
        <MaterialCommunityIcons name="sigma" size={24} color="#0369A1" />
        <Text style={styles.logicText}>{"Gx = \u03a3 ak x\u1d4f = a\u2080 + a\u2081x + a\u2082x\u00b2 + ..."}</Text>
      </View>

      <View style={styles.appCard}>
        <Text style={styles.appTitle}>{"Key Applications:"}</Text>
        <Text style={styles.appItem}>{"\u2022 Solving counting problems (e.g., making change for Rs. 100)."}</Text>
        <Text style={styles.appItem}>{"\u2022 Finding asymptotic formulae for terms of sequences."}</Text>
        <Text style={styles.appItem}>{"\u2022 Proving combinatorial identities."}</Text>
      </View>

      {/* SECTION 5: USEFUL IDENTITIES */}
      <Text style={styles.sectionHeader}>{"Useful Generating Functions"}</Text>
      <View style={styles.identitiesBox}>
        <Text style={styles.idText}>{"\u2022 For ak = 1: G(x) = 1 / (1 - x)"}</Text>
        <Text style={styles.idText}>{"\u2022 For ak = a\u1d4f: G(x) = 1 / (1 - ax)"}</Text>
        <Text style={styles.idText}>{"\u2022 For ak = 1/k!: G(x) = e\u02e3"}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how to solve linear recurrence relations using characteristic equations across three different root cases. We explored non-homogeneous trial solutions and introduced generating functions as a powerful tool for solving counting and combinatorial problems."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  exampleGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  exItem: { flex: 1, backgroundColor: '#F8FAFC', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  exLabel: { fontSize: 11, fontWeight: 'bold', color: '#64748B', marginBottom: 4 },
  exFormula: { fontSize: 12, fontFamily: 'monospace', color: '#0F172A', fontWeight: 'bold' },
  caseCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 15 },
  caseTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 5 },
  caseLogic: { fontSize: 12, color: '#475569', marginBottom: 10 },
  mathHighlight: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, alignItems: 'center' },
  mathText: { fontFamily: 'monospace', fontWeight: 'bold', fontSize: 14, color: '#1E293B' },
  darkMathBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  darkLabel: { color: '#BBF7D0', fontSize: 11, marginBottom: 5 },
  darkText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 16 },
  trialTable: { backgroundColor: '#F0F9FF', borderRadius: 10, padding: 10, marginBottom: 20 },
  tableTitle: { fontSize: 13, fontWeight: 'bold', color: '#0369A1', marginBottom: 8, textAlign: 'center' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#BAE6FD', paddingVertical: 6 },
  cell: { flex: 1, fontSize: 11, color: '#0369A1', textAlign: 'center' },
  logicBox: { flexDirection: 'row', backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  logicText: { flex: 1, marginLeft: 12, fontSize: 13, color: '#166534', fontFamily: 'monospace', fontWeight: 'bold' },
  appCard: { padding: 15, backgroundColor: '#F8FAFC', borderRadius: 12, marginBottom: 20 },
  appTitle: { fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  appItem: { fontSize: 12, color: '#475569', marginBottom: 5, lineHeight: 18 },
  identitiesBox: { backgroundColor: '#1E293B', padding: 15, borderRadius: 12 },
  idText: { color: '#38BDF8', fontFamily: 'monospace', fontSize: 12, marginBottom: 6 }
});