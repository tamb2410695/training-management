const validateNumber = (value) => {
  return typeof value === "number" && !Number.isNaN(value);
};

module.exports = {
  validateNumber
}