import React, { useState, useEffect } from "react";
import { 
  Search, Filter, Eye, Edit3, 
  Save, X, CheckCircle, AlertCircle, Users, Ban, Trash2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Instructor.css';

export default function Gradebook() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizStatusMap, setQuizStatusMap] = useState({}); 

  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editGrades, setEditGrades] = useState([]);

  const navigate = useNavigate();

  const calculateAverage = (gradesList, currentStatusMap) => {
    if (!gradesList || gradesList.length === 0) return "N/A";
    let totalScore = 0;
    let totalItems = 0;
    let validGradesCount = 0;
    
    gradesList.forEach(g => {
      if (currentStatusMap[g.quiz_id] !== 'deleted') {
        totalScore += parseFloat(g.grade || 0);
        totalItems += parseFloat(g.total_items || 100); 
        validGradesCount++;
      }
    });

    if (validGradesCount === 0) return "N/A";
    if (totalItems === 0) return "0.0";
    return ((totalScore / totalItems) * 100).toFixed(1);
  };

  useEffect(() => {
    const fetchData = async () => {
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

        const quizRes = await fetch('http://localhost:5000/quizzes');
        const quizData = await quizRes.json();

        const statusMap = {};
        quizData.forEach(q => { statusMap[q.id] = q.status; });
        setQuizStatusMap(statusMap);

        const mergedData = assignedStudents.map(student => {
            const studentGrades = gradesData.filter(g => g.user_id === student.id);
            return {
                id: student.id, fullName: student.full_name, email: student.email,
                program: student.program || 'BSIT', yearLevel: student.year_level,
                section: student.section, gradesList: studentGrades 
            };
        });

        setStudents(mergedData);
        setFilteredStudents(mergedData);
      } catch (err) { console.error("Error fetching data:", err); } 
      finally { setLoading(false); }
    };
    fetchData();
  }, [navigate]);

  // ✅ DYNAMIC DROPDOWN GENERATORS
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
  }, [search, programFilter, yearFilter, sectionFilter, students]);

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
      const updatePromises = editGrades.map(grade => {
          return fetch(`http://localhost:5000/grades/${grade.id}`, {
              method: 'PUT', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ score: grade.grade, total_items: grade.total_items || 100 })
          });
      });
      await Promise.all(updatePromises);
      
      const updatedStudents = students.map(s => s.id === selectedStudent.id ? { ...s, gradesList: editGrades } : s);
      setStudents(updatedStudents);
      setFilteredStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, gradesList: editGrades } : s));
      
      setSelectedStudent(null); setIsEditing(false); 
      alert("Grades updated successfully!");
    } catch (error) { alert("Failed to save grades."); }
  };

  return (
    <div className="gradebook-wrapper">
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
        <div className="table-header-accent">
            <div className="th-content"><Users size={20} color="white" /><h3>Enrolled Student Masterlist</h3></div>
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
                const avg = calculateAverage(student.gradesList, quizStatusMap);
                return (
                  <tr key={student.id}>
                    <td><div className="student-name">{student.fullName || "Unknown"}</div><div className="student-email">{student.email}</div></td>
                    <td className="text-center"><div className="badge-pill">{student.program || "N/A"}</div><div className="small-meta">{student.yearLevel} - {student.section}</div></td>
                    <td className="text-center"><span className="quiz-count">{student.gradesList.length}</span></td>
                    <td className="text-center"><span className={`grade-avg ${avg >= 75 ? 'pass' : (avg === "N/A" ? 'neutral' : 'fail')}`}>{avg === "N/A" ? avg : `${avg}%`}</span></td>
                    <td className="text-right">
                      <div className="action-row right-aligned">
                        <button className="btn-icon view" onClick={() => openStudentModal(student, false)} title="View Grades"><Eye size={18} /></button>
                        <button className="btn-icon edit" onClick={() => openStudentModal(student, true)} title="Edit Scores"><Edit3 size={18} /></button>
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
            <div className="modal-header-green">
              <div><h2>{selectedStudent.fullName}</h2><p className="modal-subtitle-white">{selectedStudent.program} • {selectedStudent.yearLevel} - {selectedStudent.section}</p></div>
              <button className="btn-close-white" onClick={() => setSelectedStudent(null)}><X size={24}/></button>
            </div>
            <div className="modal-body">
              <div className="sheet-header">
                <h3>Assessment Record</h3>
                {!isEditing ? <button className="btn-secondary" onClick={() => setIsEditing(true)}><Edit3 size={16} /> Enable Editing</button>
                  : <div className="editing-banner"><Edit3 size={14} /> Editing Mode Active</div>}
              </div>
              <div className="sheet-container">
                <table className="sheet-table">
                  <thead><tr><th width="35%">Quiz Title / Subject</th><th width="15%">Date Taken</th><th width="15%" className="text-center">Score</th><th width="15%" className="text-center">Total</th><th width="10%" className="text-center">Status</th>{isEditing && <th width="10%" className="text-center">Action</th>}</tr></thead>
                  <tbody>
                    {editGrades.length === 0 ? <tr><td colSpan="6" className="text-center p-4">No quiz records found.</td></tr>
                    : editGrades.map((grade, idx) => {
                        const isDeleted = quizStatusMap[grade.quiz_id] === 'deleted';
                        const currentScore = parseFloat(grade.grade || 0);
                        const currentTotal = parseFloat(grade.total_items || 100);
                        const percentage = currentTotal > 0 ? ((currentScore / currentTotal) * 100) : 0;
                        return (
                          <tr key={idx} style={isDeleted ? {backgroundColor: '#f9f9f9', color: '#999'} : {}}>
                            <td><div style={{display:'flex', alignItems:'center', gap:'8px'}}><span style={{fontWeight: isDeleted ? 'normal' : '600', color: isDeleted ? '#999' : '#333', textDecoration: isDeleted ? 'line-through' : 'none'}}>{grade.subjectTitle}</span>{isDeleted && <span style={{fontSize:'10px', background:'#eee', color:'#666', padding:'2px 6px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'3px'}}><Ban size={10}/> Disabled</span>}</div></td>
                            <td style={{color: isDeleted ? '#bbb' : '#666', fontSize: '13px'}}>{grade.dateTaken ? new Date(grade.dateTaken).toLocaleDateString() : "-"}</td>
                            <td className="text-center">{isEditing && !isDeleted ? <input type="number" className="sheet-input-score" style={{width: '60px', textAlign: 'center'}} value={grade.grade} onChange={(e) => handleGradeChange(idx, 'grade', e.target.value)}/> : <span className="score-display" style={{color: isDeleted ? '#999' : '#111'}}>{currentScore}</span>}</td>
                            <td className="text-center">{isEditing && !isDeleted ? <input type="number" className="sheet-input-score" style={{width: '60px', textAlign: 'center'}} value={grade.total_items || 100} onChange={(e) => handleGradeChange(idx, 'total_items', e.target.value)}/> : <span style={{color: isDeleted ? '#999' : '#666'}}>{currentTotal}</span>}</td>
                            <td className="text-center">{percentage >= 75 ? <span className={`status-badge ${isDeleted ? '' : 'pass'}`} style={isDeleted ? {background:'#eee', color:'#888'} : {}}><CheckCircle size={12}/> Passed</span> : <span className={`status-badge ${isDeleted ? '' : 'fail'}`} style={isDeleted ? {background:'#eee', color:'#888'} : {}}><AlertCircle size={12}/> Failed</span>}</td>
                            {isEditing && <td className="text-center"><button onClick={() => handleDeleteGrade(idx)} style={{color:'#ef4444', background:'none', border:'none', cursor:'pointer'}} title="Delete Grade Record"><Trash2 size={18}/></button></td>}
                          </tr>
                        );
                      })
                    }
                    {editGrades.length > 0 && (
                        <tr style={{backgroundColor: '#f0fdf4', borderTop: '2px solid #bbf7d0'}}><td colSpan="2" className="text-right" style={{fontWeight: 'bold', color: '#166534'}}>Overall Average (Active):</td><td colSpan="2" className="text-center" style={{fontWeight: '900', color: '#15803d', fontSize: '16px'}}>{calculateAverage(editGrades, quizStatusMap)} {calculateAverage(editGrades, quizStatusMap) !== "N/A" && "%"}</td><td colSpan={isEditing ? 2 : 1}></td></tr>
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