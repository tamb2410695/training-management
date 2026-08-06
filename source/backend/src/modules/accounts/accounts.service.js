const db = require("@/config/database");

const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("@/utils/errors");

const {
  ERROR_CODES,
  ERROR_MESSAGES,
  ACCOUNT_STATUS,
  ROLES,
} = require("@/constants");

const { throwIf, pickFields } = require("@/utils/helpers");

const { hashPassword } = require("@/utils/security/passwordUtil");

const { withTransaction } = require("@/utils/database");

const accountsRepository = require("./accounts.repository");

const rolesService = require("../roles/roles.service");

const { ACCOUNT_FIELDS } = require("./accounts.constants");

// ===============================
// Helpers
// ===============================

const removeSensitiveData = (account) => {
  if (!account) {
    return null;
  }

  const { passwordHash, ...safeData } = account;

  return safeData;
};

const getAccountOrThrow = async (accountId, connection = db) => {
  const account = await accountsRepository.findById(accountId, connection);

  throwIf(
    !account,
    NotFoundError,
    ERROR_CODES.ACCOUNT_NOT_FOUND,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );

  return account;
};

// ===============================
// Query
// ===============================

const getList = async (query, connection = db) => {
  const result = await accountsRepository.list(query, connection);

  return {
    accounts: result.data.map(removeSensitiveData),

    pagination: result.pagination,
  };
};

const getById = async (accountId, connection = db) => {
  const account = await getAccountOrThrow(accountId, connection);

  return removeSensitiveData(account);
};

// ===============================
// CRUD
// ===============================

const create = async (accountData, connection = db) => {
  return withTransaction(async (tx) => {
    const { username, email, password, roleCode } = accountData;

    const existedUsername = await accountsRepository.findByUsername(
      username,
      tx,
    );

    throwIf(existedUsername, ConflictError, ERROR_CODES.ACCOUNT_EXISTED);

    const existedEmail = await accountsRepository.findByEmail(email, tx);

    throwIf(existedEmail, ConflictError, ERROR_CODES.ACCOUNT_EXISTED);

    const role = await rolesService.getByCode(roleCode || ROLES.STUDENT, tx);

    const passwordHash = await hashPassword(password);

    const account = await accountsRepository.create(
      {
        username,

        email,

        passwordHash,

        roleId: role.roleId,

        accountStatus: ACCOUNT_STATUS.ACTIVE,
      },
      tx,
    );

    throwIf(
      !account,
      ConflictError,
      ERROR_CODES.NO_CHANGES,
      ERROR_MESSAGES.NO_CHANGES,
    );

    return removeSensitiveData(account);
  }, connection);
};

const update = async (accountId, accountData, connection = db) => {
  const account = await getAccountOrThrow(accountId, connection);

  const payload = pickFields(accountData, ACCOUNT_FIELDS.BODY.UPDATE);

  throwIf(
    Object.keys(payload).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  if (payload.username) {
    const existed = await accountsRepository.findByUsername(
      payload.username,
      connection,
    );

    throwIf(
      existed && existed.accountId !== account.accountId,
      ConflictError,
      ERROR_CODES.ACCOUNT_EXISTED,
    );
  }

  if (payload.email) {
    const existed = await accountsRepository.findByEmail(
      payload.email,
      connection,
    );

    throwIf(
      existed && existed.accountId !== account.accountId,
      ConflictError,
      ERROR_CODES.ACCOUNT_EXISTED,
    );
  }

  const updated = await accountsRepository.update(
    accountId,
    payload,
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return removeSensitiveData(updated);
};

const remove = async (accountId, connection = db) => {
  const account = await getAccountOrThrow(accountId, connection);

  throwIf(
    account.accountStatus === ACCOUNT_STATUS.DELETED,
    ConflictError,
    ERROR_CODES.ACCOUNT_DELETED,
  );

  return accountsRepository.remove(accountId, connection);
};

// ===============================
// Business Actions
// ===============================

const changePassword = async (accountId, newPassword, connection = db) => {
  const account = await getAccountOrThrow(accountId, connection);

  const passwordHash = await hashPassword(newPassword);

  const updated = await accountsRepository.update(
    accountId,
    {
      passwordHash,
    },
    connection,
  );

  throwIf(
    !updated,
    ConflictError,
    ERROR_CODES.NO_CHANGES,
    ERROR_MESSAGES.NO_CHANGES,
  );

  return removeSensitiveData(updated);
};

const changeRole = async (
  accountId,
  targetRoleCode,
  adminId,
  connection = db,
) => {
  const account = await getAccountOrThrow(accountId, connection);

  throwIf(
    accountId === adminId && targetRoleCode === ROLES.ADMIN,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Cannot remove or change your own admin privilege",
  );

  await rolesService.changeAccountRole(
    {
      accountId,
      targetRoleCode,
      assignedBy: adminId,
    },
    connection,
  );

  return {
    message: "Account role updated successfully",
  };
};

const lock = async (accountId, connection = db) => {
  const account = await getAccountOrThrow(accountId, connection);

  throwIf(
    account.accountStatus === ACCOUNT_STATUS.DELETED,
    BadRequestError,
    ERROR_CODES.ACCOUNT_DELETED,
  );

  throwIf(
    account.accountStatus === ACCOUNT_STATUS.LOCK,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await accountsRepository.updateStatus(
    accountId,
    ACCOUNT_STATUS.LOCK,
    connection,
  );

  return removeSensitiveData(updated);
};

const activate = async (accountId, connection = db) => {
  const account = await getAccountOrThrow(accountId, connection);

  throwIf(
    account.accountStatus === ACCOUNT_STATUS.DELETED,
    BadRequestError,
    ERROR_CODES.ACCOUNT_DELETED,
  );

  const updated = await accountsRepository.updateStatus(
    accountId,
    ACCOUNT_STATUS.ACTIVE,
    connection,
  );

  return removeSensitiveData(updated);
};

const disable = async (accountId, connection = db) => {
  const account = await getAccountOrThrow(accountId, connection);

  throwIf(
    account.accountStatus === ACCOUNT_STATUS.DELETED,
    BadRequestError,
    ERROR_CODES.ACCOUNT_DELETED,
  );

  const updated = await accountsRepository.updateStatus(
    accountId,
    ACCOUNT_STATUS.DISABLE,
    connection,
  );

  return removeSensitiveData(updated);
};

const restore = async (accountId, connection = db) => {
  const account = await accountsRepository.findDeletedById(
    accountId,
    connection,
  );

  throwIf(
    !account,
    NotFoundError,
    ERROR_CODES.ACCOUNT_NOT_FOUND,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );

  const restored = await accountsRepository.restore(accountId, connection);

  throwIf(
    !restored,
    ConflictError,
    ERROR_CODES.NO_CHANGES,
    ERROR_MESSAGES.NO_CHANGES,
  );

  return removeSensitiveData(restored);
};

module.exports = {
  // Query
  getList,
  getById,

  // CRUD
  create,
  update,
  remove,

  // Business Actions
  changePassword,
  changeRole,

  lock,
  activate,
  disable,
  restore,
};
