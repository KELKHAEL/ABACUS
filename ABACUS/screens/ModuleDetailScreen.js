import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function ModuleDetailScreen({ route, navigation }) {
  const { moduleTitle, moduleColor } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 1. Header */}
      <View style={[styles.header, { backgroundColor: moduleColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{moduleTitle}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* 2. Lecture Content (Placeholder for now) */}
        <View style={styles.card}>
          <Text style={[styles.topicTitle, { color: moduleColor }]}>1.1 Introduction</Text>
          <Text style={styles.text}>
            A set is a well-defined collection of distinct objects. The objects that make up a set are called elements or members of the set.
            {'\n\n'}
            Common notations include:
            {'\n'}• Union (A ∪ B)
            {'\n'}• Intersection (A ∩ B)
            {'\n'}• Difference (A - B)
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.topicTitle, { color: moduleColor }]}>1.2 Key Concepts</Text>
          <Text style={styles.text}>
            • <Text style={{fontWeight:'bold'}}>Universal Set (U):</Text> A set containing all elements under consideration.
            {'\n'}
            • <Text style={{fontWeight:'bold'}}>Subset (A ⊆ B):</Text> If every element of A is also in B.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { padding: 20, paddingTop: 40, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  backButton: { marginBottom: 10 },
  backText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  content: { padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 15, padding: 20, marginBottom: 20, elevation: 2 },
  topicTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, color: '#444', lineHeight: 24 },
  simButton: { padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, elevation: 4 },
  simButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 }
});