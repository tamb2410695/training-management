function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);
}

function objectToCamelCase(object) {
  return Object.entries(object).reduce((result, [key, value]) => {
    result[toCamelCase(key)] = value;
    return result;
  }, {});
}
function objectToSnakeCase(object) {
  return Object.entries(object).reduce((result, [key, value]) => {
    result[toSnakeCase(key)] = value;
    return result;
  }, {});
}
function arrayToCamelCase(array) {
  return array.map(objectToCamelCase);
}

function arrayToSnakeCase(array) {
  return array.map(objectToSnakeCase);
}
module.exports = {
  toCamelCase,
  toSnakeCase,

  objectToCamelCase,
  objectToSnakeCase,

  arrayToCamelCase,
  arrayToSnakeCase,
};
