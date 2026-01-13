import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>▲</div>
          <h1 style={styles.title}>ABACUS INSTRUCTOR</h1>
          <p style={styles.subtitle}>Sign in to manage quizzes and grades</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              required
              style={styles.input}
              placeholder="instructor@cvsu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              required
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "LOGIN TO DASHBOARD"}
          </button>
        </form>
        
        <div style={styles.footer}>
          <span style={{color: '#888', fontSize: '12px'}}>Restricted Access. Authorized Personnel Only.</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#104a28",
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  logo: {
    fontSize: "40px",
    color: "#FFC107", // Brand Yellow
    marginBottom: "10px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#104a28",
    margin: "0 0 5px 0",
    letterSpacing: "1px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#444",
    textTransform: "uppercase",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s",
  },
  button: {
    padding: "14px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#FFC107",
    color: "#104a28",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
    letterSpacing: "0.5px",
    transition: "background 0.2s",
  },
  error: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "10px",
    borderRadius: "4px",
    fontSize: "13px",
    textAlign: "center",
  },
  footer: {
    marginTop: "30px",
    textAlign: "center",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  }
};

export default Login;