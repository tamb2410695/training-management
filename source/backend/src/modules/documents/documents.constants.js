const { QUERY_COMMON_FIELDS } = require("@/constants");

const DOCUMENT_STATUS = {
  AVAILABLE: "AVAILABLE",
  ARCHIVED: "ARCHIVED",
  DELETED: "DELETED",
};

const DOCUMENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      "documentCode",
      "title",
      "description",
      "category",
      "originalName",
      "courseName",
      "uploaderName",
    ],

    SORTABLE: [
      "documentId",
      "documentCode",
      "title",
      "category",
      "fileSize",
      "documentStatus",
      "isVisible",
      "createdAt",
      "updatedAt",
      "courseName",
      "uploaderName",
    ],

    FILTERS: ["courseId", "uploadedBy", "documentStatus", "isVisible"],

    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.ALL_KEYS,
          ...this.SEARCHABLE,
          ...this.SORTABLE,
          ...this.FILTERS,
        ]),
      ];
    },
  },

  BODY: {
    CREATE: ["courseId", "title", "description", "category", "isVisible"],

    UPDATE: ["title", "description", "category", "isVisible"],
  },

  REQUIRED: {
    CREATE: ["courseId", "title"],
  },
};

const DOCUMENT_MAPS = {
  SEARCH: {
    documentCode: "doc.document_code",
    title: "doc.title",
    description: "doc.description",
    category: "doc.category",
    originalName: "doc.original_name",
    courseName: "crs.course_name",
    uploaderName: "sp.full_name",
  },

  SORT: {
    documentId: "doc.document_id",
    documentCode: "doc.document_code",
    title: "doc.title",
    category: "doc.category",
    fileSize: "doc.file_size",
    documentStatus: "doc.document_status",
    isVisible: "doc.is_visible",
    createdAt: "doc.created_at",
    updatedAt: "doc.updated_at",
    courseName: "crs.course_name",
    uploaderName: "sp.full_name",
  },

  FILTER: {
    courseId: "doc.course_id",
    uploadedBy: "doc.uploaded_by",
    documentStatus: "doc.document_status",
    isVisible: "doc.is_visible",
  },
};

module.exports = {
  DOCUMENT_STATUS,
  DOCUMENT_FIELDS,
  DOCUMENT_MAPS,
};
