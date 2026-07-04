const db = require("../../config/database");
const { CERTIFICATE_FIELDS } = require("./certificates.constants");
const { arrayToCamelCase, objectToSnakeCase, objectToCamelCase } = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, certificateStatus, enrollmentId } = query;
  const searchableFields = CERTIFICATE_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = CERTIFICATE_FIELDS.QUERY.SORTABLE;

  const filters = {};
  if (certificateStatus) filters.certificateStatus = certificateStatus;
  if (enrollmentId) filters.enrollmentId = enrollmentId;

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

  const selectClause = `
    SELECT 
      cer.certificate_id, cer.certificate_code, cer.issue_date, cer.certificate_status,
      e.enrollment_code, s.full_name AS student_name, s.student_code, c.class_code, co.course_name
  `;

  const fromJoinClause = `
    FROM CERTIFICATE cer
    JOIN ENROLLMENT e ON cer.enrollment_id = e.enrollment_id
    JOIN STUDENT s ON e.student_id = s.student_id
    JOIN CLASS c ON e.class_id = c.class_id
    JOIN COURSE co ON c.course_id = co.course_id
  `;

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

  const countSql = `SELECT COUNT(*) as total ${fromJoinClause} ${whereClause}`;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  let dataSql = `${selectClause} ${fromJoinClause} ${whereClause}`;
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

const findById = async (certificateId, connection = db) => {
  const [rows] = await connection.query(
    `SELECT * FROM CERTIFICATE WHERE certificate_id = ?`,
    [certificateId]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByEnrollmentId = async (enrollmentId, connection = db) => {
  const [rows] = await connection.query(
    `SELECT * FROM CERTIFICATE WHERE enrollment_id = ?`,
    [enrollmentId]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (certificateData, connection = db) => {
  const data = objectToSnakeCase(certificateData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const placeholders = fields.map(() => "?").join(", ");
  const sql = `INSERT INTO CERTIFICATE (${fields.join(", ")}) VALUES (${placeholders});`;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (certificateId, certificateData, connection = db) => {
  const data = objectToSnakeCase(certificateData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) return findById(certificateId, connection);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `UPDATE CERTIFICATE SET ${setClause} WHERE certificate_id = ?`;

  await connection.query(sql, [...values, certificateId]);
  return findById(certificateId, connection);
};

module.exports = {
  find,
  findById,
  findByEnrollmentId,
  create,
  update,
}