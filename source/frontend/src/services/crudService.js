import api from "./api";

export const createCrudService = (resourcePath) => ({
  getList: (params = {}) =>
    api.get(resourcePath.LIST, { params }),

  getById: (id) =>
    api.get(resourcePath.DETAIL(id)),

  create: (data) =>
    api.post(resourcePath.LIST, data),

  update: (id, data) =>
    api.patch(resourcePath.DETAIL(id), data),

  remove: (id) =>
    api.delete(resourcePath.DETAIL(id)),
});