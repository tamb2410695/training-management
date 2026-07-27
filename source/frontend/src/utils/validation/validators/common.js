export function required(value, rule) {
  const empty = value === undefined || value === null || value === "";
  return empty ? rule.message : null;
}

export function nullable() {
  return null;
}
