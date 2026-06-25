const { HTTP_STATUS, ERROR_MESSAGES } = require("../constants");
const { validateLogin, validateRegister } = require("../modules/auth/auth.validator");
const AppError = require("../utils/errors");
const { throwIf } = require("../utils/helpers");

const { verifyAccessToken } = require("../utils/security/jwtUtil");


const jwt = require("jsonwebtoken");
const { JWT_CONFIG } = require("../constants");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError.UnauthorizedError("Access denied. No token provided."));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_CONFIG.ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError.UnauthorizedError("Invalid or expired access token"));
  }
};

module.exports = {
  authenticate,
};