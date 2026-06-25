const AppError = require("../../utils/errors");
const { throwIf, pickFields, sanitizeFields, hasField } = require("../../utils/helpers");
const {
  validateEmail,
  validatePassword,
  validateUsername,
  validateAllowedFields,
  validateRequiredFields,
} = require("../../utils/validators");
const { AUTH_FIELDS } = require("./auth.constants");

const validateAuthFormats = (authData) => {
  if (!authData) return;

  if (hasField(authData, "username")) {
    validateUsername(authData.username);
  }

  if (hasField(authData, "email")) {
    validateEmail(authData.email);
  }

  if (hasField(authData, "roleName")) {
    validateEnum(authData.roleName, Object.values(ROLES), "roleName");
  }
};

const validateRegister = (body) => {
  validateAllowedFields(body, AUTH_FIELDS.BODY.REGISTER);
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.REGISTER),
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.BODY.REGISTER);

  // const authData = formatAuthData(sanitizedData);

  validateAuthFormats(sanitizedData);
  return sanitizedData;
};

const validateLogin = (body) => {
  validateAllowedFields(body, AUTH_FIELDS.BODY.LOGIN);
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.LOGIN),
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.BODY.LOGIN);

  // const authData = formatAuthData(sanitizedData);

  validateAuthFormats(sanitizedData);
  return sanitizedData;
};

const validateChangePassword = (params, body) => {
  const accountId = formatNumericId(params.id);
  validateId(accountId);
  validateAllowedFields(body, AUTH_FIELDS.BODY.LOGIN);
  const sanitizedData = sanitizeFields(
    pickFields(body, AUTH_FIELDS.BODY.LOGIN),
  );
  validateRequiredFields(sanitizedData, AUTH_FIELDS.BODY.LOGIN);

  // const authData = formatAuthData(sanitizedData);

  validateAuthFormats(sanitizedData);
  return sanitizedData;
};

// const validateGetMe = (params) {
  
//   return getMeData;
// }

module.exports = {
  validateRegister,
  validateLogin,
  validateChangePassword,
};
