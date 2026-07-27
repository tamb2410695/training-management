require('module-alias/register');
const { ERROR_CODES, ERROR_MESSAGES } = require("../constants");
const { AppError } = require("../utils/errors");
const rolesSeeder = require("../database/seeders/roles.seeder");
const adminSeeder = require("../database/seeders/admin.seeder");

async function runSeed() {
  try {
    await rolesSeeder();
    await adminSeeder();
  } catch (error) {
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
