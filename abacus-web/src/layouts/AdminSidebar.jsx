import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth } from '../firebaseWeb';
import { signOut } from 'firebase/auth';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  LogOut, 
  Triangle 
} from 'lucide-react';
import './AdminSidebar.css';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check if the current path matches the link
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
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