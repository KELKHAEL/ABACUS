import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../firebaseWeb';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, FileChartColumn, CalendarDays, ArrowRight } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, loading: true });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Count Students
        const studentQuery = query(collection(db, "users"), where("role", "==", "STUDENT"));
        const studentSnapshot = await getDocs(studentQuery);
        
        // Count Instructors
        const teacherQuery = query(collection(db, "users"), where("role", "==", "TEACHER"));
        const teacherSnapshot = await getDocs(teacherQuery);
        
        const realTeachers = teacherSnapshot.docs.filter(doc => {
          const data = doc.data();
          return data.email && data.email.toLowerCase() !== "admin@cvsu.edu.ph";
        });

        setStats({ 
          students: studentSnapshot.size, 
          teachers: realTeachers.length,
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
        <div className="stat-card" onClick={() => navigate('/instructors')}>
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

        {/* STUDENTS CARD (Combined Count + Navigation if needed) */}
        <div className="stat-card" onClick={() => navigate('/Students')}>
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

        {/* GRADES CARD */}
        <div className="stat-card" onClick={() => navigate('/grades')}>
          <div className="card-header">
            <div className="icon-wrapper blue">
              <FileChartColumn size={24} color="#0056b3" />
            </div>
            <span className="card-label">Grades</span>
          </div>
          <div className="card-content">
            <h2 className="count-number">View</h2>
            <p className="stat-desc">Analytics & Records</p>
          </div>
          <div className="card-footer">
            <span>Check Grades</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* SEMESTER CARD (Highlight Card) */}
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