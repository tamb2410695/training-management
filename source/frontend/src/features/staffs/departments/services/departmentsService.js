import { API_ROUTES } from "../../../constants";
import { createCrudService } from "../../../services/crudService";

const BASE_DEPARTMENT_PATH = API_ROUTES.DEPARTMENT.LIST;

const departmentsService = {
  ...createCrudService(BASE_DEPARTMENT_PATH),
};

export default departmentsService;