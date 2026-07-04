const db = require("../../config/database");
const { DOCUMENT_FIELDS, DOCUMENT_MAPS } = require("./documents.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    courseId,
    category,
    documentStatus,
    isVisible,
  } = query;

  const searchableFields = DOCUMENT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = DOCUMENT_FIELDS.QUERY.SORTABLE;
  const searchMap = DOCUMENT_MAPS.SEARCH;
  const sortMap = DOCUMENT_MAPS.SORT;
  const filterMap = DOCUMENT_MAPS.FILTER;

  const filters = {};
  if (courseId) filters.courseId = courseId;
  if (category) filters.category = category;
  if (documentStatus) filters.documentStatus = documentStatus;
  if (isVisible !== undefined) filters.isVisible = isVisible;

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
      doc.document_id,
      doc.document_code,
      doc.course_id,
      crs.course_name,
      doc.title,
      doc.file_path,
      doc.original_name,
      doc.stored_name,
      doc.mime_type,
      doc.extension,
      doc.file_size,
      doc.document_description,
      doc.category,
      doc.is_visible,
      doc.document_status,
      doc.uploaded_by_staff_id,
      stf.full_name AS uploader_name,
      doc.uploaded_at,
      doc.updated_at
  `;

  const fromJoinClause = `
    FROM DOCUMENT doc
    INNER JOIN COURSE crs ON doc.course_id = crs.course_id
    INNER JOIN STAFF_PROFILE stf ON doc.uploaded_by_staff_id = stf.staff_id
  `;
  
  const whereParts = ["doc.deleted_at IS NULL"];
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
    SELECT COUNT(doc.document_id) as total 
    ${fromJoinClause}
    ${whereClause}
  `;

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

const findById = async (documentId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      doc.document_id, doc.document_code, doc.course_id, crs.course_name,
      doc.title, doc.file_path, doc.original_name, doc.stored_name,
      doc.mime_type, doc.extension, doc.file_size, doc.document_description,
      doc.category, doc.is_visible, doc.document_status, doc.uploaded_by_staff_id,
      stf.full_name AS uploader_name, doc.uploaded_at, doc.updated_at
    FROM DOCUMENT doc
    INNER JOIN COURSE crs ON doc.course_id = crs.course_id
    INNER JOIN STAFF_PROFILE stf ON doc.uploaded_by_staff_id = stf.staff_id
    WHERE doc.document_id = ? AND doc.deleted_at IS NULL
    `,
    [documentId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const findDeletedById = async (documentId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      doc.document_id, doc.document_code, doc.course_id, doc.title,
      doc.document_status, doc.uploaded_at, doc.updated_at, doc.deleted_at
    FROM DOCUMENT doc
    WHERE doc.document_id = ? AND doc.deleted_at IS NOT NULL
    `,
    [documentId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const create = async (documentData, connection = db) => {
  const data = objectToSnakeCase(documentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO DOCUMENT (${fieldClause})
    VALUES (${placeholderClause});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (documentId, documentData, connection = db) => {
  const data = objectToSnakeCase(documentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE DOCUMENT
    SET ${setClause}
    WHERE document_id = ? AND deleted_at IS NULL
  `;

  await connection.query(sql, [...values, documentId]);
  return findById(documentId, connection);
};

const softDelete = async (documentId, connection = db) => {
  const status = "DELETED";
  const deletedAt = new Date();

  await connection.query(
    `
    UPDATE DOCUMENT
    SET document_status = ?,
        deleted_at = ?
    WHERE document_id = ? AND deleted_at IS NULL
    `,
    [status, deletedAt, documentId],
  );

  return {
    documentId,
    documentStatus: status,
    deletedAt: deletedAt,
  };
};

const restore = async (documentId, connection = db) => {
  await connection.query(
    `
    UPDATE DOCUMENT 
    SET 
      deleted_at = NULL, 
      document_status = 'AVAILABLE'
    WHERE document_id = ? AND deleted_at IS NOT NULL
    `,
    [documentId],
  );

  return findById(documentId, connection);
};

module.exports = {
  find,
  findById,
  findDeletedById,
  create,
  update,
  softDelete,
  restore,
};