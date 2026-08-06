const db = require("@/config/database");

const { NotFoundError, ConflictError } = require("@/utils/errors");

const { ERROR_CODES, ENROLLMENT_STATUS, CLASS_STATUS } = require("@/constants");

const { throwIf, pickFields } = require("@/utils/helpers");

const { withTransaction } = require("@/utils/database");

const enrollmentsRepository = require("./enrollments.repository");

const classesRepository = require("../classes/classes.repository");

const studentsRepository = require("../students/students.repository");

const { ENROLLMENT_FIELDS } = require("./enrollments.constants");

// ===============================
// Internal Helpers
// ===============================

const ensureEnrollmentExists = (enrollment) => {
  throwIf(!enrollment, NotFoundError, ERROR_CODES.ENROLLMENT_NOT_FOUND);
};

const ensurePending = (enrollment) => {
  throwIf(
    enrollment.enrollmentStatus !== ENROLLMENT_STATUS.PENDING,

    ConflictError,

    ERROR_CODES.ENROLLMENT_ALREADY_PROCESSED,
  );
};

// ===============================
// Query
// ===============================

const getList = async (query, connection = db) => {
  const result = await enrollmentsRepository.list(query, connection);

  return {
    enrollments: result.data,

    pagination: result.pagination,
  };
};

const getById = async (enrollmentId, connection = db) => {
  const enrollment = await enrollmentsRepository.findById(
    enrollmentId,
    connection,
  );

  ensureEnrollmentExists(enrollment);

  return enrollment;
};

// ===============================
// CRUD
// ===============================

const create = async (enrollmentData, connection = db) => {
  return withTransaction(async (tx) => {
    // ===============================
    // Validate Student
    // ===============================

    const student = await studentsRepository.findById(
      enrollmentData.studentId,
      tx,
    );

    throwIf(
      !student,

      NotFoundError,

      ERROR_CODES.STUDENT_NOT_FOUND,
    );

    // ===============================
    // Validate Class
    // ===============================

    const classData = await classesRepository.findById(
      enrollmentData.classId,
      tx,
    );

    throwIf(
      !classData,

      NotFoundError,

      ERROR_CODES.CLASS_NOT_FOUND,
    );

    // ===============================
    // Class must be OPEN
    // ===============================

    throwIf(
      classData.classStatus !== CLASS_STATUS.OPEN,

      ConflictError,

      ERROR_CODES.CLASS_NOT_OPEN,
    );

    // ===============================
    // Duplicate enrollment
    // ===============================

    const exists = await enrollmentsRepository.existsByStudentClass(
      enrollmentData.studentId,

      enrollmentData.classId,

      tx,
    );

    throwIf(
      exists,

      ConflictError,

      ERROR_CODES.ENROLLMENT_ALREADY_EXISTS,
    );

    // ===============================
    // Create pending enrollment
    // ===============================

    const payload = {
      ...enrollmentData,

      enrollmentStatus: ENROLLMENT_STATUS.PENDING,
    };

    const enrollment = await enrollmentsRepository.create(payload, tx);

    throwIf(
      !enrollment,

      ConflictError,

      ERROR_CODES.NO_CHANGES,
    );

    return enrollment;
  }, connection);
};

const update = async (
  enrollmentId,

  enrollmentData,

  connection = db,
) => {
  const enrollment = await enrollmentsRepository.findById(
    enrollmentId,

    connection,
  );

  ensureEnrollmentExists(enrollment);

  /*
    Enrollment không cho phép thay đổi:

    studentId

    classId

    enrollmentStatus


    Vì đây là quan hệ nghiệp vụ.

    Nếu muốn chuyển lớp:

    remove enrollment cũ

    create enrollment mới

  */

  const payload = pickFields(
    enrollmentData,

    ENROLLMENT_FIELDS.BODY.UPDATE,
  );

  const updated = await enrollmentsRepository.update(
    enrollmentId,

    payload,

    connection,
  );

  return updated;
};

const remove = async (
  enrollmentId,

  connection = db,
) => {
  const enrollment = await enrollmentsRepository.findById(
    enrollmentId,

    connection,
  );

  ensureEnrollmentExists(enrollment);

  /*
    Không xóa enrollment đã APPROVED

    Vì đây là lịch sử học viên tham gia lớp.

  */

  throwIf(
    enrollment.enrollmentStatus === ENROLLMENT_STATUS.APPROVED,

    ConflictError,

    ERROR_CODES.ENROLLMENT_ALREADY_APPROVED,
  );

  return enrollmentsRepository.remove(
    enrollmentId,

    connection,
  );
};

// ===============================
// Business Actions
// ===============================

const approve = async (
  enrollmentId,

  connection = db,
) => {
  return withTransaction(async (tx) => {
    const enrollment = await enrollmentsRepository.findById(
      enrollmentId,

      tx,
    );

    ensureEnrollmentExists(enrollment);

    ensurePending(enrollment);

    // ===============================
    // Validate class
    // ===============================

    const classData = await classesRepository.findById(
      enrollment.classId,

      tx,
    );

    throwIf(
      !classData,

      NotFoundError,

      ERROR_CODES.CLASS_NOT_FOUND,
    );

    throwIf(
      classData.classStatus !== CLASS_STATUS.OPEN,

      ConflictError,

      ERROR_CODES.CLASS_NOT_OPEN,
    );

    // ===============================
    // Check capacity
    // ===============================

    const approvedCount = await enrollmentsRepository.countApprovedByClass(
      enrollment.classId,

      tx,
    );

    throwIf(
      approvedCount >= classData.maxStudents,

      ConflictError,

      ERROR_CODES.CLASS_FULL,
    );

    // ===============================
    // Update status
    // ===============================

    return enrollmentsRepository.updateStatus(
      enrollmentId,

      ENROLLMENT_STATUS.APPROVED,

      tx,
    );
  }, connection);
};

const reject = async (
  enrollmentId,

  connection = db,
) => {
  const enrollment = await enrollmentsRepository.findById(
    enrollmentId,

    connection,
  );

  ensureEnrollmentExists(enrollment);

  ensurePending(enrollment);

  return enrollmentsRepository.updateStatus(
    enrollmentId,

    ENROLLMENT_STATUS.REJECTED,

    connection,
  );
};

module.exports = {
  // Query
  getList,
  getById,

  // CRUD
  create,
  update,
  remove,

  // Business
  approve,
  reject,
};
