const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("@/utils/helpers");

const {
  STUDENT_PROFILE_FIELDS,
  STUDENT_PROFILE_MAPS,
} = require("./students.constants");

const queryBuilder = require("@/utils/query/queryBuilders");

const STUDENT_PROFILE_SELECT = `
SELECT
  stu.student_id,
  stu.account_id,
  stu.student_code,
  stu.full_name,
  stu.gender,
  stu.date_of_birth,
  stu.phone,
  stu.address,
  stu.personal_email,
  stu.student_status,
  stu.created_at,
  stu.updated_at,

  acc.username,
  acc.email AS account_email,
  acc.account_status,

  rl.role_code,
  rl.role_label
`;

const STUDENT_PROFILE_FROM = `
FROM STUDENT_PROFILE stu
LEFT JOIN ACCOUNT acc 
  ON stu.account_id = acc.account_id

LEFT JOIN ROLE rl
  ON acc.role_id = rl.role_id
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

    gender,
    studentStatus,
    accountStatus,
    roleCode,
  } = query;

  const filters = {
    gender,
    studentStatus,
    accountStatus,
    roleCode,
  };

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,

    search,
    searchField,

    searchableFields: STUDENT_PROFILE_FIELDS.QUERY.SEARCHABLE,

    searchMap: STUDENT_PROFILE_MAPS.SEARCH,

    sortBy,
    sortOrder,

    sortMap: STUDENT_PROFILE_MAPS.SORT,

    filters,

    filterMap: STUDENT_PROFILE_MAPS.FILTER,
  });

  const { pagination, searchResult, filterResult, sortClause } = queryOptions;

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

  const countSql = `

    SELECT COUNT(*) AS total

    ${STUDENT_PROFILE_FROM}

    ${whereClause}

  `;

  const [countRows] = await connection.query(countSql, params);

  const totalRecords = Number(countRows[0]?.total || 0);

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: STUDENT_PROFILE_SELECT,

    fromJoinClause: STUDENT_PROFILE_FROM,

    whereClause,

    sortClause,
  });

  dataSql += `

    LIMIT ?
    OFFSET ?

  `;

  const [rows] = await connection.query(
    dataSql,

    [...params, pagination.limit, pagination.offset],
  );

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
const findById = async (studentId, connection = db) => {
  const [rows] = await connection.query(
    `
    ${STUDENT_PROFILE_SELECT}
    ${STUDENT_PROFILE_FROM}
    WHERE stu.student_id = ?
      AND acc.deleted_at IS NULL
    `,
    [studentId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};
const findByAccountId = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    ${STUDENT_PROFILE_SELECT}
    ${STUDENT_PROFILE_FROM}
    WHERE stu.account_id = ?
      AND acc.deleted_at IS NULL
    `,
    [accountId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};
const findByCode = async (studentCode, connection = db) => {
  const [rows] = await connection.query(
    `
    ${STUDENT_PROFILE_SELECT}
    ${STUDENT_PROFILE_FROM}
    WHERE stu.student_code = ?
      AND acc.deleted_at IS NULL
    `,
    [studentCode],
  );

  return rows.length ? objectToCamelCase(rows[0]) : null;
};
const findByPhone = async (phone, connection = db) => {
  const [rows] = await connection.query(
    `
    ${STUDENT_PROFILE_SELECT}
    ${STUDENT_PROFILE_FROM}
    WHERE stu.phone = ?
      AND acc.deleted_at IS NULL
    `,
    [phone],
  );

  return rows.length ? objectToCamelCase(rows[0]) : null;
};
// ===============================
// Exists
// ===============================

const existsById = async (studentId, connection = db) => {
  const [rows] = await connection.query(
    `

SELECT 1

FROM STUDENT_PROFILE

WHERE student_id = ?

LIMIT 1

`,

    [studentId],
  );

  return rows.length > 0;
};

// ===============================
// Mutation
// ===============================

const create = async (studentData, connection = db) => {
  const data = objectToSnakeCase(studentData);

  const fields = Object.keys(data);

  const values = Object.values(data);

  const sql = `

INSERT INTO STUDENT_PROFILE

(
${fields.join(",")}
)

VALUES

(
${fields.map(() => "?").join(",")}
)

`;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (studentId, studentData, connection = db) => {
  const data = objectToSnakeCase(studentData);

  const fields = Object.keys(data);

  if (!fields.length) return findById(studentId, connection);

  await connection.query(
    `

UPDATE STUDENT_PROFILE

SET

${fields.map((field) => `${field}=?`).join(",")}


WHERE student_id = ?

`,

    [...Object.values(data), studentId],
  );

  return findById(studentId, connection);
};

const updateStatus = async (studentId, status, connection = db) => {
  await connection.query(
    `
      UPDATE STUDENT_PROFILE
      SET student_status = ?
      WHERE student_id = ?
    `,

    [status, studentId],
  );

  return findById(studentId, connection);
};

module.exports = {
  list,

  findById,
  findByAccountId,
  findByCode,
  findByPhone,

  create,
  update,
  updateStatus
};