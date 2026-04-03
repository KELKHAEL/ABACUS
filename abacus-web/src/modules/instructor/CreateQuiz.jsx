import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { 
  Trash2, Plus, X, Check, 
  AlignLeft, CheckSquare, 
  Circle, MoreVertical, Save,
  Target, BarChart, Clock
} from 'lucide-react';
import './Instructor.css';

export default function CreateQuiz({ setActiveTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editQuizId, setEditQuizId] = useState(null);

  const [myClasses, setMyClasses] = useState([]);
  const [selectedClassStr, setSelectedClassStr] = useState("ALL-ALL"); 

  const [quizTitle, setQuizTitle] = useState("");
  const [quizDesc, setQuizDesc] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [questions, setQuestions] = useState([
    { 
      id: Date.now(), 
      questionText: "", 
      options: [""], 
      correctIndex: 0, 
      correctIndices: [],
      correctAnswerText: "", 
      type: "multiple-choice" 
    }
  ]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  // --- 1. LOAD INSTRUCTOR CLASSES ---
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        let classes = [];
        
        if (user.assigned_classes) {
            classes = typeof user.assigned_classes === 'string' ? JSON.parse(user.assigned_classes) : user.assigned_classes;
        } else if (user.assignedClasses) {
            classes = user.assignedClasses;
        }

        if (!Array.isArray(classes)) classes = [];
        setMyClasses(classes);
      } catch (e) {
        console.error("Error parsing user classes:", e);
        setMyClasses([]);
      }
    }
  }, []);

  // --- 2. HANDLE EDIT MODE ---
  useEffect(() => {
    if (location.state && location.state.quizToEdit) {
      const q = location.state.quizToEdit;
      setIsEditing(true);
      setEditQuizId(q.id);
      setQuizTitle(q.title || "");
      setQuizDesc(q.description || "");
      
      if (q.target_year && q.target_section) {
          setSelectedClassStr(`${q.target_year}-${q.target_section}`);
      }
      
      if (q.due_date) {
         const dateObj = new Date(q.due_date);
         dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());
         setDueDate(dateObj.toISOString().slice(0, 16));
      }
      
      if (q.questions && q.questions.length > 0) {
          const hydratedQuestions = q.questions.map(question => {
            if (question.type === 'checkbox') {
              return { 
                ...question, 
                correctIndices: question.correct_answer_text ? question.correct_answer_text.split(',').map(Number) : [] 
              };
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
    setQuestions([...questions, { 
      id: newId, 
      questionText: "", 
      options: [""], 
      correctIndex: 0, 
      correctIndices: [],
      correctAnswerText: "", 
      type: "multiple-choice"
    }]);
    setActiveQuestion(newId);
  };

  const updateQuestion = (idx, field, value) => {
    const newQ = [...questions];
    newQ[idx][field] = value;
    
    // ✅ FIX: Clear out the text string to prevent "1,2,0" from appearing in Identification
    if (field === 'type') {
      newQ[idx].correctIndex = 0;
      newQ[idx].correctIndices = [];
      newQ[idx].correctAnswerText = ""; 
    }
    
    setQuestions(newQ);
  };

  const updateOption = (qIdx, oIdx, text) => {
    const newQ = [...questions];
    newQ[qIdx].options[oIdx] = text;
    setQuestions(newQ);
  };

  const addOption = (qIdx) => {
    const newQ = [...questions];
    newQ[qIdx].options.push("");
    setQuestions(newQ);
  };

  const removeOption = (qIdx, oIdx) => {
    const newQ = [...questions];
    if (newQ[qIdx].options.length <= 1) return;
    newQ[qIdx].options.splice(oIdx, 1);
    
    if (newQ[qIdx].correctIndex >= newQ[qIdx].options.length) newQ[qIdx].correctIndex = 0;
    
    if (newQ[qIdx].type === 'checkbox') {
      newQ[qIdx].correctIndices = newQ[qIdx].correctIndices
        .filter(i => i !== oIdx)
        .map(i => i > oIdx ? i - 1 : i);
    }
    
    setQuestions(newQ);
  };

  const toggleCorrectAnswer = (qIdx, oIdx) => {
    const newQ = [...questions];
    const q = newQ[qIdx];
    
    if (q.type === 'checkbox') {
      if (!q.correctIndices) q.correctIndices = [];
      if (q.correctIndices.includes(oIdx)) {
        q.correctIndices = q.correctIndices.filter(i => i !== oIdx);
      } else {
        q.correctIndices.push(oIdx);
      }
      q.correctAnswerText = q.correctIndices.join(',');
      q.correctIndex = 0; 
    } else {
      q.correctIndex = oIdx;
    }
    
    setQuestions(newQ);
  };

  const deleteQuestion = (qIdx) => {
    if (questions.length <= 1) return alert("Quiz must have at least one question.");
    const newQ = [...questions];
    newQ.splice(qIdx, 1);
    setQuestions(newQ);
  };

  // --- 3. SAVE TO MYSQL ---
  const publishQuiz = async () => {
    if (!quizTitle.trim()) return alert("Please enter a Quiz Title.");
    if (!selectedClassStr) return alert("Please select a target class.");

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
        questions: questions 
      };

      let url = 'http://localhost:5000/quizzes';
      let method = 'POST';

      if (isEditing) {
        url = `http://localhost:5000/quizzes/${editQuizId}`;
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
        else navigate('/instructor/InstructorDashboard'); 
      } else {
        throw new Error(data.error);
      }

    } catch (e) {
      console.error(e);
      alert("Error publishing quiz: " + e.message);
    }
  };

  return (
    <div className="create-quiz-wrapper">
      <div className="quiz-container-center">
        
        {/* TITLE CARD */}
        <div className="quiz-title-card">
          <div className="top-accent"></div>
          <input 
            className="input-title-large" 
            value={quizTitle} 
            onChange={(e) => setQuizTitle(e.target.value)} 
            placeholder="Untitled Quiz" 
          />
          <input 
            className="input-desc" 
            value={quizDesc} 
            onChange={(e) => setQuizDesc(e.target.value)} 
            placeholder="Form description" 
          />

          {/* TARGET SETTINGS */}
          <div style={{marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
            
            <div style={{flex: 1, minWidth: '250px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <Target size={14}/> TARGET CLASS
                </label>
                
                <select 
                    style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', background: '#f9fafb'}}
                    value={selectedClassStr}
                    onChange={(e) => setSelectedClassStr(e.target.value)}
                >
                    <option value="ALL-ALL" style={{fontWeight: 'bold'}}>All Assigned Classes</option>
                    {myClasses.map((cls, idx) => (
                        <option key={idx} value={`${cls.year}-${cls.section}`}>
                            Year {cls.year} - Section {cls.section}
                        </option>
                    ))}
                </select>
                {myClasses.length === 0 && (
                    <div style={{fontSize:'13px', color:'#ef4444', padding:'8px', marginTop:'5px', background:'#fee2e2', borderRadius:'4px'}}>
                        Warning: No classes assigned to your account.
                    </div>
                )}
            </div>

            <div style={{flex: 1, minWidth: '200px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#ef4444', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <Clock size={14}/> DEADLINE / DUE DATE
                </label>
                <input 
                    type="datetime-local"
                    style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ef4444', color: '#111', fontWeight: 'bold'}}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                />
            </div>

          </div>
        </div>

        {/* QUESTIONS LIST */}
        {questions.map((q, qIdx) => (
          <div 
            key={q.id} 
            className={`question-card-modern ${activeQuestion === q.id ? 'active' : ''}`}
            onClick={() => setActiveQuestion(q.id)}
          >
            <div className="drag-handle-modern"><MoreVertical size={16} color="#e0e0e0" /></div>
            
            <div className="q-header-row">
              <input 
                className="input-question-text" 
                value={q.questionText} 
                onChange={(e) => updateQuestion(qIdx, 'questionText', e.target.value)} 
                placeholder="Question" 
              />
              
              <div className="select-wrapper">
                {q.type === 'multiple-choice' && <Circle size={18} className="select-icon" />}
                {q.type === 'checkbox' && <CheckSquare size={18} className="select-icon" />}
                {q.type === 'short' && <AlignLeft size={18} className="select-icon" />}
                
                <select 
                  className="type-select-modern" 
                  value={q.type} 
                  onChange={(e) => updateQuestion(qIdx, 'type', e.target.value)}
                >
                  <option value="multiple-choice">Multiple choice</option>
                  <option value="checkbox">Checkboxes</option>
                  <option value="short">Identification</option>
                </select>
              </div>
            </div>

            <div className="q-body">
              {/* IDENTIFICATION (SHORT ANSWER) */}
              {q.type === 'short' && (
                <div className="short-answer-box">
                  <div className="short-label">Correct Answer Key:</div>
                  <input 
                    type="text" 
                    className="input-short-answer" 
                    value={q.correctAnswerText} 
                    onChange={(e) => updateQuestion(qIdx, 'correctAnswerText', e.target.value)} 
                    placeholder="Type the correct answer here..." 
                  />
                  <div className="helper-text">Answers will be auto-graded (case-insensitive).</div>
                </div>
              )}

              {/* OPTIONS (MULTIPLE CHOICE & CHECKBOX) */}
              {(q.type === 'multiple-choice' || q.type === 'checkbox') && (
                <div className="options-container">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = q.type === 'checkbox' 
                        ? q.correctIndices?.includes(oIdx) 
                        : q.correctIndex === oIdx;

                    return (
                        <div key={oIdx} className="option-line">
                        
                        <div 
                            className={`selector-icon ${isCorrect ? 'correct' : ''}`}
                            style={{ borderRadius: q.type === 'checkbox' ? '4px' : '50%' }}
                            onClick={() => toggleCorrectAnswer(qIdx, oIdx)}
                            title={q.type === 'checkbox' ? "Click to toggle correct answer" : "Click to mark as Correct Answer"}
                        >
                            {isCorrect ? <Check size={14} color="white" /> : null}
                        </div>

                        <input 
                            className={`input-option ${isCorrect ? 'correct-text' : ''}`}
                            value={opt} 
                            onChange={(e) => updateOption(qIdx, oIdx, e.target.value)} 
                            placeholder={`Option ${oIdx + 1}`} 
                        />

                        {q.options.length > 1 && (
                            <button className="btn-remove-opt" onClick={() => removeOption(qIdx, oIdx)}>
                            <X size={18} />
                            </button>
                        )}
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
                  <span className="correct-answer-hint">
                    <Check size={14} /> Mark the correct answer(s) using the indicator on the left.
                  </span>
                )}
              </div>

              <div className="footer-actions">
                <button className="icon-action-btn" onClick={() => deleteQuestion(qIdx)} title="Delete Question">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* ADD BUTTON */}
        <div className="floating-tools">
          <button className="tool-btn add" onClick={addNewQuestion} title="Add Question">
            <Plus size={24} />
          </button>
        </div>

      </div>

      {/* PUBLISH BAR */}
      <div className="bottom-publish-bar">
        <div className="bar-content" style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
            <button 
                className="btn-cancel" 
                onClick={() => {
                    if(window.confirm("Are you sure you want to exit? Unsaved changes will be lost.")) {
                        if (setActiveTab) setActiveTab('dashboard');
                        else navigate('/instructor/ManageQuizzes'); 
                    }
                }}
                style={{background: 'white', border: '1px solid #d1d5db', color: '#4b5563', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold'}}
            >
                Cancel
            </button>
            <span className="draft-status">{isEditing ? "Editing Existing Quiz" : "Draft saved locally"}</span>
          </div>
          <button className="btn-publish-final" onClick={publishQuiz}>
            <Save size={18} /> {isEditing ? "Update Quiz" : "Publish Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}