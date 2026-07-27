import { createCrudService } from "@/services/crudService";
import { STUDENT_FEATURE } from "../constants";

const BASE_STUDENT_PATH = STUDENT_FEATURE.config.api;

export default function studentsService() {
  return createCrudService(BASE_STUDENT_PATH)
}