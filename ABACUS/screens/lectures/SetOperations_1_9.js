import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function SetOperations_1_9() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In Discrete Mathematics, to represent discrete elements as collections, we can use <Text style={styles.bold}>sets</Text>. Sets are very useful in organizing and structuring the data. When working on sets, we must understand how to perform <Text style={styles.bold}>set operations</Text>.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will have a look at some of the main set operations such as union, intersection, complement, difference, and Cartesian product.
      </Text>

      {/* --- UNION --- */}
      <Text style={styles.sectionHeader}>Union of Sets</Text>
      <Text style={styles.paragraph}>
        The most basic operation on sets is <Text style={styles.bold}>union</Text>. The union of two sets combines all elements from both sets into one. We can say this mathematically as the union of sets A and B is written as (A ∪ B). This operation includes all elements that are in A, in B, or in both. It is important to note that duplicate elements are not counted twice.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Definition</Text> − The union of sets A and B is the set containing all elements that are either in A, in B, or in both.</Text>
        <Text style={styles.exampleText}><Text style={styles.bold}>Symbol</Text> − (A ∪ B)</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Example − If A = {"{1, 2, 3}"} and B = {"{2, 3, 4}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', marginTop: 5}]}>Then A ∪ B = {"{1, 2, 3, 4}"}</Text>
      </View>

      {/* --- INTERSECTION --- */}
      <Text style={styles.sectionHeader}>Intersection of Sets</Text>
      <Text style={styles.paragraph}>
        The next widely used operation is the intersection of two sets. Intersection finds the common elements shared by both sets. It is denoted by (A ∩ B) and contains only the elements that exist in both A and B.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Definition</Text> − The intersection of sets A and B is the set containing all elements that are present in both A and B.</Text>
        <Text style={styles.exampleText}><Text style={styles.bold}>Symbol</Text> − (A ∩ B)</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Example − If A = {"{1, 2, 3}"} and B = {"{2, 3, 4}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', marginTop: 5}]}>Then A ∩ B = {"{2, 3}"}</Text>
      </View>

      {/* --- SET DIFFERENCE --- */}
      <Text style={styles.sectionHeader}>Set Difference</Text>
      <Text style={styles.paragraph}>
        The next operation is the difference of two sets. This is denoted as (A – B). Set difference gives the elements that are in A but not in B. It is also called the relative complement of B in A.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Definition</Text> − The difference of sets A and B is the set of all elements that belong to A but not to B.</Text>
        <Text style={styles.exampleText}><Text style={styles.bold}>Symbol</Text> − (A – B)</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Example − If A = {"{1, 2, 3}"} and B = {"{2, 3, 4}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', marginTop: 5}]}>Then A – B = {"{1}"}</Text>
      </View>

      {/* --- COMPLEMENT --- */}
      <Text style={styles.sectionHeader}>Complement of a Set</Text>
      <Text style={styles.paragraph}>
        After union and intersection, another fundamental operation is complement. Remember the difference is a combination of these fundamental operations. The complement of a set A, denoted as Aᶜ or A′.
      </Text>
      <Text style={styles.paragraph}>
        Complement contains all the elements not in A, assuming there is a universal set U that includes all possible elements under consideration.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Definition</Text> − The complement of set A consists of all elements in the universal set U that are not in A.</Text>
        <Text style={styles.exampleText}><Text style={styles.bold}>Symbol</Text> − Aᶜ or A′</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Example − If the universal set U = {"{1, 2, 3, 4, 5}"} and A = {"{1, 2, 3}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', marginTop: 5}]}>Then Aᶜ = {"{4, 5}"}</Text>
      </View>

      {/* --- ADVANCED OPERATIONS --- */}
      <Text style={styles.sectionHeader}>Advanced Operations</Text>
      <Text style={styles.paragraph}>
        Let us now see some of the advanced set operations. These operations are special due to their use cases. Some of them are known to us, but some of them are quite unfamiliar.
      </Text>

      <Text style={styles.subHeader}>Symmetric Difference</Text>
      <Text style={styles.paragraph}>
        The symmetric difference between two sets A and B, which is denoted by (A ⊕ B), is the set of elements that are in either of the sets but not in their intersection.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Definition</Text> − The symmetric difference is the set of elements that are in one of the sets but not in both.</Text>
        <Text style={styles.exampleText}><Text style={styles.bold}>Symbol</Text> − (A ⊕ B)</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Example − If A = {"{1, 2, 3}"} and B = {"{2, 3, 4}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', marginTop: 5}]}>Then A ⊕ B = {"{1, 4}"}</Text>
      </View>

      <Text style={styles.subHeader}>Cartesian Product</Text>
      <Text style={styles.paragraph}>
        The Cartesian product of two sets A and B, denoted as (A × B). It is the set of all ordered pairs where the first element is from A and the second is from B.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Definition</Text> − The Cartesian product of sets A and B is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B.</Text>
        <Text style={styles.exampleText}><Text style={styles.bold}>Symbol</Text> − (A × B)</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Example − If A = {"{1, 2}"} and B = {"{3, 4}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', marginTop: 5}]}>Then A × B = {"{(1, 3), (1, 4), (2, 3), (2, 4)}"}</Text>
      </View>

      {/* --- EXAMPLES --- */}
      <Text style={styles.sectionHeader}>Examples of Set Operations</Text>
      <Text style={styles.paragraph}>We have here a couple of examples to illustrate set operations in greater detail.</Text>

      <Text style={styles.subHeader}>Example 1</Text>
      <Text style={styles.paragraph}>Let A = {"{1, 2, 3, 4, 5, 6}"}, B = {"{2, 4, 6}"}, C = {"{1, 2, 3}"}, and D = {"{7, 8, 9}"}</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>• A ∪ B = {"{1, 2, 3, 4, 5, 6}"} (since everything in B is already in A).</Text>
        <Text style={styles.codeText}>• A ∩ B = {"{2, 4, 6}"} (elements common to both sets).</Text>
        <Text style={styles.codeText}>• B ∩ C = {"{2}"} (the only element common to both B and C).</Text>
        <Text style={styles.codeText}>• A ∩ D = ∅ (no common elements between A and D).</Text>
        <Text style={styles.codeText}>• B ∪ C = {"{1, 2, 3, 4, 6}"} (union of B and C).</Text>
        <Text style={styles.codeText}>• A – B = {"{1, 3, 5}"} (elements in A but not in B).</Text>
      </View>

      <Text style={styles.subHeader}>Example 2</Text>
      <Text style={styles.paragraph}>Let A = {"{1, 2}"} and B = {"{3, 4, 5}"}</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>• A × B = {"{(1, 3), (1, 4), (1, 5), (2, 3), (2, 4), (2, 5)}"}</Text>
        <Text style={styles.codeText}>• A × A = {"{(1, 1), (1, 2), (2, 1), (2, 2)}"}</Text>
      </View>

      {/* --- VENN DIAGRAMS --- */}
      <Text style={styles.sectionHeader}>Using Venn Diagrams</Text>
      <Text style={styles.paragraph}>
        Sometimes we need to represent sets through diagrams. These are known as Venn diagrams. These diagrams are a visual tool for representing set operations.
      </Text>
      <Text style={styles.paragraph}>
        In Venn diagrams, sets are represented by overlapping circles. The intersection, union, and other operations can be shown by shading the appropriate regions of the circles.
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Union</Text> − The union of two sets is shown by shading the entire area covered by both circles.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Intersection</Text> − The intersection is represented by shading only the region where the circles overlap.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Difference</Text> − The difference A – B is represented by shading the part of A that does not overlap with B.</Text>
      </View>

      {/* 🖼️ IMAGE PLACEHOLDER */}
      <Image 
        source={require('../../assets/moduleImages/SetsOpe1.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.imageCaption}>Figure: Visualizing Set Operations</Text>

      <Text style={styles.paragraph}>
        Venn diagrams help visualize the relationships between sets and can simplify the process of understanding more complex operations. We will see all of these operations and other complex sets in the next chapter.
      </Text>

      {/* --- PROPERTIES --- */}
      <Text style={styles.sectionHeader}>Important Properties of Set Operations</Text>
      <Text style={styles.paragraph}>Let us see some of the key properties of set operations −</Text>

      <Text style={styles.subHeader}>Commutativity</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>A ∪ B = B ∪ A</Text>
        <Text style={styles.codeText}>A ∩ B = B ∩ A</Text>
      </View>

      <Text style={styles.subHeader}>Associativity</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>A ∪ (B ∪ C) = (A ∪ B) ∪ C</Text>
        <Text style={styles.codeText}>A ∩ (B ∩ C) = (A ∩ B) ∩ C</Text>
      </View>

      <Text style={styles.subHeader}>Distributivity</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</Text>
        <Text style={styles.codeText}>A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</Text>
      </View>

      <Text style={styles.subHeader}>De Morgan’s Laws</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ</Text>
        <Text style={styles.codeText}>(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ</Text>
      </View>
      <Text style={styles.paragraph}>
        These properties provide a framework for simplifying and understanding set expressions.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the basic set operations like union, intersection, difference, and complement, as well as more advanced operations such as Cartesian products, etc.
      </Text>
      <Text style={styles.paragraph}>
        Through examples and explanations, we understood how these operations work. Additionally, we learned about key properties of set operations, including commutativity, associativity, and De Morgan's Laws.
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
  bullet: { fontSize: 16, color: '#16941c', marginRight: 10 },
  bulletText: { flex: 1, fontSize: 15, color: '#475569', lineHeight: 22 },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  codeBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 15, alignItems: 'flex-start', borderWidth: 1, borderColor: '#E2E8F0' },
  codeText: { fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold', color: '#16941c', marginBottom: 4 },
  
  // Image Styles
  image: { width: '100%', height: 200, borderRadius: 12, marginTop: 15, marginBottom: 5, backgroundColor: '#f1f5f9' },
  imageCaption: { fontSize: 13, color: '#64748b', textAlign: 'center', fontStyle: 'italic', marginBottom: 20 }
});