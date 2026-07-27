export function buildApiPayload(fields, values, mode) {
  const payload = {};

  Object.values(fields).forEach((field) => {
    if (!field.api?.[mode]) {
      return;
    }

    payload[field.key] = values[field.key];
  });

  return payload;
}
