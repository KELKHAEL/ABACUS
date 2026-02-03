import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CongruenceProperties_10_4() {
  
  const EquivalenceCard = ({ title, definition, example, icon, color }) => (
    <View style={[styles.equivalenceCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeaderRow}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.equivalenceTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.paragraph}>{definition}</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example:</Text>
        <Text style={styles.monoMath}>{example}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 10.4</Text>
          <Text style={styles.topicTitle}>Properties of Congruence</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"The congruence logic is a way to express that two numbers are \"basically the same\" in the context of a given modulus. The concept of congruence is quite useful of modular arithmetic. It is used for simplifying calculations and patterns across integers. This topic is useful in cryptography and coding theory."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will see some important properties of congruence and go through some examples to show how congruence behaves like equality in modular arithmetic."}
          </Text>
        </View>

        {/* WHAT IS CONGRUENCE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What is Congruence?</Text>
          <Text style={styles.paragraph}>
            {"When we say two numbers a and b are congruent modulo n (written as a \u2261 b (mod n)), it means that a and b leave the same remainder when it is divided by n. This concept is similar to equality but within a circular system where numbers \"wrap around\" after reaching the the modulus n."}
          </Text>
          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>{"Example:"}</Text>
            <Text style={styles.paragraph}>{"If we say 15 \u2261 3 (mod 12), it is like we are saying that when we divide both 15 and 3 by 12, they each will have a remainder of 3."}</Text>
          </View>
        </View>

        {/* EQUIVALENCE RELATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Congruence as an Equivalence Relation</Text>
          <Text style={styles.paragraph}>
            {"Congruence relations work just like equality. This is because they follow three basic properties: reflexivity, symmetry, and transitivity. These three properties make congruence an equivalence relation."}
          </Text>

          <EquivalenceCard 
            title="Reflexivity"
            icon="mirror"
            color="#0284C7"
            definition="Any integer a is always congruent to itself: a \u2261 a (mod n). This sets up congruence as a reliable system."
            example="7 \u2261 7 (mod 3) since both leave a remainder of 1."
          />

          <EquivalenceCard 
            title="Symmetry"
            icon="swap-horizontal"
            color="#7C3AED"
            definition="If a \u2261 b (mod n), then b \u2261 a (mod n). If two numbers are congruent in one direction, they are congruent in the other."
            example="If 18 \u2261 6 (mod 12), then 6 \u2261 18 (mod 12) as well."
          />

          <EquivalenceCard 
            title="Transitivity"
            icon="vector-point-select"
            color="#16A34A"
            definition="If a \u2261 b (mod n) and b \u2261 c (mod n), then a \u2261 c (mod n). This property lets us \pass along\ congruence."
            example="If 14 \u2261 2 (mod 6) and 2 \u2261 8 (mod 6), then 14 \u2261 8 (mod 6)."
          />
        </View>

        {/* ARITHMETIC PROPERTIES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Arithmetic Properties of Congruence</Text>
          <Text style={styles.paragraph}>{"These properties make congruence extremely practical for large number calculations."}</Text>
          
          <View style={styles.subSectionBox}>
            <Text style={styles.subLabel}>Addition and Subtraction</Text>
            <Text style={styles.paragraph}>{"If a \u2261 b (mod n) and c \u2261 d (mod n), then:"}</Text>
            <Text style={styles.monoMathLarge}>{"a + c \u2261 b + d (mod n)"}</Text>
            <Text style={styles.monoMathLarge}>{"a \u2013 c \u2261 b \u2212 d (mod n)"}</Text>
            
            <View style={styles.calculationStep}>
              <Text style={styles.bold}>Example (15 \u2261 3 mod 6 and 10 \u2261 4 mod 6):</Text>
              <Text style={styles.monoMath}>{"Add: 15 + 10 \u2261 3 + 4 \u21d2 25 \u2261 7 \u21d2 1 \u2261 1 (mod 6)"}</Text>
              <Text style={styles.monoMath}>{"Sub: 15 \u2013 10 \u2261 3 \u2212 4 \u21d2 5 \u2261 \u22121 \u21d2 5 \u2261 5 (mod 6)"}</Text>
              <Text style={styles.italicText}>{"*Negative remainders are adjusted by adding the modulus."}</Text>
            </View>
          </View>

          <View style={[styles.subSectionBox, { marginTop: 20 }]}>
            <Text style={styles.subLabel}>Multiplication</Text>
            <Text style={styles.paragraph}>{"If a \u2261 b (mod n) and c \u2261 d (mod n), then:"}</Text>
            <Text style={styles.monoMathLarge}>{"a \u00d7 c \u2261 b \u00d7 d (mod n)"}</Text>
            
            <View style={styles.calculationStep}>
              <Text style={styles.bold}>Example (4 \u2261 1 mod 3 and 5 \u2261 2 mod 3):</Text>
              <Text style={styles.monoMath}>{"4 \u00d7 5 \u2261 1 \u00d7 2 (mod 3) \u21d2 20 \u2261 2 (mod 3)"}</Text>
            </View>
          </View>
        </View>

        {/* SUBSTITUTION SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Substitution in Congruence</Text>
          <Text style={styles.paragraph}>
            {"We can replace a number with any congruent equivalent to streamline complex calculations."}
          </Text>
          <View style={styles.solverBox}>
            <Text style={styles.bold}>Problem: Remainder of 3491 divided by 9</Text>
            <Text style={styles.stepText}>{"1. Break 3491 into 3000 + 400 + 90 + 1."}</Text>
            <Text style={styles.stepText}>{"2. Find equivalents: 3000 \u2261 0, 400 \u2261 4, 90 \u2261 0, 1 \u2261 1 (mod 9)."}</Text>
            <Text style={styles.stepText}>{"3. Add: 0 + 4 + 0 + 1 = 5."}</Text>
            <Text style={styles.resultText}>{"Result: 3491 \u2261 5 (mod 9)"}</Text>
          </View>
        </View>

        {/* LIMITATIONS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#EF4444" />
            <Text style={[styles.sectionTitle, {color: '#EF4444', marginLeft: 10, marginBottom: 0}]}>Limitations (Division)</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Division requires more caution. You cannot simply cancel 'd' from both sides of a \u00d7 d \u2261 b \u00d7 d (mod n) unless 'd' and 'n' are co-prime (share no common factors other than 1)."}
          </Text>
          <View style={styles.exampleBox}>
            <Text style={styles.bold}>Invalid Case:</Text>
            <Text style={styles.paragraph}>{"18 \u2261 42 (mod 8) cannot be divided by 6 because 6 and 8 share a factor of 2."}</Text>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"We explained congruence as an equivalence relation (Reflexivity, Symmetry, Transitivity) and examined how addition, subtraction, and multiplication preserve congruence. We discussed simplification via substitution and highlighted the specific co-prime requirement for division."}
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
  underline: { height: 4, width: 40, backgroundColor: '#7C3AED', marginTop: 8, borderRadius: 2 },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 12, marginTop: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  monoMath: { fontFamily: 'monospace', color: '#475569', fontSize: 13 },
  monoMathLarge: { fontFamily: 'monospace', color: '#0369A1', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 8 },
  logicHighlight: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#16A34A', marginTop: 10 },
  equivalenceCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderLeftWidth: 5, marginBottom: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  equivalenceTitle: { fontWeight: '900', fontSize: 14, marginBottom: 6, textTransform: 'uppercase' },
  subSectionBox: { backgroundColor: '#F9FAFB', padding: 16, borderRadius: 16 },
  subLabel: { fontSize: 12, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  calculationStep: { marginTop: 10, padding: 10, borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  italicText: { fontStyle: 'italic', color: '#94A3B8', fontSize: 12, marginTop: 5 },
  solverBox: { backgroundColor: '#0F172A', padding: 20, borderRadius: 20, marginVertical: 10 },
  stepText: { color: '#94A3B8', fontSize: 13, marginBottom: 6 },
  resultText: { color: '#38BDF8', fontWeight: 'bold', fontSize: 16, textAlign: 'right', marginTop: 10, fontFamily: 'monospace' },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});