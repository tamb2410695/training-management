import { API_ROUTES } from "../../../constants";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";

const BASE_STAFF_PATH = API_ROUTES.STAFF_PROFILE.LIST;

const instructorsService = {
  ...createCrudService(BASE_STAFF_PATH),

  updateStatus: (id, newStatus) =>
    api.patch(`${BASE_STAFF_PATH}/${id}/status`, { accountStatus: newStatus }), 

  changeRole: (id, targetRoleCode) =>
    api.put(`${BASE_STAFF_PATH}/${id}/role`, { targetRoleCode }),
};

export default instructorsService;