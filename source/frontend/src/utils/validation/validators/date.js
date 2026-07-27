export function pastDate(value, rule) {
  if (!value) return null;

  return new Date(value) < new Date() ? null : rule.message;
}

export function futureDate(value, rule) {
  if (!value) return null;

  return new Date(value) > new Date() ? null : rule.message;
}

export function before(value, rule, context) {
  const target = context[rule.field];

  if (!value || !target) return null;

  return new Date(value) < new Date(target) ? null : rule.message;
}

export function after(value, rule, context) {
  const target = context[rule.field];

  if (!value || !target) return null;

  return new Date(value) > new Date(target) ? null : rule.message;
}

export function minAge(value, rule) {
  if (!value) return null;

  const birth = new Date(value);

  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  return age >= rule.value ? null : rule.message;
}
