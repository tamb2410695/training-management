// src/features/auth/services/authService.js
import { ENDPOINTS } from "../../../constants";
import api from "../../../services/api";
import { storage } from "../../../services/storage";
import { unwrapResponse } from "../../../utils";

const authService = {
  login: (credentials) => 
    api.post(`${ENDPOINTS.AUTH}/login`, credentials).then(unwrapResponse),

  register: (credentials) => 
    api.post(`${ENDPOINTS.AUTH}/register`, credentials).then(unwrapResponse),

  logout: () => {
    storage.removeToken();
    return Promise.resolve({ success: true, message: "Đăng xuất thành công" });
  }
};

export default authService;