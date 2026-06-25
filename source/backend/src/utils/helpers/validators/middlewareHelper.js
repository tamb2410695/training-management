function createValidationMiddleware(validator, target = "body") {
  return (req, res, next) => {
    try {
      req[target] = validator(req[target]);

      next();
    } catch (error) {
      next(error);
    }
  };
}

function createMultiValidator(validator) {
  return (req, res, next) => {
    try {
      const result = validator(req.params, req.body, req.query);

      req.validatedData = result;
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  createValidationMiddleware,
  createMultiValidator,
};
