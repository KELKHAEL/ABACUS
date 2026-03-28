import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';       // NEW: For handling file uploads
import path from 'path';           // NEW: For file paths
import fs from 'fs';               // NEW: For deleting files
import { fileURLToPath } from 'url'; // NEW: For getting the directory name in ES modules

// --- Fix for __dirname in ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Initialize Configuration
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// --- NEW: Serve the 'uploads' folder statically so files can be downloaded via URL ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- NEW: Multer Configuration for PDF Uploads ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Saves files in the uploads folder
  },
  filename: (req, file, cb) => {
    // Generates a unique filename (timestamp + random number + original extension)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


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
// ADMIN: USER MANAGEMENT 
// ==========================

// 1. GET ACTIVE USERS 
app.get('/users', async (req, res) => {
  const { role } = req.query; 
  try {
    let query = "SELECT * FROM users WHERE is_deleted = 0";
    let params = [];
    
    if (role) {
      query += " AND role = ?"; 
      params.push(role);
    }
    query += " ORDER BY full_name ASC";
    
    const [users] = await db.query(query, params);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET TRASHED USERS 
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

// 3. CREATE USER 
app.post('/users', async (req, res) => {
  const { 
    fullName, email, password, role,
    studentId, yearLevel, section, program, status, 
    employeeId, department, assignedClasses 
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

// 5. SOFT DELETE 
app.put('/users/:id/soft-delete', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE users SET is_deleted = 1 WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. RESTORE USER
app.put('/users/:id/restore', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE users SET is_deleted = 0 WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. PERMANENT DELETE 
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
  const { title, description, difficulty, targetClasses } = req.body;
  
  try {
    const targetClassesStr = Array.isArray(targetClasses) ? JSON.stringify(targetClasses) : '[]';

    await db.query(
      `UPDATE quizzes SET title=?, description=?, target_year=?, target_section=?, difficulty=? WHERE id=?`,
      [title, description, targetClassesStr, 'JSON', difficulty, id]
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

// GET ANNOUNCEMENTS FOR A STUDENT
app.get('/announcements/student/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const [students] = await db.query("SELECT year_level, section FROM users WHERE id = ?", [studentId]);
    if (students.length === 0) return res.status(404).json({ error: "Student not found" });
    
    const { year_level, section } = students[0];

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

// --- GET ACTIVE ANNOUNCEMENTS (ADMIN) ---
app.get('/announcements/all', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM announcements WHERE is_deleted = 0 ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET ACTIVE ANNOUNCEMENTS (INSTRUCTOR) ---
app.get('/announcements/instructor/:id', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM announcements WHERE is_deleted = 0 AND author_id = ? ORDER BY created_at DESC", [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET TRASHED ANNOUNCEMENTS (ADMIN) ---
app.get('/trash/announcements', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM announcements WHERE is_deleted = 1 ORDER BY deleted_at DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET TRASHED ANNOUNCEMENTS (INSTRUCTOR) ---
app.get('/trash/announcements/instructor/:id', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM announcements WHERE is_deleted = 1 AND author_id = ? ORDER BY deleted_at DESC", [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SOFT DELETE ---
app.put('/announcements/:id/soft-delete', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE announcements SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- RESTORE ---
app.put('/announcements/:id/restore', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE announcements SET is_deleted = 0, deleted_at = NULL WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PERMANENT DELETE ---
app.delete('/announcements/:id/permanent', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM announcements WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- CREATE ANNOUNCEMENT (Updated to accept authorId) ---
app.post('/announcements', async (req, res) => {
    const { title, content, authorRole, authorName, authorId, targetYear, targetSection } = req.body;
    try {
        await db.query(
            "INSERT INTO announcements (title, content, author_role, author_name, author_id, target_year, target_section) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, content, authorRole, authorName, authorId || null, targetYear, targetSection]
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
// NEW: UPLOAD MODULES ROUTES
// ==========================

// 1. UPLOAD A MODULE
// Expects: FormData containing 'pdfFile' and fields (title, description, targetClasses, uploadedBy)
app.post('/modules', upload.single('pdfFile'), async (req, res) => {
  const { title, description, targetClasses, uploadedBy } = req.body;
  
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const fileName = req.file.filename;
  // We store the relative path. The frontend/mobile app will prepend their API_URL to this.
  const fileUrl = `/uploads/${fileName}`; 

  try {
    // Validate targetClasses is a valid JSON string (defaults to empty array if missing)
    let classesJSON = '[]';
    if (targetClasses) {
        try {
            // Attempt to parse to ensure it's valid, then stringify back
            classesJSON = JSON.stringify(JSON.parse(targetClasses)); 
        } catch(e) {
            console.warn("Invalid targetClasses JSON, defaulting to empty.");
        }
    }

    await db.query(
      `INSERT INTO modules (title, description, file_name, file_url, target_classes, uploaded_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, fileName, fileUrl, classesJSON, uploadedBy]
    );
    res.json({ success: true });
  } catch (err) {
    // Clean up the uploaded file if database insertion fails
    fs.unlinkSync(req.file.path); 
    res.status(500).json({ error: err.message });
  }
});

// --- UPDATE: GET INSTRUCTOR'S ACTIVE MODULES ---
app.get('/modules/instructor/:id', async (req, res) => {
  try {
    const [modules] = await db.query(
      "SELECT * FROM modules WHERE uploaded_by = ? AND is_deleted = 0 ORDER BY created_at DESC", 
      [req.params.id]
    );
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- NEW: TRASH BIN MODULES ROUTES ---

// 1. GET TRASHED MODULES
app.get('/trash/modules/instructor/:id', async (req, res) => {
  try {
    const [modules] = await db.query(
      "SELECT * FROM modules WHERE uploaded_by = ? AND is_deleted = 1 ORDER BY deleted_at DESC",
      [req.params.id]
    );
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. SOFT DELETE (Move to Trash)
app.put('/modules/:id/soft-delete', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE modules SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. RESTORE MODULE
app.put('/modules/:id/restore', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE modules SET is_deleted = 0, deleted_at = NULL WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. PERMANENT DELETE (Includes File Deletion)
app.delete('/modules/:id/permanent', async (req, res) => {
  try {
    const [mod] = await db.query("SELECT file_name FROM modules WHERE id = ?", [req.params.id]);
    
    if (mod.length > 0) {
      const filePath = path.join(__dirname, 'uploads', mod[0].file_name);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await db.query("DELETE FROM modules WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- AUTO-CLEANUP FUNCTION (30 DAYS) ---
const cleanOldTrash = async () => {
  try {
    // 1. Clean old Modules
    const [oldModules] = await db.query(
      "SELECT id, file_name FROM modules WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 30 DAY"
    );
    for (const mod of oldModules) {
      const filePath = path.join(__dirname, 'uploads', mod.file_name);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await db.query("DELETE FROM modules WHERE id = ?", [mod.id]);
    }
    
    // 2. Clean old Announcements
    const [oldAnnouncements] = await db.query(
      "SELECT id FROM announcements WHERE is_deleted = 1 AND deleted_at < NOW() - INTERVAL 30 DAY"
    );
    for (const ann of oldAnnouncements) {
      await db.query("DELETE FROM announcements WHERE id = ?", [ann.id]);
    }

    if(oldModules.length > 0 || oldAnnouncements.length > 0) {
        console.log(`🧹 Auto-cleaned ${oldModules.length} modules and ${oldAnnouncements.length} announcements from trash.`);
    }
  } catch (error) {
    console.error("Error auto-cleaning trash:", error);
  }
};

cleanOldTrash();

// 3. GET MODULES FOR STUDENT (Filtered by Class)
app.get('/modules/student/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const [students] = await db.query("SELECT year_level, section FROM users WHERE id = ?", [studentId]);
    if (students.length === 0) return res.status(404).json({ error: "Student not found" });
    
    const { year_level, section } = students[0];

    // Fetch all modules and join the author's name
    const [modules] = await db.query(`
      SELECT modules.*, users.full_name as author 
      FROM modules 
      JOIN users ON modules.uploaded_by = users.id 
      ORDER BY created_at DESC
    `);
    
    // Filter modules manually based on JSON matching
    const relevantModules = modules.filter(mod => {
      try {
        const targets = JSON.parse(mod.target_classes);
        // If targets is empty, treat it as a "Global" module (available to all)
        if (!targets || targets.length === 0) return true; 
        
        // Otherwise, check if the student's year and section match ANY of the targets
        // (Using == instead of === just in case of string/number mismatches)
        return targets.some(t => t.year == year_level && t.section == section);
      } catch (e) {
        return true; // Fallback: if parsing fails, show it just in case
      }
    });

    res.json(relevantModules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// ==========================
// START SERVER
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});