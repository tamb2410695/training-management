const {
  normalizeEnum,
  trimString,
  toUpper,
} = require("@/utils/formatters/input/primitives");

const { formatKeyword } = require("@/utils/formatters/input/queryFormatter");

const { hasField } = require("@/utils/helpers");

const { DOCUMENT_FIELDS } = require("./documents.constants");

// ===============================
// Input Formatter
// ===============================

const toBoolean = (value) => {
  if (value === true || value === "true") {
    return true;
  }

  if (value === false || value === "false") {
    return false;
  }

  return value;
};

const formatDocumentData = (documentData) => {
  const data = {
    ...documentData,
  };

  const textFields = ["title", "description", "category"];

  textFields.forEach((field) => {
    if (hasField(data, field)) {
      data[field] = trimString(data[field]);
    }
  });

  if (hasField(data, "courseId")) {
    data.courseId = Number(data.courseId);
  }

  if (hasField(data, "isVisible")) {
    data.isVisible = toBoolean(data.isVisible);
  }

  return data;
};

const formatDocumentQuery = (query) => {
  const data = {
    ...query,
  };

  if (hasField(data, "page")) {
    data.page = Number(data.page);
  }

  if (hasField(data, "limit")) {
    data.limit = Number(data.limit);
  }

  if (hasField(data, "search")) {
    data.search = formatKeyword(data.search);
  }

  if (hasField(data, "searchField")) {
    const searchField = trimString(data.searchField);

    data.searchField = DOCUMENT_FIELDS.QUERY.SEARCHABLE.includes(searchField)
      ? searchField
      : undefined;
  }

  if (hasField(data, "sortBy")) {
    const sortBy = trimString(data.sortBy);

    data.sortBy = DOCUMENT_FIELDS.QUERY.SORTABLE.includes(sortBy)
      ? sortBy
      : undefined;
  }

  if (hasField(data, "sortOrder")) {
    data.sortOrder = toUpper(trimString(data.sortOrder));
  }

  if (hasField(data, "courseId")) {
    data.courseId = Number(data.courseId);
  }

  if (hasField(data, "uploadedBy")) {
    data.uploadedBy = Number(data.uploadedBy);
  }

  if (hasField(data, "isVisible")) {
    data.isVisible = toBoolean(data.isVisible);
  }

  if (hasField(data, "documentStatus")) {
    data.documentStatus = normalizeEnum(data.documentStatus);
  }

  return data;
};

// ===============================
// Response Formatter
// ===============================

const formatFile = (document) => {
  return {
    name: document.originalName,

    size: document.fileSize,

    mimeType: document.mimeType,

    extension: document.extension,
  };
};

const formatCourse = (document) => {
  return {
    courseId: document.courseId,

    courseCode: document.courseCode,

    courseName: document.courseName,
  };
};

const formatUploader = (document) => {
  return {
    staffId: document.uploadedBy,

    staffCode: document.staffCode,

    fullName: document.uploaderName,
  };
};

const formatDocument = (document) => {
  return {
    documentId: document.documentId,

    documentCode: document.documentCode,

    title: document.title,

    description: document.description,

    category: document.category,

    file: formatFile(document),

    course: formatCourse(document),

    uploader: formatUploader(document),

    status: document.documentStatus,

    isVisible: document.isVisible,

    createdAt: document.createdAt,

    updatedAt: document.updatedAt,
  };
};

const formatList = ({ documents, pagination }) => {
  return {
    documents: documents.map(formatDocument),

    pagination,
  };
};

const formatDetail = (document) => {
  return formatDocument(document);
};

const formatDownload = (info) => {
  return {
    fileName: info.fileName,

    mimeType: info.mimeType,

    path: info.path,
  };
};

module.exports = {
  formatDocumentData,
  formatDocumentQuery,

  formatList,
  formatDetail,

  formatDownload,
};
