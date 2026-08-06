import { createCrudService } from "@/services/crudService";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.COURSE_CATEGORY;

export default function courseCategoriesService() {
  return {
    ...createCrudService(API),
  };
}
