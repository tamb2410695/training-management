const { hasField } = require("../../helpers");
const { formatAccountData } = require("./accountFormatter");
const { formatEmail } = require("./primitives/emailFormatter");
const { formatUsername } = require("./primitives/usernameFormatter");

function formatAuthData(authData) {
  if (!authData) return authData;

  let data = formatAccountData(authData);
  
  if (hasField(data, "usernameOrEmail")) {
    const value = data.usernameOrEmail.trim();
    if (value.includes("@")) {
      data.usernameOrEmail = formatEmail(value);
    } else {
      data.usernameOrEmail = formatUsername(value);
    }
  }
  if (hasField(data, "refreshToken") && typeof data.refreshToken === "string") {
    data.refreshToken = data.refreshToken.trim().replace(/^Bearer\s+/i, "");
  }


  return data;
}

module.exports = {
  formatAuthData,
};