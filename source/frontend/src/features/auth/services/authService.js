import api from "@/services/api";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.AUTH;

export default function authService() {
  return {
    register: (data) => api.post(API.REGISTER, data),
    login: (data) => api.post(API.LOGIN, data),
    getProfile: () => api.get(API.PROFILE),
    changePassword: (data) => api.patch(API.CHANGE_PASSWORD, data),
  };
}
