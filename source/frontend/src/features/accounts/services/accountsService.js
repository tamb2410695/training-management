import { createCrudService } from "@/services/crudService";
import { ACCOUNT_FEATURE } from "../constants";

const BASE_ACCOUNT_PATH = ACCOUNT_FEATURE.config.api;

export default function accountsService() {
  return createCrudService(BASE_ACCOUNT_PATH)
}