import { ENDPOINTS } from "../../../constants/endpoint";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";
import { unwrapResponse } from "../../../utils";

const accountsService = {
  ...createCrudService("accounts"),

  updateStatus: (id, status) =>
    api
      .patch(`${ENDPOINTS.ACCOUNTS}/${id}/status`, { status })
      .then(unwrapResponse),

  search: (params) =>
    api.get(`${ENDPOINTS.ACCOUNTS}/search`, { params }).then(unwrapResponse),

  getStatistics: () =>
    api.get(`${ENDPOINTS.ACCOUNTS}/statistics`).then(unwrapResponse),
};

export default accountsService;
