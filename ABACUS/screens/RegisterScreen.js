import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform 
} from 'react-native';
import { db, auth } from '../firebaseConfig'; 
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  // --- FORM STATE ---
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState(''); // <--- 1. NEW STATE
  const [email, setEmail] = useState('');
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

  // YOUR WORKING GOOGLE SCRIPT URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwveL42WWu00Ixti4bQH3cf20w1-jxGrCDQolb1wigD8SJQAYNvnrEDAeim_I3wYhkDvA/exec'; 

  // --- 1. SEND OTP ---
  const handleRequestOtp = async () => {
    // Basic checks before sending OTP
    if (!fullName) return Alert.alert("Error", "Please enter your full name.");
    if (!studentId) return Alert.alert("Error", "Please enter your Student ID."); // <--- 2. CHECK ID HERE TOO
    if (!email) return Alert.alert("Error", "Please enter your email.");
    
    if (!email.endsWith("@cvsu.edu.ph")) {
      return Alert.alert("Restricted", "Only @cvsu.edu.ph emails are allowed.");
    }

    setOtpLoading(true);
    
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
        Alert.alert("OTP Sent", `Verification code sent to ${email}. Please check your inbox.`);
      } else {
        throw new Error(data.message || "Failed to send.");
      }

    } catch (error) {
      console.error("OTP Error:", error);
      Alert.alert("Connection Error", "Could not send email. Please check your internet connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  // --- 2. FINAL REGISTER ---
  const handleRegister = async () => {
    // A. Validation (Include studentId)
    if (!fullName || !studentId || !email || !yearLevel || !section || !password || !confirmPassword || !otpInput) {
      return Alert.alert("Missing Fields", "Please fill in all details, including Student ID.");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Password Error", "Passwords do not match.");
    }
    if (password.length < 6) {
      return Alert.alert("Weak Password", "Password must be at least 6 characters.");
    }

    // Verify OTP
    if (otpInput !== generatedOtp) {
      return Alert.alert("Incorrect OTP", "The code you entered is wrong. Please check your email.");
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // D. Save Profile to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        studentId, // <--- 3. SAVING STUDENT ID TO DATABASE
        email,
        yearLevel,
        section,
        role: "STUDENT",
        createdAt: new Date().toISOString()
      });

      Alert.alert(
        "Registration Successful!", 
        "Welcome to ABACUS. You are now logged in.",
        [{ text: "Go to Home", onPress: () => navigation.replace('StudentHome') }] 
      );

    } catch (error) {
      console.error("Reg Error:", error);
      let msg = "Registration failed.";
      if (error.code === 'auth/email-already-in-use') msg = "This email is already in use.";
      Alert.alert("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1}}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up with your CvSU credentials.</Text>
          </View>

          <View style={styles.form}>
            
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} placeholder="Juan Dela Cruz" value={fullName} onChangeText={setFullName} />

            {/* --- 4. NEW STUDENT ID INPUT --- */}
            <Text style={styles.label}>Student ID</Text>
            <TextInput 
              style={styles.input} 
              placeholder="e.g. 202312345" 
              value={studentId} 
              onChangeText={setStudentId}
              keyboardType="numeric" 
            />

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
            <Text style={styles.helperText}>Click 'GET OTP' to receive your verification code.</Text>

            {/* OTP INPUT SECTION */}
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
                <TextInput style={styles.input} placeholder="1st Year" value={yearLevel} onChangeText={setYearLevel} />
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.label}>Section</Text>
                <TextInput style={styles.input} placeholder="1-1" value={section} onChangeText={setSection} />
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
  fadeContainer: { marginBottom: 10 }
});