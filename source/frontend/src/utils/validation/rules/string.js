export const stringRules = {
  minLength(value, message = `Độ dài tối thiểu là ${value} ký tự.`) {
    return {
      type: "minLength",
      value,
      message,
    };
  },

  maxLength(value, message = `Độ dài tối đa là ${value} ký tự.`) {
    return {
      type: "maxLength",
      value,
      message,
    };
  },

  exactLength(value, message = `Độ dài phải bằng ${value} ký tự.`) {
    return {
      type: "exactLength",
      value,
      message,
    };
  },

  pattern(regex, message = "Định dạng không hợp lệ.") {
    return {
      type: "pattern",
      value: regex,
      message,
    };
  },

  contains(value, message = `Phải chứa ký tự ${value}.`) {
    return {
      type: "contains",
      value,
      message,
    };
  },

  startsWith(value, message = `Phải bắt đầu bằng ${value}.`) {
    return {
      type: "startsWith",
      value,
      message,
    };
  },
};
