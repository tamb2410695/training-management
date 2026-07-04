const db = require("../../../config");
const { STAFF_DEPARTMENT_FIELDS, STAFF_DEPARTMENT_MAPS } = require("./departments.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../../utils/helpers/index");

const queryBuilder = require("../../../utils/query/queryBuilders");

const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    staffId,
    departmentId,
    appointmentType,
  } = query;

  const searchableFields = STAFF_DEPARTMENT_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = STAFF_DEPARTMENT_FIELDS.QUERY.SORTABLE;
  const searchMap = STAFF_DEPARTMENT_MAPS.SEARCH;
  const sortMap = STAFF_DEPARTMENT_MAPS.SORT;
  const filterMap = STAFF_DEPARTMENT_MAPS.FILTER;

  const filters = {};
  if (staffId) filters.staffId = staffId;
  if (departmentId) filters.departmentId = departmentId;
  if (appointmentType) filters.appointmentType = appointmentType;

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
      sd.staff_id,
      sd.department_id,
      sd.appointment_type,
      sd.assigned_at,
      sd.updated_at,
      sp.staff_code,
      sp.full_name AS staff_full_name,
      dpt.department_code,
      dpt.department_name
  `;

  const fromJoinClause = `
    FROM STAFF_DEPARTMENT sd
    JOIN STAFF_PROFILE sp ON sd.staff_id = sp.staff_id
    JOIN DEPARTMENT dpt ON sd.department_id = dpt.department_id
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
    data: arrayToCamelCase(rows),
    pagination: {
      totalRecords,
      limit: pagination.limit,
      offset: pagination.offset,
      totalPages: Math.ceil(totalRecords / pagination.limit),
    },
  };
};

const findWithCompositeKey = async (staffId, departmentId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      sd.staff_id,
      sd.department_id,
      sd.appointment_type,
      sd.assigned_at,
      sd.updated_at
    FROM STAFF_DEPARTMENT sd
    WHERE sd.staff_id = ? AND sd.department_id = ?
    `,
    [staffId, departmentId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const findPrimaryDepartmentByStaffId = async (staffId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      sd.staff_id,
      sd.department_id,
      sd.appointment_type,
      sd.assigned_at
    FROM STAFF_DEPARTMENT sd
    WHERE sd.staff_id = ? AND sd.appointment_type = 'PRIMARY'
    `,
    [staffId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const create = async (staffDepartmentData, connection = db) => {
  const data = objectToSnakeCase(staffDepartmentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO STAFF_DEPARTMENT (${fieldClause})
    VALUES (${placeholderClause});
  `;

  await connection.query(sql, values);
  return findWithCompositeKey(staffDepartmentData.staffId, staffDepartmentData.departmentId, connection);
};

const update = async (staffId, departmentId, staffDepartmentData, connection = db) => {
  const data = objectToSnakeCase(staffDepartmentData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE STAFF_DEPARTMENT
    SET ${setClause}
    WHERE staff_id = ? AND department_id = ?
  `;

  await connection.query(sql, [...values, staffId, departmentId]);
  return findWithCompositeKey(staffId, departmentId, connection);
};

const remove = async (staffId, departmentId, connection = db) => {
  await connection.query(
    `
    DELETE FROM STAFF_DEPARTMENT
    WHERE staff_id = ? AND department_id = ?
    `,
    [staffId, departmentId],
  );

  return {
    staffId,
    departmentId,
    unassigned: true,
  };
};

module.exports = {
  find,
  findWithCompositeKey,
  findPrimaryDepartmentByStaffId,
  create,
  update,
  remove,
};