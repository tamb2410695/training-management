const db = require("@/config/database");

const {
  NotFoundError,
  ConflictError,
  BadRequestError,
  ValidationError,
} = require("@/utils/errors");

const { withTransaction } = require("@/utils/database/transaction");

const { ERROR_CODES, CODE_PREFIX, STUDENT_STATUS } = require("@/constants");

const { throwIf, hasField, generateCode } = require("@/utils/helpers");

const studentsRepository = require("./students.repository");
const accountsRepository = require("../accounts/accounts.repository");

const { STUDENT_PROFILE_FIELDS } = require("./students.constants");

// ===============================
// Query
// ===============================

const getList = async (query, connection = db) => {
  const { data: profiles, pagination } = await studentsRepository.list(
    query,
    connection,
  );

  return {
    profiles,
    pagination,
  };
};

const getById = async (studentId, connection = db) => {
  const student = await studentsRepository.findById(studentId, connection);

  throwIf(
    !student,
    NotFoundError,
    ERROR_CODES.STUDENT_NOT_FOUND,
    "Student profile not found",
  );

  return student;
};

// ===============================
// Create
// ===============================

const createProfile = async (profileData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const { accountId, phone } = profileData;

    throwIf(
      !accountId || !phone,
      ValidationError,
      ERROR_CODES.MISSING_REQUIRED_FIELDS,
    );

    const account = await accountsRepository.findById(accountId, txConnection);

    throwIf(!account, NotFoundError, ERROR_CODES.ACCOUNT_NOT_FOUND);

    const existedProfile = await studentsRepository.findByAccountId(
      accountId,
      txConnection,
    );

    throwIf(existedProfile, ConflictError, ERROR_CODES.PROFILE_ALREADY_LINKED);

    const existedPhone = await studentsRepository.findByPhone(
      phone,
      txConnection,
    );

    throwIf(existedPhone, ConflictError, ERROR_CODES.VALIDATION_FAILED);

    const profile = await studentsRepository.create(profileData, txConnection);

    throwIf(!profile, ConflictError, ERROR_CODES.NO_CHANGES);

    const studentCode = generateCode(CODE_PREFIX.STUDENT, profile.studentId);

    return studentsRepository.update(
      profile.studentId,
      {
        studentCode,
      },
      txConnection,
    );
  }, connection);
};

// ===============================
// Update
// ===============================

const getStudentOrThrow = async (studentId, connection = db) => {
  const student = await studentsRepository.findById(studentId, connection);

  throwIf(!student, NotFoundError, ERROR_CODES.STUDENT_NOT_FOUND);

  return student;
};

const buildUpdateStudentData = (studentData) => {
  const payload = {};

  [...STUDENT_PROFILE_FIELDS.BODY.UPDATE, "studentCode"].forEach((field) => {
    if (hasField(studentData, field)) {
      payload[field] = studentData[field];
    }
  });

  throwIf(
    Object.keys(payload).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  return payload;
};

const update = async (studentId, studentData, connection = db) => {
  const student = await getStudentOrThrow(studentId, connection);

  const payload = buildUpdateStudentData(studentData);

  if (hasField(studentData, "phone")) {
    const existedPhone = await studentsRepository.findByPhone(
      studentData.phone,
      connection,
    );

    throwIf(
      existedPhone && existedPhone.studentId !== student.studentId,

      ConflictError,

      ERROR_CODES.VALIDATION_FAILED,
    );
  }

  const updated = await studentsRepository.update(
    studentId,
    payload,
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

// ===============================
// Remove
// ===============================

const remove = async (studentId, connection = db) => {
  return withTransaction(async (txConnection) => {
    const student = await studentsRepository.findById(studentId, txConnection);

    throwIf(!student, NotFoundError, ERROR_CODES.STUDENT_NOT_FOUND);

    await studentsRepository.update(
      studentId,
      {
        studentStatus: STUDENT_STATUS.WITHDRAWN,
      },
      txConnection,
    );

    return {
      studentId,
      accountId: student.accountId,
      studentStatus: STUDENT_STATUS.WITHDRAWN,
    };
  }, connection);
};

const findByAccountId = async (accountId, connection = db) => {
  const student = studentsRepository.findByAccountId(accountId, connection);

  throwIf(
    !student,
    NotFoundError,
    ERROR_CODES.STUDENT_NOT_FOUND,
    "Student profile not found",
  );

  return student;
};

// ===============================
// Business Actions
// ===============================

const activate = async (studentId, connection = db) => {
  const student = await getStudentOrThrow(studentId, connection);

  throwIf(
    student.studentStatus === STUDENT_STATUS.GRADUATED,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Graduated student cannot be activated",
  );

  throwIf(
    student.studentStatus === STUDENT_STATUS.ACTIVE,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await studentsRepository.update(
    studentId,
    {
      studentStatus: STUDENT_STATUS.ACTIVE,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const suspend = async (studentId, connection = db) => {
  const student = await getStudentOrThrow(studentId, connection);

  throwIf(
    student.studentStatus === STUDENT_STATUS.WITHDRAWN,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Withdrawn student cannot be suspended",
  );

  throwIf(
    student.studentStatus === STUDENT_STATUS.GRADUATED,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Graduated student cannot be suspended",
  );

  throwIf(
    student.studentStatus === STUDENT_STATUS.SUSPENDED,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await studentsRepository.update(
    studentId,
    {
      studentStatus: STUDENT_STATUS.SUSPENDED,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const graduate = async (studentId, connection = db) => {
  const student = await getStudentOrThrow(studentId, connection);

  throwIf(
    student.studentStatus === STUDENT_STATUS.WITHDRAWN,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Withdrawn student cannot graduate",
  );

  throwIf(
    student.studentStatus === STUDENT_STATUS.GRADUATED,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await studentsRepository.update(
    studentId,
    {
      studentStatus: STUDENT_STATUS.GRADUATED,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const withdraw = async (studentId, connection = db) => {
  const student = await getStudentOrThrow(studentId, connection);

  throwIf(
    student.studentStatus === STUDENT_STATUS.WITHDRAWN,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await studentsRepository.update(
    studentId,
    {
      studentStatus: STUDENT_STATUS.WITHDRAWN,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};
module.exports = {
  getList,
  getById,
  createProfile,
  update,
  remove,
  findByAccountId,

  activate,
  suspend,
  graduate,
  withdraw,
};