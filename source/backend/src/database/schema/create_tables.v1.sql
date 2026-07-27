USE training_management;

CREATE TABLE IF NOT EXISTS ROLE (
  role_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(25) DEFAULT 'STUDENT' NOT NULL
    CHECK (role_name IN (
      'ADMIN',
      'INSTRUCTOR',
      'STUDENT'
    )),
  role_description VARCHAR(255) DEFAULT '' NOT NULL,

  CONSTRAINT uq_role_name UNIQUE (role_name)
);


CREATE TABLE IF NOT EXISTS ACCOUNT (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  role_id SMALLINT NOT NULL,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  refresh_token VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) DEFAULT '' NOT NULL,
  account_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL
    CHECK (account_status IN (
      'PENDING',
      'ACTIVE', 
      'LOCKED',
      'DISABLED',
      'DELETED'
    )),
    
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_account_username UNIQUE (username),
  CONSTRAINT uq_account_email UNIQUE (email),
  CONSTRAINT fk_account_role_id FOREIGN KEY (role_id) REFERENCES ROLE(role_id)
);


CREATE TABLE IF NOT EXISTS STUDENT (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  student_code VARCHAR(25) DEFAULT 'STU-TEMP' NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  gender VARCHAR(25) DEFAULT 'OTHER' NOT NULL
    CHECK (gender IN (
      'MALE',
      'FEMALE',
      'OTHER'
    )),
  date_of_birth DATE DEFAULT CURRENT_DATE() NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) DEFAULT '' NOT NULL,
  student_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL
    CHECK (student_status IN (
      'INCOMPLETE',
      'ACTIVE', 
      'SUSPENDED',
      'GRADUATED',
      'WITHDRAWN'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_student_code UNIQUE (student_code),
  CONSTRAINT uq_student_account UNIQUE (account_id),
  CONSTRAINT fk_student_account_id FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id)
);

CREATE TABLE IF NOT EXISTS INSTRUCTOR (
  instructor_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  instructor_code VARCHAR(25) DEFAULT 'INS-TEMP' NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  gender VARCHAR(25) DEFAULT 'OTHER' NOT NULL
    CHECK (gender IN (
      'MALE',
      'FEMALE',
      'OTHER'
    )),
  date_of_birth DATE DEFAULT CURRENT_DATE() NOT NULL,
  specialization VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) DEFAULT '' NOT NULL,
  hire_date DATE DEFAULT CURRENT_DATE() NOT NULL,
  instructor_status VARCHAR(25) DEFAULT 'PROBATION' NOT NULL
    CHECK (instructor_status IN (
      'PROBATION',
      'ACTIVE', 
      'SUSPENDED',
      'ON_LEAVE',
      'TERMINATED'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_instructor_code UNIQUE (instructor_code),
  CONSTRAINT uq_instructor_account UNIQUE (account_id),
  CONSTRAINT fk_instructor_account_id FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id)
);


