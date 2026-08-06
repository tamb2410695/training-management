const AppError = require("@/utils/errors");
const { throwIf } = require("@/utils/helpers");
const { ERROR_MESSAGES } = require("@/constants");

const authorize =
  (...allowedRoleCodes) =>
  (req, res, next) => {
    try {
      throwIf(
        !req.user,
        AppError.UnauthorizedError,
        ERROR_MESSAGES.UNAUTHORIZED,
      );

      const { roleCode } = req.user;

      throwIf(!roleCode, AppError.ForbiddenError, ERROR_MESSAGES.FORBIDDEN);

      throwIf(
        !allowedRoleCodes.includes(roleCode),
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
