CREATE DATABASE IF NOT EXISTS training_management;
USE training_management;

-- =========================================================================
-- 1. ROLE
-- =========================================================================
CREATE TABLE IF NOT EXISTS ROLE (
  role_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  role_code VARCHAR(50) NOT NULL,
  role_lable VARCHAR(100) NOT NULL,
  role_description VARCHAR(255) DEFAULT '' NOT NULL,

  CONSTRAINT uq_role_role_code UNIQUE (role_code)
);

-- =========================================================================
-- 2. ACCOUNT
-- =========================================================================
CREATE TABLE IF NOT EXISTS ACCOUNT (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  refresh_token VARCHAR(255) DEFAULT NULL,
  avatar_url VARCHAR(255) DEFAULT '' NOT NULL,
  account_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_account_username UNIQUE (username),
  CONSTRAINT uq_account_email UNIQUE (email),
  CONSTRAINT chk_account_status CHECK (account_status IN ('PENDING', 'ACTIVE', 'LOCKED', 'DISABLED', 'DELETED'))
);

CREATE TABLE IF NOT EXISTS USER_ROLE (
  account_id INT NOT NULL,
  role_id SMALLINT NOT NULL,

  assigned_by INT DEFAULT NULL,
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  PRIMARY KEY(account_id, role_id),
  CONSTRAINT fk_user_role_account FOREIGN KEY(account_id) REFERENCES ACCOUNT(account_id),
  CONSTRAINT fk_user_role_role FOREIGN KEY(role_id) REFERENCES ROLE(role_id),
  CONSTRAINT fk_user_role_assigned_by FOREIGN KEY(assigned_by) REFERENCES ACCOUNT(account_id)
);
-- =========================================================================
-- 3. STAFF_PROFILE
-- =========================================================================
CREATE TABLE IF NOT EXISTS STAFF_PROFILE (
  staff_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  staff_code VARCHAR(25) NULL,
  full_name VARCHAR(100) NOT NULL,
  gender VARCHAR(10) DEFAULT 'OTHER' NOT NULL,
  date_of_birth DATE NULL,
  identity_card VARCHAR(20) NULL,
  phone VARCHAR(20) NULL,
  personal_email VARCHAR(255) NULL,
  address VARCHAR(255) NULL,
  academic_rank VARCHAR(50) NULL,
  hire_date DATE DEFAULT (CURRENT_DATE()) NOT NULL,
  contract_type VARCHAR(25) DEFAULT 'PROBATION' NOT NULL,  
  staff_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_staff_profile_staff_code UNIQUE (staff_code),
  CONSTRAINT uq_staff_profile_phone UNIQUE (phone),
  CONSTRAINT uq_staff_profile_account_id UNIQUE (account_id),
  CONSTRAINT fk_staff_profile_account_id FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id),
  CONSTRAINT chk_staff_profile_gender CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
  CONSTRAINT chk_staff_profile_contract_type CHECK (contract_type IN ('PROBATION', 'FULL_TIME', 'PART_TIME')),
  CONSTRAINT chk_staff_profile_status CHECK (staff_status IN ('DISABLE', 'ACTIVE', 'SUSPENDED', 'ON_LEAVE', 'TERMINATED'))
);

-- =========================================================================
-- 4. DEPARTMENT
-- =========================================================================
CREATE TABLE IF NOT EXISTS DEPARTMENT (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_code VARCHAR(25) NOT NULL,
  department_name VARCHAR(100) NOT NULL,

  CONSTRAINT uq_department_department_code UNIQUE (department_code)
);

-- =========================================================================
-- 5. STAFF_DEPARTMENT
-- =========================================================================
CREATE TABLE IF NOT EXISTS STAFF_DEPARTMENT (
  staff_id INT NOT NULL,
  department_id INT NOT NULL,
  appointment_type VARCHAR(25) DEFAULT 'PRIMARY' NOT NULL,
  assigned_at DATE NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  PRIMARY KEY (staff_id, department_id),
  CONSTRAINT fk_staff_department_staff_id FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id) ON DELETE CASCADE,
  CONSTRAINT fk_staff_department_department_id FOREIGN KEY (department_id) REFERENCES DEPARTMENT(department_id) ON DELETE CASCADE,
  CONSTRAINT chk_staff_department_appointment_type CHECK (appointment_type IN ('PRIMARY', 'PART_TIME'))
);

