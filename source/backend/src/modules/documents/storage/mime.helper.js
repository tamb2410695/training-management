const { MIME_TYPES, FILE_CATEGORIES } = require("./storage.constants");

const getExtension = (filename = "") => {
  const index = filename.lastIndexOf(".");

  if (index === -1) {
    return "";
  }

  return filename.substring(index + 1).toLowerCase();
};

const isSupportedMime = (mimeType) => {
  return Object.values(MIME_TYPES).includes(mimeType);
};

const isSupportedExtension = (extension, allowedExtensions = []) => {
  return allowedExtensions.includes(extension.toLowerCase());
};

const isImage = (mimeType) => {
  return [MIME_TYPES.PNG, MIME_TYPES.JPG, MIME_TYPES.JPEG].includes(mimeType);
};

const isDocument = (mimeType) => {
  return [
    MIME_TYPES.PDF,
    MIME_TYPES.DOC,
    MIME_TYPES.DOCX,
    MIME_TYPES.XLS,
    MIME_TYPES.XLSX,
    MIME_TYPES.PPT,
    MIME_TYPES.PPTX,
    MIME_TYPES.TXT,    
  ].includes(mimeType);
};

const getCategory = (mimeType) => {
  if (isImage(mimeType)) {
    return FILE_CATEGORIES.IMAGE;
  }

  if (isDocument(mimeType)) {
    return FILE_CATEGORIES.DOCUMENT;
  }

  return FILE_CATEGORIES.OTHER;
};

module.exports = {
  getExtension,
  isSupportedMime,
  isSupportedExtension,
  isImage,
  isDocument,
  getCategory,
};
