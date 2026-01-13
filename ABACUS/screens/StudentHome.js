import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

// Module Card
const ModuleCard = ({ title, category, color, onPress }) => (
  <TouchableOpacity style={[styles.card, { borderLeftWidth: 5, borderLeftColor: color }]} onPress={onPress}>
    <View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardCategory}>{category}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color={color} />
  </TouchableOpacity>
);

// Simulation Card 
const SimulationCard = ({ title, desc, color, onPress }) => (
  <TouchableOpacity style={[styles.simCard, { borderLeftWidth: 5, borderLeftColor: color }]} onPress={onPress}>
    <View style={{flex: 1}}>
      <Text style={styles.simTitle}>{title}</Text>
      <Text style={styles.simDesc}>{desc}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color={color} />
  </TouchableOpacity>
);

const FilterButton = ({ title, active, onPress }) => (
  <TouchableOpacity 
    style={[styles.filterBtn, active && styles.filterBtnActive]} 
    onPress={onPress}
  >
    <Text style={[styles.filterText, active && styles.filterTextActive]}>{title}</Text>
  </TouchableOpacity>
);

export default function StudentHome({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home'); 
  const [activeCategory, setActiveCategory] = useState('All'); 
  const [studentName, setStudentName] = useState("Student");

  const handleProfileClick = () => {
    Alert.alert("Account Options", "Do you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Log Out", 
        style: 'destructive', 
        onPress: async () => {
          try { 
            await signOut(auth); 

          } catch (e) { 
            Alert.alert("Error", e.message); 
          }
        }
      }
    ]);
  };
  // ---------------------------------------------

  const allModules = [
    { id: 1, title: "Sets, Functions & Relations", category: "Sets", color: "#2D7FF9" },
    { id: 2, title: "Logic & Proof Techniques", category: "Logic", color: "#7B61FF" },
    { id: 3, title: "Combinatorics", category: "Math", color: "#F25487" },
    { id: 4, title: "Number Theory", category: "Math", color: "#FFB800" },
    { id: 5, title: "Probability & Statistics", category: "Stats", color: "#00C853" },
  ];

  const displayedModules = activeCategory === 'All' 
    ? allModules 
    : allModules.filter(m => m.category === activeCategory);

  // --- HOME TAB ---
  const renderHome = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Hello, {studentName}</Text>
          <Text style={styles.subText}>Ready to learn Discrete Math?</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn} onPress={handleProfileClick}>
          <Ionicons name="person-circle-outline" size={32} color="#104a28" />
        </TouchableOpacity>
      </View>

      {/* Action Buttons with Icons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('QuizListScreen')}>
          <Ionicons name="clipboard-outline" size={20} color="#333" />
          <Text style={styles.actionButtonText}>View Quizzes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('MyGradesScreen')}>
          <Ionicons name="stats-chart-outline" size={20} color="#333" />
          <Text style={styles.actionButtonText}>My Grades</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Learning Modules</Text>

      <View style={{marginBottom: 15}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All', 'Sets', 'Logic', 'Math', 'Stats'].map(cat => (
            <FilterButton key={cat} title={cat} active={activeCategory === cat} onPress={() => setActiveCategory(cat)} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.listContainer}>
        {displayedModules.map((item) => (
          <ModuleCard key={item.id} title={item.title} category={item.category} color={item.color} 
            onPress={() => navigation.navigate('ModuleDetail', { moduleTitle: item.title, moduleColor: item.color })} 
          />
        ))}
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );

  // --- SIMULATIONS TAB ---
  const renderSimulations = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.headerTitle}>Computational Simulations</Text>
      <Text style={styles.subText}>Interactive logic tools!</Text>
      
      <View style={{marginTop: 20, gap: 15}}>
        <SimulationCard title="Sets Builder" desc="Venn Diagrams & Operations" color="#2D7FF9" onPress={() => navigation.navigate('SetsSimulation')} />
        <SimulationCard title="Truth Tables" desc="Logic Generator" color="#7B61FF" onPress={() => navigation.navigate('TruthTableSimulation')} />
        <SimulationCard title="Bitwise Calculator" desc="AND, OR, XOR operations on binary strings." color="#824055" onPress={() => navigation.navigate("BitwiseSimulation")} />
        <SimulationCard title="Logic Circuits" desc="Visualize gates (AND, OR, NOT) from text." color="#71328e" onPress={() => navigation.navigate("LogicCircuitSimulation")} />
        <SimulationCard title="Permutations & Combinations" desc="Calculate nPr and nCr with steps." color="#F25487" onPress={() => navigation.navigate("PermutationSimulation")} />
        <SimulationCard title="Probability Simulation" desc="Single, Double, and Series event odds." color="#00C853" onPress={() => navigation.navigate("ProbabilitySimulation")} />
        <SimulationCard title="Frequency Distribution Table" desc="Convert raw data into a statistical table." color="#9C27B0" onPress={() => navigation.navigate("FrequencyDistributionSimulation")} />
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      {activeTab === 'Home' ? renderHome() : renderSimulations()}

      {/* --- BOTTOM NAV --- */}
      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          
          <TouchableOpacity 
            style={[styles.navItem, activeTab === 'Home' && styles.navItemActive]}
            onPress={() => setActiveTab('Home')}
          >
            <Ionicons name={activeTab === 'Home' ? "home" : "home-outline"} size={22} color={activeTab === 'Home' ? "white" : "#666"} />
            {activeTab === 'Home' && <Text style={styles.navTextActive}>Modules</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navItem, activeTab === 'Simulations' && styles.navItemActive]}
            onPress={() => setActiveTab('Simulations')}
          >
            <Ionicons name={activeTab === 'Simulations' ? "cube" : "cube-outline"} size={22} color={activeTab === 'Simulations' ? "white" : "#666"} />
            {activeTab === 'Simulations' && <Text style={styles.navTextActive}>Simulations</Text>}
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={handleProfileClick}>
            <Ionicons name="settings-outline" size={24} color="#666" />
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  scrollContent: { padding: 24, paddingBottom: 100 },
  
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 26, fontWeight: '900', color: '#333' },
  greetingText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  subText: { fontSize: 14, color: '#888' },
  profileBtn: { padding: 5 }, 

  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  actionButton: { 
    width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', borderRadius: 12, 
    paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8,
    elevation: 1 
  },
  actionButtonText: { fontSize: 13, fontWeight: '600', color: '#333' },

  filterBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#f0f0f0', marginRight: 10, borderWidth: 1, borderColor: '#eee' },
  filterBtnActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  filterText: { fontSize: 13, color: '#666', fontWeight: '500' },
  filterTextActive: { color: 'white' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 15 },
  listContainer: { gap: 15 },
  card: { 
    backgroundColor: '#fff', borderRadius: 12, padding: 20, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardCategory: { fontSize: 11, color: '#888', marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },

  simCard: {
    backgroundColor: 'white', padding: 20, borderRadius: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1
  },
  simTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  simDesc: { fontSize: 13, color: '#666', marginTop: 4 },

  spacer: { height: 50 },
  bottomNavContainer: { position: 'absolute', bottom: 30, width: '100%', alignItems: 'center' },
  bottomNav: { 
    flexDirection: 'row', backgroundColor: '#fff', width: '90%', paddingVertical: 12, paddingHorizontal: 25, 
    borderRadius: 35, justifyContent: 'space-between', alignItems: 'center', 
    shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 
  },
  navItem: { padding: 5 },
  navItemActive: { backgroundColor: '#104a28', borderRadius: 25, paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', gap: 8 },
  navTextActive: { color: '#fff', fontWeight: '600', fontSize: 14 }
});