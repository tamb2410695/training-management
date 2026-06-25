function trimString(value) {
    return typeof value === "string"
        ? value.trim()
        : value;
}
function normalizeSpaces(value) {
    if (typeof value !== "string") {
        return value;
    }

    return value
        .trim()
        .replace(/\s+/g, " ");
}

const toUpper = (value) => {
  return typeof value === "string"
    ? value.toUpperCase()
    : value;
};

const capitalize = (
  value,
) => {
  if (
    typeof value !== "string"
  ) {
    return value;
  }

  return value
    .toLowerCase()
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase(),
    );
};

module.exports = {
    trimString,
    normalizeSpaces,
    toUpper,
    capitalize
};