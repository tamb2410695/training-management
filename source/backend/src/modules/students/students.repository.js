const db = require("../../config/database");
const { STUDENT_STATUS } = require("../../constants");
const { STUDENT_FIELDS } = require("./students.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, studentStatus } = query;
  const searchableFields = STUDENT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = STUDENT_FIELDS.QUERY.SORTABLE;
  
  const filters = {};
  if (studentStatus) filters.studentStatus = studentStatus;

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
      s.student_id,
      s.student_code,
      a.account_id,
      s.full_name,
      s.date_of_birth,
      s.gender,
      a.email,
      s.phone,
      s.address,
      s.student_status,
      a.created_at,
      a.updated_at
  `;

  const fromJoinClause = `
    FROM STUDENT s
    JOIN ACCOUNT a ON s.account_id = a.account_id
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
      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

const findById = async (studentId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      s.student_id,
      s.student_code,
      a.account_id,
      s.full_name,
      s.date_of_birth,
      s.gender,
      a.email,
      s.phone,
      s.address,
      s.student_status,
      a.created_at,
      a.updated_at
    FROM STUDENT s
    JOIN ACCOUNT a ON s.account_id = a.account_id
    WHERE s.student_id = ? AND a.deleted_at IS NULL;
    `,
    [studentId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (studentData, connection = db) => {
  const data = objectToSnakeCase(studentData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const placeholders = fields.map(() => "?").join(", ");
  const sql = `
    INSERT INTO STUDENT (${fields.join(", ")})
    VALUES (${placeholders});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (studentId, studentData, connection = db) => {
  const data = objectToSnakeCase(studentData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  if (fields.length === 0) return findById(studentId, connection);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE STUDENT
    SET ${setClause}
    WHERE student_id = ?
  `;
  
  await connection.query(sql, [...values, studentId]);
  return findById(studentId, connection);
};

const remove = async (studentId, connection = db) => {
  const status = STUDENT_STATUS.DELETED; 
  
  const sql = `
    UPDATE STUDENT
    SET student_status = ?
    WHERE student_id = ?
  `;
  
  await connection.query(sql, [status, studentId]);
  
  return {
    studentId,
    studentStatus: status
  };
};

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};