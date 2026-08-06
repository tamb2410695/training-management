const db = require("../../config/database");

const AppError = require("../../utils/errors");

const { throwIf } = require("../../utils/helpers");

const { ERROR_MESSAGES, ERROR_CODES } = require("../../constants");

const rolesRepository = require("./roles.repository");

const getById = async (roleId, connection = db) => {
  const role = await rolesRepository.findById(roleId, connection);

  throwIf(!role, AppError.NotFoundError, ERROR_MESSAGES.ROLE_NOT_FOUND);

  return role;
};

const getByCode = async (roleCode, connection = db) => {
  throwIf(!roleCode, AppError.BadRequestError, "Role code is required");
  const role = await rolesRepository.findByCode(roleCode, connection);
  throwIf(!role, AppError.NotFoundError, ERROR_MESSAGES.ROLE_NOT_FOUND);
  return role;
};

const getAll = async (connection = db) => {
  return rolesRepository.findAll(connection);
};

const create = async (roleData, connection = db) => {
  const { roleCode } = roleData;

  const existedRole = await rolesRepository.findByCode(roleCode, connection);

  throwIf(
    existedRole,
    AppError.ConflictError,
    ERROR_CODES.ROLE_CODE_DUPLICATED,
  );

  const createdRole = await rolesRepository.create(roleData, connection);

  throwIf(!createdRole, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

  return createdRole;
};

const update = async (roleId, roleData, connection = db) => {
  await getById(roleId, connection);

  if (roleData.roleCode) {
    const existedRole = await rolesRepository.findByCode(
      roleData.roleCode,
      connection,
    );

    throwIf(
      existedRole && existedRole.roleId !== Number(roleId),
      AppError.ConflictError,
      ERROR_CODES.ROLE_CODE_DUPLICATED,
    );
  }

  const updatedRole = await rolesRepository.update(
    roleId,
    roleData,
    connection,
  );

  throwIf(!updatedRole, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

  return updatedRole;
};

const removeRole = async (roleId, connection = db) => {
  throwIf(!roleId, AppError.BadRequestError, "Role ID is required");

  await getById(roleId, connection);

  const accounts = await rolesRepository.findAccountsByRoleId(
    roleId,
    connection,
  );

  throwIf(
    accounts.length > 0,
    AppError.ConflictError,
    ERROR_CODES.ROLE_HAS_ASSIGNED_USERS,
  );

  const deleted = await rolesRepository.remove(roleId, connection);

  throwIf(!deleted, AppError.ConflictError, ERROR_MESSAGES.NO_CHANGES);

  return true;
};

const getRoleCodeByAccountId = async (accountId, connection = db) => {
  throwIf(!accountId, AppError.BadRequestError, "Account ID is required");

  const role = await rolesRepository.findRoleByAccountId(accountId, connection);

  return role ? role.roleCode : null;
};

module.exports = {
  getById,
  getByCode,
  getAll,
  create,
  update,
  removeRole,
  getRoleCodeByAccountId,
};
