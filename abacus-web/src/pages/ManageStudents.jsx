import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, createUserAccount } from '../firebaseWeb';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal & Edit States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    program: 'BSIT',
    yearLevel: '1',
    section: '1',
    status: 'Regular',
    password: ''
  });

  const generatePassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let randomLetters = "";
    for (let i = 0; i < 8; i++) {
      randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    const randomNum = Math.floor(Math.random() * 999) + 1;
    return `${randomLetters}${randomNum}`;
  };

  // Fetch Students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("role", "==", "STUDENT"));
      const querySnapshot = await getDocs(q);
      const studentList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      const sortedList = studentList.sort((a, b) => {
        const aIsNew = a.studentId === "To be assigned" || !a.studentId;
        const bIsNew = b.studentId === "To be assigned" || !b.studentId;
        if (aIsNew && !bIsNew) return -1;
        if (!aIsNew && bIsNew) return 1;
        return 0; 
      });

      setStudents(sortedList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ 
      fullName: '', 
      email: '', 
      studentId: '', 
      program: 'BSIT', 
      yearLevel: '1', 
      section: '1', 
      status: 'Regular', 
      password: generatePassword()
    });
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setIsEditing(true);
    setEditId(student.id);
    
    const cleanStudentId = student.studentId === "To be assigned" ? "" : student.studentId;
    
    setFormData({
      fullName: student.fullName,
      email: student.email,
      studentId: cleanStudentId,
      program: student.program || 'BSIT',
      yearLevel: student.yearLevel || '1',
      section: student.section === "To be assigned" ? "1" : student.section,
      status: student.status || 'Regular',
      password: student.defaultPassword || ''
    });
    setShowModal(true);
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    if(!formData.fullName) return alert("Please fill in all fields");

    if (isEditing) {
      try {
        const studentRef = doc(db, "users", editId);
        await updateDoc(studentRef, {
          fullName: formData.fullName,
          studentId: formData.studentId,
          program: formData.program,
          yearLevel: formData.yearLevel,
          section: formData.section,
          status: formData.status
        });
        alert("Student Updated/Verified Successfully!");
      } catch (error) {
        alert("Error updating: " + error.message);
      }
    } else {
      if(!formData.email || !formData.password) return alert("Email and Password required");
      
      const result = await createUserAccount(
        formData.email,
        formData.password,
        "STUDENT",
        formData.fullName
      );

      if (result.success) {
        const userRef = doc(db, "users", result.uid);
        await updateDoc(userRef, {
          studentId: formData.studentId,
          program: formData.program,
          yearLevel: formData.yearLevel,
          section: formData.section,
          status: formData.status,
          defaultPassword: formData.password
        });
        alert("Student Created Successfully!");
      } else {
        return alert("Error: " + result.error);
      }
    }

    setShowModal(false);
    fetchStudents();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteDoc(doc(db, "users", id));
      fetchStudents();
    }
  };

  const filteredStudents = students.filter(student => 
    student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId?.includes(searchTerm)
  );

  return (
    <div style={{padding: '20px'}}>
      {/* HEADER */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1 style={{margin: 0, color: '#104a28'}}>Manage Students</h1>
        <button 
          onClick={openAddModal}
          style={{backgroundColor: '#104a28', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}
        >
          + Add Student Manually
        </button>
      </div>

      {/* SEARCH */}
      <div className="filters" style={{background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
        <input 
          placeholder="Search by Name or ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%'}}
        />
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
              <th>Student ID</th>
              <th>Year/Sec</th>
              <th>Login Type / Password</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Loading...</td></tr> : 
             filteredStudents.length === 0 ? <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No students found.</td></tr> :
             filteredStudents.map((student) => {
               const isNew = student.studentId === "To be assigned" || !student.studentId;
               
               return (
                <tr key={student.id} style={isNew ? {backgroundColor: '#f0f9ff'} : {}}>
                  <td style={{fontWeight: 'bold'}}>
                    {student.fullName}
                    {isNew && <div style={{fontSize: '10px', color: '#1e40af', marginTop: '4px'}}>📩 {student.email}</div>}
                  </td>
                  
                  {/* STATUS BADGE */}
                  <td>
                    {isNew ? (
                      <span className="badge badge-new">⚠️ NEW</span>
                    ) : (
                      <span className={student.status === 'Irregular' ? 'badge badge-irregular' : 'badge badge-regular'}>
                        {student.status || 'Regular'}
                      </span>
                    )}
                  </td>

                  <td style={isNew ? {color: '#999', fontStyle: 'italic'} : {}}>{student.studentId || 'N/A'}</td>
                  
                  <td>{student.yearLevel} - {student.section}</td>
                  
                  {/* PASSWORD COLUMN */}
                  <td>
                    {student.defaultPassword ? (
                      <span style={{fontFamily: 'monospace', color: '#104a28'}}>{student.defaultPassword}</span>
                    ) : (
                      <span className="google-tag">
                        <span style={{color: '#4285F4'}}>G</span> Google Account
                      </span>
                    )}
                  </td>

                  <td>
                    <div style={{display: 'flex', gap: '10px'}}>
                      <button className="action-btn btn-edit" onClick={() => openEditModal(student)}>
                        {isNew ? '✅ Verify' : '✎ Edit'}
                      </button>
                      <button className="action-btn btn-delete" onClick={() => handleDelete(student.id)}>🗑 Delete</button>
                    </div>
                  </td>
                </tr>
               );
             })}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
          <div style={{background: 'white', padding: '30px', borderRadius: '12px', width: '400px'}}>
            <h2 style={{marginTop: 0, color: '#104a28'}}>{isEditing ? 'Verify / Edit Student' : 'Add New Student'}</h2>
            
            <form onSubmit={handleSaveStudent} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <input required placeholder="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={modalInputStyle} />
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#666'}}>Student ID *</label>
                <input required placeholder="Enter Student ID (e.g. 20221045)" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} style={{...modalInputStyle, borderColor: '#eab308', borderWidth: '2px'}} />
              </div>

              <input required type="email" placeholder="CvSU Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isEditing} style={{...modalInputStyle, background: isEditing ? '#f3f4f6' : 'white'}} />
              {!isEditing && (
                <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                   <input required type="text" value={formData.password} readOnly style={{...modalInputStyle, background: '#f0fdf4', color: '#166534', fontWeight: 'bold'}} />
                   <button type="button" onClick={() => setFormData({...formData, password: generatePassword()})} style={{padding: '10px', cursor: 'pointer'}}>↻</button>
                </div>
              )}

              <div style={{display: 'flex', gap: '10px'}}>
                <select style={modalInputStyle} value={formData.yearLevel} onChange={e => setFormData({...formData, yearLevel: e.target.value})}><option value="1">Year 1</option><option value="2">Year 2</option><option value="3">Year 3</option><option value="4">Year 4</option></select>
                <select style={modalInputStyle} value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}><option value="1">Sec 1</option><option value="2">Sec 2</option><option value="3">Sec 3</option></select>
              </div>
              
              <select style={modalInputStyle} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}><option value="Regular">Regular</option><option value="Irregular">Irregular</option></select>

              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button type="button" onClick={() => setShowModal(false)} style={{...modalBtnStyle, background: '#ccc', color: '#333'}}>Cancel</button>
                <button type="submit" style={{...modalBtnStyle, background: '#eab308', color: '#3e2700'}}>{isEditing ? 'Save & Verify' : 'Create Student'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const modalInputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' };
const modalBtnStyle = { flex: 1, padding: '10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' };

