import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Trash2, Calendar, Target, User, Edit, RotateCcw, Filter, X, AlertTriangle, Clock } from 'lucide-react';
import './ManageAnnouncements.css';

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // --- DYNAMIC ACADEMIC SETUP STATES ---
  const [academicYears, setAcademicYears] = useState([]);
  const [academicSections, setAcademicSections] = useState([]);
  const [instructorList, setInstructorList] = useState([]);
  
  // --- FILTER STATES ---
  const [filterYear, setFilterYear] = useState('ALL');
  const [filterMonth, setFilterMonth] = useState('ALL');
  const [filterDay, setFilterDay] = useState('ALL');
  
  const [trashList, setTrashList] = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [trashLoading, setTrashLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // ✅ Now stores an array of IDs for the batch

  const [audience, setAudience] = useState('STUDENTS'); 
  const [formData, setFormData] = useState({ title: '', content: '' });
  
  // Arrays for multi-target blasting
  const [studentTargets, setStudentTargets] = useState([{ year: 'ALL', section: 'ALL' }]);
  const [instructorTargets, setInstructorTargets] = useState(['ALL']);

  const currentUser = { name: "Registrar", role: "ADMIN" };

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

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/announcements/all');
      const data = await res.json();
      // ✅ Apply Grouping so it doesn't flood the UI
      setAnnouncements(groupAnnouncements(data));
    } catch (error) { console.error("Fetch error:", error); }
    setLoading(false);
  };

  const fetchSetupData = async () => {
    try {
      const [setupRes, instRes] = await Promise.all([
        fetch('http://localhost:5000/academic-setup'),
        fetch('http://localhost:5000/users?role=INSTRUCTOR')
      ]);
      const setupData = await setupRes.json();
      const instData = await instRes.json();
      
      if (!setupData.error) {
        setAcademicYears(setupData.yearLevels || []);
        setAcademicSections(setupData.sections || []);
      }
      if (!instData.error) {
        setInstructorList(instData || []);
      }
    } catch (error) { console.error("Setup fetch error:", error); }
  };

  useEffect(() => { 
    fetchAnnouncements(); 
    fetchSetupData();
  }, []);

  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const res = await fetch('http://localhost:5000/trash/announcements');
        const data = await res.json();
        // ✅ Apply Grouping to Trash Bin
        setTrashList(groupAnnouncements(data));
    } catch (error) { console.error("Error fetching trash:", error); }
    setTrashLoading(false);
  };

  const openTrash = () => { setShowTrashModal(true); fetchTrash(); };

  // ✅ Batch Deletions and Restorations
  const handleSoftDelete = async (groupedIds) => {
    if (window.confirm("Move this announcement to Trash?")) {
      try {
        await Promise.all(groupedIds.map(id => fetch(`http://localhost:5000/announcements/${id}/soft-delete`, { method: 'PUT' })));
        fetchAnnouncements(); 
      } catch (err) { alert("Delete failed"); }
    }
  };

  const handleRestore = async (groupedIds) => {
    if(!window.confirm("Restore this announcement?")) return;
    try {
        await Promise.all(groupedIds.map(id => fetch(`http://localhost:5000/announcements/${id}/restore`, { method: 'PUT' })));
        fetchTrash(); fetchAnnouncements(); 
    } catch (e) { alert("Failed to restore"); }
  };

  const handlePermanentDelete = async (groupedIds) => {
    if(!window.confirm("WARNING: This will permanently delete the announcement for all targets.")) return;
    try {
        await Promise.all(groupedIds.map(id => fetch(`http://localhost:5000/announcements/${id}/permanent`, { method: 'DELETE' })));
        fetchTrash();
    } catch (e) { alert("Failed to delete permanently"); }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setAudience('STUDENTS');
    setFormData({ title: '', content: '' });
    setStudentTargets([{ year: 'ALL', section: 'ALL' }]);
    setInstructorTargets(['ALL']);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setEditId(item.grouped_ids); // Pass array of batch IDs
    setFormData({ title: item.title, content: item.content });
    
    if (item.target_year === 'INSTRUCTORS') {
      setAudience('INSTRUCTORS');
      setInstructorTargets(item.target_classes.map(c => c.section));
    } else {
      setAudience('STUDENTS');
      setStudentTargets(item.target_classes);
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert("Title and Content are required!");
    if (audience === 'STUDENTS' && studentTargets.length === 0) return alert("Please select at least one student class.");
    if (audience === 'INSTRUCTORS' && instructorTargets.length === 0) return alert("Please select at least one instructor target.");

    setSaving(true);
    try {
      if (isEditing) {
          // ✅ Edit ALL announcements in this batch grouping at once
          await Promise.all(editId.map((id, index) => {
              const target = audience === 'STUDENTS' ? studentTargets[index] : { section: instructorTargets[index] };
              return fetch(`http://localhost:5000/announcements/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      title: formData.title,
                      content: formData.content,
                      targetYear: audience === 'STUDENTS' ? target.year : 'INSTRUCTORS',
                      targetSection: target.section
                  })
              });
          }));
          alert("Announcement Updated!");
      } else {
          // ✅ Post new announcement (Backend handles array)
          const payload = {
            title: formData.title,
            content: formData.content,
            authorRole: currentUser.role,
            authorName: currentUser.name,
            targets: audience === 'STUDENTS' 
                ? studentTargets.map(t => ({ targetYear: t.year, targetSection: t.section }))
                : instructorTargets.map(id => ({ targetYear: 'INSTRUCTORS', targetSection: id }))
          };
          
          const res = await fetch('http://localhost:5000/announcements', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (!data.success) throw new Error(data.error);
          alert("Announcements Posted!");
      }
      setShowModal(false);
      fetchAnnouncements();
    } catch (err) { alert("Server Error"); }
    finally { setSaving(false); }
  };

  // Target Builders
  const updateStudentTarget = (index, field, value) => {
      const newTargets = [...studentTargets];
      newTargets[index][field] = value;
      setStudentTargets(newTargets);
  };
  const removeStudentTarget = (index) => setStudentTargets(studentTargets.filter((_, i) => i !== index));

  const updateInstructorTarget = (index, value) => {
      const newTargets = [...instructorTargets];
      newTargets[index] = value;
      setInstructorTargets(newTargets);
  };
  const removeInstructorTarget = (index) => setInstructorTargets(instructorTargets.filter((_, i) => i !== index));

  const filteredAnnouncements = announcements.filter(item => {
    const d = new Date(item.created_at);
    if (filterYear !== 'ALL' && d.getFullYear().toString() !== filterYear) return false;
    if (filterMonth !== 'ALL' && (d.getMonth() + 1).toString() !== filterMonth) return false;
    if (filterDay !== 'ALL' && d.getDate().toString() !== filterDay) return false;
    return true;
  });

  const getTargetDisplay = (item) => {
    if (item.target_year === 'INSTRUCTORS') {
      if (item.target_classes && item.target_classes.length > 1) {
          return `${item.target_classes.length} Instructors Selected`;
      }
      if (item.target_section === 'ALL') return 'All Instructors';
      const specificInstructor = instructorList.find(i => i.id.toString() === item.target_section?.toString());
      return specificInstructor ? `Instructor: ${specificInstructor.full_name}` : 'Specific Instructor';
    }
    
    // Check if multiple classes were selected
    if (item.target_classes && item.target_classes.length > 1) {
        return `${item.target_classes.length} Classes Selected`;
    }
    return `Year ${item.target_year} - Sec ${item.target_section}`;
  };

  const getDaysLeft = (deletedDateString) => {
      if (!deletedDateString) return 30;
      const diffTime = new Date(new Date(deletedDateString).getTime() + (30 * 24 * 60 * 60 * 1000)) - new Date();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays > 0 ? diffDays : 0; 
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);
  const months = Array.from({length: 12}, (_, i) => i + 1);
  const days = Array.from({length: 31}, (_, i) => i + 1);

  return (
    <div className="page-container">
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

      <div className="announcement-grid">
        {loading ? (
          <p className="loading-text">Loading updates...</p>
        ) : filteredAnnouncements.length === 0 ? (
          <div className="empty-state">
            <Megaphone size={48} color="#ccc" />
            <p>No announcements found for these filters.</p>
          </div>
        ) : (
          filteredAnnouncements.map((item, i) => (
            <div key={item.id || i} className="announce-card">
              <div className="card-header">
                <span className={`role-badge ${item.author_role === 'ADMIN' ? 'badge-admin' : 'badge-instructor'}`}>
                  {item.author_role}
                </span>
                <div style={{display: 'flex', gap: '5px'}}>
                    <button className="btn-icon-edit" onClick={() => openEditModal(item)} title="Edit"><Edit size={18} /></button>
                    {/* ✅ Uses the Grouped IDs to delete the whole batch */}
                    <button className="btn-icon-delete" onClick={() => handleSoftDelete(item.grouped_ids)} title="Delete"><Trash2 size={18} /></button>
                </div>
              </div>
              
              <h3 className="card-title">{item.title}</h3>
              <p className="card-content">{item.content}</p>
              
              <div className="card-footer">
                <div className="footer-item"><User size={14} /> {item.author_name}</div>
                <div className="footer-item">
                  <Target size={14} /> 
                  {/* ✅ Calls the dynamic Grouped Target display */}
                  {getTargetDisplay(item)}
                </div>
                <div className="footer-item"><Calendar size={14} /> {new Date(item.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {showTrashModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '700px'}}>
                <div className="modal-header"><h2 className="modal-title" style={{color: '#dc2626'}}>Trash Bin</h2></div>
                <div style={{padding: '15px 20px', background: '#fef2f2', borderBottom: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <AlertTriangle size={18} color="#dc2626"/>
                    <span style={{fontSize: '13px', color: '#991b1b'}}>Announcements in the trash will be permanently deleted after 30 days.</span>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {trashLoading ? <p style={{textAlign:'center'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center'}}>Trash bin is empty.</p> : (
                        <table className="data-table">
                            <thead><tr><th>Title</th><th>Author</th><th>Target</th><th>Days Left</th><th style={{textAlign: 'right'}}>Actions</th></tr></thead>
                            <tbody>
                                {trashList.map((item, i) => (
                                    <tr key={item.id || i}>
                                        <td style={{fontWeight:'bold', color: '#666'}}>{item.title}</td>
                                        <td>{item.author_name}</td>
                                        <td>
                                            {/* ✅ Grouped Target rendering in Trash Bin */}
                                            <span style={{fontSize:'11px', background:'#f3f4f6', color: '#6b7280', padding:'4px 8px', borderRadius:'4px'}}>
                                                {item.target_classes && item.target_classes.length > 1 ? `${item.target_classes.length} Classes` : `Yr ${item.target_year} - Sec ${item.target_section}`}
                                            </span>
                                        </td>
                                        <td><div style={{display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontWeight: 'bold', fontSize: '13px'}}><Clock size={14} color="#dc2626" />{getDaysLeft(item.deleted_at)}</div></td>
                                        <td style={{textAlign: 'right'}}>
                                            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#10b981', color:'white', border:'none'}} onClick={() => handleRestore(item.grouped_ids)}><RotateCcw size={14}/> Restore</button>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#dc2626', color:'white', border:'none'}} onClick={() => handlePermanentDelete(item.grouped_ids)}><Trash2 size={14}/> Delete</button>
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
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '650px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh'}}>
                
                <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><Megaphone size={22}/> {isEditing ? "Edit Announcement" : "Post Announcement"}</h2>
                    {!saving && <button onClick={() => setShowModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}><X size={24}/></button>}
                </div>
                
                {/* ✅ FIX: Form takes up remaining space, enabling overflow scroll inside */}
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                    <div style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1}}>
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Announcement Title</label>
                            <input required placeholder="e.g., Midterm Schedule Update" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box'}}/>
                        </div>
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Message Content</label>
                            <textarea required value={formData.content} placeholder="Type your full announcement here..." onChange={e => setFormData({...formData, content: e.target.value})} rows="5" style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit'}}/>
                        </div>
                        
                        <div style={{background:'#fafafa', padding:'15px', borderRadius:'8px', border:'1px solid #eee'}}>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '10px'}}><Target size={14} style={{verticalAlign: 'middle', marginRight: '4px'}}/> Target Audience</label>
                            <select value={audience} onChange={e => setAudience(e.target.value)} disabled={isEditing} style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', outline: 'none', background: isEditing ? '#f3f4f6' : 'white', marginBottom: '15px', opacity: isEditing ? 0.7 : 1}}>
                                <option value="STUDENTS">Students</option>
                                <option value="INSTRUCTORS">Instructors</option>
                            </select>

                            {/* DYNAMIC STUDENTS MULTI-TARGET CONFIG */}
                            {audience === 'STUDENTS' && (
                                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px'}}>
                                    {studentTargets.map((t, idx) => (
                                        <div key={idx} style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                                            <select disabled={isEditing} style={{flex: 1, padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', background: isEditing ? '#f3f4f6' : 'white', opacity: isEditing ? 0.7 : 1}} value={t.year} onChange={e => updateStudentTarget(idx, 'year', e.target.value)}>
                                                <option value="ALL">All Years</option>
                                                {academicYears.map(y => <option key={y.id} value={y.year_name}>Year {y.year_name}</option>)}
                                            </select>
                                            <select disabled={isEditing} style={{flex: 1, padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', background: isEditing ? '#f3f4f6' : 'white', opacity: isEditing ? 0.7 : 1}} value={t.section} onChange={e => updateStudentTarget(idx, 'section', e.target.value)}>
                                                <option value="ALL">All Sections</option>
                                                {academicSections.map(s => <option key={s.id} value={s.section_name}>Section {s.section_name}</option>)}
                                            </select>
                                            {studentTargets.length > 1 && !isEditing && (
                                                <button type="button" onClick={() => removeStudentTarget(idx)} style={{background: '#fee2e2', color: '#dc2626', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer'}}>
                                                    <Trash2 size={16}/>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {!isEditing && (
                                        <button type="button" onClick={() => setStudentTargets([...studentTargets, {year: 'ALL', section: 'ALL'}])} style={{alignSelf: 'flex-start', background: 'none', border: 'none', color: '#104a28', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginTop: '5px'}}>
                                            <Plus size={16}/> Add Another Class Target
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* DYNAMIC INSTRUCTORS MULTI-TARGET CONFIG */}
                            {audience === 'INSTRUCTORS' && (
                                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px'}}>
                                    {instructorTargets.map((inst, idx) => (
                                        <div key={idx} style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                                            <select disabled={isEditing} style={{flex: 1, padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', background: isEditing ? '#f3f4f6' : 'white', opacity: isEditing ? 0.7 : 1}} value={inst} onChange={e => updateInstructorTarget(idx, e.target.value)}>
                                                <option value="ALL">ALL INSTRUCTORS</option>
                                                {instructorList.map(instructor => <option key={instructor.id} value={instructor.id}>{instructor.full_name}</option>)}
                                            </select>
                                            {instructorTargets.length > 1 && !isEditing && (
                                                <button type="button" onClick={() => removeInstructorTarget(idx)} style={{background: '#fee2e2', color: '#dc2626', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer'}}>
                                                    <Trash2 size={16}/>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {!isEditing && (
                                        <button type="button" onClick={() => setInstructorTargets([...instructorTargets, 'ALL'])} style={{alignSelf: 'flex-start', background: 'none', border: 'none', color: '#104a28', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', marginTop: '5px'}}>
                                            <Plus size={16}/> Add Another Instructor Target
                                        </button>
                                    )}
                                </div>
                            )}
                            
                            {isEditing && <p style={{fontSize: '11px', color: '#888', marginTop: '12px'}}>* Target audience cannot be modified while editing. To change targets, delete this post and create a new announcement.</p>}
                        </div>

                    </div>
                    <div style={{padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', justifyContent: 'flex-end', flexShrink: 0}}>
                        <button type="button" disabled={saving} onClick={() => setShowModal(false)} style={{padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer'}}>Cancel</button>
                        <button type="submit" disabled={saving} style={{padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#eab308', color: '#422006', fontWeight: 'bold', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>{saving ? 'Saving...' : (isEditing ? 'Save Changes' : 'Post Announcement')}</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}