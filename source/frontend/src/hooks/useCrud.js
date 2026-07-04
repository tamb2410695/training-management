/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";
import { asyncHookHandler } from "../utils";

export const useCrud = (service, options = { resourceName: "items" }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRecords: 0,
    totalPages: 1,
  });

  const setters = useCallback(() => ({ setLoading, setError }), [setLoading, setError]);

  const getList = useCallback(
    (query = {}) =>
      asyncHookHandler(
        async () => {
          if (!service || typeof service.getList !== "function") {
            console.error("Service không hợp lệ hoặc thiếu hàm getList");
            return;
          }

          const cleanQuery = Object.fromEntries(
            Object.entries(query).filter(
              ([_, value]) => value !== "" && value !== null && value !== undefined,
            ),
          );

          const res = await service.getList(cleanQuery);
          const targetItems = res?.data?.[options.resourceName] || res?.data || [];
          const targetPagination = res?.pagination || {
            page: 1,
            limit: 10,
            totalRecords: 0,
            totalPages: 1,
          };

          setItems(targetItems);
          setPagination(targetPagination);
        },
        setters(),
      )(),
    [service, options.resourceName, setters],
  );

  const createItem = useCallback(
    (data) =>
      asyncHookHandler(
        async () => {
          if (typeof service.create !== "function") return;
          await service.create(data);
          await getList({ page: pagination.page, limit: pagination.limit });
        },
        setters(),
      )(),
    [service, pagination.page, pagination.limit, getList, setters],
  );

  const updateItem = useCallback(
    (id, data) =>
      asyncHookHandler(
        async () => {
          if (typeof service.update !== "function") return;
          await service.update(id, data);
          await getList({ page: pagination.page, limit: pagination.limit });
        },
        setters(),
      )(),
    [service, pagination.page, pagination.limit, getList, setters],
  );

  const deleteItem = useCallback(
    (id) =>
      asyncHookHandler(
        async () => {
          const deleteMethod = service.delete || service.remove;
          if (typeof deleteMethod !== "function") {
            console.error("Service thiếu cả hàm delete lẫn remove");
            return;
          }

          await deleteMethod.call(service, id);

          const isLastItemOnPage = items.length === 1 && pagination.page > 1;
          const targetPage = isLastItemOnPage ? pagination.page - 1 : pagination.page;

          await getList({ page: targetPage, limit: pagination.limit });
        },
        setters(),
      )(),
    [service, pagination.page, pagination.limit, items.length, getList, setters],
  );

  return {
    items,
    loading,
    error,
    pagination,
    getList,
    createItem,
    updateItem,
    deleteItem,
  };
};