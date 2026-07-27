const { formatPage } = require("./queryFormatter");

function hasField(obj, key) {
  return (
    Object.prototype.hasOwnProperty.call(obj, key) &&
    obj[key] !== undefined &&
    obj[key] !== null
  );
}

function formatDepartmentData(departmentData) {
  const data = {
    ...departmentData,
  };

  if (hasField(data, "departmentCode")) {
    data.departmentCode = String(data.departmentCode).trim();
  }

  if (hasField(data, "departmentName")) {
    data.departmentName = String(data.departmentName).trim();
  }

  return data;
}

function formatDepartmentQuery(query) {
  const data = {
    ...query,
  };

  if (hasField(data, "page")) {
    data.page = formatPage(data.page);
  }

  if (hasField(data, "limit")) {
    data.limit = Number(data.limit);
  }

  if (hasField(data, "departmentCode")) {
    data.departmentCode = String(data.departmentCode).trim();
  }

  if (hasField(data, "departmentName")) {
    data.departmentName = String(data.departmentName).trim();
  }

  return data;
}

module.exports = {
  formatDepartmentData,
  formatDepartmentQuery,
};