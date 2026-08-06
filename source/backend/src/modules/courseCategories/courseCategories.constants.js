const { QUERY_COMMON_FIELDS } = require("@/constants");

const COURSE_CATEGORY_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: ["categoryCode", "categoryName"],

    SORTABLE: ["categoryId", "categoryCode", "categoryName"],

    FILTERS: [],

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
    CREATE: ["categoryCode", "categoryName", "description"],

    UPDATE: ["categoryCode", "categoryName", "description"],
  },

  REQUIRED: {
    CREATE: ["categoryName"],
  },
};

const COURSE_CATEGORY_MAPS = {
  SEARCH: {
    categoryCode: "cc.category_code",
    categoryName: "cc.category_name",
  },

  SORT: {
    categoryId: "cc.category_id",
    categoryCode: "cc.category_code",
    categoryName: "cc.category_name",
  },

  FILTER: {},
};

module.exports = {
  COURSE_CATEGORY_FIELDS,
  COURSE_CATEGORY_MAPS,
};
