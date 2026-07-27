const db = require("../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
  ValidationError,
} = require("../../utils/errors");

const { withTransaction } = require("../../utils/database/transaction");
const {
  ERROR_CODES,
  ERROR_MESSAGES,
  CODE_PREFIX,
  CODE_LENGHT,
  USER_CREATION,
} = require("../../constants");
const { throwIf, hasField, generateCode } = require("../../utils/helpers");

const studentsRepository = require("./students.repository");
const accountsRepository = require("../accounts/accounts.repository");
const accountsService = require("../accounts/accounts.service");
const { STUDENT_FIELDS } = require("./students.constants");

const userCreationService = require("../users/userCreation.service");
const { PROFILE_TYPE } = require("../../constants/lookups/userCreation");

const getList = async (query, connection = db) => {
  return await studentsRepository.find(query, connection);
};

const getById = async (studentId, connection = db) => {
  const student = await studentsRepository.findById(studentId, connection);

  throwIf(
    !student,
    NotFoundError,
    ERROR_CODES.STUDENT_NOT_FOUND || "STUDENT_NOT_FOUND",
    "Student profile not found",
  );

  return student;
};

// const create = async (accountData, profileData, connection = db) => {
//   return await withTransaction(async (txConnection) => {
//     return await userCreationService.createStudent(
//       {
//         accountData,
//         profileData,
//       },
//       txConnection,
//     );
//   }, connection);
// };

// local
const createProfile = async (profileData, connection = db) => {
  const { accountId, phone } = profileData;
  throwIf(
    !accountId || !phone,
    ValidationError,
    `${ERROR_CODES.MISSING_REQUIRED_FIELDS}: accountId or phone`,
  );

  const accountExists = await accountsRepository.findById(
    accountId,
    connection,
  );
  throwIf(!accountExists, NotFoundError, ERROR_CODES.ACCOUNT_NOT_FOUND);

  const linkedStudent = await studentsRepository.findByAccountId(
    accountId,
    connection,
  );
  throwIf(linkedStudent, ConflictError, ERROR_CODES.PROFILE_ALREADY_LINKED);

  const existedPhone = await studentsRepository.findByPhone(
    phone,
    connection,
  );
  throwIf(existedPhone, ConflictError, ERROR_CODES.VALIDATION_FAILED);

  // const finalPayload = {
  //   ...profileData,
  // };

  const createdProfile = await studentsRepository.create(
    profileData,
    connection,
  );

  throwIf(!createdProfile, ConflictError, ERROR_CODES.NO_CHANGES);

  const studentCode = generateCode(
    CODE_PREFIX.STUDENT,
    createdProfile.studentId,
  );

  const updatedStudent = await update(
    createdProfile.studentId,
    { studentCode },
    connection,
  );

  return updatedStudent;
};

const getStudentOrThrow = async (studentId, connection = db) => {
  const student = await studentsRepository.findById(studentId, connection);
  throwIf(
    !student,
    NotFoundError,
    ERROR_CODES.STUDENT_NOT_FOUND || "STUDENT_NOT_FOUND",
  );
  return student;
};

const buildUpdateStudentData = async (student, studentData) => {
  const updateStudentData = {};
  const allowedUpdateFields = [...STUDENT_FIELDS.BODY.UPDATE, "studentCode"];
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
  // create,
  createProfile,
  update,
  remove,
};
