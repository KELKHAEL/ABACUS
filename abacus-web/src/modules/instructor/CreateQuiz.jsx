import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { 
  Trash2, Plus, X, Check, 
  AlignLeft, CheckSquare, 
  Circle, MoreVertical, Save,
  Target, BarChart
} from 'lucide-react';
import './Instructor.css';

export default function CreateQuiz({ setActiveTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editQuizId, setEditQuizId] = useState(null);

  // Instructor's Assigned Classes (Fetched from local storage or API)
  const [myClasses, setMyClasses] = useState([]);
  
  // Selected Target Class (Combined Year & Section)
  // We'll store it as a string like "1-1" (Year-Section) for easier handling in a single select
  const [selectedClassStr, setSelectedClassStr] = useState(""); 

  // Form State
  const [quizTitle, setQuizTitle] = useState("Untitled Quiz");
  const [quizDesc, setQuizDesc] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");

  const [questions, setQuestions] = useState([
    { id: Date.now(), questionText: "", options: ["Option 1"], correctIndex: 0, correctAnswerText: "", type: "multiple-choice", required: true }
  ]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  // --- 1. LOAD INSTRUCTOR CLASSES ---
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Ensure assignedClasses exists and is an array
        let classes = [];
        
        // Check for different possible property names/structures
        if (user.assigned_classes) {
            // If it came from MySQL login as a JSON string or object
            classes = typeof user.assigned_classes === 'string' ? JSON.parse(user.assigned_classes) : user.assigned_classes;
        } else if (user.assignedClasses) {
            // If it came from Firebase or pre-parsed object
            classes = user.assignedClasses;
        }

        // Ensure classes is an array
        if (!Array.isArray(classes)) {
            classes = [];
        }

        setMyClasses(classes);
        
        // Default to the first class if available and nothing selected yet
        if (classes.length > 0 && !selectedClassStr) {
          setSelectedClassStr(`${classes[0].year}-${classes[0].section}`);
        }
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
      setQuizTitle(q.title);
      setQuizDesc(q.description || "");
      
      // Set the dropdown to match the quiz's target
      if (q.target_year && q.target_section) {
          setSelectedClassStr(`${q.target_year}-${q.target_section}`);
      }
      
      setDifficulty(q.difficulty || "Easy");
      
      if (q.questions && q.questions.length > 0) {
          setQuestions(q.questions);
      }
    }
  }, [location.state]);

  // --- LOGIC: Question Management ---
  const addNewQuestion = () => {
    const newId = Date.now();
    setQuestions([...questions, { 
      id: newId, 
      questionText: "", 
      options: ["Option 1"], 
      correctIndex: 0, 
      correctAnswerText: "", 
      type: "multiple-choice", 
      required: false 
    }]);
    setActiveQuestion(newId);
  };

  const updateQuestion = (idx, field, value) => {
    const newQ = [...questions];
    newQ[idx][field] = value;
    setQuestions(newQ);
  };

  const updateOption = (qIdx, oIdx, text) => {
    const newQ = [...questions];
    newQ[qIdx].options[oIdx] = text;
    setQuestions(newQ);
  };

  const addOption = (qIdx) => {
    const newQ = [...questions];
    newQ[qIdx].options.push(`Option ${newQ[qIdx].options.length + 1}`);
    setQuestions(newQ);
  };

  const removeOption = (qIdx, oIdx) => {
    const newQ = [...questions];
    if (newQ[qIdx].options.length <= 1) return;
    newQ[qIdx].options.splice(oIdx, 1);
    if (newQ[qIdx].correctIndex >= newQ[qIdx].options.length) newQ[qIdx].correctIndex = 0;
    setQuestions(newQ);
  };

  const setCorrectIndex = (qIdx, oIdx) => {
    const newQ = [...questions];
    newQ[qIdx].correctIndex = oIdx;
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

    // Validation
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) return alert(`Question ${i + 1} is missing text.`);
      if (questions[i].type === 'short' && !questions[i].correctAnswerText.trim()) return alert(`Question ${i + 1} needs a correct answer key.`);
      if (questions[i].type !== 'short' && questions[i].options.some(o => !o.trim())) return alert(`Question ${i + 1} has empty options.`);
    }

    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user) return alert("You must be logged in.");

      // Parse the "Year-Section" string back into separate values
      const [tYear, tSection] = selectedClassStr.split('-');

      const payload = {
        title: quizTitle,
        description: quizDesc,
        targetYear: tYear,
        targetSection: tSection,
        difficulty: difficulty,
        createdBy: user.id,
        questions: questions // Send the whole array
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
        else navigate('/instructor/InstructorDashboard'); // Safer navigation
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
            
            {/* Target Class Selector */}
            <div style={{flex: 1, minWidth: '250px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <Target size={14}/> TARGET CLASS
                </label>
                
                {myClasses.length > 0 ? (
                    <select 
                        style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', background: '#f9fafb'}}
                        value={selectedClassStr}
                        onChange={(e) => setSelectedClassStr(e.target.value)}
                    >
                        {myClasses.map((cls, idx) => (
                            <option key={idx} value={`${cls.year}-${cls.section}`}>
                                Year {cls.year} - Section {cls.section}
                            </option>
                        ))}
                    </select>
                ) : (
                    <div style={{fontSize:'13px', color:'#ef4444', padding:'8px', background:'#fee2e2', borderRadius:'4px'}}>
                        No classes assigned to your account. Contact Admin.
                    </div>
                )}
            </div>

            {/* Difficulty */}
            <div style={{flex: 1, minWidth: '150px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <BarChart size={14}/> DIFFICULTY
                </label>
                <select 
                    style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd'}}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
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
                  <option value="short">Short answer</option>
                </select>
              </div>
            </div>

            <div className="q-body">
              {/* SHORT ANSWER */}
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

              {/* OPTIONS */}
              {(q.type === 'multiple-choice' || q.type === 'checkbox') && (
                <div className="options-container">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className="option-line">
                      
                      {/* SELECTION MARKER */}
                      <div 
                        className={`selector-icon ${q.correctIndex === oIdx ? 'correct' : ''}`}
                        onClick={() => setCorrectIndex(qIdx, oIdx)}
                        title="Click to mark as Correct Answer"
                      >
                        {q.correctIndex === oIdx ? <Check size={14} color="white" /> : null}
                      </div>

                      <input 
                        className={`input-option ${q.correctIndex === oIdx ? 'correct-text' : ''}`}
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
                  ))}
                  
                  <div className="add-option-line" onClick={() => addOption(qIdx)}>
                    <div className="selector-icon placeholder"></div>
                    <span>Add option</span>
                  </div>
                </div>
              )}
            </div>

            <div className="q-footer">
              <div className="footer-start">
                {(q.type === 'multiple-choice' || q.type === 'checkbox') && (
                  <span className="correct-answer-hint">
                    <Check size={14} /> Mark the correct answer using the circle/box on the left.
                  </span>
                )}
              </div>

              <div className="footer-actions">
                <button className="icon-action-btn" onClick={() => deleteQuestion(qIdx)} title="Delete">
                  <Trash2 size={20} />
                </button>
                <div className="v-divider"></div>
                <div className="toggle-wrapper">
                  <span className="toggle-label">Required</span>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={q.required} 
                      onChange={() => updateQuestion(qIdx, 'required', !q.required)} 
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
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
        <div className="bar-content">
          <span className="draft-status">{isEditing ? "Editing Existing Quiz" : "Draft saved locally"}</span>
          <button className="btn-publish-final" onClick={publishQuiz}>
            <Save size={18} /> {isEditing ? "Update Quiz" : "Publish Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}