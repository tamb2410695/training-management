const db = require("@/config/database");

const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("@/utils/errors");

const { ERROR_CODES } = require("@/constants");

const { throwIf, generateCode } = require("@/utils/helpers");

const { withTransaction } = require("@/utils/database/transaction");

const documentsRepository = require("./documents.repository");

const coursesRepository = require("../courses/courses.repository");

const documentsFormatter = require("./documents.formatter");

const documentMapper = require("./documents.mapper");

const fileValidator = require("./storage/file.validator");

const storageService = require("./storage/storage.service");

const { DOCUMENT_STATUS } = require("./documents.constants");

// ===============================
// Helpers
// ===============================

const getDocumentOrThrow = async (documentId, connection = db) => {
  const document = await documentsRepository.findById(documentId, connection);

  throwIf(
    !document,
    NotFoundError,
    ERROR_CODES.DOCUMENT_NOT_FOUND || "DOCUMENT_NOT_FOUND",
  );

  return document;
};

const getDocumentIncludeDeletedOrThrow = async (
  documentId,
  connection = db,
) => {
  const document = await documentsRepository.findByIdIncludeDeleted(
    documentId,
    connection,
  );

  throwIf(
    !document,
    NotFoundError,
    ERROR_CODES.DOCUMENT_NOT_FOUND || "DOCUMENT_NOT_FOUND",
  );

  return document;
};

const validateCourse = async (courseId, connection = db) => {
  const course = await coursesRepository.findById(courseId, connection);

  throwIf(
    !course,
    NotFoundError,
    ERROR_CODES.COURSE_NOT_FOUND || "COURSE_NOT_FOUND",
  );

  return course;
};

// ===============================
// Query
// ===============================

const getList = async (query, connection = db) => {
  const { data: documents, pagination } = await documentsRepository.find(
    query,
    connection,
  );

  return documentsFormatter.formatList({
    documents,
    pagination,
  });
};

const getById = async (documentId, connection = db) => {
  const document = await getDocumentOrThrow(documentId, connection);

  return documentsFormatter.formatDetail(document);
};

// ===============================
// CRUD
// ===============================

const upload = async (documentData, fileInfo, staffId, connection = db) => {
  let storedFile = null;

  try {
    fileValidator.validate(fileInfo);

    await validateCourse(documentData.courseId, connection);

    const normalizedFile = storageService.normalize(fileInfo);

    storedFile = await storageService.save(normalizedFile, {
      courseId: documentData.courseId,
    });

    return await withTransaction(async (tx) => {
      const payload = documentMapper.buildCreatePayload({
        documentData,

        file: storedFile,

        staffId,
      });

      const createdDocument = await documentsRepository.create(payload, tx);

      throwIf(!createdDocument, ConflictError, ERROR_CODES.NO_CHANGES);

      const documentCode = generateCode("DOC", createdDocument.documentId);

      await documentsRepository.update(
        createdDocument.documentId,
        {
          documentCode,
        },
        tx,
      );

      const document = await documentsRepository.findById(
        createdDocument.documentId,
        tx,
      );

      return documentsFormatter.formatDetail(document);
    }, connection);
  } catch (error) {
    if (storedFile?.path) {
      await storageService.remove(storedFile.path);
    }

    throw error;
  }
};

const update = async (documentId, documentData, connection = db) => {
  return withTransaction(async (tx) => {
    await getDocumentOrThrow(documentId, tx);

    const updatePayload = documentMapper.buildUpdatePayload(documentData);

    throwIf(
      Object.keys(updatePayload).length === 0,
      BadRequestError,
      ERROR_CODES.NO_VALID_FIELDS || "NO_VALID_FIELDS",
    );

    throwIf(
      updatePayload.documentStatus,
      BadRequestError,
      ERROR_CODES.MANUAL_STATUS_CHANGE_FORBIDDEN ||
        "MANUAL_STATUS_CHANGE_FORBIDDEN",
    );

    const updatedDocument = await documentsRepository.update(
      documentId,
      updatePayload,
      tx,
    );

    throwIf(!updatedDocument, ConflictError, ERROR_CODES.NO_CHANGES);

    return documentsFormatter.formatDetail(updatedDocument);
  }, connection);
};

