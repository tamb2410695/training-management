USE training_management;

CREATE TABLE IF NOT EXISTS ROLE (
  role_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(25) NOT NULL,
  role_description VARCHAR(255) DEFAULT '' NOT NULL,

  CONSTRAINT uq_role_name UNIQUE (role_name)
);


CREATE TABLE IF NOT EXISTS ACCOUNT (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  role_id SMALLINT NOT NULL,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  account_status VARCHAR(25) DEFAULT 'UNLOCKED' NOT NULL, /* LOCKED | UNLOCKED */
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_account UNIQUE (username, email),
  CONSTRAINT fk_account_role_id FOREIGN KEY (role_id) REFERENCES ROLE(role_id)
);


CREATE TABLE IF NOT EXISTS STUDENT (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  gender BOOLEAN DEFAULT FALSE NOT NULL, /* FALSE is male, TRUE is female */
  date_of_birth DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) DEFAULT '' NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT fk_student_account_id FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id)
);


CREATE TABLE IF NOT EXISTS INSTRUCTOR (
  instructor_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  gender BOOLEAN DEFAULT FALSE NOT NULL, /* FALSE is male, TRUE is female */
  date_of_birth DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  specialization VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  hire_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT fk_instructor_account_id FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id)
);


CREATE TABLE IF NOT EXISTS COURSE (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(50) NOT NULL,
  course_description VARCHAR(255) NOT NULL,
  duration_hours INT NOT NULL,
  total_sessions INT NOT NULL CHECK (total_sessions >= 0),
  tuition_fee DECIMAL(12, 2),
  certificate_available BOOLEAN DEFAULT TRUE,
  course_status VARCHAR(25) DEFAULT 'OPENING' /* OPENING | ENDED */
);


CREATE TABLE IF NOT EXISTS CLASS (
  class_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  instructor_id INT NOT NULL,
  class_code VARCHAR(25) NOT NULL, /* CL01 */
  start_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  end_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL CHECK (end_date >= start_date),
  max_students INT NOT NULL CHECK (max_students >=0),
  class_status VARCHAR(25) DEFAULT 'STUDYING' NOT NULL, /**/

  CONSTRAINT fk_class_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  CONSTRAINT fk_class_instructor_id FOREIGN KEY (instructor_id) REFERENCES INSTRUCTOR(instructor_id)
);


CREATE TABLE IF NOT EXISTS ENROLLMENT (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  enrollment_status VARCHAR(25) DEFAULT 'PENDING' NOT NULL, /* PENDING | ACCEPTED */

  CONSTRAINT fk_enrollment_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_enrollment_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id)
);


CREATE TABLE IF NOT EXISTS ROOM (
  room_id INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(25) NOT NULL,
  capacity INT NOT NULL CHECK (capacity >= 0),
  room_location VARCHAR(50) NOT NULL,
  room_status VARCHAR(25) DEFAULT 'EMPTY' NOT NULL /* EMPTY | FULL*/
);


CREATE TABLE IF NOT EXISTS SCHEDULE (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  room_id INT NOT NULL,
  session_number INT CHECK (session_number >= 0),
  session_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  start_time TIME DEFAULT UTC_TIME() NOT NULL,
  end_time TIME NOT NULL CHECK (end_time >= start_time),

  CONSTRAINT fk_schedule_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id),
  CONSTRAINT fk_schedule_room_id FOREIGN KEY (room_id) REFERENCES ROOM(room_id)
);


CREATE TABLE IF NOT EXISTS ATTENDANCE (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  schedule_id INT NOT NULL,
  attendance_status VARCHAR(25) DEFAULT 'PRESENT' NOT NULL, /* PRESENT | ABSENT | LATE | EXCUSED */

  CONSTRAINT fk_attendance_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_attendance_schedule_id FOREIGN KEY (schedule_id) REFERENCES SCHEDULE(schedule_id)
);


CREATE TABLE IF NOT EXISTS GRADE (
  grade_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  class_id INT NOT NULL,

  assignment_score DECIMAL(5,2) DEFAULT 0  NOT NULL CHECK (assignment_score >= 0),
  midterm_score DECIMAL(5,2) DEFAULT 0  NOT NULL CHECK (midterm_score >= 0),
  final_score DECIMAL(5,2) DEFAULT 0  NOT NULL CHECK (final_score >= 0),
  average_score DECIMAL(5,2) DEFAULT 0  NOT NULL CHECK (average_score >= 0),

  result VARCHAR(50) NOT NULL DEFAULT 'PASSED',

  CONSTRAINT fk_grade_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_grade_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id)
);


CREATE TABLE IF NOT EXISTS DOCUMENT (
  document_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  instructor_id INT NOT NULL,
  title VARCHAR(255) DEFAULT 'UNITED' NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  document_description VARCHAR(255) DEFAULT '' NOT NULL,
  is_visible BOOLEAN DEFAULT FALSE NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT fk_document_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  CONSTRAINT fk_document_instructor_id FOREIGN KEY (instructor_id) REFERENCES INSTRUCTOR(instructor_id)
);


CREATE TABLE IF NOT EXISTS PAYMENT (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(25) DEFAULT 'FULLY_PAYMENT' NOT NULL, /* FULLY_PAYMENT | NOT_PAYMENT | ... */

  CONSTRAINT fk_payment_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES ENROLLMENT(enrollment_id)
);


CREATE TABLE IF NOT EXISTS CERTIFICATE (
  certificate_id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_id INT NOT NULL,
  certificate_code VARCHAR(25) DEFAULT 'CE001' NOT NULL,
  issue_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  certificate_status VARCHAR(25) DEFAULT '' NOT NULL, /*  | ... */

  CONSTRAINT fk_payment_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES ENROLLMENT(enrollment_id)
);

INSERT INTO ROLE (role_name, role_description) 
VALUES ('Admin', 'Administractor'),
('Instructor', 'Inustructor'),
('Student', 'Student');


INSERT INTO ACCOUNT (role_id, username, password_hash, email) VALUES (1, 'admin', '123456', 'admin@gmail.com');

