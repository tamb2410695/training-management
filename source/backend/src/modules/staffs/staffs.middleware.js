const {
  validateAllowedFields,
} = require("@/utils/validators/request/requestFields.validator");

const {
  validateRequiredFields,
} = require("@/utils/validators/request/requiredFields.validator");

const {
  sanitizePatchBody,
} = require("@/utils/validators/request/patch.validator");

const { validateId } = require("@/utils/validators/common/id.validator");

const { formatNumericId } = require("@/utils/formatters/input/paramsFormatter");

const { sanitizeFields, pickFields, throwIf } = require("@/utils/helpers");

const { BadRequestError } = require("@/utils/errors");

const { ERROR_MESSAGES } = require("@/constants");

const { formatAccountData } = require("../accounts/accounts.formatter");

const { validateAccountFormats } = require("../accounts/accounts.validator");

const { STAFF_PROFILE_FIELDS, ACCOUNT_FIELDS } = require("./staffs.constants");

const { formatStaffQuery, formatStaffData } = require("./staffs.formatter");

const { validateStaffFormats } = require("./staffs.validator");

const STAFF_QUERY_FIELDS = [
  ...STAFF_PROFILE_FIELDS.QUERY.ALLOWED_KEYS,
  ...ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS,
];

const getList = (query) => {
  validateAllowedFields(query, STAFF_QUERY_FIELDS);

  const rawQueryData = sanitizeFields(pickFields(query, STAFF_QUERY_FIELDS));

  const formattedQueryData = formatStaffQuery(rawQueryData);

  validateStaffFormats(formattedQueryData);

  return formattedQueryData;
};

const getById = (params) => {
  const staffId = formatNumericId(params.id);
  validateId(staffId);
  return staffId;
};

const create = (body) => {
  const allowedFields = [
    ...STAFF_PROFILE_FIELDS.BODY.CREATE,
    ...ACCOUNT_FIELDS.BODY.CREATE,
  ];

  validateAllowedFields(body, allowedFields);

  const accountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.CREATE),
  );

  const profileData = sanitizeFields(
    pickFields(body, STAFF_PROFILE_FIELDS.BODY.CREATE),
  );

  validateRequiredFields(accountData, ACCOUNT_FIELDS.REQUIRED.CREATE);

  validateRequiredFields(profileData, STAFF_PROFILE_FIELDS.REQUIRED.CREATE);

  const formattedAccountData = formatAccountData(accountData);

  const formattedProfileData = formatStaffData(profileData);

  validateAccountFormats(formattedAccountData);

  validateStaffFormats(formattedProfileData);

  return {
    accountData: formattedAccountData,
    profileData: formattedProfileData,
  };
};

const update = (params, body) => {
  const staffId = formatNumericId(params.id);

  validateId(staffId);

  validateAllowedFields(body, STAFF_PROFILE_FIELDS.BODY.UPDATE);

  const sanitizedData = sanitizeFields(
    pickFields(body, STAFF_PROFILE_FIELDS.BODY.UPDATE),
  );

  throwIf(
    Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const staffData = formatStaffData(sanitizedData);

  validateStaffFormats(staffData);

  return {
    params: staffId,
    body: staffData,
  };
};

const partialUpdate = (params, body) => {
  const staffId = formatNumericId(params.id);

  validateId(staffId);

  validateAllowedFields(body, STAFF_PROFILE_FIELDS.BODY.UPDATE);

  const sanitizedData = sanitizePatchBody(
    body,
    STAFF_PROFILE_FIELDS.BODY.UPDATE,
  );

  throwIf(
    Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const staffData = formatStaffData(sanitizedData);

  validateStaffFormats(staffData);

  return {
    params: staffId,
    body: staffData,
  };
};

module.exports = {
  getList,
  getById,
  create,
  update,
  partialUpdate,
};
