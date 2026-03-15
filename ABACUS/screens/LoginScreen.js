import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, Alert, ActivityIndicator, Image 
} from 'react-native';
import { AuthContext } from '../AuthContext'; 

// ❗ IMPORTANT: CHECK THIS URL MATCHES YOUR CURRENT NGROK TERMINAL
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => { 
    // 1. Validation
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in both email and password.");
    }

    if (!email.includes("@")) { 
       return Alert.alert("Error", "Please enter a valid email.");
    }

    setLoading(true);
    try {
      // 2. Connect to MySQL Backend
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // 3. Update Context (App.js handles navigation automatically)
        await login(data.token, data.user);
      } else {
        Alert.alert("Login Failed", data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Connection Error", "Is the server running on your PC?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* LOGO AREA - REPLACED WITH IMAGE */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/abacus_logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={styles.appName}>ABACUS</Text>
          <Text style={styles.appTag}>Discrete Math Mastery</Text>
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
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: 30 },
  
  logoContainer: { alignItems: 'center', marginBottom: 40 },
  
  // Updated Image Style
  logoImage: { 
    width: 120, 
    height: 120, 
    marginBottom: 15 
  },
  
  appName: { fontSize: 28, fontWeight: '900', color: '#333', letterSpacing: 2 },
  appTag: { fontSize: 14, color: '#888', marginTop: 5 },
  
  form: { width: '100%' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#555', marginBottom: 8, textTransform: 'uppercase' },
  input: { backgroundColor: '#F8F9FD', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#eee', fontSize: 16, marginBottom: 20, color: '#333' },
  loginBtn: { backgroundColor: '#104a28', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  loginText: { color: '#fff', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  registerLink: { alignItems: 'center', padding: 10 },
  forgotText: { color: '#888', fontSize: 14 },
  registerText: { fontWeight: 'bold', color: '#104a28' },
});