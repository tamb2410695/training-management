import { ENDPOINTS } from "../../../constants/endpoint";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";

const courseService = {
  ...createCrudService("courses"),

  updateStatus(id, status) {
    return api.patch(
      `${ENDPOINTS.COURSES}/${id}/status`,
      { status }
    );
  },

  search(params) {
    return api.get(
      `${ENDPOINTS.COURSES}/search`,
      { params }
    );
  },
};

export default courseService;