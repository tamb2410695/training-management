const db = require("../../config/database");
const { INSTRUCTOR_STATUS } = require("../../constants");
const { INSTRUCTOR_FIELDS } = require("./instructors.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, instructorStatus } = query;
  const searchableFields = INSTRUCTOR_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = INSTRUCTOR_FIELDS.QUERY.SORTABLE;
  
  const filters = {};
  if (instructorStatus) filters.instructorStatus = instructorStatus;
  
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
  const selectDataClause = `
    SELECT
      i.instructor_id,
      i.instructor_code,
      a.account_id,
      i.full_name,
      i.date_of_birth,
      i.gender,
      a.email,
      i.phone,
      i.hire_date,
      i.specialization,
      i.instructor_status,
      a.created_at,
      a.updated_at
  `;

  const fromJoinClause = `
    FROM INSTRUCTOR i
    JOIN ACCOUNT a ON i.account_id = a.account_id
  `;
  
  let whereClause = ` WHERE a.deleted_at IS NULL`;
  const params = [];

  if (filterResult.clause) {
    whereClause += ` AND ${filterResult.clause}`;
    params.push(...filterResult.values);
  }

  if (searchResult.clause) {
    whereClause += ` AND ${searchResult.clause}`;
    params.push(...searchResult.values);
  }

  const countSql = `SELECT COUNT(*) as total ${fromJoinClause} ${whereClause}`;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;
  
  let dataSql = `${selectDataClause} ${fromJoinClause} ${whereClause}`;
  
  if (sortClause) {
    dataSql += ` ${sortClause}`;
  }

  dataSql += ` LIMIT ? OFFSET ?`;
  const dataParams = [...params, pagination.limit, pagination.offset];
  const [rows] = await connection.query(dataSql, dataParams);
  
  return {
    data: arrayToCamelCase(rows),
    pagination: {
      totalRecords,
      limit: pagination.limit,
      offset: pagination.offset,
      totalPages: Math.ceil(totalRecords / pagination.limit)
    }
  };
};

const findById = async (instructorId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      i.instructor_id,
      i.instructor_code,
      a.account_id,
      i.full_name,
      i.date_of_birth,
      i.gender,
      a.email,
      i.phone,
      i.hire_date,
      i.specialization,
      i.instructor_status,
      a.created_at,
      a.updated_at
    FROM INSTRUCTOR i
    JOIN ACCOUNT a ON i.account_id = a.account_id
    WHERE i.instructor_id = ? AND a.deleted_at IS NULL;
    `,
    [instructorId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (instructorData, connection = db) => {
  const data = objectToSnakeCase(instructorData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const placeholders = fields.map(() => "?").join(", ");
  const sql = `
    INSERT INTO INSTRUCTOR (${fields.join(", ")})
    VALUES (${placeholders});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (instructorId, instructorData, connection = db) => {
  const data = objectToSnakeCase(instructorData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  if (fields.length === 0) return findById(instructorId, connection);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE INSTRUCTOR
    SET ${setClause}
    WHERE instructor_id = ?
  `;
  
  await connection.query(sql, [...values, instructorId]);
  return findById(instructorId, connection);
};

const remove = async (instructorId, connection = db) => {
  const status = INSTRUCTOR_STATUS.DELETED;
  
  const sql = `
    UPDATE INSTRUCTOR
    SET instructor_status = ?
    WHERE instructor_id = ?
  `;
  
  await connection.query(sql, [status, instructorId]);
  
  return {
    instructorId,
    instructorStatus: status
  };
};

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};