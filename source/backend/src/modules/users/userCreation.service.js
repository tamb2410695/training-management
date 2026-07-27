const db = require("../../config/database");

const { withTransaction } = require("../../utils/database/transaction");
const { ERROR_CODES, ERROR_MESSAGES, ROLES } = require("../../constants");
const { throwIf, hasField } = require("../../utils/helpers");
const {
  NotFoundError,
  ForbiddenError,
  ConflictError,
  BadRequestError,
} = require("../../utils/errors");

const accountsService = require("../accounts/accounts.service");
const accountsRepository = require("../accounts/accounts.repository");
const studentsService = require("../students/students.service");
const staffProfilesService = require("../staffs/profiles/profiles.service");

const createUser = async (userData, connection = db) => {
  return await withTransaction(async (txConnection) => {
    const { accountData, profileData } = userData;
    let createdAccount = {};
    let createdProfile = {};

    switch (accountData.roleCode) {
      case ROLES.ADMIN:
        createdAccount = await accountsService.create(
          {
            ...accountData,
            roleCode: ROLES.ADMIN,
          },
          txConnection,
        );

        if (!profileData.personalEmail)
          profileData.personalEmail = createdAccount.email;

        createdProfile = await staffProfilesService.create(
          {
            accountId: createdAccount.accountId,
            ...profileData,
          },
          txConnection,
        );
        break;
      case ROLES.INSTRUCTOR:
        createdAccount = await accountsService.create(
          {
            ...accountData,
            roleCode: ROLES.INSTRUCTOR,
          },
          txConnection,
        );

        if (!profileData.personalEmail)
          profileData.personalEmail = createdAccount.email;

        createdProfile = await staffProfilesService.create(
          {
            accountId: createdAccount.accountId,
            ...profileData,
          },
          txConnection,
        );
        break;
      case ROLES.STUDENT:
        createdAccount = await accountsService.create(
          {
            ...accountData,
            roleCode: ROLES.STUDENT,
          },
          txConnection,
        );

        if (!profileData.personalEmail)
          profileData.personalEmail = createdAccount.email;

        createdProfile = await studentsService.create(
          {
            accountId: createdAccount.accountId,
            ...profileData,
          },
          txConnection,
        );
        break;

      default:
        throwIf(true, BadRequestError, ERROR_CODES.NO_CHANGES);
        break;
    }

    throwIf(
      !createdAccount?.accountId || !createdProfile?.accountId,
      ConflictError,
      ERROR_CODES.ACCOUNT_NOT_FOUND,
    );
    return { accountData: createdAccount, profileData: createdProfile };
  }, connection);
};

const createStudent = async (accountData, profileData, connection = db) => {
  return await withTransaction(async (txConnection) => {
    if (!profileData.personalEmail)
      profileData.personalEmail = accountData.accountEmail;

    const createdAccount = await accountsService.create(
      {
        password: accountData.password,
        username: accountData.username,
        email: accountData.accountEmail,
        roleCode: ROLES.STUDENT,
      },
      txConnection,
    );
    const createdProfile = await studentsService.createProfile(
      {
        accountId: createdAccount.accountId,
        ...profileData,
      },
      txConnection,
    );

    throwIf(
      !createdAccount?.accountId || !createdProfile?.accountId,
      ConflictError,
      ERROR_CODES.ACCOUNT_NOT_FOUND,
    );

    return { createdUserData: createdProfile };
  }, connection);
};

const createStaff = async (accountData, profileData, connection = db) => {
  return await withTransaction(async (txConnection) => {
    throwIf(
      ![
        ROLES.ADMIN,
        ROLES.INSTRUCTOR,
      ].includes(accountData.roleCode),
      ConflictError,
      ERROR_CODES.PROFILE_INVALID_TYPE,
    );
    if (!profileData.personalEmail)
      profileData.personalEmail = createdAccount.email;

    const createdAccount = await accountsService.create(accountData,
      txConnection,
    );
    const createdProfile = await staffProfilesService.createProfile(
      {
        accountId: createdAccount.accountId,
        ...profileData,
      },
      txConnection,
    );

    throwIf(
      !createdAccount?.accountId || !createdProfile?.accountId,
      ConflictError,
      ERROR_CODES.NO_CHANGES,
    );
    
    return { createdUserData: createdProfile };
  }, connection);
};

module.exports = {
  createUser,
  createStaff,
  createStudent,
};
