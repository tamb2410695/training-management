const AppError = require("../../utils/errors");
const { PERMISSION_FIELDS } = require("./permissions.constants");

const validateId = (req, res, next) => {
  const { permissionId } = req.params;
  if (!permissionId || !Number.isInteger(Number(permissionId)) || Number(permissionId) <= 0) {
    return next(new AppError.BadRequestError("Permission ID must be a valid positive integer"));
  }
  next();
};

const validateQuery = (req, res, next) => {
  const allowedKeys = PERMISSION_FIELDS.QUERY.ALLOWED_KEYS;
  const cleanQuery = {};

  Object.keys(req.query).forEach((key) => {
    if (allowedKeys.includes(key)) {
      cleanQuery[key] = req.query[key];
    }
  });

  if (cleanQuery.page) cleanQuery.page = Math.max(1, parseInt(cleanQuery.page, 10) || 1);
  if (cleanQuery.limit) cleanQuery.limit = Math.max(1, parseInt(cleanQuery.limit, 10) || 10);

  req.query = cleanQuery;
  next();
};

const validateCreate = (req, res, next) => {
  const { permissionName, permissionCode, description } = req.body;

  if (!permissionName || !permissionCode) {
    return next(new AppError.BadRequestError("Missing required fields: permissionName and permissionCode are required"));
  }

  // Chuẩn hóa mã Code quyền (Ví dụ: "manage_students" -> "MANAGE_STUDENTS")
  req.body.permissionCode = permissionCode.trim().toUpperCase();

  req.body = {
    permissionName: permissionName.trim(),
    permissionCode: req.body.permissionCode,
    description: description ? description.trim() : ""
  };
  next();
};

const validateUpdate = (req, res, next) => {
  const cleanBody = {};
  
  PERMISSION_FIELDS.BODY.UPDATE.forEach((field) => {
    if (req.body[field] !== undefined) {
      cleanBody[field] = typeof req.body[field] === 'string' ? req.body[field].trim() : req.body[field];
    }
  });

  if (Object.keys(cleanBody).length === 0) {
    return next(new AppError.BadRequestError("No valid fields provided for update"));
  }

  if (cleanBody.permissionCode) {
    cleanBody.permissionCode = cleanBody.permissionCode.toUpperCase();
  }

  req.body = cleanBody;
  next();
};

module.exports = {
  validateId,
  validateQuery,
  validateCreate,
  validateUpdate,
};