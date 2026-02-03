import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BooleanSimplification_9_2() {
  
  const SolutionStep = ({ label, formula, justification }) => (
    <View style={styles.stepRow}>
      <Text style={styles.stepLabel}>{label}</Text>
      <Text style={styles.stepFormula}>{formula}</Text>
      {justification && <Text style={styles.stepJustification}>{justification}</Text>}
    </View>
  );

  const KMapGrid = ({ data, labelA, labelBC }) => (
    <View style={styles.kmapContainer}>
      <View style={styles.kmapHeader}>
        <Text style={styles.kmapCorner}>{labelA} \ {labelBC}</Text>
        <View style={styles.kmapTopLabels}>
          {['00', '01', '11', '10'].map(val => <Text key={val} style={styles.topLabel}>{val}</Text>)}
        </View>
      </View>
      <View style={styles.kmapBody}>
        <View style={styles.sideLabels}>
          <Text style={styles.sideLabel}>0</Text>
          <Text style={styles.sideLabel}>1</Text>
        </View>
        <View style={styles.grid}>
          {data.map((row, i) => (
            <View key={i} style={styles.gridRow}>
              {row.map((cell, j) => (
                <View key={j} style={[styles.gridCell, cell.highlight && styles.highlightCell]}>
                  <Text style={styles.cellText}>{cell.val}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 9.2</Text>
          <Text style={styles.topicTitle}>Simplification of Boolean Functions</Text>
          <View style={styles.underline} />
        </View>

        {/* ALGEBRAIC SIMPLIFICATION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Simplification Using Algebraic Functions</Text>
          <Text style={styles.paragraph}>
            {"In this approach, one Boolean expression is minimized into an equivalent expression by applying Boolean identities."}
          </Text>

          <Text style={styles.bold}>Problem 1:</Text>
          <Text style={styles.paragraph}>{"Minimize: F(A,B,C) = A'B + BC' + BC + AB'C'"}</Text>
          
          <View style={styles.solutionBox}>
            <SolutionStep label="Given" formula="F(A,B,C) = A'B + BC' + BC + AB'C'" />
            <SolutionStep label="Or" formula="F(A,B,C) = A'B + (BC' + BC') + BC + AB'C'" justification="[By idempotent law, BC = BC + BC]" />
            <SolutionStep label="Or" formula="F(A,B,C) = A'B + (BC' + BC) + (BC' + AB'C')" />
            <SolutionStep label="Or" formula="F(A,B,C) = A'B + B(C' + C) + C'(B + AB')" justification="[By distributive laws]" />
            <SolutionStep label="Or" formula="F(A,B,C) = A'B + B.1 + C'(B + A)" justification="[(C' + C) = 1 and absorption law (B + AB')= (B + A)]" />
            <SolutionStep label="Or" formula="F(A,B,C) = A'B + B + C'(B + A)" justification="[B.1 = B]" />
            <SolutionStep label="Or" formula="F(A,B,C) = B(A' + 1) + C'(B + A)" />
            <SolutionStep label="Or" formula="F(A,B,C) = B.1 + C'(B + A)" justification="[(A' + 1) = 1]" />
            <SolutionStep label="Or" formula="F(A,B,C) = B + C'(B + A)" justification="[As, B.1 = B]" />
            <SolutionStep label="Or" formula="F(A,B,C) = B + BC' + AC'" />
            <SolutionStep label="Or" formula="F(A,B,C) = B(1 + C') + AC'" />
            <SolutionStep label="Or" formula="F(A,B,C) = B.1 + AC'" justification="[As, (1 + C') = 1]" />
            <SolutionStep label="Or" formula="F(A,B,C) = B + AC'" justification="[As, B.1 = B]" />
            <Text style={styles.finalResult}>Result: B + AC'</Text>
          </View>

          <Text style={[styles.bold, {marginTop: 20}]}>Problem 2:</Text>
          <Text style={styles.paragraph}>{"Minimize: F(A,B,C) = (A + B)(A + C)"}</Text>
          <View style={styles.solutionBox}>
            <SolutionStep label="Or" formula="A.A + A.C + B.A + B.C" justification="[Applying distributive Rule]" />
            <SolutionStep label="Or" formula="A + A.C + B.A + B.C" justification="[Applying Idempotent Law]" />
            <SolutionStep label="Or" formula="A(1 + C) + B.A + B.C" justification="[Applying distributive Law]" />
            <SolutionStep label="Or" formula="A + B.A + B.C" justification="[Applying dominance Law]" />
            <SolutionStep label="Or" formula="(A + 1).A + B.C" justification="[Applying distributive Law]" />
            <SolutionStep label="Or" formula="1.A + B.C" justification="[Applying dominance Law]" />
            <SolutionStep label="Or" formula="A + B.C" justification="[Applying dominance Law]" />
            <Text style={styles.finalResult}>Result: A + BC</Text>
          </View>
        </View>

        {/* KARNAUGH MAPS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Karnaugh Maps (K-map)</Text>
          <Text style={styles.paragraph}>
            {"Introduced by Maurice Karnaugh in 1953, it is a grid-like representation of a truth table used to simplify Boolean algebra expressions. Crossing a boundary is always a change of only one variable."}
          </Text>
          
          <Text style={styles.subLabel}>Simplification Rules</Text>
          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}>{"Rule 1 \u2212 Any cell containing a zero cannot be grouped."}</Text>
            <Text style={styles.ruleText}>{"Rule 2 \u2212 Groups must contain 2\u207f cells (n starting from 1)."}</Text>
            <Text style={styles.ruleText}>{"Rule 3 \u2212 Grouping must be horizontal or vertical, but NOT diagonal."}</Text>
            <Text style={styles.ruleText}>{"Rule 4 \u2212 Groups must be covered as largely as possible."}</Text>
            <Text style={styles.ruleText}>{"Rule 5 \u2212 Isolated 1s act as a group themselves."}</Text>
            <Text style={styles.ruleText}>{"Rule 6 \u2212 Groups may overlap to minimize total number of groups."}</Text>
            <Text style={styles.ruleText}>{"Rule 7 \u2212 Wrapping: Leftmost/rightmost and topmost/bottommost cells can be grouped together."}</Text>
          </View>

          <Text style={styles.bold}>Final Problem:</Text>
          <Text style={styles.paragraph}>{"Minimize: F(A,B,C) = A'BC + A'BC' + AB'C' + AB'C"}</Text>
          <KMapGrid 
            labelA="A" labelBC="BC"
            data={[
              [{val: '0'}, {val: '0'}, {val: '1', highlight: true}, {val: '1', highlight: true}],
              [{val: '1', highlight: true}, {val: '1', highlight: true}, {val: '0'}, {val: '0'}]
            ]}
          />
          <Text style={styles.finalResult}>Final Result: AB' + A'B = A \u2295 B</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 20 },
  titleSection: { marginBottom: 25 },
  topicSubtitle: { fontSize: 13, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1.5 },
  topicTitle: { fontSize: 30, fontWeight: '900', color: '#0F172A', marginTop: 4 },
  underline: { height: 4, width: 40, backgroundColor: '#16941c', marginTop: 8, borderRadius: 2 },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12 },
  bold: { fontWeight: '800', color: '#0F172A' },
  solutionBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#16941c', marginTop: 10 },
  stepRow: { marginBottom: 10 },
  stepLabel: { fontSize: 12, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase' },
  stepFormula: { fontSize: 14, color: '#1E293B', fontFamily: 'monospace', fontWeight: '700' },
  stepJustification: { fontSize: 12, color: '#0369A1', fontStyle: 'italic', marginTop: 2 },
  finalResult: { fontSize: 16, fontWeight: '900', color: '#16941c', textAlign: 'center', marginTop: 15, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 10 },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 15, marginBottom: 12, letterSpacing: 1 },
  ruleBox: { backgroundColor: '#FFF7ED', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 20 },
  ruleText: { fontSize: 13, color: '#9A3412', marginBottom: 8, lineHeight: 18 },
  kmapContainer: { alignItems: 'center', marginVertical: 20 },
  kmapHeader: { flexDirection: 'row', width: 220, justifyContent: 'flex-end', paddingRight: 10 },
  kmapCorner: { fontSize: 12, fontWeight: 'bold', color: '#475569', marginRight: 15 },
  kmapTopLabels: { flexDirection: 'row', width: 160, justifyContent: 'space-around' },
  topLabel: { fontSize: 12, color: '#64748B', fontFamily: 'monospace' },
  kmapBody: { flexDirection: 'row', width: 220, marginTop: 5 },
  sideLabels: { justifyContent: 'space-around', height: 80, paddingRight: 10 },
  sideLabel: { fontSize: 12, color: '#64748B', fontFamily: 'monospace' },
  grid: { width: 160, height: 80, borderWidth: 1, borderColor: '#CBD5E1' },
  gridRow: { flexDirection: 'row', height: 40 },
  gridCell: { width: 40, height: 40, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  highlightCell: { backgroundColor: '#DCFCE7' },
  cellText: { fontSize: 14, fontWeight: 'bold', color: '#1E293B' },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});