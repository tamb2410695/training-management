const { QUERY_COMMON_FIELDS } = require("../../constants");

const PAYMENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },
  QUERY: {
    SEARCHABLE: ["paymentCode", "transactionCode"],
    SORTABLE: ["paymentId", "paymentCode", "amount", "paymentDate", "paymentStatus", "createdAt"],
    FILTERS: ["paymentStatus", "paymentMethod", "enrollmentId"],
    
    get ALLOWED_KEYS() {
      return [
        ...new Set([
          ...QUERY_COMMON_FIELDS.PAGINATION,
          ...this.SEARCHABLE,
          ...this.SORTABLE,
          ...this.FILTERS,
        ]),
      ];
    },
  },
  BODY: {
    UPDATE_STATUS: ["paymentStatus", "paymentMethod", "transactionCode"],
  },
  REQUIRED: {
    UPDATE_STATUS: ["paymentStatus", "paymentMethod"],
  },
};

module.exports = {
  PAYMENT_FIELDS,
};