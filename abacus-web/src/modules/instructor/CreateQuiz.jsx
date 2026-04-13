import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { 
  Trash2, Plus, X, Check, 
  AlignLeft, CheckSquare, 
  Circle, MoreVertical, Save,
  Target, Clock, RotateCcw
} from 'lucide-react';
import './Instructor.css';

export default function CreateQuiz({ setActiveTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editQuizId, setEditQuizId] = useState(null);

  // Retake States
  const [isRetake, setIsRetake] = useState(false);
  const [parentQuizId, setParentQuizId] = useState(null);
  const [penalty, setPenalty] = useState(2); // Default to 2 points
  const [targetStudents, setTargetStudents] = useState([]);
  
  const [allInstructorStudents, setAllInstructorStudents] = useState([]);
  const [classStudents, setClassStudents] = useState([]);

  const [myClasses, setMyClasses] = useState([]);
  const [selectedClassStr, setSelectedClassStr] = useState("ALL-ALL"); 

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [questions, setQuestions] = useState([
    { 
      id: Date.now(), questionText: "", options: [""], 
      correctIndex: 0, correctIndices: [], correctAnswerText: "", type: "multiple-choice" 
    }
  ]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  // --- 1. LOAD INSTRUCTOR CLASSES & STUDENTS ---
  useEffect(() => {
    const fetchDashboard = async () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);

          // 1. Fetch students for Retake selection
          const res = await fetch(`https://abacus-w435.onrender.com/instructor/dashboard/${user.id}`);
          const data = await res.json();
          setAllInstructorStudents(data.students || []);

          // 2. ✅ BULLETPROOF FIX: Fetch fresh assigned classes from DB just in case localStorage is missing it
          const usersRes = await fetch('https://abacus-w435.onrender.com/users?role=INSTRUCTOR');
          const usersData = await usersRes.json();
          const currentInstructor = usersData.find(u => u.id === user.id);
          
          let classes = currentInstructor?.assigned_classes || user.assigned_classes || "[]";
          if (typeof classes === 'string') classes = JSON.parse(classes);
          
          setMyClasses(Array.isArray(classes) ? classes : []);

        } catch (e) { console.error("Error loading dashboard data:", e); }
      }
    };
    fetchDashboard();
  }, []);

  // Filter students to only show ones in the selected class (for Retake selection)
  useEffect(() => {
    if (selectedClassStr !== 'ALL-ALL') {
        const [y, s] = selectedClassStr.split('-');
        setClassStudents(allInstructorStudents.filter(st => String(st.year_level) === String(y) && String(st.section) === String(s)));
    } else {
        setClassStudents([]);
    }
  }, [selectedClassStr, allInstructorStudents]);

  // --- 2. HANDLE EDIT OR RETAKE MODE ---
  useEffect(() => {
    if (location.state) {
      const q = location.state.quizToEdit || location.state.retakeParentQuiz;
      if (!q) return;

      if (location.state.retakeParentQuiz) {
          // SETUP RETAKE MODE
          setIsRetake(true);
          setParentQuizId(q.id);
          setQuizTitle(`[RETAKE] ${q.title}`);
          setQuizDesc(`Retake assignment. Note: A point penalty deduction will be applied to the final score.`);
      } else {
          // NORMAL EDIT MODE
          setIsEditing(true);
          setEditQuizId(q.id);
          setQuizTitle(q.title || "");
          setQuizDesc(q.description || "");
          if (q.is_retake) {
              setIsRetake(true);
              setParentQuizId(q.parent_quiz_id);
              setPenalty(q.penalty || 0);
              try { setTargetStudents(JSON.parse(q.target_students || '[]')); } catch(e){}
          }
      }
      
      if (q.target_year && q.target_section) {
          setSelectedClassStr(`${q.target_year}-${q.target_section}`);
      }
      
      if (q.due_date && !location.state.retakeParentQuiz) { // Don't copy old due date for retakes
         const dateObj = new Date(q.due_date);
         dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
         setDueDate(dateObj.toISOString().slice(0, 16));
      }
      
      if (q.questions && q.questions.length > 0) {
          const hydratedQuestions = q.questions.map(question => {
            if (question.type === 'checkbox') {
              return { ...question, correctIndices: question.correct_answer_text ? question.correct_answer_text.split(',').map(Number) : [] };
            }
            return { ...question, correctIndices: [] };
          });
          setQuestions(hydratedQuestions);
      }
    }
  }, [location.state]);

  // --- LOGIC: Question Management ---
  const addNewQuestion = () => {
    const newId = Date.now();
    setQuestions([...questions, { id: newId, questionText: "", options: [""], correctIndex: 0, correctIndices: [], correctAnswerText: "", type: "multiple-choice" }]);
    setActiveQuestion(newId);
  };

  const updateQuestion = (idx, field, value) => {
    const newQ = [...questions];
    newQ[idx][field] = value;
    if (field === 'type') { newQ[idx].correctIndex = 0; newQ[idx].correctIndices = []; newQ[idx].correctAnswerText = ""; }
    setQuestions(newQ);
  };

  const updateOption = (qIdx, oIdx, text) => {
    const newQ = [...questions]; newQ[qIdx].options[oIdx] = text; setQuestions(newQ);
  };

  const addOption = (qIdx) => {
    const newQ = [...questions]; newQ[qIdx].options.push(""); setQuestions(newQ);
  };

  const removeOption = (qIdx, oIdx) => {
    const newQ = [...questions];
    if (newQ[qIdx].options.length <= 1) return;
    newQ[qIdx].options.splice(oIdx, 1);
    if (newQ[qIdx].correctIndex >= newQ[qIdx].options.length) newQ[qIdx].correctIndex = 0;
    if (newQ[qIdx].type === 'checkbox') {
      newQ[qIdx].correctIndices = newQ[qIdx].correctIndices.filter(i => i !== oIdx).map(i => i > oIdx ? i - 1 : i);
    }
    setQuestions(newQ);
  };

  const toggleCorrectAnswer = (qIdx, oIdx) => {
    const newQ = [...questions];
    const q = newQ[qIdx];
    if (q.type === 'checkbox') {
      if (!q.correctIndices) q.correctIndices = [];
      if (q.correctIndices.includes(oIdx)) q.correctIndices = q.correctIndices.filter(i => i !== oIdx);
      else q.correctIndices.push(oIdx);
      q.correctAnswerText = q.correctIndices.join(',');
      q.correctIndex = 0; 
    } else {
      q.correctIndex = oIdx;
    }
    setQuestions(newQ);
  };

  const deleteQuestion = (qIdx) => {
    if (questions.length <= 1) return alert("Quiz must have at least one question.");
    const newQ = [...questions]; newQ.splice(qIdx, 1); setQuestions(newQ);
  };

  const toggleTargetStudent = (id) => {
      setTargetStudents(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleSelectAllStudents = (e) => {
      if (e.target.checked) {
          setTargetStudents(classStudents.map(s => s.id));
      } else {
          setTargetStudents([]);
      }
  };
  const isAllSelected = classStudents.length > 0 && targetStudents.length === classStudents.length;

  // --- 3. SAVE TO MYSQL ---
  const publishQuiz = async () => {
    if (!quizTitle.trim()) return alert("Please enter a Quiz Title.");
    if (!selectedClassStr) return alert("Please select a target class.");
    if (isRetake && targetStudents.length === 0) return alert("Please select at least one student for the Retake.");

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) return alert(`Question ${i + 1} is missing text.`);
      if (questions[i].type === 'short' && !questions[i].correctAnswerText.trim()) return alert(`Question ${i + 1} needs a correct answer key.`);
      if (questions[i].type !== 'short' && questions[i].options.some(o => !o.trim())) return alert(`Question ${i + 1} has empty options.`);
      if (questions[i].type === 'checkbox' && (!questions[i].correctIndices || questions[i].correctIndices.length === 0)) return alert(`Question ${i + 1} needs at least one correct checkbox selected.`);
    }

    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user) return alert("You must be logged in.");

      const [tYear, tSection] = selectedClassStr.split('-');

      const payload = {
        title: quizTitle,
        description: quizDesc,
        targetYear: tYear,
        targetSection: tSection,
        dueDate: dueDate,
        createdBy: user.id,
        questions: questions,
        isRetake: isRetake,
        parentQuizId: parentQuizId,
        targetStudents: targetStudents,
        penalty: parseInt(penalty)
      };

      let url = 'https://abacus-w435.onrender.com/quizzes';
      let method = 'POST';

      if (isEditing) {
        url = `https://abacus-w435.onrender.com/quizzes/${editQuizId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        alert(isEditing ? "Quiz Updated!" : "Quiz Published Successfully!");
        if (setActiveTab) setActiveTab('dashboard');
        else navigate('/instructor/ManageQuizzes'); 
      } else { throw new Error(data.error); }
    } catch (e) { alert("Error publishing quiz: " + e.message); }
  };

  return (
    <div className="create-quiz-wrapper">
      <div className="quiz-container-center">
        
        <div className="quiz-title-card">
          <div className="top-accent" style={{background: isRetake ? '#eab308' : '#104a28'}}></div>
          <input className="input-title-large" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} placeholder="Untitled Quiz" />
          <input className="input-desc" value={quizDesc} onChange={(e) => setQuizDesc(e.target.value)} placeholder="Form description" />

          {/* TARGET SETTINGS */}
          <div style={{marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: '250px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <Target size={14}/> TARGET CLASS
                </label>
                <select 
                    style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', background: '#f9fafb'}}
                    value={selectedClassStr}
                    onChange={(e) => { setSelectedClassStr(e.target.value); setTargetStudents([]); }}
                    disabled={isRetake && isEditing} // Prevent changing target class on existing retakes
                >
                    {!isRetake && <option value="ALL-ALL" style={{fontWeight: 'bold'}}>All Assigned Classes</option>}
                    {isRetake && <option value="ALL-ALL" disabled>Select a Specific Class First</option>}
                    {myClasses.map((cls, idx) => (
                        <option key={idx} value={`${cls.year}-${cls.section}`}>Year {cls.year} - Section {cls.section}</option>
                    ))}
                </select>
            </div>

            <div style={{flex: 1, minWidth: '200px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#ef4444', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <Clock size={14}/> DEADLINE / DUE DATE
                </label>
                <input 
                    type="datetime-local"
                    style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ef4444', color: '#111', fontWeight: 'bold'}}
                    value={dueDate} onChange={(e) => setDueDate(e.target.value)} required
                />
            </div>
          </div>

          {/* RETAKE SETTINGS PANEL */}
          {isRetake && (
             <div style={{marginTop: '20px', padding: '20px', background: '#fefce8', border: '1px solid #fde047', borderRadius: '8px'}}>
                 <h4 style={{color: '#854d0e', marginTop: 0, display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px'}}><RotateCcw size={18}/> Retake Settings</h4>
                 <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                     <div style={{flex: 1, minWidth: '150px'}}>
                         <label style={{fontSize: '12px', fontWeight: 'bold', color: '#854d0e'}}>Score Penalty Deduction (Points)</label>
                         <p style={{fontSize: '11px', color: '#a16207', margin: '2px 0 8px 0'}}>Exact points to subtract from final score.</p>
                         <input 
                             type="number" 
                             style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #fde047', background: 'white'}}
                             value={penalty} 
                             onChange={e => setPenalty(e.target.value)} 
                             min="0"
                         />
                     </div>
                     <div style={{flex: 2, minWidth: '250px'}}>
                         <label style={{fontSize: '12px', fontWeight: 'bold', color: '#854d0e'}}>Select Students for Retake</label>
                         <p style={{fontSize: '11px', color: '#a16207', margin: '2px 0 8px 0'}}>Only these students will see the Retake quiz.</p>
                         
                         <div style={{maxHeight: '180px', overflowY: 'auto', background: 'white', padding: '10px', border: '1px solid #fde047', borderRadius: '4px'}}>
                            {classStudents.length > 0 && (
                                <label style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', borderBottom: '2px solid #ca8a04', cursor: 'pointer', marginBottom: '5px'}}>
                                  <input type="checkbox" checked={isAllSelected} onChange={handleSelectAllStudents} style={{transform: 'scale(1.2)'}}/> 
                                  <span style={{fontWeight: 'bold', color: '#854d0e', fontSize: '14px'}}>Select All Students</span>
                                </label>
                            )}

                            {classStudents.map(s => (
                                <label key={s.id} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '5px', borderBottom: '1px solid #fef08a', cursor: 'pointer'}}>
                                  <input type="checkbox" checked={targetStudents.includes(s.id)} onChange={() => toggleTargetStudent(s.id)} style={{transform: 'scale(1.2)'}}/> 
                                  <span style={{fontWeight: '600', color: '#4b5563', fontSize: '14px'}}>{s.full_name}</span>
                                </label>
                            ))}
                            {classStudents.length === 0 && <span style={{color:'#999', fontSize:'12px'}}>Select a specific target class above to load students.</span>}
                         </div>
                     </div>
                 </div>
             </div>
          )}
        </div>

        {/* QUESTIONS LIST */}
        {questions.map((q, qIdx) => (
          <div key={q.id} className={`question-card-modern ${activeQuestion === q.id ? 'active' : ''}`} onClick={() => setActiveQuestion(q.id)}>
            <div className="drag-handle-modern"><MoreVertical size={16} color="#e0e0e0" /></div>
            
            <div className="q-header-row">
              <input className="input-question-text" value={q.questionText} onChange={(e) => updateQuestion(qIdx, 'questionText', e.target.value)} placeholder="Question" />
              <div className="select-wrapper">
                {q.type === 'multiple-choice' && <Circle size={18} className="select-icon" />}
                {q.type === 'checkbox' && <CheckSquare size={18} className="select-icon" />}
                {q.type === 'short' && <AlignLeft size={18} className="select-icon" />}
                
                <select className="type-select-modern" value={q.type} onChange={(e) => updateQuestion(qIdx, 'type', e.target.value)}>
                  <option value="multiple-choice">Multiple choice</option>
                  <option value="checkbox">Checkboxes</option>
                  <option value="short">Identification</option>
                </select>
              </div>
            </div>

            <div className="q-body">
              {q.type === 'short' && (
                <div className="short-answer-box">
                  <div className="short-label">Correct Answer Key:</div>
                  <input type="text" className="input-short-answer" value={q.correctAnswerText} onChange={(e) => updateQuestion(qIdx, 'correctAnswerText', e.target.value)} placeholder="Type the correct answer here..." />
                  <div className="helper-text">Answers will be auto-graded (case-insensitive).</div>
                </div>
              )}

              {(q.type === 'multiple-choice' || q.type === 'checkbox') && (
                <div className="options-container">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = q.type === 'checkbox' ? q.correctIndices?.includes(oIdx) : q.correctIndex === oIdx;
                    return (
                        <div key={oIdx} className="option-line">
                        <div className={`selector-icon ${isCorrect ? 'correct' : ''}`} style={{ borderRadius: q.type === 'checkbox' ? '4px' : '50%' }} onClick={() => toggleCorrectAnswer(qIdx, oIdx)}>
                            {isCorrect ? <Check size={14} color="white" /> : null}
                        </div>
                        <input className={`input-option ${isCorrect ? 'correct-text' : ''}`} value={opt} onChange={(e) => updateOption(qIdx, oIdx, e.target.value)} placeholder={`Option ${oIdx + 1}`} />
                        {q.options.length > 1 && (<button className="btn-remove-opt" onClick={() => removeOption(qIdx, oIdx)}><X size={18} /></button>)}
                        </div>
                    );
                  })}
                  <div className="add-option-line" onClick={() => addOption(qIdx)}>
                    <div className="selector-icon placeholder" style={{ borderRadius: q.type === 'checkbox' ? '4px' : '50%' }}></div>
                    <span>Add option</span>
                  </div>
                </div>
              )}
            </div>

            <div className="q-footer">
              <div className="footer-start">
                {(q.type === 'multiple-choice' || q.type === 'checkbox') && (
                  <span className="correct-answer-hint"><Check size={14} /> Mark the correct answer(s) using the indicator on the left.</span>
                )}
              </div>
              <div className="footer-actions">
                <button className="icon-action-btn" onClick={() => deleteQuestion(qIdx)} title="Delete Question"><Trash2 size={20} /></button>
              </div>
            </div>
          </div>
        ))}

        <div className="floating-tools">
          <button className="tool-btn add" onClick={addNewQuestion} title="Add Question"><Plus size={24} /></button>
        </div>

      </div>

      <div className="bottom-publish-bar">
        <div className="bar-content" style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
            <button className="btn-cancel" onClick={() => { if(window.confirm("Exit without saving?")) navigate('/instructor/ManageQuizzes'); }} style={{background: 'white', border: '1px solid #d1d5db', color: '#4b5563', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'}}>Cancel</button>
            <span className="draft-status">{isEditing ? "Editing Quiz" : "Draft saved locally"}</span>
          </div>
          <button className="btn-publish-final" onClick={publishQuiz} style={isRetake ? {background: '#ca8a04'} : {}}>
            <Save size={18} /> {isEditing ? "Update Quiz" : (isRetake ? "Publish Retake" : "Publish Quiz")}
          </button>
        </div>
      </div>
    </div>
  );
}