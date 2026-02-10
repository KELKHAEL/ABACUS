import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseWeb";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, BookOpen, Mail, Lock } from "lucide-react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Authenticate
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Check if Admin
      if (user.email === "admin@cvsu.edu.ph") {
        navigate("/admin/AdminDashboard");
        return;
      }

      // 3. Check if Instructor
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists() && userDoc.data().role === "TEACHER") {
        // Using window.location.href ensures a fresh state load for the dashboard
        window.location.href = "/instructor/InstructorDashboard";
      } else {
        await signOut(auth);
        setError("Unauthorized: You do not have access to this portal.");
      }

    } catch (err) {
      console.error(err);
      setError("Invalid email or password. Please try again.");
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
             <ShieldCheck size={45} color="#eab308" style={{marginRight: -10}} />
             <BookOpen size={45} color="#eab308" />
          </div>
          <h1>ABACUS</h1>
          <div className="brand-divider"></div>
          <p>Admin and Instructor Panel</p>
          <div style={{marginTop: 30}}>
            <p className="brand-school">Cavite State University</p>
            <p className="brand-school" style={{fontSize: 12, opacity: 0.7}}>Tanza Campus</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="login-right">
        <div className="login-form-wrapper">
          
          <div className="login-header">
            <h2>Welcome!</h2>
            <p>Strictly only for the admin and instructor to access.</p>
          </div>

          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                 <Mail size={20} className="input-icon"/>
                 <input 
                   type="email" 
                   value={email} 
                   onChange={e => setEmail(e.target.value)} 
                   placeholder="Enter your university email"
                   required 
                 />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                 <Lock size={20} className="input-icon"/>
                 <input 
                   type="password" 
                   value={password} 
                   onChange={e => setPassword(e.target.value)} 
                   placeholder="Enter your password"
                   required 
                 />
              </div>
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Verifying Access..." : "Sign In"}
            </button>
          </form>

          <div className="login-footer">
            <p>© 2026 ABACUS Project. All rights reserved.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;