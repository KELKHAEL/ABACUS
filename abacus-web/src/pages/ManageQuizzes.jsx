import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebaseWeb'; 

export default function ManageQuizzes() {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState({ 
    question: '', 
    options: ['', '', '', ''], 
    correctIndex: 0 
  });

  const addQuestion = () => {
    if (!currentQ.question || currentQ.options.some(opt => opt === '')) {
      alert("Please fill in the question and all 4 options.");
      return;
    }
    setQuestions([...questions, currentQ]);
    setCurrentQ({ question: '', options: ['', '', '', ''], correctIndex: 0 }); 
  };

  const saveQuiz = async () => {
    if (!quizTitle || questions.length === 0) {
      alert("Please provide a title and at least one question.");
      return;
    }

    try {
      await addDoc(collection(db, "quizzes"), {
        title: quizTitle,
        questions: questions,
        instructorId: auth.currentUser?.uid || "admin", 
        createdAt: new Date().toISOString()
      });
      alert("Quiz Created Successfully!");
      setQuizTitle('');
      setQuestions([]);
    } catch (error) {
      console.error(error);
      alert("Error saving quiz: " + error.message);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ color: '#104a28' }}>Create New Quiz</h1>
      
      {/* Quiz Title Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Quiz Title</label>
        <input 
          placeholder="e.g. Set Theory Module 1 Quiz" 
          value={quizTitle} 
          onChange={(e) => setQuizTitle(e.target.value)} 
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ddd', width: '100%', maxWidth: '500px' }}
        />
      </div>

      {/* Add Question Section */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '30px', maxWidth: '800px' }}>
        <h3 style={{ marginTop: 0 }}>Add a Question</h3>
        
        <input 
          placeholder="Enter Question Text Here..." 
          value={currentQ.question} 
          onChange={(e) => setCurrentQ({...currentQ, question: e.target.value})}
          style={{ width: '100%', marginBottom: '15px', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {currentQ.options.map((opt, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="radio" 
                name="correct" 
                checked={currentQ.correctIndex === idx} 
                onChange={() => setCurrentQ({...currentQ, correctIndex: idx})}
                style={{ cursor: 'pointer' }}
              />
              <input 
                placeholder={`Option ${idx + 1}`}
                value={opt} 
                onChange={(e) => {
                  const newOpts = [...currentQ.options];
                  newOpts[idx] = e.target.value;
                  setCurrentQ({...currentQ, options: newOpts});
                }} 
                style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
              />
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          * Select the radio button next to the correct answer.
        </div>

        <button 
          onClick={addQuestion} 
          style={{ marginTop: '20px', backgroundColor: '#eab308', color: '#3e2700', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          + Add Question
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4>Questions Added: {questions.length}</h4>
        <ul style={{ color: '#666' }}>
          {questions.map((q, i) => (
            <li key={i}>{q.question} (Answer: {q.options[q.correctIndex]})</li>
          ))}
        </ul>
      </div>

      <button 
        onClick={saveQuiz} 
        style={{ padding: '15px 30px', backgroundColor: '#104a28', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
      >
        PUBLISH QUIZ
      </button>
    </div>
  );
}