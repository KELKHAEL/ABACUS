import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // 1. Added Navigate and useNavigate
import { signOut } from 'firebase/auth'; 
import { auth, signInWithEmailAndPassword } from './firebaseWeb';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import './App.css';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageStudents from './pages/ManageStudents';
import ManageInstructors from './pages/ManageInstructors';
import ManageGrades from './pages/ManageGrades';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      // Security Check: Only allow the specific admin email
      if (u && u.email === "admin@cvsu.edu.ph") {
        setUser(u);
      } else if (u) {
        console.warn("Unauthorized access attempt by:", u.email);
        signOut(auth); 
        setUser(null);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div style={{padding: 50}}>Loading...</div>;

  return (
    <BrowserRouter>
      {user ? (
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              {/* 2. FIX: Redirect root "/" to "/Dashboard" automatically */}
              <Route path="/" element={<Navigate to="/Dashboard" replace />} />
              
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Students" element={<ManageStudents />} />
              <Route path="/Grades" element={<ManageGrades />} />
              <Route path="/Instructors" element={<ManageInstructors />} />
              
              {/* Optional: Catch any unknown routes and send to Dashboard */}
              <Route path="*" element={<Navigate to="/Dashboard" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </BrowserRouter>
  );
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // 3. Use the hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Strict Admin Check
      if (userCredential.user.email !== "admin@cvsu.edu.ph") {
        await signOut(auth);
        throw new Error("Unauthorized Access: You are not an Administrator.");
      }
      
      // 4. FIX: Explicitly navigate to Dashboard after successful login
      navigate('/Dashboard');

    } catch (err) {
      alert("Login Failed: " + err.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE - BRANDING */}
      <div className="login-left">
        <div className="brand-content">
          <div className="brand-icon-large">
             <ShieldCheck size={80} color="#eab308" />
          </div>
          <h1>ABACUS</h1>
          <p>Administrator</p>
          <div className="brand-divider"></div>
          <span className="brand-school">Cavite State University - Tanza</span>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="login-right">
        <div className="login-form-wrapper">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Please enter your credentials to access the dashboard.</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Admin Account</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input 
                  placeholder="Enter Email" 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)} 
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Admin Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input 
                  type="password" 
                  placeholder="Enter password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)} 
                  required
                />
              </div>
            </div>

            <button className="login-btn" type="submit" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="login-footer">
            <p>Authorized Personnel Only</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;