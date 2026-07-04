const { QUERY_COMMON_FIELDS } = require("../../constants");

const PAYMENT_FIELDS = {
  PARAMS: {
    ID: ["id"],
  },

  QUERY: {
    SEARCHABLE: [
      "paymentCode",
      "payerName",
      "bankTransactionCode",
      "studentCode",
      "studentName",
      "enrollmentCode",
    ],

    SORTABLE: ["paymentId", "amount", "paymentDate", "createdAt"],

    FILTERS: ["paymentStatus", "paymentMethod", "enrollmentId", "studentId"],

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
      "enrollmentId",
      "amount",
      "payerName",
      "bankTransactionCode",
      "paymentMethod",
    ],

    UPDATE: ["paymentStatus"],
  },

  REQUIRED: {
    CREATE: [
      "enrollmentId",
      "amount",
      "payerName",
      "bankTransactionCode",
      "paymentMethod",
    ],
  },
};

const PAYMENT_MAPS = {
  SEARCH: {
    paymentCode: "p.payment_code",
    payerName: "p.payer_name",
    bankTransactionCode: "p.bank_transaction_code",
  },

  SORT: {
    paymentId: "p.payment_id",
    amount: "p.amount",
    paymentDate: "p.payment_date",
  },

  FILTER: {
    paymentStatus: "p.payment_status",
    paymentMethod: "p.payment_method",
    enrollmentId: "p.enrollment_id",
  },
};

module.exports = {
  PAYMENT_FIELDS,
  PAYMENT_MAPS,
};
