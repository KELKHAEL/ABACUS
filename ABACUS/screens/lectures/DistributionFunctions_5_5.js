import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DistributionFunctions_5_5() {
  
  // Custom Component for Function Definitions
  const FunctionCard = ({ title, type, description, formula, icon, color }) => (
    <View style={[styles.fCard, { borderTopColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <View style={{ marginLeft: 10 }}>
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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        {"Distribution functions help us understand and predict the likelihood of different outcomes. Distribution functions describe how probabilities are assigned to different possible outcomes of a random variable. They help us make sense of both discrete and continuous data."}
      </Text>
      <Text style={styles.paragraph}>
        {"Read this chapter to learn the various types of distribution functions, including Probability Mass Functions (PMFs), Probability Density Functions (PDFs), and Cumulative Distribution Functions (CDFs)."}
      </Text>

      <Text style={styles.sectionHeader}>{"What is a Distribution Function?"}</Text>
      <Text style={styles.paragraph}>
        {"A distribution function in probability theory states how probability is spread across possible outcomes for a random variable. It can take the form of −"}
      </Text>
      <View style={styles.bulletList}>
        <Text style={styles.bulletItem}>{"• A "}<Text style={styles.bold}>{"discrete"}</Text>{" random variable, where the outcomes are distinct and separate (like rolling a die)."}</Text>
        <Text style={styles.bulletItem}>{"• A "}<Text style={styles.bold}>{"continuous"}</Text>{" random variable, where the outcomes can take on any value within a range (like measuring height)."}</Text>
      </View>
      <Text style={styles.paragraph}>
        {"Different types of distribution functions are used depending on whether the random variable is discrete or continuous."}
      </Text>

      {/* --- DISCRETE: PMF --- */}
      <Text style={styles.sectionHeader}>{"Discrete Variables: PMF"}</Text>
      <Text style={styles.paragraph}>
        {"For discrete random variables, we generally use the idea of Probability Mass Function (PMF). This PMF tells us the probability that a random variable takes on a specific value."}
      </Text>

      <View style={styles.subSectionBox}>
        <Text style={styles.subHeader}>{"Example of Rolling a Die"}</Text>
        <Text style={styles.paragraph}>
          {"A simple example of a discrete random variable is rolling a six-sided die. There are six possible outcomes: 1, 2, 3, 4, 5, and 6. Assuming the die is fair and there is no biases. The probability of landing on any one number is 1/6, or about 0.167."}
        </Text>
      </View>

      <FunctionCard 
        title={"Probability Mass Function"}
        type={"Discrete Logic"}
        icon={"chart-bar"}
        color={"#16941c"}
        description={"Assigns a specific probability to each distinct outcome."}
        formula={"P(X=x) = 1/6 if x \u2208 {1,2,3,4,5,6} ; else 0"}
      />

      {/* --- DISCRETE: CDF --- */}
      <Text style={styles.sectionHeader}>{"Cumulative Distribution for Discrete"}</Text>
      <Text style={styles.paragraph}>
        {"Then the next function is the CDF. For discrete variables, we can also create a Cumulative Distribution Function (CDF). This CDF shows us the probability that a random variable takes on a value less than or equal to a certain number."}
      </Text>
      <Text style={styles.paragraph}>
        {"If we continuing with the die example, the CDF would describe the probability of rolling a number less than or equal to each possible outcome. If we are interested in the probability of rolling a 4 or less, we would add up the probabilities of rolling a 1, 2, 3, or 4:"}
      </Text>

      <View style={styles.darkMathBox}>
        <Text style={styles.darkMathText}>{"P(X \u2264 4) = P(1) + P(2) + P(3) + P(4) = 4/6 = 0.667"}</Text>
      </View>

      <Text style={styles.paragraph}>
        {"So, the CDF at 4 would be 0.667. And as expected, by the time we reach 6, the CDF should equal 1, because the probability of rolling a number 6 or less is 100%."}
      </Text>

      {/* 🖼️ IMAGE 1: Discrete CDF Graph */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/moduleImages/dist1.jpg')} style={styles.imageBox} resizeMode="contain" />
        <Text style={styles.caption}>{"This figure shows CDF for 6 rolls with 100%."}</Text>
      </View>

      {/* --- CONTINUOUS: PDF --- */}
      <Text style={styles.sectionHeader}>{"Continuous Variables: PDF"}</Text>
      <Text style={styles.paragraph}>
        {"For continuous random variables, we use a Probability Density Function (PDF) instead of a PMF. The PDF describes the likelihood of the random variable falling within a certain range. Not taking on specific values."}
      </Text>

      <View style={styles.subSectionBox}>
        <Text style={styles.subHeader}>{"Example: Height Distribution"}</Text>
        <Text style={styles.paragraph}>
          {"Imagine we are looking at the heights of women, which might be distributed in a bell-shaped curve (a normal distribution). The heights are a continuous variable since someone can be 165.4 cm tall, or 165.387 cm tall, and so on. The PDF gives us a picture of how likely different heights are. It does not give exact probabilities for specific values."}
        </Text>
        <Text style={styles.paragraph}>
          {"For example, the probability that someone is exactly 165 cm tall is essentially zero, because there are infinitely many possible heights in the range. However, we can use the PDF to calculate the probability of someone being between, say, 160 cm and 170 cm."}
        </Text>
      </View>

      {/* 🖼️ IMAGE 2: Bell Curve PDF */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/moduleImages/dist2.jpg')} style={styles.imageBox} resizeMode="contain" />
        <Text style={styles.caption}>{"The PDF peaks around the mean (165 cm) and tapers off as we get farther from the average height."}</Text>
      </View>

      {/* --- CONTINUOUS: CDF --- */}
      <Text style={styles.sectionHeader}>{"Cumulative Distribution for Continuous"}</Text>
      <Text style={styles.paragraph}>
        {"Like the discrete variables, we can construct a Cumulative Distribution Function (CDF) for continuous variables as well. The CDF for a continuous variable shows the probability that the variable takes on a value less than or equal to a certain number."}
      </Text>
      <Text style={styles.paragraph}>
        {"For instance, if we are finding the probability that a woman's height is less than or equal to 165 cm, we can get the CDF. In this case, it might tell us that the probability is 0.5, meaning 50% of women are shorter than or equal to 165 cm."}
      </Text>

      {/* 🖼️ IMAGE 3: S-Curve CDF */}
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/moduleImages/dist3.jpg')} style={styles.imageBox} resizeMode="contain" />
      </View>

      <Text style={styles.paragraph}>
        {"The CDF for continuous variables looks like an S-shaped curve. It starts at 0 (no probability accumulated at the beginning), gradually increases as we move along the distribution, and eventually reaches 1 (meaning all the probability is accounted for) as we cover the entire range of possible values."}
      </Text>

      {/* --- RELATIONSHIP --- */}
      <Text style={styles.sectionHeader}>{"Relationship Between PDF and CDF"}</Text>
      <Text style={styles.paragraph}>
        {"We must understand how the PDF and CDF are related. The PDF is like the \"instantaneous\" rate of change of the CDF. We can also say that the gradient or slope of the CDF at any point is the value of the PDF at that point."}
      </Text>
      <Text style={styles.paragraph}>
        {"If the CDF has a steep slope at a certain point, which means the PDF has a high value there. Which indicates a higher probability density around that value. For example, in our height distribution example, the PDF will peak around the average height. That corresponds to the steepest part of the CDF."}
      </Text>

      <View style={styles.calculusBox}>
        <View style={styles.calcRow}>
          <MaterialCommunityIcons name="variable" size={18} color="#5B21B6" />
          <Text style={styles.calcText}>{"f(x) = d/dx F(x) (The Derivative)"}</Text>
        </View>
        <View style={styles.dividerPurple} />
        <View style={styles.calcRow}>
          <MaterialCommunityIcons name="function-variant" size={18} color="#5B21B6" />
          <Text style={styles.calcText}>{"F(x) = \u222b f(t)dt from -\u221e to x (The Integral)"}</Text>
        </View>
      </View>

      {/* --- PRACTICAL USE --- */}
      <Text style={styles.sectionHeader}>{"CDF and PDF in Action"}</Text>
      <Text style={styles.paragraph}>
        {"The PDF shows where the density of heights is concentrated. So the closer someones height is to the average, the higher the PDF. On the other hand, the CDF shows that what percentage of the population is shorter than a given height."}
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>{"Finding the Probability for a Range of Heights"}</Text>
        <Text style={styles.paragraphSmall}>
          {"Suppose we want to find the probability that a womans height is between 160 cm and 170 cm. We would use the CDF to calculate this by finding the CDF value at 170 cm and subtracting the CDF value at 160 cm −"}
        </Text>
        <Text style={[styles.bold, { color: '#16941c', textAlign: 'center', marginTop: 10 }]}>{"P(160 \u2264 X \u2264 170) = F(170) \u2212 F(160)"}</Text>
      </View>

      {/* --- SUMMARY --- */}
      <Text style={styles.sectionHeader}>{"Discrete vs Continuous Summary"}</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Feature"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Discrete (PMF)"}</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>{"Continuous (PDF)"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{"Definition"}</Text>
          <Text style={styles.tableCell}>{"Exact outcomes"}</Text>
          <Text style={styles.tableCell}>{"Range density"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{"CDF Shape"}</Text>
          <Text style={styles.tableCell}>{"Step-shaped"}</Text>
          <Text style={styles.tableCell}>{"S-shaped curve"}</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"Distribution Functions form the backbone of Probability Theory. We explained the Probability Mass Function (PMF) for discrete random variables, for example rolling a die; and the Probability Density Function (PDF) for continuous variables, for example, measuring height. We also covered the Cumulative Distribution Function (CDF) and how it works for both discrete and continuous variables."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 14, color: '#475569', lineHeight: 20 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  fCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 20 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  fTitle: { fontSize: 16, fontWeight: 'bold' },
  fType: { fontSize: 11, color: '#64748B', textTransform: 'uppercase', fontWeight: 'bold' },
  fDesc: { fontSize: 13, color: '#475569', marginBottom: 12, lineHeight: 18 },
  mathBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1', alignItems: 'center' },
  mathText: { fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold', color: '#0F172A', textAlign: 'center' },
  
  bulletList: { paddingLeft: 10, marginBottom: 15 },
  bulletItem: { fontSize: 14, color: '#475569', marginBottom: 6, lineHeight: 20 },
  
  subSectionBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  
  darkMathBox: { backgroundColor: '#1E293B', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  darkMathText: { color: '#38BDF8', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 13, textAlign: 'center' },

  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%' },
  imageBox: { width: '100%', height: 220, backgroundColor: '#F8FAFC', borderRadius: 12 },
  caption: { fontSize: 12, color: '#94A3B8', textAlign: 'center', fontStyle: 'italic', marginTop: 8, paddingHorizontal: 10 },

  calculusBox: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#DDD6FE' },
  calcRow: { flexDirection: 'row', alignItems: 'center' },
  calcText: { marginLeft: 12, fontSize: 14, color: '#5B21B6', fontFamily: 'monospace', fontWeight: 'bold' },
  dividerPurple: { height: 1, backgroundColor: '#DDD6FE', marginVertical: 12 },

  exampleBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#BBF7D0' },

  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeader: { backgroundColor: '#F8FAFC', fontWeight: 'bold', color: '#0F172A' },
  tableCell: { flex: 1, padding: 12, fontSize: 12, color: '#475569', textAlign: 'center' }
});