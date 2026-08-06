const STORAGE_PROVIDERS = {
  LOCAL: "LOCAL",
  S3: "S3",
  MINIO: "MINIO",
};

const FILE_CATEGORIES = {
  DOCUMENT: "DOCUMENT",
  IMAGE: "IMAGE",
  ARCHIVE: "ARCHIVE",
  OTHER: "OTHER",
};

const FILE_LIMITS = {
  MAX_SIZE: 20 * 1024 * 1024, // 20MB
};

const ALLOWED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "png",
  "jpg",
  "jpeg",
  "txt",
];

const MIME_TYPES = {
  PDF: "application/pdf",
  DOC: "application/msword",
  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  XLS: "application/vnd.ms-excel",
  XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  PPT: "application/vnd.ms-powerpoint",
  PPTX: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  PNG: "image/png",
  JPG: "image/jpeg",
  JPEG: "image/jpeg",
  TXT: "text/plain",  
};

module.exports = {
  STORAGE_PROVIDERS,
  FILE_CATEGORIES,
  FILE_LIMITS,
  ALLOWED_EXTENSIONS,
  MIME_TYPES,
};