CREATE TABLE IF NOT EXISTS COURSE (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(50) NOT NULL,
  cover_image VARCHAR(255) DEFAULT '' NOT NULL,
  course_code VARCHAR(25) DEFAULT 'CRS-TEMP' NOT NULL,
  course_description VARCHAR(255) DEFAULT '' NOT NULL,
  duration_hours INT NOT NULL,
  total_sessions INT NOT NULL CHECK (total_sessions >= 0),
  tuition_fee DECIMAL(12, 2),
  level VARCHAR(25) DEFAULT 'BEGINNER' NOT NULL 
    CHECK (level IN (
      'BEGINNER',
      'INTERMEDIATE',
      'ADVANCED'
    )),
  certificate_available BOOLEAN DEFAULT TRUE NOT NULL,
  course_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL
    CHECK (course_status IN (
      'PENDING',
      'ACTIVE', 
      'LOCKED',
      'DISABLED',
      'DELETED'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,
  
  CONSTRAINT uq_course_code UNIQUE (course_code)
);


CREATE TABLE IF NOT EXISTS CLASS (
  class_id INT AUTO_INCREMENT PRIMARY KEY,
  class_code VARCHAR(25) DEFAULT 'CLS-TEMP' NOT NULL,
  course_id INT NOT NULL,
  instructor_id INT NOT NULL,
  start_date DATE DEFAULT CURRENT_DATE() NOT NULL,
  end_date DATE DEFAULT CURRENT_DATE() NOT NULL CHECK (end_date >= start_date),
  max_students INT NOT NULL CHECK (max_students >=0),
  current_students INT DEFAULT 0 NOT NULL CHECK (current_students >= 0),
  class_status VARCHAR(25) DEFAULT 'CLOSED' NOT NULL
    CHECK (class_status IN (
    'PENDING',
    'OPEN_REGISTRATION',
    'ONGOING',
    'COMPLETED',
    'DELETED'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_class_code UNIQUE (class_code),
  CONSTRAINT fk_class_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  CONSTRAINT fk_class_instructor_id FOREIGN KEY (instructor_id) REFERENCES INSTRUCTOR(instructor_id)
);


CREATE TABLE IF NOT EXISTS ENROLLMENT (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  enrollment_code VARCHAR(25) DEFAULT 'ERM-TEMP' NOT NULL,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  enrollment_status VARCHAR(25) DEFAULT 'PENDING' NOT NULL
    CHECK (enrollment_status IN (
      'PENDING',
      'WAITING_FOR_PAYMENT',
      'CONFIRMED', 
      'CANCELLED',
      'REFUNDED'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,
  
  CONSTRAINT uq_enrollment_code UNIQUE (enrollment_code),
  CONSTRAINT fk_enrollment_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_enrollment_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id)
);


CREATE TABLE IF NOT EXISTS ROOM (
  room_id INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(25) NOT NULL,
  room_code VARCHAR(25) DEFAULT 'ROOM-TEMP' NOT NULL,
  capacity INT NOT NULL CHECK (capacity >= 0),
  room_location VARCHAR(50) NOT NULL,
  room_status VARCHAR(25) DEFAULT 'AVAILABLE' NOT NULL
    CHECK (room_status IN (
      'AVAILABLE',
      'MAINTENANCE'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,
  
  CONSTRAINT uq_room_code UNIQUE (room_code)
);


CREATE TABLE IF NOT EXISTS SCHEDULE (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  room_id INT NOT NULL,
  session_number INT CHECK (session_number >= 0),
  session_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  start_time TIME DEFAULT UTC_TIME() NOT NULL,
  end_time TIME NOT NULL CHECK (end_time >= start_time),

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT fk_schedule_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id),
  CONSTRAINT fk_schedule_room_id FOREIGN KEY (room_id) REFERENCES ROOM(room_id)
);


CREATE TABLE IF NOT EXISTS ATTENDANCE (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  schedule_id INT NOT NULL,
  attendance_status VARCHAR(25) DEFAULT 'PRESENT' NOT NULL
    CHECK (attendance_status IN (
      'PRESENT',
      'ABSENT', 
      'LATE',
      'EXCUSED'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  
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

  grade_status VARCHAR(25) DEFAULT 'DRAFT' NOT NULL
    CHECK (grade_status IN (
      'DRAFT',
      'PUBLISHED',
      'LOCKED'
      )),
  result VARCHAR(50) NOT NULL DEFAULT 'PASSED',

  CONSTRAINT fk_grade_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_grade_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id)
);


CREATE TABLE IF NOT EXISTS DOCUMENT (
  document_id INT AUTO_INCREMENT PRIMARY KEY,
  document_code VARCHAR(25) DEFAULT 'DOC-TEMP' NOT NULL,
  course_id INT NOT NULL,
  instructor_id INT NOT NULL,
  title VARCHAR(255) DEFAULT 'UNTITLED' NOT NULL,
  file_path VARCHAR(255) DEFAULT '' NOT NULL,
  document_description VARCHAR(255) DEFAULT '' NOT NULL,
  is_visible BOOLEAN DEFAULT FALSE NOT NULL,
  document_status VARCHAR(25) DEFAULT 'AVAILABLE' NOT NULL
    CHECK (document_status IN (
      'AVAILABLE',
      'ARCHIVED',
      'DELETED'
    )),
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_document_code UNIQUE (document_code),
  CONSTRAINT fk_document_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  CONSTRAINT fk_document_instructor_id FOREIGN KEY (instructor_id) REFERENCES INSTRUCTOR(instructor_id)
);


CREATE TABLE IF NOT EXISTS PAYMENT (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_code VARCHAR(25) DEFAULT 'PAY-TEMP' NOT NULL,
  enrollment_id INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  transaction_code VARCHAR(100) DEFAULT NULL,
  payment_status VARCHAR(25) DEFAULT 'UNPAID' NOT NULL
    CHECK (payment_status IN (
      'UNPAID',
      'PARTIALLY_PAID',
      'FULLY_PAID',
      'FAILED',
      'REFUNDED'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_payment_code UNIQUE (payment_code),
  CONSTRAINT fk_payment_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES ENROLLMENT(enrollment_id)
);


CREATE TABLE IF NOT EXISTS CERTIFICATE (
  certificate_id INT AUTO_INCREMENT PRIMARY KEY,
  certificate_code VARCHAR(25) DEFAULT 'CERT-TEMP' NOT NULL,
  enrollment_id INT NOT NULL,
  issue_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  certificate_status VARCHAR(25) DEFAULT 'ISSUED' NOT NULL
    CHECK (certificate_status IN (
      'ISSUED',
      'REVOKED'
    )),

  CONSTRAINT uq_certificate_code UNIQUE (certificate_code),
  CONSTRAINT fk_certificate_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES ENROLLMENT(enrollment_id)
);

INSERT INTO ROLE (role_name, role_description) 
VALUES 
  ('ADMIN', 'Administrator'),
  ('INSTRUCTOR', 'Instructor'),
  ('STUDENT', 'Student');

