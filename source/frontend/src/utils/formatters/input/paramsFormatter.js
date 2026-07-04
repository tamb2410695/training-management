function formatId(id) {
  return String(id).trim();
}

function formatNumericId(id) {
  return Number(String(id).trim());
}

module.exports = {
  formatId,
  formatNumericId,
};
