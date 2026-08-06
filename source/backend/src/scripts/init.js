require('module-alias/register');
const fs = require("fs");
const path = require("path");
const db = require("@/config/database");
const { throwIf } = require("../utils/helpers");
const { ERROR_CODES, ERROR_MESSAGES } = require("../constants");
const { AppError } = require("../utils/errors");

async function initSchema() {
  try {
    const dropPath = path.join(__dirname, "../database/schema/drop_table.sql");
    const schemaPath = path.join(
      __dirname,
      "../database/schema/create_tables.v6.sql",
    );

    throwIf(
      !fs.existsSync(dropPath),
      ERROR_CODES.FILE_NOT_FOUND,
      `Drop file not found at: ${dropPath}`,
    );
    const dropStatements = fs.readFileSync(dropPath, "utf8");
    await db.query(dropStatements);
    throwIf(
      !fs.existsSync(schemaPath),
      ERROR_CODES.FILE_NOT_FOUND,
      `Schema file not found at: ${schemaPath}`,
    );
    const sqlStatements = fs.readFileSync(schemaPath, "utf8");
    await db.query(sqlStatements);
  } catch (error) {
    const appError =
      error instanceof AppError
        ? error
        : new AppError(
            ERROR_CODES.SCHEMA_INITIALIZATION_FAILED,
            `${ERROR_MESSAGES.SCHEMA_INITIALIZATION_FAILED}: ${error.message}`,
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
  initSchema()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = initSchema;
