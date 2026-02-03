import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RemainderClasses_10_3() {
  
  const RemainderSet = ({ className, values, color }) => (
    <View style={[styles.setCard, { borderLeftColor: color }]}>
      <Text style={[styles.setLabel, { color: color }]}>Class {className}</Text>
      <Text style={styles.setText}>{values}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 10.3</Text>
          <Text style={styles.topicTitle}>Remainder Classes</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Remainder classes are ways of grouping numbers based on their remainders when divided by a certain number. Remainder classes have a wide range of applications, especially in domains that require working with integers or finite sets."}
          </Text>
          <Text style={styles.paragraph}>
            {"In this chapter, we will see the basics of remainder classes, explain how they work, and and explore a few examples to understand the concept better."}
          </Text>
        </View>

        {/* SECTION 1: WHAT ARE REMAINDER CLASSES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>What are Remainder Classes?</Text>
          <Text style={styles.paragraph}>
            {"The concept behind remainder classes is simple. When we divide the numbers by another number, each result may keep a remainder. The numbers that give the same remainder will be classified into the same class. In other words, all the numbers that leave a remainder will be in same class."}
          </Text>
          <Text style={styles.paragraph}>
            {"When we talk about remainder classes in mathematics, we use the phrase \"modulo.\" Modulo refers to the divisor we are working on. For example, in modulo 5, we are only interested with remainders when numbers are divided by 5. So, we would have remainder classes like 0, 1, 2, 3, and 4."}
          </Text>
          <View style={styles.exampleBox}>
            <Text style={styles.bold}>{"Example:"}</Text>
            <Text style={styles.paragraph}>{"In modulo 3, the remainder classes would be 0, 1, and 2. This is because any number divided by 3 will give one of these remainders."}</Text>
          </View>
        </View>

        {/* MODULO OPERATION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Modulo Operation</Text>
          <Text style={styles.paragraph}>
            {"The modulo operation is written as \"mod,\" this is important to remainder classes. When we say a \u2261 b (mod n), we are saying that a and b are in the same remainder class modulo n. This means they have the same remainder when divided by n."}
          </Text>
          
          <View style={styles.logicHighlight}>
            <Text style={styles.bold}>{"Modulo 4 Example:"}</Text>
            <Text style={styles.paragraph}>{"\u2022 8 and 12 both leave a remainder of 0 when divided by 4, so they are in the same remainder class 0."}</Text>
            <Text style={styles.paragraph}>{"\u2022 5 and 9 both leave a remainder of 1. When it is divided by 4, they are in the remainder class 1 (mod 4)."}</Text>
          </View>
        </View>

        {/* DEFINING CLASSES MODULO N */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Defining Remainder Classes Modulo n</Text>
          <Text style={styles.paragraph}>
            {"In discrete mathematics, we define remainder classes using a divisor n. For any integer n, there are n possible remainder classes. These are labeled from 0 up to n \u2212 1. Here each class contains numbers that share the same remainder when divided by n."}
          </Text>

          <Text style={styles.subLabel}>Modulo 5 Classes</Text>
          <RemainderSet className="0" values="0, 5, 10, 15, ..." color="#0284C7" />
          <RemainderSet className="1" values="1, 6, 11, 16, ..." color="#7C3AED" />
          <RemainderSet className="2" values="2, 7, 12, 17, ..." color="#16A34A" />
          <RemainderSet className="3" values="3, 8, 13, 18, ..." color="#EA580C" />
          <RemainderSet className="4" values="4, 9, 14, 19, ..." color="#EF4444" />
        </View>

        {/* PARTITIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Partitions of Integers</Text>
          <Text style={styles.paragraph}>
            {"One of the important things about remainder classes is that they split the set of all integers into distinct groups or \"partitions.\" Each number falls into exactly one remainder class for a given modulo. It ensures that all possible integers are covered without overlap between classes."}
          </Text>
          
          <View style={styles.partitionBox}>
            <Text style={styles.bold}>{"Modulo 3 Partitioning:"}</Text>
            <Text style={styles.monoMath}>{"Class 0: ..., -9, -6, -3, 0, 3, 6, 9, ..."}</Text>
            <Text style={styles.monoMath}>{"Class 1: ..., -8, -5, -2, 1, 4, 7, 10, ..."}</Text>
            <Text style={styles.monoMath}>{"Class 2: ..., -7, -4, -1, 2, 5, 8, 11, ..."}</Text>
          </View>
        </View>

        {/* APPLICATIONS SECTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Practical Applications</Text>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="shield-key-outline" size={20} color="#475569" />
            <Text style={styles.appText}><Text style={styles.bold}>{"Cryptography: "}</Text>{"Assigning data points to remainder classes to create unique codes."}</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="calendar-clock" size={20} color="#475569" />
            <Text style={styles.appText}><Text style={styles.bold}>{"Calendar Cycles: "}</Text>{"Using modulo 7 to determine the day of the week (e.g., today is Monday, in 10 days it is Thursday)."}</Text>
          </View>
          <View style={styles.appRow}>
            <MaterialCommunityIcons name="alert-circle-check-outline" size={20} color="#475569" />
            <Text style={styles.appText}><Text style={styles.bold}>{"Coding Theory: "}</Text>{"Detecting and correcting errors based on expected remainder classes."}</Text>
          </View>
        </View>

        {/* FINDING CLASSES - EXAMPLES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Finding Remainder Classes</Text>
          <View style={styles.problemBox}>
            <Text style={styles.bold}>Example 1: Modulo 5</Text>
            <Text style={styles.paragraph}>{"Find the remainder class of 28 in modulo 5."}</Text>
            <Text style={styles.solutionText}>{"Solution \u2212 28 \u00f7 5 = 5 rem 3. Class: 3 (mod 5)."}</Text>
          </View>

          <View style={styles.problemBox}>
            <Text style={styles.bold}>Example 2: Modulo 6</Text>
            <Text style={styles.paragraph}>{"Find the remainder class of -14 in modulo 6."}</Text>
            <Text style={styles.solutionText}>{"Solution \u2212 -14 \u00f7 6 gives a remainder of 4. Class: 4 (mod 6)."}</Text>
          </View>
        </View>

        {/* CONCLUSION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Conclusion</Text>
          <Text style={styles.paragraph}>
            {"Remainder classes is a key concept in discrete mathematics that helps in grouping numbers based on their remainders. In this chapter, we explained the basics of remainder classes and looked into how they are defined for any integer n. We also covered how they create partitions of integers."}
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
  subLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginTop: 15, marginBottom: 12, letterSpacing: 1 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CBD5E1', marginTop: 10 },
  logicHighlight: { backgroundColor: '#F0FDF4', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#16A34A', marginTop: 10 },
  setCard: { backgroundColor: '#FFF', padding: 12, borderRadius: 12, borderLeftWidth: 5, marginBottom: 8, borderWidth: 1, borderColor: '#F1F5F9' },
  setLabel: { fontWeight: '900', fontSize: 12, marginBottom: 2 },
  setText: { color: '#64748B', fontSize: 13, fontFamily: 'monospace' },
  partitionBox: { backgroundColor: '#0F172A', padding: 20, borderRadius: 20, marginVertical: 10 },
  monoMath: { fontFamily: 'monospace', color: '#38BDF8', fontSize: 12, marginBottom: 5 },
  appRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
  appText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#475569', lineHeight: 20 },
  problemBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  solutionText: { color: '#16A34A', fontWeight: '700', fontSize: 14, marginTop: 8 },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 }
});