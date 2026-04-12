import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        {"In Probability Theory, we use the \"mean\" and \"average\" to find the center of data, but they don't show how spread out the data is. For that, we need to find the Variance (sometimes called Standard Deviation) that helps us understand how far the values in a data set deviate from the mean."}
      </Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we will cover the concept of Variance and explain how to calculate Variance using simple examples."}
      </Text>

      {/* --- SECTION 1: WHAT IS VARIANCE --- */}
      <Text style={styles.sectionHeader}>{"What is Variance?"}</Text>
      <Text style={styles.paragraph}>
        {"Variance is a measure of how spread out the data points are from the mean. If all the numbers in a data set are close to the mean, then the variance will be low. If the numbers are spread out far from the mean, the variance will be high. Here the variance gives us an idea of the average squared deviation from the mean."}
      </Text>

      {/* 🖼️ IMAGE 1: Variance curves comparison */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/moduleImages/var1.jpg')} 
          style={styles.imageBox}
          resizeMode="contain"
        />
        <Text style={styles.caption}>{"Here, the red curve is with mean 0 and variance 1, and green curve with mean 2.3 and variance 4."}</Text>
      </View>

      <Text style={styles.paragraph}>
        {"Mathematically, the variance is represented by \u03c3\u00b2 (for population variance) or s\u00b2 (for sample variance). We calculate variance by taking the difference between each data point and the mean, squaring those differences (to remove negative values), and then averaging them."}
      </Text>

      {/* --- FORMULAS --- */}
      <View style={styles.formulaCard}>
        <Text style={styles.formulaLabel}>{"Population Variance (\u03c3\u00b2):"}</Text>
        <Text style={styles.formulaText}>{"\u03c3\u00b2 = \u03a3(x\u1d62 - \u03bc)\u00b2 / N"}</Text>
        <Text style={styles.formulaDesc}>{"N = population size, \u03bc = population mean"}</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.formulaLabel}>{"Sample Variance (s\u00b2):"}</Text>
        <Text style={styles.formulaText}>{"s\u00b2 = \u03a3(x\u1d62 - x\u0304)\u00b2 / (n - 1)"}</Text>
        <Text style={styles.caption}>{"We divide by n - 1 for sample variance. This is called Bessel's correction. It adjusts for the fact that a sample may underestimate true population variance."}</Text>
      </View>

      {/* --- SECTION 2: CALCULATION EXAMPLE --- */}
      <Text style={styles.sectionHeader}>{"Example of Calculating Variance"}</Text>
      <Text style={styles.paragraph}>{"Consider the following data sets:"}</Text>
      <View style={styles.dataSetsBox}>
        <Text style={styles.dataSetText}>{"Data set 1: \u221210, 0, 10, 20, 30"}</Text>
        <Text style={styles.dataSetText}>{"Data set 2: 8, 9, 10, 11, 12"}</Text>
      </View>
      
      <MathStep 
        number={"1"} 
        title={"Calculate the Mean"} 
        content={
          <View>
            <Text style={styles.stepText}>{"For set 1: \u03bc = (\u221210+0+10+20+30) / 5 = 10"}</Text>
            <Text style={styles.stepText}>{"For set 2: \u03bc = (8+9+10+11+12) / 5 = 10"}</Text>
            <Text style={styles.infoSmall}>{"Both have the same mean, but spread will be different."}</Text>
          </View>
        } 
      />

      <MathStep 
        number={"2"} 
        title={"Calculate Squared Differences"} 
        content={
          <View>
            <Text style={styles.stepText}>{"Set 1: (\u221220)\u00b2 + (\u221210)\u00b2 + 0\u00b2 + 10\u00b2 + 20\u00b2 = 1000"}</Text>
            <Text style={styles.stepText}>{"Set 2: (\u22122)\u00b2 + (\u22121)\u00b2 + 0\u00b2 + 1\u00b2 + 2\u00b2 = 10"}</Text>
          </View>
        } 
      />

      <MathStep 
        number={"3"} 
        title={"Calculate Variance"} 
        content={
          <View>
            <Text style={styles.stepText}>{"Set 1 Variance: 1000 / 5 = 200"}</Text>
            <Text style={styles.stepText}>{"Set 2 Variance: 10 / 5 = 2"}</Text>
          </View>
        } 
      />

      {/* --- SECTION 3: STANDARD DEVIATION --- */}
      <Text style={styles.sectionHeader}>{"What is Standard Deviation?"}</Text>
      <Text style={styles.paragraph}>
        {"Variance is measured in squared units. To bring it back to the original units, we take the square root of the variance, known as standard deviation (\u03c3 or s)."}
      </Text>

      <View style={styles.sdMathCard}>
        <Text style={styles.sdMathText}>{"\u03c3 = \u221a\u03c3\u00b2"}</Text>
      </View>

      <Text style={styles.subHeader}>{"Example of Calculating Standard Deviation"}</Text>
      <Text style={styles.paragraph}>{"Let us calculate the standard deviation for the two data sets."}</Text>
      
      {/* 🖼️ IMAGE 2: SD values and graph */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/moduleImages/var2.jpg')} 
          style={styles.imageBox}
          resizeMode="contain"
        />
      </View>

      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"Set 1: \u03c3 = \u221a200 \u2248 14.14"}</Text>
        <Text style={styles.exampleText}>{"Set 2: \u03c3 = \u221a2 \u2248 1.41"}</Text>
        <Text style={styles.paragraphSmall}>
          {"Confirming that data set 1 is much more spread out."}
        </Text>
      </View>

      <Text style={styles.subHeader}>{"Interpretation of Standard Deviation"}</Text>
      <Text style={styles.paragraph}>
        {"A small standard deviation means points are close to the mean; a large one means they are spread out. In Set 2 (\u03c3=1.41), numbers are typically within 1.41 units of the mean (10), whereas Set 1 (\u03c3=14.14) numbers are much farther away."}
      </Text>

      {/* --- WHY SQUARE --- */}
      <Text style={styles.sectionHeader}>{"Why Do We Need to Square the Differences?"}</Text>
      <View style={styles.logicBox}>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="minus-circle-outline" size={18} color="#B91C1C" />
          <Text style={styles.logicText}><Text style={styles.bold}>{"To remove negative values"}</Text>{" \u2212 Subtracting the mean results in negative values for points smaller than the mean. Squaring ensures all values are positive."}</Text>
        </View>
        <View style={styles.bulletRow}>
          <MaterialCommunityIcons name="trending-up" size={18} color="#B91C1C" />
          <Text style={styles.logicText}><Text style={styles.bold}>{"To emphasize larger deviations"}</Text>{" \u2212 Squaring larger differences makes them stand out more, reflecting their larger impact on overall variance."}</Text>
        </View>
      </View>

      {/* --- SECTION 5: RANGE --- */}
      <Text style={styles.sectionHeader}>{"Range: A Simple Measure of Spread"}</Text>
      <Text style={styles.paragraph}>
        {"The range is the difference between the largest and smallest values. It is easy to calculate but doesn't capture how the numbers are distributed inside."}
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>{"Set 1 Range: 30 \u2212 (\u221210) = 40"}</Text>
        <Text style={styles.exampleText}>{"Set 2 Range: 12 \u2212 8 = 4"}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained how Variance and Standard Deviation help us find the spread of a data set. Variance gives us the average of the squared differences from the mean. Standard deviation gives us a more intuitive way of dispersion by taking the square root of the variance, providing valuable insight on how data is distributed."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 10, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 14, color: '#475569', lineHeight: 20 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%' },
  imageBox: { width: '100%', height: 200, backgroundColor: '#F8FAFC', borderRadius: 12 },
  caption: { fontSize: 12, color: '#94A3B8', textAlign: 'center', fontStyle: 'italic', marginTop: 8, paddingHorizontal: 10 },

  formulaCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  formulaLabel: { fontSize: 13, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: 6 },
  formulaText: { fontSize: 18, color: '#0F172A', fontWeight: 'bold', fontFamily: 'monospace', marginBottom: 4 },
  formulaDesc: { fontSize: 12, color: '#94A3B8', marginBottom: 5 },
  dividerLight: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },

  dataSetsBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 10, marginBottom: 15 },
  dataSetText: { fontSize: 14, color: '#334155', fontFamily: 'monospace', marginBottom: 4 },

  stepContainer: { marginBottom: 18 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stepBadge: { backgroundColor: '#16941c', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  stepBadgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  stepTitle: { fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginLeft: 10 },
  stepContent: { paddingLeft: 34 },
  stepText: { fontSize: 14, color: '#475569', lineHeight: 20, marginBottom: 4 },
  infoSmall: { fontSize: 12, color: '#94A3B8', fontStyle: 'italic' },

  sdMathCard: { backgroundColor: '#0369A1', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  sdMathText: { color: 'white', fontSize: 22, fontWeight: 'bold', fontFamily: 'monospace' },

  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#DCFCE7' },
  exampleText: { fontSize: 15, color: '#166534', fontFamily: 'monospace', fontWeight: 'bold', marginBottom: 5 },

  logicBox: { backgroundColor: '#FEF2F2', padding: 15, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#B91C1C' },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  logicText: { flex: 1, marginLeft: 10, fontSize: 14, color: '#7F1D1D', lineHeight: 20 },
  
  infoBox: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, marginVertical: 15 },
  mathText: { fontSize: 15, fontWeight: 'bold', color: '#C2410C', fontFamily: 'monospace', textAlign: 'center', marginTop: 8 }
});