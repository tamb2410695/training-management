const db = require("../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../../utils/errors");

const {
  ROLES,
  ACCOUNT_STATUS,
  ERROR_MESSAGES,
  ERROR_CODES,
} = require("../../constants");
const { hashPassword } = require("../../utils/security/passwordUtil");
const { throwIf, hasField } = require("../../utils/helpers");
const { withTransaction } = require("../../utils/database/transaction");
const rolesService = require("../roles/roles.service");
const accountsRepository = require("./accounts.repository");

const getList = async (query, connection = db) => {
  const { data: accounts, pagination } = await accountsRepository.find(
    query,
    connection,
  );

  const cleanedAccounts = accounts.map((account) => {
    const { passwordHash: _, ...safeAccountData } = account;
    return safeAccountData;
  });

  return { accounts: cleanedAccounts, pagination };
};

const getById = async (accountId, connection = db) => {
  const account = await accountsRepository.findById(accountId, connection);

  throwIf(
    !account,
    NotFoundError,
    ERROR_CODES.ACCOUNT_NOT_FOUND,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );

  const { passwordHash: _, ...safeAccountData } = account;
  return safeAccountData;
};

const create = async (accountData, connection = db) => {
  return await withTransaction(async (txConnection) => {
    const { username, email, password, roleCodes } = accountData;

    const [accountByUsername, accountByEmail] = await Promise.all([
      accountsRepository.findByUsername(username, txConnection),
      accountsRepository.findByEmail(email, txConnection),
    ]);

    throwIf(
      accountByUsername,
      ConflictError,
      ERROR_CODES.ACCOUNT_EXISTED,
      ERROR_MESSAGES.ACCOUNT_EXISTED,
    );
    throwIf(
      accountByEmail,
      ConflictError,
      ERROR_CODES.ACCOUNT_EXISTED,
      ERROR_MESSAGES.ACCOUNT_EXISTED,
    );

    const passwordHash = await hashPassword(password);

    const createdAccount = await accountsRepository.create(
      { username, email, passwordHash },
      txConnection,
    );

    throwIf(
      !createdAccount,
      ConflictError,
      ERROR_CODES.NO_CHANGES,
      ERROR_MESSAGES.NO_CHANGES,
    );

    const targetRoles =
      roleCodes && roleCodes.length ? roleCodes : [ROLES.STUDENT];
    await rolesService.assignRoleToAccount(
      { accountId: createdAccount.accountId, roleCodes: targetRoles },
      txConnection,
    );

    const {
      passwordHash: _,
      roleNames: __,
      ...safeAccountData
    } = createdAccount;
    return { ...safeAccountData, roleCodes: [targetRoles] };
  }, connection);
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

const resolveUsernameUpdate = async (
  account,
  accountData,
  updateAccountData,
  connection = db,
) => {
  if (!hasField(accountData, "username")) return;

  const existed = await accountsRepository.findByUsername(
    accountData.username,
    connection,
  );

  throwIf(
    existed && existed.accountId !== account.accountId,
    ConflictError,
    ERROR_CODES.ACCOUNT_EXISTED,
    ERROR_MESSAGES.ACCOUNT_EXISTED,
  );

  updateAccountData.username = accountData.username;
};

const resolveEmailUpdate = async (
  account,
  accountData,
  updateAccountData,
  connection = db,
) => {
  if (!hasField(accountData, "email")) return;

  const existed = await accountsRepository.findByEmail(
    accountData.email,
    connection,
  );

  throwIf(
    existed && existed.accountId !== account.accountId,
    ConflictError,
    ERROR_CODES.ACCOUNT_EXISTED,
    ERROR_MESSAGES.ACCOUNT_EXISTED,
  );

  updateAccountData.email = accountData.email;
};

const resolvePasswordUpdate = async (accountData, updateAccountData) => {
  if (!hasField(accountData, "password")) return;
  updateAccountData.passwordHash = await hashPassword(accountData.password);
};

const resolveStatusUpdate = (account, accountData, updateAccountData) => {
  if (!hasField(accountData, "accountStatus")) return;

  throwIf(
    accountData.accountStatus === ACCOUNT_STATUS.DELETED,
    BadRequestError,
    ERROR_CODES.MANUAL_STATUS_CHANGE_FORBIDDEN,
    ERROR_MESSAGES.MANUAL_STATUS_CHANGE_FORBIDDEN,
  );

  updateAccountData.accountStatus = accountData.accountStatus;
};

const buildUpdateAccountData = async (
  account,
  accountData,
  connection = db,
) => {
  const updateAccountData = {};

  await resolveUsernameUpdate(
    account,
    accountData,
    updateAccountData,
    connection,
  );
  await resolveEmailUpdate(account, accountData, updateAccountData, connection);
  await resolvePasswordUpdate(accountData, updateAccountData);
  resolveStatusUpdate(account, accountData, updateAccountData);

  throwIf(
    Object.keys(updateAccountData).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  return updateAccountData;
};

const update = async (accountId, accountData, connection = db) => {
  const account = await getAccountOrThrow(accountId, connection);
  const updateAccountData = await buildUpdateAccountData(
    account,
    accountData,
    connection,
  );

  const updatedAccount = await accountsRepository.update(
    accountId,
    updateAccountData,
    connection,
  );

  throwIf(
    !updatedAccount,
    ConflictError,
    ERROR_CODES.NO_CHANGES,
    ERROR_MESSAGES.NO_CHANGES,
  );

  const { passwordHash: _, ...safeAccountData } = updatedAccount;
  return safeAccountData;
};

const updateStatus = async (accountId, newStatus, connection = db) => {
  const account = await accountsRepository.findById(accountId, connection);

  throwIf(
    !account,
    NotFoundError,
    ERROR_CODES.ACCOUNT_NOT_FOUND,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );

  throwIf(
    account.accountStatus === ACCOUNT_STATUS.DELETED,
    BadRequestError,
    ERROR_CODES.ACCOUNT_DELETED,
    "Cannot change status of a deleted account",
  );

  if (account.accountStatus === newStatus) {
    const { passwordHash: _, ...safeAccountData } = account;
    return safeAccountData;
  }

  const updatedAccount = await accountsRepository.update(
    accountId,
    { accountStatus: newStatus },
    connection,
  );

  throwIf(
    !updatedAccount,
    ConflictError,
    ERROR_CODES.NO_CHANGES,
    ERROR_MESSAGES.NO_CHANGES,
  );

  const { passwordHash: _, ...safeAccountData } = updatedAccount;
  return safeAccountData;
};

const changeRole = async (
  accountId,
  targetRoleCode,
  adminId,
  connection = db,
) => {
  await getAccountOrThrow(accountId, connection);

  throwIf(
    accountId === adminId && targetRoleCode === ROLES.ADMIN,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "You cannot revoke your own Admin privilege.",
  );

  await rolesService.changeAccountRole(
    { accountId, targetRoleCode, assignedBy: adminId },
    connection,
  );

  return { message: "Account role updated successfully" };
};

const remove = async (accountId, connection = db) => {
  const account = await accountsRepository.findById(accountId, connection);
  throwIf(
    !account,
    NotFoundError,
    ERROR_CODES.ACCOUNT_NOT_FOUND,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );

  throwIf(
    account.accountStatus === ACCOUNT_STATUS.DELETED,
    ConflictError,
    ERROR_CODES.ACCOUNT_DELETED,
    ERROR_MESSAGES.ACCOUNT_DELETED,
  );

  const deletedAccount = await accountsRepository.remove(accountId, connection);
  return deletedAccount || true;
};

const restore = async (accountId, connection = db) => {
  const account = await accountsRepository.findDeletedById(accountId);

  throwIf(
    !account,
    NotFoundError,
    ERROR_CODES.ACCOUNT_NOT_FOUND,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );

  throwIf(
    account.deletedAt === null &&
      account.accountStatus !== ACCOUNT_STATUS.DELETED,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Account is already active and does not need to be restored",
  );

  const restoredAccount = await accountsRepository.restore(
    accountId,
    connection,
  );

  throwIf(
    !restoredAccount,
    ConflictError,
    ERROR_CODES.NO_CHANGES,
    "Failed to restore the account",
  );

  const { passwordHash: _, ...safeAccountData } = restoredAccount;
  return safeAccountData;
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
  updateStatus,
  changeRole,
  restore,
};
