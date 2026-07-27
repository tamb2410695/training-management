const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { withTransaction } = require("../../utils/database");
const { throwIf, hasField, generateCode } = require("../../utils/helpers");
const {
  ERROR_MESSAGES,
  ENROLLMENT_STATUS,
  PAYMENT_STATUS,
} = require("../../constants");

const enrollmentsRepository = require("./enrollments.repository");
const { ENROLLMENT_CODE } = require("./enrollments.constants");

const studentsRepository = require("../students/students.repository");
const classesRepository = require("../classes/classes.repository");

const getList = async (query, connection = db) => {
  return await enrollmentsRepository.find(query, connection);
};

const getById = async (enrollmentId, connection = db) => {
  const enrollment = await enrollmentsRepository.findById(
    enrollmentId,
    connection,
  );
  throwIf(
    !enrollment,
    AppError.NotFoundError,
    ERROR_MESSAGES.RESOURCE_NOT_FOUND,
  );
  return enrollment;
};

const create = async ({ studentId, classId }, connection = db) => {
  return withTransaction(async (txConnection) => {
    const student = await studentsRepository.findById(studentId, txConnection);
    throwIf(!student, AppError.NotFoundError, "Student not found");

    const targetClass = await classesRepository.findById(classId, txConnection);
    throwIf(!targetClass, AppError.NotFoundError, "Class not found");
    throwIf(
      targetClass.classStatus !== "OPEN_REGISTRATION",
      AppError.BadRequestError,
      "Class is not open for registration",
    );
    throwIf(
      targetClass.currentStudents >= targetClass.maxStudents,
      AppError.BadRequestError,
      "Class is full",
    );

    const existingEnrollment =
      await enrollmentsRepository.findByStudentAndClass(
        studentId,
        classId,
        txConnection,
      );
    throwIf(
      existingEnrollment,
      AppError.ConflictError,
      "Student is already enrolled in this class",
    );
    
    const createdEnrollment = await enrollmentsRepository.create(
      {
        studentId,
        classId,
        enrollmentStatus: ENROLLMENT_STATUS.WAITING_FOR_PAYMENT,
        enrollmentCode: "TEMP_ERM",
      },
      txConnection,
    );

    const enrollmentCode = generateCode(
      ENROLLMENT_CODE.PREFIX,
      createdEnrollment.enrollmentId,
      ENROLLMENT_CODE.LENGTH,
    );

    const finalEnrollment = await enrollmentsRepository.update(
      createdEnrollment.enrollmentId,
      { enrollmentCode },
      txConnection,
    );

    return finalEnrollment;
  }, connection);
};

const updateStatus = async (
  enrollmentId,
  enrollmentStatus,
  connection = db,
) => {
  return withTransaction(async (txConnection) => {
    const enrollment = await enrollmentsRepository.findById(
      enrollmentId,
      txConnection,
    );
    throwIf(
      !enrollment,
      AppError.NotFoundError,
      ERROR_MESSAGES.RESOURCE_NOT_FOUND,
    );

    if (enrollment.enrollmentStatus === enrollmentStatus) {
      return enrollment;
    }

    if (
      enrollmentStatus === ENROLLMENT_STATUS.CANCELLED ||
      enrollmentStatus === ENROLLMENT_STATUS.REFUNDED
    ) {
      await txConnection.query(
        `UPDATE CLASS SET current_students = GREATEST(0, current_students - 1) WHERE class_id = ?`,
        [enrollment.classId],
      );
    }

    const updated = await enrollmentsRepository.update(
      enrollmentId,
      { enrollmentStatus },
      txConnection,
    );
    return updated;
  });
};

const remove = async (enrollmentId, connection = db) => {
  return withTransaction(async (txConnection) => {
    const enrollment = await enrollmentsRepository.findById(
      enrollmentId,
      txConnection,
    );
    throwIf(
      !enrollment,
      AppError.NotFoundError,
      ERROR_MESSAGES.RESOURCE_NOT_FOUND,
    );

    if (
      enrollment.enrollmentStatus !== ENROLLMENT_STATUS.CANCELLED &&
      enrollment.enrollmentStatus !== ENROLLMENT_STATUS.REFUNDED
    ) {
      await txConnection.query(
        `UPDATE CLASS SET current_students = GREATEST(0, current_students - 1) WHERE class_id = ?`,
        [enrollment.classId],
      );
    }

    return await enrollmentsRepository.remove(enrollmentId, txConnection);
  });
};

module.exports = {
  getList,
  getById,
  create,
  updateStatus,
  remove,
};
