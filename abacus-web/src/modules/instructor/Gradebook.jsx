import React, { useState, useEffect, useCallback } from "react";
import { 
  Search, Filter, Eye, Edit3, 
  Save, X, CheckCircle, AlertCircle, Users, Ban, Trash2, History, LayoutGrid
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Instructor.css';

export default function Gradebook() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizStatusMap, setQuizStatusMap] = useState({}); 

  const [viewMode, setViewMode] = useState('active'); 

  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editGrades, setEditGrades] = useState([]);

  const navigate = useNavigate();

  const calculateAverage = (gradesList, currentStatusMap, isArchivedView) => {
    if (!gradesList || gradesList.length === 0) return "N/A";
    let totalScore = 0;
    let totalItems = 0;
    let validGradesCount = 0;
    
    gradesList.forEach(g => {
      const matchArchiveState = isArchivedView ? g.is_archived === 1 : g.is_archived === 0;
      
      if (matchArchiveState && currentStatusMap[g.quiz_id] !== 'deleted') {
        totalScore += parseFloat(g.grade || 0);
        totalItems += parseFloat(g.total_items || 100); 
        validGradesCount++;
      }
    });

    if (validGradesCount === 0) return "N/A";
    if (totalItems === 0) return "0.0";
    return ((totalScore / totalItems) * 100).toFixed(1);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);

      const dashboardRes = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
      const dashboardData = await dashboardRes.json();
      if (dashboardData.error) throw new Error(dashboardData.error);
      
      const assignedStudents = dashboardData.students || [];

      const gradesRes = await fetch('http://localhost:5000/grades');
      const gradesData = await gradesRes.json();

      const quizData = dashboardData.quizzes || [];

      const statusMap = {};
      quizData.forEach(q => { statusMap[q.id] = q.status; });
      setQuizStatusMap(statusMap);

      const mergedData = assignedStudents.map(student => {
          const studentGrades = gradesData.filter(g => g.user_id === student.id);

          return {
              id: student.id, 
              // ✅ FIX: Force the name to uppercase immediately when downloading from the database
              fullName: student.full_name ? student.full_name.toUpperCase() : '', 
              email: student.email,
              program: student.program || 'BSIT', 
              yearLevel: student.year_level,
              section: student.section, 
              gradesList: studentGrades 
          };
      });

      setStudents(mergedData);
      setFilteredStudents(mergedData);
    } catch (err) { console.error("Error fetching data:", err); } 
    finally { setLoading(false); }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const uniquePrograms = ['All', ...new Set(students.map(s => s.program))];
  const uniqueYears = ['All', ...new Set(students.map(s => s.yearLevel))].sort();
  const uniqueSections = ['All', ...new Set(students.map(s => s.section))].sort();

  useEffect(() => {
    let result = students;
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(s => (s.fullName && s.fullName.toLowerCase().includes(lower)) || (s.email && s.email.toLowerCase().includes(lower)));
    }
    if (programFilter !== "All") result = result.filter(s => s.program === programFilter);
    if (yearFilter !== "All") result = result.filter(s => String(s.yearLevel) === String(yearFilter));
    if (sectionFilter !== "All") result = result.filter(s => String(s.section) === String(sectionFilter));
    setFilteredStudents(result);
  }, [search, programFilter, yearFilter, sectionFilter, students, viewMode]);

  const openStudentModal = (student, editMode = false) => {
    setSelectedStudent(student);
    setEditGrades(JSON.parse(JSON.stringify(student.gradesList))); 
    setIsEditing(editMode);
  };

  const handleGradeChange = (index, field, value) => {
    const updated = [...editGrades];
    updated[index][field] = value;
    setEditGrades(updated);
  };

  const handleDeleteGrade = async (index) => {
    if(window.confirm("Are you sure you want to delete this grade permanently?")) {
        const gradeToDelete = editGrades[index];
        const updated = [...editGrades];
        updated.splice(index, 1); 
        setEditGrades(updated);
        try { await fetch(`http://localhost:5000/grades/${gradeToDelete.id}`, { method: 'DELETE' }); } 
        catch(e) { alert("Failed to delete from server"); }
    }
  };

  const saveGrades = async () => {
    if (!selectedStudent) return;
    try {
      for (const grade of editGrades) {
          const cleanTitle = grade.subjectTitle ? grade.subjectTitle.replace(' (Missed)', '') : '';
          
          await fetch(`http://localhost:5000/grades/${grade.id}`, {
              method: 'PUT', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ score: grade.grade, total_items: grade.total_items || 100, subjectTitle: cleanTitle })
          });
      }
      
      fetchData();
      setSelectedStudent(null); setIsEditing(false); 
      alert("Grades updated successfully!");
    } catch (error) { alert("Failed to save grades."); }
  };

  return (
    <div className="gradebook-wrapper">
      
      <div className="inst-dashboard-header">
        <div className="header-left">
            <h2>Gradebook</h2>
            <p>Monitor and manage student performance.</p>
        </div>
        <div className="header-actions">
            <div className="view-toggle-container" style={{display: 'flex', background: '#f3f4f6', borderRadius: '8px', padding: '4px'}}>
              <button onClick={() => setViewMode('active')} style={{border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s', background: viewMode === 'active' ? 'white' : 'transparent', color: viewMode === 'active' ? '#111' : '#6b7280'}}><LayoutGrid size={16}/> Current Semester</button>
              <button onClick={() => setViewMode('archived')} style={{border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s', background: viewMode === 'archived' ? 'white' : 'transparent', color: viewMode === 'archived' ? '#111' : '#6b7280'}}><History size={16}/> Past Records</button>
            </div>
        </div>
      </div>

      <div className="gb-filters-card">
        <div className="filter-title">
            <Filter size={18} color="#eab308"/> <span>Filter List</span>
        </div>
        
        <div className="filters-content">
            <div className="search-box">
            <Search size={18} color="#666" />
            <input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <select className="gb-select" value={programFilter} onChange={e => setProgramFilter(e.target.value)}>
                {uniquePrograms.map(p => <option key={p} value={p}>{p === 'All' ? 'All Programs' : p.replace('Bachelor of Science in', 'BS')}</option>)}
            </select>
            <select className="gb-select" value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
                {uniqueYears.map(y => <option key={y} value={y}>{y === 'All' ? 'All Years' : `Year ${y}`}</option>)}
            </select>
            <select className="gb-select" value={sectionFilter} onChange={e => setSectionFilter(e.target.value)}>
                {uniqueSections.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sections' : `Section ${s}`}</option>)}
            </select>
        </div>
      </div>

      <div className="gb-table-card">
        <div className="table-header-accent" style={{background: viewMode === 'archived' ? '#64748b' : '#104a28'}}>
            <div className="th-content">
                <Users size={20} color="white" />
                <h3>{viewMode === 'active' ? 'Enrolled Student Masterlist' : 'Archived Student Records'}</h3>
            </div>
            <span className="student-count">{filteredStudents.length} Students found</span>
        </div>
        <table className="gb-table">
          <thead>
            <tr>
              <th width="30%">Student Name</th><th width="25%" className="text-center">Program & Section</th>
              <th width="15%" className="text-center">Quizzes</th><th width="15%" className="text-center">Average</th><th width="15%" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? ( <tr><td colSpan="5" className="text-center p-4">Loading Gradebook...</td></tr>
            ) : filteredStudents.length === 0 ? ( <tr><td colSpan="5" className="text-center p-4">No students assigned to your classes yet.</td></tr>
            ) : (
              filteredStudents.map(student => {
                const targetGrades = student.gradesList.filter(g => viewMode === 'archived' ? g.is_archived === 1 : g.is_archived === 0);
                const avg = calculateAverage(student.gradesList, quizStatusMap, viewMode === 'archived');

                return (
                  <tr key={student.id}>
                    <td><div className="student-name">{student.fullName || "Unknown"}</div><div className="student-email">{student.email}</div></td>
                    <td className="text-center"><div className="badge-pill">{student.program || "N/A"}</div><div className="small-meta">{student.yearLevel} - {student.section}</div></td>
                    <td className="text-center"><span className="quiz-count">{targetGrades.length}</span></td>
                    <td className="text-center"><span className={`grade-avg ${avg >= 75 ? 'pass' : (avg === "N/A" ? 'neutral' : 'fail')}`}>{avg === "N/A" ? avg : `${avg}%`}</span></td>
                    <td className="text-right">
                      <div className="action-row right-aligned">
                        <button className="btn-icon view" onClick={() => openStudentModal(student, false)} title="View Grades"><Eye size={18} /></button>
                        {viewMode === 'active' && <button className="btn-icon edit" onClick={() => openStudentModal(student, true)} title="Edit Scores"><Edit3 size={18} /></button>}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <div className="modal-header-green" style={{background: viewMode === 'archived' ? '#475569' : '#104a28'}}>
              <div><h2>{selectedStudent.fullName}</h2><p className="modal-subtitle-white">{selectedStudent.program} • {selectedStudent.yearLevel} - {selectedStudent.section}</p></div>
              <button className="btn-close-white" onClick={() => setSelectedStudent(null)}><X size={24}/></button>
            </div>
            <div className="modal-body">
              <div className="sheet-header">
                <h3>{viewMode === 'active' ? 'Assessment Record' : 'Past Assessment Record'}</h3>
                {!isEditing && viewMode === 'active' ? <button className="btn-secondary" onClick={() => setIsEditing(true)}><Edit3 size={16} /> Enable Editing</button>
                  : isEditing ? <div className="editing-banner"><Edit3 size={14} /> Editing Mode Active</div> : null}
              </div>
              <div className="sheet-container">
                <table className="sheet-table">
                  <thead><tr><th width="35%">Quiz Title / Subject</th><th width="15%">Date Taken</th><th width="15%" className="text-center">Score</th><th width="15%" className="text-center">Total</th><th width="10%" className="text-center">Status</th>{isEditing && <th width="10%" className="text-center">Action</th>}</tr></thead>
                  <tbody>
                    {editGrades.filter(g => viewMode === 'archived' ? g.is_archived === 1 : g.is_archived === 0).length === 0 ? <tr><td colSpan="6" className="text-center p-4">No records found for this term.</td></tr>
                    : editGrades.filter(g => viewMode === 'archived' ? g.is_archived === 1 : g.is_archived === 0).map((grade, idx) => {
                        const isDeleted = quizStatusMap[grade.quiz_id] === 'deleted';
                        const currentScore = parseFloat(grade.grade || 0);
                        const currentTotal = parseFloat(grade.total_items || 100);
                        const percentage = currentTotal > 0 ? ((currentScore / currentTotal) * 100) : 0;
                        const absoluteIdx = editGrades.findIndex(eg => eg.id === grade.id);
                        
                        const isMissed = grade.subjectTitle && grade.subjectTitle.includes('(Missed)');

                        return (
                          <tr key={grade.id} style={isDeleted ? {backgroundColor: '#f9f9f9', color: '#999'} : {}}>
                            <td>
                                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                    <span style={{fontWeight: isDeleted ? 'normal' : '600', color: isDeleted ? '#999' : (isMissed ? '#ef4444' : '#333'), textDecoration: isDeleted ? 'line-through' : 'none'}}>
                                        {grade.subjectTitle}
                                    </span>
                                    {isDeleted && <span style={{fontSize:'10px', background:'#eee', color:'#666', padding:'2px 6px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'3px'}}><Ban size={10}/> Disabled</span>}
                                </div>
                            </td>
                            <td style={{color: isDeleted ? '#bbb' : (isMissed ? '#ef4444' : '#666'), fontSize: '13px'}}>
                                {isMissed ? "Expired" : (grade.dateTaken ? new Date(grade.dateTaken).toLocaleDateString() : "-")}
                            </td>
                            <td className="text-center">{isEditing && !isDeleted ? <input type="number" className="sheet-input-score" style={{width: '60px', textAlign: 'center'}} value={grade.grade} onChange={(e) => handleGradeChange(absoluteIdx, 'grade', e.target.value)}/> : <span className="score-display" style={{color: isDeleted ? '#999' : (isMissed ? '#ef4444' : '#111')}}>{currentScore}</span>}</td>
                            <td className="text-center">{isEditing && !isDeleted ? <input type="number" className="sheet-input-score" style={{width: '60px', textAlign: 'center'}} value={grade.total_items || 100} onChange={(e) => handleGradeChange(absoluteIdx, 'total_items', e.target.value)}/> : <span style={{color: isDeleted ? '#999' : '#666'}}>{currentTotal}</span>}</td>
                            <td className="text-center">{percentage >= 75 ? <span className={`status-badge ${isDeleted ? '' : 'pass'}`} style={isDeleted ? {background:'#eee', color:'#888'} : {}}><CheckCircle size={12}/> Passed</span> : <span className={`status-badge ${isDeleted ? '' : 'fail'}`} style={isDeleted ? {background:'#eee', color:'#888'} : {}}><AlertCircle size={12}/> Failed</span>}</td>
                            {isEditing && (
                                <td className="text-center">
                                    {!isDeleted && (
                                        <button onClick={() => handleDeleteGrade(absoluteIdx)} style={{color:'#ef4444', background:'none', border:'none', cursor:'pointer'}} title="Delete Grade Record"><Trash2 size={18}/></button>
                                    )}
                                </td>
                            )}
                          </tr>
                        );
                      })
                    }
                    {editGrades.filter(g => viewMode === 'archived' ? g.is_archived === 1 : g.is_archived === 0).length > 0 && (
                        <tr style={{backgroundColor: viewMode === 'archived' ? '#f1f5f9' : '#f0fdf4', borderTop: viewMode === 'archived' ? '2px solid #cbd5e1' : '2px solid #bbf7d0'}}><td colSpan="2" className="text-right" style={{fontWeight: 'bold', color: viewMode === 'archived' ? '#334155' : '#166534'}}>Overall Average:</td><td colSpan="2" className="text-center" style={{fontWeight: '900', color: viewMode === 'archived' ? '#475569' : '#15803d', fontSize: '16px'}}>{calculateAverage(editGrades, quizStatusMap, viewMode === 'archived')} {calculateAverage(editGrades, quizStatusMap, viewMode === 'archived') !== "N/A" && "%"}</td><td colSpan={isEditing ? 2 : 1}></td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {isEditing && <div className="modal-footer"><button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button><button className="btn-save" onClick={saveGrades}><Save size={18} /> Save Changes</button></div>}
          </div>
        </div>
      )}
    </div>
  );
}