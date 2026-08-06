const {
  validateAllowedFields,
} = require("@/utils/validators/request/requestFields.validator");

const {
  validateRequiredFields,
} = require("@/utils/validators/request/requiredFields.validator");

const {
  sanitizePatchBody,
} = require("@/utils/validators/request/patch.validator");

const { sanitizeFields, pickFields, throwIf } = require("@/utils/helpers");

const { formatNumericId } = require("@/utils/formatters/input/paramsFormatter");

const { validateId } = require("@/utils/validators/common/id.validator");

const { BadRequestError } = require("@/utils/errors");

const { ERROR_MESSAGES } = require("@/constants");

const { ACCOUNT_FIELDS } = require("./accounts.constants");

const {
  formatAccountData,
  formatAccountQuery,
} = require("./accounts.formatter");

const { validateAccountFormats } = require("./accounts.validator");

// ===============================
// Query
// ===============================

const getList = (query) => {
  validateAllowedFields(query, ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS);

  const sanitizedData = sanitizeFields(
    pickFields(query, ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS),
  );

  const accountQuery = formatAccountQuery(sanitizedData);

  validateAccountFormats(accountQuery);

  return accountQuery;
};

// ===============================
// Params
// ===============================

const getById = (params) => {
  const accountId = formatNumericId(params.id);

  validateId(accountId);

  return accountId;
};

// ===============================
// CRUD
// ===============================

const create = (body) => {
  validateAllowedFields(body, ACCOUNT_FIELDS.BODY.CREATE);

  const sanitizedData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.CREATE),
  );

  validateRequiredFields(sanitizedData, ACCOUNT_FIELDS.REQUIRED.CREATE);

  const accountData = formatAccountData(sanitizedData);

  validateAccountFormats(accountData);

  return accountData;
};

const partialUpdate = (params, body) => {
  const accountId = getById(params);

  const sanitizedData = sanitizePatchBody(body, ACCOUNT_FIELDS.BODY.UPDATE);

  throwIf(
    !sanitizedData || Object.keys(sanitizedData).length === 0,

    BadRequestError,

    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  const accountData = formatAccountData(sanitizedData);

  validateAccountFormats(accountData);

  return {
    params: accountId,
    body: accountData,
  };
};

// ===============================
// Restore
// ===============================

const restore = (params) => {
  return getById(params);
};

// ===============================
// Status Actions
// ===============================

const statusTransition = (params) => {
  return getById(params);
};

// ===============================
// Change Role
// ===============================

const changeRole = (params, body) => {
  const accountId = getById(params);

  validateAllowedFields(body, ACCOUNT_FIELDS.BODY.CHANGE_ROLE);

  const sanitizedData = sanitizeFields(
    pickFields(body, ACCOUNT_FIELDS.BODY.CHANGE_ROLE),
  );

  validateRequiredFields(sanitizedData, ACCOUNT_FIELDS.REQUIRED.CHANGE_ROLE);

  const accountData = formatAccountData(sanitizedData);

  validateAccountFormats(accountData);

  return {
    params: accountId,
    body: accountData,
  };
};

module.exports = {
  getList,

  getById,

  create,

  partialUpdate,

  restore,

  statusTransition,

  changeRole,
};
