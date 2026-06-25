const AppError = require("../../utils/errors");
const { ROLES, ACCOUNT_STATUS, ERROR_MESSAGES } = require("../../constants");
const { ACCOUNT_FIELDS } = require("./accounts.constants");

const {
  formatAccountData,
  formatAccountQuery,
  formatNumericId,
} = require("../../utils/formatters");

const { pickFields, sanitizeFields, hasField, throwIf } = require("../../utils/helpers");

const {
  validateEnum,
  validateId,
  validatePagination,
  validateUsername,
  validateEmail,
  validateAllowedFields,
  validateRequiredFields,
} = require("../../utils/validators");

const validateAccountFormats = (accountData) => {
  if (!accountData) return;

  if (hasField(accountData, "username")) {
    validateUsername(accountData.username);
  }

  if (hasField(accountData, "email")) {
    validateEmail(accountData.email);
  }

  if (hasField(accountData, "roleName")) {
    validateEnum(accountData.roleName, Object.values(ROLES), "roleName");
  }

  if (hasField(accountData, "accountStatus")) {
    validateEnum(accountData.accountStatus, Object.values(ACCOUNT_STATUS), "accountStatus");
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS);
  
  const rawQueryData = sanitizeFields(
    pickFields(query, ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS)
  );
  const queryData = formatAccountQuery(rawQueryData);

  if (hasField(queryData, "page") || hasField(queryData, "limit")) {
    validatePagination(queryData.page, queryData.limit);
  }

  if (hasField(queryData, "roleName")) {
    validateEnum(queryData.roleName, Object.values(ROLES), "roleName");
  }

  if (hasField(queryData, "accountStatus")) {
    validateEnum(queryData.accountStatus, Object.values(ACCOUNT_STATUS), "accountStatus");
  }

  return queryData;
};

const validateGetById = (params) => {
  const accountId = formatNumericId(params.id);
  validateId(accountId);
  return accountId;
};

const validateCreate = (body) => {
  validateAllowedFields(body, ACCOUNT_FIELDS.BODY.CREATE);
  const sanitizedData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.CREATE)
  );
  validateRequiredFields(sanitizedData, ACCOUNT_FIELDS.REQUIRED.CREATE);

  const accountData = formatAccountData(sanitizedData);

  validateAccountFormats(accountData);

  return accountData;
};

const validateUpdate = (params, body) => {
  const accountId = formatNumericId(params.id);
  validateId(accountId);

  validateAllowedFields(body, ACCOUNT_FIELDS.BODY.UPDATE);
  const sanitizedData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.UPDATE)
  );
  validateRequiredFields(sanitizedData, ACCOUNT_FIELDS.REQUIRED.UPDATE);

  const accountData = formatAccountData(sanitizedData);

  throwIf(
    !accountData || Object.keys(accountData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS
  );

  validateAccountFormats(accountData);

  return {
    accountId,
    accountData,
  };
};

const validatePartialUpdate = (params, body) => {
  const accountId = formatNumericId(params.id);
  validateId(accountId);

  validateAllowedFields(body, ACCOUNT_FIELDS.BODY.UPDATE);
  
  const sanitizedData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.UPDATE)
  );

  const accountData = formatAccountData(sanitizedData);

  throwIf(
    !accountData || Object.keys(accountData).length === 0,
    AppError.BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS
  );

  validateAccountFormats(accountData);

  return {
    accountId,
    accountData,
  };
};

const validateRemove = (params) => {
  const accountId = formatNumericId(params.id);
  validateId(accountId);
  return accountId;
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
};