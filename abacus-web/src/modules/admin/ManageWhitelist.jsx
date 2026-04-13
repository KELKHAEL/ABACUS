import React, { useState, useEffect, useRef } from 'react';
import { Eye, Upload, Trash2, Filter, Save, Edit, X } from 'lucide-react';
import * as XLSX from 'xlsx'; 
import './ManageStudents.css';

export default function ManageWhitelist() {
  const [allowedList, setAllowedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ studentId: '', email: '' });
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);

      const formattedData = data.map(row => {
        const rawName = row['Full Name'] || row['Name'] || row['Student Name'] || "";
        const fName = row['First Name'] || row['first_name'] || "";
        const mName = row['Middle Name'] || row['middle_name'] || "";
        const lName = row['Last Name'] || row['last_name'] || "";

        return {
          studentId: String(row['Student ID'] || row['student_id'] || '').trim(),
          email: String(row['Email'] || row['email'] || '').trim(),
          rawName: rawName,
          firstName: fName,
          middleName: mName,
          lastName: lName
        };
      }).filter(s => String(s.studentId).startsWith('20') && s.email.endsWith('@cvsu.edu.ph'));

      if (formattedData.length === 0) {
        alert("Import Error: IDs must start with '20' and use @cvsu.edu.ph emails.");
        return;
      }

      try {
        const res = await fetch('https://abacus-w435.onrender.com/upload-allowed-students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ students: formattedData })
        });
        const result = await res.json();
        if (result.success) {
            alert(`Whitelist Alert:\n\n Newly Added: ${result.newlyAdded}\n Modified: ${result.modified}\n Duplicates/Ignored: ${result.duplicates}`);
            fetchWhitelist();
        }
      } catch (err) { alert("Server connection failed."); }
    };
    reader.readAsBinaryString(file);
    e.target.value = null; 
  };

  const deleteFromWhitelist = async (id) => {
      if(!window.confirm("Remove this student from the allowed list?")) return;
      try {
          await fetch(`https://abacus-w435.onrender.com/allowed-students/${id}`, { method: 'DELETE' });
          fetchWhitelist(); 
      } catch (e) { alert("Failed to delete"); }
  };

  const startEditing = (item) => {
      setEditingId(item.id);
      setEditData({ studentId: item.student_id, email: item.email });
  };

  const saveEdit = async (id) => {
      if (!editData.studentId || !editData.email) return alert("Fields cannot be empty.");
      try {
          const res = await fetch(`https://abacus-w435.onrender.com/allowed-students/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(editData)
          });
          const data = await res.json();
          if (data.success) {
              setEditingId(null);
              fetchWhitelist();
          } else { alert("Failed to update: " + data.error); }
      } catch (e) { alert("Server Error."); }
  };

  const batchYears = [...new Set(
      allowedList
        .map(item => item.student_id ? String(item.student_id).substring(0, 4) : null)
        .filter(year => year && year.startsWith('20')) 
  )].sort((a, b) => b.localeCompare(a)); 

  const filteredList = allowedList.filter(item => {
      if (filterYear === 'ALL') return true;
      return item.student_id && String(item.student_id).startsWith(filterYear);
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
            <button className="btn-primary" onClick={triggerFileInput}>
              <Upload size={20} /> Upload List
            </button>
        </div>
      </div>

      <div className="filter-bar">
        <Filter size={18} color="#6b7280"/>
        <span style={{fontSize: '14px', fontWeight: 'bold', color: '#4b5563'}}>Filter by Batch:</span>
        <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="filter-select"
        >
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
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Email Address</th>
                        <th style={{textAlign: 'right'}}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item) => {
                        const isItemEditing = editingId === item.id;
                        const fullName = item.middle_name 
                            ? `${item.last_name}, ${item.first_name} ${item.middle_name.charAt(0)}.`
                            : `${item.last_name}, ${item.first_name}`;
                            
                        return (
                            <tr key={item.id} style={{background: isItemEditing ? '#f0fdf4' : 'transparent'}}>
                                {isItemEditing ? (
                                    <>
                                        <td>
                                            <input autoFocus style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #10b981', fontFamily: 'monospace'}} value={editData.studentId} onChange={(e) => setEditData({...editData, studentId: e.target.value})} />
                                        </td>
                                        <td style={{color: '#888', fontStyle: 'italic'}}>Read Only</td>
                                        <td>
                                            <input style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #10b981'}} value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} />
                                        </td>
                                        <td style={{textAlign: 'right'}}>
                                            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '5px'}}>
                                                <button onClick={() => saveEdit(item.id)} style={{background: '#10b981', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}><Save size={14}/> Save</button>
                                                <button onClick={() => setEditingId(null)} style={{background: '#f3f4f6', color: '#4b5563', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}>Cancel</button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td style={{fontWeight:'600', fontFamily: 'monospace', color: '#111'}}>{item.student_id}</td>
                                        <td style={{fontWeight: 'bold', color: '#104a28'}}>{fullName !== ', ' ? fullName : 'N/A'}</td>
                                        <td style={{color: '#4b5563'}}>{item.email}</td>
                                        <td style={{textAlign: 'right'}}>
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
    </div>
  );
}