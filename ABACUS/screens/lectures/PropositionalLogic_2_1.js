import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function PropositionalLogic_2_1() {
  
  // Custom Truth Table Component
  const TruthTable = ({ headers, rows }) => (
    <View style={styles.table}>
      <View style={[styles.tableRow, styles.tableHeaderBg]}>
        {headers.map((h, i) => <Text key={i} style={[styles.tableCell, styles.bold]}>{h}</Text>)}
      </View>
      {rows.map((row, i) => (
        <View key={i} style={styles.tableRow}>
          {row.map((cell, j) => (
            <Text key={j} style={[styles.tableCell, { color: cell === 'True' || cell === 'T' ? '#16941c' : (cell === 'False' || cell === 'F' ? '#dc2626' : '#475569') }]}>
              {cell}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 80}} showsVerticalScrollIndicator={false}>
      
      {/* --- INTRODUCTION --- */}
      <Text style={styles.paragraph}>
        The rules of mathematical logic specify methods of reasoning mathematical statements. Greek philosopher, Aristotle, was the pioneer of logical reasoning. Logical reasoning provides the theoretical base for many areas of mathematics and consequently computer science. It has many practical applications in computer science like design of computing machines, artificial intelligence, definition of data structures for programming languages etc.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Propositional Logic</Text> is concerned with statements to which the truth values, true and false, can be assigned. The purpose is to analyze these statements either individually or in a composite manner.
      </Text>

      {/* --- DEFINITION --- */}
      <Text style={styles.sectionHeader}>Prepositional Logic Definition</Text>
      <Text style={styles.paragraph}>
        A proposition is a collection of declarative statements that has either a truth value "true" or a truth value "false". A propositional consists of propositional variables and connectives. We denote the propositional variables by capital letters (A, B, etc). The connectives connect the propositional variables.
      </Text>

      <Text style={styles.subHeader}>Examples of Propositions:</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}>• "Man is Mortal" → <Text style={{color: '#16941c', fontWeight: 'bold'}}>TRUE</Text></Text>
        <Text style={styles.exampleText}>• "12 + 9 = 3 2" → <Text style={{color: '#dc2626', fontWeight: 'bold'}}>FALSE</Text></Text>
        <View style={styles.divider} />
        <Text style={styles.bold}>The following is NOT a Proposition:</Text>
        <Text style={styles.exampleText}>• "A is less than 2"</Text>
        <Text style={styles.exampleText}>It is because unless we give a specific value of A, we cannot say whether the statement is true or false.</Text>
      </View>

      {/* --- CONNECTIVES --- */}
      <Text style={styles.sectionHeader}>Connectives</Text>
      <Text style={styles.paragraph}>In propositional logic generally we use five connectives which are −</Text>
      <View style={styles.bulletItem}><Text style={styles.bullet}>•</Text><Text style={styles.bulletText}>OR (∨)</Text></View>
      <View style={styles.bulletItem}><Text style={styles.bullet}>•</Text><Text style={styles.bulletText}>AND (∧)</Text></View>
      <View style={styles.bulletItem}><Text style={styles.bullet}>•</Text><Text style={styles.bulletText}>Negation/ NOT (¬)</Text></View>
      <View style={styles.bulletItem}><Text style={styles.bullet}>•</Text><Text style={styles.bulletText}>Implication / if-then (→)</Text></View>
      <View style={styles.bulletItem}><Text style={styles.bullet}>•</Text><Text style={styles.bulletText}>If and only if (⇔)</Text></View>

      <Text style={styles.subHeader}>OR (∨)</Text>
      <Text style={styles.paragraph}>The OR operation of two propositions A and B (written as A ∨ B) is true if at least any of the propositional variable A or B is true.</Text>
      <TruthTable 
        headers={["A", "B", "A ∨ B"]} 
        rows={[["True", "True", "True"], ["True", "False", "True"], ["False", "True", "True"], ["False", "False", "False"]]} 
      />

      <Text style={styles.subHeader}>AND (∧)</Text>
      <Text style={styles.paragraph}>The AND operation of two propositions A and B (written as A ∧ B) is true if both the propositional variable A and B is true.</Text>
      <TruthTable 
        headers={["A", "B", "A ∧ B"]} 
        rows={[["True", "True", "True"], ["True", "False", "False"], ["False", "True", "False"], ["False", "False", "False"]]} 
      />

      <Text style={styles.subHeader}>Negation (¬)</Text>
      <Text style={styles.paragraph}>The negation of a proposition A (written as ¬A) is false when A is true and is true when A is false.</Text>
      <View style={{width: '60%', alignSelf: 'center'}}>
        <TruthTable headers={["A", "¬A"]} rows={[["True", "False"], ["False", "True"]]} />
      </View>

      <Text style={styles.subHeader}>Implication / if-then (→)</Text>
      <Text style={styles.paragraph}>An implication A → B is the proposition if A, then B. It is false if A is true and B is false. The rest cases are true.</Text>
      <TruthTable 
        headers={["A", "B", "A → B"]} 
        rows={[["True", "True", "True"], ["True", "False", "False"], ["False", "True", "True"], ["False", "False", "True"]]} 
      />

      <Text style={styles.subHeader}>If and only if (⇔)</Text>
      <Text style={styles.paragraph}>A ⇔ B is bi-conditional logical connective which is true when p and q are same, i.e. both are false or both are true.</Text>
      <TruthTable 
        headers={["A", "B", "A ⇔ B"]} 
        rows={[["True", "True", "True"], ["True", "False", "False"], ["False", "True", "False"], ["False", "False", "True"]]} 
      />

      {/* --- TAUTOLOGIES, CONTRADICTIONS, CONTINGENCY --- */}
      <Text style={styles.sectionHeader}>Tautologies</Text>
      <Text style={styles.paragraph}>A Tautology is a formula which is always true for every value of its propositional variables.</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: Prove [(A → B) ∧ A] → B is a tautology</Text>
      </View>
      <TruthTable 
        headers={["A", "B", "A → B", "(A→B)∧A", "Result"]} 
        rows={[
          ["T", "T", "T", "T", "T"], 
          ["T", "F", "F", "F", "T"], 
          ["F", "T", "T", "F", "T"], 
          ["F", "F", "T", "F", "T"]
        ]} 
      />
      <Text style={styles.paragraph}>As we can see every value of [(A → B) ∧ A] → B is "True", it is a tautology.</Text>

      <Text style={styles.sectionHeader}>Contradictions</Text>
      <Text style={styles.paragraph}>A Contradiction is a formula which is always false for every value of its propositional variables.</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: Prove (A ∨ B) ∧ [(¬A) ∧ (¬B)] is a contradiction</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{minWidth: 500}}>
          <TruthTable 
            headers={["A", "B", "A ∨ B", "¬A", "¬B", "¬A ∧ ¬B", "Result"]} 
            rows={[
              ["T", "T", "T", "F", "F", "F", "F"], 
              ["T", "F", "T", "F", "T", "F", "F"], 
              ["F", "T", "T", "T", "F", "F", "F"], 
              ["F", "F", "F", "T", "T", "T", "F"]
            ]} 
          />
        </View>
      </ScrollView>
      <Text style={styles.paragraph}>As we can see every value of (A ∨ B) ∧ [(¬A) ∧ (¬B)] is False, it is a contradiction.</Text>

      <Text style={styles.sectionHeader}>Contingency</Text>
      <Text style={styles.paragraph}>A Contingency is a formula which has both some true and some false values for every value of its propositional variables.</Text>
      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: Prove (A ∨ B) ∧ (¬A) is a contingency</Text>
      </View>
      <TruthTable 
        headers={["A", "B", "A ∨ B", "¬A", "Result"]} 
        rows={[
          ["T", "T", "T", "F", "F"], 
          ["T", "F", "T", "F", "F"], 
          ["F", "T", "T", "T", "T"], 
          ["F", "F", "F", "T", "F"]
        ]} 
      />
      <Text style={styles.paragraph}>As we can see every value of (A ∨ B) ∧ (¬A) has both True and False, it is a contingency.</Text>

      {/* --- PROPOSITIONAL EQUIVALENCES --- */}
      <Text style={styles.sectionHeader}>Propositional Equivalences</Text>
      <Text style={styles.paragraph}>Two statements X and Y are logically equivalent if any of the following two conditions hold −</Text>
      <View style={styles.bulletItem}><Text style={styles.bullet}>1.</Text><Text style={styles.bulletText}>The truth tables of each statement have the same truth values.</Text></View>
      <View style={styles.bulletItem}><Text style={styles.bullet}>2.</Text><Text style={styles.bulletText}>The bi-conditional statement X ⇔ Y is a tautology.</Text></View>

      <View style={styles.exampleBox}>
        <Text style={styles.bold}>Example: Prove ¬(A ∨ B) and [(¬A) ∧ (¬B)] are equivalent</Text>
      </View>

      <Text style={styles.subHeader}>Testing by 1st method (Matching truth table)</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{minWidth: 500}}>
          <TruthTable 
            headers={["A", "B", "A ∨ B", "¬(A∨B)", "¬A", "¬B", "¬A ∧ ¬B"]} 
            rows={[
              ["T", "T", "T", "F", "F", "F", "F"], 
              ["T", "F", "T", "F", "F", "T", "F"], 
              ["F", "T", "T", "F", "T", "F", "F"], 
              ["F", "F", "F", "T", "T", "T", "T"]
            ]} 
          />
        </View>
      </ScrollView>
      <Text style={styles.paragraph}>Here, we can see the truth values of ¬(A ∨ B) and [(¬A) ∧ (¬B)] are same, hence the statements are equivalent.</Text>

      <Text style={styles.subHeader}>Testing by 2nd method (Bi-conditionality)</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{minWidth: 450}}>
          <TruthTable 
            headers={["A", "B", "¬(A∨B)", "¬A ∧ ¬B", "X ⇔ Y"]} 
            rows={[
              ["T", "T", "F", "F", "T"], 
              ["T", "F", "F", "F", "T"], 
              ["F", "T", "F", "F", "T"], 
              ["F", "F", "T", "T", "T"]
            ]} 
          />
        </View>
      </ScrollView>
      <Text style={styles.paragraph}>As [¬(A ∨ B)] ⇔ [(¬A) ∧ (¬B)] is a tautology, the statements are equivalent.</Text>

      {/* --- INVERSE, CONVERSE, CONTRAPOSITIVE --- */}
      <Text style={styles.sectionHeader}>Inverse, Converse, and Contra-positive</Text>
      <Text style={styles.paragraph}>
        Implication / if-then (→) is also called a conditional statement. It has two parts: Hypothesis (p) and Conclusion (q). It is denoted as p → q.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Example:</Text> "If you do your homework, you will not be punished."</Text>
        <Text style={styles.exampleText}>Here, "you do your homework" is the hypothesis (p), and "you will not be punished" is the conclusion (q).</Text>
      </View>

      <View style={styles.logicBox}>
        <Text style={styles.logicText}>
          <Text style={styles.bold}>Inverse (¬p → ¬q):</Text> Negation of both the hypothesis and the conclusion.
        </Text>
        <Text style={[styles.logicText, {fontStyle: 'italic', color: '#16941c'}]}>"If you do not do your homework, you will be punished."</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.logicText}>
          <Text style={styles.bold}>Converse (q → p):</Text> Interchanging the hypothesis and the conclusion.
        </Text>
        <Text style={[styles.logicText, {fontStyle: 'italic', color: '#16941c'}]}>"If you will not be punished, you do your homework."</Text>
        
        <View style={styles.divider} />

        <Text style={styles.logicText}>
          <Text style={styles.bold}>Contra-positive (¬q → ¬p):</Text> Interchanging the hypothesis and the conclusion of the inverse statement.
        </Text>
        <Text style={[styles.logicText, {fontStyle: 'italic', color: '#16941c'}]}>"If you are punished, you did not do your homework."</Text>
      </View>

      {/* --- DUALITY PRINCIPLE --- */}
      <Text style={styles.sectionHeader}>Duality Principle</Text>
      <Text style={styles.paragraph}>
        Duality principle states that for any true statement, the dual statement obtained by interchanging unions into intersections (and vice versa) and interchanging Universal set into Null set (and vice versa) is also true. If dual of any statement is the statement itself, it is said self-dual statement.
      </Text>
      <View style={styles.exampleBox}>
        <Text style={styles.exampleText}><Text style={styles.bold}>Example:</Text> The dual of (A ∩ B) ∪ C is (A ∪ B) ∩ C</Text>
      </View>

      {/* --- NORMAL FORMS --- */}
      <Text style={styles.sectionHeader}>Normal Forms</Text>
      <Text style={styles.paragraph}>We can convert any proposition in two normal forms:</Text>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Conjunctive Normal Form (CNF)</Text>
        <Text style={styles.paragraph}>
          A compound statement is in conjunctive normal form if it is obtained by operating AND among variables (negation of variables included) connected with ORs. In terms of set operations, it is a compound statement obtained by Intersection among variables connected with Unions.
        </Text>
        <Text style={styles.codeText}>Examples:</Text>
        <Text style={styles.codeText}>• (A ∨ B) ∧ (A ∨ C) ∧ (B ∨ C ∨ D)</Text>
        <Text style={styles.codeText}>• (P ∪ Q) ∩ (Q ∪ R)</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Disjunctive Normal Form (DNF)</Text>
        <Text style={styles.paragraph}>
          A compound statement is in disjunctive normal form if it is obtained by operating OR among variables (negation of variables included) connected with ANDs. In terms of set operations, it is a compound statement obtained by Union among variables connected with Intersections.
        </Text>
        <Text style={styles.codeText}>Examples:</Text>
        <Text style={styles.codeText}>• (A ∧ B) ∨ (A ∧ C) ∨ (B ∧ C ∧ D)</Text>
        <Text style={styles.codeText}>• (P ∩ Q) ∪ (Q ∩ R)</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 15 },
  sectionHeader: { fontSize: 19, fontWeight: '900', color: '#0F172A', marginTop: 25, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#16941c', paddingLeft: 10 },
  subHeader: { fontSize: 16, fontWeight: '700', color: '#334155', marginTop: 15, marginBottom: 5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#1E293B' },
  exampleBox: { backgroundColor: '#F8FAFC', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 15 },
  exampleText: { fontSize: 14, color: '#334155', marginBottom: 5 },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 10 },
  infoBox: { backgroundColor: '#F0FDF4', padding: 15, borderRadius: 10, marginBottom: 20 },
  infoText: { fontSize: 14, color: '#166534', marginBottom: 8 },
  logicBox: { backgroundColor: '#F1F5F9', padding: 15, borderRadius: 10, marginBottom: 20 },
  logicText: { fontSize: 14, color: '#475569', marginBottom: 10, lineHeight: 20 },
  bulletItem: { flexDirection: 'row', marginBottom: 8, paddingLeft: 5 },
  bullet: { fontWeight: 'bold', color: '#16941c', marginRight: 10 },
  bulletText: { flex: 1, fontSize: 14, color: '#475569' },
  formCard: { backgroundColor: '#FFF7ED', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#FFEDD5', marginBottom: 15 },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#9A3412', marginBottom: 5 },
  codeText: { fontFamily: 'monospace', fontSize: 14, color: '#16941c', fontWeight: 'bold', marginBottom: 4 },
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 8, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderBg: { backgroundColor: '#F1F5F9' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center', color: '#475569', fontWeight: '500', fontSize: 13 }
});