import api from "./api";

export const createCrudService = (resourcePath) => {
  const service = {
    getList: (params = {}) => 
      api.get(`${resourcePath}`, { params }),

    create: (data) => 
      api.post(`${resourcePath}`, data),

    update: (id, data) => 
      api.patch(`${resourcePath}/${id}`, data),

    remove: (id) => 
      api.delete(`${resourcePath}/${id}`),
  };

  return service;
};