import { API_ROUTES } from "../../../constants";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";

const BASE_ACCOUNT_PATH = API_ROUTES.ACCOUNT.LIST;

const accountsService = {
  ...createCrudService(BASE_ACCOUNT_PATH),

  updateStatus: (id, newStatus) =>
    api.patch(`${BASE_ACCOUNT_PATH}/${id}/status`, { accountStatus: newStatus }), 

  changeRole: (id, targetRoleCode) =>
    api.put(`${BASE_ACCOUNT_PATH}/${id}/role`, { targetRoleCode }),
};

export default accountsService;