import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Edit, Trash2, RefreshCw, User, Mail, Key, Upload, Eye, RotateCcw, X, Save, Filter } from 'lucide-react';
import * as XLSX from 'xlsx'; 
import './ManageStudents.css';

export default function ManageStudents() {
  // --- MAIN STATE ---
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- DYNAMIC ACADEMIC SETUP ---
  const [academicYears, setAcademicYears] = useState([]);
  const [academicSections, setAcademicSections] = useState([]);
  
  // --- WHITELIST & TRASH STATE ---
  const [allowedList, setAllowedList] = useState([]);
  const [showWhitelistModal, setShowWhitelistModal] = useState(false);
  const [whitelistLoading, setWhitelistLoading] = useState(false);
  
  const [editingWhitelistId, setEditingWhitelistId] = useState(null);
  const [whitelistEditData, setWhitelistEditData] = useState({ studentId: '', email: '' });
  const [whitelistFilterYear, setWhitelistFilterYear] = useState('ALL');

  const [trashList, setTrashList] = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [trashLoading, setTrashLoading] = useState(false);

  const fileInputRef = useRef(null);

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
        studentId: String(row['Student ID'] || row['student_id'] || row['id'] || '').trim(), 
        email: String(row['Email'] || row['email'] || '').trim()
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
          } else { alert("Upload failed: " + result.error); }
        } catch (err) { alert("Server Error"); }
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = null; 
  };

  const triggerFileInput = () => { fileInputRef.current.click(); };

  // --- 2. WHITELIST LOGIC ---
  const fetchWhitelist = async () => {
    setWhitelistLoading(true);
    try {
        const res = await fetch('http://localhost:5000/allowed-students');
        const data = await res.json();
        setAllowedList(data);
    } catch (error) { console.error("Error fetching whitelist:", error); }
    setWhitelistLoading(false);
  };

  const openWhitelist = () => {
      setShowWhitelistModal(true);
      setEditingWhitelistId(null);
      setWhitelistFilterYear('ALL'); 
      fetchWhitelist();
  };

  const deleteFromWhitelist = async (id) => {
      if(!window.confirm("Remove this student from the allowed list?")) return;
      try {
          await fetch(`http://localhost:5000/allowed-students/${id}`, { method: 'DELETE' });
          fetchWhitelist(); 
      } catch (e) { alert("Failed to delete"); }
  };

  const startEditingWhitelist = (item) => {
      setEditingWhitelistId(item.id);
      setWhitelistEditData({ studentId: item.student_id, email: item.email });
  };

  const saveWhitelistEdit = async (id) => {
      if (!whitelistEditData.studentId || !whitelistEditData.email) return alert("Fields cannot be empty.");
      try {
          const res = await fetch(`http://localhost:5000/allowed-students/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(whitelistEditData)
          });
          const data = await res.json();
          if (data.success) {
              setEditingWhitelistId(null);
              fetchWhitelist();
          } else { alert("Failed to update: " + data.error); }
      } catch (e) { alert("Server Error."); }
  };

  // ✅ DYNAMIC BATCH FILTERING FOR WHITELIST
  const whitelistBatchYears = [...new Set(
      allowedList
        .map(item => item.student_id ? String(item.student_id).substring(0, 4) : null)
        .filter(year => year && year.startsWith('20')) 
  )].sort((a, b) => b.localeCompare(a)); 

  const filteredWhitelist = allowedList.filter(item => {
      if (whitelistFilterYear === 'ALL') return true;
      return item.student_id && String(item.student_id).startsWith(whitelistFilterYear);
  });

  // --- 3. TRASH BIN LOGIC ---
  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const res = await fetch('http://localhost:5000/trash/students');
        const data = await res.json();
        setTrashList(data);
    } catch (error) { console.error("Error fetching trash:", error); }
    setTrashLoading(false);
  };

  const openTrash = () => { setShowTrashModal(true); fetchTrash(); };

  // ✅ FIX: Optimistic UI Update and corrected fetch call
  const handleRestore = async (id) => {
    if(!window.confirm("Restore this student account?")) return;
    try {
        // Remove instantly from UI
        setTrashList(prev => prev.filter(s => s.id !== id));
        
        const res = await fetch(`http://localhost:5000/users/${id}/restore`, { method: 'PUT' });
        if (res.ok) {
            fetchStudentsAndSetup(); // ✅ Corrected function name
        } else {
            alert("Failed to restore on server.");
            fetchTrash(); // Revert on failure
        }
    } catch (e) { 
        alert("Failed to restore"); 
        fetchTrash();
    }
  };

  // ✅ FIX: Optimistic UI Update for Permanent Deletion
  const handlePermanentDelete = async (id) => {
    if(!window.confirm("WARNING: This will permanently delete the student and their grades. This cannot be undone.")) return;
    try {
        // Remove instantly from UI
        setTrashList(prev => prev.filter(s => s.id !== id));

        const res = await fetch(`http://localhost:5000/users/${id}/permanent`, { method: 'DELETE' });
        if (!res.ok) {
            alert("Failed to delete permanently on server.");
            fetchTrash(); // Revert on failure
        }
    } catch (e) { 
        alert("Failed to delete permanently"); 
        fetchTrash(); 
    }
  };

  // --- EXISTING MANAGE LOGIC ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBatch, setFilterBatch] = useState('ALL');
  const [filterYear, setFilterYear] = useState('ALL');
  const [filterSection, setFilterSection] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', email: '', studentId: '',
    program: 'Bachelor of Science in Information Technology',
    yearLevel: '1', section: '1', status: 'Regular', password: ''
  });

  const generatePassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let randomLetters = "";
    for (let i = 0; i < 8; i++) { randomLetters += letters.charAt(Math.floor(Math.random() * letters.length)); }
    const randomNum = Math.floor(Math.random() * 999) + 1;
    return `${randomLetters}${randomNum}`;
  };

  const fetchStudentsAndSetup = async () => {
    setLoading(true);
    try {
      const [studentsRes, setupRes] = await Promise.all([
        fetch('http://localhost:5000/users?role=STUDENT'),
        fetch('http://localhost:5000/academic-setup')
      ]);
      const studentData = await studentsRes.json();
      const setupData = await setupRes.json();

      if (!setupData.error) {
        setAcademicYears(setupData.yearLevels || []);
        setAcademicSections(setupData.sections || []);
      }
      
      const formatted = studentData.map(user => ({
        id: user.id, fullName: user.full_name, email: user.email, studentId: user.student_id,
        program: user.program || 'Bachelor of Science in Information Technology',
        yearLevel: user.year_level, section: user.section, status: user.status || 'Regular', defaultPassword: '' 
      }));

      const sortedList = formatted.sort((a, b) => {
        const aIsNew = !a.studentId || a.studentId === "To be assigned";
        const bIsNew = !b.studentId || b.studentId === "To be assigned";
        if (aIsNew && !bIsNew) return -1;
        if (!aIsNew && bIsNew) return 1;
        return a.fullName.localeCompare(b.fullName); 
      });

      setStudents(sortedList);
    } catch (error) { console.error("Error fetching students/setup:", error); }
    setLoading(false);
  };

  useEffect(() => { fetchStudentsAndSetup(); }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ 
      firstName: '', middleName: '', lastName: '', email: '', studentId: '', 
      program: 'Bachelor of Science in Information Technology', 
      yearLevel: academicYears.length > 0 ? academicYears[0].year_name : '1', 
      section: academicSections.length > 0 ? academicSections[0].section_name : '1', 
      status: 'Regular', password: generatePassword()
    });
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setIsEditing(true);
    setEditId(student.id);
    const cleanStudentId = (!student.studentId || student.studentId === "To be assigned") ? "" : student.studentId;
    
    let fName = '', mName = '', lName = '';
    if (student.fullName) {
      const commaSplit = student.fullName.split(','); 
      if (commaSplit.length > 0) lName = commaSplit[0].trim(); 
      if (commaSplit.length > 1) {
        const parts = commaSplit[1].trim().split(' ');
        if (parts.length > 1) {
            mName = parts.pop().replace('.', ''); 
            fName = parts.join(' '); 
        } else { fName = parts[0]; }
      }
    }

    setFormData({
      firstName: fName, middleName: mName, lastName: lName, email: student.email, studentId: cleanStudentId,
      program: student.program, yearLevel: student.yearLevel, section: student.section, status: student.status || 'Regular', password: ''
    });
    setShowModal(true);
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    if(!formData.lastName || !formData.firstName) return alert("Name fields required.");
    if (!formData.email.endsWith('@cvsu.edu.ph')) return alert("Invalid Email! Use @cvsu.edu.ph");

    const finalLastName = formData.lastName.toUpperCase().trim();
    const finalFirstName = formData.firstName.toUpperCase().trim();
    let finalMiddleName = '';
    if (formData.middleName && formData.middleName.trim() !== '') {
        finalMiddleName = formData.middleName.trim().charAt(0).toUpperCase() + '.';
    }
    const fullNameCombined = finalMiddleName ? `${finalLastName}, ${finalFirstName} ${finalMiddleName}` : `${finalLastName}, ${finalFirstName}`;

    const payload = { ...formData, fullName: fullNameCombined, role: 'STUDENT' };

    try {
      let url = isEditing ? `http://localhost:5000/users/${editId}` : 'http://localhost:5000/users';
      let method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();

      if (data.success) {
        alert(isEditing ? "Updated!" : "Created!");
        setShowModal(false); fetchStudentsAndSetup();
      } else { alert("Error: " + data.error); }
    } catch (error) { alert("Server connection failed."); }
  };

  const handleSoftDelete = async (id) => {
    if (window.confirm("Move this student to the Trash Bin? They can be restored later.")) {
      try {
        await fetch(`http://localhost:5000/users/${id}/soft-delete`, { method: 'PUT' });
        fetchStudentsAndSetup(); 
      } catch (error) { alert("Delete failed."); }
    }
  };

  const handleAdminReset = async (student) => {
    const newPassword = window.prompt(`Enter new password for ${student.fullName}:`, "cvsu1234");
    if (!newPassword) return;
    try {
      const response = await fetch('http://localhost:5000/admin-reset-password', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uid: student.id, new_password: newPassword })
      });
      const data = await response.json();
      if (data.success) alert("Password reset successful.");
    } catch (error) { alert("Failed to reset password."); }
  };

  // ✅ DYNAMIC FILTERING LOGIC
  const mainBatchYears = [...new Set(
    students
      .map(item => item.studentId ? String(item.studentId).substring(0, 4) : null)
      .filter(year => year && year.startsWith('20')) 
  )].sort((a, b) => b.localeCompare(a));

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || student.studentId?.includes(searchTerm);
    const matchesBatch = filterBatch !== 'ALL' ? (student.studentId && String(student.studentId).startsWith(filterBatch)) : true;
    const matchesYear = filterYear !== 'ALL' ? student.yearLevel == filterYear : true; // using == to handle string/int mismatches
    const matchesSection = filterSection !== 'ALL' ? student.section == filterSection : true;
    const matchesStatus = filterStatus !== 'ALL' ? student.status === filterStatus : true;
    return matchesSearch && matchesBatch && matchesYear && matchesSection && matchesStatus;
  });

  const clearFilters = () => { setSearchTerm(''); setFilterBatch('ALL'); setFilterYear('ALL'); setFilterSection('ALL'); setFilterStatus('ALL'); };

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
            <input type="file" accept=".xlsx, .xls" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileUpload} />
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

      {/* FILTER BAR (Dynamic) */}
      <div className="filter-bar" style={{flexWrap: 'wrap', gap: '10px'}}>
        <div className="search-wrapper" style={{minWidth: '200px'}}>
          <Search className="search-icon" size={18} />
          <input className="search-input" placeholder="Search ID or Name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <select className="filter-select" value={filterBatch} onChange={e => setFilterBatch(e.target.value)}>
          <option value="ALL">All Batches</option>
          {mainBatchYears.map(y => <option key={y} value={y}>Batch {y}</option>)}
        </select>
        <select className="filter-select" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
          <option value="ALL">All Years</option>
          {academicYears.map(y => <option key={y.id} value={y.year_name}>Year {y.year_name}</option>)}
        </select>
        <select className="filter-select" value={filterSection} onChange={e => setFilterSection(e.target.value)}>
          <option value="ALL">All Sections</option>
          {academicSections.map(s => <option key={s.id} value={s.section_name}>Section {s.section_name}</option>)}
        </select>
        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="ALL">All Statuses</option>
          <option value="Regular">Regular</option>
          <option value="Irregular">Irregular</option>
          <option value="Dropped">Dropped</option>
        </select>
        <button className="btn-reset" onClick={clearFilters}>Reset</button>
      </div>

      {/* MAIN TABLE */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student Name</th><th>Program</th><th>Status</th><th>Student ID</th><th>Year/Sec</th><th style={{textAlign: 'right'}}>Actions</th>
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
                      <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}><User size={16} color="#104a28"/> {student.fullName}</div>
                      <div style={{fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px'}}><Mail size={12}/> {student.email}</div>
                    </td>
                    <td><span style={{fontSize: '12px', fontWeight: '500', color: '#555'}}>{student.program.replace('Bachelor of Science in', 'BS')}</span></td>
                    <td>{isNew ? <span className="badge badge-new">Verification</span> : <span className={`badge ${getStatusClass(student.status)}`}>{student.status || 'Regular'}</span>}</td>
                    <td style={{fontFamily: 'monospace'}}>{student.studentId || 'N/A'}</td>
                    <td>{student.yearLevel}-{student.section}</td>
                    <td>
                      <div className="action-buttons" style={{justifyContent: 'flex-end'}}>
                        {!isNew && <button className="btn-icon" style={{color: '#d97706', background: '#fef3c7', marginRight: '5px'}} onClick={() => handleAdminReset(student)} title="Reset Password"><Key size={18} /></button>}
                        <button className={`btn-icon ${isNew ? 'btn-verify' : 'btn-edit'}`} onClick={() => openEditModal(student)}>{isNew ? "Verify" : <Edit size={18} />}</button>
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

      {/* --- RE-DESIGNED WHITELIST MODAL --- */}
      {showWhitelistModal && (
        <div className="modal-overlay" onClick={() => setShowWhitelistModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{width: '800px', maxWidth: '95vw', padding: 0, overflow: 'hidden'}}>
                
                <div style={{background: '#104a28', padding: '20px 24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><Eye size={22}/> Allowed Students (Whitelist)</h2>
                    <button onClick={() => setShowWhitelistModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}><X size={24}/></button>
                </div>

                <div style={{padding: '15px 24px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <Filter size={16} color="#6b7280"/>
                    <span style={{fontSize: '13px', fontWeight: 'bold', color: '#4b5563'}}>Filter by Batch:</span>
                    <select
                        value={whitelistFilterYear}
                        onChange={(e) => setWhitelistFilterYear(e.target.value)}
                        style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '13px', outline: 'none', cursor: 'pointer', minWidth: '150px'}}
                    >
                        <option value="ALL">All Batches</option>
                        {whitelistBatchYears.map(year => (
                            <option key={year} value={year}>Batch {year}</option>
                        ))}
                    </select>
                    <span style={{marginLeft: 'auto', fontSize: '12px', color: '#6b7280', fontWeight: '500'}}>
                        Showing {filteredWhitelist.length} students
                    </span>
                </div>

                <div style={{padding: '0 24px 24px 24px', maxHeight: '60vh', overflowY: 'auto'}}>
                    {whitelistLoading ? <p style={{textAlign: 'center', color: '#666', padding: '20px'}}>Loading whitelist...</p> : filteredWhitelist.length === 0 ? <p style={{color: '#888', textAlign:'center', padding: '20px'}}>No students found.</p> : (
                        <table className="data-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead style={{background: '#ffffff', position: 'sticky', top: 0, zIndex: 10}}>
                                <tr>
                                    <th style={{padding: '16px 12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', color: '#4b5563', fontSize: '13px', fontWeight: '700'}}>Student ID</th>
                                    <th style={{padding: '16px 12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', color: '#4b5563', fontSize: '13px', fontWeight: '700'}}>Email Address</th>
                                    <th style={{padding: '16px 12px', textAlign: 'right', borderBottom: '2px solid #e5e7eb', color: '#4b5563', fontSize: '13px', fontWeight: '700'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWhitelist.map((item) => {
                                    const isItemEditing = editingWhitelistId === item.id;
                                    return (
                                        <tr key={item.id} style={{borderBottom: '1px solid #f3f4f6', background: isItemEditing ? '#f0fdf4' : 'transparent'}}>
                                            {isItemEditing ? (
                                                <>
                                                    <td style={{padding: '8px 12px'}}>
                                                        <input autoFocus style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #10b981', outline: 'none', fontFamily: 'monospace', fontSize: '13px'}} value={whitelistEditData.studentId} onChange={(e) => setWhitelistEditData({...whitelistEditData, studentId: e.target.value})} />
                                                    </td>
                                                    <td style={{padding: '8px 12px'}}>
                                                        <input style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #10b981', outline: 'none', fontSize: '13px'}} value={whitelistEditData.email} onChange={(e) => setWhitelistEditData({...whitelistEditData, email: e.target.value})} />
                                                    </td>
                                                    <td style={{padding: '8px 12px', textAlign: 'right'}}>
                                                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '5px'}}>
                                                            <button onClick={() => saveWhitelistEdit(item.id)} style={{background: '#10b981', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 'bold'}}><Save size={14}/> Save</button>
                                                            <button onClick={() => setEditingWhitelistId(null)} style={{background: '#f3f4f6', color: '#4b5563', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold'}}>Cancel</button>
                                                        </div>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td style={{padding: '12px', fontWeight:'600', fontFamily: 'monospace', color: '#111'}}>{item.student_id}</td>
                                                    <td style={{padding: '12px', color: '#4b5563', fontSize: '14px'}}>{item.email}</td>
                                                    <td style={{padding: '12px', textAlign: 'right'}}>
                                                        <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
                                                            <button className="btn-icon btn-edit" style={{background: '#f3f4f6', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer', color: '#0ea5e9'}} onClick={() => startEditingWhitelist(item)} title="Edit Entry"><Edit size={16}/></button>
                                                            <button className="btn-icon btn-delete" style={{background: '#fee2e2', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer', color: '#dc2626'}} onClick={() => deleteFromWhitelist(item.id)} title="Remove from Whitelist"><Trash2 size={16}/></button>
                                                        </div>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
      )}

      {/* --- TRASH BIN MODAL --- */}
      {showTrashModal && (
        <div className="modal-overlay" onClick={() => setShowTrashModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{width: '700px', padding: 0, overflow: 'hidden'}}>
                <div style={{background: '#dc2626', padding: '20px 24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><Trash2 size={22}/> Trash Bin</h2>
                    <button onClick={() => setShowTrashModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#fecaca'}}><X size={24}/></button>
                </div>
                
                <div style={{maxHeight: '400px', overflowY: 'auto', padding: '24px'}}>
                    {trashLoading ? <p style={{textAlign:'center', color: '#666'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center'}}>Trash bin is empty.</p> : (
                        <table className="data-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead style={{background: '#f9fafb'}}>
                                <tr>
                                    <th style={{padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb'}}>Name</th>
                                    <th style={{padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb'}}>Student ID</th>
                                    <th style={{padding: '12px', textAlign: 'right', borderBottom: '2px solid #e5e7eb'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trashList.map((item) => (
                                    <tr key={item.id} style={{borderBottom: '1px solid #f3f4f6'}}>
                                        <td style={{padding: '12px', fontWeight:'bold', color: '#4b5563'}}>{item.full_name}</td>
                                        <td style={{padding: '12px', fontFamily: 'monospace', color: '#666'}}>{item.student_id}</td>
                                        <td style={{padding: '12px', textAlign: 'right'}}>
                                            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#10b981', color: 'white', border: 'none'}} onClick={() => handleRestore(item.id)}><RotateCcw size={14} style={{marginRight: 5}}/> Restore</button>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#dc2626', color: 'white', border: 'none'}} onClick={() => handlePermanentDelete(item.id)}><Trash2 size={14} style={{marginRight: 5}}/> Delete</button>
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
              
              {/* DYNAMIC MODAL DROPDOWNS */}
              <div style={{display: 'flex', gap: '16px'}}>
                <div className="form-group" style={{flex: 1}}>
                    <label className="form-label">Year</label>
                    <select className="form-input" value={formData.yearLevel} onChange={e => setFormData({...formData, yearLevel: e.target.value})}>
                        {academicYears.map(y => <option key={y.id} value={y.year_name}>{y.year_name}</option>)}
                    </select>
                </div>
                <div className="form-group" style={{flex: 1}}>
                    <label className="form-label">Section</label>
                    <select className="form-input" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})}>
                        {academicSections.map(s => <option key={s.id} value={s.section_name}>{s.section_name}</option>)}
                    </select>
                </div>
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