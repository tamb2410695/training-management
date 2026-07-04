const { hasField } = require("../../helpers");
const { formatId, formatNumericId } = require("./paramsFormatter");
const { formatEmail } = require("./primitives/emailFormatter");
const { normalizeEnum } = require("./primitives/enumFormatter");
const { formatUsername } = require("./primitives/usernameFormatter");
const { formatPage } = require("./queryFormatter");

function formatAccountData(accountData) {
  const data = {
    ...accountData,
  };

  if (hasField(data, "username")) {
    data.username = formatUsername(data.username);
  }

  if (hasField(data, "email")) {
    data.email = formatEmail(data.email);
  }

  if (hasField(data, "roleCode")) {
    data.roleCode = normalizeEnum(data.roleCode);
  }

  if (hasField(data, "accountStatus")) {
    data.accountStatus = normalizeEnum(data.accountStatus);
  }

  return data;
}

function formatAccountQuery(query) {
  const data = {
    ...query,
  };

  if (hasField(data, "page")) {
    data.page = Number(data.page);
  }

  if (hasField(data, "limit")) {
    data.limit = Number(data.limit);
  }

  if (hasField(data, "accountStatus")) {
    data.accountStatus = normalizeEnum(data.accountStatus);
  }

  if (hasField(data, "username")) {
    data.username = formatUsername(data.username); 
  }

  if (hasField(data, "email")) {
    data.email = formatEmail(data.email);
  }

  if (hasField(data, "roleCode")) {
    data.roleCode = normalizeEnum(data.roleCode);
  }

  return data;
}

module.exports = {
  formatAccountData,
  formatAccountQuery,
};