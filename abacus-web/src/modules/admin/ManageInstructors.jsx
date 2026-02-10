import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, createUserAccount } from "../../firebaseWeb";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  RefreshCw,
  Mail,
  User,
  Filter,
  X, // Added X icon for removing classes
  BookOpen // Added icon for classes
} from 'lucide-react';
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

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    employeeId: '',
    department: 'Department of Information Technology',
    password: '',
    assignedClasses: [] // Array of { year: '1', section: '1' }
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

  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "users"), where("role", "==", "TEACHER"));
      const querySnapshot = await getDocs(q);
      const list = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInstructors(list);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ 
      fullName: '', 
      email: '', 
      employeeId: '', 
      department: 'Department of Information Technology', 
      password: generatePassword(),
      assignedClasses: [{ year: '1', section: '1' }] // Default one class
    });
    setShowModal(true);
  };

  const openEditModal = (instructor) => {
    setIsEditing(true);
    setEditId(instructor.id);
    setFormData({
      fullName: instructor.fullName,
      email: instructor.email,
      employeeId: instructor.employeeId || '',
      department: instructor.department || 'Department of Information Technology',
      password: instructor.defaultPassword || '',
      assignedClasses: instructor.assignedClasses || [] // Load existing classes
    });
    setShowModal(true);
  };

  // --- CLASS ASSIGNMENT LOGIC ---
  const addClassRow = () => {
    setFormData({
      ...formData,
      assignedClasses: [...formData.assignedClasses, { year: '1', section: '1' }]
    });
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
  // -----------------------------

  const handleSave = async (e) => {
    e.preventDefault();
    if(!formData.fullName) return alert("Please fill in all fields");

    if (isEditing) {
      try {
        const ref = doc(db, "users", editId);
        await updateDoc(ref, {
          fullName: formData.fullName,
          employeeId: formData.employeeId,
          department: formData.department,
          assignedClasses: formData.assignedClasses // Save the array
        });
        alert("Instructor Updated Successfully!");
      } catch (error) {
        alert("Error updating: " + error.message);
      }
    } else {
      if(!formData.email || !formData.password) return alert("Email and Password required");
      
      const result = await createUserAccount(
        formData.email,
        formData.password,
        "TEACHER",
        formData.fullName
      );

      if (result.success) {
        const ref = doc(db, "users", result.uid);
        await updateDoc(ref, {
          employeeId: formData.employeeId,
          department: formData.department,
          defaultPassword: formData.password,
          assignedClasses: formData.assignedClasses // Save the array
        });
        alert("Instructor Created Successfully!");
      } else {
        return alert("Error: " + result.error);
      }
    }

    setShowModal(false);
    fetchInstructors();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this instructor?")) {
      await deleteDoc(doc(db, "users", id));
      fetchInstructors();
    }
  };

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
        <button className="btn-primary" onClick={openAddModal}>
          <Plus size={20} />
          Add Instructor
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div className="search-wrapper" style={{ flex: 1 }}>
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
            style={{ paddingLeft: '40px', appearance: 'none', cursor: 'pointer' }}
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Department of Information Technology">Information Technology</option>
            <option value="Department of Computer Science">Computer Science</option>
            <option value="Department of Mathematics">Mathematics</option>
          </select>
          <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280', fontSize: '10px' }}>
            ▼
          </div>
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
              <th>Login Password</th>
              <th style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '40px'}}>Loading Instructors...</td></tr>
            ) : filteredList.length === 0 ? (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '40px', color: '#888'}}>No instructors found matching your filters.</td></tr>
            ) : (
              filteredList.map((inst) => (
                <tr key={inst.id}>
                  <td>
                    <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <User size={16} color="#104a28"/>
                      {inst.fullName}
                    </div>
                    <div style={{fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px'}}>
                      <Mail size={12}/>
                      {inst.email}
                    </div>
                  </td>

                  <td>{inst.employeeId || 'N/A'}</td>
                  
                  <td>
                      <span className="dept-badge">{inst.department}</span>
                  </td>

                  {/* NEW COLUMN: ASSIGNED CLASSES */}
                  <td>
                    <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                        {inst.assignedClasses && inst.assignedClasses.length > 0 ? (
                            inst.assignedClasses.map((cls, idx) => (
                                <span key={idx} style={{fontSize:'12px', background:'#f3f4f6', padding:'2px 6px', borderRadius:'4px', border:'1px solid #e5e7eb', width:'fit-content'}}>
                                    Year {cls.year} - Sec {cls.section}
                                </span>
                            ))
                        ) : (
                            <span style={{color:'#999', fontSize:'12px', fontStyle:'italic'}}>No classes assigned</span>
                        )}
                    </div>
                  </td>

                  <td>
                      <span className="password-box">{inst.defaultPassword || '****'}</span>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-edit" onClick={() => openEditModal(inst)} title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="btn-icon btn-delete" onClick={() => handleDelete(inst.id)} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{maxWidth: '600px'}}>
            <div className="modal-header">
              <h2 className="modal-title">{isEditing ? 'Edit Instructor' : 'Add New Instructor'}</h2>
            </div>
            
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              </div>

              <div className="form-group">
                <label className="form-label">Employee ID</label>
                <input className="form-input" required value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} placeholder="e.g. 2023-TEACH-01" />
              </div>

              <div className="form-group">
                <label className="form-label">CvSU Email</label>
                <input className="form-input" type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isEditing} style={{background: isEditing ? '#f3f4f6' : 'white'}} />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{display: 'flex', gap: '8px'}}>
                  <input className="form-input" value={formData.password} readOnly style={{background: '#f0fdf4', color: '#15803d', fontWeight: 'bold'}} />
                  {!isEditing && (
                    <button type="button" onClick={() => setFormData({...formData, password: generatePassword()})} style={{padding: '8px', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '6px', background: 'white'}}>
                      <RefreshCw size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="form-group">
                  <label className="form-label">Department</label>
                  <select className="form-input" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                    <option>Department of Information Technology</option>
                    <option>Department of Computer Science</option>
                    <option>Department of Mathematics</option>
                  </select>
              </div>

              {/* --- ASSIGNED CLASSES SECTION --- */}
              <div className="form-group" style={{background:'#fafafa', padding:'15px', borderRadius:'8px', border:'1px solid #eee'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                    <label className="form-label" style={{marginBottom:0, display:'flex', alignItems:'center', gap:'6px'}}>
                        <BookOpen size={16}/> Assigned Classes
                    </label>
                    <button type="button" onClick={addClassRow} style={{fontSize:'12px', color:'#104a28', fontWeight:'bold', background:'none', border:'none', cursor:'pointer'}}>
                        + Add Class
                    </button>
                  </div>
                  
                  {formData.assignedClasses.map((cls, idx) => (
                      <div key={idx} style={{display:'flex', gap:'10px', marginBottom:'8px', alignItems:'center'}}>
                          <select 
                            className="form-input" 
                            style={{padding:'8px', fontSize:'13px'}} 
                            value={cls.year}
                            onChange={(e) => updateClassRow(idx, 'year', e.target.value)}
                          >
                              <option value="1">1st Year</option>
                              <option value="2">2nd Year</option>
                              <option value="3">3rd Year</option>
                              <option value="4">4th Year</option>
                          </select>
                          <select 
                            className="form-input" 
                            style={{padding:'8px', fontSize:'13px'}}
                            value={cls.section}
                            onChange={(e) => updateClassRow(idx, 'section', e.target.value)}
                          >
                              <option value="1">Section 1</option>
                              <option value="2">Section 2</option>
                              <option value="3">Section 3</option>
                              <option value="4">Section 4</option>
                          </select>
                          <button 
                            type="button" 
                            onClick={() => removeClassRow(idx)}
                            style={{color:'#dc2626', background:'none', border:'none', cursor:'pointer'}}
                            title="Remove Class"
                          >
                              <X size={18}/>
                          </button>
                      </div>
                  ))}
                  {formData.assignedClasses.length === 0 && <div style={{fontSize:'12px', color:'#888', fontStyle:'italic'}}>No classes assigned yet.</div>}
              </div>
              {/* -------------------------------- */}

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