import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, Megaphone, CalendarDays, ArrowRight } from 'lucide-react'; // Changed Icon
import './AdminDashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, announcements: 0, loading: true });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // --- 1. Fetch Students ---
        const studentRes = await fetch('http://localhost:5000/users?role=STUDENT');
        const studentData = await studentRes.json();
        
        // --- 2. Fetch Instructors ---
        const teacherRes = await fetch('http://localhost:5000/users?role=INSTRUCTOR');
        const teacherData = await teacherRes.json();

        // --- 3. Fetch Announcements (NEW) ---
        const announceRes = await fetch('http://localhost:5000/announcements/all');
        const announceData = await announceRes.json();
        
        // --- 4. Update State ---
        setStats({ 
          students: Array.isArray(studentData) ? studentData.length : 0, 
          teachers: Array.isArray(teacherData) ? teacherData.length : 0,
          announcements: Array.isArray(announceData) ? announceData.length : 0,
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

        {/* ANNOUNCEMENTS CARD (REPLACED GRADES) */}
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

        {/* SEMESTER CARD */}
        <div className="stat-card highlight-card">
          <div className="card-header">
            <div className="icon-wrapper white">
              <CalendarDays size={24} color="#ffffff" />
            </div>
            <span className="card-label text-white">Academic Year</span>
          </div>
          <div className="card-content">
            <h2 className="count-number text-white">2025-2026</h2>
            <p className="stat-desc text-white-70">First Semester</p>
          </div>
          <div className="card-footer text-white">
            <span className="status-badge">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}