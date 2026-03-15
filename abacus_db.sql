-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2026 at 11:58 AM
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
-- Table structure for table `allowed_students`
--

CREATE TABLE `allowed_students` (
  `id` int(11) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `allowed_students`
--

INSERT INTO `allowed_students` (`id`, `student_id`, `email`, `created_at`) VALUES
(1, '202218701', 'tc.marionadam.purugganan@cvsu.edu.ph', '2026-02-18 07:06:00'),
(2, '202218631', 'tc.vincenteyron.gadon@cvsu.edu.ph', '2026-02-18 07:06:00'),
(3, '202218660', 'tc.nieshaanne.maglaway@cvsu.edu.ph', '2026-02-18 07:06:00'),
(4, '202218810', 'tc.paulbryan.gado@cvsu.edu.ph', '2026-02-18 07:06:00'),
(5, '202218859', 'tc.maryanne.pagota@cvsu.edu.ph', '2026-02-18 07:06:00'),
(6, '202218867', 'tc.reymond.rapis@cvsu.edu.ph', '2026-02-18 07:06:00'),
(7, '202218715', 'tc.jhanzy.samar@cvsu.edu.ph', '2026-02-18 07:06:00'),
(8, '202218637', 'tc.mikhael.garcia@cvsu.edu.ph', '2026-02-18 07:06:00');

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
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `author_role`, `author_name`, `target_year`, `target_section`, `created_at`, `is_deleted`) VALUES
(1, 'Welcome to ABACUS', 'Test announcement hee hee\n\n-michael jackson', 'ADMIN', 'Registrar', 'ALL', 'ALL', '2026-02-11 09:17:26', 0);

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
(4, 1, 'Aso', 3);

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
  `difficulty` enum('Easy','Medium','Hard') DEFAULT NULL,
  `status` enum('active','archived','deleted') DEFAULT 'active',
  `created_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `title`, `description`, `target_year`, `target_section`, `difficulty`, `status`, `created_by`, `created_at`) VALUES
(1, 'Quiz #1', 'NAPAKA IMPORTANT NA QUIZ! hahaha', '4', '1', 'Easy', 'active', 2, '2026-02-11 07:48:30');

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
(1, 1, 'What is tagalog of dog', 'multiple-choice', '', 0, 1);

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
  `date_taken` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_grades`
--

INSERT INTO `student_grades` (`id`, `user_id`, `quiz_id`, `score`, `subject_title`, `semester`, `date_taken`) VALUES
(2, 3, 1, 100.00, 'Quiz #1', '1st Sem', '2026-02-11 07:49:01'),
(3, 4, 1, 100.00, 'Quiz #1', '1st Sem', '2026-02-11 11:14:19'),
(4, 3, 1, 100.00, 'Quiz #1', '1st Sem', '2026-02-11 18:19:54'),
(5, 3, 1, 0.00, 'Quiz #1', '1st Sem', '2026-02-11 18:20:03'),
(6, 3, 1, 100.00, 'Quiz #1', '1st Sem', '2026-02-11 18:20:16'),
(7, 4, 1, 100.00, 'Quiz #1', '1st Sem', '2026-02-11 20:44:34'),
(8, 4, 1, 100.00, 'Quiz #1', '1st Sem', '2026-02-16 15:36:35');

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
  `section` varchar(10) DEFAULT '1',
  `role` enum('STUDENT','INSTRUCTOR','ADMIN') DEFAULT 'STUDENT',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `department` varchar(100) DEFAULT NULL,
  `assigned_classes` text DEFAULT NULL,
  `program` varchar(150) DEFAULT 'Bachelor of Science in Information Technology',
  `status` varchar(20) DEFAULT 'Regular',
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `student_id`, `full_name`, `email`, `password_hash`, `year_level`, `section`, `role`, `created_at`, `department`, `assigned_classes`, `program`, `status`, `is_deleted`) VALUES
(1, 'ADMIN-001', 'Super Admin', 'admin@cvsu.edu.ph', '$2b$10$5e4Yh68d3VQL0ZsTFFs/xe3GcXl.rVwA4WmzN5nODBhKhVkYNGXAm', '1', '1', 'ADMIN', '2026-02-10 15:57:58', NULL, NULL, 'BSIT', 'Regular', 0),
(2, '202218637', 'Garcia, Mikhael V.', 'tc.mikhael.garcia@cvsu.edu.ph', '$2b$10$.m6BuIJLT3w/AenK28jP.ejAusBniTg0s5tys5GJrldjpomI0ElnK', NULL, NULL, 'INSTRUCTOR', '2026-02-10 17:20:11', 'Department of Information Technology', '[{\"year\":\"4\",\"section\":\"1\"},{\"year\":\"1\",\"section\":\"1\"}]', NULL, NULL, 0),
(3, '202218715', 'SAMAR, JHANZY O.', 'tc.jhanzy.samar@cvsu.edu.ph', '$2b$10$KoM5G5mUvaQf0l7XjM0GAOb03uyjOjAKxcHz/PYRpGNTvPK.WbeH6', '4', '1', 'STUDENT', '2026-02-11 07:16:17', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0),
(4, '202218859', 'PAGOTA, MARY ANNE A.', 'tc.maryanne.pagota@cvsu.edu.ph', '$2b$10$k2EzHhs/TtT3Crtfx.kVd.g6.Rchxs6RNLZFS6lLzjzIOJIq7v4E.', '4', '1', 'STUDENT', '2026-02-11 08:25:42', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0),
(5, '202301760', 'GARCIA, GABRIEL V.', 'gabriel.garcia@cvsu.edu.ph', '$2b$10$AH.eL1FHoOlP3fbQbRm1Qemmu23guKoHiPLmUwzvCDjP533jpiZWC', '3', '2', 'STUDENT', '2026-02-11 21:01:20', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0),
(6, '202302625', 'NATNAT, JENNIFER', 'jennifer.natnat@cvsu.edu.ph', '$2b$10$Fd2wQwwfcn2GgBAMQt2v4.j.lbQydRD58i5F1c1pCiyMkAO5GPvma', '3', '2', 'STUDENT', '2026-02-12 04:09:59', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0),
(7, '202315307', 'BROSAS, JOHN GABRIEL H.', 'johngabriel.brosas@cvsu.edu.ph', '$2b$10$WRw4SOh4cQY.vA4LWI60HO9sqiBGWui1/JTpLLurKl0u/8gigfTiq', '3', '1', 'STUDENT', '2026-02-12 13:40:43', NULL, NULL, 'Bachelor of Science in Information Technology', 'Regular', 0);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allowed_students`
--
ALTER TABLE `allowed_students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `question_options`
--
ALTER TABLE `question_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quiz_questions`
--
ALTER TABLE `quiz_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `student_grades`
--
ALTER TABLE `student_grades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

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
