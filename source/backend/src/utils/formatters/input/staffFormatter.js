
const { hasField } = require("../../helpers");
const { toDate } = require("./primitives/dateFormatter");
const { formatEmail } = require("./primitives/emailFormatter");
const { normalizeEnum } = require("./primitives/enumFormatter");
const { formatUsername } = require("./primitives/usernameFormatter");
const { formatKeyword } = require("./queryFormatter");

function formatStaffData(staffData) {
  const data = {
    ...staffData,
  };

  if (hasField(data, "staffStatus")) {
    data.staffStatus = normalizeEnum(data.staffStatus);
  }

  if (hasField(data, "gender")) {
    data.gender = normalizeEnum(data.gender);
  }
  
  if (hasField(data, "dateOfBirth")) {
    data.dateOfBirth = toDate(data.dateOfBirth);
  }

  if(hasField(data, "accountEmail")) {
    data.accountEmail = formatEmail(data.accountEmail)
  }

  if(hasField(data, "personalEmail")) {
    data.personalEmail = formatEmail(data.personalEmail)
  }


  return data;
}

function formatStaffQuery(query) {
  const data = {
    ...query,
  };

  if (hasField(data, "search")) {
    data.search = formatKeyword(data.search);
  }

  if (hasField(data, "page")) {
    data.page = Number(data.page);
  }

  if (hasField(data, "limit")) {
    data.limit = Number(data.limit);
  }

  if (hasField(data, "staffStatus")) {
    data.staffStatus = normalizeEnum(data.staffStatus);
  }

  if (hasField(data, "gender")) {
    data.gender = normalizeEnum(data.gender);
  }

  return data;
}

module.exports = {
  formatStaffData,
  formatStaffQuery,
};
