const db = require("../../config/database");
const { CLASS_STATUS } = require("../../constants");
const { CLASS_FIELDS, CLASS_MAPS } = require("./classes.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, classStatus, courseId } = query;

  const searchableFields = CLASS_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = CLASS_FIELDS.QUERY.SORTABLE;
  const searchMap = CLASS_MAPS.SEARCH;
  const sortMap = CLASS_MAPS.SORT;
  const filterMap = CLASS_MAPS.FILTER;

  const filters = {};
  if (classStatus) filters.classStatus = classStatus;
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
      cls.class_id,
      cls.class_code,
      crs.course_id,
      crs.course_name,
      cls.start_date,
      cls.end_date,
      cls.max_students,
      cls.class_status,
      cls.created_at,
      cls.updated_at
  `;

  const fromJoinClause = `
    FROM CLASS cls
    JOIN COURSE crs ON cls.course_id = crs.course_id
  `;

  const whereParts = ["cls.deleted_at IS NULL"];
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

  const countSql = `
    SELECT COUNT(DISTINCT cls.class_id) as total 
    ${fromJoinClause}
    ${whereClause}
  `;
  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause,
    fromJoinClause,
    whereClause,
    groupClause: "", // Không dùng GROUP BY vì quan hệ lớp - môn học là 1-1
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

const findById = async (classId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      cls.class_id,
      cls.class_code,
      crs.course_id,
      crs.course_name,
      cls.start_date,
      cls.end_date,
      cls.max_students,
      cls.class_status,
      cls.created_at,
      cls.updated_at
    FROM CLASS cls
    JOIN COURSE crs ON cls.course_id = crs.course_id
    WHERE cls.class_id = ? AND cls.deleted_at IS NULL;
    `,
    [classId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (classData, connection = db) => {
  const data = objectToSnakeCase(classData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO CLASS (${fieldClause})
    VALUES (${placeholderClause});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (classId, classData, connection = db) => {
  const data = objectToSnakeCase(classData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) return findById(classId, connection);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE CLASS
    SET ${setClause}
    WHERE class_id = ? AND deleted_at IS NULL
  `;

  await connection.query(sql, [...values, classId]);
  return findById(classId, connection);
};

const remove = async (classId, connection = db) => {
  const status = CLASS_STATUS.DELETED;
  const deletedAt = new Date();

  const sql = `
    UPDATE CLASS
    SET class_status = ?,
        deleted_at = ?
    WHERE class_id = ? AND deleted_at IS NULL
  `;

  await connection.query(sql, [status, deletedAt, classId]);

  return {
    classId,
    classStatus: status,
    deletedAt,
  };
};

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};