const db = require("../../config/database");
const { ROLE_FIELDS } = require("./roles.constants");
const { arrayToCamelCase, objectToSnakeCase, objectToCamelCase } = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, roleName } = query;
  const searchableFields = ROLE_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = ROLE_FIELDS.QUERY.SORTABLE;

  const filters = {};
  if (roleName) filters.roleName = roleName;

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

  const countSql = `SELECT COUNT(*) as total FROM ROLE ${whereClause}`;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  let dataSql = `SELECT role_id, role_name, role_description FROM ROLE ${whereClause}`;
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

const findById = async (roleId, connection = db) => {
  const [rows] = await connection.query(
    `SELECT role_id, role_name, role_description FROM ROLE WHERE role_id = ?`,
    [roleId]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByName = async (roleName, connection = db) => {
  const [rows] = await connection.query(
    `SELECT role_id, role_name, role_description FROM ROLE WHERE role_name = ?`,
    [roleName]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
  };

const create = async (roleData, connection = db) => {
  const data = objectToSnakeCase(roleData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const placeholders = fields.map(() => "?").join(", ");
  const sql = `INSERT INTO ROLE (${fields.join(", ")}) VALUES (${placeholders});`;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (roleId, roleData, connection = db) => {
  const data = objectToSnakeCase(roleData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `UPDATE ROLE SET ${setClause} WHERE role_id = ?`;

  await connection.query(sql, [...values, roleId]);
  return findById(roleId, connection);
};

const remove = async (roleId, connection = db) => {
  const sql = `DELETE FROM ROLE WHERE role_id = ?`;
  await connection.query(sql, [roleId]);
  return { roleId };
};

module.exports = {
  find,
  findById,
  findByName,
  create,
  update,
  remove,
};