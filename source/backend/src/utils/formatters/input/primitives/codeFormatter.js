const formatCode = (prefix, sequence, length = 6) => {
  return `${prefix}-${String(sequence).padStart(length, "0")}`;
};

module.exports = {
  formatCode,
};
