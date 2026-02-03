import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { 
  Trash2, PlusCircle, Calendar, Eye, X, CheckCircle, HelpCircle,
  RefreshCcw, Archive, LayoutGrid, Target, BarChart
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingQuiz, setViewingQuiz] = useState(null);
  const [viewMode, setViewMode] = useState('active');

  // FETCH QUIZZES
  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "quizzes"), where("createdBy", "==", "Instructor"));
      const querySnapshot = await getDocs(q);
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      // Sort: Newest First
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setQuizzes(list);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // --- ACTIONS ---

  // 1. SOFT DELETE (Move to Bin) - Replaces your old handleDelete
  const handleSoftDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Move this quiz to the Recycle Bin? Students won't see it anymore.")) {
      try {
        await updateDoc(doc(db, "quizzes", id), { status: 'deleted' });
        fetchQuizzes(); // Refresh list
      } catch (error) {
        alert("Error moving to bin: " + error.message);
      }
    }
  };

  // 2. RESTORE (Move back to Active) - NEW
  const handleRestore = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Restore this quiz? It will be visible to students again.")) {
      try {
        await updateDoc(doc(db, "quizzes", id), { status: 'active' });
        fetchQuizzes();
      } catch (error) {
        alert("Error restoring: " + error.message);
      }
    }
  };

  // 3. HARD DELETE (Permanent) - NEW
  const handlePermanentDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("PERMANENTLY DELETE? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "quizzes", id));
        fetchQuizzes();
      } catch (error) {
        alert("Error deleting: " + error.message);
      }
    }
  };

  // --- FILTERING ---
  // If status is undefined, treat as 'active' (backward compatibility)
  const activeQuizzes = quizzes.filter(q => q.status === 'active' || !q.status);
  const deletedQuizzes = quizzes.filter(q => q.status === 'deleted');

  const displayedQuizzes = viewMode === 'active' ? activeQuizzes : deletedQuizzes;

  return (
    <div className="dashboard-container">
      
      {/* HEADER SECTION - UPDATED WITH TABS */}
      <div className="dashboard-header-modern" style={{flexDirection: 'column', alignItems: 'flex-start', gap: '20px'}}>
        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>
            <h2 className="header-title">
              {viewMode === 'active' ? 'Published Quizzes' : 'Recycle Bin'}
            </h2>
            <p className="header-subtitle">
              {viewMode === 'active' 
                ? 'Manage and review your active assessments.' 
                : 'Recover or permanently remove deleted quizzes.'}
            </p>
          </div>
          
          <div style={{display: 'flex', gap: '15px'}}>
             {/* VIEW TOGGLE */}
            <div style={{background: '#fff', padding: '5px', borderRadius: '8px', border: '1px solid #ddd', display: 'flex'}}>
              <button 
                onClick={() => setViewMode('active')}
                style={{
                  padding: '8px 15px', borderRadius: '6px', border: 'none', 
                  background: viewMode === 'active' ? '#e8f5e9' : 'transparent',
                  color: viewMode === 'active' ? '#104a28' : '#666', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <LayoutGrid size={16} /> Active ({activeQuizzes.length})
              </button>
              <button 
                onClick={() => setViewMode('bin')}
                style={{
                  padding: '8px 15px', borderRadius: '6px', border: 'none', 
                  background: viewMode === 'bin' ? '#fee2e2' : 'transparent',
                  color: viewMode === 'bin' ? '#dc2626' : '#666', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Archive size={16} /> Bin ({deletedQuizzes.length})
              </button>
            </div>

            <button className="btn-create-modern" onClick={() => setActiveTab('create')}>
              <PlusCircle size={20} /> Create New Quiz
            </button>
          </div>
        </div>
      </div>

      {/* LOADING / EMPTY / GRID */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your quizzes...</p>
        </div>
      ) : displayedQuizzes.length === 0 ? (
        <div className="empty-state-modern">
          <div className="empty-icon-bg">
            <HelpCircle size={40} color="#104a28" />
          </div>
          <h3>{viewMode === 'active' ? "No active quizzes" : "Recycle Bin is empty"}</h3>
          <p>
            {viewMode === 'active' 
              ? "Get started by creating your first assessment." 
              : "Deleted quizzes will appear here."}
          </p>
          {viewMode === 'active' && (
            <button className="btn-text" onClick={() => setActiveTab('create')}>
              Go to Quiz Creator &rarr;
            </button>
          )}
        </div>
      ) : (
        <div className="quiz-grid-modern">
          {displayedQuizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card-modern" style={{borderTop: viewMode === 'active' ? '4px solid #fbbf24' : '4px solid #ef4444'}}>
              
              <div className="card-badge">
                {quiz.questions?.length || 0} Questions
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{quiz.title}</h3>
                
                {/* NEW: TAGS FOR TARGET CLASS */}
                <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '8px 0'}}>
                   {quiz.targetYear && (
                     <span style={{fontSize: '11px', background: '#ecfccb', color: '#3f6212', padding: '2px 6px', borderRadius: '4px', display:'flex', alignItems:'center', gap:'3px'}}>
                       <Target size={10}/> Year {quiz.targetYear}-{quiz.targetSection}
                     </span>
                   )}
                   {quiz.difficulty && (
                     <span style={{fontSize: '11px', background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', display:'flex', alignItems:'center', gap:'3px'}}>
                       <BarChart size={10}/> {quiz.difficulty}
                     </span>
                   )}
                </div>

                <p className="card-date">
                  <Calendar size={14} /> 
                  {new Date(quiz.createdAt).toLocaleDateString(undefined, { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </p>
                <p className="card-description">
                  {quiz.description ? quiz.description : "No description provided."}
                </p>
              </div>

              <div className="card-actions-modern">
                {viewMode === 'active' ? (
                  <>
                    <button 
                      className="btn-action-view" 
                      onClick={() => setViewingQuiz(quiz)}
                      title="View Details"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button 
                      className="btn-action-delete" 
                      onClick={(e) => handleSoftDelete(quiz.id, e)}
                      title="Move to Bin"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="btn-action-view" // Reusing view style for restore
                      style={{background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0'}}
                      onClick={(e) => handleRestore(quiz.id, e)}
                      title="Restore Quiz"
                    >
                      <RefreshCcw size={16} /> Restore
                    </button>
                    <button 
                      className="btn-action-delete" 
                      style={{background: '#7f1d1d', color: '#fff', border: 'none'}}
                      onClick={(e) => handlePermanentDelete(quiz.id, e)}
                      title="Delete Forever"
                    >
                      <Trash2 size={16} /> Delete Forever
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- PREVIEW MODAL (YOUR ORIGINAL CODE) --- */}
      {viewingQuiz && (
        <div className="modal-overlay" onClick={() => setViewingQuiz(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{viewingQuiz.title}</h2>
                <span className="modal-subtitle">
                  {viewingQuiz.questions.length} Questions • Created on {new Date(viewingQuiz.createdAt).toLocaleDateString()}
                </span>
                {/* Modal Tags */}
                <div style={{marginTop:'5px', display:'flex', gap:'10px'}}>
                   {viewingQuiz.targetYear && <span className="modal-tag">Target: Year {viewingQuiz.targetYear} - Sec {viewingQuiz.targetSection}</span>}
                   {viewingQuiz.difficulty && <span className="modal-tag">Diff: {viewingQuiz.difficulty}</span>}
                </div>
              </div>
              <button className="btn-close" onClick={() => setViewingQuiz(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              {viewingQuiz.description && (
                <div className="quiz-description-box">
                  <strong>Description:</strong> {viewingQuiz.description}
                </div>
              )}

              <div className="questions-preview-list">
                {viewingQuiz.questions.map((q, idx) => (
                  <div key={idx} className="preview-question-item">
                    <div className="pq-header">
                      <span className="pq-number">Q{idx + 1}</span>
                      <span className="pq-text">{q.questionText}</span>
                      <span className="pq-type-badge">{q.type}</span>
                    </div>

                    <div className="pq-options">
                      {q.type === 'short' ? (
                        <div className="short-answer-display">
                          <strong>Correct Key:</strong> {q.correctAnswerText}
                        </div>
                      ) : (
                        q.options.map((opt, oIdx) => (
                          <div 
                            key={oIdx} 
                            className={`pq-option ${q.correctIndex === oIdx ? 'correct' : ''}`}
                          >
                            {q.correctIndex === oIdx && <CheckCircle size={14} className="correct-icon"/>}
                            {opt}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setViewingQuiz(null)}>Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}