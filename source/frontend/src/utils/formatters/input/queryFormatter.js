function formatPage(page) {
  return Number(page);
}

function formatLimit(limit) {
  return Number(limit);
}

function formatKeyword(keyword) {
  if (typeof keyword !== "string") {
    return keyword;
  }

  return keyword.trim().replace(/\s+/g, " ");
}

function formatSortBy(sortBy) {
  if (typeof sortBy !== "string") {
    return sortBy;
  }

  return sortBy.trim().toLowerCase();
}

module.exports = {
  formatPage,
  formatLimit,
  formatKeyword,
  formatSortBy,
};
