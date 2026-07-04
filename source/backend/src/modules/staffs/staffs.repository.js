const db = require("../../../config/database");
const { STAFF_FIELDS, STAFF_MAPS } = require("./staffs.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../../utils/helpers/index");

const queryBuilder = require("../../../utils/query/queryBuilders");

/**
 * Tìm kiếm danh sách nhân sự nâng cao (kèm thông tin tài khoản, phân trang, lọc và sắp xếp)
 */
const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    gender,
    contractType,
    staffStatus,
    departmentId,
  } = query;

  const searchableFields = STAFF_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = STAFF_FIELDS.QUERY.SORTABLE;
  const searchMap = STAFF_MAPS.SEARCH;
  const sortMap = STAFF_MAPS.SORT;
  const filterMap = STAFF_MAPS.FILTER;

  // Tổng hợp các bộ lọc từ Query Params
  const filters = {};
  if (gender) filters.gender = gender;
  if (contractType) filters.contractType = contractType;
  if (staffStatus) filters.staffStatus = staffStatus;
  if (departmentId) filters.departmentId = departmentId;

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
      sp.staff_id,
      sp.account_id,
      sp.staff_code,
      sp.full_name,
      sp.gender,
      sp.date_of_birth,
      sp.identity_card,
      sp.phone,
      sp.personal_email,
      sp.address,
      sp.academic_rank,
      sp.hire_date,
      sp.contract_type,
      sp.staff_status,
      sp.created_at,
      sp.updated_at,
      acc.username,
      acc.email AS account_email,
      acc.account_status,
      GROUP_CONCAT(DISTINCT dpt.department_name) as department_names
  `;

  // Từ cấu trúc STAFF_MAPS: join qua ACCOUNT và LEFT JOIN qua STAFF_DEPARTMENT/DEPARTMENT để lọc theo phòng ban
  const fromJoinClause = `
    FROM STAFF_PROFILE sp
    JOIN ACCOUNT acc ON sp.account_id = acc.account_id
    LEFT JOIN STAFF_DEPARTMENT sd ON sp.staff_id = sd.staff_id
    LEFT JOIN DEPARTMENT dpt ON sd.department_id = dpt.department_id
  `;

  const whereParts = ["acc.deleted_at IS NULL"]; // Chỉ lấy nhân viên có tài khoản chưa bị xóa tạm thời
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
  const groupClause = `GROUP BY sp.staff_id`;

  // Câu lệnh đếm số bản ghi thực tế
  const countSql = `
    SELECT COUNT(DISTINCT sp.staff_id) as total 
    ${fromJoinClause}
    ${whereClause}
  `;

  const [countRows] = await connection.query(countSql, params);
  const totalRecords = countRows[0]?.total || 0;

  // Xây dựng chuỗi truy vấn động dữ liệu
  let dataSql = queryBuilder.buildSelectQuery({
    selectClause,
    fromJoinClause,
    whereClause,
    groupClause,
    sortClause,
  });

  dataSql += ` LIMIT ? OFFSET ?`;
  const dataParams = [...params, pagination.limit, pagination.offset];

  const [rows] = await connection.query(dataSql, dataParams);

  // Định dạng mảng chuỗi danh sách phòng ban trả về cho sạch sẽ
  const camelCasedRows = arrayToCamelCase(rows);
  const formattedStaffs = camelCasedRows.map((staff) => ({
    ...staff,
    departmentNames: staff.departmentNames ? staff.departmentNames.split(",") : [],
  }));

  return {
    data: formattedStaffs,
    pagination: {
      totalRecords,
      limit: pagination.limit,
      offset: pagination.offset,
      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

/**
 * Tìm kiếm hồ sơ nhân sự theo ID
 */
const findById = async (staffId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      sp.staff_id, sp.account_id, sp.staff_code, sp.full_name, sp.gender,
      sp.date_of_birth, sp.identity_card, sp.phone, sp.personal_email,
      sp.address, sp.academic_rank, sp.hire_date, sp.contract_type,
      sp.staff_status, sp.created_at, sp.updated_at,
      acc.username, acc.email AS account_email, acc.account_status,
      GROUP_CONCAT(DISTINCT dpt.department_name) as department_names
    FROM STAFF_PROFILE sp
    JOIN ACCOUNT acc ON sp.account_id = acc.account_id
    LEFT JOIN STAFF_DEPARTMENT sd ON sp.staff_id = sd.staff_id
    LEFT JOIN DEPARTMENT dpt ON sd.department_id = dpt.department_id
    WHERE sp.staff_id = ? AND acc.deleted_at IS NULL
    GROUP BY sp.staff_id
    `,
    [staffId],
  );

  if (!rows || rows.length === 0) return null;
  
  const staff = objectToCamelCase(rows[0]);
  return {
    ...staff,
    departmentNames: staff.departmentNames ? staff.departmentNames.split(",") : [],
  };
};

/**
 * Tìm kiếm hồ sơ nhân sự theo Mã nhân viên (Kiểm tra duy nhất)
 */
const findByCode = async (staffCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT sp.staff_id, sp.staff_code, sp.full_name
    FROM STAFF_PROFILE sp
    WHERE sp.staff_code = ?
    `,
    [staffCode],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

/**
 * Tìm kiếm hồ sơ nhân sự dựa theo Account ID liên kết
 */
const findByAccountId = async (accountId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT sp.staff_id, sp.staff_code, sp.full_name
    FROM STAFF_PROFILE sp
    WHERE sp.account_id = ?
    `,
    [accountId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

/**
 * Khởi tạo hồ sơ nhân viên mới
 */
const create = async (staffData, connection = db) => {
  const data = objectToSnakeCase(staffData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO STAFF_PROFILE (${fieldClause})
    VALUES (${placeholderClause});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

/**
 * Cập nhật thông tin hồ sơ nhân viên
 */
const update = async (staffId, staffData, connection = db) => {
  const data = objectToSnakeCase(staffData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE STAFF_PROFILE
    SET ${setClause}
    WHERE staff_id = ?
  `;

  await connection.query(sql, [...values, staffId]);
  return findById(staffId, connection);
};

/**
 * Xóa vật lý hồ sơ nhân viên khỏi cơ sở dữ liệu
 */
const remove = async (staffId, connection = db) => {
  await connection.query(
    `
    DELETE FROM STAFF_PROFILE
    WHERE staff_id = ?
    `,
    [staffId],
  );

  return {
    staffId,
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