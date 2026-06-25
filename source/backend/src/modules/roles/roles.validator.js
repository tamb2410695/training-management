const AppError = require("../../utils/errors");
const { ROLE_FIELDS } = require("./roles.constants");
const { ROLES } = require("../../constants"); // Ví dụ: { ADMIN: 'ADMIN', INSTRUCTOR: 'INSTRUCTOR', STUDENT: 'STUDENT' }

const validateId = (req, res, next) => {
  const { roleId } = req.params;
  if (!roleId || !Number.isInteger(Number(roleId)) || Number(roleId) <= 0) {
    return next(new AppError.BadRequestError("Role ID must be a valid positive integer"));
  }
  next();
};

const validateQuery = (req, res, next) => {
  const allowedKeys = ROLE_FIELDS.QUERY.ALLOWED_KEYS;
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
  const { roleName, roleDescription } = req.body;

  if (!roleName) {
    return next(new AppError.BadRequestError("Missing required field: roleName"));
  }

  const validRoles = Object.values(ROLES || { ADMIN: 'ADMIN', INSTRUCTOR: 'INSTRUCTOR', STUDENT: 'STUDENT' });
  if (!validRoles.includes(roleName)) {
    return next(new AppError.BadRequestError(`Invalid roleName. Must be one of: ${validRoles.join(", ")}`));
  }

  req.body = { 
    roleName, 
    roleDescription: roleDescription || "" 
  };
  next();
};

const validateUpdate = (req, res, next) => {
  const { roleName, roleDescription } = req.body;

  if (roleName) {
    const validRoles = Object.values(ROLES || { ADMIN: 'ADMIN', INSTRUCTOR: 'INSTRUCTOR', STUDENT: 'STUDENT' });
    if (!validRoles.includes(roleName)) {
      return next(new AppError.BadRequestError(`Invalid roleName. Must be one of: ${validRoles.join(", ")}`));
    }
  }

  const cleanBody = {};
  ROLE_FIELDS.BODY.UPDATE.forEach((field) => {
    if (req.body[field] !== undefined) cleanBody[field] = req.body[field];
  });

  if (Object.keys(cleanBody).length === 0) {
    return next(new AppError.BadRequestError("No valid fields provided for update"));
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