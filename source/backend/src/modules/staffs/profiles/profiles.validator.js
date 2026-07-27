const { BadRequestError } = require("../../../utils/errors");
const { ERROR_MESSAGES, GENDER, STAFF_STATUS } = require("../../../constants");
const { STAFF_FIELDS, ACCOUNT_FIELDS } = require("./profiles.constants");
const { formatNumericId } = require("../../../utils/formatters");
const {
  pickFields,
  sanitizeFields,
  hasField,
  throwIf,
} = require("../../../utils/helpers");
const {
  validateId,
  validatePagination,
  validateEnum,
  validateEmail,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("../../../utils/validators");
const {
  formatStaffData,
} = require("../../../utils/formatters/input/staffFormatter");
const {
  formatAccountData,
} = require("../../../utils/formatters/input/accountFormatter");
const { validateAccountFormats } = require("../../accounts/accounts.validator");
const validateStaffFormats = (staffData) => {
  if (!staffData) return;

  if (hasField(staffData, "page") || hasField(staffData, "limit")) {
    validatePagination(staffData.page, staffData.limit);
  }

  if (hasField(staffData, "accountId"))
    validateId(staffData.accountId, "accountId");

  if (hasField(staffData, "personalEmail"))
    validateEmail(staffData.personalEmail);

  if (hasField(staffData, "gender")) {
    validateEnum(staffData.gender, Object.values(GENDER), "gender");
  }

  if (hasField(staffData, "staffStatus")) {
    validateEnum(
      staffData.staffStatus,
      Object.values(STAFF_STATUS),
      "staffStatus",
    );
  }

  if (hasField(staffData, "contractType")) {
    validateEnum(
      staffData.contractType,
      ["PROBATION", "FULL_TIME", "PART_TIME"],
      "contractType",
    );
  }

  if (hasField(staffData, "phone")) {
    const phoneRegex = /^[0-9]{9,11}$/;
    throwIf(
      !phoneRegex.test(staffData.phone),
      BadRequestError,
      "Invalid phone number format",
    );
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, STAFF_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(
    pickFields(query, STAFF_FIELDS.QUERY.ALLOWED_KEYS),
  );
  if (rawQueryData.departmentId)
    rawQueryData.departmentId = formatNumericId(rawQueryData.departmentId);
  validateStaffFormats(rawQueryData);
  return rawQueryData;
};

const validateGetById = (params) => {
  const staffId = formatNumericId(params.id);
  validateId(staffId);
  return staffId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, [
    ...STAFF_FIELDS.BODY.CREATE,
    ...ACCOUNT_FIELDS.BODY.CREATE,
  ]);
  const rawAccountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.CREATE),
  );
  const rawProfileData = sanitizeFields(
    pickFields(body, STAFF_FIELDS.BODY.CREATE),
  );
  validateRequiredFields(rawAccountData, ACCOUNT_FIELDS.REQUIRED.CREATE);
  validateRequiredFields(rawProfileData, STAFF_FIELDS.REQUIRED.CREATE);
  const formatedAcountData = formatAccountData(rawAccountData);
  const formatedProfileData = formatStaffData(rawProfileData);
  validateAccountFormats(formatedAcountData);
  validateStaffFormats(formatedProfileData);
  return { accountData: formatedAcountData, profileData: formatedProfileData };
};

const validateUpdate = (params, body) => {
  const staffId = formatNumericId(params.id);
  validateId(staffId);

  validateAllowedFields(body, STAFF_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizeFields(
    pickFields(body, STAFF_FIELDS.BODY.UPDATE),
  );

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  validateStaffFormats(sanitizedData);

  return { staffId, staffData: sanitizedData };
};

const validatePartialUpdate = (params, body) => {
  const staffId = formatNumericId(params.id);
  validateId(staffId);

  validateAllowedFields(body, STAFF_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizePatchBody(body, STAFF_FIELDS.BODY.UPDATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  validateStaffFormats(sanitizedData);

  return { staffId, staffData: sanitizedData };
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
};
