const fs = require("fs/promises");
const path = require("path");

const env = require("@/config/env");

const root = env.upload.rootDirectory;

const save = async ({ tempPath, destinationPath }) => {
  const fullPath = path.resolve(root, destinationPath);

  await fs.mkdir(path.dirname(fullPath), {
    recursive: true,
  });

  await fs.rename(tempPath, fullPath);

  return {
    path: destinationPath,
  };
};

const exists = async (relativePath) => {
  const fullPath = path.resolve(root, relativePath);

  try {
    await fs.access(fullPath);

    return true;
  } catch (error) {
    return false;
  }
};

const remove = async (relativePath) => {
  const fullPath = path.resolve(root, relativePath);

  try {
    await fs.unlink(fullPath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

const getDownloadPath = (relativePath) => {
  return path.resolve(root, relativePath);
};

module.exports = {
  save,
  exists,
  remove,
  getDownloadPath,
};
