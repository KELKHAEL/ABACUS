import React, { useState, useEffect } from "react";
import { db, auth } from "./firebaseConfig"; 
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth"; 
import Login from "./Login"; 
import "./App.css"; 

const Icons = {
  Trash: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Close: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#104a28" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div style={styles.loader}>Loading System...</div>;

  if (!user) return <Login />;

  return <InstructorPanel user={user} />;
}

// --- MAIN INSTRUCTOR PANEL ---
function InstructorPanel({ user }) {
  const [activeTab, setActiveTab] = useState("dashboard"); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardHome />;
      case "create": return <CreateQuizUI />;
      case "grades": return <Gradebook />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <div style={styles.brand}>
          <span style={styles.brandIcon}>▲</span> <span style={styles.brandText}>ABACUS ADMIN</span>
        </div>
        <nav style={styles.nav}>
          <button style={activeTab === 'dashboard' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
          <button style={activeTab === 'create' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('create')}>Create Quiz</button>
          <button style={activeTab === 'grades' ? styles.navItemActive : styles.navItem} onClick={() => setActiveTab('grades')}>Gradebook</button>
        </nav>
        <div style={styles.logoutContainer}>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout ➔</button>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.topBar}>
          <h2 style={styles.pageTitle}>{activeTab === 'create' ? 'Quiz Creator' : activeTab === 'grades' ? 'Student Grades' : 'Dashboard'}</h2>
          <div style={styles.userProfile}>
            <div style={styles.avatar}>I</div>
            <span style={{fontSize: '14px', fontWeight: '500', color: '#333'}}>{user.email}</span>
          </div>
        </header>
        <div style={styles.contentCanvas}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// --- DASHBOARD ---
function DashboardHome() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "quizzes"));
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setQuizzes(list);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "quizzes", id));
        setQuizzes(quizzes.filter(q => q.id !== id));
      } catch (error) {
        alert("Error deleting quiz.");
      }
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={{color: '#333', marginBottom: '20px'}}>Published Quizzes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : quizzes.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No quizzes published yet.</p>
          <span style={{fontSize:'12px', color:'#888'}}>Go to "Create Quiz" to make one.</span>
        </div>
      ) : (
        <div style={styles.quizGrid}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} style={styles.quizCard}>
              <div style={styles.quizHeader}>
                <h3 style={styles.quizTitle}>{quiz.title}</h3>
                <span style={styles.quizDate}>{new Date(quiz.createdAt).toLocaleDateString()}</span>
              </div>
              <p style={styles.quizDesc}>{quiz.description || "No description provided."}</p>
              <div style={styles.quizStats}>
                <span style={styles.badge}>{quiz.questions?.length || 0} Questions</span>
              </div>
              <div style={styles.cardActions}>
                <button style={{...styles.actionBtn, color: '#d32f2f', border: '1px solid #ffcdd2'}} onClick={() => handleDelete(quiz.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// --- CREATE QUIZ ---
function CreateQuizUI() {
  const [quizTitle, setQuizTitle] = useState("Untitled Quiz");
  const [quizDesc, setQuizDesc] = useState("");
  const [questions, setQuestions] = useState([
    { id: Date.now(), questionText: "", options: ["Option 1"], correctIndex: 0, correctAnswerText: "", type: "multiple-choice", required: true }
  ]);

  const addNewQuestionCard = () => {
    setQuestions([...questions, { id: Date.now(), questionText: "", options: ["Option 1"], correctIndex: 0, correctAnswerText: "", type: "multiple-choice", required: true }]);
  };

  const updateQuestionText = (idx, text) => { const newQ = [...questions]; newQ[idx].questionText = text; setQuestions(newQ); };
  const updateQuestionType = (idx, val) => { const newQ = [...questions]; newQ[idx].type = val; setQuestions(newQ); };
  const updateCorrectAnswerText = (idx, text) => { const newQ = [...questions]; newQ[idx].correctAnswerText = text; setQuestions(newQ); };
  const toggleRequired = (idx) => { const newQ = [...questions]; newQ[idx].required = !newQ[idx].required; setQuestions(newQ); };
  const updateOptionText = (qIdx, oIdx, text) => { const newQ = [...questions]; newQ[qIdx].options[oIdx] = text; setQuestions(newQ); };
  const addOptionLine = (qIdx) => { const newQ = [...questions]; newQ[qIdx].options.push(`Option ${newQ[qIdx].options.length + 1}`); setQuestions(newQ); };
  
  const removeOptionLine = (qIdx, oIdx) => { 
     const newQ = [...questions]; 
     if(newQ[qIdx].options.length <= 1) return;
     newQ[qIdx].options.splice(oIdx, 1);
     if(newQ[qIdx].correctIndex >= newQ[qIdx].options.length) newQ[qIdx].correctIndex = 0;
     setQuestions(newQ);
  };

  const setCorrectAnswer = (qIdx, oIdx) => { const newQ = [...questions]; newQ[qIdx].correctIndex = oIdx; setQuestions(newQ); };
  
  const deleteQuestionCard = (qIdx) => { 
      if(questions.length <= 1) return alert("You need at least one question.");
      const newQ = [...questions]; newQ.splice(qIdx, 1); setQuestions(newQ);
  }

  const publishQuiz = async () => {
    if (!quizTitle.trim()) return alert("Please enter a Quiz Title.");
    
    // --- FOR AUTO-GRADING ---
    for(let i=0; i<questions.length; i++) {
        if(!questions[i].questionText.trim()) return alert(`Question ${i+1} is missing text.`);
        
        // Ensure Short Answers have a Key
        if (questions[i].type === 'short' && !questions[i].correctAnswerText.trim()) {
            return alert(`Question ${i+1} needs a "Correct Answer Key" for auto-grading.`);
        }
        
        // Ensure Multiple Choice has options
        if (questions[i].type !== 'short' && questions[i].options.some(o => !o.trim())) {
            return alert(`Question ${i+1} has empty options.`);
        }
    }

    try {
      const cleanQuestions = questions.map(({ id, ...rest }) => rest);
      await addDoc(collection(db, "quizzes"), {
        title: quizTitle, description: quizDesc, questions: cleanQuestions, createdAt: new Date().toISOString(), createdBy: "Instructor"
      });
      alert("Quiz Published Successfully!");
      setQuizTitle("Untitled Quiz"); setQuizDesc("");
      setQuestions([{ id: Date.now(), questionText: "", options: ["Option 1"], correctIndex: 0, correctAnswerText: "", type: "multiple-choice", required: true }]);
    } catch (e) { console.error(e); alert("Error publishing quiz."); }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.formCenter}>
        <div style={{...styles.card, borderTop: '8px solid #104a28'}}> 
          <input style={styles.titleInput} value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} placeholder="Untitled Quiz" />
          <input style={styles.descInput} value={quizDesc} onChange={(e) => setQuizDesc(e.target.value)} placeholder="Form description" />
        </div>

        {questions.map((q, qIdx) => (
          <div key={q.id} style={styles.card}>
            <div style={styles.questionRow}>
                <div style={{flex: 1, marginRight: '20px'}}>
                  <input style={styles.questionInput} value={q.questionText} onChange={(e) => updateQuestionText(qIdx, e.target.value)} placeholder="Question" />
                </div>
                <select style={styles.selectDropdown} value={q.type} onChange={(e) => updateQuestionType(qIdx, e.target.value)}>
                  <option value="multiple-choice">Multiple choice</option>
                  <option value="checkbox">Checkboxes</option>
                  <option value="short">Short answer</option>
                </select>
            </div>

            <div style={styles.contentArea}>
              {q.type === 'short' && (
                <div style={styles.shortAnswerContainer}>
                  <label style={styles.answerLabel}>Set Correct Answer Key:</label>
                  <input type="text" style={styles.shortAnswerInput} value={q.correctAnswerText} onChange={(e) => updateCorrectAnswerText(qIdx, e.target.value)} placeholder="Type the exact correct answer here..." />
                </div>
              )}

              {(q.type === 'multiple-choice' || q.type === 'checkbox') && (
                <div style={styles.optionsList}>
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} style={styles.optionRow}>
                      <div onClick={() => setCorrectAnswer(qIdx, oIdx)} style={{cursor: 'pointer', marginRight: '10px', display: 'flex', alignItems: 'center'}} title="Click to mark as correct answer">
                        {q.type === 'checkbox' ? (
                           <div style={q.correctIndex === oIdx ? styles.boxSelected : styles.boxUnselected} />
                        ) : (
                           <div style={q.correctIndex === oIdx ? styles.radioSelected : styles.radioUnselected} />
                        )}
                      </div>
                      
                      <input style={q.correctIndex === oIdx ? styles.optionInputCorrect : styles.optionInput} value={opt} onChange={(e) => updateOptionText(qIdx, oIdx, e.target.value)} placeholder={`Option ${oIdx + 1}`} />
                      
                      {/* --- VISUAL INDICATOR FOR CORRECT ANSWER --- */}
                      {q.correctIndex === oIdx && (
                          <span style={styles.correctBadge}><Icons.Check /> Correct Answer</span>
                      )}

                      {q.options.length > 1 && (<div style={styles.removeBtn} onClick={() => removeOptionLine(qIdx, oIdx)}><Icons.Close /></div>)}
                    </div>
                  ))}
                  <div style={styles.addOptionRow} onClick={() => addOptionLine(qIdx)}>
                    <div style={q.type === 'checkbox' ? styles.boxPlaceholder : styles.radioPlaceholder}></div>
                    <span style={styles.addOptionText}>Add option</span>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.cardFooter}>
                <div style={styles.answerKeyHint}>
                    {q.type === 'short' ? 'Text matching will be case-insensitive.' : 'Ensure the green icon marks the correct answer.'}
                </div>
                <div style={styles.footerRight}>
                    <button style={styles.iconBtn} onClick={() => deleteQuestionCard(qIdx)} title="Delete Question"><Icons.Trash /></button>
                    <div style={styles.divider}></div>
                    <span style={styles.reqLabel}>Required</span>
                    <div style={q.required ? styles.switchOn : styles.switchOff} onClick={() => toggleRequired(qIdx)}><div style={q.required ? styles.switchKnobOn : styles.switchKnobOff}></div></div>
                </div>
            </div>
          </div>
        ))}
      </div>
      <div style={styles.floatingMenu}><button style={styles.floatingPlusBtn} onClick={addNewQuestionCard} title="Add Question"><Icons.Plus /></button></div>
      <div style={styles.publishContainer}><button onClick={publishQuiz} style={styles.publishBtn}>PUBLISH QUIZ</button></div>
    </div>
  );
}

