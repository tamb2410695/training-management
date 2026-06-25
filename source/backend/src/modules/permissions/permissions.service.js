const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { throwIf } = require("../../utils/helpers");
const { ERROR_MESSAGES } = require("../../constants");
const permissionsRepository = require("./permissions.repository");

const getList = async (query, connection = db) => {
  return await permissionsRepository.find(query, connection);
};

const getById = async (permissionId, connection = db) => {
  const permission = await permissionsRepository.findById(permissionId, connection);
  throwIf(!permission, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  return permission;
};

const create = async (permissionData, connection = db) => {
  const existingCode = await permissionsRepository.findByCode(permissionData.permissionCode, connection);
  throwIf(existingCode, AppError.ConflictError, "Permission code already exists");

  return await permissionsRepository.create(permissionData, connection);
};

const update = async (permissionId, permissionData, connection = db) => {
  const permission = await permissionsRepository.findById(permissionId, connection);
  throwIf(!permission, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

  if (permissionData.permissionCode && permissionData.permissionCode !== permission.permissionCode) {
    const existingCode = await permissionsRepository.findByCode(permissionData.permissionCode, connection);
    throwIf(existingCode, AppError.ConflictError, "Permission code already exists");
  }

  return await permissionsRepository.update(permissionId, permissionData, connection);
};

const remove = async (permissionId, connection = db) => {
  const permission = await permissionsRepository.findById(permissionId, connection);
  throwIf(!permission, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

  // Bảo vệ an toàn DB: Kiểm tra xem quyền này có đang được gán trong bảng cấu hình quyền của nhóm vai trò không?
  const [linkedRoles] = await connection.query(
    `SELECT COUNT(*) as count FROM ROLE_PERMISSION WHERE permission_id = ?`,
    [permissionId]
  );

  throwIf(
    linkedRoles[0]?.count > 0,
    AppError.ConflictError,
    "Cannot delete permission because it is currently assigned to some roles"
  );

  return await permissionsRepository.remove(permissionId, connection);
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};