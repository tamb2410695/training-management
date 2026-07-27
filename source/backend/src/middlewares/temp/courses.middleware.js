const { ValidationError } = require("../../utils/errors/index");
const { throwIf } = require("../../utils/helpers/index");

const { HTTP_STATUS, ERROR_MESSAGES } = require("../../constants");
const coursesValidator = require("../../modules/courses/courses.validator");

const validateGetListMiddleware = (req, res, next) => {
  try {
    const query = coursesValidator.validateGetList(req.query);
    req.query = query;
    next();
  } catch (error) {
    next(error);
  }
};

const validateGetByIdMiddleware = (req, res, next) => {
  try {
    const courseId = coursesValidator.validateGetById(req.params);
    req.params.id = courseId;
    next();
  } catch (error) {
    next(error);
  }
};

const validateCreateMiddleware = (req, res, next) => {
  try {
    const { courseData } = coursesValidator.validateCreate(req.body);
    req.body = { courseData };
    next();
  } catch (error) {
    next(error);
  }
};

const validateUpdateMiddleware = (req, res, next) => {
  try {
    const { courseId, courseData } = coursesValidator.validateUpdate(
      req.params,
      req.body,
    );
    req.params.id = courseId;
    req.body = { courseData };
    next();
  } catch (error) {
    next(error);
  }
};

const validatePartialUpdateMiddleware = (req, res, next) => {
  try {
    const { courseId, courseData } = coursesValidator.validatePartialUpdate(
      req.params,
      req.body,
    );
    req.params.id = courseId;
    req.body = { courseData };
    next();
  } catch (error) {
    next(error);
  }
};

const validateRemoveMiddleware = (req, res, next) => {
  try {
    const courseId = coursesValidator.validateRemove(req.params);
    req.params.id = courseId;
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
