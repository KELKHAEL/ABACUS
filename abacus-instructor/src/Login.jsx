import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "./firebaseConfig"; // Ensure db is exported from your config
import { Mail, Lock, BookOpen } from "lucide-react"; // Using BookOpen for Instructor theme
import "./Login.css"; // We will create this file below

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate User
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Check Role in Firestore (Security Check)
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // STRICT CHECK: Is this user actually a TEACHER?
        if (userData.role === "TEACHER") {
          // Success!
          if(onLoginSuccess) onLoginSuccess(user);
        } else {
          // User exists but is NOT a teacher (e.g. Admin or Student)
          await signOut(auth);
          setError("Access Denied: You are not authorized as an Instructor.");
        }
      } else {
        // User has no database record
        await signOut(auth);
        setError("Account not found in Instructor records.");
      }

    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE - BRANDING */}
      <div className="login-left">
        <div className="brand-content">
          <div className="brand-icon-large">
             <BookOpen size={60} color="#eab308" />
          </div>
          <h1>ABACUS</h1>
          <p>Instructor</p>
          <div className="brand-divider"></div>
          <span className="brand-school">Cavite State University - Tanza</span>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="login-right">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h2>Instructor Login</h2>
            <p>Sign in to manage your quizzes and grades.</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-banner">{error}</div>}

            <div className="input-group">
              <label>CvSU Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="instructor@cvsu.edu.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Verifying Access..." : "Access Dashboard"}
            </button>
          </form>

          <div className="login-footer">
            <p>Restricted Access • Authorized Faculty Only</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;