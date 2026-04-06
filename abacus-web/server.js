import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Initialize Configuration
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, 'uploads/'); },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'abacus_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to MySQL Database: " + process.env.DB_NAME);
    connection.release();
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
  }
})();

// --- NEW: HELPER TO GET THE CURRENT ACTIVE ACADEMIC TERM ---
const getActiveTermId = async () => {
  try {
    const [rows] = await db.query("SELECT id FROM academic_terms WHERE is_active = 1 LIMIT 1");
    return rows.length > 0 ? rows[0].id : 1;
  } catch(e) {
    return 1;
  }
};

// ==========================
// AUTHENTICATION ROUTES
// ==========================
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ? AND is_deleted = 0", [email]);
    if (users.length === 0) return res.status(401).json({ success: false, error: "User not found or account disabled." });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ success: false, error: "Incorrect password." });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      'abacus_secret_key_2026', 
      { expiresIn: '30d' }
    );

    let assignedClasses = [];
    if (user.assigned_classes) {
        try {
            assignedClasses = typeof user.assigned_classes === 'string' ? JSON.parse(user.assigned_classes) : user.assigned_classes;
            if (typeof assignedClasses === 'string') assignedClasses = JSON.parse(assignedClasses);
        } catch(e) { assignedClasses = []; }
    }

    res.json({
      success: true,
      token,
      user: {
        id: user.id, fullName: user.full_name, email: user.email, studentId: user.student_id,
        role: user.role, yearLevel: user.year_level, section: user.section, assigned_classes: assignedClasses 
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server: " + err.message });
  }
});

