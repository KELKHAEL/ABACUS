import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { 
  Trash2, Plus, X, Check, 
  GripVertical, AlignLeft, CheckSquare, 
  Circle, MoreVertical, Save,
  Target, BarChart
} from 'lucide-react';

export default function CreateQuiz({ setActiveTab }) {
  const [quizTitle, setQuizTitle] = useState("Untitled Quiz");
  const [quizDesc, setQuizDesc] = useState("");
  
  // --- NEW STATES FOR TARGET AUDIENCE ---
  const [targetYear, setTargetYear] = useState("1");
  const [targetSection, setTargetSection] = useState("1");
  const [difficulty, setDifficulty] = useState("Easy");
  // --------------------------------------

  const [questions, setQuestions] = useState([
    { id: Date.now(), questionText: "", options: ["Option 1"], correctIndex: 0, correctAnswerText: "", type: "multiple-choice", required: true }
  ]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  // --- LOGIC ---
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

  const publishQuiz = async () => {
    if (!quizTitle.trim()) return alert("Please enter a Quiz Title.");

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) return alert(`Question ${i + 1} is missing text.`);
      if (questions[i].type === 'short' && !questions[i].correctAnswerText.trim()) return alert(`Question ${i + 1} needs a correct answer key.`);
      if (questions[i].type !== 'short' && questions[i].options.some(o => !o.trim())) return alert(`Question ${i + 1} has empty options.`);
    }

    try {
      const cleanQuestions = questions.map(({ id, ...rest }) => rest);
      await addDoc(collection(db, "quizzes"), {
        title: quizTitle,
        description: quizDesc,
        
        // SAVE TARGET AUDIENCE DATA
        targetYear: targetYear,
        targetSection: targetSection,
        difficulty: difficulty,
        // -------------------------

        status: 'active',
        
        questions: cleanQuestions,
        createdAt: new Date().toISOString(),
        createdBy: "Instructor" // Ideally replace with auth.currentUser.uid
      });
      alert("Quiz Published Successfully!");
      setActiveTab('dashboard');
    } catch (e) {
      console.error(e);
      alert("Error publishing quiz.");
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

          {/* --- NEW: TARGET SETTINGS --- */}
          <div style={{marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
            
            {/* Target Year & Section */}
            <div style={{flex: 1, minWidth: '200px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <Target size={14}/> TARGET CLASS
                </label>
                <div style={{display: 'flex', gap: '10px'}}>
                    <select 
                        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ddd', flex: 1}}
                        value={targetYear}
                        onChange={(e) => setTargetYear(e.target.value)}
                    >
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                    <select 
                        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ddd', flex: 1}}
                        value={targetSection}
                        onChange={(e) => setTargetSection(e.target.value)}
                    >
                        <option value="1">Section 1</option>
                        <option value="2">Section 2</option>
                        <option value="3">Section 3</option>
                        <option value="4">Section 4</option>
                    </select>
                </div>
            </div>

            {/* Difficulty */}
            <div style={{flex: 1, minWidth: '150px'}}>
                <label style={{fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <BarChart size={14}/> DIFFICULTY
                </label>
                <select 
                    style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd'}}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>

          </div>
          {/* ---------------------------- */}

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
                      
                      {/* SELECTION CIRCLE/BOX */}
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
                {/* Visual hint for correct answer */}
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

        {/* FLOATING SIDE MENU (Desktop) OR BOTTOM FAB (Mobile) */}
        <div className="floating-tools">
          <button className="tool-btn add" onClick={addNewQuestion} title="Add Question">
            <Plus size={24} />
          </button>
        </div>

      </div>

      {/* BOTTOM ACTION BAR */}
      <div className="bottom-publish-bar">
        <div className="bar-content">
          <span className="draft-status">Draft saved locally</span>
          <button className="btn-publish-final" onClick={publishQuiz}>
            <Save size={18} /> Publish Quiz
          </button>
        </div>
      </div>
    </div>
  );
}