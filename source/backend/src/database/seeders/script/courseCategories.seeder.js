const { HTTP_STATUS, ERROR_MESSAGES, ERROR_CODES } = require("@/constants");
const courseCategoriesService = require("@/modules/courseCategories/courseCategories.service");
const { AppError } = require("@/utils/errors");

module.exports = async function seedCourseCategories() {
  try {
    const courseCategories = [
      {
        categoryName: "Web Development",
        description:
          "Courses about HTML, CSS, JavaScript and modern web technologies",
      },
      {
        categoryName: "Java Programming",
        description:
          "Courses for Java Core, Spring Boot and enterprise development",
      },
      {
        categoryName: "Database",
        description:
          "Courses about database design, SQL and database administration",
      },
      {
        categoryName: "Artificial Intelligence",
        description: "Courses about Python, Machine Learning and AI",
      },
      {
        categoryName: "English",
        description:
          "Courses to improve English communication and workplace skills",
      },
    ];

    for (const courseCategory of courseCategories) {
      await courseCategoriesService.create(courseCategory);
    }
  } catch (error) {
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};
