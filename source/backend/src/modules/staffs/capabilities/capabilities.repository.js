const db = require("../../../config/database");
const { STAFF_CAPABILITY_FIELDS, STAFF_CAPABILITY_MAPS } = require("./capabilities.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../../utils/helpers");

const queryBuilder = require("../../../utils/query/queryBuilders");

/**
 * Tìm kiếm nâng cao có phân trang, lọc và sắp xếp danh sách năng lực giảng dạy của giảng viên
 */
const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    staffId,
    courseId,
  } = query;

  const searchableFields = STAFF_CAPABILITY_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = STAFF_CAPABILITY_FIELDS.QUERY.SORTABLE;
  const searchMap = STAFF_CAPABILITY_MAPS.SEARCH;
  const sortMap = STAFF_CAPABILITY_MAPS.SORT;
  const filterMap = STAFF_CAPABILITY_MAPS.FILTER;

  // Thu thập bộ lọc từ query params
  const filters = {};
  if (staffId) filters.staffId = staffId;
  if (courseId) filters.courseId = courseId;

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
      sc.staff_id,
      sc.course_id,
      sc.assigned_at,
      sc.updated_at,
      sp.staff_code,
      sp.full_name AS staff_full_name,
      c.course_code,
      c.course_name
  `;

  const fromJoinClause = `
    FROM STAFF_CAPABILITY sc
    JOIN STAFF_PROFILE sp ON sc.staff_id = sp.staff_id
    JOIN COURSE c ON sc.course_id = c.course_id
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

  // Tính tổng số bản ghi
  const countSql = `
    SELECT COUNT(*) as total 
    ${fromJoinClause}
    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  // Xây dựng select query động
  let dataSql = queryBuilder.buildSelectQuery({
    selectClause,
    fromJoinClause,
    whereClause,
    groupClause: "", 
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

/**
 * Tìm một bản ghi năng lực cụ thể bằng Khóa chính phức hợp (staffId + courseId)
 */
const findWithCompositeKey = async (staffId, courseId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      sc.staff_id,
      sc.course_id,
      sc.assigned_at,
      sc.updated_at,
      sp.staff_code,
      sp.full_name AS staff_full_name,
      c.course_code,
      c.course_name
    FROM STAFF_CAPABILITY sc
    JOIN STAFF_PROFILE sp ON sc.staff_id = sp.staff_id
    JOIN COURSE c ON sc.course_id = c.course_id
    WHERE sc.staff_id = ? AND sc.course_id = ?
    `,
    [staffId, courseId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

/**
 * Gán năng lực giảng dạy môn học cho nhân sự
 */
const create = async (capabilityData, connection = db) => {
  const data = objectToSnakeCase(capabilityData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO STAFF_CAPABILITY (${fieldClause})
    VALUES (${placeholderClause});
  `;

  await connection.query(sql, values);
  return findWithCompositeKey(capabilityData.staffId, capabilityData.courseId, connection);
};

/**
 * Xóa năng lực giảng dạy (Hủy gán giảng viên khỏi môn học)
 */
const remove = async (staffId, courseId, connection = db) => {
  await connection.query(
    `
    DELETE FROM STAFF_CAPABILITY
    WHERE staff_id = ? AND course_id = ?
    `,
    [staffId, courseId],
  );

  return {
    staffId,
    courseId,
    removed: true,
  };
};

module.exports = {
  find,
  findWithCompositeKey,
  create,
  remove,
};