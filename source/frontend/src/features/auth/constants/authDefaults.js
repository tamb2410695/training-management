import { AUTH_FIELDS } from "./authFields";

// Form Đăng ký (REGISTER)
export const DEFAULT_REGISTER_FORM = {
  [AUTH_FIELDS.username.key]: AUTH_FIELDS.username.default,
  [AUTH_FIELDS.email.key]: AUTH_FIELDS.email.default,
  [AUTH_FIELDS.password.key]: AUTH_FIELDS.password.default,
  [AUTH_FIELDS.roleName.key]: AUTH_FIELDS.roleName.default,
};

// Form Đăng nhập (LOGIN)
export const DEFAULT_LOGIN_FORM = {
  [AUTH_FIELDS.username.key]: AUTH_FIELDS.username.default,
  [AUTH_FIELDS.password.key]: AUTH_FIELDS.password.default,
};

// Form Đổi mật khẩu (CHANGE_PASSWORD)
export const DEFAULT_CHANGE_PASSWORD_FORM = {
  [AUTH_FIELDS.currentPassword.key]: AUTH_FIELDS.currentPassword.default,
  [AUTH_FIELDS.newPassword.key]: AUTH_FIELDS.newPassword.default,
};

// Form Quên / Đặt lại mật khẩu (RESET_PASSWORD)
export const DEFAULT_RESET_PASSWORD_FORM = {
  [AUTH_FIELDS.email.key]: AUTH_FIELDS.email.default,
  [AUTH_FIELDS.newPassword.key]: AUTH_FIELDS.newPassword.default,
};