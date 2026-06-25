const ROLES = require("../../../constants/roles");

const ACCOUNT_STATUS = require("../../../constants/accountStatus");

const validateAccountStatus = (req, res, next) => {
  const { account_status } = req.body;
  if(!account_status) {
    throw new Error("STATUS_IS_REQUIRED");
  }

  const isValidStatus = Object.values(ACCOUNT_STATUS).includes(account_status);
  if(!isValidStatus) {
    throw new Error("INVALID_STATUS");
  }
  
  next();
};

module.exports = validateAccountStatus;
