import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Trash2, Calendar, Target, User, Edit, RotateCcw } from 'lucide-react';
import './ManageAnnouncements.css';

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // --- TRASH BIN STATE ---
  const [trashList, setTrashList] = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [trashLoading, setTrashLoading] = useState(false);

  // --- MODAL STATES ---
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetYear: 'ALL',
    targetSection: 'ALL'
  });

  const currentUser = { name: "Registrar", role: "ADMIN" };

  // --- FETCH ANNOUNCEMENTS ---
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/announcements/all');
      const data = await res.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // --- TRASH BIN FUNCTIONS ---
  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const res = await fetch('http://localhost:5000/trash/announcements');
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
    if(!window.confirm("Restore this announcement?")) return;
    try {
        await fetch(`http://localhost:5000/announcements/${id}/restore`, { method: 'PUT' });
        fetchTrash(); 
        fetchAnnouncements(); 
    } catch (e) {
        alert("Failed to restore");
    }
  };

  const handlePermanentDelete = async (id) => {
    if(!window.confirm("WARNING: This will permanently delete the announcement. This cannot be undone.")) return;
    try {
        await fetch(`http://localhost:5000/announcements/${id}/permanent`, { method: 'DELETE' });
        fetchTrash();
    } catch (e) {
        alert("Failed to delete permanently");
    }
  };

  // --- SOFT DELETE (Used by the main list button) ---
  const handleSoftDelete = async (id) => {
    if (window.confirm("Move this announcement to Trash?")) {
      try {
        await fetch(`http://localhost:5000/announcements/${id}/soft-delete`, { method: 'PUT' });
        fetchAnnouncements(); // Refresh List
      } catch (err) {
        alert("Delete failed");
      }
    }
  };

  // --- OPEN MODAL HELPERS ---
  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ title: '', content: '', targetYear: 'ALL', targetSection: 'ALL' });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setEditId(item.id);
    setFormData({ 
      title: item.title, 
      content: item.content, 
      targetYear: item.target_year || 'ALL', 
      targetSection: item.target_section || 'ALL' 
    });
    setShowModal(true);
  };

  // --- SAVE (CREATE OR UPDATE) ---
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert("Title and Content are required!");

    try {
      const payload = {
        ...formData,
        authorRole: currentUser.role,
        authorName: currentUser.name
      };

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
        alert(isEditing ? "Announcement Updated!" : "Announcement Posted!");
        setShowModal(false);
        fetchAnnouncements();
      } else {
        alert("Failed: " + data.error);
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="page-header">
        <h1 className="page-title">Manage Announcements</h1>
        <div style={{display:'flex', gap:'10px'}}>
            <button className="btn-secondary" style={{backgroundColor: '#ef4444', color:'white', border:'none'}} onClick={openTrash}>
              <Trash2 size={20} /> Trash Bin
            </button>
            <button className="btn-primary" onClick={openCreateModal}>
              <Plus size={20} /> Post Announcement
            </button>
        </div>
      </div>

      {/* ANNOUNCEMENT LIST */}
      <div className="announcement-grid">
        {loading ? (
          <p className="loading-text">Loading updates...</p>
        ) : announcements.length === 0 ? (
          <div className="empty-state">
            <Megaphone size={48} color="#ccc" />
            <p>No announcements posted yet.</p>
          </div>
        ) : (
          announcements.map((item) => (
            <div key={item.id} className="announce-card">
              <div className="card-header">
                <span className={`role-badge ${item.author_role === 'ADMIN' ? 'badge-admin' : 'badge-instructor'}`}>
                  {item.author_role}
                </span>
                
                {/* ACTION BUTTONS */}
                <div style={{display: 'flex', gap: '5px'}}>
                    <button className="btn-icon-edit" onClick={() => openEditModal(item)} title="Edit">
                        <Edit size={18} />
                    </button>
                    {/* UPDATED: Calls handleSoftDelete now */}
                    <button className="btn-icon-delete" onClick={() => handleSoftDelete(item.id)} title="Delete">
                        <Trash2 size={18} />
                    </button>
                </div>
              </div>
              
              <h3 className="card-title">{item.title}</h3>
              <p className="card-content">{item.content}</p>
              
              <div className="card-footer">
                <div className="footer-item">
                  <User size={14} /> {item.author_name}
                </div>
                <div className="footer-item">
                  <Target size={14} /> Year {item.target_year} - Sec {item.target_section}
                </div>
                <div className="footer-item">
                  <Calendar size={14} /> {new Date(item.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- TRASH BIN MODAL --- */}
      {showTrashModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '700px'}}>
                <div className="modal-header">
                    <h2 className="modal-title" style={{color: '#dc2626'}}>Trash Bin (Deleted Announcements)</h2>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {trashLoading ? <p style={{textAlign:'center'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center'}}>Trash bin is empty.</p> : (
                        <table className="data-table">
                            <thead><tr><th>Title</th><th>Author</th><th style={{textAlign: 'right'}}>Actions</th></tr></thead>
                            <tbody>
                                {trashList.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{fontWeight:'bold', color: '#666'}}>{item.title}</td>
                                        <td>{item.author_name}</td>
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

      {/* CREATE/EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{isEditing ? "Edit Announcement" : "New Announcement"}</h2>
            </div>
            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input 
                  className="form-input" 
                  placeholder="e.g. Midterm Schedule Update" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message Content</label>
                <textarea 
                  className="form-textarea" 
                  placeholder="Type your announcement here..." 
                  rows="5"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Target Year</label>
                  <select className="form-input" value={formData.targetYear} onChange={e => setFormData({...formData, targetYear: e.target.value})}>
                    <option value="ALL">All Years</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Target Section</label>
                  <select className="form-input" value={formData.targetSection} onChange={e => setFormData({...formData, targetSection: e.target.value})}>
                    <option value="ALL">All Sections</option>
                    <option value="1">Section 1</option>
                    <option value="2">Section 2</option>
                    <option value="3">Section 3</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-save">
                    {isEditing ? "Save Changes" : "Post Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}