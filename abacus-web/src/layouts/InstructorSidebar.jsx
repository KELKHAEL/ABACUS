import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Removed useNavigate
import { LayoutDashboard, FilePlus, BookOpen, Users,LogOut, Triangle } from 'lucide-react';
import './InstructorSidebar.css'; 

export default function InstructorSidebar() {
  const location = useLocation();
  // const navigate = useNavigate(); <--- No longer needed

  const isActive = (path) => location.pathname === path;

  // --- LOGOUT LOGIC (Fixed) ---
  const handleLogout = () => {
    // 1. Clear Data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. FORCE RELOAD to clear React State immediately
    window.location.href = '/login'; 
  };

  return (
    <aside className="sidebar">
      {/* BRAND HEADER */}
      <div className="brand" style={{ marginBottom: '40px', padding: '0 10px' }}>
        <Triangle 
          size={24} 
          fill="#FFC107" 
          color="#FFC107" 
          style={{transform: 'rotate(180deg)'}} 
        />
        <span className="brand-text" style={{ marginLeft: '10px', fontWeight: 'bold', color: 'white' }}>
          ABACUS INSTRUCTOR
        </span>
      </div>

      <nav className="nav-menu">
        {/* DASHBOARD LINK */}
        <Link 
          to="/instructor/InstructorDashboard" 
          className={`nav-item ${isActive('/instructor/InstructorDashboard') ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>

        {/* MY CLASS LIST LINK */}
        <Link 
          to="/instructor/MyClassList" 
          className={`nav-item ${isActive('/instructor/MyClassList') ? 'active' : ''}`}>
          <Users size={20} />
          <span>My Class List</span>
        </Link>

        {/* CREATE QUIZ LINK */}
        <Link 
          to="/instructor/CreateQuiz" 
          className={`nav-item ${isActive('/instructor/CreateQuiz') ? 'active' : ''}`}
        >
          <FilePlus size={20} />
          <span>Create Quiz</span>
        </Link>

        {/* GRADEBOOK LINK */}
        <Link 
          to="/instructor/Gradebook" 
          className={`nav-item ${isActive('/instructor/Gradebook') ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          <span>Gradebook</span>
        </Link>
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="logout-container" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}