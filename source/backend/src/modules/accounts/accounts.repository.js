const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToCamelCase,
  objectToSnakeCase,
} = require("@/utils");

const queryBuilder = require("@/utils/query/queryBuilders");
const { ACCOUNT_STATUS } = require("@/constants");

const { ACCOUNT_FIELDS, ACCOUNT_MAPS } = require("./accounts.constants");

const ACCOUNT_SELECT = `
SELECT
  acc.account_id,
  acc.username,
  acc.email,
  acc.password_hash,
  acc.account_status,
  acc.created_at,
  acc.updated_at,

  rl.role_id,
  rl.role_code,
  rl.role_label
`;

const ACCOUNT_FROM = `
FROM ACCOUNT acc
LEFT JOIN ROLE rl
ON rl.role_id = acc.role_id
`;

// ===============================
// Query
// ===============================

const list = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    searchField,
    sortBy,
    sortOrder,
    accountStatus,
    roleId,
    roleCode,
  } = query;

  const filters = {
    accountStatus,
    roleId,
    roleCode,
  };

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,

    search,
    searchField,

    searchableFields: ACCOUNT_FIELDS.QUERY.SEARCHABLE,

    searchMap: ACCOUNT_MAPS.SEARCH,

    sortBy,
    sortOrder,

    sortMap: ACCOUNT_MAPS.SORT,

    filters,

    filterMap: ACCOUNT_MAPS.FILTER,
  });

  const { pagination, searchResult, filterResult, sortClause } = queryOptions;

  const whereParts = ["acc.deleted_at IS NULL"];

  const params = [];

  if (searchResult.clause) {
    whereParts.push(searchResult.clause);
    params.push(...searchResult.values);
  }

  if (filterResult.clause) {
    whereParts.push(filterResult.clause);
    params.push(...filterResult.values);
  }

  const whereClause = `
    WHERE ${whereParts.join(" AND ")}
  `;

  const countSql = `
    SELECT COUNT(*) AS total
    ${ACCOUNT_FROM}
    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);

  const totalRecords = Number(countRows[0]?.total || 0);

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: ACCOUNT_SELECT,
    fromJoinClause: ACCOUNT_FROM,
    whereClause,
    sortClause,
  });

  dataSql += `
    LIMIT ?
    OFFSET ?
  `;

  const [rows] = await connection.query(dataSql, [
    ...params,
    pagination.limit,
    pagination.offset,
  ]);

  return {
    data: arrayToCamelCase(rows),

    pagination: {
      totalRecords,
      limit: pagination.limit,
      page: pagination.page,
      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

// ===============================
// Find
// ===============================

const findById = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    ${ACCOUNT_SELECT}
    ${ACCOUNT_FROM}
    WHERE
      acc.account_id = ?
      AND acc.deleted_at IS NULL
    `,
    [accountId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const findDeletedById = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    ${ACCOUNT_SELECT}
    ${ACCOUNT_FROM}
    WHERE
      acc.account_id = ?
      AND acc.deleted_at IS NOT NULL
    `,
    [accountId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const findByUsername = async (username, connection = db) => {
  const [rows] = await connection.query(
    `
    ${ACCOUNT_SELECT}
    ${ACCOUNT_FROM}
    WHERE
      acc.username = ?
      AND acc.deleted_at IS NULL
    LIMIT 1
    `,
    [username],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const findByEmail = async (email, connection = db) => {
  const [rows] = await connection.query(
    `
    ${ACCOUNT_SELECT}
    ${ACCOUNT_FROM}
    WHERE
      acc.email = ?
      AND acc.deleted_at IS NULL
    LIMIT 1
    `,
    [email],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const existsById = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 1
    FROM ACCOUNT
    WHERE
      account_id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [accountId],
  );

  return rows.length > 0;
};

const existsByUsername = async (username, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 1
    FROM ACCOUNT
    WHERE
      username = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [username],
  );

  return rows.length > 0;
};

const existsByEmail = async (email, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 1
    FROM ACCOUNT
    WHERE
      email = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [email],
  );

  return rows.length > 0;
};

// ===============================
// Mutation
// ===============================

const create = async (accountData, connection = db) => {
  const data = objectToSnakeCase(accountData);

  const fields = Object.keys(data);
  const values = Object.values(data);

  const sql = `
    INSERT INTO ACCOUNT
    (${fields.join(", ")})
    VALUES
    (${fields.map(() => "?").join(", ")})
  `;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (accountId, accountData, connection = db) => {
  const data = objectToSnakeCase(accountData);

  const fields = Object.keys(data);

  if (!fields.length) {
    return findById(accountId, connection);
  }

  const values = Object.values(data);

  const sql = `
    UPDATE ACCOUNT
    SET ${fields.map((field) => `${field} = ?`).join(", ")}
    WHERE
      account_id = ?
      AND deleted_at IS NULL
  `;

  await connection.query(sql, [...values, accountId]);

  return findById(accountId, connection);
};

const updateStatus = async (accountId, status, connection = db) => {
  await connection.query(
    `
    UPDATE ACCOUNT
    SET account_status = ?
    WHERE
      account_id = ?
      AND deleted_at IS NULL
    `,
    [status, accountId],
  );

  return findById(accountId, connection);
};

const remove = async (accountId, connection = db) => {
  await connection.query(
    `
    UPDATE ACCOUNT
    SET
      account_status = ?,
      deleted_at = CURRENT_TIMESTAMP
    WHERE
      account_id = ?
      AND deleted_at IS NULL
    `,
    [ACCOUNT_STATUS.DELETED, accountId],
  );

  return findDeletedById(accountId, connection);
};

const restore = async (accountId, connection = db) => {
  await connection.query(
    `
    UPDATE ACCOUNT
    SET
      account_status = ?,
      deleted_at = NULL
    WHERE account_id = ?
    `,
    [ACCOUNT_STATUS.ACTIVE, accountId],
  );

  return findById(accountId, connection);
};

module.exports = {
  // Query
  list,

  // Find
  findById,
  findDeletedById,
  findByUsername,
  findByEmail,
  existsById,
  existsByUsername,
  existsByEmail,

  // Mutation
  create,
  update,
  updateStatus,
  remove,
  restore,
};
