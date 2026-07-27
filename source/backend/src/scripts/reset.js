require('module-alias/register');
const { ERROR_CODES, ERROR_MESSAGES } = require("../constants");
const { AppError } = require("../utils/errors");
const initSchema = require("./init");
const runSeed = require("./seed");

async function resetDatabase() {
  try {
    await initSchema();
    await runSeed();
  } catch (error) {
    const appError =
      error instanceof AppError
        ? error
        : new AppError(
            ERROR_CODES.SCHEMA_RESET_FAILED,
            `${ERROR_MESSAGES.SCHEMA_RESET_FAILED}: ${error.message}`,
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
  resetDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = resetDatabase;
