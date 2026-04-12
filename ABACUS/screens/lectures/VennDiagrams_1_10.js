import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function VennDiagrams_1_10() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        To visualize sets, one of the most useful methods is <Text style={styles.bold}>Venn diagrams</Text>. Venn diagrams represent sets as circles, with overlapping regions showing common elements between the sets.
      </Text>
      <Text style={styles.paragraph}>
        In this article we will see the use of Venn diagrams in set operations, understand how they provide a visual approach to union, intersection, difference, and more with examples for a better understanding.
      </Text>

      {/* --- WHAT ARE VENN DIAGRAMS --- */}
      <Text style={styles.sectionHeader}>What are Venn Diagrams?</Text>
      <Text style={styles.paragraph}>
        A Venn diagram is a tool to represent sets and their relationships with one another. Each set is typically represented as a circle, and the relationships between sets are shown by how these circles overlap.
      </Text>
      <Text style={styles.paragraph}>
        In a Venn diagram, each circle represents a set. When two or more sets overlap, the intersection (shared elements) is displayed in the overlapping region of the circles. Elements unique to each set are located in the non-overlapping parts.
      </Text>
      <Text style={styles.paragraph}>
        Often, the sets are contained within a rectangle that represents the <Text style={styles.bold}>universal set</Text>, denoted as <Text style={styles.bold}>U</Text>, which includes all the possible elements under consideration.
      </Text>

      {/* 🖼️ IMAGE 1: Universe & Set A */}
      <Text style={styles.paragraph}>
        Take a look at the following Venn diagram. Here, we have the rectangle region as the Universe and there is a set A inside universe. All set are subset of the Universe.
      </Text>
      <Image 
        source={require('../../assets/moduleImages/Venn1.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.imageCaption}>Figure 1: Set A inside the Universal Set (U)</Text>

      {/* 🖼️ IMAGE 2: Overlapping Sets Example */}
      <Text style={styles.paragraph}>
        Here, we get one example of overlapping sets. A and B are overlapping.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Example:</Text> Let us consider two sets −</Text>
        <Text style={styles.exampleText}>Set A = {"{1, 2, 3}"}</Text>
        <Text style={styles.exampleText}>Set B = {"{2, 3, 4}"}</Text>
      </View>
      <Image 
        source={require('../../assets/moduleImages/Venn2.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.imageCaption}>Figure 2: Overlapping Sets A and B</Text>
      <Text style={styles.paragraph}>
        Using a Venn diagram, we draw two overlapping circles. The intersection (shared part) would be {"{2, 3}"} and the non-overlapping parts would be {"{1}"} for A and {"{4}"} for B.
      </Text>
      <Text style={styles.paragraph}>
        Let us now check some operations that are usually done on Venn Diagrams.
      </Text>

      {/* --- UNION --- */}
      <Text style={styles.sectionHeader}>Union of Sets</Text>
      <Text style={styles.paragraph}>
        The <Text style={styles.bold}>union</Text> of two sets A and B denoted as (A ∪ B), is the set of elements that are in either A, B, or both. In a Venn diagram, the union is represented by shading the entire area covered by both circles.
      </Text>
      <Image source={require('../../assets/moduleImages/Venn3.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Figure 3: Union (A ∪ B) - Both circles completely shaded</Text>

      {/* --- INTERSECTION --- */}
      <Text style={styles.sectionHeader}>Intersection of Sets</Text>
      <Text style={styles.paragraph}>
        The intersection of two sets A and B, denoted by <Text style={styles.bold}>A ∩ B</Text>, is the set of elements common to both sets. In a Venn diagram, the intersection is shown by shading only the overlapping region of the circles.
      </Text>
      <Image source={require('../../assets/moduleImages/Venn4.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Figure 4: Intersection (A ∩ B) - Overlapping part shaded</Text>

      {/* --- DIFFERENCE --- */}
      <Text style={styles.sectionHeader}>Difference of Sets</Text>
      <Text style={styles.paragraph}>
        The difference of two sets A and B, denoted by <Text style={styles.bold}>A − B</Text>, is the set of elements that are in A but not in B. In a Venn diagram, the difference is represented by shading only the part of A that does not overlap with B.
      </Text>
      <Image source={require('../../assets/moduleImages/Venn5.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Figure 5: Difference (A − B) - Non-overlapping part of A shaded</Text>

      {/* --- COMPLEMENT --- */}
      <Text style={styles.sectionHeader}>Complement of a Set</Text>
      <Text style={styles.paragraph}>
        The complement of a set A, denoted by <Text style={styles.bold}>A′</Text> or <Text style={styles.bold}>Aᶜ</Text>, contains all the elements that are not in A. The complement depends on the universal set U, which includes all possible elements.
      </Text>
      <Text style={styles.paragraph}>
        In a Venn diagram, the complement is represented by shading the area outside the circle of set A.
      </Text>
      <Image source={require('../../assets/moduleImages/Venn6.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Figure 6: Complement (A′) - Area outside circle A is shaded</Text>

      {/* --- SYMMETRIC DIFFERENCE --- */}
      <Text style={styles.sectionHeader}>Symmetric Difference</Text>
      <Text style={styles.paragraph}>
        The symmetric difference between two sets A and B, denoted by <Text style={styles.bold}>A ⊕ B</Text> (or A Δ B), is the set of elements that are in either A or B, but not in both. In a Venn diagram, this is represented by shading the non-overlapping parts of both circles.
      </Text>
      <Image source={require('../../assets/moduleImages/Venn7.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Figure 7: Symmetric Difference (A ⊕ B)</Text>

      {/* --- THREE SETS --- */}
      <Text style={styles.sectionHeader}>Venn Diagrams with More Than Two Sets</Text>
      <Text style={styles.paragraph}>
        Venn diagrams are not limited to two sets. When we work with three sets or more, the diagrams become more complex, but the basic principles remain the same. We simply add more circles to represent additional sets, and their intersections and unions can be observed visually.
      </Text>

      <Text style={styles.subHeader}>Example with Three Sets</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Let us consider three sets −</Text>
        <Text style={styles.exampleText}>A = {"{1, 2}"}</Text>
        <Text style={styles.exampleText}>B = {"{2, 3}"}</Text>
        <Text style={styles.exampleText}>C = {"{3, 4}"}</Text>
      </View>
      <Text style={styles.paragraph}>
        In its Venn diagram, the intersection of all three sets, <Text style={styles.bold}>A ∩ B ∩ C</Text>, would be empty (since no element is in all three sets). The pairwise intersections, such as <Text style={styles.bold}>A ∩ B = {"{2}"}</Text> and <Text style={styles.bold}>B ∩ C = {"{3}"}</Text>, would be shown by overlapping regions of the circles.
      </Text>
      <Image source={require('../../assets/moduleImages/Venn8.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Figure 8: Intersection of Three Sets</Text>

      <Text style={styles.paragraph}>
        Another complicated example could be: <Text style={styles.bold}>(B ∩ C) ∪ (C ∩ Aᶜ)</Text>. This could be represented as the following Venn diagram:
      </Text>
      <Image source={require('../../assets/moduleImages/Venn9.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Figure 9: (B ∩ C) ∪ (C ∩ Aᶜ)</Text>

      {/* --- APPLICATIONS --- */}
      <Text style={styles.sectionHeader}>Applications of Venn Diagrams</Text>
      <Text style={styles.paragraph}>
        As we have understood, the Venn diagrams are useful in many fields, especially in probability theory, logic, statistics, and computer science.
      </Text>
      
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.bold}>Visualizing logical relationships</Text> − By using overlapping areas, Venn diagrams simplify understanding relationships between different sets.
        </Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.bold}>Simplifying complex set operations</Text> − In problems involving multiple sets and operations like union, intersection, and difference, Venn diagrams offer an intuitive way to see results.
        </Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          <Text style={styles.bold}>Solving word problems</Text> − In set theory, problems often ask for the number of elements in unions, intersections, or complements, and Venn diagrams help visualize and solve these problems quickly.
        </Text>
      </View>

      {/* --- SOLVING PROBLEMS --- */}
      <Text style={styles.sectionHeader}>Using Venn Diagrams to Solve Problems</Text>
      <Text style={styles.paragraph}>
        Venn diagrams are useful when solving problems that involve the cardinality of sets. Consider a scenario where we know the size of several sets and their intersections. By placing these numbers in a Venn diagram, we can easily figure out how many elements are in each region.
      </Text>

      <Text style={styles.subHeader}>Example</Text>
      <Text style={styles.paragraph}>Let us see some examples to understand these ideas −</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• Set A has <Text style={styles.bold}>10</Text> elements</Text>
        <Text style={styles.exampleText}>• Set B has <Text style={styles.bold}>15</Text> elements</Text>
        <Text style={styles.exampleText}>• Their intersection has <Text style={styles.bold}>5</Text> elements</Text>
      </View>
      <Text style={styles.paragraph}>
        Here, we can use a Venn diagram to calculate the number of elements in A ∪ B, by adding the numbers in each region −
      </Text>
      
      <Image source={require('../../assets/moduleImages/Venn10.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Figure 10: Problem Solving with Venn Diagrams</Text>

      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>|A ∪ B| = (10 − 5) + (15 − 5) + 5 = 20</Text>
      </View>
      <Text style={styles.paragraph}>This is a typical use of Venn diagrams in solving real-world problems.</Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained how Venn diagrams are used to represent sets and their operations in discrete mathematics. We discussed fundamental set operations such as union, intersection, difference, and complement, and illustrated how they are visually represented in Venn diagrams.
      </Text>
      <Text style={styles.paragraph}>
        We also looked at how to use Venn diagrams for more complex operations like symmetric difference and working with three sets. Finally, we understood their practical applications in solving set-related problems.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  bulletContainer: { flexDirection: 'row', marginBottom: 10, paddingLeft: 5 },
  bullet: { fontSize: 18, color: '#16941c', marginRight: 10, lineHeight: 22 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 24 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  formulaBox: { backgroundColor: '#104a28', padding: 15, borderRadius: 10, marginVertical: 15, alignItems: 'center' },
  formulaText: { color: 'white', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 16 },
  
  // Image Styles
  image: { width: '100%', height: 200, borderRadius: 12, marginTop: 15, marginBottom: 5, backgroundColor: '#f1f5f9' },
  imageCaption: { fontSize: 13, color: '#64748b', textAlign: 'center', fontStyle: 'italic', marginBottom: 20 }
});