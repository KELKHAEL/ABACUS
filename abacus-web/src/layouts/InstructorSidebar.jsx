import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FilePlus, BookOpen, LogOut, Triangle } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseWeb';
import './InstructorSidebar.css'; // Make sure this points to your shared CSS

export default function InstructorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. FIX: Define the isActive helper function
  const isActive = (path) => location.pathname === path;

  // 2. FIX: Define handleLogout internally
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <Triangle 
          className="brand-icon" 
          fill="#FFC107" 
          color="#FFC107" 
          style={{transform: 'rotate(180deg)'}} 
        />
        <span className="brand-text">ABACUS INSTRUCTOR</span>
      </div>

      <nav className="nav-menu">
        {/* DASHBOARD LINK */}
        <Link 
          to="/instructor/InstructorDashboard" 
          // 3. FIX: Use lowercase paths to match the 'to' prop
          className={`nav-item ${isActive('/instructor/InstructorDashboard') ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
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

      <div className="logout-container">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}