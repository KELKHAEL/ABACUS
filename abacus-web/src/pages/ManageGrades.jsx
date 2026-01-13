import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseWeb';

export default function ManageGrades() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Grade Modal
  const [selectedStudent, setSelectedStudent] = useState(null); // The student we are grading
  const [showGradeModal, setShowGradeModal] = useState(false);
  
  // Grade Form
  const [gradeForm, setGradeForm] = useState({
    subjectCode: 'DCIT 23',
    subjectTitle: 'Discrete Mathematics',
    grade: '',
    semester: '1st Sem',
    schoolYear: '2025-2026'
  });

  // FETCH STUDENTS
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("role", "==", "STUDENT"));
      const querySnapshot = await getDocs(q);
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(list);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // OPEN GRADES
  const openGradeModal = (student) => {
    setSelectedStudent(student);
    setGradeForm({
      subjectCode: 'DCIT 23',
      subjectTitle: 'Discrete Mathematics',
      grade: '',
      semester: '1st Sem',
      schoolYear: '2025-2026'
    });
    setShowGradeModal(true);
  };

  // ADD GRADE TO STUDENT
  const handleAddGrade = async (e) => {
    e.preventDefault();
    if (!gradeForm.grade) return alert("Please enter a grade");

    try {
      const studentRef = doc(db, "users", selectedStudent.id);
      
      const newGradeEntry = {
        ...gradeForm,
        dateAdded: new Date().toISOString()
      };

      await updateDoc(studentRef, {
        gradesList: arrayUnion(newGradeEntry)
      });

      const updatedStudent = { 
        ...selectedStudent, 
        gradesList: [...(selectedStudent.gradesList || []), newGradeEntry] 
      };
      setSelectedStudent(updatedStudent);
      
      setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));

      alert("Grade Added Successfully!");
      setGradeForm({...gradeForm, grade: ''});

    } catch (error) {
      console.error("Error adding grade:", error);
      alert("Error: " + error.message);
    }
  };

  // DELETE GRADE
  const handleDeleteGrade = async (gradeEntry) => {
    if(!window.confirm("Remove this grade?")) return;

    try {
      const studentRef = doc(db, "users", selectedStudent.id);
      await updateDoc(studentRef, {
        gradesList: arrayRemove(gradeEntry)
      });

      const updatedGrades = selectedStudent.gradesList.filter(g => g !== gradeEntry);
      const updatedStudent = { ...selectedStudent, gradesList: updatedGrades };
      setSelectedStudent(updatedStudent);
      setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));

    } catch (error) {
      console.error("Error removing grade:", error);
    }
  };

  const filteredStudents = students.filter(student => 
    student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId?.includes(searchTerm)
  );

  return (
    <div style={{padding: '20px'}}>
      <h1 style={{color: '#104a28'}}>Manage Grades</h1>
      
      {/* SEARCH */}
      <div className="filters" style={{background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
        <input 
          placeholder="Search Student..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%'}}
        />
      </div>

      {/* STUDENT LIST TABLE */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Program / Year</th>
              <th>Student ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Loading...</td></tr> : 
             filteredStudents.map((student) => (
              <tr key={student.id}>
                <td style={{fontWeight: 'bold'}}>{student.fullName}</td>
                <td>{student.program} - {student.yearLevel}</td>
                <td>{student.studentId}</td>
                <td>
                  <button 
                    className="action-btn" 
                    style={{backgroundColor: '#eab308', color: '#3e2700'}}
                    onClick={() => openGradeModal(student)}
                  >
                    📊 View / Add Grades
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GRADE MANAGEMENT MODAL */}
      {showGradeModal && selectedStudent && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{background: 'white', padding: '30px', borderRadius: '12px', width: '700px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <div>
                <h2 style={{margin: 0, color: '#104a28'}}>{selectedStudent.fullName}</h2>
                <small style={{color: '#666'}}>Student ID: {selectedStudent.studentId}</small>
              </div>
              <button onClick={() => setShowGradeModal(false)} style={{background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'}}>✖</button>
            </div>

            {/* ADD GRADE FORM */}
            <form onSubmit={handleAddGrade} style={{background: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '20px'}}>
              <h4 style={{marginTop: 0, marginBottom: '10px'}}>Add New Grade</h4>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
                <input placeholder="Subject Code" value={gradeForm.subjectCode} onChange={e => setGradeForm({...gradeForm, subjectCode: e.target.value})} style={modalInputStyle} />
                <input placeholder="Subject Title" value={gradeForm.subjectTitle} onChange={e => setGradeForm({...gradeForm, subjectTitle: e.target.value})} style={modalInputStyle} />
                <input placeholder="Grade (e.g. 1.75)" value={gradeForm.grade} onChange={e => setGradeForm({...gradeForm, grade: e.target.value})} style={modalInputStyle} />
              </div>
              <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                 <button type="submit" style={{backgroundColor: '#104a28', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'}}>
                   + Assign Grade
                 </button>
              </div>
            </form>

            {/* GRADES LIST */}
            <h4 style={{marginBottom: '10px'}}>Academic Record</h4>
            <table className="data-table" style={{fontSize: '14px'}}>
              <thead>
                <tr style={{background: '#eee'}}>
                  <th>Code</th>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th>Sem</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedStudent.gradesList && selectedStudent.gradesList.length > 0 ? (
                  selectedStudent.gradesList.map((g, index) => (
                    <tr key={index}>
                      <td>{g.subjectCode}</td>
                      <td>{g.subjectTitle}</td>
                      <td style={{fontWeight: 'bold', color: '#104a28'}}>{g.grade}</td>
                      <td>{g.semester}</td>
                      <td>
                        <button 
                          onClick={() => handleDeleteGrade(g)}
                          style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px'}}
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" style={{textAlign: 'center', padding: '10px', color: '#888'}}>No grades assigned yet.</td></tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
      )}
    </div>
  );
}

const modalInputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' };