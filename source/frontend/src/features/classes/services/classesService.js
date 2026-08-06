import api from "@/services/api";
import { createCrudService } from "@/services/crudService";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.CLASS;

export default function classesService() {
  return {
    ...createCrudService(API),

    assignInstructor: (id, data) => api.patch(API.ASSIGN_INSTRUCTOR(id), data),

    open: (id) => api.patch(API.OPEN(id)),

    start: (id) => api.patch(API.START(id)),

    complete: (id) => api.patch(API.COMPLETE(id)),

    cancel: (id) => api.patch(API.CANCEL(id)),

    getCapacity: (id) => api.get(API.CAPACITY(id)),
  };
}
