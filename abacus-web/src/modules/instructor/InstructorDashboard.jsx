import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseWeb"; 
import { collection, getDocs, deleteDoc, doc, updateDoc, query, where, getDoc, writeBatch } from "firebase/firestore";
import { 
  Trash2, PlusCircle, Calendar, Eye, X, CheckCircle, HelpCircle,
  RefreshCcw, Archive, LayoutGrid, Target, BarChart, Users, FileText, Edit, UserCheck
} from 'lucide-react';
import './Instructor.css';

export default function InstructorDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [myStudents, setMyStudents] = useState([]); // Stores the actual student list
  const [loading, setLoading] = useState(true);
  const [viewingQuiz, setViewingQuiz] = useState(null);
  const [viewMode, setViewMode] = useState('active'); // 'active' | 'bin'
  const navigate = useNavigate();

  // --- HELPER: SAFE DATE FORMATTING ---
  const formatDate = (dateVal) => {
    if (!dateVal) return new Date();
    if (dateVal.toDate) return dateVal.toDate(); 
    return new Date(dateVal);
  };

  // --- MAIN FETCH DATA ---
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // 1. GET INSTRUCTOR'S ASSIGNED CLASSES
      const instructorRef = doc(db, "users", currentUser.uid);
      const instructorSnap = await getDoc(instructorRef);
      let assignedClasses = [];
      
      if (instructorSnap.exists()) {
        assignedClasses = instructorSnap.data().assignedClasses || [];
      }

      // 2. GET STUDENTS MATCHING THOSE CLASSES
      const studentQuery = query(collection(db, "users"), where("role", "==", "STUDENT"));
      const studentSnap = await getDocs(studentQuery);
      
      const filteredStudents = [];
      studentSnap.forEach(doc => {
        const s = doc.data();
        // Check if student's Year & Section matches what the instructor teaches
        const isMyStudent = assignedClasses.some(cls => 
          cls.year === s.yearLevel && cls.section === s.section
        );
        if (isMyStudent) {
          filteredStudents.push({ id: doc.id, ...s });
        }
      });
      setMyStudents(filteredStudents); // Store the actual list, not just the count

      // 3. GET QUIZZES
      const quizQuery = query(collection(db, "quizzes"), where("createdBy", "==", "Instructor"));
      const quizSnap = await getDocs(quizQuery);
      const list = [];
      quizSnap.forEach((doc) => list.push({ id: doc.id, ...doc.data() }));
      
      // Sort: Newest First
      list.sort((a, b) => formatDate(b.createdAt) - formatDate(a.createdAt));
      setQuizzes(list);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // --- ACTIONS: EDIT QUIZ ---
  const handleEdit = (quiz) => {
    // Navigate to CreateQuiz but pass the quiz data to pre-fill the form
    // You will need to update CreateQuiz.jsx to read this state
    navigate('/instructor/CreateQuiz', { state: { quizToEdit: quiz } });
  };

  // --- ACTIONS: SOFT DELETE (Move to Bin) ---
  const handleSoftDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Move this quiz to the Recycle Bin? (Grades are preserved)")) {
      try {
        await updateDoc(doc(db, "quizzes", id), { status: 'deleted' });
        setQuizzes(prev => prev.map(q => q.id === id ? { ...q, status: 'deleted' } : q));
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  // --- ACTIONS: RESTORE ---
  const handleRestore = async (id, e) => {
    e.stopPropagation();
    if (window.confirm("Restore this quiz?")) {
      try {
        await updateDoc(doc(db, "quizzes", id), { status: 'active' });
        setQuizzes(prev => prev.map(q => q.id === id ? { ...q, status: 'active' } : q));
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  // --- ACTIONS: HARD DELETE (WITH DATABASE CLEANUP) ---
  const handlePermanentDelete = async (quizId, e) => {
    e.stopPropagation();
    
    const confirmMsg = "WARNING: This will permanently delete the quiz AND remove it from all students' gradebooks in the database. This cannot be undone.";
    
    if (window.confirm(confirmMsg)) {
      try {
        // 1. Delete the Quiz Document
        await deleteDoc(doc(db, "quizzes", quizId));

        // 2. CLEANUP: Find all students who took this quiz and remove the record
        // Note: In a real production app with thousands of users, this should be a Cloud Function.
        // For this project, we iterate client-side.
        
        const batch = writeBatch(db); // Use batch for atomic updates
        let updateCount = 0;

        // Iterate through ALL students (not just my students, to be safe)
        const allStudentsSnap = await getDocs(query(collection(db, "users"), where("role", "==", "STUDENT")));
        
        allStudentsSnap.forEach((studentDoc) => {
            const data = studentDoc.data();
            if (data.gradesList && Array.isArray(data.gradesList)) {
                // Filter out the deleted quiz ID
                const newGrades = data.gradesList.filter(grade => grade.quizId !== quizId);
                
                // If the length changed, it means they had that quiz. Update it.
                if (newGrades.length !== data.gradesList.length) {
                    const studentRef = doc(db, "users", studentDoc.id);
                    batch.update(studentRef, { gradesList: newGrades });
                    updateCount++;
                }
            }
        });

        if (updateCount > 0) {
            await batch.commit();
            console.log(`Cleaned up grades for ${updateCount} students.`);
        }

        // 3. Update UI
        setQuizzes(prev => prev.filter(q => q.id !== quizId));
        alert("Quiz and associated grades permanently deleted.");

      } catch (error) {
        console.error("Delete failed:", error);
        alert("Error deleting: " + error.message);
      }
    }
  };

  // --- FILTERING ---
  const activeQuizzes = quizzes.filter(q => q.status === 'active' || !q.status);
  const deletedQuizzes = quizzes.filter(q => q.status === 'deleted');
  const displayedQuizzes = viewMode === 'active' ? activeQuizzes : deletedQuizzes;

  return (
    <div className="instructor-dashboard-container">
      
      {/* 1. STATS OVERVIEW */}
      <div className="inst-stats-overview">
        <div className="inst-stat-box" style={{borderLeftColor: '#0ea5e9'}}>
            <div className="stat-info">
                <h4>My Students</h4>
                <span>{myStudents.length}</span>
            </div>
            <div className="stat-icon-wrapper" style={{background: '#e0f2fe'}}>
                <Users size={24} color="#0ea5e9"/>
            </div>
        </div>

        <div className="inst-stat-box" style={{borderLeftColor: '#eab308'}}>
            <div className="stat-info">
                <h4>Active Quizzes</h4>
                <span>{activeQuizzes.length}</span>
            </div>
            <div className="stat-icon-wrapper" style={{background: '#fef9c3'}}>
                <FileText size={24} color="#eab308"/>
            </div>
        </div>

        <div className="inst-stat-box" style={{borderLeftColor: '#ef4444'}}>
            <div className="stat-info">
                <h4>Recycle Bin</h4>
                <span>{deletedQuizzes.length}</span>
            </div>
            <div className="stat-icon-wrapper" style={{background: '#fee2e2'}}>
                <Trash2 size={24} color="#ef4444"/>
            </div>
        </div>
      </div>

      {/* 2. STUDENT LIST PREVIEW (New Feature) */}
      <div className="dashboard-section">
        <div className="section-header">
            <h3><UserCheck size={20}/> My Class List</h3>
            <p>Students currently assigned to your sections.</p>
        </div>
        <div className="student-list-preview">
            {myStudents.length === 0 ? (
                <p className="no-data">No students found matching your assigned Year/Section.</p>
            ) : (
                <div className="table-responsive">
                    <table className="dash-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Student ID</th>
                                <th>Program</th>
                                <th>Year/Sec</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myStudents.slice(0, 5).map(s => ( // Show only top 5 here
                                <tr key={s.id}>
                                    <td>{s.fullName}</td>
                                    <td>{s.studentId}</td>
                                    <td>{s.program}</td>
                                    <td>{s.yearLevel} - {s.section}</td>
                                    <td><span className={`status-pill ${s.status?.toLowerCase()}`}>{s.status || 'Regular'}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {myStudents.length > 5 && <div className="see-more" onClick={() => navigate('/instructor/Gradebook')}>View all {myStudents.length} students in Gradebook →</div>}
                </div>
            )}
        </div>
      </div>

      {/* 3. QUIZ HEADER */}
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

      {/* 4. QUIZ GRID */}
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
                    <span className="card-badge">{quiz.questions?.length || 0} Questions</span>
                    {viewMode === 'bin' && <span style={{fontSize:'10px', color:'#ef4444', fontWeight:'bold'}}>DELETED</span>}
                </div>

                <h3 className="card-title">{quiz.title}</h3>
                
                <div className="card-tags">
                   {quiz.targetYear && <span className="tag tag-year"><Target size={12}/> Year {quiz.targetYear}-{quiz.targetSection}</span>}
                   {quiz.difficulty && <span className="tag tag-diff"><BarChart size={12}/> {quiz.difficulty}</span>}
                </div>

                <p className="card-description">{quiz.description || "No description provided."}</p>
                <div className="card-date"><Calendar size={14}/> {formatDate(quiz.createdAt).toLocaleDateString()}</div>
              </div>
              
              <div className="card-actions">
                {viewMode === 'active' ? (
                  <>
                    <button className="btn-action btn-view" onClick={() => setViewingQuiz(quiz)} title="Preview"><Eye size={16}/></button>
                    {/* EDIT BUTTON */}
                    <button className="btn-action btn-edit" onClick={(e) => handleEdit(quiz)} title="Edit"><Edit size={16}/></button>
                    {/* SOFT DELETE BUTTON */}
                    <button className="btn-action btn-delete" onClick={(e) => handleSoftDelete(quiz.id, e)} title="Move to Bin"><Trash2 size={16}/></button>
                  </>
                ) : (
                  <>
                    <button className="btn-action btn-restore" onClick={(e) => handleRestore(quiz.id, e)} title="Restore"><RefreshCcw size={16}/></button>
                    <button className="btn-action btn-delete" onClick={(e) => handlePermanentDelete(quiz.id, e)} title="Delete Forever"><Trash2 size={16}/></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. PREVIEW MODAL */}
      {viewingQuiz && (
        <div className="modal-overlay" onClick={() => setViewingQuiz(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{viewingQuiz.title}</h2>
              <button className="btn-close" onClick={() => setViewingQuiz(null)}><X size={24}/></button>
            </div>
            <div className="modal-body">
              {viewingQuiz.description && <div style={{padding:'15px', background:'#f8fafc', borderRadius:'8px', marginBottom:'20px'}}><strong>Description:</strong> {viewingQuiz.description}</div>}
              {viewingQuiz.questions.map((q, idx) => (
                <div key={idx} className="preview-question-item">
                    <div className="pq-header"><span className="pq-number">Q{idx+1}</span> <span>{q.questionText}</span></div>
                    <div className="pq-options">
                        {q.type === 'short' ? <strong>Key: {q.correctAnswerText}</strong> : q.options.map((o, i)=><div key={i} className={`pq-option ${q.correctIndex===i?'correct':''}`}>{o}</div>)}
                    </div>
                </div>
              ))}
            </div>
            <div className="modal-footer"><button className="btn-primary" onClick={() => setViewingQuiz(null)}>Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
}