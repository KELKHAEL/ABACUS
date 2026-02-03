import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NumberTheory_10_1() {
  
  const MathDefinition = ({ term, definition }) => (
    <View style={styles.definitionRow}>
      <Text style={styles.bold}>{term}: </Text>
      <Text style={styles.definitionText}>{definition}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 10.1</Text>
          <Text style={styles.topicTitle}>Number Theory</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Number Theory deals with the properties and relationships of numbers, particularly integers. It has applications in cryptography, coding theory, and computer science. It is also known as the \"Queen of Mathematics\"."}
          </Text>
          <Text style={styles.paragraph}>
            {"It's the Number Theory that is acts as the origin of other important concepts like divisibility, prime numbers, and modular arithmetic that offer insights into the structure and behavior of natural numbers. In this chapter, we will highlight some of the fundamental concepts of Number Theory and explain their role in Discrete Mathematics."}
          </Text>
        </View>

        {/* BASICS SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>The Basics of Number Theory</Text>
          <Text style={styles.paragraph}>
            {"Number Theory focuses on the properties of natural numbers\u2014the set of integers used for counting and ordering. In discrete mathematics, natural numbers often solve problems requiring whole number solutions, such as counting or forming combinations."}
          </Text>
          <Text style={styles.paragraph}>
            {"Traditionally a branch of pure mathematics, Number Theory now has modern applications in fields like cryptography, where prime numbers play a crucial role in securing digital communication."}
          </Text>
        </View>

        {/* PROPERTIES SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Properties of Number Theory</Text>
          
          <Text style={styles.subLabel}>Divisibility</Text>
          <Text style={styles.paragraph}>
            {"Divisibility means one number is dividing another without a remainder. For an integer a that can be divided by an integer b such that the result is an integer. So b divides a; it can be written as b | a."}
          </Text>
          <View style={styles.exampleBox}>
            <Text style={styles.monoMath}>{"\u2022 4 | 20 \u2212 True (Result: 5)"}</Text>
            <Text style={styles.monoMath}>{"\u2022 20 | 4 \u2212 False (Does not divide evenly)"}</Text>
          </View>

          <Text style={styles.subLabel}>Prime Numbers & Factorization</Text>
          <Text style={styles.paragraph}>
            {"Prime numbers are natural numbers greater than 1 that have no divisors other than 1 and themselves. The fundamental theorem of arithmetic states every integer > 1 can be represented as a product of primes."}
          </Text>
          <View style={styles.logicHighlight}>
            <Text style={styles.highlightText}>{"Example: 28 can be factored as 2\u00b2 \u00d7 7."}</Text>
          </View>
        </View>

        {/* MODULAR ARITHMETIC SECTION */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#0284C7" />
            <Text style={[styles.sectionTitle, {color: '#0284C7', marginBottom: 0, marginLeft: 10}]}>Modular Arithmetic</Text>
          </View>
          <Text style={styles.paragraph}>
            {"Sometimes called \"clock arithmetic,\" it is a system where numbers \"wrap around\" after reaching a certain value called the modulus."}
          </Text>

          <View style={styles.formulaBox}>
            <Text style={styles.formulaLabel}>The Modulo Operation</Text>
            <Text style={styles.monoMathLarge}>{"17 \u2261 2 (mod 5)"}</Text>
            <Text style={styles.formulaSub}>{"Because 17 divided by 5 leaves a remainder of 2."}</Text>
          </View>

          <Text style={styles.bold}>{"Properties of Congruence:"}</Text>
          <Text style={styles.paragraph}>{"Congruence maintains consistency through addition, subtraction, and multiplication."}</Text>
          <View style={styles.calculationBox}>
            <Text style={styles.calculationText}>{"If 8 \u2261 3 (mod 5) and 12 \u2261 2 (mod 5):"}</Text>
            <Text style={styles.mathResult}>{"8 + 12 \u2261 3 + 2 (mod 5) \u2261 0 (mod 5)"}</Text>
          </View>
        </View>

        {/* APPLICATIONS SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Applications</Text>
          <MathDefinition term="Cryptography" definition="Base for RSA algorithm; uses difficulty of factoring large numbers to create secure keys." />
          <MathDefinition term="Coding Theory" definition="Uses modular arithmetic to create error-detecting/correcting codes for digital transmission." />
          <MathDefinition term="Diophantine Equations" definition="Equations like ax + by = c requiring integer solutions (e.g., postage amounts)." />
        </View>

        {/* ADVANCED TOPICS SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Advanced Topics</Text>
          
          <View style={styles.algoBox}>
            <Text style={styles.algoTitle}>The Division Algorithm</Text>
            <Text style={styles.monoMath}>{"a = bq + r  where  0 \u2264 r < |b|"}</Text>
            <Text style={styles.smallText}>{"Example: 23 = 5 \u00d7 4 + 3 (Quotient 4, Remainder 3)"}</Text>
          </View>

          <Text style={styles.bold}>{"Greatest Common Divisor (GCD):"}</Text>
          <Text style={styles.paragraph}>{"The largest integer that divides both numbers without a remainder. Computed via the Euclidean algorithm (e.g., GCD of 28 and 35 is 7)."}</Text>

          <View style={styles.theoremBox}>
            <Text style={styles.theoremTitle}>Fermat's Little Theorem</Text>
            <Text style={styles.paragraph}>{"If p is prime, for any integer a not divisible by p:"}</Text>
            <Text style={styles.monoMathLarge}>{"a^(p\u22121) \u2261 1 (mod p)"}</Text>
            <Text style={styles.smallText}>{"Example: For a=2, p=7: 2\u2076 \u2261 1 (mod 7)"}</Text>
          </View>

          <Text style={styles.bold}>{"Remainder Classes:"}</Text>
          <Text style={styles.paragraph}>{"Group numbers by their remainder (e.g., modulo 5 classes are {0, 1, 2, 3, 4})."}</Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we explained concepts including divisibility, prime numbers, modular arithmetic, and Diophantine equations. We covered basic operations like GCD and modular exponentiation, Fermat's Little Theorem and remainder classes."}
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
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 15, marginBottom: 12, letterSpacing: 1 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginVertical: 10 },
  monoMath: { fontFamily: 'monospace', color: '#0F172A', fontSize: 14, marginBottom: 5 },
  monoMathLarge: { fontFamily: 'monospace', color: '#0369A1', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  logicHighlight: { backgroundColor: '#F0FDF4', padding: 12, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#16A34A', marginTop: 10 },
  highlightText: { color: '#166534', fontSize: 14, fontWeight: '600' },
  formulaBox: { backgroundColor: '#F0F9FF', padding: 20, borderRadius: 20, marginVertical: 15, borderWidth: 1, borderColor: '#BAE6FD' },
  formulaLabel: { fontSize: 12, fontWeight: '800', color: '#0369A1', textAlign: 'center', textTransform: 'uppercase' },
  formulaSub: { fontSize: 12, color: '#64748B', textAlign: 'center' },
  calculationBox: { backgroundColor: '#F1F5F9', padding: 16, borderRadius: 16, marginTop: 5 },
  calculationText: { fontSize: 13, color: '#64748B', textAlign: 'center' },
  mathResult: { fontSize: 15, fontWeight: 'bold', color: '#0F172A', textAlign: 'center', marginTop: 5, fontFamily: 'monospace' },
  definitionRow: { marginBottom: 12 },
  definitionText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  algoBox: { backgroundColor: '#0F172A', borderRadius: 20, padding: 20, marginVertical: 15 },
  algoTitle: { color: '#38BDF8', fontSize: 12, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
  smallText: { fontSize: 12, color: '#94A3B8', marginTop: 5 },
  theoremBox: { backgroundColor: '#F5F3FF', padding: 20, borderRadius: 20, borderLeftWidth: 4, borderLeftColor: '#7C3AED', marginVertical: 15 },
  theoremTitle: { color: '#5B21B6', fontWeight: 'bold', fontSize: 15, marginBottom: 10 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});