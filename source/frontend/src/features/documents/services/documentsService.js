import api from "@/services/api";
import { API_ROUTES } from "@/constants";

const API = API_ROUTES.DOCUMENT;

export default function documentsService() {
  return {
    getList: (params = {}) =>
      api.get(API.LIST, {
        params,
      }),

    getById: (id) => api.get(API.DETAIL(id)),

    upload: (formData) =>
      api.post(API.UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

    update: (id, data) => api.patch(API.DETAIL(id), data),

    remove: (id) => api.delete(API.DETAIL(id)),

    restore: (id) => api.patch(API.RESTORE(id)),

    download: (id) =>
      api.get(API.DOWNLOAD(id), {
        responseType: "blob",
      }),
  };
}
