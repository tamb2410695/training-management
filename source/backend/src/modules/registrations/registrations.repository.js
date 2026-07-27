const db = require("../../config/database");
const { REGISTRATION_FIELDS, REGISTRATION_MAPS } = require("./registrations.constants");
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
    registrationStatus,
    studentId,
  } = query;

  const searchableFields = REGISTRATION_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = REGISTRATION_FIELDS.QUERY.SORTABLE;
  const searchMap = REGISTRATION_MAPS.SEARCH;
  const sortMap = REGISTRATION_MAPS.SORT;
  const filterMap = REGISTRATION_MAPS.FILTER;

  
  const filters = {};
  if (registrationStatus) filters.registrationStatus = registrationStatus;
  if (studentId) filters.studentId = studentId;

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
      reg.registration_id,
      reg.registration_code,
      reg.full_name,
      reg.gender,
      reg.date_of_birth,
      reg.phone,
      reg.personal_email,
      reg.address,
      reg.registration_status,
      reg.student_id,
      reg.created_at,
      reg.updated_at
  `;

  const fromJoinClause = `
    FROM REGISTRATION reg
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

const findById = async (registrationId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT
      reg.registration_id,
      reg.registration_code,
      reg.full_name,
      reg.gender,
      reg.date_of_birth,
      reg.phone,
      reg.personal_email,
      reg.address,
      reg.registration_status,
      reg.student_id,
      reg.created_at,
      reg.updated_at
    FROM REGISTRATION reg
    WHERE reg.registration_id = ?
    `,
    [registrationId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const findByContact = async (email, phone, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT reg.registration_id,
    reg.registration_code,
    reg.registration_status
    FROM REGISTRATION reg
    WHERE reg.personal_email = ? OR reg.phone = ?
    ORDER BY reg.created_at DESC LIMIT 1
    `,
    [email, phone],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

const create = async (registrationData, connection = db) => {
  const data = objectToSnakeCase(registrationData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO REGISTRATION (${fieldClause})
    VALUES (${placeholderClause});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

const update = async (registrationId, registrationData, connection = db) => {
  const data = objectToSnakeCase(registrationData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE REGISTRATION
    SET ${setClause}
    WHERE registration_id = ?
  `;

  await connection.query(sql, [...values, registrationId]);
  return findById(registrationId, connection);
};

const remove = async (registrationId, connection = db) => {
  await connection.query(
    `
    DELETE FROM REGISTRATION
    WHERE registration_id = ?
    `,
    [registrationId],
  );

  return {
    registrationId,
    deleted: true,
  };
};

module.exports = {
  find,
  findById,
  findByContact,
  create,
  update,
  remove,
};