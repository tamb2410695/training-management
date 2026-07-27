export const numberRules = {
  min(value, message = `Giá trị tối thiểu là ${value}.`) {
    return {
      type: "min",
      value,
      message,
    };
  },

  max(value, message = `Giá trị tối đa là ${value}.`) {
    return {
      type: "max",
      value,
      message,
    };
  },

  integer(message = "Giá trị phải là số nguyên.") {
    return {
      type: "integer",
      message,
    };
  },

  positive(message = "Giá trị phải lớn hơn 0.") {
    return {
      type: "positive",
      message,
    };
  },

  between(min, max, message = `Giá trị phải từ ${min} đến ${max}.`) {
    return {
      type: "between",
      min,
      max,
      message,
    };
  },
};
