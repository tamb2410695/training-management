const { normalizeEnum } = require("./enumFormatter");

function formatEnumArray(singleValue, multipleValue) {
  let rawItems = [];

  if (singleValue) {
    rawItems.push(...String(singleValue).split(","));
  }

  if (multipleValue) {
    if (Array.isArray(multipleValue)) {
      multipleValue.forEach((item) =>
        rawItems.push(...String(item).split(","))
      );
    } else {
      rawItems.push(...String(multipleValue).split(","));
    }
  }

  return [
    ...new Set(rawItems.map((item) => normalizeEnum(item.trim()))),
  ].filter(Boolean);
}

module.exports = {
  formatEnumArray,
};