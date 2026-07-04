function normalizeEnum(value) {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim().toUpperCase();
}

module.exports = {
  normalizeEnum,
};
