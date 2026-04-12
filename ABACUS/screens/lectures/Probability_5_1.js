import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Probability_5_1() {
  
  // Custom Component for Probability Definitions
  const ConceptBox = ({ title, definition, icon, color }) => (
    <View style={[styles.conceptCard, { borderLeftColor: color }]}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons name={icon} size={20} color={color} />
        <Text style={[styles.cardTitle, { color: color }]}>{title}</Text>
      </View>
      <Text style={styles.conceptText}>{definition}</Text>
    </View>
  );

  // Custom Component for Step-by-Step Problems
  const ProblemCard = ({ title, question, solution, result }) => (
    <View style={styles.problemContainer}>
      <View style={styles.problemHeader}>
        <MaterialCommunityIcons name="pencil-box-outline" size={20} color="#0369A1" />
        <Text style={styles.problemTitle}>{title}</Text>
      </View>
      <View style={styles.problemPadding}>
        <Text style={styles.questionText}><Text style={styles.bold}>Q:</Text> {question}</Text>
        <View style={styles.divider} />
        <Text style={styles.solutionText}><Text style={styles.bold}>Solution:</Text> {solution}</Text>
        <Text style={styles.finalResult}>{result}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}} showsVerticalScrollIndicator={false}>
      
      <Text style={styles.paragraph}>
        {"Closely related to the concepts of counting is Probability. We often try to guess the results of games of chance, like card games, slot machines, and lotteries; i.e. we try to find the likelihood or probability that a particular result will be obtained."}
      </Text>
      <Text style={styles.paragraph}>
        {"Probability can be conceptualized as finding the chance of occurrence of an event. Mathematically, it is the study of random processes and their outcomes. The laws of probability have a wide applicability in a variety of fields like genetics, weather forecasting, opinion polls, stock markets etc."}
      </Text>

      {/* SECTION 1: BASIC CONCEPTS */}
      <Text style={styles.sectionHeader}>{"Basic Concepts"}</Text>
      <Text style={styles.paragraph}>
        {"Probability theory was invented in the 17th century by two French mathematicians, Blaise Pascal and Pierre de Fermat, who were dealing with mathematical problems regarding of chance."}
      </Text>
      
      <ConceptBox 
        title={"Random Experiment"}
        icon={"flask-outline"}
        color={"#0369A1"}
        definition={"An experiment in which all possible outcomes are known and the exact output cannot be predicted in advance (e.g., tossing a fair coin)."}
      />

      <ConceptBox 
        title={"Sample Space (S)"}
        icon={"set-center"}
        color={"#16941c"}
        definition={"When we perform an experiment, then the set S of all possible outcomes is called the sample space. If we toss a coin, the sample space S = {H, T}."}
      />

      <ConceptBox 
        title={"Event"}
        icon={"star-outline"}
        color={"#9333ea"}
        definition={"Any subset of a sample space is called an event. After tossing a coin, getting Head on the top is an event."}
      />

      <View style={styles.formulaHighlight}>
        <Text style={styles.formulaLabel}>{"Fundamental Formula:"}</Text>
        <Text style={styles.mainFormula}>
          {"P(E) = \frac{\text{Total Favorable Outcomes}}{\text{Total Number of Outcomes}}"}
        </Text>
        <Text style={styles.caption}>{"Probability varies between 0 (impossible) and 1 (certain)."}</Text>
      </View>

      {/* SECTION 2: STEPS & CLASSIC EXAMPLES */}
      <Text style={styles.sectionHeader}>{"Finding Probability"}</Text>
      <View style={styles.stepBox}>
        <Text style={styles.stepText}>{"1. Calculate all possible outcomes."}</Text>
        <Text style={styles.stepText}>{"2. Calculate favorable outcomes."}</Text>
        <Text style={styles.stepText}>{"3. Apply the probability formula."}</Text>
      </View>

      <Text style={styles.subHeader}>{"Classic Examples"}</Text>
      <View style={styles.exampleCard}>
        <Text style={styles.bold}>{"Tossing a Coin"}</Text>
        <Text style={styles.exampleText}>{"Total outcomes = 2. The probability of getting a Head (H) is 1/2 and Tails (T) is 1/2."}</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.bold}>{"Throwing a Die"}</Text>
        <Text style={styles.exampleText}>{"Six possible outcomes: {1, 2, 3, 4, 5, 6}. \nP(Any single number) = 1/6 \nP(Even number) = 3/6 = 1/2 \nP(Odd number) = 3/6 = 1/2"}</Text>
        <View style={styles.dividerLight} />
        <Text style={styles.bold}>{"Deck of 52 Cards"}</Text>
        <Text style={styles.exampleText}>{"Total outcomes = 52. \nP(Ace) = 4/52 = 1/13 \nP(Diamond) = 13/52 = 1/4"}</Text>
      </View>

      {/* SECTION 3: AXIOMS & PROPERTIES */}
      <Text style={styles.sectionHeader}>{"Axioms and Properties"}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>{"Probability Axioms:"}</Text>
        <Text style={styles.infoBullet}>{"• $0 \leq P(x) \leq 1$."}</Text>
        <Text style={styles.infoBullet}>{"• Impossible event probability is 0; certain event is 1."}</Text>
        <Text style={styles.infoBullet}>{"• If events are mutually exclusive: $P(A_1 \cup A_2 \cup ... A_n) = P(A_1) + P(A_2) + ... + P(A_n)$."}</Text>
      </View>

      <View style={[styles.infoBox, { backgroundColor: '#F0FDF4', borderLeftColor: '#16941c' }]}>
        <Text style={[styles.infoTitle, { color: '#166534' }]}>{"Key Properties:"}</Text>
        <Text style={[styles.infoBullet, { color: '#166534' }]}>{"• Complementary: $P(\overline{x}) = 1 - P(x)$."}</Text>
        <Text style={[styles.infoBullet, { color: '#166534' }]}>{"• Union (Non-disjoint): $P(A \cup B) = P(A) + P(B)$."}</Text>
        <Text style={[styles.infoBullet, { color: '#166534' }]}>{"• Subset: If $A \subset B$, then $P(A) \leq P(B)$."}</Text>
      </View>

      {/* SECTION 4: CONDITIONAL PROBABILITY */}
      <Text style={styles.sectionHeader}>{"Conditional Probability"}</Text>
      <Text style={styles.paragraph}>
        {"The conditional probability of an event B is the probability that the event will occur given an event A has already occurred, written as P(B|A)."}
      </Text>
      <View style={styles.darkFormulaBox}>
        <Text style={styles.darkFormulaText}>{"P(B|A) = P(A ∩ B) / P(A)"}</Text>
      </View>

      <ProblemCard 
        title={"Problem 1: Teenagers"}
        question={"50% own a cycle, 30% own bike and cycle. Prob. a teenager owns bike GIVEN they own a cycle?"}
        solution={"P(Cycle) = 0.5, P(Cycle ∩ Bike) = 0.3. \nP(Bike|Cycle) = 0.3 / 0.5"}
        result={"Result: 0.6 (60%)"}
      />

      <ProblemCard 
        title={"Problem 3: Defective Laptops"}
        question={"6 good and 3 defective laptops. What is the probability to find both defective in the first two picks?"}
        solution={"A = 1st is defective, B = 2nd is defective. \nP(A ∩ B) = P(A)P(B|A) = 3/9 × 2/8"}
        result={"Result: 1/12"}
      />

      {/* SECTION 5: BAYES' THEOREM */}
      <Text style={styles.sectionHeader}>{"Bayes' Theorem"}</Text>
      <View style={styles.bayesCard}>
        <Text style={styles.bayesTitle}>{"The Theorem:"}</Text>
        <Text style={styles.bayesMath}>
          <Text style={styles.darkFormulaText}>{"P(B|A) = P(A ∩ B) / P(A)"}</Text>
        </Text>
      </View>

      <ProblemCard 
        title={"Pen-Stand Problem"}
        question={"3 stands: S1(2R, 3B), S2(3R, 2B), S3(4R, 1B). Stand chosen at random. Prob. one pen drawn is Red?"}
        solution={"P(Stand_i) = 1/3. \nP(Red|S1)=2/5, P(Red|S2)=3/5, P(Red|S3)=4/5. \nSumming: (1/3)(2/5) + (1/3)(3/5) + (1/3)(4/5)"}
        result={"Result: 3/5"}
      />

      <Text style={styles.sectionHeader}>{"Conclusion"}</Text>
      <Text style={styles.paragraph}>
        {"In this chapter, we elaborated on probability, from basic dice throws to complex Bayesian analysis. We understood steps to find probability, established axioms, and learned how conditional knowledge updates our understanding of events."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 20, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 17, fontWeight: '700', color: '#1E293B', marginBottom: 10, marginTop: 15 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  
  conceptCard: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', borderLeftWidth: 6, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
  conceptText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  
  formulaHighlight: { backgroundColor: '#F0FDF4', padding: 20, borderRadius: 15, alignItems: 'center', marginVertical: 15, borderWidth: 1, borderColor: '#BBF7D0' },
  formulaLabel: { fontSize: 13, color: '#166534', fontWeight: 'bold', marginBottom: 8 },
  mainFormula: { fontSize: 16, color: '#166534', fontWeight: 'bold', fontFamily: 'monospace', textAlign: 'center' },
  caption: { fontSize: 11, color: '#64748B', marginTop: 8, fontStyle: 'italic' },
  
  stepBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20 },
  stepText: { fontSize: 14, color: '#334155', marginBottom: 6, fontWeight: '500' },
  
  exampleCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  exampleText: { fontSize: 14, color: '#475569', marginTop: 4, lineHeight: 22, marginBottom: 10 },
  
  infoBox: { backgroundColor: '#FFFBEB', padding: 15, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#F59E0B', marginBottom: 15 },
  infoTitle: { fontSize: 15, fontWeight: 'bold', color: '#92400E', marginBottom: 8 },
  infoBullet: { fontSize: 14, color: '#92400E', marginBottom: 4 },
  
  darkFormulaBox: { backgroundColor: '#1E293B', padding: 20, borderRadius: 12, alignItems: 'center', marginVertical: 15 },
  darkFormulaText: { color: '#38BDF8', fontFamily: 'monospace', fontWeight: 'bold', fontSize: 15, textAlign: 'center' },
  
  problemContainer: { backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20, overflow: 'hidden' },
  problemHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', padding: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  problemTitle: { fontSize: 15, fontWeight: 'bold', color: '#0369A1', marginLeft: 10 },
  problemPadding: { padding: 15 },
  questionText: { fontSize: 14, color: '#334155', fontStyle: 'italic', lineHeight: 20 },
  solutionText: { fontSize: 14, color: '#475569', lineHeight: 20, marginTop: 10 },
  finalResult: { fontSize: 15, color: '#16941c', fontWeight: 'bold', textAlign: 'right', marginTop: 12 },
  
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  dividerLight: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 10 },
  
  bayesCard: { backgroundColor: '#F5F3FF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#DDD6FE', marginBottom: 20 },
  bayesTitle: { fontSize: 15, fontWeight: 'bold', color: '#7C3AED', marginBottom: 10 },
  bayesMath: { fontSize: 14, fontFamily: 'monospace', color: '#5B21B6', textAlign: 'center', lineHeight: 24 }
});