const db = require("../../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../../../utils/errors");

const { withTransaction } = require("../../../utils/database");
const { ERROR_CODES } = require("../../../constants");
const { throwIf, hasField } = require("../../../utils/helpers");
const staffProfilesRepository = require("./profiles.repository");
const accountsRepository = require("../../accounts/accounts.repository");
const accountsService = require("../../accounts/accounts.service");

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

  throwIf(
    !profile,
    NotFoundError,
    ERROR_CODES.STAFF_NOT_FOUND || "STAFF_NOT_FOUND",
  );

  return profile;
};

const create = async (profileData, connection = db) => {
  const { accountId, profileCode } = profileData;

  const accountExists = await accountsRepository.findById(
    accountId,
    connection,
  );
  throwIf(!accountExists, NotFoundError, ERROR_CODES.ACCOUNT_NOT_FOUND);

  const linkedStaff = await staffProfilesRepository.findByAccountId(
    accountId,
    connection,
  );
  throwIf(
    linkedStaff,
    ConflictError,
    ERROR_CODES.VALIDATION_FAILED,
    "This account is already linked to another profile profile",
  );

  const existedCode = await staffProfilesRepository.findByCode(
    profileCode,
    connection,
  );
  throwIf(
    existedCode,
    ConflictError,
    ERROR_CODES.VALIDATION_FAILED,
    "Staff code already exists in the system",
  );

  const finalPayload = {
    ...profileData,
    hireDate: profileData.hireDate || new Date().toISOString().split("T")[0],
  };

  const createdStaff = await staffProfilesRepository.create(
    finalPayload,
    connection,
  );

  throwIf(!createdStaff, ConflictError, ERROR_CODES.NO_CHANGES);

  return createdStaff;
};

const getStaffOrThrow = async (profileId, connection = db) => {
  const profile = await staffProfilesRepository.findById(profileId, connection);
  throwIf(
    !profile,
    NotFoundError,
    ERROR_CODES.STAFF_NOT_FOUND || "STAFF_NOT_FOUND",
  );
  return profile;
};

const buildUpdateStaffData = async (profile, profileData, connection = db) => {
  const updateStaffData = {};
  const allowedUpdateFields = [
    "fullName",
    "gender",
    "dateOfBirth",
    "identityCard",
    "phone",
    "personalEmail",
    "address",
    "academicRank",
    "contractType",
    "profileStatus",
  ];

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

  const updatedStaff = await staffProfilesRepository.update(
    profileId,
    updateStaffData,
    connection,
  );

  throwIf(!updatedStaff, ConflictError, ERROR_CODES.NO_CHANGES);

  return updatedStaff;
};

const remove = async (profileId, connection = db) => {
  return await withTransaction(async (txConnection) => {
    const profile = await staffProfilesRepository.findById(profileId, txConnection);
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

    const updatedStaff = await staffProfilesRepository.update(
      profileId,
      { profileStatus: "TERMINATED" },
      txConnection,
    );
    throwIf(!updatedStaff, ConflictError, "FAILED_TO_UPDATE_STAFF_STATUS");

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
  create,
  update,
  remove,
};
