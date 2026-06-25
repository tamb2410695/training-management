USE training_management;

CREATE TABLE IF NOT EXISTS ROLE (
  role_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  role_code VARCHAR(50) NOT NULL,
  role_name VARCHAR(100) NOT NULL,
  role_description VARCHAR(255) DEFAULT '' NOT NULL,

  CONSTRAINT uq_role_code UNIQUE (role_code)
);


CREATE TABLE IF NOT EXISTS ACCOUNT (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  role_id SMALLINT NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  refresh_token VARCHAR(255) DEFAULT NULL,
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


CREATE TABLE IF NOT EXISTS STAFF_PROFILE (
  staff_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  staff_code VARCHAR(25) NOT NULL,

  full_name VARCHAR(100) NOT NULL,
  gender VARCHAR(10) DEFAULT 'OTHER' NOT NULL
    CHECK (gender IN (
      'MALE',
      'FEMALE',
      'OTHER'
    )),
  date_of_birth DATE,
  identity_card VARCHAR(20),
  
  phone VARCHAR(20) NOT NULL,
  personal_email VARCHAR(255),
  address VARCHAR(255),
  
  academic_rank VARCHAR(50),
  hire_date DATE DEFAULT CURRENT_DATE() NOT NULL,

  contract_type VARCHAR(25) DEFAULT 'PROBATION' NOT NULL
    CHECK (contract_type IN (
      'PROBATION',
      'FULL_TIME',
      'PART_TIME'
    )),  
  
  staff_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL
    CHECK (staff_status IN (
      'DISABLE',
      'ACTIVE',
      'SUSPENDED',
      'ON_LEAVE',
      'TERMINATED'
    )),
  
  -- Cột ảo chống trùng tài khoản khi ẩn danh/vô hiệu hóa hồ sơ
  -- active_account_id INT GENERATED ALWAYS AS (CASE WHEN is_active = TRUE THEN account_id ELSE NULL END) STORED,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_staff_code UNIQUE (staff_code),
  CONSTRAINT uq_staff_phone UNIQUE (phone),
  -- CONSTRAINT uq_staff_active_account UNIQUE (active_account_id),
  
  CONSTRAINT uq_staff_account_id UNIQUE (account_id),
  CONSTRAINT fk_staff_account_id FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id)
);


CREATE TABLE IF NOT EXISTS DEPARTMENT (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_code VARCHAR(25) NOT NULL,
  department_name VARCHAR(100) NOT NULL,

  CONSTRAINT uq_department_code UNIQUE (department_code)
);

