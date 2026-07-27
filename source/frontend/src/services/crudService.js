import api from "./api";

export const createCrudService = (resourcePath) => {
  const service = {
    getList: (params = {}) => 
      api.get(`${resourcePath.LIST}`, { params }),

    create: (data) => 
      api.post(`${resourcePath.LIST}`, data),

    update: (id, data) => 
      api.patch(`${resourcePath.DETAIL(id)}`, data),

    remove: (id) => 
      api.delete(`${resourcePath.DETAIL(id)}`),
  };

  return service;
};