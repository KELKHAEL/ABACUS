import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, CheckCircle, Settings, Layers, Calendar, X, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';

export default function ManageAcademicSetup() {
  const [data, setData] = useState({ programs: [], sections: [], yearLevels: [], terms: [] });
  const [loading, setLoading] = useState(true);

  // --- 🔒 ENTRAPMENT DYNAMIC VALUES ---
  const currentYear = new Date().getFullYear();
  const schoolYearOptions = Array.from({length: 6}, (_, i) => `${currentYear + i - 1}-${currentYear + i}`);

  const [newProgram, setNewProgram] = useState("");
  const [newProgramYears, setNewProgramYears] = useState(4);
  const [newSchoolYear, setNewSchoolYear] = useState(schoolYearOptions[1]); 
  const [newSemester, setNewSemester] = useState("First Semester");

  // --- 🔗 PROGRAM DASHBOARD STATES ---
  const [secProgram, setSecProgram] = useState(""); 
  const [secYear, setSecYear] = useState(""); 
  const [secBlock, setSecBlock] = useState("");

  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [pendingTermId, setPendingTermId] = useState(null);
  const [transitionSettings, setTransitionSettings] = useState({ resetInstructors: true, resetStudents: false });

  // Add state to track which programs are expanded
  const [expandedPrograms, setExpandedPrograms] = useState({});

  const toggleProgram = (programName) => {
      setExpandedPrograms(prev => ({ ...prev, [programName]: !prev[programName] }));
  };

  // Wrapped in useCallback to prevent ESLint useEffect dependency warnings
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://abacus-w435.onrender.com/academic-setup');
      const result = await res.json();
      if (!result.error) setData(result);
    } catch (err) { 
        console.error(err); 
    } finally { 
        setLoading(false); 
    }
  }, []);

  useEffect(() => { 
      fetchData(); 
  }, [fetchData]);

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
      if (!secProgram || !secYear || !secBlock.trim()) {
          return alert("Please select a Program, Year Level and enter a Block (e.g., A).");
      }
      const mergedSectionName = `${secProgram} ${secYear}-${secBlock.trim().toUpperCase()}`;
      
      if (data.sections.some(s => s.section_name === mergedSectionName)) {
          return alert("This specific section already exists!");
      }

      try {
        await fetch(`https://abacus-w435.onrender.com/academic-setup/section`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: mergedSectionName })
        });
        setSecBlock(""); 
        
        // Auto-expand the program we just added a section to
        setExpandedPrograms(prev => ({ ...prev, [secProgram]: true }));
        fetchData();
      } catch (e) { alert("Error adding section."); }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to permanently delete this ${type}?`)) return;
    try {
      await fetch(`https://abacus-w435.onrender.com/academic-setup/${type}/${id}`, { method: 'DELETE' });
      if (type === 'program' && secProgram === data.programs.find(p => p.id === id)?.name) setSecProgram("");
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
        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <h2 style={{ fontSize: '28px', color: '#104a28', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 8px 0' }}>
                    <Settings size={28}/> Class & Academic Setup
                </h2>
                <p style={{ color: '#6b7280', margin: 0 }}>Manage university programs, class sections, and handle Semester Rollovers.</p>
            </div>
        </div>

        {/* 🎨 NEW FULL-WIDTH LAYOUT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* TOP ROW: TERMS & ADD PROGRAM */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) minmax(400px, 2fr)', gap: '24px' }}>
                
                {/* 🔒 ACADEMIC TERMS CARD */}
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
                        <button onClick={() => handleAdd('term', { value: newSchoolYear, semester: newSemester })} style={{...btnStyle, width: '100%', justifyContent: 'center', padding: '12px', marginTop: '4px', fontSize: '15px', boxShadow: '0 2px 4px rgba(16, 74, 40, 0.2)', transition: 'opacity 0.2s'}} onMouseOver={e => e.currentTarget.style.opacity = '0.9'} onMouseOut={e => e.currentTarget.style.opacity = '1'}>
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

                {/* ➕ ADD PROGRAM & SECTION CARD */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111' }}>
                        <Layers size={18} color="#eab308"/> Add Program or Class Section
                    </h3>
                    
                    {/* Add Program */}
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Register New University Program</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input placeholder="e.g. Bachelor of Science in Nursing" value={newProgram} onChange={e => setNewProgram(e.target.value.replace(/[^A-Za-z\s-]/g, '').toUpperCase())} style={{...inputStyle, flex: 2}} />

                            {/* NEW: Input for max years */}
                            <input type="number" min="1" max="10" placeholder="Years" value={newProgramYears} onChange={e => setNewProgramYears(e.target.value)} style={{...inputStyle, width: '90px'}} title="Total Year Levels" />

                            <button onClick={() => { handleAdd('program', { value: newProgram, maxYears: parseInt(newProgramYears, 10) || 4 }); setNewProgramYears(4); }} style={{...btnStyle, padding: '0 20px'}}>
                                <Plus size={16}/> Save Program
                            </button>
                        </div>
                    </div>

                    {/* Add Class Section */}
                    <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '8px', border: '1px dashed #86efac', marginTop: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#166534', marginBottom: '8px' }}>Generate New Class Section</label>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <select value={secProgram} onChange={e => setSecProgram(e.target.value)} style={{...inputStyle, flex: 2, minWidth: '200px'}}>
                                <option value="">Select Program...</option>
                                {data.programs?.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                            </select>
                            
                            {/* DYNAMIC YEAR DROPDOWN */}
                            <select value={secYear} onChange={e => setSecYear(e.target.value)} style={{...inputStyle, flex: 1, minWidth: '100px'}} disabled={!secProgram}>
                                <option value="">Select Year</option>
                                {secProgram && data.programs?.find(p => p.name === secProgram) && 
                                    Array.from(
                                        { length: data.programs.find(p => p.name === secProgram).max_years }, 
                                        (_, i) => i + 1
                                    ).map(y => (
                                        <option key={y} value={y}>Year {y}</option>
                                    ))
                                }
                            </select>
                            
                            <input placeholder="Block (e.g. A, 1)" value={secBlock} onChange={e => setSecBlock(e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase())} style={{...inputStyle, width: '100px'}} maxLength={3}/>
                            <button onClick={handleAddSection} style={{...btnStyle, background: '#16a34a'}}><Plus size={16}/> Create Class</button>
                        </div>
                        {secProgram && secYear && secBlock && (
                            <div style={{ marginTop: '12px', fontSize: '13px', color: '#166534' }}>
                                Preview: <strong>{secProgram} {secYear}-{secBlock}</strong>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* FULL WIDTH: UNIVERSITY PROGRAMS DASHBOARD */}
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h3 style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: '15px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '8px', color: '#111', fontSize: '22px' }}>
                    <Layers size={24} color="#eab308"/> University Programs Overview
                </h3>

                {data.programs?.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No programs registered yet.</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {data.programs?.map(p => {
                            // Find all sections that belong to this specific program
                            const programSections = data.sections?.filter(s => s.section_name.startsWith(`${p.name} `));
                            
                            // Group those sections by year level to build the hierarchy
                            const sectionsByYear = {};
                            programSections.forEach(s => {
                                // Extract the "Year-Block" string by removing the program name from the start
                                const yearBlockStr = s.section_name.substring(p.name.length).trim();
                                
                                if (yearBlockStr) {
                                    // Split at the first hyphen to cleanly separate the Year and Block
                                    const hyphenIndex = yearBlockStr.indexOf('-');
                                    
                                    let y = "?";
                                    let block = "?";

                                    if (hyphenIndex !== -1) {
                                        y = yearBlockStr.substring(0, hyphenIndex);
                                        block = yearBlockStr.substring(hyphenIndex + 1);
                                    } else {
                                        y = yearBlockStr; // Fallback if no hyphen is found
                                    }

                                    if(!sectionsByYear[y]) sectionsByYear[y] = [];
                                    sectionsByYear[y].push({ id: s.id, block: block });
                                }
                            });

                            const isExpanded = expandedPrograms[p.name];

                            return (
                                <div key={p.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white', overflow: 'hidden' }}>
                                    
                                    {/* Program Header - Clickable to expand/collapse */}
                                    <div 
                                        onClick={() => toggleProgram(p.name)}
                                        style={{ 
                                            background: isExpanded ? '#f1f5f9' : 'white', 
                                            padding: '16px 20px', 
                                            borderBottom: isExpanded ? '1px solid #e2e8f0' : 'none', 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            {isExpanded ? <ChevronDown size={20} color="#64748b"/> : <ChevronRight size={20} color="#64748b"/>}
                                            <h4 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>{p.name}</h4>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); handleDelete('program', p.id); }} 
                                            style={{ background: 'none', color: '#dc2626', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                            title="Delete Program"
                                        >
                                            <Trash2 size={18}/>
                                        </button>
                                    </div>

                                    {/* Expandable Sections Body */}
                                    {isExpanded && (
                                        <div style={{ padding: '0 20px 20px 50px' }}> 
                                            <h5 style={{ margin: '15px 0', color: '#64748b', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                - Year Levels and Class Sections -
                                            </h5>
                                            
                                            {Object.keys(sectionsByYear).length === 0 ? (
                                                <div style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic', paddingLeft: '10px' }}>No classes generated for this program yet.</div>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    {Object.keys(sectionsByYear).sort((a,b) => parseInt(a, 10) - parseInt(b, 10)).map(year => (
                                                        <div key={year} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                                            {/* Sort the blocks alphabetically within the year */}
                                                            {sectionsByYear[year].sort((a,b) => a.block.localeCompare(b.block)).map(sec => (
                                                                <div key={sec.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '8px 15px', background: '#f8fafc', borderLeft: '3px solid #3b82f6', borderRadius: '4px' }}>
                                                                    <span style={{ fontSize: '14px', color: '#334155', minWidth: '80px' }}>Year - {year}</span>
                                                                    <span style={{ fontSize: '14px', color: '#334155', fontWeight: 'bold' }}>Section - {sec.block}</span>
                                                                    <button 
                                                                        onClick={() => handleDelete('section', sec.id)} 
                                                                        style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                                                                        title="Delete Section"
                                                                    >
                                                                        <X size={16}/>
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            {/* Spacer between different year levels */}
                                                            <div style={{ height: '5px' }}></div> 
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
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
const listStyle = { listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto', overflowX: 'hidden' };
const listItemStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', marginBottom: '8px', boxSizing: 'border-box' };
const iconBtnStyle = { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' };