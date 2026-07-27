export const formatRules = {
  email(message = "Email không hợp lệ.") {
    return {
      type: "email",
      message,
    };
  },

  phone(message = "Số điện thoại không hợp lệ.") {
    return {
      type: "phone",
      message,
    };
  },
  
  url(message = "Đường dẫn không hợp lệ.") {
    return {
      type: "url",
      message,
    };
  },

  username(message = "Tên đăng nhập chỉ gồm chữ, số và dấu gạch dưới.") {
    return {
      type: "username",
      message,
    };
  },
};
