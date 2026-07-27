export function enumValidator(value, rule) {
  if (!value) return null;
  return rule.values.includes(value) ? null : rule.message;
}
