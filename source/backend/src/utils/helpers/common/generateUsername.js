
const generateUsernameFromEmail = (email) => {
  if (!email || typeof email !== "string") return "";

  const localPart = email.split("@")[0].toLowerCase().trim();

  const cleanedUsername = localPart.replace(/[^a-z0-9_]/g, "");

  return cleanedUsername;
};

module.exports = {
  generateUsernameFromEmail,
};