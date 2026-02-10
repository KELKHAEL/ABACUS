// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebaseWeb';

// Layouts
import AdminSidebar from './layouts/AdminSidebar';
import InstructorSidebar from './layouts/InstructorSidebar';

// Pages - ADMIN
import AdminDashboard from './modules/admin/AdminDashboard';
import ManageStudents from './modules/admin/ManageStudents';
import ManageInstructors from './modules/admin/ManageInstructors';

// Pages - INSTRUCTOR
import InstructorDashboard from './modules/instructor/InstructorDashboard';
import CreateQuiz from './modules/instructor/CreateQuiz';
import Gradebook from './modules/instructor/Gradebook';

// Auth
import Login from './auth/Login';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'ADMIN' | 'TEACHER' | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        
        if (currentUser.email === "admin@cvsu.edu.ph") {
          setRole("ADMIN");
          setLoading(false);
        } else {
          // Check Firestore for Instructor Role
          try {
            const snap = await getDoc(doc(db, "users", currentUser.uid));
            if (snap.exists() && snap.data().role === "TEACHER") {
              setRole("TEACHER");
            } else {
              setRole("UNAUTHORIZED");
            }
          } catch (e) {
            console.error("Role check failed", e);
            setRole("ERROR");
          }
          setLoading(false);
        }
      } else {
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) return <div style={{padding: 50}}>Loading ABACUS...</div>;

  if (user && !role) return <div style={{padding: 50, textAlign: 'center'}}>Verifying Access...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

        {/* ROOT REDIRECT */}
        <Route path="/" element={
           role === 'ADMIN' ? <Navigate to="/admin/AdminDashboard" /> :
           role === 'TEACHER' ? <Navigate to="/instructor/InstructorDashboard" /> :
           <Navigate to="/login" />
        } />

        {/* --- ADMIN ROUTES (Fixed Paths) --- */}
        <Route element={role === 'ADMIN' ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/ManageStudents" element={<ManageStudents />} />
          <Route path="/admin/ManageInstructors" element={<ManageInstructors />} />
        </Route>

        {/* --- INSTRUCTOR ROUTES (Fixed Paths) --- */}
        <Route element={role === 'TEACHER' ? <InstructorLayout /> : <Navigate to="/login" />}>
           <Route path="/instructor/InstructorDashboard" element={<InstructorDashboard />} />
           <Route path="/instructor/CreateQuiz" element={<CreateQuiz />} />
           <Route path="/instructor/Gradebook" element={<Gradebook />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

// --- LAYOUT HELPERS ---
const AdminLayout = () => (
  <div className="app-container">
    <AdminSidebar />
    <div className="main-content"><Outlet /></div>
  </div>
);

const InstructorLayout = () => (
  <div className="app-container">
    <InstructorSidebar />
    <div className="main-content"><Outlet /></div>
  </div>
);

export default App;