const path = require("path");
const mimeHelper = require("./mime.helper");

const normalizeFile = (file) => {
  return {
    originalName: file.originalName,

    tempPath: file.tempPath,

    mimeType: file.mimeType,

    extension: path.extname(file.originalName),

    size: file.size,
  };
};
const buildDocumentPath = ({ courseId, year }) => {
  return path.join(
    "documents",
    String(year),
    `course-${courseId}`,
  );
};
module.exports = {
  normalizeFile,
  buildDocumentPath
};
