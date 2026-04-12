import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PredicatesQuantifiers_1_5() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        Predicates and Quantifiers are used to build logical expressions involving variables. Predicates help in making statements about objects, while quantifiers specify the scope of these statements. Together, they allow mathematicians to express ideas about groups of objects rather than just individual elements.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will touch upon the basics of predicates and quantifiers, explain their types, and provide examples to see their use in mathematical reasoning. We will also understand how predicates are different from statements and how quantifiers modify their meanings.
      </Text>

      {/* --- PREDICATES --- */}
      <Text style={styles.sectionHeader}>Predicates in Discrete Mathematics</Text>
      <Text style={styles.paragraph}>
        We know the idea of predicate a little. A predicate is a logical expression that contains variables and becomes a statement when specific values are substituted for those variables. So predicates describe properties or conditions that elements of a set can satisfy.
      </Text>

      <Text style={styles.subHeader}>Example of a Predicate</Text>
      <Text style={styles.paragraph}>Consider we have a predicate P(x) that states, "x is a prime number".</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• If we replace x with 2, the predicate P(2) becomes the statement, "2 is a prime number" which is <Text style={{fontWeight: 'bold', color: '#16941c'}}>True</Text>.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}>• Similarly, if we substitute x = 4, the predicate P(4) becomes "4 is a prime number" which is <Text style={{fontWeight: 'bold', color: '#dc2626'}}>False</Text>.</Text>
      </View>
      <Text style={styles.paragraph}>
        In both the cases, by substituting specific values for x, the predicate becomes a definite statement that can be either True or False.
      </Text>

      <Text style={styles.subHeader}>Difference between a Predicate and a Statement</Text>
      <Text style={styles.paragraph}>
        Predicates and Statements are quite similar and that’s why they become confusing. A <Text style={styles.bold}>statement</Text> is a sentence that is either True or False. However, a <Text style={styles.bold}>predicate</Text> has a variable and is not a statement until the variable is replaced with a specific value. For example:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Predicate</Text> − "n is a prime number."</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Statement</Text> − "7 is a prime number."</Text>
      </View>
      <Text style={styles.paragraph}>
        Without assigning a value to the variable n, the predicate is incomplete and does not hold a truth value. Only when we provide a value for n, like in the case of "7 is a prime number," does the predicate become a true or false statement.
      </Text>

      {/* --- QUANTIFIERS --- */}
      <Text style={styles.sectionHeader}>Quantifiers in Discrete Mathematics</Text>
      <Text style={styles.paragraph}>
        The next part is the quantifiers. These are symbols or words that define the extent to which a predicate is true for a set of elements. In mathematics, we use two main types of quantifiers:
      </Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>1.</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Universal quantifier</Text> (denoted by ∀), meaning "for all."</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>2.</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Existential quantifier</Text> (denoted by ∃), meaning "there exists."</Text>
      </View>

      <Text style={styles.subHeader}>Universal Quantifier ( ∀ )</Text>
      <Text style={styles.paragraph}>
        From the name itself we can understand this. The universal quantifier is used when we want to declare that a predicate is true for every possible value of a variable. It is read as "for all" or "for every."
      </Text>
      <Text style={styles.paragraph}>Let us understand with examples. Consider the following statement −</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>∀x (x ≥ 0)</Text>
        <Text style={styles.codeSubText}>"For all values of x, x is greater than or equal to zero."</Text>
      </View>
      <Text style={styles.paragraph}>In the domain of natural numbers (0, 1, 2, ...), this statement is True.</Text>

      <Text style={styles.subHeader}>Existential Quantifier ( ∃ )</Text>
      <Text style={styles.paragraph}>
        Another type of quantifier is the existential quantifier. It is used when we want to say that there is at least one value of a variable for which a predicate is true. It is read as "there exists" or "there is."
      </Text>
      <Text style={styles.paragraph}>For example, consider the following statement −</Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>∃x (x {"<"} 0)</Text>
        <Text style={styles.codeSubText}>"There exists an x such that x is less than zero."</Text>
      </View>
      <Text style={styles.paragraph}>
        In the domain of natural numbers, this statement is false because no natural number is less than zero. However, in the domain of real numbers, this statement is true.
      </Text>

      {/* --- COMBINING QUANTIFIERS --- */}
      <Text style={styles.sectionHeader}>Combining the Quantifiers</Text>
      <Text style={styles.paragraph}>
        We can combine these two quantifiers for better use cases. Let us look at how this works by checking the following examples –
      </Text>

      <Text style={styles.subHeader}>Example of Universal and Existential Quantifiers</Text>
      <Text style={styles.paragraph}>Consider the statement −</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.bold, {fontSize: 16, marginBottom: 5}]}>∀x ∃y (y {"<"} x)</Text>
        <Text style={styles.exampleText}>This reads, "For every x, there exists a y such that y is less than x."</Text>
      </View>
      <Text style={styles.paragraph}>
        If we are working within the domain of natural numbers (0, 1, 2, ...), this statement is <Text style={styles.bold}>false</Text> because for x = 0, there is no natural number y such that y {"<"} 0. However, if we change the domain to real numbers, this statement becomes <Text style={styles.bold}>true</Text>, since for any real number x, there exists a real number y that is smaller.
      </Text>

      <Text style={styles.subHeader}>Example of Nested Quantifiers</Text>
      <Text style={styles.paragraph}>Now, let us look at a more complex statement with nested quantifiers −</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.bold, {fontSize: 16, marginBottom: 5}]}>∃x ∀y (y ≥ x)</Text>
        <Text style={styles.exampleText}>This reads, "There exists an x such that for all y, y is greater than or equal to x."</Text>
      </View>
      <Text style={styles.paragraph}>
        In the domain of natural numbers, this statement is <Text style={styles.bold}>true</Text> because the number x = 0 satisfies this condition. No matter which number y we choose, it will always be greater than or equal to 0.
      </Text>

      {/* --- NEGATION --- */}
      <Text style={styles.sectionHeader}>Negation of Quantifiers</Text>
      <Text style={styles.paragraph}>
        When we negate quantified statements, the type of quantifier changes. The negation of a universal quantifier becomes an existential quantifier, and the negation of an existential quantifier becomes a universal quantifier.
      </Text>
      <Text style={styles.paragraph}>Following are the rules of negation −</Text>
      
      <View style={styles.ruleBox}>
        <Text style={styles.ruleText}>¬∀xP(x) ≡ ∃x¬P(x)</Text>
        <Text style={styles.ruleDesc}>Meaning "It is not true that for all x, P(x) is true" is the same as "There exists an x such that P(x) is false."</Text>
      </View>
      <View style={styles.ruleBox}>
        <Text style={styles.ruleText}>¬∃xP(x) ≡ ∀x¬P(x)</Text>
        <Text style={styles.ruleDesc}>Meaning "There does not exist an x such that P(x) is true" is the same as "For all x, P(x) is false."</Text>
      </View>

      <Text style={styles.subHeader}>Example of Negating a Universal Quantifier</Text>
      <Text style={styles.paragraph}>Consider the following statement −</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Original: <Text style={styles.bold}>∀x (x ≥ 0)</Text></Text>
        <Text style={styles.exampleText}>Negation: <Text style={styles.bold}>¬∀x (x ≥ 0)</Text>, which is equivalent to <Text style={styles.bold}>∃x (x {"<"} 0)</Text></Text>
      </View>
      <Text style={styles.paragraph}>
        This negation reads, "There exists an x such that x {"<"} 0". In the domain of real numbers, this is true, as there are negative numbers.
      </Text>

      <Text style={styles.subHeader}>Example of Negating an Existential Quantifier</Text>
      <Text style={styles.paragraph}>Consider the following statement −</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>Original: <Text style={styles.bold}>∃x (x {">"} 10)</Text></Text>
        <Text style={styles.exampleText}>Negation: <Text style={styles.bold}>¬∃x (x {">"} 10)</Text>, which is equivalent to <Text style={styles.bold}>∀x (x ≤ 10)</Text></Text>
      </View>
      <Text style={styles.paragraph}>
        This negation reads, "For all x, x is less than or equal to 10." If we are in the domain of natural numbers, this is false because numbers greater than 10 exist.
      </Text>

      {/* --- IMPLICIT QUANTIFIERS --- */}
      <Text style={styles.sectionHeader}>Implicit Quantifiers</Text>
      <Text style={styles.paragraph}>
        In some cases, the quantifiers in a sentence are implied rather than explicitly stated. For example, when we say −
      </Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, {fontStyle: 'italic'}]}>"If a shape is a square, then it is a rectangle"</Text>
      </View>
      <Text style={styles.paragraph}>Although this is not written with quantifiers, it is understood that we mean −</Text>
      <View style={styles.exampleBox}>
        <Text style={[styles.exampleText, {fontStyle: 'italic'}]}>"For all shapes, if the shape is a square, then it is a rectangle"</Text>
      </View>
      <Text style={styles.paragraph}>
        Here, the universal quantifier "for all shapes" is <Text style={styles.bold}>implicit</Text>.
      </Text>
      <Text style={styles.paragraph}>
        Similarly, when we use predicates, it is often assumed that the variables are universally quantified unless otherwise stated. For instance, when we define a predicate P(n) to mean "n is prime," we assume that n is universally quantified.
      </Text>

      {/* --- PROOFS --- */}
      <Text style={styles.sectionHeader}>Using Predicates and Quantifiers in Proofs</Text>
      <Text style={styles.paragraph}>
        Predicates and quantifiers are often used in formal proofs to express general statements about numbers, sets, or other mathematical objects. The combination of these tools allows for precision and clarity in mathematical reasoning.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the importance of predicates and quantifiers in discrete mathematics. Predicates allow us to describe the properties of objects, while quantifiers help define the scope of these descriptions.
      </Text>
      <Text style={styles.paragraph}>
        We presented the concept of two main quantifiers, universal and existential. Additionally, we understood how to negate quantified statements and saw how implicit quantifiers work in certain cases.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, backgroundColor: '#ffffff' },
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
  codeBox: { backgroundColor: '#F1F5F9', padding: 12, borderRadius: 8, marginBottom: 15, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  codeText: { fontFamily: 'monospace', fontSize: 18, fontWeight: 'bold', color: '#16941c' },
  codeSubText: { fontSize: 13, color: '#64748B', marginTop: 5, fontStyle: 'italic', textAlign: 'center' },
  ruleBox: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#FEF3C7', marginBottom: 12 },
  ruleText: { fontFamily: 'monospace', fontSize: 15, fontWeight: 'bold', color: '#92400E', marginBottom: 5 },
  ruleDesc: { fontSize: 13, color: '#78350F', lineHeight: 20 }
});