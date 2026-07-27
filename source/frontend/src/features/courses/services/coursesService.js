import { API_ROUTES } from "../../../constants";
import { createCrudService } from "../../../services/crudService";

const BASE_COURSE_PATH = API_ROUTES.COURSE.LIST;

const coursesService = {
  ...createCrudService(BASE_COURSE_PATH),
};

export default coursesService;