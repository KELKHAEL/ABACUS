import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// 1. Initialize Configuration
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// 2. Create Database Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'abacus_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Connection on Start
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL Database: " + process.env.DB_NAME);
    connection.release();
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
  }
})();

// ==========================
// AUTHENTICATION ROUTES
// ==========================

// 1. LOGIN (Universal)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find User (Must be active)
    const [users] = await db.query("SELECT * FROM users WHERE email = ? AND is_deleted = 0", [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ success: false, error: "User not found or account disabled." });
    }

    const user = users[0];

    // Check Password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ success: false, error: "Incorrect password." });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      'abacus_secret_key_2026', 
      { expiresIn: '30d' }
    );

    // --- FIX: PARSE ASSIGNED CLASSES ---
    let assignedClasses = [];
    if (user.assigned_classes) {
        try {
            assignedClasses = typeof user.assigned_classes === 'string' 
                ? JSON.parse(user.assigned_classes) 
                : user.assigned_classes;
                
            if (typeof assignedClasses === 'string') {
                assignedClasses = JSON.parse(assignedClasses);
            }
        } catch(e) {
            console.error("Error parsing assigned classes for login:", e);
            assignedClasses = [];
        }
    }

    // Send back info (exclude password!)
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        studentId: user.student_id,
        role: user.role,
        yearLevel: user.year_level,
        section: user.section,
        assigned_classes: assignedClasses 
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, error: "Server: " + err.message });
  }
});

// ==========================
// ADMIN: USER MANAGEMENT (UPDATED FOR TRASH BIN)
// ==========================

