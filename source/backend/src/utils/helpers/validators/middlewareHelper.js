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

      if (result && typeof result === "object") {
        const keys = Object.keys(result);
        
        const idKey = keys.find(k => k.toLowerCase().includes('id'));
        if (idKey) req.params.id = result[idKey];

        const dataKey = keys.find(k => k.toLowerCase().includes('data') || k.toLowerCase().includes('body'));
        if (dataKey) req.body = result[dataKey];
        
        const queryKey = keys.find(k => k.toLowerCase().includes('query'));
        if (queryKey) req.query = result[queryKey];
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