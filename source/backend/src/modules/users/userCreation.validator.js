const {
  formatAccountData,
} = require("../../utils/formatters/input/accountFormatter");
const {
  formatEnumArray,
} = require("../../utils/formatters/input/primitives/formatEnumArray");
const {
  formatStudentData,
} = require("../../utils/formatters/input/studentFormatter");
const { sanitizeFields, pickFields, hasField } = require("../../utils/helpers");
const { validateEnum } = require("../../utils/validators");
const {
  USER_FIELDS,
  PROFILE_TYPE,
  ACCOUNT_FIELDS,
  PROFILE_FIELDS,
} = require("./userCreation.constants");

const staffProfilesValidator = require("../staffs/profiles/profiles.validator");
const { STAFF_STATUS, STUDENT_STATUS } = require("../../constants");

const validateAccountFormats = (accountData) => {
  if (!accountData) return;

  if (hasField(accountData, "username")) {
    validateUsername(accountData.username);
  }

  if (hasField(accountData, "email")) {
    validateEmail(accountData.email);
  }

  if(hasField(accountData, "roleCode"))  {
    validateEnum(roleCode, ROLES, "roleCode")
  }
}

const validateProfileFormats = (profileData) => {
  if (!profileData) return;

  if (hasField(profileData, "personalEmail"))
    validateEmail(profileData.personalEmail);

  if (hasField(profileData, "gender")) {
    validateEnum(profileData.gender, GENDER, "gender");
  }

  if (hasField(profileData, "contractType")) {
    validateEnum(
      profileData.contractType,
      ["PROBATION", "FULL_TIME", "PART_TIME"],
      "contractType",
    );
  }

  if (hasField(profileData, "phone")) {
    const phoneRegex = /^[0-9]{9,11}$/;
    throwIf(
      !phoneRegex.test(profileData.phone),
      BadRequestError,
      "Invalid phone number format",
    );
  }
};

const validateCreate = (body) => {
  validateAllowedFields(body, USER_FIELDS.BODY.CREATE_PAYLOAD);
  const rawAccountData = body.accountData;
  const rawProfileData = body.profileData;

  const rawAccountData = sanitizeFields(
    pickFields(body.accountData, ACCOUNT_FIELDS.REQUIRED.CREATE),
  );
  const rawProfileData = sanitizeFields(
    pickFields(body.accountData, PROFILE_FIELDS.REQUIRED.CREATE),
  );
  const formatedAccountData = formatAccountData(rawAccountData);
  const formatedProfileData = formatStudentData(rawProfileData);
  const formatedProfileType = formatEnumArray(body.profileType);

  validateEnum(formatedProfileData, PROFILE_TYPE);
  return {
    profileTypeL: formatedProfileData,
    accountData: formatedAccountData,
    profileData: formatedProfileData,
  };
};

const validateCreateStaff = (body) => {
  validateAllowedFields(body, USER_FIELDS.BODY.CREATE_PAYLOAD);
  const rawAccountData = body.accountData;
  const rawProfileData = body.profileData;

  const rawAccountData = sanitizeFields(
    pickFields(body.accountData, ACCOUNT_FIELDS.REQUIRED.CREATE),
  );
  const rawProfileData = sanitizeFields(
    pickFields(body.accountData, PROFILE_FIELDS.STAFF.REQUIRED.CREATE),
  );
  const formatedProfileType = formatEnumArray(body.profileType);
  const formatedAccountData = formatAccountData(rawAccountData);
  const formatedProfileData = formatStaffData(rawProfileData);

  validateEnum(formatedProfileData, PROFILE_TYPE);
  validateAccountFormats(formatedAccountData)
  validateProfileFormats(formatedProfileData)
  return {
    profileType: formatedProfileData,
    accountData: formatedAccountData,
    staffData: formatedProfileData,
  };
};

const validateCreateStudent = (body) => {
  validateAllowedFields(body, USER_FIELDS.BODY.CREATE_PAYLOAD);
  const rawAccountData = body.accountData;
  const rawProfileData = body.profileData;

  const rawAccountData = sanitizeFields(
    pickFields(body.accountData, ACCOUNT_FIELDS.REQUIRED.CREATE),
  );
  const rawProfileData = sanitizeFields(
    pickFields(body.accountData, PROFILE_FIELDS.STAFF.REQUIRED.CREATE),
  );
  const formatedProfileType = formatEnumArray(body.profileType);
  const formatedAccountData = formatAccountData(rawAccountData);
  const formatedProfileData = formatStudentData(rawProfileData);

  validateEnum(formatedProfileData, USER_FIELDS.BODY.ALLOWED_PROFILE_TYPES);
  validateAccountFormats(formatedAccountData)
  validateProfileFormats(formatedProfileData)
  return {
    profileType: formatedProfileData,
    accountData: formatedAccountData,
    studentData: formatedProfileData,
  };
};

module.exports = {
  validateCreateStaff,
  validateCreateStudent
};
