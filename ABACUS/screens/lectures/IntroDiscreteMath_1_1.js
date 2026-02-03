import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IntroDiscreteMath_1_1() {
  return (
    <View style={styles.container}>
      {/* 1. INTRODUCTION SECTION */}
      <Text style={styles.paragraph}>
        Discrete mathematics is a branch of mathematics that deals with objects that can assume only distinct values. This is in contrast to continuous mathematics that focuses on continuous, smooth functions. 
      </Text>
      
      <Text style={styles.paragraph}>
        Discrete mathematics shows structures that are fundamentally discrete. The term "discrete" refers to the fact that these structures can be counted in whole numbers, unlike continuous structures that can take on any value within a range.
      </Text>

      <Text style={styles.subHeader}>Mathematics Classifications</Text>
      <Text style={styles.paragraph}>Mathematics can be broadly classified into two categories:</Text>
      
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.bold}>Continuous Mathematics</Text> – It is based upon continuous number line or the real numbers. It is characterized by the fact that between any two numbers, there are almost always an infinite set of numbers. For example, a function in continuous mathematics can be plotted in a smooth curve without breaks.
        </Text>
      </View>

      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.bold}>Discrete Mathematics</Text> – It involves distinct values; i.e. between any two points, there are a countable number of points. For example, if we have a finite set of objects, the function can be defined as a list of ordered pairs having these objects, and can be presented as a complete list of those pairs.
        </Text>
      </View>

      {/* 2. IMPORTANCE SECTION */}
      <Text style={styles.sectionHeader}>Importance of Discrete Mathematics</Text>
      <Text style={styles.paragraph}>
        There are several reasons why discrete mathematics plays an important role in computer science. Let us analyze some of the important reasons in this section.
      </Text>

      <Text style={styles.subHeader}>Foundation for Programming and Algorithms</Text>
      <Text style={styles.paragraph}>
        Discrete mathematics provides the logical foundation for many programming concepts:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Boolean Logic</Text> – Used in conditional statements and logical operations.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Set Theory</Text> – Applied in database management and data structures.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Graph Theory</Text> – Utilized in network design and pathfinding algorithms.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Combinatorics</Text> – Essential for analyzing algorithm efficiency and complexity.</Text>
      </View>

      {/* 3. KEY CONCEPTS SECTION */}
      <Text style={styles.sectionHeader}>Key Concepts in Discrete Mathematics</Text>
      <Text style={styles.paragraph}>
        Let us see some key concepts that are particularly relevant to Computer Science:
      </Text>

      <Text style={styles.subHeader}>Set Theory</Text>
      <Text style={styles.paragraph}>
        Sets are collections of distinct objects. In computer science, sets are used to model data structures and databases. For example:
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>A = {'{1, 2, 3, 4, 5}'}</Text>
        <Text style={styles.exampleText}>B = {'{2, 4, 6, 8, 10}'}</Text>
        <Text style={[styles.exampleText, {marginTop: 10, color: '#16941c', fontWeight: 'bold'}]}>
          Intersection – A ∩ B = {'{2, 4}'}
        </Text>
        <Text style={[styles.exampleText, {color: '#16941c', fontWeight: 'bold'}]}>
          Union – A ∪ B = {'{1, 2, 3, 4, 5, 6, 8, 10}'}
        </Text>
      </View>

      <Text style={styles.subHeader}>Number Theory</Text>
      <Text style={styles.paragraph}>
        Number theory focuses on the properties of integers. It is essential for cryptography. For example, the Euclidean algorithm for finding the greatest common divisor (GCD):
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• GCD(48, 18):</Text>
        <Text style={styles.exampleText}>  48 = 2 × 18 + 12</Text>
        <Text style={styles.exampleText}>  18 = 1 × 12 + 6</Text>
        <Text style={styles.exampleText}>  12 = 2 × 6 + 0</Text>
        <Text style={[styles.exampleText, {fontWeight: 'bold'}]}>  GCD(48, 18) = 6</Text>
      </View>

      <Text style={styles.paragraph}>
        We will discuss each of these concepts in the subsequent chapters of this tutorial.
      </Text>

      <Text style={styles.subHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we touched upon the fundamental concepts of discrete mathematics and its crucial importance in computer science. We explained how discrete mathematics provides the foundation for various areas including programming, data structures, algorithms, cryptography, and artificial intelligence.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 20 },
  sectionHeader: { fontSize: 22, fontWeight: '900', color: '#0F172A', marginTop: 30, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 12 },
  subHeader: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginTop: 20, marginBottom: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 25, marginBottom: 15, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  bulletContainer: { flexDirection: 'row', marginBottom: 12, paddingLeft: 5 },
  bullet: { fontSize: 18, color: '#16941c', marginRight: 10, lineHeight: 22 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 24 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  exampleText: { fontFamily: 'monospace', fontSize: 14, color: '#334155', lineHeight: 22 }
});