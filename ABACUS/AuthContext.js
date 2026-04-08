import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// ❗ IMPORTANT: CHECK THIS URL MATCHES YOUR CURRENT NGROK TERMINAL
const API_URL = 'https://pretangible-reminiscently-jude.ngrok-free.dev'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                let parsedUser = JSON.parse(storedUser);
                
                // Silent Background Sync
                try {
                    const res = await fetch(`${API_URL}/users/sync/${parsedUser.id}`);
                    const freshData = await res.json();
                    
                    // ✅ ANTI-CRASH FIX: If Admin deleted this user from the database, 
                    // instantly destroy the cached session and log them out!
                    if (res.status === 404 || freshData.error === "Not found") {
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('user');
                        setUser(null);
                        setLoading(false);
                        Alert.alert(
                            "Session Expired", 
                            "Your account was removed by the Administrator or your session expired. Please log in again."
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