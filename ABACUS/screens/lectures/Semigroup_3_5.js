import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Semigroup_3_5() {
  
  // Custom Component for Semigroup Property Verification
  const PropertyCard = ({ title, description, color = "#16941c" }) => (
    <View style={[styles.propCard, { borderLeftColor: color }]}>
      <Text style={[styles.propTitle, { color: color }]}>{title}</Text>
      <Text style={styles.propDesc}>{description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Algebraic Structures play an important role in Group Theory and Discrete Mathematics. Among these structures, one of the useful structures is a <Text style={styles.bold}>semigroup</Text>. A semigroup is a set paired with an operation that satisfies a specific property.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will explain what a semigroup is and why it is important. In addition, we will provide several examples to help you understand the concept better.
      </Text>

      {/* --- WHAT IS A SEMIGROUP & CLOSURE --- */}
      <Text style={styles.sectionHeader}>What is a Semigroup?</Text>
      <Text style={styles.paragraph}>
        A semigroup is nothing but an algebraic structure. As we know, an algebraic structure is a collection of set and an operation like addition or multiplication that we apply to elements within that set. However, for it to be considered an algebraic structure, the set must satisfy the closure property.
      </Text>

      <Text style={styles.subHeader}>Closure Property</Text>
      <Text style={styles.paragraph}>
        The Closure Property implies that, if we apply the operation to any two elements of the set, the result must also be an element of the set. For example, the set of natural numbers (1, 2, 3, …) is closed under addition. If we add two natural numbers, we will always get another natural number.
      </Text>

      <Text style={styles.paragraph}>
        Once the closure property is satisfied, we can start talking about semigroups. And a <Text style={styles.bold}>semigroup</Text> is an algebraic structure that satisfies two properties −
      </Text>

      <PropertyCard 
        title="1. Closure Property"
        description="The set must be closed under the operation."
      />
      <PropertyCard 
        title="2. Associative Property"
        description="The operation must be associative. This means the way in which elements are grouped during the operation does not affect the result. In other words, (A * B) * C should be the same as A * (B * C)."
      />

      <Text style={styles.paragraph}>
        If a set and operation satisfy both of these properties, then we have a semigroup. The operation could be addition, multiplication, or any binary operation.
      </Text>

      {/* --- UNDERSTANDING ASSOCIATIVE PROPERTY --- */}
      <Text style={styles.sectionHeader}>Understanding Associative Property</Text>
      <Text style={styles.paragraph}>
        The Associative Property is at the heart of what makes a <Text style={styles.bold}>semigroup</Text>. Associativity means that no matter how the group elements are arranged, the result remains the same. For example, with addition −
      </Text>
      <View style={styles.formulaBox}>
        <Text style={styles.formulaText}>(2 + 3) + 5 = 2 + (3 + 5) = 10</Text>
      </View>
      <Text style={styles.paragraph}>
        Here, the order in which we add the numbers does not matter. This is why addition is associative. On the other side, not all operations are associative. Subtraction, for example, is not associative −
      </Text>
      <View style={[styles.formulaBox, {backgroundColor: '#FEF2F2', borderColor: '#FECACA'}]}>
        <Text style={[styles.formulaText, {color: '#B91C1C'}]}>(7 − 3) − 2 ≠ 7 − (3 − 2)</Text>
      </View>
      <Text style={styles.paragraph}>
        This difference is key when determining whether something qualifies as a semigroup.
      </Text>

      {/* --- EXAMPLES OF SEMIGROUPS --- */}
      <Text style={styles.sectionHeader}>Examples of Semigroups</Text>
      <Text style={styles.paragraph}>Let us now understand more about semigroups with the help of a set of examples −</Text>

      <Text style={styles.subHeader}>Example 1: Natural Numbers under Addition</Text>
      <Text style={styles.paragraph}>The set of natural numbers (1, 2, 3, …) under the operation of addition forms a semigroup. It is because:</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure Property</Text> − If we add any two natural numbers, the result is also a natural number. For instance, 2 + 5 = 7.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associative Property</Text> − Addition is associative. No matter how our group the numbered, the sum will be the same. For example, (1 + 2) + 3 equals 1 + (2 + 3), both returning 6.</Text>
      </View>
      <Text style={styles.paragraph}>Since both properties are satisfied, the set of natural numbers under addition forms a semigroup.</Text>

      <Text style={styles.subHeader}>Example 2: Integers under Multiplication</Text>
      <Text style={styles.paragraph}>Now, let us consider the set of integers (…, -3, -2, -1, 0, 1, 2, 3, …) under multiplication.</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure Property</Text> − Multiplying any two integers will always give another integer. For example, 5 * (-3) = -15.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associative Property</Text> − Multiplication is also associative. So, (2 * 3) * 4 is the same as 2 * (3 * 4), and both equal 24.</Text>
      </View>
      <Text style={styles.paragraph}>Thus, the set of integers under multiplication forms a semigroup.</Text>

      <Text style={styles.subHeader}>Example 3: Real Numbers under Addition</Text>
      <Text style={styles.paragraph}>The set of real numbers, which includes all rational and irrational numbers, under the operation of addition is also a semigroup.</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Closure Property</Text> − Adding two real numbers would always result in a real number. For example, 1.5 + 2.3 = 3.8.</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Associative Property</Text> − Just like with integers, addition is associative with real values. For example, (1.2 + 3.4) + 5.6 is the same as 1.2 + (3.4 + 5.6), and both equal 10.2.</Text>
      </View>
      <Text style={styles.paragraph}>So that, real numbers under addition satisfy both properties and form a semigroup.</Text>

      {/* --- NON-EXAMPLES OF SEMIGROUPS --- */}
      <Text style={styles.sectionHeader}>Non-Examples of Semigroups</Text>
      <Text style={styles.paragraph}>Not every set and operation combination forms a semigroup. Let us look at some cases where they do not.</Text>

      <Text style={styles.subHeader}>Example 1: Natural Numbers under Subtraction</Text>
      <Text style={styles.paragraph}>While natural numbers form a semigroup under addition, they <Text style={styles.bold}>do not</Text> form a semigroup under subtraction. Because −</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Closure Property</Text> − If we subtract two natural numbers, the result is not always a natural number. For example, 5 - 10 = -5, which is not a natural number.</Text>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Associative Property</Text> − Subtraction is not associative. For instance, (7 - 3) - 2 is not the same as 7 - (3 - 2). In the first case, we get 2, and in the second, we get 6.</Text>
      </View>
      <Text style={styles.paragraph}>Since both properties are not satisfied, natural numbers under subtraction do not form a semigroup.</Text>

      <Text style={styles.subHeader}>Example 2: Integers under Division</Text>
      <Text style={styles.paragraph}>Let us consider the set of integers under division.</Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Closure Property</Text> − Division of two integers does not always give an integer. For example, 5 ÷ 2 = 2.5, which is not an integer.</Text>
        <Text style={[styles.exampleText, {color: '#991B1B'}]}>• <Text style={styles.bold}>Associative Property</Text> − Division is not associative. For example, (8 ÷ 4) ÷ 2 is 1, but 8 ÷ (4 ÷ 2) is 4.</Text>
      </View>
      <Text style={styles.paragraph}>Therefore, integers under division does not form a semigroup.</Text>

      {/* --- CHEF ANALOGY --- */}
      <Text style={styles.sectionHeader}>Associativity Example</Text>
      <Text style={styles.paragraph}>Let us see another real-world analogy to understand associativity.</Text>
      <View style={styles.analogyBox}>
        <View style={styles.analogyHeader}>
          <MaterialCommunityIcons name="chef-hat" size={24} color="#92400E" />
          <Text style={styles.analogyTitle}>The Chef</Text>
        </View>
        <Text style={styles.analogyText}>
          Imagine we are at a restaurant ordering food. The chef can prepare meals in any sequence, and we will get the same result. Whether the chef prepares the appetizer, then the main course, and then the dessert, or prepares the dessert first, the final meal is still complete.
        </Text>
        <View style={{height: 10}} />
        <Text style={styles.analogyText}>
          In this sense, associativity is like the flexibility of a chef's cooking sequence. As long as all the steps are followed, the result will be the same.
        </Text>
      </View>

      {/* --- MODULAR ARITHMETIC SPECIAL CASE --- */}
      <Text style={styles.sectionHeader}>Special Case: Semigroups in Modular Arithmetic</Text>
      <Text style={styles.paragraph}>
        The example of a semigroup can be found in modular arithmetic, which is often used in several use cases in computer science. For instance, let us consider the set of integers under addition modulo 5. In this case −
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Closure Property</Text> − Adding two numbers modulo 5 always results in a number between 0 and 4. For example, (3 + 4) mod 5 = 2.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Associative Property</Text> − Addition modulo 5 is associative. For example, (1 + 2) mod 5 + 3 mod 5 is the same as 1 mod 5 + (2 + 3) mod 5.</Text>
      </View>
      <Text style={styles.paragraph}>Thus, modular arithmetic with addition forms a semigroup.</Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        A semigroup is an algebraic structure where the set of elements is closed under a binary operation and that operation is associative.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we presented several examples, including natural numbers under addition and integers under multiplication, to understand how the closure and associative properties work. Additionally, we understood non-examples too, like natural numbers under subtraction and integers under division.
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
  
  propCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 5, marginBottom: 15 },
  propTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  propDesc: { fontSize: 14, color: '#475569', lineHeight: 22 },
  
  formulaBox: { backgroundColor: '#F0FDF4', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#BBF7D0', marginVertical: 10 },
  formulaText: { fontFamily: 'monospace', fontSize: 15, color: '#166534', fontWeight: 'bold', textAlign: 'center' },
  
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', backgroundColor: '#F0FDF4', marginBottom: 15, marginTop: 5 },
  exampleText: { fontSize: 14, color: '#166534', marginBottom: 8, lineHeight: 22 },
  
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  
  analogyBox: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B', marginVertical: 15 },
  analogyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  analogyTitle: { fontSize: 16, fontWeight: 'bold', color: '#92400E', marginLeft: 8 },
  analogyText: { fontSize: 14, color: '#92400E', fontStyle: 'italic', lineHeight: 22, textAlign: 'justify' },
  
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#BAE6FD', marginTop: 5 },
  infoText: { fontSize: 14, color: '#0369A1', marginBottom: 8, lineHeight: 22 }
});