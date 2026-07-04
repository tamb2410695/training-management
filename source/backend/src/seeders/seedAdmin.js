const bcrypt = require("bcrypt");

const passwordHash = await bcrypt.hash("admin123", 10);

await pool.execute(
  `
  INSERT INTO ACCOUNT (
    role_id,
    username,
    email,
    password_hash
  )
  VALUES (?, ?, ?, ?)
  `,
  [1, "admin", "admin@gmail.com", passwordHash],
);

// Ví dụ logic trong seedAdmin.js
const seedRoles = async () => {
  const roles = [
    {
      role_code: "ADMIN",
      role_name: "Quản trị viên",
      role_description: "Toàn quyền hệ thống",
    },
    {
      role_code: "INSTRUCTOR",
      role_name: "Giảng viên",
      role_description: "Xem lịch dạy, chấm điểm, điểm danh",
    },
    {
      role_code: "STUDENT",
      role_name: "Học viên",
      role_description: "Xem lịch học, kết quả học tập",
    },
  ];
};
