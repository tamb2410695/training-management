const db = require("../../config/database");
const {
  NotFoundError,
  ConflictError,
  BadRequestError,
} = require("../../utils/errors");

const { ERROR_MESSAGES, ERROR_CODES } = require("../../constants");
const { throwIf, hasField } = require("../../utils/helpers");
const documentsRepository = require("./documents.repository");
const courseService = require("../courses/courses.service"); 

const getList = async (query, connection = db) => {
  const { data: documents, pagination } = await documentsRepository.find(
    query,
    connection,
  );
  return { documents, pagination };
};

const getById = async (documentId, connection = db) => {
  const document = await documentsRepository.findById(documentId, connection);

  throwIf(
    !document,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND,
    "Tài liệu không tồn tại hoặc đã bị xóa."
  );

  return document;
};

const upload = async (documentData, fileInfo, staffId, connection = db) => {
  throwIf(
    !fileInfo,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Tập tin tải lên là bắt buộc."
  );

  const { courseId, title, documentDescription, category, isVisible } = documentData;

  if (courseId) {
    const course = await courseService.getById(courseId, connection).catch(() => null);
    throwIf(
      !course,
      NotFoundError,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Khóa học được chỉ định không tồn tại."
    );
  }

  const documentCode = `DOC-${Date.now()}`;

  const newDocumentPayload = {
    documentCode,
    courseId,
    title: title || fileInfo.originalname,
    filePath: fileInfo.path || fileInfo.location || "",
    originalName: fileInfo.originalname,
    storedName: fileInfo.filename || fileInfo.key || fileInfo.originalname,
    mimeType: fileInfo.mimetype,
    extension: fileInfo.originalname.split(".").pop().toLowerCase(),
    fileSize: fileInfo.size || 0,
    documentDescription: documentDescription || "",
    category: category || "GENERAL",
    isVisible: isVisible === "true" || isVisible === true,
    documentStatus: "AVAILABLE",
    uploadedByStaffId: staffId,
  };

  const createdDocument = await documentsRepository.create(newDocumentPayload, connection);

  throwIf(
    !createdDocument,
    ConflictError,
    ERROR_CODES.NO_CHANGES,
    "Không thể khởi tạo bản ghi tài liệu mới."
  );

  return createdDocument;
};

const update = async (documentId, documentData, connection = db) => {
  const document = await getDocumentById(documentId, connection);

  const updatePayload = {};

  if (hasField(documentData, "title")) updatePayload.title = documentData.title;
  if (hasField(documentData, "documentDescription")) updatePayload.documentDescription = documentData.documentDescription;
  if (hasField(documentData, "category")) updatePayload.category = documentData.category;
  if (hasField(documentData, "isVisible")) updatePayload.isVisible = documentData.isVisible;

  if (hasField(documentData, "documentStatus")) {
    throwIf(
      documentData.documentStatus === "DELETED",
      BadRequestError,
      ERROR_CODES.MANUAL_STATUS_CHANGE_FORBIDDEN,
      "Không thể chuyển trạng thái tài liệu sang DELETED thủ công. Vui lòng sử dụng chức năng xóa."
    );
    updatePayload.documentStatus = documentData.documentStatus;
  }

  throwIf(
    Object.keys(updatePayload).length === 0,
    BadRequestError,
    ERROR_CODES.NO_VALID_FIELDS,
    ERROR_MESSAGES.NO_VALID_FIELDS
  );

  const updatedDocument = await documentsRepository.update(documentId, updatePayload, connection);

  throwIf(
    !updatedDocument,
    ConflictError,
    ERROR_CODES.NO_CHANGES,
    ERROR_MESSAGES.NO_CHANGES
  );

  return updatedDocument;
};

const remove = async (documentId, connection = db) => {
  const document = await documentsRepository.findById(documentId, connection);

  throwIf(
    !document,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND,
    "Tài liệu không tồn tại hoặc đã bị xóa từ trước."
  );

  throwIf(
    document.documentStatus === "DELETED",
    ConflictError,
    ERROR_CODES.VALIDATION_FAILED,
    "Tài liệu này hiện đã ở trạng thái xóa."
  );

  return await documentsRepository.softDelete(documentId, connection);
};

const restore = async (documentId, connection = db) => {
  const document = await documentsRepository.findDeletedById(documentId, connection);

  throwIf(
    !document,
    NotFoundError,
    ERROR_CODES.RESOURCE_NOT_FOUND,
    "Không tìm thấy tài liệu đã xóa cần khôi phục."
  );

  const restoredDocument = await documentsRepository.restore(documentId, connection);

  throwIf(
    !restoredDocument,
    ConflictError,
    ERROR_CODES.NO_CHANGES,
    "Khôi phục tài liệu thất bại."
  );

  return restoredDocument;
};

const download = async (documentId, connection = db) => {
  const document = await getById(documentId, connection);

  throwIf(
    document.documentStatus !== "AVAILABLE",
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Tài liệu hiện không khả dụng để tải xuống."
  );

  return {
    filePath: document.filePath,
    originalName: document.originalName,
    mimeType: document.mimeType,
  };
};

module.exports = {
  getList,
  getById,
  upload,
  update,
  remove,
  restore,
  download,
};