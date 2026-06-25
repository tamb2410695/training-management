const AppError = require("../../utils/errors");
const { CERTIFICATE_FIELDS } = require("./certificates.constants");
const { CERTIFICATE_STATUS } = require("../../constants"); // 'ISSUED', 'REVOKED'

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!id || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    return next(new AppError.BadRequestError("Certificate ID must be a valid positive integer"));
  }
  next();
};

const validateQuery = (req, res, next) => {
  const allowedKeys = CERTIFICATE_FIELDS.QUERY.ALLOWED_KEYS;
  const cleanQuery = {};

  Object.keys(req.query).forEach((key) => {
    if (allowedKeys.includes(key)) {
      cleanQuery[key] = req.query[key];
    }
  });

  if (cleanQuery.page) cleanQuery.page = Math.max(1, parseInt(cleanQuery.page, 10) || 1);
  if (cleanQuery.limit) cleanQuery.limit = Math.max(1, parseInt(cleanQuery.limit, 10) || 10);

  if (cleanQuery.certificateStatus) {
    const validStatuses = ["ISSUED", "REVOKED"];
    if (!validStatuses.includes(cleanQuery.certificateStatus)) {
      return next(new AppError.BadRequestError(`Invalid filter status. Must be one of: ${validStatuses.join(", ")}`));
    }
  }

  req.query = cleanQuery;
  next();
};

const validateCreate = (req, res, next) => {
  const { enrollmentId } = req.body;

  if (!enrollmentId) {
    return next(new AppError.BadRequestError("Missing required field: enrollmentId"));
  }

  if (!Number.isInteger(Number(enrollmentId)) || Number(enrollmentId) <= 0) {
    return next(new AppError.BadRequestError("enrollmentId must be a valid positive integer"));
  }

  req.body = { enrollmentId };
  next();
};

const validateUpdateStatus = (req, res, next) => {
  const { certificateStatus } = req.body;

  if (!certificateStatus) {
    return next(new AppError.BadRequestError("Missing required field: certificateStatus"));
  }

  const validStatuses = ["ISSUED", "REVOKED"];
  if (!validStatuses.includes(certificateStatus)) {
    return next(new AppError.BadRequestError(`Invalid certificateStatus. Must be one of: ${validStatuses.join(", ")}`));
  }

  req.body = { certificateStatus };
  next();
};

module.exports = {
  validateId,
  validateQuery,
  validateCreate,
  validateUpdateStatus,
};