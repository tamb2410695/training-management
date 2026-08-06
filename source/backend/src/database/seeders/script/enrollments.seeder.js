const { HTTP_STATUS, ERROR_MESSAGES, ERROR_CODES } = require("@/constants");
const enrollmentsService = require("@/modules/enrollments/enrollments.service");
const { AppError } = require("@/utils/errors");

module.exports = async function seedEnrollments() {
  try {
    const enrollments = [
      {
        studentId: 1,
        classId: 1,
      },
      {
        studentId: 2,
        classId: 2,
      },
      {
        studentId: 3,
        classId: 3,
      },
      {
        studentId: 4,
        classId: 4,
      },
      {
        studentId: 5,
        classId: 5,
      },
    ];

    for (const enrollment of enrollments) {
      await enrollmentsService.create(enrollment);
    }
  } catch (error) {
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};
