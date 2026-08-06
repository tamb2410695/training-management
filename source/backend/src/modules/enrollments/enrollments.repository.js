const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("@/utils/helpers");

const queryBuilder = require("@/utils/query/queryBuilders");

const {
  ENROLLMENT_FIELDS,
  ENROLLMENT_MAPS,
} = require("./enrollments.constants");

const { ENROLLMENT_STATUS } = require("@/constants");

// ===============================
// Base Query
// ===============================

const ENROLLMENT_SELECT = `
SELECT
    enr.enrollment_id,
    enr.student_id,
    enr.class_id,
    enr.enrollment_date,
    enr.enrollment_status,
    enr.created_at,
    enr.updated_at,

    stu.student_code,
    stu.full_name AS student_name,

    cls.class_code,
    cls.class_name
`;

const ENROLLMENT_FROM = `
FROM ENROLLMENT enr

INNER JOIN STUDENT_PROFILE stu
    ON stu.student_id = enr.student_id

INNER JOIN CLASS cls
    ON cls.class_id = enr.class_id
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

    enrollmentStatus,
    studentId,
    classId,
  } = query;

  const filters = {};

  if (enrollmentStatus) {
    filters.enrollmentStatus = enrollmentStatus;
  }

  if (studentId) {
    filters.studentId = studentId;
  }

  if (classId) {
    filters.classId = classId;
  }

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,

    search,
    searchField,

    searchableFields: ENROLLMENT_FIELDS.QUERY.SEARCHABLE,

    searchMap: ENROLLMENT_MAPS.SEARCH,

    sortBy,
    sortOrder,

    sortMap: ENROLLMENT_MAPS.SORT,

    filters,

    filterMap: ENROLLMENT_MAPS.FILTER,
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

    ${ENROLLMENT_FROM}

    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);

  const totalRecords = Number(countRows[0]?.total || 0);

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: ENROLLMENT_SELECT,

    fromJoinClause: ENROLLMENT_FROM,

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

      offset: pagination.offset,

      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

// ===============================
// Find
// ===============================

const findById = async (enrollmentId, connection = db) => {
  const [rows] = await connection.query(
    `
      ${ENROLLMENT_SELECT}

      ${ENROLLMENT_FROM}

      WHERE enr.enrollment_id = ?
      `,
    [enrollmentId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const findByStudentClass = async (studentId, classId, connection = db) => {
  const [rows] = await connection.query(
    `
      ${ENROLLMENT_SELECT}

      ${ENROLLMENT_FROM}

      WHERE
          enr.student_id = ?
      AND
          enr.class_id = ?
      `,
    [studentId, classId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

// ===============================
// Exists
// ===============================

const existsById = async (enrollmentId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT 1

      FROM ENROLLMENT

      WHERE enrollment_id = ?

      LIMIT 1
      `,
    [enrollmentId],
  );

  return rows.length > 0;
};

const existsByStudentClass = async (studentId, classId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT 1

      FROM ENROLLMENT

      WHERE
          student_id = ?
      AND
          class_id = ?

      LIMIT 1
      `,
    [studentId, classId],
  );

  return rows.length > 0;
};

// ===============================
// Mutation
// ===============================

const create = async (enrollmentData, connection = db) => {
  const data = objectToSnakeCase(enrollmentData);

  const fields = Object.keys(data);

  const values = Object.values(data);

  const sql = `
    INSERT INTO ENROLLMENT
    (${fields.join(",")})

    VALUES
    (${fields.map(() => "?").join(",")})
  `;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (enrollmentId, enrollmentData, connection = db) => {
  const data = objectToSnakeCase(enrollmentData);

  const fields = Object.keys(data);

  if (!fields.length) {
    return findById(enrollmentId, connection);
  }

  const values = Object.values(data);

  await connection.query(
    `
    UPDATE ENROLLMENT

    SET
    ${fields.map((field) => `${field} = ?`).join(",")}

    WHERE enrollment_id = ?
    `,
    [...values, enrollmentId],
  );

  return findById(enrollmentId, connection);
};

const updateStatus = async (enrollmentId, status, connection = db) => {
  await connection.query(
    `
    UPDATE ENROLLMENT

    SET enrollment_status = ?

    WHERE enrollment_id = ?
    `,
    [status, enrollmentId],
  );

  return findById(enrollmentId, connection);
};

const remove = async (enrollmentId, connection = db) => {
  await connection.query(
    `
    DELETE FROM ENROLLMENT

    WHERE enrollment_id = ?
    `,
    [enrollmentId],
  );

  return {
    enrollmentId,

    deleted: true,
  };
};

// ===============================
// Business Support
// ===============================

const countByClass = async (classId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT COUNT(*) AS total

      FROM ENROLLMENT

      WHERE
          class_id = ?

      AND
          enrollment_status = ?
      `,
    [classId, ENROLLMENT_STATUS.APPROVED],
  );

  return Number(rows[0]?.total || 0);
};

module.exports = {
  list,

  findById,

  findByStudentClass,

  existsById,

  existsByStudentClass,

  create,

  update,

  updateStatus,

  remove,

  countByClass,
};
