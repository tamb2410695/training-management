import { ROUTES } from "../../constants";

export const STATUS_CONFIG = {
  403: {
    title: "Không có quyền truy cập",
    message: "Tài khoản của bạn không có quyền truy cập vào trang này.",
    color: "danger",
    buttonText: "Về trang chủ",
    buttonPath: ROUTES.HOME,
  },

  404: {
    title: "Không tìm thấy trang",
    message: "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị thay đổi.",
    color: "warning",
    buttonText: "Về trang chủ",
    buttonPath: ROUTES.HOME,
  },

  500: {
    title: "Có lỗi xảy ra",
    message: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau.",
    color: "danger",
    buttonText: "Về trang chủ",
    buttonPath: ROUTES.HOME,
  },
};
