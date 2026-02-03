import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RandomVariables_5_4() {
  
  // Custom Component for Variable Types
  const TypeCard = ({ title, description, examples, color }) => (
    <View style={[styles.typeCard, { borderTopColor: color }]}>
      <Text style={[styles.typeTitle, { color: color }]}>{title}</Text>
      <Text style={styles.typeDesc}>{description}</Text>
      <View style={styles.examplePillContainer}>
        {examples.map((ex, i) => (
          <View key={i} style={styles.examplePill}>
            <Text style={styles.pillText}>{ex}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Random variables simplify the process of working with outcomes from random experiments by putting them into one package."}
      </Text>

      {/* SECTION 1: WHAT IS A RANDOM VARIABLE */}
      <Text style={styles.sectionHeader}>{"What is a Random Variable?"}</Text>
      <Text style={styles.paragraph}>
        {"A random variable is a way of turning outcomes into numbers. It is really just a function or map that takes each outcome from a sample space and assigns it a number. We normally use capital letters like "}<Text style={styles.bold}>{"X"}</Text>{" to represent it."}
      </Text>

      <View style={styles.mappingCard}>
        <View style={styles.mappingHeader}>
          <MaterialCommunityIcons name="map-marker-path" size={20} color="#0369A1" />
          <Text style={styles.mappingTitle}>{"Example: Rolling Two Dice (Sum)"}</Text>
        </View>
        <Text style={styles.mappingText}>{"X(1, 1) = 2"}</Text>
        <Text style={styles.mappingText}>{"X(2, 3) = 5"}</Text>
        <Text style={styles.mappingText}>{"X(6, 5) = 11"}</Text>
        <Text style={styles.caption}>{"The variable extracts the specific piece of information (the sum) we care about."}</Text>
      </View>

      {/* SECTION 2: FORMAL DEFINITION */}
      <Text style={styles.sectionHeader}>{"Formal Definition"}</Text>
      <Text style={styles.paragraph}>{"A random variable is a measurable function from a sample space \u03a9 to the real number line R. This implies:"}</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Sample Space:"}</Text>{" The set of all possible outcomes."}</Text>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Real Numbers:"}</Text>{" Map outcomes to numbers like positive, negative, or decimals."}</Text>
        <Text style={styles.infoText}>{"\u2022 "}<Text style={styles.bold}>{"Measurable Function:"}</Text>{" It behaves nicely with the probabilities assigned to outcomes."}</Text>
      </View>

      {/* SECTION 3: TYPES OF RANDOM VARIABLES */}
      <Text style={styles.sectionHeader}>{"Discrete vs. Continuous"}</Text>
      
      <TypeCard 
        title={"Discrete Random Variables"}
        color={"#16941c"}
        description={"Can take on only specific, distinct values like integers."}
        examples={["Coin Flip Heads", "Store Customers", "Dice Sums"]}
      />

      <TypeCard 
        title={"Continuous Random Variables"}
        color={"#0369A1"}
        description={"Can take on any value within a range and varies smoothly."}
        examples={["Race Times", "Height", "Rainfall Amount"]}
      />

      {/* SECTION 4: CALCULATING PROBABILITY */}
      <Text style={styles.sectionHeader}>{"Variables and Probability"}</Text>
      <Text style={styles.paragraph}>{"Once defined, we can use variables to find the probability of events directly."}</Text>

      <View style={styles.problemCard}>
        <Text style={styles.bold}>{"Problem: Sum of two dice > 8?"}</Text>
        <Text style={styles.infoText}>{"Possible sums: 9, 10, 11, or 12. There are 10 such outcomes out of 36."}</Text>
        <View style={styles.formulaRow}>
          <Text style={styles.formulaText}>{"P(X > 8) = 10 / 36 = 5 / 18 (\u2248 27.8%)"}</Text>
        </View>
      </View>

      {/* SECTION 5: PROPERTIES */}
      <Text style={styles.sectionHeader}>{"Properties of Random Variables"}</Text>
      
      <View style={styles.propBox}>
        <Text style={styles.propTitle}>{"1. Expected Value"}</Text>
        <Text style={styles.propText}>{"The average value expected over many trials, calculated as a weighted average."}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.propTitle}>{"2. Variance"}</Text>
        <Text style={styles.propText}>{"Shows how much values vary from the expected value. High variance means outcomes are spread out."}</Text>
        
        <View style={styles.divider} />

        <Text style={styles.propTitle}>{"3. Probability Distribution"}</Text>
        <Text style={styles.propText}>{"A function giving the probability of each possible value (e.g., how likely each sum from 2-12 is)."}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how random variables help us manage and understand experiment outcomes. We explored discrete and continuous types and understood properties like Expected Value and Variance that define how data behaves."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  mappingCard: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BAE6FD', marginBottom: 20 },
  mappingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  mappingTitle: { fontSize: 14, fontWeight: 'bold', color: '#0369A1', marginLeft: 8 },
  mappingText: { fontFamily: 'monospace', fontSize: 13, color: '#334155', marginBottom: 4 },
  caption: { fontSize: 11, color: '#64748B', marginTop: 8, fontStyle: 'italic' },
  infoBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  infoText: { fontSize: 13, color: '#475569', marginBottom: 8, lineHeight: 18 },
  typeCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  typeTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 5 },
  typeDesc: { fontSize: 12, color: '#64748B', marginBottom: 10 },
  examplePillContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  examplePill: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  pillText: { fontSize: 11, color: '#475569', fontWeight: '500' },
  problemCard: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 20 },
  formulaRow: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  formulaText: { fontFamily: 'monospace', fontWeight: 'bold', color: '#C2410C', fontSize: 14 },
  propBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20 },
  propTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 4 },
  propText: { fontSize: 12, color: '#166534', lineHeight: 18 },
  divider: { height: 1, backgroundColor: '#DCFCE7', marginVertical: 12 }
});