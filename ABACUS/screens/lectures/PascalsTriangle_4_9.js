import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PascalsTriangle_4_9() {
  
  // Custom Component for Pattern Cards
  const PatternCard = ({ title, logic, icon, color }) => (
    <View style={[styles.patternCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.cardText}>{logic}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        {"The Pascals Triangle looks very simple at first glance but it has many layers to it. Whether we are counting combinations, working with binomial expansions, or figuring out recursive patterns, the Pascals Triangle helps in making our job easier."}
      </Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we will explain the basics of Pascals Triangle, understand how it's constructed, and also explore its applications through examples."}
      </Text>

      {/* --- WHAT IS PASCAL'S TRIANGLE --- */}
      <Text style={styles.sectionHeader}>{"What is Pascals Triangle?"}</Text>
      <Text style={styles.paragraph}>
        {"The Pascals Triangle is just a triangular pattern of numbers. But what makes it interesting is how each number is built from the two numbers directly above it. The first row starts with a 1 at the top. Each row after that gets wider, and every number in the triangle is the sum of the two numbers above it. If there are no number above, we imagine it as a 0."}
      </Text>

      <Text style={styles.subHeader}>{"Basic Visualization"}</Text>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/moduleImages/tria1.jpg')} 
          style={styles.imageBox}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.paragraph}>
        {"The outer edges of the triangle are always 1. The middle numbers are where things start to get interesting."}
      </Text>

      {/* --- BUILDING PASCAL'S TRIANGLE --- */}
      <Text style={styles.sectionHeader}>{"Building Pascals Triangle"}</Text>
      <Text style={styles.paragraph}>
        {"Making the Pascals Triangle is easy. It follows a certain rule. Start with 1 at the top. In each new number in a row is the sum of the two numbers directly above it. If we are adding a number on the edge of the triangle (where there is only one number above), we treat the \"missing\" number as a 0."}
      </Text>

      {/* RESPONSIVE HARDCODED TRIANGLE CARD */}
      <View style={styles.triangleContainer}>
        <View style={styles.triangleCard}>
          <View style={styles.triangleRow}><Text style={styles.triText}>1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   2   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   3   3   1</Text></View>
          <View style={styles.triangleRow}><Text style={styles.triText}>1   4   6   4   1</Text></View>
        </View>
      </View>

      <Text style={styles.paragraph}>
        {"For example, take the row that starts with 1, 4, 6, 4, 1. How do we get the next row? We add the pairs of numbers directly above −"}
      </Text>
      <View style={styles.mathList}>
        <Text style={styles.mathItem}>• 1 + 4 = 5</Text>
        <Text style={styles.mathItem}>• 4 + 6 = 10</Text>
        <Text style={styles.mathItem}>• 6 + 4 = 10</Text>
        <Text style={styles.mathItem}>• 4 + 1 = 5</Text>
      </View>
      <Text style={[styles.paragraph, styles.bold, {color: '#16941c'}]}>
        {"So, the next row is 1, 5, 10, 10, 5, 1."}
      </Text>

      {/* --- RECURSIVE NATURE --- */}
      <Text style={styles.sectionHeader}>{"Recursive Nature of Pascals Triangle"}</Text>
      <Text style={styles.paragraph}>
        {"From the idea of Binomial coefficients, the Pascals Triangle follows a recursive rule. This means each number depends on numbers before it. The recurrence relation for building Pascals Triangle is as follows −"}
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>{"(n k) = (n-1 k-1) + (n-1 k)"}</Text>
      </View>
      <Text style={styles.paragraph}>
        {"This is just a special way of saying that each number in the triangle is the sum of the two numbers above it. We can use this relation to find out any number in the triangle if we know the numbers in the row above."}
      </Text>

      {/* --- BINOMIAL COEFFICIENTS --- */}
      <Text style={styles.sectionHeader}>{"Pascals Triangle and Binomial Coefficients"}</Text>
      <Text style={styles.paragraph}>
        {"One of the most important uses of Pascals Triangle is for finding binomial coefficients. These coefficients are the numbers which appear when we expand a binomial expression, like (x+y)ⁿ. Each row of Pascals Triangle corresponds to the coefficients of a binomial expansion."}
      </Text>
      <Text style={styles.paragraph}>
        {"For example, the fourth row, 1, 4, 6, 4, 1, gives the coefficients for (x+y)⁴:"}
      </Text>
      <View style={styles.expansionBox}>
        <Text style={styles.expansionText}>{"(x+y)⁴ = x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴"}</Text>
      </View>

      <Text style={styles.subHeader}>{"Example of Binomial Expansion"}</Text>
      <Text style={styles.paragraph}>
        {"Suppose you want to expand (x+y)⁵. You can use Pascals Triangle to get the coefficients without doing all the multiplications by hand. The sixth row of the triangle is 1, 5, 10, 10, 5, 1. These are the coefficients −"}
      </Text>
      <View style={[styles.expansionBox, {backgroundColor: '#F0F9FF', borderColor: '#BAE6FD'}]}>
        <Text style={[styles.expansionText, {color: '#0369A1'}]}>{"(x+y)⁵ = x⁵ + 5x⁴y + 10x³y² + 10x²y³ + 5xy⁴ + y⁵"}</Text>
      </View>
      <Text style={styles.paragraph}>
        {"The Pascals Triangle easily help us by saving time to get the coefficients directly. So we do not have to expand the binomial the long way."}
      </Text>

      {/* --- APPLICATIONS --- */}
      <Text style={styles.sectionHeader}>{"Applications of Pascals Triangle"}</Text>
      <Text style={styles.paragraph}>
        {"After understanding the basics of Pascals Triangle, let us understand some of the applications of it. It shows up in all kinds of problems, especially when we are using counting problems."}
      </Text>

      <PatternCard 
        title="Combinations"
        icon="selection-multiple"
        color="#0369A1"
        logic={"The Pascals Triangle is closely related to combinations. (5 2) is the number of ways to choose 2 items from a set of 5. From row 5 and position 2, we find 10."}
      />
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/moduleImages/tria2.jpg')} style={styles.imageBoxSmall} resizeMode="contain" />
      </View>

      <PatternCard 
        title="Fibonacci Numbers"
        icon="chart-line"
        color="#16941c"
        logic={"If we add up the numbers along certain diagonals, we get the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, etc."}
      />
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/moduleImages/tria3.jpg')} style={styles.imageBoxSmall} resizeMode="contain" />
      </View>

      <PatternCard 
        title="Powers of 2"
        icon="exponent"
        color="#9333ea"
        logic={"The sum of the numbers in each row gives the powers of 2. Row 3: 1 + 3 + 3 + 1 = 8 = 2³."}
      />
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/moduleImages/tria4.jpg')} style={styles.imageBoxSmall} resizeMode="contain" />
      </View>

      <PatternCard 
        title="Sierpinski's Triangle"
        icon="triangle-outline"
        color="#B91C1C"
        logic={"Coloring odd numbers and leaving even numbers blank reveals a repeating fractal pattern known as Sierpinski's Triangle."}
      />

      {/* --- HIDDEN PATTERNS --- */}
      <Text style={styles.sectionHeader}>{"Hidden Patterns in Pascals Triangle"}</Text>
      <Text style={styles.paragraph}>
        {"The Pascal's Triangle is full of hidden patterns that might not be visible at first glance. Beyond Fibonacci numbers and powers of 2, there are many other patterns, such as:"}
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}><Text style={styles.bold}>{"Symmetry"}</Text>{" − Each row is symmetrical. Left half mirrors the right half."}</Text>
        <View style={styles.divider} />
        <Text style={styles.infoText}><Text style={styles.bold}>{"Triangular numbers"}</Text>{" − The third diagonal contains numbers (1, 3, 6, 10...) that form equilateral triangles."}</Text>
        <View style={styles.divider} />
        <Text style={styles.infoText}><Text style={styles.bold}>{"Catalan numbers"}</Text>{" − Show up in combinatorics and can be found with a specific formula within the triangle."}</Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the structure of Pascal's Triangle and its importance in discrete mathematics. We discussed how Pascal's Triangle is constructed and how it relates to binomial expansions."}
      </Text>
      <Text style={styles.paragraph}>
        {"We highlighted the applications of Pascal's triangle such as combinations, Fibonacci numbers, powers of 2, and even fractals like the Sierpinski Triangle."}
      </Text>
      <Text style={styles.paragraph}>
        {"Pascal's Triangle is much more than just a triangular arrangement of numbers. It is a useful mathematical tool that provides insight into a wide range of problems, from basic counting to complex recursive relationships."}
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 10, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  imageContainer: { alignItems: 'center', marginVertical: 10, width: '100%' },
  imageBox: { width: '100%', height: 220, backgroundColor: '#F8FAFC', borderRadius: 12 },
  imageBoxSmall: { width: '100%', height: 180, backgroundColor: '#F8FAFC', borderRadius: 12 },

  // Responsive Triangle UI
  triangleContainer: { marginVertical: 15, alignItems: 'center', width: '100%' },
  triangleCard: { 
    backgroundColor: '#104a28', 
    paddingVertical: 20, 
    paddingHorizontal: 10, 
    borderRadius: 15, 
    width: '100%',
    maxWidth: 400,
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2,
    alignSelf: 'center'
  },
  triangleRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 2, width: '100%' },
  triText: { color: 'white', fontFamily: 'monospace', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

  mathList: { paddingLeft: 10, marginBottom: 15 },
  mathItem: { fontSize: 14, color: '#475569', marginBottom: 5, fontFamily: 'monospace' },

  formulaBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', marginVertical: 10 },
  formulaText: { fontSize: 16, color: '#0F172A', fontWeight: 'bold', fontFamily: 'monospace' },

  expansionBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  expansionText: { fontFamily: 'monospace', fontSize: 13, color: '#1E293B', textAlign: 'center', fontWeight: 'bold' },

  patternCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 12 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  cardText: { fontSize: 14, color: '#475569', lineHeight: 22 },

  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginVertical: 15, borderWidth: 1, borderColor: '#BAE6FD' },
  infoText: { fontSize: 14, color: '#334155', marginBottom: 5, lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#BAE6FD', marginVertical: 10 }
});