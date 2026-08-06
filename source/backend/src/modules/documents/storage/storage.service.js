const path = require("path");

const { generateStoredName } = require("./filename.helper");

const { buildDocumentPath } = require("./storage.helper");

const { getProvider } = require("./providers/provider.factory");

const normalize = (file) => {
  return {
    originalName: file.originalName,
    storedName: generateStoredName(file.originalName),
    tempPath: file.tempPath,
    mimeType: file.mimeType,
    extension: path.extname(file.originalName),
    size: file.size,
  };
};

const save = async (file, options) => {
  const provider = getProvider();

  const relativePath = path.join(
    buildDocumentPath({
      courseId: options.courseId,

      year: new Date().getFullYear(),
    }),

    file.storedName,
  );
  await provider.save({
    tempPath: file.tempPath,

    destinationPath: relativePath,
  });

  return {
    ...file,

    path: relativePath,
  };
};

const remove = async (filePath) => {
  return getProvider().remove(filePath);
};
const exists = async (path) => {
  const provider = getProvider();

  return provider.exists(path);
};

const getDownloadInfo = async (file) => {
  const provider = getProvider();

  const filePath = provider.getDownloadPath(file.path);

  return {
    path: filePath,

    fileName: file.originalName,

    mimeType: file.mimeType,

    size: file.size,
  };
};

module.exports = {
  normalize,
  save,
  remove,
  exists,
  getDownloadInfo,
};
