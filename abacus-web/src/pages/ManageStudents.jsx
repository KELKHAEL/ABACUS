import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, createUserAccount } from '../firebaseWeb';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  RefreshCw, 
  User, 
  Mail,
  Key  // <--- Added Key Icon
} from 'lucide-react';
import './ManageStudents.css';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

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
        // Sort new students to top
        const aIsNew = a.studentId === "To be assigned" || !a.studentId;
        const bIsNew = b.studentId === "To be assigned" || !b.studentId;
        if (aIsNew && !bIsNew) return -1;
        if (!aIsNew && bIsNew) return 1;
        return a.fullName.localeCompare(b.fullName); 
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
      fullName: '', email: '', studentId: '', 
      program: 'BSIT', yearLevel: '1', section: '1', 
      status: 'Regular', password: generatePassword()
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

  // --- NEW ADMIN RESET FUNCTION ---
  const handleAdminReset = async (student) => {
    const newPassword = window.prompt(`Enter new password for ${student.fullName}:`, "cvsu1234");
    
    if (!newPassword) return; // Cancelled
    if (newPassword.length < 6) return alert("Password must be at least 6 characters.");

    try {
      // Call LOCAL server (Make sure npm run server is running)
      const response = await fetch('http://localhost:5000/admin-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: student.id, 
          new_password: newPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(`Success! Password for ${student.fullName} is now: ${newPassword}`);
      } else {
        throw new Error(data.error);
      }

    } catch (error) {
      console.error(error);
      alert("Failed to reset. Ensure 'npm run server' is running.");
    }
  };

  // MULTI-FILTER LOGIC
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.studentId?.includes(searchTerm);
    
    const matchesYear = filterYear ? student.yearLevel === filterYear : true;
    const matchesSection = filterSection ? student.section === filterSection : true;
    const matchesStatus = filterStatus ? student.status === filterStatus : true;

    return matchesSearch && matchesYear && matchesSection && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterYear('');
    setFilterSection('');
    setFilterStatus('');
  };

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="page-title">Manage Students</h1>
        <button className="btn-primary" onClick={openAddModal}>
          <Plus size={20} />
          Add Student Manually
        </button>
      </div>

      {/* FILTER BAR */}
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

        <select className="filter-select" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
          <option value="">All Years</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <select className="filter-select" value={filterSection} onChange={e => setFilterSection(e.target.value)}>
          <option value="">All Sections</option>
          <option value="1">Section 1</option>
          <option value="2">Section 2</option>
          <option value="3">Section 3</option>
        </select>

        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Regular">Regular</option>
          <option value="Irregular">Irregular</option>
        </select>

        <button className="btn-reset" onClick={clearFilters}>
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
              <th>Student ID</th>
              <th>Year/Sec</th>
              <th>Access Key / Password</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '40px'}}>Loading Students...</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '40px', color: '#888'}}>No students found matching filters.</td></tr>
            ) : (
              filteredStudents.map((student) => {
                const isNew = student.studentId === "To be assigned" || !student.studentId;
                
                return (
                  <tr key={student.id}>
                    <td>
                      {/* UPDATED: Added Icons for Name and Email */}
                      <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <User size={16} color="#104a28"/>
                        {student.fullName}
                      </div>
                      <div style={{fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px'}}>
                        <Mail size={12}/>
                        {student.email}
                      </div>
                    </td>
                    
                    <td>
                      {isNew ? (
                        <span className="badge badge-new">Needs Verification</span>
                      ) : (
                        <span className={`badge ${student.status === 'Irregular' ? 'badge-irregular' : 'badge-regular'}`}>
                          {student.status || 'Regular'}
                        </span>
                      )}
                    </td>

                    <td style={{fontFamily: 'monospace', color: isNew ? '#ef4444' : '#374151'}}>
                      {student.studentId || 'Not Assigned'}
                    </td>
                    
                    <td>{student.yearLevel} - {student.section}</td>
                    
                    <td>
                      {student.defaultPassword ? (
                        // UPDATED: Used class instead of inline style
                        <span className="password-box">
                          {student.defaultPassword}
                        </span>
                      ) : (
                        <span className="google-tag">
                           <span style={{color: '#4285F4', fontWeight: 'bold'}}>G</span> Google
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="action-buttons" style={{justifyContent: 'flex-end'}}>
                        
                        {/* --- NEW RESET PASSWORD BUTTON --- */}
                        {!isNew && (
                          <button 
                            className="btn-icon" 
                            style={{color: '#d97706', background: '#fef3c7', marginRight: '5px'}}
                            onClick={() => handleAdminReset(student)} 
                            title="Reset Password"
                          >
                            <Key size={18} />
                          </button>
                        )}
                        {/* --------------------------------- */}

                        <button className={`btn-icon ${isNew ? 'btn-verify' : 'btn-edit'}`} onClick={() => openEditModal(student)} title="Edit / Verify">
                           {isNew ? "Verify" : <Edit size={18} />}
                        </button>
                        <button className="btn-icon btn-delete" onClick={() => handleDelete(student.id)} title="Delete">
                          <Trash2 size={18} />
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

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{isEditing ? 'Edit Student Details' : 'Add New Student'}</h2>
            </div>
            
            <form onSubmit={handleSaveStudent}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>

              <div className="form-group">
                <label className="form-label">Student ID <span style={{color: '#ca8a04'}}>(Required)</span></label>
                <input className="form-input" required placeholder="e.g. 20221045" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} style={{borderColor: '#fbbf24'}}/>
              </div>

              <div style={{display: 'flex', gap: '16px'}}>
                <div className="form-group" style={{flex: 1}}>
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isEditing} style={{background: isEditing ? '#f3f4f6' : 'white'}} />
                </div>
                {!isEditing && (
                  <div className="form-group" style={{flex: 1}}>
                      <label className="form-label">Password</label>
                      <div style={{display: 'flex', gap: '8px'}}>
                        <input className="form-input" value={formData.password} readOnly style={{background: '#f0fdf4', color: '#15803d', fontWeight: 'bold'}} />
                        <button type="button" onClick={() => setFormData({...formData, password: generatePassword()})} style={{padding: '8px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '6px', background: 'white'}}><RefreshCw size={16}/></button>
                      </div>
                  </div>
                )}
              </div>

              <div style={{display: 'flex', gap: '16px'}}>
                <div className="form-group" style={{flex: 1}}>
                  <label className="form-label">Year Level</label>
                  <select className="form-input" value={formData.yearLevel} onChange={e => setFormData({...formData, yearLevel: e.target.value})}>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>
                <div className="form-group" style={{flex: 1}}>
                  <label className="form-label">Section</label>
                  <select className="form-input" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}>
                    <option value="1">Section 1</option>
                    <option value="2">Section 2</option>
                    <option value="3">Section 3</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Regular">Regular</option>
                  <option value="Irregular">Irregular</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-save">
                  {isEditing ? 'Save Changes' : 'Create Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}