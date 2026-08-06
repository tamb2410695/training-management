CREATE DATABASE IF NOT EXISTS training_management;
USE training_management;

CREATE TABLE ROLE (
  role_id SMALLINT AUTO_INCREMENT PRIMARY KEY,
  role_code VARCHAR(30) NOT NULL,
  role_label VARCHAR(100) NOT NULL,
  role_description VARCHAR(255) DEFAULT '',
  CONSTRAINT uq_role_code UNIQUE(role_code)
);

CREATE TABLE ACCOUNT (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  role_id SMALLINT NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  account_status VARCHAR(25) DEFAULT 'ACTIVE',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,

  CONSTRAINT fk_account_role FOREIGN KEY(role_id) REFERENCES ROLE(role_id),
  CONSTRAINT uq_account_username UNIQUE(username),
  CONSTRAINT uq_account_email UNIQUE(email),
  CONSTRAINT chk_account_status
    CHECK ( 
      account_status IN (
        'ACTIVE',
        'LOCK',
        'DISABLE',
        'DELETED'
    )
  )
);

CREATE TABLE STAFF_PROFILE (
  staff_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  staff_code VARCHAR(30),
  full_name VARCHAR(100) NOT NULL,
  gender VARCHAR(10) DEFAULT 'OTHER' NOT NULL,
  date_of_birth DATE,
  phone VARCHAR(20),
  personal_email VARCHAR(255),
  address VARCHAR(255),
  staff_status VARCHAR(25) DEFAULT 'ACTIVE',
  hire_date DATE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT uq_staff_account UNIQUE(account_id),
  CONSTRAINT uq_staff_code UNIQUE(staff_code),
  CONSTRAINT uq_staff_phone UNIQUE(phone),
  CONSTRAINT uq_staff_email UNIQUE(personal_email),
  CONSTRAINT fk_staff_account FOREIGN KEY(account_id) REFERENCES ACCOUNT(account_id),
  CONSTRAINT chk_staff_gender
    CHECK (
      gender IN (
        'MALE',
        'FEMALE',
        'OTHER'
      )
    ),
  CONSTRAINT chk_staff_profile_status 
    CHECK (
      staff_status IN (
        'DISABLE',
        'ACTIVE',
        'SUSPENDED',
        'ON_LEAVE',
        'TERMINATED'
      )
    )
);

CREATE TABLE STUDENT_PROFILE (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  student_code VARCHAR(30),
  full_name VARCHAR(100) NOT NULL,
  gender VARCHAR(10) DEFAULT 'OTHER' NOT NULL,
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20),
  personal_email VARCHAR(255),
  address VARCHAR(255),
  student_status VARCHAR(25) DEFAULT 'ACTIVE',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT uq_student_account UNIQUE(account_id),
  CONSTRAINT uq_student_code UNIQUE(student_code),
  CONSTRAINT uq_student_phone UNIQUE(phone),
  CONSTRAINT uq_student_email UNIQUE(personal_email),
  CONSTRAINT fk_student_account FOREIGN KEY(account_id) REFERENCES ACCOUNT(account_id),
  CONSTRAINT chk_student_gender 
    CHECK (
      gender IN (
          'MALE',
          'FEMALE',
          'OTHER'
      )
    ),
  CONSTRAINT chk_student_status
    CHECK (
      student_status IN (
          'ACTIVE',
          'SUSPENDED',
          'GRADUATED',
          'WITHDRAWN'
      )
    )
);

CREATE TABLE COURSE_CATEGORY (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_code VARCHAR(30),
  category_name VARCHAR(100) NOT NULL,
  description VARCHAR(255) DEFAULT '',
  CONSTRAINT uq_course_category_code UNIQUE(category_code)
);

