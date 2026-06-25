const db = require("../../config/database");
const AppError = require("../../utils/errors");
const {
  ROLE_IDS,
  ROLES,
  ACCOUNT_STATUS,

  HTTP_STATUS,
  ERROR_MESSAGES,
} = require("../../constants");

const { hashPassword } = require("../../utils/security/passwordUtil");
const { throwIf, hasField } = require("../../utils/helpers");

const accountsRepository = require("./accounts.repository");
const rolesRepository = require("../roles/roles.repository");
const { withTransaction } = require("../../utils/database");

//
const getList = async (query, connection = db) => {
  const { data: accounts, pagination } = await accountsRepository.find(
    query,
    connection,
  );
  const cleanedAccounts = accounts.map((account) => {
    const { passwordHash: _, ...safeAccountData } = account;
    return safeAccountData;
  });
  return {
    accounts: cleanedAccounts,
    pagination,
  };
};

//
const getById = async (accountId, connection = db) => {
  const accountById = await accountsRepository.findById(accountId, connection);
  throwIf(
    !accountById,
    AppError.NotFoundError,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );
  const { passwordHash: _, ...safeAccountData } = accountById;

  return safeAccountData;
};

//
const create = async (accountData, connection = db) => {
  const { username, email, password, roleName } = accountData;
  const [accountByUsername, accountByEmail] = await Promise.all([
    accountsRepository.findByUsername(username, connection),
    accountsRepository.findByEmail(email, connection),
  ]);

  throwIf(
    accountByUsername,
    AppError.ConflictError,
    ERROR_MESSAGES.ACCOUNT_EXISTED,
  );

  throwIf(
    accountByEmail,
    AppError.ConflictError,
    ERROR_MESSAGES.ACCOUNT_EXISTED,
  );

  const roleId = ROLE_IDS[roleName];
  const passwordHash = await hashPassword(password);
  const createdAccount = await accountsRepository.create(
    {
      roleId,
      username,
      email,
      passwordHash,
    },
    connection,
  );

  throwIf(!createdAccount, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);
  const { passwordHash: _, ...safeAccountData } = createdAccount;

  return safeAccountData;
};

const resolveUsernameUpdate = async (
  account,
  accountData,
  updateAccountData,
  connection = db,
) => {
  if (!hasField(accountData, "username")) {
    return;
  }

  const existed = await accountsRepository.findByUsername(
    accountData.username,
    connection,
  );

  throwIf(
    existed && existed.accountId !== account.accountId,
    AppError.ConflictError,
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
  if (!hasField(accountData, "email")) {
    return;
  }
  const existed = await accountsRepository.findByEmail(
    accountData.email,
    connection,
  );
  throwIf(
    existed && existed.accountId !== account.accountId,
    AppError.ConflictError,
    ERROR_MESSAGES.ACCOUNT_EXISTED,
  );
  updateAccountData.email = accountData.email;
};

const getAccountOrThrow = async (accountId, connection = db) => {
  const accountById = await accountsRepository.findById(
    accountId,
    connection,
  );

  throwIf(
    !accountById,
    AppError.NotFoundError,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );

  return accountById;
};

const resolvePasswordUpdate = async (accountData, updateAccountData) => {
  if (!hasField(accountData, "password")) {
    return;
  }
  updateAccountData.passwordHash = await hashPassword(accountData.password);
};

const resolveRoleUpdate = async (accountData, updateAccountData, connection = db) => {
  if (!hasField(accountData, "roleName")) {
    return;
  }
  const role = await rolesRepository.findByName(
    accountData.roleName,
    connection,
  );
  throwIf(!role, AppError.NotFoundError, ERROR_MESSAGES.ROLE_NOT_FOUND);
  updateAccountData.roleId = role.roleId;
};

const resolveStatusUpdate = (account, accountData, updateAccountData) => {
  if (!hasField(accountData, "accountStatus")) {
    return;
  }
  throwIf(
    accountData.accountStatus === ACCOUNT_STATUS.DELETED,
    AppError.BadRequestError,
    ERROR_MESSAGES.MANUAL_STATUS_CHANGE_FORBIDDEN,
  );
  updateAccountData.accountStatus = accountData.accountStatus;
};

const buildUpdateAccountData = async (account, accountData, connection = db) => {
  const updateAccountData = {};
  await resolveUsernameUpdate(account, accountData, updateAccountData, connection);
  await resolveEmailUpdate(account, accountData, updateAccountData, connection);
  await resolveRoleUpdate(accountData, updateAccountData, connection);
  await resolvePasswordUpdate(accountData, updateAccountData);
  resolveStatusUpdate(account, accountData, updateAccountData);
  throwIf(
    Object.keys(updateAccountData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  return updateAccountData;
};

//
const update = async (accountId, accountData, connection = db) => {
  return withTransaction(async (txConnection) => {
    const account = await getAccountOrThrow(accountId, txConnection);
    const updateAccountData = await buildUpdateAccountData(
      account,
      accountData,
      txConnection,
    );
    const updatedAccount = await accountsRepository.update(
      accountId,
      updateAccountData,
      txConnection,
    );
    throwIf(!updatedAccount, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);
    const { passwordHash: _, ...safeAccountData } = updatedAccount;

    return safeAccountData;
  }, connection);
};

//
const remove = async (accountId, connection = db) => {
  const { accountById } = await accountsRepository.findById(
    accountId,
    connection,
  );

  throwIf(
    !accountById,
    AppError.NotFoundError,
    ERROR_MESSAGES.ACCOUNT_NOT_FOUND,
  );

  throwIf(
    accountById.accountStatus === ACCOUNT_STATUS.DELETED,
    AppError.NotFoundError,
    ERROR_MESSAGES.ACCOUNT_DELETED,
  );
  const { data } = await accountsRepository.remove(accountId, connection);
  return result;
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};
