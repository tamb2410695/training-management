const db = require("../../config/database");
const { STUDENT_FIELDS, STUDENT_MAPS } = require("./students.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");

/**
 * Tìm kiếm nâng cao danh sách sinh viên (phân trang, lọc, tìm kiếm, sắp xếp)
 * Kết hợp thông tin từ bảng ACCOUNT liên kết
 */
const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    gender,
    studentStatus,
    accountId,
  } = query;

  const searchableFields = STUDENT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = STUDENT_FIELDS.QUERY.SORTABLE;
  const searchMap = STUDENT_MAPS.SEARCH;
  const sortMap = STUDENT_MAPS.SORT;
  const filterMap = STUDENT_MAPS.FILTER;

  // Tổng hợp bộ lọc động từ Query Params
  const filters = {};
  if (gender) filters.gender = gender;
  if (studentStatus) filters.studentStatus = studentStatus;
  if (accountId) filters.accountId = accountId;

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

  const whereParts = ["(acc.deleted_at IS NULL OR stu.account_id IS NULL)"];
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

  // Đếm tổng số bản ghi thỏa mãn điều kiện lọc
  const countSql = `
    SELECT COUNT(*) as total 
    ${fromJoinClause}
    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  // Xây dựng câu truy vấn dữ liệu động
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
 * Tìm kiếm hồ sơ sinh viên bằng ID
 */
const findById = async (studentId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      stu.student_id, stu.account_id, stu.student_code, stu.full_name, stu.gender,
      stu.date_of_birth, stu.phone, stu.address, stu.personal_email,
      stu.student_status, stu.created_at, stu.updated_at,
      acc.username, acc.email AS account_email, acc.account_status
    FROM STUDENT stu
    LEFT JOIN ACCOUNT acc ON stu.account_id = acc.account_id
    WHERE stu.student_id = ? AND (acc.deleted_at IS NULL OR stu.account_id IS NULL)
    `,
    [studentId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

/**
 * Tìm kiếm hồ sơ sinh viên dựa vào mã sinh viên (Kiểm tra trùng lặp)
 */
const findByCode = async (studentCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT stu.student_id, stu.student_code, stu.full_name
    FROM STUDENT stu
    WHERE stu.student_code = ?
    `,
    [studentCode],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

/**
 * Tìm kiếm hồ sơ sinh viên dựa theo Account ID liên kết (Ràng buộc quan hệ 1-1)
 */
const findByAccountId = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT stu.student_id, stu.student_code, stu.full_name
    FROM STUDENT stu
    WHERE stu.account_id = ?
    `,
    [accountId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

/**
 * Tạo mới hồ sơ sinh viên
 */
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

/**
 * Cập nhật thông tin hồ sơ sinh viên
 */
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

/**
 * Xóa vật lý hồ sơ sinh viên khỏi cơ sở dữ liệu
 */
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
  findByAccountId,
  create,
  update,
  remove,
};