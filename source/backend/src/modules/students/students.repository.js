const db = require("../../config/database");
const { STUDENT_FIELDS, STUDENT_MAPS, ACCOUNT_FIELDS } = require("./students.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const searchableFields = STUDENT_FIELDS.QUERY.SEARCHABLE
  const searchMap = STUDENT_MAPS.SEARCH;
  const sortMap = STUDENT_MAPS.SORT;
  const filterMap = STUDENT_MAPS.FILTER;

  const {
    page,
    limit,
    search,
    searchField,
    sortBy,
    sortOrder,
    gender,
    studentStatus,
    accountStatus,
  } = query;

  // Tổng hợp bộ lọc động từ Query Params
  const filters = {};
  if (gender) filters.gender = gender;
  if (studentStatus) filters.studentStatus = studentStatus;
  if (accountStatus) filters.accountStatus = accountStatus;

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

  const selectClause = `
    SELECT
      stu.student_id,
      stu.account_id,
      stu.student_code,
      stu.full_name,
      stu.gender,
      stu.date_of_birth,
      stu.phone,
      stu.address,
      stu.personal_email,
      stu.student_status,
      stu.created_at,
      stu.updated_at,
      acc.username,
      acc.email AS account_email,
      acc.account_status
  `;

  const fromJoinClause = `
    FROM STUDENT stu
    LEFT JOIN ACCOUNT acc ON stu.account_id = acc.account_id
  `;

  const whereParts = ["acc.deleted_at IS NULL"];
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
    SELECT COUNT(*) as total 
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
    students: arrayToCamelCase(rows),
    pagination: {
      totalRecords,
      limit: pagination.limit,
      page: pagination.page,
      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

const findById = async (studentId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      stu.student_id,
      stu.account_id,
      stu.student_code,
      stu.full_name,
      stu.gender,
      stu.date_of_birth,
      stu.phone,
      stu.address,
      stu.personal_email,
      stu.student_status,
      stu.created_at,
      stu.updated_at,
      acc.username,
      acc.email AS account_email,
      acc.account_status
    FROM STUDENT stu
    LEFT JOIN ACCOUNT acc ON stu.account_id = acc.account_id
    WHERE stu.student_id = ? AND acc.deleted_at IS NULL
    `,
    [studentId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const findByCode = async (studentCode, connection = db) => {
  const [rows] = await connection.query(
    `    
    SELECT
      stu.student_id,
      stu.account_id,
      stu.student_code,
      stu.full_name,
      stu.gender,
      stu.date_of_birth,
      stu.phone,
      stu.address,
      stu.personal_email,
      stu.student_status,
      stu.created_at,
      stu.updated_at,
      acc.username,
      acc.email AS account_email,
      acc.account_status
    FROM STUDENT stu
    LEFT JOIN ACCOUNT acc ON stu.account_id = acc.account_id
    WHERE stu.student_code = ? AND acc.deleted_at IS NULL
    `,
    [studentCode],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const findByPhone = async (phone, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      stu.student_id,
      stu.account_id,
      stu.student_code,
      stu.full_name,
      stu.gender,
      stu.date_of_birth,
      stu.phone,
      stu.address,
      stu.personal_email,
      stu.student_status,
      stu.created_at,
      stu.updated_at,
      acc.username,
      acc.email AS account_email,
      acc.account_status
    FROM STUDENT stu
    LEFT JOIN ACCOUNT acc ON stu.account_id = acc.account_id
    WHERE stu.phone = ? AND acc.deleted_at IS NULL
    `,
    [phone],
  );
  
  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const findByAccountId = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      stu.student_id,
      stu.account_id,
      stu.student_code,
      stu.full_name,
      stu.gender,
      stu.date_of_birth,
      stu.phone,
      stu.address,
      stu.personal_email,
      stu.student_status,
      stu.created_at,
      stu.updated_at,
      acc.username,
      acc.email AS account_email,
      acc.account_status
    FROM STUDENT stu
    LEFT JOIN ACCOUNT acc ON stu.account_id = acc.account_id
    WHERE stu.account_id = ? AND acc.deleted_at IS NULL
    `,
    [accountId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const create = async (studentData, connection = db) => {
  const data = objectToSnakeCase(studentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO STUDENT (${fieldClause})
    VALUES (${placeholderClause});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (studentId, studentData, connection = db) => {
  const data = objectToSnakeCase(studentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE STUDENT
    SET ${setClause}
    WHERE student_id = ?
  `;

  await connection.query(sql, [...values, studentId]);
  return findById(studentId, connection);
};

const remove = async (studentId, connection = db) => {
  await connection.query(
    `
    DELETE FROM STUDENT
    WHERE student_id = ?
    `,
    [studentId],
  );

  return {
    studentId,
    deleted: true,
  };
};

module.exports = {
  find,
  findById,
  findByCode,
  findByPhone,
  findByAccountId,
  create,
  update,
  remove,
};