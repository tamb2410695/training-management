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

      if (result && typeof result === "object") {
        if (result.params) req.params = { ...req.params, ...result.params };
        if (result.body) req.body = result.body;
        if (result.query) req.query = result.query;
      }

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