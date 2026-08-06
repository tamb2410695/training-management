const crypto = require("crypto");
const path = require("path");

const generateStoredName = (originalName) => {
  const extension = path.extname(originalName);

  const uuid = crypto.randomUUID();

  return `${uuid}${extension}`;
};

module.exports = {
  generateStoredName,
};
