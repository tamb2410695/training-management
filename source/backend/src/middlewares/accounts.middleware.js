const { ValidationError } = require("../utils/errors/index");
const { throwIf } = require("../utils/helpers/index");

const { HTTP_STATUS, ERROR_MESSAGES } = require("../constants");
const {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
} = require("../modules/accounts/accounts.validator");

const validateGetListMiddleware = (req, res, next) => {
  try {
    const filters = validateGetList(req.query);
    req.query = filters;
    next();
  } catch (error) {
    next(error);
  }
};

const validateGetByIdMiddleware = (req, res, next) => {
  try {
    const accountId = validateGetById(req.params);
    req.params.id = accountId;
    next();
  } catch (error) {
    next(error);
  }
};

const validateCreateMiddleware = (req, res, next) => {
  try {
    const accountData = validateCreate(req.body);
    req.body = accountData;
    next();
  } catch (error) {
    next(error);
  }
};

const validateUpdateMiddleware = (req, res, next) => {
  try {
    const { accountId, accountData } = validateUpdate(req.params, req.body);
    req.params.id = accountId;
    req.body = accountData;
    next();
  } catch (error) {
    next(error);
  }
};

const validatePartialUpdateMiddleware = (req, res, next) => {
  try {
    const { accountId, accountData } = validatePartialUpdate(
      req.params,
      req.body,
    );
    req.params.id = accountId;
    req.body = accountData;
    next();
  } catch (error) {
    next(error);
  }
};

const validateRemoveMiddleware = (req, res, next) => {
  try {
    const accountId = validateRemove(req.params);
    req.params.id = accountId;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateGetListMiddleware,
  validateGetByIdMiddleware,
  validateCreateMiddleware,
  validateUpdateMiddleware,
  validatePartialUpdateMiddleware,
  validateRemoveMiddleware,
};
