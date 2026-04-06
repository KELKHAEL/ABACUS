import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Modal, FlatList, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';

// ❗ REPLACE THIS WITH YOUR PC'S IP ADDRESS OR NGROK URL
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function RegisterScreen({ navigation }) {
  // --- DYNAMIC SETUP STATE ---
  const [setupData, setSetupData] = useState({ programs: [], yearLevels: [], sections: [] });
  const [loadingSetup, setLoadingSetup] = useState(true);

  // --- FORM STATE ---
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  
  const [program, setProgram] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [section, setSection] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [corImage, setCorImage] = useState(null);

  // --- MODAL STATES ---
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [showSectionModal, setShowSectionModal] = useState(false);

  // --- LOGIC & TIMER STATE ---
  const [generatedOtp, setGeneratedOtp] = useState(null); 
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);     
  const [otpLoading, setOtpLoading] = useState(false); 
  const [countdown, setCountdown] = useState(0); 
  const [otpTimestamp, setOtpTimestamp] = useState(null);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwveL42WWu00Ixti4bQH3cf20w1-jxGrCDQolb1wigD8SJQAYNvnrEDAeim_I3wYhkDvA/exec'; 

  // ✅ FETCH DYNAMIC ACADEMIC SETUP FROM MYSQL
  useEffect(() => {
    const fetchSetup = async () => {
      try {
        const response = await fetch(`${API_URL}/academic-setup`);
        const data = await response.json();
        if (!data.error) {
           setSetupData({
               programs: data.programs || [],
               yearLevels: data.yearLevels || [],
               sections: data.sections || []
           });
        }
      } catch (error) {
        console.error("Error fetching academic setup:", error);
      } finally {
        setLoadingSetup(false);
      }
    };
    fetchSetup();
  }, []);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const getFormattedName = () => {
    let name = `${lastName}, ${firstName}`;
    if (middleName && middleName.trim() !== '') {
      const initial = middleName.trim().charAt(0).toUpperCase();
      name += ` ${initial}.`;
    }
    return name;
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

  const handleRequestOtp = async () => {
    if (!firstName || !lastName) return Alert.alert("Error", "Please enter your First and Last Name.");
    if (!studentId) return Alert.alert("Error", "Please enter your Student ID.");
    if (!email) return Alert.alert("Error", "Please enter your email.");
    
    if (!email.endsWith("@cvsu.edu.ph")) {
      return Alert.alert("Restricted", "Only @cvsu.edu.ph emails are allowed.");
    }

    setOtpLoading(true);
    
    const fullName = getFormattedName();
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, 
        body: JSON.stringify({ 
            to_email: email, 
            student_name: fullName, 
            otp_code: code 
        })
      });

      const textResult = await response.text(); 
      const data = JSON.parse(textResult);

      if (data.result === 'success') {
        setGeneratedOtp(code); 
        setIsOtpSent(true); 
        setCountdown(60);
        setOtpTimestamp(Date.now());
        
        Alert.alert("OTP Sent", `Verification code sent to ${email}. It is valid for 5 minutes.`);
      } else {
        throw new Error(data.message || "Failed to send.");
      }
    } catch (error) {
      Alert.alert("Connection Error", "Check internet connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !studentId || !email || !program || !yearLevel || !section || !password || !confirmPassword || !otpInput) {
      return Alert.alert("Missing Fields", "Please fill in all details, including Program, Year, and Section.");
    }
    if (!corImage) {
        return Alert.alert("COR Required", "Please upload a photo of your Certificate of Registration (COR) as proof.");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Password Error", "Passwords do not match.");
    }
    if (password.length < 6) {
      return Alert.alert("Weak Password", "Password must be at least 6 characters.");
    }
    if (otpInput !== generatedOtp) {
      return Alert.alert("Incorrect OTP", "The code you entered is wrong.");
    }
    if (Date.now() - otpTimestamp > 300000) {
      return Alert.alert("OTP Expired", "Your verification code has expired after 5 minutes. Please request a new one.");
    }

    setLoading(true);

    try {
      const fullName = getFormattedName();

      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('studentId', studentId);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('yearLevel', yearLevel);
      formData.append('section', section);
      formData.append('program', program);
      
      const filename = corImage.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      
      formData.append('corImage', { uri: corImage, name: filename, type: type });

      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
      });

      const data = await response.json();

      if (response.status === 403) {
        Alert.alert("Access Denied", "Your Student ID or Email is not in the allowed list. Please contact the Program Coordinator.");
      } else if (data.success) {
        Alert.alert(
          "Registration Successful!", 
          "Your account has been created and your COR was uploaded. Please wait for an Admin or Instructor to verify your classes before they appear on your dashboard.",
          [{ text: "Go to Login", onPress: () => navigation.goBack() }] 
        );
      } else {
        Alert.alert("Registration Failed", data.error || "Something went wrong.");
      }

    } catch (error) {
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DYNAMIC MODAL GENERATOR
  const renderSelectionModal = (visible, setVisible, title, dataArray, valueKey, stateValue, setStateFunction) => (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={() => setVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          {loadingSetup ? (
              <ActivityIndicator color="#104a28" style={{marginVertical: 20}} />
          ) : dataArray.length === 0 ? (
              <Text style={{textAlign: 'center', color: '#888', padding: 20}}>No options available.</Text>
          ) : (
              <FlatList
                data={dataArray}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.modalItem} 
                    onPress={() => { setStateFunction(item[valueKey]); setVisible(false); }}
                  >
                    <Text style={styles.modalItemText}>{item[valueKey]}</Text>
                    {stateValue === item[valueKey] && <Ionicons name="checkmark" size={20} color="#104a28" />}
                  </TouchableOpacity>
                )}
              />
          )}
          <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setVisible(false)}>
            <Text style={styles.modalCloseText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up with your CvSU credentials.</Text>
          </View>

          <View style={styles.form}>
            <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{flex: 1}}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput style={styles.input} placeholder="Juan" value={firstName} onChangeText={setFirstName} />
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput style={styles.input} placeholder="Dela Cruz" value={lastName} onChangeText={setLastName} />
                </View>
            </View>

            <Text style={styles.label}>Middle Name (Optional)</Text>
            <TextInput style={styles.input} placeholder="Santos (or Middle Initial)" value={middleName} onChangeText={setMiddleName} />

            <Text style={styles.label}>Student ID</Text>
            <TextInput style={styles.input} placeholder="e.g. 202312345" value={studentId} onChangeText={setStudentId} keyboardType="numeric" />

            {/* ✅ DYNAMIC PROGRAM DROPDOWN */}
            <Text style={styles.label}>Program</Text>
            <TouchableOpacity style={[styles.input, {justifyContent: 'center'}]} onPress={() => setShowProgramModal(true)}>
              <Text style={{color: program ? '#333' : '#aaa', fontSize: 14}}>{program || "Select your program"}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>CvSU Email</Text>
            <View style={styles.otpRow}>
              <TextInput 
                style={[styles.input, {flex: 1, marginBottom: 0}]} 
                placeholder="student@cvsu.edu.ph" autoCapitalize="none" keyboardType="email-address"
                value={email} onChangeText={setEmail} 
              />
              <TouchableOpacity 
                style={[styles.otpBtn, (!email || otpLoading || countdown > 0) && styles.disabledBtn]} 
                onPress={handleRequestOtp} 
                disabled={otpLoading || !email || countdown > 0}
              >
                {otpLoading ? (
                  <ActivityIndicator color="#fff" size="small"/>
                ) : countdown > 0 ? (
                  <Text style={styles.otpText}>WAIT {countdown}s</Text>
                ) : (
                  <Text style={styles.otpText}>GET OTP</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>Click 'GET OTP' to receive verification code.</Text>

            {isOtpSent && (
              <View style={styles.fadeContainer}>
                <Text style={styles.label}>Enter OTP Code</Text>
                <TextInput 
                  style={[styles.input, {borderColor: '#104a28', borderWidth: 2, backgroundColor: '#e8f5e9'}]} 
                  placeholder="123456" keyboardType="numeric" maxLength={6}
                  value={otpInput} onChangeText={setOtpInput}
                />
              </View>
            )}

            {/* ✅ DYNAMIC YEAR & SECTION DROPDOWNS */}
            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Year Level</Text>
                <TouchableOpacity style={[styles.input, {justifyContent: 'center'}]} onPress={() => setShowYearModal(true)}>
                  <Text style={{color: yearLevel ? '#333' : '#aaa', fontSize: 14}}>{yearLevel ? `Year ${yearLevel}` : "Select"}</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Section</Text>
                <TouchableOpacity style={[styles.input, {justifyContent: 'center'}]} onPress={() => setShowSectionModal(true)}>
                  <Text style={{color: section ? '#333' : '#aaa', fontSize: 14}}>{section ? `Section ${section}` : "Select"}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.label}>Certificate of Registration (Proof)</Text>
            <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
              {corImage ? (
                <Image source={{uri: corImage}} style={styles.previewImage} />
              ) : (
                <>
                  <Ionicons name="cloud-upload-outline" size={30} color="#104a28" />
                  <Text style={styles.uploadText}>Tap to upload COR image</Text>
                </>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Min. 6 characters" secureTextEntry value={password} onChangeText={setPassword} />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput style={styles.input} placeholder="Re-enter password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

            <TouchableOpacity style={styles.regBtn} onPress={handleRegister} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.regText}>REGISTER NOW</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{alignItems:'center', marginTop: 15, marginBottom: 30}}>
              <Text style={{color:'#666'}}>Already have an account? <Text style={{fontWeight:'bold', color:'#104a28'}}>Log In</Text></Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODALS */}
      {renderSelectionModal(showProgramModal, setShowProgramModal, "Select Program", setupData.programs, 'name', program, setProgram)}
      {renderSelectionModal(showYearModal, setShowYearModal, "Select Year", setupData.yearLevels, 'year_name', yearLevel, setYearLevel)}
      {renderSelectionModal(showSectionModal, setShowSectionModal, "Select Section", setupData.sections, 'section_name', section, setSection)}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 30 },
  header: { marginBottom: 20, marginTop: 10 },
  title: { fontSize: 28, fontWeight: '900', color: '#104a28', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#666' },
  form: { width: '100%' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#F8F9FD', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#eee', fontSize: 16, marginBottom: 15, color: '#333' },
  
  otpRow: { flexDirection: 'row', gap: 10, marginBottom: 5 },
  otpBtn: { backgroundColor: '#104a28', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 12, height: 58 },
  otpText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  disabledBtn: { backgroundColor: '#ccc' },
  helperText: { fontSize: 11, color: '#888', marginBottom: 15, fontStyle: 'italic' },
  
  uploadBox: { height: 100, backgroundColor: '#f0fdf4', borderRadius: 12, borderWidth: 2, borderColor: '#bbf7d0', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', marginBottom: 20 },
  uploadText: { marginTop: 8, fontSize: 13, color: '#104a28', fontWeight: '600' },
  previewImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  regBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  regText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  fadeContainer: { marginBottom: 10 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '90%', backgroundColor: 'white', borderRadius: 12, padding: 20, maxHeight: '60%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#104a28', textAlign: 'center' },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalItemText: { fontSize: 14, color: '#333', flex: 1, marginRight: 10, lineHeight: 20 },
  modalCloseBtn: { marginTop: 15, padding: 12, alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8 },
  modalCloseText: { color: '#555', fontWeight: 'bold' }
});