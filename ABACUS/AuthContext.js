import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Fix: API_URL must be defined so the sync fetch doesn't crash!
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
            // ✅ Fix: We must ALWAYS set loading to false, or the app gets stuck!
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