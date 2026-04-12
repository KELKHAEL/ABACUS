import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BooleanLogic_9_1() {

  const VerbatimIdentity = ({ law, forms }) => (
    <View style={styles.identityGroup}>
      <Text style={styles.lawTitle}>{law}</Text>
      {forms.map((item, index) => (
        <Text key={index} style={styles.formulaText}>{item}</Text>
      ))}
    </View>
  );

  const GateBadge = ({ name, symbol, description, tableData }) => (
    <View style={styles.gateCard}>
      <View style={styles.gateHeaderRow}>
        <MaterialCommunityIcons name={symbol} size={28} color="#0F172A" />
        <Text style={styles.gateTitle}>{name} Gate</Text>
      </View>
      <Text style={styles.gateDesc}>{description}</Text>
      <View style={styles.miniTableContainer}>
        <View style={styles.miniTable}>
          {tableData.map((row, i) => (
            <View key={i} style={[styles.miniRow, i === 0 && styles.miniHeader]}>
              {row.map((cell, j) => (
                <Text key={j} style={[styles.miniCell, i === 0 && styles.boldText]}>{cell}</Text>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 9.1</Text>
          <Text style={styles.topicTitle}>Boolean Expressions</Text>
          <View style={styles.underline} />
        </View>

        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            Boolean algebra is algebra of logic. It deals with variables that can have two discrete values, 0 (False) and 1 (True); and operations that have logical significance. The earliest method of manipulating symbolic logic was invented by George Boole and subsequently came to be known as Boolean Algebra.
          </Text>
          <Text style={styles.paragraph}>
            Boolean algebra has now become an indispensable tool in computer science for its wide applicability in switching theory, building basic electronic circuits and design of digital computers.
          </Text>
        </View>

        {/* BOOLEAN FUNCTIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Boolean Functions</Text>
          <Text style={styles.paragraph}>
            A Boolean function is a special kind of mathematical function f:Xⁿ → X of degree n, where X={"{"}0,1{"}"} is a Boolean domain and n is a non-negative integer. It describes the way how to derive Boolean output from Boolean inputs.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Example − </Text>
            Let, F(A,B)=AB. This is a function of degree 2 from the set of ordered pairs of Boolean variables to the set {"{"}0,1{"}"} where F(0,0)=1, F(0,1)=0, F(1,0)=0 and F(1,1)=0
          </Text>
        </View>

        {/* BOOLEAN EXPRESSIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Boolean Expressions</Text>
          <Text style={styles.paragraph}>
            A Boolean expression always produces a Boolean value. A Boolean expression is composed of a combination of the Boolean constants (True or False), Boolean variables and logical connectives. Each Boolean expression represents a Boolean function.
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.bold}>Example − </Text>
            ABC is a Boolean expression.
          </Text>
        </View>

        {/* BOOLEAN IDENTITIES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Boolean Identities</Text>
          
          <VerbatimIdentity 
            law="Double Complement Law" 
            forms={["\u223c(\u223cA) = A"]} 
          />

          <VerbatimIdentity 
            law="Complement Law" 
            forms={["A + \u223cA = 1 (OR Form)", "A \u00b7 \u223cA = 0 (AND Form)"]} 
          />

          <VerbatimIdentity 
            law="Idempotent Law" 
            forms={["A + A = A (OR Form)", "A \u00b7 A = A (AND Form)"]} 
          />

          <VerbatimIdentity 
            law="Identity Law" 
            forms={["A + 0 = A (OR Form)", "A \u00b7 1 = A (AND Form)"]} 
          />

          <VerbatimIdentity 
            law="Dominance Law" 
            forms={["A + 1 = 1 (OR Form)", "A \u00b7 0 = 0 (AND Form)"]} 
          />

          <VerbatimIdentity 
            law="Commutative Law" 
            forms={["A + B = B + A (OR Form)", "A \u00b7 B = B \u00b7 A (AND Form)"]} 
          />

          <VerbatimIdentity 
            law="Associative Law" 
            forms={["A + (B + C) = (A + B) + C (OR Form)", "A \u00b7 (B \u00b7 C) = (A \u00b7 B) \u00b7 C (AND Form)"]} 
          />

          <VerbatimIdentity 
            law="Absorption Law" 
            forms={["A \u00b7 (A + B) = A", "A + (A \u00b7 B) = A"]} 
          />

          <VerbatimIdentity 
            law="Simplification Law" 
            forms={["A \u00b7 (\u223cA + B) = A \u00b7 B", "A + (\u223cA \u00b7 B) = A + B"]} 
          />

          <VerbatimIdentity 
            law="Distributive Law" 
            forms={["A + (B \u00b7 C) = (A + B) \u00b7 (A + C)", "A \u00b7 (B + C) = (A \u00b7 B) + (A \u00b7 C)"]} 
          />

          <VerbatimIdentity 
            law="De-Morgan's Law" 
            forms={["\u223c(A \u00b7 B) = \u223cA + \u223cB", "\u223c(A + B) = \u223cA \u00b7 \u223cB"]} 
          />
        </View>

        {/* CANONICAL FORMS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Canonical Forms</Text>
          <Text style={styles.paragraph}>
            For a Boolean expression there are two kinds of canonical forms −
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• The sum of minterms (SOM) form</Text>
            <Text style={styles.bulletItem}>• The product of maxterms (POM) form</Text>
          </View>
        </View>

        {/* SUM OF MINTERMS */}
        <View style={styles.sectionCard}>
          <Text style={styles.subHeader}>The Sum of Minterms (SOM) or Sum of Products (SOP) form</Text>
          <Text style={styles.paragraph}>
            A minterm is a product of all variables taken either in their direct or complemented form. Any Boolean function can be expressed as a sum of its 1-minterms and the inverse of the function can be expressed as a sum of its 0-minterms. Hence,
          </Text>
          
          <View style={styles.mathBlock}>
            <Text style={styles.monoMath}>F (list of variables) = ∑ (list of 1-minterm indices)</Text>
            <Text style={[styles.paragraph, { marginVertical: 5 }]}>and</Text>
            <Text style={styles.monoMath}>F' (list of variables) = ∑ (list of 0-minterm indices)</Text>
          </View>

          <View style={styles.tableWrapper}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.cellH}>A</Text><Text style={styles.cellH}>B</Text><Text style={styles.cellH}>C</Text>
              <Text style={styles.cellH}>Term</Text><Text style={styles.cellH}>Minterm</Text>
            </View>
            {[
              ["0","0","0","x'y'z'","m\u2080"],
              ["0","0","1","x'y'z","m\u2081"],
              ["0","1","0","x'yz'","m\u2082"],
              ["0","1","1","x'yz","m\u2083"],
              ["1","0","0","xy'z'","m\u2084"],
              ["1","0","1","xy'z","m\u2085"],
              ["1","1","0","xyz'","m\u2086"],
              ["1","1","1","xyz","m\u2087"]
            ].map((row, i) => (
              <View key={i} style={styles.tableRow}>
                {row.map((val, j) => <Text key={j} style={styles.cellT}>{val}</Text>)}
              </View>
            ))}
          </View>

          <Text style={styles.boldLabel}>Example</Text>
          <View style={styles.mathBlock}>
            <Text style={styles.monoMath}>Let, F(x,y,z) = x'y'z' + xy'z + xyz' + xyz</Text>
            <Text style={styles.monoMath}>Or, F(x,y,z) = m\u2080 + m\u2085 + m\u2086 + m\u2087</Text>
            <Text style={[styles.paragraph, { marginVertical: 5 }]}>Hence,</Text>
            <Text style={styles.monoMath}>F(x,y,z) = ∑(0,5,6,7)</Text>
            
            <Text style={[styles.paragraph, { marginVertical: 10 }]}>Now we will find the complement of F(x,y,z)</Text>
            
            <Text style={styles.monoMath}>F'(x,y,z) = x'yz + x'y'z + x'yz' + xy'z'</Text>
            <Text style={styles.monoMath}>Or, F'(x,y,z) = m\u2083 + m\u2081 + m\u2082 + m\u2084</Text>
            <Text style={[styles.paragraph, { marginVertical: 5 }]}>Hence,</Text>
            <Text style={styles.monoMath}>F'(x,y,z) = ∑(3,1,2,4) = ∑(1,2,3,4)</Text>
          </View>
        </View>

        {/* PRODUCT OF MAXTERMS */}
        <View style={styles.sectionCard}>
          <Text style={styles.subHeader}>The Product of Maxterms (POM) or Product of Sums (POS) form</Text>
          <Text style={styles.paragraph}>
            A maxterm is addition of all variables taken either in their direct or complemented form. Any Boolean function can be expressed as a product of its 0-maxterms and the inverse of the function can be expressed as a product of its 1-maxterms. Hence,
          </Text>
          
          <View style={styles.mathBlock}>
            <Text style={styles.monoMath}>F(list of variables) = π (list of 0-maxterm indices).</Text>
            <Text style={[styles.paragraph, { marginVertical: 5 }]}>and</Text>
            <Text style={styles.monoMath}>F'(list of variables) = π (list of 1-maxterm indices).</Text>
          </View>

          <View style={styles.tableWrapper}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.cellH}>A</Text><Text style={styles.cellH}>B</Text><Text style={styles.cellH}>C</Text>
              <Text style={styles.cellH}>Term</Text><Text style={styles.cellH}>Maxterm</Text>
            </View>
            {[
              ["0","0","0","x + y + z","M\u2080"],
              ["0","0","1","x + y + z'","M\u2081"],
              ["0","1","0","x + y' + z","M\u2082"],
              ["0","1","1","x + y' + z'","M\u2083"],
              ["1","0","0","x' + y + z","M\u2084"],
              ["1","0","1","x' + y + z'","M\u2085"],
              ["1","1","0","x' + y' + z","M\u2086"],
              ["1","1","1","x' + y' + z'","M\u2087"]
            ].map((row, i) => (
              <View key={i} style={styles.tableRow}>
                {row.map((val, j) => <Text key={j} style={styles.cellT}>{val}</Text>)}
              </View>
            ))}
          </View>

          <Text style={styles.boldLabel}>Example</Text>
          <View style={styles.mathBlock}>
            <Text style={styles.monoMath}>Let F(x,y,z) = (x+y+z).(x+y+z').(x+y'+z).(x'+y+z)</Text>
            <Text style={styles.monoMath}>Or, F(x,y,z) = M\u2080.M\u2081.M\u2082.M\u2084</Text>
            <Text style={[styles.paragraph, { marginVertical: 5 }]}>Hence,</Text>
            <Text style={styles.monoMath}>F(x,y,z) = π(0,1,2,4)</Text>
            
            <Text style={[styles.monoMath, { marginTop: 15 }]}>F''(x,y,z) = (x+y'+z').(x'+y+z').(x'+y'+z).(x'+y'+z')</Text>
            <Text style={styles.monoMath}>Or, F(x,y,z) = M\u2083.M\u2085.M\u2086.M\u2087</Text>
            <Text style={[styles.paragraph, { marginVertical: 5 }]}>Hence,</Text>
            <Text style={styles.monoMath}>F'(x,y,z) = π(3,5,6,7)</Text>
          </View>
        </View>

        {/* LOGIC GATES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Logic Gates</Text>
          <Text style={styles.paragraph}>
            Boolean functions are implemented by using logic gates. The following are the logic gates −
          </Text>

          <GateBadge 
            name="NOT" 
            symbol="gate-not" 
            description="A NOT gate inverts a single bit input to a single bit of output."
            tableData={[["A","~A"],["0","1"],["1","0"]]} 
          />
          <GateBadge 
            name="AND" 
            symbol="gate-and" 
            description="An AND gate is a logic gate that gives a high output only if all its inputs are high, otherwise it gives low output. A dot (.) is used to show the AND operation."
            tableData={[["A","B","A.B"],["0","0","0"],["0","1","0"],["1","0","0"],["1","1","1"]]} 
          />
          <GateBadge 
            name="OR" 
            symbol="gate-or" 
            description="An OR gate is a logic gate that gives high output if at least one of the inputs is high. A plus (+) is used to show the OR operation."
            tableData={[["A","B","A+B"],["0","0","0"],["0","1","1"],["1","0","1"],["1","1","1"]]} 
          />
          <GateBadge 
            name="NAND" 
            symbol="gate-nand" 
            description="A NAND gate is a logic gate that gives a low output only if all its inputs are high, otherwise it gives high output."
            tableData={[["A","B","~(A.B)"],["0","0","1"],["0","1","1"],["1","0","1"],["1","1","0"]]} 
          />
          <GateBadge 
            name="NOR" 
            symbol="gate-nor" 
            description="An NOR gate is a logic gate that gives high output if both the inputs are low, otherwise it gives low output."
            tableData={[["A","B","~(A+B)"],["0","0","1"],["0","1","0"],["1","0","0"],["1","1","0"]]} 
          />
          <GateBadge 
            name="XOR (Exclusive OR)" 
            symbol="gate-xor" 
            description="An XOR gate is a logic gate that gives high output if the inputs are different, otherwise it gives low output."
            tableData={[["A","B","A\u2295B"],["0","0","0"],["0","1","1"],["1","0","1"],["1","1","0"]]} 
          />
          <GateBadge 
            name="X-NOR (Exclusive NOR)" 
            symbol="gate-xnor" 
            description="An EX-NOR gate is a logic gate that gives high output if the inputs are same, otherwise it gives low output."
            tableData={[["A","B","A X-NOR B"],["0","0","1"],["0","1","0"],["1","0","0"],["1","1","1"]]} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 18 },
  titleSection: { marginBottom: 20 },
  topicSubtitle: { fontSize: 13, fontWeight: '700', color: '#64748B', letterSpacing: 1.5, textTransform: 'uppercase' },
  topicTitle: { fontSize: 32, fontWeight: '900', color: '#0F172A', marginTop: 4 },
  underline: { height: 4, width: 40, backgroundColor: '#16941c', marginTop: 8, borderRadius: 2 },
  
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 15, elevation: 3, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingBottom: 8 },
  subHeader: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 5, marginBottom: 10 },
  
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 10, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  boldLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginVertical: 10 },
  
  bulletList: { paddingLeft: 10, marginVertical: 5 },
  bulletItem: { fontSize: 15, color: '#475569', marginBottom: 6, lineHeight: 22 },

  verbatimIdentityRow: { marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  lawLabel: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  lawFormula: { fontSize: 14, color: '#0369A1', fontFamily: 'monospace' },

  mathBlock: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', marginVertical: 10 },
  monoMath: { fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold', color: '#0F172A', marginVertical: 2 },

  tableWrapper: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, overflow: 'hidden', marginVertical: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingVertical: 10 },
  tableHeader: { backgroundColor: '#F8FAFC' },
  cellH: { flex: 1, textAlign: 'center', fontWeight: '800', fontSize: 13, color: '#475569' },
  cellT: { flex: 1, textAlign: 'center', fontSize: 13, color: '#64748B', fontFamily: 'monospace' },
  
  gateCard: { backgroundColor: '#F8FAFC', borderRadius: 15, padding: 16, marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  gateHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  gateTitle: { fontSize: 16, fontWeight: '900', color: '#0F172A', marginLeft: 10 },
  gateDesc: { fontSize: 14, color: '#475569', marginVertical: 10, lineHeight: 22, textAlign: 'justify' },
  
  miniTableContainer: { marginTop: 5 },
  miniTable: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, overflow: 'hidden' },
  miniRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CBD5E1', paddingVertical: 6 },
  miniHeader: { backgroundColor: '#E2E8F0' },
  miniCell: { flex: 1, textAlign: 'center', fontSize: 13, paddingVertical: 2, color: '#334155', fontFamily: 'monospace' },
  boldText: { fontWeight: 'bold' },

  identityGroup: { marginBottom: 20 },
  lawTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  formulaText: { fontSize: 14, color: '#0369A1', fontFamily: 'monospace', lineHeight: 24, marginLeft: 10 }
});