const db = require("@/config/database");

const {
  arrayToCamelCase,
  objectToCamelCase,
  objectToSnakeCase,
} = require("@/utils/helpers");

const queryBuilder = require("@/utils/query/queryBuilders");

const {
  COURSE_CATEGORY_FIELDS,
  COURSE_CATEGORY_MAPS,
} = require("./courseCategories.constants");

const CATEGORY_SELECT = `
SELECT
    cc.category_id,
    cc.category_code,
    cc.category_name,
    cc.description
`;

const CATEGORY_FROM = `
FROM COURSE_CATEGORY cc
`;

// ===============================
// Query
// ===============================

const find = async (query, connection = db) => {
  const { page, limit, search, searchField, sortBy, sortOrder } = query;

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,

    search,
    searchField,

    searchableFields: COURSE_CATEGORY_FIELDS.QUERY.SEARCHABLE,

    searchMap: COURSE_CATEGORY_MAPS.SEARCH,

    sortBy,
    sortOrder,

    sortMap: COURSE_CATEGORY_MAPS.SORT,

    filters: {},

    filterMap: {},
  });

  const { pagination, searchResult, sortClause } = queryOptions;

  const whereParts = [];
  const params = [];

  if (searchResult.clause) {
    whereParts.push(searchResult.clause);

    params.push(...searchResult.values);
  }

  const whereClause = whereParts.length
    ? `WHERE ${whereParts.join(" AND ")}`
    : "";

  const countSql = `
    SELECT COUNT(*) AS total

    ${CATEGORY_FROM}

    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);

  const totalRecords = Number(countRows[0]?.total || 0);

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: CATEGORY_SELECT,

    fromJoinClause: CATEGORY_FROM,

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

const findById = async (categoryId, connection = db) => {
  const [rows] = await connection.query(
    `
        ${CATEGORY_SELECT}

        ${CATEGORY_FROM}

        WHERE cc.category_id = ?
      `,
    [categoryId],
  );

  return rows.length ? objectToCamelCase(rows[0]) : null;
};

const findByCode = async (categoryCode, connection = db) => {
  const [rows] = await connection.query(
    `
        ${CATEGORY_SELECT}

        ${CATEGORY_FROM}

        WHERE cc.category_code = ?
      `,
    [categoryCode],
  );

  return rows.length ? objectToCamelCase(rows[0]) : null;
};

// ===============================
// Exists
// ===============================

const existsById = async (categoryId, connection = db) => {
  const [rows] = await connection.query(
    `
        SELECT 1

        FROM COURSE_CATEGORY

        WHERE category_id = ?

        LIMIT 1
      `,
    [categoryId],
  );

  return rows.length > 0;
};

const existsByCode = async (categoryCode, connection = db) => {
  const [rows] = await connection.query(
    `
        SELECT 1

        FROM COURSE_CATEGORY

        WHERE category_code = ?

        LIMIT 1
      `,
    [categoryCode],
  );

  return rows.length > 0;
};

// ===============================
// Mutation
// ===============================

const create = async (categoryData, connection = db) => {
  const data = objectToSnakeCase(categoryData);

  const fields = Object.keys(data);

  const values = Object.values(data);

  const sql = `
      INSERT INTO COURSE_CATEGORY
      (${fields.join(", ")})

      VALUES
      (${fields.map(() => "?").join(", ")})
  `;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (categoryId, categoryData, connection = db) => {
  const data = objectToSnakeCase(categoryData);

  const fields = Object.keys(data);

  if (!fields.length) {
    return findById(categoryId, connection);
  }

  const values = Object.values(data);

  const sql = `
      UPDATE COURSE_CATEGORY

      SET
      ${fields.map((field) => `${field} = ?`).join(", ")}

      WHERE category_id = ?
  `;

  await connection.query(sql, [...values, categoryId]);

  return findById(categoryId, connection);
};

const remove = async (categoryId, connection = db) => {
  const category = await findById(categoryId, connection);

  if (!category) {
    return null;
  }

  await connection.query(
    `
      DELETE FROM COURSE_CATEGORY

      WHERE category_id = ?
    `,
    [categoryId],
  );

  return {
    categoryId,

    deleted: true,
  };
};

module.exports = {
  // Query
  find,

  // Find
  findById,
  findByCode,

  existsById,
  existsByCode,

  // Mutation
  create,
  update,
  remove,
};
