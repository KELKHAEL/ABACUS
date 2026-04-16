import React, { useState, useEffect, useRef } from 'react';
import { Eye, Upload, Trash2, Filter, Save, Edit, X, UserPlus } from 'lucide-react';
import * as XLSX from 'xlsx'; 
import './ManageStudents.css';

export default function ManageWhitelist() {
  const [allowedList, setAllowedList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Edit States
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ studentId: '', email: '', firstName: '', middleName: '', lastName: '' });
  
  // Add Manual States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newData, setNewData] = useState({ studentId: '', email: '', firstName: '', middleName: '', lastName: '' });

  const [filterYear, setFilterYear] = useState('ALL');
  const fileInputRef = useRef(null);

  const fetchWhitelist = async () => {
    setLoading(true);
    try {
        const res = await fetch('https://abacus-w435.onrender.com/allowed-students');
        const data = await res.json();
        setAllowedList(data);
    } catch (error) { console.error("Error fetching whitelist:", error); }
    setLoading(false);
  };

  useEffect(() => {
    fetchWhitelist();
  }, []);

  const triggerFileInput = () => { fileInputRef.current.click(); };

  // --- 📝 BULLETPROOF EXCEL UPLOAD PARSER ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, { defval: "" }); 

      const formattedData = data.map((row) => {
        const lowerRow = {};
        Object.keys(row).forEach(k => {
            const cleanKey = k.toLowerCase().replace(/[\n\r_.-]+/g, ' ').trim();
            lowerRow[cleanKey] = String(row[k]).trim();
        });

        // ✅ FIX 1: Smart ID & Email Detection (Finds any column containing these keywords)
        const studentIdKey = Object.keys(lowerRow).find(k => k.includes('student id') || k === 'id' || k.includes('student no') || k.includes('student number'));
        const emailKey = Object.keys(lowerRow).find(k => k.includes('email') || k.includes('account'));

        const studentId = studentIdKey ? lowerRow[studentIdKey] : '';
        const email = emailKey ? lowerRow[emailKey] : '';

        // ✅ FIX 2: Smart Name Detection (Catches "Student First Name", "First Name", "Firstname", etc.)
        const fNameKey = Object.keys(lowerRow).find(k => k.includes('first name') || k.includes('firstname'));
        const lNameKey = Object.keys(lowerRow).find(k => k.includes('last name') || k.includes('lastname'));
        const mNameKey = Object.keys(lowerRow).find(k => k.includes('middle name') || k.includes('middlename') || k === 'mi' || k === 'm i' || k.includes('middle initial'));
        const fullNameKey = Object.keys(lowerRow).find(k => k.includes('name') && !k.includes('first') && !k.includes('last') && !k.includes('middle'));

        let fName = "";
        let mName = "";
        let lName = "";
        let rawName = "";

        // SCENARIO A: Separate Columns exist (Like your 2nd screenshot)
        if (fNameKey || lNameKey) {
            fName = fNameKey ? lowerRow[fNameKey] : "";
            mName = mNameKey ? lowerRow[mNameKey] : "";
            lName = lNameKey ? lowerRow[lNameKey] : "";
            rawName = `${lName}, ${fName} ${mName}`.trim();
        } 
        // SCENARIO B: Single Full Name column exists (Like your 1st and 3rd screenshots)
        else if (fullNameKey) {
            rawName = lowerRow[fullNameKey] || "";
            
            if (rawName.includes(',')) {
                // Catches "Purugganan, Marion Adam S."
                const parts = rawName.split(',').map(p => p.trim()).filter(p => p !== '');
                lName = parts[0]; 
                if (parts.length >= 3) {
                    fName = parts[1];
                    mName = parts.slice(2).join(' '); 
                } else if (parts.length === 2) {
                    let rest = parts[1].split(' ').filter(p => p !== '');
                    if (rest.length > 1) mName = rest.pop(); 
                    fName = rest.join(' ');
                }
            } else {
                // Catches "Marion Adam S. Purugganan"
                const parts = rawName.split(' ').filter(p => p !== '');
                if (parts.length >= 3) {
                    lName = parts.pop();
                    mName = parts.pop();
                    fName = parts.join(' ');
                } else if (parts.length === 2) {
                    fName = parts[0];
                    lName = parts[1];
                } else {
                    fName = parts[0] || "";
                }
            }
        }

        // Clean up Middle Initial periods (removes the dot from "S.")
        if (mName.endsWith('.')) mName = mName.replace('.', '');

        return {
          studentId: studentId.replace(/\s+/g, ''), 
          email: email.replace(/\s+/g, '').toLowerCase(), 
          rawName: rawName,
          firstName: fName,
          middleName: mName,
          lastName: lName
        };
      });

      const validData = formattedData.filter(s => s.studentId.length >= 5 && s.email.endsWith('@cvsu.edu.ph'));

      if (validData.length === 0) {
        if (formattedData.length > 0) {
            const sample = formattedData[0];
            alert(`Import Error: Rows were rejected.\nRow 1: ID:"${sample.studentId}", Email:"${sample.email}"\nFix: Emails MUST end with '@cvsu.edu.ph'.`);
        } else {
            alert("Import Error: The Excel sheet appears empty or invalid.");
        }
        return;
      }

      submitToDatabase(validData);
    };
    reader.readAsBinaryString(file);
    e.target.value = null; 
  };

  // --- ➕ MANUAL ADD HANDLER ---
  const handleManualAdd = () => {
      if (!newData.studentId || !newData.email || !newData.lastName || !newData.firstName) {
          return alert("Student ID, Email, First Name, and Last Name are required.");
      }
      if (!newData.email.endsWith('@cvsu.edu.ph')) {
          return alert("Email must end with @cvsu.edu.ph");
      }

      const payload = [{
          studentId: newData.studentId.trim(),
          email: newData.email.trim().toLowerCase(),
          firstName: newData.firstName.trim().toUpperCase(),
          middleName: newData.middleName.trim().toUpperCase().replace('.', ''),
          lastName: newData.lastName.trim().toUpperCase(),
          rawName: ""
      }];

      submitToDatabase(payload);
  };

  // --- 📡 SHARED SUBMIT FUNCTION ---
  const submitToDatabase = async (payloadArray) => {
      try {
        const res = await fetch('https://abacus-w435.onrender.com/upload-allowed-students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ students: payloadArray })
        });
        const result = await res.json();
        if (result.success) {
            alert(`Success!\n\n Newly Added: ${result.newlyAdded}\n Modified: ${result.modified}\n Ignored (Duplicates): ${result.duplicates}`);
            setShowAddModal(false);
            setNewData({ studentId: '', email: '', firstName: '', middleName: '', lastName: '' }); // Reset form
            fetchWhitelist();
        }
      } catch (err) { alert("Server connection failed."); }
  };

  // --- 🗑️ & ✏️ EDIT HANDLERS ---
  const deleteFromWhitelist = async (id) => {
      if(!window.confirm("Remove this student from the allowed list?")) return;
      try {
          await fetch(`https://abacus-w435.onrender.com/allowed-students/${id}`, { method: 'DELETE' });
          fetchWhitelist(); 
      } catch (e) { alert("Failed to delete"); }
  };

  const startEditing = (item) => {
      setEditingId(item.id);
      setEditData({ 
          studentId: item.student_id, 
          email: item.email,
          firstName: item.first_name || '',
          middleName: item.middle_name || '',
          lastName: item.last_name || ''
      });
  };

  const saveEdit = async (id) => {
      if (!editData.studentId || !editData.email || !editData.lastName || !editData.firstName) {
          return alert("ID, Email, First Name, and Last Name are required.");
      }
      try {
          const res = await fetch(`https://abacus-w435.onrender.com/allowed-students/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  studentId: editData.studentId.trim(),
                  email: editData.email.trim().toLowerCase(),
                  firstName: editData.firstName.trim().toUpperCase(),
                  middleName: editData.middleName.trim().toUpperCase().replace('.', ''),
                  lastName: editData.lastName.trim().toUpperCase()
              })
          });
          const data = await res.json();
          if (data.success) {
              setEditingId(null);
              fetchWhitelist();
          } else { alert("Failed to update: " + data.error); }
      } catch (e) { alert("Server Error."); }
  };

  // --- 🔍 FILTER LOGIC ---
  const batchYears = [...new Set(
      allowedList
        .map(item => item.student_id ? String(item.student_id).substring(0, 4) : null)
        .filter(year => year) 
  )].sort((a, b) => b.localeCompare(a)); 

  const filteredList = allowedList.filter(item => {
      if (filterYear === 'ALL') return true;
      const itemYear = item.student_id ? String(item.student_id).substring(0, 4) : null;
      return itemYear === filterYear;
  });

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Allowed Students (Whitelist)</h1>
        <div style={{display: 'flex', gap: '10px'}}>
            <input type="file" accept=".xlsx, .xls" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileUpload} />
            
            <button className="btn-secondary" onClick={() => window.history.back()}>
              Back
            </button>
            
            <button 
                onClick={() => setShowAddModal(true)} 
                style={{backgroundColor: '#0ea5e9', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', cursor: 'pointer'}}
            >
              <UserPlus size={18} /> Add Manually
            </button>

            <button className="btn-primary" onClick={triggerFileInput}>
              <Upload size={20} /> Upload Excel
            </button>
        </div>
      </div>

      <div className="filter-bar">
        <Filter size={18} color="#6b7280"/>
        <span style={{fontSize: '14px', fontWeight: 'bold', color: '#4b5563'}}>Filter by Batch:</span>
        <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="filter-select">
            <option value="ALL">All Batches</option>
            {batchYears.map(year => (
                <option key={year} value={year}>Batch {year}</option>
            ))}
        </select>
        <span style={{marginLeft: 'auto', fontSize: '14px', color: '#6b7280', fontWeight: '500'}}>
            Showing {filteredList.length} students
        </span>
      </div>

      <div className="table-card">
        {loading ? <p style={{textAlign: 'center', padding: '40px'}}>Loading whitelist...</p> : filteredList.length === 0 ? <p style={{textAlign:'center', padding: '40px', color: '#888'}}>No students found in whitelist.</p> : (
            <table className="data-table">
                <thead>
                    <tr>
                        <th style={{width: '15%'}}>Student ID</th>
                        <th style={{width: '40%'}}>Name</th>
                        <th style={{width: '25%'}}>Email Address</th>
                        <th style={{width: '20%', textAlign: 'right'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item) => {
                        const isItemEditing = editingId === item.id;
                        
                        const lNameStr = item.last_name ? item.last_name.trim() : "";
                        const fNameStr = item.first_name ? item.first_name.trim() : "";
                        const mNameStr = item.middle_name ? item.middle_name.trim().charAt(0) + "." : "";
                        
                        let fullName = "";
                        if (lNameStr && fNameStr) {
                            fullName = `${lNameStr}, ${fNameStr} ${mNameStr}`.trim();
                        } else {
                            fullName = lNameStr || fNameStr || "N/A";
                        }
                            
                        return (
                            <tr key={item.id} style={{background: isItemEditing ? '#f0fdf4' : 'transparent'}}>
                                {isItemEditing ? (
                                    <>
                                        <td>
                                            <input autoFocus style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #10b981', fontFamily: 'monospace'}} value={editData.studentId} onChange={(e) => setEditData({...editData, studentId: e.target.value})} />
                                        </td>
                                        
                                        <td style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                                            <input placeholder="Last Name" style={{padding: '6px', borderRadius: '4px', border: '1px solid #10b981'}} value={editData.lastName} onChange={(e) => setEditData({...editData, lastName: e.target.value.toUpperCase()})} />
                                            <div style={{display: 'flex', gap: '5px'}}>
                                                <input placeholder="First Name" style={{flex: 1, padding: '6px', borderRadius: '4px', border: '1px solid #10b981'}} value={editData.firstName} onChange={(e) => setEditData({...editData, firstName: e.target.value.toUpperCase()})} />
                                                <input placeholder="M.I." maxLength={2} style={{width: '50px', padding: '6px', borderRadius: '4px', border: '1px solid #10b981', textAlign: 'center'}} value={editData.middleName} onChange={(e) => setEditData({...editData, middleName: e.target.value.toUpperCase()})} />
                                            </div>
                                        </td>

                                        <td>
                                            <input style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #10b981'}} value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} />
                                        </td>
                                        <td style={{textAlign: 'right', verticalAlign: 'middle'}}>
                                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '5px', marginTop: '10px'}}>
                                                <button onClick={() => saveEdit(item.id)} style={{background: '#10b981', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display:'flex', alignItems:'center', gap:'4px'}}><Save size={14}/> Save</button>
                                                <button onClick={() => setEditingId(null)} style={{background: '#f3f4f6', color: '#4b5563', border: '1px solid #d1d5db', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>Cancel</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={{fontWeight:'600', fontFamily: 'monospace', color: '#111', verticalAlign: 'middle'}}>{item.student_id}</td>
                                        <td style={{fontWeight: 'bold', color: '#104a28', verticalAlign: 'middle'}}>{fullName}</td>
                                        <td style={{color: '#4b5563', verticalAlign: 'middle'}}>{item.email}</td>
                                        <td style={{textAlign: 'right', verticalAlign: 'middle'}}>
                                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
                                                <button className="btn-icon btn-edit" onClick={() => startEditing(item)} title="Edit Entry"><Edit size={16}/></button>
                                                <button className="btn-icon btn-delete" onClick={() => deleteFromWhitelist(item.id)} title="Remove from Whitelist"><Trash2 size={16}/></button>
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

      {showAddModal && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
            <div style={{backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)'}}>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <h2 style={{margin: 0, fontSize: '20px', color: '#111827'}}>Manually Add Student</h2>
                    <X size={24} color="#6b7280" style={{cursor: 'pointer'}} onClick={() => setShowAddModal(false)} />
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <div>
                        <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '5px'}}>Student ID <span style={{color:'red'}}>*</span></label>
                        <input type="number" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box'}} placeholder="e.g. 202110293" value={newData.studentId} onChange={(e) => setNewData({...newData, studentId: e.target.value})} />
                    </div>

                    <div>
                        <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '5px'}}>CvSU Email <span style={{color:'red'}}>*</span></label>
                        <input type="email" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box'}} placeholder="student@cvsu.edu.ph" value={newData.email} onChange={(e) => setNewData({...newData, email: e.target.value})} />
                    </div>

                    <div>
                        <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '5px'}}>Last Name <span style={{color:'red'}}>*</span></label>
                        <input type="text" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box'}} placeholder="e.g. DELA CRUZ" value={newData.lastName} onChange={(e) => setNewData({...newData, lastName: e.target.value.toUpperCase()})} />
                    </div>

                    <div style={{display: 'flex', gap: '10px'}}>
                        <div style={{flex: 1}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '5px'}}>First Name <span style={{color:'red'}}>*</span></label>
                            <input type="text" style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box'}} placeholder="e.g. JUAN" value={newData.firstName} onChange={(e) => setNewData({...newData, firstName: e.target.value.toUpperCase()})} />
                        </div>
                        <div style={{width: '70px'}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '5px'}}>M.I.</label>
                            <input type="text" maxLength={2} style={{width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', textAlign: 'center'}} placeholder="P" value={newData.middleName} onChange={(e) => setNewData({...newData, middleName: e.target.value.toUpperCase()})} />
                        </div>
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px'}}>
                    <button onClick={() => setShowAddModal(false)} style={{padding: '10px 16px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#4b5563', fontWeight: 'bold', cursor: 'pointer'}}>Cancel</button>
                    <button onClick={handleManualAdd} style={{padding: '10px 16px', borderRadius: '6px', border: 'none', background: '#0ea5e9', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>Add to Whitelist</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}