// 1. GET ACTIVE USERS (Updated to filter is_deleted = 0)
app.get('/users', async (req, res) => {
  const { role } = req.query; 
  try {
    // Base query only selects non-deleted users
    let query = "SELECT * FROM users WHERE is_deleted = 0";
    let params = [];
    
    if (role) {
      query += " AND role = ?"; // Use AND because WHERE exists
      params.push(role);
    }
    query += " ORDER BY full_name ASC";
    
    const [users] = await db.query(query, params);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET TRASHED USERS (New Route)
app.get('/trash/students', async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE role = 'STUDENT' AND is_deleted = 1 ORDER BY full_name ASC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CREATE USER (Students & Instructors)
app.post('/users', async (req, res) => {
  const { 
    fullName, email, password, role,
    studentId, yearLevel, section, program, status, // Student
    employeeId, department, assignedClasses // Instructor
  } = req.body;

  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const uniqueId = studentId || employeeId; 
    const classesStr = assignedClasses ? JSON.stringify(assignedClasses) : null;

    await db.query(
      `INSERT INTO users 
      (full_name, email, password_hash, role, student_id, year_level, section, program, status, department, assigned_classes, is_deleted) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [fullName, email, hashedPassword, role, uniqueId, yearLevel, section, program || 'BSIT', status || 'Regular', department, classesStr]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. UPDATE USER
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    fullName, studentId, yearLevel, section, program, status,
    employeeId, department, assignedClasses 
  } = req.body;

  try {
    const uniqueId = studentId || employeeId;
    const classesStr = assignedClasses ? JSON.stringify(assignedClasses) : null;

    await db.query(
      `UPDATE users SET 
       full_name = ?, student_id = ?, year_level = ?, section = ?, 
       program = ?, status = ?, department = ?, assigned_classes = ?
       WHERE id = ?`,
      [fullName, uniqueId, yearLevel, section, program, status, department, classesStr, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. SOFT DELETE (Move to Trash) - NEW
app.put('/users/:id/soft-delete', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE users SET is_deleted = 1 WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. RESTORE USER (Recover from Trash) - NEW
app.put('/users/:id/restore', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE users SET is_deleted = 0 WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. PERMANENT DELETE (Destroy Data) - NEW
app.delete('/users/:id/permanent', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- UPDATE STUDENT STATUS ---
app.patch('/users/:id/student-status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await db.query("UPDATE users SET status = ? WHERE id = ?", [status, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ADMIN RESET PASSWORD ROUTE ---
app.post('/admin-reset-password', async (req, res) => {
  const { uid, new_password } = req.body;

  if (!uid || !new_password) {
    return res.status(400).json({ success: false, error: "Missing User ID or Password" });
  }

  try {
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const [result] = await db.query(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [hashedPassword, uid]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, message: "Password updated successfully" });

  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// --- GET TRASHED INSTRUCTORS ---
app.get('/trash/instructors', async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE role = 'INSTRUCTOR' AND is_deleted = 1 ORDER BY full_name ASC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// INSTRUCTOR: QUIZ MANAGEMENT
// ==========================

// 1. GET ALL QUIZZES
app.get('/quizzes', async (req, res) => {
  try {
    const [quizzes] = await db.query(`
      SELECT quizzes.*, users.full_name as author 
      FROM quizzes 
      JOIN users ON quizzes.created_by = users.id 
      WHERE quizzes.status = 'active' 
      ORDER BY created_at DESC
    `);
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. DELETE QUIZ
app.delete('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM quizzes WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. CREATE QUIZ
app.post('/quizzes', async (req, res) => {
  const { title, description, targetYear, targetSection, difficulty, questions, createdBy } = req.body;
  
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // A. Insert Quiz
    const [quizResult] = await connection.query(
      `INSERT INTO quizzes (title, description, target_year, target_section, difficulty, created_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, targetYear, targetSection, difficulty, createdBy]
    );
    const quizId = quizResult.insertId;

    // B. Insert Questions
    for (const q of questions) {
      const [qResult] = await connection.query(
        `INSERT INTO quiz_questions (quiz_id, question_text, question_type, correct_index, correct_answer_text, is_required) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [quizId, q.questionText, q.type, q.correctIndex || 0, q.correctAnswerText || '', q.required]
      );
      const qId = qResult.insertId;

      // C. Insert Options
      if (q.options && q.options.length > 0) {
        for (let i = 0; i < q.options.length; i++) {
          await connection.query(
            `INSERT INTO question_options (question_id, option_text, option_order) VALUES (?, ?, ?)`,
            [qId, q.options[i], i]
          );
        }
      }
    }

    await connection.commit();
    res.json({ success: true, quizId });

  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

app.patch('/quizzes/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'active' or 'deleted'

  try {
    const [result] = await db.query(
      "UPDATE quizzes SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    res.json({ success: true, message: `Quiz status updated to ${status}` });
  } catch (err) {
    console.error("Error updating quiz status:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// --- UPDATE QUIZ DETAILS ONLY ---
app.patch('/quizzes/:id/details', async (req, res) => {
  const { id } = req.params;
  const { title, description, targetYear, targetSection, difficulty } = req.body;
  
  try {
    await db.query(
      `UPDATE quizzes SET title=?, description=?, target_year=?, target_section=?, difficulty=? WHERE id=?`,
      [title, description, targetYear, targetSection, difficulty, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// INSTRUCTOR DASHBOARD
// ==========================

// 1. GET INSTRUCTOR DASHBOARD DATA
app.get('/instructor/dashboard/:id', async (req, res) => {
  const instructorId = req.params.id;

  try {
    // A. Get Instructor Info
    const [instructors] = await db.query("SELECT assigned_classes FROM users WHERE id = ?", [instructorId]);
    
    if (instructors.length === 0) return res.status(404).json({ error: "Instructor not found" });
    
    const assignedClasses = instructors[0].assigned_classes 
      ? JSON.parse(instructors[0].assigned_classes) 
      : [];

    // B. Get My Students (Filter by Year/Section)
    let myStudents = [];
    if (assignedClasses.length > 0) {
      const conditions = assignedClasses.map(() => `(year_level = ? AND section = ?)`).join(' OR ');
      const params = assignedClasses.flatMap(c => [c.year, c.section]);
      
      const [students] = await db.query(
        `SELECT id, full_name, student_id, program, year_level, section, status 
         FROM users WHERE role = 'STUDENT' AND is_deleted = 0 AND (${conditions})`,
        params
      );
      myStudents = students;
    }

    // C. Get My Quizzes
    const [quizzes] = await db.query(
      `SELECT * FROM quizzes WHERE created_by = ? ORDER BY created_at DESC`,
      [instructorId]
    );

    res.json({
      students: myStudents,
      quizzes: quizzes
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 2. UPDATE QUIZ (Full replacement logic)
app.put('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, targetYear, targetSection, difficulty, questions } = req.body;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query(
      `UPDATE quizzes SET title=?, description=?, target_year=?, target_section=?, difficulty=? WHERE id=?`,
      [title, description, targetYear, targetSection, difficulty, id]
    );

    await connection.query(`DELETE FROM quiz_questions WHERE quiz_id = ?`, [id]);

    for (const q of questions) {
      const [qResult] = await connection.query(
        `INSERT INTO quiz_questions (quiz_id, question_text, question_type, correct_index, correct_answer_text, is_required) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, q.questionText, q.type, q.correctIndex || 0, q.correctAnswerText || '', q.required]
      );
      const qId = qResult.insertId;

      if (q.options && q.options.length > 0) {
        for (let i = 0; i < q.options.length; i++) {
          await connection.query(
            `INSERT INTO question_options (question_id, option_text, option_order) VALUES (?, ?, ?)`,
            [qId, q.options[i], i]
          );
        }
      }
    }

    await connection.commit();
    res.json({ success: true });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

// GET SINGLE QUIZ WITH QUESTIONS
app.get('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [quiz] = await db.query("SELECT * FROM quizzes WHERE id = ?", [id]);
    if (quiz.length === 0) return res.status(404).json({ error: "Quiz not found" });

    const [questions] = await db.query("SELECT * FROM quiz_questions WHERE quiz_id = ?", [id]);

    for (const q of questions) {
      const [options] = await db.query("SELECT option_text FROM question_options WHERE question_id = ? ORDER BY option_order ASC", [q.id]);
      q.options = options.map(o => o.option_text);
      q.correctIndex = q.correct_index;
      q.correctAnswerText = q.correct_answer_text;
      q.questionText = q.question_text;
      q.type = q.question_type;
    }

    res.json({ ...quiz[0], questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// STUDENT: SUBMIT GRADE
app.post('/grades', async (req, res) => {
  const { userId, quizId, score, subjectTitle } = req.body;
  try {
    // Check if a grade already exists for this user and quiz
    const [existing] = await db.query(
      "SELECT id FROM student_grades WHERE user_id = ? AND quiz_id = ?",
      [userId, quizId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false, 
        error: "You have already submitted this quiz." 
      });
    }

    await db.query(
      `INSERT INTO student_grades (user_id, quiz_id, score, subject_title) VALUES (?, ?, ?, ?)`,
      [userId, quizId, score, subjectTitle]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// GRADEBOOK MANAGEMENT
// ==========================

// 1. GET ALL GRADES
app.get('/grades', async (req, res) => {
  try {
    const [grades] = await db.query(`
      SELECT id, user_id, quiz_id, score as grade, subject_title as subjectTitle, date_taken as dateTaken 
      FROM student_grades 
      ORDER BY date_taken DESC
    `);
    res.json(grades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. UPDATE A GRADE
app.put('/grades/:id', async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    await db.query("UPDATE student_grades SET score = ? WHERE id = ?", [score, id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. DELETE A GRADE
app.delete('/grades/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM student_grades WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ANNOUNCEMENT ROUTES ---

app.put('/announcements/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, targetYear, targetSection } = req.body;

  try {
    await db.query(
      "UPDATE announcements SET title = ?, content = ?, target_year = ?, target_section = ? WHERE id = ?",
      [title, content, targetYear, targetSection, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET ANNOUNCEMENTS FOR A STUDENT (Fixed to hide deleted items)
app.get('/announcements/student/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const [students] = await db.query("SELECT year_level, section FROM users WHERE id = ?", [studentId]);
    if (students.length === 0) return res.status(404).json({ error: "Student not found" });
    
    const { year_level, section } = students[0];

    // UPDATED QUERY: Added (is_deleted = 0) check wrapped in logic
    const [announcements] = await db.query(`
      SELECT * FROM announcements 
      WHERE is_deleted = 0 
      AND (
        author_role = 'ADMIN' 
        OR target_year = 'ALL'
        OR (target_year = ? AND target_section = ?)
      )
      ORDER BY created_at DESC
    `, [year_level, section]);

    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 1. GET ACTIVE ANNOUNCEMENTS (Update your existing route) ---
app.get('/announcements/all', async (req, res) => {
  try {
    // ADDED: WHERE is_deleted = 0
    const [rows] = await db.query("SELECT * FROM announcements WHERE is_deleted = 0 ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 2. GET TRASHED ANNOUNCEMENTS (New) ---
app.get('/trash/announcements', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM announcements WHERE is_deleted = 1 ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 3. SOFT DELETE (New) ---
app.put('/announcements/:id/soft-delete', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE announcements SET is_deleted = 1 WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 4. RESTORE (New) ---
app.put('/announcements/:id/restore', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE announcements SET is_deleted = 0 WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- 5. PERMANENT DELETE (New) ---
app.delete('/announcements/:id/permanent', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM announcements WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ADMIN: CREATE ANNOUNCEMENT ---
app.post('/announcements', async (req, res) => {
    const { title, content, authorRole, authorName, targetYear, targetSection } = req.body;
    try {
        await db.query(
            "INSERT INTO announcements (title, content, author_role, author_name, target_year, target_section) VALUES (?, ?, ?, ?, ?, ?)",
            [title, content, authorRole, authorName, targetYear, targetSection]
        );
        res.json({success: true});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// ----------------------------------------------------
// WHITELIST MANAGEMENT
// ----------------------------------------------------

app.post('/upload-allowed-students', async (req, res) => {
  const { students } = req.body;

  if (!students || !Array.isArray(students)) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const query = `INSERT IGNORE INTO allowed_students (student_id, email) VALUES ?`;
    const values = students.map(s => [s.studentId, s.email]);

    if (values.length > 0) {
      await connection.query(query, [values]);
    }

    await connection.commit();
    res.json({ success: true, message: `Processed ${values.length} entries.` });

  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

// 1. GET ALL ALLOWED STUDENTS
app.get('/allowed-students', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM allowed_students ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. DELETE FROM WHITELIST
app.delete('/allowed-students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM allowed_students WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------------------------------------
// UPDATED REGISTER ROUTE (With Whitelist Check)
// ----------------------------------------------------
app.post('/register', async (req, res) => {
  const { fullName, studentId, email, password, yearLevel, section, program } = req.body;

  if (!email || !password || !fullName || !studentId) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  try {
    // 1. Check Whitelist
    const [allowed] = await db.query(
      "SELECT * FROM allowed_students WHERE student_id = ? AND email = ?", 
      [studentId, email]
    );

    if (allowed.length === 0) {
      return res.status(403).json({ 
        success: false, 
        error: "Access Denied. Your Student ID or Email is not in the allowed list." 
      });
    }

    // 2. Check Existing User
    const [existing] = await db.query("SELECT * FROM users WHERE email = ? OR student_id = ?", [email, studentId]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, error: "Account already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User (Default is_deleted = 0)
    const [result] = await db.query(
      `INSERT INTO users (full_name, student_id, email, password_hash, year_level, section, role, program, status, is_deleted) 
       VALUES (?, ?, ?, ?, ?, ?, 'STUDENT', ?, 'Regular', 0)`,
      [fullName, studentId, email, hashedPassword, yearLevel, section, program]
    );

    res.status(201).json({ success: true, message: "Account created!", userId: result.insertId });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});