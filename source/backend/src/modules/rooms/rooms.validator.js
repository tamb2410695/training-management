const AppError = require("../../utils/errors");
const { ERROR_MESSAGES } = require("../../constants"); // Thêm ROOM_STATUS từ constants nếu có
const { ROOM_FIELDS } = require("./rooms.constants");

const { formatNumericId } = require("../../utils/formatters");
const { pickFields, sanitizeFields, hasField, throwIf } = require("../../utils/helpers");

const {
  validateId,
  validatePagination,
  validateEnum,
  validateAllowedFields,
  validateRequiredFields,
} = require("../../utils/validators");

// Trạng thái phòng học trích xuất từ schema SQL: CHECK (room_status IN ('AVAILABLE', 'MAINTENANCE'))
const ALLOWED_ROOM_STATUS = ["AVAILABLE", "MAINTENANCE"];

// =========================================================================
// HÀM KIỂM TRA ĐỊNH DẠNG CÁC TRƯỜNG CỦA ROOM
// =========================================================================
const validateRoomFormats = (roomData) => {
  if (!roomData) return;

  if (hasField(roomData, "capacity")) {
    const cap = Number(roomData.capacity);
    if (isNaN(cap) || cap < 0) {
      throw AppError.BadRequestError("Capacity must be a non-negative number");
    }
  }

  if (hasField(roomData, "roomStatus")) {
    validateEnum(roomData.roomStatus, ALLOWED_ROOM_STATUS, "roomStatus");
  }
};

// =========================================================================
// CÁC HÀM VALIDATE CHÍNH
// =========================================================================

const validateGetList = (query) => {
  validateAllowedFields(query, ROOM_FIELDS.QUERY.ALLOWED_KEYS);
  
  const queryData = sanitizeFields(
    pickFields(query, ROOM_FIELDS.QUERY.ALLOWED_KEYS)
  );

  if (hasField(queryData, "page") || hasField(queryData, "limit")) {
    validatePagination(queryData.page, queryData.limit);
  }

  if (hasField(queryData, "roomStatus")) {
    validateEnum(queryData.roomStatus, ALLOWED_ROOM_STATUS, "roomStatus");
  }

  return queryData;
};

const validateGetById = (params) => {
  const roomId = formatNumericId(params.id);
  validateId(roomId);
  return roomId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, ROOM_FIELDS.BODY.CREATE);
  
  const roomData = sanitizeFields(
    pickFields(body, ROOM_FIELDS.BODY.CREATE)
  );
  
  validateRequiredFields(roomData, ROOM_FIELDS.REQUIRED.CREATE);
  validateRoomFormats(roomData);

  return roomData;
};

const validateUpdate = (params, body) => {
  const roomId = formatNumericId(params.id);
  validateId(roomId);

  validateAllowedFields(body, ROOM_FIELDS.BODY.UPDATE);
  
  const roomData = sanitizeFields(
    pickFields(body, ROOM_FIELDS.BODY.UPDATE)
  );

  // Đối với PUT, yêu cầu tất cả các trường cập nhật của ROOM_FIELDS.BODY.UPDATE phải được gửi lên
  // Lưu ý: Nếu hệ thống cho phép PUT thiếu trường, bạn có thể cân nhắc đổi thành validateRequiredFields linh hoạt hơn
  validateRequiredFields(roomData, ROOM_FIELDS.BODY.UPDATE);

  throwIf(
    !roomData || Object.keys(roomData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS || "No valid fields provided"
  );

  validateRoomFormats(roomData);

  return {
    roomId,
    roomData,
  };
};

const validatePartialUpdate = (params, body) => {
  const roomId = formatNumericId(params.id);
  validateId(roomId);

  validateAllowedFields(body, ROOM_FIELDS.BODY.UPDATE);
  
  const roomData = sanitizeFields(
    pickFields(body, ROOM_FIELDS.BODY.UPDATE)
  );

  throwIf(
    !roomData || Object.keys(roomData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS || "No valid fields provided"
  );

  validateRoomFormats(roomData);

  return {
    roomId,
    roomData,
  };
};

const validateAvailability = (req) => {
  // 1. Validate ID phòng từ params
  const roomId = formatNumericId(req.params.id);
  validateId(roomId);

  const queryData = sanitizeFields(
    pickFields(req.query, ["checkDate", "startTime", "endTime"])
  );


  return {
    roomId,
    queryData
  };
};

const validateRemove = (params) => {
  const roomId = formatNumericId(params.id);
  validateId(roomId);
  return roomId;
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
};