const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("@/utils/helpers/index");

const findById = async (roleId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      role_id,
      role_code,
      role_label,
      role_description
    FROM ROLE
    WHERE role_id = ?
    `,
    [roleId],
  );

  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByCode = async (roleCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      role_id,
      role_code,
      role_label,
      role_description
    FROM ROLE
    WHERE role_code = ?
    `,
    [roleCode],
  );

  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByCodes = async (roleCodes, connection = db) => {
  if (!Array.isArray(roleCodes) || roleCodes.length === 0) {
    return [];
  }

  const [rows] = await connection.query(
    `
    SELECT
      role_id,
      role_code,
      role_label,
      role_description
    FROM ROLE
    WHERE role_code IN (?)
    `,
    [roleCodes],
  );

  return arrayToCamelCase(rows);
};

const findAll = async (connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      role_id,
      role_code,
      role_label,
      role_description
    FROM ROLE
    ORDER BY role_id ASC
    `,
  );

  return arrayToCamelCase(rows);
};

const create = async (roleData, connection = db) => {
  const data = objectToSnakeCase(roleData);

  const fields = Object.keys(data);

  const values = Object.values(data);

  const sql = `
    INSERT INTO ROLE (
      ${fields.join(", ")}
    )
    VALUES (
      ${fields.map(() => "?").join(", ")}
    )
  `;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (roleId, roleData, connection = db) => {
  const data = objectToSnakeCase(roleData);

  const fields = Object.keys(data);

  const values = Object.values(data);

  const sql = `
    UPDATE ROLE
    SET ${fields.map((field) => `${field} = ?`).join(", ")}
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
    [roleId],
  );

  return result.affectedRows > 0;
};

/**
 * Lấy danh sách account thuộc role
 */
const findAccountsByRoleId = async (roleId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT
        acc.account_id,
        acc.username,
        acc.email,
        acc.account_status,
        acc.created_at
      FROM ACCOUNT acc
      WHERE acc.role_id = ?
      AND acc.deleted_at IS NULL
      `,
    [roleId],
  );

  return arrayToCamelCase(rows);
};

/**
 * Lấy role của account
 */
const findRoleByAccountId = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT
        rl.role_id,
        rl.role_code,
        rl.role_label,
        rl.role_description
      FROM ACCOUNT acc
      INNER JOIN ROLE rl
        ON acc.role_id = rl.role_id
      WHERE acc.account_id = ?
      AND acc.deleted_at IS NULL
      `,
    [accountId],
  );

  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

module.exports = {
  findById,
  findByCode,
  findByCodes,
  findAll,
  create,
  update,
  remove,
  findAccountsByRoleId,
  findRoleByAccountId,
};
