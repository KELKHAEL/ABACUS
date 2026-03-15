import React, { useState, useEffect, useMemo } from "react";
import { Search, Filter, User, Mail, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import './Instructor.css';

export default function MyClassList() {
  const [myStudents, setMyStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [filterProgram, setFilterProgram] = useState('All');
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

  // --- NEW: HANDLE STATUS CHANGE ---
  const handleStatusChange = async (studentId, newStatus) => {
    if(!window.confirm(`Change this student's status to ${newStatus}?`)) return;
    
    try {
        const res = await fetch(`http://localhost:5000/users/${studentId}/student-status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        
        const data = await res.json();
        if (data.success) {
            // Update UI immediately
            setMyStudents(prev => prev.map(s => s.id === studentId ? {...s, status: newStatus} : s));
        } else {
            alert("Failed to update status: " + data.error);
        }
    } catch (error) {
        alert("Server error while updating status.");
    }
  };

  // --- FILTER LOGIC ---
  const uniquePrograms = useMemo(() => {
    const programs = myStudents.map(s => s.program || 'BSIT');
    return ['All', ...new Set(programs)];
  }, [myStudents]);

  const uniqueSections = useMemo(() => {
    const sections = myStudents.map(s => `${s.year_level}-${s.section}`);
    return ['All', ...new Set(sections)];
  }, [myStudents]);

  const filteredStudents = myStudents.filter(student => {
    const sectionStr = `${student.year_level}-${student.section}`;
    const matchProgram = filterProgram === 'All' || (student.program || 'BSIT') === filterProgram;
    const matchSection = filterSection === 'All' || sectionStr === filterSection;
    const matchSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        student.student_id.includes(searchTerm);
    return matchProgram && matchSection && matchSearch;
  });

  return (
    <div className="instructor-dashboard-container">
      {/* Header */}
      <div className="page-header">
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
            <button className="btn-icon-small" onClick={() => navigate(-1)}><ArrowLeft size={20}/></button>
            <h1 className="page-title">My Class List</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            className="search-input"
            placeholder="Search by Name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
            <div className="filter-item">
                <select 
                    value={filterProgram} 
                    onChange={(e) => setFilterProgram(e.target.value)}
                    className="dash-select"
                >
                    <option value="All">All Programs</option>
                    {uniquePrograms.filter(p => p !== 'All').map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </div>

            <div className="filter-item">
                <select 
                    value={filterSection} 
                    onChange={(e) => setFilterSection(e.target.value)}
                    className="dash-select"
                >
                    <option value="All">All Sections</option>
                    {uniqueSections.filter(s => s !== 'All').map(s => (
                        <option key={s} value={s}>Year {s}</option>
                    ))}
                </select>
            </div>
        </div>
      </div>

      {/* Table */}
      <div className="class-list-card">
        {loading ? (
            <div className="loading-state"><div className="spinner"></div><p>Loading class list...</p></div>
        ) : filteredStudents.length === 0 ? (
            <div className="empty-table-state">
                <p>No students found matching your filters.</p>
            </div>
        ) : (
            <div className="table-responsive">
                <table className="interactive-table">
                    <thead>
                        <tr>
                            <th style={{width: '35%'}}>Student Name</th>
                            <th>ID Number</th>
                            <th>Program</th>
                            <th>Year/Sec</th>
                            <th>Status</th>
                            <th style={{textAlign: 'right'}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(s => (
                            <tr key={s.id} style={s.status === 'Dropped' ? {opacity: 0.6, background: '#f9fafb'} : {}}>
                                <td>
                                    <div className="student-cell">
                                        <div className="student-avatar" style={s.status === 'Dropped' ? {background: '#eee', color: '#999'} : {}}>
                                            {s.full_name.charAt(0)}
                                        </div>
                                        <span className="student-name-text">{s.full_name}</span>
                                    </div>
                                </td>
                                <td className="mono-text">{s.student_id}</td>
                                <td>{s.program || 'BSIT'}</td>
                                <td><span className="pill-gray">{s.year_level} - {s.section}</span></td>
                                <td>
                                    <span className={`status-badge ${s.status?.toLowerCase() || 'regular'}`} 
                                          style={s.status === 'Dropped' ? {background: '#fee2e2', color: '#991b1b'} : {}}>
                                        {s.status || 'Regular'}
                                    </span>
                                </td>
                                <td style={{textAlign: 'right'}}>
                                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '5px', alignItems: 'center'}}>
                                        {/* STATUS ACTION BUTTONS */}
                                        <button 
                                            title="Mark as Regular"
                                            onClick={() => handleStatusChange(s.id, 'Regular')} 
                                            style={{background: '#10b981', color: 'white', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}
                                        >
                                            REG
                                        </button>
                                        <button 
                                            title="Mark as Irregular"
                                            onClick={() => handleStatusChange(s.id, 'Irregular')} 
                                            style={{background: '#f59e0b', color: 'white', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}
                                        >
                                            IRR
                                        </button>
                                        <button 
                                            title="Mark as Dropped"
                                            onClick={() => handleStatusChange(s.id, 'Dropped')} 
                                            style={{background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold'}}
                                        >
                                            DRP
                                        </button>
                                        
                                        <div style={{width: '1px', height: '20px', background: '#e2e8f0', margin: '0 4px'}}></div>
                                        
                                        <button className="btn-icon-small" title="View Grades" onClick={() => navigate('/instructor/Gradebook')}>
                                            <MoreHorizontal size={16}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="table-footer-hint">
                    Showing {filteredStudents.length} students
                </div>
            </div>
        )}
      </div>
    </div>
  );
}