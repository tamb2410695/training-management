import { API_ROUTES } from "../../../constants";
import api from "../../../services/api";

const authService = {
  login: (credentials) => 
    api.post(API_ROUTES.AUTH.LOGIN, credentials),

  register: (credentials) => 
    api.post(API_ROUTES.AUTH.REGISTER, credentials),
};

export default authService;