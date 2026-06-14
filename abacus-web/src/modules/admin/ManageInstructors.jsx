import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, RefreshCw, Mail, User, Filter, X, BookOpen, RotateCcw } from 'lucide-react'; 
import './ManageInstructors.css';

export default function ManageInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [academicPrograms, setAcademicPrograms] = useState([]);
  // ✅ We only need the merged sections now, not years!
  const [academicSections, setAcademicSections] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [trashList, setTrashList] = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [trashLoading, setTrashLoading] = useState(false);
  const dialog = window.abacusDialog;
  const showAlert = (message, options = {}) => dialog?.alert ? dialog.alert(message, options) : Promise.resolve(window.alert(message));
  const showConfirm = (message, options = {}) => dialog?.confirm ? dialog.confirm(message, options) : Promise.resolve(window.confirm(message));

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    employeeId: '',
    department: '',
    password: '',
    assignedClasses: [] // Now stores simple strings: ["BSIT 1-A", "BA-Arch 2-B"]
  });

  const generatePassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let randomLetters = "";
    for (let i = 0; i < 8; i++) { randomLetters += letters.charAt(Math.floor(Math.random() * letters.length)); }
    return `${randomLetters}${Math.floor(Math.random() * 999) + 1}`;
  };

  const fetchInstructorsAndSetup = async () => {
    setLoading(true);
    try {
      const [instRes, setupRes] = await Promise.all([
        fetch('https://abacus-w435.onrender.com/users?role=INSTRUCTOR'),
        fetch('https://abacus-w435.onrender.com/academic-setup')
      ]);
      
      const data = await instRes.json();
      const setupData = await setupRes.json();

      if (!setupData.error) {
        setAcademicPrograms(setupData.programs || []);
        // Sort sections alphabetically so they are easy to find in the dropdown
        const sortedSections = (setupData.sections || []).sort((a,b) => a.section_name.localeCompare(b.section_name));
        setAcademicSections(sortedSections);
      }
      
      const formattedList = data.map(user => {
        let parsedClasses = [];
        try {
            if (user.assigned_classes) {
                parsedClasses = typeof user.assigned_classes === 'string' ? JSON.parse(user.assigned_classes) : user.assigned_classes;
                if (typeof parsedClasses === 'string') parsedClasses = JSON.parse(parsedClasses);
            }
        } catch (e) { parsedClasses = []; }

        return {
            id: user.id, fullName: user.full_name, email: user.email, employeeId: user.student_id, 
            department: user.department,
            // Convert old format [{year: '1', section: 'A'}] to new format ["BSIT 1-A"] if necessary, 
            // otherwise just use the new format array.
            assignedClasses: Array.isArray(parsedClasses) ? parsedClasses.map(c => typeof c === 'object' ? `${c.year}-${c.section}` : c) : [],
            defaultPassword: '' 
        };
      });

      setInstructors(formattedList);
    } catch (error) { console.error("Error fetching data:", error); }
    setLoading(false);
  };

  useEffect(() => { fetchInstructorsAndSetup(); }, []);

  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const res = await fetch('https://abacus-w435.onrender.com/trash/instructors');
        const data = await res.json();
        setTrashList(data);
    } catch (error) { console.error("Error fetching trash:", error); }
    setTrashLoading(false);
  };

  const openTrash = () => { setShowTrashModal(true); fetchTrash(); };

  const handleRestore = async (id) => {
    if(!await showConfirm("Restore this instructor?", { title: 'Restore Instructor', confirmText: 'Restore' })) return;
    try { await fetch(`https://abacus-w435.onrender.com/users/${id}/restore`, { method: 'PUT' }); fetchTrash(); fetchInstructorsAndSetup(); } 
    catch (e) { await showAlert("Failed to restore", { title: 'Restore Failed' }); }
  };

  const handlePermanentDelete = async (id) => {
    if(!await showConfirm("WARNING: This will permanently delete the instructor data. This cannot be undone.", { title: 'Permanent Delete', confirmText: 'Delete' })) return;
    try { await fetch(`https://abacus-w435.onrender.com/users/${id}/permanent`, { method: 'DELETE' }); fetchTrash(); } 
    catch (e) { await showAlert("Failed to delete permanently", { title: 'Delete Failed' }); }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    const defaultDept = academicPrograms.length > 0 ? academicPrograms[0].name : '';
    setFormData({ lastName: '', firstName: '', middleName: '', email: '', employeeId: '', department: defaultDept, password: generatePassword(), assignedClasses: [] });
    setShowModal(true);
  };

  const openEditModal = (instructor) => {
    setIsEditing(true);
    setEditId(instructor.id);
    let fName = '', mName = '', lName = '';
    
    if (instructor.fullName) {
      const commaSplit = instructor.fullName.split(','); 
      if (commaSplit.length > 0) lName = commaSplit[0].trim(); 
      if (commaSplit.length > 1) {
        const parts = commaSplit[1].trim().split(' ');
        const lastPart = parts[parts.length - 1];
        if (parts.length > 1 && (lastPart.endsWith('.') || lastPart.length === 1)) {
            mName = parts.pop().replace('.', ''); 
            fName = parts.join(' '); 
        } else { fName = parts.join(' '); }
      }
    }
    
    setFormData({
      lastName: lName, firstName: fName, middleName: mName, email: instructor.email, employeeId: instructor.employeeId || '',
      department: instructor.department || (academicPrograms.length > 0 ? academicPrograms[0].name : ''),
      password: '', assignedClasses: Array.isArray(instructor.assignedClasses) ? instructor.assignedClasses : []
    });
    setShowModal(true);
  };

  // ✅ NEW SINGLE-DROPDOWN CLASS ASSIGNMENT
  const addClassRow = () => {
    if (academicSections.length === 0) return showAlert("Please create sections in the Academic Setup first.", { title: 'No Sections' });
    const defaultSection = academicSections[0].section_name;
    // Don't add if they already have it
    if(formData.assignedClasses.includes(defaultSection)) return;
    setFormData({ ...formData, assignedClasses: [...formData.assignedClasses, defaultSection] });
  };

  const removeClassRow = (index) => {
    const updated = [...formData.assignedClasses];
    updated.splice(index, 1);
    setFormData({ ...formData, assignedClasses: updated });
  };

  const updateClassRow = (index, value) => {
    // Prevent duplicates
    if(formData.assignedClasses.includes(value)) {
        return showAlert("Instructor is already assigned to this class.", { title: 'Duplicate Class' });
    }
    const updated = [...formData.assignedClasses];
    updated[index] = value;
    setFormData({ ...formData, assignedClasses: updated });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(!formData.lastName || !formData.firstName) return showAlert("Please enter First and Last Name.", { title: 'Missing Name' });
    // ENTRAPMENT: Strict Email Validation
    if(!formData.email.trim().toLowerCase().endsWith("@cvsu.edu.ph")) return showAlert("Email must strictly end with @cvsu.edu.ph", { title: 'Invalid Email' });

    const finalLastName = formData.lastName.toUpperCase().trim();
    const finalFirstName = formData.firstName.toUpperCase().trim();
    let finalMiddleName = formData.middleName ? formData.middleName.trim().charAt(0).toUpperCase() + '.' : '';
    const fullNameCombined = finalMiddleName ? `${finalLastName}, ${finalFirstName} ${finalMiddleName}` : `${finalLastName}, ${finalFirstName}`;

    const payload = {
      fullName: fullNameCombined, email: formData.email.trim().toLowerCase(), employeeId: formData.employeeId, department: formData.department,
      password: formData.password, assignedClasses: formData.assignedClasses, role: 'INSTRUCTOR'
    };

    try {
      let url = isEditing ? `https://abacus-w435.onrender.com/users/${editId}` : 'https://abacus-w435.onrender.com/users';
      let method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      
      if (data.success) {
        if (isEditing && formData.password) {
          try { await fetch('https://abacus-w435.onrender.com/admin-reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ uid: editId, new_password: formData.password }) }); } 
          catch (passErr) { console.error("Failed to update password:", passErr); }
        }
        await showAlert(isEditing ? "Instructor Updated!" : "Instructor Created!", { title: 'Saved' });
        setShowModal(false);
        fetchInstructorsAndSetup();
      } else { await showAlert("Error: " + data.error, { title: 'Save Failed' }); }
    } catch (error) { await showAlert("Failed to connect to server.", { title: 'Save Failed' }); }
  };

  const handleSoftDelete = async (id) => {
    if (await showConfirm("Move this instructor to Trash?", { title: 'Move to Trash', confirmText: 'Trash' })) {
      try { await fetch(`https://abacus-w435.onrender.com/users/${id}/soft-delete`, { method: 'PUT' }); fetchInstructorsAndSetup(); } 
      catch (error) { await showAlert("Error deleting user.", { title: 'Trash Failed' }); }
    }
  };

  const filteredList = instructors.filter(inst => {
    const matchesDept = filterDept === 'All' || inst.department === filterDept;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (inst.fullName && inst.fullName.toLowerCase().includes(searchLower)) || (inst.employeeId && inst.employeeId.toLowerCase().includes(searchLower));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Manage Instructors</h1>
        <div style={{display:'flex', gap: '10px'}}>
            <button className="btn-secondary" style={{backgroundColor: '#ef4444', color:'white', border:'none'}} onClick={openTrash}><Trash2 size={20} /> Trash Bin</button>
            <button className="btn-primary" onClick={openAddModal}><Plus size={20} /> Add Instructor</button>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input className="search-input" placeholder="Search by Instructor Name or Employee ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <div className="filter-wrapper" style={{ position: 'relative', minWidth: '250px' }}>
          <Filter className="search-icon" size={18} style={{ left: '12px' }}/>
          <select className="search-input" style={{ paddingLeft: '40px' }} value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
            <option value="All">All Departments</option>
            {academicPrograms.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead><tr><th>Instructor Name</th><th>Employee ID</th><th>Department</th><th>Assigned Classes</th><th style={{textAlign: 'right'}}>Actions</th></tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '40px'}}>Loading Instructors...</td></tr>
            ) : filteredList.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '40px', color: '#888'}}>No instructors found.</td></tr>
            ) : (
              filteredList.map((inst) => (
                <tr key={inst.id}>
                  <td>
                    <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}><User size={16} color="#104a28"/> {inst.fullName}</div>
                    <div style={{fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px'}}><Mail size={12}/> {inst.email}</div>
                  </td>
                  <td style={{fontFamily: 'monospace', color: '#555'}}>{inst.employeeId || 'N/A'}</td>
                  <td><span className="dept-badge">{inst.department}</span></td>
                  <td>
                    <div style={{display:'flex', flexWrap: 'wrap', gap:'4px'}}>
                        {inst.assignedClasses && inst.assignedClasses.length > 0 ? (
                            inst.assignedClasses.map((cls, idx) => (
                                <span key={idx} style={{fontSize:'11px', background:'#f3f4f6', padding:'4px 8px', borderRadius:'6px', border:'1px solid #cbd5e1', fontWeight: 'bold', color: '#334155'}}>
                                    {cls}
                                </span>
                            ))
                        ) : <span style={{color:'#9ca3af', fontSize:'12px', fontStyle:'italic'}}>No classes</span>}
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

      {/* TRASH MODAL HIDDEN FOR BREVITY - REMAINS IDENTICAL TO YOURS */}
      {showTrashModal && (
        <div className="modal-overlay" onClick={() => setShowTrashModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{width: '700px', padding: 0, overflow: 'hidden'}}>
                <div style={{background: '#dc2626', padding: '20px 24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><Trash2 size={22}/> Trash Bin (Deleted Instructors)</h2>
                    <button onClick={() => setShowTrashModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#fecaca'}}><X size={24}/></button>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto', padding: '24px'}}>
                    {trashLoading ? <p style={{textAlign:'center', color: '#666'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center'}}>Trash bin is empty.</p> : (
                        <table className="data-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                            <thead style={{background: '#f9fafb'}}>
                                <tr>
                                    <th style={{padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', color: '#4b5563'}}>Name</th>
                                    <th style={{padding: '12px', textAlign: 'left', borderBottom: '2px solid #e5e7eb', color: '#4b5563'}}>ID</th>
                                    <th style={{padding: '12px', textAlign: 'right', borderBottom: '2px solid #e5e7eb', color: '#4b5563'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trashList.map((item) => (
                                    <tr key={item.id} style={{borderBottom: '1px solid #f3f4f6'}}>
                                        <td style={{padding: '12px', fontWeight:'bold', color: '#4b5563'}}>{item.full_name}</td>
                                        <td style={{padding: '12px', fontFamily: 'monospace', color: '#666'}}>{item.student_id}</td>
                                        <td style={{padding: '12px', textAlign: 'right'}}>
                                            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#10b981', color:'white', border:'none'}} onClick={() => handleRestore(item.id)}><RotateCcw size={14} style={{marginRight: 5}}/> Restore</button>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#dc2626', color:'white', border:'none'}} onClick={() => handlePermanentDelete(item.id)}><Trash2 size={14} style={{marginRight: 5}}/> Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '650px', padding: 0, overflow: 'hidden'}}>
            
            <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><User size={22}/> {isEditing ? 'Edit Instructor' : 'Add New Instructor'}</h2>
                <button onClick={() => setShowModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}><X size={24}/></button>
            </div>
            
            <form onSubmit={handleSave}>
              <div style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  
                  <div style={{display:'flex', gap:'10px'}}>
                      <div className="form-group" style={{flex:1, margin: 0}}>
                        <label className="form-label">Last Name <span style={{color:'red'}}>*</span></label>
                        {/* ENTRAPMENT: ONLY LETTERS AND SPACES */}
                        <input className="form-input" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value.replace(/[^A-Za-z\s]/g, '')})} placeholder="e.g. Dela Cruz"/>
                      </div>
                      <div className="form-group" style={{flex:1, margin: 0}}>
                        <label className="form-label">First Name <span style={{color:'red'}}>*</span></label>
                        <input className="form-input" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value.replace(/[^A-Za-z\s]/g, '')})} placeholder="e.g. Juan"/>
                      </div>
                      <div className="form-group" style={{width:'80px', margin: 0}}>
                        <label className="form-label">M.I.</label>
                        {/* ENTRAPMENT: 2 CHARS MAX, ONLY LETTERS/PERIODS */}
                        <input className="form-input" maxLength={2} value={formData.middleName} onChange={e => setFormData({...formData, middleName: e.target.value.replace(/[^A-Za-z.]/g, '')})} placeholder="A."/>
                      </div>
                  </div>

                  <div style={{display: 'flex', gap: '10px'}}>
                      <div className="form-group" style={{flex: 1, margin: 0}}>
                        <label className="form-label">Employee ID <span style={{color:'red'}}>*</span></label>
                        <input className="form-input" required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} placeholder="e.g. 2023-TEACH-01" />
                      </div>
                      <div className="form-group" style={{flex: 1, margin: 0}}>
                          <label className="form-label">Department <span style={{color:'red'}}>*</span></label>
                          <select className="form-input" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                            {academicPrograms.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                          </select>
                      </div>
                  </div>

                  <div style={{display: 'flex', gap: '10px'}}>
                      <div className="form-group" style={{flex: 1, margin: 0}}>
                        <label className="form-label">CvSU Email <span style={{color:'red'}}>*</span></label>
                        <input className="form-input" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value.toLowerCase()})} disabled={isEditing} placeholder="name@cvsu.edu.ph" style={{background: isEditing ? '#f3f4f6' : 'white'}} />
                      </div>
                      <div className="form-group" style={{flex: 1, margin: 0}}>
                        <label className="form-label">Password</label>
                        <div style={{display: 'flex', gap: '8px'}}>
                          <input className="form-input" value={formData.password} readOnly placeholder={isEditing ? "Leave blank to keep unchanged" : ""} style={{background: '#f0fdf4'}} />
                          <button type="button" onClick={() => setFormData({...formData, password: generatePassword()})} style={{padding: '8px', cursor: 'pointer', border: '1px solid #d1d5db', borderRadius: '6px', background: 'white'}} title="Generate new password"><RefreshCw size={16} color="#4b5563" /></button>
                        </div>
                      </div>
                  </div>

                  {/* ✅ THE NEW MERGED CLASS ASSIGNMENT UI */}
                  <div style={{background:'#fafafa', padding:'15px', borderRadius:'8px', border:'1px solid #eee', marginTop: '10px'}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                        <label style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', margin: 0}}>
                            <BookOpen size={16}/> Assigned Classes
                        </label>
                        <button type="button" onClick={addClassRow} style={{fontSize:'12px', color:'#104a28', fontWeight:'bold', background:'none', border:'none', cursor:'pointer', display: 'flex', alignItems: 'center', gap: '4px'}}>
                            <Plus size={14}/> Assign Class
                        </button>
                      </div>
                      
                      <div style={{maxHeight: '160px', overflowY: 'auto', paddingRight: '5px'}}>
                          {formData.assignedClasses.length === 0 ? (
                              <div style={{fontSize: '12px', color: '#888', fontStyle: 'italic', padding: '10px 0'}}>No classes assigned yet. Click "Assign Class".</div>
                          ) : (
                              formData.assignedClasses.map((cls, idx) => (
                                  <div key={idx} style={{display:'flex', gap:'10px', marginBottom:'8px', alignItems:'center', background: 'white', padding: '8px', borderRadius: '6px', border: '1px solid #e5e7eb'}}>
                                      <select className="form-input" style={{padding:'8px', fontSize:'13px', margin: 0, flex: 1}} value={cls} onChange={(e) => updateClassRow(idx, e.target.value)}>
                                          {academicSections.map(s => (
                                              <option key={s.id} value={s.section_name}>{s.section_name}</option>
                                          ))}
                                      </select>
                                      <button type="button" onClick={() => removeClassRow(idx)} style={{color:'#dc2626', background:'#fee2e2', border:'none', padding: '8px', borderRadius: '6px', cursor:'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                          <X size={16}/>
                                      </button>
                                  </div>
                              ))
                          )}
                      </div>
                  </div>

              </div>

              <div style={{padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
                  <button type="button" onClick={() => setShowModal(false)} style={{padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '600', cursor: 'pointer'}}>Cancel</button>
                  <button type="submit" style={{padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#eab308', color: '#422006', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>{isEditing ? 'Save Changes' : 'Create Instructor'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
