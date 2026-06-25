// src/features/instructors/services/instructorsService.js
import { ENDPOINTS } from "../../../constants/endpoint";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";
import { unwrapResponse } from "../../../utils";

const instructorsService = {
  ...createCrudService("instructors"),

  updateStatus: (id, status) =>
    api
      .patch(`${ENDPOINTS.INSTRUCTORS}/${id}/status`, { status })
      .then(unwrapResponse),

  resetPassword: (id) =>
    api
      .post(`${ENDPOINTS.INSTRUCTORS}/${id}/reset-password`)
      .then(unwrapResponse),

  search: (params) =>
    api.get(`${ENDPOINTS.INSTRUCTORS}/search`, { params }).then(unwrapResponse),

  getStatistics: () =>
    api.get(`${ENDPOINTS.INSTRUCTORS}/statistics`).then(unwrapResponse),
};

export default instructorsService;
