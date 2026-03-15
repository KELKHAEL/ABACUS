import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, PlusCircle, Calendar, Eye, X, HelpCircle,
  RefreshCcw, Archive, LayoutGrid, Target, BarChart, 
  Users, FileText, Edit, ArrowRight, BookOpen, Clock, Settings
} from 'lucide-react';
import './Instructor.css';

export default function InstructorDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [studentCount, setStudentCount] = useState(0); 
  const [loading, setLoading] = useState(true);
  
  const [viewingQuiz, setViewingQuiz] = useState(null);
  const [viewMode, setViewMode] = useState('active'); 

  // --- EDIT MODAL STATES ---
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    title: '',
    description: '',
    targetYear: 'ALL',
    targetSection: 'ALL',
    difficulty: 'Easy'
  });
  
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return new Date();
    return new Date(dateString);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);

      const res = await fetch(`http://localhost:5000/instructor/dashboard/${user.id}`);
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setStudentCount(data.students ? data.students.length : 0);
      setQuizzes(data.quizzes || []);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // --- EDIT ACTIONS ---
  const openEditModal = (quiz) => {
    setEditFormData({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description || '',
      targetYear: quiz.target_year || 'ALL',
      targetSection: quiz.target_section || 'ALL',
      difficulty: quiz.difficulty || 'Easy'
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/quizzes/${editFormData.id}/details`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });
      const data = await res.json();
      
      if (data.success) {
        alert("Quiz updated successfully!");
        setShowEditModal(false);
        fetchDashboardData(); 
      } else {
        alert("Failed to update: " + data.error);
      }
    } catch (err) {
      alert("Server error. Ensure backend is running.");
    }
  };

  // --- TRASH BIN ACTIONS ---
  const changeQuizStatus = async (id, newStatus, e) => {
    e.stopPropagation();
    const actionName = newStatus === 'deleted' ? "Move to Bin" : "Restore";
    if (window.confirm(`${actionName} this quiz?`)) {
      try {
        const response = await fetch(`http://localhost:5000/quizzes/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        
        const data = await response.json();
        if (data.success) {
          setQuizzes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q));
        } else {
          alert("Server error: " + data.error);
        }
      } catch (error) { 
        alert("Network failed. Is the server running?"); 
      }
    }
  };

  const handlePermanentDelete = async (quizId, e) => {
    e.stopPropagation();
    if (window.confirm("WARNING: This will permanently delete the quiz.")) {
      try {
        await fetch(`http://localhost:5000/quizzes/${quizId}`, { method: 'DELETE' });
        setQuizzes(prev => prev.filter(q => q.id !== quizId));
      } catch (error) { alert("Delete failed."); }
    }
  };

  const handlePreview = async (quiz) => { setViewingQuiz(quiz); };

  const activeQuizzes = quizzes.filter(q => q.status === 'active' || !q.status);
  const deletedQuizzes = quizzes.filter(q => q.status === 'deleted');
  const displayedQuizzes = viewMode === 'active' ? activeQuizzes : deletedQuizzes;

  return (
    <div className="instructor-dashboard-container">
      
      {/* 1. STATS OVERVIEW */}
      <div className="inst-stats-overview">
        <div className="inst-stat-box blue-box" style={{cursor: 'pointer'}} onClick={() => navigate('/instructor/MyClassList')}>
            <div className="stat-info">
                <h4>My Students</h4>
                <span>{studentCount}</span>
                <div style={{fontSize:'12px', color:'#0ea5e9', marginTop:'5px', display:'flex', alignItems:'center'}}>
                    View List <ArrowRight size={12} style={{marginLeft:'4px'}}/>
                </div>
            </div>
            <div className="stat-icon-wrapper blue-icon">
                <Users size={24} />
            </div>
        </div>

        <div className="inst-stat-box gold-box">
            <div className="stat-info">
                <h4>Active Quizzes</h4>
                <span>{activeQuizzes.length}</span>
            </div>
            <div className="stat-icon-wrapper gold-icon">
                <FileText size={24} />
            </div>
        </div>

        <div className="inst-stat-box red-box">
            <div className="stat-info">
                <h4>Recycle Bin</h4>
                <span>{deletedQuizzes.length}</span>
            </div>
            <div className="stat-icon-wrapper red-icon">
                <Trash2 size={24} />
            </div>
        </div>
      </div>

      {/* 2. QUIZ HEADER */}
      <div className="inst-dashboard-header">
        <div className="header-left">
            <h2>{viewMode === 'active' ? 'Quiz Management' : 'Recycle Bin'}</h2>
            <p>Create, edit, or delete your assessments.</p>
        </div>
        <div className="header-actions">
            <div className="view-toggle-container">
              <button onClick={() => setViewMode('active')} className={`toggle-btn ${viewMode === 'active' ? 'active' : ''}`}><LayoutGrid size={16}/> Active</button>
              <button onClick={() => setViewMode('bin')} className={`toggle-btn ${viewMode === 'bin' ? 'bin-active' : ''}`}><Archive size={16}/> Bin</button>
            </div>
            <button className="btn-create-modern" onClick={() => navigate('/instructor/CreateQuiz')}>
              <PlusCircle size={18} /> Create New Quiz
            </button>
        </div>
      </div>

      {/* 3. QUIZ GRID */}
      {loading ? (
        <div className="loading-state"><div className="spinner"></div><p>Loading data...</p></div>
      ) : displayedQuizzes.length === 0 ? (
        <div className="empty-state-modern">
          <div className="empty-icon-bg"><HelpCircle size={40} color="#104a28"/></div>
          <h3>{viewMode === 'active' ? "No active quizzes found" : "Recycle Bin is empty"}</h3>
          {viewMode === 'active' && (
            <button className="btn-text" onClick={() => navigate('/instructor/CreateQuiz')}>
              Create Quiz Now &rarr;
            </button>
          )}
        </div>
      ) : (
        <div className="inst-quiz-grid">
          {displayedQuizzes.map((quiz) => (
            <div key={quiz.id} className="inst-quiz-card">
              <div className="card-top-accent" style={{background: viewMode === 'active' ? '#eab308' : '#ef4444'}}></div>
              
              <div className="card-content">
                <div className="card-header-row">
                    <div style={{height: '20px'}}>
                        {viewMode === 'bin' && <span style={{fontSize:'10px', color:'#ef4444', fontWeight:'bold', display:'flex', alignItems:'center', gap:'4px'}}><Trash2 size={12}/> DELETED</span>}
                    </div>
                </div>

                <h3 className="card-title">{quiz.title}</h3>
                
                <div className="card-tags">
                    {quiz.target_year && <span className="tag tag-year"><Target size={12}/> Year {quiz.target_year}-{quiz.target_section}</span>}
                    {quiz.difficulty && <span className="tag tag-diff"><BarChart size={12}/> {quiz.difficulty}</span>}
                </div>

                <p className="card-description">{quiz.description || "No description provided."}</p>
                <div className="card-date"><Calendar size={14}/> {formatDate(quiz.created_at).toLocaleDateString()}</div>
              </div>
              
              <div className="card-actions">
                {viewMode === 'active' ? (
                  <>
                    <button className="btn-action btn-view" onClick={() => handlePreview(quiz)} title="Preview Details"><Eye size={16}/></button>
                    <button className="btn-action btn-edit" onClick={() => openEditModal(quiz)} title="Edit Details"><Edit size={16}/></button>
                    <button className="btn-action btn-delete" onClick={(e) => changeQuizStatus(quiz.id, 'deleted', e)} title="Move to Bin"><Trash2 size={16}/></button>
                  </>
                ) : (
                  <>
                    <button className="btn-action btn-restore" onClick={(e) => changeQuizStatus(quiz.id, 'active', e)} title="Restore"><RefreshCcw size={16}/></button>
                    <button className="btn-action btn-delete" onClick={(e) => handlePermanentDelete(quiz.id, e)} title="Delete Forever"><Trash2 size={16}/></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. PREVIEW MODAL (IMPROVED UI) */}
      {viewingQuiz && (
        <div className="modal-overlay" onClick={() => setViewingQuiz(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '550px', padding: 0, overflow: 'hidden'}}>
            
            {/* Modal Header */}
            <div style={{backgroundColor: '#f8f9fa', padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div>
                    <h2 style={{margin: 0, fontSize: '22px', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <BookOpen size={24} color="#104a28"/> {viewingQuiz.title}
                    </h2>
                    <div style={{display: 'flex', gap: '12px', marginTop: '12px'}}>
                        {viewingQuiz.target_year && (
                            <span style={{fontSize: '12px', background: '#ecfccb', color: '#365314', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'}}>
                                Target: Year {viewingQuiz.target_year} - {viewingQuiz.target_section}
                            </span>
                        )}
                        {viewingQuiz.difficulty && (
                            <span style={{fontSize: '12px', background: '#e0f2fe', color: '#075985', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'}}>
                                {viewingQuiz.difficulty}
                            </span>
                        )}
                    </div>
                </div>
                <button onClick={() => setViewingQuiz(null)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af'}}>
                    <X size={24}/>
                </button>
            </div>

            {/* Modal Body */}
            <div style={{padding: '24px'}}>
                <div style={{marginBottom: '20px'}}>
                    <h4 style={{fontSize: '14px', color: '#6b7280', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                        <FileText size={16}/> Description
                    </h4>
                    <p style={{fontSize: '15px', color: '#374151', lineHeight: '1.6', background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #f3f4f6'}}>
                        {viewingQuiz.description || "No description provided for this assessment."}
                    </p>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: '#9ca3af', fontSize: '13px'}}>
                    <Clock size={14}/> Created on {formatDate(viewingQuiz.created_at).toLocaleDateString()}
                </div>
            </div>
            
            {/* Modal Footer */}
            <div style={{padding: '16px 24px', borderTop: '1px solid #e5e7eb', background: '#f9fafb', display: 'flex', justifyContent: 'flex-end'}}>
                <button 
                    onClick={() => { setViewingQuiz(null); openEditModal(viewingQuiz); }} 
                    style={{background: '#104a28', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'}}
                >
                    <Edit size={16}/> Edit Details
                </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. EDIT QUIZ MODAL (IMPROVED UI) */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '500px', padding: 0, overflow: 'hidden'}}>
                
                {/* Header */}
                <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Settings size={22}/> Edit Quiz Settings
                    </h2>
                    <button onClick={() => setShowEditModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}>
                        <X size={24}/>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSaveEdit}>
                    <div style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Quiz Title</label>
                            <input 
                                required 
                                value={editFormData.title} 
                                onChange={e => setEditFormData({...editFormData, title: e.target.value})} 
                                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box'}}
                                onFocus={(e) => e.target.style.borderColor = '#104a28'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>
                        
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Description</label>
                            <textarea 
                                value={editFormData.description} 
                                onChange={e => setEditFormData({...editFormData, description: e.target.value})} 
                                rows="3" 
                                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit'}}
                                onFocus={(e) => e.target.style.borderColor = '#104a28'}
                                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                            />
                        </div>
                        
                        <div style={{display: 'flex', gap: '16px'}}>
                            <div style={{flex: 1}}>
                                <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Target Year</label>
                                <select 
                                    value={editFormData.targetYear} 
                                    onChange={e => setEditFormData({...editFormData, targetYear: e.target.value})}
                                    style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer'}}
                                >
                                    <option value="ALL">All Years</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                            </div>
                            <div style={{flex: 1}}>
                                <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Target Section</label>
                                <select 
                                    value={editFormData.targetSection} 
                                    onChange={e => setEditFormData({...editFormData, targetSection: e.target.value})}
                                    style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer'}}
                                >
                                    <option value="ALL">All Sections</option>
                                    <option value="1">Section 1</option>
                                    <option value="2">Section 2</option>
                                    <option value="3">Section 3</option>
                                    <option value="4">Section 4</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Difficulty Level</label>
                            <select 
                                value={editFormData.difficulty} 
                                onChange={e => setEditFormData({...editFormData, difficulty: e.target.value})}
                                style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', outline: 'none', background: 'white', cursor: 'pointer'}}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Footer Actions */}
                    <div style={{padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
                        <button type="button" onClick={() => setShowEditModal(false)} style={{padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', color: '#374151', fontWeight: '600', cursor: 'pointer'}}>
                            Cancel
                        </button>
                        <button type="submit" style={{padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#eab308', color: '#422006', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'}}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}