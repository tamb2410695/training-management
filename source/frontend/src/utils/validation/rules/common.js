export const commonRules = {
  required(message = "Trường này là bắt buộc.") {
    return {
      type: "required",
      message,
    };
  },

  nullable() {
    return {
      type: "nullable",
    };
  },
};
