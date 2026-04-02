import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, FileText, ArrowRight, BarChart2, Activity, Megaphone
} from 'lucide-react';
import './Instructor.css';

export default function InstructorDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [studentCount, setStudentCount] = useState(0); 
  const [announcements, setAnnouncements] = useState([]); // NEW: State for announcements
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);
      setUserName(user.fullName || "Instructor");

      // 1. Fetch Dashboard Stats
      const res = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
      const data = await res.json();

      if (!data.error) {
          setStudentCount(data.students ? data.students.length : 0);
          setQuizzes(data.quizzes || []);
      }

      // 2. Fetch Admin Announcements
      try {
          const annRes = await fetch(`http://localhost:5000/announcements/instructor/${user.id}`);
          const annData = await annRes.json();
          if (Array.isArray(annData)) {
              // Filter to show only ADMIN announcements if needed, or just show what's returned
              const adminAnnounces = annData.filter(a => a.author_role === 'ADMIN' || a.author_role === 'Admin');
              setAnnouncements(adminAnnounces.length > 0 ? adminAnnounces : annData);
          }
      } catch (err) {
          console.error("Could not load announcements:", err);
      }

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const activeQuizzes = quizzes.filter(q => q.status === 'active' || !q.status);

  return (
    <div className="instructor-dashboard-container">
      
      {/* WELCOME BANNER - Fixed alignment by removing the conflicting CSS class */}
      <div style={{ marginBottom: '35px', marginTop: '10px' }}>
        <h2 style={{ fontSize: '32px', color: '#104a28', fontWeight: '800', margin: '0 0 8px 0' }}>
            Welcome back, {userName}!
        </h2>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
            Here is an overview of your classes and assessments.
        </p>
      </div>

      {/* STATS OVERVIEW - Adjusted to 2 columns */}
      {loading ? (
        <div className="loading-state"><div className="spinner"></div></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
          
          {/* Students Box */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #e5e7eb', borderLeft: '6px solid #3b82f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/instructor/MyClassList')} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div>
                  <h4 style={{ color: '#6b7280', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Total Enrolled</h4>
                  <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#1f2937' }}>{studentCount}</span>
                  <div style={{fontSize:'13px', color:'#3b82f6', marginTop:'8px', display:'flex', alignItems:'center', fontWeight: '600'}}>
                      View Class List <ArrowRight size={14} style={{marginLeft:'4px'}}/>
                  </div>
              </div>
              <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '16px' }}>
                  <Users size={32} color="#3b82f6" />
              </div>
          </div>

          {/* Active Quizzes Box */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #e5e7eb', borderLeft: '6px solid #eab308', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => navigate('/instructor/ManageQuizzes')} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div>
                  <h4 style={{ color: '#6b7280', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Active Quizzes</h4>
                  <span style={{ fontSize: '42px', fontWeight: 'bold', color: '#1f2937' }}>{activeQuizzes.length}</span>
                  <div style={{fontSize:'13px', color:'#eab308', marginTop:'8px', display:'flex', alignItems:'center', fontWeight: '600'}}>
                      Manage Quizzes <ArrowRight size={14} style={{marginLeft:'4px'}}/>
                  </div>
              </div>
              <div style={{ background: '#fefce8', padding: '16px', borderRadius: '16px' }}>
                  <FileText size={32} color="#eab308" />
              </div>
          </div>
          
        </div>
      )}

      {/* DASHBOARD WIDGETS */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Main Analytics Area */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#111', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BarChart2 size={20} color="#104a28"/> Class Performance Overview
            </h3>
            <span style={{ fontSize: '12px', background: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', color: '#6b7280', fontWeight: 'bold' }}>COMING SOON</span>
          </div>
          
          <div style={{ height: '250px', background: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={48} color="#d1d5db" style={{ marginBottom: '15px' }} />
            <p style={{ color: '#6b7280', fontWeight: '500' }}>Analytics Dashboard is under construction.</p>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginTop: '5px' }}>Student quiz scores and progress charts will appear here.</p>
          </div>
        </div>

        {/* Side Widget Area: Admin Announcements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', flex: 1, maxHeight: '350px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', color: '#111', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Megaphone size={18} color="#d32f2f"/> Admin Announcements
                </h3>
                <button onClick={() => navigate('/instructor/Announcements')} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                    View All
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {announcements.length > 0 ? (
                   announcements.slice(0, 3).map((item) => (
                       <div key={item.id} style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px', borderLeft: '3px solid #d32f2f' }}>
                           <strong style={{ display: 'block', fontSize: '14px', color: '#1f2937', marginBottom: '4px', lineHeight: '1.4' }}>
                               {item.title}
                           </strong>
                           <span style={{ fontSize: '11px', color: '#6b7280' }}>
                               {new Date(item.created_at).toLocaleDateString()}
                           </span>
                       </div>
                   ))
               ) : (
                   <div style={{ fontSize: '13px', color: '#6b7280', padding: '16px', background: '#f9fafb', borderRadius: '8px', textAlign: 'center', border: '1px dashed #d1d5db' }}>
                     No recent announcements from the Admin.
                   </div>
               )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}