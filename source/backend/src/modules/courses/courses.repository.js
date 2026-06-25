const db = require("../../config/database");
const { COURSE_STATUS } = require("../../constants");
const { COURSE_FIELDS } = require("./courses.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, courseStatus } = query;
  const searchableFields = COURSE_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = COURSE_FIELDS.QUERY.SORTABLE;
  
  const filters = {};
  if (courseStatus) filters.courseStatus = courseStatus;

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
      course_id,
      course_code,
      course_name,
      level,
      course_description,
      duration_hours,
      total_sessions,
      tuition_fee,
      certificate_available,
      cover_image,
      course_status,
      created_at,
      updated_at
  `;

  const fromJoinClause = `
    FROM COURSE
  `;

  let whereClause = ` WHERE deleted_at IS NULL`;
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

const findById = async (courseId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      course_id,
      course_code,
      course_name,
      level,
      course_description,
      duration_hours,
      total_sessions,
      tuition_fee,
      certificate_available,
      cover_image,
      course_status,
      created_at,
      updated_at
    FROM COURSE
    WHERE course_id = ? AND deleted_at IS NULL;
    `,
    [courseId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (courseData, connection = db) => {
  const data = objectToSnakeCase(courseData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const placeholders = fields.map(() => "?").join(", ");
  const sql = `
    INSERT INTO COURSE (${fields.join(", ")})
    VALUES (${placeholders});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (courseId, courseData, connection = db) => {
  const data = objectToSnakeCase(courseData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  if (fields.length === 0) return findById(courseId, connection);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE COURSE
    SET ${setClause}
    WHERE course_id = ? AND deleted_at IS NULL
  `;
  
  await connection.query(sql, [...values, courseId]);
  return findById(courseId, connection);
};

const remove = async (courseId, connection = db) => {
  const status = COURSE_STATUS.DELETED;
  const deletedAt = new Date();
  
  await connection.query(
    `
    UPDATE COURSE
    SET course_status = ?,
        deleted_at = ?
    WHERE course_id = ? AND deleted_at IS NULL
    `,
    [status, deletedAt, courseId],
  );
  
  return {
    courseId,
    courseStatus: status,
    deletedAt
  };
};

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};