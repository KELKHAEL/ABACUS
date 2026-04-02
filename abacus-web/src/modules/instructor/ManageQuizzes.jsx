import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, PlusCircle, Calendar, Eye, X, HelpCircle,
  RefreshCcw, LayoutGrid, Target, Clock, Settings, History, Edit, BookOpen
} from 'lucide-react';
import './Instructor.css';

export default function ManageQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [viewingQuiz, setViewingQuiz] = useState(null);
  const [viewMode, setViewMode] = useState('active'); // active, trash, archived

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null, title: '', description: '', targetYear: 'ALL', targetSection: 'ALL', dueDate: ''
  });
  
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return new Date();
    return new Date(dateString);
  };

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) { navigate('/login'); return; }
      const user = JSON.parse(userStr);

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

  useEffect(() => { fetchQuizzes(); }, []);

  const openEditModal = (quiz) => {
    let formattedDate = "";
    if (quiz.due_date) {
         const dateObj = new Date(quiz.due_date);
         dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
         formattedDate = dateObj.toISOString().slice(0, 16);
    }
    setEditFormData({
      id: quiz.id, title: quiz.title, description: quiz.description || '',
      targetYear: quiz.target_year || 'ALL', targetSection: quiz.target_section || 'ALL',
      dueDate: formattedDate
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
        fetchQuizzes(); 
      } else { alert("Failed to update: " + data.error); }
    } catch (err) { alert("Server error. Ensure backend is running."); }
  };

  // ✅ Move to Trash (Soft Delete)
  const handleMoveToTrash = async (quizId, e) => {
    e.stopPropagation();
    if (window.confirm("Move this quiz to the trashbin? Students will no longer see it.")) {
      try {
        const res = await fetch(`http://localhost:5000/quizzes/${quizId}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'deleted' })
        });
        if (res.ok) fetchQuizzes();
      } catch (error) { alert("Failed to move to trash."); }
    }
  };

  // ✅ Restore from Trash
  const handleRestore = async (quizId, e) => {
    e.stopPropagation();
    try {
      const res = await fetch(`http://localhost:5000/quizzes/${quizId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'active' })
      });
      if (res.ok) fetchQuizzes();
    } catch (error) { alert("Failed to restore quiz."); }
  };

  // ✅ Permanent Delete
  const handlePermanentDelete = async (quizId, e) => {
    e.stopPropagation();
    if (window.confirm("WARNING: This will permanently delete the quiz AND erase all associated student grades from the Gradebook.")) {
      try {
        await fetch(`http://localhost:5000/quizzes/${quizId}`, { method: 'DELETE' });
        setQuizzes(prev => prev.filter(q => q.id !== quizId));
      } catch (error) { alert("Delete failed."); }
    }
  };

  // ✅ Dynamic Display Logic
  const activeQuizzes = quizzes.filter(q => (q.status === 'active' || !q.status) && !q.is_archived);
  const trashedQuizzes = quizzes.filter(q => q.status === 'deleted' && !q.is_archived);
  const archivedQuizzes = quizzes.filter(q => q.is_archived && q.status !== 'deleted');
  
  const displayedQuizzes = 
    viewMode === 'active' ? activeQuizzes : 
    viewMode === 'trash' ? trashedQuizzes : 
    archivedQuizzes;

  return (
    <div className="instructor-dashboard-container">
      <div className="inst-dashboard-header">
        <div className="header-left">
            <h2>
              {viewMode === 'active' ? 'Active Quizzes' : 
               viewMode === 'trash' ? 'Trashbin' : 'Archived History'}
            </h2>
            <p>
              {viewMode === 'active' ? 'Manage current assessments for this semester.' : 
               viewMode === 'trash' ? 'Quizzes here are disabled for students. You can restore or permanently delete them.' :
               'Read-only history of quizzes from past semesters.'}
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

      {loading ? (
        <div className="loading-state"><div className="spinner"></div><p>Loading data...</p></div>
      ) : displayedQuizzes.length === 0 ? (
        <div className="empty-state-modern">
          <div className="empty-icon-bg"><HelpCircle size={40} color="#104a28"/></div>
          <h3>
            {viewMode === 'active' ? "No active quizzes found" : 
             viewMode === 'trash' ? "Your trash is empty" : "No archives found"}
          </h3>
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
                    {quiz.target_year && <span className="tag tag-year"><Target size={12}/> Year {quiz.target_year}-{quiz.target_section}</span>}
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
                      <button className="btn-action btn-edit" onClick={() => openEditModal(quiz)} title="Edit"><Edit size={16}/></button>
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

      {/* MODALS */}
      {viewingQuiz && (
        <div className="modal-overlay" onClick={() => setViewingQuiz(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '550px', padding: 0, overflow: 'hidden'}}>
            <div style={{backgroundColor: '#f8f9fa', padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div>
                    <h2 style={{margin: 0, fontSize: '22px', color: '#111', display: 'flex', alignItems: 'center', gap: '8px'}}><BookOpen size={24} color="#104a28"/> {viewingQuiz.title}</h2>
                </div>
                <button onClick={() => setViewingQuiz(null)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af'}}><X size={24}/></button>
            </div>
            <div style={{padding: '24px'}}>
                <p style={{fontSize: '15px', color: '#374151', lineHeight: '1.6', background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #f3f4f6'}}>{viewingQuiz.description || "No description provided."}</p>
            </div>
            {viewMode === 'active' && (
                <div style={{padding: '16px 24px', borderTop: '1px solid #e5e7eb', background: '#f9fafb', display: 'flex', justifyContent: 'flex-end'}}>
                    <button onClick={() => { setViewingQuiz(null); openEditModal(viewingQuiz); }} style={{background: '#104a28', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'}}><Edit size={16}/> Edit Details</button>
                </div>
            )}
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '500px', padding: 0, overflow: 'hidden'}}>
                <div style={{background: '#104a28', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2 style={{margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px'}}><Settings size={22}/> Edit Quiz Settings</h2>
                    <button onClick={() => setShowEditModal(false)} style={{background: 'none', border: 'none', cursor: 'pointer', color: '#a7f3d0'}}><X size={24}/></button>
                </div>
                <form onSubmit={handleSaveEdit}>
                    <div style={{padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Quiz Title</label>
                            <input required value={editFormData.title} onChange={e => setEditFormData({...editFormData, title: e.target.value})} style={{width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '15px'}}/>
                        </div>
                        <div>
                            <label style={{display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px'}}>Deadline / Due Date</label>
                            <input type="datetime-local" value={editFormData.dueDate} onChange={e => setEditFormData({...editFormData, dueDate: e.target.value})} style={{width: '100%', padding: '12px', border: '1px solid #ef4444', borderRadius: '8px'}} required />
                        </div>
                    </div>
                    <div style={{padding: '16px 24px', background: '#f9fafb', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', justifyContent: 'flex-end'}}>
                        <button type="button" onClick={() => setShowEditModal(false)} style={{padding: '10px 20px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', cursor: 'pointer'}}>Cancel</button>
                        <button type="submit" style={{padding: '10px 20px', borderRadius: '6px', border: 'none', background: '#eab308', fontWeight: 'bold', cursor: 'pointer'}}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
}

const toggleBtnStyle = { border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', fontSize: '13px', transition: 'all 0.2s' };