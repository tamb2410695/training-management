export function min(value, rule) {
  if (value == null) return null;
  return Number(value) < rule.value ? rule.message : null;
}

export function max(value, rule) {
  if (value == null) return null;
  return Number(value) > rule.value ? rule.message : null;
}

export function integer(value, rule) {
  if (value == null) return null;
  return Number.isInteger(Number(value)) ? null : rule.message;
}

export function positive(value, rule) {
  if (value == null) return null;
  return Number(value) > 0 ? null : rule.message;
}

export function between(value, rule) {
  if (value == null) return null;
  const number = Number(value);
  return number >= rule.min && number <= rule.max ? null : rule.message;
}
