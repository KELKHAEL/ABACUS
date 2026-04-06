import React, { useContext, useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, 
  ScrollView, Modal, Alert, ActivityIndicator, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';
import * as ImagePicker from 'expo-image-picker';

// ❗ REPLACE WITH YOUR NGROK URL
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function ProfileScreen({ navigation }) {
  // ✅ FIX: Make sure to extract 'logout' from the AuthContext
  const { user, logout } = useContext(AuthContext);
  
  // Promotion Modal States
  const [showModal, setShowModal] = useState(false);
  const [newYear, setNewYear] = useState("");
  const [newSection, setNewSection] = useState("");
  const [isIrregular, setIsIrregular] = useState(false);
  const [corImage, setCorImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [setupData, setSetupData] = useState({ yearLevels: [], sections: [] });

  useEffect(() => {
    const fetchAcademicSetup = async () => {
      try {
        const response = await fetch(`${API_URL}/academic-setup`);
        const data = await response.json();
        if (!data.error) {
           setSetupData({
               yearLevels: data.yearLevels || [],
               sections: data.sections || []
           });
           if (data.yearLevels?.length > 0) setNewYear(data.yearLevels[0].year_name);
           if (data.sections?.length > 0) setNewSection(data.sections[0].section_name);
        }
      } catch (error) {
        console.error("Could not fetch academic setup:", error);
      }
    };
    fetchAcademicSetup();
  }, []);

  // ✅ FIX: Use the AuthContext logout function. This safely unmounts the app and returns to Login.
  const handleLogout = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
            await logout(); // Calls the function defined in AuthContext.js
          }
        }
      ]
    );
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Refused", "You need to allow camera roll access to upload your COR.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setCorImage(result.assets[0].uri);
    }
  };

  const submitPromotion = async () => {
    if (!corImage) {
      Alert.alert("Required", "Please upload a photo of your Certificate of Registration (COR) as proof.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('manualYear', newYear);
      formData.append('manualSection', newSection);
      formData.append('isIrregular', isIrregular.toString());
      
      const filename = corImage.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      
      formData.append('corImage', {
        uri: corImage,
        name: filename,
        type: type
      });

      const response = await fetch(`${API_URL}/promote-student`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert(
          "Promotion Requested!", 
          "Your COR has been uploaded successfully. Please wait for your Instructor or Admin to verify and approve your new class assignment.", 
          [{ text: "OK", onPress: () => setShowModal(false) }]
        );
      } else {
        Alert.alert("Upload Failed", data.error || "An error occurred.");
      }
    } catch (error) {
      Alert.alert("Error", "Network error. Make sure the server is running.");
      console.error(error);
    } finally {
      setIsUploading(false);
      setShowModal(false);
    }
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{width: 24}} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{user.fullName ? user.fullName.charAt(0).toUpperCase() : 'S'}</Text>
          </View>
          <Text style={styles.name}>{user.fullName ? user.fullName.toUpperCase() : ''}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{user.role}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="id-card-outline" size={20} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Student ID</Text>
              <Text style={styles.infoValue}>{user.studentId || 'Not provided'}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="school-outline" size={20} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Year & Section</Text>
              <Text style={styles.infoValue}>Year {user.yearLevel} - Section {user.section}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionSection}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <TouchableOpacity style={styles.promoteBtn} onPress={() => setShowModal(true)}>
            <Ionicons name="trending-up-outline" size={20} color="#104a28" />
            <Text style={styles.promoteBtnText}>Request Promotion / Update Semester</Text>
            <Ionicons name="chevron-forward" size={20} color="#104a28" style={{marginLeft: 'auto'}}/>
          </TouchableOpacity>
          
          {/* ✅ FIX: Calls handleLogout which triggers AuthContext.logout() */}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* PROMOTION MODAL */}
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Academic Status</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}><Ionicons name="close" size={24} color="#333"/></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalDesc}>Upload your new Certificate of Registration (COR) to be assigned to your new classes.</Text>

              <Text style={styles.inputLabel}>New Year Level</Text>
              <View style={styles.pickerRow}>
                {setupData.yearLevels.map(y => (
                  <TouchableOpacity key={y.id} style={[styles.pickerBtn, newYear === y.year_name && styles.pickerActive]} onPress={() => setNewYear(y.year_name)}>
                    <Text style={[styles.pickerText, newYear === y.year_name && styles.pickerActiveText]}>{y.year_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>New Section</Text>
              <View style={styles.pickerRow}>
                {setupData.sections.map(s => (
                  <TouchableOpacity key={s.id} style={[styles.pickerBtn, newSection === s.section_name && styles.pickerActive]} onPress={() => setNewSection(s.section_name)}>
                    <Text style={[styles.pickerText, newSection === s.section_name && styles.pickerActiveText]}>{s.section_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.toggleRow} onPress={() => setIsIrregular(!isIrregular)}>
                <Ionicons name={isIrregular ? "checkbox" : "square-outline"} size={24} color={isIrregular ? "#104a28" : "#ccc"}/>
                <Text style={styles.toggleText}>I am an Irregular Student</Text>
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Certificate of Registration (Proof)</Text>
              <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                {corImage ? (
                  <Image source={{uri: corImage}} style={styles.previewImage} />
                ) : (
                  <>
                    <Ionicons name="cloud-upload-outline" size={40} color="#104a28" />
                    <Text style={styles.uploadText}>Tap to upload COR image</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={[styles.submitBtn, isUploading && {opacity: 0.7}]} onPress={submitPromotion} disabled={isUploading}>
                {isUploading ? <ActivityIndicator color="white" /> : <Text style={styles.submitBtnText}>Submit & Update</Text>}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FD' },
  header: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', 
    borderBottomWidth: 1, borderBottomColor: '#eee' 
  },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  
  content: { padding: 20 },
  
  profileCard: {
    backgroundColor: '#104a28', borderRadius: 16, padding: 30, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5,
    marginBottom: 25
  },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 15
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#104a28' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 5 },
  email: { fontSize: 14, color: '#e0e0e0', marginBottom: 15 },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },
  
  infoSection: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 25, borderWidth: 1, borderColor: '#eee' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  infoTextContainer: { marginLeft: 15, flex: 1, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', paddingBottom: 10 },
  infoLabel: { fontSize: 12, color: '#888', marginBottom: 2 },
  infoValue: { fontSize: 15, color: '#333', fontWeight: '600' },

  actionSection: { marginBottom: 40 },
  promoteBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e8f5e9', padding: 18, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#bbf7d0' },
  promoteBtnText: { marginLeft: 12, fontSize: 15, fontWeight: 'bold', color: '#104a28' },
  
  logoutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#fee2e2' },
  logoutText: { marginLeft: 12, fontSize: 15, fontWeight: 'bold', color: '#ef4444' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 25, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  modalDesc: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 25 },
  
  inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#555', marginBottom: 8, marginTop: 15 },
  
  pickerRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pickerBtn: { minWidth: '22%', paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  pickerActive: { backgroundColor: '#104a28', borderColor: '#104a28' },
  pickerText: { fontSize: 16, color: '#555', fontWeight: '600' },
  pickerActiveText: { color: '#fff' },

  toggleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 15, backgroundColor: '#f9f9f9', borderRadius: 8 },
  toggleText: { marginLeft: 10, fontSize: 15, fontWeight: '600', color: '#333' },

  uploadBox: { height: 150, backgroundColor: '#f0fdf4', borderRadius: 12, borderWidth: 2, borderColor: '#bbf7d0', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginTop: 5, marginBottom: 25 },
  uploadText: { marginTop: 10, fontSize: 14, color: '#104a28', fontWeight: '600' },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  submitBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  submitBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});