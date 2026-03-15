import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, RefreshCw, Mail, User, Filter, X, BookOpen, RotateCcw } from 'lucide-react'; 
import './ManageInstructors.css';

export default function ManageInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // --- TRASH BIN STATE ---
  const [trashList, setTrashList] = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [trashLoading, setTrashLoading] = useState(false);

  // Updated Form Data Structure
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    employeeId: '',
    department: 'Department of Information Technology',
    password: '',
    assignedClasses: [] 
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

  // --- 1. FETCH FROM MYSQL ---
  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/users?role=INSTRUCTOR');
      const data = await res.json();
      
      const formattedList = data.map(user => {
        let parsedClasses = [];
        try {
            if (user.assigned_classes) {
                if (typeof user.assigned_classes === 'string') {
                    parsedClasses = JSON.parse(user.assigned_classes);
                    if (typeof parsedClasses === 'string') {
                        parsedClasses = JSON.parse(parsedClasses);
                    }
                } else if (Array.isArray(user.assigned_classes)) {
                    parsedClasses = user.assigned_classes;
                }
            }
        } catch (e) {
            console.error("Error parsing classes for user:", user.id, e);
            parsedClasses = [];
        }

        return {
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            employeeId: user.student_id, 
            department: user.department,
            assignedClasses: Array.isArray(parsedClasses) ? parsedClasses : [],
            defaultPassword: '' 
        };
      });

      setInstructors(formattedList);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  // --- TRASH BIN FUNCTIONS ---
  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const res = await fetch('http://localhost:5000/trash/instructors');
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
    if(!window.confirm("Restore this instructor?")) return;
    try {
        await fetch(`http://localhost:5000/users/${id}/restore`, { method: 'PUT' });
        fetchTrash(); 
        fetchInstructors(); 
    } catch (e) {
        alert("Failed to restore");
    }
  };

  const handlePermanentDelete = async (id) => {
    if(!window.confirm("WARNING: This will permanently delete the instructor data. This cannot be undone.")) return;
    try {
        await fetch(`http://localhost:5000/users/${id}/permanent`, { method: 'DELETE' });
        fetchTrash();
    } catch (e) {
        alert("Failed to delete permanently");
    }
  };

  // --- MODAL HELPERS ---
  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ 
      lastName: '', firstName: '', middleName: '', 
      email: '', employeeId: '', 
      department: 'Department of Information Technology', 
      password: generatePassword(),
      assignedClasses: [{ year: '1', section: '1' }]
    });
    setShowModal(true);
  };

  const openEditModal = (instructor) => {
    setIsEditing(true);
    setEditId(instructor.id);
    
    // --- SMART PARSING LOGIC ---
    let fName = '', mName = '', lName = '';
    
    if (instructor.fullName) {
      const commaSplit = instructor.fullName.split(','); 
      if (commaSplit.length > 0) lName = commaSplit[0].trim(); 
      
      if (commaSplit.length > 1) {
        const parts = commaSplit[1].trim().split(' ');
        const lastPart = parts[parts.length - 1];
        
        // If it ends with a dot OR is a single letter, assume it's a middle initial
        if (parts.length > 1 && (lastPart.endsWith('.') || lastPart.length === 1)) {
            mName = parts.pop().replace('.', ''); // Extract the initial
            fName = parts.join(' '); // The rest is the first name
        } else {
            fName = parts.join(' ');
        }
      }
    }
    
    setFormData({
      lastName: lName,
      firstName: fName,
      middleName: mName,
      email: instructor.email,
      employeeId: instructor.employeeId || '',
      department: instructor.department || 'Department of Information Technology',
      password: '', 
      assignedClasses: Array.isArray(instructor.assignedClasses) ? instructor.assignedClasses : []
    });
    setShowModal(true);
  };

  // --- CLASS ASSIGNMENT LOGIC ---
  const addClassRow = () => {
    setFormData({ ...formData, assignedClasses: [...formData.assignedClasses, { year: '1', section: '1' }] });
  };

  const removeClassRow = (index) => {
    const updated = [...formData.assignedClasses];
    updated.splice(index, 1);
    setFormData({ ...formData, assignedClasses: updated });
  };

  const updateClassRow = (index, field, value) => {
    const updated = [...formData.assignedClasses];
    updated[index][field] = value;
    setFormData({ ...formData, assignedClasses: updated });
  };

  // --- 2. SAVE (CREATE / UPDATE) TO MYSQL ---
  const handleSave = async (e) => {
    e.preventDefault();
    
    if(!formData.lastName || !formData.firstName) return alert("Please enter First and Last Name.");
    if(!formData.email.endsWith("@cvsu.edu.ph")) return alert("Email must end with @cvsu.edu.ph");

    // ENFORCE UPPERCASE AND MIDDLE INITIAL
    const finalLastName = formData.lastName.toUpperCase().trim();
    const finalFirstName = formData.firstName.toUpperCase().trim();
    let finalMiddleName = '';
    
    if (formData.middleName && formData.middleName.trim() !== '') {
        finalMiddleName = formData.middleName.trim().charAt(0).toUpperCase() + '.';
    }
    
    const fullNameCombined = finalMiddleName 
        ? `${finalLastName}, ${finalFirstName} ${finalMiddleName}` 
        : `${finalLastName}, ${finalFirstName}`;

    const payload = {
      fullName: fullNameCombined, 
      email: formData.email,
      employeeId: formData.employeeId,
      department: formData.department,
      password: formData.password,
      assignedClasses: formData.assignedClasses,
      role: 'INSTRUCTOR'
    };

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
        alert(isEditing ? "Instructor Updated!" : "Instructor Created!");
        setShowModal(false);
        fetchInstructors();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to server.");
    }
  };

  // --- 3. SOFT DELETE ---
  const handleSoftDelete = async (id) => {
    if (window.confirm("Move this instructor to Trash?")) {
      try {
        await fetch(`http://localhost:5000/users/${id}/soft-delete`, { method: 'PUT' });
        fetchInstructors();
      } catch (error) {
        alert("Error deleting user.");
      }
    }
  };

  // --- FILTERING ---
  const filteredList = instructors.filter(inst => {
    const matchesDept = filterDept === 'All' || inst.department === filterDept;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (inst.fullName && inst.fullName.toLowerCase().includes(searchLower)) ||
      (inst.employeeId && inst.employeeId.toLowerCase().includes(searchLower));

    return matchesDept && matchesSearch;
  });

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="page-title">Manage Instructors</h1>
        <div style={{display:'flex', gap: '10px'}}>
            <button className="btn-secondary" style={{backgroundColor: '#ef4444', color:'white', border:'none'}} onClick={openTrash}>
              <Trash2 size={20} /> Trash Bin
            </button>
            <button className="btn-primary" onClick={openAddModal}>
              <Plus size={20} /> Add Instructor
            </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            className="search-input"
            placeholder="Search by Instructor Name or Employee ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-wrapper" style={{ position: 'relative', minWidth: '250px' }}>
          <Filter className="search-icon" size={18} style={{ left: '12px' }}/>
          <select 
            className="search-input" 
            style={{ paddingLeft: '40px' }}
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Department of Information Technology">Information Technology</option>
            <option value="Department of Teacher Education">Teacher Education</option>
            <option value="Department of Management">Management</option>
            <option value="Department of Arts and Sciences">Arts and Sciences</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Instructor Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Assigned Classes</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '40px'}}>Loading Instructors...</td></tr>
            ) : filteredList.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '40px', color: '#888'}}>No instructors found.</td></tr>
            ) : (
              filteredList.map((inst) => (
                <tr key={inst.id}>
                  <td>
                    <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <User size={16} color="#104a28"/> {inst.fullName}
                    </div>
                    <div style={{fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px'}}>
                      <Mail size={12}/> {inst.email}
                    </div>
                  </td>
                  <td>{inst.employeeId || 'N/A'}</td>
                  <td><span className="dept-badge">{inst.department}</span></td>
                  <td>
                    <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                        {inst.assignedClasses && inst.assignedClasses.length > 0 ? (
                            inst.assignedClasses.map((cls, idx) => (
                                <span key={idx} style={{fontSize:'12px', background:'#f3f4f6', padding:'2px 6px', borderRadius:'4px', border:'1px solid #e5e7eb', width:'fit-content'}}>
                                    Year {cls.year} - Sec {cls.section}
                                </span>
                            ))
                        ) : (
                            <span style={{color:'#999', fontSize:'12px', fontStyle:'italic'}}>No classes</span>
                        )}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-edit" onClick={() => openEditModal(inst)}><Edit size={18} /></button>
                      <button className="btn-icon btn-delete" onClick={() => handleSoftDelete(inst.id)}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- TRASH BIN MODAL --- */}
      {showTrashModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '700px'}}>
                <div className="modal-header">
                    <h2 className="modal-title" style={{color: '#dc2626'}}>Trash Bin (Deleted Instructors)</h2>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {trashLoading ? <p style={{textAlign:'center'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center'}}>Trash bin is empty.</p> : (
                        <table className="data-table">
                            <thead><tr><th>Name</th><th>ID</th><th style={{textAlign: 'right'}}>Actions</th></tr></thead>
                            <tbody>
                                {trashList.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{fontWeight:'bold', color: '#666'}}>{item.full_name}</td>
                                        <td>{item.student_id}</td>
                                        <td style={{textAlign: 'right'}}>
                                            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#10b981', color:'white', border:'none'}} onClick={() => handleRestore(item.id)}>
                                                    <RotateCcw size={14} style={{marginRight: 5}}/> Restore
                                                </button>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#dc2626', color:'white', border:'none'}} onClick={() => handlePermanentDelete(item.id)}>
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

      {/* ADD/EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '600px'}}>
            <div className="modal-header">
              <h2 className="modal-title">{isEditing ? 'Edit Instructor' : 'Add New Instructor'}</h2>
            </div>
            
            <form onSubmit={handleSave}>
              <div style={{display:'flex', gap:'10px'}}>
                  <div className="form-group" style={{flex:1}}>
                    <label className="form-label">Last Name</label>
                    <input className="form-input" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="e.g. Dela Cruz"/>
                  </div>
                  <div className="form-group" style={{flex:1}}>
                    <label className="form-label">First Name</label>
                    <input className="form-input" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="e.g. Juan"/>
                  </div>
                  <div className="form-group" style={{width:'80px'}}>
                    <label className="form-label">M.I.</label>
                    <input className="form-input" value={formData.middleName} onChange={e => setFormData({...formData, middleName: e.target.value})} placeholder="A"/>
                  </div>
              </div>

              <div className="form-group">
                <label className="form-label">Employee ID</label>
                <input className="form-input" required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} placeholder="e.g. 2023-TEACH-01" />
              </div>

              <div className="form-group">
                <label className="form-label">CvSU Email</label>
                <input 
                    className="form-input" 
                    type="email" 
                    required 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    disabled={isEditing} 
                    placeholder="name@cvsu.edu.ph"
                    style={{background: isEditing ? '#f3f4f6' : 'white'}} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{display: 'flex', gap: '8px'}}>
                  <input className="form-input" value={formData.password} readOnly={isEditing} placeholder={isEditing ? "Unchanged" : ""} style={{background: isEditing ? '#f3f4f6' : '#f0fdf4'}} />
                  {!isEditing && (
                    <button type="button" onClick={() => setFormData({...formData, password: generatePassword()})} style={{padding: '8px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '6px', background: 'white'}}><RefreshCw size={16} /></button>
                  )}
                </div>
              </div>

              <div className="form-group">
                  <label className="form-label">Department</label>
                  <select className="form-input" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                    <option>Department of Information Technology</option>
                    <option>Department of Teacher Education</option>
                    <option>Department of Management</option>
                    <option>Department of Arts and Sciences</option>
                  </select>
              </div>

              <div className="form-group" style={{background:'#fafafa', padding:'15px', borderRadius:'8px', border:'1px solid #eee'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                    <label className="form-label" style={{marginBottom:0, display:'flex', alignItems:'center', gap:'6px'}}>
                        <BookOpen size={16}/> Assigned Classes
                    </label>
                    <button type="button" onClick={addClassRow} style={{fontSize:'12px', color:'#104a28', fontWeight:'bold', background:'none', border:'none', cursor:'pointer'}}>+ Add Class</button>
                  </div>
                  
                  {formData.assignedClasses.map((cls, idx) => (
                      <div key={idx} style={{display:'flex', gap:'10px', marginBottom:'8px', alignItems:'center'}}>
                          <select className="form-input" style={{padding:'8px', fontSize:'13px'}} value={cls.year} onChange={(e) => updateClassRow(idx, 'year', e.target.value)}>
                              <option value="1">1st Year</option>
                              <option value="2">2nd Year</option>
                              <option value="3">3rd Year</option>
                              <option value="4">4th Year</option>
                          </select>
                          <select className="form-input" style={{padding:'8px', fontSize:'13px'}} value={cls.section} onChange={(e) => updateClassRow(idx, 'section', e.target.value)}>
                              <option value="1">Section 1</option>
                              <option value="2">Section 2</option>
                              <option value="3">Section 3</option>
                              <option value="4">Section 4</option>
                          </select>
                          <button type="button" onClick={() => removeClassRow(idx)} style={{color:'#dc2626', background:'none', border:'none', cursor:'pointer'}}><X size={18}/></button>
                      </div>
                  ))}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-save">{isEditing ? 'Save Changes' : 'Create Instructor'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}