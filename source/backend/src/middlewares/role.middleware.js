const AppError = require("../utils/errors");
const { throwIf } = require("../utils/helpers");

const { HTTP_STATUS, ERROR_MESSAGES } = require("../constants");

const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    try {
      throwIf(!req.user, AppError.UnauthorizedError, ERROR_MESSAGES.UNAUTHORIZED);

      const { roleName } = req.user;

      throwIf(
        !allowedRoles.includes(roleName),
        AppError.ForbiddenError,
        ERROR_MESSAGES.FORBIDDEN,
      );

      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  authorize,
};
