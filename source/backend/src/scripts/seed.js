require("module-alias/register");

const { ERROR_CODES, ERROR_MESSAGES } = require("../constants");
const { AppError } = require("../utils/errors");

const seedRoles = require("../database/seeders/script/roles.seeder");
const seedAdmin = require("../database/seeders/script/admin.seeder");
const seedStaffs = require("../database/seeders/script/staffs.seeder");
const seedStudents = require("../database/seeders/script/students.seeder");
const seedRegistrations = require("../database/seeders/script/registrations.seeder");
const seedCourseCategories = require("../database/seeders/script/courseCategories.seeder");
const seedCourses = require("../database/seeders/script/courses.seeder");
const seedClasses = require("../database/seeders/script/classes.seeder");
const seedEnrollments = require("../database/seeders/script/enrollments.seeder");

async function runSeed() {
  try {
    await seedRoles();
    await seedAdmin();
    await seedStaffs();
    await seedStudents();
    await seedRegistrations();
    await seedCourseCategories();
    await seedCourses();
    await seedClasses();
    await seedEnrollments();
  } catch (error) {
  console.error("SEEDER ERROR:", error);
  console.error("MESSAGE:", error.message);
  console.error("STACK:", error.stack);
    const appError =
      error instanceof AppError
        ? error
        : new AppError(
            ERROR_CODES.SEEDER_FAILED,
            `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
          );

    console.error(
      JSON.stringify(
        {
          code: appError.errorCode,
          message: appError.message,
        },
        null,
        2,
      ),
    );

    process.exit(1);
  }
}

if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = runSeed;
