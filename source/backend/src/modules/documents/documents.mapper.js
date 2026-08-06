const { hasField } = require("@/utils/helpers");

const { DOCUMENT_FIELDS } = require("./documents.constants");

const buildCreatePayload = ({ documentData, file, staffId, documentCode }) => {
  return {
    courseId: documentData.courseId,

    uploadedBy: staffId,

    documentCode,

    title: documentData.title || file.originalName,

    description: documentData.description || "",

    category: documentData.category || "GENERAL",

    filePath: file.path,

    originalName: file.originalName,

    storedName: file.storedName,

    mimeType: file.mimeType,

    extension: file.extension,

    fileSize: file.size,

    isVisible:
      documentData.isVisible === true || documentData.isVisible === "true",
  };
};

const buildUpdatePayload = (documentData) => {
  const updatePayload = {};

  DOCUMENT_FIELDS.BODY.UPDATE.forEach((field) => {
    if (hasField(documentData, field)) {
      updatePayload[field] = documentData[field];
    }
  });

  return updatePayload;
};

const buildDownloadResponse = (downloadInfo) => ({
  path: downloadInfo.path,

  fileName: downloadInfo.fileName,

  mimeType: downloadInfo.mimeType,
});

const buildListResponse = ({ documents, pagination }) => ({
  documents,
  pagination,
});

const buildDetailResponse = (document) => document;

module.exports = {
  buildCreatePayload,
  buildUpdatePayload,
  buildDownloadResponse,
  buildListResponse,
  buildDetailResponse,
};
