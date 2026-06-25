const db = require("../../config/database");
const { ACCOUNT_STATUS } = require("../../constants");
const { ACCOUNT_FIELDS } = require("./accounts.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, accountStatus, roleName } = query;
  const searchableFields = ACCOUNT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = ACCOUNT_FIELDS.QUERY.SORTABLE;
  
  const filters = {};
  if (accountStatus) filters.accountStatus = accountStatus;
  if (roleName) filters.roleName = roleName;
  
  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,
    search,
    filters,
    sortBy,
    sortOrder,
    searchableFields,
    sortableFields,
  });
  
  const { pagination, searchResult, filterResult, sortClause } = queryOptions;
  
  const selectDataClause = `
    SELECT
      a.account_id,
      a.username,
      a.email,
      a.password_hash,
      r.role_name,
      a.account_status,
      a.created_at,
      a.updated_at
  `;

  const fromJoinClause = `
    FROM ACCOUNT a
    JOIN ROLE r ON a.role_id = r.role_id
  `;

  let whereClause = ` WHERE a.deleted_at IS NULL`;
  const params = [];

  if (filterResult.clause) {
    whereClause += ` AND ${filterResult.clause}`;
    params.push(...filterResult.values);
  }

  if (searchResult.clause) {
    whereClause += ` AND ${searchResult.clause}`;
    params.push(...searchResult.values);
  }

  const countSql = `SELECT COUNT(*) as total ${fromJoinClause} ${whereClause}`;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;
  
  let dataSql = `${selectDataClause} ${fromJoinClause} ${whereClause}`;
  
  if (sortClause) {
    dataSql += ` ${sortClause}`;
  }

  dataSql += ` LIMIT ? OFFSET ?`;
  const dataParams = [...params, pagination.limit, pagination.offset];
  const [rows] = await connection.query(dataSql, dataParams);
  
  return {
    data: arrayToCamelCase(rows),
    pagination: {
      totalRecords,
      limit: pagination.limit,
      offset: pagination.offset,
      totalPages: Math.ceil(totalRecords / pagination.limit)
    }
  };
};

const findByUsername = async (username, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      a.account_id,
      a.username,
      a.email,
      a.password_hash,
      r.role_name,
      a.account_status
    FROM ACCOUNT a
    JOIN ROLE r ON a.role_id = r.role_id
    WHERE a.username = ? AND a.deleted_at IS NULL
    `,
    [username],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByEmail = async (email, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      a.account_id,
      a.username,
      a.email,
      a.password_hash,
      r.role_name,
      a.account_status
    FROM ACCOUNT a
    JOIN ROLE r ON a.role_id = r.role_id
    WHERE a.email = ? AND a.deleted_at IS NULL
    `,
    [email],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findById = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      a.account_id,
      a.username,
      a.email,
      a.password_hash,
      r.role_name,
      a.account_status
    FROM ACCOUNT a
    JOIN ROLE r ON a.role_id = r.role_id
    WHERE a.account_id = ? AND a.deleted_at IS NULL;
    `,
    [accountId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (accountData, connection = db) => {
  const { roleId, username, email, passwordHash } = accountData;
  const [result] = await connection.query(
    `
    INSERT INTO ACCOUNT (role_id, username, email, password_hash)
    VALUES (?, ?, ?, ?);
    `,
    [roleId, username, email, passwordHash],
  );
  return findById(result.insertId, connection);
};

const update = async (accountId, accountData, connection = db) => {
  const data = objectToSnakeCase(accountData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE ACCOUNT
    SET ${setClause}
    WHERE account_id = ? AND deleted_at IS NULL
  `;
  
  await connection.query(sql, [...values, accountId]);
  return findById(accountId, connection);
};

const remove = async (accountId, connection = db) => {
  const status = ACCOUNT_STATUS.DELETED; 
  const deletedAt = new Date();
  
  await connection.query(
    `
    UPDATE ACCOUNT
    SET account_status = ?,
        deleted_at = ?
    WHERE account_id = ? AND deleted_at IS NULL
    `,
    [status, deletedAt, accountId],
  );

  return {
    accountId,
    accountStatus: status,
    deletedAt: deletedAt
  };
};

module.exports = {
  find,
  findByUsername,
  findByEmail,
  findById,
  create,
  update,
  remove,
};