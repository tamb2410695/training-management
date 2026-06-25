const db = require("../../config/database");
const { PERMISSION_FIELDS } = require("./permissions.constants");
const { arrayToCamelCase, objectToSnakeCase, objectToCamelCase } = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, permissionCode } = query;
  const searchableFields = PERMISSION_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = PERMISSION_FIELDS.QUERY.SORTABLE;

  const filters = {};
  if (permissionCode) filters.permissionCode = permissionCode;

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,
    search,
    filters,
    sortBy,
    sortOrder,
    searchableFields,
    sortableFields,
  });

  const { pagination, searchResult, filterResult, sortClause } = queryOptions;

  let whereClause = " WHERE 1=1";
  const params = [];

  if (filterResult.clause) {
    whereClause += ` AND ${filterResult.clause}`;
    params.push(...filterResult.values);
  }

  if (searchResult.clause) {
    whereClause += ` AND ${searchResult.clause}`;
    params.push(...searchResult.values);
  }

  const countSql = `SELECT COUNT(*) as total FROM PERMISSION ${whereClause}`;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  let dataSql = `SELECT permission_id, permission_name, permission_code, description, created_at FROM PERMISSION ${whereClause}`;
  if (sortClause) dataSql += ` ${sortClause}`;
  dataSql += ` LIMIT ? OFFSET ?`;

  const [rows] = await connection.query(dataSql, [...params, pagination.limit, pagination.offset]);

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

const findById = async (permissionId, connection = db) => {
  const [rows] = await connection.query(
    `SELECT permission_id, permission_name, permission_code, description, created_at FROM PERMISSION WHERE permission_id = ?`,
    [permissionId]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByCode = async (permissionCode, connection = db) => {
  const [rows] = await connection.query(
    `SELECT permission_id, permission_name, permission_code, description FROM PERMISSION WHERE permission_code = ?`,
    [permissionCode]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (permissionData, connection = db) => {
  const data = objectToSnakeCase(permissionData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const placeholders = fields.map(() => "?").join(", ");
  const sql = `INSERT INTO PERMISSION (${fields.join(", ")}) VALUES (${placeholders});`;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (permissionId, permissionData, connection = db) => {
  const data = objectToSnakeCase(permissionData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `UPDATE PERMISSION SET ${setClause} WHERE permission_id = ?`;

  await connection.query(sql, [...values, permissionId]);
  return findById(permissionId, connection);
};

const remove = async (permissionId, connection = db) => {
  const sql = `DELETE FROM PERMISSION WHERE permission_id = ?`;
  await connection.query(sql, [permissionId]);
  return { permissionId };
};

module.exports = {
  find,
  findById,
  findByCode,
  create,
  update,
  remove,
};