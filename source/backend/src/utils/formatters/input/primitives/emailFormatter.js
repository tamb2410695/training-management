function formatEmail(email) {
  if (typeof email !== "string") {
    return email;
  }

  return email.trim().toLowerCase();
}

module.exports = {
  formatEmail,
};
