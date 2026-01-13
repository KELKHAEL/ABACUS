import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-2CqKwtI4U8lhlnGFi5jEO0jt7_2mEZs", 
  authDomain: "abacus-capstone.firebaseapp.com",
  projectId: "abacus-capstone",
  storageBucket: "abacus-capstone.firebasestorage.app",
  messagingSenderId: "521131032286",
  appId: "1:521131032286:web:934ef88981e7c101178c4f"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

const secondaryApp = initializeApp(firebaseConfig, "SECONDARY_APP");
const secondaryAuth = getAuth(secondaryApp);

const createUserAccount = async (email, password, role, fullName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: email.toLowerCase(),
      role: role.toUpperCase(),
      fullName: fullName,
      createdAt: new Date(),
      ...(role.toUpperCase() === 'STUDENT' && { instructorId: null, grades: {} })
    });

    await signOut(secondaryAuth);
    return { success: true, uid: user.uid };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { auth, db, createUserAccount, signInWithEmailAndPassword, signOut };