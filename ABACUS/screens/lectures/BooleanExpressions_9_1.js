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

  const GateBadge = ({ name, symbol, tableData }) => (
    <View style={styles.gateCard}>
      <View style={styles.gateHeaderLeft}>
        <MaterialCommunityIcons name={symbol} size={32} color="#0F172A" />
        <Text style={styles.gateTitle}>{name}</Text>
      </View>
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
        
        {/* INTRODUCTION */}
        <View style={styles.sectionCard}>
          <Text style={styles.paragraph}>
            {"Boolean algebra is algebra of logic. It deals with variables that can have two discrete values, 0 (False) and 1 (True); and operations that have logical significance. The earliest method of manipulating symbolic logic was invented by George Boole and subsequently came to be known as Boolean Algebra."}
          </Text>
          <Text style={styles.paragraph}>
            {"Boolean algebra has now become an indispensable tool in computer science for its wide applicability in switching theory, building basic electronic circuits and design of digital computers."}
          </Text>
        </View>

        {/* BOOLEAN FUNCTIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Boolean Functions</Text>
          <Text style={styles.paragraph}>
            {"A Boolean function is a special kind of mathematical function f:X\u207f \u2192 X of degree n, where X={0,1} is a Boolean domain and n is a non-negative integer. It describes the way how to derive Boolean output from Boolean inputs."}
          </Text>
          <Text style={styles.paragraph}>
            {"Example \u2212 Let, F(A,B)=AB. This is a function of degree 2 from the set of ordered pairs of Boolean variables to the set {0,1} where F(0,0)=1, F(0,1)=0, F(1,0)=0 and F(1,1)=0"}
          </Text>
        </View>

        {/* BOOLEAN EXPRESSIONS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Boolean Expressions</Text>
          <Text style={styles.paragraph}>
            {"A Boolean expression always produces a Boolean value. A Boolean expression is composed of a combination of the Boolean constants (True or False), Boolean variables and logical connectives. Each Boolean expression represents a Boolean function."}
          </Text>
          <Text style={styles.paragraph}>{"Example \u2212 ABC is a Boolean expression."}</Text>
        </View>

        {/* IDENTITIES - FULL VERBATIM LIST FIXED */}
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

        {/* SUM OF MINTERMS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Sum of Minterms (SOM)</Text>
          <Text style={styles.paragraph}>{"A minterm is a product of all variables taken either in their direct or complemented form. Any Boolean function can be expressed as a sum of its 1-minterms."}</Text>
          
          <View style={styles.tableWrapper}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.cellH}>A</Text><Text style={styles.cellH}>B</Text><Text style={styles.cellH}>C</Text>
              <Text style={styles.cellH}>Term</Text><Text style={styles.cellH}>Index</Text>
            </View>
            {[
              ["0","0","0","xyz","m\u2080"],["0","0","1","xyz","m\u2081"],["0","1","0","xyz","m\u2082"],["0","1","1","xyz","m\u2083"],
              ["1","0","0","xyz","m\u2084"],["1","0","1","xyz","m\u2085"],["1","1","0","xyz","m\u2086"],["1","1","1","xyz","m\u2087"]
            ].map((row, i) => (
              <View key={i} style={styles.tableRow}>
                {row.map((val, j) => <Text key={j} style={styles.cellT}>{val}</Text>)}
              </View>
            ))}
          </View>
          <Text style={styles.paragraph}>{"Example: F(x,y,z) = m\u2080+m\u2085+m\u2086+m\u2087 = \u2211(0,5,6,7)"}</Text>
        </View>

        {/* PRODUCT OF MAXTERMS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Product of Maxterms (POM)</Text>
          <Text style={styles.paragraph}>{"A maxterm is addition of all variables taken either in their direct or complemented form."}</Text>
          
          <View style={styles.tableWrapper}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.cellH}>A</Text><Text style={styles.cellH}>B</Text><Text style={styles.cellH}>C</Text>
              <Text style={styles.cellH}>Maxterm</Text><Text style={styles.cellH}>Index</Text>
            </View>
            {[
              ["0","0","0","x+y+z","M\u2080"],["0","0","1","x+y+z","M\u2081"],["0","1","0","x+y+z","M\u2082"],["0","1","1","x+y+z","M\u2083"],
              ["1","0","0","x+y+z","M\u2084"],["1","0","1","x+y+z","M\u2085"],["1","1","0","x+y+z","M\u2086"],["1","1","1","x+y+z","M\u2087"]
            ].map((row, i) => (
              <View key={i} style={styles.tableRow}>
                {row.map((val, j) => <Text key={j} style={styles.cellT}>{val}</Text>)}
              </View>
            ))}
          </View>
          <Text style={styles.paragraph}>{"Example: F(x,y,z) = M\u2080\u00b7M\u2081\u00b7M\u2082\u00b7M\u2084 = \u03c0(0,1,2,4)"}</Text>
        </View>

        {/* ALL LOGIC GATES */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Logic Gates Implementation</Text>
          <GateBadge name="NOT" symbol="gate-not" tableData={[["A","~A"],["0","1"],["1","0"]]} />
          <GateBadge name="AND" symbol="gate-and" tableData={[["A","B","A\u00b7B"],["0","0","0"],["0","1","0"],["1","0","0"],["1","1","1"]]} />
          <GateBadge name="OR" symbol="gate-or" tableData={[["A","B","A+B"],["0","0","0"],["0","1","1"],["1","0","1"],["1","1","1"]]} />
          <GateBadge name="NAND" symbol="gate-nand" tableData={[["A","B","~(A\u00b7B)"],["0","0","1"],["0","1","1"],["1","0","1"],["1","1","0"]]} />
          <GateBadge name="NOR" symbol="gate-nor" tableData={[["A","B","~(A+B)"],["0","0","1"],["0","1","0"],["1","0","0"],["1","1","0"]]} />
          <GateBadge name="XOR" symbol="gate-xor" tableData={[["A","B","A\u2295B"],["0","0","0"],["0","1","1"],["1","0","1"],["1","1","0"]]} />
          <GateBadge name="X-NOR" symbol="gate-xnor" tableData={[["A","B","X-NOR"],["0","0","1"],["0","1","0"],["1","0","0"],["1","1","1"]]} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 18 },
  titleSection: { marginBottom: 20 },
  topicSubtitle: { fontSize: 12, fontWeight: '700', color: '#64748B', letterSpacing: 1 },
  topicTitle: { fontSize: 28, fontWeight: '900', color: '#0F172A' },
  underline: { height: 4, width: 40, backgroundColor: '#16941c', marginTop: 5 },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, marginBottom: 15, elevation: 3, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingBottom: 5 },
  paragraph: { fontSize: 14, color: '#475569', lineHeight: 22, marginBottom: 10 },
  bold: { fontWeight: '800', color: '#0F172A' },
  
  verbatimIdentityRow: { marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  lawLabel: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  lawFormula: { fontSize: 13, color: '#0369A1', fontFamily: 'monospace' },

  tableWrapper: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 10, overflow: 'hidden', marginVertical: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingVertical: 8 },
  tableHeader: { backgroundColor: '#F8FAFC' },
  cellH: { flex: 1, textAlign: 'center', fontWeight: '800', fontSize: 11, color: '#475569' },
  cellT: { flex: 1, textAlign: 'center', fontSize: 11, color: '#64748B', fontFamily: 'monospace' },
  
  gateCard: { backgroundColor: '#F8FAFC', borderRadius: 15, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', alignItems: 'center' },
  gateHeaderLeft: { alignItems: 'center', width: '30%' },
  gateTitle: { fontSize: 11, fontWeight: '900', color: '#0F172A', marginTop: 5, textAlign: 'center' },
  miniTableContainer: { flex: 1, marginLeft: 15 },
  miniTable: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 4, overflow: 'hidden' },
  miniRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#CBD5E1' },
  miniHeader: { backgroundColor: '#E2E8F0' },
  miniCell: { flex: 1, textAlign: 'center', fontSize: 10, paddingVertical: 2, color: '#334155' },
  boldText: { fontWeight: 'bold' },
  footer: { paddingVertical: 20, alignItems: 'center' },
  footerText: { color: '#94A3B8', fontSize: 11, fontWeight: 'bold' },

  // Verbatim Identity Styles
  identityGroup: { marginBottom: 20 },
  lawTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  formulaText: { fontSize: 14, color: '#0369A1', fontFamily: 'monospace', lineHeight: 22, marginLeft: 10 }
});