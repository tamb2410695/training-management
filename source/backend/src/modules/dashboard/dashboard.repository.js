const db = require("../../config/database");
const { arrayToCamelCase } = require("../../utils/helpers");

// 1. Lấy nhanh số lượng tổng quan của toàn hệ thống (Tổng Student, Class, Course, Doanh thu)
const getCounterOverview = async (connection = db) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM STUDENT WHERE student_status = 'ACTIVE') as total_active_students,
      (SELECT COUNT(*) FROM COURSE WHERE course_status = 'ACTIVE' AND deleted_at IS NULL) as total_active_courses,
      (SELECT COUNT(*) FROM CLASS WHERE class_status = 'ONGOING' AND deleted_at IS NULL) as total_ongoing_classes,
      (SELECT COALESCE(SUM(amount), 0) FROM PAYMENT WHERE payment_status = 'FULLY_PAID') as total_revenue
  `;
  const [rows] = await connection.query(sql);
  return rows[0];
};

// 2. Thống kê cơ cấu học viên theo trạng thái học tập và giới tính
const getStudentAnalytics = async (connection = db) => {
  const [statusRows] = await connection.query(
    `SELECT student_status, COUNT(*) as count FROM STUDENT GROUP BY student_status`
  );
  const [genderRows] = await connection.query(
    `SELECT gender, COUNT(*) as count FROM STUDENT GROUP BY gender`
  );
  return {
    byStatus: arrayToCamelCase(statusRows),
    byGender: arrayToCamelCase(genderRows)
  };
};

// 3. Thống kê khóa học phổ biến (Xếp hạng theo số lượt Enrollment nhiều nhất)
const getCourseAnalytics = async (connection = db) => {
  const sql = `
    SELECT co.course_id, co.course_code, co.course_name, COUNT(e.enrollment_id) as total_enrollments
    FROM COURSE co
    LEFT JOIN CLASS cl ON co.course_id = cl.course_id AND cl.deleted_at IS NULL
    LEFT JOIN ENROLLMENT e ON cl.class_id = e.class_id AND e.deleted_at IS NULL
    WHERE co.deleted_at IS NULL
    GROUP BY co.course_id
    ORDER BY total_enrollments DESC
    LIMIT 5
  `;
  const [rows] = await connection.query(sql);
  return arrayToCamelCase(rows);
};

// 4. Thống kê lớp học: Tỷ lệ lấp đầy (current_students / max_students) và trạng thái lớp
const getClassAnalytics = async (connection = db) => {
  const [statusRows] = await connection.query(
    `SELECT class_status, COUNT(*) as count FROM CLASS WHERE deleted_at IS NULL GROUP BY class_status`
  );
  const [fillRateRows] = await connection.query(`
    SELECT 
      class_code, max_students, current_students,
      ROUND((current_students / max_students) * 100, 2) as fill_percentage
    FROM CLASS 
    WHERE deleted_at IS NULL AND class_status IN ('OPEN_REGISTRATION', 'ONGOING')
    LIMIT 10
  `);
  return {
    classStatusSummary: arrayToCamelCase(statusRows),
    classFillRates: arrayToCamelCase(fillRateRows)
  };
};

// 5. Thống kê hóa đơn thanh toán: Tỷ lệ thanh toán thành công / thất bại
const getPaymentAnalytics = async (connection = db) => {
  const sql = `SELECT payment_status, COUNT(*) as count, COALESCE(SUM(amount), 0) as total_amount 
               FROM PAYMENT GROUP BY payment_status`;
  const [rows] = await connection.query(sql);
  return arrayToCamelCase(rows);
};

// 6. Thống kê doanh thu theo mốc thời gian biểu đồ (Dùng câu lệnh DATE_FORMAT)
const getRevenueAnalytics = async (daysLimit, connection = db) => {
  const sql = `
    SELECT DATE(payment_date) as date, COALESCE(SUM(amount), 0) as daily_revenue
    FROM PAYMENT
    WHERE payment_status = 'FULLY_PAID' AND payment_date >= NOW() - INTERVAL ? DAY
    GROUP BY DATE(payment_date)
    ORDER BY date ASC
  `;
  const [rows] = await connection.query(sql, [daysLimit]);
  return arrayToCamelCase(rows);
};

// 7. Thống kê xu hướng đăng ký học (Enrollment trend) trong 6 tháng gần nhất
const getEnrollmentAnalytics = async (connection = db) => {
  const sql = `
    SELECT DATE_FORMAT(enrollment_date, '%Y-%m') as month, COUNT(*) as enrollment_count
    FROM ENROLLMENT
    WHERE deleted_at IS NULL AND enrollment_date >= NOW() - INTERVAL 6 MONTH
    GROUP BY DATE_FORMAT(enrollment_date, '%Y-%m')
    ORDER BY month ASC
  `;
  const [rows] = await connection.query(sql);
  return arrayToCamelCase(rows);
};

module.exports = {
  getCounterOverview,
  getStudentAnalytics,
  getCourseAnalytics,
  getClassAnalytics,
  getPaymentAnalytics,
  getRevenueAnalytics,
  getEnrollmentAnalytics,
};