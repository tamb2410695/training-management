export const enumRules = {
  enum(values, message = "Giá trị không hợp lệ.") {
    return {
      type: "enum",
      values,
      message,
    };
  },
};

export const asyncRules = {
  unique(key, message = `${key} đã tồn tại.`) {
    return {
      type: "unique",
      key,
      message,
    };
  },
};
