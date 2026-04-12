import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Groups_3_3() {
  
  // Custom Axiom Component for the 4 Group Properties
  const AxiomCard = ({ title, description }) => (
    <View style={styles.axiomCard}>
      <View style={styles.axiomHeader}>
        <MaterialCommunityIcons name="shield-check" size={20} color="#16941c" />
        <Text style={styles.axiomTitle}>{title}</Text>
      </View>
      <Text style={styles.axiomDesc}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Algebraic structures are one of the fundamental concepts in abstract algebra. These structures are used to organize and understand the mathematical systems that operate under specific rules. One of the most common structures is <Text style={styles.bold}>groups</Text>. In this chapter, we will see the basics of algebraic structures on groups with examples for a better understanding.
      </Text>

      {/* --- WHAT IS AN ALGEBRAIC STRUCTURE --- */}
      <Text style={styles.sectionHeader}>What is an Algebraic Structure?</Text>
      <Text style={styles.paragraph}>
        An algebraic structure is simply a set of elements which are combined with one or more operations that define how those elements interact. The set should be non-empty so that there should be at least one element in it. When we talk about "operations," we are referring to actions like addition, multiplication, or even more abstract things like set operations.
      </Text>
      <Text style={styles.paragraph}>
        A binary operation is commonly used when defining algebraic structures. The Binary means that the operation is performed between two elements at a time. If we think about basic arithmetic: if we add two numbers, then it is a binary operation. For an algebraic structure to be valid. When we apply the operation on any two elements of the set, the result should still be an element from the same set (closure property).
      </Text>

      <Text style={styles.subHeader}>Example of Closure in Natural Numbers</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>
          Let us take the set of natural numbers, where all numbers starting from 1 and going on forever (1, 2, 3, ...). If we take two natural numbers like 5 and 10, and we add them, we get 15. This result is also a natural number. So the natural numbers is "closed" under addition.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>
          But if we tried subtraction, like 5 minus 10, we get -5, which is not a natural number. So, natural number is not closed under subtraction.
        </Text>
      </View>

      {/* --- WHAT IS A GROUP --- */}
      <Text style={styles.sectionHeader}>What is a Group?</Text>
      <Text style={styles.paragraph}>
        A group is a specific type of algebraic structure. It has a set and one binary operation, but it also satisfies a few more rules or properties that make it a group. These properties are −
      </Text>

      <AxiomCard 
        title="Closure"
        description="Like we said earlier, the result of applying the operation to any two elements from the set should stay in the set."
      />

      <AxiomCard 
        title="Associativity"
        description="If you have three elements from the set, it does not matter how you group them when applying the operation. For example, if we are adding three numbers, it does not matter if we add the first two and then add the third, or if we add the last two first and then add that result to the first number."
      />

      <AxiomCard 
        title="Identity Element"
        description="There should be one special element in the set that, when combined with any other element. It does not change the other element. For addition, this element is 0. For multiplication, it is 1."
      />

      <AxiomCard 
        title="Inverse Element"
        description="For each element in the set, there should be another element in the set that, when combined with the first element using the operation, gives you the identity element. In addition, for example, every number has an inverse: the inverse of 5 is -5, because 5 + (-5) = 0, which is the identity for addition."
      />
      <Text style={styles.paragraph}>
        These four properties, closure, associativity, identity, and inverse they make a group.
      </Text>

      {/* --- EXAMPLES OF GROUPS AND NON-GROUPS --- */}
      <Text style={styles.sectionHeader}>Group Examples</Text>

      <Text style={styles.subHeader}>Example of a Group Integers under Addition</Text>
      <Text style={styles.paragraph}>
        Let us see some example to understand the idea. Take the set of all integers, which includes both positive and negative numbers (..., -3, -2, -1, 0, 1, 2, 3, ...). Now, consider the operation of addition.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Closure</Text> − If we add any two integers, the result is always another integer. For example, -3 + 5 = 2, which is still an integer. So, integers are closed under addition.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Associativity</Text> − Addition of integers is associative. Whether we calculate (-3 + 5) + 2 or -3 + (5 + 2), the result is still the same: 4.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Identity Element</Text> − The identity element for addition is 0. No matter which integer we pick, adding 0 to it does not change the integer. For example, 5 + 0 = 5.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Inverse Element</Text> − Every integer has an inverse. For instance, the inverse of 7 is -7, because 7 + (-7) = 0.</Text>
      </View>
      <Text style={styles.paragraph}>
        Since the set of integers with the operation of addition satisfies all these properties, it forms a group.
      </Text>

      <Text style={styles.subHeader}>Example of Non-Groups</Text>
      <Text style={styles.paragraph}>
        To understand them better let us see some non-groups. If we take natural numbers again, but this time under subtraction.
      </Text>
      <View style={[styles.infoBox, styles.errorBox]}>
        <Text style={[styles.infoText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Closure</Text> − As we saw earlier, natural numbers are not closed under subtraction. Subtracting two natural numbers not always give us a natural number. For example, 3 - 5 = -2, which is not a natural number.</Text>
        <Text style={[styles.infoText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Inverse Element</Text> − For subtraction, the inverse of a number is its negative. But natural numbers do not include negative numbers, so there are no inverse elements in this set for subtraction.</Text>
      </View>
      <Text style={styles.paragraph}>
        Because these properties are missing, the set of natural numbers under subtraction does not form a group.
      </Text>

      {/* --- TYPES OF GROUPS --- */}
      <Text style={styles.sectionHeader}>Types of Groups</Text>
      <Text style={styles.paragraph}>
        In groups we see some special branches or types, depending on additional properties they may satisfy.
      </Text>

      <View style={styles.typeBox}>
        <Text style={styles.subHeader}>1. Abelian Groups</Text>
        <Text style={styles.paragraph}>
          If the groups operation is commutative. So it does not matter in which order we apply the operation, the group is called an Abelian group. For example, the set of integers under addition is an Abelian group because 5 + 3 is the same as 3 + 5.
        </Text>
      </View>

      <View style={[styles.typeBox, {backgroundColor: '#F1F5F9', borderColor: '#E2E8F0'}]}>
        <Text style={styles.subHeader}>2. Non-Abelian Groups</Text>
        <Text style={styles.paragraph}>
          In some groups, the order in which we apply the operation does matter. These are called non-Abelian groups. A classic example is the set of 2x2 matrices under matrix multiplication. The result of multiplying two matrices depends on their order, so this is a non-Abelian group.
        </Text>
      </View>

      {/* --- MORE EXAMPLES --- */}
      <Text style={styles.sectionHeader}>More Examples of Groups</Text>
      <Text style={styles.paragraph}>Let us see some other examples of groups.</Text>

      <Text style={styles.subHeader}>Example 1: Real Numbers under Addition</Text>
      <Text style={styles.paragraph}>The set of real numbers under the operation of addition is a group. It satisfies all four properties:</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure</Text> − Adding two real numbers gives a real number.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity</Text> − Real numbers follow the rule of associativity in addition.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity Element</Text> − The number 0 is the identity element.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Inverse Element</Text> − Every real number has an inverse, which is simply its negative.</Text>
      </View>

      <Text style={styles.subHeader}>Example 2: Real Numbers without Zero Under Multiplication</Text>
      <Text style={styles.paragraph}>Let us see another example, here consider a set of real numbers, excluding 0, under the operation of multiplication, forms a group. Because:</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure</Text> − Multiplying two non-zero real numbers gives another non-zero real number.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associativity</Text> − Multiplication of real numbers is associative.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Identity Element</Text> − The number 1 is the identity element for multiplication, because multiplying any number by 1 does not change it.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Inverse Element</Text> − Every non-zero real number has an inverse, which is its reciprocal. For example, the inverse of 5 is 1/5.</Text>
      </View>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the concept of algebraic structures, particularly focusing on groups. We understood the basic idea of an algebraic structure, which is a set with an operation that meets certain criteria. We also understood what makes a group, focusing on the four key properties, the closure, associativity, identity, and inverse.
      </Text>
      <Text style={styles.paragraph}>
        By going through examples like integers under addition and real numbers under multiplication, we saw how these abstract concepts play out in real mathematical situations. Finally, we distinguished between types of groups, such as Abelian and non-Abelian groups.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 8, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#BAE6FD' },
  infoText: { fontSize: 14, color: '#0369A1', marginBottom: 8, lineHeight: 22 },
  errorBox: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  
  axiomCard: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', padding: 15, marginBottom: 15 },
  axiomHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  axiomTitle: { fontSize: 16, fontWeight: 'bold', color: '#16941c', marginLeft: 10 },
  axiomDesc: { fontSize: 14, color: '#475569', lineHeight: 22 },
  
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', backgroundColor: '#F0FDF4', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#166534', marginBottom: 6, lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#BBF7D0', marginVertical: 10 },
  
  typeBox: { padding: 15, borderRadius: 12, backgroundColor: '#F0F9FF', marginBottom: 15, borderWidth: 1, borderColor: '#BAE6FD' }
});