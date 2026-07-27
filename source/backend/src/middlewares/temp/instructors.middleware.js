const { ValidationError } = require("../../utils/errors/index");
const { throwIf } = require("../../utils/helpers/index");

const { HTTP_STATUS, ERROR_MESSAGES } = require("../../constants");
const instructorsValidator = require("../modules/instructors/instructors.validator");

const validateGetListMiddleware = (req, res, next) => {
  try {
    const queryData = instructorsValidator.validateGetList(req.query);
    req.query = queryData;
    next();
  } catch (error) {
    next(error);
  }
};

const validateGetByIdMiddleware = (req, res, next) => {
  try {
    const instructorId = instructorsValidator.validateGetById(req.params);
    req.params.id = instructorId;
    next();
  } catch (error) {
    next(error);
  }
};

const validateCreateMiddleware = (req, res, next) => {
  try {
    const { accountData, instructorData } = instructorsValidator.validateCreate(req.body);
    req.body = { accountData, instructorData };
    next();
  } catch (error) {
    next(error);
  }
};

const validateUpdateMiddleware = (req, res, next) => {
  try {
    const { instructorId, accountData, instructorData } = instructorsValidator.validateUpdate(
      req.params,
      req.body,
    );
    req.params.id = instructorId;
    req.body = { accountData, instructorData };
    next();
  } catch (error) {
    next(error);
  }
};

const validatePartialUpdateMiddleware = (req, res, next) => {
  try {
    const { instructorId, accountData, instructorData } = instructorsValidator.validateUpdate(
      req.params,
      req.body,
    );
    req.params.id = instructorId;
    req.body = { accountData, instructorData };
    next();
  } catch (error) {
    next(error);
  }
};

const validateRemoveMiddleware = (req, res, next) => {
  try {
    const instructorId = instructorsValidator.validateRemove(req.params);
    req.params.id = instructorId;
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
