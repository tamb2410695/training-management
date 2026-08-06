const path = require("path");
const fs = require("fs");
const multer = require("multer");

const env = require("@/config/env");

const { BadRequestError } = require("@/utils/errors");

const { sanitizeFields, pickFields, throwIf } = require("@/utils/helpers");

const {
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("@/utils/validators");

const { formatNumericId } = require("@/utils/formatters");

const { validateId } = require("@/utils/validators");

const { ERROR_MESSAGES } = require("@/constants");

const { DOCUMENT_FIELDS } = require("./documents.constants");

const { validateDocumentFormats } = require("./documents.validator");
const { formatDocumentQuery } = require("./documents.formatter");

// ===============================
// Query
// ===============================

const getList = (query) => {
  validateAllowedFields(query, DOCUMENT_FIELDS.QUERY.ALLOWED_KEYS);

  const sanitizedQuery = sanitizeFields(
    pickFields(query, DOCUMENT_FIELDS.QUERY.ALLOWED_KEYS),
  );

  const formattedQuery = formatDocumentQuery(sanitizedQuery)
  validateDocumentFormats(formattedQuery);

  return formattedQuery;
};

// ===============================
// Params
// ===============================

const getById = (params) => {
  const documentId = formatNumericId(params.id);

  validateId(documentId, "documentId");

  return documentId;
};

// ===============================
// CRUD
// ===============================

const uploadDocument = (body) => {
  validateAllowedFields(body, DOCUMENT_FIELDS.BODY.CREATE);

  const sanitizedData = sanitizeFields(
    pickFields(body, DOCUMENT_FIELDS.BODY.CREATE),
  );

  validateRequiredFields(sanitizedData, DOCUMENT_FIELDS.REQUIRED.CREATE);

  validateDocumentFormats(sanitizedData);

  return sanitizedData;
};

const partialUpdate = (params, body) => {
  const documentId = getById(params);

  const sanitizedData = sanitizePatchBody(body, DOCUMENT_FIELDS.BODY.UPDATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,

    BadRequestError,

    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateDocumentFormats(sanitizedData);

  return {
    params: documentId,

    body: sanitizedData,
  };
};

const remove = (params) => {
  return getById(params);
};

// ===============================
// Multer Upload
// ===============================

const tempPath = path.join(env.upload.rootDirectory, env.upload.folders.temp);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdirSync(tempPath, {
      recursive: true,
    });

    cb(null, tempPath);
  },

  filename(req, file, cb) {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: env.upload.maxFileSize,
  },
});

const normalizeFile = (file) => {
  return {
    originalName: file.originalname,

    tempPath: file.path,

    mimeType: file.mimetype,

    size: file.size,
  };
};

const uploadSingleDocument = [
  upload.single("file"),

  (req, res, next) => {
    if (!req.file) {
      throw new BadRequestError("FILE_REQUIRED", "Document file is required");
    }

    req.file = normalizeFile(req.file);

    next();
  },
];

const uploadErrorHandler = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return next(new BadRequestError("UPLOAD_ERROR", error.message));
  }

  return next(error);
};

module.exports = {
  getList,
  getById,

  uploadDocument,
  partialUpdate,
  remove,

  uploadSingleDocument,
  uploadErrorHandler,
};
