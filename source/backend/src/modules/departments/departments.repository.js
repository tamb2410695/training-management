const db = require("../../config/database");
const { DEPARTMENT_FIELDS, DEPARTMENT_MAPS } = require("./departments.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers");

const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  } = query;

  const searchableFields = DEPARTMENT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = DEPARTMENT_FIELDS.QUERY.SORTABLE;
  const searchMap = DEPARTMENT_MAPS.SEARCH;
  const sortMap = DEPARTMENT_MAPS.SORT;
  const filterMap = DEPARTMENT_MAPS.FILTER;

  const filters = {};

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
      dpt.department_id,
      dpt.department_code,
      dpt.department_name
  `;

  const fromJoinClause = `
    FROM DEPARTMENT dpt
  `;

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

  const whereClause = whereParts.length > 0 ? `WHERE ${whereParts.join(" AND ")}` : "";

  const countSql = `
    SELECT COUNT(dpt.department_id) as total 
    ${fromJoinClause}
    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  // Xây dựng câu lệnh lấy dữ liệu hoàn chỉnh
  let dataSql = queryBuilder.buildSelectQuery({
    selectClause,
    fromJoinClause,
    whereClause,
    sortClause,
  });

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

const findById = async (departmentId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      dpt.department_id,
      dpt.department_code,
      dpt.department_name
    FROM DEPARTMENT dpt
    WHERE dpt.department_id = ?
    `,
    [departmentId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const findByCode = async (departmentCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      dpt.department_id,
      dpt.department_code,
      dpt.department_name
    FROM DEPARTMENT dpt
    WHERE dpt.department_code = ?
    `,
    [departmentCode],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const create = async (departmentData, connection = db) => {
  const data = objectToSnakeCase(departmentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO DEPARTMENT (${fieldClause})
    VALUES (${placeholderClause});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (departmentId, departmentData, connection = db) => {
  const data = objectToSnakeCase(departmentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE DEPARTMENT
    SET ${setClause}
    WHERE department_id = ?
  `;

  await connection.query(sql, [...values, departmentId]);
  return findById(departmentId, connection);
};

const remove = async (departmentId, connection = db) => {
  await connection.query(
    `
    DELETE FROM DEPARTMENT
    WHERE department_id = ?
    `,
    [departmentId],
  );

  return {
    departmentId,
    deleted: true,
  };
};

module.exports = {
  find,
  findById,
  findByCode,
  create,
  update,
  remove,
};