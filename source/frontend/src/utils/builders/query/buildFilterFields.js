export function getDefaultValue(type) {
  switch (type) {
    case "multi-select":
      return [];
    case "select":
      return "";
    case "date-range":
      return {
        from: null,
        to: null,
      };
    case "boolean":
      return null;
    default:
      return "";
  }
}

export function resolveFilterConfig(field) {
  if (!field.query.filter || !field.enum) {
    return null;
  }

  if (field.enum.options && field.enum.options.length) {
    return {
      type: "multi-select",
      defaultValue: getDefaultValue(field.type),
    };
  }

  if (field.type === "date") {
    return {
      type: "date-range",
      defaultValue: getDefaultValue(field.type),
    };
  }

  return {
    type: "text",
    defaultValue: getDefaultValue(field.type),
  };
}

export function buildFilterFields(fields) {
  return Object.values(fields)
    .map((field) => {
      const filter = resolveFilterConfig(field);
      if (!filter) {
        return null;
      }
      return {
        key: field.key,
        label: field.label,
        options: field.enum?.options ?? [],
        ...filter,
      };
    })
    .filter(Boolean);
}
