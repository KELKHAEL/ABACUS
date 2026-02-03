import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Divisibility_10_2() {
  
  const RuleItem = ({ rule, description, example, color }) => (
    <View style={[styles.ruleCard, { borderLeftColor: color }]}>
      <Text style={[styles.ruleTitle, { color: color }]}>{rule}</Text>
      <Text style={styles.ruleDesc}>{description}</Text>
      <View style={styles.ruleExampleBox}>
        <Text style={styles.ruleExampleText}>{example}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 10.2</Text>
          <Text style={styles.topicTitle}>Divisibility</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Divisibility is one of the most basic concepts in mathematics. It helps us find out whether a number can \"fit into\" another without leaving a remainder. When we work with multiples and factors, divisibility helps us understand how numbers interact. In discrete mathematics, where we work with discrete numbers or integer and finite sets, the concept of divisibility is used in a major portion."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this article we will see what it means for a number to be divisible, understand some rules, and check a couple of examples for a better understanding."}
          </Text>
        </View>

        {/* THE BASICS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>The Basics of Divisibility</Text>
          <Text style={styles.paragraph}>
            {"Divisibility means one number can be divided by another without leaving any leftover elements. The leftover part is known as remainder. For example, if we say \"6 divides 18,\" we mean that 18 can be divided by 6 without any remainder. So we could also write this as 6 | 18 which is mathematical shorthand for saying \"6 divides 18.\""}
          </Text>
          <Text style={styles.paragraph}>
            {"When two numbers, say a and b, they are involved in a division where a divides b. We can say a as a \"divisor\" or \"factor\" of b. This is like b is a \"multiple\" of a. This relationship is basic because it leads us to concepts like factors, multiples, and primes."}
          </Text>
          
          <View style={styles.exampleBox}>
            <Text style={styles.bold}>Examples:</Text>
            <Text style={styles.monoMath}>{"\u2022 4 divide 20 \u2212 Yes, because 20 \u00f7 4 = 5, a whole number."}</Text>
            <Text style={styles.monoMath}>{"\u2022 5 divide 30 \u2212 Yes, since 30 \u00f7 5 = 6, which also again results in a whole number."}</Text>
            <Text style={styles.monoMath}>{"\u2022 7 divide 45 \u2212 No, because 45 \u00f7 7 = 6 with a remainder of 3."}</Text>
          </View>
        </View>

        {/* NOTATION SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Divisibility Notation and Symbols</Text>
          <Text style={styles.paragraph}>
            {"In mathematics, when we try to express \"4 is a divisor of 20,\" we simply write 4 | 20. This vertical bar symbol \"|\" stands for \"divides.\" But, if 4 does not divide 20 evenly, we write it as 4 \u2226 20, where \"\u2226\" means \"does not divide.\""}
          </Text>
          
          <View style={styles.notationHighlight}>
            <View style={styles.notationItem}>
              <Text style={styles.symbolLarge}>{"a | b"}</Text>
              <Text style={styles.symbolDesc}>{"a divides b"}</Text>
            </View>
            <View style={styles.notationItem}>
              <Text style={styles.symbolLarge}>{"a \u2226 b"}</Text>
              <Text style={styles.symbolDesc}>{"/a does not divide b"}</Text>
            </View>
          </View>

          <Text style={styles.paragraph}>{"Example \u2212 4 | 28 is true because 28 divided by 4 gives 7. 5 \u2226 26 is also true because 26 divided by 5 does not yield a whole number."}</Text>
        </View>

        {/* RULES SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Basic Divisibility Rules</Text>
          <Text style={styles.paragraph}>{"Divisibility rules are like shortcuts which helps to find out if one number divides another without going through the division process."}</Text>
          
          <RuleItem 
            rule="Divisibility by 2" 
            color="#0284C7"
            description="A number is divisible by 2 if its last digit is even (0, 2, 4, 6, or 8)." 
            example="36 is divisible (6 is even). 17 is not (7 is odd)."
          />
          <RuleItem 
            rule="Divisibility by 3" 
            color="#7C3AED"
            description="A number is divisible by 3 if the sum of its digits is divisible by 3." 
            example="123 is divisible (1+2+3=6). 122 is not (1+2+2=5)."
          />
          <RuleItem 
            rule="Divisibility by 5" 
            color="#16A34A"
            description="A number is divisible by 5 if it ends in 0 or 5." 
            example="45 is divisible. 42 is not."
          />
        </View>

        {/* INTEGER OPERATIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Divisibility and Integer Operations</Text>
          <Text style={styles.subLabel}>Sum and Difference of Multiples</Text>
          <Text style={styles.paragraph}>{"If a | b and a | c, then a divides both b + c and b \u2212 c."}</Text>
          <View style={styles.calculationBox}>
            <Text style={styles.bold}>Example (4 | 12 and 4 | 16):</Text>
            <Text style={styles.monoMath}>{"12 + 16 = 28 and 4 | 28"}</Text>
            <Text style={styles.monoMath}>{"16 \u2212 12 = 4 and 4 | 4"}</Text>
          </View>

          <Text style={[styles.subLabel, {marginTop: 20}]}>Multiplying by an Integer</Text>
          <Text style={styles.paragraph}>{"If a | b, then a also divides any multiple of b."}</Text>
          <View style={styles.calculationBox}>
            <Text style={styles.bold}>Example (3 | 9):</Text>
            <Text style={styles.monoMath}>{"3 | (9 \u00d7 2) = 18"}</Text>
            <Text style={styles.monoMath}>{"3 | (9 \u00d7 3) = 27"}</Text>
          </View>
        </View>

        {/* PROBLEM SOLVING */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Problem Solving</Text>
          <View style={styles.problemRow}>
            <Text style={styles.bold}>Problem \u2212 </Text><Text style={styles.paragraph}>{"Does 6 divide 54?"}</Text>
          </View>
          <Text style={styles.solutionText}>{"Solution \u2212 Yes, because 54 \u00f7 6 = 9, which is an integer. So, 6 | 54."}</Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.bold}>Using Divisibility in Equations</Text>
          <Text style={styles.paragraph}>{"Suppose we need to find integers x and y such that 4x + 6y = 24. We can simplify this by noting that 4 divides 24, so we can factor out 4 to get x + 3y/2 = 6."}</Text>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we explained the concept of divisibility in discrete mathematics. Starting with the basics and some common rules, we explored how to identify if one number divides another. We also highlighted some divisibility rules that make it easier to handle numbers. Finally, we applied these ideas to solve integer-based equations."}
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
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  monoMath: { fontFamily: 'monospace', color: '#475569', fontSize: 13, marginBottom: 5 },
  notationHighlight: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: '#0F172A', borderRadius: 20, marginVertical: 15 },
  notationItem: { alignItems: 'center' },
  symbolLarge: { color: '#38BDF8', fontSize: 24, fontWeight: 'bold', fontFamily: 'monospace' },
  symbolDesc: { color: '#94A3B8', fontSize: 11, marginTop: 5, textTransform: 'uppercase' },
  ruleCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderLeftWidth: 5, marginBottom: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  ruleTitle: { fontWeight: '900', fontSize: 14, marginBottom: 4 },
  ruleDesc: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  ruleExampleBox: { marginTop: 8, padding: 8, backgroundColor: '#F8FAFC', borderRadius: 8 },
  ruleExampleText: { fontSize: 12, color: '#475569', fontStyle: 'italic' },
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  calculationBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 5 },
  problemRow: { flexDirection: 'row', alignItems: 'center' },
  solutionText: { color: '#16A34A', fontWeight: '700', fontSize: 14, marginTop: 5 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 15 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});