import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Combinatorics_4_2() {
  
  // Custom UI Card for Combinatorics Building Blocks
  const ConceptCard = ({ title, content, icon, color = "#16941c" }) => (
    <View style={[styles.conceptCard, { borderTopColor: color }]}>
      <View style={styles.conceptHeader}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.conceptTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.conceptText}>{content}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        Combinatorics is all about figuring out different ways of counting and arranging to solve problems on discrete objects. Whether it is finding how many different dresses can be made from available clothes or arranging books on a shelf, you are dealing with combinatorics.
      </Text>

      <Text style={styles.sectionHeader}>Why Combinatorics in Discrete Math?</Text>
      <Text style={styles.paragraph}>
        It is essential for designing efficient algorithms, calculating odds in probability theory, and even planning seating arrangements for journeys.
      </Text>

      {/* SECTION 1: THE BUILDING BLOCKS */}
      <Text style={styles.sectionHeader}>The Building Blocks of Combinatorics</Text>

      <ConceptCard 
        title="Additive & Multiplicative"
        icon="plus-minus-box"
        content="The additive principle is used for separate ways (3 shirts + 2 pants = 5 items). The multiplicative principle is for dependent choices (3 shirts × 2 pants = 6 outfits)."
      />

      <ConceptCard 
        title="Counting with Sets"
        icon="set-center"
        color="#0369A1"
        content="Combinatorics uses set theory to group objects together and count them, much like organizing balls into different boxes."
      />

      <ConceptCard 
        title="Inclusion and Exclusion"
        icon="set-merge"
        color="#9333ea"
        content="Helps us count overlapping sets (like students liking both Math and Chemistry) without double-counting people."
      />

      {/* SECTION 2: SPECIAL STRUCTURES */}
      <Text style={styles.sectionHeader}>Bit Strings and Lattice Paths</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Bit Strings</Text>
        <Text style={styles.paragraphSmall}>
          Special to computer science and electronics, these are sequences of 0s and 1s. Combinatorics helps us count different bit strings and understand their properties.
        </Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.subHeader}>Lattice Paths</Text>
        <Text style={styles.paragraphSmall}>
          These are like grids. Lattice paths are about finding different ways to move from one corner to another by only moving right or up.
        </Text>
      </View>

      {/* SECTION 3: PASCAL'S TRIANGLE */}
      <Text style={styles.sectionHeader}>Binomial Coefficients & Pascal's Triangle</Text>
      <Text style={styles.paragraph}>
        Binomial coefficients are about choosing subsets from a larger set. Pascal's Triangle is a pattern where each number is the sum of the two directly above it.
      </Text>

      <View style={styles.triangleBox}>
        <Text style={styles.triangleText}>1</Text>
        <Text style={styles.triangleText}>1   1</Text>
        <Text style={styles.triangleText}>1   2   1</Text>
        <Text style={styles.triangleText}>1   3   3   1</Text>
        <Text style={styles.triangleText}>1   4   6   4   1</Text>
      </View>

      {/* SECTION 4: REAL WORLD APPLICATIONS */}
      <Text style={styles.sectionHeader}>Real-World Applications</Text>
      <View style={styles.appGrid}>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#B91C1C" />
          <Text style={styles.appTitle}>Password Security</Text>
          <Text style={styles.appDesc}>Increasing combinations to make guessing harder.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="dna" size={24} color="#059669" />
          <Text style={styles.appTitle}>Genetic Studies</Text>
          <Text style={styles.appDesc}>Understanding gene combinations and patterns.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="share-variant" size={24} color="#2563EB" />
          <Text style={styles.appTitle}>Social Networks</Text>
          <Text style={styles.appDesc}>"People you may know" suggestions.</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the different fields of combinatorics in discrete mathematics. We understood basic additive/multiplicative rules, then presented complex ideas like the pigeonhole principle and inclusion-exclusion. We also highlighted how these count bit strings and navigate lattice paths.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 13, color: '#64748B', lineHeight: 20 },
  conceptCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  conceptHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  conceptTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  conceptText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 15 },
  triangleBox: { backgroundColor: '#104a28', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  triangleText: { color: 'white', fontFamily: 'monospace', fontSize: 16, letterSpacing: 8, marginBottom: 5 },
  appGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  appItem: { width: '48%', backgroundColor: '#F9FAFB', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#F3F4F6', marginBottom: 15 },
  appTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginTop: 8, marginBottom: 4 },
  appDesc: { fontSize: 11, color: '#64748B', lineHeight: 16 }
});