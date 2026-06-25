import { ENDPOINTS } from "../../../constants/endpoint";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";
import { unwrapResponse } from "../../../utils";

const studentsService = {
  ...createCrudService("students"),

  updateStatus: (id, status) =>
    api
      .patch(`${ENDPOINTS.STUDENTS}/${id}/status`, { status })
      .then(unwrapResponse),

  search: (params) =>
    api.get(`${ENDPOINTS.STUDENTS}/search`, { params }).then(unwrapResponse),
};

export default studentsService;
