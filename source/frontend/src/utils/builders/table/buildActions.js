export function buildActions(actions = []) {
  return actions.map((action) => ({
    key: action.key,
    label: action.label,
    color: action.color,
    type: action.type,
    visible: action.visible ?? true,
  }));
}
