import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function VarianceSD_5_6() {
  
  // Custom Component for Step-by-Step math
  const MathStep = ({ number, title, content }) => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>{number}</Text></View>
        <Text style={styles.stepTitle}>{title}</Text>
      </View>
      <View style={styles.stepContent}>{content}</View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Mean and average find the center of data, but they don't show how spread out the data is. Variance and Standard Deviation help us understand how far values in a data set deviate from the mean."}
      </Text>

      {/* SECTION 1: VARIANCE */}
      <Text style={styles.sectionHeader}>{"What is Variance?"}</Text>
      <Text style={styles.paragraph}>
        {"Variance measures how spread out data points are from the mean. High variance means numbers are spread far; low variance means they are close to the mean."}
      </Text>

      <View style={styles.formulaCard}>
        <Text style={styles.formulaLabel}>{"Population Variance (\u03c3\u00b2):"}</Text>
        <Text style={styles.formulaText}>{"\u03c3\u00b2 = \u03a3(xi - \u03bc)\u00b2 / N"}</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.formulaLabel}>{"Sample Variance (s\u00b2):"}</Text>
        <Text style={styles.formulaText}>{"s\u00b2 = \u03a3(xi - x\u0304)\u00b2 / (n - 1)"}</Text>
        <Text style={styles.caption}>{"We use (n-1) for samples (Bessel's correction) to avoid underestimating true variance."}</Text>
      </View>

      {/* SECTION 2: CALCULATION STEPS */}
      <Text style={styles.sectionHeader}>{"How to Calculate Variance"}</Text>
      
      <MathStep 
        number={"1"} 
        title={"Calculate the Mean"} 
        content={<Text style={styles.stepText}>{"Find the average of your data set (\u03bc or x\u0304)."}</Text>} 
      />

      <MathStep 
        number={"2"} 
        title={"Squared Differences"} 
        content={
          <Text style={styles.stepText}>
            {"Subtract the mean from each data point and "}<Text style={styles.bold}>{"square the result"}</Text>{". This removes negative values and emphasizes larger deviations."}
          </Text>
        } 
      />

      <MathStep 
        number={"3"} 
        title={"Average the Squares"} 
        content={<Text style={styles.stepText}>{"Sum all squared differences and divide by the number of points."}</Text>} 
      />

      {/* SECTION 3: STANDARD DEVIATION */}
      <Text style={styles.sectionHeader}>{"Standard Deviation (\u03c3)"}</Text>
      <Text style={styles.paragraph}>
        {"Variance is measured in squared units. To bring it back to original units, we take the "}<Text style={styles.bold}>{"square root"}</Text>{" of the variance."}
      </Text>

      <View style={styles.sdCard}>
        <MaterialCommunityIcons name="calculator-variant" size={24} color="white" />
        <Text style={styles.sdMath}>{"\u03c3 = \u221a\u03c3\u00b2"}</Text>
        <Text style={styles.sdDesc}>{"Provides the typical distance from the mean in original units."}</Text>
      </View>

      {/* SECTION 4: COMPARISON EXAMPLE */}
      <Text style={styles.sectionHeader}>{"Visual Comparison"}</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>{"Data Set 1 vs. Data Set 2"}</Text>
        <View style={styles.comparisonRow}>
          <View style={styles.compItem}>
            <Text style={styles.compLabel}>{"Set 1 (Spread)"}</Text>
            <Text style={styles.compValue}>{"s\u00b2 = 200"}</Text>
            <Text style={styles.compValue}>{"\u03c3 \u2248 14.14"}</Text>
          </View>
          <View style={styles.compItem}>
            <Text style={styles.compLabel}>{"Set 2 (Clustered)"}</Text>
            <Text style={styles.compValue}>{"s\u00b2 = 2"}</Text>
            <Text style={styles.compValue}>{"\u03c3 \u2248 1.41"}</Text>
          </View>
        </View>
        <Text style={styles.caption}>{"Even if both sets have the same mean (10), Set 1 is much more spread out."}</Text>
      </View>

      {/* SECTION 5: RANGE */}
      <Text style={styles.sectionHeader}>{"Range: Simple Measure"}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          {"The "}<Text style={styles.bold}>{"Range"}</Text>{" is the difference between the largest and smallest values. While easy to calculate, it does not show how numbers are distributed between the ends."}
        </Text>
        <Text style={styles.mathText}>{"Range = Max - Min"}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how Variance and Standard Deviation quantify data spread. We learned that standard deviation provides a more intuitive sense of dispersion by returning to original units, offering valuable insight into data distribution."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  formulaCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  formulaLabel: { fontSize: 12, color: '#64748B', fontWeight: 'bold', marginBottom: 4 },
  formulaText: { fontSize: 16, color: '#0F172A', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 8 },
  dividerLight: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  caption: { fontSize: 11, color: '#94A3B8', fontStyle: 'italic' },
  stepContainer: { marginBottom: 15 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepBadge: { backgroundColor: '#16941c', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  stepBadgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginLeft: 10 },
  stepContent: { paddingLeft: 34 },
  stepText: { fontSize: 13, color: '#475569', lineHeight: 18 },
  sdCard: { backgroundColor: '#0369A1', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15 },
  sdMath: { color: 'white', fontSize: 22, fontWeight: 'bold', fontFamily: 'monospace', marginVertical: 10 },
  sdDesc: { color: '#E0F2FE', fontSize: 12, textAlign: 'center' },
  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20 },
  comparisonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  compItem: { width: '48%', backgroundColor: '#FFF', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#DCFCE7' },
  compLabel: { fontSize: 11, fontWeight: 'bold', color: '#64748B', marginBottom: 4 },
  compValue: { fontSize: 13, color: '#166534', fontFamily: 'monospace' },
  infoBox: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B' },
  infoText: { fontSize: 13, color: '#9A3412', lineHeight: 20, marginBottom: 10 },
  mathText: { fontSize: 14, fontWeight: 'bold', color: '#C2410C', fontFamily: 'monospace', textAlign: 'center' }
});