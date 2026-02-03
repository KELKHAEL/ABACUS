import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PascalsTriangle_4_9() {
  
  // Custom Component for Pascal Patterns
  const PatternCard = ({ title, logic, icon, color }) => (
    <View style={[styles.patternCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.cardText}>{logic}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Pascal's Triangle looks simple at first glance but has many layers. Whether counting combinations, working with binomial expansions, or figuring out recursive patterns, it helps in making the job easier."}
      </Text>

      {/* SECTION 1: DEFINITION & CONSTRUCTION */}
      <Text style={styles.sectionHeader}>{"What is Pascal's Triangle?"}</Text>
      <Text style={styles.paragraph}>
        {"It is a triangular pattern of numbers where each number is built from the two numbers directly above it. The first row starts with a 1 at the top. If there are no numbers above (on edges), we treat them as 0."}
      </Text>

      <View style={styles.triangleVisual}>
        <Text style={styles.triText}>{"1"}</Text>
        <Text style={styles.triText}>{"1   1"}</Text>
        <Text style={styles.triText}>{"1   2   1"}</Text>
        <Text style={styles.triText}>{"1   3   3   1"}</Text>
        <Text style={styles.triText}>{"1   4   6   4   1"}</Text>
        <Text style={styles.triText}>{"1   5  10  10   5   1"}</Text>
        <Text style={styles.triText}>{"1   6  15  20  15   6   1"}</Text>
      </View>
      <Text style={styles.caption}>{"The outer edges are always 1. Middle numbers are sums of pairs above."}</Text>

      {/* SECTION 2: RECURSIVE NATURE */}
      <Text style={styles.sectionHeader}>{"The Recursive Rule"}</Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaLabel}>{"Binomial Recurrence Relation:"}</Text>
        <Text style={styles.formulaText}>{"C(n, k) = C(n-1, k-1) + C(n-1, k)"}</Text>
      </View>

      {/* SECTION 3: KEY APPLICATIONS */}
      <Text style={styles.sectionHeader}>{"Hidden Patterns & Applications"}</Text>
      
      <PatternCard 
        title={"Binomial Expansions"}
        icon={"variable"}
        color={"#0369A1"}
        logic={"Each row gives the coefficients for (x + y)^n. For example, row 4 (1, 4, 6, 4, 1) gives coefficients for (x + y)^4."}
      />

      <PatternCard 
        title={"Fibonacci Numbers"}
        icon={"chart-line"}
        color={"#16941c"}
        logic={"Adding numbers along certain diagonals of the triangle generates the sequence: 1, 1, 2, 3, 5, 8, 13...."}
      />

      <PatternCard 
        title={"Powers of 2"}
        icon={"exponent"}
        color={"#9333ea"}
        logic={"The sum of numbers in each row gives powers of 2. Row 3: 1+3+3+1 = 8 = 2^3."}
      />

      <PatternCard 
        title={"Sierpinski Triangle"}
        icon={"triangle-outline"}
        color={"#B91C1C"}
        logic={"Coloring only the odd numbers in the triangle creates a repeating fractal pattern known as Sierpinski's Triangle."}
      />

      {/* SECTION 4: SYMMETRY */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{"Additional Properties:"}</Text>
        <Text style={styles.infoText}>{"• Symmetry: Each row mirrors itself on the left and right halves."}</Text>
        <Text style={styles.infoText}>{"• Triangular Numbers: The third diagonal contains numbers that form equilateral triangles (1, 3, 6, 10...)."}</Text>
        <Text style={styles.infoText}>{"• Catalan Numbers: Can be found using specific binomial coefficient formulas within the triangle."}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the structure of Pascal's Triangle and its vital role in discrete mathematics. From basic counting and combinations to complex recursive relationships and fractals, it provides deep insight into mathematical problems."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  triangleVisual: { backgroundColor: '#0f172a', paddingVertical: 25, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  triText: { color: 'white', fontFamily: 'monospace', fontSize: 14, letterSpacing: 4, marginBottom: 5 },
  caption: { fontSize: 11, color: '#94A3B8', textAlign: 'center', fontStyle: 'italic', marginBottom: 10 },
  formulaBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', marginBottom: 20 },
  formulaLabel: { fontSize: 12, color: '#64748B', fontWeight: 'bold', marginBottom: 8 },
  formulaText: { fontSize: 16, color: '#0F172A', fontWeight: 'bold', fontFamily: 'monospace' },
  patternCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  cardText: { fontSize: 13, color: '#475569', lineHeight: 20 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginVertical: 15 },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#0369A1', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#334155', marginBottom: 6, lineHeight: 18 }
});