import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, Trash2, Target, Calendar, 
  X, RotateCcw, AlertTriangle, Clock, Megaphone, Edit, Filter, Inbox, Send
} from 'lucide-react';
import './Instructor.css';

export default function InstructorAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [adminAnnouncements, setAdminAnnouncements] = useState([]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [viewMode, setViewMode] = useState('sent'); 

  const [filterYear, setFilterYear] = useState('ALL');
  const [filterMonth, setFilterMonth] = useState('ALL');
  const [filterDay, setFilterDay] = useState('ALL');

  const [showModal, setShowModal] = useState(false);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // Now stores an Array of IDs for the batch
  
  const [trashList, setTrashList] = useState([]);
  const [trashLoading, setTrashLoading] = useState(false);

  const [formData, setFormData] = useState({ title: '', content: '' });
  const [selectedClasses, setSelectedClasses] = useState([]); 

  const navigate = useNavigate();

  // ✅ NEW: Helper function to group mass-postings into a single UI card
  const groupAnnouncements = (rawList) => {
    const grouped = [];
    const map = {};
    (rawList || []).forEach(ann => {
      // Group by exact Title, Content, and the minute it was posted
      const timeKey = new Date(ann.created_at).toISOString().slice(0, 16); 
      const key = `${ann.title}-${ann.content}-${timeKey}`;
      
      if (!map[key]) {
        map[key] = {
          ...ann,
          grouped_ids: [ann.id],
          target_classes: [{ year: ann.target_year, section: ann.target_section }]
        };
        grouped.push(map[key]);
      } else {
        map[key].grouped_ids.push(ann.id);
        map[key].target_classes.push({ year: ann.target_year, section: ann.target_section });
      }
    });
    return grouped;
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);

      const usersRes = await fetch(`https://abacus-w435.onrender.com/users?role=INSTRUCTOR`);
      const usersData = await usersRes.json();
      
      const currentInstructor = usersData.find(u => u.email === user.email);
      if (currentInstructor && currentInstructor.assigned_classes) {
          try {
              const classes = typeof currentInstructor.assigned_classes === 'string' 
                  ? JSON.parse(currentInstructor.assigned_classes) 
                  : currentInstructor.assigned_classes;
                  
              const finalClasses = typeof classes === 'string' ? JSON.parse(classes) : classes;
              setAssignedClasses(Array.isArray(finalClasses) ? finalClasses : []);
          } catch(e) {}
      }

      const res = await fetch(`https://abacus-w435.onrender.com/announcements/instructor/${user.id}`);
      const data = await res.json();
      
      // ✅ Apply Grouping so it doesn't flood the UI
      setAnnouncements(groupAnnouncements(data));

      const adminRes = await fetch(`https://abacus-w435.onrender.com/announcements/admin-to-instructor/${user.id}`);
      const adminData = await adminRes.json();
      setAdminAnnouncements(adminData || []);
      
    } catch (error) { console.error("Error fetching data:", error); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await fetch(`https://abacus-w435.onrender.com/trash/announcements/instructor/${user.id}`);
        const data = await res.json();
        
        // ✅ Apply Grouping to Trash Bin as well
        setTrashList(groupAnnouncements(data));
    } catch (error) { console.error("Error fetching trash:", error); } 
    finally { setTrashLoading(false); }
  };

  const openTrash = () => { setShowTrashModal(true); fetchTrash(); };

  // ✅ Batch Deletions
  const handleSoftDelete = async (groupedIds) => {
    if (window.confirm("Move this announcement to Trash? It will be removed from the students' app immediately.")) {
      try {
        await Promise.all(groupedIds.map(id => fetch(`https://abacus-w435.onrender.com/announcements/${id}/soft-delete`, { method: 'PUT' })));
        fetchDashboardData();
      } catch (e) { alert("Failed to trash announcement."); }
    }
  };

  const handleRestore = async (groupedIds) => {
    if(!window.confirm("Restore this announcement?")) return;
    try {
        await Promise.all(groupedIds.map(id => fetch(`https://abacus-w435.onrender.com/announcements/${id}/restore`, { method: 'PUT' })));
        fetchTrash(); fetchDashboardData();
    } catch (e) { alert("Failed to restore"); }
  };

  const handlePermanentDelete = async (groupedIds) => {
    if(!window.confirm("WARNING: This will permanently delete the announcement for ALL assigned classes.")) return;
    try {
        await Promise.all(groupedIds.map(id => fetch(`https://abacus-w435.onrender.com/announcements/${id}/permanent`, { method: 'DELETE' })));
        fetchTrash();
    } catch (e) { alert("Failed to delete permanently"); }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ title: '', content: '' });
    setSelectedClasses(assignedClasses);
    setShowModal(true);
  };

  const openEditModal = (ann) => {
    setIsEditing(true);
    setEditId(ann.grouped_ids); // Pass array of batch IDs
    setFormData({ title: ann.title, content: ann.content });
    setSelectedClasses(ann.target_classes); 
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert("Please fill out all fields.");
    if (selectedClasses.length === 0) return alert("Please select at least one target class.");

    const userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr);

    setSaving(true);
    try {
      if (isEditing) {
          // ✅ Edit ALL announcements in this batch grouping at once
          await Promise.all(editId.map((id, index) => {
              return fetch(`https://abacus-w435.onrender.com/announcements/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      title: formData.title,
                      content: formData.content,
                      targetYear: selectedClasses[index].year,
                      targetSection: selectedClasses[index].section
                  })
              });
          }));
          alert("Announcement updated successfully!");
      } else {
          // ✅ Post new announcement (Backend loop handles multiple targets)
          const payload = {
              title: formData.title, 
              content: formData.content, 
              authorRole: 'INSTRUCTOR', 
              authorName: user.fullName, 
              authorId: user.id,
              targets: selectedClasses.map(c => ({ targetYear: c.year, targetSection: c.section }))
          };
          const res = await fetch('https://abacus-w435.onrender.com/announcements', { 
              method: 'POST', 
              headers: { 'Content-Type': 'application/json' }, 
              body: JSON.stringify(payload) 
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          alert("Announcements posted successfully!");
      }
      setShowModal(false);
      fetchDashboardData();
    } catch (err) { alert("Server error."); } 
    finally { setSaving(false); }
  };

  const getDaysLeft = (deletedDateString) => {
      if (!deletedDateString) return 30;
      const diffTime = new Date(new Date(deletedDateString).getTime() + (30 * 24 * 60 * 60 * 1000)) - new Date();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays > 0 ? diffDays : 0; 
  };

  const currentDataList = viewMode === 'sent' ? announcements : adminAnnouncements;
  const filteredList = currentDataList.filter(item => {
    const d = new Date(item.created_at);
    if (filterYear !== 'ALL' && d.getFullYear().toString() !== filterYear) return false;
    if (filterMonth !== 'ALL' && (d.getMonth() + 1).toString() !== filterMonth) return false;
    if (filterDay !== 'ALL' && d.getDate().toString() !== filterDay) return false;
    return true;
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);
  const months = Array.from({length: 12}, (_, i) => i + 1);
  const days = Array.from({length: 31}, (_, i) => i + 1);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedClasses([...assignedClasses]); 
    } else {
      setSelectedClasses([]); 
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
            <h1 className="page-title">Announcements Dashboard</h1>
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

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button 
            onClick={() => setViewMode('sent')} 
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', background: viewMode === 'sent' ? '#104a28' : '#e5e7eb', color: viewMode === 'sent' ? 'white' : '#4b5563' }}
          >
              <Send size={18}/> My Announcements
          </button>
          <button 
            onClick={() => setViewMode('inbox')} 
            style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', background: viewMode === 'inbox' ? '#104a28' : '#e5e7eb', color: viewMode === 'inbox' ? 'white' : '#4b5563' }}
          >
              <Inbox size={18}/> Admin Inbox
          </button>
      </div>

      <div style={{background: 'white', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#555'}}>
            <Filter size={18}/> Filters:
        </div>
        <select value={filterYear} onChange={e => setFilterYear(e.target.value)} style={{padding: '8px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none'}}>
            <option value="ALL">All Years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} style={{padding: '8px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none'}}>
            <option value="ALL">All Months</option>
            {months.map(m => <option key={m} value={m}>{new Date(0, m - 1).toLocaleString('default', { month: 'long' })}</option>)}
        </select>
        <select value={filterDay} onChange={e => setFilterDay(e.target.value)} style={{padding: '8px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none'}}>
            <option value="ALL">All Days</option>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        {(filterYear !== 'ALL' || filterMonth !== 'ALL' || filterDay !== 'ALL') && (
            <button onClick={() => {setFilterYear('ALL'); setFilterMonth('ALL'); setFilterDay('ALL');}} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold'}}>
                Clear Filters
            </button>
        )}
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th width="25%">Title</th>
              <th width="40%">Message</th>
              {viewMode === 'sent' && <th width="15%">Target Class</th>}
              {viewMode === 'inbox' && <th width="15%">Sent By</th>}
              <th width="10%">Date Posted</th>
              {viewMode === 'sent' && <th width="10%" style={{textAlign: 'right'}}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center p-4">Loading...</td></tr>
            ) : filteredList.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-4" style={{color: '#888'}}>No announcements found.</td></tr>
            ) : (
              filteredList.map((ann, i) => (
                  <tr key={ann.id || i}>
                    <td>
                      <div style={{fontWeight: '600', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Megaphone size={16} color={viewMode === 'inbox' ? "#dc2626" : "#eab308"}/> {ann.title}
                      </div>
                    </td>
                    <td>
                      <span style={{fontSize: '13px', color: '#555'}}>{ann.content}</span>
                    </td>
                    
                    {viewMode === 'sent' && (
                        <td>
                            {/* ✅ DISPLAY GROUPED BADGE */}
                            {ann.target_classes && ann.target_classes.length > 1 ? (
                                <span style={{fontSize:'11px', background:'#f3f4f6', color: '#104a28', padding:'4px 8px', borderRadius:'4px', border:'1px solid #bbf7d0', fontWeight: 'bold'}}>
                                    {ann.target_classes.length} Classes Selected
                                </span>
                            ) : (
                                <span style={{fontSize:'11px', background:'#f3f4f6', padding:'4px 8px', borderRadius:'4px', border:'1px solid #e5e7eb', fontWeight: 'bold'}}>
                                    Yr {ann.target_year} - Sec {ann.target_section}
                                </span>
                            )}
                        </td>
                    )}
                    {viewMode === 'inbox' && (
                        <td>
                            <span style={{fontSize:'11px', background:'#fee2e2', color: '#b91c1c', padding:'4px 8px', borderRadius:'4px', fontWeight: 'bold'}}>
                                {ann.author_name} (Admin)
                            </span>
                        </td>
                    )}

                    <td style={{fontSize: '13px', color: '#666'}}>{new Date(ann.created_at).toLocaleDateString()}</td>
                    
                    {viewMode === 'sent' && (
                        <td style={{textAlign: 'right'}}>
                            <div className="action-buttons" style={{justifyContent: 'flex-end'}}>
                                <button className="btn-icon btn-edit" onClick={() => openEditModal(ann)} title="Edit Announcement"><Edit size={18} /></button>
                                {/* ✅ Uses the Grouped IDs to delete the whole batch */}
                                <button className="btn-icon btn-delete" onClick={() => handleSoftDelete(ann.grouped_ids)} title="Move to Trash"><Trash2 size={18} /></button>
                            </div>
                        </td>
                    )}
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {showTrashModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '800px'}}>
                <div className="modal-header"><h2 className="modal-title" style={{color: '#dc2626'}}>Trash Bin</h2></div>
                <div style={{padding: '15px 20px', background: '#fef2f2', borderBottom: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <AlertTriangle size={18} color="#dc2626"/>
                    <span style={{fontSize: '13px', color: '#991b1b'}}>Announcements in the trash will be permanently deleted after 30 days.</span>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {trashLoading ? <p style={{textAlign:'center', padding: '20px'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center', padding: '20px'}}>Trash bin is empty.</p> : (
                        <table className="data-table">
                            <thead><tr><th width="40%">Title</th><th width="20%">Target Class</th><th width="15%">Days Left</th><th width="25%" style={{textAlign: 'right'}}>Actions</th></tr></thead>
                            <tbody>
                                {trashList.map((item, i) => (
                                    <tr key={item.id || i}>
                                        <td><div style={{fontWeight:'bold', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px'}}><Megaphone size={14} color="#9ca3af"/> {item.title}</div></td>
                                        <td>
                                            {item.target_classes && item.target_classes.length > 1 ? (
                                                <span style={{fontSize:'11px', background:'#f3f4f6', color: '#6b7280', padding:'4px 8px', borderRadius:'4px', fontWeight: 'bold'}}>
                                                    {item.target_classes.length} Classes Selected
                                                </span>
                                            ) : (
                                                <span style={{fontSize:'11px', background:'#f3f4f6', color: '#6b7280', padding:'4px 8px', borderRadius:'4px', fontWeight: 'bold'}}>
                                                    Yr {item.target_year} - Sec {item.target_section}
                                                </span>
                                            )}
                                        </td>
                                        <td><div style={{display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontWeight: 'bold', fontSize: '13px'}}><Clock size={14} color="#dc2626" />{getDaysLeft(item.deleted_at)}</div></td>
                                        <td style={{textAlign: 'right'}}>
                                            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#10b981', color:'white', border:'none'}} onClick={() => handleRestore(item.grouped_ids)}><RotateCcw size={14} style={{marginRight: 5}}/> Restore</button>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#dc2626', color:'white', border:'none'}} onClick={() => handlePermanentDelete(item.grouped_ids)}><Trash2 size={14} style={{marginRight: 5}}/> Delete</button>
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

      {showModal && (
        <div className="modal-overlay" onClick={() => !saving && setShowModal(false)}>
            {/* ✅ FIX: Modal is now a flex column with a strict max-height to ensure internal scrolling */}
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '550px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh'}}>
                
                <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><Megaphone size={22}/> {isEditing ? "Edit Announcement" : "Post Announcement"}</h2>
                    {!saving && <button onClick={() => setShowModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}><X size={24}/></button>}
                </div>
                
                {/* ✅ FIX: Form takes up remaining space, enabling overflow scroll inside */}
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                    <div style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1}}>
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Announcement Title</label>
                            <input required placeholder="e.g., No Class Tomorrow" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box'}}/>
                        </div>
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Message Content</label>
                            <textarea required value={formData.content} placeholder="Type your full announcement here..." onChange={e => setFormData({...formData, content: e.target.value})} rows="5" style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit'}}/>
                        </div>
                        
                        <div style={{background:'#fafafa', padding:'15px', borderRadius:'8px', border:'1px solid #eee'}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '10px'}}><Target size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> Select Target Classes</label>
                            
                            {assignedClasses.length > 0 ? (
                                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', background: 'white', border: '1px solid #d1d5db', padding: '10px', borderRadius: '6px'}}>
                                    <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#111', fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '4px'}}>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedClasses.length === assignedClasses.length && assignedClasses.length > 0}
                                            disabled={isEditing}
                                            onChange={handleSelectAll}
                                            style={{width: '16px', height: '16px', accentColor: '#104a28'}}
                                        />
                                        Select All Classes
                                    </label>
                                    
                                    {assignedClasses.map((ac, i) => {
                                        const isChecked = selectedClasses.some(sc => sc.year === ac.year && sc.section === ac.section);
                                        return (
                                            <label key={i} style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#333'}}>
                                                <input 
                                                    type="checkbox" 
                                                    checked={isChecked}
                                                    disabled={isEditing} 
                                                    onChange={(e) => {
                                                        if (e.target.checked) setSelectedClasses([...selectedClasses, ac]);
                                                        else setSelectedClasses(selectedClasses.filter(sc => !(sc.year === ac.year && sc.section === ac.section)));
                                                    }}
                                                    style={{width: '16px', height: '16px', accentColor: '#104a28'}}
                                                />
                                                Year {ac.year} - Section {ac.section}
                                            </label>
                                        )
                                    })}
                                </div>
                            ) : (
                                <div style={{padding: '10px', background: '#fee2e2', borderRadius: '6px', color: '#991b1b', fontSize: '13px'}}>You do not have any assigned classes. Please contact the administrator.</div>
                            )}
                            {isEditing && <p style={{fontSize: '11px', color: '#888', marginTop: '8px'}}>* Target classes cannot be modified while editing. To change targets, delete and create a new announcement.</p>}
                        </div>

                    </div>
                    
                    <div style={{padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', justifyContent: 'flex-end', flexShrink: 0}}>
                        <button type="button" disabled={saving} onClick={() => setShowModal(false)} style={{padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer'}}>Cancel</button>
                        <button type="submit" disabled={saving || assignedClasses.length === 0} style={{padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#eab308', color: '#422006', fontWeight: 'bold', cursor: (saving || assignedClasses.length === 0) ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>{saving ? 'Saving...' : 'Post Announcement'}</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}