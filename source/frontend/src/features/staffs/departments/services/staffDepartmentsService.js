import { createCrudService } from "@/services/crudService";
import { STAFF_DEPARTMENT_FEATURE } from "../constants";

const BASE_STAFF_DEPARTMENT_PATH = STAFF_DEPARTMENT_FEATURE.config.api;

export default function staffDepartmentsService() {
  return createCrudService(BASE_STAFF_DEPARTMENT_PATH)
}