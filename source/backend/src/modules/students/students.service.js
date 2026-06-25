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

  return {
    students,
    pagination,
  };
};

const getById = async (studentId, connection = db) => {
  const student = await studentsRepository.findById(studentId, connection);
  throwIf(!student, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

  return student;
};

const create = async (accountData, studentData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const createdAccount = await accountsService.create(
      { ...accountData, roleName: ROLES.STUDENT },
      txConnection,
    );

    if (!hasField(studentData, "gender")) studentData.gender = GENDER.OTHER;
    if (!hasField(studentData, "address")) studentData.address = "";

    const createdStudent = await studentsRepository.create(
      {
        accountId: createdAccount.accountId,
        ...studentData,
        studentCode: "TEMP_CODE"
      },
      txConnection,
    );

    throwIf(!createdStudent, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

    const studentCode = generateCode(
      STUDENT_CODE.PREFIX,
      createdStudent.studentId,
      STUDENT_CODE.LENGTH,
    );

    const finalStudent = await studentsRepository.update(
      createdStudent.studentId,
      { studentCode },
      txConnection,
    );

    return {
      account: createdAccount,
      student: finalStudent,
    };
  });
};

const update = async (studentId, accountData, studentData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const student = await studentsRepository.findById(studentId, txConnection);
    throwIf(!student, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    let updatedAccount = null;
    if (accountData && Object.keys(accountData).length > 0) {
      updatedAccount = await accountsService.update(
        student.accountId,
        accountData,
        txConnection,
      );
    }

    const updateStudentPayload = {};
    const allowedFields = [
      "fullName", 
      "phone", 
      "studentStatus", 
      "gender", 
      "address", 
      "dateOfBirth", 
      "specialization", 
      "hireDate"
    ];

    allowedFields.forEach((field) => {
      if (hasField(studentData, field)) {
        updateStudentPayload[field] = studentData[field];
      }
    });

    let updatedStudent = null;
    if (Object.keys(updateStudentPayload).length > 0) {
      updatedStudent = await studentsRepository.update(
        studentId,
        updateStudentPayload,
        txConnection,
      );
    }

    throwIf(
      !updatedStudent && !updatedAccount,
      AppError.ConflictError,
      ERROR_MESSAGES.NO_CHANGES,
    );

    return {
      account: updatedAccount || await accountsRepository.findById(student.accountId, txConnection),
      student: updatedStudent || student,
    };
  });
};

const remove = async (studentId, connection = db) => {
  return withTransaction(async (txConnection) => {
    const student = await studentsRepository.findById(studentId, txConnection);
    throwIf(!student, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

    const account = await accountsRepository.findById(student.accountId, txConnection);
    throwIf(!account, AppError.NotFoundError, ERROR_MESSAGES.ACCOUNT_NOT_FOUND);

    throwIf(
      account.accountStatus === ACCOUNT_STATUS.DELETED,
      AppError.ConflictError,
      ERROR_MESSAGES.ACCOUNT_DELETED,
    );

    await accountsService.remove(student.accountId, txConnection);
    const result = await studentsRepository.remove(studentId, txConnection);
    
    throwIf(!result, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);
    return result;
  });
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};