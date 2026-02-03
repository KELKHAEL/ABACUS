import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PolynomialFitting_6_3() {
  
  // Custom Component for Step-by-Step Difference Analysis
  const DifferenceAnalysis = ({ title, sequence, firstDiff, secondDiff, thirdDiff }) => (
    <View style={styles.diffCard}>
      <Text style={styles.diffTitle}>{title}</Text>
      <View style={styles.diffRow}>
        <Text style={styles.diffLabel}>Sequence:</Text>
        <Text style={styles.diffValues}>{sequence}</Text>
      </View>
      <View style={styles.diffRow}>
        <Text style={styles.diffLabel}>1st Diff:</Text>
        <Text style={styles.diffValues}>{firstDiff}</Text>
      </View>
      {secondDiff && (
        <View style={styles.diffRow}>
          <Text style={styles.diffLabel}>2nd Diff:</Text>
          <Text style={styles.diffValues}>{secondDiff}</Text>
        </View>
      )}
      {thirdDiff && (
        <View style={styles.diffRow}>
          <Text style={styles.diffLabel}>3rd Diff:</Text>
          <Text style={styles.diffValues}>{thirdDiff}</Text>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Polynomial Fitting is a powerful technique that helps us understand and predict complex patterns in sequences. In discrete mathematics, this method comes in handy while working with sequences that do not follow simple arithmetic or geometric progressions."}
      </Text>

      {/* SECTION 1: THE CONCEPT OF DIFFERENCES */}
      <Text style={styles.sectionHeader}>{"The Concept of Differences"}</Text>
      <Text style={styles.paragraph}>
        {"The key to polynomial fitting lies in analyzing the differences between consecutive terms:"}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"First differences:"}</Text>{" Subtract consecutive terms."}</Text>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Second differences:"}</Text>{" Take differences of the first differences."}</Text>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Third differences:"}</Text>{" Take differences of the second differences."}</Text>
      </View>

      {/* SECTION 2: DELTA-CONSTANT SEQUENCES */}
      <Text style={styles.sectionHeader}>{"Delta-Constant Sequences"}</Text>
      <Text style={styles.paragraph}>
        {"A sequence is called constant when its kth differences are constant. This property determines the degree of the polynomial formula."}
      </Text>

      <View style={styles.degreeTable}>
        <View style={styles.degreeRow}><Text style={styles.degreeText}>{"\u0394\u00b9 constant \u2192 Linear (degree 1)"}</Text></View>
        <View style={styles.degreeRow}><Text style={styles.degreeText}>{"\u0394\u00b2 constant \u2192 Quadratic (degree 2)"}</Text></View>
        <View style={styles.degreeRow}><Text style={styles.degreeText}>{"\u0394\u00b3 constant \u2192 Cubic (degree 3)"}</Text></View>
      </View>

      {/* SECTION 3: EXAMPLES */}
      <Text style={styles.sectionHeader}>{"Quadratic Analysis Example"}</Text>
      <DifferenceAnalysis 
        title={"Sequence: 3, 7, 14, 24..."}
        sequence={"3, 7, 14, 24"}
        firstDiff={"4, 7, 10"}
        secondDiff={"3, 3 (Constant!)"}
      />
      
      <View style={styles.mathSolverBox}>
        <Text style={styles.solverTitle}>{"Solving the System"}</Text>
        <Text style={styles.mathStep}>{"Formula: an = an\u00b2 + bn + c"}</Text>
        <Text style={styles.mathStep}>{"When n=0: 2 = c \u2192 c = 2"}</Text>
        <Text style={styles.mathStep}>{"Result: an = (3/2)n\u00b2 - (1/2)n + 2"}</Text>
      </View>

      {/* SECTION 4: CHESSBOARD PROBLEM */}
      <Text style={styles.sectionHeader}>{"The Classic Chessboard Problem"}</Text>
      <Text style={styles.paragraph}>{"Find total squares in an n \u00d7 n chessboard."}</Text>
      
      <DifferenceAnalysis 
        title={"Analysis of Squares"}
        sequence={"1, 5, 14, 30, 55"}
        firstDiff={"4, 9, 16, 25"}
        secondDiff={"5, 7, 9"}
        thirdDiff={"2, 2 (Constant!)"}
      />

      <View style={styles.darkMathBox}>
        <Text style={styles.darkMathLabel}>{"Cubic Formula Result:"}</Text>
        <Text style={styles.darkMathText}>{"an = (1/3)n\u00b3 + (1/2)n\u00b2 + (1/6)n"}</Text>
      </View>

      {/* SECTION 5: LIMITATIONS */}
      <Text style={styles.sectionHeader}>{"Non-Polynomial Sequences"}</Text>
      <View style={styles.errorBox}>
        <Text style={styles.errorTitle}>{"When Polynomial Fitting Fails:"}</Text>
        <Text style={styles.errorText}>{"\u2022 "}<Text style={styles.bold}>{"Exponential Sequences:"}</Text>{" (1, 2, 4, 8, 16...) Taking differences never leads to a constant."}</Text>
        <Text style={styles.errorText}>{"\u2022 "}<Text style={styles.bold}>{"Recursive Sequences:"}</Text>{" (Fibonacci) Differences follow the original pattern and never stabilize."}</Text>
      </View>

      {/* SECTION 6: APPLICATIONS */}
      <Text style={styles.sectionHeader}>{"Applications"}</Text>
      <View style={styles.appGrid}>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="chart-line" size={24} color="#0369A1" />
          <Text style={styles.appTitle}>{"Forecasting"}</Text>
          <Text style={styles.appDesc}>{"Trend analysis in finance."}</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="memory" size={24} color="#16941c" />
          <Text style={styles.appTitle}>{"CS Analysis"}</Text>
          <Text style={styles.appDesc}>{"Algorithm complexity."}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the framework of polynomial fitting through the analysis of finite differences. From quadratic sequences to the cubic chessboard problem, we saw how these steps allow us to derive standard form formulas while recognizing the limits of the method for exponential or recursive patterns."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  infoText: { fontSize: 13, color: '#475569', marginBottom: 8, lineHeight: 18 },
  degreeTable: { backgroundColor: '#F0F9FF', borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
  degreeRow: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#BAE6FD' },
  degreeText: { color: '#0369A1', fontWeight: 'bold', fontSize: 13, fontFamily: 'monospace' },
  diffCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15, elevation: 2 },
  diffTitle: { fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginBottom: 10 },
  diffRow: { flexDirection: 'row', marginBottom: 5 },
  diffLabel: { width: 80, fontSize: 12, color: '#64748B', fontWeight: 'bold' },
  diffValues: { flex: 1, fontSize: 13, color: '#16941c', fontFamily: 'monospace' },
  mathSolverBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20 },
  solverTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 8 },
  mathStep: { fontSize: 13, color: '#166534', fontFamily: 'monospace', marginBottom: 4 },
  darkMathBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 25 },
  darkMathLabel: { color: '#94A3B8', fontSize: 11, marginBottom: 8 },
  darkMathText: { color: '#38BDF8', fontSize: 15, fontWeight: 'bold', fontFamily: 'monospace' },
  errorBox: { backgroundColor: '#FEF2F2', padding: 15, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#EF4444' },
  errorTitle: { fontSize: 14, fontWeight: 'bold', color: '#991B1B', marginBottom: 8 },
  errorText: { fontSize: 13, color: '#B91C1C', marginBottom: 6, lineHeight: 18 },
  appGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  appItem: { width: '48%', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  appTitle: { fontSize: 13, fontWeight: 'bold', color: '#1E293B', marginTop: 8 },
  appDesc: { fontSize: 10, color: '#64748B', textAlign: 'center', marginTop: 4 }
});