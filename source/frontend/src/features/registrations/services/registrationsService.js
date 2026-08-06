import api from "@/services/api";
import { createCrudService } from "@/services/crudService";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.REGISTRATION;

export default function registrationsService() {
  return {
    ...createCrudService(API),

    approve: (id, data) => api.patch(API.APPROVE(id), data),

    reject: (id) => api.patch(API.REJECT(id)),
  };
}
