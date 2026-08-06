const fs = require("fs");
const path = require("path");
const db = require("@/config/database");
const { ERROR_MESSAGES, ERROR_CODES, HTTP_STATUS} = require("@/constants");
const { AppError, ConflictError } = require("@/utils/errors/AppError");
const { throwIf } = require("@/utils/helpers");

module.exports = async function seedRoles() {
  try {
    const rolesSeederPath = path.join(
      __dirname,
      "../../../database/seeders/sql/roles.seeder.sql",
    );
    throwIf(
      !fs.existsSync(rolesSeederPath),
      ConflictError,
      ERROR_CODES.FILE_NOT_FOUND,
      `Schema file not found at: ${rolesSeederPath}`,
    );
    const sqlStatements = fs.readFileSync(rolesSeederPath, "utf8");
    await db.query(sqlStatements);
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    if (error.error === 1062) {
      throw new AppError(
        ERROR_CODES.SEEDER_DUPLICATE_ENTRY,
        `${ERROR_MESSAGES.SEEDER_DUPLICATE_ENTRY}: ${error.message}`,
        HTTP_STATUS.CONFLICT
      );
    }
    
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
    );
  }
};
