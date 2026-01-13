import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Simulation Card
const SimLink = ({ title, icon, color, onPress }) => (
  <TouchableOpacity style={[styles.card, { borderLeftColor: color }]} onPress={onPress}>
    <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={24} color={color} />
    </View>
    <View style={{flex: 1}}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSub}>Tap to preview simulation</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#ccc" />
  </TouchableOpacity>
);

export default function TeacherHome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Teacher Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Instructor Panel</Text>
          <Text style={styles.user}>Prof. Dela Cruz</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.replace('LoginScreen')}>
          <Ionicons name="log-out-outline" size={24} color="#d32f2f" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* DASHBOARD STATS (Teacher Only) */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>4</Text>
            <Text style={styles.statLabel}>Active Classes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>128</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>85%</Text>
            <Text style={styles.statLabel}>Avg. Pass Rate</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>MODULE PREVIEW</Text>
        <Text style={styles.sectionHint}>Access tools exactly as students see them.</Text>

        <SimLink 
          title="Sets & Venn Diagrams" 
          icon="shapes" 
          color="#2D7FF9" 
          onPress={() => navigation.navigate('SetsSimulation')} 
        />
        <SimLink 
          title="Truth Table Generator" 
          icon="grid" 
          color="#7B61FF" 
          onPress={() => navigation.navigate('TruthTableSimulation')} 
        />
        <SimLink 
          title="Logic Circuits" 
          icon="hardware-chip" 
          color="#FFB800" 
          onPress={() => navigation.navigate('LogicCircuitSimulation')} 
        />
        <SimLink 
          title="Permutations (nPr/nCr)" 
          icon="calculator" 
          color="#F25487" 
          onPress={() => navigation.navigate('PermutationSimulation')} 
        />
        <SimLink 
          title="Probability" 
          icon="dice" 
          color="#00C853" 
          onPress={() => navigation.navigate('ProbabilitySimulation')} 
        />
        <SimLink 
          title="Frequency Distribution" 
          icon="bar-chart" 
          color="#9C27B0" 
          onPress={() => navigation.navigate('FrequencyDistributionSimulation')} 
        />

        <View style={styles.webNotice}>
          <Ionicons name="desktop-outline" size={20} color="#555" />
          <Text style={styles.webText}>
            To create quizzes and view full gradebooks, please log in to the <Text style={{fontWeight:'bold'}}>ABACUS Web Portal</Text>.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  welcome: { fontSize: 12, color: '#888', fontWeight: 'bold', textTransform: 'uppercase' },
  user: { fontSize: 20, fontWeight: '900', color: '#333' },
  
  content: { padding: 20, paddingBottom: 50 },

  statsContainer: { flexDirection: 'row', gap: 10, marginBottom: 30 },
  statBox: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  statNum: { fontSize: 22, fontWeight: '900', color: '#333' },
  statLabel: { fontSize: 10, color: '#888', marginTop: 2, fontWeight: 'bold' },

  sectionTitle: { fontSize: 16, fontWeight: '900', color: '#333', marginBottom: 5 },
  sectionHint: { fontSize: 12, color: '#888', marginBottom: 20 },

  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 12, borderLeftWidth: 4, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSub: { fontSize: 12, color: '#aaa' },

  webNotice: { marginTop: 20, padding: 15, backgroundColor: '#E3F2FD', borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  webText: { flex: 1, fontSize: 12, color: '#333', lineHeight: 18 }
});