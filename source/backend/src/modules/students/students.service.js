const db = require("../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../../utils/errors");

const { withTransaction } = require("../../utils/database/transaction");
const { ERROR_CODES, ERROR_MESSAGES } = require("../../constants");
const { throwIf, hasField } = require("../../utils/helpers");

const studentsRepository = require("./students.repository");
const accountsRepository = require("../accounts/accounts.repository");
const accountsService = require("../accounts/accounts.service");

/**
 * Lấy danh sách hồ sơ sinh viên (phân trang, lọc, tìm kiếm nâng cao)
 */
const getList = async (query, connection = db) => {
  const { data: students, pagination } = await studentsRepository.find(
    query,
    connection,
  );

  return {
    students,
    pagination,
  };
};

/**
 * Lấy chi tiết hồ sơ sinh viên theo ID
 */
const getById = async (studentId, connection = db) => {
  const student = await studentsRepository.findById(studentId, connection);

  throwIf(
    !student,
    NotFoundError,
    ERROR_CODES.STUDENT_NOT_FOUND || "STUDENT_NOT_FOUND",
    "Student profile not found"
  );

  return student;
};

/**
 * Khởi tạo hồ sơ sinh viên mới
 */
const create = async (studentData, connection = db) => {
  const { accountId, studentCode } = studentData;

  // 1. Kiểm tra tài khoản liên kết có tồn tại hay không
  const accountExists = await accountsRepository.findById(accountId, connection);
  throwIf(!accountExists, NotFoundError, ERROR_CODES.ACCOUNT_NOT_FOUND, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);

  // 2. Đảm bảo tài khoản này chưa gán cho sinh viên nào khác (Mối quan hệ 1-1)
  const linkedStudent = await studentsRepository.findByAccountId(accountId, connection);
  throwIf(
    linkedStudent,
    ConflictError,
    ERROR_CODES.VALIDATION_FAILED,
    "This account is already linked to another student profile",
  );

  // 3. Kiểm tra trùng lặp mã sinh viên (studentCode)
  const existedCode = await studentsRepository.findByCode(studentCode, connection);
  throwIf(
    existedCode,
    ConflictError,
    ERROR_CODES.VALIDATION_FAILED,
    "Student code already exists in the system",
  );

  // 4. Tiến hành lưu thông tin với trạng thái mặc định ban đầu là đang theo học
  const finalPayload = {
    ...studentData,
    studentStatus: studentData.studentStatus || "ENROLLED"
  };

  const createdStudent = await studentsRepository.create(finalPayload, connection);
  throwIf(!createdStudent, ConflictError, ERROR_CODES.NO_CHANGES);

  return createdStudent;
};

/**
 * Hàm hỗ trợ kiểm tra nhanh sự tồn tại của sinh viên
 */
const getStudentOrThrow = async (studentId, connection = db) => {
  const student = await studentsRepository.findById(studentId, connection);
  throwIf(
    !student,
    NotFoundError,
    ERROR_CODES.STUDENT_NOT_FOUND || "STUDENT_NOT_FOUND",
  );
  return student;
};

/**
 * Gom cụm xử lý dữ liệu cập nhật động từ client
 */
const buildUpdateStudentData = async (student, studentData) => {
  const updateStudentData = {};
  const allowedUpdateFields = [
    "fullName",
    "gender",
    "dateOfBirth",
    "phone",
    "address",
    "personalEmail",
    "studentStatus",
  ];

  allowedUpdateFields.forEach((field) => {
    if (hasField(studentData, field)) {
      updateStudentData[field] = studentData[field];
    }
  });

  throwIf(
    Object.keys(updateStudentData).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  return updateStudentData;
};

/**
 * Cập nhật thông tin hồ sơ sinh viên
 */
const update = async (studentId, studentData, connection = db) => {
  const student = await getStudentOrThrow(studentId, connection);
  const updatePayload = await buildUpdateStudentData(student, studentData);

  const updatedStudent = await studentsRepository.update(
    studentId,
    updatePayload,
    connection,
  );

  throwIf(!updatedStudent, ConflictError, ERROR_CODES.NO_CHANGES);

  return updatedStudent;
};

/**
 * Xóa hồ sơ sinh viên: Đồng bộ hóa Soft Delete tài khoản và chuyển trạng thái học tập
 */
const remove = async (studentId, connection = db) => {
  return await withTransaction(async (txConnection) => {
    const student = await studentsRepository.findById(studentId, txConnection);
    throwIf(
      !student,
      NotFoundError,
      ERROR_CODES.STUDENT_NOT_FOUND || "STUDENT_NOT_FOUND",
    );

    const accountDeleted = await accountsService.remove(
      student.accountId,
      txConnection,
    );
    throwIf(!accountDeleted, ConflictError, "FAILED_TO_SOFT_DELETE_ACCOUNT");

    const updatedStudent = await studentsRepository.update(
      studentId,
      { studentStatus: "DROPPED_OUT" },
      txConnection,
    );
    throwIf(!updatedStudent, ConflictError, "FAILED_TO_UPDATE_STUDENT_STATUS");

    return {
      studentId,
      accountId: student.accountId,
      status: "DROPPED_OUT",
      accountSoftDeleted: true,
    };
  }, connection);
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};