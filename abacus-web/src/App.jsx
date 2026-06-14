import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Layouts
import AdminSidebar from './layouts/AdminSidebar';
import InstructorSidebar from './layouts/InstructorSidebar';

// Pages - ADMIN
import AdminDashboard from './modules/admin/AdminDashboard';
import ManageStudents from './modules/admin/ManageStudents';
import ManageInstructors from './modules/admin/ManageInstructors';
import ManageAnnouncements from './modules/admin/ManageAnnouncements';
import ManageAcademicSetup from './modules/admin/ManageAcademicSetup';
import ManagePromotions from './modules/admin/ManagePromotions';
import ManageWhitelist from './modules/admin/ManageWhitelist';

// Pages - INSTRUCTOR
import InstructorDashboard from './modules/instructor/InstructorDashboard';
import CreateQuiz from './modules/instructor/CreateQuiz';
import Gradebook from './modules/instructor/Gradebook';
import MyClassList from './modules/instructor/MyClassList';
import UploadModules from './modules/instructor/UploadModules';
import InstructorAnnouncements from './modules/instructor/InstructorAnnouncements';
import ManageQuizzes from './modules/instructor/ManageQuizzes';
import InstructorPromotions from './modules/instructor/InstructorPromotions';
import QuizMonitoring from './modules/instructor/QuizMonitoring';

// Auth
import Login from './auth/Login';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogState, setDialogState] = useState(null);
  const [adminSidebarOpen, setAdminSidebarOpen] = useState(false);
  const [instructorSidebarOpen, setInstructorSidebarOpen] = useState(false);
  const dialogResolverRef = useRef(null);

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

  useEffect(() => {
    const showDialog = (type, message, options = {}) => new Promise((resolve) => {
      dialogResolverRef.current = resolve;
      setDialogState({
        type,
        message,
        title: options.title || (type === 'confirm' ? 'Please Confirm' : 'ABACUS'),
        confirmText: options.confirmText || (type === 'confirm' ? 'Confirm' : 'OK'),
        cancelText: options.cancelText || 'Cancel',
      });
    });

    window.abacusDialog = {
      alert: (message, options = {}) => showDialog('alert', message, options),
      confirm: (message, options = {}) => showDialog('confirm', message, options),
    };

    return () => {
      delete window.abacusDialog;
    };
  }, []);

  const closeDialog = (result) => {
    setDialogState(null);
    const resolve = dialogResolverRef.current;
    dialogResolverRef.current = null;
    if (resolve) resolve(result);
  };

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
        <Route element={role === 'ADMIN' ? <AdminLayout sidebarOpen={adminSidebarOpen} onToggleSidebar={() => setAdminSidebarOpen(prev => !prev)} /> : <Navigate to="/login" />}>
          <Route path="/admin/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/admin/ManageStudents" element={<ManageStudents />} />
          <Route path="/admin/ManageInstructors" element={<ManageInstructors />} />
          <Route path="/admin/ManageAnnouncements" element={<ManageAnnouncements />} />
          <Route path="/admin/ManageAcademicSetup" element={<ManageAcademicSetup />} />
          <Route path="/admin/ManagePromotions" element={<ManagePromotions />} />
          <Route path="/admin/ManageWhitelist" element={<ManageWhitelist />} />
        </Route>

        {/* --- INSTRUCTOR ROUTES --- */}
        <Route element={role === 'INSTRUCTOR' || role === 'TEACHER' ? <InstructorLayout sidebarOpen={instructorSidebarOpen} onToggleSidebar={() => setInstructorSidebarOpen(prev => !prev)} /> : <Navigate to="/login" />}>
           <Route path="/instructor/InstructorDashboard" element={<InstructorDashboard />} />
           <Route path="/instructor/CreateQuiz" element={<CreateQuiz />} />
           <Route path="/instructor/ManageQuizzes" element={<ManageQuizzes />} />
           <Route path="/instructor/Gradebook" element={<Gradebook />} />
           <Route path="/instructor/MyClassList" element={<MyClassList />} />
           <Route path="/instructor/UploadModules" element={<UploadModules />} />
           <Route path="/instructor/Announcements" element={<InstructorAnnouncements />} />
           <Route path="/instructor/QuizMonitoring" element={<QuizMonitoring />} />
           <Route path="/instructor/InstructorPromotions" element={<InstructorPromotions />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <DialogHost dialogState={dialogState} onClose={closeDialog} />
    </BrowserRouter>
  );
}

// --- LAYOUT HELPERS ---
const AdminLayout = ({ sidebarOpen, onToggleSidebar }) => (
  <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#f3f4f6]">
    <MobileSidebarToggle open={sidebarOpen} onClick={onToggleSidebar} />
    <AdminSidebar isMobileOpen={sidebarOpen} />
    <div className="min-h-0 flex-1 overflow-y-auto bg-[#f3f4f6]"><Outlet /></div>
  </div>
);

const InstructorLayout = ({ sidebarOpen, onToggleSidebar }) => (
  <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#f3f4f6]">
    <MobileSidebarToggle open={sidebarOpen} onClick={onToggleSidebar} />
    <InstructorSidebar isMobileOpen={sidebarOpen} />
    <div className="min-h-0 flex-1 overflow-y-auto bg-[#f3f4f6]"><Outlet /></div>
  </div>
);

const MobileSidebarToggle = ({ open, onClick }) => (
  <button
    type="button"
    className="mobile-sidebar-toggle"
    onClick={onClick}
    aria-label={open ? 'Hide navigation' : 'Show navigation'}
  >
    {open ? <X size={18} /> : <Menu size={18} />}
    <span>{open ? 'Hide Menu' : 'Menu'}</span>
  </button>
);

function DialogHost({ dialogState, onClose }) {
  if (!dialogState) return null;

  const isConfirm = dialogState.type === 'confirm';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 4000,
        backdropFilter: 'blur(6px)',
      }}
      onClick={() => onClose(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'white',
          borderRadius: '18px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.25)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: '18px 20px', background: '#104a28', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '999px', background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isConfirm ? <X size={18} /> : <Menu size={18} />}
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 800 }}>{dialogState.title}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>ABACUS web notification</div>
          </div>
        </div>

        <div style={{ padding: '22px 20px', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
          {dialogState.message}
        </div>

        <div style={{ padding: '0 20px 20px', display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {isConfirm && (
            <button
              type="button"
              onClick={() => onClose(false)}
              style={{
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                borderRadius: '10px',
                padding: '10px 16px',
                fontWeight: 700,
                cursor: 'pointer',
                minWidth: '96px'
              }}
            >
              {dialogState.cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={() => onClose(true)}
            style={{
              border: 'none',
              background: '#104a28',
              color: 'white',
              borderRadius: '10px',
              padding: '10px 16px',
              fontWeight: 800,
              cursor: 'pointer',
              minWidth: '96px'
            }}
          >
            {dialogState.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
