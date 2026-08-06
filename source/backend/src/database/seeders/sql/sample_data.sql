
INSERT INTO ROLE (role_code, role_label, role_description)
VALUES
('ADMIN',      'Administrator', 'System administrator'),
('STAFF',      'Staff',         'Training staff'),
('TEACHER',    'Teacher',       'Instructor'),
('STUDENT',    'Student',       'Student account'),
('ACCOUNTANT', 'Accountant',   'Finance staff');


INSERT INTO ACCOUNT (role_id, username, email, password_hash, account_status)
VALUES
(1, 'admin',     'admin@example.com',     'hash1',  'ACTIVE'),
(2, 'staff01',   'staff01@example.com',   'hash2',  'ACTIVE'),
(3, 'teacher01', 'teacher01@example.com', 'hash3',  'ACTIVE'),
(4, 'student01', 'student01@example.com', 'hash4',  'ACTIVE'),
(4, 'student02', 'student02@example.com', 'hash5',  'LOCK'),
(4, 'student03', 'student03@example.com', 'hash6',  'ACTIVE'),
(4, 'student04', 'student04@example.com', 'hash7',  'ACTIVE'),
(4, 'student05', 'student05@example.com', 'hash8',  'DISABLE'),
(4, 'student06', 'student06@example.com', 'hash9',  'ACTIVE'),
(4, 'student07', 'student07@example.com', 'hash10', 'ACTIVE');


INSERT INTO STAFF_PROFILE
(account_id, staff_code, full_name, gender, date_of_birth,
 phone, personal_email, address, hire_date, staff_status)
VALUES
(1, 'ST001', 'Nguyen Van Admin', 'MALE', '1985-01-10',
 '0901000001', 'admin@company.com', 'Can Tho', '2020-01-01', 'ACTIVE'),

(2, 'ST002', 'Tran Thi Staff', 'FEMALE', '1990-03-15',
 '0901000002', 'staff@company.com', 'Can Tho', '2021-02-01', 'ACTIVE'),

(3, 'ST003', 'Le Van Teacher', 'MALE', '1988-06-20',
 '0901000003', 'teacher@company.com', 'Can Tho', '2019-08-01', 'ACTIVE'),

(4, 'ST004', 'Pham Thi Assistant', 'FEMALE', '1992-05-01',
 '0901000004', 'assistant@company.com', 'Can Tho', '2022-01-15', 'ON_LEAVE'),

(5, 'ST005', 'Hoang Van Mentor', 'MALE', '1987-12-08',
 '0901000005', 'mentor@company.com', 'Can Tho', '2018-06-01', 'ACTIVE');


INSERT INTO STUDENT_PROFILE
(account_id, student_code, full_name, gender, date_of_birth,
 phone, personal_email, address, student_status)
VALUES
(6,  'SV001', 'Nguyen Van A', 'MALE',   '2003-01-01',
 '0911111111', 'a@gmail.com', 'Can Tho', 'ACTIVE'),

(7,  'SV002', 'Tran Thi B', 'FEMALE', '2003-02-02',
 '0911111112', 'b@gmail.com', 'Can Tho', 'ACTIVE'),

(8,  'SV003', 'Le Van C', 'MALE', '2002-03-03',
 '0911111113', 'c@gmail.com', 'Can Tho', 'ACTIVE'),

(9,  'SV004', 'Pham Thi D', 'FEMALE', '2003-04-04',
 '0911111114', 'd@gmail.com', 'Can Tho', 'SUSPENDED'),

(10, 'SV005', 'Hoang Van E', 'MALE', '2002-05-05',
 '0911111115', 'e@gmail.com', 'Can Tho', 'GRADUATED');


INSERT INTO COURSE_CATEGORY (category_code, category_name, description)
VALUES
('WEB', 'Web Development', 'Web development courses'),
('JAVA', 'Java Programming', 'Java programming courses'),
('DB', 'Database', 'Database courses'),
('AI', 'Artificial Intelligence', 'Artificial Intelligence courses'),
('ENG', 'English', 'English language courses');


INSERT INTO COURSE
(category_id, course_code, course_name, description, duration_hours, course_status)
VALUES
(1, 'WEB01', 'HTML CSS JavaScript',
 'Basic web development using HTML, CSS and JavaScript.', 60, 'ACTIVE'),

