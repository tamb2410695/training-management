const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToCamelCase,
  objectToSnakeCase,
} = require("@/utils/helpers");

const queryBuilder = require("@/utils/query/queryBuilders");

const {
  COURSE_FIELDS,
  COURSE_MAPS,
} = require("./courses.constants");

const COURSE_SELECT = `
SELECT
  crs.course_id,
  crs.category_id,
  cc.category_code,
  cc.category_name,
  crs.course_code,
  crs.course_name,
  crs.description,
  crs.duration_hours,
  crs.course_status,
  crs.created_at,
  crs.updated_at
`;

const COURSE_FROM = `
FROM COURSE crs
LEFT JOIN COURSE_CATEGORY cc
  ON crs.category_id = cc.category_id
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
    categoryId,
    courseStatus,
  } = query;

  const filters = {
    categoryId,
    courseStatus,
  };

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,
    search,
    searchField,

    searchableFields: COURSE_FIELDS.QUERY.SEARCHABLE,
    searchMap: COURSE_MAPS.SEARCH,

    sortBy,
    sortOrder,
    sortMap: COURSE_MAPS.SORT,

    filters,
    filterMap: COURSE_MAPS.FILTER,
  });

  const {
    pagination,
    searchResult,
    filterResult,
    sortClause,
  } = queryOptions;

  const whereParts = [
    "crs.deleted_at IS NULL",
  ];

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
    ${COURSE_FROM}
    ${whereClause}
  `;

  const [countRows] = await connection.query(
    countSql,
    params,
  );

  const totalRecords = Number(
    countRows[0]?.total || 0,
  );

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: COURSE_SELECT,
    fromJoinClause: COURSE_FROM,
    whereClause,
    sortClause,
  });

  dataSql += `
    LIMIT ?
    OFFSET ?
  `;

  const [rows] = await connection.query(
    dataSql,
    [
      ...params,
      pagination.limit,
      pagination.offset,
    ],
  );

  return {
    data: arrayToCamelCase(rows),

    pagination: {
      totalRecords,
      limit: pagination.limit,
      offset: pagination.offset,
      totalPages: Math.ceil(
        totalRecords / pagination.limit,
      ),
    },
  };
};


// ===============================
// Find
// ===============================

const findById = async (
  courseId,
  connection = db,
) => {
  const [rows] = await connection.query(
    `
    ${COURSE_SELECT}
    ${COURSE_FROM}
    WHERE
      crs.course_id = ?
      AND crs.deleted_at IS NULL
    `,
    [courseId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};


const findByCode = async (
  courseCode,
  connection = db,
) => {
  const [rows] = await connection.query(
    `
    ${COURSE_SELECT}
    ${COURSE_FROM}
    WHERE
      crs.course_code = ?
      AND crs.deleted_at IS NULL
    `,
    [courseCode],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};


const findByName = async (
  courseName,
  connection = db,
) => {
  const [rows] = await connection.query(
    `
    ${COURSE_SELECT}
    ${COURSE_FROM}
    WHERE
      crs.course_name = ?
      AND crs.deleted_at IS NULL
    `,
    [courseName],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};


const existsById = async (
  courseId,
  connection = db,
) => {
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


// ===============================
// Mutation
// ===============================

const create = async (
  courseData,
  connection = db,
) => {
  const data = objectToSnakeCase(courseData);

  const fields = Object.keys(data);
  const values = Object.values(data);

  const sql = `
    INSERT INTO COURSE
    (${fields.join(", ")})
    VALUES
    (${fields.map(() => "?").join(", ")})
  `;

  const [result] = await connection.query(
    sql,
    values,
  );

  return findById(
    result.insertId,
    connection,
  );
};


const update = async (
  courseId,
  courseData,
  connection = db,
) => {
  const data = objectToSnakeCase(courseData);

  const fields = Object.keys(data);

  if (!fields.length) {
    return findById(
      courseId,
      connection,
    );
  }

  const values = Object.values(data);

  await connection.query(
    `
    UPDATE COURSE
    SET ${fields.map(
      (field) => `${field} = ?`,
    ).join(", ")}
    WHERE course_id = ?
    `,
    [
      ...values,
      courseId,
    ],
  );

  return findById(
    courseId,
    connection,
  );
};


const updateStatus = async (
  courseId,
  status,
  connection = db,
) => {
  await connection.query(
    `
    UPDATE COURSE
    SET course_status = ?
    WHERE course_id = ?
    `,
    [
      status,
      courseId,
    ],
  );

  return findById(
    courseId,
    connection,
  );
};


const remove = async (
  courseId,
  connection = db,
) => {
  await connection.query(
    `
    UPDATE COURSE
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE course_id = ?
    `,
    [courseId],
  );

  return {
    courseId,
    deleted: true,
  };
};


module.exports = {
  list,

  findById,
  findByCode,
  findByName,
  existsById,

  create,
  update,
  updateStatus,
  remove,
};