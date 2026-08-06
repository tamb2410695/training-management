const {
  normalizeEnum,
  toDate,
  formatEmail,
  trimString,
  toUpper,
} = require("@/utils/formatters/input/primitives");

const { formatKeyword } = require("@/utils/formatters/input/queryFormatter");

const { hasField } = require("@/utils/helpers");

const { REGISTRATION_FIELDS } = require("./registrations.constants");

function formatRegistrationData(registrationData) {
  const data = {
    ...registrationData,
  };

  if (hasField(data, "fullName")) {
    data.fullName = trimString(data.fullName);
  }

  if (hasField(data, "gender")) {
    data.gender = normalizeEnum(data.gender);
  }

  if (hasField(data, "dateOfBirth")) {
    data.dateOfBirth = toDate(data.dateOfBirth);
  }

  if (hasField(data, "phone")) {
    data.phone = trimString(data.phone);
  }

  if (hasField(data, "personalEmail")) {
    data.personalEmail = formatEmail(data.personalEmail);
  }

  if (hasField(data, "address")) {
    data.address = trimString(data.address);
  }

  if (hasField(data, "courseId")) {
    data.courseId = Number(data.courseId);
  }

  return data;
}

function formatRegistrationQuery(query) {
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

  if (hasField(data, "searchField")) {
    const searchField = trimString(data.searchField);

    data.searchField = REGISTRATION_FIELDS.QUERY.SEARCHABLE.includes(
      searchField,
    )
      ? searchField
      : undefined;
  }

  if (hasField(data, "sortBy")) {
    const sortBy = trimString(data.sortBy);

    data.sortBy = REGISTRATION_FIELDS.QUERY.SORTABLE.includes(sortBy)
      ? sortBy
      : undefined;
  }

  if (hasField(data, "sortOrder")) {
    data.sortOrder = toUpper(trimString(data.sortOrder));
  }

  if (hasField(data, "registrationStatus")) {
    data.registrationStatus = normalizeEnum(data.registrationStatus);
  }

  if (hasField(data, "studentId")) {
    data.studentId = Number(data.studentId);
  }

  return data;
}

module.exports = {
  formatRegistrationData,
  formatRegistrationQuery,
};
