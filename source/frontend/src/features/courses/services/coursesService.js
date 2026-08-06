import api from "@/services/api";
import { createCrudService } from "@/services/crudService";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.COURSE;

export default function coursesService() {
  return {
    ...createCrudService(API),

    publish: (id) => api.patch(API.PUBLISH(id)),

    archive: (id) => api.patch(API.ARCHIVE(id)),
  };
}
