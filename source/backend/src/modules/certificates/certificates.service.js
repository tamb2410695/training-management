const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { withTransaction } = require("../../utils/database");
const { throwIf, generateCode } = require("../../utils/helpers");
const { ERROR_MESSAGES } = require("../../constants");

const certificatesRepository = require("./certificates.repository");
const enrollmentsRepository = require("../enrollments/enrollments.repository");
const { CERTIFICATE_CODE } = require("./certificates.constants");

const getList = async (query, connection = db) => {
  return await certificatesRepository.find(query, connection);
};

const getById = async (certificateId, connection = db) => {
  const certificate = await certificatesRepository.findById(certificateId, connection);
  throwIf(!certificate, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  return certificate;
};

const create = async ({ enrollmentId }, connection = db) => {
  return withTransaction(async (txConnection) => {
    // 1. Kiểm tra đơn đăng ký học (Enrollment) có tồn tại và hợp lệ không
    const enrollment = await enrollmentsRepository.findById(enrollmentId, txConnection);
    throwIf(!enrollment, AppError.NotFoundError, "Enrollment record not found");
    throwIf(enrollment.enrollmentStatus !== "CONFIRMED", AppError.BadRequestError, "Cannot issue certificate for unconfirmed enrollment");

    // 2. Đối chiếu điều kiện khóa học: Khóa học này có hỗ trợ cấp chứng chỉ không (Bảng COURSE -> certificate_available)
    const [courseRows] = await txConnection.query(
      `SELECT certificate_available FROM COURSE WHERE course_id = ?`,
      [enrollment.courseId]
    );
    throwIf(!courseRows[0] || !courseRows[0].certificate_available, AppError.BadRequestError, "This course does not offer certificates");

    // 3. Kiểm tra kết quả học tập (Bảng GRADE -> result = 'PASSED')
    const [gradeRows] = await txConnection.query(
      `SELECT result, grade_status FROM GRADE WHERE student_id = ? AND class_id = ?`,
      [enrollment.studentId, enrollment.classId]
    );
    throwIf(!gradeRows[0], AppError.BadRequestError, "Grades have not been entered for this student in this class");
    throwIf(gradeRows[0].grade_status !== "PUBLISHED", AppError.BadRequestError, "Grades are not published yet");
    throwIf(gradeRows[0].result !== "PASSED", AppError.BadRequestError, "Student did not pass the course requirements");

    // 4. Kiểm tra chứng chỉ đã từng được cấp cho enrollment này chưa (Tránh trùng lặp)
    const existingCertificate = await certificatesRepository.findByEnrollmentId(enrollmentId, txConnection);
    throwIf(existingCertificate, AppError.ConflictError, "A certificate has already been issued for this enrollment");

    // 5. Tiến hành cấp chứng chỉ tạm thời
    const createdCert = await certificatesRepository.create({
      enrollmentId,
      certificateStatus: "ISSUED",
      certificateCode: "TEMP_CERT"
    }, txConnection);

    // 6. Sinh mã Certificate chính thức (CERT00000X) dựa vào auto-increment ID
    const certificateCode = generateCode(CERTIFICATE_CODE.PREFIX, createdCert.certificateId, CERTIFICATE_CODE.LENGTH);
    
    return await certificatesRepository.update(createdCert.certificateId, { certificateCode }, txConnection);
  }, connection);
};

const updateStatus = async (certificateId, certificateStatus, connection = db) => {
  const certificate = await certificatesRepository.findById(certificateId, connection);
  throwIf(!certificate, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

  if (certificate.certificateStatus === certificateStatus) return certificate;

  return await certificatesRepository.update(certificateId, { certificateStatus }, connection);
};

module.exports = {
  getList,
  getById,
  create,
  updateStatus,
};