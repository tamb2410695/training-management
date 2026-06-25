// Đồng bộ cấu hình cấu trúc JWT để Frontend thiết lập thời gian lưu Cookie/LocalStorage hợp lý
export const JWT_FE_CONFIG = {
  ACCESS_EXPIRES_MS: 15 * 60 * 1000, // 15 phút ra miliseconds
  REFRESH_EXPIRES_DAYS: 7,           // 7 ngày
};

// Hệ thống thông báo phản hồi tính năng Xác thực
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Đăng nhập thành công.",
  LOGIN_FAILED: "Tên đăng nhập hoặc mật khẩu không chính xác.",
  
  REGISTER_SUCCESS: "Đăng ký tài khoản thành công.",
  
  CHANGE_PASSWORD_SUCCESS: "Đổi mật khẩu thành công. Vui lòng đăng nhập lại.",
  CHANGE_PASSWORD_FAILED: "Mật khẩu hiện tại không đúng.",
  
  RESET_PASSWORD_SUCCESS: "Đặt lại mật khẩu thành công.",
  
  SESSION_EXPIRED: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.",
  UNAUTHORIZED: "Bạn không có quyền truy cập vào tính năng này.",
};