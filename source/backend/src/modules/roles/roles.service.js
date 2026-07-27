const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { throwIf } = require("../../utils/helpers");
const { ERROR_MESSAGES, ERROR_CODES, ROLES } = require("../../constants");
const rolesRepository = require("./roles.repository");

const getById = async (roleId, connection = db) => {
  const role = await rolesRepository.findById(roleId, connection);
  throwIf(
    !role,
    AppError.NotFoundError,
    ERROR_MESSAGES.ROLE_NOT_FOUND,
  );
  return role;
};

const getByCode = async (roleCode, connection = db) => {
  throwIf(!roleCode, AppError.BadRequestError, "Role code is required");

  const role = await rolesRepository.findByCode(roleCode, connection);
  throwIf(
    !role,
    AppError.NotFoundError,
    ERROR_MESSAGES.ROLE_NOT_FOUND,
  );
  return role;
};

const getAll = async (connection = db) => {
  return await rolesRepository.findAll(connection);
};

const create = async (roleData, connection = db) => {
  const { roleCode } = roleData;

  const existedRole = await rolesRepository.findByCode(roleCode, connection);
  throwIf(
    existedRole,
    AppError.ConflictError,
    ERROR_CODES.ROLE_NOT_FOUND
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
      existedRole && existedRole.roleId !== roleId,
      AppError.ConflictError,
      ERROR_CODES.ROLE_CODE_DUPLICATED
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

  const role = await getById(roleId, connection);

  const assignedUsers = await rolesRepository.findUsersByRoleId(
    roleId,
    connection,
  );

  throwIf(
    assignedUsers.length > 0,
    AppError.ConflictError,
    `${ERROR_CODES.ROLE_HAS_ASSIGNED_USERS}: ${assignedUsers}`
  );

  const success = await rolesRepository.remove(roleId, connection);
  throwIf(!success, AppError.ConflictError, "Xóa vai trò thất bại");

  return true;
};

const getRoleCodeByAccountId = async (accountId, connection = db) => {
  throwIf(!accountId, AppError.BadRequestError, "Account ID is required");

  const userRole = await rolesRepository.findRoleByAccountId(
    accountId,
    connection,
  );
  return userRole ? userRole.roleCode : null;
};

const assignRoleToAccount = async (assignmentData, connection = db) => {
  const { accountId, roleCode, assignedBy } = assignmentData;

  throwIf(
    !accountId || !roleCode,
    AppError.BadRequestError,
    ERROR_CODES.ROLE_ASSIGNMENT_FAILED
  );
  
  const targetRole = await rolesRepository.findByCode(roleCode, connection);
  throwIf(
    !targetRole,
    AppError.NotFoundError,
    "Role not found in the system",
  );

  const currentRole = await rolesRepository.findRoleByAccountId(
    accountId,
    connection,
  );

  throwIf(
    currentRole?.roleCode === roleCode, 
    AppError.ConflictError, 
    ERROR_CODES.PROFILE_ALREADY_LINKED
  );
  
  const payload = { accountId, roleId: targetRole.roleId, assignedBy };
  const success = await rolesRepository.assignRole(payload, connection);
  throwIf(!success, AppError.ConflictError, ERROR_CODES.ROLE_ASSIGNMENT_FAILED);

  return true;
};

const unassignRoleFromAccount = async (accountId, connection = db) => {
  throwIf(!accountId, AppError.BadRequestError, "Account ID is required");

  const deleted = await rolesRepository.deleteUserRole(accountId, connection);
  throwIf(!deleted, AppError.ConflictError, ERROR_CODES.ROLE_UNASSIGNMENT_FAILED)
  return true;
};

const changeAccountRole = async (changeData, connection = db) => {
  const { accountId, targetRoleCode, assignedBy } = changeData;

  throwIf(
    !accountId || !targetRoleCode || !assignedBy,
    AppError.BadRequestError,
     ERROR_CODES.ROLE_ASSIGNMENT_FAILED
  );

  const targetRole = await rolesRepository.findByCode(
    targetRoleCode,
    connection,
  );
  throwIf(
    !targetRole,
    AppError.NotFoundError,
    ERROR_CODES.ROLE_NOT_FOUND
  );

  const currentRole = await rolesRepository.findRoleByAccountId(accountId, connection);
  
  if (currentRole?.roleCode === targetRoleCode) {
    return true; // Không có sự thay đổi về RoleCode
  }
  const success = await rolesRepository.assignRole(
    {
      accountId,
      roleId: targetRole.roleId,
      assignedBy,
    },
    connection,
  );

  throwIf(!success, AppError.ConflictError, ERROR_CODES.ROLE_ASSIGNMENT_FAILED);
  return true;
};

module.exports = {
  getById,
  getByCode,
  getAll,
  create,
  update,
  removeRole,
  getRoleCodeByAccountId,
  assignRoleToAccount,
  unassignRoleFromAccount,
  changeAccountRole,
};