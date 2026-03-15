import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Edit, Trash2, RefreshCw, User, Mail, Key, Upload, Eye, RotateCcw } from 'lucide-react';
import * as XLSX from 'xlsx'; 
import './ManageStudents.css';

export default function ManageStudents() {
  // --- MAIN STATE ---
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- WHITELIST & TRASH STATE ---
  const [allowedList, setAllowedList] = useState([]);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const [whitelistLoading, setWhitelistLoading] = useState(false);

  const [trashList, setTrashList] = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [trashLoading, setTrashLoading] = useState(false);

  const fileInputRef = useRef(null);

  // --- 1. EXCEL UPLOAD LOGIC ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const formattedData = data.map(row => ({
        studentId: row['Student ID'] || row['student_id'] || row['id'], 
        email: row['Email'] || row['email']
      })).filter(item => item.studentId && item.email);

      if (formattedData.length === 0) {
        alert("No valid data found. Ensure columns are named 'Student ID' and 'Email'.");
        return;
      }

      if (window.confirm(`Found ${formattedData.length} students. Upload to whitelist?`)) {
        try {
          const res = await fetch('http://localhost:5000/upload-allowed-students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ students: formattedData })
          });
          const result = await res.json();
          if (result.success) {
            alert("Upload Successful! Students can now register.");
            if (showWhitelistModal) fetchWhitelist(); 
          } else {
            alert("Upload failed: " + result.error);
          }
        } catch (err) {
          alert("Server Error");
        }
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = null; 
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // --- 2. WHITELIST LOGIC ---
  const fetchWhitelist = async () => {
    setWhitelistLoading(true);
    try {
        const res = await fetch('http://localhost:5000/allowed-students');
        const data = await res.json();
        setAllowedList(data);
    } catch (error) {
        console.error("Error fetching whitelist:", error);
    }
    setWhitelistLoading(false);
  };

  const openWhitelist = () => {
      setShowWhitelistModal(true);
      fetchWhitelist();
  };

  const deleteFromWhitelist = async (id) => {
      if(!window.confirm("Remove this student from the allowed list?")) return;
      try {
          await fetch(`http://localhost:5000/allowed-students/${id}`, { method: 'DELETE' });
          fetchWhitelist(); 
      } catch (e) {
          alert("Failed to delete");
      }
  };

  // --- 3. TRASH BIN LOGIC ---
  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const res = await fetch('http://localhost:5000/trash/students');
        const data = await res.json();
        setTrashList(data);
    } catch (error) {
        console.error("Error fetching trash:", error);
    }
    setTrashLoading(false);
  };

  const openTrash = () => {
    setShowTrashModal(true);
    fetchTrash();
  };

  const handleRestore = async (id) => {
    if(!window.confirm("Restore this student account?")) return;
    try {
        await fetch(`http://localhost:5000/users/${id}/restore`, { method: 'PUT' });
        fetchTrash(); 
        fetchStudents(); 
    } catch (e) {
        alert("Failed to restore");
    }
  };

  const handlePermanentDelete = async (id) => {
    if(!window.confirm("WARNING: This will permanently delete the student and their grades. This cannot be undone.")) return;
    try {
        await fetch(`http://localhost:5000/users/${id}/permanent`, { method: 'DELETE' });
        fetchTrash();
    } catch (e) {
        alert("Failed to delete permanently");
    }
  };

  // --- EXISTING MANAGE LOGIC ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    studentId: '',
    program: 'Bachelor of Science in Information Technology',
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

  // --- FETCH MAIN STUDENTS ---
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/users?role=STUDENT');
      const data = await res.json();
      
      const formatted = data.map(user => ({
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        studentId: user.student_id,
        program: user.program || 'Bachelor of Science in Information Technology',
        yearLevel: user.year_level,
        section: user.section,
        status: user.status || 'Regular',
        defaultPassword: '' 
      }));

      const sortedList = formatted.sort((a, b) => {
        const aIsNew = !a.studentId || a.studentId === "To be assigned";
        const bIsNew = !b.studentId || b.studentId === "To be assigned";
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

  // --- MODAL HELPERS ---
  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ 
      firstName: '', middleName: '', lastName: '', 
      email: '', studentId: '', 
      program: 'Bachelor of Science in Information Technology', 
      yearLevel: '1', section: '1', 
      status: 'Regular', password: generatePassword()
    });
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setIsEditing(true);
    setEditId(student.id);
    const cleanStudentId = (!student.studentId || student.studentId === "To be assigned") ? "" : student.studentId;
    
    // --- FIX: UNIVERSAL PARSING LOGIC ---
    let fName = '', mName = '', lName = '';
    
    if (student.fullName) {
      const commaSplit = student.fullName.split(','); 
      
      if (commaSplit.length > 0) {
        lName = commaSplit[0].trim(); 
      }
      
      if (commaSplit.length > 1) {
        const parts = commaSplit[1].trim().split(' ');
        
        // If there are multiple words, ALWAYS treat the last word as the middle name/initial
        // We remove any dots just in case it already has one.
        if (parts.length > 1) {
            mName = parts.pop().replace('.', ''); // Pop takes the last item out of the array
            fName = parts.join(' '); // The rest is the first name
        } else {
            fName = parts[0]; 
        }
      }
    }

    setFormData({
      firstName: fName,
      middleName: mName,
      lastName: lName,
      email: student.email,
      studentId: cleanStudentId,
      program: student.program,
      yearLevel: student.yearLevel,
      section: student.section,
      status: student.status || 'Regular',
      password: ''
    });
    setShowModal(true);
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    if(!formData.lastName || !formData.firstName) return alert("Name fields required.");
    if (!formData.email.endsWith('@cvsu.edu.ph')) return alert("Invalid Email! Use @cvsu.edu.ph");

    // ENFORCE UPPERCASE AND MIDDLE INITIAL
    const finalLastName = formData.lastName.toUpperCase().trim();
    const finalFirstName = formData.firstName.toUpperCase().trim();
    
    let finalMiddleName = '';
    if (formData.middleName && formData.middleName.trim() !== '') {
        // Automatically turns a full word like "VILLAFUERTE" into "V."
        finalMiddleName = formData.middleName.trim().charAt(0).toUpperCase() + '.';
    }
    
    const fullNameCombined = finalMiddleName 
        ? `${finalLastName}, ${finalFirstName} ${finalMiddleName}` 
        : `${finalLastName}, ${finalFirstName}`;

    const payload = { ...formData, fullName: fullNameCombined, role: 'STUDENT' };

    try {
      let url = 'http://localhost:5000/users';
      let method = 'POST';

      if (isEditing) {
        url = `http://localhost:5000/users/${editId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        alert(isEditing ? "Updated!" : "Created!");
        setShowModal(false);
        fetchStudents();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      alert("Server connection failed.");
    }
  };

  // --- HANDLE SOFT DELETE ---
  const handleSoftDelete = async (id) => {
    if (window.confirm("Move this student to the Trash Bin? They can be restored later.")) {
      try {
        await fetch(`http://localhost:5000/users/${id}/soft-delete`, { method: 'PUT' });
        fetchStudents(); 
      } catch (error) {
        alert("Delete failed.");
      }
    }
  };

  const handleAdminReset = async (student) => {
    const newPassword = window.prompt(`Enter new password for ${student.fullName}:`, "cvsu1234");
    if (!newPassword) return;
    try {
      const response = await fetch('http://localhost:5000/admin-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: student.id, new_password: newPassword })
      });
      const data = await response.json();
      if (data.success) alert("Password reset successful.");
    } catch (error) {
      alert("Failed to reset password.");
    }
  };

  // --- FILTERING ---
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.studentId?.includes(searchTerm);
    const matchesYear = filterYear ? student.yearLevel === filterYear : true;
    const matchesSection = filterSection ? student.section === filterSection : true;
    const matchesStatus = filterStatus ? student.status === filterStatus : true;
    return matchesSearch && matchesYear && matchesSection && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm(''); setFilterYear(''); setFilterSection(''); setFilterStatus('');
  };

  // Helper for Status Badge Class
  const getStatusClass = (status) => {
      if (status === 'Irregular') return 'badge-irregular';
      if (status === 'Dropped') return 'badge-dropped';
      return 'badge-regular';
  };

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="page-title">Manage Students</h1>
        
        <div style={{display: 'flex', gap: '10px'}}>
            <input 
              type="file" 
              accept=".xlsx, .xls" 
              ref={fileInputRef} 
              style={{display: 'none'}} 
              onChange={handleFileUpload} 
            />
            
            <button className="btn-secondary" style={{backgroundColor: '#ef4444'}} onClick={openTrash}>
              <Trash2 size={20} /> Trash Bin
            </button>

            <button className="btn-secondary" style={{backgroundColor: '#6b7280'}} onClick={openWhitelist}>
              <Eye size={20} /> Whitelist
            </button>
            <button className="btn-secondary" onClick={triggerFileInput}>
              <Upload size={20} /> Upload List
            </button>
            <button className="btn-primary" onClick={openAddModal}>
              <Plus size={20} /> Add Student
            </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input className="search-input" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
        <button className="btn-reset" onClick={clearFilters}>Reset</button>
      </div>

      {/* MAIN TABLE */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Program</th>
              <th>Status</th>
              <th>Student ID</th>
              <th>Year/Sec</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '40px'}}>Loading...</td></tr>
            ) : filteredStudents.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '40px', color: '#888'}}>No students found.</td></tr>
            ) : (
              filteredStudents.map((student) => {
                const isNew = !student.studentId || student.studentId === "To be assigned";
                return (
                  <tr key={student.id}>
                    <td>
                      <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <User size={16} color="#104a28"/> {student.fullName}
                      </div>
                      <div style={{fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px'}}>
                        <Mail size={12}/> {student.email}
                      </div>
                    </td>
                    <td><span style={{fontSize: '12px', fontWeight: '500', color: '#555'}}>{student.program.replace('Bachelor of Science in', 'BS')}</span></td>
                    <td>
                      {isNew ? <span className="badge badge-new">Verification</span> : 
                        <span className={`badge ${getStatusClass(student.status)}`}>{student.status || 'Regular'}</span>
                      }
                    </td>
                    <td style={{fontFamily: 'monospace'}}>{student.studentId || 'N/A'}</td>
                    <td>{student.yearLevel}-{student.section}</td>
                    <td>
                      <div className="action-buttons" style={{justifyContent: 'flex-end'}}>
                        {!isNew && (
                          <button className="btn-icon" style={{color: '#d97706', background: '#fef3c7', marginRight: '5px'}} onClick={() => handleAdminReset(student)} title="Reset Password"><Key size={18} /></button>
                        )}
                        <button className={`btn-icon ${isNew ? 'btn-verify' : 'btn-edit'}`} onClick={() => openEditModal(student)}>
                           {isNew ? "Verify" : <Edit size={18} />}
                        </button>
                        <button className="btn-icon btn-delete" onClick={() => handleSoftDelete(student.id)} title="Move to Trash"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* --- WHITELIST MODAL --- */}
      {showWhitelistModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '600px'}}>
                <div className="modal-header">
                    <h2 className="modal-title">Allowed Students (Whitelist)</h2>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {whitelistLoading ? <p>Loading...</p> : allowedList.length === 0 ? <p style={{color: '#888', textAlign:'center'}}>No data.</p> : (
                        <table className="data-table">
                            <thead><tr><th>Student ID</th><th>Email</th><th style={{textAlign: 'right'}}>Action</th></tr></thead>
                            <tbody>
                                {allowedList.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{fontWeight:'bold'}}>{item.student_id}</td>
                                        <td>{item.email}</td>
                                        <td style={{textAlign: 'right'}}>
                                            <button className="btn-icon btn-delete" style={{marginLeft: 'auto'}} onClick={() => deleteFromWhitelist(item.id)}><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="modal-actions"><button className="btn-cancel" onClick={() => setShowWhitelistModal(false)}>Close</button></div>
            </div>
        </div>
      )}

      {/* --- TRASH BIN MODAL --- */}
      {showTrashModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '700px'}}>
                <div className="modal-header">
                    <h2 className="modal-title" style={{color: '#dc2626'}}>Trash Bin (Deleted Students)</h2>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {trashLoading ? <p style={{textAlign:'center'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center'}}>Trash bin is empty.</p> : (
                        <table className="data-table">
                            <thead><tr><th>Name</th><th>Student ID</th><th style={{textAlign: 'right'}}>Actions</th></tr></thead>
                            <tbody>
                                {trashList.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{fontWeight:'bold', color: '#666'}}>{item.full_name}</td>
                                        <td>{item.student_id}</td>
                                        <td style={{textAlign: 'right'}}>
                                            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#10b981'}} onClick={() => handleRestore(item.id)}>
                                                    <RotateCcw size={14} style={{marginRight: 5}}/> Restore
                                                </button>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#dc2626'}} onClick={() => handlePermanentDelete(item.id)}>
                                                    <Trash2 size={14} style={{marginRight: 5}}/> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="modal-actions"><button className="btn-cancel" onClick={() => setShowTrashModal(false)}>Close</button></div>
            </div>
        </div>
      )}

      {/* --- ADD/EDIT MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header"><h2 className="modal-title">{isEditing ? 'Edit Student' : 'Add Student'}</h2></div>
            <form onSubmit={handleSaveStudent}>
              <div style={{display: 'flex', gap: '16px'}}>
                  <div className="form-group" style={{flex: 1}}>
                    <label className="form-label">Last Name</label>
                    <input className="form-input" required placeholder="Dela Cruz" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                  <div className="form-group" style={{flex: 1}}>
                    <label className="form-label">First Name</label>
                    <input className="form-input" required placeholder="Juan" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
              </div>
              <div className="form-group"><label className="form-label">Middle Name</label><input className="form-input" placeholder="Santos (or Initial)" value={formData.middleName} onChange={e => setFormData({...formData, middleName: e.target.value})} /></div>
              <div className="form-group"><label className="form-label">Student ID</label><input className="form-input" required placeholder="20221045" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} /></div>
              <div className="form-group">
                <label className="form-label">Program</label>
                <select className="form-input" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})}>
                  <option value="Bachelor of Science in Information Technology">Bachelor of Science in Information Technology</option>
                  <option value="Bachelor of Secondary Education - Major in Mathematics">Bachelor of Secondary Education - Major in Mathematics</option>
                  <option value="Bachelor of Secondary Education - Major in English">Bachelor of Secondary Education - Major in English</option>
                  <option value="Bachelor of Science in Business Management">Bachelor of Science in Business Management</option>
                </select>
              </div>
              <div style={{display: 'flex', gap: '16px'}}>
                <div className="form-group" style={{flex: 1}}><label className="form-label">Email</label><input className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isEditing} /></div>
                {!isEditing && <div className="form-group" style={{flex: 1}}><label className="form-label">Password</label><input className="form-input" value={formData.password} readOnly /></div>}
              </div>
              <div style={{display: 'flex', gap: '16px'}}>
                <div className="form-group" style={{flex: 1}}><label className="form-label">Year</label><select className="form-input" value={formData.yearLevel} onChange={e => setFormData({...formData, yearLevel: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></div>
                <div className="form-group" style={{flex: 1}}><label className="form-label">Section</label><select className="form-input" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></div>
              </div>
              <div className="form-group"><label className="form-label">Status</label><select className="form-input" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}><option value="Regular">Regular</option><option value="Irregular">Irregular</option><option value="Dropped">Dropped</option></select></div>
              <div className="modal-actions"><button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button><button type="submit" className="btn-save">Save</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}