import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BinomialCoefficients_4_8() {
  
  // Custom Component for Formula Cards
  const FormulaCard = ({ title, formula, subtext, color = "#0369A1" }) => (
    <View style={[styles.formulaCard, { borderTopColor: color }]}>
      <Text style={[styles.formulaTitle, { color: color }]}>{title}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{formula}</Text>
      </View>
      {subtext && <Text style={styles.formulaSub}>{subtext}</Text>}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Binomial coefficients are used not only in combinatorics, but also in probability and algebra. They are expressions of the form <Text style={styles.bold}>(x + y)ⁿ</Text>. Every time we multiply out a binomial, these coefficients help figure out the size of the terms in the expansion.
      </Text>

      {/* --- WHAT ARE THEY --- */}
      <Text style={styles.sectionHeader}>What are Binomial Coefficients?</Text>
      <Text style={styles.paragraph}>
        Written as <Text style={styles.bold}>C(n, k)</Text> or <Text style={styles.bold}>(ⁿₖ)</Text>, this is read as <Text style={styles.bold}>"n choose k"</Text>. It represents the number of ways to choose k elements from a set of n elements without caring about the order.
      </Text>

      <FormulaCard 
        title="General Formula"
        formula="C(n, k) = n! / [k!(n - k)!]"
        subtext="n! (n factorial) is the product of all positive integers from 1 up to n."
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example Calculation:</Text>
        <Text style={styles.exampleText}>
          To select 3 objects out of 5: {"\n"}
          C(5, 3) = 5! / [3!(5-3)!] = (5 × 4) / 2! = <Text style={styles.bold}>10 ways</Text>.
        </Text>
      </View>

      {/* --- BINOMIAL EXPANSIONS --- */}
      <Text style={styles.sectionHeader}>Binomial Expansions</Text>
      <Text style={styles.paragraph}>
        Binomial coefficients tell us the numbers in front of terms in an expanded expression.
      </Text>

      <View style={styles.expansionCard}>
        <Text style={styles.expansionTitle}>Expanding (x + y)³</Text>
        <Text style={styles.expansionMath}>x³ + 3x²y + 3xy² + y³</Text>
        <Text style={styles.caption}>The coefficients are 1, 3, 3, and 1.</Text>
      </View>

      <View style={[styles.expansionCard, { backgroundColor: '#F0F9FF', borderColor: '#BAE6FD' }]}>
        <Text style={[styles.expansionTitle, { color: '#0369A1' }]}>Expanding (x + y)⁵</Text>
        <Text style={[styles.expansionMath, { color: '#0369A1' }]}>x⁵ + 5x⁴y + 10x³y² + 10x²y³ + 5xy⁴ + y⁵</Text>
        <Text style={[styles.caption, { color: '#64748B' }]}>Coefficients: C(5,0)=1, C(5,1)=5, C(5,2)=10...</Text>
      </View>

      {/* --- COUNTING PROBLEMS --- */}
      <Text style={styles.sectionHeader}>Counting Problems</Text>
      <View style={styles.infoBox}>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="select-group" size={20} color="#16941c" />
          <Text style={styles.infoText}><Text style={styles.bold}>Choosing a Subset:</Text> Selecting 3 elements from {"{1,2,3,4,5}"} is C(5,3) = 10 ways.</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="account-group" size={20} color="#16941c" />
          <Text style={styles.infoText}><Text style={styles.bold}>Forming Committees:</Text> Picking 2 members from 6 people is C(6,2) = 15 ways.</Text>
        </View>
      </View>

      {/* --- RECURRENCE RELATION --- */}
      <Text style={styles.sectionHeader}>Recurrence Relation</Text>
      <Text style={styles.paragraph}>
        We can calculate any binomial coefficient based on smaller ones. This allows us to build solutions step-by-step without large factorials.
      </Text>

      <FormulaCard 
        title="The Relation"
        color="#16941c"
        formula="C(n, k) = C(n-1, k-1) + C(n-1, k)"
      />

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example Breakdown:</Text>
        <Text style={styles.exampleText}>
          C(5, 3) = C(4, 2) + C(4, 3) {"\n"}
          C(5, 3) = 6 + 4 = <Text style={styles.bold}>10</Text>.
        </Text>
      </View>

      {/* --- RESPONSIVE PASCAL'S TRIANGLE --- */}
      <Text style={styles.sectionHeader}>Pascal's Triangle</Text>
      <Text style={styles.paragraph}>
        A triangular arrangement where each number is the sum of the two numbers directly above it. Each row corresponds to a specific power (n).
      </Text>

      <View style={styles.triangleContainer}>
        <View style={styles.triangleCard}>
          <View style={styles.triangleRow}><Text style={styles.triText}>1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   2   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   3   3   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   4   6   4   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   5   10  10  5   1</Text></View>
        </View>
        <Text style={styles.caption}>To find C(5,3), look at the 6th row, 4th number: 10.</Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explored how binomial coefficients are essential in expanding binomials and solving counting problems. We understood their calculation using factorials, the recurrence relation, and the visual power of Pascal's Triangle.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  formulaCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  formulaTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' },
  formulaBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  formulaSub: { fontSize: 12, color: '#64748B', marginTop: 8, fontStyle: 'italic', textAlign: 'center' },
  
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#BBF7D0' },
  exampleText: { fontSize: 14, color: '#166534', marginTop: 5, lineHeight: 20 },
  
  expansionCard: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 15 },
  expansionTitle: { fontSize: 15, fontWeight: 'bold', color: '#9A3412', marginBottom: 5 },
  expansionMath: { fontFamily: 'monospace', fontSize: 14, color: '#C2410C', fontWeight: 'bold' },
  caption: { fontSize: 12, color: '#94A3B8', marginTop: 8 },
  
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start' },
  infoText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#475569', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  
  // Responsive Triangle UI
  triangleContainer: { marginVertical: 15, alignItems: 'center', width: '100%' },
  triangleCard: { 
    backgroundColor: '#104a28', 
    paddingVertical: 20, 
    paddingHorizontal: 10, 
    borderRadius: 15, 
    width: '100%',
    maxWidth: 400,
    alignItems: 'center', 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2 
  },
  triangleRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 2, width: '100%' },
  triText: { color: 'white', fontFamily: 'monospace', fontSize: 15, fontWeight: 'bold' }
});