-- =========================================================================
-- 6. COURSE
-- =========================================================================
CREATE TABLE IF NOT EXISTS COURSE (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(50) NOT NULL,
  cover_image VARCHAR(255) DEFAULT '' NOT NULL,
  course_code VARCHAR(25) DEFAULT 'CRS-TEMP' NOT NULL,
  course_description VARCHAR(255) DEFAULT '' NOT NULL,
  duration_hours INT NOT NULL,
  total_sessions INT NOT NULL,
  tuition_fee DECIMAL(12, 2) NULL,
  course_level VARCHAR(25) DEFAULT 'BEGINNER' NOT NULL, 
  certificate_available BOOLEAN DEFAULT TRUE NOT NULL,
  course_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,
  
  CONSTRAINT uq_course_course_code UNIQUE (course_code),
  CONSTRAINT chk_course_total_sessions CHECK (total_sessions >= 0),
  CONSTRAINT chk_course_course_level CHECK (course_level IN ('BEGINNER', 'INTERMEDIATE', 'ADVANCED')),
  CONSTRAINT chk_course_course_status CHECK (course_status IN ('PENDING', 'ACTIVE', 'LOCKED', 'DISABLED', 'DELETED'))
);

-- =========================================================================
-- 7. STAFF_CAPABILITY
-- =========================================================================
CREATE TABLE IF NOT EXISTS STAFF_CAPABILITY (
  staff_id INT NOT NULL,
  course_id INT NOT NULL,
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  
  PRIMARY KEY (staff_id, course_id),
  CONSTRAINT fk_staff_capability_staff_id FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id) ON DELETE CASCADE,
  CONSTRAINT fk_staff_capability_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id) ON DELETE CASCADE
);

-- =========================================================================
-- 8. CLASS
-- =========================================================================
CREATE TABLE IF NOT EXISTS CLASS (
  class_id INT AUTO_INCREMENT PRIMARY KEY,
  class_code VARCHAR(25) NOT NULL,
  course_id INT NOT NULL,
  start_date DATE DEFAULT (CURRENT_DATE()) NOT NULL,
  end_date DATE DEFAULT (CURRENT_DATE()) NOT NULL,

  max_students INT NOT NULL,
  class_status VARCHAR(25) DEFAULT 'CLOSED' NOT NULL,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_class_class_code UNIQUE (class_code),
  CONSTRAINT fk_class_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  CONSTRAINT chk_class_dates CHECK (end_date >= start_date), -- Chuyển xuống cấp table level
  CONSTRAINT chk_class_max_students CHECK (max_students >= 0),
  CONSTRAINT chk_class_status CHECK (class_status IN ('PENDING', 'OPEN_REGISTRATION', 'ONGOING', 'COMPLETED', 'DELETED'))
);

-- =========================================================================
-- 9. STUDENT
-- =========================================================================
CREATE TABLE IF NOT EXISTS STUDENT (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NULL,
  student_code VARCHAR(25) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  gender VARCHAR(25) DEFAULT 'OTHER' NOT NULL,
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) DEFAULT '' NOT NULL,
  personal_email VARCHAR(255) NOT NULL,
  student_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_student_personal_email UNIQUE(personal_email),
  CONSTRAINT uq_student_student_code UNIQUE (student_code),
  CONSTRAINT uq_student_phone UNIQUE (phone),
  CONSTRAINT uq_student_account_id UNIQUE (account_id),
  CONSTRAINT fk_student_account_id FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id),
  CONSTRAINT chk_student_gender CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
  CONSTRAINT chk_student_status CHECK (student_status IN ('INCOMPLETE', 'ACTIVE', 'SUSPENDED', 'GRADUATED', 'WITHDRAWN'))
);

-- =========================================================================
-- 10. REGISTRATION
-- =========================================================================
CREATE TABLE IF NOT EXISTS REGISTRATION (
  registration_id INT AUTO_INCREMENT PRIMARY KEY,
  registration_code VARCHAR(25) NOT NULL,
  course_id INT DEFAULT NULL,
  
  full_name VARCHAR(50) NOT NULL,
  gender VARCHAR(25) DEFAULT 'OTHER' NOT NULL,
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  personal_email VARCHAR(255) NOT NULL,
  address VARCHAR(255) DEFAULT '' NOT NULL,
  registration_status VARCHAR(25) DEFAULT 'PENDING' NOT NULL,
  student_id INT DEFAULT NULL,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_registration_registration_code UNIQUE (registration_code),
  CONSTRAINT uq_registration_student_id UNIQUE (student_id),
  CONSTRAINT uq_registration_phone UNIQUE (phone),
  CONSTRAINT fk_registration_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_registration_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  CONSTRAINT chk_registration_gender CHECK (gender IN ('MALE', 'FEMALE', 'OTHER')),
  CONSTRAINT chk_registration_status CHECK (registration_status IN ('PENDING', 'REJECTED', 'COMPLETED'))
);

