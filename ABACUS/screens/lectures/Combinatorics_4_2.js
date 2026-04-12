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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Combinatorics</Text> is all about figuring out different ways of counting and arranging to solve problems on discrete objects. For example, when we are trying to find out how many different dresses we can make from the clothes available or how many ways we can arrange the books on a shelf, then we are dealing with combinatorics problems.
      </Text>

      {/* --- WHY USE IT --- */}
      <Text style={styles.sectionHeader}>Why Combinatorics in Discrete Math?</Text>
      <Text style={styles.paragraph}>
        Combinatorics are very much useful in all sorts of areas while counting. If we think about computer science, when we are designing algorithms or working with data structures, we need to know how to count efficiently. In probability theory, understanding combinations helps us calculate odds.
      </Text>

      {/* --- SECTION 1: THE BUILDING BLOCKS --- */}
      <Text style={styles.sectionHeader}>The Building Blocks of Combinatorics</Text>

      <ConceptCard 
        title="Additive & Multiplicative"
        icon="plus-minus-box"
        content="The additive principle is used for separate ways (3 shirts + 2 pants = 5 items). The multiplicative principle is used when choices depend on each other (3 shirts × 2 pants = 6 outfits)."
      />

      <ConceptCard 
        title="Counting with Sets"
        icon="set-center"
        color="#0369A1"
        content="We use sets to group objects together and then count them. It is like organizing balls into different boxes and then counting the boxes or balls per box."
      />

      <ConceptCard 
        title="Inclusion and Exclusion"
        icon="set-merge"
        color="#9333ea"
        content="Helps us count overlapping sets (like students liking both Math and Chemistry) without double-counting people."
      />

      {/* --- SECTION 2: SPECIAL STRUCTURES --- */}
      <Text style={styles.sectionHeader}>Bit Strings and Lattice Paths</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Bit Strings</Text>
        <Text style={styles.paragraphSmall}>
          Special into computer science and electronics, bit strings are sequences of 0s and 1s. Combinatorics helps us count different bit strings and understand their properties.
        </Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.subHeader}>Lattice Paths</Text>
        <Text style={styles.paragraphSmall}>
          Lattice paths are all about finding different ways to move from one corner of a grid to another, only moving right or up.
        </Text>
      </View>

      {/* --- SECTION 3: PASCAL'S TRIANGLE --- */}
      <Text style={styles.sectionHeader}>Binomial Coefficients & Pascal's Triangle</Text>
      <Text style={styles.paragraph}>
        Binomial coefficients are about choosing subsets from a larger set. Pascal's Triangle is a pattern that helps us calculate these coefficients easily.
      </Text>

      {/* --- HARDCODED PASCAL TRIANGLE (Pyramid) --- */}
      {/* --- RESPONSIVE PASCAL'S TRIANGLE --- */}
      <View style={styles.triangleContainer}>
        <Text style={styles.triangleLabel}>Pascal's Triangle Pattern</Text>
        <View style={styles.triangleCard}>
          <View style={styles.triangleRow}><Text style={styles.triangleText}>1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triangleText}>1   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triangleText}>1   2   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triangleText}>1   3   3   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triangleText}>1   4   6   4   1</Text></View>
        </View>
        <Text style={styles.caption}>Each number is the sum of the two numbers directly above it.</Text>
      </View>

      {/* --- PERMUTATIONS & COMBINATIONS --- */}
      <Text style={styles.sectionHeader}>Permutations and Combinations</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Permutations</Text> are about arranging things in different orders (like the word "MATH"). <Text style={styles.bold}>Combinations</Text> are about selecting things without caring about the order (like choosing 3 scoops for an ice cream cone).
      </Text>

      {/* --- PIGEONHOLE PRINCIPLE --- */}
      <Text style={styles.sectionHeader}>Pigeonhole Principle</Text>
      <View style={styles.pigeonBox}>
        <MaterialCommunityIcons name="bird" size={24} color="#B91C1C" />
        <Text style={styles.pigeonText}>
          If we have more pigeons than pigeonholes, at least one hole must have more than one pigeon. It is a simple but powerful tool for solving discrete problems.
        </Text>
      </View>

      {/* --- SECTION 4: REAL WORLD APPLICATIONS --- */}
      <Text style={styles.sectionHeader}>Real-World Examples</Text>
      <View style={styles.appGrid}>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="#B91C1C" />
          <Text style={styles.appTitle}>Password Security</Text>
          <Text style={styles.appDesc}>Increasing combinations to make guessing harder.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="tournament" size={24} color="#F59E0B" />
          <Text style={styles.appTitle}>Sports Schedules</Text>
          <Text style={styles.appDesc}>Calculating fair tournament schedules.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="dna" size={24} color="#059669" />
          <Text style={styles.appTitle}>Genetic Studies</Text>
          <Text style={styles.appDesc}>Understanding gene combinations and inheritance.</Text>
        </View>
        <View style={styles.appItem}>
          <MaterialCommunityIcons name="share-variant" size={24} color="#2563EB" />
          <Text style={styles.appTitle}>Social Networks</Text>
          <Text style={styles.appDesc}>Suggestions for "People you may know".</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the different fields of combinatorics. We understood its basic principles like additive and multiplicative rules, and then presented complex ideas like the principle of inclusion-exclusion and the pigeonhole principle. We also highlighted how combinatorics help us work with sets, count bit strings, and navigate lattice paths.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 14, color: '#475569', lineHeight: 20 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  conceptCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  conceptHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  conceptTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  conceptText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#BAE6FD' },
  divider: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 15 },
  
  // Triangle UI
 triangleContainer: { 
    marginVertical: 15, 
    alignItems: 'center',
    width: '100%', 
  },
  triangleLabel: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: '#64748b', 
    marginBottom: 10, 
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  triangleCard: { 
    backgroundColor: '#104a28', 
    paddingVertical: 20, 
    paddingHorizontal: 10, 
    borderRadius: 15, 
    width: '100%', // Fits the container
    maxWidth: 400, // Prevents it from getting too huge on tablets
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2,
    alignSelf: 'center',
  },
  triangleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
    width: '100%',
  },
  triangleText: { 
    color: 'white', 
    fontFamily: 'monospace', 
    fontSize: 16, // Slightly smaller for mini screens
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  pigeonBox: { flexDirection: 'row', backgroundColor: '#FEF2F2', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#B91C1C', alignItems: 'center', marginBottom: 20 },
  pigeonText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#991B1B', lineHeight: 20, fontWeight: '500' },

  appGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  appItem: { width: '48%', backgroundColor: '#F9FAFB', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#F3F4F6', marginBottom: 15, alignItems: 'center' },
  appTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginTop: 8, marginBottom: 4, textAlign: 'center' },
  appDesc: { fontSize: 11, color: '#64748B', lineHeight: 16, textAlign: 'center' }
});