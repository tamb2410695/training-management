import { useCallback, useState } from "react";

import { DEFAULT_PAGINATION } from "@/constants";
import { buildRequestParams } from "@/utils/builders/query/buildRequestParams";
import { useLoading } from "../state";

export function useCrud(service, options = {}) {
  const resourceName = options.resourceName ?? "items";

  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
  const [error, setError] = useState(null);

  const { loading, startLoading, stopLoading } = useLoading();

  const execute = useCallback(
    async (callback) => {
      try {
        setError(null);
        startLoading();

        return await callback();
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading],
  );

  const getList = useCallback(
    async (query = {}) => {
      return execute(async () => {
        const params = buildRequestParams(query);
        const response = await service.getList(params);
        const data = response.data ?? {};
        
        const items = data[resourceName] ?? [];
        const pagination = data.pagination ?? DEFAULT_PAGINATION;

        if (
          pagination.page > pagination.totalPages &&
          pagination.totalPages > 0
        ) {
          setPagination((prev) => ({
            ...prev,
            page: pagination.totalPages,
          }));
          return response;
        }

        setItems(items);
        setPagination(pagination);
      });
    },
    [execute, service, resourceName],
  );

  const createItem = useCallback(
    async (data) => {
      return execute(() => service.create(data));
    },
    [execute, service],
  );

  const updateItem = useCallback(
    async (id, data) => {
      return execute(() => service.update(id, data));
    },
    [execute, service],
  );

  const deleteItem = useCallback(
    async (id) => {
      return execute(() => service.remove(id));
    },
    [execute, service],
  );

  return {
    items,
    pagination,
    loading,
    error,

    getList,

    createItem,
    updateItem,
    deleteItem,

    setItems,
    setPagination,
    setError,
  };
}