-- =========================================================================
-- 11. ENROLLMENT
-- =========================================================================
CREATE TABLE IF NOT EXISTS ENROLLMENT (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_code VARCHAR(25) DEFAULT 'ERM-TEMP' NOT NULL,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  enrollment_status VARCHAR(25) DEFAULT 'PENDING' NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_enrollment_student_class UNIQUE (student_id, class_id),
  CONSTRAINT uq_enrollment_enrollment_code UNIQUE (enrollment_code),
  CONSTRAINT fk_enrollment_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_enrollment_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id),
  CONSTRAINT chk_enrollment_status CHECK (enrollment_status IN ('PENDING', 'WAITING_FOR_PAYMENT', 'CONFIRMED', 'CANCELLED', 'REFUNDED'))
);

-- =========================================================================
-- 12. ROOM
-- =========================================================================
CREATE TABLE IF NOT EXISTS ROOM (
  room_id INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(25) NOT NULL,
  room_code VARCHAR(25) DEFAULT 'ROOM-TEMP' NOT NULL,
  capacity INT NOT NULL,
  room_location VARCHAR(50) NOT NULL,
  room_status VARCHAR(25) DEFAULT 'AVAILABLE' NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,
  
  CONSTRAINT uq_room_room_code UNIQUE (room_code),
  CONSTRAINT chk_room_capacity CHECK (capacity >= 0),
  CONSTRAINT chk_room_status CHECK (room_status IN ('AVAILABLE', 'MAINTENANCE'))
);

-- =========================================================================
-- 13. SCHEDULE
-- =========================================================================
CREATE TABLE IF NOT EXISTS SCHEDULE (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT NOT NULL,
  staff_id INT NOT NULL,
  class_id INT NOT NULL,
  session_number INT NULL,
  session_date DATE NOT NULL,
  start_time TIME DEFAULT (CURRENT_TIME()) NOT NULL,
  end_time TIME NOT NULL,
  schedule_status VARCHAR(25) DEFAULT 'ONGOING' NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_schedule_class_session UNIQUE(class_id, session_number),
  CONSTRAINT uq_schedule_room_time UNIQUE(room_id, session_date, start_time),
  CONSTRAINT uq_schedule_staff_time UNIQUE(staff_id, session_date, start_time),
  CONSTRAINT fk_schedule_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id),
  CONSTRAINT fk_schedule_staff_id FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id),
  CONSTRAINT fk_schedule_room_id FOREIGN KEY (room_id) REFERENCES ROOM(room_id),
  CONSTRAINT chk_schedule_session_number CHECK (session_number >= 0),
  CONSTRAINT chk_schedule_times CHECK (end_time >= start_time),
  CONSTRAINT chk_schedule_status CHECK (schedule_status IN ('ONGOING', 'COMPLETED', 'CANCELLED', 'DELETED'))
);

