import { useState } from "react";

export const useCrud = (service) => {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({});

  const getList = async (query) => {
    try {
      setLoading(true);

      const result = await service.getList(query);

      setItems(result.data);

      setPagination(result.pagination);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (data) => service.create(data);

  const updateItem = async (id, data) => service.update(id, data);

  const deleteItem = async (id) => service.remove(id);

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