const remove = async (documentId, connection = db) => {
  return withTransaction(async (tx) => {
    const document = await getDocumentOrThrow(documentId, tx);

    throwIf(
      document.documentStatus === DOCUMENT_STATUS.DELETED,

      ConflictError,

      ERROR_CODES.DOCUMENT_ALREADY_DELETED || "DOCUMENT_ALREADY_DELETED",
    );

    const deletedDocument = await documentsRepository.remove(documentId, tx);

    throwIf(!deletedDocument, ConflictError, ERROR_CODES.NO_CHANGES);

    return deletedDocument;
  }, connection);
};

// ===============================
// Business Actions
// ===============================

const restore = async (documentId, connection = db) => {
  return withTransaction(async (tx) => {
    const document = await getDocumentIncludeDeletedOrThrow(documentId, tx);

    throwIf(
      document.documentStatus !== DOCUMENT_STATUS.DELETED,

      ConflictError,

      ERROR_CODES.DOCUMENT_NOT_DELETED || "DOCUMENT_NOT_DELETED",
    );

    const restoredDocument = await documentsRepository.restore(documentId, tx);

    throwIf(!restoredDocument, ConflictError, ERROR_CODES.NO_CHANGES);

    return documentsFormatter.formatDetail(restoredDocument);
  }, connection);
};

const download = async (documentId, connection = db) => {
  const document = await getDocumentOrThrow(documentId, connection);

  console.log("DOWNLOAD DOCUMENT:", document);
  throwIf(
    document.documentStatus !== DOCUMENT_STATUS.AVAILABLE,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED || "VALIDATION_FAILED",
  );

  const exists = await storageService.exists(document.filePath);

  throwIf(
    !exists,
    NotFoundError,
    ERROR_CODES.FILE_NOT_FOUND || "FILE_NOT_FOUND",

    "Physical file does not exist",
  );

  const downloadInfo = await storageService.getDownloadInfo({
    path: document.filePath,

    originalName: document.originalName,

    mimeType: document.mimeType,

    size: document.fileSize,
  });

  return documentMapper.buildDownloadResponse(downloadInfo);
};

const archive = async (documentId, connection = db) => {
  return withTransaction(async (tx) => {
    const document = await getDocumentOrThrow(documentId, tx);

    throwIf(
      document.documentStatus === DOCUMENT_STATUS.DELETED,
      BadRequestError,
      ERROR_CODES.DOCUMENT_ALREADY_DELETED,
    );

    throwIf(
      document.documentStatus === DOCUMENT_STATUS.ARCHIVED,
      BadRequestError,
      ERROR_CODES.NO_CHANGES,
    );

    const updated = await documentsRepository.update(
      documentId,
      {
        documentStatus: DOCUMENT_STATUS.ARCHIVED,
      },
      tx,
    );

    throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

    return documentsFormatter.formatDetail(updated);
  }, connection);
};

const activate = async (documentId, connection = db) => {
  return withTransaction(async (tx) => {
    const document = await getDocumentOrThrow(documentId, tx);

    throwIf(
      document.documentStatus === DOCUMENT_STATUS.DELETED,
      BadRequestError,
      ERROR_CODES.DOCUMENT_ALREADY_DELETED,
    );

    throwIf(
      document.documentStatus === DOCUMENT_STATUS.AVAILABLE,
      BadRequestError,
      ERROR_CODES.NO_CHANGES,
    );

    const updated = await documentsRepository.update(
      documentId,
      {
        documentStatus: DOCUMENT_STATUS.AVAILABLE,
      },
      tx,
    );

    throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

    return documentsFormatter.formatDetail(updated);
  }, connection);
};

const changeVisibility = async (
  documentId,
  visible,
  connection = db,
) => {
  const document = await getDocumentOrThrow(documentId, connection);

  throwIf(
    document.documentStatus === DOCUMENT_STATUS.DELETED,
    BadRequestError,
    ERROR_CODES.DOCUMENT_ALREADY_DELETED,
  );

  throwIf(
    document.isVisible === visible,
    BadRequestError,
    ERROR_CODES.NO_CHANGES,
  );

  const updated = await documentsRepository.update(
    documentId,
    {
      isVisible: visible,
    },
    connection,
  );

  throwIf(!updated, ConflictError, ERROR_CODES.NO_CHANGES);

  return documentsFormatter.formatDetail(updated);
};

module.exports = {
  getList,
  getById,

  upload,
  update,
  remove,

  archive,
  activate,
  changeVisibility,

  restore,
  download,
};