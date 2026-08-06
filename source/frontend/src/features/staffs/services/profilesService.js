import { createCrudService } from "@/services/crudService";
import { STAFF_PROFILE_FEATURE } from "../constants/profileFeature";

const BASE_STAFF_PROFILE_PATH = STAFF_PROFILE_FEATURE.config.api;

export default function profilesService() {
  return createCrudService(BASE_STAFF_PROFILE_PATH)
}