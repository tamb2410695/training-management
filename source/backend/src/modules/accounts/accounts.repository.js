const db = require("../../config/database");
const { ACCOUNT_STATUS } = require("../../constants");
const { ACCOUNT_FIELDS, ACCOUNT_MAPS } = require("./accounts.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    accountStatus,
    roleCodes,
  } = query;

  const searchableFields = ACCOUNT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = ACCOUNT_FIELDS.QUERY.SORTABLE;
  const searchMap = ACCOUNT_MAPS.SEARCH;
  const sortMap = ACCOUNT_MAPS.SORT;
  const filterMap = ACCOUNT_MAPS.FILTER;

  const filters = {};
  if (accountStatus) filters.accountStatus = accountStatus;

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

  const selectClause = `
    SELECT
      acc.account_id,
      acc.username,
      acc.email,
      acc.password_hash,
      acc.account_status,
      acc.created_at,
      acc.updated_at,
      GROUP_CONCAT(rl.role_code) as role_codes,
      GROUP_CONCAT(rl.role_name) as role_names
  `;

  const fromJoinClause = `
    FROM ACCOUNT acc
    LEFT JOIN USER_ROLE ur ON acc.account_id = ur.account_id
    LEFT JOIN ROLE rl ON ur.role_id = rl.role_id
  `;

  const whereParts = ["acc.deleted_at IS NULL"];
  const params = [];

  if (roleCodes) {
    const roleCodeArray = Array.isArray(roleCodes) 
      ? roleCodes 
      : (typeof roleCodes === 'string' ? roleCodes.split(',') : [roleCodes]);
    
    if (roleCodeArray.length > 0) {
      whereParts.push(`
        acc.account_id IN (
          SELECT ur.account_id 
          FROM USER_ROLE ur
          JOIN ROLE r ON ur.role_id = r.role_id
          WHERE r.role_code IN (?)
        )
      `);
      params.push(roleCodeArray);
    }
  }


  if (searchResult.clause) {
    whereParts.push(searchResult.clause);
    params.push(...searchResult.values);
  }

  if (filterResult.clause) {
    whereParts.push(filterResult.clause);
    params.push(...filterResult.values);
  }

  const whereClause = `WHERE ${whereParts.join(" AND ")}`;

  const countSql = `
    SELECT COUNT(DISTINCT acc.account_id) as total 
    ${fromJoinClause}
    ${whereClause}
  `;

  const groupClause = `GROUP BY acc.account_id`;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause,
    fromJoinClause,
    whereClause,
    groupClause,
    sortClause,
  });

  dataSql += `
    LIMIT ? OFFSET ?
  `;
  const dataParams = [...params, pagination.limit, pagination.offset];
  const [rows] = await connection.query(dataSql, dataParams);

  const camelCasedRows = arrayToCamelCase(rows);
  const formattedAccounts = camelCasedRows.map((account) => {
    return {
      ...account,
      roleCodes: account.roleCodes ? account.roleCodes.split(",") : [],
      roleNames: account.roleNames ? account.roleNames.split(",") : [],
    };
  });

  return {
    data: formattedAccounts,
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
      acc.account_id,
      acc.username,
      acc.email,
      acc.password_hash,
      acc.account_status,
      acc.created_at,
      acc.updated_at,
      GROUP_CONCAT(rl.role_code) as role_codes,
      GROUP_CONCAT(rl.role_name) as role_names
    FROM ACCOUNT acc
    LEFT JOIN USER_ROLE ur ON acc.account_id = ur.account_id
    LEFT JOIN ROLE rl ON ur.role_id = rl.role_id
    WHERE acc.username = ? AND acc.deleted_at IS NULL
    GROUP BY acc.account_id
    `,
    [username],
  );

  if (!rows[0] || rows[0].account_id === null) return null;

  const account = objectToCamelCase(rows[0]);
  
  return {
    ...account,
    roleCodes: account.roleCodes ? account.roleCodes.split(",") : [],
    roleNames: account.roleNames ? account.roleNames.split(",") : [],
  };
};

const findByEmail = async (email, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      acc.account_id,
      acc.username,
      acc.email,
      acc.password_hash,
      acc.account_status,
      acc.created_at,
      acc.updated_at,
      GROUP_CONCAT(rl.role_code) as role_codes,
      GROUP_CONCAT(rl.role_name) as role_names
    FROM ACCOUNT acc
    LEFT JOIN USER_ROLE ur ON acc.account_id = ur.account_id
    LEFT JOIN ROLE rl ON ur.role_id = rl.role_id
    WHERE acc.email = ? AND acc.deleted_at IS NULL
    GROUP BY acc.account_id
    `,
    [email],
  );

  if (!rows[0] || rows[0].account_id === null) return null;

  const account = objectToCamelCase(rows[0]);
  
  return {
    ...account,
    roleCodes: account.roleCodes ? account.roleCodes.split(",") : [],
    roleNames: account.roleNames ? account.roleNames.split(",") : [],
  };
};

