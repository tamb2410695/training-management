const {
  HTTP_STATUS,
  ERROR_MESSAGES,
  ERROR_CODES,
  ROLES,
} = require("@/constants");
const userCreationService = require("@/modules/users/userCreation.service");
const { AppError } = require("@/utils/errors");

module.exports = async function seedAdmin() {
  try {
    const accountData = {
      username: "admin",
      accountEmail: "admin@system.com",
      password: "adminSystem123",
      phone: "0901000002",
      roleCode: ROLES.ADMIN,
    };
    const profileData = {
      fullName: "System Administrator",
      personalEmail: "admin@system.com",
    };
    await userCreationService.createStaff(accountData, profileData);
  } catch (error) {
    throw new AppError(
      ERROR_CODES.SEEDER_FAILED,
      `${ERROR_MESSAGES.SEEDER_FAILED}: ${error.message}`,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};
