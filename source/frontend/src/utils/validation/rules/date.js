export const dateRules = {
  pastDate(message = "Ngày phải nhỏ hơn ngày hiện tại.") {
    return {
      type: "pastDate",
      message,
    };
  },

  futureDate(message = "Ngày phải lớn hơn ngày hiện tại.") {
    return {
      type: "futureDate",
      message,
    };
  },

  before(field, message) {
    return {
      type: "before",
      field,
      message: message ?? `Ngày phải trước ${field}.`,
    };
  },

  after(field, message) {
    return {
      type: "after",
      field,
      message: message ?? `Ngày phải sau ${field}.`,
    };
  },

  minAge(age, message) {
    return {
      type: "minAge",
      value: age,
      message: message ?? `Phải đủ ${age} tuổi.`,
    };
  },
};
