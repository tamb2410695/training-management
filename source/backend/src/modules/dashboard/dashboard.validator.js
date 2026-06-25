const AppError = require("../../utils/errors");
const { DASHBOARD_FIELDS } = require("./dashboard.constants");

const validateOverviewQuery = (req, res, next) => {
  const { period } = req.query;

  if (period && !DASHBOARD_FIELDS.QUERY.PERIODS.includes(period)) {
    return next(new AppError.BadRequestError(
      `Invalid period. Must be one of: ${DASHBOARD_FIELDS.QUERY.PERIODS.join(", ")}`
    ));
  }

  next();
};

module.exports = {
  validateOverviewQuery,
};