import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// ❗ IMPORTANT: CHECK THIS URL MATCHES YOUR CURRENT NGROK TERMINAL
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('token');
            if (storedUser && storedToken) {
                let parsedUser = JSON.parse(storedUser);
                
                // Silent Background Sync
                try {
                    const res = await fetch(`${API_URL}/users/sync/${parsedUser.id}`);
                    const freshData = await res.json();
                    
                    // ✅ ANTI-CRASH & SINGLE SESSION FIX: 
                    // If Admin deleted this user OR the token doesn't match the active database token, log out.
                    if (res.status === 404 || freshData.error === "Not found" || (freshData.session_token && freshData.session_token !== storedToken)) {
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('user');
                        setUser(null);
                        setLoading(false);
                        Alert.alert(
                            "Session Expired", 
                            "Your account was logged in from another device, removed by the Administrator, or your session expired. Please log in again."
                        );
                        return; 
                    }

                    if (freshData && !freshData.error) {
                        parsedUser = { 
                            ...parsedUser, 
                            yearLevel: freshData.year_level, 
                            section: freshData.section, 
                            corStatus: freshData.cor_status 
                        };
                        await AsyncStorage.setItem('user', JSON.stringify(parsedUser)); 
                    }
                } catch (e) { 
                    console.log("Sync skipped, using local cache."); 
                }

                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Failed to load user from AsyncStorage", error);
        } finally {
            setLoading(false); 
        }
    };
    loadUser();
  }, []);

  const login = async (token, userData) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData); 
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    try {
      // 1. Tell the backend to erase the active session token
      if (user && user.id) {
          try {
              await fetch(`${API_URL}/logout`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userId: user.id })
              });
          } catch (serverErr) {
              console.log("Could not reach server to clear token, proceeding with local logout.");
          }
      }

      // 2. Erase the local storage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null); 
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};