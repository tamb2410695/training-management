const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToCamelCase,
  objectToSnakeCase,
} = require("@/utils/helpers");

const queryBuilder = require("@/utils/query/queryBuilders");

const { CLASS_FIELDS, CLASS_MAPS } = require("./classes.constants");

const CLASS_SELECT = `
  cls.class_id,
  cls.course_id,
  cls.teacher_id,

  cls.class_code,
  cls.class_name,

  cls.start_date,
  cls.end_date,

  cls.max_students,
  cls.class_status,

  cls.created_at,
  cls.updated_at,

  crs.course_code,
  crs.course_name,

  sp.staff_code,
  sp.full_name AS teacher_name
`;

const CLASS_FROM = `
  FROM CLASS cls

  LEFT JOIN COURSE crs
    ON cls.course_id = crs.course_id

  LEFT JOIN STAFF_PROFILE sp
    ON cls.teacher_id = sp.staff_id
`;

const CLASS_BASE_WHERE = ["cls.deleted_at IS NULL"];

const list = async (query, connection = db) => {
  const {
    page,
    limit,

    search,
    searchField,

    sortBy,
    sortOrder,

    courseId,
    teacherId,
    classStatus,
  } = query;

  const filters = {};

  if (courseId) {
    filters.courseId = courseId;
  }

  if (teacherId) {
    filters.teacherId = teacherId;
  }

  if (classStatus) {
    filters.classStatus = classStatus;
  }

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,

    search,
    searchableFields: CLASS_FIELDS.QUERY.SEARCHABLE,

    searchField,

    searchMap: CLASS_MAPS.SEARCH,

    sortBy,
    sortOrder,

    sortMap: CLASS_MAPS.SORT,

    filters,

    filterMap: CLASS_MAPS.FILTER,
  });

  const {
    pagination,

    searchResult,

    filterResult,

    sortClause,
  } = queryOptions;

  const whereParts = [...CLASS_BASE_WHERE];

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

    ${CLASS_FROM}

    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);

  const totalRecords = countRows[0]?.total || 0;

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: `SELECT ${CLASS_SELECT}`,

    fromJoinClause: CLASS_FROM,

    whereClause,

    sortClause,
  });

  dataSql += `
    LIMIT ?
    OFFSET ?
  `;

  const dataParams = [...params, pagination.limit, pagination.offset];

  const [rows] = await connection.query(dataSql, dataParams);

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

const findById = async (classId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT
        ${CLASS_SELECT}

      ${CLASS_FROM}

      WHERE
        cls.class_id = ?

        AND cls.deleted_at IS NULL
      `,
    [classId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const findByCode = async (classCode, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT
        ${CLASS_SELECT}

      ${CLASS_FROM}

      WHERE
        cls.class_code = ?

        AND cls.deleted_at IS NULL
      `,
    [classCode],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const findByName = async (className, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT
        ${CLASS_SELECT}

      ${CLASS_FROM}

      WHERE
        cls.class_name = ?

        AND cls.deleted_at IS NULL
      `,
    [className],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const existsById = async (classId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT 1

      FROM CLASS

      WHERE
        class_id = ?

        AND deleted_at IS NULL

      LIMIT 1
      `,
    [classId],
  );

  return rows.length > 0;
};

const create = async (classData, connection = db) => {
  const data = objectToSnakeCase(classData);

  const fields = Object.keys(data);

  const values = Object.values(data);

  const fieldClause = fields.join(", ");

  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO CLASS
    (
      ${fieldClause}
    )

    VALUES
    (
      ${placeholderClause}
    )
  `;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (classId, classData, connection = db) => {
  const data = objectToSnakeCase(classData);

  const fields = Object.keys(data);

  if (!fields.length) {
    return findById(classId, connection);
  }

  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  await connection.query(
    `
    UPDATE CLASS

    SET
      ${setClause}

    WHERE
      class_id = ?
    `,
    [...values, classId],
  );

  return findById(classId, connection);
};

const updateStatus = async (classId, classStatus, connection = db) => {
  await connection.query(
    `
    UPDATE CLASS

    SET
      class_status = ?

    WHERE
      class_id = ?
    `,
    [classStatus, classId],
  );

  return findById(classId, connection);
};

const remove = async (classId, connection = db) => {
  await connection.query(
    `
    UPDATE CLASS

    SET
      deleted_at = CURRENT_TIMESTAMP

    WHERE
      class_id = ?
    `,
    [classId],
  );

  return {
    classId,

    deleted: true,
  };
};

const existsCourse = async (courseId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT 1

      FROM COURSE

      WHERE
        course_id = ?

        AND deleted_at IS NULL

      LIMIT 1
      `,
    [courseId],
  );

  return rows.length > 0;
};

const existsInstructor = async (teacherId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT 1

      FROM STAFF_PROFILE

      WHERE
        staff_id = ?

      LIMIT 1
      `,
    [teacherId],
  );

  return rows.length > 0;
};

const countApprovedEnrollments = async (classId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT
        COUNT(*) AS total

      FROM ENROLLMENT

      WHERE
        class_id = ?

        AND enrollment_status = 'APPROVED'
      `,
    [classId],
  );

  return {
    total: rows[0]?.total || 0,
  };
};

const findCapacity = async (classId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT

        cls.class_id,

        cls.max_students,


        COUNT(
          en.enrollment_id
        ) AS approved_students


      FROM CLASS cls


      LEFT JOIN ENROLLMENT en

        ON cls.class_id = en.class_id

        AND en.enrollment_status = 'APPROVED'


      WHERE

        cls.class_id = ?

        AND cls.deleted_at IS NULL


      GROUP BY

        cls.class_id,

        cls.max_students
      `,
    [classId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

module.exports = {
  // ===============================
  // Query
  // ===============================

  list,

  findById,

  findByCode,

  findByName,

  existsById,

  // ===============================
  // Mutation
  // ===============================

  create,

  update,

  updateStatus,

  remove,

  // ===============================
  // Business Support
  // ===============================

  existsCourse,

  existsInstructor,

  countApprovedEnrollments,

  findCapacity,
};
