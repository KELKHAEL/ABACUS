import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inside AuthContext.js
useEffect(() => {
    const loadUser = async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
            let parsedUser = JSON.parse(storedUser);
            
            try {
                const res = await fetch(`${API_URL}/users/sync/${parsedUser.id}`);
                const freshData = await res.json();
                if (freshData && !freshData.error) {
                    parsedUser = { ...parsedUser, yearLevel: freshData.year_level, section: freshData.section, corStatus: freshData.cor_status };
                    await AsyncStorage.setItem('user', JSON.stringify(parsedUser)); 
                }
            } catch (e) { console.log("Sync skipped, using local cache."); }

            setUser(parsedUser);
        }
    };
    loadUser();
}, []);

  // Login Function
  const login = async (token, userData) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData); // This triggers App.js to re-render!
    } catch (e) {
      console.error(e);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null); // This triggers App.js to switch to Login screen
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