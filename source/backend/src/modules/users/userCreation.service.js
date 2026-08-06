const db = require("@/config/database");

const { withTransaction } = require("@/utils/database/transaction");
const { ERROR_CODES, ROLES } = require("@/constants");
const { throwIf } = require("@/utils/helpers");
const { ConflictError, BadRequestError } = require("@/utils/errors");

const accountsService = require("../accounts/accounts.service");
const studentsService = require("../students/students.service");
const staffProfilesService = require("../staffs/staffs.service");
const { formatAccountData, validateAccountFormats } = require("../accounts");
const { formatStudentData } = require("../students/students.formatter");
const { formatStaffData } = require("../staffs/staffs.formatter");
const { validateStudentFormats } = require("../students");
const { validateStaffFormats } = require("../staffs/staffs.validator");

const createUser = async (userData, connection = db) => {
  return await withTransaction(async (txConnection) => {
    const { accountData: rawAccountData, profileData: rawProfileData } =
      userData;
    const accountData = formatAccountData(rawAccountData);
    const profileData = formatStaffData(formatStudentData(rawProfileData));
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
    const formattedAccountData = formatAccountData(accountData);
    const formattedProfileData = formatStudentData(profileData);
    validateAccountFormats(formattedAccountData)
    validateStudentFormats(formattedProfileData)
    if (!formattedProfileData.personalEmail)
      formattedProfileData.personalEmail = formattedAccountData.accountEmail;

    const createdAccount = await accountsService.create(
      {
        password: formattedAccountData.password,
        username: formattedAccountData.username,
        email: formattedAccountData.accountEmail,
        roleCode: ROLES.STUDENT,
      },
      txConnection,
    );
    const createdProfile = await studentsService.createProfile(
      {
        accountId: createdAccount.accountId,
        ...formattedProfileData,
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
    const formattedAccountData = formatAccountData(accountData);
    const formattedProfileData = formatStudentData(profileData);
    validateAccountFormats(formattedAccountData)
    validateStaffFormats(formattedProfileData)
    throwIf(
      ![ROLES.ADMIN, ROLES.INSTRUCTOR].includes(formattedAccountData.roleCode),
      ConflictError,
      ERROR_CODES.PROFILE_INVALID_TYPE,
    );
    if (!formattedProfileData.personalEmail)
      formattedProfileData.personalEmail = formattedAccountData.email;

    const createdAccount = await accountsService.create(
      { ...formattedAccountData, email: formattedAccountData.accountEmail },
      txConnection,
    );
    const createdProfile = await staffProfilesService.createProfile(
      {
        accountId: createdAccount.accountId,
        ...formattedProfileData,
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
