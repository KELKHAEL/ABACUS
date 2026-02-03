import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GeneratingFunctions_7_9() {
  
  // Custom Component for Sequence Transformation
  const TransformBox = ({ title, sequence, functionText, color }) => (
    <View style={[styles.tCard, { borderLeftColor: color }]}>
      <Text style={[styles.tTitle, { color: color }]}>{title}</Text>
      <View style={styles.seqRow}>
        <Text style={styles.label}>Sequence:</Text>
        <Text style={styles.seqText}>{sequence}</Text>
      </View>
      <View style={styles.arrowRow}>
        <MaterialCommunityIcons name="arrow-down-bold" size={16} color="#CBD5E1" />
      </View>
      <View style={styles.funcBox}>
        <Text style={styles.funcText}>{functionText}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Generating functions provide a way to transform sequence problems into functions. They allow efficient manipulation and discovery of patterns through calculus and algebraic techniques."}
      </Text>

      {/* SECTION 1: CORE DEFINITION */}
      <Text style={styles.sectionHeader}>{"What is a Generating Function?"}</Text>
      <Text style={styles.paragraph}>
        {"A generating function makes a sequence of numbers act as coefficients of a power series. Instead of focusing on individual elements, we create a single function that represents the entire sequence."}
      </Text>

      <View style={styles.seriesBox}>
        <Text style={styles.seriesFormula}>{"Gx = \u03a3 ck x\u1d4f = c\u2080 + c\u2081x + c\u2082x\u00b2 + ..."}</Text>
        <Text style={styles.caption}>{"The sequence is simply the list of coefficients (c\u2080, c\u2081, c\u2082...)."}</Text>
      </View>

      <TransformBox 
        title={"Example: Finding a Sequence"}
        sequence={"3, 0, 8, 1, 0, 17, 100..."}
        functionText={"3 + 8x\u00b2 + x\u00b3 + 17x\u2075 + 100x\u2076 + ..."}
        color={"#0369A1"}
      />
      <Text style={styles.noteText}>{"Note: Terms without a corresponding power of x are zero."}</Text>

      {/* SECTION 2: BUILDING FUNCTIONS */}
      <Text style={styles.sectionHeader}>{"Building Generating Functions"}</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.bold}>{"1. Geometric Series"}</Text>
        <Text style={styles.infoText}>{"The constant sequence 1, 1, 1, 1... has the generating function:"}</Text>
        <View style={styles.mathBadge}><Text style={styles.mathText}>{"1 / (1 - x)"}</Text></View>
        
        <View style={styles.divider} />
        
        <Text style={styles.bold}>{"2. Using Multiplication"}</Text>
        <Text style={styles.infoText}>{"To generate 2, 2, 2, 2..., multiply the function by 2:"}</Text>
        <View style={styles.mathBadge}><Text style={styles.mathText}>{"2 / (1 - x)"}</Text></View>
      </View>

      {/* SECTION 3: ADVANCED TECHNIQUES */}
      <Text style={styles.sectionHeader}>{"Advanced Techniques"}</Text>

      <View style={styles.techCard}>
        <Text style={styles.techTitle}>{"Differentiation"}</Text>
        <Text style={styles.techDesc}>{"Differentiating a series term-by-term uncovers new numerical patterns."}</Text>
        <View style={styles.mathStep}>
          <Text style={styles.stepCode}>{"Start: 1, 1, 1... \u2192 1/(1-x)"}</Text>
          <Text style={styles.stepCode}>{"Diff: 1, 2, 3... \u2192 1/(1-x)\u00b2"}</Text>
          <Text style={styles.stepCode}>{"Result: Triangular Numbers 1, 3, 6, 10... \u2192 (1+x)/(1-x)\u00b3"}</Text>
        </View>
      </View>

      {/* SECTION 4: RECURRENCE RELATIONS */}
      <Text style={styles.sectionHeader}>{"Solving Recurrence Relations"}</Text>
      <Text style={styles.paragraph}>{"Multiplying and shifting terms allows us to transform a recurrence algebraically into a compact function."}</Text>
      
      <View style={styles.darkMathBox}>
        <Text style={styles.darkLabel}>{"Recurrence Example:"}</Text>
        <Text style={styles.darkMath}>{"an = 3an-1 - 2an-2"}</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.darkLabel}>{"Generates Function:"}</Text>
        <Text style={styles.darkMath}>{"A = 1 / (1 - 3x + 2x\u00b2)"}</Text>
      </View>

      {/* SECTION 5: APPLICATIONS */}
      <Text style={styles.sectionHeader}>{"Applications"}</Text>
      <View style={styles.appGrid}>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="calculator" size={24} color="#16941c" />
          <Text style={styles.appLabel}>{"Combinatorics"}</Text>
          <Text style={styles.appDetail}>{"Counting subsets and arrangements."}</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="chart-bell-curve" size={24} color="#0369A1" />
          <Text style={styles.appLabel}>{"Probability"}</Text>
          <Text style={styles.appDetail}>{"Modeling distributions over sample spaces."}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how generating functions transform numerical sequences into power series. We explored construction via geometric series, advanced techniques like differentiation, and saw how these functions solve counting problems and recurrence relations in both combinatorics and probability."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  seriesBox: { backgroundColor: '#F8FAFC', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  seriesFormula: { fontSize: 16, fontFamily: 'monospace', fontWeight: 'bold', color: '#0F172A' },
  caption: { fontSize: 11, color: '#94A3B8', marginTop: 8, fontStyle: 'italic', textAlign: 'center' },
  tCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 15 },
  tTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  seqRow: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 11, fontWeight: 'bold', color: '#64748B', width: 70 },
  seqText: { flex: 1, fontSize: 13, color: '#475569', fontFamily: 'monospace' },
  arrowRow: { alignItems: 'center', marginVertical: 5 },
  funcBox: { backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8, alignItems: 'center' },
  funcText: { fontSize: 13, color: '#0F172A', fontFamily: 'monospace', fontWeight: 'bold' },
  noteText: { fontSize: 11, color: '#64748B', fontStyle: 'italic', marginBottom: 20, textAlign: 'center' },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  infoText: { fontSize: 13, color: '#334155', marginVertical: 5 },
  mathBadge: { backgroundColor: '#FFF', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#BAE6FD', marginTop: 5 },
  mathText: { fontFamily: 'monospace', fontWeight: 'bold', color: '#0369A1' },
  divider: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 12 },
  techCard: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  techTitle: { fontSize: 14, fontWeight: 'bold', color: '#7C3AED', marginBottom: 5 },
  techDesc: { fontSize: 12, color: '#475569', marginBottom: 10 },
  mathStep: { gap: 5 },
  stepCode: { fontSize: 12, fontFamily: 'monospace', color: '#5B21B6' },
  darkMathBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 15, marginBottom: 25 },
  darkLabel: { color: '#BBF7D0', fontSize: 11, marginBottom: 5 },
  darkMath: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
  dividerLight: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 12 },
  appGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  appItem: { flex: 1, backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  appLabel: { fontSize: 13, fontWeight: 'bold', color: '#1E293B', marginTop: 8 },
  appDetail: { fontSize: 10, color: '#64748B', textAlign: 'center', marginTop: 4 }
});