// ==========================
// ADMIN: USER MANAGEMENT 
// ==========================
app.get('/users', async (req, res) => {
  const { role } = req.query; 
  try {
    let query = "SELECT * FROM users WHERE is_deleted = 0";
    let params = [];
    if (role) { query += " AND role = ?"; params.push(role); }
    query += " ORDER BY full_name ASC";
    const [users] = await db.query(query, params);
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/trash/students', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE role = 'STUDENT' AND is_deleted = 1 ORDER BY full_name ASC");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/users', async (req, res) => {
  const { fullName, email, password, role, studentId, yearLevel, section, program, status, employeeId, department, assignedClasses } = req.body;
  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const uniqueId = studentId || employeeId; 
    const classesStr = assignedClasses ? JSON.stringify(assignedClasses) : null;

    await db.query(
      `INSERT INTO users (full_name, email, password_hash, role, student_id, year_level, section, program, status, department, assigned_classes, is_deleted) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [fullName, email, hashedPassword, role, uniqueId, yearLevel, section, program || 'BSIT', status || 'Regular', department, classesStr]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, studentId, yearLevel, section, program, status, employeeId, department, assignedClasses } = req.body;
  try {
    const uniqueId = studentId || employeeId;
    const classesStr = assignedClasses ? JSON.stringify(assignedClasses) : null;
    await db.query(
      `UPDATE users SET full_name = ?, student_id = ?, year_level = ?, section = ?, program = ?, status = ?, department = ?, assigned_classes = ? WHERE id = ?`,
      [fullName, uniqueId, yearLevel, section, program, status, department, classesStr, id]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/users/:id/soft-delete', async (req, res) => {
  try { await db.query("UPDATE users SET is_deleted = 1 WHERE id = ?", [req.params.id]); res.json({ success: true }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/users/:id/restore', async (req, res) => {
  try { await db.query("UPDATE users SET is_deleted = 0 WHERE id = ?", [req.params.id]); res.json({ success: true }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/users/:id/permanent', async (req, res) => {
  try { await db.query("DELETE FROM users WHERE id = ?", [req.params.id]); res.json({ success: true }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.patch('/users/:id/student-status', async (req, res) => {
  try { await db.query("UPDATE users SET status = ? WHERE id = ?", [req.body.status, req.params.id]); res.json({ success: true }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/admin-reset-password', async (req, res) => {
  const { uid, new_password } = req.body;
  if (!uid || !new_password) return res.status(400).json({ success: false, error: "Missing User ID or Password" });
  try {
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const [result] = await db.query("UPDATE users SET password_hash = ? WHERE id = ?", [hashedPassword, uid]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, error: "User not found" });
    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) { res.status(500).json({ success: false, error: "Database error" }); }
});

app.get('/trash/instructors', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE role = 'INSTRUCTOR' AND is_deleted = 1 ORDER BY full_name ASC");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// ACADEMIC SETUP & CLASS MANAGEMENT (ADMIN)
// ==========================================
app.get('/academic-setup', async (req, res) => {
  try {
    const [programs] = await db.query("SELECT * FROM programs ORDER BY id ASC");
    const [sections] = await db.query("SELECT * FROM sections ORDER BY id ASC");
    const [yearLevels] = await db.query("SELECT * FROM year_levels ORDER BY id ASC");
    const [terms] = await db.query("SELECT * FROM academic_terms ORDER BY id DESC");
    res.json({ programs, sections, yearLevels, terms });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/academic-setup/:type', async (req, res) => {
  const { type } = req.params;
  const { value, semester } = req.body; 
  try {
    if (type === 'program') await db.query("INSERT INTO programs (name) VALUES (?)", [value]);
    else if (type === 'section') await db.query("INSERT INTO sections (section_name) VALUES (?)", [value]);
    else if (type === 'year') await db.query("INSERT INTO year_levels (year_name) VALUES (?)", [value]);
    else if (type === 'term') await db.query("INSERT INTO academic_terms (school_year, semester, is_active) VALUES (?, ?, 0)", [value, semester]);
    else return res.status(400).json({error: "Invalid type"});
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/academic-setup/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  try {
    if (type === 'program') await db.query("DELETE FROM programs WHERE id = ?", [id]);
    else if (type === 'section') await db.query("DELETE FROM sections WHERE id = ?", [id]);
    else if (type === 'year') await db.query("DELETE FROM year_levels WHERE id = ?", [id]);
    else if (type === 'term') await db.query("DELETE FROM academic_terms WHERE id = ?", [id]);
    else return res.status(400).json({error: "Invalid type"});
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/academic-setup/term/active/:id', async (req, res) => {
  const { id } = req.params;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query("UPDATE academic_terms SET is_active = 0"); 
    await connection.query("UPDATE academic_terms SET is_active = 1 WHERE id = ?", [id]); 
    await connection.commit();
    res.json({ success: true });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally { connection.release(); }
});
app.put('/academic-setup/:type/:id', async (req, res) => {
  const { type, id } = req.params;
  const { value } = req.body; 
  try {
    if (type === 'program') await db.query("UPDATE programs SET name = ? WHERE id = ?", [value, id]);
    else if (type === 'section') await db.query("UPDATE sections SET section_name = ? WHERE id = ?", [value, id]);
    else if (type === 'year') await db.query("UPDATE year_levels SET year_name = ? WHERE id = ?", [value, id]);
    else return res.status(400).json({error: "Invalid update type"});
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// TERM ROLLOVER / TRANSITION SYSTEM
// ==========================================
app.put('/academic-setup/term/active/:id', async (req, res) => {
  const { id } = req.params;
  const { resetInstructors, resetStudents } = req.body; 
  const connection = await db.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // 1. Switch the active term (This automatically archives all old Quizzes, Modules, etc.)
    await connection.query("UPDATE academic_terms SET is_active = 0"); 
    await connection.query("UPDATE academic_terms SET is_active = 1 WHERE id = ?", [id]); 
    
    // 2. Term Rollover: Clear Instructor Assigned Classes for the new semester
    if (resetInstructors) {
        await connection.query("UPDATE users SET assigned_classes = '[]' WHERE role = 'INSTRUCTOR'");
    }
    
    // 3. Term Rollover: Reset Students so they must upload a new COR via the mobile app
    if (resetStudents) {
        await connection.query(`
            UPDATE users 
            SET section = 'To be assigned', 
                cor_status = 'Pending', 
                cor_image_url = NULL, 
                pending_year = NULL, 
                pending_section = NULL 
            WHERE role = 'STUDENT' AND is_deleted = 0
        `);
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

// ==========================
// INSTRUCTOR: QUIZ MANAGEMENT
// ==========================
app.get('/quizzes', async (req, res) => {
  try {
    const activeTermId = await getActiveTermId();
    // ✅ Include all statuses so the frontend Gradebook and App can disable them appropriately
    const [quizzes] = await db.query(`
      SELECT quizzes.*, users.full_name as author, IF(quizzes.term_id = ?, 0, 1) as is_archived
      FROM quizzes 
      JOIN users ON quizzes.created_by = users.id 
      ORDER BY created_at DESC
    `, [activeTermId]);
    res.json(quizzes);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/quizzes/:id', async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    // ✅ Cascade the delete to wipe out grades associated with this quiz permanently
    await connection.query("DELETE FROM student_grades WHERE quiz_id = ?", [req.params.id]);
    await connection.query("DELETE FROM quizzes WHERE id = ?", [req.params.id]);
    await connection.commit();
    res.json({ success: true });
  } catch (err) { 
    await connection.rollback();
    res.status(500).json({ error: err.message }); 
  } finally {
    connection.release();
  }
});

app.post('/quizzes', async (req, res) => {
  const { title, description, targetYear, targetSection, dueDate, createdBy, questions } = req.body;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const activeTermId = await getActiveTermId(); // ✅ Tag with active term

    const [quizResult] = await connection.query(
      `INSERT INTO quizzes (title, description, target_year, target_section, due_date, created_by, term_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, targetYear, targetSection, dueDate, createdBy, activeTermId]
    );
    const quizId = quizResult.insertId;

    for (const q of questions) {
      const [qResult] = await connection.query(
        `INSERT INTO quiz_questions (quiz_id, question_text, question_type, correct_index, correct_answer_text, is_required) VALUES (?, ?, ?, ?, ?, ?)`,
        [quizId, q.questionText, q.type, q.correctIndex || 0, q.correctAnswerText || '', q.required]
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
    res.json({ success: true, quizId });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally { connection.release(); }
});

app.patch('/quizzes/:id/status', async (req, res) => {
  try {
    const [result] = await db.query("UPDATE quizzes SET status = ? WHERE id = ?", [req.body.status, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, error: "Quiz not found" });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

app.patch('/quizzes/:id/details', async (req, res) => {
  const { title, description, targetYear, targetSection, dueDate } = req.body;
  try {
    await db.query(
      `UPDATE quizzes SET title=?, description=?, target_year=?, target_section=?, due_date=? WHERE id=?`,
      [title, description, targetYear, targetSection, dueDate, req.params.id]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================
// INSTRUCTOR DASHBOARD
// ==========================
app.get('/instructor/dashboard/:id', async (req, res) => {
  const instructorId = req.params.id;
  try {
    const [instructors] = await db.query("SELECT assigned_classes FROM users WHERE id = ?", [instructorId]);
    if (instructors.length === 0) return res.status(404).json({ error: "Instructor not found" });
    
    const assignedClasses = instructors[0].assigned_classes ? JSON.parse(instructors[0].assigned_classes) : [];

    let myStudents = [];
    if (assignedClasses.length > 0) {
      const conditions = assignedClasses.map(() => `(year_level = ? AND section = ?)`).join(' OR ');
      const params = assignedClasses.flatMap(c => [c.year, c.section]);
      const [students] = await db.query(
        `SELECT id, full_name, student_id, program, year_level, section, status FROM users WHERE role = 'STUDENT' AND is_deleted = 0 AND (${conditions})`,
        params
      );
      myStudents = students;
    }

    const activeTermId = await getActiveTermId();
    // ✅ Calculate is_archived for the dashboard
    const [quizzes] = await db.query(
      `SELECT *, IF(term_id = ?, 0, 1) as is_archived FROM quizzes WHERE created_by = ? ORDER BY created_at DESC`,
      [activeTermId, instructorId]
    );

    res.json({ students: myStudents, quizzes: quizzes });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// UPDATE QUIZ
app.put('/quizzes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, targetYear, targetSection, dueDate, questions } = req.body;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query(
      `UPDATE quizzes SET title=?, description=?, target_year=?, target_section=?, due_date=? WHERE id=?`,
      [title, description, targetYear, targetSection, dueDate, id]
    );
    await connection.query(`DELETE FROM quiz_questions WHERE quiz_id = ?`, [id]);

    for (const q of questions) {
      const [qResult] = await connection.query(
        `INSERT INTO quiz_questions (quiz_id, question_text, question_type, correct_index, correct_answer_text, is_required) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, q.questionText, q.type, q.correctIndex || 0, q.correctAnswerText || '', q.required]
      );
      const qId = qResult.insertId;
      if (q.options && q.options.length > 0) {
        for (let i = 0; i < q.options.length; i++) {
          await connection.query(`INSERT INTO question_options (question_id, option_text, option_order) VALUES (?, ?, ?)`, [qId, q.options[i], i]);
        }
      }
    }
    await connection.commit();
    res.json({ success: true });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally { connection.release(); }
});

app.get('/quizzes/:id', async (req, res) => {
  try {
    const [quiz] = await db.query("SELECT * FROM quizzes WHERE id = ?", [req.params.id]);
    if (quiz.length === 0) return res.status(404).json({ error: "Quiz not found" });

    const [questions] = await db.query("SELECT * FROM quiz_questions WHERE quiz_id = ?", [req.params.id]);
    for (const q of questions) {
      const [options] = await db.query("SELECT option_text FROM question_options WHERE question_id = ? ORDER BY option_order ASC", [q.id]);
      q.options = options.map(o => o.option_text);
      q.correctIndex = q.correct_index;
      q.correctAnswerText = q.correct_answer_text;
      q.questionText = q.question_text;
      q.type = q.question_type;
    }
    res.json({ ...quiz[0], questions });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/grades', async (req, res) => {
  const { userId, quizId, score, totalItems, subjectTitle } = req.body;
  try {
    const [existing] = await db.query("SELECT id FROM student_grades WHERE user_id = ? AND quiz_id = ?", [userId, quizId]);
    if (existing.length > 0) return res.status(400).json({ success: false, error: "You have already submitted this quiz." });

    const activeTermId = await getActiveTermId(); // ✅ Tag with active term
    await db.query(
      `INSERT INTO student_grades (user_id, quiz_id, score, total_items, subject_title, term_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, quizId, score, totalItems || 100, subjectTitle, activeTermId]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/grades', async (req, res) => {
  try {
    const activeTermId = await getActiveTermId();
    // ✅ Attach is_archived to grades
    const [grades] = await db.query(`
      SELECT id, user_id, quiz_id, score as grade, total_items, subject_title as subjectTitle, date_taken as dateTaken, IF(term_id = ?, 0, 1) as is_archived
      FROM student_grades ORDER BY date_taken DESC
    `, [activeTermId]);
    res.json(grades);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/grades/:id', async (req, res) => {
  try {
    await db.query("UPDATE student_grades SET score = ?, total_items = ? WHERE id = ?", [req.body.score, req.body.total_items, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/grades/:id', async (req, res) => {
  try { await db.query("DELETE FROM student_grades WHERE id = ?", [req.params.id]); res.json({ success: true }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

// --- ANNOUNCEMENT ROUTES ---
app.put('/announcements/:id', async (req, res) => {
  const { title, content, targetYear, targetSection } = req.body;
  try {
    await db.query("UPDATE announcements SET title = ?, content = ?, target_year = ?, target_section = ? WHERE id = ?", [title, content, targetYear, targetSection, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- ANNOUNCEMENT ROUTES ---

app.get('/announcements/student/:id', async (req, res) => {
  try {
    const [students] = await db.query("SELECT year_level, section FROM users WHERE id = ?", [req.params.id]);
    if (students.length === 0) return res.status(404).json({ error: "Student not found" });
    
    // ✅ Removed 'term_id' filter so announcements persist across semesters
    const [announcements] = await db.query(`
      SELECT * FROM announcements 
      WHERE is_deleted = 0 
      AND (
          (author_role = 'ADMIN' AND target_year != 'INSTRUCTORS') 
          OR target_year = 'ALL' 
          OR (target_year = ? AND target_section = ?)
      ) ORDER BY created_at DESC
    `, [students[0].year_level, students[0].section]);
    res.json(announcements);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/announcements/all', async (req, res) => {
  try {
    // ✅ Removed 'term_id' filter
    const [rows] = await db.query("SELECT * FROM announcements WHERE is_deleted = 0 AND author_role = 'ADMIN' ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/announcements/admin-to-instructor/:instructorId', async (req, res) => {
  try {
    const instructorId = req.params.instructorId;
    
    // ✅ Removed 'term_id' filter
    const [rows] = await db.query(`
      SELECT * FROM announcements 
      WHERE is_deleted = 0 AND author_role = 'ADMIN' 
      AND (
        target_year = 'ALL' 
        OR (target_year = 'INSTRUCTORS' AND (target_section = 'ALL' OR target_section = ?))
      ) 
      ORDER BY created_at DESC
    `, [instructorId]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/announcements/instructor/:id', async (req, res) => {
  try {
    // ✅ Removed 'term_id' filter, setting is_archived to 0 permanently for UI consistency
    const [rows] = await db.query("SELECT *, 0 as is_archived FROM announcements WHERE is_deleted = 0 AND author_id = ? ORDER BY created_at DESC", [req.params.id]);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Skip trash functions to keep clean
app.put('/announcements/:id/soft-delete', async (req, res) => {
  try { await db.query("UPDATE announcements SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?", [req.params.id]); res.json({ success: true }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/announcements', async (req, res) => {
    // We now accept 'targets' (Array) for multiple posts, OR targetYear/targetSection for single posts
    const { title, content, authorRole, authorName, authorId, targets, targetYear, targetSection } = req.body;
    const connection = await db.getConnection();
    
    try {
        await connection.beginTransaction();
        const activeTermId = await getActiveTermId(); 

        if (targets && Array.isArray(targets) && targets.length > 0) {
            // ✅ Loop through the array and post to multiple classes/instructors at once
            for (const t of targets) {
                await connection.query(
                    "INSERT INTO announcements (title, content, author_role, author_name, author_id, target_year, target_section, term_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [title, content, authorRole, authorName, authorId || null, t.targetYear, t.targetSection, activeTermId]
                );
            }
        } else {
            // ✅ Single insert (Used for backward compatibility and Editing)
            await connection.query(
                "INSERT INTO announcements (title, content, author_role, author_name, author_id, target_year, target_section, term_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [title, content, authorRole, authorName, authorId || null, targetYear, targetSection, activeTermId]
            );
        }
        
        await connection.commit();
        res.json({success: true});
    } catch(err) { 
        await connection.rollback();
        res.status(500).json({error: err.message}); 
    } finally {
        connection.release();
    }
});

// ----------------------------------------------------
// WHITELIST MANAGEMENT
// ----------------------------------------------------
app.post('/upload-allowed-students', async (req, res) => {
  const { students } = req.body;
  if (!students || !Array.isArray(students)) return res.status(400).json({ error: "Invalid data format" });
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const values = students.map(s => [s.studentId, s.email]);
    if (values.length > 0) await connection.query(`INSERT IGNORE INTO allowed_students (student_id, email) VALUES ?`, [values]);
    await connection.commit();
    res.json({ success: true, message: `Processed ${values.length} entries.` });
  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally { connection.release(); }
});

app.get('/allowed-students', async (req, res) => {
  try { const [rows] = await db.query("SELECT * FROM allowed_students ORDER BY created_at DESC"); res.json(rows); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/allowed-students/:id', async (req, res) => {
  try { await db.query("DELETE FROM allowed_students WHERE id = ?", [req.params.id]); res.json({ success: true }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/allowed-students/:id', async (req, res) => {
  const { studentId, email } = req.body;
  try {
    await db.query("UPDATE allowed_students SET student_id = ?, email = ? WHERE id = ?", [studentId, email, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/register', async (req, res) => {
  const { fullName, studentId, email, password, yearLevel, section, program } = req.body;
  try {
    const [allowed] = await db.query("SELECT * FROM allowed_students WHERE student_id = ? AND email = ?", [studentId, email]);
    if (allowed.length === 0) return res.status(403).json({ success: false, error: "Access Denied. Your Student ID or Email is not in the allowed list." });

    const [existing] = await db.query("SELECT * FROM users WHERE email = ? OR student_id = ?", [email, studentId]);
    if (existing.length > 0) return res.status(409).json({ success: false, error: "Account already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO users (full_name, student_id, email, password_hash, year_level, section, role, program, status, is_deleted) VALUES (?, ?, ?, ?, ?, ?, 'STUDENT', ?, 'Regular', 0)`,
      [fullName, studentId, email, hashedPassword, yearLevel, section, program]
    );
    res.status(201).json({ success: true, message: "Account created!", userId: result.insertId });
  } catch (err) { res.status(500).json({ success: false, error: "Server Error" }); }
});

// ==========================
// UPLOAD MODULES ROUTES
// ==========================
app.post('/modules', upload.single('pdfFile'), async (req, res) => {
  const { title, description, targetClasses, uploadedBy } = req.body;
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const fileName = req.file.filename;
  const fileUrl = `/uploads/${fileName}`; 

  try {
    let classesJSON = '[]';
    if (targetClasses) { try { classesJSON = JSON.stringify(JSON.parse(targetClasses)); } catch(e) {} }

    const activeTermId = await getActiveTermId(); // ✅ Tag with active term
    await db.query(
      `INSERT INTO modules (title, description, file_name, file_url, target_classes, uploaded_by, term_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, fileName, fileUrl, classesJSON, uploadedBy, activeTermId]
    );
    res.json({ success: true });
  } catch (err) {
    fs.unlinkSync(req.file.path); 
    res.status(500).json({ error: err.message });
  }
});

app.get('/modules/instructor/:id', async (req, res) => {
  try {
    const activeTermId = await getActiveTermId();
    const [modules] = await db.query(
      "SELECT *, IF(term_id = ?, 0, 1) as is_archived FROM modules WHERE uploaded_by = ? AND is_deleted = 0 ORDER BY created_at DESC", 
      [activeTermId, req.params.id]
    );
    res.json(modules);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/modules/:id/soft-delete', async (req, res) => {
  try { await db.query("UPDATE modules SET is_deleted = 1, deleted_at = CURRENT_TIMESTAMP WHERE id = ?", [req.params.id]); res.json({ success: true }); } 
  catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/modules/student/:id', async (req, res) => {
  try {
    const [students] = await db.query("SELECT year_level, section FROM users WHERE id = ?", [req.params.id]);
    if (students.length === 0) return res.status(404).json({ error: "Student not found" });
    const { year_level, section } = students[0];

    const activeTermId = await getActiveTermId();
    // ✅ Removed the hard term_id filter. Added is_archived flag.
    const [modules] = await db.query(`
      SELECT modules.*, users.full_name as author, IF(modules.term_id = ?, 0, 1) as is_archived 
      FROM modules 
      JOIN users ON modules.uploaded_by = users.id 
      ORDER BY created_at DESC
    `, [activeTermId]);
    
    const relevantModules = modules.filter(mod => {
      try {
        const targets = JSON.parse(mod.target_classes);
        if (!targets || targets.length === 0) return true; 
        return targets.some(t => t.year == year_level && t.section == section);
      } catch (e) { return true; }
    });
    res.json(relevantModules);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// STUDENT PROMOTION & COR OCR UPLOAD
// ==========================================
app.post('/promote-student', upload.single('corImage'), async (req, res) => {
  const { userId, manualYear, manualSection, isIrregular } = req.body;
  if (!req.file) return res.status(400).json({ error: "No COR image uploaded" });

  try {
    const [userRows] = await db.query("SELECT full_name, student_id, cor_image_url FROM users WHERE id = ?", [userId]);
    const student = userRows[0];
    
    if (student.cor_image_url) {
        const oldFilePath = path.join(__dirname, student.cor_image_url);
        if (fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }
    }

    const safeName = student.full_name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    const safeId = student.student_id.replace(/[^a-zA-Z0-9]/g, '');
    const ext = path.extname(req.file.originalname) || '.jpg';
    
    const newFileName = `${safeName}_${safeId}${ext}`;
    const newPath = path.join(__dirname, 'uploads', newFileName);
    
    fs.renameSync(req.file.path, newPath);
    
    const corUrl = `/uploads/${newFileName}`;
    const status = isIrregular === 'true' ? 'Irregular' : 'Regular';

    await db.query(
      "UPDATE users SET pending_year = ?, pending_section = ?, pending_status = ?, cor_image_url = ?, cor_status = 'Pending' WHERE id = ?",
      [manualYear, manualSection, status, corUrl, userId]
    );

    res.json({ success: true, message: "Promotion requested successfully!" });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ADMIN: PROMOTION VALIDATION ROUTES
// ==========================================
app.get('/admin/promotions/pending', async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, full_name, student_id, program, year_level, section, status, pending_year, pending_section, pending_status, cor_image_url, cor_status FROM users WHERE cor_status = 'Pending' ORDER BY full_name ASC"
    );
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- GET PENDING PROMOTIONS FOR A SPECIFIC INSTRUCTOR ---
app.get('/instructor/:instructorId/promotions/pending', (req, res) => {
    const { instructorId } = req.params;
    
    // Join the users (students) table with the classes table based on the requested promotion target
    const query = `
        SELECT DISTINCT u.id, u.full_name, u.student_id, u.program, u.year_level, u.section, 
               u.pending_year, u.pending_section, u.pending_status, u.cor_image_url
        FROM users u
        JOIN classes c ON u.program = c.program 
             AND u.pending_year = c.year_level 
             AND u.pending_section = c.section
        WHERE u.role = 'student' 
          AND u.pending_status = 'pending'
          AND c.instructor_id = ?
    `;
    
    db.query(query, [instructorId], (err, results) => {
        if (err) {
            console.error("Error fetching instructor promotions:", err);
            return res.status(500).json({ error: "Database error fetching instructor promotions" });
        }
        res.json(results);
    });
});

// SINGLE APPROVE
app.put('/admin/promotions/:id/approve', async (req, res) => {
  try {
    await db.query("UPDATE users SET year_level = pending_year, section = pending_section, status = pending_status, cor_status = 'Approved', pending_year = NULL, pending_section = NULL, pending_status = NULL WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 🚀 NEW: MASS APPROVE
app.put('/admin/promotions/mass-approve', async (req, res) => {
  const { ids } = req.body;
  if (!ids || ids.length === 0) return res.status(400).json({ error: "No IDs provided" });
  try {
    // Updates all selected students at once!
    await db.query("UPDATE users SET year_level = pending_year, section = pending_section, status = pending_status, cor_status = 'Approved', pending_year = NULL, pending_section = NULL, pending_status = NULL WHERE id IN (?)", [ids]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// SINGLE REJECT
app.put('/admin/promotions/:id/reject', async (req, res) => {
  try {
    const [users] = await db.query("SELECT cor_image_url FROM users WHERE id = ?", [req.params.id]);
    
    if (users.length > 0 && users[0].cor_image_url) {
        const filePath = path.join(__dirname, users[0].cor_image_url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); 
        }
    }

    await db.query("UPDATE users SET cor_status = 'Rejected', cor_image_url = NULL, pending_year = NULL, pending_section = NULL, pending_status = NULL WHERE id = ?", [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`🚀 Server running on http://localhost:${PORT}`); });