import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DistributionFunctions_5_5() {
  
  // Custom Component for Function Definitions
  const FunctionCard = ({ title, type, description, formula, icon, color }) => (
    <View style={[styles.fCard, { borderTopColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <View>
          <Text style={[styles.fTitle, { color: color }]}>{title}</Text>
          <Text style={styles.fType}>{type}</Text>
        </View>
      </View>
      <Text style={styles.fDesc}>{description}</Text>
      <View style={styles.mathBox}>
        <Text style={styles.mathText}>{formula}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Distribution functions help us understand and predict the likelihood of different outcomes. They describe how probabilities are assigned to different possible outcomes of a random variable, whether the data is discrete or continuous."}
      </Text>

      {/* SECTION 1: DISCRETE PMF */}
      <Text style={styles.sectionHeader}>{"Discrete Variables: PMF"}</Text>
      <Text style={styles.paragraph}>
        {"For discrete random variables, we use the Probability Mass Function (PMF). This tells us the probability that a variable takes on an exact specific value."}
      </Text>

      <FunctionCard 
        title={"Probability Mass Function"}
        type={"Discrete Variables"}
        icon={"chart-bar"}
        color={"#16941c"}
        description={"Assigns a specific probability to each distinct outcome."}
        formula={"P(X = x) = { 1/6 if x \u2208 {1,2,3,4,5,6} ; 0 otherwise }"}
      />

      {/* SECTION 2: DISCRETE CDF */}
      <Text style={styles.sectionHeader}>{"Cumulative Distribution (Discrete)"}</Text>
      <Text style={styles.paragraph}>
        {"The CDF shows the probability that a random variable takes on a value less than or equal to a certain number."}
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>{"Example: Rolling a 4 or less"}</Text>
        <Text style={styles.exampleText}>{"P(X \u2264 4) = P(1) + P(2) + P(3) + P(4)"}</Text>
        <Text style={styles.resultText}>{"Result: 4/6 = 0.667"}</Text>
      </View>

      {/* SECTION 3: CONTINUOUS PDF */}
      <Text style={styles.sectionHeader}>{"Continuous Variables: PDF"}</Text>
      <Text style={styles.paragraph}>
        {"For continuous variables, we use a Probability Density Function (PDF). Since there are infinitely many heights or times, the probability of an exact value (like exactly 165 cm) is essentially zero."}
      </Text>

      <FunctionCard 
        title={"Probability Density Function"}
        type={"Continuous Variables"}
        icon={"chart-bell-curve-cumulative"}
        color={"#0369A1"}
        description={"Describes the likelihood of a variable falling within a certain range."}
        formula={"P(a \u2264 X \u2264 b) = \u222b f(x) dx"}
      />

      {/* SECTION 4: PDF & CDF RELATIONSHIP */}
      <Text style={styles.sectionHeader}>{"The Relationship: PDF vs. CDF"}</Text>
      <Text style={styles.paragraph}>
        {"The PDF is like the \"instantaneous\" rate of change of the CDF. Mathematically, they are two sides of the same coin connected by calculus."}
      </Text>

      <View style={styles.calculusBox}>
        <View style={styles.calcRow}>
          <MaterialCommunityIcons name="variable" size={18} color="#9333ea" />
          <Text style={styles.calcText}>{"PDF f(x) is the derivative of CDF F(x)"}</Text>
        </View>
        <View style={styles.calcRow}>
          <MaterialCommunityIcons name="function-variant" size={18} color="#9333ea" />
          <Text style={styles.calcText}>{"CDF is the integral of the PDF from -\u221e to x"}</Text>
        </View>
      </View>

      {/* SECTION 5: PRACTICAL APPLICATION */}
      <Text style={styles.sectionHeader}>{"Finding Range Probabilities"}</Text>
      <View style={styles.problemCard}>
        <Text style={styles.bold}>{"Scenario: Heights between 160cm and 170cm"}</Text>
        <Text style={styles.infoText}>{"To find this range, we subtract the CDF at 160 from the CDF at 170."}</Text>
        <View style={styles.darkMathBox}>
          <Text style={styles.darkMathText}>{"P(160 \u2264 X \u2264 170) = F(170) - F(160)"}</Text>
        </View>
      </View>

      {/* SUMMARY TABLE */}
      <Text style={styles.sectionHeader}>{"Difference Summary"}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Feature"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Discrete (PMF)"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Continuous (PDF)"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{"Values"}</Text>
          <Text style={styles.tableCell}>{"Specific points"}</Text>
          <Text style={styles.tableCell}>{"Density over range"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{"Cumulative"}</Text>
          <Text style={styles.tableCell}>{"Step-shaped"}</Text>
          <Text style={styles.tableCell}>{"S-shaped curve"}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how distribution functions form the backbone of Probability Theory. We covered PMFs for discrete variables like dice rolls, PDFs for continuous variables like height, and showed how CDFs provide the probability for values up to a certain point for both types."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  fCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  fTitle: { fontSize: 15, fontWeight: 'bold', marginLeft: 10 },
  fType: { fontSize: 11, color: '#64748B', marginLeft: 10, textTransform: 'uppercase' },
  fDesc: { fontSize: 13, color: '#475569', marginBottom: 12, lineHeight: 18 },
  mathBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center' },
  mathText: { fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold', color: '#0F172A' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15 },
  exampleText: { fontSize: 13, color: '#166534', marginTop: 5 },
  resultText: { fontSize: 14, color: '#166534', fontWeight: 'bold', textAlign: 'right', marginTop: 5 },
  calculusBox: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  calcRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  calcText: { marginLeft: 10, fontSize: 13, color: '#5B21B6', flex: 1 },
  problemCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  infoText: { fontSize: 12, color: '#64748B', marginBottom: 10, fontStyle: 'italic' },
  darkMathBox: { backgroundColor: '#1E293B', padding: 15, borderRadius: 10, alignItems: 'center' },
  darkMathText: { color: '#38BDF8', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 13 },
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeader: { backgroundColor: '#F8FAFC', fontWeight: 'bold', color: '#0F172A' },
  tableCell: { flex: 1, padding: 10, fontSize: 11, color: '#475569', textAlign: 'center' }
});