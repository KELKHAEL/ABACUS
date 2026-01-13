import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from './firebaseWeb';
import './App.css';

import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageStudents from './pages/ManageStudents';
import ManageInstructors from './pages/ManageInstructors';
import ManageGrades from './pages/ManageGrades';
import ManageQuizzes from './pages/ManageQuizzes';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
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
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<ManageStudents />} />
              <Route path="/grades" element={<ManageGrades />} />
              <Route path="/instructors" element={<ManageInstructors />} />
              <Route path="/quizzes" element={<ManageQuizzes />} /> {/* <--- NEW ROUTE */}
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert("Login Error: " + err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div style={{fontSize: '40px', marginBottom: '10px'}}>🏛️</div>
        <h1 className="login-title">Abacus Admin</h1>
        <p className="login-subtitle">Sign in to manage the platform</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div>
            <input 
              className="login-input" 
              placeholder="CvSU Email Address" 
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </div>
          <div>
            <input 
              className="login-input" 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required
            />
          </div>
          <button className="login-btn" type="submit">
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;