import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MastersTheorem_7_8() {
  
  // Custom Component for Case Logic
  const MasterCase = ({ number, condition, result, description, color }) => (
    <View style={[styles.caseCard, { borderLeftColor: color }]}>
      <View style={styles.caseHeader}>
        <Text style={[styles.caseNumber, { backgroundColor: color }]}>Case {number}</Text>
        <Text style={styles.caseCondition}>{condition}</Text>
      </View>
      <Text style={styles.caseDesc}>{description}</Text>
      <View style={styles.resultBadge}>
        <Text style={[styles.resultText, { color: color }]}>T(n) = {result}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Recurrence relations are widely used to describe the time complexity of recursive algorithms. As sequences become complex, substitution methods get challenging. For these, we use the Master's Theorem to estimate asymptotic behavior without step-by-step expansion."}
      </Text>

      {/* SECTION 1: THE FORMULA */}
      <Text style={styles.sectionHeader}>{"Understanding the Theorem"}</Text>
      <Text style={styles.paragraph}>
        {"Master's Theorem applies to recurrence relations in the following divide-and-conquer form:"}
      </Text>

      <View style={styles.formulaBox}>
        <Text style={styles.mainFormula}>{"T(n) = aT(n/b) + f(n)"}</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.formulaLegend}>{"\u2022 a \u2265 1: Number of sub-problems"}</Text>
        <Text style={styles.formulaLegend}>{"\u2022 b > 1: Factor of size reduction"}</Text>
        <Text style={styles.formulaLegend}>{"\u2022 f(n): Non-recursive work"}</Text>
      </View>

      {/* SECTION 2: THE THREE CASES */}
      <Text style={styles.sectionHeader}>{"The Three Cases"}</Text>
      <Text style={styles.paragraph}>
        {"Cases are determined by comparing f(n) to n raised to the power of log\u1d47 a:"}
      </Text>

      <MasterCase 
        number={"1"}
        color={"#EF4444"}
        condition={"f(n) < n^log\u1d47 a"}
        description={"f(n) grows slower than the derived term. The recursive parts dominate."}
        result={"\u0398(n^log\u1d47 a)"}
      />

      <MasterCase 
        number={"2"}
        color={"#F59E0B"}
        condition={"f(n) \u2248 n^log\u1d47 a"}
        description={"f(n) and the derived term grow at the same rate. This brings a logarithmic factor."}
        result={"\u0398(n^log\u1d47 a \u00b7 log n)"}
      />

      <MasterCase 
        number={"3"}
        color={"#10B981"}
        condition={"f(n) > n^log\u1d47 a"}
        description={"f(n) grows faster and dominates the recurrence (requires Regularity Condition)."}
        result={"\u0398(f(n))"}
      />

      {/* SECTION 3: STEP-BY-STEP EXAMPLE */}
      <Text style={styles.sectionHeader}>{"Step-by-Step Analysis"}</Text>
      <View style={styles.problemCard}>
        <Text style={styles.bold}>{"Analyze: T(n) = 2T(n/4) + \u221an"}</Text>
        <Text style={styles.stepText}>{"1. Identify: a=2, b=4, f(n)=n\u2070\u142e\u2075"}</Text>
        <Text style={styles.stepText}>{"2. Calculate: log\u2084 2 = 0.5 \u2192 n\u2070\u142e\u2075"}</Text>
        <Text style={styles.stepText}>{"3. Compare: f(n) matches n^log\u1d47 a (Case 2)"}</Text>
        <View style={styles.divider} />
        <Text style={styles.finalResult}>{"Result: \u0398(\u221an \u00b7 log n)"}</Text>
      </View>

      {/* SECTION 4: ALGORITHM COMPLEXITY */}
      <Text style={styles.sectionHeader}>{"Algorithm Complexity Analysis"}</Text>
      <View style={styles.algorithmBox}>
        <View style={styles.algoItem}>
          <Text style={styles.algoName}>{"Merge Sort"}</Text>
          <Text style={styles.algoRec}>{"T(n) = 2T(n/2) + O(n)"}</Text>
          <Text style={[styles.algoComplexity, { color: '#F59E0B' }]}>{"\u0398(n log n)"}</Text>
        </View>
        <View style={styles.algoItem}>
          <Text style={styles.algoName}>{"Binary Search"}</Text>
          <Text style={styles.algoRec}>{"T(n) = T(n/2) + O(1)"}</Text>
          <Text style={[styles.algoComplexity, { color: '#EF4444' }]}>{"\u0398(log n)"}</Text>
        </View>
      </View>

      {/* SECTION 5: THUMB RULES */}
      <Text style={styles.sectionHeader}>{"Rules for Application"}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoItem}>{"\u2022 Identify a, b, and f(n) carefully."}</Text>
        <Text style={styles.infoItem}>{"\u2022 Use log properties to find n^log\u1d47 a accurately."}</Text>
        <Text style={styles.infoItem}>{"\u2022 For Case 3, always check the regularity condition: af(n/b) \u2264 cf(n)."}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how Master's Theorem helps in solving complex recurrence relations without tedious iterations. By matching the function f(n) with the derived term, we can quickly find asymptotic time complexities for essential algorithms like binary search and merge sort."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  formulaBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  mainFormula: { color: 'white', fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace' },
  dividerLight: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', width: '100%', marginVertical: 12 },
  formulaLegend: { color: '#94A3B8', fontSize: 12, alignSelf: 'flex-start', marginBottom: 4 },
  caseCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderLeftWidth: 6, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  caseHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  caseNumber: { color: 'white', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
  caseCondition: { fontSize: 13, fontWeight: 'bold', color: '#1E293B', fontFamily: 'monospace' },
  caseDesc: { fontSize: 12, color: '#475569', lineHeight: 18, marginBottom: 10 },
  resultBadge: { backgroundColor: '#FFF', padding: 8, borderRadius: 6, borderWidth: 1, borderColor: '#F1F5F9', alignItems: 'center' },
  resultText: { fontWeight: 'bold', fontFamily: 'monospace', fontSize: 14 },
  problemCard: { padding: 15, borderRadius: 12, backgroundColor: '#F0F9FF', marginBottom: 20, borderWidth: 1, borderColor: '#BAE6FD' },
  stepText: { fontSize: 13, color: '#334155', marginTop: 6, fontFamily: 'monospace' },
  divider: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 12 },
  finalResult: { fontSize: 15, fontWeight: 'bold', color: '#0369A1', textAlign: 'right' },
  algorithmBox: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  algoItem: { flex: 1, backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#F3F4F6' },
  algoName: { fontSize: 12, fontWeight: 'bold', color: '#1E293B', marginBottom: 4 },
  algoRec: { fontSize: 10, color: '#64748B', fontFamily: 'monospace', marginBottom: 6 },
  algoComplexity: { fontSize: 13, fontWeight: 'bold', textAlign: 'center' },
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20 },
  infoItem: { fontSize: 12, color: '#166534', marginBottom: 6, lineHeight: 18 }
});