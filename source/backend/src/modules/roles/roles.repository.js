const db = require("../../config/database");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const findById = async (roleId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      role_id,
      role_code,
      role_name,
      role_description
    FROM ROLE
    WHERE role_id = ?
    `,
    [roleId]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByCode = async (roleCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      role_id,
      role_code,
      role_name,
      role_description
    FROM ROLE
    WHERE role_code = ?
    `,
    [roleCode]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByCodes = async (roleCodes, connection = db) => {
  if (!roleCodes || !Array.isArray(roleCodes) || roleCodes.length === 0) {
    return [];
  }
  const [rows] = await connection.query(
    `
    SELECT
      role_id,
      role_code,
      role_name,
      role_description
    FROM ROLE
    WHERE role_code IN (?)
    `,
    [roleCodes]
  );
  return arrayToCamelCase(rows);
};

const findAll = async (connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      role_id,
      role_code,
      role_name,
      role_description
    FROM ROLE
    `
  );
  return arrayToCamelCase(rows);
};

const create = async (roleData, connection = db) => {
  const data = objectToSnakeCase(roleData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO ROLE (${fieldClause})
    VALUES (${placeholderClause});
  `;
  
  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (roleId, roleData, connection = db) => {
  const data = objectToSnakeCase(roleData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE ROLE
    SET ${setClause}
    WHERE role_id = ?
  `;
  
  await connection.query(sql, [...values, roleId]);
  return findById(roleId, connection);
};

const remove = async (roleId, connection = db) => {
  const [result] = await connection.query(
    `
    DELETE FROM ROLE
    WHERE role_id = ?
    `,
    [roleId]
  );
  return result.affectedRows > 0;
};

const findUsersByRoleId = async (roleId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      ur.account_id, 
      a.username, 
      a.email 
    FROM USER_ROLE ur
    JOIN ACCOUNT a ON ur.account_id = a.account_id
    WHERE ur.role_id = ?
    `,
    [roleId]
  );
  return arrayToCamelCase(rows);
};

const findRolesByAccountId = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT r.role_id, r.role_code, r.role_name
    FROM USER_ROLE ur
    JOIN ROLE r ON ur.role_id = r.role_id
    WHERE ur.account_id = ?
    `,
    [accountId]
  );
  return arrayToCamelCase(rows);
};

function buildBulkPayload(dataArray) {
  if (!dataArray || dataArray.length === 0) {
    return { fieldsStr: "", bulkValues: [] };
  }

  const firstItemSnake = objectToSnakeCase(dataArray[0]);
  const fields = Object.keys(firstItemSnake);
  const fieldsStr = fields.join(", ");

  const bulkValues = dataArray.map(item => {
    const snakeItem = objectToSnakeCase(item);
    return fields.map(field => snakeItem[field]);
  });

  return { fieldsStr, bulkValues };
}
const assignRole = async (payload, connection = db) => {
  const { accountId, roleIds, assignedBy = null } = payload;

  const dataArray = roleIds.map((roleId) => ({
    accountId,
    roleId,
    assignedBy,
  }));

  const { fieldsStr, bulkValues } = buildBulkPayload(dataArray);

  const sql = `
    INSERT INTO USER_ROLE (${fieldsStr})
    VALUES ?
    ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP();
  `;

  const [result] = await connection.query(sql, [bulkValues]);
  
  return result.affectedRows > 0;
};

const deleteUserRole = async (payload, connection = db) => {
  const { accountId, roleIds } = payload;

  if (!roleIds || !Array.isArray(roleIds) || roleIds.length === 0) {
    return false;
  }
  
  const [result] = await connection.query(
    `
    DELETE FROM USER_ROLE 
    WHERE account_id = ? AND role_id IN (?)
    `,
    [accountId, roleIds] 
  );
  return result.affectedRows > 0;
};
module.exports = {
  findById,
  findByCode,
  findByCodes,
  findAll,
  create,
  update,
  remove,
  findUsersByRoleId,
  findRolesByAccountId,
  assignRole,
  deleteUserRole
};