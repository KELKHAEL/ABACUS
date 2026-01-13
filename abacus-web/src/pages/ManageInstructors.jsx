import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, createUserAccount } from '../firebaseWeb';

export default function ManageInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    employeeId: '',
    department: 'Department of Information Technology',
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
      password: generatePassword()
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
      password: instructor.defaultPassword || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(!formData.fullName) return alert("Please fill in all fields");

    if (isEditing) {
      try {
        const ref = doc(db, "users", editId);
        await updateDoc(ref, {
          fullName: formData.fullName,
          employeeId: formData.employeeId,
          department: formData.department
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
          defaultPassword: formData.password // <--- Save Password to DB
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

  const filteredList = instructors.filter(inst => 
    inst.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.employeeId?.includes(searchTerm)
  );

  return (
    <div style={{padding: '20px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1 style={{margin: 0, color: '#104a28'}}>Manage Instructors</h1>
        <button 
          onClick={openAddModal}
          style={{backgroundColor: '#104a28', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}
        >
          + Add Instructor
        </button>
      </div>

      <div className="filters" style={{background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
        <input 
          placeholder="Search by Instructor Name or Employee ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%'}}
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Instructor Name</th>
              <th>Employee ID</th>
              <th>Email Address</th>
              <th>Default Password</th> {/* NEW COLUMN */}
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Loading...</td></tr> : 
             filteredList.map((inst) => (
              <tr key={inst.id}>
                <td style={{fontWeight: 'bold', color: '#104a28'}}>{inst.fullName}</td>
                <td>{inst.employeeId || 'N/A'}</td>
                <td>{inst.email}</td>
                <td style={{fontFamily: 'monospace', color: '#104a28'}}>{inst.defaultPassword || '****'}</td> {/* VISIBLE PASSWORD */}
                <td style={{fontSize: '12px', color: '#666'}}>{inst.department}</td>
                <td>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <button className="action-btn btn-edit" onClick={() => openEditModal(inst)}>✎ Edit</button>
                    <button className="action-btn btn-delete" onClick={() => handleDelete(inst.id)}>🗑 Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
          <div style={{background: 'white', padding: '30px', borderRadius: '12px', width: '400px'}}>
            <h2 style={{marginTop: 0, color: '#104a28'}}>{isEditing ? 'Edit Instructor' : 'Add New Instructor'}</h2>
            <form onSubmit={handleSave} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <input required placeholder="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={modalInputStyle} />
              <input required placeholder="Employee ID" value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} style={modalInputStyle} />
              <input required type="email" placeholder="CvSU Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={isEditing} style={{...modalInputStyle, background: isEditing ? '#f3f4f6' : 'white'}} />
              
              {/* PASSWORD FIELD (Auto Generated & Visible) */}
              <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                 <input 
                   required 
                   type="text" 
                   value={formData.password} 
                   readOnly 
                   style={{...modalInputStyle, background: '#f0fdf4', color: '#166534', fontWeight: 'bold'}} 
                 />
                 {!isEditing && (
                   <button type="button" onClick={() => setFormData({...formData, password: generatePassword()})} style={{padding: '10px', cursor: 'pointer'}}>↻</button>
                 )}
              </div>
              
              <select style={modalInputStyle} value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}><option>Department of Information Technology</option><option>Department of Computer Science</option><option>Department of Mathematics</option></select>

              <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                <button type="button" onClick={() => setShowModal(false)} style={{...modalBtnStyle, background: '#ccc', color: '#333'}}>Cancel</button>
                <button type="submit" style={{...modalBtnStyle, background: '#eab308', color: '#3e2700'}}>{isEditing ? 'Update Changes' : 'Save Instructor'}</button>
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