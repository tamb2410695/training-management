import { API_ROUTES } from "../../../../constants";
import { createCrudService } from "../../../services/crudService";

const BASE_STAFF_PROFILE_PATH = API_ROUTES.STAFF_PROFILE.LIST; 

const staffProfileService = {
  ...createCrudService(BASE_STAFF_PROFILE_PATH),

  createStaff: async (staffPayload) => {
    return staffProfileService.create(staffPayload);
  }
};

export default staffProfileService;