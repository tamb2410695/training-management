export const AUTH_FIELDS = {
  username: {
    key: "username",
    label: "Tên đăng nhập",
    required: { login: true, register: true },
    default: "",
  },

  email: {
    key: "email",
    label: "Email",
    required: { register: true },
    default: "",
  },

  password: {
    key: "password",
    label: "Mật khẩu",
    required: { login: true, register: true },
    default: "",
  },

  confirmPassword: {
    key: "confirmPassword",
    label: "Xác nhận mật khẩu",
    required: { register: true },
    default: "",
  },
};

// import { AUTH_FIELDS } from "./authFields";

export const DEFAULT_LOGIN_FORM = {
  [AUTH_FIELDS.username.key]: AUTH_FIELDS.username.default,
  [AUTH_FIELDS.password.key]: AUTH_FIELDS.password.default,
};

export const DEFAULT_REGISTER_FORM = {
  [AUTH_FIELDS.username.key]: AUTH_FIELDS.username.default,
  [AUTH_FIELDS.email.key]: AUTH_FIELDS.email.default,
  [AUTH_FIELDS.password.key]: AUTH_FIELDS.password.default,
  [AUTH_FIELDS.confirmPassword.key]: AUTH_FIELDS.confirmPassword.default,
};

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Đăng nhập thành công.",
  LOGIN_FAILED: "Sai tài khoản hoặc mật khẩu.",

  REGISTER_SUCCESS: "Đăng ký thành công.",
  REGISTER_FAILED: "Đăng ký thất bại.",

  LOGOUT_SUCCESS: "Đăng xuất thành công.",
};

// import axios from "@/lib/axios";

// export const authApi = {
//   login: (data) => axios.post("/api/auth/login", data),

//   register: (data) => axios.post("/api/auth/register", data),

//   logout: () => axios.post("/api/auth/logout"),

//   me: () => axios.get("/api/auth/me"),

//   refreshToken: () => axios.post("/api/auth/refresh-token"),
// };

// const ROLE_REDIRECT = {
//   ADMIN: "/admin",
//   INSTRUCTOR: "/teaching",
//   STUDENT: "/learning",
// };

// 6. FLOW ĐĂNG NHẬP
// Login flow chuẩn
// User nhập form
//     ↓
// LoginPage submit
//     ↓
// authStore.login()
//     ↓
// authApi.login()
//     ↓
// Backend trả:
//   - user
//   - accessToken
//     ↓
// Lưu token
//     ↓
// Set state user
//     ↓
// Redirect dashboard
// 7. FLOW ĐĂNG KÝ
// User nhập form
//     ↓
// validate password === confirmPassword
//     ↓
// authApi.register()
//     ↓
// Thông báo thành công
//     ↓
// Redirect login