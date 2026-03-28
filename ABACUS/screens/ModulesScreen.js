import React, { useState, useEffect, useContext } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, StyleSheet, 
  ActivityIndicator, StatusBar, Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 

import * as FileSystem from 'expo-file-system/legacy'; 
import * as Sharing from 'expo-sharing';

// ❗ REPLACE THIS WITH YOUR CURRENT NGROK OR LOCAL IP URL
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function ModulesScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    const fetchModules = async () => {
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
    };

    if (user) fetchModules();
  }, [user]);

  // --- DOWNLOAD AND OPEN PDF LOGIC ---
  const handleDownloadAndOpen = async (fileUrl, fileName, moduleId) => {
    try {
      setDownloadingId(moduleId);
      
      const fileUri = FileSystem.documentDirectory + encodeURIComponent(fileName);
      
      const { uri } = await FileSystem.downloadAsync(
        `${API_URL}${fileUrl}`,
        fileUri
      );

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { 
            mimeType: 'application/pdf', 
            dialogTitle: 'Open Lecture Module' 
        });
      } else {
        Alert.alert("Not Supported", "Opening files is not supported on this device.");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Download Error", "There was a problem opening this module.");
    } finally {
      setDownloadingId(null);
    }
  };

  const renderItem = ({ item }) => {
    // Check if the item is currently in the instructor's trash bin
    const isDeleted = item.is_deleted === 1 || item.is_deleted === true;

    return (
      <View style={[styles.card, isDeleted && styles.cardDisabled]}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, isDeleted && { backgroundColor: '#f3f4f6' }]}>
            <Ionicons name="document-text" size={24} color={isDeleted ? "#9ca3af" : "#f59e0b"} />
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
              style={[styles.downloadBtn, isDeleted && { backgroundColor: '#ef4444' }]}
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Posted Modules</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#104a28" style={{marginTop: 50}} />
      ) : (
        <FlatList 
          data={modules} 
          renderItem={renderItem} 
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          ListEmptyComponent={
              <Text style={{textAlign:'center', marginTop: 40, color: '#888', fontSize: 15}}>
                  No modules are currently available for your section.
              </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  headerRow: { 
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, 
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
    elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05
  },
  backBtn: { marginRight: 15 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#104a28' },
  card: { 
    backgroundColor: 'white', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 15, 
    shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
    borderWidth: 1, borderColor: '#f1f5f9'
  },
  cardDisabled: { // Added style for disabled modules
    backgroundColor: '#f8fafc',
    opacity: 0.8,
    borderColor: '#e5e7eb'
  },
  cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10
  },
  iconContainer: {
    backgroundColor: '#fef3c7', width: 45, height: 45, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 2 },
  authorText: { fontSize: 12, color: '#6b7280' },
  description: {
      fontSize: 13, color: '#4b5563', lineHeight: 18, marginBottom: 15,
      backgroundColor: '#f8fafc', padding: 10, borderRadius: 6
  },
  cardFooter: {
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12
  },
  dateText: { fontSize: 12, color: '#9ca3af', fontWeight: '500' },
  downloadBtn: {
      backgroundColor: '#104a28', paddingVertical: 8, paddingHorizontal: 14, 
      borderRadius: 6, flexDirection: 'row', alignItems: 'center',
      minWidth: 100, justifyContent: 'center'
  },
  downloadText: { color: 'white', fontWeight: 'bold', fontSize: 13 }
});