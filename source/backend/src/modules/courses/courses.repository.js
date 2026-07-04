const db = require("../../config/database");
const { COURSE_STATUS } = require("../../constants");
const { COURSE_FIELDS, COURSE_MAPS } = require("./courses.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");

// =========================================================================
// 1. FIND WITH PAGINATION, SEARCH, FILTER, SORT
// =========================================================================
const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, courseLevel, courseStatus, certificateAvailable } = query;
  
  const searchableFields = COURSE_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = COURSE_FIELDS.QUERY.SORTABLE;
  const searchMap = COURSE_MAPS.SEARCH;
  const sortMap = COURSE_MAPS.SORT;
  const filterMap = COURSE_MAPS.FILTER;
  
  // Thu thập các bộ lọc động đặc thù của Course
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
      c.course_id,
      c.course_name,
      c.cover_image,
      c.course_code,
      c.course_description,
      c.duration_hours,
      c.total_sessions,
      c.tuition_fee,
      c.course_level,
      c.certificate_available,
      c.course_status,
      c.created_at,
      c.updated_at
  `;

  const fromJoinClause = `
    FROM COURSE c
  `;

  // Luôn lọc các bản ghi chưa bị xóa mềm
  const whereParts = ["c.deleted_at IS NULL"];
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

  // 1. Lấy tổng số bản ghi phục vụ phân trang
  const countSql = `SELECT COUNT(*) as total ${fromJoinClause} ${whereClause}`;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;
  
  // 2. Lấy dữ liệu phân trang thực tế
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

// =========================================================================
// 2. FIND BY ID
// =========================================================================
const findById = async (courseId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      c.course_id,
      c.course_name,
      c.cover_image,
      c.course_code,
      c.course_description,
      c.duration_hours,
      c.total_sessions,
      c.tuition_fee,
      c.course_level,
      c.certificate_available,
      c.course_status,
      c.created_at,
      c.updated_at
    FROM COURSE c
    WHERE c.course_id = ? AND c.deleted_at IS NULL;
    `,
    [courseId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

// =========================================================================
// 3. FIND BY COURSE CODE (UNIQUE CHECK)
// =========================================================================
const findByCode = async (courseCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 
      c.course_id,
      c.course_name,
      c.cover_image,
      c.course_code,
      c.course_status
    FROM COURSE c
    WHERE c.course_code = ? AND c.deleted_at IS NULL;
    `,
    [courseCode],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

// =========================================================================
// 4. CREATE COURSE
// =========================================================================
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

// =========================================================================
// 5. UPDATE COURSE
// =========================================================================
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

// =========================================================================
// 6. REMOVE COURSE (SOFT DELETE)
// =========================================================================
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