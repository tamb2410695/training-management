import { useActions } from "../state/useActions";

export function useFeatureToolbar({
  schema,
  config = [],
  query,
  actions = {},
}) {
  const toolbarActions = useActions(config, actions);

  return {
    schema: schema.query,
    query: query.query,
    onChange: query.updateQuery,
    actions: toolbarActions,
  };
}
