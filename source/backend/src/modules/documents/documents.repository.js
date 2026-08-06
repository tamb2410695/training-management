const db = require("@/config/database");
const {
  arrayToCamelCase,
  objectToCamelCase,
  objectToSnakeCase,
} = require("@/utils/helpers");

const queryBuilder = require("@/utils/query/queryBuilders");

const { DOCUMENT_FIELDS, DOCUMENT_MAPS } = require("./documents.constants");

const DOCUMENT_SELECT = `
SELECT
  doc.document_id,
  doc.course_id,
  doc.uploaded_by,
  doc.document_code,
  doc.title,
  doc.description,
  doc.category,
  doc.file_path,
  doc.original_name,
  doc.stored_name,
  doc.mime_type,
  doc.extension,
  doc.file_size,
  doc.is_visible,
  doc.document_status,
  doc.created_at,
  doc.updated_at,

  crs.course_code,
  crs.course_name,

  sp.staff_code,
  sp.full_name AS uploader_name
`;

const DOCUMENT_FROM = `
FROM DOCUMENT doc
LEFT JOIN COURSE crs
  ON doc.course_id = crs.course_id
  AND crs.deleted_at IS NULL

LEFT JOIN STAFF_PROFILE sp
  ON doc.uploaded_by = sp.staff_id

LEFT JOIN ACCOUNT acc
  ON sp.account_id = acc.account_id
  AND acc.deleted_at IS NULL
`;

const find = async (query, connection = db) => {
  const searchableFields = DOCUMENT_FIELDS.QUERY.SEARCHABLE;
  const searchMap = DOCUMENT_MAPS.SEARCH;
  const sortMap = DOCUMENT_MAPS.SORT;
  const filterMap = DOCUMENT_MAPS.FILTER;

  const {
    page,
    limit,
    search,
    searchField,
    sortBy,
    sortOrder,
    courseId,
    uploadedBy,
    documentStatus,
    isVisible,
  } = query;

  const filters = {};

  if (courseId) filters.courseId = courseId;
  if (uploadedBy) filters.uploadedBy = uploadedBy;
  if (documentStatus) filters.documentStatus = documentStatus;
  if (isVisible !== undefined) filters.isVisible = isVisible;

  const queryOptions = queryBuilder.buildQueryOptions({
    page,
    limit,
    search,
    searchableFields,
    searchField,
    searchMap,
    sortBy,
    sortOrder,
    sortMap,
    filters,
    filterMap,
  });

  const { pagination, searchResult, filterResult, sortClause } = queryOptions;

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
    SELECT COUNT(*) AS total
    ${DOCUMENT_FROM}
    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);

  const totalRecords = countRows[0]?.total || 0;

  let dataSql = queryBuilder.buildSelectQuery({
    selectClause: DOCUMENT_SELECT,
    fromJoinClause: DOCUMENT_FROM,
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
      page: pagination.page,
      limit: pagination.limit,
      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

const findById = async (documentId, connection = db) => {
  const [rows] = await connection.query(
    `
    ${DOCUMENT_SELECT}
    ${DOCUMENT_FROM}

    WHERE
      doc.document_id = ?
      AND doc.deleted_at IS NULL
    `,
    [documentId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

const findByCode = async (documentCode, connection = db) => {
  const [rows] = await connection.query(
    `
    ${DOCUMENT_SELECT}
    ${DOCUMENT_FROM}

    WHERE
      doc.document_code = ?
      AND doc.deleted_at IS NULL
    `,
    [documentCode],
  );

  if (!rows.length) {
    return null;
  }

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
    VALUES (${placeholderClause})
  `;

  const [result] = await connection.query(sql, values);

  return findById(result.insertId, connection);
};

const update = async (documentId, documentData, connection = db) => {
  const data = objectToSnakeCase(documentData);

  const fields = Object.keys(data);

  if (!fields.length) {
    return findById(documentId, connection);
  }

  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");

  await connection.query(
    `
    UPDATE DOCUMENT
    SET ${setClause}
    WHERE document_id = ?
    `,
    [...values, documentId],
  );

  return findById(documentId, connection);
};

const remove = async (documentId, connection = db) => {
  const exists = await findById(documentId, connection);

  if (!exists) {
    return null;
  }

  await connection.query(
    `
    UPDATE DOCUMENT
    SET
      document_status = 'DELETED',
      deleted_at = CURRENT_TIMESTAMP
    WHERE document_id = ?
    `,
    [documentId],
  );

  return {
    documentId,
    deleted: true,
  };
};

const existsById = async (documentId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT 1
    FROM DOCUMENT
    WHERE
      document_id = ?
      AND deleted_at IS NULL
    LIMIT 1
    `,
    [documentId],
  );

  return rows.length > 0;
};

const restore = async (documentId, connection = db) => {
  await connection.query(
    `
    UPDATE DOCUMENT
    SET
      document_status = 'AVAILABLE',
      deleted_at = NULL
    WHERE document_id = ?
    `,
    [documentId],
  );

  return findById(documentId, connection);
};

const findByIdIncludeDeleted = async (documentId, connection = db) => {
  const [rows] = await connection.query(
    `
    ${DOCUMENT_SELECT}
    ${DOCUMENT_FROM}

    WHERE
      doc.document_id = ?
    `,
    [documentId],
  );

  if (!rows.length) {
    return null;
  }

  return objectToCamelCase(rows[0]);
};

module.exports = {
  find,
  findById,
  findByCode,
  create,
  update,
  remove,
  restore,
  findByIdIncludeDeleted,
  existsById,
};
