import { useCallback } from "react";

export function useFeatureResourceActions({ crud, query, featureFeedback }) {
  const refresh = useCallback(() => {
      query.refresh();
  }, [query]);

  const reset = useCallback(() => {
    query.resetQuery();
  }, [query]);

  const create = useCallback(
    async (data) => {
      const result = await crud.createItem(data);

      query.refresh();

      return result;
    },
    [crud, query],
  );

  const update = useCallback(
    async (id, data) => {
      const result = await crud.updateItem(id, data);

      query.refresh();

      return result;
    },
    [crud, query],
  );

  const remove = useCallback(
    async (id) => {
      try {
        const result = await crud.deleteItem(id);
        query.refresh();
        return result;
      } catch (error) {
        featureFeedback.handleError(error);
      }
    },
    [crud, query, featureFeedback],
  );

  return {
    create,
    update,
    remove,

    refresh,
    reset,
  };
}
