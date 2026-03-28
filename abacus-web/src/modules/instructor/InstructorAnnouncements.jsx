import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, Trash2, Target, Calendar, 
  X, RotateCcw, AlertTriangle, Clock, Megaphone, Edit
} from 'lucide-react';
import './Instructor.css';

export default function InstructorAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Modals
  const [showModal, setShowModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Trash State
  const [trashList, setTrashList] = useState([]);
  const [trashLoading, setTrashLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetClass: '' // Will store stringified JSON of the selected class
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
              
              // Set default target class to the first assigned class
              if (finalClasses.length > 0 && !isEditing) {
                  setFormData(prev => ({...prev, targetClass: JSON.stringify(finalClasses[0])}));
              }
          } catch(e) {
              console.error("Failed to parse assigned classes", e);
          }
      }

      // 2. Fetch Active Announcements
      const res = await fetch(`http://localhost:5000/announcements/instructor/${user.id}`);
      const data = await res.json();
      setAnnouncements(data || []);
      
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
        const res = await fetch(`http://localhost:5000/trash/announcements/instructor/${user.id}`);
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
    if (window.confirm("Move this announcement to Trash? It will be removed from the students' app immediately.")) {
      try {
        const res = await fetch(`http://localhost:5000/announcements/${id}/soft-delete`, { method: 'PUT' });
        if (res.ok) fetchDashboardData();
      } catch (e) {
        alert("Failed to trash announcement.");
      }
    }
  };

  const handleRestore = async (id) => {
    if(!window.confirm("Restore this announcement?")) return;
    try {
        const res = await fetch(`http://localhost:5000/announcements/${id}/restore`, { method: 'PUT' });
        if (res.ok) {
            fetchTrash(); 
            fetchDashboardData(); 
        }
    } catch (e) {
        alert("Failed to restore");
    }
  };

  const handlePermanentDelete = async (id) => {
    if(!window.confirm("WARNING: This will permanently delete the announcement. This cannot be undone.")) return;
    try {
        const res = await fetch(`http://localhost:5000/announcements/${id}/permanent`, { method: 'DELETE' });
        if (res.ok) fetchTrash();
    } catch (e) {
        alert("Failed to delete permanently");
    }
  };

  // --- MODAL & FORM HELPERS ---
  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({
      title: '',
      content: '',
      targetClass: assignedClasses.length > 0 ? JSON.stringify(assignedClasses[0]) : ''
    });
    setShowModal(true);
  };

  const openEditModal = (ann) => {
    setIsEditing(true);
    setEditId(ann.id);
    setFormData({
      title: ann.title,
      content: ann.content,
      targetClass: JSON.stringify({ year: ann.target_year, section: ann.target_section })
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert("Please fill out all fields.");
    if (!formData.targetClass) return alert("Please select a target class.");

    const userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr);
    
    const parsedClass = JSON.parse(formData.targetClass);

    const payload = {
        title: formData.title,
        content: formData.content,
        targetYear: parsedClass.year,
        targetSection: parsedClass.section,
        authorRole: 'INSTRUCTOR',
        authorName: user.fullName,
        authorId: user.id
    };

    setSaving(true);
    try {
      let url = 'http://localhost:5000/announcements';
      let method = 'POST';

      if (isEditing) {
        url = `http://localhost:5000/announcements/${editId}`;
        method = 'PUT';
      }

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        alert(isEditing ? "Announcement updated!" : "Announcement posted!");
        setShowModal(false);
        fetchDashboardData();
      } else {
        alert("Failed to save: " + data.error);
      }
    } catch (err) {
      alert("Server error. Could not save announcement.");
    } finally {
      setSaving(false);
    }
  };

  const getDaysLeft = (deletedDateString) => {
      if (!deletedDateString) return 30;
      const deletedDate = new Date(deletedDateString);
      const expiryDate = new Date(deletedDate.getTime() + (30 * 24 * 60 * 60 * 1000));
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays > 0 ? diffDays : 0; 
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
            <h1 className="page-title">Class Announcements</h1>
        </div>
        <div style={{display:'flex', gap: '10px'}}>
            <button className="btn-secondary" style={{backgroundColor: '#ef4444', color:'white', border:'none'}} onClick={openTrash}>
              <Trash2 size={20} /> Trash Bin
            </button>
            <button className="btn-primary" onClick={openCreateModal}>
              <Plus size={20} /> Post Announcement
            </button>
        </div>
      </div>

      <div style={{marginBottom: '20px', color: '#666'}}>
        Post updates, reminders, or messages directly to your specific class sections.
      </div>

      {/* ACTIVE ANNOUNCEMENTS TABLE */}
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th width="25%">Title</th>
              <th width="40%">Message</th>
              <th width="15%">Target Class</th>
              <th width="10%">Date Posted</th>
              <th width="10%" style={{textAlign: 'right'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center p-4">Loading announcements...</td></tr>
            ) : announcements.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-4" style={{color: '#888'}}>No active announcements found.</td></tr>
            ) : (
              announcements.map((ann) => (
                  <tr key={ann.id}>
                    <td>
                      <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Megaphone size={16} color="#eab308"/> {ann.title}
                      </div>
                    </td>
                    <td>
                      <span style={{fontSize: '13px', color: '#555'}}>
                        {ann.content.length > 70 ? ann.content.substring(0, 70) + '...' : ann.content}
                      </span>
                    </td>
                    <td>
                        <span style={{fontSize:'11px', background:'#f3f4f6', padding:'4px 8px', borderRadius:'4px', border:'1px solid #e5e7eb', fontWeight: 'bold'}}>
                            Yr {ann.target_year} - Sec {ann.target_section}
                        </span>
                    </td>
                    <td style={{fontSize: '13px', color: '#666'}}>
                        {new Date(ann.created_at).toLocaleDateString()}
                    </td>
                    <td style={{textAlign: 'right'}}>
                        <div className="action-buttons" style={{justifyContent: 'flex-end'}}>
                            <button className="btn-icon btn-edit" onClick={() => openEditModal(ann)} title="Edit Announcement">
                                <Edit size={18} />
                            </button>
                            <button className="btn-icon btn-delete" onClick={() => handleSoftDelete(ann.id)} title="Move to Trash">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* --- TRASH BIN MODAL --- */}
      {showTrashModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '800px'}}>
                <div className="modal-header">
                    <h2 className="modal-title" style={{color: '#dc2626'}}>Trash Bin (Deleted Announcements)</h2>
                </div>
                
                <div style={{padding: '15px 20px', background: '#fef2f2', borderBottom: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <AlertTriangle size={18} color="#dc2626"/>
                    <span style={{fontSize: '13px', color: '#991b1b'}}>Announcements in the trash will be permanently deleted after 30 days.</span>
                </div>

                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {trashLoading ? <p style={{textAlign:'center', padding: '20px'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center', padding: '20px'}}>Trash bin is empty.</p> : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th width="40%">Title</th>
                                    <th width="20%">Target Class</th>
                                    <th width="15%">Days Left</th>
                                    <th width="25%" style={{textAlign: 'right'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trashList.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div style={{fontWeight:'bold', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px'}}>
                                                <Megaphone size={14} color="#9ca3af"/> {item.title}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{fontSize:'11px', background:'#f3f4f6', color: '#6b7280', padding:'4px 8px', borderRadius:'4px'}}>
                                                Yr {item.target_year} - Sec {item.target_section}
                                            </span>
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

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => !saving && setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '550px', padding: 0, overflow: 'hidden'}}>
                
                <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Megaphone size={22}/> {isEditing ? "Edit Announcement" : "Post Announcement"}
                    </h2>
                    {!saving && (
                        <button onClick={() => setShowModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}>
                            <X size={24}/>
                        </button>
                    )}
                </div>

                <form onSubmit={handleSave}>
                    <div style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Announcement Title</label>
                            <input 
                                required 
                                placeholder="e.g., No Class Tomorrow"
                                value={formData.title} 
                                onChange={e => setFormData({...formData, title: e.target.value})} 
                                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box'}}
                            />
                        </div>
                        
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Message Content</label>
                            <textarea 
                                required
                                value={formData.content} 
                                placeholder="Type your full announcement here..."
                                onChange={e => setFormData({...formData, content: e.target.value})} 
                                rows="5" 
                                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit'}}
                            />
                        </div>
                        
                        <div style={{background:'#fafafa', padding:'15px', borderRadius:'8px', border:'1px solid #eee'}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '10px'}}>
                                <Target size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/>
                                Select Target Class
                            </label>
                            
                            {assignedClasses.length > 0 ? (
                                <select 
                                    style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', background: 'white'}}
                                    value={formData.targetClass} 
                                    onChange={(e) => setFormData({...formData, targetClass: e.target.value})}
                                    required
                                >
                                    {assignedClasses.map((ac, i) => (
                                        <option key={i} value={JSON.stringify(ac)}>
                                            Year {ac.year} - Section {ac.section}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div style={{padding: '10px', background: '#fee2e2', borderRadius: '6px', color: '#991b1b', fontSize: '13px'}}>
                                    You do not have any assigned classes. Please contact the administrator.
                                </div>
                            )}
                        </div>

                    </div>
                    
                    <div style={{padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
                        <button type="button" disabled={saving} onClick={() => setShowModal(false)} style={{padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer'}}>
                            Cancel
                        </button>
                        <button type="submit" disabled={saving || assignedClasses.length === 0} style={{padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#eab308', color: '#422006', fontWeight: 'bold', cursor: (saving || assignedClasses.length === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
                            {saving ? 'Saving...' : 'Post Announcement'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}