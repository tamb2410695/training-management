import { useActions } from "../state/useActions";

export function useFeatureToolbar({
  config = [],
  query,
  actions = {},
}) {
  const toolbarActions = useActions(config, actions);

  return {
    schema: query.schema,
    query: query.query,
    onChange: query.updateQuery,
    actions: toolbarActions,
  };
}
