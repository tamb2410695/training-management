import { API_ROUTES } from "../../../constants";
import api from "../../../services/api";
import { createCrudService } from "../../../services/crudService";

const BASE_REGISTRATION_PATH = API_ROUTES.REGISTRATION.LIST; 

const registrationsService = {
  ...createCrudService(BASE_REGISTRATION_PATH),
  
  getById: (id) => api.get(API_ROUTES.REGISTRATION.DETAIL(id)),

  activate: (id, activationData = {}) =>
    api.post(API_ROUTES.REGISTRATION.ACTIVATE(id), activationData),

  reject: (id, reasonData = {}) =>
    api.post(API_ROUTES.REGISTRATION.REJECT(id), reasonData),
};

export default registrationsService;