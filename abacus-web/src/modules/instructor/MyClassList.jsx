import React, { useState, useEffect, useMemo } from "react";
import { Search, Filter, User, Mail, MoreHorizontal, ArrowLeft, Info, UserPlus, AlertCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import './Instructor.css';

export default function MyClassList() {
  const [myStudents, setMyStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [filterProgram, setFilterProgram] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterSection, setFilterSection] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);

      const res = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      setMyStudents(data.students || []);

    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleStatusChange = async (studentId, newStatus) => {
    if(!window.confirm(`Change this student's status to ${newStatus}?`)) return;
    try {
        const res = await fetch(`http://localhost:5000/users/${studentId}/student-status`, {
            method: 'PATCH', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
            setMyStudents(prev => prev.map(s => s.id === studentId ? {...s, status: newStatus} : s));
        } else { alert("Failed to update status: " + data.error); }
    } catch (error) { alert("Server error while updating status."); }
  };

  // ✅ DYNAMIC DROPDOWN GENERATORS
  const uniquePrograms = ['All', ...new Set(myStudents.map(s => s.program || 'BSIT'))];
  const uniqueYears = ['All', ...new Set(myStudents.map(s => s.year_level))].sort();
  const uniqueSections = ['All', ...new Set(myStudents.map(s => s.section))].sort();

  const filteredStudents = myStudents.filter(student => {
    const matchProgram = filterProgram === 'All' || (student.program || 'BSIT') === filterProgram;
    const matchYear = filterYear === 'All' || String(student.year_level) === String(filterYear);
    const matchSection = filterSection === 'All' || String(student.section) === String(filterSection);
    const matchSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        student.student_id.includes(searchTerm);
    return matchProgram && matchYear && matchSection && matchSearch;
  });

  // Check if filters are actively applied
  const isFiltering = filterProgram !== 'All' || filterYear !== 'All' || filterSection !== 'All' || searchTerm !== '';

  return (
    <div className="instructor-dashboard-container">
      <div className="page-header" style={{marginBottom: '20px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
            <button className="btn-icon-small" onClick={() => navigate(-1)}><ArrowLeft size={20}/></button>
            <div>
                <h1 className="page-title" style={{margin: 0}}>My Class Masterlist</h1>
                <p style={{color: '#64748b', margin: '5px 0 0 0', fontSize: '14px'}}>
                    Manage your officially enrolled students for the current active semester.
                </p>
            </div>
        </div>
      </div>

      {/* ✅ NEW: EDUCATIONAL BANNER ABOUT TERM ROLLOVER */}
      <div style={{ background: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '12px', padding: '16px 20px', display: 'flex', gap: '15px', alignItems: 'flex-start', marginBottom: '25px' }}>
          <Info size={24} color="#0284c7" style={{marginTop: '2px'}}/>
          <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#0369a1', fontSize: '15px' }}>How the Masterlist Works</h4>
              <p style={{ margin: 0, color: '#334155', fontSize: '13px', lineHeight: '1.5' }}>
                  This list only displays students who have been <strong>officially verified</strong> for your assigned classes this semester. 
                  When a new Academic Term starts, this list will clear out until students upload their new Certificate of Registration (COR).
              </p>
          </div>
      </div>

      {/* FILTER BAR */}
      {myStudents.length > 0 && (
          <div className="gb-filters-card" style={{marginBottom: '25px', flexDirection: 'row', alignItems: 'center'}}>
            <div className="filter-title" style={{marginRight: '15px'}}>
                <Filter size={18} color="#eab308"/> 
                <span>Filters:</span>
            </div>
            <div className="filters-content" style={{flex: 1}}>
                <div className="search-box" style={{flex: 2}}>
                    <Search size={18} color="#666" />
                    <input placeholder="Search by Name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                <select className="gb-select" value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
                    {uniquePrograms.map(p => <option key={p} value={p}>{p === 'All' ? 'All Programs' : p.replace('Bachelor of Science in', 'BS')}</option>)}
                </select>
                <select className="gb-select" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                    {uniqueYears.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : `Year ${y}`}</option>)}
                </select>
                <select className="gb-select" value={filterSection} onChange={e => setFilterSection(e.target.value)}>
                    {uniqueSections.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sections' : `Section ${s}`}</option>)}
                </select>
                {isFiltering && (
                    <button onClick={() => {setFilterYear('All'); setFilterSection('All'); setFilterProgram('All'); setSearchTerm('');}} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold'}}>Clear</button>
                )}
            </div>
          </div>
      )}

      <div className="class-list-card">
        {loading ? (
            <div className="loading-state"><div className="spinner"></div><p>Loading masterlist...</p></div>
        ) : myStudents.length === 0 ? (
            // ✅ NEW: SMART EMPTY STATE FOR NEW SEMESTERS
            <div style={{ padding: '60px 20px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', border: '2px dashed #e2e8f0' }}>
                <Users size={64} color="#94a3b8" style={{ marginBottom: '15px' }} />
                <h3 style={{ margin: '0 0 10px 0', color: '#334155', fontSize: '20px' }}>Your Masterlist is Empty</h3>
                <p style={{ margin: '0 auto 25px auto', color: '#64748b', fontSize: '15px', maxWidth: '500px', lineHeight: '1.6' }}>
                    You currently have no officially enrolled students. If a new semester just started, your students might still be waiting in the verification queue!
                </p>
                <button 
                    onClick={() => navigate('/instructor/promotions')} 
                    style={{ background: '#104a28', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px rgba(16, 74, 40, 0.2)' }}
                >
                    <UserPlus size={18} /> Go to Pending Verifications
                </button>
            </div>
        ) : filteredStudents.length === 0 && isFiltering ? (
            <div className="empty-table-state">
                <AlertCircle size={40} color="#cbd5e1" style={{marginBottom: '10px'}}/>
                <p>No students found matching your specific filters.</p>
                <button onClick={() => {setFilterYear('All'); setFilterSection('All'); setFilterProgram('All'); setSearchTerm('');}} style={{marginTop: '10px', background: 'none', border: 'none', color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline'}}>Clear Filters</button>
            </div>
        ) : (
            <div className="table-responsive">
                <table className="interactive-table">
                    <thead>
                        <tr>
                            <th style={{width: '35%'}}>Student Name</th><th>ID Number</th>
                            <th>Program</th><th>Year/Sec</th><th>Status</th>
                            <th style={{textAlign: 'right'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(s => (
                            <tr key={s.id} style={s.status === 'Dropped' ? {opacity: 0.6, background: '#f9fafb'} : {}}>
                                <td>
                                    <div className="student-cell">
                                        <div className="student-avatar" style={s.status === 'Dropped' ? {background: '#eee', color: '#999'} : {}}>{s.full_name.charAt(0)}</div>
                                        <span className="student-name-text">{s.full_name}</span>
                                    </div>
                                </td>
                                <td className="mono-text">{s.student_id}</td>
                                <td>{s.program || 'BSIT'}</td>
                                <td><span className="pill-gray">{s.year_level} - {s.section}</span></td>
                                <td>
                                    <span className={`status-badge ${s.status?.toLowerCase() || 'regular'}`} style={s.status === 'Dropped' ? {background: '#fee2e2', color: '#991b1b'} : {}}>
                                        {s.status || 'Regular'}
                                    </span>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '5px', alignItems: 'center'}}>
                                        <button title="Mark as Regular" onClick={() => handleStatusChange(s.id, 'Regular')} style={{background: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}>REG</button>
                                        <button title="Mark as Irregular" onClick={() => handleStatusChange(s.id, 'Irregular')} style={{background: '#f59e0b', color: 'white', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}>IRR</button>
                                        <button title="Mark as Dropped" onClick={() => handleStatusChange(s.id, 'Dropped')} style={{background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}>DRP</button>
                                        <div style={{width: '1px', height: '20px', background: '#e2e8f0', margin: '0 4px'}}></div>
                                        <button className="btn-icon-small" title="View Grades" onClick={() => navigate('/instructor/Gradebook')}><MoreHorizontal size={16}/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="table-footer-hint">Showing {filteredStudents.length} official students in your masterlist</div>
            </div>
        )}
      </div>
    </div>
  );
}