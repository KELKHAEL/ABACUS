import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react"; 
import "./Login.css";

import abacusLogo from "../assets/ABACUS_LOGO_HIGHLIGHTED.png";

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
      // CALL YOUR MYSQL API
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // STORE TOKEN & USER DATA
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // REDIRECT BASED ON ROLE
        if (data.user.role === 'ADMIN') {
          window.location.href = "/admin/AdminDashboard";
        } else if (data.user.role === 'INSTRUCTOR' || data.user.role === 'TEACHER') {
          window.location.href = "/instructor/InstructorDashboard";
        } else {
          setError("Unauthorized: Students should use the Mobile App.");
          localStorage.clear();
        }
        
      } else {
        // Show server error
        setError(data.error || "Login failed. Please check credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server. Is 'node server.js' running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE - BRANDING */}
      <div className="login-left">
        <div className="brand-content">
          
          {/* 2. REPLACED ICONS WITH YOUR ACTUAL LOGO */}
          <div className="brand-icon-large" style={{ marginBottom: '20px' }}>
             <img 
               src={abacusLogo} 
               alt="ABACUS Logo" 
               style={{ width: '120px', height: '120px', objectFit: 'contain' }} 
             />
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
                   placeholder="admin@cvsu.edu.ph"
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