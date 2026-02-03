import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebaseWeb'; // 1. Import auth
import { signOut } from 'firebase/auth'; // 2. Import signOut
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileChartColumn, 
  LogOut, 
  Triangle 
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if the path is active
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await signOut(auth); // 3. Actually sign out from Firebase
      navigate('/'); // App.jsx will detect the auth change and show Login automatically
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <Triangle size={24} fill="#fbbf24" color="#fbbf24" style={{ transform: 'rotate(180deg)' }}/>
        <h1 className="brand-title">ABACUS ADMIN</h1>
      </div>

      {/* Navigation */}
      <nav className="nav-links">
        
        <div 
          className={`nav-item ${isActive('/Dashboard') ? 'active' : ''}`} 
          onClick={() => navigate('/Dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div>

        <div 
          className={`nav-item ${isActive('/Students') ? 'active' : ''}`} 
          onClick={() => navigate('/Students')}
        >
          <GraduationCap size={20} />
          <span>Manage Students</span>
        </div>

        <div 
          className={`nav-item ${isActive('/Grades') ? 'active' : ''}`} 
          onClick={() => navigate('/Grades')}
        >
          <FileChartColumn size={20} />
          <span>Manage Grades</span>
        </div>

        <div 
          className={`nav-item ${isActive('/Instructors') ? 'active' : ''}`} 
          onClick={() => navigate('/Instructors')}
        >
          <Users size={20} />
          <span>Manage Instructors</span>
        </div>

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