import React, { useState, useEffect } from "react";
import { 
  Search, Filter, Eye, Edit3, 
  Save, X, CheckCircle, AlertCircle, Users, Ban, Trash2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Need this to check auth
import './Instructor.css';

export default function Gradebook() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizStatusMap, setQuizStatusMap] = useState({}); 

  // Filters
  const [search, setSearch] = useState("");
  const [programFilter, setProgramFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [sectionFilter, setSectionFilter] = useState("All");

  // Modal State
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editGrades, setEditGrades] = useState([]);

  const navigate = useNavigate();

  // --- 1. FETCH DATA (MySQL) ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) { navigate('/login'); return; }
        const user = JSON.parse(userStr);

        // A. Fetch Instructor's Dashboard Data (Contains ONLY assigned students)
        const dashboardRes = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
        const dashboardData = await dashboardRes.json();
        
        if (dashboardData.error) throw new Error(dashboardData.error);
        
        const assignedStudents = dashboardData.students || [];

        // B. Fetch All Grades
        const gradesRes = await fetch('http://localhost:5000/grades');
        const gradesData = await gradesRes.json();

        // C. Fetch Quizzes (for status map)
        const quizRes = await fetch('http://localhost:5000/quizzes');
        const quizData = await quizRes.json();

        // --- PROCESSING ---
        
        // 1. Map Quiz Status
        const statusMap = {};
        quizData.forEach(q => {
            statusMap[q.id] = q.status;
        });
        setQuizStatusMap(statusMap);

        // 2. Combine Assigned Students with their Grades
        const mergedData = assignedStudents.map(student => {
            // Find all grades belonging to this student
            const studentGrades = gradesData.filter(g => g.user_id === student.id);
            
            return {
                id: student.id,
                fullName: student.full_name,
                email: student.email,
                program: student.program || 'BSIT',
                yearLevel: student.year_level,
                section: student.section,
                gradesList: studentGrades 
            };
        });

        setStudents(mergedData);
        setFilteredStudents(mergedData);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  // --- FILTER LOGIC ---
  useEffect(() => {
    let result = students;

    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(s => 
        (s.fullName && s.fullName.toLowerCase().includes(lower)) ||
        (s.email && s.email.toLowerCase().includes(lower))
      );
    }

    if (programFilter !== "All") {
      result = result.filter(s => s.program === programFilter);
    }
    if (yearFilter !== "All") {
      result = result.filter(s => s.yearLevel === yearFilter);
    }
    if (sectionFilter !== "All") {
      result = result.filter(s => s.section === sectionFilter);
    }

    setFilteredStudents(result);
  }, [search, programFilter, yearFilter, sectionFilter, students]);

  // --- MODAL ACTIONS ---
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
        
        // Optimistic UI Update
        const updated = [...editGrades];
        updated.splice(index, 1); 
        setEditGrades(updated);

        // API Call
        try {
            await fetch(`http://localhost:5000/grades/${gradeToDelete.id}`, { method: 'DELETE' });
        } catch(e) {
            alert("Failed to delete from server");
        }
    }
  };

  // --- SAVE GRADES ---
  const saveGrades = async () => {
    if (!selectedStudent) return;
    
    try {
      const updatePromises = editGrades.map(grade => {
          return fetch(`http://localhost:5000/grades/${grade.id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ score: grade.grade })
          });
      });

      await Promise.all(updatePromises);
      
      const updatedStudents = students.map(s => 
        s.id === selectedStudent.id ? { ...s, gradesList: editGrades } : s
      );
      setStudents(updatedStudents);
      setFilteredStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, gradesList: editGrades } : s));
      
      setSelectedStudent(null);
      setIsEditing(false); 
      alert("Grades updated successfully!");

    } catch (error) {
      console.error("Error saving grades:", error);
      alert("Failed to save grades.");
    }
  };

  return (
    <div className="gradebook-wrapper">
      
      {/* --- FILTERS BAR --- */}
      <div className="gb-filters-card">
        <div className="filter-title">
            <Filter size={18} color="#eab308"/> 
            <span>Filter List</span>
        </div>
        
        <div className="filters-content">
            <div className="search-box">
            <Search size={18} color="#666" />
            <input 
                placeholder="Search..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>

            <select className="gb-select" value={programFilter} onChange={e => setProgramFilter(e.target.value)}>
                <option value="All">All Programs</option>
                <option value="Bachelor of Science in Information Technology">BS Information Technology</option>
                <option value="Bachelor of Secondary Education - Major in Mathematics">BSEd Mathematics</option>
                <option value="Bachelor of Secondary Education - Major in English">BSEd English</option>
                <option value="Bachelor of Science in Business Management">BS Business Management</option>
            </select>

            <select className="gb-select" value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
                <option value="All">All Years</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
            </select>

            <select className="gb-select" value={sectionFilter} onChange={e => setSectionFilter(e.target.value)}>
                <option value="All">All Sections</option>
                <option value="1">Section 1</option>
                <option value="2">Section 2</option>
                <option value="3">Section 3</option>
            </select>
        </div>
      </div>

      {/* --- STUDENTS TABLE --- */}
      <div className="gb-table-card">
        <div className="table-header-accent">
            <div className="th-content">
                <Users size={20} color="white" />
                <h3>Enrolled Student Masterlist</h3>
            </div>
            <span className="student-count">{filteredStudents.length} Students found</span>
        </div>

        <table className="gb-table">
          <thead>
            <tr>
              <th width="30%">Student Name</th>
              <th width="25%" className="text-center">Program & Section</th>
              <th width="15%" className="text-center">Quizzes</th>
              <th width="15%" className="text-center">Average</th>
              <th width="15%" className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center p-4">Loading Gradebook...</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-4">No students assigned to your classes yet.</td></tr>
            ) : (
              filteredStudents.map(student => {
                const avg = student.gradesList.length > 0 
                  ? (student.gradesList.reduce((acc, curr) => acc + parseFloat(curr.grade || 0), 0) / student.gradesList.length).toFixed(1)
                  : "N/A";

                return (
                  <tr key={student.id}>
                    <td>
                      <div className="student-name">{student.fullName || "Unknown"}</div>
                      <div className="student-email">{student.email}</div>
                    </td>
                    
                    <td className="text-center">
                      <div className="badge-pill">{student.program || "N/A"}</div>
                      <div className="small-meta">{student.yearLevel} - {student.section}</div>
                    </td>

                    <td className="text-center">
                      <span className="quiz-count">{student.gradesList.length}</span>
                    </td>
                    <td className="text-center">
                      <span className={`grade-avg ${avg >= 75 ? 'pass' : (avg === "N/A" ? 'neutral' : 'fail')}`}>
                        {avg}%
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="action-row right-aligned">
                        <button className="btn-icon view" onClick={() => openStudentModal(student, false)} title="View Grades">
                          <Eye size={18} />
                        </button>
                        <button className="btn-icon edit" onClick={() => openStudentModal(student, true)} title="Edit Scores">
                          <Edit3 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* --- ASSESSMENT RECORD MODAL --- */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            
            <div className="modal-header-green">
              <div>
                <h2>{selectedStudent.fullName}</h2>
                <p className="modal-subtitle-white">{selectedStudent.program} • {selectedStudent.yearLevel} - {selectedStudent.section}</p>
              </div>
              <button className="btn-close-white" onClick={() => setSelectedStudent(null)}>
                <X size={24}/>
              </button>
            </div>

            <div className="modal-body">
              <div className="sheet-header">
                <h3>Assessment Record</h3>
                {!isEditing ? (
                  <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                    <Edit3 size={16} /> Enable Editing
                  </button>
                ) : (
                  <div className="editing-banner">
                    <Edit3 size={14} /> Editing Mode Active
                  </div>
                )}
              </div>

              <div className="sheet-container">
                <table className="sheet-table">
                  <thead>
                    <tr>
                      <th width="35%">Quiz Title / Subject</th>
                      <th width="20%">Date Taken</th>
                      <th width="20%">Score / Grade</th>
                      <th width="15%">Status</th>
                      {isEditing && <th width="10%">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {editGrades.length === 0 ? (
                      <tr><td colSpan="5" className="text-center p-4">No quiz records found.</td></tr>
                    ) : (
                      editGrades.map((grade, idx) => {
                        const isDeleted = quizStatusMap[grade.quiz_id] === 'deleted';
                        
                        return (
                          <tr key={idx} style={isDeleted ? {backgroundColor: '#f9f9f9', color: '#999'} : {}}>
                            <td>
                              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                <span style={{fontWeight: isDeleted ? 'normal' : '600', color: isDeleted ? '#999' : '#333'}}>
                                    {grade.subjectTitle}
                                </span>
                                {isDeleted && (
                                    <span style={{fontSize:'10px', background:'#eee', color:'#666', padding:'2px 6px', borderRadius:'4px', display:'flex', alignItems:'center', gap:'3px'}}>
                                        <Ban size={10}/> Disabled
                                    </span>
                                )}
                              </div>
                            </td>
                            <td style={{color: isDeleted ? '#bbb' : '#666', fontSize: '13px'}}>
                              {grade.dateTaken ? new Date(grade.dateTaken).toLocaleDateString() : "-"}
                            </td>
                            <td>
                              {isEditing ? (
                                <div className="score-input-wrapper">
                                  <input type="number" className="sheet-input-score" value={grade.grade} onChange={(e) => handleGradeChange(idx, 'grade', e.target.value)}/>
                                  <span style={{fontSize:'14px', color:'#666', fontWeight:'bold'}}>%</span>
                                </div>
                              ) : <span className="score-display" style={{color: isDeleted ? '#999' : '#111'}}>{grade.grade}%</span>}
                            </td>
                            <td>
                              {parseFloat(grade.grade) >= 75 ? (
                                <span className={`status-badge ${isDeleted ? '' : 'pass'}`} style={isDeleted ? {background:'#eee', color:'#888'} : {}}>
                                    <CheckCircle size={12}/> Passed
                                </span>
                              ) : (
                                <span className={`status-badge ${isDeleted ? '' : 'fail'}`} style={isDeleted ? {background:'#eee', color:'#888'} : {}}>
                                    <AlertCircle size={12}/> Failed
                                </span>
                              )}
                            </td>
                            {isEditing && (
                                <td className="text-center">
                                    <button 
                                        onClick={() => handleDeleteGrade(idx)}
                                        style={{color:'#ef4444', background:'none', border:'none', cursor:'pointer'}}
                                        title="Delete Grade Record"
                                    >
                                        <Trash2 size={18}/>
                                    </button>
                                </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {isEditing && (
              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="btn-save" onClick={saveGrades}><Save size={18} /> Save Changes</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}