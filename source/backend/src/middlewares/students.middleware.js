const { ValidationError } = require("../utils/errors/index");
const { throwIf } = require("../utils/helpers/index");

const { HTTP_STATUS, ERROR_MESSAGES } = require("../constants");
const studentsValidator = require("../modules/students/students.validator");

const validateGetListMiddleware = (req, res, next) => {
  try {
    const query = studentsValidator.validateGetList(req.query);
    req.query = query;
    next();
  } catch (error) {
    next(error);
  }
};

const validateGetByIdMiddleware = (req, res, next) => {
  try {
    const studentId = studentsValidator.validateGetById(req.params);
    req.params.id = studentId;
    next();
  } catch (error) {
    next(error);
  }
};

const validateCreateMiddleware = (req, res, next) => {
  try {
    const { accountData, studentData } = studentsValidator.validateCreate(req.body);
    req.body = { accountData, studentData };
    next();
  } catch (error) {
    next(error);
  }
};

const validateUpdateMiddleware = (req, res, next) => {
  try {
    const { studentId, accountData, studentData } = studentsValidator.validateUpdate(
      req.params,
      req.body,
    );
    req.params.id = studentId;
    req.body = { accountData, studentData };
    next();
  } catch (error) {
    next(error);
  }
};

const validatePartialUpdateMiddleware = (req, res, next) => {
  try {
    const { studentId, accountData, studentData } = studentsValidator.validateUpdate(
      req.params,
      req.body,
    );
    req.params.id = studentId;
    req.body = { accountData, studentData };
    next();
  } catch (error) {
    next(error);
  }
};

const validateRemoveMiddleware = (req, res, next) => {
  try {
    const studentId = studentsValidator.validateRemove(req.params);
    req.params.id = studentId;
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
