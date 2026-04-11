import React, { useState, useContext, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, Alert, ActivityIndicator, Image, Modal, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; // Added for Device ID

// ❗ IMPORTANT: CHECK THIS URL MATCHES YOUR CURRENT NGROK TERMINAL
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwveL42WWu00Ixti4bQH3cf20w1-jxGrCDQolb1wigD8SJQAYNvnrEDAeim_I3wYhkDvA/exec';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // --- FORGOT PASSWORD STATES ---
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  
  const [countdown, setCountdown] = useState(0);
  const [otpTimestamp, setOtpTimestamp] = useState(null);

  // Timer for OTP Cooldown
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleLogin = async () => { 
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in both email and password.");
    }
    if (!email.includes("@")) { 
       return Alert.alert("Error", "Please enter a valid email.");
    }

    setLoading(true);
    try {
      // ✅ SINGLE DEVICE ENFORCEMENT: Grab or create a persistent Device ID
      let deviceId = await AsyncStorage.getItem('deviceId');
      if (!deviceId) {
          deviceId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
          await AsyncStorage.setItem('deviceId', deviceId);
      }

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, deviceId })
      });

      const data = await response.json();

      if (data.success) {
        await login(data.token, data.user);
      } else {
        Alert.alert("Login Failed", data.error || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Connection Error", "Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  // --- OTP GENERATION & RESET LOGIC ---
  const handleRequestResetOtp = async () => {
    if (!forgotEmail) return Alert.alert("Error", "Please enter your email first.");
    if (!forgotEmail.endsWith("@cvsu.edu.ph")) return Alert.alert("Restricted", "Only @cvsu.edu.ph emails are allowed.");

    setOtpLoading(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, 
        body: JSON.stringify({ 
            to_email: forgotEmail, 
            student_name: "Student", 
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
        
        Alert.alert("OTP Sent", `Verification code sent to ${forgotEmail}. It is valid for 5 minutes.`);
      } else {
        throw new Error(data.message || "Failed to send.");
      }
    } catch (error) {
      Alert.alert("Connection Error", "Could not send OTP. Please check your connection.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!forgotOtp) return Alert.alert("Error", "Please enter the OTP.");
    if (forgotOtp !== generatedOtp) return Alert.alert("Incorrect OTP", "The code you entered is wrong.");
    if (Date.now() - otpTimestamp > 300000) return Alert.alert("OTP Expired", "Code expired after 5 minutes. Request a new one.");
    
    setIsOtpVerified(true);
    Alert.alert("Verified", "You may now enter your new password.");
  };

  const handleResetPassword = async () => {
      if (!newPassword || !confirmNewPassword) return Alert.alert("Error", "Please enter your new password.");
      if (newPassword !== confirmNewPassword) return Alert.alert("Error", "Passwords do not match.");
      if (newPassword.length < 6) return Alert.alert("Weak Password", "Password must be at least 6 characters.");

      setResetLoading(true);
      try {
        const response = await fetch(`${API_URL}/student-forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: forgotEmail, newPassword })
        });
  
        const data = await response.json();
  
        if (data.success) {
          Alert.alert("Success", "Your password has been reset successfully! You can now log in.");
          closeForgotModal();
        } else {
          Alert.alert("Failed", data.error || "Failed to reset password. Please check if your email is registered.");
        }
      } catch (error) {
        Alert.alert("Connection Error", "Is the server running?");
      } finally {
        setResetLoading(false);
      }
  };

  const closeForgotModal = () => {
      setShowForgotModal(false);
      setForgotEmail('');
      setForgotOtp('');
      setNewPassword('');
      setConfirmNewPassword('');
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setGeneratedOtp(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* LOGO AREA */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/abacus_logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>ABACUS</Text>
          <Text style={styles.appTag}>Discrete Mathematics Mastery</Text>
        </View>

        {/* FORM AREA */}
        <View style={styles.form}>
          <Text style={styles.label}>Cavite State University Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="email@cvsu.edu.ph" 
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
            <Text style={[styles.label, {marginBottom: 0}]}>Password</Text>
            <TouchableOpacity onPress={() => setShowForgotModal(true)}>
                <Text style={{fontSize: 12, fontWeight: 'bold', color: '#104a28'}}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••" 
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginText}>SIGN IN</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate('RegisterScreen')} 
            style={styles.registerLink}
          >
            <Text style={styles.forgotText}>
              No account yet? <Text style={styles.registerText}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FORGOT PASSWORD MODAL (NOW CENTERED) */}
      <Modal visible={showForgotModal} transparent={true} animationType="fade" onRequestClose={closeForgotModal}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{width: '100%', alignItems: 'center'}}>
            <View style={styles.modalContent}>
                
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Reset Password</Text>
                    <TouchableOpacity onPress={closeForgotModal}><Ionicons name="close" size={24} color="#333"/></TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
                    
                    {/* STEP 1: EMAIL & REQUEST OTP */}
                    <Text style={styles.label}>Registered Email</Text>
                    <View style={styles.otpRow}>
                        <TextInput 
                            style={[styles.input, {flex: 1, marginBottom: 0}]} 
                            placeholder="student@cvsu.edu.ph" 
                            autoCapitalize="none" 
                            keyboardType="email-address"
                            value={forgotEmail} 
                            onChangeText={setForgotEmail} 
                            editable={!isOtpVerified} 
                        />
                        <TouchableOpacity 
                            style={[styles.otpBtn, (!forgotEmail || otpLoading || countdown > 0 || isOtpVerified) && styles.disabledBtn]} 
                            onPress={handleRequestResetOtp} 
                            disabled={!forgotEmail || otpLoading || countdown > 0 || isOtpVerified}
                        >
                            {otpLoading ? <ActivityIndicator color="#fff" size="small"/> : countdown > 0 ? <Text style={styles.otpText}>WAIT {countdown}s</Text> : <Text style={styles.otpText}>GET OTP</Text>}
                        </TouchableOpacity>
                    </View>

                    {/* STEP 2: VERIFY OTP */}
                    {isOtpSent && !isOtpVerified && (
                        <View style={{marginTop: 15}}>
                            <Text style={styles.label}>Enter 6-Digit Code</Text>
                            <View style={styles.otpRow}>
                                <TextInput 
                                    style={[styles.input, {flex: 1, marginBottom: 0, borderColor: '#104a28', borderWidth: 2, backgroundColor: '#e8f5e9'}]} 
                                    placeholder="123456" keyboardType="numeric" maxLength={6}
                                    value={forgotOtp} onChangeText={setForgotOtp}
                                />
                                <TouchableOpacity 
                                    style={[styles.otpBtn, !forgotOtp && styles.disabledBtn, {backgroundColor: '#b91c1c'}]} 
                                    onPress={handleVerifyOtp} disabled={!forgotOtp}
                                >
                                    <Text style={styles.otpText}>VERIFY</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* STEP 3: NEW PASSWORD */}
                    {isOtpVerified && (
                        <View style={{marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderColor: '#eee'}}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput 
                                style={styles.input} placeholder="Min. 6 characters" 
                                secureTextEntry value={newPassword} onChangeText={setNewPassword} 
                            />
                            <Text style={styles.label}>Confirm New Password</Text>
                            <TextInput 
                                style={styles.input} placeholder="Re-enter password" 
                                secureTextEntry value={confirmNewPassword} onChangeText={setConfirmNewPassword} 
                            />

                            <TouchableOpacity style={styles.loginBtn} onPress={handleResetPassword} disabled={resetLoading}>
                                {resetLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginText}>SAVE NEW PASSWORD</Text>}
                            </TouchableOpacity>
                        </View>
                    )}

                </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: 30 },
  
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  logoImage: { width: 120, height: 120, marginBottom: 15 },
  appName: { fontSize: 28, fontWeight: '900', color: '#333', letterSpacing: 2 },
  appTag: { fontSize: 14, color: '#888', marginTop: 5 },
  
  form: { width: '100%' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#F8F9FD', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#eee', fontSize: 16, marginBottom: 20, color: '#333' },
  loginBtn: { backgroundColor: '#000000', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  registerLink: { alignItems: 'center', padding: 10 },
  forgotText: { color: '#888', fontSize: 14 },
  registerText: { fontWeight: 'bold', color: '#104a28' },

  // --- Modal Styles (Now Centered) ---
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 20, padding: 25, maxHeight: '85%', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  
  otpRow: { flexDirection: 'row', gap: 10, marginBottom: 5 },
  otpBtn: { backgroundColor: '#104a28', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, borderRadius: 12, height: 55 },
  otpText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
  disabledBtn: { backgroundColor: '#ccc' },
});