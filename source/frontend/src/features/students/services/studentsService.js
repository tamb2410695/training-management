import { API_ROUTES } from "../../../constants";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";
import { unwrapResponse } from "../../../utils";

const studentsService = {
  ...createCrudService("students"),

  updateStatus: (id, status) =>
    api
      .patch(`${API_ROUTES.STUDENT}/${id}/status`, { status })
      .then(unwrapResponse),

  search: (params) =>
    api.get(`${API_ROUTES.STUDENT}/search`, { params }).then(unwrapResponse),
};

export default studentsService;
