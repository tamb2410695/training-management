const { BadRequestError } = require("../../utils/errors");
const {
  ERROR_MESSAGES,
  USER_CREATION,
  GENDER,
  REGISTRATION_STATUS,
} = require("../../constants");
const { REGISTRATION_FIELDS, ACCOUNT_FIELDS } = require("./registrations.constants");
const { formatNumericId } = require("../../utils/formatters");
const {
  pickFields,
  sanitizeFields,
  hasField,
  throwIf,
} = require("../../utils/helpers");
const {
  validateId,
  validatePagination,
  validateEnum,
  validateEmail,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
  validateUsername,
} = require("../../utils/validators");
const { formatAccountData } = require("../../utils/formatters/input/accountFormatter");
const { formatStudentData } = require("../../utils/formatters/input/studentFormatter");

const validateRegistrationFormats = (data) => {
  if (!data) return;

  if (hasField(data, "page") || hasField(data, "limit")) {
    validatePagination(data.page, data.limit);
  }

  if (hasField(data, "accountId")) validateId(data.accountId, "accountId");

  if (hasField(data, "username")) {
    validateUsername(data.username);
  }

  if (hasField(data, "email")) {
    validateEmail(data.email);
  }

  if (hasField(data, "personalEmail")) validateEmail(data.personalEmail);

  if (hasField(data, "registrationStatus")) {
    validateEnum(
      data.registrationStatus,
      Object.values(REGISTRATION_STATUS),
      "registrationStatus",
    );
  }

  if (hasField(data, "gender")) {
    validateEnum(data.gender, Object.values(GENDER), "gender");
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, REGISTRATION_FIELDS.QUERY.ALLOWED_KEYS);
  const rawQueryData = sanitizeFields(
    pickFields(query, REGISTRATION_FIELDS.QUERY.ALLOWED_KEYS),
  );
  validateRegistrationFormats(rawQueryData);
  return rawQueryData;
};

const validateGetById = (params) => {
  const registrationId = formatNumericId(params.id);
  validateId(registrationId);
  return registrationId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, REGISTRATION_FIELDS.BODY.CREATE);
  const sanitizedData = sanitizeFields(
    pickFields(body, REGISTRATION_FIELDS.BODY.CREATE),
  );
  validateRequiredFields(sanitizedData, REGISTRATION_FIELDS.REQUIRED.CREATE);
  validateRegistrationFormats(sanitizedData);
  return sanitizedData;
};

const validateActivate = (params, body) => {
  const registrationId = validateGetById(params);

  validateAllowedFields(body, [
    ...ACCOUNT_FIELDS.BODY.ACTIVE,
    ...REGISTRATION_FIELDS.BODY.ACTIVE
  ]);
  const rawAccountData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.ACTIVE),
  );
  const rawStudentData = sanitizeFields(
    pickFields(body, REGISTRATION_FIELDS.BODY.ACTIVE),
  );
  validateRequiredFields(rawAccountData, ACCOUNT_FIELDS.REQUIRED.ACTIVE);
  const formatedAccountData = formatAccountData(rawAccountData)
  const formatedProfileData = formatStudentData(rawStudentData)
  validateRegistrationFormats({ ...rawAccountData, ...rawStudentData });
  return {
    id: registrationId,
    body: { accountData: rawAccountData, profileData: rawStudentData },
  };
};

const validateUpdate = (params, body) => {
  const registrationId = formatNumericId(params.id);
  validateId(registrationId);

  validateAllowedFields(body, REGISTRATION_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizeFields(
    pickFields(body, REGISTRATION_FIELDS.BODY.UPDATE),
  );

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  validateRegistrationFormats(sanitizedData);

  return { registrationId, registrationData: sanitizedData };
};

const validatePartialUpdate = (params, body) => {
  const registrationId = formatNumericId(params.id);
  validateId(registrationId);

  validateAllowedFields(body, REGISTRATION_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizePatchBody(
    body,
    REGISTRATION_FIELDS.BODY.UPDATE,
  );

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );
  validateRegistrationFormats(sanitizedData);

  return { registrationId, registrationData: sanitizedData };
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateActivate,
  validateUpdate,
  validatePartialUpdate,
};
