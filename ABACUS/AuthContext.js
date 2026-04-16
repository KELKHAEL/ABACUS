import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { io } from 'socket.io-client';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  // 1. STANDARD LOAD & BACKGROUND SYNC (Untouched)
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
                    
                    // ANTI-CRASH & SINGLE SESSION FIX
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

  // ✅ 2. REAL-TIME SOCKET CONNECTION (NEW)
  // This hook watches the "user" state. When a user logs in, it opens the live connection.
  useEffect(() => {
    let newSocket;

    if (user && user.id) {
        // Connect to the Render backend
        newSocket = io(API_URL);
        setSocket(newSocket);

        // Tell the server "This User ID is on this phone's socket"
        newSocket.emit('register_device', user.id);

        // Listen for the dreaded kick command from the server
        newSocket.on('force_logout_event', async () => {
            Alert.alert(
                "Session Terminated", 
                "Your account was logged in from another device. You have been disconnected."
            );
            
            // Instantly clear local storage and kick them to the login screen
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            setUser(null);
            newSocket.disconnect();
        });
    }

    // Cleanup: If the user naturally closes the app, disconnect the socket
    return () => {
        if (newSocket) {
            newSocket.disconnect();
        }
    };
  }, [user?.id]);

  // 3. LOGIN FUNCTION
  const login = async (token, userData) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData); 
    } catch (e) {
      console.error(e);
    }
  };

  // 4. LOGOUT FUNCTION
  const logout = async () => {
    try {
      // Tell the backend to erase the active session token
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

      // Erase the local storage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setUser(null); 
      
      // ✅ Disconnect the socket manually when logging out
      if (socket) {
          socket.disconnect();
          setSocket(null);
      }
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