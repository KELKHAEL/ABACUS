import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
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
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        {"The Pigeonhole Principle is an interesting and important concept in Combinatorics and Counting Theory of Discrete Mathematics. It is used to show that certain outcomes are inevitable while distributing objects into containers or categories. It sounds very basic at first glance, but the Pigeonhole Principle has greater applications across various fields in Discrete Mathematics and Computer Science."}
      </Text>
      <Text style={styles.paragraph}>
        {"Read this chapter to learn the fundamentals of the Pigeonhole Principle and understand its generalizations."}
      </Text>

      {/* --- SECTION 1: UNDERSTANDING THE PRINCIPLE --- */}
      <Text style={styles.sectionHeader}>{"Understanding the Pigeonhole Principle"}</Text>
      <Text style={styles.paragraph}>
        {"The Pigeonhole Principle states that \"if we have more objects than containers (\"pigeonholes\"), at least one container must hold more than one object.\""}
      </Text>
      <Text style={styles.paragraph}>
        {"Imagine a situation where there are 20 pigeons trying to enter into 19 pigeonholes. Since there are more pigeons than pigeonholes, at least one of the pigeonholes must contain more than one pigeon. This straightforward idea lays the foundation for many mathematical proofs."}
      </Text>

      {/* 🖼️ IMAGE 1: Pigeons in Holes Diagram */}
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/moduleImages/pig1.jpg')} 
          style={styles.imageBox}
          resizeMode="contain"
        />
        <Text style={styles.caption}>{"Here, at the last hole, there are two pigeons."}</Text>
      </View>

      <DefinitionCard 
        title={"Formal Definition"}
        color={"#16941c"}
        logic={"If k objects are placed into n pigeonholes, and k > n, then at least one pigeonhole must contain more than one object."}
      />

      <View style={styles.noteBox}>
        <Text style={styles.noteText}>
          {"It is also termed as "}<Text style={styles.bold}>{"Dirichlet's Drawer Principle"}</Text>{", named after the German mathematician Peter Gustav Lejeune Dirichlet."}
        </Text>
      </View>

      {/* --- SECTION 2: PROOF BY CONTRADICTION --- */}
      <Text style={styles.sectionHeader}>{"Proof by Contradiction"}</Text>
      <Text style={styles.paragraph}>
        {"The Pigeonhole Principle is typically proven using a method called Proof by Contradiction. The proof is simple. The idea is to assume that the opposite is True, then show that this assumption is quite impossible. Let us see how this proof works −"}
      </Text>
      <View style={styles.proofBox}>
        <Text style={styles.proofText}>{"1. Assume that each pigeonhole can hold only one pigeon."}</Text>
        <Text style={styles.proofText}>{"2. If that were True, the total number of pigeons would be limited to the number of pigeonholes."}</Text>
        <Text style={styles.proofText}>{"3. But if there are more pigeons than pigeonholes, this assumption is contradicted, proving the original claim."}</Text>
      </View>

      {/* --- SECTION 3: APPLICATIONS AND EXAMPLES --- */}
      <Text style={styles.sectionHeader}>{"Applications and Examples"}</Text>
      <Text style={styles.paragraph}>
        {"The Pigeonhole Principle has several applications in various fields. Let us see some of the basic and more advanced examples that can be solved with this principle."}
      </Text>
      
      <View style={styles.exampleCard}>
        <Text style={styles.exTitle}>{"Example of Birthdays in a Room"}</Text>
        <Text style={styles.exText}>{"If there are 367 people in a room, at least two of them must share the same birthday. Because there are only 366 possible birthdays (in a leap year). Since there are more people than available birthdays, the Pigeonhole Principle shows us that at least two people must have been born on the same day."}
        </Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exTitle}>{"Example of Socks in a Drawer"}</Text>
        <Text style={styles.exText}>{"Consider we have a drawer containing 10 black socks and 10 white socks. If we randomly take out 11 socks, the Pigeonhole Principle guarantees that we will have at least two socks of the same color. This is because there are only two possible \"pigeonholes\" (black or white), and once we take more than two socks, one of the colors must repeat."}
        </Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exTitle}>{"Multiple Students with the Same Score"}</Text>
        <Text style={styles.exText}>{"Consider a scenario where an exam is graded on a scale of 0 to 100. If a class has 102 students, the Pigeonhole Principle guarantees that at least two students must have received the same number. This is because there are only 101 possible scores (from 0 to 100), and 102 students, so at least two students must share the same number."}
        </Text>
      </View>

      {/* --- SECTION 4: GENERALIZED PIGEONHOLE PRINCIPLE --- */}
      <Text style={styles.sectionHeader}>{"Generalized Pigeonhole Principle"}</Text>
      <Text style={styles.paragraph}>
        {"The basic idea of Pigeonhole Principle can be extended to a generalized form, which allows us to handle more complex situations."}
      </Text>

      <DefinitionCard 
        title={"Generalized Definition"}
        color={"#0369A1"}
        logic={"If N objects are placed into k pigeonholes, then at least one pigeonhole contains at least $\\lceil N/k \\rceil$ objects."}
      />

      <Text style={styles.paragraph}>
        {"This definition indicates when the number of objects exceeds a multiple of the number of pigeonholes, the one pigeonhole will contain more than the expected share of objects."}
      </Text>

      <View style={styles.exampleCard}>
        <Text style={styles.exTitle}>{"Example of People Born in the Same Month"}</Text>
        <Text style={styles.exText}>{"Consider a group of 100 people. The Generalized Pigeonhole Principle shows that at least $\\lceil 100/12 \\rceil = 9$ people were born in the same month. Because there are 12 months. Dividing 100 people among those months results in at least one month containing 9 or more people."}
        </Text>
      </View>

      <View style={styles.exampleCard}>
        <Text style={styles.exTitle}>{"Example of Students Receiving the Same Grade"}</Text>
        <Text style={styles.exText}>{"If students are getting grades not the numbers. Consider the students can receive one of five grades: A, B, C, D, or F. If there are 26 students in the class, the Generalized Pigeonhole Principle shows that at least 6 students will receive the same grade."}
        </Text>
      </View>

      {/* --- SECTION 5: COMPUTER SCIENCE APPLICATIONS --- */}
      <Text style={styles.sectionHeader}>{"Applications in Computer Science"}</Text>
      <Text style={styles.paragraph}>
        {"The Pigeonhole Principle is not just used in everyday examples. It also useful in computer science. In problems related to hashing, data storage, and networks we use this principle."}
      </Text>

      <View style={styles.csBox}>
        <Text style={styles.csText}><Text style={styles.bold}>{"Example of Hash Functions:"}</Text>{" A technique used to map large amounts of data into smaller hash values. Since inputs often far exceed available hash values, the Pigeonhole Principle shows that collisions will happen. This insight is used in designing algorithms to handle these collisions efficiently."}</Text>
        <View style={styles.divider} />
        <Text style={styles.csText}><Text style={styles.bold}>{"Example of Network Connections:"}</Text>{" If we have more workstations than available servers, the Pigeonhole Principle shows that some workstations will inevitably share a server. This idea helps network engineers optimize the distribution of workloads to avoid server overload."}</Text>
      </View>

      {/* --- CREATIVE USES --- */}
      <Text style={styles.subHeader}>{"Other Surprising Uses"}</Text>
      <Text style={styles.paragraph}>
        {"During a month where a baseball team plays between 1 and 45 games, it can be shown that there must be some consecutive days during which the team played exactly 14 games. The Pigeonhole Principle, combined with careful choice of \"pigeonholes,\" helps prove this."}
      </Text>

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we explained the basic concept of the Pigeonhole Principle. We started with its basic definition and then slowly moving on to more generalized versions, we explored several everyday examples, from shared birthdays to sock drawers, and then looked at more complex applications in Computer Science and Mathematics."}
      </Text>
      <Text style={styles.paragraph}>
        {"Along the way, we also discovered how this simple idea of distributing objects into containers can have powerful conclusions."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#334155', marginBottom: 10, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  imageContainer: { alignItems: 'center', marginVertical: 15, width: '100%' },
  imageBox: { width: '100%', height: 220, backgroundColor: '#F8FAFC', borderRadius: 12 },
  caption: { fontSize: 12, color: '#94A3B8', textAlign: 'center', fontStyle: 'italic', marginTop: 8 },

  defCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderTopWidth: 5, marginBottom: 15 },
  defTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase' },
  logicBox: { backgroundColor: '#FFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#CBD5E1' },
  logicText: { fontSize: 13, color: '#475569', lineHeight: 20, fontStyle: 'italic', textAlign: 'center' },
  
  noteBox: { padding: 10, marginBottom: 15 },
  noteText: { fontSize: 13, color: '#64748B', fontStyle: 'italic', lineHeight: 20 },
  
  proofBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  proofText: { fontSize: 14, color: '#334155', marginBottom: 8, lineHeight: 20 },
  
  exampleCard: { padding: 15, borderRadius: 12, backgroundColor: '#F0FDF4', marginBottom: 15, borderWidth: 1, borderColor: '#DCFCE7' },
  exTitle: { fontSize: 15, fontWeight: 'bold', color: '#166534', marginBottom: 6 },
  exText: { fontSize: 14, color: '#166534', lineHeight: 22, textAlign: 'justify' },
  
  csBox: { backgroundColor: '#F5F3FF', padding: 15, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#DDD6FE' },
  csText: { fontSize: 14, color: '#475569', marginBottom: 5, lineHeight: 22, textAlign: 'justify' },
  divider: { height: 1, backgroundColor: '#DDD6FE', marginVertical: 12 }
});