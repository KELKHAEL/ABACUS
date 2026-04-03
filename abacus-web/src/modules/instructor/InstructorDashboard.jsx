import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, FileText, ArrowRight, BarChart2, Activity, Megaphone, History, Maximize2, X, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Instructor.css';

export default function InstructorDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [studentCount, setStudentCount] = useState(0); 
  const [announcements, setAnnouncements] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  
  // Analytics States
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [allGrades, setAllGrades] = useState([]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [chartViewMode, setChartViewMode] = useState('active'); // 'active' or 'archived'
  const [chartClassFilter, setChartClassFilter] = useState('ALL'); // Filters by specific class
  const [showChartModal, setShowChartModal] = useState(false);
  
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);
      setUserName(user.fullName || "Instructor");

      // Set Assigned Classes for the Dropdown Filter
      if (user.assigned_classes) {
          const parsed = typeof user.assigned_classes === 'string' ? JSON.parse(user.assigned_classes) : user.assigned_classes;
          const finalClasses = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
          setAssignedClasses(Array.isArray(finalClasses) ? finalClasses : []);
      }

      // 1. Fetch Dashboard basic stats
      const res = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
      const data = await res.json();
      
      if (!data.error) {
          setAssignedStudents(data.students || []);
          setStudentCount((data.students || []).length);
          setQuizzes(data.quizzes || []);
      }

      // 2. Fetch Announcements
      try {
          const annRes = await fetch(`http://localhost:5000/announcements/admin-to-instructor/${user.id}`);
          const annData = await annRes.json();
          setAnnouncements(annData || []);
      } catch (err) { console.error("Could not load announcements:", err); }

      // 3. Fetch Grades for Analytics
      try {
          const gradesRes = await fetch('http://localhost:5000/grades');
          const gradesData = await gradesRes.json();
          setAllGrades(gradesData || []);
      } catch (err) { console.error("Could not process grades:", err); }

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const activeQuizzes = quizzes.filter(q => (q.status === 'active' || !q.status) && !q.is_archived);
  const archivedQuizzes = quizzes.filter(q => q.is_archived && q.status !== 'deleted');

  // --- DYNAMIC CHART DATA GENERATION ---
  const targetQuizzes = chartViewMode === 'active' ? activeQuizzes : archivedQuizzes;
  
  const currentChartData = targetQuizzes.filter(q => {
      // Step 1: Only include quizzes that apply to the selected class filter
      if (chartClassFilter === 'ALL') return true;
      return q.target_year === 'ALL' || `${q.target_year}-${q.target_section}` === chartClassFilter;
  }).map(quiz => {
      // Step 2: Determine exactly which students should be counted based on the filter
      let filteredStudentsInClass = [];
      
      if (chartClassFilter === 'ALL') {
          if (quiz.target_year === 'ALL') {
              filteredStudentsInClass = assignedStudents;
          } else {
              filteredStudentsInClass = assignedStudents.filter(s => 
                  String(s.year_level) === String(quiz.target_year) && 
                  String(s.section) === String(quiz.target_section)
              );
          }
      } else {
          // If viewing a specific class, strictly count ONLY students in that class (Even if quiz is "ALL")
          const [fYear, fSec] = chartClassFilter.split('-');
          filteredStudentsInClass = assignedStudents.filter(s => 
              String(s.year_level) === String(fYear) && 
              String(s.section) === String(fSec)
          );
      }

      // Step 3: Check how many of those specific students submitted grades
      let participatingStudentIds = new Set();
      filteredStudentsInClass.forEach(student => {
          const hasTaken = allGrades.some(g => 
              g.user_id === student.id && 
              g.quiz_id === quiz.id && 
              g.is_archived === (chartViewMode === 'archived' ? 1 : 0)
          );
          if (hasTaken) participatingStudentIds.add(student.id);
      });

      return {
          name: quiz.title.length > 12 ? quiz.title.substring(0, 12) + '...' : quiz.title,
          fullTitle: quiz.title,
          targetStudents: filteredStudentsInClass.length,
          taken: participatingStudentIds.size,
          targetLabel: chartClassFilter === 'ALL' 
              ? (quiz.target_year === 'ALL' ? 'All Classes' : `Yr ${quiz.target_year}-S${quiz.target_section}`)
              : `Yr ${chartClassFilter.replace('-', '-S')}`
      };
  });


  // Custom Tooltip for the Recharts BarChart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: 'white', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#111', fontSize: '14px' }}>{data.fullTitle}</p>
          <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '12px', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
              Target: {data.targetLabel}
          </p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
              <span style={{ color: '#3b82f6', fontSize: '13px', fontWeight: '600' }}>Target Students: {data.targetStudents}</span>
              <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '600' }}>Submitted: {data.taken}</span>
          </div>
        </div>
      );
    }
    return null;
  };

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

      {/* BOTTOM SECTION: ANALYTICS & ANNOUNCEMENTS */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* --- ANALYTICS BAR GRAPH SECTION --- */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <h3 style={{ fontSize: '18px', color: '#111', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BarChart2 size={20} color="#104a28"/> Quiz Analytics
                </h3>
                
                {/* View Mode Toggle */}
                <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '8px', padding: '4px' }}>
                    <button 
                      onClick={() => setChartViewMode('active')} 
                      style={{ border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', background: chartViewMode === 'active' ? 'white' : 'transparent', color: chartViewMode === 'active' ? '#111' : '#6b7280' }}
                    >
                      Current Term
                    </button>
                    <button 
                      onClick={() => setChartViewMode('archived')} 
                      style={{ border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', background: chartViewMode === 'archived' ? 'white' : 'transparent', color: chartViewMode === 'archived' ? '#111' : '#6b7280' }}
                    >
                      Past Terms
                    </button>
                </div>
                
                {/* Specific Section Filter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f8fafc', padding: '4px 10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <Filter size={14} color="#64748b"/>
                    <select 
                        value={chartClassFilter} 
                        onChange={(e) => setChartClassFilter(e.target.value)}
                        style={{ border: 'none', background: 'transparent', fontSize: '12px', fontWeight: 'bold', color: '#334155', outline: 'none', cursor: 'pointer' }}
                    >
                        <option value="ALL">All Assigned Classes</option>
                        {assignedClasses.map((cls, idx) => (
                            <option key={idx} value={`${cls.year}-${cls.section}`}>
                                Year {cls.year} - Sec {cls.section}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            
            <button 
                onClick={() => setShowChartModal(true)}
                style={{ background: '#f3f4f6', border: 'none', padding: '6px 12px', borderRadius: '6px', color: '#4b5563', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
            >
                <Maximize2 size={14} /> Full Screen
            </button>
          </div>

          <div style={{ height: '300px', width: '100%' }}>
            {currentChartData.length === 0 ? (
                <div style={{ height: '100%', background: '#f9fafb', borderRadius: '12px', border: '1px dashed #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={40} color="#d1d5db" style={{ marginBottom: '15px' }} />
                    <p style={{ color: '#6b7280', fontWeight: '500', fontSize: '14px' }}>
                        No {chartViewMode === 'active' ? 'active' : 'archived'} quizzes found for this filter.
                    </p>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentChartData} margin={{ top: 30, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis dataKey="name" tick={{fontSize: 11, fill: '#6b7280'}} axisLine={false} tickLine={false} />
                        <YAxis allowDecimals={false} tick={{fontSize: 12, fill: '#6b7280'}} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}}/>
                        <Legend wrapperStyle={{fontSize: '12px', paddingTop: '10px'}}/>
                        <Bar dataKey="targetStudents" name="Enrolled Students" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={25} label={{ position: 'top', fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                        <Bar dataKey="taken" name="Submitted" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} label={{ position: 'top', fill: '#059669', fontSize: 11, fontWeight: 'bold' }} />
                    </BarChart>
                </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* --- ADMIN ANNOUNCEMENTS SECTION --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '25px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', flex: 1, maxHeight: '410px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', color: '#111', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Megaphone size={18} color="#d32f2f"/> Admin Inbox
                </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
               {announcements.length > 0 ? (
                   announcements.slice(0, 4).map((item) => (
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

      {/* --- FULL SCREEN CHART MODAL --- */}
      {showChartModal && (
          <div className="modal-overlay" onClick={() => setShowChartModal(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()} style={{ width: '95vw', maxWidth: '1200px', padding: 0, overflow: 'hidden' }}>
                  <div style={{ background: '#104a28', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h2 style={{ margin: 0, color: 'white', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <BarChart2 size={24}/> Quiz Analytics (Full View)
                      </h2>
                      <button onClick={() => setShowChartModal(false)} style={{ background: 'none', border: 'none', color: '#a7f3d0', cursor: 'pointer' }}><X size={24}/></button>
                  </div>
                  
                  <div style={{ padding: '40px 40px 60px 40px', height: '75vh', minHeight: '500px', overflowX: 'auto' }}>
                      <div style={{ minWidth: `${Math.max(currentChartData.length * 100, 600)}px`, height: '100%' }}>
                          <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={currentChartData} margin={{ top: 30, right: 30, left: 0, bottom: 20 }}>
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                  <XAxis dataKey="name" tick={{fontSize: 13, fill: '#4b5563'}} axisLine={false} tickLine={false} dy={10} />
                                  <YAxis allowDecimals={false} tick={{fontSize: 13, fill: '#4b5563'}} axisLine={false} tickLine={false} />
                                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc'}} />
                                  <Legend wrapperStyle={{fontSize: '14px', paddingTop: '20px'}}/>
                                  <Bar dataKey="targetStudents" name="Enrolled Students" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={40} label={{ position: 'top', fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                                  <Bar dataKey="taken" name="Submitted" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} label={{ position: 'top', fill: '#059669', fontSize: 12, fontWeight: 'bold' }} />
                              </BarChart>
                          </ResponsiveContainer>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
}

const boxStyle = (color) => ({ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', borderLeft: `6px solid ${color}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' });
const titleStyle = { color: '#6b7280', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' };
const numberStyle = { fontSize: '42px', fontWeight: 'bold', color: '#1f2937' };
const linkStyle = (color) => ({ fontSize:'13px', color, marginTop:'8px', display:'flex', alignItems:'center', fontWeight: '600' });
const iconBgStyle = (bg) => ({ background: bg, padding: '16px', borderRadius: '16px' });