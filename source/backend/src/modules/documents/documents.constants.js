const { QUERY_COMMON_FIELDS } = require("../../constants");

const DOCUMENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["documentCode", "title", "originalName"],

    SORTABLE: ["documentId", "fileSize", "uploadedAt", "updatedAt"],

    FILTERS: ["courseId", "category", "documentStatus", "isVisible"],

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
    CREATE: [
      "courseId",
      "title",
      "documentDescription",
      "category",
      "isVisible",
    ],

    UPDATE: [
      "title",
      "documentDescription",
      "category",
      "isVisible",
      "documentStatus",
    ],
  },

  REQUIRED: {
    CREATE: ["courseId", "title"],
  },
};

const DOCUMENT_MAPS = {
  SEARCH: {
    documentCode: "doc.document_code",
    title: "doc.title",
    originalName: "doc.original_name",
    courseName: "crs.course_name",
  },

  SORT: {
    documentId: "doc.document_id",
    fileSize: "doc.file_size",
    uploadedAt: "doc.uploaded_at",
    updatedAt: "doc.updated_at",
  },

  FILTER: {
    courseId: "doc.course_id",
    category: "doc.category",
    documentStatus: "doc.document_status",
    isVisible: "doc.is_visible",
  },
};

module.exports = {
  DOCUMENT_FIELDS,
  DOCUMENT_MAPS,
};
