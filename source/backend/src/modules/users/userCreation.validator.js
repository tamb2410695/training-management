const { validateStudentFormats } = require("../students");
const { validateStaffFormats } = require("../staffs/staffs.validator");

const validateProfileFormats = (profileData) => {
  if (!profileData) return;
  validateStudentFormats(profileData)
  validateStaffFormats(profileData)
};

module.exports = {
  validateProfileFormats
};
