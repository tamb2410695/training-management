const db = require("../../config/database");
const { CLASS_STATUS } = require("../../constants");
const { CLASS_FIELDS } = require("./classes.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, classStatus } = query;
  const searchableFields = CLASS_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = CLASS_FIELDS.QUERY.SORTABLE;
  
  const filters = {};
  if (classStatus) filters.classStatus = classStatus;

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
      c.class_id,
      c.class_code,
      co.course_id,
      co.course_name,
      i.instructor_id,
      i.full_name AS instructor_name,
      c.start_date,
      c.end_date,
      c.max_students,
      c.class_status,
      c.created_at,
      c.updated_at
  `;

  const fromJoinClause = `
    FROM CLASS c
    JOIN COURSE co ON c.course_id = co.course_id
    JOIN INSTRUCTOR i ON c.instructor_id = i.instructor_id
  `;

  let whereClause = ` WHERE c.deleted_at IS NULL`;
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

const findById = async (classId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      c.class_id,
      c.class_code,
      co.course_id,
      co.course_name,
      i.instructor_id,
      i.full_name AS instructor_name,
      c.start_date,
      c.end_date,
      c.max_students,
      c.class_status,
      c.created_at,
      c.updated_at
    FROM CLASS c
    JOIN COURSE co ON c.course_id = co.course_id
    JOIN INSTRUCTOR i ON c.instructor_id = i.instructor_id
    WHERE c.class_id = ? AND c.deleted_at IS NULL;
    `,
    [classId],
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const create = async (classData, connection = db) => {
  const data = objectToSnakeCase(classData);
  const fields = Object.keys(data);
  const values = Object.values(data);
  
  const placeholders = fields.map(() => "?").join(", ");
  const sql = `
    INSERT INTO CLASS (${fields.join(", ")})
    VALUES (${placeholders});
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