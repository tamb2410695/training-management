export function getVisibleFields(fields, key) {
  return Object.values(fields)
    .filter(field => field[key] !== false);
}


export function getFields(fields) {
  return Object.values(fields);
}