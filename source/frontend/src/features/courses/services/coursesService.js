import { createCrudService } from "@/services/crudService";
import { COURSE_FEATURE } from "../constants/courseFeature";

const BASE_COURSE_PATH = COURSE_FEATURE.config.api;

export default function coursesService() {
  return createCrudService(BASE_COURSE_PATH)
}