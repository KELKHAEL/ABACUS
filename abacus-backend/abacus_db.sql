-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2026 at 08:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abacus_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_terms`
--

CREATE TABLE `academic_terms` (
  `id` int(11) NOT NULL,
  `school_year` varchar(50) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `is_active` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `academic_terms`
--

INSERT INTO `academic_terms` (`id`, `school_year`, `semester`, `is_active`) VALUES
(1, '2025-2026', 'First Semester', 0),
(2, '2025-2026', 'Second Semester', 1),
(3, '2025-2026', 'Mid-Year Semester', 0);

-- --------------------------------------------------------

--
-- Table structure for table `allowed_students`
--

CREATE TABLE `allowed_students` (
  `id` int(11) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `suffix` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `allowed_students`
--

INSERT INTO `allowed_students` (`id`, `student_id`, `email`, `created_at`, `first_name`, `middle_name`, `last_name`, `suffix`) VALUES
(1, '202218701', 'tc.marionadam.purugganan@cvsu.edu.ph', '2026-02-18 07:06:00', 'MARION ADAM', 'C.', 'PURUGGANAN', NULL),
(2, '202218631', 'tc.vincenteyron.gadon@cvsu.edu.ph', '2026-02-18 07:06:00', 'VINCENT EYRON', 'H.', 'GADON', NULL),
(3, '202218660', 'tc.nieshaanne.maglaway@cvsu.edu.ph', '2026-02-18 07:06:00', 'NIESHA ANNE', 'C.', 'MAGLAWAY', NULL),
(4, '202218810', 'tc.paulbryan.gado@cvsu.edu.ph', '2026-02-18 07:06:00', 'PAUL BRYAN', 'M.', 'GADO', NULL),
(5, '202218859', 'tc.maryanne.pagota@cvsu.edu.ph', '2026-02-18 07:06:00', 'MARY ANNE', 'A.', 'PAGOTA', NULL),
(6, '202218867', 'tc.reymond.rapis@cvsu.edu.ph', '2026-02-18 07:06:00', 'REYMOND', '', 'RAPIS', NULL),
(7, '202218715', 'tc.jhanzy.samar@cvsu.edu.ph', '2026-02-18 07:06:00', 'JHANZY', 'O.', 'SAMAR', NULL),
(32, '202218637', 'tc.mikhael.garcia@cvsu.edu.ph', '2026-04-11 19:59:19', 'MIKHAEL', 'V.', 'GARCIA', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_role` enum('ADMIN','INSTRUCTOR') NOT NULL,
  `author_name` varchar(100) NOT NULL,
  `target_year` varchar(10) DEFAULT 'ALL',
  `target_section` varchar(10) DEFAULT 'ALL',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0,
  `author_id` int(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `term_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `author_role`, `author_name`, `target_year`, `target_section`, `created_at`, `is_deleted`, `author_id`, `deleted_at`, `term_id`) VALUES
(2, 'Welcome my Students!', 'This is your Instructor for the class semester! ', 'INSTRUCTOR', 'GARCIA, MIKHAEL V.', '4', '1', '2026-03-24 20:39:26', 0, 2, NULL, 1),
(14, 'Welcome to ABACUS!', 'ABACUS is an Android-Based Application for Computing, Understanding, and Simulation in Discrete Mathematics!', 'ADMIN', 'Registrar', 'ALL', 'ALL', '2026-04-11 23:56:15', 0, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `target_classes` text DEFAULT NULL,
  `uploaded_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `term_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `title`, `description`, `file_name`, `file_url`, `target_classes`, `uploaded_by`, `created_at`, `is_deleted`, `deleted_at`, `term_id`) VALUES
(1, 'Chapter 1: Try ko lang hehehe', 'ewan, wala akong alam dito hahaha', '1774023431182-365495471.pdf', '/uploads/1774023431182-365495471.pdf', '[{\"year\":\"4\",\"section\":\"1\"}]', 2, '2026-03-20 16:17:11', 0, NULL, 1),
(2, 'TRYY', 'samplee', '1774512281211-179837229.pdf', '/uploads/1774512281211-179837229.pdf', '[]', 2, '2026-03-26 08:04:41', 0, NULL, 1),
(3, 'try upload', 'testing', '1775502593595-706132343.pdf', '/uploads/1775502593595-706132343.pdf', '[{\"year\":\"4\",\"section\":\"1\"}]', 2, '2026-04-06 19:09:53', 0, NULL, 2),
(4, 'demo', 'try ', '1775528171633-262489052.pdf', '/uploads/1775528171633-262489052.pdf', '[]', 2, '2026-04-07 02:16:11', 0, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `name`) VALUES
(1, 'Bachelor of Science in Information Technology'),
(2, 'Bachelor of Secondary Education - Major in Mathematics'),
(3, 'Bachelor of Secondary Education - Major in English'),
(4, 'Bachelor of Science in Business Management'),
(6, 'Bachelor of Science in Computer Science');

-- --------------------------------------------------------

--
-- Table structure for table `question_options`
--

CREATE TABLE `question_options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_text` text NOT NULL,
  `option_order` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question_options`
--

INSERT INTO `question_options` (`id`, `question_id`, `option_text`, `option_order`) VALUES
(1, 1, 'Hotdog', 0),
(2, 1, 'Pusa', 1),
(3, 1, 'Daga hahaha', 2),
(4, 1, 'Aso', 3),
(5, 2, 'garcia', 0),
(6, 2, 'villafuerte', 1),
(7, 2, 'jha', 2),
(8, 2, 'oranda', 3),
(9, 3, 'Option 1', 0),
(10, 3, 'Option 2', 1),
(11, 3, 'Option 3', 2),
(12, 3, 'Option 4', 3),
(13, 4, 'Try 1', 0),
(14, 4, 'try 2', 1),
(15, 4, 'try 3', 2),
(16, 4, 'try 4', 3),
(17, 5, 'try1', 0),
(18, 5, 'try2', 1),
(19, 5, 'try3', 2),
(20, 5, 'try4', 3),
(33, 9, 'ewan', 0),
(34, 9, 'adobo', 1),
(35, 9, 'kutsara', 2),
(36, 9, 'kape', 3),
(59, 17, '1', 0),
(60, 17, '2', 1),
(61, 17, '3', 2),
(62, 17, '4', 3),
(63, 18, '1', 0),
(64, 18, '2', 1),
(65, 18, '3', 2),
(66, 18, '4', 3),
(67, 19, '1', 0),
(68, 19, '2', 1),
(69, 19, '3', 2),
(70, 19, '4', 3),
(71, 20, '1', 0),
(72, 20, '2', 1),
(73, 20, '3', 2),
(74, 20, '4', 3);

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `target_year` varchar(10) DEFAULT NULL,
  `target_section` varchar(10) DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `status` enum('active','archived','deleted') DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `term_id` int(11) DEFAULT 1,
  `is_retake` tinyint(1) DEFAULT 0,
  `parent_quiz_id` int(11) DEFAULT NULL,
  `target_students` text DEFAULT NULL,
  `penalty` int(11) DEFAULT 0,
  `time_limit` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`, `description`, `target_year`, `target_section`, `due_date`, `status`, `created_by`, `created_at`, `term_id`, `is_retake`, `parent_quiz_id`, `target_students`, `penalty`, `time_limit`) VALUES
(1, 'Quiz 1', 'Try Testing.', '4', '1', '2026-12-31 23:59:59', 'active', 2, '2026-02-11 07:48:30', 1, 0, NULL, NULL, 0, 0),
(2, 'tryy ', 'samplee', '4', '1', '2026-12-31 23:59:59', 'active', 2, '2026-03-26 08:10:13', 1, 0, NULL, NULL, 0, 0),
(3, 'try again', 'try', '4', '1', '2026-04-03 20:55:00', 'active', 2, '2026-04-02 10:57:30', 1, 0, NULL, NULL, 0, 0),
(4, 'TRIAL AND ERROR NANAMAN NA S-STRESS NAKOOOO!!', 'try try again', '4', '1', '2026-04-02 20:00:00', 'active', 2, '2026-04-02 11:15:36', 1, 0, NULL, NULL, 0, 0),
(8, 'try demo', 'ewan', '4', '1', '2026-04-06 15:00:00', 'active', 2, '2026-04-06 06:38:46', 1, 0, NULL, NULL, 0, 0),
(13, 'try testing 1', 'try test', 'ALL', 'ALL', '2026-04-30 08:58:00', 'active', 2, '2026-04-11 22:59:28', 2, 0, NULL, '[]', 2, 0),
(14, '[RETAKE] try testing 1', 'Retake assignment. Note: A point penalty deduction will be applied to the final score.', '4', '1', '2026-04-30 08:00:00', 'active', 2, '2026-04-11 23:16:26', 2, 1, 13, '[4,9]', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_questions`
--

CREATE TABLE `quiz_questions` (
  `id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `question_type` enum('multiple-choice','checkbox','short') NOT NULL,
  `correct_answer_text` text DEFAULT NULL,
  `correct_index` int(11) DEFAULT NULL,
  `is_required` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quiz_questions`
--

INSERT INTO `quiz_questions` (`id`, `quiz_id`, `question_text`, `question_type`, `correct_answer_text`, `correct_index`, `is_required`) VALUES
(1, 1, 'What is tagalog of dog', 'multiple-choice', '', 0, 1),
(2, 2, 'mikhael v __', 'multiple-choice', '', 0, 1),
(3, 2, 'cabeca', 'multiple-choice', '', 3, 0),
(4, 3, 'Try quiz', 'multiple-choice', '', 0, 1),
(5, 4, 'try uli', 'multiple-choice', '', 0, 1),
(9, 8, 'anong ulam ko ngayon', 'multiple-choice', '', 3, NULL),
(17, 13, 'testing', 'multiple-choice', '', 0, NULL),
(18, 13, 'test uli', 'multiple-choice', '', 0, NULL),
(19, 14, 'testing', 'multiple-choice', '', 0, NULL),
(20, 14, 'test uli', 'multiple-choice', '', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `section_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `section_name`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4'),
(5, '5'),
(6, '6');

-- --------------------------------------------------------

--
-- Table structure for table `student_grades`
--

CREATE TABLE `student_grades` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quiz_id` int(11) NOT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `subject_title` varchar(255) DEFAULT NULL,
  `semester` varchar(20) DEFAULT '1st Sem',
  `date_taken` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_items` int(11) DEFAULT 100,
  `term_id` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_grades`
--

INSERT INTO `student_grades` (`id`, `user_id`, `quiz_id`, `score`, `subject_title`, `semester`, `date_taken`, `total_items`, `term_id`) VALUES
(3, 4, 1, 100.00, 'Quiz #1', '1st Sem', '2026-02-11 11:14:19', 100, 1),
(9, 4, 2, 100.00, 'tryy ', '1st Sem', '2026-03-26 08:10:28', 100, 1),
(11, 4, 3, 100.00, 'try again', '1st Sem', '2026-04-02 10:58:31', 100, 1),
(12, 4, 4, 1.00, 'TRIAL AND ERROR NANAMAN NA S-STRESS NAKOOOO!!', '1st Sem', '2026-04-02 11:15:45', 1, 1),
(18, 4, 8, 0.00, 'try demo', '1st Sem', '2026-04-06 06:40:24', 1, 1),
(35, 9, 13, 1.00, '[RETAKE] try testing 1 (-1 pts Penalty)', '1st Sem', '2026-04-11 23:16:44', 2, 2),
(36, 4, 13, 1.00, '[RETAKE] try testing 1 (-1 pts Penalty)', '1st Sem', '2026-04-11 23:19:41', 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `year_level` varchar(10) DEFAULT '1',
  `section` varchar(50) DEFAULT NULL,
  `role` enum('STUDENT','INSTRUCTOR','ADMIN') DEFAULT 'STUDENT',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `department` varchar(100) DEFAULT NULL,
  `assigned_classes` text DEFAULT NULL,
  `program` varchar(150) DEFAULT 'Bachelor of Science in Information Technology',
  `status` varchar(20) DEFAULT 'Regular',
  `is_deleted` tinyint(1) DEFAULT 0,
  `cor_image_url` varchar(255) DEFAULT NULL,
  `cor_status` varchar(20) DEFAULT NULL,
  `pending_year` varchar(50) DEFAULT NULL,
  `pending_section` varchar(50) DEFAULT NULL,
  `pending_status` varchar(50) DEFAULT NULL,
  `session_token` varchar(255) DEFAULT NULL,
  `login_attempts` int(11) DEFAULT 0,
  `lockout_until` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `student_id`, `full_name`, `email`, `password_hash`, `year_level`, `section`, `role`, `created_at`, `department`, `assigned_classes`, `program`, `status`, `is_deleted`, `cor_image_url`, `cor_status`, `pending_year`, `pending_section`, `pending_status`, `session_token`, `login_attempts`, `lockout_until`) VALUES
(1, 'ADMIN-001', 'Super Admin', 'admin@cvsu.edu.ph', '$2b$10$5e4Yh68d3VQL0ZsTFFs/xe3GcXl.rVwA4WmzN5nODBhKhVkYNGXAm', '1', '1', 'ADMIN', '2026-02-10 15:57:58', NULL, NULL, 'BSIT', 'Regular', 0, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzc1OTUwODY1fQ.3GPbJ4JEqyR-4kYAMLZaaagD1PViDww8yrwI617ukKU', 0, NULL),
(2, '202218637', 'GARCIA, MIKHAEL V.', 'tc.mikhael.garcia@cvsu.edu.ph', '$2b$10$.m6BuIJLT3w/AenK28jP.ejAusBniTg0s5tys5GJrldjpomI0ElnK', NULL, NULL, 'INSTRUCTOR', '2026-02-10 17:20:11', 'Department of Information Technology', '[{\"year\":\"4\",\"section\":\"1\"},{\"year\":\"2\",\"section\":\"1\"},{\"year\":\"3\",\"section\":\"1\"},{\"year\":\"1\",\"section\":\"1\"},{\"year\":\"2\",\"section\":\"2\"}]', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzc1OTUxODc4fQ.fFiPTUcMv4X7-583py1RAskJVn64N5It_ildyS254Qw', 0, NULL),
(4, '202218859', 'PAGOTA, MARY ANNE A.', 'tc.maryanne.pagota@cvsu.edu.ph', '$2b$10$rFPrYiJqyTSif5E9F56LRuB5lPRUNJBqMqTD7JwHp9nHqHVhxUhLu', '4', '1', 'STUDENT', '2026-02-11 08:25:42', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0, NULL, 'Rejected', NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZGV2aWNlSWQiOiI0bDB0YXpjcjMxeG1udXdoa2JnIiwiaWF0IjoxNzc2MDE0NzY1fQ.kDgDBFBQ_RCiWr4SVZNM7NrW8KafjQfmlwPui8zrvDg', 0, NULL),
(9, '202218715', 'Samar, Jhanzy O.', 'tc.jhanzy.samar@cvsu.edu.ph', '$2b$10$XHrPWfMTifzOcgfRbzHlVexa3mv0fme586V3jAdeTeXYDw4.rZuXu', '4', '1', 'STUDENT', '2026-04-06 18:03:17', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0, NULL, NULL, NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZGV2aWNlSWQiOiJmbXlnNnQ4NWlqd21udnV3dzduIiwiaWF0IjoxNzc2MDA0MDU5fQ.jXrc8oPzjQm3gGtMZXL1VkfoQKfrJ-cOr6wsaWkd6Ts', 0, NULL),
(10, '202218631', 'Gadon, Vincent Eyron H.', 'tc.vincenteyron.gadon@cvsu.edu.ph', '$2b$10$ilc5WMZT8GxqEhRnFwou7urN.vibscV5y4XJF5CDAuGXz31mGoLCa', '4', '1', 'STUDENT', '2026-04-06 18:18:58', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0, '/uploads/Gadon_Vincent_Eyron_H_202218631_REG.jpeg', 'Approved', NULL, NULL, NULL, NULL, 0, NULL),
(11, '202218867', 'RAPIS, REYMOND', 'tc.reymond.rapis@cvsu.edu.ph', '$2b$10$hFh4PaH4TRWwPQeWpTpDe.u2Em2T8GTHu865M8sypRBE7bjGQJRN.', '4', '1', 'STUDENT', '2026-04-07 02:40:42', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0, '/uploads/RAPIS_REYMOND_202218867.jpeg', 'Approved', NULL, NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImRldmljZUlkIjoiNGwwdGF6Y3IzMXhtbnV3aGtiZyIsImlhdCI6MTc3NTk1MDI2OH0.YTzITHGUqm_d7LqoJg2l4wS91TyDolnMSwIwSjZKqKk', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `year_levels`
--

CREATE TABLE `year_levels` (
  `id` int(11) NOT NULL,
  `year_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `year_levels`
--

INSERT INTO `year_levels` (`id`, `year_name`) VALUES
(1, '1'),
(2, '2'),
(3, '3'),
(4, '4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_terms`
--
ALTER TABLE `academic_terms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `allowed_students`
--
ALTER TABLE `allowed_students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_id` (`student_id`);

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_module_uploader` (`uploaded_by`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_options`
--
ALTER TABLE `question_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_grades`
--
ALTER TABLE `student_grades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `quiz_id` (`quiz_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `year_levels`
--
ALTER TABLE `year_levels`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_terms`
--
ALTER TABLE `academic_terms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `allowed_students`
--
ALTER TABLE `allowed_students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `question_options`
--
ALTER TABLE `question_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `student_grades`
--
ALTER TABLE `student_grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `year_levels`
--
ALTER TABLE `year_levels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `fk_module_uploader` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `question_options`
--
ALTER TABLE `question_options`
  ADD CONSTRAINT `question_options_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `quiz_questions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  ADD CONSTRAINT `quiz_questions_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_grades`
--
ALTER TABLE `student_grades`
  ADD CONSTRAINT `student_grades_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `student_grades_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
