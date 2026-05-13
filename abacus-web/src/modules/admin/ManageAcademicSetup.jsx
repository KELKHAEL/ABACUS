import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle, Settings, Layers, Calendar, Hash, X, ChevronRight, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function ManageAcademicSetup() {
  const [data, setData] = useState({ programs: [], sections: [], yearLevels: [], terms: [] });
  const [loading, setLoading] = useState(true);

  // --- 🔒 ENTRAPMENT DYNAMIC VALUES ---
  const currentYear = new Date().getFullYear();
  const schoolYearOptions = Array.from({length: 6}, (_, i) => `${currentYear + i - 1}-${currentYear + i}`);

  const [newProgram, setNewProgram] = useState("");
  const [newSchoolYear, setNewSchoolYear] = useState(schoolYearOptions[1]); 
  const [newSemester, setNewSemester] = useState("First Semester");

  // --- 🔗 PROGRAM DASHBOARD STATES ---
  const [selectedProgram, setSelectedProgram] = useState(null); 
  const [secYear, setSecYear] = useState(""); 
  const [secBlock, setSecBlock] = useState("");

  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [pendingTermId, setPendingTermId] = useState(null);
  const [transitionSettings, setTransitionSettings] = useState({ resetInstructors: true, resetStudents: false });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://abacus-w435.onrender.com/academic-setup');
      const result = await res.json();
      if (!result.error) setData(result);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (type, payload) => {
    if (!payload.value || !payload.value.toString().trim()) return;
    try {
      await fetch(`https://abacus-w435.onrender.com/academic-setup/${type}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      if (type === 'program') setNewProgram("");
      fetchData();
    } catch (e) { alert("Error adding item."); }
  };

  const handleAddSection = async () => {
      if (!secYear || !secBlock.trim()) {
          return alert("Please select a Year Level and enter a Block (e.g., A).");
      }
      const mergedSectionName = `${selectedProgram.name} ${secYear}-${secBlock.trim().toUpperCase()}`;
      
      if (data.sections.some(s => s.section_name === mergedSectionName)) {
          return alert("This specific section already exists!");
      }

      try {
        await fetch(`https://abacus-w435.onrender.com/academic-setup/section`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: mergedSectionName })
        });
        setSecBlock(""); 
        fetchData();
      } catch (e) { alert("Error adding section."); }
  };

  const handleAddNewYearLevel = async () => {
      const newYr = window.prompt("Enter new Year Level (e.g., 5 or 6):");
      if (!newYr || !newYr.trim()) return;
      if (isNaN(newYr)) return alert("Year Level must be a number!");

      try {
        await fetch(`https://abacus-w435.onrender.com/academic-setup/year`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: newYr.trim() })
        });
        fetchData();
      } catch (e) { alert("Error adding year level."); }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to permanently delete this ${type}?`)) return;
    try {
      await fetch(`https://abacus-w435.onrender.com/academic-setup/${type}/${id}`, { method: 'DELETE' });
      if (type === 'program' && selectedProgram && selectedProgram.id === id) setSelectedProgram(null);
      fetchData();
    } catch (e) { alert("Error deleting item"); }
  };

  const initiateTermSwitch = (id) => {
      setPendingTermId(id);
      setShowTransitionModal(true);
  };

  const confirmTermTransition = async () => {
    try {
      const response = await fetch(`https://abacus-w435.onrender.com/academic-setup/term/active/${pendingTermId}`, { 
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(transitionSettings)
      });
      const result = await response.json();
      if (result.success) {
          alert("Academic Term Transition Complete! Previous term data is now archived.");
          setShowTransitionModal(false);
          fetchData();
      } else { alert("Error: " + result.error); }
    } catch (e) { alert("Error updating active term"); }
  };

  if (loading) return <div style={{padding: 40, textAlign: 'center'}}>Loading Configuration...</div>;

  return (
    <div style={{ padding: '30px', background: '#F8F9FD', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '28px', color: '#104a28', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 8px 0' }}>
                <Settings size={28}/> Class & Academic Setup
            </h2>
            <p style={{ color: '#6b7280', margin: 0 }}>Manage university programs, class sections, and handle Semester Rollovers.</p>
        </div>

        {/* 🎨 NEW SPLIT-SCREEN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '24px', alignItems: 'start' }}>
            
            {/* LEFT COLUMN: ACADEMIC TERMS CARD */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111' }}>
                    <Calendar size={18} color="#3b82f6"/> Academic Terms
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <select value={newSchoolYear} onChange={e => setNewSchoolYear(e.target.value)} style={{...inputStyle, flex: 1}}>
                            {schoolYearOptions.map(sy => <option key={sy} value={sy}>{sy}</option>)}
                        </select>
                        <select value={newSemester} onChange={e => setNewSemester(e.target.value)} style={{...inputStyle, flex: 1}}>
                            <option value="First Semester">1st Sem</option>
                            <option value="Second Semester">2nd Sem</option>
                            <option value="Mid-Year Semester">Mid-Year</option>
                        </select>
                    </div>
                    <button onClick={() => handleAdd('term', { value: newSchoolYear, semester: newSemester })} style={{...btnStyle, width: '100%', justifyContent: 'center', padding: '12px', marginTop: '4px', fontSize: '15px', boxShadow: '0 2px 4px rgba(16, 74, 40, 0.2)', transition: 'opacity 0.2s'}}
                        onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                        onMouseOut={e => e.currentTarget.style.opacity = '1'}
                        >
                            <Plus size={18}/> Add Term
                        </button>
                </div>

                <ul style={listStyle}>
                    {data.terms?.map(t => (
                        <li key={t.id} style={{...listItemStyle, borderLeft: t.is_active ? '4px solid #10b981' : '1px solid #e5e7eb', background: t.is_active ? '#ecfdf5' : 'white', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                <div>
                                    <strong style={{ display: 'block', color: '#111', fontSize: '15px' }}>{t.school_year}</strong>
                                    <span style={{ fontSize: '12px', color: '#666' }}>{t.semester}</span>
                                </div>
                                <button onClick={() => handleDelete('term', t.id)} style={iconBtnStyle} title="Delete"><Trash2 size={16} color="#ef4444"/></button>
                            </div>
                            
                            <div style={{ width: '100%' }}>
                                {t.is_active ? (
                                    <div style={{ background: '#d1fae5', color: '#065f46', padding: '6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                        <CheckCircle size={14}/> ACTIVE TERM
                                    </div>
                                ) : (
                                    <button onClick={() => initiateTermSwitch(t.id)} style={{ width: '100%', fontSize: '12px', padding: '6px', background: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Set as Active Term</button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT COLUMN: DYNAMIC PROGRAM DASHBOARD */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                {!selectedProgram ? (
                    // --- VIEW 1: PROGRAM LIST ---
                    <>
                        <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111' }}>
                            <Layers size={18} color="#eab308"/> University Programs
                        </h3>
                        
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <input 
                                placeholder="Add Program (e.g. BSIT, BA-Arch)" 
                                value={newProgram} 
                                onChange={e => setNewProgram(e.target.value.replace(/[^A-Za-z\s-]/g, '').toUpperCase())} 
                                style={{...inputStyle, flex: 1}} 
                            />
                            <button onClick={() => handleAdd('program', { value: newProgram })} style={btnStyle}><Plus size={16}/> Add Program</button>
                        </div>

                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px'}}>
                            {data.programs?.map(p => (
                                <div key={p.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setSelectedProgram(p)} onMouseOver={e => e.currentTarget.style.borderColor = '#3b82f6'} onMouseOut={e => e.currentTarget.style.borderColor = '#e5e7eb'}>
                                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{p.name}</span>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <button style={{ background: '#dbeafe', color: '#0369a1', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                            Manage Classes <ChevronRight size={14}/>
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); handleDelete('program', p.id); }} style={iconBtnStyle} title="Delete Program"><Trash2 size={16} color="#ef4444"/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    // --- VIEW 2: PROGRAM-SPECIFIC DASHBOARD ---
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #f3f4f6', paddingBottom: '15px', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <button onClick={() => setSelectedProgram(null)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#475569' }} title="Back to Programs">
                                    <ArrowLeft size={18} />
                                </button>
                                <h3 style={{ margin: 0, fontSize: '20px', color: '#0f172a' }}>
                                    Manage Classes: <span style={{ color: '#2563eb' }}>{selectedProgram.name}</span>
                                </h3>
                            </div>
                            
                            <button onClick={handleAddNewYearLevel} style={{ background: '#fef3c7', color: '#b45309', border: '1px solid #fde68a', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Hash size={14}/> Add New Year Level to Database
                            </button>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px dashed #cbd5e1', marginBottom: '25px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 'bold', color: '#475569', marginRight: '10px' }}>Generate New Class Section:</span>
                            
                            <select value={secYear} onChange={e => setSecYear(e.target.value)} style={{...inputStyle, width: '120px'}}>
                                <option value="">Select Year</option>
                                {data.yearLevels?.map(y => <option key={y.id} value={y.year_name}>Year {y.year_name}</option>)}
                            </select>
                            
                            <input 
                                placeholder="Block (e.g. A, 1)" 
                                value={secBlock} 
                                onChange={e => setSecBlock(e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase())} 
                                style={{...inputStyle, width: '130px'}} 
                                maxLength={3}
                            />
                            <button onClick={handleAddSection} style={btnStyle}><Plus size={20}/> Create Class</button>
                            
                            {secYear && secBlock && (
                                <span style={{ marginLeft: '10px', fontSize: '13px', color: '#6b7280' }}>
                                    Preview: <strong style={{ color: '#10b981' }}>{selectedProgram.name} {secYear}-{secBlock}</strong>
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                            {data.yearLevels?.map(y => {
                                const yearSections = data.sections?.filter(s => s.section_name.startsWith(`${selectedProgram.name} ${y.year_name}-`));
                                
                                return (
                                    <div key={y.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', overflow: 'hidden' }}>
                                        <div style={{ background: '#f1f5f9', padding: '12px 15px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong style={{ color: '#334155' }}>Year {y.year_name}</strong>
                                            <button onClick={() => handleDelete('year', y.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }} title={`Delete Year ${y.year_name} from Database`}><Trash2 size={14} /></button>
                                        </div>
                                        <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
                                            {yearSections.length === 0 ? (
                                                <span style={{ color: '#9ca3af', fontSize: '13px', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>No sections added yet.</span>
                                            ) : (
                                                yearSections.map(s => (
                                                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', border: '1px solid #f1f5f9' }}>
                                                        <span style={{ fontWeight: 'bold', color: '#0f172a', fontSize: '14px' }}>{s.section_name}</span>
                                                        <button onClick={() => handleDelete('section', s.id)} style={iconBtnStyle} title="Delete Section"><X size={16} color="#ef4444"/></button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>

        {/* --- ACADEMIC TERM ROLLOVER MODAL --- */}
        {showTransitionModal && (
            <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000}}>
                <div style={{background: 'white', padding: 0, borderRadius: '12px', width: '550px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'}}>
                    <div style={{background: '#f59e0b', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h2 style={{margin: 0, fontSize: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px'}}><AlertTriangle size={24}/> Term Rollover Warning</h2>
                        <button onClick={() => setShowTransitionModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#fef3c7'}}><X size={24}/></button>
                    </div>

                    <div style={{padding: '24px'}}>
                        <p style={{fontSize: '14px', color: '#4b5563', lineHeight: '1.6', marginBottom: '20px'}}>
                            Activating a new academic term will automatically archive all active <strong>Quizzes, Modules, and Grades</strong> from the previous semester. They will be moved to the "Archives" tab for Instructors and Students.
                        </p>

                        <div style={{background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                            <h4 style={{margin: '0 0 12px 0', color: '#111', fontSize: '14px'}}>Rollover Options:</h4>
                            
                            <label style={{display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginBottom: '12px'}}>
                                <input type="checkbox" checked={transitionSettings.resetInstructors} onChange={(e) => setTransitionSettings({...transitionSettings, resetInstructors: e.target.checked})} style={{marginTop: '4px', width: '16px', height: '16px', accentColor: '#f59e0b'}} />
                                <div>
                                    <span style={{fontWeight: 'bold', fontSize: '14px', color: '#374151'}}>Clear Instructor Assignments</span>
                                    <p style={{margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280'}}>Removes all assigned classes from instructors so they can be reassigned for the new semester.</p>
                                </div>
                            </label>

                            <label style={{display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer'}}>
                                <input type="checkbox" checked={transitionSettings.resetStudents} onChange={(e) => setTransitionSettings({...transitionSettings, resetStudents: e.target.checked})} style={{marginTop: '4px', width: '16px', height: '16px', accentColor: '#f59e0b'}} />
                                <div>
                                    <span style={{fontWeight: 'bold', fontSize: '14px', color: '#374151'}}>Reset Student Sections (Force Re-enrollment)</span>
                                    <p style={{margin: '2px 0 0 0', fontSize: '12px', color: '#6b7280'}}>Changes all student sections to "To be assigned" and requires them to upload a new COR in the mobile app to be officially enrolled in the new term.</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div style={{padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                        <button onClick={() => setShowTransitionModal(false)} style={{padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', fontWeight: 'bold', color: '#374151', cursor: 'pointer'}}>Cancel</button>
                        <button onClick={confirmTermTransition} style={{padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#d97706', color: 'white', fontWeight: 'bold', cursor: 'pointer'}}>Confirm & Start New Term</button>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}

const inputStyle = { padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', outline: 'none', fontSize: '14px', boxSizing: 'border-box' };
const btnStyle = { background: '#104a28', color: 'white', border: 'none', borderRadius: '6px', padding: '0 15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' };
const listStyle = { listStyle: 'none', padding: 0, margin: 0, maxHeight: '400px', overflowY: 'auto', overflowX: 'hidden' };
const listItemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '8px', boxSizing: 'border-box' };
const iconBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' };