// --- GRADEBOOK ---
function Gradebook() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchGrades = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = [];
      querySnapshot.forEach((doc) => {
        const u = doc.data();
        if (u.gradesList?.length > 0) data.push({ id: doc.id, ...u });
      });
      setStudents(data);
    };
    fetchGrades();
  }, []);

  return (
    <div style={styles.gbContainer}>
      <table style={styles.gbTable}>
        <thead><tr style={{backgroundColor:'#f8f9fa', textAlign:'left'}}><th style={styles.th}>STUDENT NAME</th><th style={styles.th}>EMAIL</th><th style={styles.th}>QUIZ HISTORY</th></tr></thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} style={{borderBottom:'1px solid #eee'}}>
              <td style={styles.td}><b>{s.fullName || "Unknown"}</b></td>
              <td style={styles.td}>{s.email}</td>
              <td style={styles.td}>
                  {s.gradesList.map((g, i) => (
                      <div key={i} style={{marginBottom: '5px'}}>
                          <span style={{color:'#555'}}>{g.subjectTitle}: </span>
                          <b style={{
                              color: parseFloat(g.grade) >= 75 ? '#104a28' : '#d32f2f', // Green for Pass, Red for Fail
                              backgroundColor: parseFloat(g.grade) >= 75 ? '#e8f5e9' : '#ffebee',
                              padding: '2px 6px', borderRadius: '4px'
                          }}>
                              {g.grade}%
                          </b>
                      </div>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {students.length === 0 && <p style={{textAlign:'center', padding:'20px', color:'#888'}}>No grades recorded yet.</p>}
    </div>
  );
}

// --- STYLES ---
const styles = {
  loader: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#555' },
  layout: { display: "flex", height: "100vh", fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: "#f0f2f5", overflow: "hidden" },
  sidebar: { width: '260px', backgroundColor: '#104a28', color: 'white', display: 'flex', flexDirection: 'column', padding: '20px', zIndex: 100, boxShadow: '4px 0 10px rgba(0,0,0,0.1)' },
  brand: { fontSize: '18px', fontWeight: 'bold', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' },
  brandIcon: { color: '#FFC107', fontSize: '20px' }, 
  nav: { display: 'flex', flexDirection: 'column', gap: '8px' },
  navItem: { padding: '12px 15px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: '#cfd8dc', textAlign: 'left', cursor: 'pointer', fontSize: '14px', transition: '0.2s' },
  navItemActive: { padding: '12px 15px', borderRadius: '8px', border: 'none', backgroundColor: '#FFC107', color: '#104a28', textAlign: 'left', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' },
  logoutContainer: { marginTop: 'auto', borderTop: '1px solid #ffffff20', paddingTop: '20px' }, 
  logoutBtn: { background: 'none', border: 'none', color: '#ff8a80', cursor: 'pointer', textAlign: 'left', width: '100%', fontSize: '14px', fontWeight: '500' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' },
  topBar: { height: '64px', backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px', position: 'sticky', top: 0, zIndex: 50 },
  pageTitle: { fontSize: '22px', color: '#104a28', margin: 0, fontWeight: '700' },
  userProfile: { display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f5f5f5', padding: '5px 15px', borderRadius: '20px' },
  avatar: { width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#FFC107', color: '#104a28', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' },
  contentCanvas: { padding: '30px', paddingBottom: '100px' },
  formContainer: { display: "flex", justifyContent: "center", position: 'relative', maxWidth: "900px", margin: "0 auto" },
  formCenter: { width: "100%", maxWidth: "770px", marginRight: '20px' },
  card: { backgroundColor: "white", borderRadius: "8px", border: "1px solid #dadce0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", padding: "24px", marginBottom: "16px" },
  titleInput: { width: '100%', fontSize: '32px', border: 'none', borderBottom: '1px solid #e0e0e0', marginBottom: '10px', outline: 'none', fontWeight: '400', color: '#202124' },
  descInput: { width: '100%', fontSize: '14px', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', paddingBottom: '5px', color: "#70757a" },
  questionRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' },
  questionInput: { width: '100%', fontSize: '16px', padding: '16px', backgroundColor: '#f8f9fa', border: 'none', borderBottom: '1px solid #888', outline: 'none', borderRadius: '4px 4px 0 0' },
  selectDropdown: { padding: '12px 15px', borderRadius: '4px', border: '1px solid #dadce0', fontSize: '14px', color: '#5f6368', backgroundColor: 'white', cursor: 'pointer', height: '48px', width: '200px' },
  contentArea: { marginTop: '10px' },
  shortAnswerContainer: { width: '60%' },
  shortAnswerInput: { width: '100%', padding: '10px 0', border: 'none', borderBottom: '2px solid #104a28', fontSize: '14px', outline: 'none', color: '#104a28', fontWeight: '500' },
  answerLabel: { display:'block', fontSize:'12px', color:'#104a28', fontWeight:'bold', marginBottom:'5px' },
  optionsList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  optionRow: { display: "flex", alignItems: "center" },
  radioUnselected: { width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #ccc' },
  radioSelected: { width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #104a28', backgroundColor: '#104a28', boxShadow: 'inset 0 0 0 3px white' },
  boxUnselected: { width: '18px', height: '18px', borderRadius: '2px', border: '2px solid #ccc' },
  boxSelected: { width: '18px', height: '18px', borderRadius: '2px', border: '2px solid #104a28', backgroundColor: '#104a28' },
  radioPlaceholder: { width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #ccc', marginRight: '15px' },
  boxPlaceholder: { width: '18px', height: '18px', borderRadius: '2px', border: '2px solid #ccc', marginRight: '15px' },
  optionInput: { flex: 1, border: 'none', borderBottom: '1px solid #eee', fontSize: '14px', padding: "10px 5px", outline: "none" },
  optionInputCorrect: { flex: 1, border: 'none', borderBottom: '2px solid #104a28', fontSize: '14px', padding: "10px 5px", outline: "none", color: '#104a28', fontWeight: '500' },
  correctBadge: { fontSize: '12px', color: '#104a28', fontWeight: 'bold', marginLeft: '10px', display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#e8f5e9', padding: '2px 8px', borderRadius: '12px' },
  removeBtn: { marginLeft: '10px', cursor: 'pointer', color: '#5f6368', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', borderRadius: '50%', ':hover': { backgroundColor: '#f1f3f4' } },
  addOptionRow: { display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: '5px' },
  addOptionText: { fontSize: '14px', fontWeight: '500', color: '#5f6368' },
  cardFooter: { borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  answerKeyHint: { fontSize: '12px', color: '#104a28', fontWeight: '600' },
  footerRight: { display: 'flex', alignItems: 'center', gap: '15px' },
  iconBtn: { border: 'none', background: 'none', cursor: 'pointer', color: '#5f6368' },
  divider: { height: '24px', width: '1px', backgroundColor: '#dadce0' },
  reqLabel: { fontSize: '14px', color: '#555' },
  switchOff: { width: '36px', height: '14px', backgroundColor: '#dadce0', borderRadius: '10px', position: 'relative', cursor: 'pointer', margin: '0 5px' },
  switchOn: { width: '36px', height: '14px', backgroundColor: '#a5d6a7', borderRadius: '10px', position: 'relative', cursor: 'pointer', margin: '0 5px' },
  switchKnobOff: { width: '20px', height: '20px', backgroundColor: '#f1f1f1', borderRadius: '50%', position: 'absolute', top: '-3px', left: '-2px', boxShadow: '0 1px 3px rgba(0,0,0,0.4)', transition: '0.2s' },
  switchKnobOn: { width: '20px', height: '20px', backgroundColor: '#104a28', borderRadius: '50%', position: 'absolute', top: '-3px', left: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.4)', transition: '0.2s' },
  floatingMenu: { position: "sticky", top: "20px", display: "flex", flexDirection: "column", backgroundColor: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", padding: "10px", height: "fit-content", border: "1px solid #dadce0" },
  floatingPlusBtn: { width: "30px", height: "30px", borderRadius: "50%", border: "none", backgroundColor: "white", color: "#5f6368", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  publishContainer: { position: 'fixed', bottom: 0, left: '260px', right: 0, padding: '15px 40px', backgroundColor: 'white', borderTop: '1px solid #ddd', textAlign: 'right', zIndex: 50 },
  publishBtn: { backgroundColor: '#104a28', color: 'white', padding: '10px 24px', borderRadius: '4px', border: 'none', fontWeight: '600', cursor: 'pointer', letterSpacing: '0.5px' },
  dashboardContainer: { maxWidth: '1000px', margin: '0 auto' },
  quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  quizCard: { backgroundColor: 'white', borderRadius: '8px', padding: '20px', border: '1px solid #e0e0e0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '10px' },
  quizHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '5px' },
  quizTitle: { fontSize: '18px', fontWeight: 'bold', color: '#104a28', margin: 0 },
  quizDate: { fontSize: '12px', color: '#888' },
  quizDesc: { fontSize: '14px', color: '#555', lineHeight: '1.4', flex: 1 },
  quizStats: { marginTop: '10px', display: 'flex', gap: '10px' },
  badge: { backgroundColor: '#e8f5e9', color: '#104a28', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' },
  cardActions: { marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' },
  actionBtn: { flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #e0e0e0', backgroundColor: 'white', fontSize: '13px', cursor: 'pointer', fontWeight: '500', color: '#333', transition: '0.2s' },
  emptyState: { textAlign: 'center', padding: '50px', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed #ccc', color: '#666' },
  gbContainer: { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', overflow: 'hidden', maxWidth: '1000px', margin: '20px auto' },
  gbTable: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '18px', fontSize: '13px', color: '#5f6368', borderBottom: '1px solid #e0e0e0', fontWeight: '600', backgroundColor: '#fafafa' },
  td: { padding: '18px', fontSize: '14px', borderBottom: '1px solid #f0f0f0', color: '#333' }
};

export default App;