(2, 'JAVA01', 'Java Core',
 'Core Java programming for beginners.', 80, 'ACTIVE'),

(3, 'DB01', 'MySQL Database',
 'Database design and MySQL fundamentals.', 45, 'ACTIVE'),

(4, 'AI01', 'Python for AI',
 'Python programming for Artificial Intelligence.', 90, 'ACTIVE'),

(5, 'ENG01', 'English Communication',
 'Practical English communication skills.', 40, 'DISABLE');


INSERT INTO CLASS
(course_id, teacher_id, class_code, class_name, start_date,
 end_date, max_students, class_status)
VALUES
(1, 3, 'CLS001', 'Web Development K1',
 '2026-09-01', '2026-10-15', 30, 'OPEN'),

(2, 3, 'CLS002', 'Java Core K1',
 '2026-09-05', '2026-11-05', 25, 'OPEN'),

(3, 3, 'CLS003', 'Database K1',
 '2026-09-10', '2026-10-20', 35, 'ONGOING'),

(4, 5, 'CLS004', 'Python AI K1',
 '2026-09-15', '2026-12-15', 20, 'FULL'),

(5, 5, 'CLS005', 'English Communication K1',
 '2026-09-20', '2026-11-20', 40, 'COMPLETED');


INSERT INTO REGISTRATION
(full_name, gender, date_of_birth, phone, personal_email,
 address, student_id, course_id, registration_status)
VALUES
('Nguyen Van A', 'MALE', '2003-01-01', '0922000001',
 'reg1@gmail.com', 'Can Tho', 1, 1, 'APPROVED'),

('Tran Thi B', 'FEMALE', '2003-02-02', '0922000002',
 'reg2@gmail.com', 'Can Tho', 2, 2, 'PENDING'),

('Le Van C', 'MALE', '2002-03-03', '0922000003',
 'reg3@gmail.com', 'Can Tho', 3, 3, 'APPROVED'),

('Pham Thi D', 'FEMALE', '2003-04-04', '0922000004',
 'reg4@gmail.com', 'Can Tho', 4, 4, 'REJECTED'),

('Hoang Van E', 'MALE', '2002-05-05', '0922000005',
 'reg5@gmail.com', 'Can Tho', 5, 5, 'APPROVED');


INSERT INTO ENROLLMENT
(student_id, class_id, enrollment_date, enrollment_status)
VALUES
(1, 1, '2026-08-01 08:00:00', 'APPROVED'),
(2, 2, '2026-08-02 08:00:00', 'APPROVED'),
(3, 3, '2026-08-03 08:00:00', 'PENDING'),
(4, 4, '2026-08-04 08:00:00', 'APPROVED'),
(5, 5, '2026-08-05 08:00:00', 'REJECTED');


INSERT INTO DOCUMENT
(course_id, uploaded_by, document_code, title, description,
 category, file_path, original_name, stored_name,
 mime_type, extension, file_size, is_visible, document_status)
VALUES
(1, 3, 'DOC001', 'HTML Slides', 'Lecture 1',
 'SLIDE', '/docs/html.pdf', 'html.pdf', 'f1.pdf',
 'application/pdf', 'pdf', 102400, TRUE, 'AVAILABLE'),

(2, 3, 'DOC002', 'Java Notes', 'Week 1',
 'NOTE', '/docs/java.pdf', 'java.pdf', 'f2.pdf',
 'application/pdf', 'pdf', 204800, TRUE, 'AVAILABLE'),

(3, 3, 'DOC003', 'MySQL Guide', 'Database guide',
 'BOOK', '/docs/mysql.pdf', 'mysql.pdf', 'f3.pdf',
 'application/pdf', 'pdf', 307200, TRUE, 'ARCHIVED'),

(4, 5, 'DOC004', 'Python AI', 'AI lecture material',
 'SLIDE', '/docs/python.pdf', 'python.pdf', 'f4.pdf',
 'application/pdf', 'pdf', 409600, FALSE, 'AVAILABLE'),

(5, 5, 'DOC005', 'English Book', 'Communication book',
 'BOOK', '/docs/eng.pdf', 'eng.pdf', 'f5.pdf',
 'application/pdf', 'pdf', 512000, TRUE, 'DELETED');