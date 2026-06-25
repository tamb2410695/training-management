const ROLES = require("../../../constants/roles");

const ACCOUNT_STATUS = require("../../../constants/accountStatus");

const validateAccountQuery = (req, res, next) => {
  const { page, limit, role, role_ne, status } = req.query;

  if (page !== undefined && page !== null) {
    const p = Number(page);
    if (!Number.isInteger(p) || p < 1) {
      throw new Error("INVALID_PAGE");
    }
  }

  if (limit !== undefined && limit !== null) {
    const l = Number(limit);
    if (!Number.isInteger(l) || l < 1 || l > 100) {
      throw new Error("INVALID_LIMIT");
    }
  }

  if (role && !Object.values(ROLES).includes(role)) {
    throw new Error("INVALID_ROLE");
  }

  if (role_ne && !Object.values(ROLES).includes(role_ne)) {
    throw new Error("INVALID_ROLE");
  }

  if (status && !Object.values(ACCOUNT_STATUS).includes(status)) {
    throw new Error("INVALID_ACCOUNT_STATUS");
  }

  next();
};

module.exports = validateAccountQuery;
