export function resolveModalActions(config) {
  const actions = [...config];

  if (!actions.includes("cancel")) {
    actions.push("cancel");
  }

  return actions;
}
