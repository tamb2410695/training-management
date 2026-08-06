const {
  formatUsername,
  formatEmail,
  normalizeEnum,
  trimString,
  toUpper,
} = require("@/utils/formatters/input/primitives");

const { formatKeyword } = require("@/utils/formatters/input/queryFormatter");
const { hasField } = require("@/utils/helpers");
const { ACCOUNT_FIELDS } = require("./accounts.constants");

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

  if (hasField(data, "search")) {
    data.search = formatKeyword(data.search);
  }

  if (hasField(data, "username")) {
    data.username = formatUsername(data.username);
  }

  if (hasField(data, "email")) {
    data.email = formatEmail(data.email);
  }

  if (hasField(data, "searchField")) {
    const searchField = trimString(data.searchField);

    data.searchField = ACCOUNT_FIELDS.QUERY.SEARCHABLE.includes(
      searchField,
    )
      ? searchField
      : undefined;
  }

  if (hasField(data, "sortBy")) {
    const sortBy = trimString(data.sortBy);

    data.sortBy = ACCOUNT_FIELDS.QUERY.SORTABLE.includes(sortBy)
      ? sortBy
      : undefined;
  }

  if (hasField(data, "sortOrder")) {
    data.sortOrder = toUpper(trimString(data.sortOrder));
  }

  if (hasField(data, "roleCode")) {
    data.roleCode = normalizeEnum(data.roleCode);
  }

  if (hasField(data, "accountStatus")) {
    data.accountStatus = normalizeEnum(data.accountStatus);
  }

  return data;
}

module.exports = {
  formatAccountData,
  formatAccountQuery,
};