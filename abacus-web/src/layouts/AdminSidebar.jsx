import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Megaphone, // Changed to Megaphone for Announcements
  LogOut, 
  Triangle,
  Settings,
  ShieldCheck
} from 'lucide-react';
import './AdminSidebar.css';

export default function AdminSidebar() {
  const location = useLocation();

  // Helper to check if the current path matches the link
  const isActive = (path) => location.pathname === path;

  // --- LOGOUT LOGIC ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/'; 
  };

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="brand">
          <Triangle size={24} fill="#fbbf24" color="#fbbf24" style={{ transform: 'rotate(180deg)' }}/>
          <h1 className="brand-title" style={{marginLeft: '10px', color: 'white', fontWeight: 'bold'}}>ABACUS ADMIN</h1>
        </div>
      </div>

      <nav className="nav-menu">
        {/* DASHBOARD LINK */}
        <Link 
          to="/admin/AdminDashboard" 
          className={`nav-item ${isActive('/admin/AdminDashboard') ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {/* MANAGE ACADEMIC SETUP LINK */}
        <Link 
          to="/admin/ManageAcademicSetup" 
          className={`nav-item ${isActive('/admin/ManageAcademicSetup') ? 'active' : ''}`}
        >
          <Settings size={20} />
          <span>Academic Setup</span>
        </Link>

        {/* MANAGE INSTRUCTORS LINK */}
        <Link 
          to="/admin/ManageInstructors" 
          className={`nav-item ${isActive('/admin/ManageInstructors') ? 'active' : ''}`}
        >
          <GraduationCap size={20} />
          <span>Manage Instructors</span>
        </Link>

        {/* MANAGE STUDENTS LINK */}
        <Link 
          to="/admin/ManageStudents" 
          className={`nav-item ${isActive('/admin/ManageStudents') ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Manage Students</span>
        </Link>

        {/* MANAGE PROMOTIONS LINK */}
        <Link 
          to="/admin/ManageWhitelist" 
          className={`nav-item ${isActive('/admin/ManageWhitelist') ? 'active' : ''}`}
        >
          <Users size={20} />
          <span>Manage Whitelist</span>
        </Link>

        {/* MANAGE ANNOUNCEMENTS LINK */}
        <Link 
          to="/admin/ManageAnnouncements" 
          className={`nav-item ${isActive('/admin/ManageAnnouncements') ? 'active' : ''}`}
        >
          <Megaphone size={20} /> 
          <span>Manage Announcements</span>
        </Link>

        {/* MANAGE PROMOTIONS LINK */}
        <Link 
          to="/admin/ManagePromotions" 
          className={`nav-item ${isActive('/admin/ManagePromotions') ? 'active' : ''}`}
        >
          <ShieldCheck size={20} />
          <span>Verify Promotions</span>
        </Link>

      </nav>

      {/* Footer / Logout */}
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}