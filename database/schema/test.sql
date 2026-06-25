CREATE TABLE IF NOT EXISTS ACCOUNT (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  account_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL,
  CONSTRAINT uq_account_username UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS USER_ROLE (
  account_id INT NOT NULL,
  role_id SMALLINT NOT NULL,
  granted_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,
  
  PRIMARY KEY (account_id, role_id),
  CONSTRAINT fk_ur_account FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id) ON DELETE CASCADE,
  CONSTRAINT fk_ur_role FOREIGN KEY (role_id) REFERENCES ROLE(role_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS STUDENT (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  role_id SMALLINT DEFAULT 3 NOT NULL,
  student_code VARCHAR(25) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,

  CONSTRAINT chk_student_role_fixed CHECK (role_id = 3),
  
  CONSTRAINT fk_student_role_security 
    FOREIGN KEY (account_id, role_id) REFERENCES USER_ROLE(account_id, role_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS INSTRUCTOR (
  instructor_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  role_id SMALLINT DEFAULT 2 NOT NULL,
  instructor_code VARCHAR(25) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,

  CONSTRAINT chk_instructor_role_fixed CHECK (role_id = 2),
  
  CONSTRAINT fk_instructor_role_security 
    FOREIGN KEY (account_id, role_id) REFERENCES USER_ROLE(account_id, role_id) ON DELETE CASCADE
);

-- Điều kiện cho phép Hard Delete (Xóa cứng vật lý)

-- Chỉ áp dụng lệnh xóa cứng cho dữ liệu nằm trong 4 trường hợp:

--     Dữ liệu nháp, dữ liệu lỗi phát sinh trong quá trình thử nghiệm chưa dính khóa ngoại tới bất kỳ bảng nghiệp vụ nào (chưa có lớp, chưa có điểm).

--     Các bảng trung gian, bảng lưu token thiết bị, mã OTP đã hết hạn.

--     Người dùng yêu cầu xóa tài khoản nhưng hệ thống kiểm tra chưa từng phát sinh giao dịch tài chính/học tập.

--     Dữ liệu quá hạn (trên 1 năm) đã được kết xuất (Export) ra kho lưu trữ lạnh (Cold Storage) bên ngoài

CREATE TABLE IF NOT EXISTS STAFF_PROFILE (
  staff_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,
  staff_code VARCHAR(25) NOT NULL,
  full_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(20) NOT NULL,
  department VARCHAR(50) NOT NULL,
  staff_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL
    CHECK (staff_status IN (
      'DISABLE',
      'ACTIVE',
      'LEAVE'
    )),
  
  -- Cột ảo chống trùng tài khoản khi ẩn danh/vô hiệu hóa hồ sơ
  -- active_account_id INT GENERATED ALWAYS AS (CASE WHEN is_active = TRUE THEN account_id ELSE NULL END) STORED,

  CONSTRAINT uq_staff_code UNIQUE (staff_code),
  CONSTRAINT uq_staff_phone UNIQUE (phone),
  CONSTRAINT uq_staff_active_account UNIQUE (active_account_id),
  
  CONSTRAINT fk_staff_account FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS DEPARTMENT (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_code VARCHAR(25) NOT NULL UNIQUE,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS STAFF_DEPARTMENT (
  staff_id INT NOT NULL,
  department_id INT NOT NULL,
  appointment_type VARCHAR(25) DEFAULT 'PRIMARY' NOT NULL,
  assigned_at DATE NOT NULL,

  PRIMARY KEY (staff_id, department_id), -- Một người không thể gán trùng 2 lần vào 1 phòng ban
  CONSTRAINT fk_sd_staff FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id) ON DELETE CASCADE,
  CONSTRAINT fk_sd_dept FOREIGN KEY (department_id) REFERENCES DEPARTMENT(department_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TEACHING_SCHEDULE (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  staff_id INT NOT NULL, -- Chiếu thẳng về STAFF_PROFILE
  class_id INT NOT NULL,
  slot_time DATETIME NOT NULL,
  room_name VARCHAR(50),
  
  -- Ràng buộc: Đảm bảo chỉ những nhân sự tồn tại trong STAFF_PROFILE mới được xếp lịch
  CONSTRAINT fk_schedule_staff FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id)
);

CREATE TABLE IF NOT EXISTS CLASS (
  class_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,                  -- Chiếu về bảng COURSE
  class_code VARCHAR(25) NOT NULL,         -- Ví dụ: JAVA_K26_01
  room_name VARCHAR(50),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  class_status VARCHAR(25) DEFAULT 'PENDING' NOT NULL, -- VALUES: 'PENDING' (Chờ), 'ONGOING' (Đang học), 'COMPLETED' (Đã kết thúc)
  
  CONSTRAINT uq_class_code UNIQUE (class_code),
  CONSTRAINT fk_class_course FOREIGN KEY (course_id) REFERENCES COURSE(course_id)
);


-- Bảng gốc COURSE
CREATE TABLE IF NOT EXISTS COURSE (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(25) NOT NULL, -- Ví dụ: JV01
  course_name VARCHAR(100) NOT NULL,
  credits INT DEFAULT 3 NOT NULL,   -- Số tín chỉ / Số đơn vị học trình
  CONSTRAINT uq_course_code UNIQUE (course_code)
);

-- BỔ SUNG: Bảng trung gian quản lý Chuyên môn Giảng viên (Staff Capability)
CREATE TABLE IF NOT EXISTS STAFF_CAPABILITY (
  staff_id INT NOT NULL,
  course_id INT NOT NULL,
  assigned_at DATETIME DEFAULT CURRENT_TIMESTAMP(),
  
  PRIMARY KEY (staff_id, course_id),
  CONSTRAINT fk_sc_staff FOREIGN KEY (staff_id) REFERENCES STAFF_PROFILE(staff_id) ON DELETE CASCADE,
  CONSTRAINT fk_sc_course FOREIGN KEY (course_id) REFERENCES COURSE(course_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ENROLLMENT (
  enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  class_id INT NOT NULL,
  enrollment_status VARCHAR(25) DEFAULT 'ACTIVE' NOT NULL, -- VALUES: 'ACTIVE' (Đang học), 'DROPPED' (Thôi học), 'SUSPENDED' (Bảo lưu)
  enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,

  PRIMARY KEY (student_id, class_id), -- Khóa chính phức hợp: Học viên không thể đăng ký trùng một lớp 2 lần
  CONSTRAINT fk_en_student FOREIGN KEY (student_id) REFERENCES STUDENT_PROFILE(student_id),
  CONSTRAINT fk_en_class FOREIGN KEY (class_id) REFERENCES CLASS(class_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ATTENDANCE (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  schedule_id INT NOT NULL,         -- Chiếu về buổi học cụ thể trong TEACHING_SCHEDULE
  student_id INT NOT NULL,          -- Chiếu về học viên được điểm danh
  status VARCHAR(25) NOT NULL,      -- VALUES: 'PRESENT' (Đi học), 'ABSENT' (Vắng mặt), 'LATE' (Đi muộn)
  marked_by_staff_id INT NOT NULL,  -- Người thực hiện điểm danh (Giảng viên dạy buổi đó)
  marked_at DATETIME DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),

  CONSTRAINT uq_attendance_session UNIQUE (schedule_id, student_id), -- Một học viên chỉ có 1 trạng thái điểm danh/1 buổi
  CONSTRAINT uq_attendance_session UNIQUE (schedule_id, student_id),
  CONSTRAINT fk_at_student FOREIGN KEY (student_id) REFERENCES STUDENT_PROFILE(student_id),
  CONSTRAINT fk_at_staff FOREIGN KEY (marked_by_staff_id) REFERENCES STAFF_PROFILE(staff_id)
);

CREATE TABLE IF NOT EXISTS PAYMENT (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  account_id INT NOT NULL,                -- Chiếu về ACCOUNT thực hiện thanh toán
  class_id INT NOT NULL,                  -- Đóng tiền cho lớp nào
  amount DECIMAL(12,2) NOT NULL,          -- Số tiền đóng
  bank_transaction_code VARCHAR(100),     -- Mã giao dịch ngân hàng (Vết tích để cơ quan pháp lý tra cứu chéo)
  payer_name VARCHAR(100) NOT NULL,       -- Tên người nộp (Sẽ bị sửa thành 'ANONYMOUS' nếu xóa tài khoản)
  payment_status VARCHAR(25) DEFAULT 'SUCCESS' NOT NULL, -- VALUES: 'PENDING', 'SUCCESS', 'FAILED'
  paid_at DATETIME DEFAULT CURRENT_TIMESTAMP() NOT NULL,

  CONSTRAINT fk_pm_account FOREIGN KEY (account_id) REFERENCES ACCOUNT(account_id),
  CONSTRAINT fk_pm_class FOREIGN KEY (class_id) REFERENCES CLASS(class_id)
);