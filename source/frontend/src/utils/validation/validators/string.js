export function minLength(value, rule) {
  if (value == null) return null;
  return String(value).length < rule.value ? rule.message : null;
}
export function maxLength(value, rule) {
  if (value == null) return null;
  return String(value).length > rule.value ? rule.message : null;
}

export function exactLength(value, rule) {
  if (value == null) return null;
  return String(value).length !== rule.value ? rule.message : null;
}

export function pattern(value, rule) {
  if (!value) return null;
  return rule.value.test(value) ? null : rule.message;
}

export function contains(value, rule) {
  if (!value) return null;
  return value.includes(rule.value) ? null : rule.message;
}

export default function startsWith(value, rule) {
  if (!value) return null;
  return value.startsWith(rule.value) ? null : rule.message;
}
