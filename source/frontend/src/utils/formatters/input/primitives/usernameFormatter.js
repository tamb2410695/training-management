function formatUsername(username) {
  if (typeof username !== "string") {
    return username;
  }

  return username.trim().toLowerCase();
}

module.exports = {
  formatUsername,
};