-- =========================================================================
-- 14. ATTENDANCE
-- =========================================================================
CREATE TABLE IF NOT EXISTS ATTENDANCE (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  schedule_id INT NOT NULL,
  attendance_status VARCHAR(25) DEFAULT 'PRESENT' NOT NULL,
  marked_by_staff_id INT NOT NULL,
  marked_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  
  CONSTRAINT uq_attendance_schedule_student UNIQUE (schedule_id, student_id),
  CONSTRAINT fk_attendance_staff_id FOREIGN KEY (marked_by_staff_id) REFERENCES STAFF_PROFILE(staff_id),
  CONSTRAINT fk_attendance_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_attendance_schedule_id FOREIGN KEY (schedule_id) REFERENCES SCHEDULE(schedule_id),
  CONSTRAINT chk_attendance_status CHECK (attendance_status IN ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED'))
);

-- =========================================================================
-- 15. GRADE
-- =========================================================================
CREATE TABLE IF NOT EXISTS GRADE (
  grade_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  assignment_score DECIMAL(5,2) DEFAULT 0 NOT NULL,
  midterm_score DECIMAL(5,2) DEFAULT 0 NOT NULL,
  final_score DECIMAL(5,2) DEFAULT 0 NOT NULL,
  average_score DECIMAL(5,2) DEFAULT 0 NOT NULL,
  grade_status VARCHAR(25) DEFAULT 'DRAFT' NOT NULL,
  result VARCHAR(50) NOT NULL DEFAULT 'PASSED',

  CONSTRAINT uq_grade_student_class UNIQUE(student_id, class_id),
  CONSTRAINT fk_grade_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_grade_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id),
  CONSTRAINT chk_grade_assignment_score CHECK (assignment_score >= 0),
  CONSTRAINT chk_grade_midterm_score CHECK (midterm_score >= 0),
  CONSTRAINT chk_grade_final_score CHECK (final_score >= 0),
  CONSTRAINT chk_grade_average_score CHECK (average_score >= 0),
  CONSTRAINT chk_grade_status CHECK (grade_status IN ('DRAFT', 'PUBLISHED', 'LOCKED'))
);

-- =========================================================================
-- 16. DOCUMENT
-- =========================================================================
CREATE TABLE IF NOT EXISTS DOCUMENT (
  document_id INT AUTO_INCREMENT PRIMARY KEY,
  document_code VARCHAR(25) NOT NULL,
  course_id INT NOT NULL,
  title VARCHAR(255) DEFAULT 'UNTITLED' NOT NULL,
  file_path VARCHAR(255) DEFAULT '' NOT NULL,
  original_name VARCHAR(255) DEFAULT NULL,
  stored_name VARCHAR(255) DEFAULT NULL,
  mime_type VARCHAR(100) DEFAULT NULL,
  extension VARCHAR(10) DEFAULT NULL,
  file_size INT DEFAULT 0 NOT NULL,
  document_description VARCHAR(255) DEFAULT '' NOT NULL,

  category VARCHAR(50) DEFAULT 'GENERAL' NOT NULL,
  is_visible BOOLEAN DEFAULT FALSE NOT NULL,

  document_status VARCHAR(25) DEFAULT 'AVAILABLE' NOT NULL,
  
  uploaded_by_staff_id INT NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_document_document_code UNIQUE (document_code),
  CONSTRAINT fk_document_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  CONSTRAINT fk_document_staff_id FOREIGN KEY (uploaded_by_staff_id) REFERENCES STAFF_PROFILE(staff_id),
  CONSTRAINT chk_document_status CHECK (document_status IN ('AVAILABLE', 'ARCHIVED', 'DELETED'))
);


-- =========================================================================
-- 17. PAYMENT
-- =========================================================================
CREATE TABLE IF NOT EXISTS PAYMENT (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_code VARCHAR(25) DEFAULT 'PAY-TEMP' NOT NULL,
  enrollment_id INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payer_name VARCHAR(100) NOT NULL,
  bank_transaction_code VARCHAR(100) NOT NULL,
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(25) DEFAULT 'UNPAID' NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_payment_enrollment_id UNIQUE (enrollment_id),
  CONSTRAINT uq_payment_bank_transaction UNIQUE (bank_transaction_code),
  CONSTRAINT uq_payment_payment_code UNIQUE (payment_code),
  CONSTRAINT fk_payment_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES ENROLLMENT(enrollment_id),
  CONSTRAINT chk_payment_status CHECK (payment_status IN ('UNPAID', 'FULLY_PAID', 'FAILED', 'REFUNDED'))
);

-- =========================================================================
-- 18. CERTIFICATE
-- =========================================================================
CREATE TABLE IF NOT EXISTS CERTIFICATE (
  certificate_id INT AUTO_INCREMENT PRIMARY KEY,
  certificate_code VARCHAR(25) DEFAULT 'CERT-TEMP' NOT NULL,
  enrollment_id INT NOT NULL,
  issue_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  certificate_status VARCHAR(25) DEFAULT 'ISSUED' NOT NULL,

  CONSTRAINT uq_certificate_enrollment_id UNIQUE(enrollment_id),
  CONSTRAINT uq_certificate_certificate_code UNIQUE (certificate_code),
  CONSTRAINT fk_certificate_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES ENROLLMENT(enrollment_id),
  CONSTRAINT chk_certificate_status CHECK (certificate_status IN ('ISSUED', 'REVOKED'))
);



