const db = require("../../config/database");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const findById = async (roleId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT role_id, role_code, role_label, role_description
    FROM ROLE WHERE role_id = ?
    `,
    [roleId]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByCode = async (roleCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT role_id, role_code, role_label, role_description
    FROM ROLE WHERE role_code = ?
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
    SELECT role_id, role_code, role_label, role_description
    FROM ROLE WHERE role_code IN (?)
    `,
    [roleCodes]
  );
  return arrayToCamelCase(rows);
};

const findAll = async (connection = db) => {
  const [rows] = await connection.query(
    `SELECT role_id, role_code, role_label, role_description FROM ROLE`
  );
  return arrayToCamelCase(rows);
};

const create = async (roleData, connection = db) => {
  const data = objectToSnakeCase(roleData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `INSERT INTO ROLE (${fieldClause}) VALUES (${placeholderClause});`;
  
  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (roleId, roleData, connection = db) => {
  const data = objectToSnakeCase(roleData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `UPDATE ROLE SET ${setClause} WHERE role_id = ?`;
  
  await connection.query(sql, [...values, roleId]);
  return findById(roleId, connection);
};

const remove = async (roleId, connection = db) => {
  const [result] = await connection.query(`DELETE FROM ROLE WHERE role_id = ?`, [roleId]);
  return result.affectedRows > 0;
};

const findUsersByRoleId = async (roleId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      ur.account_id, 
      acc.username, 
      acc.email,
      ur.assigned_by,
      ur.assigned_at
    FROM USER_ROLE ur
    JOIN ACCOUNT acc ON ur.account_id = acc.account_id
    WHERE ur.role_id = ?
    `,
    [roleId]
  );
  return arrayToCamelCase(rows);
};

const findRoleByAccountId = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      rl.role_id,
      rl.role_code,
      rl.role_label,
      rl.role_description,
      ur.assigned_by,
      ur.assigned_at
    FROM USER_ROLE ur
    JOIN ROLE rl ON ur.role_id = rl.role_id
    WHERE ur.account_id = ?
    `,
    [accountId]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const assignRole = async (payload, connection = db) => {
  const data = objectToSnakeCase(payload);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO USER_ROLE (${fieldClause})
    VALUES (${placeholderClause})
    ON DUPLICATE KEY UPDATE 
      role_id = VALUES(role_id),
      assigned_by = VALUES(assigned_by);
  `;

  const [result] = await connection.query(sql, [...values]);  
  return result.affectedRows > 0;
};

const deleteUserRole = async (accountId, connection = db) => {
  const [result] = await connection.query(
    `DELETE FROM USER_ROLE WHERE account_id = ?`,
    [accountId]
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
  findRoleByAccountId,
  assignRole,
  deleteUserRole
};