import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LinearDiophantine_10_5() {
  
  const StepCard = ({ number, title, description, color }) => (
    <View style={[styles.stepCard, { borderLeftColor: color }]}>
      <View style={styles.stepHeader}>
        <View style={[styles.stepBadge, { backgroundColor: color }]}>
          <Text style={styles.stepBadgeText}>{number}</Text>
        </View>
        <Text style={[styles.stepTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.paragraph}>{description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 10.5</Text>
          <Text style={styles.topicTitle}>Solving Linear Diophantine Equation</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"In Number Theory, we study Linear Diophantine equations\u2014equations that seek whole number solutions. These typically take the form ax + by = c, where a, b, and c are known values, and x and y are the integers to be determined. Diophantine equations have applications in various fields, including number theory and cryptography. They are particularly useful for solving problems that require integer-only solutions."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will explore the basics of solving these equations, analyze examples, and understand the conditions necessary for solutions."}
          </Text>
        </View>

        {/* SECTION 1: WHAT IS IT */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Linear Diophantine Equation</Text>
          <Text style={styles.paragraph}>
            {"A linear Diophantine equation takes the form ax + by = c, where a, b, and c are the given integers. The equation is called \"Diophantine\" because we are only interested in integer solutions for x and y. Not all Diophantine equations have solutions because of this integer constraint. Also these equations may have multiple answers."}
          </Text>
          
          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>{"The Key Rule:"}</Text>
            <Text style={styles.highlightText}>
              {"For a solution to exist, the greatest common divisor (GCD) of a and b must divide c. If it does, there are infinitely many solutions; But if it does not hold, then the equation has no solution."}
            </Text>
          </View>

          <View style={styles.exampleBox}>
            <Text style={styles.bold}>Example:</Text>
            <Text style={styles.monoMath}>{"\u2022 3x + 6y = 12: GCD(3,6)=3. 3 divides 12. (Solutions exist)."}</Text>
            <Text style={styles.monoMath}>{"\u2022 4x + 8y = 10: GCD(4,8)=4. 4 does not divide 10. (No solution)."}</Text>
          </View>
        </View>

        {/* SECTION 2: BASIC STEPS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Basic Steps for Solving</Text>
          <Text style={styles.paragraph}>{"To solve ax + by = c, we generally follow these steps:"}</Text>
          
          <StepCard 
            number="1" title="Check GCD Condition" color="#0284C7"
            description="Ensure that the GCD of a and b is factor of divides c."
          />
          <StepCard 
            number="2" title="Find Particular Solution" color="#7C3AED"
            description="Use the extended Euclidean algorithm to find one set of values for x and y."
          />
          <StepCard 
            number="3" title="Generate General Solution" color="#16A34A"
            description="Since there are infinitely many solutions, we express them in terms of an integer parameter k."
          />
        </View>

        {/* SECTION 3: STEP-BY-STEP EXAMPLE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Detailed Solution Walkthrough</Text>
          <Text style={styles.paragraph}><Text style={styles.bold}>{"Problem: "}</Text>{"Solve 7x + 11y = 35."}</Text>

          <View style={styles.solverBox}>
            <Text style={styles.solverStepTitle}>Step 1: GCD Condition</Text>
            <Text style={styles.monoMathSmall}>{"GCD(7, 11) = 1. 1 divides 35 \u2192 Solution exists."}</Text>

            <Text style={styles.solverStepTitle}>Step 2: Extended Euclidean Algorithm</Text>
            <Text style={styles.paragraph}>{"Find x\u2080, y\u2080 such that 7x\u2080 + 11y\u2080 = 1. After calculations: x\u2080 = 8, y\u2080 = \u22125."}</Text>
            <Text style={styles.monoMathSmall}>{"Check: 7(8) + 11(\u22125) = 56 \u2212 55 = 1."}</Text>

            <Text style={styles.solverStepTitle}>Step 3: Adjust for c (35)</Text>
            <Text style={styles.paragraph}>{"Multiply x\u2080 and y\u2080 by 35:"}</Text>
            <Text style={styles.monoMathSmall}>{"x = 8 \u00d7 35 = 280"}</Text>
            <Text style={styles.monoMathSmall}>{"y = \u22125 \u00d7 35 = \u2212175"}</Text>
          </View>
        </View>

        {/* SECTION 4: GENERAL SOLUTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Finding the General Solution</Text>
          <Text style={styles.paragraph}>
            {"If (x\u2080, y\u2080) is one solution, the general solution is given by:"}
          </Text>
          <View style={styles.formulaResultBox}>
            <Text style={styles.mathResultLarge}>{"x = x\u2080 + (b/GCD) \u00d7 k"}</Text>
            <Text style={styles.mathResultLarge}>{"y = y\u2080 \u2212 (a/GCD) \u00d7 k"}</Text>
            <Text style={styles.formulaSub}>{"where k is an integer parameter."}</Text>
          </View>

          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>{"Final Result for 7x + 11y = 35:"}</Text>
            <Text style={styles.monoMathSmall}>{"x = 280 + 11k"}</Text>
            <Text style={styles.monoMathSmall}>{"y = \u2212175 \u2212 7k"}</Text>
          </View>
        </View>

        {/* SECTION 5: APPLICATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications</Text>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="cash-multiple" size={20} color="#475569" />
            <Text style={styles.appText}><Text style={styles.bold}>{"Currency/Change: "}</Text>{"Making exactly 27 using only 5 and 8 bills: 5x + 8y = 27."}</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="archive-outline" size={20} color="#475569" />
            <Text style={styles.appText}><Text style={styles.bold}>{"Inventory/Packaging: "}</Text>{"Calculating crate combinations to reach an exact item total."}</Text>
          </View>
        </View>

        {/* SECTION 6: NO SOLUTION CASES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>No-Solution Situations</Text>
          <Text style={styles.paragraph}>
            {"Sometimes, an equation might not have any solution. For instance, if the GCD of a and b does not divide c."}
          </Text>
          <View style={[styles.exampleBox, { backgroundColor: '#FFF5F5' }]}>
            <Text style={[styles.bold, { color: '#B91C1C' }]}>Example (4x + 6y = 13):</Text>
            <Text style={styles.paragraph}>{"The GCD of 4 and 6 is 2. 2 does not divide 13. So, there are no integer solutions."}</Text>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we explored solving Linear Diophantine equations based on the GCD criterion. We walked through steps to find particular and general solutions, and examined real-world applications and cases where no solutions exist."}
          </Text>
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
  topicTitle: { fontSize: 32, fontWeight: '900', color: '#0F172A', marginTop: 4 },
  underline: { height: 4, width: 40, backgroundColor: '#16941c', marginTop: 8, borderRadius: 2 },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  logicHighlight: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#16A34A', marginTop: 10 },
  highlightText: { color: '#166534', fontSize: 14, lineHeight: 20 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  monoMath: { fontFamily: 'monospace', color: '#475569', fontSize: 13, marginBottom: 5 },
  stepCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderLeftWidth: 5, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepBadge: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  stepBadgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  stepTitle: { fontWeight: '900', fontSize: 14, textTransform: 'uppercase' },
  solverBox: { backgroundColor: '#F1F5F9', padding: 16, borderRadius: 16 },
  solverStepTitle: { fontSize: 13, fontWeight: '800', color: '#334155', marginBottom: 8, marginTop: 10, textTransform: 'uppercase' },
  monoMathSmall: { fontFamily: 'monospace', color: '#0369A1', fontSize: 13, fontWeight: 'bold' },
  formulaResultBox: { backgroundColor: '#0F172A', padding: 25, borderRadius: 20, marginVertical: 15 },
  mathResultLarge: { color: '#38BDF8', fontSize: 18, fontWeight: 'bold', textAlign: 'center', fontFamily: 'monospace', marginBottom: 8 },
  formulaSub: { color: '#94A3B8', fontSize: 11, textAlign: 'center', marginTop: 5 },
  appRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
  appText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#475569', lineHeight: 20 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});