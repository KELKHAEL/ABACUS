import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Layouts
import AdminSidebar from './layouts/AdminSidebar';
import InstructorSidebar from './layouts/InstructorSidebar';

// Pages - ADMIN
import AdminDashboard from './modules/admin/AdminDashboard';
import ManageStudents from './modules/admin/ManageStudents';
import ManageInstructors from './modules/admin/ManageInstructors';
import ManageAnnouncements from './modules/admin/ManageAnnouncements';

// Pages - INSTRUCTOR
import InstructorDashboard from './modules/instructor/InstructorDashboard';
import CreateQuiz from './modules/instructor/CreateQuiz';
import Gradebook from './modules/instructor/Gradebook';
import MyClassList from './modules/instructor/MyClassList';
import UploadModules from './modules/instructor/UploadModules';
import InstructorAnnouncements from './modules/instructor/InstructorAnnouncements';

// Auth
import Login from './auth/Login';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- NEW LOGIC: Check LocalStorage instead of Firebase ---
    const checkLogin = () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setRole(parsedUser.role); // 'ADMIN' or 'INSTRUCTOR'
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    };

    checkLogin();
  }, []);

  if (loading) return <div style={{padding: 50}}>Loading ABACUS...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

        {/* ROOT REDIRECT */}
        <Route path="/" element={
           role === 'ADMIN' ? <Navigate to="/admin/AdminDashboard" /> :
           role === 'INSTRUCTOR' ? <Navigate to="/instructor/InstructorDashboard" /> :
           role === 'TEACHER' ? <Navigate to="/instructor/InstructorDashboard" /> :
           <Navigate to="/login" />
        } />

        {/* --- ADMIN ROUTES --- */}
        <Route element={role === 'ADMIN' ? <AdminLayout /> : <Navigate to="/login" />}>
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/ManageStudents" element={<ManageStudents />} />
          <Route path="/admin/ManageInstructors" element={<ManageInstructors />} />
          <Route path="/admin/ManageAnnouncements" element={<ManageAnnouncements />} />
        </Route>

        {/* --- INSTRUCTOR ROUTES --- */}
        <Route element={role === 'INSTRUCTOR' || role === 'TEACHER' ? <InstructorLayout /> : <Navigate to="/login" />}>
           <Route path="/instructor/InstructorDashboard" element={<InstructorDashboard />} />
           <Route path="/instructor/CreateQuiz" element={<CreateQuiz />} />
           <Route path="/instructor/Gradebook" element={<Gradebook />} />
           <Route path="/instructor/MyClassList" element={<MyClassList />} />
           <Route path="/instructor/UploadModules" element={<UploadModules />} />
           <Route path="/instructor/Announcements" element={<InstructorAnnouncements />} />
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