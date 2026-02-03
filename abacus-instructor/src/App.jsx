import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Login from "./Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import Gradebook from "./pages/Gradebook";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) return <div className="loader">Loading Instructor Panel...</div>;

  if (!user) return <Login />;

  // --- RENDER CONTENT BASED ON TAB ---
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <Dashboard setActiveTab={setActiveTab} />;
      case "create": return <CreateQuiz setActiveTab={setActiveTab} />;
      case "grades": return <Gradebook />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="layout">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout} 
      />
      
      <main className="main-content">
        {/* Top Header */}
        <header className="top-bar">
          <h2 className="page-title">
            {activeTab === 'create' ? 'Quiz Creator' : 
             activeTab === 'grades' ? 'Student Gradebook' : 'Instructor Dashboard'}
          </h2>
          <div className="user-profile">
            <div className="avatar">I</div>
            <span className="user-email">{user.email}</span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="content-canvas">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;