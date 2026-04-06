import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { LayoutDashboard, FilePlus, BookOpen, Users, LogOut, Triangle, UploadCloud, Megaphone, List, ShieldCheck } from 'lucide-react';
import './InstructorSidebar.css'; 

export default function InstructorSidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; 
  };

  return (
    <aside className="sidebar">
      <div className="brand" style={{ marginBottom: '40px', padding: '0 10px' }}>
        <Triangle size={24} fill="#FFC107" color="#FFC107" style={{transform: 'rotate(180deg)'}} />
        <span className="brand-text" style={{ marginLeft: '10px', fontWeight: 'bold', color: 'white' }}>
          ABACUS INSTRUCTOR
        </span>
      </div>

      <nav className="nav-menu">
        <Link to="/instructor/InstructorDashboard" className={`nav-item ${isActive('/instructor/InstructorDashboard') ? 'active' : ''}`}>
          <LayoutDashboard size={20} /><span>Dashboard</span>
        </Link>

        <Link to="/instructor/MyClassList" className={`nav-item ${isActive('/instructor/MyClassList') ? 'active' : ''}`}>
          <Users size={20} /><span>My Class List</span>
        </Link>

        {/* --- NEW: Manage Quizzes --- */}
        <Link to="/instructor/ManageQuizzes" className={`nav-item ${isActive('/instructor/ManageQuizzes') ? 'active' : ''}`}>
          <List size={20} /><span>Manage Quizzes</span>
        </Link>

        <Link to="/instructor/CreateQuiz" className={`nav-item ${isActive('/instructor/CreateQuiz') ? 'active' : ''}`}>
          <FilePlus size={20} /><span>Create Quiz</span>
        </Link>

        <Link to="/instructor/Gradebook" className={`nav-item ${isActive('/instructor/Gradebook') ? 'active' : ''}`}>
          <BookOpen size={20} /><span>Gradebook</span>
        </Link>

        <Link to="/instructor/UploadModules" className={`nav-item ${isActive('/instructor/UploadModules') ? 'active' : ''}`}>
          <UploadCloud size={20} /><span>Upload Modules</span>
        </Link>
      
        <Link to="/instructor/Announcements" className={`nav-item ${isActive('/instructor/Announcements') ? 'active' : ''}`}>
          <Megaphone size={20} /><span>Announcements</span>
        </Link>

        <Link to="/instructor/InstructorPromotions" className={`nav-item ${isActive('/instructor/InstructorPromotions') ? 'active' : ''}`}>
          <ShieldCheck size={20} /><span>Promotions</span>
        </Link>
      </nav>

      <div className="logout-container" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /><span>Logout</span>
        </button>
      </div>
    </aside>
  );
}