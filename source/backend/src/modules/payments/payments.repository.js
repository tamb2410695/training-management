const db = require("../../config/database");
const { PAYMENT_FIELDS } = require("./payments.constants");
const { arrayToCamelCase, objectToSnakeCase, objectToCamelCase } = require("../../utils/helpers");
const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const { page, limit, search, sortBy, sortOrder, paymentStatus, paymentMethod, enrollmentId } = query;
  const searchableFields = PAYMENT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = PAYMENT_FIELDS.QUERY.SORTABLE;

  const filters = {};
  if (paymentStatus) filters.paymentStatus = paymentStatus;
  if (paymentMethod) filters.paymentMethod = paymentMethod;
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
      p.payment_id, p.payment_code, p.amount, p.payment_date, 
      p.payment_method, p.transaction_code, p.payment_status, p.created_at,
      e.enrollment_code, s.full_name AS student_name, c.class_code
  `;

  const fromJoinClause = `
    FROM PAYMENT p
    JOIN ENROLLMENT e ON p.enrollment_id = e.enrollment_id
    JOIN STUDENT s ON e.student_id = s.student_id
    JOIN CLASS c ON e.class_id = c.class_id
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

const findById = async (paymentId, connection = db) => {
  const [rows] = await connection.query(
    `SELECT * FROM PAYMENT WHERE payment_id = ?`,
    [paymentId]
  );
  return rows[0] ? objectToCamelCase(rows[0]) : null;
};

const update = async (paymentId, paymentData, connection = db) => {
  const data = objectToSnakeCase(paymentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) return findById(paymentId, connection);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `UPDATE PAYMENT SET ${setClause} WHERE payment_id = ?`;

  await connection.query(sql, [...values, paymentId]);
  return findById(paymentId, connection);
};

module.exports = {
  find,
  findById,
  update,
};