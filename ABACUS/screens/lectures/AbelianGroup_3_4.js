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
      />
      <View style={styles.verifyTextContainer}>
        <Text style={[styles.verifyProp, { color: isMet ? "#166534" : "#991B1B" }]}>{property}</Text>
        <Text style={styles.verifyDetail}>{detail}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        In discrete mathematics, "groups" are one of the core topics that help in understanding how different sets of elements work under specific operations. Among these, the <Text style={styles.bold}>Abelian group</Text>, also known as a <Text style={styles.bold}>commutative group</Text>, is special because of a special property it has: <Text style={styles.bold}>commutativity</Text>.
      </Text>

      {/* SECTION: WHAT IS A GROUP RECAP */}
      <Text style={styles.sectionHeader}>What is a Group? (Recap)</Text>
      <Text style={styles.paragraph}>
        For a set combined with a binary operation to be a group, it must follow four key properties:
      </Text>
      <View style={styles.recapBox}>
        <Text style={styles.recapText}>1. <Text style={styles.bold}>Closure</Text></Text>
        <Text style={styles.recapText}>2. <Text style={styles.bold}>Associativity</Text></Text>
        <Text style={styles.recapText}>3. <Text style={styles.bold}>Identity Element</Text></Text>
        <Text style={styles.recapText}>4. <Text style={styles.bold}>Inverse Element</Text></Text>
      </View>

      {/* SECTION: ABELIAN DEFINITION */}
      <Text style={styles.sectionHeader}>What is an Abelian Group?</Text>
      <Text style={styles.paragraph}>
        An Abelian group is just a special type of group that also satisfies the commutative property. It means the <Text style={styles.bold}>order</Text> in which we apply the operation does not matter.
      </Text>

      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaTitle}>Formal Definition:</Text>
        <Text style={styles.formulaText}>
          For every pair of elements, A and B, in the group: {"\n"}
          <Text style={styles.bold}>A * B = B * A</Text>
        </Text>
      </View>

      <Text style={styles.noteText}>
        <Text style={styles.bold}>Note:</Text> The name "Abelian" comes from the famous mathematician <Text style={styles.bold}>Niels Henrik Abel</Text>, who worked extensively in Group Theory.
      </Text>

      {/* SECTION: EXAMPLES */}
      <Text style={styles.sectionHeader}>Examples of Abelian Groups</Text>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>1. Integers under Addition (Z, +)</Text>
        <VerifyItem property="Commutativity" detail="5 + 7 is the same as 7 + 5." />
        <VerifyItem property="Inverse" detail="Inverse of 7 is -7 because 7 + (-7) = 0." />
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exampleTitle}>2. Real Numbers under Multiplication (R*, x)</Text>
        <Text style={styles.paragraphSmall}>Consider non-zero real numbers:</Text>
        <VerifyItem property="Associativity" detail="(a * b) * c = a * (b * c)." />
        <VerifyItem property="Identity" detail="The identity is 1." />
        <VerifyItem property="Commutativity" detail="a * b = b * a." />
      </View>

      {/* SECTION: NON-ABELIAN */}
      <Text style={styles.sectionHeader}>Non-Abelian Group Examples</Text>
      
      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={styles.exampleTitle}>Example 1: 2x2 Matrices</Text>
        <Text style={styles.paragraphSmall}>
          Matrix multiplication does not follow the commutative property. If A and B are two 2x2 matrices, <Text style={styles.bold}>A * B is usually not the same as B * A</Text>.
        </Text>
      </View>

      <View style={[styles.exampleCard, styles.errorCard]}>
        <Text style={styles.exampleTitle}>Example 2: Integers under Subtraction</Text>
        <VerifyItem isMet={false} property="Associativity" detail="(7-3)-2 is 2, but 7-(3-2) is 6." />
        <VerifyItem isMet={false} property="Commutativity" detail="7 - 3 = 4, but 3 - 7 = -4." />
      </View>

      {/* IMPORTANCE SECTION */}
      <Text style={styles.sectionHeader}>Importance in Mathematics</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Simplification:</Text> Commutativity often simplifies complex calculations because order doesn't matter.</Text>
        <Text style={styles.infoText}>• <Text style={styles.bold}>Real-world use:</Text> Used in number theory, cryptography, and the study of symmetry.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        An Abelian group is a type of group that satisfies the commutative property. We first understood what a group is by looking at its core properties: closure, associativity, identity, and inverses, then learned how the addition of the commutative property defines an Abelian structure.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  paragraphSmall: { fontSize: 13, color: '#64748B', marginBottom: 10 },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  recapBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  recapText: { fontSize: 13, color: '#475569' },
  formulaHighlight: { backgroundColor: '#FFFBEB', padding: 20, borderRadius: 12, borderLeftWidth: 5, borderLeftColor: '#F59E0B', marginVertical: 15 },
  formulaTitle: { fontSize: 14, fontWeight: 'bold', color: '#92400E', marginBottom: 5 },
  formulaText: { fontSize: 16, color: '#B45309', textAlign: 'center', fontStyle: 'italic' },
  noteText: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginBottom: 20 },
  exampleCard: { padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#F8FAFC', marginBottom: 15 },
  exampleTitle: { fontSize: 15, fontWeight: 'bold', color: '#16941c', marginBottom: 10 },
  errorCard: { borderColor: '#FECACA', backgroundColor: '#FEF2F2' },
  verifyRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-start' },
  verifyTextContainer: { flex: 1, marginLeft: 10 },
  verifyProp: { fontSize: 14, fontWeight: 'bold' },
  verifyDetail: { fontSize: 13, color: '#475569', lineHeight: 18 },
  infoBox: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#0369A1', marginBottom: 8, lineHeight: 20 }
});