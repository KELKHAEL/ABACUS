import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, PlusCircle, Calendar, Eye, X, HelpCircle,
  RefreshCcw, LayoutGrid, Target, Clock, History, Edit, BookOpen, Search, Filter
} from 'lucide-react';
import './Instructor.css';

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [assignedClasses, setAssignedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [viewingQuiz, setViewingQuiz] = useState(null);
  const [viewMode, setViewMode] = useState('active'); // active, trash, archived

  // --- FILTERS ---
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

      // Parse Assigned Classes for the filters
      if (user.assigned_classes) {
          try {
              const classes = typeof user.assigned_classes === 'string' ? JSON.parse(user.assigned_classes) : user.assigned_classes;
              const finalClasses = typeof classes === 'string' ? JSON.parse(classes) : classes;
              setAssignedClasses(Array.isArray(finalClasses) ? finalClasses : []);
          } catch(e) {}
      }

      const res = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setQuizzes(data.quizzes || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchQuizzesAndUser(); }, []);

  // ✅ NEW: FETCH FULL QUIZ WITH QUESTIONS AND ROUTE TO EDITOR
  const handleEditQuiz = async (quizId) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/quizzes/${quizId}`);
      const fullQuiz = await res.json();
      
      if (fullQuiz.error) {
        alert(fullQuiz.error);
        setLoading(false);
        return;
      }
      
      // Navigate to CreateQuiz and pass the full quiz data (including questions) via state
      navigate('/instructor/CreateQuiz', { state: { quizToEdit: fullQuiz } });
    } catch (error) {
      console.error("Error fetching full quiz:", error);
      alert("Failed to load quiz details for editing.");
      setLoading(false);
    }
  };

  const handleMoveToTrash = async (quizId, e) => {
    e.stopPropagation();
    if (window.confirm("Move this quiz to the trashbin? Students will no longer see it.")) {
      try {
        const res = await fetch(`http://localhost:5000/quizzes/${quizId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'deleted' })
        });
        if (res.ok) fetchQuizzesAndUser();
      } catch (error) { alert("Failed to move to trash."); }
    }
  };

  const handleRestore = async (quizId, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`http://localhost:5000/quizzes/${quizId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' })
      });
      if (res.ok) fetchQuizzesAndUser();
    } catch (error) { alert("Failed to restore quiz."); }
  };

  const handlePermanentDelete = async (quizId, e) => {
    e.stopPropagation();
    if (window.confirm("WARNING: This will permanently delete the quiz AND erase all associated student grades from the Gradebook.")) {
      try {
        await fetch(`http://localhost:5000/quizzes/${quizId}`, { method: 'DELETE' });
        setQuizzes(prev => prev.filter(q => q.id !== quizId));
      } catch (error) { alert("Delete failed."); }
    }
  };

  // ✅ EXTRACT UNIQUE YEARS & SECTIONS FOR FILTERS
  const uniqueYears = [...new Set(assignedClasses.map(c => c.year))].sort();
  const uniqueSections = [...new Set(assignedClasses.map(c => c.section))].sort();

  // ✅ FILTER LOGIC
  const activeQuizzes = quizzes.filter(q => (q.status === 'active' || !q.status) && !q.is_archived);
  const trashedQuizzes = quizzes.filter(q => q.status === 'deleted' && !q.is_archived);
  const archivedQuizzes = quizzes.filter(q => q.is_archived && q.status !== 'deleted');
  
  const targetQuizzes = viewMode === 'active' ? activeQuizzes : viewMode === 'trash' ? trashedQuizzes : archivedQuizzes;

  const displayedQuizzes = targetQuizzes.filter(q => {
      const matchSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchYear = filterYear === 'ALL' || q.target_year === 'ALL' || String(q.target_year) === String(filterYear);
      const matchSection = filterSection === 'ALL' || q.target_section === 'ALL' || String(q.target_section) === String(filterSection);
      return matchSearch && matchYear && matchSection;
  });

  return (
    <div className="instructor-dashboard-container">
      <div className="inst-dashboard-header">
        <div className="header-left">
            <h2>
              {viewMode === 'active' ? 'Active Quizzes' : viewMode === 'trash' ? 'Trashbin' : 'Archived History'}
            </h2>
            <p>
              {viewMode === 'active' ? 'Manage current assessments for this semester.' : 
               viewMode === 'trash' ? 'Quizzes here are disabled for students.' : 'Read-only history of quizzes from past semesters.'}
            </p>
        </div>
        <div className="header-actions">
            <div className="view-toggle-container" style={{display: 'flex', background: '#f3f4f6', borderRadius: '8px', padding: '4px'}}>
              <button onClick={() => setViewMode('active')} style={{...toggleBtnStyle, background: viewMode === 'active' ? 'white' : 'transparent', color: viewMode === 'active' ? '#111' : '#6b7280'}}><LayoutGrid size={16}/> Active</button>
              <button onClick={() => setViewMode('trash')} style={{...toggleBtnStyle, background: viewMode === 'trash' ? 'white' : 'transparent', color: viewMode === 'trash' ? '#e11d48' : '#6b7280'}}><Trash2 size={16}/> Trash</button>
              <button onClick={() => setViewMode('archived')} style={{...toggleBtnStyle, background: viewMode === 'archived' ? 'white' : 'transparent', color: viewMode === 'archived' ? '#111' : '#6b7280'}}><History size={16}/> Archives</button>
            </div>
            {viewMode === 'active' && (
                <button className="btn-create-modern" onClick={() => navigate('/instructor/CreateQuiz')}>
                  <PlusCircle size={18} /> Create New Quiz
                </button>
            )}
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="gb-filters-card" style={{marginBottom: '25px', flexDirection: 'row', alignItems: 'center'}}>
        <div className="filter-title" style={{marginRight: '15px'}}>
            <Filter size={18} color="#eab308"/> 
            <span>Filters:</span>
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
      ) : displayedQuizzes.length === 0 ? (
        <div className="empty-state-modern">
          <div className="empty-icon-bg"><HelpCircle size={40} color="#104a28"/></div>
          <h3>No quizzes match your filters.</h3>
          {viewMode === 'active' && <button className="btn-text" onClick={() => navigate('/instructor/CreateQuiz')}>Create Quiz Now &rarr;</button>}
        </div>
      ) : (
        <div className="inst-quiz-grid">
          {displayedQuizzes.map((quiz) => (
            <div key={quiz.id} className="inst-quiz-card" style={{opacity: viewMode === 'archived' || viewMode === 'trash' ? 0.8 : 1}}>
              <div className="card-top-accent" style={{background: viewMode === 'active' ? '#eab308' : viewMode === 'trash' ? '#e11d48' : '#8b5cf6'}}></div>
              <div className="card-content">
                <h3 className="card-title" style={{textDecoration: viewMode === 'trash' ? 'line-through' : 'none', color: viewMode === 'trash' ? '#6b7280' : '#111'}}>{quiz.title}</h3>
                <div className="card-tags">
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
                      {/* Calls handleEditQuiz directly */}
                      <button className="btn-action btn-edit" onClick={() => handleEditQuiz(quiz.id)} title="Edit Quiz & Questions"><Edit size={16}/></button>
                      <button className="btn-action btn-delete" onClick={(e) => handleMoveToTrash(quiz.id, e)} title="Move to Trash"><Trash2 size={16}/></button>
                    </>
                  )}

                  {viewMode === 'trash' && (
                    <>
                      <button className="btn-action btn-edit" onClick={(e) => handleRestore(quiz.id, e)} title="Restore Quiz"><RefreshCcw size={16}/></button>
                      <button className="btn-action btn-delete" onClick={(e) => handlePermanentDelete(quiz.id, e)} title="Permanently Delete"><X size={16}/></button>
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
    </div>
  );
}

const toggleBtnStyle = { border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' };