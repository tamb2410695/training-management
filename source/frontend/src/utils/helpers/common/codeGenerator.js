const generateCode = (prefix, id, length = 6) => {
  return `${prefix}-${String(id).padStart(length, "0")}`;
};

module.exports = {
  generateCode,
};