CREATE TABLE COURSE (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  course_code VARCHAR(30),
  course_name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  duration_hours INT NOT NULL,
  course_status VARCHAR(25) DEFAULT 'DRAFT',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  
  CONSTRAINT uq_course_code UNIQUE(course_code),
  CONSTRAINT fk_course_category FOREIGN KEY(category_id) REFERENCES COURSE_CATEGORY(category_id),
  CONSTRAINT chk_course_duration CHECK (duration_hours > 0),
  CONSTRAINT chk_course_status
    CHECK (
      course_status IN (
          'DRAFT',
          'PUBLISHED',
          'ARCHIVED'
      )
    )
);

CREATE TABLE CLASS (
  class_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  teacher_id INT NOT NULL,
  class_code VARCHAR(30),
  class_name VARCHAR(100),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  max_students INT,
  class_status VARCHAR(25) DEFAULT 'OPEN',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,

  CONSTRAINT uq_class_code UNIQUE(class_code),
  CONSTRAINT fk_class_course FOREIGN KEY(course_id) REFERENCES COURSE(course_id),
  CONSTRAINT fk_class_teacher FOREIGN KEY(teacher_id) REFERENCES STAFF_PROFILE(staff_id),
  CONSTRAINT chk_class_dates CHECK (end_date >= start_date),
  CONSTRAINT chk_class_students CHECK (max_students > 0),
  CONSTRAINT chk_class_status
    CHECK (
      class_status IN (
        'DRAFT',
        'OPEN',
        'ONGOING',
        'COMPLETED',
        'CANCELLED'
      )
    )
);

CREATE TABLE REGISTRATION (
  registration_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  gender VARCHAR(10) DEFAULT 'OTHER' NOT NULL,
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  personal_email VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  student_id INT,
  course_id INT,
  registration_status VARCHAR(25) DEFAULT 'PENDING',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT fk_registration_student FOREIGN KEY(student_id) REFERENCES STUDENT_PROFILE(student_id),
  CONSTRAINT fk_registration_course FOREIGN KEY(course_id) REFERENCES COURSE(course_id),
    CONSTRAINT chk_registration_gender
    CHECK (
      gender IN (
        'MALE',
        'FEMALE',
        'OTHER'
      )
  ),
  CONSTRAINT chk_registration_status
    CHECK (
      registration_status IN (
        'PENDING',
        'APPROVED',
        'REJECTED'
      )
    )
);

CREATE TABLE ENROLLMENT (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  enrollment_status VARCHAR(25) DEFAULT 'PENDING',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT uq_enrollment_student_class UNIQUE(student_id, class_id),
  CONSTRAINT fk_enrollment_student FOREIGN KEY(student_id) REFERENCES STUDENT_PROFILE(student_id),
  CONSTRAINT fk_enrollment_class FOREIGN KEY(class_id) REFERENCES CLASS(class_id),
  CONSTRAINT chk_enrollment_status
    CHECK(
      enrollment_status IN(
        'PENDING',
        'APPROVED',
        'REJECTED'
      )
    )
);

CREATE TABLE DOCUMENT (
  document_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  uploaded_by INT NOT NULL,
  document_code VARCHAR(30),
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  category VARCHAR(50),
  file_path VARCHAR(255),
  original_name VARCHAR(255),
  stored_name VARCHAR(255),
  mime_type VARCHAR(100),
  extension VARCHAR(10),
  file_size BIGINT,
  is_visible BOOLEAN DEFAULT TRUE,
  document_status VARCHAR(25) DEFAULT 'AVAILABLE',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  
  CONSTRAINT uq_document_code UNIQUE(document_code),
  CONSTRAINT fk_document_course FOREIGN KEY(course_id) REFERENCES COURSE(course_id),
  CONSTRAINT fk_document_staff FOREIGN KEY(uploaded_by) REFERENCES STAFF_PROFILE(staff_id),
  CONSTRAINT chk_document_size CHECK(file_size >= 0),
  CONSTRAINT chk_document_status
    CHECK(
      document_status IN(
        'AVAILABLE',
        'ARCHIVED',
        'DELETED'
      )
  )
);

