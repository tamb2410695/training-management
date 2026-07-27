const db = require("../../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
  ValidationError,
} = require("../../../utils/errors");

const { withTransaction } = require("../../../utils/database");
const { ERROR_CODES, CODE_PREFIX, CODE_LENGHT } = require("../../../constants");
const { throwIf, hasField, generateCode } = require("../../../utils/helpers");
const staffProfilesRepository = require("./profiles.repository");
const accountsRepository = require("../../accounts/accounts.repository");
const accountsService = require("../../accounts/accounts.service");
const { STAFF_FIELDS } = require("./profiles.constants");

const getList = async (query, connection = db) => {
  const { data: profiles, pagination } = await staffProfilesRepository.find(
    query,
    connection,
  );

  return {
    profiles,
    pagination,
  };
};

const getById = async (profileId, connection = db) => {
  const profile = await staffProfilesRepository.findById(profileId, connection);

  throwIf(!profile, NotFoundError, ERROR_CODES.STAFF_NOT_FOUND);

  return profile;
};

// const create = async (accountData, profileData, connection = db) => {
//     return await userCreationService.createStaff(
//       {
//         accountData,
//         profileData,
//       },
//       connection,
//     );
// };

const createProfile = async (profileData, connection = db) => {
  const { accountId, staffPhone } = profileData;
  throwIf(
    !accountId,
    ValidationError,
    `${ERROR_CODES.MISSING_REQUIRED_FIELDS}: accountId`,
  );

  const accountExists = await accountsRepository.findById(
    accountId,
    connection,
  );
  throwIf(!accountExists, NotFoundError, ERROR_CODES.ACCOUNT_NOT_FOUND);

  const linkedStaff = await staffProfilesRepository.findByAccountId(
    accountId,
    connection,
  );
  throwIf(linkedStaff, ConflictError, ERROR_CODES.PROFILE_ALREADY_LINKED);

  const existedPhone = await staffProfilesRepository.findByPhone(
    staffPhone,
    connection,
  );
  throwIf(
    existedPhone,
    ConflictError,
    ERROR_CODES.VALIDATION_FAILED,
    "Staff phone already exists in the system",
  );
  const finalPayload = {
    ...profileData,
    hireDate: profileData.hireDate || new Date().toISOString().split("T")[0],
  };

  const createdProfile = await staffProfilesRepository.create(
    finalPayload,
    connection,
  );

  throwIf(!createdProfile, ConflictError, ERROR_CODES.NO_CHANGES);
  const staffCode = generateCode(CODE_PREFIX.STAFF, createdProfile.staffId);
  const updatedProfile = await update(
    createdProfile.staffId,
    { staffCode },
    connection,
  );
  return updatedProfile;
};

const getStaffOrThrow = async (profileId, connection = db) => {
  const profile = await staffProfilesRepository.findById(profileId, connection);
  throwIf(!profile, NotFoundError, ERROR_CODES.STAFF_NOT_FOUND);
  return profile;
};

const buildUpdateStaffData = async (profile, profileData, connection = db) => {
  const updateStaffData = {};
  const allowedUpdateFields = [...STAFF_FIELDS.BODY.UPDATE, "staffCode"];

  allowedUpdateFields.forEach((field) => {
    if (hasField(profileData, field)) {
      updateStaffData[field] = profileData[field];
    }
  });

  throwIf(
    Object.keys(updateStaffData).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  return updateStaffData;
};

const update = async (profileId, profileData, connection = db) => {
  const profile = await getStaffOrThrow(profileId, connection);

  const updateStaffData = await buildUpdateStaffData(
    profile,
    profileData,
    connection,
  );

  const updatedProfile = await staffProfilesRepository.update(
    profileId,
    updateStaffData,
    connection,
  );

  throwIf(!updatedProfile, ConflictError, ERROR_CODES.NO_CHANGES);

  return updatedProfile;
};

const remove = async (profileId, connection = db) => {
  return await withTransaction(async (txConnection) => {
    const profile = await staffProfilesRepository.findById(
      profileId,
      txConnection,
    );
    throwIf(
      !profile,
      NotFoundError,
      ERROR_CODES.STAFF_NOT_FOUND || "STAFF_NOT_FOUND",
    );

    const accountDeleted = await accountsService.remove(
      profile.accountId,
      txConnection,
    );
    throwIf(!accountDeleted, ConflictError, "FAILED_TO_SOFT_DELETE_ACCOUNT");

    const updatedProfile = await staffProfilesRepository.update(
      profileId,
      { profileStatus: "TERMINATED" },
      txConnection,
    );
    throwIf(!updatedProfile, ConflictError, "FAILED_TO_UPDATE_STAFF_STATUS");

    return {
      profileId,
      accountId: profile.accountId,
      status: "TERMINATED",
      accountSoftDeleted: true,
    };
  }, connection);
};

module.exports = {
  getList,
  getById,
  // create,
  createProfile,
  update,
  remove,
};
