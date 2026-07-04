// src/features/instructors/services/instructorsService.js
import { API_ROUTES } from "../../../constants";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";
import { unwrapResponse } from "../../../utils";

const instructorsService = {
  ...createCrudService("instructors"),

  updateStatus: (id, status) =>
    api
      .patch(`${API_ROUTES.STAFF}/${id}/status`, { status })
      .then(unwrapResponse),

  resetPassword: (id) =>
    api
      .post(`${API_ROUTES.STAFF}/${id}/reset-password`)
      .then(unwrapResponse),

  search: (params) =>
    api.get(`${API_ROUTES.STAFF}/search`, { params }).then(unwrapResponse),

  getStatistics: () =>
    api.get(`${API_ROUTES.STAFF}/statistics`).then(unwrapResponse),
};

export default instructorsService;
