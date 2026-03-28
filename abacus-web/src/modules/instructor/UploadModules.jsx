import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, Trash2, FileText, Target, Calendar, 
  UploadCloud, X, BookOpen, Download, RotateCcw, AlertTriangle, Clock
} from 'lucide-react';
import './Instructor.css';

export default function UploadModules() {
  const [modules, setModules] = useState([]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // Modals
  const [showModal, setShowModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  
  // Trash State
  const [trashList, setTrashList] = useState([]);
  const [trashLoading, setTrashLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetClasses: [], 
    file: null
  });

  const navigate = useNavigate();

  // --- FETCH MAIN DATA ---
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);

      // 1. Fetch Instructor's Assigned Classes
      const usersRes = await fetch(`http://localhost:5000/users?role=INSTRUCTOR`);
      const usersData = await usersRes.json();
      
      const currentInstructor = usersData.find(u => u.email === user.email);
      if (currentInstructor && currentInstructor.assigned_classes) {
          try {
              const classes = typeof currentInstructor.assigned_classes === 'string' 
                  ? JSON.parse(currentInstructor.assigned_classes) 
                  : currentInstructor.assigned_classes;
                  
              const finalClasses = typeof classes === 'string' ? JSON.parse(classes) : classes;
              setAssignedClasses(Array.isArray(finalClasses) ? finalClasses : []);
          } catch(e) {
              console.error("Failed to parse assigned classes", e);
          }
      }

      // 2. Fetch Active Modules
      const res = await fetch(`http://localhost:5000/modules/instructor/${user.id}`);
      const data = await res.json();
      setModules(data || []);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // --- TRASH LOGIC ---
  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await fetch(`http://localhost:5000/trash/modules/instructor/${user.id}`);
        const data = await res.json();
        setTrashList(data || []);
    } catch (error) {
        console.error("Error fetching trash:", error);
    } finally {
        setTrashLoading(false);
    }
  };

  const openTrash = () => {
    setShowTrashModal(true);
    fetchTrash();
  };

  const handleSoftDelete = async (id) => {
    if (window.confirm("Move this module to Trash? It will be hidden from students immediately.")) {
      try {
        const res = await fetch(`http://localhost:5000/modules/${id}/soft-delete`, { method: 'PUT' });
        if (res.ok) fetchDashboardData();
      } catch (e) {
        alert("Failed to trash module.");
      }
    }
  };

  const handleRestore = async (id) => {
    if(!window.confirm("Restore this module? Students will be able to see it again.")) return;
    try {
        const res = await fetch(`http://localhost:5000/modules/${id}/restore`, { method: 'PUT' });
        if (res.ok) {
            fetchTrash(); 
            fetchDashboardData(); 
        }
    } catch (e) {
        alert("Failed to restore");
    }
  };

  const handlePermanentDelete = async (id) => {
    if(!window.confirm("WARNING: This will permanently delete the module file and record. This cannot be undone.")) return;
    try {
        const res = await fetch(`http://localhost:5000/modules/${id}/permanent`, { method: 'DELETE' });
        if (res.ok) fetchTrash();
    } catch (e) {
        alert("Failed to delete permanently");
    }
  };


  // --- MODAL & FORM HELPERS ---
  const openUploadModal = () => {
    setFormData({
      title: '',
      description: '',
      targetClasses: [],
      file: null
    });
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      alert("Please upload a valid PDF file.");
      e.target.value = null;
      return;
    }
    setFormData({ ...formData, file: selectedFile });
  };

  const addClassRow = () => {
    if (assignedClasses.length === 0) return alert("You do not have any classes assigned to you.");
    setFormData({ ...formData, targetClasses: [...formData.targetClasses, { ...assignedClasses[0] }] });
  };

  const removeClassRow = (index) => {
    const updated = [...formData.targetClasses];
    updated.splice(index, 1);
    setFormData({ ...formData, targetClasses: updated });
  };

  const updateClassRow = (index, selectedClassString) => {
    const updated = [...formData.targetClasses];
    updated[index] = JSON.parse(selectedClassString);
    setFormData({ ...formData, targetClasses: updated });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.file) return alert("Please select a PDF file to upload.");
    if (!formData.title) return alert("Please enter a title.");

    const userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr);

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('description', formData.description);
    payload.append('targetClasses', JSON.stringify(formData.targetClasses));
    payload.append('uploadedBy', user.id);
    payload.append('pdfFile', formData.file);

    setUploading(true);
    try {
      const res = await fetch('http://localhost:5000/modules', {
        method: 'POST',
        body: payload
      });

      const data = await res.json();
      if (data.success) {
        alert("Module uploaded successfully!");
        setShowModal(false);
        fetchDashboardData();
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      alert("Server error. Could not upload file.");
    } finally {
      setUploading(false);
    }
  };

  // Helper to calculate days left in trash
  const getDaysLeft = (deletedDateString) => {
      if (!deletedDateString) return 30; // Fallback
      const deletedDate = new Date(deletedDateString);
      const expiryDate = new Date(deletedDate.getTime() + (30 * 24 * 60 * 60 * 1000));
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays > 0 ? diffDays : 0; // Return 0 if negative
  };

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="page-header">
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
            <h1 className="page-title">Upload Modules</h1>
        </div>
        <div style={{display:'flex', gap: '10px'}}>
            <button className="btn-secondary" style={{backgroundColor: '#ef4444', color:'white', border:'none'}} onClick={openTrash}>
              <Trash2 size={20} /> Trash Bin
            </button>
            <button className="btn-primary" onClick={openUploadModal}>
              <UploadCloud size={20} /> Upload New Module
            </button>
        </div>
      </div>

      <div style={{marginBottom: '20px', color: '#666'}}>
        Upload PDF lecture materials and assign them to your specific sections.
      </div>

      {/* ACTIVE MODULES TABLE */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th width="30%">Module Title</th>
              <th width="30%">Description</th>
              <th width="20%">Target Classes</th>
              <th width="10%">Date Added</th>
              <th width="10%" style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center p-4">Loading modules...</td></tr>
            ) : modules.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-4" style={{color: '#888'}}>You haven't uploaded any modules yet.</td></tr>
            ) : (
              modules.map((mod) => {
                let displayClasses = [];
                try { displayClasses = JSON.parse(mod.target_classes || '[]'); } catch(e) {}

                return (
                  <tr key={mod.id}>
                    <td>
                      <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <FileText size={16} color="#eab308"/> {mod.title}
                      </div>
                      <div style={{fontSize: '12px', color: '#0ea5e9', marginTop: '4px'}}>
                        <a href={`http://localhost:5000${mod.file_url}`} target="_blank" rel="noreferrer" style={{color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px'}}>
                           <Download size={12}/> View File
                        </a>
                      </div>
                    </td>
                    <td>
                      <span style={{fontSize: '13px', color: '#555'}}>
                        {mod.description ? (mod.description.length > 60 ? mod.description.substring(0, 60) + '...' : mod.description) : 'No description'}
                      </span>
                    </td>
                    <td>
                      <div style={{display:'flex', flexWrap:'wrap', gap:'4px'}}>
                          {displayClasses.length > 0 ? (
                              displayClasses.map((cls, idx) => (
                                  <span key={idx} style={{fontSize:'11px', background:'#f3f4f6', padding:'2px 6px', borderRadius:'4px', border:'1px solid #e5e7eb'}}>
                                      Yr {cls.year} - S{cls.section}
                                  </span>
                              ))
                          ) : (
                              <span style={{fontSize:'11px', background:'#ecfccb', color:'#3f6212', padding:'2px 6px', borderRadius:'4px', border:'1px solid #d9f99d'}}>
                                  All My Classes
                              </span>
                          )}
                      </div>
                    </td>
                    <td style={{fontSize: '13px', color: '#666'}}>
                        {new Date(mod.created_at).toLocaleDateString()}
                    </td>
                    <td style={{textAlign: 'right'}}>
                        <button className="btn-icon btn-delete" onClick={() => handleSoftDelete(mod.id)} title="Move to Trash">
                            <Trash2 size={18} />
                        </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* --- TRASH BIN MODAL --- */}
      {showTrashModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '800px'}}>
                <div className="modal-header">
                    <h2 className="modal-title" style={{color: '#dc2626'}}>Trash Bin (Deleted Modules)</h2>
                </div>
                
                <div style={{padding: '15px 20px', background: '#fef2f2', borderBottom: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <AlertTriangle size={18} color="#dc2626"/>
                    <span style={{fontSize: '13px', color: '#991b1b'}}>Modules in the trash will be permanently deleted after 30 days.</span>
                </div>

                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {trashLoading ? <p style={{textAlign:'center', padding: '20px'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center', padding: '20px'}}>Trash bin is empty.</p> : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th width="40%">Module Title</th>
                                    <th width="25%">File Name</th>
                                    <th width="15%">Days Left</th>
                                    <th width="20%" style={{textAlign: 'right'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trashList.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div style={{fontWeight:'bold', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px'}}>
                                                <FileText size={14} color="#9ca3af"/> {item.title}
                                            </div>
                                        </td>
                                        <td style={{fontSize: '12px', color: '#9ca3af', fontStyle: 'italic'}}>
                                            {item.file_name.length > 20 ? item.file_name.substring(0, 20) + '...' : item.file_name}
                                        </td>
                                        <td>
                                            <div style={{display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontWeight: 'bold', fontSize: '13px'}}>
                                                <Clock size={14} color="#dc2626" />
                                                {getDaysLeft(item.deleted_at)} Days
                                            </div>
                                        </td>
                                        <td style={{textAlign: 'right'}}>
                                            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#10b981', color: 'white', border: 'none'}} onClick={() => handleRestore(item.id)}>
                                                    <RotateCcw size={14} style={{marginRight: 5}}/> Restore
                                                </button>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#dc2626', color: 'white', border: 'none'}} onClick={() => handlePermanentDelete(item.id)}>
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

      {/* UPLOAD MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => !uploading && setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '550px', padding: 0, overflow: 'hidden'}}>
                
                {/* Header */}
                <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <UploadCloud size={22}/> Upload Lecture Module
                    </h2>
                    {!uploading && (
                        <button onClick={() => setShowModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}>
                            <X size={24}/>
                        </button>
                    )}
                </div>

                {/* Form */}
                <form onSubmit={handleUpload}>
                    <div style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Module Title</label>
                            <input 
                                required 
                                placeholder="e.g., Chapter 1: Introduction to Sets"
                                value={formData.title} 
                                onChange={e => setFormData({...formData, title: e.target.value})} 
                                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box'}}
                            />
                        </div>
                        
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Short Description</label>
                            <textarea 
                                value={formData.description} 
                                placeholder="What is this module about?"
                                onChange={e => setFormData({...formData, description: e.target.value})} 
                                rows="2" 
                                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit'}}
                            />
                        </div>
                        
                        {/* DYNAMIC TARGET CLASSES BLOCK */}
                        <div style={{background:'#fafafa', padding:'15px', borderRadius:'8px', border:'1px solid #eee'}}>
                            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
                                <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: 0}}>
                                    <Target size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/>
                                    Assign to Classes
                                </label>
                                {assignedClasses.length > 0 ? (
                                    <button type="button" onClick={addClassRow} style={{fontSize:'12px', color:'#104a28', fontWeight:'bold', background:'none', border:'none', cursor:'pointer'}}>+ Add Class</button>
                                ) : (
                                    <span style={{fontSize: '12px', color: '#dc2626', fontWeight:'bold'}}>No assigned classes</span>
                                )}
                            </div>
                            
                            {formData.targetClasses.map((cls, idx) => (
                                <div key={idx} style={{display:'flex', gap:'10px', marginBottom:'8px', alignItems:'center'}}>
                                    <select 
                                        style={{width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none', background: 'white'}}
                                        value={JSON.stringify(cls)} 
                                        onChange={(e) => updateClassRow(idx, e.target.value)}
                                    >
                                        {/* Populate options based ONLY on instructor's assigned classes */}
                                        {assignedClasses.map((ac, i) => (
                                            <option key={i} value={JSON.stringify(ac)}>
                                                Year {ac.year} - Section {ac.section}
                                            </option>
                                        ))}
                                    </select>
                                    
                                    <button type="button" onClick={() => removeClassRow(idx)} style={{color:'#dc2626', background:'none', border:'none', cursor:'pointer'}}><X size={18}/></button>
                                </div>
                            ))}
                            {formData.targetClasses.length === 0 && (
                                <p style={{fontSize: '12px', color: '#888', fontStyle: 'italic', margin: 0}}>If no classes are added, this module will be visible to ALL your assigned classes.</p>
                            )}
                        </div>

                        {/* File Input */}
                        <div style={{border: '2px dashed #d1d5db', borderRadius: '8px', padding: '20px', textAlign: 'center', background: '#f9fafb'}}>
                            <input 
                                type="file" 
                                id="pdf-upload"
                                accept="application/pdf"
                                required
                                onChange={handleFileChange}
                                style={{display: 'none'}}
                            />
                            <label htmlFor="pdf-upload" style={{cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
                                <FileText size={32} color={formData.file ? '#10b981' : '#9ca3af'} />
                                <span style={{fontWeight: 'bold', color: '#4b5563'}}>
                                    {formData.file ? formData.file.name : "Click to select a PDF file"}
                                </span>
                                {!formData.file && <span style={{fontSize: '12px', color: '#9ca3af'}}>Max size: ~10MB (PDFs only)</span>}
                            </label>
                        </div>

                    </div>
                    
                    {/* Footer Actions */}
                    <div style={{padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
                        <button type="button" disabled={uploading} onClick={() => setShowModal(false)} style={{padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '600', cursor: uploading ? 'not-allowed' : 'pointer'}}>
                            Cancel
                        </button>
                        <button type="submit" disabled={uploading} style={{padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#eab308', color: '#422006', fontWeight: 'bold', cursor: uploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
                            {uploading ? 'Uploading...' : 'Upload Module'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}