import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BooleanSimplification_9_2() {
  
  const SolutionStep = ({ label, formula, justification }) => (
    <View style={styles.stepRow}>
      <Text style={styles.stepLabel}>{label}</Text>
      <Text style={styles.stepFormula}>{formula}</Text>
      {justification && <Text style={styles.stepJustification}>{justification}</Text>}
    </View>
  );

  const KMapImage = ({ source, caption, height = 140 }) => (
    <View style={styles.imageContainer}>
      <Image source={source} style={[styles.graphImage, { height }]} resizeMode="contain" />
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HEADER SECTION */}
        <View style={styles.titleSection}>
          <Text style={styles.topicSubtitle}>Module 9.2</Text>
          <Text style={styles.topicTitle}>Simplification of Boolean Functions</Text>
          <View style={styles.underline} />
        </View>

        {/* ALGEBRAIC SIMPLIFICATION */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Simplification Using Algebraic Functions</Text>
          <Text style={styles.paragraph}>
            {"In this approach, one Boolean expression is minimized into an equivalent expression by applying Boolean identities."}
          </Text>

          {/* PROBLEM 1 */}
          <Text style={styles.boldLabel}>Problem 1</Text>
          <Text style={styles.paragraph}>{"Minimize the following Boolean expression using Boolean identities \u2212"}</Text>
          <Text style={styles.monoMathCenter}>{"F(A,B,C) = A'B + BC' + BC + AB'C'"}</Text>
          
          <Text style={styles.boldLabel}>Solution</Text>
          <View style={styles.solutionBox}>
            <SolutionStep label="Given," formula="F(A,B,C) = A'B + BC' + BC + AB'C'" />
            <SolutionStep label="Or," formula="F(A,B,C) = A'B + (BC' + BC') + BC + AB'C'" justification="[By idempotent law, BC = BC + BC]" />
            <SolutionStep label="Or," formula="F(A,B,C) = A'B + (BC' + BC) + (BC' + AB'C')" />
            <SolutionStep label="Or," formula="F(A,B,C) = A'B + B(C' + C) + C'(B + AB')" justification="[By distributive laws]" />
            <SolutionStep label="Or," formula="F(A,B,C) = A'B + B.1 + C'(B + A)" justification="[(C' + C) = 1 and absorption law (B + AB')= (B + A)]" />
            <SolutionStep label="Or," formula="F(A,B,C) = A'B + B + C'(B + A)" justification="[B.1 = B]" />
            <SolutionStep label="Or," formula="F(A,B,C) = B(A' + 1) + C'(B + A)" />
            <SolutionStep label="Or," formula="F(A,B,C) = B.1 + C'(B + A)" justification="[(A' + 1) = 1]" />
            <SolutionStep label="Or," formula="F(A,B,C) = B + C'(B + A)" justification="[As, B.1 = B]" />
            <SolutionStep label="Or," formula="F(A,B,C) = B + BC' + AC'" />
            <SolutionStep label="Or," formula="F(A,B,C) = B(1 + C') + AC'" />
            <SolutionStep label="Or," formula="F(A,B,C) = B.1 + AC'" justification="[As, (1 + C') = 1]" />
            <SolutionStep label="Or," formula="F(A,B,C) = B + AC'" justification="[As, B.1 = B]" />
            <Text style={styles.finalResult}>So, F(A,B,C) = B + AC' is the minimized form.</Text>
          </View>

          {/* PROBLEM 2 */}
          <Text style={[styles.boldLabel, {marginTop: 20}]}>Problem 2</Text>
          <Text style={styles.paragraph}>{"Minimize the following Boolean expression using Boolean identities \u2212"}</Text>
          <Text style={styles.monoMathCenter}>{"F(A,B,C) = (A + B)(A + C)"}</Text>
          
          <Text style={styles.boldLabel}>Solution</Text>
          <View style={styles.solutionBox}>
            <SolutionStep label="Given," formula="F(A,B,C) = (A + B)(A + C)" />
            <SolutionStep label="Or," formula="F(A,B,C) = A.A + A.C + B.A + B.C" justification="[Applying distributive Rule]" />
            <SolutionStep label="Or," formula="F(A,B,C) = A + A.C + B.A + B.C" justification="[Applying Idempotent Law]" />
            <SolutionStep label="Or," formula="F(A,B,C) = A(1 + C) + B.A + B.C" justification="[Applying distributive Law]" />
            <SolutionStep label="Or," formula="F(A,B,C) = A + B.A + B.C" justification="[Applying dominance Law]" />
            <SolutionStep label="Or," formula="F(A,B,C) = (A + 1).A + B.C" justification="[Applying distributive Law]" />
            <SolutionStep label="Or," formula="F(A,B,C) = 1.A + B.C" justification="[Applying dominance Law]" />
            <SolutionStep label="Or," formula="F(A,B,C) = A + B.C" justification="[Applying dominance Law]" />
            <Text style={styles.finalResult}>So, F(A,B,C) = A + BC is the minimized form.</Text>
          </View>
        </View>

        {/* KARNAUGH MAPS */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Karnaugh Maps</Text>
          <Text style={styles.paragraph}>
            {"The Karnaugh map (Kmap), introduced by Maurice Karnaughin in 1953, is a grid-like representation of a truth table which is used to simplify boolean algebra expressions. A Karnaugh map has zero and one entries at different positions. It provides grouping together Boolean expressions with common factors and eliminates unwanted variables from the expression. In a K-map, crossing a vertical or horizontal cell boundary is always a change of only one variable."}
          </Text>
          
          <Text style={styles.boldLabel}>Example 1</Text>
          <Text style={styles.paragraph}>{"An arbitrary truth table is taken below \u2212"}</Text>
          
          <View style={styles.tableContainer}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.headerCell}>A</Text>
              <Text style={styles.headerCell}>B</Text>
              <Text style={styles.headerCell}>A operation B</Text>
            </View>
            <View style={styles.tableRow}><Text style={styles.tableCell}>0</Text><Text style={styles.tableCell}>0</Text><Text style={styles.tableCell}>w</Text></View>
            <View style={styles.tableRow}><Text style={styles.tableCell}>0</Text><Text style={styles.tableCell}>1</Text><Text style={styles.tableCell}>x</Text></View>
            <View style={styles.tableRow}><Text style={styles.tableCell}>1</Text><Text style={styles.tableCell}>0</Text><Text style={styles.tableCell}>y</Text></View>
            <View style={styles.tableRow}><Text style={styles.tableCell}>1</Text><Text style={styles.tableCell}>1</Text><Text style={styles.tableCell}>z</Text></View>
          </View>

          <Text style={styles.paragraph}>{"Now we will make a k-map for the above truth table \u2212"}</Text>
          <KMapImage source={require('../../assets/moduleImages/bool1.jpg')} height={120} />

          <Text style={styles.boldLabel}>Example 2</Text>
          <Text style={styles.paragraph}>{"Now we will make a K-map for the expression \u2212 AB+ AB"}</Text>
          <KMapImage source={require('../../assets/moduleImages/bool2.jpg')} height={120} />
        </View>

        {/* SIMPLIFICATION USING K-MAP */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Simplification Using K-map</Text>
          <Text style={styles.paragraph}>
            {"K-map uses some rules for the simplification of Boolean expressions by combining together adjacent cells into single term. The rules are described below \u2212"}
          </Text>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}><Text style={styles.bold}>Rule 1 \u2212</Text> Any cell containing a zero cannot be grouped.</Text>
            <KMapImage source={require('../../assets/moduleImages/bool3.jpg')} caption="Wrong grouping" />
          </View>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}><Text style={styles.bold}>Rule 2 \u2212</Text> Groups must contain 2n cells (n starting from 1).</Text>
            <KMapImage source={require('../../assets/moduleImages/bool4.jpg')} caption="Wrong grouping" />
          </View>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}><Text style={styles.bold}>Rule 3 \u2212</Text> Grouping must be horizontal or vertical, but must not be diagonal.</Text>
            <KMapImage source={require('../../assets/moduleImages/bool5.jpg')} caption="Wrong diagonal grouping" />
            <KMapImage source={require('../../assets/moduleImages/bool6.jpg')} caption="Proper vertical grouping" />
            <KMapImage source={require('../../assets/moduleImages/bool7.jpg')} caption="Proper horizontal grouping" />
          </View>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}><Text style={styles.bold}>Rule 4 \u2212</Text> Groups must be covered as largely as possible.</Text>
            <KMapImage source={require('../../assets/moduleImages/bool8.jpg')} caption="Insufficient grouping" />
            <KMapImage source={require('../../assets/moduleImages/bool9.jpg')} caption="Proper grouping" />
          </View>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}><Text style={styles.bold}>Rule 5 \u2212</Text> If 1 of any cell cannot be grouped with any other cell, it will act as a group itself.</Text>
            <KMapImage source={require('../../assets/moduleImages/bool10.jpg')} caption="Proper grouping" />
          </View>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}><Text style={styles.bold}>Rule 6 \u2212</Text> Groups may overlap but there should be as few groups as possible.</Text>
            <KMapImage source={require('../../assets/moduleImages/bool11.jpg')} caption="Proper grouping" />
          </View>

          <View style={styles.ruleBox}>
            <Text style={styles.ruleText}><Text style={styles.bold}>Rule 7 \u2212</Text> The leftmost cell/cells can be grouped with the rightmost cell/cells and the topmost cell/cells can be grouped with the bottommost cell/cells.</Text>
            <KMapImage source={require('../../assets/moduleImages/bool12.jpg')} caption="Proper grouping" />
          </View>

          {/* FINAL PROBLEM */}
          <Text style={[styles.boldLabel, { fontSize: 18, marginTop: 20 }]}>Problem</Text>
          <Text style={styles.paragraph}>{"Minimize the following Boolean expression using K-map \u2212"}</Text>
          <Text style={styles.monoMathCenter}>{"F(A,B,C) = A'BC + A'BC' + AB'C' + AB'C"}</Text>

          <Text style={[styles.boldLabel, { fontSize: 18 }]}>Solution</Text>
          <Text style={styles.paragraph}>{"Each term is put into k-map and we get the following \u2212"}</Text>
          <KMapImage source={require('../../assets/moduleImages/bool13.jpg')} caption="K-map for F (A, B, C)" />

          <Text style={styles.paragraph}>{"Now we will group the cells of 1 according to the rules stated above \u2212"}</Text>
          <KMapImage source={require('../../assets/moduleImages/bool14.jpg')} caption="K-map for F (A, B, C)" />

          <Text style={styles.paragraph}>
            {"We have got two groups which are termed as AB' and A'B. Hence, F(A,B,C) = AB' + A'B = A \u2295 B. It is the minimized form."}
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 20 },
  titleSection: { marginBottom: 25 },
  topicSubtitle: { fontSize: 13, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1.5 },
  topicTitle: { fontSize: 30, fontWeight: '900', color: '#0F172A', marginTop: 4 },
  underline: { height: 4, width: 40, backgroundColor: '#16941c', marginTop: 8, borderRadius: 2 },
  
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, marginBottom: 20, elevation: 4, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 20, borderWidth: 1, borderColor: '#F1F5F9' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 15, letterSpacing: -0.5 },
  paragraph: { fontSize: 15, color: '#475569', lineHeight: 24, marginBottom: 12, textAlign: 'justify' },
  bold: { fontWeight: '800', color: '#0F172A' },
  boldLabel: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 10 },
  
  monoMathCenter: { fontFamily: 'monospace', fontSize: 15, fontWeight: 'bold', color: '#0F172A', textAlign: 'center', marginVertical: 10 },
  
  solutionBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderLeftWidth: 4, borderLeftColor: '#16941c', marginTop: 10, marginBottom: 15 },
  stepRow: { marginBottom: 12 },
  stepLabel: { fontSize: 13, color: '#94A3B8', fontWeight: 'bold', marginBottom: 2 },
  stepFormula: { fontSize: 14, color: '#1E293B', fontFamily: 'monospace', fontWeight: '700' },
  stepJustification: { fontSize: 12, color: '#0369A1', fontStyle: 'italic', marginTop: 4 },
  finalResult: { fontSize: 15, fontWeight: '900', color: '#16941c', marginTop: 15, borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 12 },
  
  tableContainer: { borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginVertical: 15 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: '#F1F5F9', paddingVertical: 10 },
  headerCell: { flex: 1, textAlign: 'center', fontWeight: '800', color: '#1E293B', fontSize: 13 },
  tableRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingVertical: 10, backgroundColor: '#FFF' },
  tableCell: { flex: 1, textAlign: 'center', color: '#475569', fontSize: 14, fontFamily: 'monospace' },

  ruleBox: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 20 },
  ruleText: { fontSize: 14, color: '#0F172A', marginBottom: 15, lineHeight: 22 },
  
  imageContainer: { alignItems: 'center', marginVertical: 10, width: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 15 },
  graphImage: { width: '100%' },
  caption: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginTop: 10, textAlign: 'center' }
});