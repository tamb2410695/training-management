INSERT IGNORE INTO ROLE (role_code, role_label, role_description) 
VALUES 
(
    'ADMIN',
    'Quản trị viên',
    'Quản trị viên toàn quyền hệ thống, có quyền quản lý tài khoản, cấu hình và bảo mật.'
),
(
    'INSTRUCTOR', 
    'Giảng viên', 
    'Giảng viên, có quyền quản lý lớp học, tài liệu giảng dạy, chấm điểm và quản lý học viên.'
),
(
    'STUDENT', 
    'Học viên',
    'Học viên, có quyền tham gia khóa học, làm bài tập, xem điểm và cập nhật hồ sơ cá nhân.'
); 