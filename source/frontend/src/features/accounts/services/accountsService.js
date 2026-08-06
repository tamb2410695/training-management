import api from "@/services/api";
import { createCrudService } from "@/services/crudService";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.ACCOUNT;

export default function accountsService() {
  return {
    ...createCrudService(API),

    lock: (id) => api.patch(API.LOCK(id)),

    activate: (id) => api.patch(API.ACTIVATE(id)),

    disable: (id) => api.patch(API.DISABLE(id)),

    restore: (id) => api.patch(API.RESTORE(id)),

    changePassword: (id, data) => api.patch(API.CHANGE_PASSWORD(id), data),

    changeRole: (id, data) => api.patch(API.CHANGE_ROLE(id), data),
  };
}
