const db = require("../../config/database");
const AppError = require("../../utils/errors");
const { throwIf } = require("../../utils/helpers");
const { ERROR_MESSAGES } = require("../../constants");
const rolesRepository = require("./roles.repository");

const getList = async (query, connection = db) => {
  return await rolesRepository.find(query, connection);
};

const getById = async (roleId, connection = db) => {
  const role = await rolesRepository.findById(roleId, connection);
  throwIf(!role, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);
  return role;
};

const create = async (roleData, connection = db) => {
  const existingRole = await rolesRepository.findByName(roleData.roleName, connection);
  throwIf(existingRole, AppError.ConflictError, "Role name already exists");

  return await rolesRepository.create(roleData, connection);
};

const update = async (roleId, roleData, connection = db) => {
  const role = await rolesRepository.findById(roleId, connection);
  throwIf(!role, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

  if (roleData.roleName && roleData.roleName !== role.roleName) {
    const existingRole = await rolesRepository.findByName(roleData.roleName, connection);
    throwIf(existingRole, AppError.ConflictError, "Role name already exists");
  }

  return await rolesRepository.update(roleId, roleData, connection);
};

const remove = async (roleId, connection = db) => {
  const role = await rolesRepository.findById(roleId, connection);
  throwIf(!role, AppError.NotFoundError, ERROR_MESSAGES.RESOURCE_NOT_FOUND);

  // Kiểm tra ràng buộc dữ liệu: Không cho xóa nếu có tài khoản (ACCOUNT) đang sử dụng Role này
  const [linkedAccounts] = await connection.query(
    `SELECT COUNT(*) as count FROM ACCOUNT WHERE role_id = ? AND deleted_at IS NULL`,
    [roleId]
  );
  
  throwIf(
    linkedAccounts[0]?.count > 0,
    AppError.ConflictError,
    "Cannot delete role because it is currently assigned to active accounts"
  );

  return await rolesRepository.remove(roleId, connection);
};

module.exports = {
  getList,
  getById,
  create,
  update,
  remove,
};