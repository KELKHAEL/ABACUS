import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SetsNotations_1_7() {
  
  // Custom Table Row for Notation Reference
  const NotationRow = ({ symbol, meaning }) => (
    <View style={styles.tableRow}>
      <Text style={styles.symbolCell}>{symbol}</Text>
      <Text style={styles.meaningCell}>{meaning}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      {/* INTRO SECTION */}
      <Text style={styles.paragraph}>
        In Set Theory, we use elements inside sets as discrete elements. We can consider them as discrete elements in discrete mathematics. In several use-cases of discrete mathematics, we use sets. Sets are the foundational building blocks in discrete mathematics.
      </Text>

      <Text style={styles.sectionHeader}>Definition of a Set</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.bold}>set</Text> is an unordered collection of objects. These objects are called <Text style={styles.bold}>elements</Text> or <Text style={styles.bold}>members</Text> of the set. They can be anything: numbers, letters, other sets, or even abstract concepts.
      </Text>
      <Text style={styles.paragraph}>
        In a set, <Text style={styles.bold}>order does not matter</Text> and <Text style={styles.bold}>repetition is ignored</Text> (an element is either in the set or not).
      </Text>

      <View style={styles.exampleBox}>
        <Text style={styles.exampleTitle}>Examples of Sets:</Text>
        <Text style={styles.exampleText}>• The set of all actors who have played The Doctor on Doctor Who</Text>
        <Text style={styles.exampleText}>• The set of natural numbers between 1 and 10 inclusive</Text>
      </View>

      <Text style={styles.subHeader}>Set Equality</Text>
      <Text style={styles.paragraph}>
        Another important idea of sets is set equality. Two sets are considered equal if and only if they contain exactly the same elements. 
      </Text>
      <Text style={styles.paragraph}>
        For instance, the set of vowels in the word "questionably" is equal to the set of vowels {"{a, e, i, o, u}"} because it has all of the 5 vowels.
      </Text>

      {/* NOTATION SECTION */}
      <Text style={styles.sectionHeader}>Set Notation Table</Text>
      <Text style={styles.paragraph}>
        Here we will see the different types of set notations used in mathematics with their usecases and benefits. All the symbols are given below for quick reference:
      </Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeaderBg]}>
          <Text style={[styles.tableCell, styles.bold, {flex: 0.3}]}>Symbol</Text>
          <Text style={[styles.tableCell, styles.bold, {flex: 0.7}]}>Meaning</Text>
        </View>
        <NotationRow symbol={"{ , }"} meaning="Used to enclose elements of a set" />
        <NotationRow symbol=":" meaning="Such that" />
        <NotationRow symbol="∈" meaning="Is an element of" />
        <NotationRow symbol="∉" meaning="Is not an element of" />
        <NotationRow symbol="⊆" meaning="Is a subset of" />
        <NotationRow symbol="⊂" meaning="Is a proper subset of" />
        <NotationRow symbol="∩" meaning="Intersection" />
        <NotationRow symbol="∪" meaning="Union" />
        <NotationRow symbol="×" meaning="Cartesian product" />
        <NotationRow symbol="\" meaning="Set difference" />
        <NotationRow symbol="A'" meaning="Complement of A" />
        <NotationRow symbol="|A|" meaning="Cardinality of A" />
        <NotationRow symbol="∅" meaning="Empty set" />
        <NotationRow symbol="U" meaning="Universal set" />
        <NotationRow symbol="P(A)" meaning="Power set of A" />
      </View>

      <Text style={styles.subHeader}>Set Builder Notation</Text>
      <Text style={styles.paragraph}>
        Set builder notation is used to describe sets, especially when listing all elements is impractical. The general form is: {"{x : condition(s) that x must satisfy}"}.
      </Text>
      <View style={styles.codeBox}>
        <Text style={styles.codeText}>{"Example: A = {x ∈ N : ∃n ∈ N(x = 2n)}"}</Text>
        <Text style={styles.codeSubText}>Read as: "A is the set of all x in the natural numbers such that there exists some n in the natural numbers for which x is twice n." In simpler terms, A is the set of all even natural numbers.</Text>
      </View>

      {/* SPECIAL SETS */}
      <Text style={styles.sectionHeader}>Special Sets</Text>
      <Text style={styles.paragraph}>There are some special types of sets that play an important role in set theory:</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Empty Set (∅):</Text> The set containing no elements.</Text>
      </View>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>▪</Text>
        <Text style={styles.bulletText}><Text style={styles.bold}>Universal Set (U):</Text> Often denoted by U, is the set of all elements under consideration.</Text>
      </View>

      <Text style={styles.subHeader}>Common Number Sets</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}><Text style={styles.symbolCell}>N</Text><Text style={styles.meaningCell}>Set of natural numbers (including 0)</Text></View>
        <View style={styles.tableRow}><Text style={styles.symbolCell}>Z</Text><Text style={styles.meaningCell}>Set of integers</Text></View>
        <View style={styles.tableRow}><Text style={styles.symbolCell}>Q</Text><Text style={styles.meaningCell}>Set of rational numbers</Text></View>
        <View style={styles.tableRow}><Text style={styles.symbolCell}>R</Text><Text style={styles.meaningCell}>Set of real numbers</Text></View>
        <View style={styles.tableRow}><Text style={styles.symbolCell}>W</Text><Text style={styles.meaningCell}>Set of all whole numbers</Text></View>
      </View>

      {/* SET OPERATIONS TABLE */}
      <Text style={styles.sectionHeader}>Set Operations Summary</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeaderBg]}>
          <Text style={[styles.tableCell, styles.bold, {flex: 0.3}]}>Operation</Text>
          <Text style={[styles.tableCell, styles.bold, {flex: 0.7}]}>Description</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.symbolCell}>Intersection</Text>
          <Text style={styles.meaningCell}>The set containing all elements that are in both A and B (written A ∩ B)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.symbolCell}>Union</Text>
          <Text style={styles.meaningCell}>The set containing all elements that are in A or B or both (written A ∪ B)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.symbolCell}>Cartesian Product</Text>
          <Text style={styles.meaningCell}>Set of all ordered pairs (a, b) where a ∈ A and b ∈ B (written A × B)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.symbolCell}>Set Difference</Text>
          <Text style={styles.meaningCell}>Set containing all elements of A that are not in B (written A \ B)</Text>
        </View>
      </View>

      {/* EXAMPLES SECTION */}
      <Text style={styles.sectionHeader}>Advanced Examples</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>{"Describe {x : x + 3 ∈ N}"}</Text></Text>
        <Text style={styles.exampleDesc}>This is the set of all numbers which, when 3 is added to them, result in a natural number. The set could be written as {"{-3, -2, -1, 0, 1, 2, ...}"}.</Text>
        <View style={styles.divider} />
        <Text style={styles.exampleText}><Text style={styles.bold}>{"Describe {x ∈ N : x + 3 ∈ N}"}</Text></Text>
        <Text style={styles.exampleDesc}>This is the set of all natural numbers which, when 3 is added to them, result in a natural number. So here we just have {"{0, 1, 2, 3 ...}"}.</Text>
      </View>

      <Text style={styles.sectionHeader}>Conclusion</Text>
      <Text style={styles.paragraph}>
        In this chapter, we explained the characteristics of sets and understood how to represent them using various notations, including element notation and set builder notation. We highlighted the special sets like the empty set and universal set as well as common number sets.
      </Text>
      <Text style={styles.paragraph}>
        In addition, we provided an overview of important set operations and relations such as subsets, intersections, unions, and complements.
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
  bulletText: { flex: 1, fontSize: 15, color: '#475569' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleTitle: { fontWeight: 'bold', marginBottom: 10, color: '#1E293B' },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 5 },
  exampleDesc: { fontSize: 13, color: '#475569', marginTop: 2, fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  codeBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 8, marginBottom: 15 },
  codeText: { fontFamily: 'monospace', fontSize: 14, color: '#16941c', fontWeight: 'bold' },
  codeSubText: { fontSize: 13, color: '#475569', marginTop: 5 },
  // Table Styles
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', alignItems: 'center' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { padding: 12 },
  symbolCell: { flex: 0.3, padding: 12, textAlign: 'center', fontWeight: 'bold', color: '#16941c', fontSize: 15, borderRightWidth: 1, borderRightColor: '#E2E8F0' },
  meaningCell: { flex: 0.7, padding: 12, color: '#475569', fontSize: 14 }
});