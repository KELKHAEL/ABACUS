import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle, Settings, Layers, Calendar, Hash, Users, Edit } from 'lucide-react';

export default function ManageAcademicSetup() {
  const [data, setData] = useState({ programs: [], sections: [], yearLevels: [], terms: [] });
  const [loading, setLoading] = useState(true);

  // Input states
  const [newProgram, setNewProgram] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newSection, setNewSection] = useState("");
  const [newSchoolYear, setNewSchoolYear] = useState("");
  const [newSemester, setNewSemester] = useState("First Semester");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/academic-setup');
      const result = await res.json();
      
      if (result.error) {
          console.error("Backend Error:", result.error);
          alert("Database Error: " + result.error + "\n\nPlease ensure you ran the SQL commands in phpMyAdmin.");
          return; 
      }
      
      setData(result);
    } catch (err) {
      console.error(err);
      alert("Network Error: Could not connect to backend. Is node server.js running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (type, payload) => {
    if (!payload.value.trim()) return;
    try {
      const response = await fetch(`http://localhost:5000/academic-setup/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      
      if (result.error) {
          alert("Error adding item: " + result.error);
          return;
      }
      
      setNewProgram(""); setNewYear(""); setNewSection(""); setNewSchoolYear("");
      fetchData();
    } catch (e) { alert("Error adding item. Is the server running?"); }
  };

  // ✅ New Edit Functionality
  const handleEdit = async (type, id, currentValue) => {
    const newValue = window.prompt(`Edit the ${type} name:`, currentValue);
    
    // If user clicks cancel or enters an empty string, do nothing
    if (newValue === null || newValue.trim() === "" || newValue === currentValue) return;

    try {
      const response = await fetch(`http://localhost:5000/academic-setup/${type}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: newValue })
      });
      const result = await response.json();

      if (result.error) {
        alert("Error updating item: " + result.error);
      } else {
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} successfully updated!`);
        fetchData();
      }
    } catch (e) {
      alert("Error updating item. Check your connection.");
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to permanently delete this ${type}?`)) return;
    try {
      await fetch(`http://localhost:5000/academic-setup/${type}/${id}`, { method: 'DELETE' });
      alert("Item successfully deleted!");
      fetchData();
    } catch (e) { alert("Error deleting item"); }
  };

  const handleSetActiveTerm = async (id) => {
    if (!window.confirm("WARNING: Changing the active academic term will affect student archiving and active classes. Proceed?")) return;
    try {
      await fetch(`http://localhost:5000/academic-setup/term/active/${id}`, { method: 'PUT' });
      alert("Active term updated successfully!");
      fetchData();
    } catch (e) { alert("Error updating active term"); }
  };

  if (loading) return <div style={{padding: 40, textAlign: 'center'}}>Loading Configuration...</div>;

  return (
    <div style={{ padding: '30px', background: '#F8F9FD', minHeight: '100vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', color: '#104a28', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Settings size={28}/> Class & Academic Setup
        </h2>
        <p style={{ color: '#6b7280' }}>Manage university programs, sections, and the current active academic semester.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* ACADEMIC TERMS CARD */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="#3b82f6"/> Academic Terms
            </h3>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input placeholder="e.g. 2026-2027" value={newSchoolYear} onChange={e => setNewSchoolYear(e.target.value)} style={{...inputStyle, flex: 1, minWidth: '120px'}} />
                <select value={newSemester} onChange={e => setNewSemester(e.target.value)} style={{...inputStyle, flex: 1, minWidth: '150px'}}>
                    <option value="First Semester">First Semester</option>
                    <option value="Second Semester">Second Semester</option>
                    <option value="Mid-Year Semester">Mid-Year Semester</option>
                </select>
                <button onClick={() => handleAdd('term', { value: newSchoolYear, semester: newSemester })} style={btnStyle}><Plus size={16}/></button>
            </div>

            <ul style={listStyle}>
                {data.terms?.map(t => (
                    <li key={t.id} style={{...listItemStyle, borderLeft: t.is_active ? '4px solid #10b981' : '1px solid #e5e7eb', background: t.is_active ? '#ecfdf5' : 'white'}}>
                        <div style={{ flex: 1 }}>
                            <strong style={{ display: 'block', color: '#111' }}>{t.school_year}</strong>
                            <span style={{ fontSize: '12px', color: '#666' }}>{t.semester}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {t.is_active ? (
                                <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={14}/> ACTIVE</span>
                            ) : (
                                <button onClick={() => handleSetActiveTerm(t.id)} style={{ fontSize: '12px', padding: '6px 10px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Set Active</button>
                            )}
                            <button onClick={() => handleDelete('term', t.id)} style={iconBtnStyle} title="Delete"><Trash2 size={16} color="#ef4444"/></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

        {/* PROGRAMS CARD */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} color="#eab308"/> University Programs
            </h3>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input placeholder="Program Name (e.g. BS in Architecture)" value={newProgram} onChange={e => setNewProgram(e.target.value)} style={{...inputStyle, flex: 1}} />
                <button onClick={() => handleAdd('program', { value: newProgram })} style={btnStyle}><Plus size={16}/></button>
            </div>

            <ul style={listStyle}>
                {data.programs?.map(p => (
                    <li key={p.id} style={listItemStyle}>
                        <span style={{ fontSize: '14px', fontWeight: '500', flex: 1 }}>{p.name}</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleEdit('program', p.id, p.name)} style={iconBtnStyle} title="Edit"><Edit size={16} color="#3b82f6"/></button>
                            <button onClick={() => handleDelete('program', p.id)} style={iconBtnStyle} title="Delete"><Trash2 size={16} color="#ef4444"/></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

        {/* YEAR LEVELS CARD */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Hash size={18} color="#8b5cf6"/> Year Levels
            </h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input placeholder="e.g. 5" type="number" value={newYear} onChange={e => setNewYear(e.target.value)} style={{...inputStyle, flex: 1}} />
                <button onClick={() => handleAdd('year', { value: newYear })} style={btnStyle}><Plus size={16}/></button>
            </div>
            {/* Auto-fit grid prevents breaking on zoom */}
            <ul style={{...listStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px'}}>
                {data.yearLevels?.map(y => (
                    <li key={y.id} style={listItemStyle}>
                        <strong style={{ flex: 1 }}>Year {y.year_name}</strong>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => handleEdit('year', y.id, y.year_name)} style={iconBtnStyle} title="Edit"><Edit size={16} color="#3b82f6"/></button>
                            <button onClick={() => handleDelete('year', y.id)} style={iconBtnStyle} title="Delete"><Trash2 size={16} color="#ef4444"/></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

        {/* SECTIONS CARD */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
            <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#10b981"/> Class Sections
            </h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input placeholder="e.g. A, B, or 5, 6" value={newSection} onChange={e => setNewSection(e.target.value)} style={{...inputStyle, flex: 1}} />
                <button onClick={() => handleAdd('section', { value: newSection })} style={btnStyle}><Plus size={16}/></button>
            </div>
            {/* Auto-fit grid makes it responsive based on container size */}
            <ul style={{...listStyle, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '10px'}}>
                {data.sections?.map(s => (
                    <li key={s.id} style={listItemStyle}>
                        <strong style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.section_name}</strong>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => handleEdit('section', s.id, s.section_name)} style={iconBtnStyle} title="Edit"><Edit size={14} color="#3b82f6"/></button>
                            <button onClick={() => handleDelete('section', s.id)} style={iconBtnStyle} title="Delete"><Trash2 size={14} color="#ef4444"/></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>

      </div>
    </div>
  );
}

// Inline styles updated to avoid absolute positioning
const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '14px', boxSizing: 'border-box' };
const btnStyle = { background: '#104a28', color: 'white', border: 'none', borderRadius: '6px', padding: '0 15px', cursor: 'pointer', display: 'flex', alignItems: 'center' };
const listStyle = { listStyle: 'none', padding: 0, margin: 0, maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' };
// listItemStyle uses flexbox properly now
const listItemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '8px', minHeight: '44px', boxSizing: 'border-box' };
const iconBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' };