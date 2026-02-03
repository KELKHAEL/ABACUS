import React from 'react';
import { LayoutDashboard, FilePlus, BookOpen, LogOut, Triangle } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, handleLogout }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Triangle className="brand-icon" fill="#FFC107" color="#FFC107" style={{transform: 'rotate(180deg)'}} />
        <span className="brand-text">ABACUS INSTRUCTOR</span>
      </div>

      <nav className="nav-menu">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'create' ? 'active' : ''}`} 
          onClick={() => setActiveTab('create')}
        >
          <FilePlus size={20} />
          <span>Create Quiz</span>
        </button>

        <button 
          className={`nav-item ${activeTab === 'grades' ? 'active' : ''}`} 
          onClick={() => setActiveTab('grades')}
        >
          <BookOpen size={20} />
          <span>Gradebook</span>
        </button>
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