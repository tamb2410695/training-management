const {ROLES} = require("../../../constants/index");


const validateAccountIds = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("INVALID_ACCOUNT_ID");
  }

  next();
};

module.exports = validateAccountIds;
