import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SolvingRecurrence_7_7() {
  
  // Custom Component for Iteration Steps
  const IterationStep = ({ label, formula, result }) => (
    <View style={styles.iterCard}>
      <Text style={styles.iterLabel}>{label}</Text>
      <Text style={styles.iterMath}>{formula}</Text>
      <View style={styles.iterDivider} />
      <Text style={styles.iterResult}>{result}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"From algorithm analysis to sequence problems, recurrence relations are quite useful in discrete mathematics. They give us a way to express terms in a sequence based on prior terms. In this chapter, we explain the iteration method to find closed-form solutions."}
      </Text>

      {/* SECTION 1: RECAP */}
      <Text style={styles.sectionHeader}>{"What is a Recurrence Relation?"}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{"An equation that expresses each term of a sequence as a function of its preceding terms."}</Text>
        <View style={styles.formulaBox}>
          <Text style={styles.formulaText}>{"T(n) = T(n - 1) + f(n)"}</Text>
        </View>
        <Text style={styles.caption}>{"Where f(n) adds complexity in non-homogeneous cases."}</Text>
      </View>

      {/* SECTION 2: THE ITERATION METHOD */}
      <Text style={styles.sectionHeader}>{"The Iteration Method"}</Text>
      <Text style={styles.paragraph}>
        {"This is a systematic way to unfold a recurrence step-by-step. By substituting terms progressively, we can identify a pattern to generalize into a formula."}
      </Text>

      <Text style={styles.subHeader}>{"Step-by-Step Example"}</Text>
      <View style={styles.problemBanner}>
        <Text style={styles.bannerText}>{"Solve: T(n) = T(n - 1) + 2n"}</Text>
        <Text style={styles.bannerSub}>{"Base Case: T(0) = 0"}</Text>
      </View>

      <IterationStep 
        label={"Iteration 1"}
        formula={"T(n) = T(n - 1) + 2n"}
        result={"Start by expanding T(n)"}
      />

      <IterationStep 
        label={"Iteration 2"}
        formula={"T(n) = [T(n - 2) + 2(n - 1)] + 2n"}
        result={"Substitute for T(n - 1)"}
      />

      <IterationStep 
        label={"Iteration 3"}
        formula={"T(n) = T(n - 3) + 2(n - 2) + 2(n - 1) + 2n"}
        result={"Plug back to see the pattern emerging"}
      />

      {/* SECTION 3: GENERAL FORM & SUMMATION */}
      <Text style={styles.sectionHeader}>{"Deriving the General Form"}</Text>
      <Text style={styles.paragraph}>{"At step k, the relation expands into a summation:"}</Text>
      
      <View style={styles.darkMathCard}>
        <Text style={styles.darkMathText}>{"T(n) = \u03a3\u207f\u208b\u00b9\u1d62\u208c\u2080 2(n - i)"}</Text>
      </View>

      <View style={styles.simplificationBox}>
        <Text style={styles.bold}>{"Simplifying the Series:"}</Text>
        <Text style={styles.mathLine}>{"T(n) = 2[n + (n-1) + ... + 1]"}</Text>
        <Text style={styles.mathLine}>{"T(n) = 2 \u00d7 [n(n + 1) / 2]"}</Text>
        <Text style={styles.resultText}>{"T(n) = n(n + 1)"}</Text>
      </View>

      {/* SECTION 4: INTERPRETATION */}
      <Text style={styles.sectionHeader}>{"Complexity Interpretation"}</Text>
      <View style={styles.complexityCard}>
        <View style={styles.complexityHeader}>
          <MaterialCommunityIcons name="speedometer" size={24} color="white" />
          <Text style={styles.complexityTitle}>{"Big-O Notation"}</Text>
        </View>
        <Text style={styles.complexityValue}>{"O(n\u00b2)"}</Text>
        <Text style={styles.complexityDesc}>
          {"This indicating that the growth rate of T(n) is quadratic. It is correct because each term adds a new increment as n increases."}
        </Text>
      </View>

      {/* SECTION 5: TIPS */}
      <Text style={styles.sectionHeader}>{"Tips for Success"}</Text>
      <View style={styles.tipGrid}>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons name="magnify" size={20} color="#16941c" />
          <Text style={styles.tipText}>{"Look for patterns early."}</Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons name="function" size={20} color="#0369A1" />
          <Text style={styles.tipText}>{"Use known summation formulas."}</Text>
        </View>
        <View style={styles.tipItem}>
          <MaterialCommunityIcons name="flag-variant" size={20} color="#B91C1C" />
          <Text style={styles.tipText}>{"Don't forget the base case."}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the process of solving recurrence relations through the iteration method. We walked through expansions, summation simplification, and learned to interpret the final closed-form results in the context of algorithmic time complexity."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  subHeader: { fontSize: 15, fontWeight: 'bold', color: '#334155', marginBottom: 12, marginTop: 10 },
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  infoText: { fontSize: 13, color: '#475569', lineHeight: 18, marginBottom: 10 },
  formulaBox: { backgroundColor: '#FFF', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontWeight: 'bold', color: '#0F172A', fontSize: 15 },
  caption: { fontSize: 11, color: '#94A3B8', marginTop: 8, fontStyle: 'italic', textAlign: 'center' },
  problemBanner: { backgroundColor: '#1E293B', padding: 15, borderRadius: 10, marginBottom: 15 },
  bannerText: { color: '#38BDF8', fontWeight: 'bold', fontSize: 14, textAlign: 'center', fontFamily: 'monospace' },
  bannerSub: { color: '#94A3B8', fontSize: 11, textAlign: 'center', marginTop: 4 },
  iterCard: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 10 },
  iterLabel: { fontSize: 10, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase' },
  iterMath: { fontSize: 13, fontFamily: 'monospace', color: '#0F172A', marginVertical: 6 },
  iterDivider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 4 },
  iterResult: { fontSize: 12, color: '#16941c', fontStyle: 'italic' },
  darkMathCard: { backgroundColor: '#0F172A', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  darkMathText: { color: 'white', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold' },
  simplificationBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#DCFCE7' },
  mathLine: { fontSize: 13, fontFamily: 'monospace', color: '#166534', marginBottom: 5 },
  resultText: { fontSize: 16, fontWeight: 'bold', color: '#166534', textAlign: 'right', borderTopWidth: 1, borderTopColor: '#BBF7D0', paddingTop: 8, marginTop: 5 },
  complexityCard: { backgroundColor: '#0369A1', padding: 20, borderRadius: 15, marginBottom: 20 },
  complexityHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  complexityTitle: { color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 10 },
  complexityValue: { color: 'white', fontSize: 28, fontWeight: '900', textAlign: 'center', fontFamily: 'monospace', marginVertical: 5 },
  complexityDesc: { color: '#E0F2FE', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  tipGrid: { marginBottom: 20 },
  tipItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 10, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  tipText: { flex: 1, marginLeft: 10, fontSize: 12, color: '#475569' }
});