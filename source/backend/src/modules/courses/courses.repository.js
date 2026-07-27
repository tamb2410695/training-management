const db = require("../../config/database");
const { COURSE_STATUS } = require("../../constants");
const { COURSE_FIELDS, COURSE_MAPS } = require("./courses.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, courseLevel, courseStatus, certificateAvailable } = query;
  
  const searchableFields = COURSE_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = COURSE_FIELDS.QUERY.SORTABLE;
  const searchMap = COURSE_MAPS.SEARCH;
  const sortMap = COURSE_MAPS.SORT;
  const filterMap = COURSE_MAPS.FILTER;
  
  const filters = {};
  if (courseLevel) filters.courseLevel = courseLevel;
  if (courseStatus) filters.courseStatus = courseStatus;
  if (certificateAvailable !== undefined) filters.certificateAvailable = certificateAvailable;

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
      crs.course_id,
      crs.course_name,
      crs.cover_image,
      crs.course_code,
      crs.course_description,
      crs.duration_hours,
      crs.total_sessions,
      crs.tuition_fee,
      crs.course_level,
      crs.certificate_available,
      crs.course_status,
      crs.created_at,
      crs.updated_at
  `;

  const fromJoinClause = `
    FROM COURSE crs
  `;

  const whereParts = ["crs.deleted_at IS NULL"];
  const params = [];

  if (searchResult.clause) {
    whereParts.push(searchResult.clause);
    params.push(...searchResult.values);
  }

  if (filterResult.clause) {
    whereParts.push(filterResult.clause);
    params.push(...filterResult.values);
  }

  const whereClause = `WHERE ${whereParts.join(" AND ")}`;

  const countSql = `SELECT COUNT(*) as total ${fromJoinClause} ${whereClause}`;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;
  
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

const findById = async (courseId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      crs.course_id,
      crs.course_name,
      crs.cover_image,
      crs.course_code,
      crs.course_description,
      crs.duration_hours,
      crs.total_sessions,
      crs.tuition_fee,
      crs.course_level,
      crs.certificate_available,
      crs.course_status,
      crs.created_at,
      crs.updated_at
    FROM COURSE crs
    WHERE crs.course_id = ? AND crs.deleted_at IS NULL;
    `,
    [courseId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const findByCode = async (courseCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      crs.course_id,
      crs.course_name,
      crs.cover_image,
      crs.course_code,
      crs.course_status
    FROM COURSE crs
    WHERE crs.course_code = ? AND crs.deleted_at IS NULL;
    `,
    [courseCode],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (courseData, connection = db) => {
  const data = objectToSnakeCase(courseData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO COURSE (${fieldClause})
    VALUES (${placeholderClause});
  `;
  
  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (courseId, courseData, connection = db) => {
  const data = objectToSnakeCase(courseData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
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
  const currentCourse = await findById(courseId, connection);
  if (!currentCourse) return null;

  const status = COURSE_STATUS.DELETED; 
  const deletedAt = new Date();

  await connection.query(
    `
    UPDATE COURSE
    SET course_status = ?,
        deleted_at = ?
    WHERE course_id = ?
      AND deleted_at IS NULL
    `,
    [status, deletedAt, courseId],
  );

  return {
    ...currentCourse,
    courseStatus: status,
    deletedAt: deletedAt,
  };
};

// =========================================================================
// 7. SUB-RESOURCE: FIND DOCUMENTS BY COURSE ID
// =========================================================================
const findDocumentsByCourseId = async (courseId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      d.document_id,
      d.document_code,
      d.course_id,
      d.title,
      d.file_path,
      d.document_description,
      d.is_visible,
      d.document_status,
      d.uploaded_at
    FROM DOCUMENT d
    WHERE d.course_id = ? AND d.deleted_at IS NULL
    ORDER BY d.uploaded_at DESC;
    `,
    [courseId],
  );
  return arrayToCamelCase(rows);
};

module.exports = {
  find,
  findById,
  findByCode,
  create,
  update,
  remove,
  findDocumentsByCourseId,
};