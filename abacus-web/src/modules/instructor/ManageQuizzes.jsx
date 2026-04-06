import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, PlusCircle, Calendar, Eye, X, HelpCircle,
  RefreshCcw, Target, Clock, History, Edit, BookOpen, Search, Filter, AlertTriangle, FileText
} from 'lucide-react';
import './Instructor.css';

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [viewingQuiz, setViewingQuiz] = useState(null);
  const [viewMode, setViewMode] = useState('active'); 

  const [showTrashModal, setShowTrashModal] = useState(false);
  const [trashList, setTrashList] = useState([]);
  const [trashLoading, setTrashLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('ALL');
  const [filterSection, setFilterSection] = useState('ALL');
  
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return new Date();
    return new Date(dateString);
  };

  const fetchQuizzesAndUser = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);

      if (user.assigned_classes) {
          try {
              const classes = typeof user.assigned_classes === 'string' ? JSON.parse(user.assigned_classes) : user.assigned_classes;
              setAssignedClasses(Array.isArray(classes) ? classes : []);
          } catch(e) {}
      }

      const res = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setQuizzes(data.quizzes || []);
    } catch (error) { console.error("Error fetching quizzes:", error); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchQuizzesAndUser(); }, []);

  const handleEditQuiz = async (quizId, isRetakeMode = false) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/quizzes/${quizId}`);
      const fullQuiz = await res.json();
      
      if (fullQuiz.error) { alert(fullQuiz.error); setLoading(false); return; }
      
      if (isRetakeMode) {
          navigate('/instructor/CreateQuiz', { state: { retakeParentQuiz: fullQuiz } });
      } else {
          navigate('/instructor/CreateQuiz', { state: { quizToEdit: fullQuiz } });
      }
    } catch (error) {
      alert("Failed to load quiz details.");
      setLoading(false);
    }
  };

  const fetchTrash = async () => {
    setTrashLoading(true);
    try {
        const trashed = quizzes.filter(q => q.status === 'deleted');
        setTrashList(trashed);
    } catch (error) { console.error("Error fetching trash:", error); } 
    finally { setTrashLoading(false); }
  };

  const openTrash = () => { setShowTrashModal(true); fetchTrash(); };

  const handleMoveToTrash = async (quizId, e) => {
    if (e) e.stopPropagation();
    if (window.confirm("Move this quiz to the trashbin?")) {
      try {
        const res = await fetch(`http://localhost:5000/quizzes/${quizId}/status`, {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'deleted' })
        });
        if (res.ok) fetchQuizzesAndUser();
      } catch (error) { alert("Failed to move to trash."); }
    }
  };

  const handleRestore = async (quizId) => {
    if(!window.confirm("Restore this quiz? Students will be able to see it again.")) return;
    try {
      const res = await fetch(`http://localhost:5000/quizzes/${quizId}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'active' })
      });
      if (res.ok) { fetchTrash(); fetchQuizzesAndUser(); }
    } catch (error) { alert("Failed to restore quiz."); }
  };

  const handlePermanentDelete = async (quizId) => {
    if (window.confirm("WARNING: This will permanently delete the quiz AND erase all associated student grades from the Gradebook.")) {
      try {
        await fetch(`http://localhost:5000/quizzes/${quizId}`, { method: 'DELETE' });
        setQuizzes(prev => prev.filter(q => q.id !== quizId));
        fetchTrash();
      } catch (error) { alert("Delete failed."); }
    }
  };

  const uniqueYears = [...new Set(assignedClasses.map(c => c.year))].sort();
  const uniqueSections = [...new Set(assignedClasses.map(c => c.section))].sort();

  const filteredQuizzes = quizzes.filter(q => {
      const isTargetMode = viewMode === 'active' ? !q.is_archived : q.is_archived;
      if (!isTargetMode || q.status === 'deleted') return false;

      // ✅ FIX: Safe checks to prevent crash if title is somehow null
      const matchSearch = (q.title || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchYear = filterYear === 'ALL' || q.target_year === 'ALL' || String(q.target_year) === String(filterYear);
      const matchSection = filterSection === 'ALL' || q.target_section === 'ALL' || String(q.target_section) === String(filterSection);
      
      return matchSearch && matchYear && matchSection;
  });

  return (
    <div className="instructor-dashboard-container">
      <div className="inst-dashboard-header">
        <div className="header-left">
            <h2>Manage Quizzes</h2>
            <p>Create, edit, and monitor assessments for your assigned classes.</p>
        </div>
        <div className="header-actions">
            <button className="btn-secondary" style={{backgroundColor: '#ef4444', color:'white', border:'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}} onClick={openTrash}>
              <Trash2 size={18} /> Trash Bin
            </button>
            <button className="btn-create-modern" onClick={() => navigate('/instructor/CreateQuiz')}>
              <PlusCircle size={18} /> Create New Quiz
            </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setViewMode('active')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', background: viewMode === 'active' ? '#104a28' : '#e5e7eb', color: viewMode === 'active' ? 'white' : '#4b5563' }}>
              <FileText size={18}/> Active Quizzes
          </button>
          <button onClick={() => setViewMode('archived')} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', background: viewMode === 'archived' ? '#104a28' : '#e5e7eb', color: viewMode === 'archived' ? 'white' : '#4b5563' }}>
              <History size={18}/> Archived Quizzes
          </button>
      </div>

      <div className="gb-filters-card" style={{marginBottom: '25px', flexDirection: 'row', alignItems: 'center'}}>
        <div className="filter-title" style={{marginRight: '15px'}}>
            <Filter size={18} color="#eab308"/> <span>Filters:</span>
        </div>
        <div className="filters-content" style={{flex: 1}}>
            <div className="search-box" style={{flex: 2}}>
                <Search size={18} color="#666" />
                <input placeholder="Search Quiz Title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <select className="gb-select" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
                <option value="ALL">All Years</option>
                {uniqueYears.map(y => <option key={y} value={y}>Year {y}</option>)}
            </select>
            <select className="gb-select" value={filterSection} onChange={e => setFilterSection(e.target.value)}>
                <option value="ALL">All Sections</option>
                {uniqueSections.map(s => <option key={s} value={s}>Section {s}</option>)}
            </select>
            {(filterYear !== 'ALL' || filterSection !== 'ALL' || searchTerm !== '') && (
                <button onClick={() => {setFilterYear('ALL'); setFilterSection('ALL'); setSearchTerm('');}} style={{background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold'}}>Clear</button>
            )}
        </div>
      </div>

      {loading ? (
        <div className="loading-state"><div className="spinner"></div><p>Loading data...</p></div>
      ) : filteredQuizzes.length === 0 ? (
        <div className="empty-state-modern">
          <div className="empty-icon-bg"><HelpCircle size={40} color="#104a28"/></div>
          <h3>No quizzes match your filters.</h3>
          {viewMode === 'active' && <button className="btn-text" onClick={() => navigate('/instructor/CreateQuiz')}>Create Quiz Now &rarr;</button>}
        </div>
      ) : (
        <div className="inst-quiz-grid">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="inst-quiz-card" style={{opacity: viewMode === 'archived' ? 0.8 : 1, border: quiz.is_retake ? '2px solid #eab308' : 'none'}}>
              <div className="card-top-accent" style={{background: quiz.is_retake ? '#eab308' : (viewMode === 'active' ? '#104a28' : '#8b5cf6')}}></div>
              <div className="card-content">
                <h3 className="card-title">{quiz.title}</h3>
                <div className="card-tags">
                    {quiz.is_retake ? <span className="tag" style={{background:'#fef08a', color:'#854d0e', fontWeight:'bold'}}>Retake Quiz (-{quiz.penalty}%)</span> : null}
                    {quiz.target_year && <span className="tag tag-year"><Target size={12}/> {quiz.target_year === 'ALL' ? 'All Assigned Classes' : `Year ${quiz.target_year}-${quiz.target_section}`}</span>}
                    {quiz.due_date && (
                        <span style={{fontSize: '11px', background: '#fee2e2', color: '#b91c1c', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px'}}>
                            <Clock size={12}/> Due: {new Date(quiz.due_date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                    )}
                </div>
                <p className="card-description">{quiz.description || "No description provided."}</p>
                <div className="card-date"><Calendar size={14}/> Created: {formatDate(quiz.created_at).toLocaleDateString()}</div>
              </div>
              <div className="card-actions">
                  <button className="btn-action btn-view" onClick={() => setViewingQuiz(quiz)} title="Preview"><Eye size={16}/></button>
                  
                  {viewMode === 'active' && (
                    <>
                      {!quiz.is_retake && (
                         <button className="btn-action btn-edit" style={{backgroundColor: '#fef08a', color: '#854d0e', border: '1px solid #fde047'}} onClick={() => handleEditQuiz(quiz.id, true)} title="Assign Retake for this Quiz"><RefreshCcw size={16}/></button>
                      )}
                      <button className="btn-action btn-edit" onClick={() => handleEditQuiz(quiz.id, false)} title="Edit Quiz"><Edit size={16}/></button>
                      <button className="btn-action btn-delete" onClick={(e) => handleMoveToTrash(quiz.id, e)} title="Move to Trash"><Trash2 size={16}/></button>
                    </>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- PREVIEW (VIEW) MODAL --- */}
      {viewingQuiz && (
        <div className="modal-overlay" onClick={() => setViewingQuiz(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '600px', padding: 0, overflow: 'hidden'}}>
            
            <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div>
                    <h2 style={{margin: 0, fontSize: '24px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <BookOpen size={28} color="#eab308"/> {viewingQuiz.title}
                    </h2>
                    <div style={{display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap'}}>
                        <span style={{fontSize: '12px', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px'}}>
                            <Target size={14}/> {viewingQuiz.target_year === 'ALL' ? 'All Assigned Classes' : `Year ${viewingQuiz.target_year} - Sec ${viewingQuiz.target_section}`}
                        </span>
                        {viewingQuiz.due_date ? (
                            <span style={{fontSize: '12px', background: '#fee2e2', color: '#991b1b', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold'}}>
                                <Clock size={14}/> Due: {new Date(viewingQuiz.due_date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                            </span>
                        ) : (
                            <span style={{fontSize: '12px', background: '#e5e7eb', color: '#4b5563', padding: '6px 12px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold'}}>
                                <Clock size={14}/> No Deadline
                            </span>
                        )}
                    </div>
                </div>
                <button onClick={() => setViewingQuiz(null)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}><X size={24}/></button>
            </div>

            <div style={{padding: '30px 24px', backgroundColor: '#f8fafc'}}>
                <div style={{background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
                    <h3 style={{fontSize: '13px', textTransform: 'uppercase', color: '#64748b', marginTop: 0, marginBottom: '10px', letterSpacing: '0.5px'}}>Quiz Description</h3>
                    <p style={{fontSize: '15px', color: '#333', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap'}}>
                        {viewingQuiz.description || <span style={{fontStyle: 'italic', color: '#94a3b8'}}>No description provided.</span>}
                    </p>
                </div>
                
                <div style={{marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '12px'}}>
                    <Calendar size={14}/> Created on {new Date(viewingQuiz.created_at).toLocaleDateString()}
                </div>
            </div>

            {viewMode === 'active' && (
                <div style={{padding: '16px 24px', borderTop: '1px solid #e5e7eb', background: '#fff', display: 'flex', justifyContent: 'flex-end'}}>
                    <button onClick={() => { setViewingQuiz(null); handleEditQuiz(viewingQuiz.id); }} style={{background: '#104a28', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'}}>
                        <Edit size={16}/> Edit Quiz & Questions
                    </button>
                </div>
            )}
          </div>
        </div>
      )}

      {/* TRASH MODAL */}
      {showTrashModal && (
        <div className="modal-overlay">
            <div className="modal-content" style={{width: '800px', maxWidth: '90vw'}}>
                <div className="modal-header"><h2 className="modal-title" style={{color: '#dc2626'}}>Trash Bin (Deleted Quizzes)</h2></div>
                <div style={{padding: '15px 20px', background: '#fef2f2', borderBottom: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <AlertTriangle size={18} color="#dc2626"/>
                    <span style={{fontSize: '13px', color: '#991b1b'}}>Quizzes in the trash will be permanently deleted after 30 days.</span>
                </div>
                <div style={{maxHeight: '400px', overflowY: 'auto', marginBottom: '20px'}}>
                    {trashLoading ? <p style={{textAlign:'center', padding: '20px'}}>Loading...</p> : trashList.length === 0 ? <p style={{color: '#888', textAlign:'center', padding: '20px'}}>Trash bin is empty.</p> : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th width="40%">Quiz Title</th>
                                    <th width="25%">Target Class</th>
                                    <th width="15%">Status</th>
                                    <th width="20%" style={{textAlign: 'right'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trashList.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div style={{fontWeight:'bold', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '6px'}}>
                                                <BookOpen size={14} color="#9ca3af"/> {item.title}
                                            </div>
                                        </td>
                                        <td style={{fontSize: '12px', color: '#6b7280'}}>
                                            {item.target_year === 'ALL' ? 'All Classes' : `Yr ${item.target_year} - Sec ${item.target_section}`}
                                        </td>
                                        <td>
                                            <div style={{display: 'flex', alignItems: 'center', gap: '4px', color: '#dc2626', fontWeight: 'bold', fontSize: '13px'}}>
                                                Disabled
                                            </div>
                                        </td>
                                        <td style={{textAlign: 'right'}}>
                                            <div style={{display:'flex', justifyContent:'flex-end', gap:'10px'}}>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#10b981', color: 'white', border: 'none'}} onClick={() => handleRestore(item.id)}>
                                                    <RotateCcw size={14}/> Restore
                                                </button>
                                                <button className="btn-secondary" style={{padding: '6px 12px', fontSize:'12px', backgroundColor:'#dc2626', color: 'white', border: 'none'}} onClick={() => handlePermanentDelete(item.id)}>
                                                    <Trash2 size={14}/> Delete
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
    </div>
  );
}