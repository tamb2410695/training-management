const { HTTP_STATUS, ERROR_MESSAGES, ERROR_CODES } = require("@/constants");
const classesService = require("@/modules/classes/classes.service");
const { AppError } = require("@/utils/errors");

module.exports = async function seedClasses() {
  try {
    const classes = [
      {
        courseId: 1,
        teacherId: 3,
        className: "Web K1",
        startDate: "2026-09-01",
        endDate: "2026-10-15",
        maxStudents: 30,
      },
      {
        courseId: 2,
        teacherId: 3,
        className: "Java K1",
        startDate: "2026-09-05",
        endDate: "2026-11-05",
        maxStudents: 25,
      },
      {
        courseId: 3,
        teacherId: 3,
        className: "Database K1",
        startDate: "2026-09-10",
        endDate: "2026-10-20",
        maxStudents: 35,
      },
      {
        courseId: 4,
        teacherId: 5,
        className: "AI K1",
        startDate: "2026-09-15",
        endDate: "2026-12-15",
        maxStudents: 20,
      },
      {
        courseId: 5,
        teacherId: 5,
        className: "English K1",
        startDate: "2026-09-20",
        endDate: "2026-11-20",
        maxStudents: 40,
      },
    ];

    for (const classData of classes) {
      await classesService.create(classData);
    }
  } catch (error) {
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};
