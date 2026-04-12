import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function SetsDefinition_1_6() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 60}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        German mathematician <Text style={styles.bold}>G. Cantor</Text> introduced the concept of sets. He had defined a set as a collection of definite and distinguishable objects selected by the means of certain rules or description.
      </Text>
      <Text style={styles.paragraph}>
        Set theory forms the basis of several other fields of study like counting theory, relations, graph theory and finite state machines. In this chapter, we will cover the different aspects of Set Theory.
      </Text>

      {/* --- DEFINITION --- */}
      <Text style={styles.sectionHeader}>Set - Definition</Text>
      <Text style={styles.paragraph}>
        A set is an unordered collection of different elements. A set can be written explicitly by listing its elements using set bracket. If the order of the elements is changed or any element of a set is repeated, it does not make any changes in the set.
      </Text>

      <Text style={styles.subHeader}>Some Example of Sets</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>A set of all positive integers</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>A set of all the planets in the solar system</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>A set of all the states in India</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>A set of all the lowercase letters of the alphabet</Text>
      </View>

      {/* --- REPRESENTATION --- */}
      <Text style={styles.sectionHeader}>Representation of a Set</Text>
      <Text style={styles.paragraph}>Sets can be represented in two ways −</Text>

      <Text style={styles.subHeader}>Roster or Tabular Form</Text>
      <Text style={styles.paragraph}>
        The set is represented by listing all the elements comprising it. The elements are enclosed within braces and separated by commas.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example 1 − Set of vowels in English alphabet, A = {"{a, e, i, o, u}"}</Text>
        <Text style={styles.exampleText}>Example 2 − Set of odd numbers less than 10, B = {"{1, 3, 5, 7, 9}"}</Text>
      </View>

      <Text style={styles.subHeader}>Set Builder Notation</Text>
      <Text style={styles.paragraph}>
        The set is defined by specifying a property that elements of the set have in common. The set is described as A = {"{x : p(x)}"}
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example 1 − The set {"{a, e, i, o, u}"} is written as:</Text>
        <Text style={[styles.exampleText, styles.bold]}>A = {"{x : x is a vowel in English alphabet}"}</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Example 2 − The set {"{1, 3, 5, 7, 9}"} is written as:</Text>
        <Text style={[styles.exampleText, styles.bold]}>B = {"{x : 1 ≤ x < 10 and (x % 2) ≠ 0}"}</Text>
      </View>
      
      <Text style={styles.paragraph}>
        If an element x is a member of any set S, it is denoted by <Text style={styles.bold}>x ∈ S</Text> and if an element y is not a member of set S, it is denoted by <Text style={styles.bold}>y ∉ S</Text>.
      </Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>Example − If S = {"{1, 1.2, 1.7, 2}"}, 1 ∈ S but 1.5 ∉ S</Text>
      </View>

      {/* --- IMPORTANT SETS --- */}
      <Text style={styles.sectionHeader}>Some Important Sets</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>N</Text> − the set of all natural numbers = {"{1, 2, 3, 4, .....}"}</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Z</Text> − the set of all integers = {"{....., -3, -2, -1, 0, 1, 2, 3, .....}"}</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Z+</Text> − the set of all positive integers</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Q</Text> − the set of all rational numbers</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>R</Text> − the set of all real numbers</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>W</Text> − the set of all whole numbers</Text>
      </View>

      {/* --- CARDINALITY --- */}
      <Text style={styles.sectionHeader}>Cardinality of a Set</Text>
      <Text style={styles.paragraph}>
        Cardinality of a set S, denoted by <Text style={styles.bold}>|S|</Text>, is the number of elements of the set. The number is also referred as the cardinal number. If a set has an infinite number of elements, its cardinality is ∞.
      </Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>Example − |{"{1, 4, 3, 5}"}| = 4, |{"{1, 2, 3, 4, 5, …}"}| = ∞</Text>
      </View>
      <Text style={styles.paragraph}>If there are two sets X and Y:</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>|X| = |Y|</Text> denotes two sets X and Y having same cardinality. It occurs when the number of elements in X is exactly equal to the number of elements in Y. In this case, there exists a bijective function f from X to Y.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>|X| ≤ |Y|</Text> denotes that set X's cardinality is less than or equal to set Y's cardinality. Here, there exists an injective function f from X to Y.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>|X| {"<"} |Y|</Text> denotes that set X's cardinality is less than set Y's cardinality. Here, the function f from X to Y is injective function but not bijective.</Text>
      </View>
      <Text style={styles.paragraph}>
        If |X| ≤ |Y| and |X| ≥ |Y| then |X| = |Y|. The sets X and Y are commonly referred as equivalent sets.
      </Text>

      {/* --- TYPES OF SETS --- */}
      <Text style={styles.sectionHeader}>Types of Sets</Text>
      <Text style={styles.paragraph}>Sets can be classified into many types. Some of which are finite, infinite, subset, universal, proper, singleton set, etc.</Text>

      <Text style={styles.subHeader}>Finite Set</Text>
      <Text style={styles.paragraph}>A set which contains a definite number of elements is called a finite set.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − S = {"{x | x ∈ N and 70 > x > 50}"}</Text></View>

      <Text style={styles.subHeader}>Infinite Set</Text>
      <Text style={styles.paragraph}>A set which contains infinite number of elements is called an infinite set.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − S = {"{x | x ∈ N and x > 10}"}</Text></View>

      <Text style={styles.subHeader}>Subset</Text>
      <Text style={styles.paragraph}>A set X is a subset of set Y (Written as <Text style={styles.bold}>X ⊆ Y</Text>) if every element of X is an element of set Y.</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example 1 − Let, X = {"{1, 2, 3, 4, 5, 6}"} and Y = {"{1, 2}"}. Here set Y is a subset of set X as all the elements of set Y is in set X. Hence, we can write Y ⊆ X.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>Example 2 − Let, X = {"{1, 2, 3}"} and Y = {"{1, 2, 3}"}. Here set Y is a subset (Not a proper subset) of set X as all the elements of set Y is in set X. Hence, we can write Y ⊆ X.</Text>
      </View>

      <Text style={styles.subHeader}>Proper Subset</Text>
      <Text style={styles.paragraph}>The term proper subset can be defined as subset of but not equal to. A Set X is a proper subset of set Y (Written as <Text style={styles.bold}>X ⊂ Y</Text>) if every element of X is an element of set Y and |X| {"<"} |Y|.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − Let, X = {"{1, 2, 3, 4, 5, 6}"} and Y = {"{1, 2}"}. Here set Y ⊂ X.</Text></View>

      <Text style={styles.subHeader}>Universal Set</Text>
      <Text style={styles.paragraph}>It is a collection of all elements in a particular context or application. All the sets in that context or application are essentially subsets of this universal set. Universal sets are represented as <Text style={styles.bold}>U</Text>.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − U as the set of all animals on earth. Set of mammals is a subset of U, set of fishes is a subset of U, and so on.</Text></View>

      <Text style={styles.subHeader}>Empty Set or Null Set</Text>
      <Text style={styles.paragraph}>An empty set contains no elements. It is denoted by <Text style={styles.bold}>∅</Text>. As the number of elements in an empty set is finite, empty set is a finite set. The cardinality of empty set or null set is zero.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − S = {"{x | x ∈ N and 7 < x < 8} = ∅"}</Text></View>

      <Text style={styles.subHeader}>Singleton Set or Unit Set</Text>
      <Text style={styles.paragraph}>Singleton set or unit set contains only one element. A singleton set is denoted by {"{s}"}.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − S = {"{x | x ∈ N, 7 < x < 9} = {8}"}</Text></View>

      <Text style={styles.subHeader}>Equal Set</Text>
      <Text style={styles.paragraph}>If two sets contain the same elements they are said to be equal.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − If A = {"{1, 2, 6}"} and B = {"{6, 1, 2}"}, they are equal.</Text></View>

      <Text style={styles.subHeader}>Equivalent Set</Text>
      <Text style={styles.paragraph}>If the cardinalities of two sets are same, they are called equivalent sets.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − If A = {"{1, 2, 6}"} and B = {"{16, 17, 22}"}, they are equivalent as |A| = |B| = 3.</Text></View>

      <Text style={styles.subHeader}>Overlapping Set</Text>
      <Text style={styles.paragraph}>Two sets that have at least one common element are called overlapping sets. In case of overlapping sets −</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>n(A ∪ B) = n(A) + n(B) − n(A ∩ B)</Text>
        <Text style={styles.exampleText}>n(A ∪ B) = n(A − B) + n(B − A) + n(A ∩ B)</Text>
        <Text style={styles.exampleText}>n(A) = n(A − B) + n(A ∩ B)</Text>
        <Text style={styles.exampleText}>n(B) = n(B − A) + n(A ∩ B)</Text>
      </View>
      <Text style={styles.paragraph}>Example − Let, A = {"{1, 2, 6}"} and B = {"{6, 12, 42}"}. There is a common element 6, hence these sets are overlapping sets.</Text>

      <Text style={styles.subHeader}>Disjoint Set</Text>
      <Text style={styles.paragraph}>Two sets A and B are called disjoint sets if they do not have even one element in common. Therefore, disjoint sets have the following properties −</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>n(A ∩ B) = ∅</Text>
        <Text style={styles.exampleText}>n(A ∪ B) = n(A) + n(B)</Text>
      </View>
      <Text style={styles.paragraph}>Example − Let, A = {"{1, 2, 6}"} and B = {"{7, 9, 14}"}, there is not a single common element, hence these sets are disjoint sets.</Text>

      {/* --- VENN DIAGRAMS --- */}
      <Text style={styles.sectionHeader}>Venn Diagrams</Text>
      <Text style={styles.paragraph}>
        Venn diagram, invented in 1880 by John Venn, is a schematic diagram that shows all possible logical relations between different mathematical sets.
      </Text>
      
      {/* 🖼️ IMAGE PLACEHOLDER FOR VENN DIAGRAMS (PNG) */}
      <Image 
        source={require('../../assets/moduleImages/Sets1.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.imageCaption}>Figure: Examples of Venn Diagrams</Text>

      {/* --- SET OPERATIONS --- */}
      <Text style={styles.sectionHeader}>Set Operations</Text>
      <Text style={styles.paragraph}>Set Operations include Set Union, Set Intersection, Set Difference, Complement of Set, and Cartesian Product.</Text>

      <Text style={styles.subHeader}>Set Union</Text>
      <Text style={styles.paragraph}>The union of sets A and B (denoted by <Text style={styles.bold}>A ∪ B</Text>) is the set of elements which are in A, in B, or in both A and B. Hence, A ∪ B = {"{x | x ∈ A OR x ∈ B}"}.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − If A = {"{10, 11, 12, 13}"} and B = {"{13, 14, 15}"}, then A ∪ B = {"{10, 11, 12, 13, 14, 15}"}.</Text></View>
      
      {/* 🖼️ IMAGE PLACEHOLDER FOR SET UNION (PNG) */}
      <Image source={require('../../assets/moduleImages/Sets2.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Set Union (A ∪ B)</Text>

      <Text style={styles.subHeader}>Set Intersection</Text>
      <Text style={styles.paragraph}>The intersection of sets A and B (denoted by <Text style={styles.bold}>A ∩ B</Text>) is the set of elements which are in both A and B. Hence, A ∩ B = {"{x | x ∈ A AND x ∈ B}"}.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − If A = {"{11, 12, 13}"} and B = {"{13, 14, 15}"}, then A ∩ B = {"{13}"}.</Text></View>

      {/* 🖼️ IMAGE PLACEHOLDER FOR SET INTERSECTION (PNG) */}
      <Image source={require('../../assets/moduleImages/Sets3.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Set Intersection (A ∩ B)</Text>

      <Text style={styles.subHeader}>Set Difference / Relative Complement</Text>
      <Text style={styles.paragraph}>The set difference of sets A and B (denoted by <Text style={styles.bold}>A − B</Text>) is the set of elements which are only in A but not in B. Hence, A − B = {"{x | x ∈ A AND x ∉ B}"}.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − If A = {"{10, 11, 12, 13}"} and B = {"{13, 14, 15}"}, then (A − B) = {"{10, 11, 12}"} and (B − A) = {"{14, 15}"}. Here, (A − B) ≠ (B − A)</Text></View>

      {/* 🖼️ IMAGE PLACEHOLDER FOR SET DIFFERENCE (PNG) */}
      <Image source={require('../../assets/moduleImages/Sets4.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Set Difference (A − B)</Text>

      <Text style={styles.subHeader}>Complement of a Set</Text>
      <Text style={styles.paragraph}>The complement of a set A (denoted by <Text style={styles.bold}>A'</Text>) is the set of elements which are not in set A. Hence, A' = {"{x | x ∉ A}"}.</Text>
      <Text style={styles.paragraph}>More specifically, A' = (U − A) where U is a universal set which contains all objects.</Text>
      <View style={styles.codeBox}><Text style={styles.codeText}>Example − If A = {"{x | x belongs to set of odd integers}"} then A' = {"{y | y does not belong to set of odd integers}"}</Text></View>

      {/* 🖼️ IMAGE PLACEHOLDER FOR COMPLEMENT (PNG) */}
      <Image source={require('../../assets/moduleImages/Sets5.jpg')} style={styles.image} resizeMode="contain" />
      <Text style={styles.imageCaption}>Complement of Set A (A')</Text>

      <Text style={styles.subHeader}>Cartesian Product / Cross Product</Text>
      <Text style={styles.paragraph}>The Cartesian product of n number of sets A₁, A₂,… Aₙ denoted as A₁ × A₂ ⋯ × Aₙ can be defined as all possible ordered pairs (x₁, x₂,… xₙ) where x₁ ∈ A₁, x₂ ∈ A₂,… xₙ ∈ Aₙ.</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example − If we take two sets A = {"{a, b}"} and B = {"{1, 2}"}:</Text>
        <Text style={styles.exampleText}>The Cartesian product of A and B is: A × B = {"{(a, 1), (a, 2), (b, 1), (b, 2)}"}</Text>
        <Text style={styles.exampleText}>The Cartesian product of B and A is: B × A = {"{(1, a), (1, b), (2, a), (2, b)}"}</Text>
      </View>

      {/* --- POWER SET --- */}
      <Text style={styles.sectionHeader}>Power Set</Text>
      <Text style={styles.paragraph}>Power set of a set S is the set of all subsets of S including the empty set. The cardinality of a power set of a set S of cardinality n is 2ⁿ. Power set is denoted as P(S).</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example − For a set S = {"{a, b, c, d}"} let us calculate the subsets −</Text>
        <Text style={styles.exampleText}>• Subsets with 0 elements − {"{∅}"} (the empty set)</Text>
        <Text style={styles.exampleText}>• Subsets with 1 element − {"{a}, {b}, {c}, {d}"}</Text>
        <Text style={styles.exampleText}>• Subsets with 2 elements − {"{a,b}, {a,c}, {a,d}, {b,c}, {b,d}, {c,d}"}</Text>
        <Text style={styles.exampleText}>• Subsets with 3 elements − {"{a,b,c}, {a,b,d}, {a,c,d}, {b,c,d}"}</Text>
        <Text style={styles.exampleText}>• Subsets with 4 elements − {"{a,b,c,d}"}</Text>
        <View style={styles.divider} />
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c'}]}>P(S) = {"{{∅}, {a}, {b}, {c}, {d}, {a,b}, {a,c}, {a,d}, {b,c}, {b,d}, {c,d}, {a,b,c}, {a,b,d}, {a,c,d}, {b,c,d}, {a,b,c,d}}"}</Text>
        <Text style={[styles.exampleText, styles.bold]}>|P(S)| = 2⁴ = 16</Text>
      </View>
      <Text style={styles.paragraph}>Note − The power set of an empty set is also an empty set. |P({"{"}∅{"}"})| = 2⁰ = 1.</Text>

      {/* --- PARTITIONING --- */}
      <Text style={styles.sectionHeader}>Partitioning of a Set</Text>
      <Text style={styles.paragraph}>Partition of a set, say S, is a collection of n disjoint subsets, say P₁, P₂,… Pₙ that satisfies the following three conditions −</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>1.</Text>
        <Text style={styles.bulletText}>Pᵢ does not contain the empty set. [Pᵢ ≠ {"{∅}"} for all 0 {"<"} i ≤ n]</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>2.</Text>
        <Text style={styles.bulletText}>The union of the subsets must equal the entire original set. [P₁ ∪ P₂ ∪ ⋯ ∪ Pₙ = S]</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>3.</Text>
        <Text style={styles.bulletText}>The intersection of any two distinct sets is empty. [Pₐ ∩ P₆ = {"{∅}"}, for a ≠ b where n ≥ a, b ≥ 0]</Text>
      </View>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example − Let S = {"{a, b, c, d, e, f, g, h}"}</Text>
        <Text style={styles.exampleText}>One probable partitioning is {"{a}, {b, c, d}, {e, f, g, h}"}</Text>
        <Text style={styles.exampleText}>Another probable partitioning is {"{a, b}, {c, d}, {e, f, g, h}"}</Text>
      </View>

      <Text style={styles.subHeader}>Bell Numbers</Text>
      <Text style={styles.paragraph}>Bell numbers give the count of the number of ways to partition a set. They are denoted by Bₙ where n is the cardinality of the set.</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Example − Let S = {"{1, 2, 3}"}, n = |S| = 3.</Text>
        <Text style={[styles.exampleText, {marginTop: 5}]}>The alternate partitions are −</Text>
        <Text style={styles.exampleText}>1. ∅, {"{1, 2, 3}"}</Text>
        <Text style={styles.exampleText}>2. {"{1}, {2, 3}"}</Text>
        <Text style={styles.exampleText}>3. {"{1, 2}, {3}"}</Text>
        <Text style={styles.exampleText}>4. {"{1, 3}, {2}"}</Text>
        <Text style={styles.exampleText}>5. {"{1}, {2}, {3}"}</Text>
        <Text style={[styles.exampleText, styles.bold, {color: '#16941c', marginTop: 5}]}>Hence B₃ = 5</Text>
      </View>

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
  exampleText: { fontFamily: 'monospace', fontSize: 13, color: '#334155', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  codeBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 10 },
  codeText: { fontFamily: 'monospace', fontSize: 13, color: '#0F172A', textAlign: 'left' },
  
  // ✅ Image Styles for Venn Diagrams
  image: { width: '100%', height: 200, borderRadius: 12, marginTop: 15, marginBottom: 5, backgroundColor: '#f1f5f9' },
  imageCaption: { fontSize: 13, color: '#64748b', textAlign: 'center', fontStyle: 'italic', marginBottom: 20 }
});