const { UnauthorizedError } = require("@/utils/errors");

const { verifyAccessToken } = require("@/utils/security/jwtUtil");

const { ERROR_MESSAGES } = require("@/constants");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError(
        ERROR_MESSAGES.UNAUTHORIZED || "Unauthorized",
      );
    }

    const token = authHeader.slice(7).trim();

    if (!token) {
      throw new UnauthorizedError(
        ERROR_MESSAGES.UNAUTHORIZED || "Unauthorized",
      );
    }

    const decoded = verifyAccessToken(token);

    if (!decoded || !decoded.accountId) {
      throw new UnauthorizedError(
        ERROR_MESSAGES.UNAUTHORIZED || "Unauthorized",
      );
    }

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return next(error);
    }

    return next(
      new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED || "Unauthorized"),
    );
  }
};

module.exports = {
  authenticate,

  authGuard: authenticate,
};
