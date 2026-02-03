import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NonHomogeneous_7_6() {
  
  // Custom Component for the two main solving steps
  const StepHighlight = ({ number, title, content, color }) => (
    <View style={[styles.stepCard, { borderLeftColor: color }]}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepBadge, { backgroundColor: color }]}>
          <Text style={styles.stepBadgeText}>{number}</Text>
        </View>
        <Text style={[styles.stepTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.stepText}>{content}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Up to this point, we have focused on homogeneous recurrence relations. Now we cover non-homogeneous relations, which introduce a new layer of complexity by adding an extra function of n on the right-hand side."}
      </Text>

      {/* SECTION 1: WHAT IS IT? */}
      <Text style={styles.sectionHeader}>{"What is a Non-Homogeneous Relation?"}</Text>
      <Text style={styles.paragraph}>
        {"A relation is non-homogeneous if it contains an extra function "}<Text style={styles.bold}>{"f(n)"}</Text>{" that is not equal to zero."}
      </Text>

      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaLabel}>{"General Form:"}</Text>
        <Text style={styles.mainFormula}>{"an = c\u2081an-1 + f(n)"}</Text>
      </View>

      {/* SECTION 2: THE TWO-STEP PROCESS */}
      <Text style={styles.sectionHeader}>{"Solving Non-Homogeneous Relations"}</Text>
      <Text style={styles.paragraph}>{"The process requires finding two separate solutions and combining them:"}</Text>

      <StepHighlight 
        number={"1"}
        color={"#0369A1"}
        title={"Solve Associated Homogeneous Part"}
        content={"Temporarily ignore f(n) to find the homogeneous solution (anh) using characteristic equations."}
      />

      <StepHighlight 
        number={"2"}
        color={"#16941c"}
        title={"Find the Particular Solution"}
        content={"Account for f(n) by \"guessing\" a trial solution (anp) based on the form of f(n)."}
      />

      <View style={styles.totalBox}>
        <Text style={styles.totalText}>{"General Solution: an = anh + anp"}</Text>
      </View>

      {/* SECTION 3: GUESSING GUIDE */}
      <Text style={styles.sectionHeader}>{"The Guessing Rule of Thumb"}</Text>
      <Text style={styles.paragraph}>{"The form of your trial solution depends on what f(n) looks like:"}</Text>

      <View style={styles.guessTable}>
        <View style={styles.guessRow}>
          <Text style={styles.guessLabel}>{"If f(n) is..."}</Text>
          <Text style={styles.guessLabel}>{"Guess (anp)"}</Text>
        </View>
        <View style={styles.guessRow}>
          <Text style={styles.cellMain}>{"Constant (4)"}</Text>
          <Text style={styles.cellSub}>{"A"}</Text>
        </View>
        <View style={styles.guessRow}>
          <Text style={styles.cellMain}>{"Linear (2n)"}</Text>
          <Text style={styles.cellSub}>{"Cn + D"}</Text>
        </View>
        <View style={styles.guessRow}>
          <Text style={styles.cellMain}>{"Quadratic (n\u00b2)"}</Text>
          <Text style={styles.cellSub}>{"Cn\u00b2 + Dn + E"}</Text>
        </View>
      </View>

      {/* SECTION 4: WORKED EXAMPLE */}
      <Text style={styles.sectionHeader}>{"Step-by-Step Problem Solver"}</Text>
      <View style={styles.problemCard}>
        <Text style={styles.bold}>{"Problem: an = 3an-1 + 2n"}</Text>
        <Text style={styles.infoText}>{"Step 1: Solve an = 3an-1 \u2192 anh = A \u00b7 3\u207f"}</Text>
        <Text style={styles.infoText}>{"Step 2: f(n) = 2n is linear, so guess anp = Cn + D"}</Text>
        <View style={styles.divider} />
        <Text style={styles.italic}>{"Substitute guess back into original relation to solve for C and D."}</Text>
      </View>

      {/* SECTION 5: REAL WORLD */}
      <Text style={styles.sectionHeader}>{"Real-World Applications"}</Text>
      <View style={styles.appGrid}>
        <View style={styles.appCard}>
          <MaterialCommunityIcons name="finance" size={24} color="#16941c" />
          <Text style={styles.appTitle}>{"Finance"}</Text>
          <Text style={styles.appDesc}>{"Compound interest with periodic payments."}</Text>
        </View>
        <View style={styles.appCard}>
          <MaterialCommunityIcons name="speedometer" size={24} color="#0369A1" />
          <Text style={styles.appTitle}>{"Physics"}</Text>
          <Text style={styles.appDesc}>{"Modeling motion with added constant forces."}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how non-homogeneous recurrence relations differ by incorporating an external function f(n). We explored the structured two-step process of combining homogeneous and particular solutions, which allows for more dynamic modeling in finance, physics, and algorithm complexity."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  italic: { fontStyle: 'italic', fontSize: 12, color: '#64748B', marginTop: 5 },
  formulaHighlight: { backgroundColor: '#F0F9FF', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  formulaLabel: { fontSize: 12, color: '#0369A1', fontWeight: 'bold', marginBottom: 5 },
  mainFormula: { fontSize: 20, color: '#0369A1', fontWeight: 'bold', fontFamily: 'monospace' },
  stepCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderLeftWidth: 6, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepBadge: { width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  stepBadgeText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  stepTitle: { fontSize: 14, fontWeight: 'bold' },
  stepText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  totalBox: { backgroundColor: '#1E293B', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  totalText: { color: '#38BDF8', fontWeight: 'bold', fontFamily: 'monospace', fontSize: 14 },
  guessTable: { backgroundColor: '#F0FDF4', borderRadius: 12, padding: 10, marginBottom: 20, borderWidth: 1, borderColor: '#DCFCE7' },
  guessRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#DCFCE7', paddingVertical: 8 },
  guessLabel: { flex: 1, fontWeight: 'bold', color: '#166534', fontSize: 12, textAlign: 'center' },
  cellMain: { flex: 1, fontSize: 12, color: '#475569', textAlign: 'center' },
  cellSub: { flex: 1, fontSize: 12, color: '#16941c', fontWeight: 'bold', textAlign: 'center', fontFamily: 'monospace' },
  problemCard: { padding: 15, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  infoText: { fontSize: 13, color: '#475569', marginBottom: 5, fontFamily: 'monospace' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  appGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  appCard: { width: '48%', backgroundColor: '#F9FAFB', padding: 15, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  appTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginTop: 10 },
  appDesc: { fontSize: 10, color: '#64748B', textAlign: 'center', marginTop: 4, lineHeight: 14 }
});