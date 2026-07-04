const db = require("../../config/database");
const { ROOM_FIELDS, ROOM_MAPS } = require("./rooms.constants");
const {
  arrayToCamelCase,
  objectToSnakeCase,
  objectToCamelCase,
} = require("../../utils/helpers/index");

const queryBuilder = require("../../utils/query/queryBuilders");

/**
 * Tìm kiếm nâng cao danh sách phòng học (phân trang, lọc trạng thái, tìm kiếm, sắp xếp)
 */
const find = async (query, connection = db) => {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    roomStatus,
  } = query;

  const searchableFields = ROOM_FIELDS.QUERY.SEARCHABLE;
  const sortableFields = ROOM_FIELDS.QUERY.SORTABLE;
  const searchMap = ROOM_MAPS.SEARCH;
  const sortMap = ROOM_MAPS.SORT;
  const filterMap = ROOM_MAPS.FILTER;

  const filters = {};
  if (roomStatus) filters.roomStatus = roomStatus;

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
      rm.room_id,
      rm.room_code,
      rm.room_name,
      rm.capacity,
      rm.room_location,
      rm.room_status,
      rm.created_at,
      rm.updated_at
  `;

  const fromJoinClause = `
    FROM ROOM rm
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
 * Tìm chi tiết phòng học theo ID
 */
const findById = async (roomId, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT rm.room_id, rm.room_code, rm.room_name, rm.capacity, rm.room_location, rm.room_status, rm.created_at, rm.updated_at
    FROM ROOM rm
    WHERE rm.room_id = ?
    `,
    [roomId],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

/**
 * Tìm phòng học bằng mã code (Kiểm tra trùng lặp)
 */
const findByCode = async (roomCode, connection = db) => {
  const [rows] = await connection.query(
    `
    SELECT rm.room_id, rm.room_code, rm.room_name
    FROM ROOM rm
    WHERE rm.room_code = ?
    `,
    [roomCode],
  );

  if (!rows || rows.length === 0) return null;
  return objectToCamelCase(rows[0]);
};

/**
 * Thêm mới phòng học
 */
const create = async (roomData, connection = db) => {
  const data = objectToSnakeCase(roomData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const fieldClause = fields.join(", ");
  const placeholderClause = fields.map(() => "?").join(", ");

  const sql = `
    INSERT INTO ROOM (${fieldClause})
    VALUES (${placeholderClause});
  `;

  const [result] = await connection.query(sql, values);
  return findById(result.insertId, connection);
};

/**
 * Cập nhật thông tin phòng học
 */
const update = async (roomId, roomData, connection = db) => {
  const data = objectToSnakeCase(roomData);
  const fields = Object.keys(data);
  const values = Object.values(data);

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const sql = `
    UPDATE ROOM
    SET ${setClause}
    WHERE room_id = ?
  `;

  await connection.query(sql, [...values, roomId]);
  return findById(roomId, connection);
};

/**
 * Xóa phòng học
 */
const remove = async (roomId, connection = db) => {
  await connection.query(
    `
    DELETE FROM ROOM
    WHERE room_id = ?
    `,
    [roomId],
  );

  return {
    roomId,
    deleted: true,
  };
};

module.exports = {
  find,
  findById,
  findByCode,
  create,
  update,
  remove,
};