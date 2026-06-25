const db = require("../../config/database");
const { ACCOUNT_STATUS } = require("../../constants");
const { ACCOUNT_FIELDS, ACCOUNT_FILTERS_MAP, ACCOUNT_SEARCH_MAP, ACCOUNT_SORT_MAP } = require("./accounts.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");
const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, status, role } = query;
  const searchableFields = ACCOUNT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = ACCOUNT_FIELDS.QUERY.SORTABLE;
  const searchMap = ACCOUNT_SEARCH_MAP;
  const sortMap = ACCOUNT_SORT_MAP;
  const filterMap = ACCOUNT_FILTERS_MAP;
  const filters = {};
  if (status) filters.accountStatus = status;
  if (role) filters.roleName = role;

  const queryOptions = queryBuilder.buildQueryOptions({
  page,
  limit,
  
  search,
  searchableFields,
  searchMap,

  sortBy,
  sortOrder,
  sortMap,

  filters,
  filterMap,
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

  // let whereClause = ` WHERE 1 = 1`;

  // sql += `
  //   a.deleted_at IS NOT NULL
  //     AND r.role_name <> 'DELETED'
  // `;
  // params.push();

  // if (filterResult.clause) {
  //   whereClause += ` AND ${filterResult.clause}`;
  // }

  // if (searchResult.clause) {
  //   whereClause += ` AND ${searchResult.clause}`;
  // }

  const whereParts = [];
  const params = [];
  
  if (searchResult.clause) {
    whereParts.push(searchResult.clause);
    params.push(...searchResult.values);
  }

  if (filterResult.clause) {
    whereParts.push(filterResult.clause);
    params.push(...filterResult.values);
  }

  const whereClause = whereParts.length
    ? `WHERE ${whereParts.join(" AND ")}`
    : "";

// Total
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
      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
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
    WHERE a.username = ?
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
    WHERE a.email = ?
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
    WHERE a.account_id = ?;
    `,
    [accountId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (accountData, connection = db) => {
  const { roleId, username, email, passwordHash } = accountData;
  const [result] = await connection.query(
    `
    INSERT INTO ACCOUNT
    (
      role_id,
      username,
      email,
      password_hash
    )
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
        WHERE account_id = ?
    `;
  const [result] = await connection.query(sql, [...values, accountId]);
  return findById(accountId, connection);
};

const remove = async (accountId, connection = db) => {
  const status = ACCOUNT_STATUS.REMOVED;
  const deleteAt = new Date();
  await connection.query(
    `
    UPDATE ACCOUNT
    SET account_status = ?,
        delete_at = ?
    WHERE account_id = ?
      AND delete_at IS NULL
  `,
    [status, deleteAt, accountId],
  );
  return {
    data: {
      ...account,
      accountStatus: status,
      deleteAt: deleteAt,
    },
    connection,
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
