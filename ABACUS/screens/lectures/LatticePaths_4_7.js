import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
      
      <Text style={styles.paragraph}>
        {"Lattice paths are all about moving along a grid. In discrete mathematics, they are used to solve problems related to counting the number of ways we can reach a certain point on a grid."}
      </Text>

      {/* SECTION 1: DEFINITION */}
      <Text style={styles.sectionHeader}>{"What is a Lattice Path?"}</Text>
      <Text style={styles.paragraph}>
        {"A lattice is a grid of points where each point has integer coordinates. A lattice path is the "}<Text style={styles.bold}>{"shortest possible route"}</Text>{" between two points, moving only "}<Text style={styles.bold}>{"Right (R)"}</Text>{" or "}<Text style={styles.bold}>{"Up (U)"}</Text>{"."}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{"The Rules of Movement:"}</Text>
        <Text style={styles.infoText}>{"• No moving backwards or diagonally."}</Text>
        <Text style={styles.infoText}>{"• To reach (3, 2) from (0, 0), you must take exactly 3 steps right and 2 steps up."}</Text>
      </View>

      <Text style={styles.subHeader}>{"Example Path Sequences (to 3, 2):"}</Text>
      <PathSequence label={"Path 1"} steps={"RRUUR"} />
      <PathSequence label={"Path 2"} steps={"UURRR"} />
      <PathSequence label={"Path 3"} steps={"RURRU"} />

      {/* SECTION 2: COUNTING FORMULA */}
      <Text style={styles.sectionHeader}>{"Counting Lattice Paths"}</Text>
      <Text style={styles.paragraph}>
        {"Finding the number of paths is a "}<Text style={styles.bold}>{"combination problem"}</Text>{". If you have 5 total steps and must choose 3 to be 'Right', you are calculating 5 choose 3."}
      </Text>

      <View style={styles.formulaCard}>
        <Text style={styles.formulaLabel}>{"General Formula:"}</Text>
        <Text style={styles.formulaText}>{"C(n, k) = n! / [k!(n - k)!]"}</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleCalculation}>{"For (3, 2): C(5, 3) = 10 paths"}</Text>
      </View>

      {/* SECTION 3: INTERMEDIATE POINTS */}
      <Text style={styles.sectionHeader}>{"Breaking It Down Further"}</Text>
      <Text style={styles.paragraph}>
        {"How many paths pass through a specific point, like (2, 1) on the way to (3, 2)?"}
      </Text>

      <View style={styles.multiStepBox}>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>{"1"}</Text>
          <Text style={styles.stepDetail}>{"(0,0) to (2,1): C(3, 2) = 3 paths"}</Text>
        </View>
        <View style={styles.stepRow}>
          <Text style={styles.stepNumber}>{"2"}</Text>
          <Text style={styles.stepDetail}>{"(2,1) to (3,2): C(2, 1) = 2 paths"}</Text>
        </View>
        <Text style={styles.totalResult}>{"Total: 3 × 2 = 6 Paths"}</Text>
      </View>

      {/* SECTION 4: BIT STRINGS ANALOGY */}
      <Text style={styles.sectionHeader}>{"Lattice Paths and Bit Strings"}</Text>
      <View style={styles.analogyBox}>
        <MaterialCommunityIcons name="swap-horizontal" size={24} color="#0369A1" />
        <Text style={styles.analogyText}>
          {"Counting lattice paths is identical to counting bit strings. Replace every 'R' with 1 and every 'U' with 0. A path of length 5 with 3 right steps becomes a bit string of length 5 with weight 3."}
        </Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how lattice paths represent the shortest route on a grid. We understood how to use combination formulas to count these paths and explored the powerful analogy between grid movement and binary bit strings."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 15, fontWeight: 'bold', color: '#334155', marginBottom: 10, marginTop: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  infoText: { fontSize: 13, color: '#475569', marginBottom: 5 },
  sequenceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, backgroundColor: '#F1F5F9', padding: 10, borderRadius: 8 },
  sequenceLabel: { fontSize: 12, fontWeight: 'bold', color: '#64748B', width: 60 },
  pillRow: { flexDirection: 'row', gap: 6 },
  stepPill: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  stepText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  formulaCard: { backgroundColor: '#104a28', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  formulaLabel: { color: '#BBF7D0', fontSize: 12, marginBottom: 8 },
  formulaText: { color: 'white', fontSize: 18, fontWeight: 'bold', fontFamily: 'monospace' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', width: '100%', marginVertical: 12 },
  exampleCalculation: { color: '#86EFAC', fontSize: 14, fontWeight: 'bold' },
  multiStepBox: { backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  stepNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#0369A1', color: 'white', textAlign: 'center', lineHeight: 24, fontSize: 12, fontWeight: 'bold', marginRight: 10 },
  stepDetail: { fontSize: 13, color: '#475569', flex: 1 },
  totalResult: { fontSize: 15, fontWeight: 'bold', color: '#16941c', textAlign: 'right', marginTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 10 },
  analogyBox: { flexDirection: 'row', backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#0369A1', alignItems: 'center' },
  analogyText: { flex: 1, marginLeft: 12, fontSize: 13, color: '#0369A1', lineHeight: 20, fontStyle: 'italic' }
});