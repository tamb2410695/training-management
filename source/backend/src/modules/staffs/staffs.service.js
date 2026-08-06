const db = require("@/config/database");

const {
  NotFoundError,
  ConflictError,
  BadRequestError,
  ValidationError,
} = require("@/utils/errors");

const { withTransaction } = require("@/utils/database");

const { ERROR_CODES, STAFF_STATUS, CODE_PREFIX } = require("@/constants");

const { throwIf, hasField, generateCode } = require("@/utils/helpers");

const staffRepository = require("./staffs.repository");
const accountsRepository = require("../accounts/accounts.repository");
const accountsService = require("../accounts/accounts.service");

const { STAFF_PROFILE_FIELDS } = require("./staffs.constants");

// ===============================
// Query
// ===============================

const getList = async (query, connection = db) => {
  const { data: profiles, pagination } = await staffRepository.find(
    query,
    connection,
  );

  return {
    profiles,
    pagination,
  };
};

const getById = async (staffId, connection = db) => {
  const profile = await staffRepository.findById(staffId, connection);

  throwIf(!profile, NotFoundError, ERROR_CODES.STAFF_NOT_FOUND);

  return profile;
};

// ===============================
// Internal Creation
// Used by userCreationService
// ===============================

const createProfile = async (profileData, connection = db) => {
  const { accountId, phone } = profileData;

  throwIf(!accountId, ValidationError, ERROR_CODES.MISSING_REQUIRED_FIELDS);

  const account = await accountsRepository.findById(accountId, connection);

  throwIf(!account, NotFoundError, ERROR_CODES.ACCOUNT_NOT_FOUND);

  const existedProfile = await staffRepository.findByAccountId(
    accountId,
    connection,
  );

  throwIf(existedProfile, ConflictError, ERROR_CODES.PROFILE_ALREADY_LINKED);

  if (phone) {
    const existedPhone = await staffRepository.findByPhone(phone, connection);

    throwIf(
      existedPhone,
      ConflictError,
      ERROR_CODES.VALIDATION_FAILED,
      "Staff phone already exists",
    );
  }

  const payload = {
    ...profileData,

    hireDate: profileData.hireDate || new Date().toISOString().split("T")[0],
  };

  const created = await staffRepository.create(payload, connection);

  throwIf(!created, ConflictError, ERROR_CODES.NO_CHANGES);

  const staffCode = generateCode(CODE_PREFIX.STAFF, created.staffId);

  return update(
    created.staffId,
    {
      staffCode,
    },
    connection,
  );
};

// ===============================
// Update
// ===============================

const getStaffOrThrow = async (staffId, connection = db) => {
  const profile = await staffRepository.findById(staffId, connection);

  throwIf(!profile, NotFoundError, ERROR_CODES.STAFF_NOT_FOUND);

  return profile;
};

const buildUpdateStaffData = async (profile, staffData, connection) => {
  const updateData = {};

  STAFF_PROFILE_FIELDS.BODY.UPDATE.forEach((field) => {
    if (hasField(staffData, field)) {
      updateData[field] = staffData[field];
    }
  });

  /*
    lifecycle field không cho CRUD update trực tiếp
    staffStatus chỉ xử lý bằng business action
  */

  delete updateData.staffStatus;

  throwIf(
    Object.keys(updateData).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
  );

  return updateData;
};

const update = async (staffId, staffData, connection = db) => {
  const profile = await getStaffOrThrow(staffId, connection);

  const payload = await buildUpdateStaffData(profile, staffData, connection);

  if (hasField(payload, "phone")) {
    const existed = await staffRepository.findByPhone(
      payload.phone,
      connection,
    );

    throwIf(
      existed && existed.staffId !== profile.staffId,

      ConflictError,

      ERROR_CODES.VALIDATION_FAILED,
      "Staff phone already exists",
    );
  }

  const updated = await staffRepository.update(staffId, payload, connection);

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

// ===============================
// Remove
// ===============================

const remove = async (staffId, connection = db) => {
  return withTransaction(
    async (tx) => {
      const profile = await staffRepository.findById(staffId, tx);

      throwIf(!profile, NotFoundError, ERROR_CODES.STAFF_NOT_FOUND);

      const deletedAccount = await accountsService.remove(
        profile.accountId,
        tx,
      );

      throwIf(!deletedAccount, ConflictError, ERROR_CODES.NO_CHANGES);

      const updated = await staffRepository.update(
        staffId,
        {
          staffStatus: STAFF_STATUS.TERMINATED,
        },
        tx,
      );

      throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

      return {
        staffId,

        accountId: profile.accountId,

        staffStatus: STAFF_STATUS.TERMINATED,

        accountSoftDeleted: true,
      };
    },

    connection,
  );
};

const findByAccountId = async (accountId, connection = db) => {
  const staff = staffRepository.findByAccountId(accountId, connection);

  throwIf(
    !staff,
    NotFoundError,
    ERROR_CODES.STUDENT_NOT_FOUND,
    "Student profile not found",
  );

  return staff;
};

// ===============================
// Business Actions
// ===============================

const activate = async (staffId, connection = db) => {
  const profile = await getStaffOrThrow(staffId, connection);

  throwIf(
    profile.staffStatus === STAFF_STATUS.TERMINATED,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Terminated staff cannot be activated",
  );

  throwIf(
    profile.staffStatus === STAFF_STATUS.ACTIVE,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await staffRepository.update(
    staffId,
    {
      staffStatus: STAFF_STATUS.ACTIVE,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const disable = async (staffId, connection = db) => {
  const profile = await getStaffOrThrow(staffId, connection);

  throwIf(
    profile.staffStatus === STAFF_STATUS.TERMINATED,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Terminated staff cannot be disabled",
  );

  throwIf(
    profile.staffStatus === STAFF_STATUS.DISABLE,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await staffRepository.update(
    staffId,
    {
      staffStatus: STAFF_STATUS.DISABLE,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const suspend = async (staffId, connection = db) => {
  const profile = await getStaffOrThrow(staffId, connection);

  throwIf(
    profile.staffStatus === STAFF_STATUS.TERMINATED,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Terminated staff cannot be suspended",
  );

  throwIf(
    profile.staffStatus === STAFF_STATUS.SUSPENDED,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await staffRepository.update(
    staffId,
    {
      staffStatus: STAFF_STATUS.SUSPENDED,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const startLeave = async (staffId, connection = db) => {
  const profile = await getStaffOrThrow(staffId, connection);

  throwIf(
    profile.staffStatus === STAFF_STATUS.TERMINATED,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Terminated staff cannot be put on leave",
  );

  throwIf(
    profile.staffStatus === STAFF_STATUS.ON_LEAVE,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await staffRepository.update(
    staffId,
    {
      staffStatus: STAFF_STATUS.ON_LEAVE,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return updated;
};

const terminate = async (staffId, connection = db) => {
  return withTransaction(async (tx) => {
    const profile = await getStaffOrThrow(staffId, tx);

    throwIf(
      profile.staffStatus === STAFF_STATUS.TERMINATED,
      BadRequestError,
      ERROR_CODES.NO_CHANGES,
    );

    await accountsService.remove(profile.accountId, tx);

    const updated = await staffRepository.update(
      staffId,
      {
        staffStatus: STAFF_STATUS.TERMINATED,
      },
      tx,
    );

    throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

    return updated;
  }, connection);
};

module.exports = {
  getList,
  getById,

  // Internal
  createProfile,

  // CRUD
  update,
  remove,

  // Business Actions
  activate,
  disable,
  suspend,
  startLeave,
  terminate,
};