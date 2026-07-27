export default function required(value, rule) {
  if (value === undefined || value === null || value === "") {
    return rule.message;
  }

  if (typeof value === "string") {
    return value.trim().length > 0 ? null : rule.message;
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? null : rule.message;
  }

  return null;
}
