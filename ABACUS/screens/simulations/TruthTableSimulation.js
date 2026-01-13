import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TruthTableSimulation({ navigation }) {
  const [formula, setFormula] = useState('');
  const [tableData, setTableData] = useState(null);
  const [variables, setVariables] = useState([]);
  const [tableAnalysis, setTableAnalysis] = useState(null);

  // --- LOGIC ENGINE ---
  const generateTable = () => {
    if (!formula.trim()) {
      Alert.alert("Input Error", "Please enter a logical formula.");
      return;
    }

    try {
      const foundVars = [...new Set(formula.match(/[A-Za-z]+/g))].filter(v => 
        !['v', 'V', 'T', 'F', 'true', 'false', 'and', 'or', 'not', 'xor', 'iff'].includes(v.toLowerCase())
      ).sort();

      setVariables(foundVars);

      let jsFormula = formula
        .replace(/!=|~=/g, '!==')        
        .replace(/<->|<=>|iff|==/gi, '===') 
        .replace(/->|=>|implies/gi, '<=') 
        .replace(/([^!<>])=(?!=)/g, '$1===')
        .replace(/xor/gi, '!==')        
        .replace(/v|V|\|\|| or /g, '||') 
        .replace(/\^|&| and /g, '&&')   
        .replace(/!|~| not /gi, '!')    
        .replace(/\bT\b/g, 'true')
        .replace(/\bF\b/g, 'false');

      const rows = [];
      const numRows = Math.pow(2, foundVars.length);

      for (let i = 0; i < numRows; i++) {
        const rowVars = {};
        for (let j = 0; j < foundVars.length; j++) {
          const boolVal = !((i >> (foundVars.length - 1 - j)) & 1); 
          rowVars[foundVars[j]] = boolVal;
        }

        let evalExpr = jsFormula;
        foundVars.forEach(v => {
          const regex = new RegExp(`\\b${v}\\b`, 'g');
          evalExpr = evalExpr.replace(regex, rowVars[v]);
        });

        let result;
        try {
          result = eval(evalExpr); 
          if (result !== true && result !== false) result = "Error";
        } catch (e) {
          result = "Error";
        }

        rows.push({ ...rowVars, result });
      }

      setTableData(rows);
      analyzeFormula(rows);

    } catch (error) {
      console.log(error);
      Alert.alert("Syntax Error", "Could not parse formula. Try checking your operators.");
    }
  };

  // --- ANALYZE RESULTS ---
  const analyzeFormula = (rows) => {
    const allTrue = rows.every(r => r.result === true);
    const allFalse = rows.every(r => r.result === false);

    if (allTrue) {
      setTableAnalysis({ type: "TAUTOLOGY", desc: "This statement is ALWAYS TRUE, regardless of the input values.", color: "#104a28" });
    } else if (allFalse) {
      setTableAnalysis({ type: "CONTRADICTION", desc: "This statement is ALWAYS FALSE, regardless of the input values.", color: "#d32f2f" });
    } else {
      setTableAnalysis({ type: "CONTINGENCY", desc: "The truth of this statement depends on the variable values. It is sometimes True and sometimes False.", color: "#eab308" });
    }
  };

  // --- EXPLAIN SPECIFIC ROW ---
  const showRowExplanation = (row) => {
    const conditions = variables.map(v => `${v} is ${row[v] ? 'TRUE' : 'FALSE'}`).join(' and ');
    const outcome = row.result ? "TRUE" : "FALSE";
    
    Alert.alert(
      "Scenario Explanation", 
      `When ${conditions},\nthe result is ${outcome}.`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TRUTH TABLE</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.heading}>TYPE YOUR FORMULA</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputHint}>Example: !(A & B) = !A v !B</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Type logic here..." 
            placeholderTextColor="#ccc"
            value={formula}
            onChangeText={setFormula}
            autoCapitalize="characters"
          />
        </View>

        <View style={styles.card}>
          <View style={styles.gridGuide}>
            <View style={styles.guideItem}><Text style={styles.guideLabel}>And</Text><Text style={styles.guideSym}>^ / &</Text></View>
            <View style={styles.guideItem}><Text style={styles.guideLabel}>Or</Text><Text style={styles.guideSym}>v / |</Text></View>
            <View style={styles.guideItem}><Text style={styles.guideLabel}>Not</Text><Text style={styles.guideSym}>~ / !</Text></View>
            <View style={styles.guideItem}><Text style={styles.guideLabel}>Imp</Text><Text style={styles.guideSym}>{`->`}</Text></View>
            <View style={styles.guideItem}><Text style={styles.guideLabel}>Equiv</Text><Text style={styles.guideSym}>=</Text></View>
          </View>
        </View>

        <TouchableOpacity style={styles.genBtn} onPress={generateTable}>
          <Text style={styles.genBtnText}>GENERATE TABLE</Text>
        </TouchableOpacity>

        {tableData && (
          <View style={styles.tableContainer}>
            
            {/* --- NEW: ANALYSIS CARD --- */}
            {tableAnalysis && (
              <View style={[styles.analysisCard, { borderLeftColor: tableAnalysis.color }]}>
                <Text style={[styles.analysisTitle, { color: tableAnalysis.color }]}>
                  {tableAnalysis.type}
                </Text>
                <Text style={styles.analysisDesc}>{tableAnalysis.desc}</Text>
              </View>
            )}

            <Text style={styles.heading}>TRUTH TABLE:</Text>
            <Text style={styles.subHint}>Tap any row for an explanation</Text>
            
            <View style={styles.tableWrapper}>
              {/* Header Row */}
              <View style={styles.tableRowHeader}>
                {variables.map(v => (
                  <Text key={v} style={styles.cellHeader}>{v}</Text>
                ))}
                <Text style={[styles.cellHeader, styles.cellResult]}>RESULT</Text>
              </View>

              {/* Data Rows (Clickable) */}
              {tableData.map((row, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={[styles.tableRow, idx % 2 === 0 ? styles.rowEven : styles.rowOdd]}
                  onPress={() => showRowExplanation(row)}
                >
                  {variables.map(v => (
                    <Text key={v} style={[styles.cell, row[v] ? styles.trueText : styles.falseText]}>
                      {row[v] ? 'T' : 'F'}
                    </Text>
                  ))}
                  <Text style={[styles.cell, styles.cellResult, row.result ? styles.trueText : styles.falseText]}>
                    {row.result === "Error" ? "ERR" : (row.result ? 'T' : 'F')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#333' },
  
  content: { padding: 20, paddingBottom: 50 },
  heading: { fontSize: 22, fontWeight: '900', color: '#000', marginBottom: 10, textTransform: 'uppercase' },
  subHint: { fontSize: 12, color: '#888', fontStyle: 'italic', marginBottom: 10 },
  
  inputContainer: { marginBottom: 20 },
  inputHint: { fontSize: 12, color: '#888', marginBottom: 5, fontStyle: 'italic' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', fontSize: 18, color: '#333', fontWeight: 'bold', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },

  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#eee', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  gridGuide: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  guideItem: { alignItems: 'center', width: '18%' },
  guideLabel: { fontSize: 12, color: '#888', fontWeight: 'bold' },
  guideSym: { fontSize: 16, color: '#333', fontWeight: 'bold' },

  genBtn: { backgroundColor: '#000', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 30 },
  genBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },

  // Analysis Card Styles
  analysisCard: { 
    backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 25, 
    borderLeftWidth: 5, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 
  },
  analysisTitle: { fontSize: 16, fontWeight: '900', marginBottom: 5, letterSpacing: 1 },
  analysisDesc: { fontSize: 14, color: '#555', lineHeight: 20 },

  tableContainer: { marginTop: 10 },
  tableWrapper: { borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#ddd' },
  tableRowHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  tableRow: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  rowEven: { backgroundColor: '#fff' },
  rowOdd: { backgroundColor: '#fafafa' },
  
  cellHeader: { flex: 1, textAlign: 'center', fontWeight: '900', fontSize: 14, color: '#555' },
  cell: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
  cellResult: { flex: 1.5, borderLeftWidth: 1, borderLeftColor: '#eee', color: '#000' },
  
  trueText: { color: '#104a28' }, 
  falseText: { color: '#d32f2f' },
});