import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from '../firebaseWeb';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, teachers: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Count Students
        const studentQuery = query(collection(db, "users"), where("role", "==", "STUDENT"));
        const studentSnapshot = await getDocs(studentQuery);
        const studentCount = studentSnapshot.size; // .size gives the count

        // Count Instructors
        const teacherQuery = query(collection(db, "users"), where("role", "==", "TEACHER"));
        const teacherSnapshot = await getDocs(teacherQuery);
        
        const realTeachers = teacherSnapshot.docs.filter(doc => {
          const data = doc.data();
          return data.email && data.email.toLowerCase() !== "admin@cvsu.edu.ph";
        });

        setStats({ 
          students: studentCount, 
          teachers: realTeachers.length 
        });

      } catch (error) { 
        console.error("Error fetching stats:", error); 
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="welcome-section">Welcome Admin!</h2>
      
      <div className="stats-grid">
        {/* STUDENTS CARD */}
        <div className="stat-card">
          <div>
            <h3>Student Grades</h3>
            <button className="card-btn" onClick={() => navigate('/grades')}>
              View
            </button>
          </div>
          <div style={{fontSize: '40px'}}>📊</div>
        </div>

        {/* INSTRUCTORS CARD */}
        <div className="stat-card">
          <div>
            <h3>View Users</h3>
            <button className="card-btn" onClick={() => navigate('/instructors')}>
              View
            </button>
          </div>
          <div style={{fontSize: '40px'}}>💻</div>
        </div>

        {/* SEMESTER CARD */}
        <div className="semester-card">
          <small>ACTIVE SEMESTER</small>
          <h2>A.Y. 2025-2026</h2>
          <p>FIRST Semester</p>
        </div>
      </div>

      {/* COUNTERS */}
      <div style={{marginTop: '50px', display: 'flex', gap: '50px', justifyContent: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={{fontSize: '60px', margin: 0, color: '#104a28'}}>{stats.teachers}</h1>
          <p style={{margin: 0, color: '#666'}}>Instructors Available</p>
        </div>
        <div style={{textAlign: 'center'}}>
          <h1 style={{fontSize: '60px', margin: 0, color: '#104a28'}}>{stats.students}</h1>
          <p style={{margin: 0, color: '#666'}}>Students Enrolled</p>
        </div>
      </div>
    </div>
  );
}