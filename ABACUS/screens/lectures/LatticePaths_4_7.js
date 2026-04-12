import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LatticePaths_4_7() {
  
  // Custom Component for path sequences
  const PathSequence = ({ steps, label }) => (
    <View style={styles.sequenceContainer}>
      <Text style={styles.sequenceLabel}>{label}:</Text>
      <View style={styles.pillRow}>
        {steps.split('').map((step, i) => (
          <View key={i} style={[styles.stepPill, { backgroundColor: step === 'R' ? '#0369A1' : '#16941c' }]}>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Lattice paths are all about moving along a grid. Imagine standing on a grid of squares where you can only move in two directions: to the right or upward. A lattice path is simply the shortest route from one point to another using only those two allowed moves.
      </Text>

      {/* --- SECTION 1: WHAT IS A LATTICE PATH --- */}
      <Text style={styles.sectionHeader}>What is a Lattice Path?</Text>
      <Text style={styles.paragraph}>
        A lattice is nothing but a grid of points, where each point has integer coordinates. Imagine grid lines on graph paper, where each intersection is a point with integer x and y coordinates.
      </Text>

      {/* 🖼️ IMAGE 1: Basic grid with (0,0) to (3,2) path */}
      <Image 
        source={require('../../assets/moduleImages/latt1.jpg')} 
        style={styles.imageBox}
        resizeMode="contain"
      />

      <Text style={styles.paragraph}>
        The above grid is a lattice and the red path could be the lattice path. <Text style={styles.bold}>A lattice path is the shortest possible route between two points on this grid.</Text>
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>The Rules:</Text>
        <Text style={styles.infoText}>• You can only move Right (R) or Up (U).</Text>
        <Text style={styles.infoText}>• No diagonal or backward movement allowed.</Text>
        <Text style={styles.infoText}>• From (0,0) to (3,2), you must make exactly 3 steps Right and 2 steps Up.</Text>
      </View>

      <Text style={styles.subHeader}>Example Path Sequences (to reach 3, 2):</Text>
      
      {/* 🖼️ IMAGE 2: First variation (UURRR) */}
      <Image 
        source={require('../../assets/moduleImages/latt2.jpg')} 
        style={styles.imageBoxSmall}
        resizeMode="contain"
      />
      <PathSequence label="Sequence" steps="UURRR" />

      {/* 🖼️ IMAGE 3: Second variation (RURRU) */}
      <Image 
        source={require('../../assets/moduleImages/latt3.jpg')} 
        style={styles.imageBoxSmall}
        resizeMode="contain"
      />
      <PathSequence label="Sequence" steps="RURRU" />

      <Text style={styles.paragraph}>
        Each of these sequences represents a different path, but all start at (0, 0) and end at (3, 2) in exactly five steps.
      </Text>

      {/* --- SECTION 2: COUNTING --- */}
      <Text style={styles.sectionHeader}>Counting Lattice Paths</Text>
      <Text style={styles.paragraph}>
        How do we know how many paths exist? This is the same as figuring out how to arrange 3 R's and 2 U's in a sequence of 5 total positions.
      </Text>

      <View style={styles.formulaCard}>
        <Text style={styles.formulaLabel}>Combination Formula:</Text>
        <Text style={styles.formulaText}>C(n, k) = n! / [k!(n - k)!]</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleCalculation}>C(5, 3) = 5! / (3! · 2!) = 10 paths</Text>
      </View>

      {/* --- SECTION 3: BREAKING IT DOWN --- */}
      <Text style={styles.sectionHeader}>Breaking It Down Further</Text>
      <Text style={styles.paragraph}>
        Imagine we are moving from (0, 0) to (3, 2) but we want to know how many paths pass through the specific point <Text style={styles.bold}>(2, 1)</Text>.
      </Text>

      <View style={styles.multiStepBox}>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>1</Text>
          <Text style={styles.stepDetail}>(0,0) to (2,1): 2 Right, 1 Up. C(3, 2) = 3 paths.</Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>2</Text>
          <Text style={styles.stepDetail}>(2,1) to (3,2): 1 Right, 1 Up. C(2, 1) = 2 paths.</Text>
        </View>
        <Text style={styles.totalResult}>Total: 3 × 2 = 6 Paths through (2, 1)</Text>
      </View>

      {/* --- SECTION 4: BIT STRINGS --- */}
      <Text style={styles.sectionHeader}>Lattice Paths and Bit Strings</Text>
      <View style={styles.analogyBox}>
        <MaterialCommunityIcons name="swap-horizontal" size={24} color="#0369A1" />
        <Text style={styles.analogyText}>
          Replacing every R with a 1 and every U with a 0 transforms a path into a bit string. Counting lattice paths from (0,0) to (3,2) is identical to counting bit strings of length 5 with weight 3.
        </Text>
      </View>

      {/* --- OTHER SITUATIONS --- */}
      <Text style={styles.sectionHeader}>Lattice Paths in Other Situations</Text>
      <Text style={styles.paragraph}>
        If a grid is not simple—perhaps some squares are blocked or the shape is irregular—the basic counting principles still apply, but the problem becomes trickier. You may need to break the grid into smaller parts or use advanced techniques like dynamic programming or generating functions.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained how lattice paths represent the shortest route on a grid. We understood how to count these paths using combination formulas and intermediate points, and explored the powerful relationship between grid movement and binary bit strings.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#334155', marginBottom: 12, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  imageBox: { width: '100%', height: 200, marginVertical: 10, backgroundColor: '#F8FAFC', borderRadius: 10 },
  imageBoxSmall: { width: '100%', height: 160, marginVertical: 5, backgroundColor: '#F8FAFC', borderRadius: 10 },
  
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  infoTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#475569', marginBottom: 6, lineHeight: 20 },
  
  sequenceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: '#F1F5F9', padding: 12, borderRadius: 10 },
  sequenceLabel: { fontSize: 13, fontWeight: 'bold', color: '#64748B', width: 75 },
  pillRow: { flexDirection: 'row', gap: 8 },
  stepPill: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 1 },
  stepText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  
  formulaCard: { backgroundColor: '#104a28', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  formulaLabel: { color: '#BBF7D0', fontSize: 13, marginBottom: 8, fontWeight: 'bold' },
  formulaText: { color: 'white', fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', width: '100%', marginVertical: 12 },
  exampleCalculation: { color: '#86EFAC', fontSize: 15, fontWeight: 'bold' },
  
  multiStepBox: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 20, elevation: 1 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stepNumber: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#0369A1', color: 'white', textAlign: 'center', lineHeight: 26, fontSize: 13, fontWeight: 'bold', marginRight: 12 },
  stepDetail: { fontSize: 14, color: '#475569', flex: 1, lineHeight: 20 },
  totalResult: { fontSize: 16, fontWeight: 'bold', color: '#16941c', textAlign: 'right', marginTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 10 },
  
  analogyBox: { flexDirection: 'row', backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#0369A1', alignItems: 'center', marginBottom: 20 },
  analogyText: { flex: 1, marginLeft: 12, fontSize: 14, color: '#0369A1', lineHeight: 22, fontStyle: 'italic' }
});