import { createCrudService } from "@/services/crudService";
import { DEPARTMENT_FEATURE } from "../constants/departmentFeature";

const BASE_DEPARTMENT_PATH = DEPARTMENT_FEATURE.config.api;

export default function departmentsService() {
  return createCrudService(BASE_DEPARTMENT_PATH)
}