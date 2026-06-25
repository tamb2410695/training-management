import api from "./api";
import { unwrapResponse } from "../utils";

export const createCrudService = (resource) => ({
  getList: (params = {}) => 
    api.get(`/${resource}`, { params }).then(unwrapResponse),

  getById: (id) => 
    api.get(`/${resource}/${id}`).then(unwrapResponse),

  create: (data) => 
    api.post(`/${resource}`, data).then(unwrapResponse),

  update: (id, data) => 
    api.put(`/${resource}/${id}`, data).then(unwrapResponse),

  partialUpdate: (id, data) => 
    api.patch(`/${resource}/${id}`, data).then(unwrapResponse),

  remove: (id) => 
    api.delete(`/${resource}/${id}`).then(unwrapResponse),
});