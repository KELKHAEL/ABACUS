import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {

  apiKey: "AIzaSyC-2CqKwtI4U8lhlnGFi5jEO0jt7_2mEZs",

  authDomain: "abacus-capstone.firebaseapp.com",

  projectId: "abacus-capstone",

  storageBucket: "abacus-capstone.firebasestorage.app",

  messagingSenderId: "521131032286",

  appId: "1:521131032286:web:934ef88981e7c101178c4f"

};
const app = initializeApp(firebaseConfig);

// Initialize Services
const db = getFirestore(app);
const auth = getAuth(app); // (Local Storage)

export { db, auth };