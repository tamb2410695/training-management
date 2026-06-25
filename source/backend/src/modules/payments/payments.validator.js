const AppError = require("../../utils/errors");
const { PAYMENT_FIELDS } = require("./payments.constants");
const { PAYMENT_STATUS } = require("../../constants");

const validateProcessPayment = (req, res, next) => {
  const paymentId = req.params.id;
  const { paymentStatus, paymentMethod, transactionCode } = req.body;

  if (!Number.isInteger(Number(paymentId)) || Number(paymentId) <= 0) {
    return next(new AppError.BadRequestError("Payment ID in params must be a valid positive integer"));
  }

  if (!paymentStatus || !paymentMethod) {
    return next(new AppError.BadRequestError("Missing required fields: paymentStatus and paymentMethod are required"));
  }

  const validStatuses = Object.values(PAYMENT_STATUS);
  if (!validStatuses.includes(paymentStatus)) {
    return next(new AppError.BadRequestError(`Invalid paymentStatus. Must be one of: ${validStatuses.join(", ")}`));
  }

  if (typeof paymentMethod !== "string" || paymentMethod.trim().length === 0 || paymentMethod.length > 50) {
    return next(new AppError.BadRequestError("paymentMethod must be a string between 1 and 50 characters"));
  }

  if (transactionCode && (typeof transactionCode !== "string" || transactionCode.length > 100)) {
    return next(new AppError.BadRequestError("transactionCode must be a string up to 100 characters"));
  }

  if (paymentStatus === PAYMENT_STATUS.FULLY_PAID && !transactionCode) {
    return next(new AppError.BadRequestError("transactionCode is required when payment status is FULLY_PAID"));
  }

  const cleanBody = {};
  PAYMENT_FIELDS.BODY.UPDATE_STATUS.forEach((field) => {
    if (req.body[field] !== undefined) {
      cleanBody[field] = req.body[field];
    }
  });
  req.body = cleanBody;

  next();
};

const validateQuery = (req, res, next) => {
  const allowedKeys = PAYMENT_FIELDS.QUERY.ALLOWED_KEYS;
  
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

module.exports = {
  validateProcessPayment,
  validateQuery,
};