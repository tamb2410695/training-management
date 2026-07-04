const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { throwIf } = require("../../utils/helpers");
const { ERROR_MESSAGES } = require("../../constants");
const rolesRepository = require("./roles.repository");

const getById = async (roleId, connection = db) => {
  const role = await rolesRepository.findById(roleId, connection);
  throwIf(
    !role,
    AppError.NotFoundError,
    ERROR_MESSAGES.ROLE_NOT_FOUND || "Role not found",
  );
  return role;
};

const getByCode = async (roleCode, connection = db) => {
  throwIf(!roleCode, AppError.BadRequestError, "Role code is required");

  const role = await rolesRepository.findByCode(roleCode, connection);
  throwIf(
    !role,
    AppError.NotFoundError,
    ERROR_MESSAGES.ROLE_NOT_FOUND || "Role not found",
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
    "Role code already exists in the system",
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
      "New role code is already assigned to another role",
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
    `Cannot delete role '${role.roleName}' because it is currently assigned to ${assignedUsers.length} account(s).`,
  );

  const success = await rolesRepository.remove(roleId, connection);
  throwIf(!success, AppError.ConflictError, "Xóa vai trò thất bại");

  return true;
};
const getRoleCodesByAccountId = async (accountId, connection = db) => {
  throwIf(!accountId, AppError.BadRequestError, "Account ID is required");

  const userRoles = await rolesRepository.findRolesByAccountId(
    accountId,
    connection,
  );
  return userRoles.map((ur) => ur.roleCode);
};

const assignRoleToAccount = async (assignmentData, connection = db) => {
  const { accountId, roleCodes, assignedBy = null } = assignmentData;

  throwIf(
    !accountId || !roleCodes || !roleCodes.length,
    AppError.BadRequestError,
    "Account ID and Role Code are required",
  );
  const roleCodeArray = Array.isArray(roleCodes) ? roleCodes : [roleCodes];
  const roles = await rolesRepository.findByCodes(roleCodeArray, connection);
  throwIf(
    roles.length !== roleCodeArray.length,
    AppError.NotFoundError,
    "One or more roles not found in the system",
  );

  const currentRoles = await rolesRepository.findRolesByAccountId(
    accountId,
    connection,
  );
  const currentRoleCodes = currentRoles.map((r) => r.roleCode);
  const rolesToAssign = roles.filter(
    (role) => !currentRoleCodes.includes(role.roleCode),
  );

  if (rolesToAssign.length === 0) {
    return true;
  }

  const roleIds = rolesToAssign.map((role) => role.roleId);
  const payload = { accountId, roleIds, assignedBy };
  const success = await rolesRepository.assignRole(payload, connection);
  throwIf(!success, AppError.ConflictError, "Failed to assign role to account");

  return true;
};

const unassignRoleFromAccount = async (unassignmentData, connection = db) => {
  const { accountId, roleCodes } = unassignmentData;

  throwIf(
    !accountId || !roleCodes || !roleCodes.length,
    AppError.BadRequestError,
    "Account ID and Role Codes are required",
  );

  const roleCodeArray = Array.isArray(roleCodes) ? roleCodes : [roleCodes];
  const roles = await rolesRepository.findByCodes(roleCodeArray, connection);

  if (roles.length === 0) return true;

  const roleIds = roles.map((role) => role.roleId);
  const payload = { accountId, roleIds };

  await rolesRepository.deleteUserRole(payload, connection);
  return true;
};

const changeAccountRole = async (changeData, connection = db) => {
  const { accountId, targetRoleCode, assignedBy = null } = changeData;

  throwIf(
    !accountId || !targetRoleCode,
    AppError.BadRequestError,
    "Account ID and Target Role Code are required",
  );

  const targetRole = await rolesRepository.findByCode(
    targetRoleCode,
    connection,
  );
  throwIf(
    !targetRole,
    AppError.NotFoundError,
    `Target role '${targetRoleCode}' configuration not found`,
  );

  const currentRoles = await getRoleCodesByAccountId(accountId, connection);

  if (targetRoleCode === "ADMIN") {
    if (!currentRoles.includes("ADMIN")) {
      await rolesRepository.assignRole(
        {
          accountId,
          roleIds: [targetRole.roleId],
          assignedBy,
        },
        connection,
      );
    }
  } else if (targetRoleCode === "INSTRUCTOR") {
    if (currentRoles.includes("ADMIN")) {
      const adminRole = await rolesRepository.findByCode("ADMIN", connection);
      if (adminRole) {
        await rolesRepository.deleteUserRole(
          { accountId, roleIds: [adminRole.roleId] },
          connection,
        );
      }
    }
    if (!currentRoles.includes("INSTRUCTOR")) {
      await rolesRepository.assignRole(
        {
          accountId,
          roleIds: [targetRole.roleId],
          assignedBy,
        },
        connection,
      );
    }
  }

  return true;
};

module.exports = {
  getById,
  getByCode,
  getAll,
  create,
  update,
  removeRole,
  getRoleCodesByAccountId,
  assignRoleToAccount,
  unassignRoleFromAccount,
  changeAccountRole,
};
