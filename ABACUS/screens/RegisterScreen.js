import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform, Modal, FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

// ❗ REPLACE THIS WITH YOUR PC'S IP ADDRESS
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function RegisterScreen({ navigation }) {
  // --- FORM STATE ---
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  
  // Program Selection State
  const [program, setProgram] = useState('');
  const [showProgramModal, setShowProgramModal] = useState(false);

  const [yearLevel, setYearLevel] = useState('');
  const [section, setSection] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpInput, setOtpInput] = useState('');

  // --- LOGIC STATE ---
  const [generatedOtp, setGeneratedOtp] = useState(null); 
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);     
  const [otpLoading, setOtpLoading] = useState(false); 

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwveL42WWu00Ixti4bQH3cf20w1-jxGrCDQolb1wigD8SJQAYNvnrEDAeim_I3wYhkDvA/exec'; 

  // --- PROGRAM OPTIONS ---
  const programOptions = [
    "Bachelor of Science in Information Technology",
    "Bachelor of Elementary Education",
    "Bachelor of Secondary Education - Major in English",
    "Bachelor of Secondary Education - Major in Mathematics",
    "Bachelor of Science in Business Administration - Major in Marketing Management"
  ];

  // --- HELPER: Construct Full Name ---
  const getFormattedName = () => {
    let name = `${lastName}, ${firstName}`;
    if (middleName && middleName.trim() !== '') {
      const initial = middleName.trim().charAt(0).toUpperCase();
      name += ` ${initial}.`;
    }
    return name;
  };

  // --- 1. SEND OTP ---
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
        Alert.alert("OTP Sent", `Verification code sent to ${email}.`);
      } else {
        throw new Error(data.message || "Failed to send.");
      }

    } catch (error) {
      console.error("OTP Error:", error);
      Alert.alert("Connection Error", "Check internet connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  // --- 2. FINAL REGISTER ---
  const handleRegister = async () => {
    if (!firstName || !lastName || !studentId || !email || !program || !yearLevel || !section || !password || !confirmPassword || !otpInput) {
      return Alert.alert("Missing Fields", "Please fill in all details, including Program.");
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

    setLoading(true);

    try {
      const fullName = getFormattedName();

      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName, 
          studentId,
          email,
          password,
          yearLevel,
          section,
          program 
        })
      });

      const data = await response.json();

      // --- NEW LOGIC: Handle 403 Forbidden specifically ---
      if (response.status === 403) {
        Alert.alert(
            "Access Denied", 
            "Your Student ID or Email is not in the allowed list. Please contact the Program Coordinator."
        );
      } else if (data.success) {
        Alert.alert(
          "Registration Successful!", 
          "You may now log in with your credentials.",
          [{ text: "Go to Login", onPress: () => navigation.goBack() }] 
        );
      } else {
        Alert.alert("Registration Failed", data.error || "Something went wrong.");
      }

    } catch (error) {
      console.error("Reg Error:", error);
      Alert.alert("Error", "Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER DROPDOWN MODAL ---
  const renderProgramModal = () => (
    <Modal
      visible={showProgramModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowProgramModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Program</Text>
          <FlatList
            data={programOptions}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.modalItem} 
                onPress={() => {
                  setProgram(item);
                  setShowProgramModal(false);
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
                {program === item && <Ionicons name="checkmark" size={20} color="#104a28" />}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowProgramModal(false)}>
            <Text style={styles.modalCloseText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up with your CvSU credentials.</Text>
          </View>

          <View style={styles.form}>
            
            <View style={{flexDirection: 'row', gap: 10}}>
                <View style={{flex: 1}}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Juan" 
                        value={firstName} 
                        onChangeText={setFirstName} 
                    />
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Dela Cruz" 
                        value={lastName} 
                        onChangeText={setLastName} 
                    />
                </View>
            </View>

            <Text style={styles.label}>Middle Name (Optional)</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Santos (or Middle Initial)" 
                value={middleName} 
                onChangeText={setMiddleName} 
            />

            <Text style={styles.label}>Student ID</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. 202312345" 
              value={studentId} 
              onChangeText={setStudentId} 
              keyboardType="numeric" 
            />

            {/* --- PROGRAM DROPDOWN TRIGGER --- */}
            <Text style={styles.label}>Program</Text>
            <TouchableOpacity 
              style={[styles.input, {justifyContent: 'center'}]} 
              onPress={() => setShowProgramModal(true)}
            >
              <Text style={{color: program ? '#333' : '#aaa', fontSize: 14}}>
                {program || "Select your program"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>CvSU Email</Text>
            <View style={styles.otpRow}>
              <TextInput 
                style={[styles.input, {flex: 1, marginBottom: 0}]} 
                placeholder="student@cvsu.edu.ph" 
                autoCapitalize="none" 
                keyboardType="email-address"
                value={email} 
                onChangeText={setEmail} 
              />
              <TouchableOpacity 
                style={[styles.otpBtn, (!email || otpLoading) && styles.disabledBtn]} 
                onPress={handleRequestOtp} 
                disabled={otpLoading || !email}
              >
                {otpLoading ? <ActivityIndicator color="#fff" size="small"/> : <Text style={styles.otpText}>GET OTP</Text>}
              </TouchableOpacity>
            </View>
            <Text style={styles.helperText}>Click 'GET OTP' to receive verification code.</Text>

            {isOtpSent && (
              <View style={styles.fadeContainer}>
                <Text style={styles.label}>Enter OTP Code</Text>
                <TextInput 
                  style={[styles.input, {borderColor: '#104a28', borderWidth: 2, backgroundColor: '#e8f5e9'}]} 
                  placeholder="123456" 
                  keyboardType="numeric"
                  maxLength={6}
                  value={otpInput} 
                  onChangeText={setOtpInput}
                />
              </View>
            )}

            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Year Level</Text>
                <TextInput style={styles.input} placeholder="1" value={yearLevel} onChangeText={setYearLevel} keyboardType="numeric"/>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Section</Text>
                <TextInput style={styles.input} placeholder="1" value={section} onChangeText={setSection} keyboardType="numeric"/>
              </View>
            </View>

            <Text style={styles.label}>Password</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Min. 6 characters" 
              secureTextEntry 
              value={password} 
              onChangeText={setPassword} 
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Re-enter password" 
              secureTextEntry 
              value={confirmPassword} 
              onChangeText={setConfirmPassword} 
            />

            <TouchableOpacity style={styles.regBtn} onPress={handleRegister} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.regText}>REGISTER NOW</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{alignItems:'center', marginTop: 15, marginBottom: 30}}>
              <Text style={{color:'#666'}}>Already have an account? <Text style={{fontWeight:'bold', color:'#104a28'}}>Log In</Text></Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Render the Modal */}
      {renderProgramModal()}
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
  regBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  regText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  fadeContainer: { marginBottom: 10 },

  // --- Modal Styles ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '90%', backgroundColor: 'white', borderRadius: 12, padding: 20, maxHeight: '60%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#104a28', textAlign: 'center' },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  modalItemText: { fontSize: 14, color: '#333', flex: 1, marginRight: 10, lineHeight: 20 },
  modalCloseBtn: { marginTop: 15, padding: 12, alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: 8 },
  modalCloseText: { color: '#555', fontWeight: 'bold' }
});