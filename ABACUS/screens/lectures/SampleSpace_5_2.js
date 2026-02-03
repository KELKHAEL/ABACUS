import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SampleSpace_5_2() {
  
  // Custom Component for Core Probability Concepts
  const DefinitionCard = ({ title, content, icon, color }) => (
    <View style={[styles.defCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.cardText}>{content}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"In Probability Theory, we work on measuring how likely something is to happen. Whether flipping a coin or predicting the weather, Probability helps us find out the chances through fundamental concepts like experiments, outcomes, sample spaces, and events."}
      </Text>

      {/* SECTION 1: THE EXPERIMENT */}
      <Text style={styles.sectionHeader}>{"What is an Experiment?"}</Text>
      <Text style={styles.paragraph}>
        {"An experiment is simply an action or process that has an observable result. Each time we perform this action, we are doing a trial."}
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.exampleItem}>{"• "}<Text style={styles.bold}>{"Coin Flip:"}</Text>{" One flip is a trial; results are heads or tails."}</Text>
        <Text style={styles.exampleItem}>{"• "}<Text style={styles.bold}>{"Running a Maze:"}</Text>{" A rat chooses between three paths. Each run is a trial."}</Text>
        <Text style={styles.exampleItem}>{"• "}<Text style={styles.bold}>{"Rainfall:"}</Text>{" Measuring yearly rain in a city results in a specific number outcome."}</Text>
      </View>

      {/* SECTION 2: SAMPLE SPACE */}
      <Text style={styles.sectionHeader}>{"Sample Space: The Complete Set"}</Text>
      <Text style={styles.paragraph}>
        {"A sample space is the complete set of all possible outcomes from trials. In Set Theory, we think of this as the \"Universal Set\"."}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{"Example: Throwing Two Dice"}</Text>
        <Text style={styles.infoText}>{"Don't just look at the sum (2-12). The true sample space contains every individual pair like (1,1), (1,2)... up to (6,6)."}</Text>
        <View style={styles.mathBadge}>
          <Text style={styles.mathText}>{"Total Outcomes = 6 \u00d7 6 = 36"}</Text>
        </View>
      </View>

      {/* SECTION 3: EVENTS */}
      <Text style={styles.sectionHeader}>{"Events: Subsets of the Space"}</Text>
      <Text style={styles.paragraph}>
        {"An event is a subset of the sample space containing the specific outcomes we care about."}
      </Text>

      <View style={styles.subsetCard}>
        <Text style={styles.bold}>{"Event Example: Sum Greater Than Nine"}</Text>
        <Text style={styles.codeText}>{"E = {(4,6), (5,5), (5,6), (6,4), (6,5), (6,6)}"}</Text>
        <Text style={styles.caption}>{"Outcomes in this event: 6"}</Text>
      </View>

      {/* SECTION 4: SPECIAL EVENTS */}
      <Text style={styles.sectionHeader}>{"Special Events"}</Text>
      <View style={styles.row}>
        <View style={[styles.smallCard, { backgroundColor: '#FEF2F2' }]}>
          <Text style={[styles.cardLabel, { color: '#B91C1C' }]}>{"Impossible Event"}</Text>
          <Text style={styles.cardDetail}>{"Empty set (\u2205). Example: Rolling a 7 on a standard die."}</Text>
        </View>
        <View style={[styles.smallCard, { backgroundColor: '#F0FDF4' }]}>
          <Text style={[styles.cardLabel, { color: '#166534' }]}>{"Certain Event"}</Text>
          <Text style={styles.cardDetail}>{"Full sample space. Example: Rolling between 1-6 on a die."}</Text>
        </View>
      </View>

      {/* SECTION 5: EVENTS AS SETS */}
      <Text style={styles.sectionHeader}>{"Events as Sets"}</Text>
      <Text style={styles.paragraph}>{"We combine events using standard set operations:"}</Text>

      <DefinitionCard 
        title={"Union (E \u222a F)"}
        icon={"set-union"}
        color={"#0369A1"}
        content={"Either event happens, or both happen."}
      />
      <DefinitionCard 
        title={"Intersection (E \u2229 F)"}
        icon={"set-center"}
        color={"#16941c"}
        content={"Both events happen at the exact same time."}
      />
      <DefinitionCard 
        title={"Complement (E\u1d9c)"}
        icon={"set-split"}
        color={"#9333ea"}
        content={"Includes everything in the sample space NOT in the event."}
      />

      <View style={styles.mutuallyCard}>
        <Text style={styles.bold}>{"Mutually Exclusive Events"}</Text>
        <Text style={styles.infoText}>{"Events that cannot happen at the same time. Their intersection is empty."}</Text>
        <Text style={styles.italic}>{"Example: Rolling an even number vs. rolling a seven or eleven."}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the basics of probability through experiments and outcomes. We understood how to define sample spaces and identify event subsets, and learned how to combine them using union, intersection, and complements while identifying mutually exclusive scenarios."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  italic: { fontStyle: 'italic', color: '#64748B', fontSize: 12, marginTop: 5 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, marginBottom: 20 },
  exampleItem: { fontSize: 13, color: '#475569', marginBottom: 8, lineHeight: 18 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#BAE6FD' },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#0369A1', marginBottom: 5 },
  infoText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  mathBadge: { backgroundColor: '#0369A1', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginTop: 10 },
  mathText: { color: 'white', fontWeight: 'bold', fontSize: 12, fontFamily: 'monospace' },
  subsetCard: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, marginBottom: 20 },
  codeText: { fontFamily: 'monospace', fontSize: 12, color: '#1E293B', backgroundColor: '#FFF', padding: 10, borderRadius: 8, marginVertical: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  caption: { fontSize: 11, color: '#94A3B8', textAlign: 'right' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  smallCard: { width: '48%', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  cardLabel: { fontSize: 13, fontWeight: 'bold', marginBottom: 5 },
  cardDetail: { fontSize: 11, color: '#475569', lineHeight: 15 },
  defCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  cardText: { fontSize: 13, color: '#475569', lineHeight: 20 },
  mutuallyCard: { padding: 15, borderRadius: 12, backgroundColor: '#FDF2F8', borderStyle: 'dashed', borderWidth: 1, borderColor: '#F9A8D4', marginBottom: 20 }
});