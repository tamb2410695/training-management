const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("@/utils/helpers");

const queryBuilder = require("@/utils/query/queryBuilders");

const {
  STAFF_PROFILE_FIELDS,
  STAFF_PROFILE_MAPS,
} = require("./staffs.constants");

// ===============================
// Common SQL
// ===============================

const STAFF_SELECT = `
SELECT
  sp.staff_id,
  sp.account_id,
  sp.staff_code,
  sp.full_name,
  sp.gender,
  sp.date_of_birth,
  sp.phone,
  sp.personal_email,
  sp.address,
  sp.hire_date,
  sp.staff_status,
  sp.created_at,
  sp.updated_at,

  acc.username,
  acc.email,
  acc.account_status,

  rl.role_code,
  rl.role_label
`;

const STAFF_FROM = `
FROM STAFF_PROFILE sp

JOIN ACCOUNT acc
  ON sp.account_id = acc.account_id

LEFT JOIN ROLE rl
  ON acc.role_id = rl.role_id
`;

// ===============================
// Query
// ===============================

const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    searchField,
    sortBy,
    sortOrder,

    gender,
    staffStatus,
    accountStatus,
    roleCode,
  } = query;

  const filters = {};

  if (gender) filters.gender = gender;

  if (staffStatus) filters.staffStatus = staffStatus;

  if (accountStatus) filters.accountStatus = accountStatus;

  if (roleCode) filters.roleCode = roleCode;

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,

    search,
    searchField,

    searchableFields: STAFF_PROFILE_FIELDS.QUERY.SEARCHABLE,

    searchMap: STAFF_PROFILE_MAPS.SEARCH,

    sortBy,
    sortOrder,

    sortMap: STAFF_PROFILE_MAPS.SORT,

    filters,

    filterMap: STAFF_PROFILE_MAPS.FILTER,
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

  const whereClause = `WHERE ${whereParts.join(" AND ")}`;

  const countSql = `
    SELECT COUNT(*) AS total
    ${STAFF_FROM}
    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);

  const totalRecords = Number(countRows[0]?.total || 0);

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: STAFF_SELECT,

    fromJoinClause: STAFF_FROM,

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

      offset: pagination.offset,

      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

// ===============================
// Find
// ===============================

const findById = async (staffId, connection = db) => {
  const [rows] = await connection.query(
    `
      ${STAFF_SELECT}
      ${STAFF_FROM}

      WHERE
        sp.staff_id = ?
        AND acc.deleted_at IS NULL
      `,
    [staffId],
  );

  if (!rows.length) return null;

  return objectToCamelCase(rows[0]);
};

const findByCode = async (staffCode, connection = db) => {
  const [rows] = await connection.query(
    `
      ${STAFF_SELECT}
      ${STAFF_FROM}

      WHERE
        sp.staff_code = ?
        AND acc.deleted_at IS NULL
      `,
    [staffCode],
  );

  if (!rows.length) return null;

  return objectToCamelCase(rows[0]);
};

const findByPhone = async (phone, connection = db) => {
  const [rows] = await connection.query(
    `
      ${STAFF_SELECT}
      ${STAFF_FROM}

      WHERE
        sp.phone = ?
        AND acc.deleted_at IS NULL
      `,
    [phone],
  );

  if (!rows.length) return null;

  return objectToCamelCase(rows[0]);
};

const findByAccountId = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
      ${STAFF_SELECT}
      ${STAFF_FROM}

      WHERE
        sp.account_id = ?
        AND acc.deleted_at IS NULL
      `,
    [accountId],
  );

  if (!rows.length) return null;

  return objectToCamelCase(rows[0]);
};

const existsById = async (staffId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT 1

      FROM STAFF_PROFILE

      WHERE staff_id = ?

      LIMIT 1
      `,
    [staffId],
  );

  return rows.length > 0;
};

// ===============================
// Mutation
// ===============================

const create = async (staffData, connection = db) => {
  const data = objectToSnakeCase(staffData);

  const fields = Object.keys(data);

  const values = Object.values(data);

  const sql = `
    INSERT INTO STAFF_PROFILE
    (${fields.join(",")})

    VALUES
    (${fields.map(() => "?").join(",")})
  `;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (staffId, staffData, connection = db) => {
  const data = objectToSnakeCase(staffData);

  const fields = Object.keys(data);

  if (!fields.length) return findById(staffId, connection);

  const values = Object.values(data);

  await connection.query(
    `
    UPDATE STAFF_PROFILE

    SET
      ${fields.map((field) => `${field} = ?`).join(", ")}

    WHERE staff_id = ?
    `,
    [...values, staffId],
  );

  return findById(staffId, connection);
};

const remove = async (staffId, connection = db) => {
  await connection.query(
    `
    DELETE FROM STAFF_PROFILE

    WHERE staff_id = ?
    `,
    [staffId],
  );

  return {
    staffId,
    deleted: true,
  };
};

module.exports = {
  find,
  findById,
  findByCode,
  findByPhone,
  findByAccountId,
  existsById,
  create,
  update,
  remove,
};