CREATE TABLE IF NOT EXISTS STAFF_DEPARTMENT (
  staff_id INT NOT NULL,
  department_id INT NOT NULL,
  appointment_type VARCHAR(25) DEFAULT 'PRIMARY' NOT NULL
    CHECK (appointment_type IN (
      'PRIMARY',
      'PART_TIME'
    )),
  assigned_at DATE NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  PRIMARY KEY (staff_id, department_id),
  CONSTRAINT fk_sd_staff_id FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id) ON DELETE CASCADE,
  CONSTRAINT fk_sd_department_id FOREIGN KEY (department_id) REFERENCES DEPARTMENT(department_id) ON DELETE CASCADE
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
  course_level VARCHAR(25) DEFAULT 'BEGINNER' NOT NULL 
    CHECK (course_level IN (
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


CREATE TABLE IF NOT EXISTS STAFF_CAPABILITY (
  staff_id INT NOT NULL,
  course_id INT NOT NULL,
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  
  PRIMARY KEY (staff_id, course_id),
  CONSTRAINT fk_sc_staff FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id) ON DELETE CASCADE,
  CONSTRAINT fk_sc_course FOREIGN KEY (course_id) REFERENCES COURSE(course_id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS CLASS (
  class_id INT AUTO_INCREMENT PRIMARY KEY,
  class_code VARCHAR(25) NOT NULL,
  course_id INT NOT NULL,
  start_date DATE DEFAULT CURRENT_DATE() NOT NULL,
  end_date DATE DEFAULT CURRENT_DATE() NOT NULL CHECK (end_date >= start_date),
  max_students INT NOT NULL CHECK (max_students >=0),
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
  CONSTRAINT fk_class_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
);


CREATE TABLE IF NOT EXISTS STUDENT (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT,
  student_code VARCHAR(25) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  gender VARCHAR(25) DEFAULT 'OTHER' NOT NULL
    CHECK (gender IN (
      'MALE',
      'FEMALE',
      'OTHER'
    )),
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(255) DEFAULT '' NOT NULL,
  personal_email VARCHAR(255) NOT NULL,
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

  CONSTRAINT uq_student_personal_email UNIQUE(personal_email),
  CONSTRAINT uq_student_code UNIQUE (student_code),
  CONSTRAINT uq_student_phone UNIQUE (phone),
  CONSTRAINT uq_student_account_id UNIQUE (account_id),
  CONSTRAINT fk_student_account_id FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id)
);


CREATE TABLE IF NOT EXISTS REGISTRATION (
  registration_id INT AUTO_INCREMENT PRIMARY KEY,
  registration_code VARCHAR(25) NOT NULL,

  full_name VARCHAR(50) NOT NULL,
  gender VARCHAR(25) DEFAULT 'OTHER' NOT NULL
    CHECK (gender IN (
      'MALE',
      'FEMALE',
      'OTHER'
    )),
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  personal_email VARCHAR(255) NOT NULL,
  address VARCHAR(255) DEFAULT '' NOT NULL,

  registration_status VARCHAR(25) DEFAULT 'PENDING' NOT NULL
    CHECK (registration_status IN (
      'PENDING',
      'REJECTED',
      'COMPLETED'
    )),
  student_id INT DEFAULT NULL,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_registration_code UNIQUE (registration_code),
  CONSTRAINT uq_registration_student_id UNIQUE(student_id),
  CONSTRAINT uq_registration_phone UNIQUE(phone),
  CONSTRAINT fk_registration_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id)
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

  CONSTRAINT uq_student_id_class_id UNIQUE (student_id, class_id),
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
  room_id INT NOT NULL,
  staff_id INT NOT NULL,
  class_id INT NOT NULL,
  
  session_number INT CHECK (session_number >= 0),
  session_date DATE NOT NULL,
  start_time TIME DEFAULT UTC_TIME() NOT NULL,
  end_time TIME NOT NULL CHECK (end_time >= start_time),
  
  schedule_status VARCHAR(25) DEFAULT 'ONGOING' NOT NULL
    CHECK (schedule_status IN (
      'ONGOING',
      'COMPLETED',
      'CANCELLED',
      'DELETED'
    )),
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_class_session UNIQUE(class_id, session_number),
  CONSTRAINT uq_schedule UNIQUE(room_id, session_date, start_time),
  CONSTRAINT uq_staff UNIQUE(staff_id, session_date, start_time),
  CONSTRAINT fk_schedule_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id),
  CONSTRAINT fk_schedule_staff_id FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id),
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
  marked_by_staff_id INT NOT NULL,
  marked_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  
  CONSTRAINT uq_attendance_session UNIQUE (schedule_id, student_id),
  CONSTRAINT fk_attendance_staff_id FOREIGN KEY (marked_by_staff_id) REFERENCES STAFF_PROFILE(staff_id),
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

  CONSTRAINT uq_grade UNIQUE(student_id, class_id),
  CONSTRAINT fk_grade_student_id FOREIGN KEY (student_id) REFERENCES STUDENT(student_id),
  CONSTRAINT fk_grade_class_id FOREIGN KEY (class_id) REFERENCES CLASS(class_id)
);


CREATE TABLE IF NOT EXISTS DOCUMENT (
  document_id INT AUTO_INCREMENT PRIMARY KEY,
  document_code VARCHAR(25) DEFAULT 'DOC-TEMP' NOT NULL,
  course_id INT NOT NULL,
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
  uploaded_by_staff_id INT NOT NULL,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,
  deleted_at DATETIME DEFAULT NULL,

  CONSTRAINT uq_document_code UNIQUE (document_code),
  CONSTRAINT fk_document_course_id FOREIGN KEY (course_id) REFERENCES COURSE(course_id),
  CONSTRAINT fk_document_staff_id FOREIGN KEY (uploaded_by_staff_id) REFERENCES STAFF_PROFILE(staff_id)
);


CREATE TABLE IF NOT EXISTS PAYMENT (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_code VARCHAR(25) DEFAULT 'PAY-TEMP' NOT NULL,
  enrollment_id INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  payer_name VARCHAR(100) NOT NULL,
  bank_transaction_code VARCHAR(100) NOT NULL,
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_status VARCHAR(25) DEFAULT 'UNPAID' NOT NULL
    CHECK (payment_status IN (
      'UNPAID',
      'FULLY_PAID',
      'FAILED',
      'REFUNDED'
    )),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT uq_enrollment_id UNIQUE (enrollment_id),
  CONSTRAINT uq_bank_transaction_code UNIQUE (bank_transaction_code),
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

  CONSTRAINT uq_enrollment_id UNIQUE(enrollment_id),
  CONSTRAINT uq_certificate_code UNIQUE (certificate_code),
  CONSTRAINT fk_certificate_enrollment_id FOREIGN KEY (enrollment_id) REFERENCES ENROLLMENT(enrollment_id)
);
