export const sanitizeFields = (object) => {
  const result = {};

  for (const [key, value] of Object.entries(object)) {
    if (value === undefined || value === null) continue;

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") continue;

      result[key] = trimmed;
      continue;
    }

    result[key] = value;
  }

  return result;
};

