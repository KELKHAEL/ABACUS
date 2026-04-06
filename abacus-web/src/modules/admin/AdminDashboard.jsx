import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, Megaphone, CalendarDays, ArrowRight } from 'lucide-react'; 
import './AdminDashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({ 
      students: 0, 
      teachers: 0, 
      announcements: 0, 
      activeTerm: { school_year: 'Loading...', semester: 'Loading...' },
      loading: true 
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ✅ OPTIMIZATION: Fetch all data simultaneously to make the dashboard load instantly
        const [studentRes, teacherRes, announceRes, setupRes] = await Promise.all([
            fetch('http://localhost:5000/users?role=STUDENT'),
            fetch('http://localhost:5000/users?role=INSTRUCTOR'),
            fetch('http://localhost:5000/announcements/all'),
            fetch('http://localhost:5000/academic-setup')
        ]);

        const studentData = await studentRes.json();
        const teacherData = await teacherRes.json();
        const announceData = await announceRes.json();
        const setupData = await setupRes.json();

        // ✅ DYNAMIC TERM LOGIC: Find the active term from the database
        let currentTerm = { school_year: 'Not Set', semester: 'Not Set' };
        if (!setupData.error && setupData.terms) {
            const active = setupData.terms.find(t => t.is_active === 1 || t.is_active === true);
            if (active) {
                currentTerm = { school_year: active.school_year, semester: active.semester };
            }
        }

        // --- Update State ---
        setStats({ 
          students: Array.isArray(studentData) ? studentData.length : 0, 
          teachers: Array.isArray(teacherData) ? teacherData.length : 0,
          announcements: Array.isArray(announceData) ? announceData.length : 0,
          activeTerm: currentTerm,
          loading: false
        });

      } catch (error) { 
        console.error("Error fetching stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1 className="welcome-title">Welcome back, Admin!</h1>
          <p className="welcome-subtitle">Here is what's happening at ABACUS today.</p>
        </div>
        <div className="date-display">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>
      
      <div className="stats-grid">
        {/* INSTRUCTORS CARD */}
        <div className="stat-card" onClick={() => navigate('/admin/ManageInstructors')}>
          <div className="card-header">
            <div className="icon-wrapper green">
              <Users size={24} color="#104a28" />
            </div>
            <span className="card-label">Instructors</span>
          </div>
          <div className="card-content">
            <h2 className="count-number">
              {stats.loading ? "..." : stats.teachers}
            </h2>
            <p className="stat-desc">Active faculty members</p>
          </div>
          <div className="card-footer">
            <span>Manage Instructors</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* STUDENTS CARD */}
        <div className="stat-card" onClick={() => navigate('/admin/ManageStudents')}>
          <div className="card-header">
            <div className="icon-wrapper gold">
              <GraduationCap size={24} color="#bfa100" />
            </div>
            <span className="card-label">Students</span>
          </div>
          <div className="card-content">
            <h2 className="count-number">
                {stats.loading ? "..." : stats.students}
            </h2>
            <p className="stat-desc">Total enrolled students</p>
          </div>
          <div className="card-footer">
            <span>View All Students</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* ANNOUNCEMENTS CARD */}
        <div className="stat-card" onClick={() => navigate('/admin/ManageAnnouncements')}>
          <div className="card-header">
            <div className="icon-wrapper red">
              <Megaphone size={24} color="#d32f2f" />
            </div>
            <span className="card-label">Announcements</span>
          </div>
          <div className="card-content">
            <h2 className="count-number">
                {stats.loading ? "..." : stats.announcements}
            </h2>
            <p className="stat-desc">Generated updates</p>
          </div>
          <div className="card-footer">
            <span>Manage Content</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* SEMESTER CARD (NOW DYNAMIC) */}
        <div className="stat-card highlight-card" onClick={() => navigate('/admin/ManageAcademicSetup')} style={{cursor: 'pointer'}}>
          <div className="card-header">
            <div className="icon-wrapper white">
              <CalendarDays size={24} color="#ffffff" />
            </div>
            <span className="card-label text-white">Academic Year</span>
          </div>
          <div className="card-content">
            <h2 className="count-number text-white">
                {stats.loading ? "..." : stats.activeTerm.school_year}
            </h2>
            <p className="stat-desc text-white-70">
                {stats.loading ? "..." : stats.activeTerm.semester}
            </p>
          </div>
          <div className="card-footer text-white">
            <span className="status-badge">Active</span>
            <ArrowRight size={16} color="#ffffff" />
          </div>
        </div>
      </div>
    </div>
  );
}