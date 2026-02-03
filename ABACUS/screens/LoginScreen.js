import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';

// FIX: Points to the firebaseConfig in the root folder (up one level)
import { auth } from '../firebaseConfig'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => { 
    // 1. Validation: Ensure fields aren't empty
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in both email and password.");
    }

    // 2. Restriction: Only allow @cvsu.edu.ph emails
    if (!email.endsWith("@cvsu.edu.ph")) {
      return Alert.alert("Access Denied", "Only @cvsu.edu.ph accounts are allowed.");
    }

    setLoading(true);
    try {
      // 3. Attempt Firebase Login
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Successful!"); 
      // Note: App.js will automatically detect the user change and switch screens
    } catch (error) {
      console.error(error);
      
      // Friendly Error Messages
      let msg = "Invalid email or password.";
      if(error.code === 'auth/user-not-found') msg = "User not found.";
      if(error.code === 'auth/wrong-password') msg = "Incorrect password.";
      if(error.code === 'auth/too-many-requests') msg = "Too many attempts. Try again later.";
      
      Alert.alert("Login Failed", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* LOGO AREA */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>A</Text>
          </View>
          <Text style={styles.appName}>ABACUS</Text>
          <Text style={styles.appTag}>Discrete Math Mastery</Text>
        </View>

        {/* FORM AREA */}
        <View style={styles.form}>
          <Text style={styles.label}>Institutional Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="student@cvsu.edu.ph" 
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
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

          <TouchableOpacity 
            style={styles.forgotBtn} 
            onPress={() => Alert.alert(
            "Forgot Password?", 
            "Please contact the Administrator or your Instructor to request a password reset."
            )}
          >
  <Text style={styles.forgotText}>Forgot Password?</Text>
</TouchableOpacity>

        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: 30 },
  
  logoContainer: { alignItems: 'center', marginBottom: 50 },
  logoBox: { width: 80, height: 80, backgroundColor: '#104a28', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  logoText: { color: '#fff', fontSize: 40, fontWeight: '900' },
  appName: { fontSize: 28, fontWeight: '900', color: '#333', letterSpacing: 2 },
  appTag: { fontSize: 14, color: '#888', marginTop: 5 },

  form: { width: '100%' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#F8F9FD', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#eee', fontSize: 16, marginBottom: 20, color: '#333' },
  
  loginBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  
  registerLink: { alignItems: 'center', padding: 10 },
  forgotText: { color: '#888', fontSize: 14 },
  registerText: { fontWeight: 'bold', color: '#104a28' }
});