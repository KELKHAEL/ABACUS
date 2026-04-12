import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AbelianGroup_3_4() {
  
  // Custom Verification Item Component
  const VerifyItem = ({ property, detail, isMet = true }) => (
    <View style={styles.verifyRow}>
      <MaterialCommunityIcons 
        name={isMet ? "check-circle" : "close-circle"} 
        size={20} 
        color={isMet ? "#16941c" : "#B91C1C"} 
        style={{marginTop: 2}}
      />
      <View style={styles.verifyTextContainer}>
        <Text style={[styles.verifyProp, { color: isMet ? "#166534" : "#991B1B" }]}>{property}</Text>
        <Text style={styles.verifyDetail}>{detail}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        In discrete mathematics, "groups" are one of the core topics that help in understanding how different sets of elements can work under specific operations. Among these, the <Text style={styles.bold}>Abelian group</Text>, also known as <Text style={styles.bold}>commutative group</Text>, are special because of a special property it has: <Text style={styles.bold}>commutativity</Text>.
      </Text>
      <Text style={styles.paragraph}>
        In this chapter, we will understand the basics of what an Abelian group is and how it’s different from other groups.
      </Text>

      {/* --- WHAT IS A GROUP RECAP --- */}
      <Text style={styles.sectionHeader}>What is a Group?</Text>
      <Text style={styles.paragraph}>
        For a basic recap on groups, we can say, a <Text style={styles.bold}>group</Text> is a set of elements that is combined with a binary operation (like addition or multiplication), but it also has to follow four key properties:
      </Text>
      <View style={styles.recapBox}>
        <Text style={styles.recapText}>• <Text style={styles.bold}>Closure</Text></Text>
        <Text style={styles.recapText}>• <Text style={styles.bold}>Associativity</Text></Text>
        <Text style={styles.recapText}>• <Text style={styles.bold}>Identity Element</Text></Text>
        <Text style={styles.recapText}>• <Text style={styles.bold}>Inverse Element</Text></Text>
      </View>
      <Text style={styles.paragraph}>
        If a set with a binary operation satisfies these four properties, then it's a group.
      </Text>

      {/* --- ABELIAN DEFINITION --- */}
      <Text style={styles.sectionHeader}>What is an Abelian Group?</Text>
      <Text style={styles.paragraph}>
        An Abelian group is just a special type of group that also satisfies the commutative property. It means the order in which we apply the operation does not matter.
      </Text>
      <Text style={styles.paragraph}>Formally, we can state that for a group to be Abelian, it should satisfy the following −</Text>

      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaText}>
          For every pair of elements, A and B, in the group, applying the operation in both orders gives the same result. In simple terms, <Text style={styles.bold}>A + B</Text> should be the same as <Text style={styles.bold}>B + A</Text>.
        </Text>
      </View>

      <Text style={styles.paragraph}>
        If a group satisfies all four group properties and the commutative property, we can regard it as an Abelian group.
      </Text>

      <View style={styles.noteBox}>
        <Text style={styles.noteText}>
          <Text style={styles.bold}>Note</Text> − The name "Abelian" comes from a famous mathematician named <Text style={styles.bold}>Niels Henrik Abel</Text>, who worked extensively in Group Theory.
        </Text>
      </View>

      {/* --- EXAMPLES --- */}
      <Text style={styles.sectionHeader}>Examples of Abelian Groups</Text>
      <Text style={styles.paragraph}>Let us see some examples for Abelian Groups and how they work.</Text>

      <Text style={styles.subHeader}>Example 1: Integers under Addition</Text>
      <Text style={styles.paragraph}>
        Consider there is a set of all integers (…, -3, -2, -1, 0, 1, 2, 3, …) under the operation of addition. These are forming the Abelian group.
      </Text>
      <View style={styles.exampleCard}>
        <VerifyItem property="Closure" detail="If we add any two integers, we will always get another integer. For example, -3 + 5 = 2, which is still an integer." />
        <VerifyItem property="Associativity" detail="Addition is associative, meaning (a + b) + c is the same as a + (b + c)." />
        <VerifyItem property="Identity Element" detail="The identity element for addition is 0 because adding 0 to any number does not change the number. For example, 5 + 0 = 5." />
        <VerifyItem property="Inverse Element" detail="Every integer has an inverse under addition. For instance, the inverse of 7 is -7 because 7 + (-7) = 0." />
        <VerifyItem property="Commutativity" detail="Addition of integers is commutative. It means, 5 + 7 is the same as 7 + 5." />
      </View>
      <Text style={styles.paragraph}>
        Since the set of integers under addition satisfies all four group properties and is commutative, it is an Abelian group.
      </Text>

      <Text style={styles.subHeader}>Example 2: Real Numbers under Multiplication</Text>
      <Text style={styles.paragraph}>
        Let us see another example. Consider the set of all real numbers, excluding 0 (denoted as R*), under multiplication forms another Abelian group.
      </Text>
      <View style={styles.exampleCard}>
        <VerifyItem property="Closure" detail="Multiplying two real numbers gives another real number. For example, 2 * 5 = 10, and 1.5 * 3.2 = 4.8." />
        <VerifyItem property="Associativity" detail="Multiplication is associative. (a * b) * c = a * (b * c)." />
        <VerifyItem property="Identity Element" detail="The identity element for multiplication is 1 because multiplying any number by 1 does not change the number." />
        <VerifyItem property="Inverse Element" detail="Every non-zero real number has an inverse under multiplication. For example, the inverse of 5 is 1/5 because 5 * 1/5 = 1." />
        <VerifyItem property="Commutativity" detail="Multiplication is commutative, meaning a * b is always the same as b * a." />
      </View>
      <Text style={styles.paragraph}>
        Thus, the set of real numbers (except 0) under multiplication is an Abelian group.
      </Text>

      {/* --- NON-ABELIAN --- */}
      <Text style={styles.subHeader}>Example 3: Non-Abelian Group of 2 × 2 Matrices</Text>
      <Text style={styles.paragraph}>
        Let us see another example with matrix. Here, let's look at an example where the commutative property fails: the set of 2 × 2 matrices under multiplication.
      </Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={styles.paragraphSmall}>
          Matrix multiplication does not follow the commutative property. For example, if A and B are two 2 x 2 matrices, A * B is usually not the same as B * A. While matrices form a group under multiplication (since they satisfy closure, associativity, identity, and inverses). This lack of commutativity makes them a <Text style={styles.bold}>non-Abelian group</Text>.
        </Text>
      </View>

      {/* --- CHECKING IF ABELIAN --- */}
      <Text style={styles.sectionHeader}>Checking if a Group is Abelian</Text>
      <Text style={styles.paragraph}>
        There are some way to check whether a group is Abelian or not. It is quite confusing that <Text style={styles.bold}>not all groups are Abelian</Text>. When solving problems in discrete math, It is important to always check whether a group is commutative before labelling it as Abelian. The best way to do this is to pick two elements from the group, apply the operation in both orders, and see if the results are the same.
      </Text>

      <Text style={styles.subHeader}>Example of Integers under Subtraction</Text>
      <Text style={styles.paragraph}>
        Let us check whether the set of integers under subtraction forms an Abelian group.
      </Text>
      <View style={[styles.exampleCard, styles.errorCard]}>
        <VerifyItem isMet={true} property="Closure" detail="Subtraction of two integers gives another integer. For example, 7 - 3 = 4, which is an integer." />
        <VerifyItem isMet={false} property="Associativity" detail="Subtraction is not associative. For example, (7 - 3) - 2 is 2, but 7 - (3 - 2) is 6." />
        <VerifyItem isMet={false} property="Identity Element" detail="Subtraction does not have an identity element like 0 or 1." />
        <VerifyItem isMet={false} property="Inverse Element" detail="Subtraction does not have an inverse like addition or multiplication." />
        <VerifyItem isMet={false} property="Commutativity" detail="Subtraction is not commutative. 7 - 3 = 4, but 3 - 7 = -4, so the results are different." />
      </View>
      <Text style={styles.paragraph}>
        Since it does not meet several of the group properties (and certainly not the commutative property), integers under subtraction do not form an Abelian group.
      </Text>

      {/* --- IMPORTANCE SECTION --- */}
      <Text style={styles.sectionHeader}>Importance of Abelian Groups in Mathematics</Text>
      <Text style={styles.paragraph}>
        Abelian groups are quite useful concept in mathematics. They are used in number theory, cryptography, and the study of symmetry, etc. In fact, many of the groups we encounter in everyday mathematics are Abelian, which is why they are so commonly discussed in discrete math courses.
      </Text>
      <Text style={styles.paragraph}>
        One reason Abelian groups are so important is that the commutative property often simplifies calculations. If we know that the order of operations does not matter, it can make solving problems much easier.
      </Text>

      {/* --- CONCLUSION --- */}
      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        An Abelian group is a type of group that satisfies the commutative property. We first understood what a group is by looking at the properties it must satisfy: closure, associativity, identity, and inverses. Then, we understood what makes a group "Abelian", the commutative property.
      </Text>
      <Text style={styles.paragraph}>
        In addition, we provided several examples, including integers under addition and real numbers under multiplication, to highlight how Abelian groups work in practice. Finally, we discussed how not all groups are Abelian by looking at examples like matrices and subtraction.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 10, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 15, color: '#475569', lineHeight: 24 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  recapBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  recapText: { fontSize: 14, color: '#334155' },
  
  formulaHighlight: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', marginVertical: 15 },
  formulaText: { fontSize: 15, color: '#166534', lineHeight: 24, fontStyle: 'italic' },
  
  noteBox: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#FEF3C7', marginBottom: 20 },
  noteText: { fontSize: 14, color: '#92400E', fontStyle: 'italic', lineHeight: 22 },
  
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#BBF7D0', backgroundColor: '#F8FAFC', marginBottom: 15 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  
  verifyRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  verifyTextContainer: { flex: 1, marginLeft: 10 },
  verifyProp: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  verifyDetail: { fontSize: 14, color: '#475569', lineHeight: 22 },
});