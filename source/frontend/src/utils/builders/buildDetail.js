// builders/buildDetail.js

export function buildDetail(fields) {
  return Object.values(fields)
    .filter((field) => field.detail !== false)
    .map((field) => ({
      key: field.key,

      label: field.label,

      type: field.type,

      options: field.options,
    }));
}
