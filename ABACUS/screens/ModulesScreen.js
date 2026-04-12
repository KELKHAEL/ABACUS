import React, { useState, useContext, useCallback } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
  ActivityIndicator, StatusBar, Alert, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 
import { useFocusEffect } from '@react-navigation/native'; 

import * as FileSystem from 'expo-file-system'; 
import * as Sharing from 'expo-sharing';

const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function ModulesScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  
  const [viewMode, setViewMode] = useState('active'); 

  // ✅ DYNAMIC GUARD: Check if the user is unassigned (Case-Insensitive)
  const sectionStr = String(user?.section || '').toLowerCase();
  const isUnassigned = !sectionStr || sectionStr.includes('assign');

  const fetchModules = useCallback(async () => {
    if (isUnassigned) {
        setModules([]);
        setLoading(false);
        return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/modules/student/${user.id}`);
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      setModules(data);
    } catch (error) {
      console.error("Error fetching modules:", error);
      Alert.alert("Error", "Could not load modules. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [user, isUnassigned]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchModules();
      }
    }, [user, fetchModules])
  );

  const handleDownloadAndOpen = async (fileUrl, fileName, moduleId) => {
    try {
      setDownloadingId(moduleId);
      const fileUri = FileSystem.documentDirectory + encodeURIComponent(fileName);
      const { uri } = await FileSystem.downloadAsync(`${API_URL}${fileUrl}`, fileUri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Open Lecture Module' });
      } else {
        Alert.alert("Not Supported", "Opening files is not supported on this device.");
      }
    } catch (error) {
      Alert.alert("Download Error", "There was a problem opening this module.");
    } finally {
      setDownloadingId(null);
    }
  };

  const renderItem = ({ item }) => {
    const isDeleted = item.is_deleted === 1 || item.is_deleted === true;

    return (
      <View style={[styles.card, isDeleted && styles.cardDisabled]}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, isDeleted && { backgroundColor: '#f3f4f6' }]}>
            <Ionicons name={viewMode === 'archived' ? "archive" : "document-text"} size={24} color={isDeleted ? "#9ca3af" : (viewMode === 'archived' ? '#6b7280' : '#f59e0b')} />
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.title, isDeleted && { color: '#9ca3af', textDecorationLine: 'line-through' }]}>
              {item.title}
            </Text>
            <Text style={styles.authorText}>Uploaded by: {item.author}</Text>
          </View>
        </View>

        {item.description ? (
          <Text style={[styles.description, isDeleted && { backgroundColor: '#f9fafb', color: '#9ca3af' }]}>
            {item.description}
          </Text>
        ) : null}

        <View style={styles.cardFooter}>
          <Text style={styles.dateText}>{new Date(item.created_at).toLocaleDateString()}</Text>
          
          <TouchableOpacity 
              style={[styles.downloadBtn, isDeleted && { backgroundColor: '#ef4444' }, viewMode === 'archived' && !isDeleted && {backgroundColor: '#4b5563'}]}
              onPress={() => handleDownloadAndOpen(item.file_url, item.file_name, item.id)}
              disabled={downloadingId === item.id || isDeleted}
          >
              {downloadingId === item.id ? (
                  <ActivityIndicator size="small" color="#fff" />
              ) : (
                  <>
                      <Ionicons name={isDeleted ? "trash-outline" : "download-outline"} size={16} color="#fff" style={{marginRight: 5}}/>
                      <Text style={styles.downloadText}>{isDeleted ? "In Trash Bin" : "View PDF"}</Text>
                  </>
              )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const displayedModules = isUnassigned ? [] : modules.filter(m => viewMode === 'archived' ? m.is_archived === 1 : m.is_archived === 0);

  let emptyMessage = "";
  if (isUnassigned) {
      emptyMessage = "You must be officially assigned to a class section before you can view lecture modules. Please check your Profile.";
  } else {
      emptyMessage = viewMode === 'active' ? 'No active modules available.' : 'No archived modules found.';
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerRow}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Posted Modules</Text>
        </View>
        
        <TouchableOpacity onPress={fetchModules} style={{padding: 5}}>
          <Ionicons name="refresh" size={24} color="#104a28" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tab, viewMode === 'active' && styles.activeTab]} onPress={() => setViewMode('active')}>
          <Text style={[styles.tabText, viewMode === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, viewMode === 'archived' && styles.activeTab]} onPress={() => setViewMode('archived')}>
          <Text style={[styles.tabText, viewMode === 'archived' && styles.activeTabText, {color: viewMode === 'archived' ? '#4b5563' : '#888'}]}>Archives</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#104a28" style={{marginTop: 50}} />
      ) : (
        <FlatList 
          data={displayedModules} 
          renderItem={renderItem} 
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          ListEmptyComponent={
              <View style={{alignItems: 'center', marginTop: 40}}>
                 {isUnassigned && <Ionicons name="lock-closed-outline" size={60} color="#ccc" style={{marginBottom: 15}} />}
                 <Text style={{textAlign:'center', color: '#888', fontSize: 15, paddingHorizontal: 20, lineHeight: 22}}>
                     {emptyMessage}
                 </Text>
              </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
  flex: 1, 
  backgroundColor: '#F8F9FD', // or '#fff' depending on the screen
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  headerRow: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, 
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  
  tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05 },
  tab: { flex: 1, paddingVertical: 15, alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#104a28' },
  tabText: { fontSize: 14, color: '#888', fontWeight: '700' },
  activeTabText: { color: '#104a28' },

  card: { backgroundColor: 'white', padding: 18, borderRadius: 12, marginBottom: 15, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: '#f1f5f9' },
  cardDisabled: { backgroundColor: '#f8fafc', opacity: 0.8, borderColor: '#e5e7eb' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconContainer: { backgroundColor: '#fef3c7', width: 45, height: 45, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 2 },
  authorText: { fontSize: 12, color: '#6b7280' },
  description: { fontSize: 13, color: '#4b5563', lineHeight: 18, marginBottom: 15, backgroundColor: '#f8fafc', padding: 10, borderRadius: 6 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12 },
  dateText: { fontSize: 12, color: '#9ca3af', fontWeight: '500' },
  downloadBtn: { backgroundColor: '#104a28', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6, flexDirection: 'row', alignItems: 'center', minWidth: 100, justifyContent: 'center' },
  downloadText: { color: 'white', fontWeight: 'bold', fontSize: 13 }
});