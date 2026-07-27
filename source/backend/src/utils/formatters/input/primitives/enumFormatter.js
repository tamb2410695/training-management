function normalizeEnum(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeEnum);
  }

  if (typeof value !== "string") {
    return value;
  }

  if (value.includes(",")) {
    return value.split(",").map((item) => item.trim().toUpperCase());
  }

  return value.trim().toUpperCase();
}

module.exports = {
  normalizeEnum,
};
