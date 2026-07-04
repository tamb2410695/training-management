function throwIf(condition, ErrorClass, ...args) {
  if (condition) {
    throw new ErrorClass(...args);
  }
}

module.exports = {
  throwIf,
};
