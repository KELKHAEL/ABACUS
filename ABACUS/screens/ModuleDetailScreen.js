import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ModuleDetailScreen({ route, navigation }) {
  const { moduleTitle, moduleColor, topics } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.header, { backgroundColor: moduleColor }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
           <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{moduleTitle}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>SELECT A TOPIC TO READ</Text>
        {topics.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.topicItem}
            onPress={() => navigation.navigate('LectureContent', { 
                topicTitle: item.title, 
                topicId: item.id,
                content: item.content,
                moduleColor: moduleColor 
            })}
          >
            <View style={[styles.idCircle, { backgroundColor: moduleColor }]}>
              <Text style={styles.idText}>{item.id}</Text>
            </View>
            <Text style={styles.topicText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={18} color="#CCC" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { padding: 20, paddingTop: 50, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  backButton: { marginBottom: 10 },
  content: { padding: 20 },
  sectionLabel: { fontSize: 10, fontWeight: 'bold', color: '#999', letterSpacing: 1, marginBottom: 15 },
  topicItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  idCircle: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  idText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  topicText: { flex: 1, fontSize: 15, color: '#333', fontWeight: '500' }
});