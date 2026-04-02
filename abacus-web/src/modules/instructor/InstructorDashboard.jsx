import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, FileText, ArrowRight, BarChart2, Activity, Megaphone, History } from 'lucide-react';
import './Instructor.css';

export default function InstructorDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [studentCount, setStudentCount] = useState(0); 
  const [announcements, setAnnouncements] = useState([]); 
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

      const res = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
      const data = await res.json();
      if (!data.error) {
          setStudentCount(data.students ? data.students.length : 0);
          setQuizzes(data.quizzes || []);
      }

      try {
          const annRes = await fetch(`http://localhost:5000/announcements/instructor/${user.id}`);
          const annData = await annRes.json();
          if (Array.isArray(annData)) {
              const adminAnnounces = annData.filter(a => a.author_role === 'ADMIN' || a.author_role === 'Admin');
              setAnnouncements(adminAnnounces.length > 0 ? adminAnnounces : annData);
          }
      } catch (err) { console.error("Could not load announcements:", err); }

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  // ✅ Splitting Active vs Archived!
  const activeQuizzes = quizzes.filter(q => (q.status === 'active' || !q.status) && !q.is_archived);
  const archivedQuizzes = quizzes.filter(q => q.is_archived && q.status !== 'deleted');

  return (
    <div className="instructor-dashboard-container">
      
      <div style={{ marginBottom: '35px', marginTop: '10px' }}>
        <h2 style={{ fontSize: '32px', color: '#104a28', fontWeight: '800', margin: '0 0 8px 0' }}>Welcome back, {userName}!</h2>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>Here is an overview of your current classes and academic history.</p>
      </div>

      {loading ? (
        <div className="loading-state"><div className="spinner"></div></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          <div style={boxStyle('#3b82f6')} onClick={() => navigate('/instructor/MyClassList')}>
              <div>
                  <h4 style={titleStyle}>Total Enrolled</h4>
                  <span style={numberStyle}>{studentCount}</span>
                  <div style={linkStyle('#3b82f6')}>View Class List <ArrowRight size={14} style={{marginLeft:'4px'}}/></div>
              </div>
              <div style={iconBgStyle('#eff6ff')}><Users size={32} color="#3b82f6" /></div>
          </div>

          <div style={boxStyle('#eab308')} onClick={() => navigate('/instructor/ManageQuizzes')}>
              <div>
                  <h4 style={titleStyle}>Active Quizzes</h4>
                  <span style={numberStyle}>{activeQuizzes.length}</span>
                  <div style={linkStyle('#eab308')}>Manage Quizzes <ArrowRight size={14} style={{marginLeft:'4px'}}/></div>
              </div>
              <div style={iconBgStyle('#fefce8')}><FileText size={32} color="#eab308" /></div>
          </div>

          <div style={boxStyle('#8b5cf6')} onClick={() => navigate('/instructor/ManageQuizzes')}>
              <div>
                  <h4 style={titleStyle}>Archived History</h4>
                  <span style={numberStyle}>{archivedQuizzes.length}</span>
                  <div style={linkStyle('#8b5cf6')}>View Archives <ArrowRight size={14} style={{marginLeft:'4px'}}/></div>
              </div>
              <div style={iconBgStyle('#f5f3ff')}><History size={32} color="#8b5cf6" /></div>
          </div>
          
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', color: '#111', display: 'flex', alignItems: 'center', gap: '10px' }}><BarChart2 size={20} color="#104a28"/> Class Performance Overview</h3>
            <span style={{ fontSize: '12px', background: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', color: '#6b7280', fontWeight: 'bold' }}>COMING SOON</span>
          </div>
          <div style={{ height: '250px', background: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={48} color="#d1d5db" style={{ marginBottom: '15px' }} />
            <p style={{ color: '#6b7280', fontWeight: '500' }}>Analytics Dashboard is under construction.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', flex: 1, maxHeight: '350px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', color: '#111', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}><Megaphone size={18} color="#d32f2f"/> Admin Announcements</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {announcements.length > 0 ? (
                   announcements.slice(0, 3).map((item) => (
                       <div key={item.id} style={{ padding: '12px', background: '#f9fafb', borderRadius: '8px', borderLeft: '3px solid #d32f2f' }}>
                           <strong style={{ display: 'block', fontSize: '14px', color: '#1f2937', marginBottom: '4px', lineHeight: '1.4' }}>{item.title}</strong>
                           <span style={{ fontSize: '11px', color: '#6b7280' }}>{new Date(item.created_at).toLocaleDateString()}</span>
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

// Inline styles to clean up JSX
const boxStyle = (color) => ({ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', borderLeft: `6px solid ${color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' });
const titleStyle = { color: '#6b7280', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' };
const numberStyle = { fontSize: '42px', fontWeight: 'bold', color: '#1f2937' };
const linkStyle = (color) => ({ fontSize:'13px', color, marginTop:'8px', display:'flex', alignItems:'center', fontWeight: '600' });
const iconBgStyle = (bg) => ({ background: bg, padding: '16px', borderRadius: '16px' });