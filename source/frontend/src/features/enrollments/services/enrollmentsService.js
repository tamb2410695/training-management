import api from "@/services/api";
import { createCrudService } from "@/services/crudService";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.ENROLLMENT;

export default function enrollmentsService() {
  return {
    ...createCrudService(API),

    approve: (id) => api.patch(API.APPROVE(id)),

    reject: (id) => api.patch(API.REJECT(id)),
  };
}
