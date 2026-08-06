const { HTTP_STATUS, ERROR_MESSAGES, ERROR_CODES } = require("@/constants");
const coursesService = require("@/modules/courses/courses.service");
const { AppError } = require("@/utils/errors");

module.exports = async function seedCourses() {
  try {
    const courses = [
      {
        categoryId: 1,
        courseName: "HTML, CSS & JavaScript",
        description:
          "Fundamental web development with HTML, CSS and JavaScript.",
        durationHours: 60,
      },
      {
        categoryId: 2,
        courseName: "Java Core",
        description: "Learn object-oriented programming and Java fundamentals.",
        durationHours: 80,
      },
      {
        categoryId: 3,
        courseName: "MySQL Database",
        description: "Database design, SQL queries and MySQL administration.",
        durationHours: 45,
      },
      {
        categoryId: 4,
        courseName: "Python for AI",
        description:
          "Introduction to Python programming for Artificial Intelligence.",
        durationHours: 90,
      },
      {
        categoryId: 5,
        courseName: "English Communication",
        description: "Develop English communication skills for study and work.",
        durationHours: 40,
      },
    ];

    for (const course of courses) {
      await coursesService.create(course);
    }
  } catch (error) {
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};
