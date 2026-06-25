const hasField = (data, field) => {
  return Object.prototype.hasOwnProperty.call(data, field);
}

module.exports = {
  hasField,
}