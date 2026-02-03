import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PigeonholePrinciple_4_11() {
  
  // Custom Component for Principle Definitions
  const DefinitionCard = ({ title, logic, color }) => (
    <View style={[styles.defCard, { borderTopColor: color }]}>
      <Text style={[styles.defTitle, { color: color }]}>{title}</Text>
      <View style={styles.logicBox}>
        <Text style={styles.logicText}>{logic}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"The Pigeonhole Principle is an interesting and important concept in Combinatorics and Counting Theory. It is used to show that certain outcomes are inevitable while distributing objects into containers or categories."}
      </Text>

      {/* SECTION 1: CORE CONCEPT */}
      <Text style={styles.sectionHeader}>{"Understanding the Principle"}</Text>
      <Text style={styles.paragraph}>
        {"If we have more objects than containers (\"pigeonholes\"), at least one container must hold more than one object."}
      </Text>

      <View style={styles.visualAid}>
        <MaterialCommunityIcons name="dots-grid" size={40} color="#0369A1" />
        <Text style={styles.visualText}>{"Example: 20 pigeons in 19 holes = At least one hole with 2+ pigeons."}</Text>
      </View>

      <DefinitionCard 
        title={"Formal Definition"}
        color={"#16941c"}
        logic={"If k objects are placed into n pigeonholes, and k > n, then at least one pigeonhole must contain more than one object."}
      />

      <View style={styles.noteBox}>
        <Text style={styles.noteText}>
          {"Also termed as "}<Text style={styles.bold}>{"Dirichlet's Drawer Principle"}</Text>{", named after German mathematician Peter Gustav Lejeune Dirichlet."}
        </Text>
      </View>

      {/* SECTION 2: PROOF BY CONTRADICTION */}
      <Text style={styles.sectionHeader}>{"Proof by Contradiction"}</Text>
      <View style={styles.proofBox}>
        <Text style={styles.proofText}>{"1. Assume each hole can hold only ONE pigeon."}</Text>
        <Text style={styles.proofText}>{"2. Then total pigeons would be limited to the number of holes."}</Text>
        <Text style={styles.proofText}>{"3. If there are more pigeons than holes, the assumption is contradicted."}</Text>
      </View>

      {/* SECTION 3: EXAMPLES */}
      <Text style={styles.sectionHeader}>{"Real-World Examples"}</Text>
      
      <View style={styles.exampleCard}>
        <Text style={styles.exTitle}>{"1. Birthday Problem"}</Text>
        <Text style={styles.exText}>{"In a room of 367 people, at least two must share a birthday (since there are only 366 possible birthdays)."}</Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exTitle}>{"2. Socks in a Drawer"}</Text>
        <Text style={styles.exText}>{"In a drawer with black and white socks, taking out 3 socks guarantees at least two will be the same color."}</Text>
      </View>

      {/* SECTION 4: GENERALIZED PRINCIPLE */}
      <Text style={styles.sectionHeader}>{"Generalized Pigeonhole Principle"}</Text>
      <Text style={styles.paragraph}>
        {"Allows us to handle more complex situations where objects significantly exceed holes."}
      </Text>

      <DefinitionCard 
        title={"Generalized Formula"}
        color={"#0369A1"}
        logic={"If N objects are placed into k pigeonholes, then at least one pigeonhole contains at least \u2308N/k\u2309 objects."}
      />

      <View style={styles.exampleCard}>
        <Text style={styles.exTitle}>{"Example: People Born in the Same Month"}</Text>
        <Text style={styles.exText}>{"In a group of 100 people, at least \u2308100/12\u2309 = 9 people were born in the same month."}</Text>
      </View>

      {/* SECTION 5: COMPUTER SCIENCE APPLICATIONS */}
      <Text style={styles.sectionHeader}>{"Applications in CS"}</Text>
      <View style={styles.csBox}>
        <Text style={styles.csText}><Text style={styles.bold}>{"• Hash Functions:"}</Text>{" Since possible data inputs often exceed hash values, collisions will inevitably happen."}</Text>
        <Text style={styles.csText}><Text style={styles.bold}>{"• Network Connections:"}</Text>{" If workstations exceed servers, some must inevitably share a server."}</Text>
      </View>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the basics and generalized versions of the Pigeonhole Principle. We explored everyday examples like birthdays and sock drawers, and saw how this simple idea provides powerful conclusions in networking and data storage."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  defCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  defTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8 },
  logicBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  logicText: { fontSize: 13, color: '#475569', lineHeight: 20, fontStyle: 'italic', textAlign: 'center' },
  visualAid: { backgroundColor: '#F0F9FF', padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  visualText: { flex: 1, marginLeft: 12, fontSize: 13, color: '#0369A1', fontWeight: '500' },
  noteBox: { padding: 10, marginBottom: 15 },
  noteText: { fontSize: 12, color: '#64748B', fontStyle: 'italic' },
  proofBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20 },
  proofText: { fontSize: 13, color: '#334155', marginBottom: 6 },
  exampleCard: { padding: 15, borderRadius: 12, backgroundColor: '#F0FDF4', marginBottom: 12, borderWidth: 1, borderColor: '#DCFCE7' },
  exTitle: { fontSize: 14, fontWeight: 'bold', color: '#166534', marginBottom: 4 },
  exText: { fontSize: 13, color: '#166534', lineHeight: 18 },
  csBox: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20 },
  csText: { fontSize: 13, color: '#475569', marginBottom: 10, lineHeight: 20 }
});