import React, { useState, useEffect } from 'react';
import { Megaphone, Plus, Trash2, Calendar, Target, User, Edit, RotateCcw, Filter, X, AlertTriangle, Clock, CheckSquare } from 'lucide-react';
import './ManageAnnouncements.css';

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // --- DYNAMIC ACADEMIC SETUP STATES ---
  const [academicPrograms, setAcademicPrograms] = useState([]); 
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
  const [editId, setEditId] = useState(null);

  const [audience, setAudience] = useState('STUDENTS'); 
  const [formData, setFormData] = useState({ title: '', content: '' });
  
  // --- CHECKBOX STATES ---
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);

  const currentUser = { name: "Registrar", role: "ADMIN" };

  const groupAnnouncements = (rawList) => {
    const grouped = [];
    const map = {};
    (rawList || []).forEach(ann => {
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
      const res = await fetch('https://abacus-w435.onrender.com/announcements/all');
      const data = await res.json();
      setAnnouncements(groupAnnouncements(data));
    } catch (error) { console.error("Fetch error:", error); }
    setLoading(false);
  };

  const fetchSetupData = async () => {
    try {
      const [setupRes, instRes] = await Promise.all([
        fetch('https://abacus-w435.onrender.com/academic-setup'),
        fetch('https://abacus-w435.onrender.com/users?role=INSTRUCTOR')
      ]);
      const setupData = await setupRes.json();
      const instData = await instRes.json();
      
      if (!setupData.error) {
        setAcademicPrograms(setupData.programs || []);
        setAcademicYears(setupData.yearLevels || []);
        const sortedSections = (setupData.sections || []).sort((a,b) => a.section_name.localeCompare(b.section_name));
        setAcademicSections(sortedSections);
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
        const res = await fetch('https://abacus-w435.onrender.com/trash/announcements');
        const data = await res.json();
        setTrashList(groupAnnouncements(data));
    } catch (error) { console.error("Error fetching trash:", error); }
    setTrashLoading(false);
  };

  const openTrash = () => { setShowTrashModal(true); fetchTrash(); };

  const handleSoftDelete = async (groupedIds) => {
    if (window.confirm("Move this announcement to Trash?")) {
      try {
        await Promise.all(groupedIds.map(id => fetch(`https://abacus-w435.onrender.com/announcements/${id}/soft-delete`, { method: 'PUT' })));
        fetchAnnouncements(); 
      } catch (err) { alert("Delete failed"); }
    }
  };

  const handleRestore = async (groupedIds) => {
    if(!window.confirm("Restore this announcement?")) return;
    try {
        await Promise.all(groupedIds.map(id => fetch(`https://abacus-w435.onrender.com/announcements/${id}/restore`, { method: 'PUT' })));
        fetchTrash(); fetchAnnouncements(); 
    } catch (e) { alert("Failed to restore"); }
  };

  const handlePermanentDelete = async (groupedIds) => {
    if(!window.confirm("WARNING: This will permanently delete the announcement for all targets.")) return;
    try {
        await Promise.all(groupedIds.map(id => fetch(`https://abacus-w435.onrender.com/announcements/${id}/permanent`, { method: 'DELETE' })));
        fetchTrash();
    } catch (e) { alert("Failed to delete permanently"); }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setAudience('STUDENTS');
    setFormData({ title: '', content: '' });
    setSelectedSections([]);
    setSelectedInstructors([]);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setIsEditing(true);
    setEditId(item.grouped_ids); 
    setFormData({ title: item.title, content: item.content });
    
    if (item.target_year === 'INSTRUCTORS') {
      setAudience('INSTRUCTORS');
      setSelectedInstructors(item.target_classes.map(c => c.section));
    } else {
      setAudience('STUDENTS');
      setSelectedSections(item.target_classes.map(c => c.section));
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert("Title and Content are required!");
    if (audience === 'STUDENTS' && selectedSections.length === 0) return alert("Please select at least one student class.");
    if (audience === 'INSTRUCTORS' && selectedInstructors.length === 0) return alert("Please select at least one instructor target.");

    setSaving(true);
    try {
      if (isEditing) {
          // Simplistic edit logic - only update title/content for existing ones since audience modification is disabled
          await Promise.all(editId.map((id, index) => {
              return fetch(`https://abacus-w435.onrender.com/announcements/${id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      title: formData.title,
                      content: formData.content,
                      targetYear: audience === 'STUDENTS' ? 'CLASS' : 'INSTRUCTORS',
                      targetSection: audience === 'STUDENTS' ? selectedSections[0] : selectedInstructors[0] // Edge case logic 
                  })
              });
          }));
          alert("Announcement Updated!");
      } else {
          let finalTargets = [];
          if(audience === 'STUDENTS') {
              if (selectedSections.includes('ALL')) {
                  finalTargets.push({ targetYear: 'ALL', targetSection: 'ALL' });
              } else {
                  selectedSections.forEach(sec => finalTargets.push({ targetYear: 'CLASS', targetSection: sec }));
              }
          } else {
              if (selectedInstructors.includes('ALL')) {
                  finalTargets.push({ targetYear: 'INSTRUCTORS', targetSection: 'ALL' });
              } else {
                  selectedInstructors.forEach(inst => finalTargets.push({ targetYear: 'INSTRUCTORS', targetSection: inst }));
              }
          }

          const payload = {
            title: formData.title,
            content: formData.content,
            authorRole: currentUser.role,
            authorName: currentUser.name,
            targets: finalTargets
          };
          
          const res = await fetch('https://abacus-w435.onrender.com/announcements', {
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

  // --- CHECKBOX HANDLERS ---
  const toggleSection = (sectionName) => {
      if (sectionName === 'ALL') {
          if (selectedSections.includes('ALL')) setSelectedSections([]);
          else setSelectedSections(['ALL', ...academicSections.map(s => s.section_name)]);
          return;
      }
      
      let newSelection = [...selectedSections];
      if (newSelection.includes(sectionName)) {
          newSelection = newSelection.filter(s => s !== sectionName && s !== 'ALL');
      } else {
          newSelection.push(sectionName);
          if (newSelection.length === academicSections.length) newSelection.push('ALL');
      }
      setSelectedSections(newSelection);
  };

  const toggleProgram = (programName) => {
      const programSections = academicSections.filter(s => s.section_name.startsWith(programName)).map(s => s.section_name);
      const allSelected = programSections.every(s => selectedSections.includes(s));

      let newSelection = [...selectedSections].filter(s => s !== 'ALL');
      if (allSelected) {
          newSelection = newSelection.filter(s => !programSections.includes(s));
      } else {
          programSections.forEach(s => { if(!newSelection.includes(s)) newSelection.push(s); });
          if (newSelection.length === academicSections.length) newSelection.push('ALL');
      }
      setSelectedSections(newSelection);
  }

  const toggleYearGroup = (programName, yearName) => {
      const prefix = `${programName} ${yearName}-`;
      const yearSections = academicSections.filter(s => s.section_name.startsWith(prefix)).map(s => s.section_name);
      const allSelected = yearSections.every(s => selectedSections.includes(s));

      let newSelection = [...selectedSections].filter(s => s !== 'ALL');
      if (allSelected) {
          newSelection = newSelection.filter(s => !yearSections.includes(s));
      } else {
          yearSections.forEach(s => { if(!newSelection.includes(s)) newSelection.push(s); });
          if (newSelection.length === academicSections.length) newSelection.push('ALL');
      }
      setSelectedSections(newSelection);
  }

  const toggleInstructor = (instructorId) => {
      if (instructorId === 'ALL') {
          if (selectedInstructors.includes('ALL')) setSelectedInstructors([]);
          else setSelectedInstructors(['ALL', ...instructorList.map(i => i.id.toString())]);
          return;
      }

      let newSelection = [...selectedInstructors];
      const strId = instructorId.toString();
      if (newSelection.includes(strId)) {
          newSelection = newSelection.filter(i => i !== strId && i !== 'ALL');
      } else {
          newSelection.push(strId);
          if (newSelection.length === instructorList.length) newSelection.push('ALL');
      }
      setSelectedInstructors(newSelection);
  };

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
    
    if (item.target_classes && item.target_classes.length > 1) {
        return `${item.target_classes.length} Classes Selected`;
    }
    
    if(item.target_section === 'ALL') return "All Students";
    return item.target_section;
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
                    <button className="btn-icon-delete" onClick={() => handleSoftDelete(item.grouped_ids)} title="Delete"><Trash2 size={18} /></button>
                </div>
              </div>
              
              <h3 className="card-title">{item.title}</h3>
              <p className="card-content">{item.content}</p>
              
              <div className="card-footer">
                <div className="footer-item"><User size={14} /> {item.author_name}</div>
                <div className="footer-item">
                  <Target size={14} /> 
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
                                            <span style={{fontSize:'11px', background:'#f3f4f6', color: '#6b7280', padding:'4px 8px', borderRadius:'4px'}}>
                                                {getTargetDisplay(item)}
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
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '750px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh'}}>
                
                <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><Megaphone size={22}/> {isEditing ? "Edit Announcement" : "Post Announcement"}</h2>
                    {!saving && <button onClick={() => setShowModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}><X size={24}/></button>}
                </div>
                
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
                            <div style={{display: 'flex', gap: '15px', marginBottom: '15px'}}>
                                <label style={{display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
                                    <input type="radio" name="audience" value="STUDENTS" checked={audience === 'STUDENTS'} onChange={() => setAudience('STUDENTS')} disabled={isEditing} />
                                    <span style={{fontWeight: '500', color: '#333'}}>Students</span>
                                </label>
                                <label style={{display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer'}}>
                                    <input type="radio" name="audience" value="INSTRUCTORS" checked={audience === 'INSTRUCTORS'} onChange={() => setAudience('INSTRUCTORS')} disabled={isEditing} />
                                    <span style={{fontWeight: '500', color: '#333'}}>Instructors</span>
                                </label>
                            </div>

                            {/* --- CHECKBOX LIST FOR STUDENTS --- */}
                            {audience === 'STUDENTS' && (
                                <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', overflow: 'hidden'}}>
                                    <div style={{padding: '12px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb'}}>
                                        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: isEditing ? 'not-allowed' : 'pointer'}}>
                                            <input type="checkbox" checked={selectedSections.includes('ALL')} onChange={() => toggleSection('ALL')} disabled={isEditing} style={{width: '16px', height: '16px'}}/>
                                            <span style={{fontWeight: 'bold', color: '#111827'}}>Select All Students</span>
                                        </label>
                                    </div>
                                    <div style={{maxHeight: '280px', overflowY: 'auto', padding: '10px'}}>
                                        {academicPrograms.map(prog => {
                                            const programSections = academicSections.filter(s => s.section_name.startsWith(prog.name));
                                            if (programSections.length === 0) return null;
                                            
                                            // Group sections by year within the program
                                            const groupedByYear = {};
                                            programSections.forEach(sec => {
                                                const parts = sec.section_name.split(' ');
                                                if (parts.length > 1) {
                                                    const ys = parts.pop(); // e.g. "1-A"
                                                    const year = ys.split('-')[0]; // "1"
                                                    if (!groupedByYear[year]) groupedByYear[year] = [];
                                                    groupedByYear[year].push(sec);
                                                }
                                            });

                                            return (
                                                <div key={prog.id} style={{marginBottom: '20px', border: '1px solid #f3f4f6', borderRadius: '8px', overflow: 'hidden'}}>
                                                    <div style={{background: '#f9fafb', padding: '8px 12px', borderBottom: '1px solid #f3f4f6'}}>
                                                        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: isEditing ? 'not-allowed' : 'pointer'}}>
                                                            <input type="checkbox" checked={programSections.every(s => selectedSections.includes(s.section_name))} onChange={() => toggleProgram(prog.name)} disabled={isEditing} style={{width: '14px', height: '14px'}}/>
                                                            <span style={{fontWeight: 'bold', color: '#1f2937', fontSize: '13px'}}>{prog.name}</span>
                                                        </label>
                                                    </div>
                                                    
                                                    <div style={{padding: '10px 12px'}}>
                                                        {Object.keys(groupedByYear).sort().map(year => (
                                                            <div key={year} style={{marginBottom: '10px'}}>
                                                                <label style={{display: 'flex', alignItems: 'center', gap: '6px', cursor: isEditing ? 'not-allowed' : 'pointer', marginBottom: '6px'}}>
                                                                    <input type="checkbox" checked={groupedByYear[year].every(s => selectedSections.includes(s.section_name))} onChange={() => toggleYearGroup(prog.name, year)} disabled={isEditing} style={{width: '13px', height: '13px'}}/>
                                                                    <span style={{fontWeight: '600', color: '#4b5563', fontSize: '12px'}}>Year {year}</span>
                                                                </label>
                                                                
                                                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', paddingLeft: '20px'}}>
                                                                    {groupedByYear[year].map(sec => (
                                                                        <label key={sec.id} style={{display: 'flex', alignItems: 'center', gap: '4px', background: selectedSections.includes(sec.section_name) ? '#e6f4ea' : '#f3f4f6', padding: '4px 10px', borderRadius: '15px', cursor: isEditing ? 'not-allowed' : 'pointer', border: selectedSections.includes(sec.section_name) ? '1px solid #104a28' : '1px solid transparent'}}>
                                                                            <input type="checkbox" checked={selectedSections.includes(sec.section_name)} onChange={() => toggleSection(sec.section_name)} disabled={isEditing} style={{width: '12px', height: '12px'}}/>
                                                                            <span style={{fontSize: '11px', color: selectedSections.includes(sec.section_name) ? '#104a28' : '#4b5563', fontWeight: '600'}}>{sec.section_name.split(' ').pop()}</span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* --- CHECKBOX LIST FOR INSTRUCTORS --- */}
                            {audience === 'INSTRUCTORS' && (
                                <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', overflow: 'hidden'}}>
                                    <div style={{padding: '12px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb'}}>
                                        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: isEditing ? 'not-allowed' : 'pointer'}}>
                                            <input type="checkbox" checked={selectedInstructors.includes('ALL')} onChange={() => toggleInstructor('ALL')} disabled={isEditing} style={{width: '16px', height: '16px'}}/>
                                            <span style={{fontWeight: 'bold', color: '#111827'}}>Select All Instructors</span>
                                        </label>
                                    </div>
                                    <div style={{maxHeight: '200px', overflowY: 'auto', padding: '10px'}}>
                                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                                            {instructorList.map(inst => (
                                                <label key={inst.id} style={{display: 'flex', alignItems: 'center', gap: '6px', background: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', cursor: isEditing ? 'not-allowed' : 'pointer', border: selectedInstructors.includes(inst.id.toString()) ? '1px solid #104a28' : '1px solid transparent'}}>
                                                    <input type="checkbox" checked={selectedInstructors.includes(inst.id.toString())} onChange={() => toggleInstructor(inst.id)} disabled={isEditing} style={{width: '14px', height: '14px'}}/>
                                                    <span style={{fontSize: '12px', color: selectedInstructors.includes(inst.id.toString()) ? '#104a28' : '#4b5563', fontWeight: '500'}}>{inst.full_name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
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