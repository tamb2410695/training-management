const AppError = require("../../utils/errors");
const {
  ROLES,
  ACCOUNT_STATUS,
  GENDER,
  ERROR_MESSAGES,
} = require("../../constants");

const { throwIf, hasField, generateCode } = require("../../utils/helpers");

const accountsService = require("../accounts/accounts.service");
const accountsRepository = require("../accounts/accounts.repository");
const studentsRepository = require("./students.repository");
const db = require("../../config/database");
const { withTransaction } = require("../../utils/database");
const { STUDENT_CODE } = require("./students.constants");

const getList = async (query, connection = db) => {
  const { data: students, pagination } = await studentsRepository.find(
    query,
    connection,
  );
  return { students, pagination };
};

const getById = async (studentId, connection = db) => {
  const student = await studentsRepository.findById(studentId, connection);
  throwIf(!student, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  return student;
};

const create = async (accountData, studentData, connection = db) => {
  return withTransaction(async (txConnection) => {
    // 1. Tạo tài khoản liên kết (Mặc định role STUDENT)
    const createdAccount = await accountsService.create(
      { ...accountData, roleName: ROLES.STUDENT },
      txConnection,
    );

    // 2. Chuẩn hóa dữ liệu Student trước khi ghi DB
    if (!hasField(studentData, "gender")) studentData.gender = GENDER.OTHER;
    if (!hasField(studentData, "address")) studentData.address = "";

    // 3. Tạo Student tạm thời để lấy ID sinh mã code
    const createdStudent = await studentsRepository.create(
      {
        accountId: createdAccount.accountId,
        ...studentData,
        studentCode: "TEMP_CODE" // Gán code tạm thời phòng hờ NOT NULL constraint
      },
      txConnection
    );
    
    throwIf(!createdStudent, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

    // 4. Sinh mã định danh chính thức dựa trên ID tự tăng vừa tạo
    const studentCode = generateCode(
      STUDENT_CODE.PREFIX,
      createdStudent.studentId,
      STUDENT_CODE.LENGTH,
    );

    // 5. Đồng bộ cập nhật lại mã định danh thực tế
    const finalStudent = await studentsRepository.update(
      createdStudent.studentId,
      { studentCode },
      txConnection,
    );

    return {
      account: createdAccount,
      student: finalStudent,
    };
  }, connection);
};

const update = async (studentId, accountData, studentData, connection = db) => {
  return withTransaction(async (txConnection) => {
    // 1. Kiểm tra Student tồn tại
    const student = await studentsRepository.findById(studentId, txConnection);
    throwIf(!student, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    // 2. Cập nhật bảng ACCOUNT liên kết (nếu có dữ liệu)
    let updatedAccount = null;
    if (accountData && Object.keys(accountData).length > 0) {
      updatedAccount = await accountsService.update(
        student.accountId,
        accountData,
        txConnection,
      );
    }

    // 3. Lọc các trường được phép cập nhật của bảng STUDENT
    const updateStudentPayload = {};
    const allowedFields = ["fullName", "phone", "studentStatus", "gender", "address", "dateOfBirth"];
    
    allowedFields.forEach((field) => {
      if (hasField(studentData, field)) {
        updateStudentPayload[field] = studentData[field];
      }
    });

    // 4. Tiến hành cập nhật STUDENT
    let updatedStudent = null;
    if (Object.keys(updateStudentPayload).length > 0) {
      updatedStudent = await studentsRepository.update(
        studentId,
        updateStudentPayload,
        txConnection,
      );
    }

    // Nếu không có bất kỳ thay đổi nào ở cả 2 bảng -> Báo lỗi
    throwIf(
      !updatedStudent && !updatedAccount,
      AppError.ConflictError,
      ERROR_MESSAGES.NO_CHANGES,
    );

    return {
      account: updatedAccount || await accountsRepository.findById(student.accountId, txConnection),
      student: updatedStudent || student,
    };
  }, connection);
};

const remove = async (studentId, connection = db) => {
  return withTransaction(async (txConnection) => {
    // SỬA LỖI LOGIC: Phải tìm Student trước để bóc tách chính xác ra accountId liên kết
    const student = await studentsRepository.findById(studentId, txConnection);
    throwIf(!student, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    const account = await accountsRepository.findById(student.accountId, txConnection);
    throwIf(!account, AppError.NotFoundError, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);

    // Nếu đã bị xóa trước đó -> Trả lỗi Conflict
    throwIf(
      account.accountStatus === ACCOUNT_STATUS.DELETED,
      AppError.ConflictError,
      ERROR_MESSAGES.ACCOUNT_DELETED,
    );

    // Thực hiện xóa mềm đồng thời cả 2 bảng trong cặp Transaction thống nhất
    await accountsService.remove(student.accountId, txConnection);
    const result = await studentsRepository.remove(studentId, txConnection);
    
    throwIf(!result, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);
    return result;
  }, connection);
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};