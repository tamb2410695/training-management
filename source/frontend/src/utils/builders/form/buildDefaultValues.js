export function buildDefaultValues(fields) {
  return Object.fromEntries(
    Object.values(fields).map((field) => [
      field.key,
      resolveDefaultValue(field),
    ]),
  );
}

function resolveDefaultValue(field) {
  if (field.defaultValue !== undefined && field.defaultValue !== null) {
    return field.defaultValue;
  }
  return getEmptyValue(field);
}

function getEmptyValue(field) {
  switch (field.type) {
    case "text":
    case "email":
    case "phone":
    case "password":
    case "textarea":
      return "";

    case "number":
      return null;

    case "checkbox":
    case "switch":
      return false;

    case "select":
      return "";

    case "date":
      return null;

    default:
      return null;
  }
}
