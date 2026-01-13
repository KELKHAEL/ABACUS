import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseWeb';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Manage Students', path: '/students' },
    { name: 'Manage Grades', path: '/grades' },
    { name: 'Manage Instructors', path: '/instructors' },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        <span style={{color: '#eab308'}}>▲</span> ABACUS ADMIN
      </div>

      <nav style={{flex: 1}}>
        {menuItems.map((item) => (
          <div 
            key={item.name}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </div>
        ))}
      </nav>

      <div className="nav-link" onClick={handleLogout} style={{marginTop: 'auto', color: '#fca5a5'}}>
        Logout ➜
      </div>
    </div>
  );
}