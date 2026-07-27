const { BadRequestError } = require("../../utils/errors");
const { ROLES, ACCOUNT_STATUS, ERROR_MESSAGES } = require("../../constants");
const { ACCOUNT_FIELDS } = require("./accounts.constants");

const {
  formatAccountData,
  formatAccountQuery,
  formatNumericId,
} = require("../../utils/formatters");

const {
  pickFields,
  sanitizeFields,
  hasField,
  throwIf,
} = require("../../utils/helpers");

const {
  validateEnum,
  validateId,
  validatePagination,
  validateUsername,
  validateEmail,
  validateAllowedFields,
  validateRequiredFields,
  sanitizePatchBody,
} = require("../../utils/validators");

const validateAccountFormats = (accountData) => {
  if (!accountData) return;

  if (hasField(accountData, "page") || hasField(accountData, "limit")) {
    validatePagination(accountData.page, accountData.limit);
  }

  if (hasField(accountData, "username")) {
    validateUsername(accountData.username);
  }

  if (hasField(accountData, "email")) {
    validateEmail(accountData.email);
  }

  if (hasField(accountData, "roleCodes")) {
    const roleCodes = accountData.roleCodes;

    throwIf(
      !Array.isArray(roleCodes),
      BadRequestError,
      "roleCodes must be an array",
    );

    roleCodes.forEach((code) => {
      validateEnum(code, Object.values(ROLES), `roleCodes[${code}]`);
    });
  }

  if(hasField(accountData, "roleCode"))  {
    validateEnum(accountData.roleCode, Object.values(ROLES), "roleCode")
  }

  if(hasField(accountData, "searchField"))  {
    validateEnum(accountData.searchField, ACCOUNT_FIELDS.QUERY.SEARCHABLE, "searchField")
  }

  if (hasField(accountData, "accountStatus")) {
    validateEnum(
      accountData.accountStatus,
      Object.values(ACCOUNT_STATUS),
      "accountStatus",
    );
  }
};

const validateGetList = (query) => {
  validateAllowedFields(query, ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS);

  const rawQueryData = sanitizeFields(
    pickFields(query, ACCOUNT_FIELDS.QUERY.ALLOWED_KEYS),
  );
  const queryData = formatAccountQuery(rawQueryData);
  validateAccountFormats(queryData);
  console.log(queryData)

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
    pickFields(body, ACCOUNT_FIELDS.BODY.CREATE),
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
    pickFields(body, ACCOUNT_FIELDS.BODY.UPDATE),
  );
  validateRequiredFields(sanitizedData, ACCOUNT_FIELDS.REQUIRED.UPDATE);

  const accountData = formatAccountData(sanitizedData);

  throwIf(
    !accountData || Object.keys(accountData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
  );

  validateAccountFormats(accountData);

  return {
    params: accountId,
    body: accountData,
  };
};

const validatePartialUpdate = (params, body) => {
  const accountId = formatNumericId(params.id);
  validateId(accountId);

  validateAllowedFields(body, ACCOUNT_FIELDS.BODY.UPDATE);

  const sanitizedData = sanitizePatchBody(body, ACCOUNT_FIELDS.BODY.UPDATE);

  const accountData = formatAccountData(sanitizedData);

  throwIf(
    !accountData || Object.keys(accountData).length === 0,
    BadRequestError,
    ERROR_MESSAGES.NO_VALID_FIELDS,
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

const validateStatusTransition = (params) => {
  throwIf(
    !params || !params.id,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Account ID is required",
  );

  const accountId = formatNumericId(params.id);
  validateId(accountId);

  throwIf(
    !action,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    "Status action is required",
  );

  const actionToStatusMap = {
    activate: ACCOUNT_STATUS.ACTIVE,
    lock: ACCOUNT_STATUS.LOCKED,
    disable: ACCOUNT_STATUS.DISABLED,
    pending: ACCOUNT_STATUS.PENDING,
  };

  const accountStatus = actionToStatusMap[action.toLowerCase()];

  throwIf(
    !accountStatus,
    BadRequestError,
    ERROR_CODES.VALIDATION_FAILED,
    `Action '${action}' is not supported`,
  );

  return {
    accountId,
    accountStatus,
  };
};

module.exports = {
  validateGetList,
  validateGetById,
  validateCreate,
  validateUpdate,
  validatePartialUpdate,
  validateRemove,
  validateStatusTransition,
  validateAccountFormats
};