const findById = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      acc.account_id,
      acc.username,
      acc.email,
      acc.password_hash,
      acc.account_status,
      acc.created_at,
      acc.updated_at,
      GROUP_CONCAT(rl.role_code) as role_codes,
      GROUP_CONCAT(rl.role_name) as role_names
    FROM ACCOUNT acc
    LEFT JOIN USER_ROLE ur ON acc.account_id = ur.account_id
    LEFT JOIN ROLE rl ON ur.role_id = rl.role_id
    WHERE acc.account_id = ? AND acc.deleted_at IS NULL
    GROUP BY acc.account_id
    `,
    [accountId],
  );

  if (!rows || rows.length === 0 || rows[0].account_id === null) return null;
  const account = objectToCamelCase(rows[0]);
  
  return {
    ...account,
    roleCodes: account.roleCodes ? account.roleCodes.split(",") : [],
    roleNames: account.roleNames ? account.roleNames.split(",") : [],
  };
};

const findDeletedById = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      acc.account_id,
      acc.username,
      acc.email,
      acc.password_hash,
      acc.account_status,
      acc.created_at,
      acc.updated_at,
      GROUP_CONCAT(rl.role_code) as role_codes,
      GROUP_CONCAT(rl.role_name) as role_names
    FROM ACCOUNT acc
    LEFT JOIN USER_ROLE ur ON acc.account_id = ur.account_id
    LEFT JOIN ROLE rl ON ur.role_id = rl.role_id
    WHERE acc.account_id = ? AND acc.deleted_at IS NOT NULL
    GROUP BY acc.account_id
    `,
    [accountId],
  );

  if (!rows || rows.length === 0 || rows[0].account_id === null) return null;
  const account = objectToCamelCase(rows[0]);
  
  return {
    ...account,
    roleCodes: account.roleCodes ? account.roleCodes.split(",") : [],
    roleNames: account.roleNames ? account.roleNames.split(",") : [],
  };
};

const create = async (accountData, connection = db) => {
  const data = objectToSnakeCase(accountData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO ACCOUNT (${fieldClause})
    VALUES (${placeholderClause});
  `;

  const [result] = await connection.query(sql, values);
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
    WHERE account_id = ?
      AND deleted_at IS NULL
    `,
    [status, deletedAt, accountId],
  );

  return {
    accountId,
    accountStatus: status,
    deletedAt: deletedAt,
  };
};

const restore = async (accountId, connection = db) => {
  await connection.query(
    `
    UPDATE ACCOUNT 
    SET 
      deleted_at = NULL, 
      account_status = 'ACTIVE'
    WHERE account_id = ?
    `,
    [accountId],
  );

  return findById(accountId);
};

module.exports = {
  find,
  findByUsername,
  findByEmail,
  findById,
  create,
  update,
  remove,
  restore,
  findDeletedById
};
