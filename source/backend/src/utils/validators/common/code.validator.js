const validateCode = (code, prefix) => {
  const regex = new RegExp(`^${prefix}-\\d+$`);

  return regex.test(code);
};

module.exports = {
  validateCode
}