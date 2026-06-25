const db = require("../../config/database");
const { ENROLLMENT_FIELDS } = require("./enrollments.constants");
const { ENROLLMENT_STATUS } = require("../../constants"); // Cần đảm bảo có ENROLLMENT_STATUS trong constants
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
    enrollmentStatus,
    studentId,
    classId,
  } = query;
  const searchableFields = ENROLLMENT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = ENROLLMENT_FIELDS.QUERY.SORTABLE;

  const filters = {};
  if (enrollmentStatus) filters.enrollmentStatus = enrollmentStatus;
  if (studentId) filters.studentId = studentId;
  if (classId) filters.classId = classId;

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
      e.enrollment_id,
      e.enrollment_code,
      e.enrollment_date,
      e.enrollment_status,
      e.created_at,
      s.student_id,
      s.student_code,
      s.full_name AS student_name,
      c.class_id,
      c.class_code,
      co.course_name,
      co.tuition_fee
  `;

  const fromJoinClause = `
    FROM ENROLLMENT e
    JOIN STUDENT s ON e.student_id = s.student_id
    JOIN CLASS c ON e.class_id = c.class_id
    JOIN COURSE co ON c.course_id = co.course_id
  `;

  let whereClause = ` WHERE e.deleted_at IS NULL`;
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
      offset: pagination.offset,
      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

const findById = async (enrollmentId, connection = db) => {
  const [rows] = await connection.query(
    `
      SELECT e.*, c.course_id 
     FROM ENROLLMENT e 
     JOIN CLASS c ON e.class_id = c.class_id
     WHERE e.enrollment_id = ? 
      AND e.deleted_at IS NULL
    `,
    [enrollmentId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByStudentAndClass = async (studentId, classId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT * FROM ENROLLMENT 
    WHERE student_id = ? 
      AND class_id = ?
      AND deleted_at IS NULL
    `,
    [studentId, classId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (enrollmentData, connection = db) => {
  const data = objectToSnakeCase(enrollmentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const placeholders = fields.map(() => "?").join(", ");
  const sql = `
    INSERT INTO
    ENROLLMENT (${fields.join(", ")})
    VALUES (${placeholders});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (enrollmentId, enrollmentData, connection = db) => {
  const data = objectToSnakeCase(enrollmentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) return findById(enrollmentId, connection);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE ENROLLMENT
    SET ${setClause} 
    WHERE enrollment_id = ?
  `;

  await connection.query(sql, [...values, enrollmentId]);
  return findById(enrollmentId, connection);
};

const remove = async (enrollmentId, connection = db) => {
  const sql = `
    UPDATE ENROLLMENT 
    SET deleted_at = CURRENT_TIMESTAMP()
    WHERE enrollment_id = ?
  `;
  await connection.query(sql, [enrollmentId]);
  return { enrollmentId };
};

module.exports = {
  find,
  findById,
  findByStudentAndClass,
  create,
  update,
  remove,
};
