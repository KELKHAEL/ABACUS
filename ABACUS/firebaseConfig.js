import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-2CqKwtI4U8lhlnGFi5jEO0jt7_2mEZs",
  authDomain: "abacus-capstone.firebaseapp.com",
  projectId: "abacus-capstone",
  storageBucket: "abacus-capstone.firebasestorage.app",
  messagingSenderId: "521131032286",
  appId: "1:521131032286:web:934ef88981e7c101178c4f"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { auth, db };