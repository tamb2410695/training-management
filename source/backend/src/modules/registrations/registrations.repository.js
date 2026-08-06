const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("@/utils");

const queryBuilder = require("@/utils/query/queryBuilders");
const {
  REGISTRATION_FIELDS,
  REGISTRATION_MAPS,
} = require("./registrations.constants");

const REGISTRATION_SELECT = `
SELECT
  reg.registration_id,
  reg.full_name,
  reg.gender,
  reg.date_of_birth,
  reg.phone,
  reg.personal_email,
  reg.address,
  reg.course_id,
  reg.student_id,
  reg.registration_status,
  reg.created_at,
  reg.updated_at
`;

const REGISTRATION_FROM = `
FROM REGISTRATION reg
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
    registrationStatus,
    studentId,
  } = query;

  const filters = {
    registrationStatus,
    studentId,
  };

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,
    search,
    searchField,

    searchableFields: REGISTRATION_FIELDS.QUERY.SEARCHABLE,

    searchMap: REGISTRATION_MAPS.SEARCH,

    sortBy,
    sortOrder,

    sortMap: REGISTRATION_MAPS.SORT,

    filters,

    filterMap: REGISTRATION_MAPS.FILTER,
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
    ${REGISTRATION_FROM}
    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);

  const totalRecords = Number(countRows[0]?.total || 0);

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: REGISTRATION_SELECT,
    fromJoinClause: REGISTRATION_FROM,
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

const findById = async (registrationId, connection = db) => {
  const [rows] = await connection.query(
    `
    ${REGISTRATION_SELECT}
    ${REGISTRATION_FROM}
    WHERE reg.registration_id = ?
    `,
    [registrationId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const findByContact = async (email, phone, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      reg.registration_id,
      reg.registration_status
    FROM REGISTRATION reg
    WHERE
      reg.personal_email = ?
      OR reg.phone = ?
    ORDER BY reg.created_at DESC
    LIMIT 1
    `,
    [email, phone],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const existsById = async (registrationId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 1
    FROM REGISTRATION
    WHERE registration_id = ?
    LIMIT 1
    `,
    [registrationId],
  );

  return rows.length > 0;
};

// ===============================
// Mutation
// ===============================

const create = async (registrationData, connection = db) => {
  const data = objectToSnakeCase(registrationData);

  const fields = Object.keys(data);
  const values = Object.values(data);

  const sql = `
    INSERT INTO REGISTRATION
    (${fields.join(", ")})
    VALUES
    (${fields.map(() => "?").join(", ")})
  `;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (registrationId, registrationData, connection = db) => {
  const data = objectToSnakeCase(registrationData);

  const fields = Object.keys(data);

  if (!fields.length) {
    return findById(registrationId, connection);
  }

  const values = Object.values(data);

  const sql = `
    UPDATE REGISTRATION
    SET ${fields.map((field) => `${field} = ?`).join(", ")}
    WHERE registration_id = ?
  `;

  await connection.query(sql, [...values, registrationId]);

  return findById(registrationId, connection);
};

const updateStatus = async (registrationId, status, connection = db) => {
  await connection.query(
    `
    UPDATE REGISTRATION
    SET registration_status = ?
    WHERE registration_id = ?
    `,
    [status, registrationId],
  );

  return findById(registrationId, connection);
};

const assignStudent = async (registrationId, studentId, connection = db) => {
  await connection.query(
    `
    UPDATE REGISTRATION
    SET student_id = ?
    WHERE registration_id = ?
    `,
    [studentId, registrationId],
  );

  return findById(registrationId, connection);
};

const remove = async (registrationId, connection = db) => {
  await connection.query(
    `
    DELETE FROM REGISTRATION
    WHERE registration_id = ?
    `,
    [registrationId],
  );

  return {
    registrationId,
    deleted: true,
  };
};

module.exports = {
  list,

  findById,
  findByContact,
  existsById,

  create,
  update,
  updateStatus,
  assignStudent,
  remove,
};
