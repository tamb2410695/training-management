export function email(value, rule) {
  if (!value) return null;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) ? null : rule.message;
}

export function phone(value, rule) {
  if (!value) return null;

  const regex = /^0\d{9,10}$/;

  return regex.test(value) ? null : rule.message;
}

export function username(value, rule) {
  if (!value) return null;

  const regex = /^[a-zA-Z0-9_]+$/;

  return regex.test(value) ? null : rule.message;
}

export function url(value, rule) {
  if (!value) return null;

  try {
    new URL(value);

    return null;
  } catch {
    return rule.message;
  }
}

export const strongPassword = (value, rule) => {
  if (!value) return null;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(value) ? null : rule.message;
};

